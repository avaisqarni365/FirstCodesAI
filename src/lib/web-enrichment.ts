import type { EnrichmentResult, JobListing, RegionCode } from "@/lib/profile-parser";
import { getRegion } from "@/lib/profile-parser";

const CAREERS_PATHS = ["/careers", "/jobs", "/vacancies", "/work-with-us", "/join-us", "/opportunities", "/recruitment"];

function normalizeUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url.replace(/\/$/, "");
  return `https://${url.replace(/\/$/, "")}`;
}

function extractUrlsFromHtml(html: string): string[] {
  const urls: string[] = [];
  const hrefRegex = /href=["'](https?:\/\/[^"']+)["']/gi;
  let m;
  while ((m = hrefRegex.exec(html)) !== null) {
    urls.push(m[1]);
  }
  return urls;
}

function scoreWebsiteUrl(url: string, companyName: string): number {
  const lower = url.toLowerCase();
  const slug = companyName.toLowerCase().replace(/[^a-z0-9]/g, "");
  let score = 0;
  if (lower.includes(slug.slice(0, 6))) score += 5;
  if (!lower.includes("linkedin") && !lower.includes("facebook") && !lower.includes("wikipedia")) score += 3;
  if (lower.includes("careers") || lower.includes("jobs")) score -= 2;
  if (lower.match(/\.(com|co\.uk|io|tech|ai)(\/|$)/)) score += 2;
  return score;
}

async function googleCustomSearch(query: string): Promise<string[]> {
  const apiKey = process.env.GOOGLE_CSE_API_KEY;
  const cx = process.env.GOOGLE_CSE_CX;
  if (!apiKey || !cx) return [];

  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&num=8&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.items || []).map((i: { link?: string }) => i.link || "").filter(Boolean);
}

async function duckDuckGoSearch(query: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`,
      {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; CodesAI/1.0)" },
        signal: AbortSignal.timeout(8000),
      }
    );
    if (!res.ok) return [];
    const html = await res.text();
    return extractUrlsFromHtml(html).filter(
      (u) => !u.includes("duckduckgo.com") && !u.includes("javascript:")
    );
  } catch {
    return [];
  }
}

function guessWebsite(companyName: string, region: RegionCode): string {
  const regionMeta = getRegion(region);
  const slug = companyName
    .toLowerCase()
    .replace(/\b(ltd|limited|plc|inc|corp|gmbh|llc|uk|group)\b/gi, "")
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 30);
  if (!slug) return "";
  const tld = regionMeta.tld === "co.uk" ? "co.uk" : regionMeta.tld;
  return `https://www.${slug}.${tld}`;
}

function parseJobsFromHtml(html: string, baseUrl: string): JobListing[] {
  const jobs: JobListing[] = [];
  const patterns = [
    /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]{5,120})<\/a>/gi,
    /<h[23][^>]*>([^<]{5,120})<\/h[23]>/gi,
    /class=["'][^"']*job[^"']*["'][^>]*>([^<]{5,120})</gi,
  ];

  const jobKeywords = /engineer|developer|analyst|manager|consultant|architect|designer|lead|director|specialist|administrator|support|data|cloud|devops|security|product/i;

  for (const pattern of patterns) {
    let m;
    while ((m = pattern.exec(html)) !== null && jobs.length < 15) {
      const title = (m[2] || m[1] || "").replace(/&amp;/g, "&").replace(/&#\d+;/g, "").trim();
      if (!jobKeywords.test(title)) continue;
      let href = m[1] || baseUrl;
      if (href && !href.startsWith("http")) {
        try {
          href = new URL(href, baseUrl).href;
        } catch {
          href = baseUrl;
        }
      }
      if (!jobs.some((j) => j.title === title)) {
        jobs.push({ title: title.slice(0, 120), url: href, source: "careers-page" });
      }
    }
  }

  return jobs.slice(0, 12);
}

async function fetchCareersJobs(careersUrl: string): Promise<JobListing[]> {
  try {
    const res = await fetch(careersUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; CodesAI/1.0)" },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return [];
    const html = await res.text();
    return parseJobsFromHtml(html, careersUrl);
  } catch {
    return [];
  }
}

async function findCareersUrl(website: string): Promise<string> {
  const base = normalizeUrl(website);
  if (!base) return "";

  for (const path of CAREERS_PATHS) {
    const url = `${base}${path}`;
    try {
      const res = await fetch(url, {
        method: "HEAD",
        headers: { "User-Agent": "Mozilla/5.0 (compatible; CodesAI/1.0)" },
        signal: AbortSignal.timeout(5000),
        redirect: "follow",
      });
      if (res.ok) return url;
    } catch {
      // try next path
    }
  }
  return "";
}

export async function enrichCompany(
  companyName: string,
  region: RegionCode
): Promise<EnrichmentResult> {
  const regionMeta = getRegion(region);
  const searchQuery = `"${companyName}" official website ${regionMeta.searchSuffix}`;
  const careersQuery = `"${companyName}" careers jobs hiring ${regionMeta.searchSuffix}`;

  const [googleResults, ddgResults, careersSearch] = await Promise.all([
    googleCustomSearch(searchQuery),
    duckDuckGoSearch(searchQuery),
    googleCustomSearch(careersQuery).then((r) => (r.length ? r : duckDuckGoSearch(careersQuery))),
  ]);

  let candidates = [...googleResults, ...ddgResults];
  const guessed = guessWebsite(companyName, region);
  if (guessed) candidates.push(guessed);

  candidates = [...new Set(candidates)];
  candidates.sort((a, b) => scoreWebsiteUrl(b, companyName) - scoreWebsiteUrl(a, companyName));

  let website = candidates.find((u) => scoreWebsiteUrl(u, companyName) >= 3) || candidates[0] || guessed;
  website = normalizeUrl(website);

  let careersUrl = careersSearch.find((u) => /career|job|vacanc|recruit|work-with/i.test(u)) || "";
  if (!careersUrl && website) {
    careersUrl = await findCareersUrl(website);
  }
  careersUrl = normalizeUrl(careersUrl);

  let jobListings: JobListing[] = [];
  if (careersUrl) {
    jobListings = await fetchCareersJobs(careersUrl);
  }

  if (jobListings.length === 0 && careersSearch.length > 0) {
    jobListings = careersSearch
      .filter((u) => /job|career|vacanc/i.test(u))
      .slice(0, 5)
      .map((url) => ({
        title: "View openings",
        url,
        source: "search-result",
      }));
  }

  return {
    website,
    careersUrl,
    jobListings,
    searchQuery: `${searchQuery} | ${careersQuery}`,
  };
}
