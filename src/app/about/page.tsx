"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2, ArrowRight, Award, Building2, Calendar, CheckCircle2, Cloud,
  Database, Globe, GraduationCap, Layers, Mail, MapPin, Phone, Sparkles,
  Star, TrendingUp, Users, Zap, Bot, LineChart, Shield, Briefcase,
  ChevronRight, ArrowUpRight, Menu, X,
} from "lucide-react";
import { useState } from "react";

const stats = [
  { value: "12+", label: "Years Experience" },
  { value: "50+", label: "Enterprise Clients" },
  { value: "150+", label: "Projects Delivered" },
  { value: "€150K+", label: "Client Savings" },
];

const expertise = [
  { category: "Cloud Platforms", items: ["Azure Synapse", "Data Factory", "Data Lake", "Event Hubs", "DevOps", "Functions", "Microsoft Fabric", "AWS Glue & Redshift"] },
  { category: "Data Platforms", items: ["Databricks", "Delta Lake", "Snowflake", "Azure Synapse SQL Pools", "Microsoft Purview"] },
  { category: "Programming & ETL", items: ["Python", "PySpark", "SQL", "Scala", "R", "SSIS", "Azure Data Factory", "Informatica PowerCenter"] },
  { category: "AI & Automation", items: ["Local LLMs", "AI-Assisted Development", "Automated Code Generation", "Pipeline Orchestration", "Claude API", "ML Studio"] },
  { category: "Visualization", items: ["Power BI Pro/Premium", "Tableau", "SAP BusinessObjects", "SSRS"] },
  { category: "Enterprise Systems", items: ["SAP S/4HANA", "SAP BW", "SAP TM", "Microsoft Dynamics 365", "CRM Systems"] },
];

const career = [
  { period: "2025 – Present", role: "CEO & Founder", company: "CODES AI Private Limited", location: "London, UK", highlight: "Founded AI-powered software company. Pioneered AI-assisted development framework using local LLMs, reducing development time by 40%.", color: "from-peach-500 to-peach-600" },
  { period: "2024 – 2025", role: "Senior Data Engineer", company: "TRANSFORM UK — Anglian Water", location: "UK", highlight: "Microsoft Fabric & Databricks implementation. Controlled 250+ products as framework with Delta-Parquet in OneLake. Built Curated & Gold layers.", color: "from-blue-500 to-blue-600" },
  { period: "2023 – 2024", role: "Senior Data Engineer", company: "Delta Lakehouse Project", location: "UK", highlight: "Processed billions of sensor JSON files in Azure. Designed Lakehouse architecture with ACID-compliant Delta Lake. Optimized queries by 40%.", color: "from-violet-500 to-violet-600" },
  { period: "2022 – 2023", role: "Senior Data Engineer", company: "Flaschenpost GmbH", location: "Germany", highlight: "Microsoft Dynamics 365 solution with Azure migration. Migrated SSIS pipelines to Azure Cloud. Delivered 50% faster reporting.", color: "from-emerald-500 to-emerald-600" },
  { period: "2022 – 2024", role: "BI Consultant", company: "Carl Zeiss GmbH (via SOLOCOM)", location: "Germany", highlight: "Customer 360 analytics platform integrating SAP CRM/ERP with Azure Synapse. Achieved 40% faster reporting and 50% reduction in manual reconciliation.", color: "from-cyan-500 to-cyan-600" },
  { period: "2021 – 2022", role: "Senior Data Engineer", company: "E.ON Energy", location: "Germany", highlight: "Global survey dashboard (2000+ columns/file) with Row Level Security in Power BI. Achieved 99.5% data accuracy and 25% cost reduction.", color: "from-amber-500 to-amber-600" },
  { period: "2021 – 2022", role: "Senior Data Engineer", company: "Hays — PlayMobil / ISMO GmbH", location: "Germany", highlight: "Enterprise Data Lake handling 80K+ JSON files daily. Global Sales Dashboard integrating Amazon, Print, TV & Social Media data.", color: "from-rose-500 to-rose-600" },
  { period: "2020 – 2021", role: "Senior Data Specialist", company: "Hermes (via Artizan)", location: "UK", highlight: "End-to-end Azure data platform for sensor analytics. Optimized Delta Lake with Z-Order. Reduced Azure costs by 30%.", color: "from-indigo-500 to-indigo-600" },
  { period: "2017 – 2019", role: "Senior Software Specialist", company: "Dornbracht GmbH", location: "Germany", highlight: "Sales & Margin, Finance analytics. Migrated legacy ETL, redesigned Star/Snowflake schemas. 30% faster financial reconciliations.", color: "from-teal-500 to-teal-600" },
  { period: "2013 – 2015", role: "DWH / BI Consultant", company: "Adastra GmbH — Volkswagen AG", location: "Germany", highlight: "Enterprise data warehouse for VW VSC and BDW projects. Achieved 25% faster data processing and 99.9% workflow success rate.", color: "from-orange-500 to-orange-600" },
  { period: "2011 – 2012", role: "Research Assistant", company: "Siemens AG, Corporate Technology", location: "Munich, Germany", highlight: "Research on cloud-integrated data warehouse architectures. Analyzed Azure, AWS, and SAP BIOD for hybrid DWH solutions.", color: "from-gray-500 to-gray-600" },
];

const achievements = [
  { icon: Bot, title: "AI Development Framework", description: "Pioneered AI-assisted development using local LLMs to automate data warehouse design, reducing development time by 40%." },
  { icon: Database, title: "Billions of Records Processed", description: "Built Delta Lakehouse architectures processing billions of sensor JSON files with 99.9% data accuracy and 60% faster runtime." },
  { icon: TrendingUp, title: "€150K+ Client Savings", description: "Consistently delivered SAP-to-Azure integrations resulting in 50% faster analytics and €120K+/year in cloud cost savings." },
  { icon: Zap, title: "Real-Time IoT Processing", description: "Developed streaming pipelines using Azure Event Hubs, Kafka, and Databricks, achieving 99% real-time data processing." },
  { icon: Layers, title: "250+ Product Framework", description: "Designed Microsoft Fabric solutions controlling 250+ products with automated ETL/ELT architecture in OneLake." },
  { icon: LineChart, title: "40% Query Optimization", description: "Optimized terabyte-scale data processing using Azure Synapse, Databricks, and Snowflake with advanced partitioning." },
];

const clients = [
  "Anglian Water", "Carl Zeiss", "E.ON Energy", "Volkswagen AG",
  "Flaschenpost", "PlayMobil", "Hermes", "Siemens AG",
];

export default function AboutPage() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
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
            <Link href="/#services" className="text-sm font-medium text-warm-500 hover:text-peach-600 transition-colors">Services</Link>
            <Link href="/#portfolio" className="text-sm font-medium text-warm-500 hover:text-peach-600 transition-colors">Our Work</Link>
            <Link href="/about" className="text-sm font-medium text-peach-600">About</Link>
            <Link href="/#contact" className="text-sm font-medium text-warm-500 hover:text-peach-600 transition-colors">Contact</Link>
          </div>
          <Link href="/login" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-peach-500 to-peach-600 px-5 py-2.5 rounded-xl shadow-lg shadow-peach-300/30 transition-all hover:-translate-y-0.5">
            Client Portal <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#FEF9F4] via-white to-[#FFF1E8] relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-peach-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-violet-200/20 blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left - Profile */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-peach-500" />
                <span className="text-xs font-semibold text-peach-700">Meet the Founder</span>
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-warm-800 leading-tight tracking-tight">
                Avais Ahmad
                <br />
                <span className="text-peach-500">Qarni</span>
              </h1>

              <p className="mt-2 text-xl text-warm-500 font-medium">CEO & Founder — CODES AI Private Limited</p>

              <p className="mt-6 text-warm-500 leading-relaxed max-w-2xl text-lg">
                Senior Data Engineer with <strong className="text-warm-700">12+ years</strong> of experience designing and optimising
                large-scale data platforms across Azure, Databricks, and enterprise ecosystems.
                Proven track record of leading end-to-end data warehouse implementations,
                building scalable ETL/ELT pipelines, and delivering real-time analytics solutions
                that drive measurable business value.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-warm-500">
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-peach-500" /> London, UK</div>
                <div className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-peach-500" /> +44 7586 094540</div>
                <div className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-peach-500" /> codes-ai.uk</div>
                <div className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-peach-500" /> Dual M.Sc.</div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:info@codes-ai.uk" className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-peach-300/30 hover:-translate-y-0.5 transition-all text-sm">
                  <Mail className="w-4 h-4" /> Contact Me
                </a>
                <Link href="/#portfolio" className="inline-flex items-center gap-2 bg-white border border-warm-200 text-warm-600 font-medium px-6 py-3 rounded-xl hover:shadow-lg transition-all text-sm">
                  View Projects <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right - Stats Card */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-warm-800 to-warm-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-peach-500/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-peach-400 to-peach-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl mx-auto text-3xl font-bold">
                    AQ
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {stats.map((s) => (
                      <div key={s.label} className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-2xl font-bold text-peach-400">{s.value}</p>
                        <p className="text-[10px] text-warm-400 mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    {["Azure", "Databricks", "AI/ML", "Python"].map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-white/10 rounded-lg text-xs text-warm-300">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-4">
              <Award className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">Key Achievements</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-800 tracking-tight">Impact that <span className="text-peach-500">speaks volumes</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {achievements.map((a, i) => (
              <motion.div key={a.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-[#FEFAF6] border border-warm-100 hover:border-peach-200 hover:shadow-xl hover:shadow-peach-100/30 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-peach-50 to-peach-100 group-hover:from-peach-100 group-hover:to-peach-200 flex items-center justify-center mb-4 transition-all group-hover:scale-110">
                  <a.icon className="w-6 h-6 text-peach-600" />
                </div>
                <h3 className="text-base font-bold text-warm-800 mb-2">{a.title}</h3>
                <p className="text-sm text-warm-500 leading-relaxed">{a.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Clients */}
      <section className="py-16 bg-gradient-to-br from-warm-800 to-warm-900">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-semibold text-warm-400 uppercase tracking-wider mb-8">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center gap-6">
            {clients.map((c) => (
              <motion.div key={c} whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium text-sm hover:bg-white/10 transition-all cursor-default"
              >
                <Building2 className="w-4 h-4 inline mr-2 text-peach-400" />{c}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-20 bg-[#FEFAF6]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-4">
              <Zap className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">Technical Expertise</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-800 tracking-tight">Full-stack <span className="text-peach-500">data mastery</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {expertise.map((group, i) => (
              <motion.div key={group.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-warm-100 p-6 hover:shadow-lg transition-all"
              >
                <h3 className="text-sm font-bold text-warm-800 mb-4 pb-3 border-b border-warm-100">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="px-2.5 py-1.5 bg-warm-50 text-warm-600 text-xs font-medium rounded-lg border border-warm-100 hover:border-peach-200 hover:bg-peach-50 hover:text-peach-700 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-4">
              <Briefcase className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">Career Journey</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-800 tracking-tight">12+ years of <span className="text-peach-500">excellence</span></h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-warm-200 hidden sm:block" />

            <div className="space-y-6">
              {career.map((job, i) => (
                <motion.div key={`${job.company}-${job.period}`} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                  className="flex gap-5 group"
                >
                  {/* Dot */}
                  <div className="hidden sm:flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform`}>
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-[#FEFAF6] rounded-2xl border border-warm-100 p-5 hover:border-peach-200 hover:shadow-lg transition-all group-hover:-translate-y-0.5">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-peach-600 bg-peach-50 px-2.5 py-1 rounded-full">{job.period}</span>
                      <span className="text-xs text-warm-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                    </div>
                    <h3 className="text-base font-bold text-warm-800">{job.role}</h3>
                    <p className="text-sm font-semibold text-peach-600 mb-2">{job.company}</p>
                    <p className="text-sm text-warm-500 leading-relaxed">{job.highlight}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-16 bg-[#FEFAF6]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl font-bold text-warm-800">Education & Certifications</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { degree: "M.Sc. E-Business", school: "University of Applied Sciences, Fulda", country: "Germany", year: "2012" },
              { degree: "M.Sc. Informatics", school: "University of Central Punjab", country: "Pakistan", year: "2005" },
              { degree: "B.Sc. Informatics", school: "B.Z.U. University, Multan", country: "Pakistan", year: "2002" },
            ].map((edu) => (
              <motion.div key={edu.degree} whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl border border-warm-100 p-6 text-center hover:shadow-lg hover:border-peach-200 transition-all"
              >
                <GraduationCap className="w-8 h-8 text-peach-500 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-warm-800">{edu.degree}</h3>
                <p className="text-xs text-warm-500 mt-1">{edu.school}</p>
                <p className="text-xs text-warm-400 mt-1">{edu.country} · {edu.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-warm-800 via-warm-900 to-warm-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-peach-500/5 rounded-full blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-3xl mx-auto px-6 text-center relative z-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Let&apos;s build your next <span className="text-peach-400">data platform</span>
          </h2>
          <p className="text-warm-400 max-w-lg mx-auto mb-8">
            12+ years of enterprise data engineering expertise, ready for your next project.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:info@codes-ai.uk" className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-400 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-sm">
              <Mail className="w-4 h-4" /> info@codes-ai.uk
            </a>
            <a href="tel:+447586094540" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-2xl hover:bg-white/20 transition-all text-sm">
              <Phone className="w-4 h-4" /> +44 7586 094540
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-warm-900 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">CODES <span className="text-peach-400">AI</span></span>
          </div>
          <p className="text-xs text-warm-500">&copy; 2026 CODES AI Private Limited. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
