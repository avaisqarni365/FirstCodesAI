"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Users, Mail, Phone, Bot, Shield, Code2,
  Database, Cloud, LineChart, Globe, Star, CheckCircle2, Zap, Layers,
  Smartphone, Monitor, Braces, ChevronRight, MessageSquare, Award, Play,
  Sparkles, Menu, X, Terminal, Brain, CircuitBoard, Rocket, Lock, Server,
  Gauge, GitBranch, Eye, FileSearch, Cpu, Box, Send,
} from "lucide-react";

/* ════════════════════════════════════════════════
   UTILITY COMPONENTS
   ════════════════════════════════════════════════ */

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = target / 100;
    const t = setInterval(() => { v += step; if (v >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(v)); }, 16);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

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

// Animated floating particles
function Particles() {
  const particles = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 15, delay: Math.random() * 5,
  })), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full bg-peach-400/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

// Animated data packet flowing between nodes
function DataPacket({ delay = 0, vertical = false }: { delay?: number; vertical?: boolean }) {
  return (
    <motion.div
      className={`absolute ${vertical ? 'w-1.5 h-4' : 'w-4 h-1.5'} bg-gradient-to-r from-peach-400 to-amber-400 rounded-full shadow-lg shadow-peach-400/50`}
      animate={vertical ? { top: ["10%", "90%"] } : { left: ["10%", "90%"] }}
      transition={{ duration: 2, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

/* ════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════ */

const services = [
  { icon: Bot, title: "AI & Machine Learning", desc: "Custom AI models, intelligent chatbots, predictive analytics. Claude, GPT & bespoke LLM solutions.", tag: "POPULAR" },
  { icon: Database, title: "Data Engineering", desc: "Delta Lakehouse, ETL/ELT pipelines, real-time streaming. Azure, Databricks, Snowflake at enterprise scale.", tag: null },
  { icon: Cloud, title: "Cloud Architecture", desc: "Multi-cloud infrastructure. Serverless, Kubernetes, IaC. AWS, Azure, GCP — optimized for cost and speed.", tag: null },
  { icon: Monitor, title: "Web Applications", desc: "Next.js, React, TypeScript. Server-rendered, real-time, pixel-perfect responsive interfaces.", tag: null },
  { icon: Smartphone, title: "Mobile Development", desc: "React Native cross-platform apps. Offline-first, push notifications, native-like performance.", tag: null },
  { icon: Braces, title: "Custom Software", desc: "Bespoke CRM, ERP, SaaS platforms. Tailored to your exact business workflow from day one.", tag: null },
  { icon: LineChart, title: "Business Intelligence", desc: "Power BI & Tableau dashboards. Automated reports, KPI tracking, data-driven storytelling.", tag: null },
  { icon: Lock, title: "Cybersecurity", desc: "OWASP audits, penetration testing, SOC2/ISO compliance, zero-trust architecture design.", tag: null },
  { icon: Layers, title: "API & Integrations", desc: "REST, GraphQL, microservices. Third-party connectors, webhook orchestration, system unification.", tag: null },
];

const projects = [
  { title: "Enterprise Data Platform", client: "Anglian Water", value: "£85K", cat: "Data Engineering", tech: ["Databricks", "Microsoft Fabric", "PySpark"], color: "from-blue-600 to-cyan-500", metric: "250+ products controlled" },
  { title: "AI Development Framework", client: "CODES AI Internal", value: "£52K", cat: "AI & Automation", tech: ["Local LLMs", "Claude API", "Python"], color: "from-violet-600 to-purple-500", metric: "40% dev time reduction" },
  { title: "SAP-to-Azure Migration", client: "Carl Zeiss GmbH", value: "£120K", cat: "Cloud Migration", tech: ["Azure Synapse", "SAP CRM", "Power BI"], color: "from-emerald-600 to-teal-500", metric: "€120K/year savings" },
  { title: "IoT Sensor Analytics", client: "Hermes Logistics", value: "£65K", cat: "Real-Time Analytics", tech: ["Delta Lake", "Event Hubs", "Kafka"], color: "from-amber-600 to-orange-500", metric: "99.9% data accuracy" },
];

const testimonials = [
  { quote: "CODES AI delivered an exceptional data platform that transformed our operations. Their expertise in data engineering is truly world-class.", name: "James Whitfield", role: "IT Director", company: "Anglian Water" },
  { quote: "The AI automation suite saved us thousands of engineering hours and fundamentally changed how we approach software development.", name: "David Chen", role: "CTO", company: "TechCorp Ltd" },
  { quote: "Working with CODES AI has been a game-changer. The analytics platform they built exceeded every expectation we had.", name: "Sarah Chen", role: "CTO", company: "DataFlow Systems" },
];

const techStack = ["Python", "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Azure", "AWS", "Databricks", "Docker", "Kubernetes", "Claude AI", "PySpark", "Power BI", "Terraform", "Redis", "Delta Lake", "Snowflake"];

const clients = ["Anglian Water", "Carl Zeiss", "E.ON Energy", "Volkswagen AG", "Flaschenpost", "PlayMobil", "Hermes", "Siemens AG"];

/* ════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════ */

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════════ NAV ═══════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-warm-100/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/logo.svg" alt="CODES AI" width={160} height={40} priority className="h-9 w-auto" />
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {[["Process", "#process"], ["Services", "#services"], ["Architecture", "#architecture"], ["Work", "#portfolio"], ["About", "/about"]].map(([l, h]) => (
              <Link key={l} href={h} className="text-sm font-medium text-warm-500 hover:text-peach-600 transition-colors relative group">
                {l}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-peach-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-peach-500 to-peach-600 px-5 py-2.5 rounded-xl shadow-lg shadow-peach-300/30 hover:-translate-y-0.5 transition-all">
              Client Portal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2"><Menu className="w-5 h-5 text-warm-600" /></button>
          </div>
        </div>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden bg-white border-t px-6 py-4 space-y-3">
            {["Process", "Services", "Architecture", "Work"].map((i) => (
              <Link key={i} href={`#${i.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="block text-sm text-warm-600 py-2">{i}</Link>
            ))}
            <Link href="/about" onClick={() => setMobileMenu(false)} className="block text-sm text-warm-600 py-2">About CEO</Link>
            <Link href="/login" className="block text-center text-sm font-semibold text-white bg-peach-500 py-2.5 rounded-xl">Client Portal</Link>
          </motion.div>
        )}
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center pt-16 bg-gradient-to-b from-warm-900 via-[#1a1510] to-warm-900 overflow-hidden">
        <Particles />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(212,118,78,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,118,78,0.3) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full bg-peach-500/8 blur-[150px]" />
        <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] rounded-full bg-violet-500/8 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-mono font-semibold text-warm-300">// VIBE ENGINEERING STUDIO</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl sm:text-6xl lg:text-[68px] font-bold text-white leading-[1.05] tracking-tight">
                Stop writing code.
                <br />
                <span className="bg-gradient-to-r from-peach-400 via-amber-400 to-peach-300 bg-clip-text text-transparent">
                  Start directing
                </span>
                <br />
                <span className="text-warm-500"><TypeWriter words={["intelligence.", "automation.", "the future.", "AI agents."]} /></span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="mt-6 text-lg text-warm-400 leading-relaxed max-w-lg">
                We don&apos;t just build fast — we build <span className="text-peach-400 font-semibold">correctly</span>.
                Full-stack products with AI. <span className="text-warm-300">Claude + Cursor + Kimi</span> — shipping production-grade software at 10× speed.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                <Link href="#contact" className="group inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-peach-500/20 text-sm hover:-translate-y-1 hover:shadow-2xl transition-all">
                  Start Your Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/about" className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white font-medium px-8 py-4 rounded-2xl text-sm hover:bg-white/10 backdrop-blur-sm transition-all">
                  <Play className="w-4 h-4 text-peach-400" /> Meet the CEO
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                className="mt-10 flex items-center gap-6 text-sm text-warm-500">
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-500" /> NDA Protected</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> GDPR Compliant</span>
                <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-emerald-500" /> Company #16078672</span>
              </motion.div>
            </div>

            {/* TERMINAL */}
            <motion.div initial={{ opacity: 0, scale: 0.9, rotateY: -5 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="hidden lg:block perspective-1000">
              <div className="bg-[#0d0b09] rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.03]">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80" /><div className="w-3 h-3 rounded-full bg-amber-500/80" /><div className="w-3 h-3 rounded-full bg-emerald-500/80" /></div>
                  <span className="text-[10px] text-warm-600 ml-2 font-mono">codes-ai ~ vibe-build</span>
                </div>
                <div className="p-5 font-mono text-[13px] space-y-2.5 leading-relaxed">
                  {[
                    { delay: 0.8, content: <><span className="text-peach-400">$</span> <span className="text-emerald-400">claude</span> <span className="text-amber-300">&quot;Build a complete CRM with AI email marketing&quot;</span></> },
                    { delay: 1.3, content: <span className="text-warm-600">// Analyzing requirements with Claude Opus...</span> },
                    { delay: 1.8, content: <><span className="text-cyan-400">✦</span> <span className="text-warm-300">Architecting</span> <span className="text-warm-500">→ PostgreSQL schema, 19 models</span></> },
                    { delay: 2.2, content: <><span className="text-cyan-400">✦</span> <span className="text-warm-300">Generating</span> <span className="text-warm-500">→ API layer, 7 RESTful endpoints</span></> },
                    { delay: 2.6, content: <><span className="text-cyan-400">✦</span> <span className="text-warm-300">Building</span> <span className="text-warm-500">→ 22 React pages, shadcn/ui</span></> },
                    { delay: 3.0, content: <><span className="text-cyan-400">✦</span> <span className="text-warm-300">Testing</span> <span className="text-warm-500">→ Security audit passed, 0 vulnerabilities</span></> },
                    { delay: 3.4, content: <><span className="text-emerald-400">✓</span> <span className="text-emerald-400">Deployed</span> <span className="text-peach-400 underline">codes-ai.uk</span> <span className="text-warm-600">— zero downtime</span></> },
                    { delay: 3.8, content: <div className="pt-2 border-t border-white/5"><span className="text-warm-600">⏱ </span><span className="text-amber-400 font-bold">4 hours</span> <span className="text-warm-600">vs</span> <span className="text-warm-700 line-through">4 weeks</span> <span className="text-warm-600">traditional</span></div> },
                  ].map((line, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: line.delay }}>{line.content}</motion.div>
                  ))}
                </div>
              </div>
              {/* Stats under terminal */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[{ v: 92, s: "%", l: "Devs use AI daily" }, { v: 41, s: "%", l: "Code is AI-generated" }, { v: 55, s: "×", l: "Faster with AI" }].map((s, i) => (
                  <motion.div key={s.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.15 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                    <p className="text-xl font-bold text-peach-400"><Counter target={s.v} suffix={s.s} /></p>
                    <p className="text-[10px] text-warm-500 mt-1">{s.l}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronRight className="w-5 h-5 text-warm-600 rotate-90" />
        </motion.div>
      </section>

      {/* ═══════════ TECH MARQUEE ═══════════ */}
      <section className="py-3 bg-warm-50 border-y border-warm-100 overflow-hidden">
        <div className="flex animate-marquee gap-5" style={{ width: 'max-content' }}>
          {[...techStack, ...techStack, ...techStack].map((t, i) => (
            <div key={i} className="flex items-center gap-2 px-3.5 py-1.5 bg-white rounded-full border border-warm-100 shadow-sm whitespace-nowrap">
              <CircuitBoard className="w-3 h-3 text-peach-400" /><span className="text-xs font-semibold text-warm-600">{t}</span>
            </div>
          ))}
        </div>
        <style jsx>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-33.33%)}}.animate-marquee{animation:marquee 30s linear infinite}`}</style>
      </section>

      {/* ═══════════ CLIENTS ═══════════ */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-bold text-warm-400 uppercase tracking-[0.2em] mb-6">Trusted by Enterprise Leaders</p>
          <div className="flex flex-wrap justify-center gap-3">
            {clients.map((c) => (
              <motion.div key={c} whileHover={{ scale: 1.05 }} className="px-5 py-2 bg-warm-50 border border-warm-100 rounded-xl text-sm font-medium text-warm-600 hover:border-peach-200 hover:bg-peach-50/30 transition-all cursor-default">{c}</motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS — AI BUILD PIPELINE ═══════════ */}
      <section id="process" className="py-24 bg-gradient-to-b from-warm-900 to-[#0d0b09] relative overflow-hidden">
        <Particles />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-5 backdrop-blur-sm font-mono">
              <Terminal className="w-3.5 h-3.5 text-peach-400" />
              <span className="text-xs font-semibold text-warm-300">// THE AI-FIRST BUILD PROCESS</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">From idea to <span className="text-peach-400">production</span> in days</h2>
            <p className="mt-4 text-warm-400 max-w-xl mx-auto">Not months. Not weeks. Days. Here&apos;s exactly how our AI-first pipeline works.</p>
          </motion.div>

          {/* Animated Process Flow */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connection line with animated glow */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px]">
              <div className="w-full h-full bg-gradient-to-r from-violet-500/20 via-peach-500/40 to-emerald-500/20 rounded-full" />
              <motion.div className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-peach-400/60 to-transparent rounded-full"
                animate={{ left: ["0%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { n: "01", icon: Brain, title: "You Describe", desc: "Plain English requirements. No jargon needed.", color: "from-violet-500 to-purple-600", glow: "shadow-violet-500/20" },
                { n: "02", icon: Bot, title: "AI Architects", desc: "Claude designs schema, APIs, and system architecture.", color: "from-peach-500 to-peach-600", glow: "shadow-peach-500/20" },
                { n: "03", icon: Code2, title: "AI Builds", desc: "Cursor agent generates production code, file by file.", color: "from-blue-500 to-cyan-600", glow: "shadow-blue-500/20" },
                { n: "04", icon: Eye, title: "AI Reviews", desc: "Security audits, tests, code review — automated.", color: "from-amber-500 to-orange-600", glow: "shadow-amber-500/20" },
                { n: "05", icon: Rocket, title: "One-Click Deploy", desc: "CI/CD to production. Zero SSH. Zero config.", color: "from-emerald-500 to-green-600", glow: "shadow-emerald-500/20" },
              ].map((step, i) => (
                <motion.div key={step.n} initial={{ opacity: 0, y: 40, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12, type: "spring", stiffness: 100 }}
                  className="group relative">
                  <div className={`bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/[0.08] hover:border-peach-500/30 transition-all duration-500 h-full hover:-translate-y-2 shadow-xl ${step.glow}`}>
                    <span className="absolute top-3 right-3 text-3xl font-black text-white/[0.03] group-hover:text-peach-500/10 transition-colors">{step.n}</span>
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{step.title}</h3>
                    <p className="text-xs text-warm-500 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ ARCHITECTURE VISUALIZATION ═══════════ */}
      <section id="architecture" className="py-24 bg-[#FEFAF6]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-4">
              <CircuitBoard className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">// SYSTEM ARCHITECTURE</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-warm-800 tracking-tight">How our AI systems <span className="text-peach-500">work</span></h2>
          </motion.div>

          {/* Architecture Diagram */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white rounded-3xl border border-warm-100 p-8 sm:p-12 shadow-xl shadow-warm-100/50">

            {/* AI Tools Layer */}
            <div className="text-center mb-2">
              <span className="text-[10px] font-bold text-warm-400 uppercase tracking-widest">AI Development Tools</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { name: "Claude", desc: "Architecture & reasoning", icon: Brain, color: "from-peach-500 to-peach-600" },
                { name: "Cursor", desc: "Code generation", icon: Code2, color: "from-blue-500 to-violet-600" },
                { name: "Kimi", desc: "2M token context", icon: FileSearch, color: "from-emerald-500 to-teal-600" },
              ].map((tool) => (
                <motion.div key={tool.name} whileHover={{ scale: 1.03, y: -2 }}
                  className="bg-warm-50 rounded-xl p-4 border border-warm-100 text-center hover:border-peach-200 hover:shadow-lg transition-all cursor-default">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mx-auto mb-2 shadow-md`}>
                    <tool.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-bold text-warm-800">{tool.name}</p>
                  <p className="text-[10px] text-warm-500 mt-0.5">{tool.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Arrow down with data flow */}
            <div className="flex justify-center mb-6 relative h-10">
              <div className="w-0.5 h-full bg-peach-200 relative">
                <motion.div className="absolute w-2 h-2 bg-peach-500 rounded-full left-1/2 -translate-x-1/2 shadow-md shadow-peach-400/50"
                  animate={{ top: ["-4px", "calc(100% + 4px)"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
              </div>
              <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white px-2 text-[9px] font-bold text-peach-500 uppercase tracking-wider">generates</span>
            </div>

            {/* Application Stack */}
            <div className="space-y-3">
              {[
                { layer: "Frontend", tech: "Next.js • React • TypeScript • Tailwind", icon: Monitor, color: "border-blue-200 bg-blue-50/50", iconColor: "from-blue-500 to-blue-600" },
                { layer: "API Layer", tech: "Node.js • REST • Authentication • Validation", icon: Server, color: "border-violet-200 bg-violet-50/50", iconColor: "from-violet-500 to-violet-600" },
                { layer: "Database", tech: "PostgreSQL • Prisma ORM • 19 Models • ACID", icon: Database, color: "border-emerald-200 bg-emerald-50/50", iconColor: "from-emerald-500 to-emerald-600" },
              ].map((item, i) => (
                <div key={item.layer}>
                  <motion.div whileHover={{ scale: 1.01, x: 4 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border ${item.color} hover:shadow-md transition-all cursor-default`}>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.iconColor} flex items-center justify-center shadow-md shrink-0`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-warm-800">{item.layer}</p>
                      <p className="text-xs text-warm-500">{item.tech}</p>
                    </div>
                  </motion.div>
                  {i < 2 && (
                    <div className="flex justify-center h-3 relative">
                      <div className="w-0.5 h-full bg-warm-200 relative">
                        <motion.div className="absolute w-1.5 h-1.5 bg-warm-400 rounded-full left-1/2 -translate-x-1/2"
                          animate={{ top: ["-2px", "calc(100% + 2px)"] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Deployment */}
            <div className="flex justify-center mt-6 mb-4 relative h-10">
              <div className="w-0.5 h-full bg-warm-200 relative">
                <motion.div className="absolute w-2 h-2 bg-emerald-500 rounded-full left-1/2 -translate-x-1/2 shadow-md shadow-emerald-400/50"
                  animate={{ top: ["-4px", "calc(100% + 4px)"] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }} />
              </div>
              <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white px-2 text-[9px] font-bold text-emerald-600 uppercase tracking-wider">deploys to</span>
            </div>

            <motion.div whileHover={{ scale: 1.01 }}
              className="flex items-center gap-4 p-4 rounded-xl border border-peach-200 bg-gradient-to-r from-peach-50/50 to-amber-50/50 hover:shadow-md transition-all cursor-default">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-peach-500 to-peach-600 flex items-center justify-center shadow-md shrink-0">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-warm-800">Production — IONOS + Nginx + SSL</p>
                <p className="text-xs text-warm-500">CI/CD via GitHub Actions • PM2 Process Manager • Auto-scaling</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">// SERVICES</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-warm-800 tracking-tight">What we <span className="text-peach-500">build</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="group relative p-6 rounded-2xl bg-[#FEFAF6] border border-warm-100 hover:border-peach-200 hover:shadow-2xl hover:shadow-peach-100/40 transition-all duration-500 hover:-translate-y-2">
                {s.tag && <span className="absolute top-3 right-3 bg-gradient-to-r from-peach-500 to-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{s.tag}</span>}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-peach-50 to-peach-100 group-hover:from-peach-100 group-hover:to-peach-200 flex items-center justify-center mb-4 transition-all group-hover:scale-110">
                  <s.icon className="w-6 h-6 text-peach-600" />
                </div>
                <h3 className="text-base font-bold text-warm-800 mb-1.5">{s.title}</h3>
                <p className="text-sm text-warm-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="py-20 bg-gradient-to-r from-warm-800 via-warm-900 to-warm-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { v: 150, s: "+", l: "Projects Delivered", icon: CheckCircle2 },
              { v: 50, s: "+", l: "Enterprise Clients", icon: Users },
              { v: 12, s: "+", l: "Years Experience", icon: Award },
              { v: 98, s: "%", l: "Client Satisfaction", icon: Star },
            ].map((st, i) => (
              <motion.div key={st.l} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-peach-500/20 group-hover:border-peach-500/30 transition-all duration-300">
                  <st.icon className="w-7 h-7 text-peach-400" />
                </div>
                <p className="text-4xl font-bold text-white"><Counter target={st.v} suffix={st.s} /></p>
                <p className="text-sm text-warm-400 mt-1">{st.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PORTFOLIO ═══════════ */}
      <section id="portfolio" className="py-24 bg-[#FEFAF6]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-4">
              <Award className="w-3.5 h-3.5 text-peach-500" /><span className="text-xs font-semibold text-peach-700">// CASE STUDIES</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-warm-800 tracking-tight">Real projects, <span className="text-peach-500">real impact</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group rounded-3xl overflow-hidden border border-warm-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white">
                <div className={`h-48 bg-gradient-to-br ${p.color} p-7 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full">{p.cat}</span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full">{p.value}</span>
                  </div>
                  <div className="relative z-10">
                    <p className="text-white/70 text-xs">{p.client}</p>
                    <h3 className="text-xl font-bold text-white">{p.title}</h3>
                    <p className="text-white/80 text-[10px] mt-1 font-semibold flex items-center gap-1"><Gauge className="w-3 h-3" />{p.metric}</p>
                  </div>
                </div>
                <div className="p-5 flex flex-wrap gap-2">
                  {p.tech.map((t) => <span key={t} className="px-2.5 py-1 bg-warm-50 text-warm-600 text-xs font-semibold rounded-lg border border-warm-100">{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-warm-800 tracking-tight">Clients love <span className="text-peach-500">CODES AI</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#FEFAF6] rounded-3xl border border-warm-100 p-7 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative">
                <span className="absolute top-4 right-5 text-5xl font-serif text-peach-100 leading-none">&ldquo;</span>
                <div className="flex gap-0.5 mb-4">{[1,2,3,4,5].map((j) => <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}</div>
                <p className="text-sm text-warm-600 leading-relaxed mb-6 relative z-10">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-warm-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-peach-400 to-peach-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-peach-200">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-warm-800">{t.name}</p>
                    <p className="text-[10px] text-warm-400">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="py-24 bg-gradient-to-br from-warm-900 via-[#0d0b09] to-warm-900 relative overflow-hidden">
        <Particles />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div whileHover={{ rotate: 0 }} className="w-20 h-20 bg-gradient-to-br from-peach-400 to-peach-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-peach-500/20 rotate-3">
            <Send className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">Let&apos;s build the future <span className="text-peach-400">together</span></h2>
          <p className="text-warm-400 max-w-lg mx-auto mb-10 text-lg">Free consultation, project estimate, and a clear roadmap — within 24 hours.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:info@codes-ai.uk" className="group inline-flex items-center gap-3 bg-gradient-to-r from-peach-500 to-peach-400 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-peach-500/20 hover:-translate-y-1 transition-all text-sm">
              <Mail className="w-5 h-5" /> info@codes-ai.uk <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:+447586094540" className="inline-flex items-center gap-3 bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-2xl hover:bg-white/20 transition-all text-sm backdrop-blur-sm">
              <Phone className="w-5 h-5" /> +44 7586 094540
            </a>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-warm-900 pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <Image src="/logo-white.svg" alt="CODES AI" width={140} height={35} className="mb-4 h-8 w-auto" />
              <p className="text-xs text-warm-400 leading-relaxed mb-3">AI-powered software development, data engineering, and cloud computing.</p>
              <div className="text-[10px] text-warm-500 space-y-0.5">
                <p className="font-semibold text-warm-400">CODES AI LIMITED</p>
                <p>Company No. 16078672</p>
                <p>97 Blenheim Road, Bolton, England, BL2 6EL</p>
                <p>Inc. 13 November 2024</p>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-3">Services</h4>
              <ul className="space-y-2">{["AI & Machine Learning", "Data Engineering", "Cloud Solutions", "Web Development", "Mobile Apps", "Custom Software"].map((s) => (
                <li key={s}><span className="text-xs text-warm-400 hover:text-peach-400 transition-colors cursor-pointer">{s}</span></li>
              ))}</ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-3">Company</h4>
              <ul className="space-y-2">
                {[["About the CEO", "/about"], ["Case Studies", "#portfolio"], ["Our Process", "#process"], ["Contact", "#contact"]].map(([l, h]) => (
                  <li key={l}><Link href={h} className="text-xs text-warm-400 hover:text-peach-400 transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-3">Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-peach-400" /><span className="text-xs text-warm-400">info@codes-ai.uk</span></div>
                <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-peach-400" /><span className="text-xs text-warm-400">+44 7586 094540</span></div>
                <div className="flex items-center gap-2"><Globe className="w-3 h-3 text-peach-400" /><span className="text-xs text-warm-400">codes-ai.uk</span></div>
                <div className="flex items-start gap-2"><Server className="w-3 h-3 text-peach-400 mt-0.5" /><span className="text-xs text-warm-400">97 Blenheim Road, Bolton<br/>England, BL2 6EL</span></div>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-warm-700/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[10px] text-warm-600">&copy; 2026 CODES AI LIMITED (16078672). All rights reserved.</p>
            <div className="flex items-center gap-4 text-[10px] text-warm-600">
              <span className="hover:text-warm-400 cursor-pointer">Privacy</span>
              <span className="hover:text-warm-400 cursor-pointer">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
