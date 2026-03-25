"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Code2, Sparkles, Menu, X, Award, Gauge, Mail, Database, Bot, Cloud } from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay, duration: 0.5 }} className={className}>
    {children}
  </motion.div>
);

export default function CaseStudiesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FEFAF6]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-warm-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center shadow-md">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-warm-800 text-base tracking-tight">CODES<span className="text-peach-500">AI</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {[["Services", "/services"], ["Case Studies", "/case-studies"], ["About", "/about"]].map(([l, h]) => (
              <Link key={l} href={h} className={`text-sm font-medium ${h === "/case-studies" ? "text-peach-600" : "text-warm-500 hover:text-peach-600"} transition-colors`}>{l}</Link>
            ))}
            <Link href="/login" className="text-sm font-semibold text-white bg-gradient-to-r from-peach-500 to-peach-600 px-4 py-2 rounded-lg shadow-md">Portal</Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 -mr-2" aria-label="Menu">
            {menuOpen ? <X className="w-6 h-6 text-warm-600" /> : <Menu className="w-6 h-6 text-warm-600" />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t overflow-hidden">
              <div className="px-4 py-3 space-y-1">
                {[["Services", "/services"], ["Case Studies", "/case-studies"], ["About CEO", "/about"]].map(([l, h]) => (
                  <Link key={l} href={h} onClick={() => setMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-warm-700 rounded-lg">{l}</Link>
                ))}
                <Link href="/login" onClick={() => setMenuOpen(false)} className="block mt-2 text-center text-sm font-semibold text-white bg-peach-500 py-3 rounded-xl">Client Portal</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero — light warm background */}
      <section className="pt-20 sm:pt-24 pb-8 sm:pb-12 bg-white relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-peach-100/60 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-3 py-1 mb-4">
              <Award className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-[11px] sm:text-xs font-semibold text-peach-700">CASE STUDIES</span>
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-warm-800 tracking-tight">
              Real projects. <span className="text-peach-500">Real results.</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-warm-500 max-w-xl mx-auto leading-relaxed">
              Enterprise data platforms, AI frameworks, cloud migrations — delivered for global brands.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Case Study Cards */}
      <section className="py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {caseStudies.map((cs, i) => (
              <FadeIn key={cs.slug} delay={i * 0.08}>
                <Link href={`/case-studies/${cs.slug}`} className="group block bg-white rounded-2xl border border-warm-100 hover:border-peach-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                  {/* Gradient header */}
                  <div className={`bg-gradient-to-r ${cs.gradient} p-5 sm:p-6 relative overflow-hidden`}>
                    <div className="absolute -right-8 -top-8 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative z-10">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-[10px] sm:text-xs font-bold text-white bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full">{cs.category}</span>
                        <span className="text-[10px] sm:text-xs font-semibold text-white/90 bg-white/10 px-2.5 py-0.5 rounded-full">{cs.value}</span>
                      </div>
                      <p className="text-white/70 text-xs sm:text-sm">{cs.client}</p>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{cs.title}</h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6">
                    {/* Big metric */}
                    <div className="flex items-end gap-2 mb-3">
                      <span className="text-3xl sm:text-4xl font-extrabold text-warm-800">{cs.heroMetric}</span>
                      <span className="text-xs sm:text-sm text-warm-500 pb-1">{cs.heroMetricLabel}</span>
                    </div>

                    <p className="text-sm text-warm-500 leading-relaxed mb-4 line-clamp-2">{cs.summary}</p>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cs.techStack.slice(0, 5).map((t) => (
                        <span key={t} className="text-[10px] sm:text-xs font-medium text-warm-600 bg-warm-50 border border-warm-200 px-2 py-0.5 rounded-md">{t}</span>
                      ))}
                    </div>

                    {/* Results preview */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {cs.results.slice(0, 2).map((r) => (
                        <div key={r.label} className="bg-[#FEFAF6] rounded-lg p-2.5 border border-warm-100">
                          <p className="text-base sm:text-lg font-bold text-warm-800">{r.metric}</p>
                          <p className="text-[9px] sm:text-[10px] text-warm-500">{r.label}</p>
                        </div>
                      ))}
                    </div>

                    <span className="text-peach-500 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      View full case study <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="bg-gradient-to-br from-peach-50 to-amber-50 border-2 border-peach-200 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-warm-800 mb-3">Have a similar challenge?</h2>
              <p className="text-sm text-warm-500 mb-6 max-w-md mx-auto">
                Book a free consultation and let&apos;s discuss how we can deliver the same results for your business.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="mailto:info@codes-ai.uk" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-peach-500 to-peach-600 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg text-sm hover:-translate-y-0.5 transition-all">
                  <Mail className="w-4 h-4" /> Free Consultation
                </a>
                <Link href="/services" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-warm-200 text-warm-600 font-medium px-6 py-3.5 rounded-xl text-sm hover:border-peach-300 transition-all">
                  View Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warm-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center"><Code2 className="w-3.5 h-3.5 text-white" /></div>
            <span className="font-bold text-white text-sm">CODES<span className="text-peach-400">AI</span></span>
          </Link>
          <p className="text-[10px] text-warm-400">&copy; 2026 CODES AI LIMITED (16078672)</p>
        </div>
      </footer>
    </div>
  );
}
