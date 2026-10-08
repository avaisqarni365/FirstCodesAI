#Requires -Version 5.1
<#
.SYNOPSIS
  Build the Next.js app locally and deploy to the IONOS VPS via SSH.

.DESCRIPTION
  Pipeline:
    1. Tooling check (node, ssh, scp, tar)
    2. DNS check  -- codes-ai.uk should resolve to the IONOS server IP
    3. npm run build
    4. Package release into a tarball
    5. scp tarball to server  (1st password prompt)
    6. ssh and atomically swap to new release + pm2 reload  (2nd password prompt)

.PARAMETER CheckOnly
  Run steps 1-2 only (no build, no upload). Safe to run any time.

.PARAMETER SkipBuild
  Skip step 3 (use the existing .next/ output).

.EXAMPLE
  npm run deploy:check
  npm run deploy
#>
[CmdletBinding()]
param(
    [string]$Domain        = 'codes-ai.uk',
    [string]$Server        = '212.227.54.250',
    [string]$User          = 'root',
    [string]$RemotePath    = '/var/www/codes-ai',
    [string]$PmName        = 'codes-ai-platform',
    [int]   $AppPort       = 3020,
    [switch]$CheckOnly,
    [switch]$SkipBuild,
    [string]$EnvFile,
    [switch]$RunMigrations
)

$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$Stamp       = Get-Date -Format 'yyyyMMdd-HHmmss'
$ReleaseDir  = "$RemotePath/releases/$Stamp"
$TarName     = "codes-ai-$Stamp.tar.gz"
$TarLocal    = Join-Path $env:TEMP $TarName

function Step ($m) { Write-Host "`n==> $m" -ForegroundColor Cyan }
function OK   ($m) { Write-Host "  [OK]   $m" -ForegroundColor Green }
function WARN ($m) { Write-Host "  [WARN] $m" -ForegroundColor Yellow }
function FAIL ($m) { Write-Host "  [FAIL] $m" -ForegroundColor Red }

# ---------- 1. Tooling ----------
Step "Checking local tooling"
foreach ($bin in 'node','npm','ssh','scp','tar') {
    $c = Get-Command $bin -ErrorAction SilentlyContinue
    if (-not $c) { FAIL "$bin not on PATH"; exit 1 }
    OK "$bin -> $($c.Source)"
}

# ---------- 2. DNS check ----------
Step "DNS check: $Domain should resolve to $Server"
$a = Resolve-DnsName $Domain -Type A -ErrorAction SilentlyContinue |
     Where-Object { $_.Type -eq 'A' } | Select-Object -First 1
if (-not $a) {
    FAIL "No A record for $Domain"
} elseif ($a.IPAddress -eq $Server) {
    OK "$Domain -> $($a.IPAddress)"
} else {
    WARN "$Domain -> $($a.IPAddress)  (expected $Server)"
    WARN "Fix at GoDaddy DNS: A @ $Server"
}

$cname = Resolve-DnsName "www.$Domain" -Type CNAME -ErrorAction SilentlyContinue |
         Where-Object { $_.Type -eq 'CNAME' } | Select-Object -First 1
if ($cname) { OK "www.$Domain -> $($cname.NameHost)" } else { WARN "No CNAME for www.$Domain" }

if ($CheckOnly) { Step "Check-only mode, exiting."; exit 0 }

# ---------- 3. Build ----------
if (-not $SkipBuild) {
    Step "npm run build"
    Push-Location $ProjectRoot
    try {
        npm run build
        if ($LASTEXITCODE -ne 0) { FAIL "Build failed"; exit $LASTEXITCODE }
        OK "Build succeeded"
    } finally { Pop-Location }
} else {
    WARN "Skipping build (-SkipBuild)"
    if (-not (Test-Path (Join-Path $ProjectRoot '.next'))) {
        FAIL "No .next/ output present; cannot skip build."; exit 1
    }
}

# ---------- 4. Package ----------
Step "Packaging release -> $TarLocal"
if (Test-Path $TarLocal) { Remove-Item $TarLocal -Force }
Push-Location $ProjectRoot
try {
    # Bundle only what the server needs to run `next start` + prisma.
    # node_modules is installed fresh on the server.
    # Write a relative archive name: a "C:" path makes some tar builds
    # treat the drive letter as a remote host.
    if (Test-Path $TarName) { Remove-Item $TarName -Force }
    tar -czf $TarName `
        --exclude='node_modules' `
        --exclude='.git' `
        --exclude='.next/cache' `
        --exclude='.next/dev' `
        .next public prisma package.json package-lock.json next.config.ts prisma.config.ts
    if ($LASTEXITCODE -ne 0) { FAIL "tar failed"; exit $LASTEXITCODE }
    Move-Item -Force $TarName $TarLocal
    OK ("{0:N1} MB" -f ((Get-Item $TarLocal).Length / 1MB))
} finally { Pop-Location }

# ---------- 5. Resolve .env to upload (optional) ----------
$EnvUpload = $null
if ($EnvFile) {
    if (-not (Test-Path $EnvFile)) { FAIL ".env file not found: $EnvFile"; exit 1 }
    $EnvUpload = (Resolve-Path $EnvFile).Path
} else {
    $defaultEnv = Join-Path $ProjectRoot '.env'
    if (Test-Path $defaultEnv) {
        $EnvUpload = $defaultEnv
        WARN "Found local .env -- will upload it. Pass -EnvFile '' to skip."
    }
}

# ---------- 6. Upload ----------
Step "Uploading to ${User}@${Server} (SSH password prompt)"
$uploads = @($TarLocal)
if ($EnvUpload) { $uploads += $EnvUpload }
scp -o StrictHostKeyChecking=accept-new @uploads "${User}@${Server}:/tmp/"
if ($LASTEXITCODE -ne 0) { FAIL "scp failed"; exit $LASTEXITCODE }
OK ("Uploaded {0} file(s)" -f $uploads.Count)
$EnvRemoteName = if ($EnvUpload) { Split-Path $EnvUpload -Leaf } else { '' }

# ---------- 6. Remote deploy ----------
Step "Remote install + atomic swap + pm2 reload (password prompt again)"

# Heredoc-safe remote script. Single-quoted so PowerShell does not expand $vars.
$remote = @"
set -euo pipefail
RELEASE='$ReleaseDir'
CURRENT='$RemotePath/current'
TAR='/tmp/$TarName'
ENV_UP='/tmp/$EnvRemoteName'
PORT='$AppPort'
PM='$PmName'
RUN_MIGRATIONS='$($RunMigrations.IsPresent.ToString().ToLower())'

mkdir -p "`$RELEASE"
tar -xzf "`$TAR" -C "`$RELEASE"
cd "`$RELEASE"

# .env precedence: freshly uploaded > previous release > none (warn)
if [ -n '$EnvRemoteName' ] && [ -f "`$ENV_UP" ]; then
    mv "`$ENV_UP" .env
    echo "Using uploaded .env"
elif [ -L "`$CURRENT" ] && [ -f "`$CURRENT/.env" ]; then
    cp "`$CURRENT/.env" .env
    echo "Reused .env from previous release"
else
    echo "WARN: no .env on server -- app will start without environment variables"
fi

npm ci --omit=dev
npx prisma generate

if [ "`$RUN_MIGRATIONS" = "true" ]; then
    echo "Running prisma migrate deploy"
    if ! npx prisma migrate deploy; then
        echo "migrate deploy failed — attempting one-time baseline of the initial migration"
        # DB predates Prisma migration history (created via db push). Mark the
        # initial migration as already-applied, then apply pending migrations.
        npx prisma migrate resolve --applied 20260521223921_init || true
        npx prisma migrate deploy
    fi
fi

# Atomic symlink swap
ln -sfn "`$RELEASE" "`$CURRENT.new"
mv -Tf "`$CURRENT.new" "`$CURRENT"

# Start from the resolved release path (NOT the symlink). pm2 caches pm_cwd at
# start time and 'pm2 reload' never re-resolves it, so a plain reload after a
# symlink swap keeps serving the OLD release's .next forever. Delete + start
# each deploy guarantees pm_cwd tracks the new release. Brief (~1s) downtime is
# acceptable for this single fork-mode app.
cd "`$(readlink -f "`$CURRENT")"
pm2 delete "`$PM" >/dev/null 2>&1 || true
PORT="`$PORT" pm2 start npm --name "`$PM" -- start
pm2 save

# Keep last 5 releases, prune older
ls -1dt $RemotePath/releases/*/ 2>/dev/null | tail -n +6 | xargs -r rm -rf

rm -f "`$TAR"
echo "Deploy OK: `$RELEASE"
"@

$remote | ssh -o StrictHostKeyChecking=accept-new "${User}@${Server}" 'bash -s'
if ($LASTEXITCODE -ne 0) { FAIL "Remote deploy failed"; exit $LASTEXITCODE }

# ---------- 7. Smoke test ----------
Step "Smoke test https://$Domain"
try {
    $r = Invoke-WebRequest -Uri "https://$Domain" -UseBasicParsing -TimeoutSec 15
    OK "HTTP $($r.StatusCode)"
} catch {
    WARN "Smoke test failed: $($_.Exception.Message)"
    WARN "Check: ssh ${User}@${Server} 'pm2 logs $PmName --lines 50'"
}

Remove-Item $TarLocal -Force -ErrorAction SilentlyContinue
Step "Done."
