"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SiteFrame } from "@/components/marketing/SiteFrame";
import { ProductIntros } from "@/components/marketing/ProductIntros";
import { PartnerStack } from "@/components/marketing/PartnerStack";
import { RemoteMarketing } from "@/components/marketing/RemoteMarketing";
import {
  ArrowRight, ArrowUpRight, Users, Phone, Bot,
  Database, Cloud, LineChart, CheckCircle2, Layers,
  Smartphone, Monitor, Braces,
  Sparkles, Lock, Search, Calculator,
} from "lucide-react";

/* ── Counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = target / 80;
    const t = setInterval(() => { v += step; if (v >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(v)); }, 16);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Data ── */
const services = [
  { icon: Bot, title: "AI & Machine Learning", desc: "Custom AI models, chatbots, predictive analytics. Claude, GPT & bespoke LLM solutions.", tag: "POPULAR", slug: "ai-machine-learning" },
  { icon: Database, title: "Data Engineering", desc: "Delta Lakehouse, ETL/ELT pipelines, real-time streaming. Azure, Databricks, Snowflake.", tag: null, slug: "data-engineering" },
  { icon: Cloud, title: "Cloud Architecture", desc: "Multi-cloud infrastructure. Serverless, Kubernetes, IaC. AWS, Azure, GCP.", tag: null, slug: "cloud-architecture" },
  { icon: Monitor, title: "Web Applications", desc: "Next.js, React, TypeScript. Server-rendered, real-time, responsive interfaces.", tag: null, slug: "web-applications" },
  { icon: Smartphone, title: "Mobile Development", desc: "React Native cross-platform apps. Offline-first, push notifications.", tag: null, slug: "mobile-development" },
  { icon: Braces, title: "Custom Software", desc: "Bespoke CRM, ERP, SaaS platforms. Tailored to your workflow.", tag: null, slug: "custom-software" },
  { icon: LineChart, title: "Business Intelligence", desc: "Power BI & Tableau dashboards. KPI tracking, data storytelling.", tag: null, slug: "business-intelligence" },
  { icon: Lock, title: "Cybersecurity", desc: "OWASP audits, pen testing, SOC2/ISO compliance, zero-trust.", tag: null, slug: "cybersecurity" },
  { icon: Layers, title: "API & Integrations", desc: "REST, GraphQL, microservices. Webhook orchestration.", tag: null, slug: "api-integrations" },
];

const remoteOps = [
  { icon: Users, title: "Remote Sales & CRM Ops", desc: "We run your pipeline — contacts, deals, follow-ups. Your outsourced sales desk.", tag: "CORE", slug: "remote-sales-crm-ops" },
  { icon: Search, title: "Global Lead Generation", desc: "Companies House, SIC-code targeting & web enrichment across UK/EU/US/IN/AE.", tag: null, slug: "global-lead-generation" },
  { icon: Phone, title: "Remote Communications Desk", desc: "WhatsApp, VoIP calls & unified inbox — answered and logged to your CRM.", tag: null, slug: "remote-communications-desk" },
  { icon: Calculator, title: "Remote Finance & Invoicing Ops", desc: "VAT invoices, expenses, and P&L / VAT / cash-flow reports — kept current.", tag: null, slug: "remote-finance-invoicing-ops" },
  { icon: Sparkles, title: "Remote Team Enablement", desc: "The Team Hub, AI-tools marketplace & collaboration behind every engagement.", tag: null, slug: "remote-team-enablement" },
];

const projects = [
  { title: "Enterprise Data Platform", client: "Anglian Water", value: "£85K", cat: "Data Engineering", tech: ["Databricks", "Fabric", "PySpark"], color: "from-blue-600 to-cyan-500", metric: "250+ products", slug: "anglian-water-data-platform" },
  { title: "AI Development Framework", client: "CODES AI", value: "£52K", cat: "AI & Automation", tech: ["LLMs", "Claude", "Python"], color: "from-violet-600 to-purple-500", metric: "40% faster dev", slug: "codes-ai-development-framework" },
  { title: "SAP-to-Azure Migration", client: "Carl Zeiss", value: "£120K", cat: "Cloud Migration", tech: ["Synapse", "SAP", "Power BI"], color: "from-emerald-600 to-teal-500", metric: "€120K/yr saved", slug: "carl-zeiss-sap-azure" },
  { title: "IoT Sensor Analytics", client: "Hermes", value: "£65K", cat: "Real-Time", tech: ["Delta Lake", "Kafka", "PySpark"], color: "from-amber-600 to-orange-500", metric: "99.9% accuracy", slug: "hermes-iot-analytics" },
];


const testimonials = [
  { quote: "CODES AI delivered an exceptional data platform that transformed our operations.", name: "James Whitfield", role: "IT Director", company: "Anglian Water" },
  { quote: "The AI automation suite saved us thousands of hours and changed how we build software.", name: "David Chen", role: "CTO", company: "TechCorp Ltd" },
  { quote: "Working with CODES AI has been a game-changer. The platform exceeded every expectation.", name: "Sarah Chen", role: "CTO", company: "DataFlow Systems" },
];

const techStack = ["Claude", "NVIDIA", "CUDA", "NIM", "ACCA", "SparkVibe", "Artizai", "Next.js", "Python", "PostgreSQL", "Databricks", "Azure"];
const clients = ["Anglian Water", "Carl Zeiss", "E.ON Energy", "Volkswagen AG", "Flaschenpost", "PlayMobil", "Hermes", "Siemens AG"];

/* ════════════ MAIN ════════════ */
export default function Home() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroParallax = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "12%"]);

  return (
    <SiteFrame flush>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative flex items-center pt-14 sm:pt-16 bg-canvas overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-24 lg:py-28 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 max-w-full bg-white border border-line rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-5 sm:mb-8">
                <span className="w-2 h-2 shrink-0 bg-teal-500 rounded-full" />
                <span className="text-[10px] sm:text-xs font-mono font-semibold text-teal-700 leading-snug">Joining Claude Startups and NVIDIA Inception</span>
              </motion.div>

              <h1 className="text-[length:var(--text-hero)] font-semibold text-ink leading-[1.02] tracking-tight text-balance">
                Claude reasons.
                <br />
                NVIDIA runs it.
                <br />
                <span className="text-teal-600">We ship the product.</span>
              </h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="mt-5 sm:mt-6 text-sm sm:text-lg text-ink/70 leading-relaxed max-w-lg">
                Three products are launching on that stack. <span className="text-ink font-semibold">ACCA</span> is the proof — Kontai reads the document, Claude decides the booking, and NVIDIA hardware serves the model. SparkVibe and Artizai ship the same way.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3">
                <Link href="#products" className="group flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-3 rounded-[12px] text-sm transition-colors">
                  See the products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="#partners" className="flex items-center justify-center gap-2 bg-white border border-line text-ink font-medium px-5 py-3 rounded-[12px] text-sm hover:bg-mist transition-colors">
                  Claude and NVIDIA
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="mt-10 grid grid-cols-3 gap-6 max-w-lg border-t border-line pt-6">
                {[{ v: "3", l: "Products launching" }, { v: "Claude", l: "Judgement" }, { v: "NVIDIA", l: "Hardware" }].map((s) => (
                  <div key={s.l}>
                    <p className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">{s.v}</p>
                    <p className="text-xs text-ink/50 mt-1">{s.l}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div style={{ y: heroParallax }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}>
              <div className="bg-white rounded-[12px] border border-line overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-mist">
                  <span className="text-[11px] font-mono font-semibold text-ink/60">acca.codes-ai.uk</span>
                  <span className="text-[10px] font-mono font-semibold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">Kontai</span>
                </div>
                <div className="p-4 sm:p-5 space-y-2">
                  {[
                    { k: "Document", v: "Invoice in" },
                    { k: "Claude", v: "Tax case reasoned" },
                    { k: "Account", v: "Flagged if unclear" },
                    { k: "NVIDIA", v: "Inference on GPU" },
                    { k: "Ledger", v: "Debit = credit" },
                  ].map((row, i) => (
                    <motion.div key={row.k} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.08 }}
                      className="flex items-center justify-between rounded-[10px] bg-mist px-3 py-2.5">
                      <span className="text-xs font-medium text-ink">{row.k}</span>
                      <span className="text-xs font-mono text-teal-700">{row.v}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="px-4 sm:px-5 pb-5">
                  <div className="rounded-[10px] bg-forest text-white px-4 py-3 flex items-center justify-between">
                    <span className="text-sm font-bold">Trail kept on the booking</span>
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PartnerStack />
      <ProductIntros />

      <section className="border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-x-4 gap-y-1">
          {techStack.map((t) => (
            <span key={t} className="font-mono text-[11px] font-medium text-ink/45">{t}</span>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-ink/40 uppercase mb-4">Worked with</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {clients.map((c) => (
              <span key={c} className="text-sm text-ink/70">{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 sm:py-28 bg-canvas border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10 sm:mb-14">
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-brass uppercase">How it ships</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-[1.05]">From the brief<br />to production.</h2>
            <p className="mt-4 text-sm sm:text-base text-ink/70 leading-relaxed">Five steps. Claude does the reasoning. NVIDIA runs the heavy work. A person still approves what is not clear.</p>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-line border border-line rounded-[12px] overflow-hidden">
            {[
              { n: "01", title: "You describe", desc: "Plain English. The product, the users, the constraint." },
              { n: "02", title: "Claude architects", desc: "Schema, APIs and the shape of the system." },
              { n: "03", title: "We build", desc: "Production code, file by file, on that plan." },
              { n: "04", title: "Claude reviews", desc: "Security, tests, and a reason for each change." },
              { n: "05", title: "NVIDIA serves", desc: "Inference and the heavy jobs, then it goes live." },
            ].map((step) => (
              <li key={step.n} className="bg-white p-5">
                <p className="font-mono text-[11px] font-semibold text-teal-600">{step.n}</p>
                <h3 className="mt-3 text-sm font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-xs text-ink/60 leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="architecture" className="pb-20 sm:pb-28 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-line rounded-[12px] overflow-hidden">
            {[
              { layer: "Claude", tech: "Judgement — Opus for the hard reasoning, Sonnet and Haiku when it should be fast" },
              { layer: "NVIDIA", tech: "Hardware — GPUs, CUDA and NIM serving the model" },
              { layer: "Product", tech: "Next.js, the API, PostgreSQL — then IONOS, Nginx, SSL" },
            ].map((item, i) => (
              <div key={item.layer} className={`grid sm:grid-cols-12 gap-2 sm:gap-6 px-5 sm:px-6 py-4 ${i > 0 ? "border-t border-line" : ""}`}>
                <p className="sm:col-span-3 text-sm font-semibold text-ink">{item.layer}</p>
                <p className="sm:col-span-9 text-sm text-ink/65">{item.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 sm:py-28 bg-canvas border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10 sm:mb-14">
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-brass uppercase">Operations</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-[1.05]">What we run<br />for you.</h2>
            <p className="mt-4 text-sm sm:text-base text-ink/70 leading-relaxed">The back office and the growth desk, operated end to end, in any timezone.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-line border border-line rounded-[12px] overflow-hidden">
            {remoteOps.map((s, i) => (
              <Link key={s.title} href={`/services/${s.slug}`} className={`group bg-white p-6 sm:p-7 hover:bg-mist transition-colors ${i === remoteOps.length - 1 ? "sm:col-span-2" : ""}`}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[11px] font-semibold text-teal-600">0{i + 1}</p>
                  <ArrowUpRight className="w-4 h-4 text-ink/30 group-hover:text-teal-700 transition-colors" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-sm text-ink/65 leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-brass uppercase">Engineering</p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-ink tracking-tight">The work behind the desk.</h2>
            </div>
            <Link href="/services" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
              All services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-[12px] overflow-hidden">
            {services.map((s) => (
              <Link key={s.title} href={`/services/${s.slug}`} className="group bg-white p-5 sm:p-6 hover:bg-mist transition-colors">
                <h3 className="text-sm font-semibold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-sm text-ink/65 leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
          <Link href="/services" className="sm:hidden mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
            All services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { v: 150, s: "+", l: "Projects" },
            { v: 50, s: "+", l: "Clients" },
            { v: 12, s: "+", l: "Years" },
            { v: 98, s: "%", l: "Satisfaction" },
          ].map((st) => (
            <div key={st.l}>
              <p className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight"><Counter target={st.v} suffix={st.s} /></p>
              <p className="mt-1 text-sm text-ink/50">{st.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio" className="py-20 sm:py-28 bg-canvas border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-brass uppercase">Work</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-[1.05]">The result,<br />not the claim.</h2>
            </div>
            <Link href="/case-studies" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 shrink-0">
              All case studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-white border border-line rounded-[12px] overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 border-b border-line font-mono text-[11px] font-semibold tracking-wide text-ink/40 uppercase">
              <span className="col-span-3">Client</span>
              <span className="col-span-4">Project</span>
              <span className="col-span-3">Result</span>
              <span className="col-span-2 text-right">Value</span>
            </div>
            {projects.map((p) => (
              <Link key={p.slug} href={`/case-studies/${p.slug}`} className="grid sm:grid-cols-12 gap-1 sm:gap-4 px-5 py-4 border-t border-line first:border-t-0 sm:first:border-t hover:bg-mist transition-colors">
                <span className="sm:col-span-3 text-sm text-ink/55">{p.client}</span>
                <span className="sm:col-span-4 text-sm font-semibold text-ink">{p.title}</span>
                <span className="sm:col-span-3 text-sm font-mono text-teal-700">{p.metric}</span>
                <span className="sm:col-span-2 sm:text-right text-sm text-ink/70">{p.value}</span>
              </Link>
            ))}
          </div>
          <Link href="/case-studies" className="sm:hidden mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
            All case studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══ REMOTE MARKETING ═══ */}
      <RemoteMarketing />

      <section className="py-20 sm:py-28 bg-canvas border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-brass uppercase">Clients</p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-[1.05]">In their words.</h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <figure key={t.name} className="bg-white border border-line rounded-[12px] p-6 flex flex-col">
                <blockquote className="text-sm text-ink/80 leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 pt-4 border-t border-line">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink/50 mt-0.5">{t.role}, {t.company}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 sm:py-28 bg-canvas border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10">
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-brass uppercase">Contact</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-[1.05]">Let&apos;s talk.<br />We reply within a day.</h2>
            <p className="mt-4 text-sm sm:text-base text-ink/70 max-w-md">A short note is enough. We come back with a view of the product, the stack, and what it would take.</p>
          </div>
          <div className="bg-white border border-line rounded-[12px] divide-y divide-line self-start">
            <a href="mailto:info@codes-ai.uk" className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-mist transition-colors">
              <span>
                <span className="block font-mono text-[11px] font-semibold text-ink/40 uppercase">Email</span>
                <span className="block mt-1 text-sm font-semibold text-ink">info@codes-ai.uk</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-teal-700" />
            </a>
            <a href="tel:+447586094540" className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-mist transition-colors">
              <span>
                <span className="block font-mono text-[11px] font-semibold text-ink/40 uppercase">Phone</span>
                <span className="block mt-1 text-sm font-semibold text-ink">+44 7586 094540</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-teal-700" />
            </a>
            <div className="px-5 py-4">
              <span className="block font-mono text-[11px] font-semibold text-ink/40 uppercase">Company</span>
              <span className="block mt-1 text-sm text-ink/75">CODES AI LIMITED · 16078672<br />97 Blenheim Road, Bolton, BL2 6EL</span>
            </div>
          </div>
        </div>
      </section>

    </SiteFrame>
  );
}
