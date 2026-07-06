"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Starburst } from "@/components/vibe";
import { ProductIntros } from "@/components/marketing/ProductIntros";
import { RemoteMarketing } from "@/components/marketing/RemoteMarketing";
import {
  ArrowRight, ArrowUpRight, Users, Mail, Phone, Bot, Shield, Code2,
  Database, Cloud, LineChart, Globe, Star, CheckCircle2, Zap, Layers,
  Smartphone, Monitor, Braces, ChevronRight, ChevronDown, MessageSquare, Award, Play,
  Sparkles, Menu, X, Terminal, Brain, CircuitBoard, Rocket, Lock, Server,
  Gauge, Eye, Send, Search, Calculator,
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

/* ── TypeWriter ── */
function TypeWriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx];
    const timer = setTimeout(() => {
      if (!del) { setText(word.slice(0, text.length + 1)); if (text.length === word.length) setTimeout(() => setDel(true), 2000); }
      else { setText(word.slice(0, text.length - 1)); if (text.length === 0) { setDel(false); setIdx((i) => (i + 1) % words.length); } }
    }, del ? 30 : 70);
    return () => clearTimeout(timer);
  }, [text, del, idx, words]);
  return <>{text}<span className="text-peach-400 animate-pulse">|</span></>;
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

const techStack = ["Python", "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Azure", "AWS", "Databricks", "Docker", "Kubernetes", "Claude AI", "PySpark", "Power BI", "Terraform", "Redis"];
const clients = ["Anglian Water", "Carl Zeiss", "E.ON Energy", "Volkswagen AG", "Flaschenpost", "PlayMobil", "Hermes", "Siemens AG"];

/* ── Fade-in wrapper ── */
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay, duration: 0.5, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

/* ── Choreographed stagger reveal ── */
const revealContainer = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const revealItem = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };
const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={revealContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className={className}>
    {children}
  </motion.div>
);

/* ── Spotlight card wrapper — radial glow follows the pointer ── */
function Spotlight({ children, className = "", as: Tag = "div", ...rest }: { children: React.ReactNode; className?: string; as?: "div" | "a"; [k: string]: unknown }) {
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const Comp = Tag as "div";
  return (
    <Comp onMouseMove={onMove} className={`spotlight ${className}`} {...rest}>
      {children}
    </Comp>
  );
}

/* ════════════ MAIN ════════════ */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroParallax = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "12%"]);

  return (
    <div className="grain min-h-screen bg-white overflow-x-hidden">

      {/* ═══ NAVBAR ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-warm-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="font-bold text-warm-800 text-base sm:text-lg tracking-tight">CODES<span className="text-peach-500">AI</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {[["Studio", "/studio"], ["Services", "/services"], ["Case Studies", "/case-studies"], ["About", "/about"], ["Contact", "#contact"]].map(([l, h]) => (
              <Link key={l} href={h} className="text-sm font-medium text-warm-500 hover:text-peach-600 transition-colors">{l}</Link>
            ))}
            <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-gradient-to-r from-peach-500 to-peach-600 px-4 py-2 rounded-lg shadow-md">
              Portal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 -mr-2 text-warm-600" aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t border-warm-100 overflow-hidden">
              <div className="px-4 py-4 space-y-1">
                {[["Studio", "/studio"], ["Services", "/services"], ["Case Studies", "/case-studies"], ["About CEO", "/about"], ["Contact", "#contact"]].map(([l, h]) => (
                  <Link key={l} href={h} onClick={() => setMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-warm-700 hover:bg-peach-50 rounded-lg transition-colors">{l}</Link>
                ))}
                <Link href="/login" onClick={() => setMenuOpen(false)} className="block mt-2 text-center text-sm font-semibold text-white bg-gradient-to-r from-peach-500 to-peach-600 py-3 rounded-xl">
                  Client Portal
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-[90vh] sm:min-h-screen flex items-center pt-14 sm:pt-16 bg-gradient-to-b from-white via-peach-50/40 to-warm-50 overflow-hidden">
        {/* Aurora mesh + background effects */}
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[140%] aspect-square aurora-bg pointer-events-none opacity-[0.18]" aria-hidden />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(63,98,203,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(63,98,203,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute -top-32 -right-32 w-64 sm:w-[500px] h-64 sm:h-[500px] rounded-full bg-peach-300/30 blur-[80px] sm:blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-48 sm:w-[400px] h-48 sm:h-[400px] rounded-full bg-grape-200/40 blur-[60px] sm:blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20 lg:py-28 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white border border-warm-200 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-5 sm:mb-8 shadow-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono font-semibold text-peach-600">// REMOTE BUSINESS OPERATIONS · WORLDWIDE</span>
              </motion.div>

              <h1 className="text-[length:var(--text-hero)] font-bold text-warm-800 leading-[1.05] tracking-tight text-balance">
                We run your
                <br />
                <span className="bg-gradient-to-r from-peach-500 via-peach-400 to-grape-500 bg-clip-text text-transparent">remote operations</span>
                <br />
                <span className="text-warm-400 text-[0.5em]"><TypeWriter words={["worldwide.", "around the clock.", "so you can grow."]} /></span>
              </h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="mt-4 sm:mt-6 text-sm sm:text-lg text-warm-600 leading-relaxed max-w-lg">
                Have an idea? <span className="text-peach-600 font-semibold">Vibe-code it into a shipped product</span> in SparkVibe Studio — write requirements, pick features, get a live estimate. Or let us <span className="text-warm-700 font-medium">run your remote ops</span>: CRM, lead-gen, comms and finance. Fully remote, worldwide.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3">
                <Link href="/studio" className="group flex items-center justify-center gap-2 bg-peach-500 hover:bg-peach-600 text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg shadow-peach-500/25 text-sm hover:-translate-y-1 transition-all">
                  <Starburst size={16} className="text-white" /> Build in Studio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#contact" className="flex items-center justify-center gap-2 bg-white border border-warm-200 text-warm-700 font-medium px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl text-sm hover:border-peach-300 hover:bg-peach-50 transition-all shadow-sm">
                  <Play className="w-4 h-4 text-peach-500" /> Run my ops
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-5 text-xs sm:text-sm text-warm-500">
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-emerald-500" /> NDA</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> GDPR</span>
                <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-emerald-500" /> #16078672</span>
              </motion.div>
            </div>

            {/* Terminal — desktop only, mobile stats */}
            <motion.div style={{ y: heroParallax }}>
              {/* Desktop terminal */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
                className="hidden lg:block">
                <div className="bg-white rounded-2xl border border-warm-200 overflow-hidden shadow-xl shadow-warm-200/50">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-warm-100 bg-warm-50">
                    <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-coral-500/80" /><div className="w-2.5 h-2.5 rounded-full bg-gold-500/80" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" /></div>
                    <span className="text-[10px] text-warm-500 ml-2 font-mono">codes-ai ~ remote-ops</span>
                  </div>
                  <div className="p-4 font-mono text-xs space-y-2 leading-relaxed">
                    {[
                      { d: 0.6, c: <><span className="text-peach-500">$</span> <span className="text-emerald-600">codes-ai</span> <span className="text-grape-500">run</span> <span className="text-gold-500">--client &quot;acme-ltd&quot;</span></> },
                      { d: 1.0, c: <span className="text-warm-400">// Booting remote ops desk...</span> },
                      { d: 1.4, c: <><span className="text-peach-500">✦</span> <span className="text-warm-700 font-semibold">CRM</span> <span className="text-warm-500">→ 1,240 contacts synced</span></> },
                      { d: 1.7, c: <><span className="text-peach-500">✦</span> <span className="text-warm-700 font-semibold">Leads</span> <span className="text-warm-500">→ 87 UK companies enriched</span></> },
                      { d: 2.0, c: <><span className="text-peach-500">✦</span> <span className="text-warm-700 font-semibold">Outreach</span> <span className="text-warm-500">→ 320 emails queued</span></> },
                      { d: 2.3, c: <><span className="text-peach-500">✦</span> <span className="text-warm-700 font-semibold">Calls</span> <span className="text-warm-500">→ VoIP desk live</span></> },
                      { d: 2.6, c: <><span className="text-emerald-600 font-semibold">✓ Operating</span> <span className="text-peach-500">acme-ltd · remote</span></> },
                      { d: 3.0, c: <div className="pt-1.5 border-t border-warm-100 mt-1"><span className="text-peach-600 font-bold">Back-office online</span> <span className="text-warm-400">vs</span> <span className="text-warm-400 line-through">new hires</span></div> },
                    ].map((l, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: l.d }}>{l.c}</motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Mobile stats grid */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="lg:hidden grid grid-cols-3 gap-2 mt-6">
                {[{ v: 92, s: "%", l: "AI adoption" }, { v: 40, s: "%", l: "Faster dev" }, { v: 55, s: "×", l: "Speed boost" }].map((s) => (
                  <div key={s.l} className="bg-white border border-warm-200 rounded-xl p-3 text-center shadow-sm">
                    <p className="text-lg font-bold text-peach-500"><Counter target={s.v} suffix={s.s} /></p>
                    <p className="text-[9px] text-warm-500 mt-0.5">{s.l}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown className="w-5 h-5 text-warm-600" />
        </motion.div>
      </section>

      {/* ═══ TECH MARQUEE ═══ */}
      <section className="py-3 bg-warm-50 border-y border-warm-100 overflow-hidden">
        <div className="flex animate-marquee gap-4" style={{ width: 'max-content' }}>
          {[...techStack, ...techStack, ...techStack].map((t, i) => (
            <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-warm-100 shadow-sm whitespace-nowrap">
              <CircuitBoard className="w-3 h-3 text-peach-400" /><span className="text-[11px] font-semibold text-warm-600">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CLIENTS ═══ */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-[9px] sm:text-[10px] font-bold text-warm-400 uppercase tracking-[0.15em] mb-4 sm:mb-6">Trusted by Enterprise Leaders</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {clients.map((c) => (
              <div key={c} className="px-3 sm:px-5 py-1.5 sm:py-2 bg-warm-50 border border-warm-100 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-warm-600">{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section id="process" className="py-14 sm:py-24 bg-warm-50 border-y border-warm-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <FadeIn className="text-center mb-10 sm:mb-16">
            <span className="inline-flex items-center gap-2 bg-white border border-warm-200 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-4 font-mono shadow-sm">
              <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-peach-500" />
              <span className="text-[10px] sm:text-xs font-semibold text-peach-600">// BUILD PROCESS</span>
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-warm-800 tracking-tight">From idea to <span className="text-peach-500">production</span></h2>
            <p className="mt-3 text-sm sm:text-base text-warm-500 max-w-xl mx-auto">Not months. Not weeks. Days.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              { n: "01", icon: Brain, title: "You Describe", desc: "Plain English. No jargon.", color: "from-grape-500 to-peach-500" },
              { n: "02", icon: Bot, title: "AI Architects", desc: "Schema, APIs, architecture.", color: "from-peach-500 to-peach-600" },
              { n: "03", icon: Code2, title: "AI Builds", desc: "Production code, file by file.", color: "from-peach-400 to-grape-500" },
              { n: "04", icon: Eye, title: "AI Reviews", desc: "Security, tests, review.", color: "from-gold-500 to-coral-500" },
              { n: "05", icon: Rocket, title: "Deploy", desc: "One-click to production.", color: "from-mint-500 to-emerald-600" },
            ].map((step, i) => (
              <FadeIn key={step.n} delay={i * 0.08}>
                <div className="group bg-white border border-warm-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-peach-200 hover:shadow-lg transition-all duration-300 h-full relative">
                  <span className="absolute top-2 right-3 text-2xl sm:text-3xl font-black text-warm-100">{step.n}</span>
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-warm-800 mb-1">{step.title}</h3>
                  <p className="text-xs text-warm-500">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ARCHITECTURE ═══ */}
      <section id="architecture" className="py-14 sm:py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-10 sm:mb-16">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-4">
              <CircuitBoard className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-peach-500" />
              <span className="text-[10px] sm:text-xs font-semibold text-peach-700">// ARCHITECTURE</span>
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-warm-800 tracking-tight">How our AI systems <span className="text-peach-500">work</span></h2>
          </FadeIn>

          <FadeIn>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-warm-100 p-5 sm:p-10 shadow-lg">
              {/* AI Tools */}
              <p className="text-[9px] sm:text-[10px] font-bold text-warm-400 uppercase tracking-widest text-center mb-3">AI Development Tools</p>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                {[
                  { name: "Claude", desc: "Reasoning", icon: Brain, color: "from-peach-500 to-peach-600" },
                  { name: "Cursor", desc: "Code gen", icon: Code2, color: "from-blue-500 to-violet-600" },
                  { name: "Kimi", desc: "2M context", icon: Eye, color: "from-emerald-500 to-teal-600" },
                ].map((tool) => (
                  <div key={tool.name} className="bg-warm-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-warm-100 text-center">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mx-auto mb-1.5 sm:mb-2 shadow-md`}>
                      <tool.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-warm-800">{tool.name}</p>
                    <p className="text-[9px] sm:text-[10px] text-warm-500">{tool.desc}</p>
                  </div>
                ))}
              </div>

              {/* Flow arrow */}
              <div className="flex justify-center my-3 sm:my-4">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-4 sm:h-6 bg-peach-200" />
                  <ChevronDown className="w-4 h-4 text-peach-400 -mt-1" />
                </div>
              </div>

              {/* Stack layers */}
              <div className="space-y-2 sm:space-y-3">
                {[
                  { layer: "Frontend", tech: "Next.js • React • TypeScript", icon: Monitor, color: "border-l-blue-500 bg-blue-50/30" },
                  { layer: "API Layer", tech: "Node.js • REST • Auth", icon: Server, color: "border-l-violet-500 bg-violet-50/30" },
                  { layer: "Database", tech: "PostgreSQL • Prisma • ACID", icon: Database, color: "border-l-emerald-500 bg-emerald-50/30" },
                ].map((item, i) => (
                  <div key={item.layer}>
                    <div className={`flex items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl border-l-4 ${item.color} border border-warm-100`}>
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-warm-600 shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-warm-800">{item.layer}</p>
                        <p className="text-[10px] sm:text-xs text-warm-500">{item.tech}</p>
                      </div>
                    </div>
                    {i < 2 && (
                      <div className="flex justify-center my-1.5 sm:my-2"><ChevronDown className="w-3.5 h-3.5 text-warm-300" /></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Deploy */}
              <div className="flex justify-center my-3 sm:my-4"><ChevronDown className="w-4 h-4 text-peach-400" /></div>
              <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl border-l-4 border-l-peach-500 bg-peach-50/30 border border-warm-100">
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-peach-500 shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-warm-800">Production</p>
                  <p className="text-[10px] sm:text-xs text-warm-500">IONOS • Nginx • SSL • PM2</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ REMOTE OPERATIONS (primary) ═══ */}
      <section id="services" className="py-14 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-10 sm:mb-16">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-4">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-peach-500" />
              <span className="text-[10px] sm:text-xs font-semibold text-peach-700">// REMOTE OPERATIONS</span>
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-warm-800 tracking-tight">What we <span className="text-peach-500">run for you</span></h2>
            <p className="mt-3 text-sm sm:text-base text-warm-500 max-w-xl mx-auto">Your remote back-office and growth function — operated end-to-end, in any timezone.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {remoteOps.map((s, i) => {
              const chips = [
                { bg: "bg-peach-100", fg: "text-peach-600" },
                { bg: "bg-grape-100", fg: "text-grape-500" },
                { bg: "bg-coral-100", fg: "text-coral-500" },
                { bg: "bg-gold-100", fg: "text-gold-500" },
                { bg: "bg-mint-100", fg: "text-mint-500" },
              ];
              const chip = chips[i % chips.length];
              return (
              <FadeIn key={s.title} delay={i * 0.05}>
                <Link href={`/services/${s.slug}`} className="group block relative p-6 sm:p-8 rounded-2xl bg-white border border-warm-100 hover:border-peach-200 hover:shadow-2xl hover:shadow-peach-100/40 transition-all duration-300 hover:-translate-y-1.5 h-full">
                  {s.tag && <span className="absolute top-3 right-3 bg-gradient-to-r from-peach-500 to-grape-500 text-white text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full">{s.tag}</span>}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${chip.bg} flex items-center justify-center mb-4 sm:mb-5 transition-all group-hover:scale-110`}>
                    <s.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${chip.fg}`} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-warm-800 mb-1.5">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-warm-500 leading-relaxed">{s.desc}</p>
                  <span className="mt-4 flex items-center gap-1 text-peach-500 text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all">
                    Explore <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ ENGINEERING (supporting layer) ═══ */}
      <section className="py-14 sm:py-24 bg-warm-50 border-t border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-10 sm:mb-16">
            <span className="inline-flex items-center gap-2 bg-white border border-warm-100 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-4">
              <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-warm-500" />
              <span className="text-[10px] sm:text-xs font-semibold text-warm-500">// ENGINEERING</span>
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-warm-800 tracking-tight">The engineering <span className="text-peach-500">behind it</span></h2>
            <p className="mt-3 text-sm sm:text-base text-warm-500 max-w-xl mx-auto">The in-house software and delivery capability that builds and powers our remote operations.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.03}>
                <Link href={`/services/${s.slug}`} className="group block relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-warm-100 hover:border-peach-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  {s.tag && <span className="absolute top-3 right-3 bg-gradient-to-r from-peach-500 to-amber-500 text-white text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full">{s.tag}</span>}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-peach-50 group-hover:bg-peach-100 flex items-center justify-center mb-3 sm:mb-4 transition-all group-hover:scale-110">
                    <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-peach-600" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-warm-800 mb-1">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-warm-500 leading-relaxed">{s.desc}</p>
                  <span className="mt-3 flex items-center gap-1 text-peach-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all">
                    Details <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-8 sm:mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-lg text-sm hover:-translate-y-1 transition-all">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-14 sm:py-20 bg-gradient-to-r from-peach-50 via-white to-grape-100/40 border-y border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
            {[
              { v: 150, s: "+", l: "Projects", icon: CheckCircle2 },
              { v: 50, s: "+", l: "Clients", icon: Users },
              { v: 12, s: "+", l: "Years Exp.", icon: Award },
              { v: 98, s: "%", l: "Satisfaction", icon: Star },
            ].map((st, i) => (
              <FadeIn key={st.l} delay={i * 0.08} className="text-center">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white border border-warm-200 shadow-sm flex items-center justify-center mx-auto mb-3">
                  <st.icon className="w-5 h-5 sm:w-7 sm:h-7 text-peach-500" />
                </div>
                <p className="text-2xl sm:text-4xl font-bold text-warm-800"><Counter target={st.v} suffix={st.s} /></p>
                <p className="text-[10px] sm:text-sm text-warm-500 mt-1">{st.l}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PORTFOLIO — BENTO "OUR WORK" ═══ */}
      <section id="portfolio" className="py-14 sm:py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-10 sm:mb-16">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-4">
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-peach-500" />
              <span className="text-[10px] sm:text-xs font-semibold text-peach-700">// OUR WORK</span>
            </span>
            <h2 className="text-[length:var(--text-display)] font-bold text-warm-800 tracking-tight text-balance">Real projects, <span className="text-peach-500">real impact</span></h2>
          </FadeIn>

          {/* Bento grid: flagship (i=0) spans 2×2, others vary */}
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(150px,auto)] gap-4 sm:gap-5">
            {projects.map((p, i) => {
              // Layout: 0 = flagship (2col×2row tall), 1 = wide (2col), 2 & 3 = 2col each
              const span =
                i === 0 ? "md:col-span-2 md:row-span-2" :
                i === 1 ? "md:col-span-2" :
                "md:col-span-2";
              const isFlagship = i === 0;
              return (
                <motion.div
                  key={p.title}
                  className={span}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                >
                  <Spotlight
                    as="a"
                    href={`/case-studies/${p.slug}`}
                    className={`group relative flex flex-col justify-between h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 bg-gradient-to-br ${p.color} ${isFlagship ? "p-6 sm:p-8" : "p-5 sm:p-6"}`}
                  >
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full">{p.cat}</span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full">{p.value}</span>
                    </div>
                    <div className="relative z-10 mt-4">
                      <p className="text-white/70 text-[10px] sm:text-xs">{p.client}</p>
                      <h3 className={`font-bold text-white leading-tight ${isFlagship ? "text-2xl sm:text-4xl mt-1" : "text-lg sm:text-xl"}`}>{p.title}</h3>
                      <p className={`text-white font-extrabold flex items-center gap-1.5 ${isFlagship ? "text-xl sm:text-3xl mt-3" : "text-base sm:text-lg mt-2"}`}>
                        <Gauge className={isFlagship ? "w-5 h-5" : "w-4 h-4"} />{p.metric}
                      </p>
                      {isFlagship && (
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {p.tech.map((t) => <span key={t} className="px-2.5 py-1 bg-white/15 backdrop-blur-sm text-white/90 text-[10px] sm:text-xs font-semibold rounded-lg">{t}</span>)}
                        </div>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1 text-white text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all">
                        View case study <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Spotlight>
                </motion.div>
              );
            })}
          </div>

          <FadeIn className="text-center mt-8 sm:mt-10">
            <Link href="/case-studies" className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-lg text-sm hover:-translate-y-1 transition-all">
              View All Case Studies <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ OUR PRODUCTS — persuasive intros ═══ */}
      <ProductIntros />

      {/* ═══ REMOTE MARKETING ═══ */}
      <RemoteMarketing />

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-14 sm:py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-warm-800 tracking-tight">Clients love <span className="text-peach-500">CODES AI</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-warm-100 border-l-4 border-l-peach-500 p-5 sm:p-7 relative h-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <span className="absolute top-2 right-4 text-5xl sm:text-6xl font-serif text-peach-200 leading-none">&ldquo;</span>
                  <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map((j) => <Star key={j} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />)}</div>
                  <p className="text-sm sm:text-base text-warm-700 leading-relaxed mb-5 relative z-10 font-medium">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-2.5 pt-4 border-t border-warm-100">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-peach-400 to-peach-600 flex items-center justify-center text-white font-bold text-[10px] shadow-md">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-warm-800">{t.name}</p>
                      <p className="text-[9px] sm:text-[10px] text-warm-400">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="py-14 sm:py-24 bg-gradient-to-br from-peach-50 via-white to-grape-100/40 relative overflow-hidden border-t border-warm-100">
        <div className="absolute top-0 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-peach-300/20 rounded-full blur-3xl" />
        <FadeIn className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-peach-400 to-peach-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl shadow-peach-500/25 animate-pulse-glow">
            <Send className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-warm-800 mb-3 sm:mb-5 tracking-tight">
            Let&apos;s build the future <span className="text-peach-500">together</span>
          </h2>
          <p className="text-sm sm:text-lg text-warm-600 max-w-lg mx-auto mb-6 sm:mb-10">Free consultation, project estimate, and roadmap — within 24 hours.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:info@codes-ai.uk" className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-peach-500 hover:bg-peach-600 text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg shadow-peach-500/25 text-sm hover:-translate-y-1 transition-all">
              <Mail className="w-4 h-4" /> info@codes-ai.uk <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:+447586094540" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-warm-200 text-warm-700 font-medium px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm hover:border-peach-300 hover:bg-peach-50 transition-all shadow-sm">
              <Phone className="w-4 h-4 text-peach-500" /> +44 7586 094540
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-warm-50 border-t border-warm-200 pt-10 sm:pt-14 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-10">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center"><Code2 className="w-4 h-4 text-white" /></div>
                <span className="font-bold text-warm-800 text-sm">CODES<span className="text-peach-500">AI</span></span>
              </div>
              <p className="text-[10px] sm:text-xs text-warm-500 leading-relaxed mb-2">AI-powered software, data engineering, and cloud computing.</p>
              <div className="text-[9px] sm:text-[10px] text-warm-500 space-y-0.5">
                <p className="font-semibold text-warm-700">CODES AI LIMITED</p>
                <p>Company No. 16078672</p>
                <p>97 Blenheim Road, Bolton</p>
                <p>England, BL2 6EL</p>
              </div>
            </div>
            {/* Services */}
            <div>
              <h4 className="text-[10px] sm:text-xs font-bold text-warm-800 mb-3">Services</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {[["Remote Sales & CRM", "/services/remote-sales-crm-ops"], ["Lead Generation", "/services/global-lead-generation"], ["Comms Desk", "/services/remote-communications-desk"], ["Finance Ops", "/services/remote-finance-invoicing-ops"], ["Team Enablement", "/services/remote-team-enablement"]].map(([l, h]) => (
                  <li key={l}><Link href={h} className="text-[10px] sm:text-xs text-warm-500 hover:text-peach-600 transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            {/* Products */}
            <div>
              <h4 className="text-[10px] sm:text-xs font-bold text-warm-800 mb-3">Products</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {[["SparkVibe", "https://vibe.codes-ai.uk"], ["ACCA — Remote Accounting", "https://acca.codes-ai.uk"], ["Artizai", "https://artizai.uk"]].map(([l, h]) => (
                  <li key={l}><a href={h} target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-xs text-warm-500 hover:text-peach-600 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            {/* Company */}
            <div>
              <h4 className="text-[10px] sm:text-xs font-bold text-warm-800 mb-3">Company</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {[["About CEO", "/about"], ["Case Studies", "/case-studies"], ["All Services", "/services"], ["Contact", "#contact"]].map(([l, h]) => (
                  <li key={l}><Link href={h} className="text-[10px] sm:text-xs text-warm-500 hover:text-peach-600 transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h4 className="text-[10px] sm:text-xs font-bold text-warm-800 mb-3">Contact</h4>
              <div className="space-y-2">
                <a href="mailto:info@codes-ai.uk" className="flex items-center gap-2"><Mail className="w-3 h-3 text-peach-500" /><span className="text-[10px] sm:text-xs text-warm-500">info@codes-ai.uk</span></a>
                <a href="tel:+447586094540" className="flex items-center gap-2"><Phone className="w-3 h-3 text-peach-500" /><span className="text-[10px] sm:text-xs text-warm-500">+44 7586 094540</span></a>
                <div className="flex items-center gap-2"><Globe className="w-3 h-3 text-peach-500" /><span className="text-[10px] sm:text-xs text-warm-500">codes-ai.uk</span></div>
              </div>
            </div>
          </div>
          <div className="pt-5 sm:pt-6 border-t border-warm-200 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[9px] sm:text-[10px] text-warm-500">&copy; 2026 CODES AI LIMITED (16078672). All rights reserved.</p>
            <div className="flex items-center gap-3 text-[9px] sm:text-[10px] text-warm-500">
              <span className="hover:text-peach-600 cursor-pointer">Privacy</span>
              <span className="hover:text-peach-600 cursor-pointer">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
