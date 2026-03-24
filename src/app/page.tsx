"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Users,
  Mail,
  Phone,
  Bot,
  Shield,
  Code2,
  Database,
  Cloud,
  Cpu,
  LineChart,
  Globe,
  Star,
  CheckCircle2,
  Zap,
  Layers,
  Smartphone,
  Monitor,
  Braces,
  ChevronRight,
  MessageSquare,
  Award,
  Play,
  Sparkles,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

// ─── Animated Counter ───
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Floating Orbs ───
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-peach-200/40 to-peach-300/20 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-200/30 to-blue-200/20 blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-amber-100/20 to-peach-100/20 blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
    </div>
  );
}

// ─── Data ───
const services = [
  { icon: Bot, title: "AI & Machine Learning", description: "Custom AI models, intelligent chatbots, predictive analytics, and NLP solutions powered by Claude, GPT & custom models.", tag: "Most Popular" },
  { icon: Database, title: "Data Engineering", description: "End-to-end data pipelines, ETL workflows, data warehousing, and real-time streaming for enterprise operations.", tag: null },
  { icon: Cloud, title: "Cloud Solutions", description: "Multi-cloud architecture, serverless computing, Kubernetes orchestration, and cost optimization across AWS, Azure & GCP.", tag: null },
  { icon: Monitor, title: "Web Applications", description: "Lightning-fast web apps with Next.js, React & TypeScript. Server-side rendering, real-time features, and stunning UI.", tag: null },
  { icon: Smartphone, title: "Mobile Development", description: "Native iOS/Android and cross-platform apps with React Native. Offline-first, push notifications, and smooth UX.", tag: null },
  { icon: Braces, title: "Custom Software", description: "Bespoke CRM, ERP, SaaS platforms, and enterprise applications built from scratch to match your exact workflow.", tag: null },
  { icon: LineChart, title: "Business Intelligence", description: "Interactive dashboards, automated reporting, KPI tracking, and data visualization that drives smart decisions.", tag: null },
  { icon: Shield, title: "Cybersecurity", description: "Penetration testing, security audits, SOC2/ISO compliance, and zero-trust architecture implementation.", tag: null },
  { icon: Layers, title: "API & Integrations", description: "RESTful & GraphQL APIs, microservices, third-party integrations, and seamless system interconnectivity.", tag: null },
];

const projects = [
  { title: "Enterprise Data Platform", client: "Anglian Water", value: "£85K", category: "Data Engineering", tech: ["Python", "Azure", "Databricks"], color: "from-blue-600 to-cyan-500" },
  { title: "AI Automation Suite", client: "TechCorp Ltd", value: "£52K", category: "AI & ML", tech: ["Claude API", "FastAPI", "React"], color: "from-violet-600 to-purple-500" },
  { title: "Cloud Migration", client: "GreenEnergy UK", value: "£45K", category: "Cloud", tech: ["AWS", "Kubernetes", "Terraform"], color: "from-emerald-600 to-teal-500" },
  { title: "Payment Platform", client: "FinanceHub PLC", value: "£62K", category: "FinTech", tech: ["Node.js", "PostgreSQL", "Stripe"], color: "from-amber-600 to-orange-500" },
];

const testimonials = [
  { quote: "CODES AI delivered an exceptional data platform that transformed our operations. Their expertise in data engineering is truly world-class.", name: "James Whitfield", title: "IT Director", company: "Anglian Water Services", rating: 5 },
  { quote: "The AI automation suite is incredibly powerful. It saved us thousands of hours and fundamentally changed how we build software.", name: "David Chen", title: "CTO", company: "TechCorp Ltd", rating: 5 },
  { quote: "Working with CODES AI has been a game-changer. The analytics platform they built exceeded every expectation we had.", name: "Sarah Chen", title: "CTO", company: "DataFlow Systems", rating: 5 },
];

const techStack = [
  "Python", "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL",
  "AWS", "Azure", "Docker", "Kubernetes", "Terraform", "Claude AI",
  "FastAPI", "Redis", "GraphQL", "Prisma",
];

// ─── Component ───
export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ===== NAVIGATION ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-warm-100/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-peach-400 to-peach-600 rounded-xl flex items-center justify-center shadow-lg shadow-peach-200/50">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-warm-800 text-lg tracking-tight">CODES</span>
              <span className="font-bold text-peach-500 text-lg tracking-tight">AI</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {["Services", "Portfolio", "About", "Contact"].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-warm-500 hover:text-peach-600 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-peach-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-peach-500 to-peach-600 hover:from-peach-600 hover:to-peach-700 px-5 py-2.5 rounded-xl shadow-lg shadow-peach-300/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-peach-300/40">
              Client Portal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2 text-warm-600">
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden bg-white border-t border-warm-100 px-6 py-4 space-y-3">
            {["Services", "Portfolio", "About", "Contact"].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="block text-sm font-medium text-warm-600 py-2">{item}</Link>
            ))}
            <Link href="/login" className="block text-center text-sm font-semibold text-white bg-peach-500 px-5 py-2.5 rounded-xl">Client Portal</Link>
          </motion.div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <FloatingOrbs />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="max-w-7xl mx-auto px-6 py-20 lg:py-32 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-50 to-amber-50 border border-peach-200/60 rounded-full px-4 py-1.5 mb-8"
              >
                <Sparkles className="w-3.5 h-3.5 text-peach-500" />
                <span className="text-xs font-semibold text-peach-700">AI-Powered Software Company</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-warm-800 leading-[1.08] tracking-tight"
              >
                We build
                <br />
                <span className="bg-gradient-to-r from-peach-500 via-peach-400 to-amber-500 bg-clip-text text-transparent">intelligent</span>
                <br />
                software
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="mt-6 text-lg text-warm-500 leading-relaxed max-w-lg"
              >
                From AI automation to enterprise data platforms — we engineer
                software that transforms how businesses operate. Based in the UK, trusted worldwide.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="mt-10 flex flex-col sm:flex-row items-start gap-4"
              >
                <Link href="#contact"
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-600 hover:from-peach-600 hover:to-peach-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-peach-300/30 transition-all text-sm hover:-translate-y-1 hover:shadow-2xl hover:shadow-peach-300/40"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#portfolio"
                  className="inline-flex items-center gap-2 bg-white border border-warm-200 text-warm-600 hover:text-warm-800 hover:border-peach-300 font-medium px-8 py-4 rounded-2xl transition-all text-sm hover:shadow-lg group"
                >
                  <Play className="w-4 h-4 text-peach-500" />
                  See Our Work
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="mt-10 flex items-center gap-6 text-sm text-warm-400"
              >
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>NDA Protected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>GDPR Compliant</span>
                </div>
              </motion.div>
            </div>

            {/* Right - Bento Grid */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
              className="hidden lg:grid grid-cols-2 gap-3"
            >
              {/* Card 1 - Large */}
              <div className="col-span-2 bg-gradient-to-br from-warm-800 to-warm-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-peach-500/10 rounded-full blur-2xl group-hover:bg-peach-500/20 transition-all duration-700" />
                <Code2 className="w-8 h-8 text-peach-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Full-Stack Excellence</h3>
                <p className="text-warm-400 text-sm leading-relaxed">From backend architecture to pixel-perfect frontends — we handle the entire stack.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["React", "Next.js", "Python", "PostgreSQL"].map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-white/10 rounded-lg text-xs text-warm-300">{t}</span>
                  ))}
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-br from-peach-50 to-amber-50 rounded-3xl p-6 border border-peach-100 group hover:shadow-xl hover:shadow-peach-100/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-peach-400 to-peach-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-warm-800">AI-First</h4>
                <p className="text-xs text-warm-500 mt-1">Claude, GPT & custom ML models integrated into every solution.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-3xl p-6 border border-blue-100 group hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-warm-800">Cloud Native</h4>
                <p className="text-xs text-warm-500 mt-1">AWS, Azure & GCP. Serverless, containers & microservices.</p>
              </div>

              {/* Card 4 - Stats */}
              <div className="col-span-2 bg-white rounded-3xl p-6 border border-warm-100 shadow-sm">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-warm-800"><Counter target={150} suffix="+" /></p>
                    <p className="text-xs text-warm-400 mt-1">Projects</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-warm-800"><Counter target={98} suffix="%" /></p>
                    <p className="text-xs text-warm-400 mt-1">Satisfaction</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-warm-800"><Counter target={50} suffix="+" /></p>
                    <p className="text-xs text-warm-400 mt-1">Clients</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ===== TECH MARQUEE ===== */}
      <section className="py-6 bg-warm-50 border-y border-warm-100 overflow-hidden">
        <div className="flex animate-scroll gap-8" style={{ width: 'max-content' }}>
          {[...techStack, ...techStack].map((tech, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-warm-100 shadow-sm whitespace-nowrap">
              <Zap className="w-3 h-3 text-peach-400" />
              <span className="text-sm font-medium text-warm-600">{tech}</span>
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}</style>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-20 bg-gradient-to-br from-warm-800 via-warm-900 to-warm-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212,118,78,0.3) 0%, transparent 50%)'
        }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 150, suffix: "+", label: "Projects Delivered", icon: CheckCircle2 },
              { value: 50, suffix: "+", label: "Happy Clients", icon: Users },
              { value: 5, suffix: "+", label: "Years of Excellence", icon: Award },
              { value: 98, suffix: "%", label: "Client Satisfaction", icon: Star },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-peach-500/20 group-hover:border-peach-500/30 transition-all duration-300">
                  <stat.icon className="w-7 h-7 text-peach-400" />
                </div>
                <p className="text-4xl sm:text-5xl font-bold text-white"><Counter target={stat.value} suffix={stat.suffix} /></p>
                <p className="text-sm text-warm-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-24 bg-[#FEFAF6]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">What We Do</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-warm-800 tracking-tight">
              Services that <span className="text-peach-500">drive results</span>
            </h2>
            <p className="mt-4 text-warm-500 max-w-2xl mx-auto text-lg">
              End-to-end software solutions engineered to automate, scale, and innovate your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="group relative p-7 rounded-2xl bg-white border border-warm-100 hover:border-peach-200 hover:shadow-2xl hover:shadow-peach-100/40 transition-all duration-500 hover:-translate-y-2"
              >
                {service.tag && (
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-peach-500 to-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{service.tag}</span>
                )}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-peach-50 to-peach-100 group-hover:from-peach-100 group-hover:to-peach-200 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110">
                  <service.icon className="w-7 h-7 text-peach-600" />
                </div>
                <h3 className="text-lg font-bold text-warm-800 mb-2">{service.title}</h3>
                <p className="text-sm text-warm-500 leading-relaxed">{service.description}</p>
                <div className="mt-5 flex items-center gap-1 text-peach-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Learn more <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="relative bg-gradient-to-r from-warm-800 to-warm-900 rounded-3xl p-12 sm:p-16 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-peach-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to build something <span className="text-peach-400">extraordinary</span>?
              </h2>
              <p className="text-warm-400 max-w-xl mx-auto mb-8">
                Get a free consultation and project estimate. Our team responds within 24 hours.
              </p>
              <Link href="#contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-400 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-peach-900/20 hover:-translate-y-1 hover:shadow-2xl transition-all text-sm"
              >
                Book Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section id="portfolio" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-4">
              <Award className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">Our Work</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-warm-800 tracking-tight">
              Projects that <span className="text-peach-500">speak volumes</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div key={project.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group rounded-3xl overflow-hidden border border-warm-100 hover:shadow-2xl hover:shadow-warm-200/50 transition-all duration-500 hover:-translate-y-1 bg-white"
              >
                <div className={`h-52 bg-gradient-to-br ${project.color} p-8 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                  <div className="flex items-center justify-between">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      {project.category}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {project.value}
                    </span>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-medium">{project.client}</p>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 bg-warm-50 text-warm-600 text-xs font-semibold rounded-lg border border-warm-100">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-peach-500 text-sm font-semibold group-hover:gap-2 transition-all">
                    View Case Study <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="py-24 bg-[#FEFAF6]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-4">
              <MessageSquare className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">Testimonials</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-warm-800 tracking-tight">
              Loved by <span className="text-peach-500">industry leaders</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl border border-warm-100 p-8 hover:shadow-2xl hover:shadow-warm-100 transition-all duration-500 hover:-translate-y-1 relative"
              >
                {/* Large quote mark */}
                <span className="absolute top-6 right-6 text-6xl font-serif text-peach-100 leading-none">&ldquo;</span>
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed mb-8 relative z-10">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-5 border-t border-warm-100">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-peach-400 to-peach-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-peach-200">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-warm-800">{t.name}</p>
                    <p className="text-xs text-warm-400">{t.title}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-4">
                <Globe className="w-3.5 h-3.5 text-peach-500" />
                <span className="text-xs font-semibold text-peach-700">About Us</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-warm-800 tracking-tight mb-6">
                Why top companies
                <br />
                <span className="text-peach-500">choose us</span>
              </h2>
              <p className="text-warm-500 leading-relaxed mb-8 text-lg">
                CODES AI Private Limited is a UK-based technology company on a mission to make
                AI and enterprise software accessible to businesses of all sizes.
              </p>
              <div className="space-y-4">
                {[
                  "Expert team with deep AI, Data & Cloud expertise",
                  "Agile development with weekly progress demos",
                  "Transparent pricing — no hidden fees ever",
                  "Post-launch support & maintenance included",
                  "UK-based with 24/7 global delivery",
                  "NDA-secured, GDPR & ISO compliant",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3 group">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-sm text-warm-600 font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Bot, label: "AI & ML", desc: "Claude, GPT, Custom Models", gradient: "from-peach-400 to-peach-600" },
                  { icon: Database, label: "Data Engineering", desc: "Azure, AWS, Databricks", gradient: "from-blue-500 to-cyan-600" },
                  { icon: Cloud, label: "Cloud Native", desc: "AWS, Azure, GCP", gradient: "from-violet-500 to-purple-600" },
                  { icon: Code2, label: "Full Stack", desc: "React, Next.js, Node", gradient: "from-emerald-500 to-teal-600" },
                ].map((item, i) => (
                  <motion.div key={item.label} whileHover={{ scale: 1.05, rotate: 1 }}
                    className="p-8 bg-white rounded-3xl border border-warm-100 text-center hover:shadow-2xl hover:shadow-warm-100 transition-all duration-300 cursor-default"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="font-bold text-warm-800">{item.label}</p>
                    <p className="text-xs text-warm-400 mt-1">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-24 bg-gradient-to-br from-warm-800 via-warm-900 to-warm-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-peach-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto px-6 text-center relative z-10"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-peach-400 to-peach-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-peach-900/30 rotate-3 hover:rotate-0 transition-transform">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight">
            Let&apos;s build the future
            <br />
            <span className="text-peach-400">together</span>
          </h2>
          <p className="text-warm-400 max-w-lg mx-auto mb-10 text-lg">
            Free consultation, detailed project estimate, and a clear roadmap — within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:info@codes-ai.uk"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-peach-500 to-peach-400 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-peach-900/20 hover:-translate-y-1 hover:shadow-2xl transition-all text-sm"
            >
              <Mail className="w-5 h-5" />
              info@codes-ai.uk
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:+447586094540"
              className="inline-flex items-center gap-3 bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-2xl hover:bg-white/20 transition-all text-sm backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              +44 7586 094540
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-warm-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 bg-gradient-to-br from-peach-400 to-peach-600 rounded-xl flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-white text-lg">CODES</span>
                  <span className="font-bold text-peach-400 text-lg">AI</span>
                </div>
              </div>
              <p className="text-sm text-warm-400 leading-relaxed">
                AI-powered software solutions, data engineering, and cloud computing for businesses worldwide.
              </p>
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
                {["About Us", "Our Work", "Testimonials", "Contact", "Privacy Policy", "Terms"].map((s) => (
                  <li key={s}><span className="text-sm text-warm-400 hover:text-peach-400 transition-colors cursor-pointer">{s}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-4">Get in Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-peach-400" />
                  <span className="text-sm text-warm-400">info@codes-ai.uk</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-peach-400" />
                  <span className="text-sm text-warm-400">+44 7586 094540</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-peach-400" />
                  <span className="text-sm text-warm-400">codes-ai.uk</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-warm-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-warm-500">&copy; 2026 CODES AI Private Limited. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-warm-500">
              <span className="hover:text-warm-300 cursor-pointer">Privacy</span>
              <span className="hover:text-warm-300 cursor-pointer">Terms</span>
              <span className="hover:text-warm-300 cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
