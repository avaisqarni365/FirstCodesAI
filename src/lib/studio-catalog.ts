import {
  LogIn, CreditCard, LayoutDashboard, Bot, Smartphone, ShieldCheck,
  Plug, Bell, Search, FileText, BarChart3, Globe, Database, Palette,
  Users, Workflow,
} from "lucide-react";

/**
 * SparkVibe Studio — mock pricing/estimation model.
 * Each feature carries an estimated token cost, GBP price, and sprint count.
 * The live calculator computes Σ(feature × complexity multiplier).
 * Numbers are illustrative and tunable — not a binding quote.
 */

export type Discipline = "Frontend" | "Backend" | "AI" | "Mobile" | "DevOps" | "QA" | "Design";

export interface StudioFeature {
  id: string;
  name: string;
  blurb: string;
  icon: typeof LogIn;
  tokens: number; // estimated tokens (thousands) to vibe-code the feature
  price: number; // GBP
  sprints: number; // sprint units
  discipline: Discipline;
}

export interface ComplexityLevel {
  id: string;
  label: string;
  desc: string;
  multiplier: number;
}

export const FEATURES: StudioFeature[] = [
  { id: "auth", name: "Authentication", blurb: "Email + social login, roles, sessions.", icon: LogIn, tokens: 120, price: 1400, sprints: 1, discipline: "Backend" },
  { id: "payments", name: "Payments & Billing", blurb: "Stripe checkout, subscriptions, invoices.", icon: CreditCard, tokens: 180, price: 2200, sprints: 1, discipline: "Backend" },
  { id: "dashboard", name: "Dashboard & Analytics", blurb: "Charts, KPIs, real-time widgets.", icon: LayoutDashboard, tokens: 200, price: 2600, sprints: 2, discipline: "Frontend" },
  { id: "ai-chat", name: "AI Assistant", blurb: "Claude-powered chat, RAG, tool use.", icon: Bot, tokens: 260, price: 3400, sprints: 2, discipline: "AI" },
  { id: "mobile", name: "Mobile App", blurb: "React Native, offline-first, push.", icon: Smartphone, tokens: 300, price: 4200, sprints: 3, discipline: "Mobile" },
  { id: "admin", name: "Admin Portal", blurb: "User management, content, moderation.", icon: ShieldCheck, tokens: 160, price: 1900, sprints: 1, discipline: "Frontend" },
  { id: "integrations", name: "3rd-party Integrations", blurb: "REST/GraphQL, webhooks, connectors.", icon: Plug, tokens: 140, price: 1700, sprints: 1, discipline: "Backend" },
  { id: "notifications", name: "Notifications", blurb: "Email, SMS, push, in-app.", icon: Bell, tokens: 90, price: 1100, sprints: 1, discipline: "Backend" },
  { id: "search", name: "Search & Filtering", blurb: "Full-text, facets, typeahead.", icon: Search, tokens: 110, price: 1300, sprints: 1, discipline: "Backend" },
  { id: "cms", name: "Content / CMS", blurb: "Editable pages, blog, media library.", icon: FileText, tokens: 130, price: 1500, sprints: 1, discipline: "Frontend" },
  { id: "reporting", name: "Reporting & Export", blurb: "PDF/CSV, scheduled reports.", icon: BarChart3, tokens: 100, price: 1200, sprints: 1, discipline: "Backend" },
  { id: "i18n", name: "Multi-language", blurb: "i18n, RTL, per-region content.", icon: Globe, tokens: 80, price: 950, sprints: 1, discipline: "Frontend" },
  { id: "data", name: "Data Pipeline", blurb: "ETL, warehouse, scheduled jobs.", icon: Database, tokens: 220, price: 2900, sprints: 2, discipline: "Backend" },
  { id: "design", name: "Custom Design System", blurb: "Bespoke UI kit, motion, brand.", icon: Palette, tokens: 150, price: 1800, sprints: 1, discipline: "Design" },
  { id: "team", name: "Teams & Permissions", blurb: "Orgs, seats, granular access.", icon: Users, tokens: 140, price: 1650, sprints: 1, discipline: "Backend" },
  { id: "automation", name: "Workflow Automation", blurb: "Rules engine, triggers, actions.", icon: Workflow, tokens: 170, price: 2100, sprints: 2, discipline: "AI" },
];

export const COMPLEXITY: ComplexityLevel[] = [
  { id: "simple", label: "Simple", desc: "MVP, standard flows, minimal edge cases.", multiplier: 0.8 },
  { id: "standard", label: "Standard", desc: "Production-ready, sensible scale.", multiplier: 1.0 },
  { id: "complex", label: "Complex", desc: "High scale, compliance, deep customisation.", multiplier: 1.5 },
];

/** Baseline included in every project (setup, CI/CD, deploy, QA). */
export const BASELINE = { tokens: 80, price: 900, sprints: 1 };

export interface Estimate {
  tokens: number;
  price: number;
  sprints: number;
  weeks: number;
}

export function computeEstimate(selectedIds: string[], multiplier: number): Estimate {
  const picked = FEATURES.filter((f) => selectedIds.includes(f.id));
  const tokens = Math.round(
    (BASELINE.tokens + picked.reduce((s, f) => s + f.tokens, 0)) * multiplier
  );
  const price = Math.round(
    (BASELINE.price + picked.reduce((s, f) => s + f.price, 0)) * multiplier
  );
  // Sprints run partly in parallel across disciplines, so we don't sum linearly.
  const rawSprints = BASELINE.sprints + picked.reduce((s, f) => s + f.sprints, 0);
  const sprints = Math.max(1, Math.round(rawSprints * 0.7 * multiplier));
  const weeks = sprints * 2; // 2-week sprints
  return { tokens, price, sprints, weeks };
}

/** Build a mock sprint plan grouping picked features by discipline order. */
export interface SprintTask {
  feature: string;
  discipline: Discipline;
  tokens: number;
}
export interface Sprint {
  n: number;
  title: string;
  tasks: SprintTask[];
}

const SPRINT_ORDER: Discipline[] = ["Design", "Backend", "Frontend", "AI", "Mobile", "DevOps", "QA"];

export function buildSprintPlan(selectedIds: string[], multiplier: number): Sprint[] {
  const picked = FEATURES.filter((f) => selectedIds.includes(f.id));
  if (picked.length === 0) return [];
  // Sort features by discipline order, then chunk into sprints of ~2 features.
  const sorted = [...picked].sort(
    (a, b) => SPRINT_ORDER.indexOf(a.discipline) - SPRINT_ORDER.indexOf(b.discipline)
  );
  const perSprint = 2;
  const sprints: Sprint[] = [];
  const titles = ["Foundations", "Core build", "Intelligence", "Polish & scale", "Hardening", "Launch"];
  for (let i = 0; i < sorted.length; i += perSprint) {
    const chunk = sorted.slice(i, i + perSprint);
    const n = sprints.length + 1;
    sprints.push({
      n,
      title: titles[Math.min(sprints.length, titles.length - 1)],
      tasks: chunk.map((f) => ({
        feature: f.name,
        discipline: f.discipline,
        tokens: Math.round(f.tokens * multiplier),
      })),
    });
  }
  // Always append a final QA / launch sprint.
  sprints.push({
    n: sprints.length + 1,
    title: "QA & Launch",
    tasks: [
      { feature: "End-to-end tests", discipline: "QA", tokens: Math.round(40 * multiplier) },
      { feature: "Deploy & handover", discipline: "DevOps", tokens: Math.round(30 * multiplier) },
    ],
  });
  return sprints;
}

export const DISCIPLINE_COLOR: Record<Discipline, string> = {
  Frontend: "text-peach-600 bg-peach-100",
  Backend: "text-grape-500 bg-grape-100",
  AI: "text-coral-500 bg-coral-100",
  Mobile: "text-mint-500 bg-mint-100",
  DevOps: "text-gold-500 bg-gold-100",
  QA: "text-warm-600 bg-warm-100",
  Design: "text-peach-500 bg-peach-50",
};
