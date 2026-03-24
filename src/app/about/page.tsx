"use client";

import Link from "next/link";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Code2, ArrowRight, Award, Building2, Calendar, CheckCircle2, Cloud,
  Database, Globe, GraduationCap, Layers, Mail, MapPin, Phone,
  Star, TrendingUp, Zap, Bot, LineChart, Shield, Briefcase,
  ChevronRight, ArrowUpRight, Menu, X, Server, Workflow,
  CircuitBoard, Rocket,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════ */
function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
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
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   PARTICLE BACKGROUND
   ═══════════════════════════════════════════════════════════════ */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-peach-400/20"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
const stats = [
  { value: 12, suffix: "+", label: "Years Experience", icon: Calendar },
  { value: 40, suffix: "%", label: "Dev Time Reduction", icon: Zap },
  { value: 99, suffix: ".9%", label: "Data Accuracy", icon: Shield },
  { value: 120, suffix: "K", prefix: "\u20AC", label: "Annual Client Savings", icon: TrendingUp },
];

const expertise = [
  {
    category: "Cloud Platforms",
    icon: Cloud,
    gradient: "from-blue-500 to-cyan-500",
    items: ["Azure Synapse", "Data Factory", "Data Lake", "Event Hubs", "DevOps", "Functions", "Microsoft Fabric", "AWS"],
  },
  {
    category: "Data Platforms",
    icon: Database,
    gradient: "from-violet-500 to-purple-500",
    items: ["Databricks", "Delta Lake", "Snowflake", "Azure Synapse SQL Pools"],
  },
  {
    category: "Programming & ETL",
    icon: Code2,
    gradient: "from-emerald-500 to-teal-500",
    items: ["Python", "PySpark", "SQL", "Scala", "R"],
  },
  {
    category: "AI & Automation",
    icon: Bot,
    gradient: "from-peach-500 to-peach-600",
    items: ["Local LLMs", "Claude", "AI-Assisted Development", "Automated Pipeline Generation"],
  },
  {
    category: "Visualization & BI",
    icon: LineChart,
    gradient: "from-amber-500 to-orange-500",
    items: ["Power BI Pro/Premium", "Tableau", "SAP BusinessObjects"],
  },
  {
    category: "Enterprise & DevOps",
    icon: Server,
    gradient: "from-rose-500 to-pink-500",
    items: ["SAP S/4HANA", "SAP BW", "Microsoft Dynamics 365", "Docker", "Kubernetes", "Terraform", "CI/CD"],
  },
];

const career = [
  { period: "11/2025 \u2013 Present", role: "CEO & Founder", company: "CODES AI LIMITED", companyNo: "16078672", location: "London, UK", highlight: "Pioneered AI-assisted development framework using local LLMs. Automated data warehouse design, ETL pipelines, and cloud infrastructure code. 40% development time reduction.", color: "from-peach-500 to-peach-600", isCurrent: true },
  { period: "11/2024 \u2013 07/2025", role: "Senior Data Engineer", company: "TRANSFORM UK (Anglian Water)", location: "UK", highlight: "Microsoft Fabric & Databricks. Controlled 250+ products as framework. Built Curated & Gold Layer. Delta-Parquet in OneLake.", color: "from-blue-500 to-blue-600" },
  { period: "11/2023 \u2013 11/2024", role: "Senior Data Engineer", company: "Delta Lakehouse Project", location: "UK", highlight: "Billions of sensor JSON files. ACID-compliant Delta Lake. 40% query optimization. Power BI dashboards.", color: "from-violet-500 to-violet-600" },
  { period: "03/2022 \u2013 11/2023", role: "Senior Data Engineer", company: "Flaschenpost GmbH", location: "Germany", highlight: "Microsoft Dynamics 365 Azure migration. SSIS to Azure Cloud. 50% faster reporting.", color: "from-emerald-500 to-emerald-600" },
  { period: "03/2022 \u2013 10/2024", role: "BI Consultant", company: "Carl Zeiss GmbH (via SOLOCOM)", location: "Germany", highlight: "Customer 360 analytics. SAP CRM/ERP with Azure Synapse. 40% faster reporting.", color: "from-cyan-500 to-cyan-600" },
  { period: "09/2021 \u2013 03/2022", role: "Senior Data Engineer", company: "E.ON Energy", location: "Germany", highlight: "Global survey dashboard, 2000+ columns. Row Level Security in Power BI. 99.5% accuracy.", color: "from-amber-500 to-amber-600" },
  { period: "07/2021 \u2013 04/2022", role: "Senior Data Engineer", company: "Hays (PlayMobil/ISMO)", location: "Germany", highlight: "80K+ JSON files daily. Global Sales Dashboard. Amazon, Print, TV & Social Media data.", color: "from-rose-500 to-rose-600" },
  { period: "01/2020 \u2013 06/2021", role: "Senior Data Specialist", company: "Hermes (via Artizan)", location: "UK", highlight: "Azure data platform for sensor analytics. Delta Lake optimization. 30% Azure cost reduction.", color: "from-indigo-500 to-indigo-600" },
  { period: "08/2019 \u2013 01/2020", role: "Senior BI Consultant", company: "Sycor GmbH", location: "Germany", highlight: "D365 Finance & Operations, D365 Retail. BYOD & Azure Data Lake. ML algorithms in Azure.", color: "from-sky-500 to-sky-600" },
  { period: "2017 \u2013 08/2019", role: "Senior Software Specialist", company: "Dornbracht GmbH", location: "Germany", highlight: "Sales & Margin, Finance analytics. Star/Snowflake schemas. 30% faster reconciliations.", color: "from-teal-500 to-teal-600" },
  { period: "2013 \u2013 2015", role: "DWH/BI Consultant", company: "Adastra GmbH (Volkswagen AG)", location: "Germany", highlight: "Enterprise DWH for VW VSC/BDW. SAP BusinessObjects. Informatica PowerCenter. 99.9% workflow success.", color: "from-orange-500 to-orange-600" },
  { period: "2011 \u2013 2012", role: "Research Assistant", company: "Siemens AG, Corporate Technology", location: "Munich, Germany", highlight: "Cloud-integrated DWH architectures. Azure, AWS, SAP BIOD research.", color: "from-gray-500 to-gray-600" },
  { period: "2009 \u2013 2010", role: "IT Developer (Student)", company: "Via Software GmbH", location: "Germany", highlight: "Java J2EE, PHP4, JavaScript development.", color: "from-slate-500 to-slate-600" },
];

const achievements = [
  { icon: Bot, title: "AI Development Framework", stat: "40%", statLabel: "faster development", description: "Pioneered AI-assisted development using local LLMs to automate data warehouse design, ETL pipelines, and cloud infrastructure code." },
  { icon: Database, title: "Delta Lakehouse at Scale", stat: "99.9%", statLabel: "data accuracy", description: "Built Delta Lakehouse for billions of sensor JSON files with ACID compliance and 60% faster runtime." },
  { icon: TrendingUp, title: "SAP-to-Azure Integration", stat: "\u20AC120K", statLabel: "annual savings", description: "SAP-to-Azure integrations for Carl Zeiss, E.ON, VW delivering 50% faster analytics." },
  { icon: Zap, title: "Real-Time IoT Streaming", stat: "99%", statLabel: "real-time processing", description: "Event Hubs, Kafka, and Databricks streaming pipelines for enterprise IoT data." },
  { icon: Layers, title: "Microsoft Fabric at Scale", stat: "250+", statLabel: "products controlled", description: "Designed Microsoft Fabric solutions controlling 250+ products with automated ETL/ELT architecture." },
  { icon: LineChart, title: "TB-Scale Optimization", stat: "40%", statLabel: "cost reduction", description: "Optimized terabyte-scale data with advanced partitioning achieving 40% query performance improvements." },
];

const clients = [
  "Anglian Water", "Carl Zeiss", "E.ON Energy", "Volkswagen AG",
  "Flaschenpost", "PlayMobil", "Hermes", "Siemens AG",
];

const education = [
  { degree: "M.Sc. E-Business", school: "University of Applied Sciences, Fulda", country: "Germany", year: "2012" },
  { degree: "M.Sc. Informatics", school: "University of Central Punjab", country: "Pakistan", year: "2005" },
  { degree: "B.Sc. Informatics", school: "B.Z.U. University, Multan", country: "Pakistan", year: "2002" },
];

/* ═══════════════════════════════════════════════════════════════
   MEDALLION ARCHITECTURE ANIMATION
   ═══════════════════════════════════════════════════════════════ */
function MedallionArchitecture() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const layers = [
    {
      title: "Landing Zone",
      subtitle: "Bronze Layer",
      icon: Server,
      description: "Raw data ingestion from IoT sensors, SAP, APIs, JSON files",
      color: "from-amber-600 to-yellow-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-700",
      items: ["IoT Sensors", "SAP S/4HANA", "REST APIs", "JSON / CSV"],
    },
    {
      title: "Curated Layer",
      subtitle: "Silver Layer",
      icon: Workflow,
      description: "Cleansed, validated, and conformed data with Delta Lake ACID",
      color: "from-slate-400 to-gray-500",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      textColor: "text-gray-700",
      items: ["Data Validation", "Schema Enforcement", "Delta Lake ACID", "PySpark ETL"],
    },
    {
      title: "Serving Layer",
      subtitle: "Gold Layer",
      icon: Star,
      description: "Business-ready aggregations, KPIs, and ML-ready feature stores",
      color: "from-yellow-400 to-amber-400",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
      items: ["Power BI Dashboards", "ML Feature Store", "KPI Aggregations", "Real-Time APIs"],
    },
  ];

  return (
    <div ref={ref} className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 relative">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.title}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: i * 0.25, duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            {/* Animated arrow between layers (desktop) */}
            {i < layers.length - 1 && (
              <motion.div
                className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 items-center"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.3, duration: 0.5 }}
              >
                <div className="relative flex items-center">
                  {/* Animated flowing dots */}
                  <motion.div
                    className="w-2 h-2 rounded-full bg-peach-500"
                    animate={inView ? {
                      x: [0, 24, 0],
                      opacity: [1, 0.5, 1],
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  />
                  <div className="w-4 h-0.5 bg-gradient-to-r from-peach-400 to-peach-500" />
                  <ChevronRight className="w-4 h-4 text-peach-500 -ml-1" />
                </div>
              </motion.div>
            )}

            {/* Animated arrow between layers (mobile) */}
            {i < layers.length - 1 && (
              <motion.div
                className="lg:hidden flex justify-center my-2"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.3 }}
              >
                <motion.div
                  animate={inView ? { y: [0, 6, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-5 h-5 text-peach-500 rotate-90" />
                </motion.div>
              </motion.div>
            )}

            <div className={`${layer.bgColor} ${layer.borderColor} border rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden`}>
              {/* Subtle shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]" style={{ transition: "transform 0.7s" }} />

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <layer.icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-warm-800">{layer.title}</h3>
                  <span className={`text-[10px] font-bold ${layer.textColor} ${layer.bgColor} px-2 py-0.5 rounded-full border ${layer.borderColor}`}>
                    {layer.subtitle}
                  </span>
                </div>

                <p className="text-sm text-warm-500 mb-4">{layer.description}</p>

                <div className="space-y-2">
                  {layer.items.map((item, j) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.25 + j * 0.08 }}
                      className="flex items-center gap-2 text-xs text-warm-600"
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${layer.textColor}`} />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Data Flow Label */}
      <motion.div
        className="hidden lg:flex justify-center mt-6"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-center gap-3 bg-warm-800 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-xl">
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Workflow className="w-4 h-4 text-peach-400" />
          </motion.div>
          Automated Data Flow Pipeline
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <ArrowRight className="w-4 h-4 text-peach-400" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeExpertise, setActiveExpertise] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Stagger animation variants
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══ NAVIGATION ═══ */}
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
          <div className="hidden lg:flex items-center gap-8">
            {[["Services", "/#services"], ["Our Work", "/#portfolio"], ["About", "/about"], ["Contact", "/#contact"]].map(([label, href]) => (
              <Link key={label} href={href} className={`text-sm font-medium transition-colors relative group ${label === "About" ? "text-peach-600" : "text-warm-500 hover:text-peach-600"}`}>
                {label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-peach-500 transition-all duration-300 ${label === "About" ? "w-full" : "w-0 group-hover:w-full"}`} />
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
        <AnimatePresence>
          {mobileMenu && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="lg:hidden bg-white border-t border-warm-100 px-6 py-4 space-y-3">
              {[["Services", "/#services"], ["Our Work", "/#portfolio"], ["About", "/about"], ["Contact", "/#contact"]].map(([label, href]) => (
                <Link key={label} href={href} onClick={() => setMobileMenu(false)} className="block text-sm font-medium text-warm-600 py-2">{label}</Link>
              ))}
              <Link href="/login" className="block text-center text-sm font-semibold text-white bg-peach-500 px-5 py-2.5 rounded-xl">Client Portal</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden bg-gradient-to-br from-warm-900 via-warm-800 to-warm-900">
        <FloatingParticles />
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-peach-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-500/8 blur-[100px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* Left - Profile */}
            <div className="lg:col-span-3">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm"
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-warm-300">Meet the Founder</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Avais Ahmad
                <br />
                <span className="bg-gradient-to-r from-peach-400 via-amber-400 to-peach-300 bg-clip-text text-transparent">
                  Qarni
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-3 text-xl text-warm-300 font-medium"
              >
                CEO & Founder, CODES AI LIMITED{" "}
                <span className="text-warm-500 text-sm">(Company No. 16078672)</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-6 text-warm-400 leading-relaxed max-w-2xl text-lg"
              >
                Senior Data Engineer with{" "}
                <strong className="text-white font-semibold">12+ years</strong> of experience
                designing and optimising large-scale data platforms across Azure, Databricks, and
                enterprise ecosystems. Proven track record of building scalable ETL/ELT pipelines,
                Delta Lakehouse architectures, and delivering real-time analytics solutions that
                drive measurable business value for global enterprises.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-warm-400"
              >
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-peach-400" /> London, UK
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-peach-400" /> German Nationality
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-peach-400" /> +44 7586 094540
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-peach-400" /> Dual M.Sc.
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a href="mailto:info@codes-ai.uk" className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-400 text-white font-semibold px-7 py-3.5 rounded-xl shadow-xl shadow-peach-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-peach-500/30 transition-all duration-300 text-sm">
                  <Mail className="w-4 h-4" /> Get in Touch
                </a>
                <Link href="/#portfolio" className="inline-flex items-center gap-2 bg-white/5 border border-white/15 text-white font-medium px-7 py-3.5 rounded-xl hover:bg-white/10 transition-all text-sm backdrop-blur-sm">
                  View Projects <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* Right - Profile Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-2"
            >
              <div className="relative">
                {/* Glow effect behind card */}
                <div className="absolute -inset-4 bg-gradient-to-br from-peach-500/20 to-violet-500/10 rounded-[2rem] blur-2xl" />

                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                  {/* Monogram */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 bg-gradient-to-br from-peach-400 to-peach-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-peach-500/30 text-4xl font-bold text-white"
                  >
                    AQ
                  </motion.div>

                  <div className="text-center mt-5">
                    <h2 className="text-xl font-bold text-white">Avais Ahmad Qarni</h2>
                    <p className="text-sm text-peach-400 font-medium mt-1">CEO & Founder</p>
                  </div>

                  {/* Languages */}
                  <div className="flex justify-center gap-2 mt-4">
                    {[
                      { lang: "English", level: "Excellent" },
                      { lang: "German", level: "B1" },
                      { lang: "Urdu", level: "Native" },
                    ].map((l) => (
                      <span key={l.lang} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-warm-300">
                        {l.lang} <span className="text-peach-400">{l.level}</span>
                      </span>
                    ))}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {stats.map((s, i) => (
                      <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="text-center p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group"
                      >
                        <s.icon className="w-4 h-4 text-peach-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
                        <p className="text-xl font-bold text-white">
                          <Counter target={s.value} suffix={s.suffix} prefix={s.prefix} />
                        </p>
                        <p className="text-[10px] text-warm-400 mt-0.5">{s.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5 justify-center">
                    {["Azure", "Databricks", "AI/ML", "Python", "SAP", "Power BI"].map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-white/5 rounded-lg text-xs text-warm-300 border border-white/5 hover:border-peach-400/30 hover:text-peach-300 transition-colors cursor-default">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-peach-400"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══ KEY ACHIEVEMENTS ═══ */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-peach-100/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-5">
              <Award className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">Key Achievements</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-800 tracking-tight">
              Impact that <span className="text-peach-500">speaks volumes</span>
            </h2>
            <p className="mt-4 text-warm-500 max-w-2xl mx-auto">
              Delivering measurable business outcomes for enterprises across the UK and Europe.
            </p>
          </motion.div>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {achievements.map((a) => (
              <motion.div key={a.title} variants={item}
                className="group relative p-6 rounded-2xl bg-[#FEFAF6] border border-warm-100 hover:border-peach-200 hover:shadow-2xl hover:shadow-peach-100/40 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-peach-50/0 to-peach-100/0 group-hover:from-peach-50/50 group-hover:to-peach-100/30 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-peach-50 to-peach-100 group-hover:from-peach-100 group-hover:to-peach-200 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <a.icon className="w-6 h-6 text-peach-600" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-peach-500 group-hover:scale-105 transition-transform origin-right">{a.stat}</p>
                      <p className="text-[10px] text-warm-400 uppercase tracking-wider">{a.statLabel}</p>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-warm-800 mb-2">{a.title}</h3>
                  <p className="text-sm text-warm-500 leading-relaxed">{a.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ ENTERPRISE CLIENTS ═══ */}
      <section className="py-16 bg-gradient-to-br from-warm-800 via-warm-900 to-warm-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-peach-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-sm font-semibold text-warm-400 uppercase tracking-[0.2em] mb-10"
          >
            Trusted by Industry Leaders
          </motion.p>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {clients.map((c) => (
              <motion.div key={c} variants={item} whileHover={{ scale: 1.05, y: -2 }}
                className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-medium text-sm hover:bg-white/10 hover:border-peach-400/30 transition-all cursor-default backdrop-blur-sm"
              >
                <Building2 className="w-4 h-4 inline mr-2 text-peach-400" />{c}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ DATA ENGINEERING PROCESS (Medallion Architecture) ═══ */}
      <section className="py-24 bg-[#FEFAF6] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-peach-100/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-100/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-5">
              <Workflow className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">Data Engineering Process</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-800 tracking-tight">
              Medallion <span className="text-peach-500">Architecture</span>
            </h2>
            <p className="mt-4 text-warm-500 max-w-2xl mx-auto">
              A battle-tested data flow pattern used to process billions of records across
              Azure, Databricks, and Delta Lake for enterprises like Anglian Water and Volkswagen AG.
            </p>
          </motion.div>

          <MedallionArchitecture />
        </div>
      </section>

      {/* ═══ TECHNICAL EXPERTISE ═══ */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-5">
              <CircuitBoard className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">Technical Expertise</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-800 tracking-tight">
              Full-stack <span className="text-peach-500">data mastery</span>
            </h2>
            <p className="mt-4 text-warm-500 max-w-2xl mx-auto">
              Deep expertise across the entire modern data stack, from cloud infrastructure to AI automation.
            </p>
          </motion.div>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {expertise.map((group, i) => (
              <motion.div
                key={group.category}
                variants={item}
                onMouseEnter={() => setActiveExpertise(i)}
                onMouseLeave={() => setActiveExpertise(null)}
                className={`relative bg-[#FEFAF6] rounded-2xl border p-6 transition-all duration-500 cursor-default ${activeExpertise === i ? "border-peach-200 shadow-2xl shadow-peach-100/40 -translate-y-2 scale-[1.02]" : "border-warm-100 hover:border-peach-200 hover:shadow-lg"}`}
              >
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-warm-100">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 ${activeExpertise === i ? "scale-110 rotate-3" : ""}`}>
                    <group.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-warm-800">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech, j) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.03 }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-300 cursor-default ${activeExpertise === i ? "bg-peach-50 border-peach-200 text-peach-700 shadow-sm" : "bg-warm-50 border-warm-100 text-warm-600 hover:border-peach-200 hover:bg-peach-50 hover:text-peach-700"}`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CAREER TIMELINE ═══ */}
      <section className="py-24 bg-[#FEFAF6] relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-peach-100/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-5">
              <Briefcase className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">Career Journey</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-800 tracking-tight">
              12+ years of <span className="text-peach-500">excellence</span>
            </h2>
            <p className="mt-4 text-warm-500 max-w-2xl mx-auto">
              From research at Siemens AG to founding CODES AI, a journey driven by data engineering innovation.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-peach-300 via-warm-200 to-warm-200 hidden sm:block" />

            <div className="space-y-5">
              {career.map((job, i) => (
                <motion.div
                  key={`${job.company}-${job.period}`}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.04, duration: 0.5, ease: "easeOut" }}
                  className="flex gap-5 group"
                >
                  {/* Timeline dot */}
                  <div className="hidden sm:flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center shadow-lg shrink-0 transition-all duration-300 ${job.isCurrent ? "ring-2 ring-peach-300 ring-offset-2 ring-offset-[#FEFAF6]" : ""}`}
                    >
                      {job.isCurrent ? <Rocket className="w-5 h-5 text-white" /> : <Briefcase className="w-5 h-5 text-white" />}
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div className={`flex-1 bg-white rounded-2xl border p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl ${job.isCurrent ? "border-peach-200 shadow-lg shadow-peach-100/30" : "border-warm-100 hover:border-peach-200 hover:shadow-lg"}`}>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${job.isCurrent ? "text-white bg-gradient-to-r from-peach-500 to-peach-600" : "text-peach-600 bg-peach-50"}`}>
                        {job.period}
                      </span>
                      {job.isCurrent && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          CURRENT
                        </span>
                      )}
                      <span className="text-xs text-warm-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                    </div>
                    <h3 className="text-base font-bold text-warm-800">{job.role}</h3>
                    <p className="text-sm font-semibold text-peach-600 mb-2">
                      {job.company}
                      {job.companyNo && <span className="text-warm-400 font-normal text-xs ml-1">(#{job.companyNo})</span>}
                    </p>
                    <p className="text-sm text-warm-500 leading-relaxed">{job.highlight}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EDUCATION ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-5">
              <GraduationCap className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">Education</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-800 tracking-tight">
              Academic <span className="text-peach-500">foundation</span>
            </h2>
          </motion.div>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          >
            {education.map((edu) => (
              <motion.div key={edu.degree} variants={item} whileHover={{ scale: 1.03, y: -4 }}
                className="bg-[#FEFAF6] rounded-2xl border border-warm-100 p-6 text-center hover:shadow-xl hover:border-peach-200 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-peach-50 to-peach-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-peach-100 group-hover:to-peach-200 transition-colors group-hover:scale-110 group-hover:rotate-3">
                  <GraduationCap className="w-7 h-7 text-peach-500" />
                </div>
                <h3 className="text-sm font-bold text-warm-800">{edu.degree}</h3>
                <p className="text-xs text-warm-500 mt-1.5 leading-relaxed">{edu.school}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-peach-600 bg-peach-50 px-3 py-1 rounded-full font-medium">
                  <MapPin className="w-3 h-3" />
                  {edu.country} &middot; {edu.year}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 bg-gradient-to-br from-warm-800 via-warm-900 to-warm-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-peach-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <FloatingParticles />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto px-6 text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-br from-peach-400 to-peach-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-peach-500/20"
          >
            <Rocket className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight leading-tight">
            Let&apos;s build your next
            <br />
            <span className="bg-gradient-to-r from-peach-400 via-amber-400 to-peach-300 bg-clip-text text-transparent">data platform</span>
          </h2>
          <p className="text-warm-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
            12+ years of enterprise data engineering expertise.
            From Delta Lakehouse to real-time streaming, I deliver solutions that scale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="mailto:info@codes-ai.uk"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-400 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl shadow-peach-500/20 transition-all text-sm w-full sm:w-auto justify-center"
            >
              <Mail className="w-4 h-4" /> info@codes-ai.uk
            </motion.a>
            <motion.a
              href="tel:+447586094540"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/15 text-white font-medium px-8 py-4 rounded-2xl hover:bg-white/10 transition-all text-sm backdrop-blur-sm w-full sm:w-auto justify-center"
            >
              <Phone className="w-4 h-4" /> +44 7586 094540
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-warm-900 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">CODES <span className="text-peach-400">AI</span></span>
          </div>
          <p className="text-xs text-warm-500">&copy; 2026 CODES AI LIMITED (Company No. 16078672). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
