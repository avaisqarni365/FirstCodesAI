"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, BarChart3, Users, Mail, Phone, Bot, Shield, Code2,
  Database, Cloud, Cpu, LineChart, Globe, Star, CheckCircle2, Zap, Layers,
  Smartphone, Monitor, Braces, ChevronRight, MessageSquare, Award, Play,
  Sparkles, Menu, X, Terminal, GitBranch, Workflow, Brain, CircuitBoard,
  Rocket, Target, Lock, Server, Gauge, FileCode, Boxes, Mic2,
} from "lucide-react";

// ── Animated Counter ──
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 120;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Typing Effect ──
function TypeWriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[index];
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length === word.length) setTimeout(() => setDeleting(true), 2000);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length === 0) { setDeleting(false); setIndex((i) => (i + 1) % words.length); }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);
  return <span>{text}<span className="animate-pulse text-peach-400">|</span></span>;
}

// ── Code Rain Background ──
function CodeRain() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='10' fill='%23D4764E'%3E%7B%7D%3C/text%3E%3Ctext x='30' y='40' font-family='monospace' font-size='10' fill='%23D4764E'%3E()%3C/text%3E%3Ctext x='5' y='55' font-family='monospace' font-size='10' fill='%23D4764E'%3E%3C/%3E%3C/text%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }} />
    </div>
  );
}

// ── Data ──
const heroStats = [
  { value: "92", suffix: "%", label: "Devs use AI daily" },
  { value: "41", suffix: "%", label: "Code is AI-generated" },
  { value: "55", suffix: "×", label: "Faster with AI tools" },
];

const processSteps = [
  { num: "01", icon: Brain, title: "Describe in English", desc: "You tell us what you need in plain language. No jargon required.", color: "from-violet-500 to-purple-600" },
  { num: "02", icon: Bot, title: "AI Architects It", desc: "Claude & custom AI models design the architecture, database, and API layer.", color: "from-peach-500 to-peach-600" },
  { num: "03", icon: Code2, title: "AI Builds It", desc: "Cursor agent mode generates production-ready code, file by file, feature by feature.", color: "from-blue-500 to-cyan-600" },
  { num: "04", icon: Shield, title: "AI Tests & Guards", desc: "Automated security audits, unit tests, and code review — before any human touches it.", color: "from-emerald-500 to-green-600" },
  { num: "05", icon: Rocket, title: "One-Click Deploy", desc: "Push to production with zero SSH, zero terminal. CI/CD pipelines manage themselves.", color: "from-amber-500 to-orange-600" },
];

const services = [
  { icon: Bot, title: "AI & Machine Learning", desc: "Custom models, chatbots, NLP, predictive analytics. Claude, GPT & bespoke solutions.", tag: "MOST POPULAR" },
  { icon: Database, title: "Data Engineering", desc: "ETL/ELT pipelines, Delta Lakehouse, real-time streaming. Azure, Databricks, Snowflake.", tag: null },
  { icon: Cloud, title: "Cloud Architecture", desc: "Multi-cloud (AWS/Azure/GCP), serverless, Kubernetes, Infrastructure as Code.", tag: null },
  { icon: Monitor, title: "Web Applications", desc: "Next.js, React, TypeScript. SSR, real-time features, pixel-perfect responsive UI.", tag: null },
  { icon: Smartphone, title: "Mobile Apps", desc: "React Native, iOS, Android. Offline-first, push notifications, native performance.", tag: null },
  { icon: Braces, title: "Custom Software", desc: "CRM, ERP, SaaS platforms. Built from scratch to match your exact business workflow.", tag: null },
  { icon: LineChart, title: "Business Intelligence", desc: "Power BI, Tableau dashboards. Automated reports, KPI tracking, data storytelling.", tag: null },
  { icon: Lock, title: "Cybersecurity", desc: "Pen testing, OWASP audits, SOC2/ISO compliance, zero-trust architecture.", tag: null },
  { icon: Layers, title: "API & Integration", desc: "REST, GraphQL, microservices, third-party connectors, webhook orchestration.", tag: null },
];

const projects = [
  { title: "Enterprise Data Platform", client: "Anglian Water", value: "£85K", cat: "Data Engineering", tech: ["Databricks", "Microsoft Fabric", "PySpark", "Power BI"], color: "from-blue-600 to-cyan-500", metric: "250+ products controlled" },
  { title: "AI Automation Suite", client: "TechCorp Ltd", value: "£52K", cat: "AI & ML", tech: ["Claude API", "Local LLMs", "FastAPI", "React"], color: "from-violet-600 to-purple-500", metric: "40% dev time reduction" },
  { title: "Cloud Migration", client: "GreenEnergy UK", value: "£45K", cat: "Cloud", tech: ["AWS", "Kubernetes", "Terraform", "Docker"], color: "from-emerald-600 to-teal-500", metric: "60% cost reduction" },
  { title: "FinTech Payment Platform", client: "FinanceHub PLC", value: "£62K", cat: "Custom Software", tech: ["Node.js", "PostgreSQL", "Redis", "Stripe"], color: "from-amber-600 to-orange-500", metric: "99.99% uptime" },
];

const testimonials = [
  { quote: "CODES AI delivered an exceptional data platform that transformed our operations. Their expertise is truly world-class.", name: "James Whitfield", role: "IT Director", company: "Anglian Water", },
  { quote: "The AI automation suite saved us thousands of hours. It fundamentally changed how we build software.", name: "David Chen", role: "CTO", company: "TechCorp Ltd", },
  { quote: "Working with CODES AI has been a game-changer. The analytics platform exceeded every expectation.", name: "Sarah Chen", role: "CTO", company: "DataFlow Systems", },
];

const techStack = ["Python", "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Azure", "AWS", "Databricks", "Docker", "Kubernetes", "Claude AI", "PySpark", "Power BI", "Terraform", "Redis"];

const clients = ["Anglian Water", "Carl Zeiss", "E.ON Energy", "Volkswagen AG", "Flaschenpost", "PlayMobil", "Hermes", "Siemens AG"];

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-warm-100/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-peach-400 to-peach-600 rounded-xl flex items-center justify-center shadow-lg shadow-peach-200/50">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-warm-800 text-lg tracking-tight">CODES</span>
            <span className="font-bold text-peach-500 text-lg tracking-tight -ml-1">AI</span>
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {[["Services", "#services"], ["Process", "#process"], ["Work", "#portfolio"], ["About", "/about"]].map(([label, href]) => (
              <Link key={label} href={href} className="text-sm font-medium text-warm-500 hover:text-peach-600 transition-colors relative group">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-peach-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-peach-500 to-peach-600 px-5 py-2.5 rounded-xl shadow-lg shadow-peach-300/30 transition-all hover:-translate-y-0.5">
              Client Portal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2 text-warm-600">
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden bg-white border-t border-warm-100 px-6 py-4 space-y-3">
            {["Services", "Process", "Work", "About"].map((item) => (
              <Link key={item} href={item === "About" ? "/about" : `#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="block text-sm font-medium text-warm-600 py-2">{item}</Link>
            ))}
            <Link href="/login" className="block text-center text-sm font-semibold text-white bg-peach-500 px-5 py-2.5 rounded-xl">Client Portal</Link>
          </motion.div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-b from-warm-900 via-warm-800 to-warm-900">
        <CodeRain />
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-peach-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[100px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px]" />

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm"
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-warm-300">// AI-FIRST DEVELOPMENT COMPANY</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Stop writing code.
                <br />
                <span className="bg-gradient-to-r from-peach-400 via-amber-400 to-peach-300 bg-clip-text text-transparent">
                  Start directing
                </span>
                <br />
                <span className="text-warm-400">
                  <TypeWriter words={["intelligence.", "automation.", "the future."]} />
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="mt-6 text-lg text-warm-400 leading-relaxed max-w-lg"
              >
                We build complete products with AI. No traditional coding limits.
                <span className="text-peach-400 font-medium"> Claude + Cursor + custom LLMs</span> — shipping production-grade software at 10× speed.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="mt-10 flex flex-col sm:flex-row items-start gap-4"
              >
                <Link href="#contact"
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-peach-500/20 transition-all text-sm hover:-translate-y-1 hover:shadow-2xl"
                >
                  Start Your Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#process"
                  className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white font-medium px-8 py-4 rounded-2xl transition-all text-sm hover:bg-white/10 backdrop-blur-sm"
                >
                  <Play className="w-4 h-4 text-peach-400" /> See How We Build
                </Link>
              </motion.div>
            </div>

            {/* Right — Terminal */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
              className="hidden lg:block"
            >
              <div className="bg-warm-900/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-warm-500 ml-2 font-mono">codes-ai — project.build()</span>
                </div>
                {/* Terminal body */}
                <div className="p-6 font-mono text-sm space-y-3">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    <span className="text-peach-400">{">"}</span> <span className="text-emerald-400">prompt</span><span className="text-warm-500">(</span><span className="text-amber-300">&quot;Build a complete CRM with AI email marketing&quot;</span><span className="text-warm-500">)</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                    <span className="text-warm-500">// Claude analyzing requirements...</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
                    <span className="text-cyan-400">✓</span> <span className="text-warm-300">Database schema generated</span> <span className="text-warm-500">— 19 models</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}>
                    <span className="text-cyan-400">✓</span> <span className="text-warm-300">API routes created</span> <span className="text-warm-500">— 7 endpoints</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>
                    <span className="text-cyan-400">✓</span> <span className="text-warm-300">UI components built</span> <span className="text-warm-500">— 22 pages</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
                    <span className="text-cyan-400">✓</span> <span className="text-warm-300">Tests passing</span> <span className="text-warm-500">— 100% coverage</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}>
                    <span className="text-emerald-400">⬆ Deployed to</span> <span className="text-peach-400 underline">codes-ai.uk</span> <span className="text-warm-500">— 0 downtime</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6 }} className="pt-2 border-t border-white/5">
                    <span className="text-warm-500">Total time:</span> <span className="text-amber-400 font-bold">4 hours</span> <span className="text-warm-500">| Traditional:</span> <span className="text-warm-600 line-through">4 weeks</span>
                  </motion.div>
                </div>
              </div>

              {/* Stats below terminal */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {heroStats.map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.15 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm"
                  >
                    <p className="text-2xl font-bold text-peach-400"><Counter target={parseInt(s.value)} suffix={s.suffix} /></p>
                    <p className="text-[10px] text-warm-400 mt-1">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-warm-500"
        >
          <ChevronRight className="w-6 h-6 rotate-90" />
        </motion.div>
      </section>

      {/* ═══ TECH MARQUEE ═══ */}
      <section className="py-4 bg-warm-50 border-y border-warm-100 overflow-hidden">
        <div className="flex animate-scroll gap-6" style={{ width: 'max-content' }}>
          {[...techStack, ...techStack, ...techStack].map((tech, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-warm-100 shadow-sm whitespace-nowrap">
              <CircuitBoard className="w-3 h-3 text-peach-400" />
              <span className="text-sm font-medium text-warm-600">{tech}</span>
            </div>
          ))}
        </div>
        <style jsx>{`@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-33.33%)}}.animate-scroll{animation:scroll 25s linear infinite}`}</style>
      </section>

      {/* ═══ CLIENTS ═══ */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-semibold text-warm-400 uppercase tracking-widest mb-8">Trusted by enterprise leaders</p>
          <div className="flex flex-wrap justify-center gap-4">
            {clients.map((c) => (
              <div key={c} className="px-5 py-2.5 bg-warm-50 border border-warm-100 rounded-xl text-sm font-medium text-warm-600 hover:border-peach-200 hover:bg-peach-50/50 transition-all">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section id="process" className="py-24 bg-gradient-to-b from-warm-900 to-warm-800 relative overflow-hidden">
        <CodeRain />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4 backdrop-blur-sm">
              <Terminal className="w-3.5 h-3.5 text-peach-400" />
              <span className="text-xs font-semibold text-warm-300 font-mono">// HOW WE BUILD</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              The AI-First <span className="text-peach-400">Build Process</span>
            </h2>
            <p className="mt-4 text-warm-400 max-w-2xl mx-auto text-lg">
              From idea to production in days, not months. Here&apos;s exactly how we do it.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {processSteps.map((step, i) => (
                <motion.div key={step.num} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-peach-500/30 transition-all duration-500 h-full hover:-translate-y-2">
                    <div className="text-4xl font-black text-white/5 absolute top-3 right-4 group-hover:text-peach-500/10 transition-colors">{step.num}</div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-warm-400 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-24 bg-[#FEFAF6]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">// SERVICES</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-warm-800 tracking-tight">
              What we <span className="text-peach-500">build</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="group relative p-7 rounded-2xl bg-white border border-warm-100 hover:border-peach-200 hover:shadow-2xl hover:shadow-peach-100/40 transition-all duration-500 hover:-translate-y-2"
              >
                {s.tag && (
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-peach-500 to-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse">{s.tag}</span>
                )}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-peach-50 to-peach-100 group-hover:from-peach-100 group-hover:to-peach-200 flex items-center justify-center mb-5 transition-all group-hover:scale-110">
                  <s.icon className="w-7 h-7 text-peach-600" />
                </div>
                <h3 className="text-lg font-bold text-warm-800 mb-2">{s.title}</h3>
                <p className="text-sm text-warm-500 leading-relaxed">{s.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-peach-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  Explore <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PORTFOLIO ═══ */}
      <section id="portfolio" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-4">
              <Award className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">// PORTFOLIO</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-warm-800 tracking-tight">
              Real projects, <span className="text-peach-500">real impact</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group rounded-3xl overflow-hidden border border-warm-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white"
              >
                <div className={`h-52 bg-gradient-to-br ${p.color} p-8 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute -left-5 -bottom-5 w-32 h-32 bg-black/10 rounded-full blur-2xl" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">{p.cat}</span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">{p.value}</span>
                  </div>
                  <div className="relative z-10">
                    <p className="text-white/70 text-sm">{p.client}</p>
                    <h3 className="text-2xl font-bold text-white">{p.title}</h3>
                    <p className="text-white/80 text-xs mt-1 font-semibold flex items-center gap-1"><Gauge className="w-3 h-3" />{p.metric}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 bg-warm-50 text-warm-600 text-xs font-semibold rounded-lg border border-warm-100">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 bg-[#FEFAF6]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-warm-800 tracking-tight">
              Clients love <span className="text-peach-500">CODES AI</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl border border-warm-100 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative"
              >
                <span className="absolute top-6 right-6 text-6xl font-serif text-peach-100 leading-none">&ldquo;</span>
                <div className="flex gap-1 mb-5">
                  {[1,2,3,4,5].map((j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-warm-600 leading-relaxed mb-8 relative z-10">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-5 border-t border-warm-100">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-peach-400 to-peach-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-peach-200">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-warm-800">{t.name}</p>
                    <p className="text-xs text-warm-400">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="py-24 bg-gradient-to-br from-warm-800 via-warm-900 to-warm-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-peach-500/5 rounded-full blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-peach-400 to-peach-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3 hover:rotate-0 transition-transform">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight">
            Let&apos;s build the future <span className="text-peach-400">together</span>
          </h2>
          <p className="text-warm-400 max-w-lg mx-auto mb-10 text-lg">Free consultation, project estimate, and a clear roadmap — within 24 hours.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:info@codes-ai.uk" className="group inline-flex items-center gap-3 bg-gradient-to-r from-peach-500 to-peach-400 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-sm">
              <Mail className="w-5 h-5" /> info@codes-ai.uk <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:+447586094540" className="inline-flex items-center gap-3 bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-2xl hover:bg-white/20 transition-all text-sm backdrop-blur-sm">
              <Phone className="w-5 h-5" /> +44 7586 094540
            </a>
          </div>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-warm-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 bg-gradient-to-br from-peach-400 to-peach-600 rounded-xl flex items-center justify-center"><Code2 className="w-5 h-5 text-white" /></div>
                <span className="font-bold text-white text-lg">CODES <span className="text-peach-400">AI</span></span>
              </div>
              <p className="text-sm text-warm-400 leading-relaxed mb-3">AI-powered software development, data engineering, and cloud computing.</p>
              <div className="text-xs text-warm-500 space-y-1">
                <p className="font-semibold text-warm-400">CODES AI LIMITED</p>
                <p>Company No. 16078672</p>
                <p>97 Blenheim Road, Bolton</p>
                <p>England, BL2 6EL</p>
                <p>Incorporated: 13 November 2024</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2.5">
                {["AI & Machine Learning", "Data Engineering", "Cloud Solutions", "Web Development", "Mobile Apps", "Custom Software"].map((s) => (
                  <li key={s}><span className="text-sm text-warm-400 hover:text-peach-400 transition-colors cursor-pointer">{s}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2.5">
                {[["About the CEO", "/about"], ["Our Work", "#portfolio"], ["Testimonials", "#testimonials"], ["Contact", "#contact"]].map(([label, href]) => (
                  <li key={label}><Link href={href} className="text-sm text-warm-400 hover:text-peach-400 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-peach-400" /><span className="text-sm text-warm-400">info@codes-ai.uk</span></div>
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-peach-400" /><span className="text-sm text-warm-400">+44 7586 094540</span></div>
                <div className="flex items-center gap-3"><Globe className="w-4 h-4 text-peach-400" /><span className="text-sm text-warm-400">codes-ai.uk</span></div>
                <div className="flex items-start gap-3"><Server className="w-4 h-4 text-peach-400 mt-0.5" /><span className="text-sm text-warm-400">97 Blenheim Road, Bolton, England, BL2 6EL</span></div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-warm-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-warm-500">&copy; 2026 CODES AI LIMITED (Company No. 16078672). All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-warm-500">
              <span className="hover:text-warm-300 cursor-pointer">Privacy</span>
              <span className="hover:text-warm-300 cursor-pointer">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
