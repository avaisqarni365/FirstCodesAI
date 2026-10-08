import type { ServiceVariant } from "./services-data";

/**
 * Per-service bespoke presentation. Every one of the 14 services gets a UNIQUE
 * layoutVariant so no two detail pages look the same. `accent` drives the page's
 * dominant colour family; `window` is the macOS-window title shown in the hero;
 * `command` is the mock terminal command for the hero animation.
 */
export interface ServiceVariantMeta {
  variant: ServiceVariant;
  accent: string;        // tailwind text/border/bg base, e.g. "peach" | "grape" | "mint" | "gold" | "coral"
  window: string;        // mac window title
  command: string;       // hero terminal command
  tagWord: string;       // one-word system tag e.g. "OPS", "PIPELINE"
}

export const SERVICE_VARIANTS: Record<string, ServiceVariantMeta> = {
  // ── Remote Operations (5) ──
  "remote-sales-crm-ops":         { variant: "terminal",    accent: "peach", window: "crm ~ pipeline",        command: "codes-ai crm --run pipeline",         tagWord: "OPS" },
  "global-lead-generation":       { variant: "pipeline",    accent: "grape", window: "leads ~ enrich",         command: "codes-ai leads --source companies-house", tagWord: "PIPELINE" },
  "remote-communications-desk":   { variant: "switchboard", accent: "mint",  window: "comms ~ switchboard",    command: "codes-ai comms --connect all",        tagWord: "CHANNELS" },
  "remote-finance-invoicing-ops": { variant: "ledger",      accent: "gold",  window: "finance ~ ledger",       command: "codes-ai finance --reconcile",        tagWord: "LEDGER" },
  "remote-team-enablement":       { variant: "orbit",       accent: "coral", window: "team ~ hub",             command: "codes-ai team --assemble",            tagWord: "TEAM" },

  // ── Engineering (9) ──
  "ai-machine-learning":          { variant: "neural",      accent: "grape", window: "ai ~ model",             command: "codes-ai ai --train model",           tagWord: "AI" },
  "data-engineering":             { variant: "lakehouse",   accent: "peach", window: "data ~ lakehouse",       command: "codes-ai data --build lakehouse",     tagWord: "DATA" },
  "cloud-architecture":           { variant: "cloudmap",    accent: "mint",  window: "cloud ~ regions",        command: "codes-ai cloud --provision",          tagWord: "CLOUD" },
  "web-applications":             { variant: "browser",     accent: "coral", window: "web ~ localhost:3000",   command: "codes-ai web --dev",                  tagWord: "WEB" },
  "mobile-development":           { variant: "device",      accent: "grape", window: "mobile ~ simulator",     command: "codes-ai mobile --run ios",           tagWord: "MOBILE" },
  "custom-software":              { variant: "blueprint",   accent: "gold",  window: "build ~ blueprint",      command: "codes-ai build --spec ./product.md",  tagWord: "CUSTOM" },
  "business-intelligence":        { variant: "dashboard",   accent: "peach", window: "bi ~ dashboard",         command: "codes-ai bi --report",                tagWord: "BI" },
  "cybersecurity":                { variant: "vault",       accent: "coral", window: "sec ~ audit",            command: "codes-ai sec --scan",                 tagWord: "SECURITY" },
  "api-integrations":             { variant: "graph",       accent: "mint",  window: "api ~ graph",            command: "codes-ai api --wire",                 tagWord: "API" },
};

export const DEFAULT_VARIANT: ServiceVariantMeta = {
  variant: "terminal", accent: "peach", window: "codes-ai ~ service", command: "codes-ai run", tagWord: "SERVICE",
};

/** Resolve accent → a set of tailwind classes used across the bespoke layout. */
export interface AccentClasses {
  text: string; textStrong: string; bg: string; bgSoft: string; border: string; dot: string; grad: string;
}
export const ACCENT: Record<string, AccentClasses> = {
  peach: { text: "text-peach-600", textStrong: "text-peach-500", bg: "bg-peach-100", bgSoft: "bg-peach-50", border: "border-peach-200", dot: "bg-peach-500", grad: "from-peach-500 to-peach-600" },
  grape: { text: "text-grape-500", textStrong: "text-grape-500", bg: "bg-grape-100", bgSoft: "bg-grape-100/50", border: "border-grape-200", dot: "bg-grape-500", grad: "from-grape-500 to-peach-500" },
  mint:  { text: "text-mint-500",  textStrong: "text-mint-500",  bg: "bg-mint-100",  bgSoft: "bg-mint-100/50",  border: "border-mint-200",  dot: "bg-mint-500",  grad: "from-mint-500 to-emerald-600" },
  gold:  { text: "text-gold-500",  textStrong: "text-gold-500",  bg: "bg-gold-100",  bgSoft: "bg-gold-100/50",  border: "border-gold-200",  dot: "bg-gold-500",  grad: "from-gold-500 to-coral-500" },
  coral: { text: "text-coral-500", textStrong: "text-coral-500", bg: "bg-coral-100", bgSoft: "bg-coral-100/50", border: "border-coral-200", dot: "bg-coral-500", grad: "from-coral-500 to-peach-500" },
  teal:  { text: "text-teal-600",  textStrong: "text-teal-500",  bg: "bg-teal-100",  bgSoft: "bg-teal-50",      border: "border-teal-200",  dot: "bg-teal-500",  grad: "from-teal-500 to-teal-600" },
};
export function accentOf(key: string): AccentClasses {
  return ACCENT[key] ?? ACCENT.peach;
}
