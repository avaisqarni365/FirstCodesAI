import { Rocket, Globe, CircuitBoard, Search, Megaphone, Languages, TrendingUp } from "lucide-react";

/**
 * Persuasive product intros (SparkVibe, ACCA, Artizai) + Remote Marketing flow.
 * Problem → solution framing, an outcome stat, and a strong CTA per product.
 */

export interface ProductIntro {
  icon: typeof Rocket;
  name: string;
  domain: string;
  url: string;
  tagline: string;
  problem: string;
  solution: string;
  proof: { stat: string; label: string }[];
  cta: string;
  accent: string; // accent key: peach | mint | grape | gold | coral
  window: string; // mac window title
  // mock UI "screenshot" rows shown inside the product's Apple window
  screen: { label: string; value: string }[];
}

export const PRODUCT_INTROS: ProductIntro[] = [
  {
    icon: Rocket,
    name: "SparkVibe",
    domain: "vibe.codes-ai.uk",
    url: "https://vibe.codes-ai.uk",
    tagline: "The vibe engineering studio for teams that ship.",
    problem: "AI coding tools lose the plot on real codebases — no shared context, no docs, no memory between sessions.",
    solution: "SparkVibe turns your repos and databases into plain-English docs, knowledge packs, and SDLC-ready context for Claude & Cursor — with a Context Vault, DB Logic Explorer, and a Prompt A/B Lab.",
    proof: [{ stat: "4", label: "platforms shipped" }, { stat: "10×", label: "faster context" }, { stat: "1", label: "source of truth" }],
    cta: "Open SparkVibe",
    accent: "peach",
    window: "sparkvibe ~ studio",
    screen: [
      { label: "Context Vault", value: "1,240 docs synced" },
      { label: "DB Explorer", value: "19 models mapped" },
      { label: "Prompt A/B Lab", value: "readiness 94%" },
    ],
  },
  {
    icon: Globe,
    name: "ACCA",
    domain: "acca.codes-ai.uk",
    url: "https://acca.codes-ai.uk",
    tagline: "Fully-remote accounting, anywhere in the world.",
    problem: "Founders dread the finance admin — invoices chased late, expenses uncategorised, month-end a scramble.",
    solution: "ACCA runs your books remotely: VAT-ready invoicing, expense tracking, and P&L / VAT / cash-flow reporting kept current for clients worldwide, in any timezone.",
    proof: [{ stat: "100%", label: "remote, worldwide" }, { stat: "VAT", label: "compliant billing" }, { stat: "0", label: "month-end scramble" }],
    cta: "See ACCA",
    accent: "mint",
    window: "acca ~ ledger",
    screen: [
      { label: "Invoices", value: "£42,800 outstanding" },
      { label: "VAT return", value: "Q1 ready" },
      { label: "Cash flow", value: "+£18,200 mo" },
    ],
  },
  {
    icon: CircuitBoard,
    name: "Artizai",
    domain: "artizai.uk",
    url: "https://artizai.uk",
    tagline: "An AI-driven platform, vibe-coded end-to-end.",
    problem: "Great ideas stall because building an AI product means stitching models, data and UI together for months.",
    solution: "Artizai is a CODES AI product engineered with the same vibe-coding approach that powers our infrastructure — an AI-driven platform shipped fast, without the usual assembly.",
    proof: [{ stat: "AI", label: "native platform" }, { stat: "E2E", label: "vibe-coded" }, { stat: "CODES", label: "AI portfolio" }],
    cta: "Explore Artizai",
    accent: "grape",
    window: "artizai ~ platform",
    screen: [
      { label: "AI engine", value: "online" },
      { label: "Pipelines", value: "running" },
      { label: "Deploy", value: "codes-ai.uk" },
    ],
  },
];

/* ── Remote Marketing ── */
export interface MarketStep {
  icon: typeof Search;
  title: string;
  desc: string;
}
export const MARKETING_STEPS: MarketStep[] = [
  { icon: Search, title: "Research", desc: "Find your buyers and channels in each target country." },
  { icon: Languages, title: "Localise", desc: "Adapt message, language and pricing per region." },
  { icon: Megaphone, title: "Launch", desc: "Run email, WhatsApp & outbound from our remote desk." },
  { icon: TrendingUp, title: "Optimise", desc: "Track, learn, and scale what converts — everywhere." },
];

export const MARKET_REGIONS = [
  { code: "UK", x: 47, y: 30 },
  { code: "EU", x: 52, y: 34 },
  { code: "US", x: 22, y: 38 },
  { code: "AE", x: 62, y: 44 },
  { code: "IN", x: 71, y: 47 },
  { code: "SG", x: 79, y: 55 },
];
