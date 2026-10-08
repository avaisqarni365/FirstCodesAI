import { Rocket, Globe, CircuitBoard, Search, Megaphone, Languages, TrendingUp, Brain, Cpu } from "lucide-react";

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
  claude: string;
  nvidia: string;
  proof: { stat: string; label: string }[];
  cta: string;
  accent: string; // accent key: peach | mint | grape | gold | coral | teal
  window: string; // mac window title
  // mock UI "screenshot" rows shown inside the product's Apple window
  screen: { label: string; value: string }[];
}

export const PRODUCT_INTROS: ProductIntro[] = [
  {
    icon: Globe,
    name: "ACCA",
    domain: "acca.codes-ai.uk",
    url: "https://acca.codes-ai.uk",
    tagline: "Kontai. The books finish themselves.",
    problem: "Accounting software gives you another screen to check. The work between the receipt and the filing still sits with a person.",
    solution: "ACCA is Kontai — the live platform on our subdomain. A document comes in. Claude reads the amount, the tax case and the counterparty, then proposes a balanced booking with the reason attached. What is not clear is flagged, not guessed. NVIDIA hardware serves that inference.",
    claude: "Reads the document, chooses the tax case, and writes the booking a reviewer can follow.",
    nvidia: "Document and booking models run on NVIDIA accelerated hardware.",
    proof: [{ stat: "Claude", label: "judgement" }, { stat: "NVIDIA", label: "hardware" }, { stat: "1", label: "ledger, one trail" }],
    cta: "Open ACCA",
    accent: "teal",
    window: "acca ~ kontai",
    screen: [
      { label: "Claude", value: "tax case reasoned" },
      { label: "NVIDIA", value: "inference live" },
      { label: "Ledger", value: "debit = credit" },
    ],
  },
  {
    icon: Rocket,
    name: "SparkVibe",
    domain: "vibe.codes-ai.uk",
    url: "https://vibe.codes-ai.uk",
    tagline: "The studio that ships with Claude.",
    problem: "Coding tools forget the codebase. Context, docs and the last decision disappear between sessions.",
    solution: "SparkVibe turns repositories and databases into plain-English docs, knowledge packs and SDLC-ready context for Claude and Cursor — a Context Vault, a database explorer, and a prompt lab, so the model starts from the product instead of a blank chat.",
    claude: "Holds the codebase, the schema and the prompt history Claude and Cursor actually use.",
    nvidia: "Evaluation and heavier model runs sit on NVIDIA compute, not a laptop fan.",
    proof: [{ stat: "4", label: "platforms shipped" }, { stat: "Claude", label: "in the loop" }, { stat: "1", label: "source of truth" }],
    cta: "Open SparkVibe",
    accent: "peach",
    window: "sparkvibe ~ studio",
    screen: [
      { label: "Context Vault", value: "repo in plain English" },
      { label: "Claude", value: "SDLC context ready" },
      { label: "NVIDIA", value: "evals on GPU" },
    ],
  },
  {
    icon: CircuitBoard,
    name: "Artizai",
    domain: "artizai.uk",
    url: "https://artizai.uk",
    tagline: "An AI platform, served on NVIDIA.",
    problem: "An AI product stalls when the model, the data and the interface are three projects.",
    solution: "Artizai is the CODES AI platform for product intelligence: Claude for the reasoning a user actually sees, NVIDIA for the serving layer underneath, and the same shipping discipline we use on ACCA and SparkVibe.",
    claude: "Product reasoning, tool use and the answers a customer can trust.",
    nvidia: "Model serving on NVIDIA hardware, built to stay fast as usage grows.",
    proof: [{ stat: "Claude", label: "product brain" }, { stat: "NVIDIA", label: "serving" }, { stat: "Live", label: "artizai.uk" }],
    cta: "Explore Artizai",
    accent: "grape",
    window: "artizai ~ platform",
    screen: [
      { label: "Claude", value: "product intelligence" },
      { label: "NVIDIA", value: "model serving" },
      { label: "Status", value: "launching" },
    ],
  },
];

/* ── Claude Startups + NVIDIA Inception ──
   Programme facts are public. Membership is what we are joining —
   the products already run on this stack. */
export interface PartnerPoint {
  title: string;
  body: string;
}
export interface PartnerProfile {
  icon: typeof Brain;
  name: string;
  by: string;
  programme: string;
  href: string;
  lead: string;
  points: PartnerPoint[];
  tone: "claude" | "nvidia";
}

export const PARTNERS: PartnerProfile[] = [
  {
    icon: Brain,
    name: "Claude",
    by: "Anthropic",
    programme: "Claude Startups",
    href: "https://claude.com/programs/startups",
    lead: "The judgement layer. Claude is the model that reads a document, a codebase or a contract and says what it decided.",
    points: [
      { title: "Opus, Sonnet, Haiku", body: "Opus 5.5 for the hard reasoning. Sonnet and Haiku when the same work should be fast and cheaper. One family, picked per job." },
      { title: "A trail, not a guess", body: "Long context holds a ledger, a repository or a pile of invoices. Tool use lets the model act. If it is not sure, it stops." },
      { title: "Claude Startups", body: "Anthropic’s programme for companies building on Claude: API credits, Claude Team, office hours with Applied AI, and the Startup Stack around the product." },
    ],
    tone: "claude",
  },
  {
    icon: Cpu,
    name: "NVIDIA",
    by: "Accelerated computing",
    programme: "NVIDIA Inception",
    href: "https://www.nvidia.com/en-us/startups/",
    lead: "The hardware layer. The models only stay fast if the GPUs, the CUDA stack and the inference path are real.",
    points: [
      { title: "GPUs and CUDA", body: "Training and inference on NVIDIA accelerated computing — the hardware ACCA’s document and booking models actually run on." },
      { title: "NVIDIA NIM", body: "Inference microservices for serving foundation models without standing up a research cluster first. Secure, repeatable, production-shaped." },
      { title: "NVIDIA Inception", body: "The startup programme: SDKs, Deep Learning Institute training, preferred hardware and software pricing, and a path into the NVIDIA ecosystem. No equity taken." },
    ],
    tone: "nvidia",
  },
];

export const STACK_TRAIL = [
  { n: "01", title: "Document in", body: "A PDF, a photo or an e-invoice lands in ACCA." },
  { n: "02", title: "Claude reads", body: "Amount, date, tax and counterparty — each value stays attached to the document." },
  { n: "03", title: "Claude decides", body: "The tax case and the account, with the reason written down. Unclear means flagged." },
  { n: "04", title: "NVIDIA serves", body: "That inference runs on NVIDIA hardware, not a shared guess in the browser." },
  { n: "05", title: "Books close", body: "A balanced entry. The trail is still there a year later." },
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
