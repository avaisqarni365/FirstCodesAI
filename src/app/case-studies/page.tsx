"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Code2, Sparkles, Menu, X, ArrowUpRight,
} from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";

const navLinks: [string, string][] = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Case Studies", "/case-studies"],
  ["About", "/about"],
  ["Client Portal", "/login"],
];

export default function CaseStudiesPage() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════ NAV ═══════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-warm-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/logo.svg" alt="CODES AI" width={160} height={40} priority className="h-9 w-auto" />
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 4).map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  href === "/case-studies"
                    ? "text-peach-600"
                    : "text-warm-500 hover:text-peach-600"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-peach-500 to-peach-600 px-5 py-2.5 rounded-xl shadow-lg shadow-peach-300/30 hover:-translate-y-0.5 transition-all"
            >
              Client Portal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2">
              {mobileMenu ? <X className="w-5 h-5 text-warm-600" /> : <Menu className="w-5 h-5 text-warm-600" />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-white border-t px-6 py-4 space-y-3"
          >
            {navLinks.slice(0, 4).map(([label, href]) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileMenu(false)}
                className="block text-sm text-warm-600 py-2"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileMenu(false)}
              className="block text-center text-sm font-semibold text-white bg-peach-500 py-2.5 rounded-xl"
            >
              Client Portal
            </Link>
          </motion.div>
        )}
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section className="pt-24 sm:pt-28 pb-12 sm:pb-16 bg-gradient-to-b from-[#FEF9F4] to-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-peach-200/30 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-4 sm:mb-6">
              <Sparkles className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">// CASE STUDIES</span>
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-warm-800 tracking-tight">
              Real projects. <span className="text-peach-500">Real results.</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-warm-500 max-w-2xl mx-auto px-2">
              Enterprise data platforms, AI frameworks, cloud migrations, and IoT analytics
              — delivered for global brands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CASE STUDY CARDS ═══════════ */}
      <section className="py-8 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="group block rounded-2xl bg-[#FEFAF6] border border-warm-100 hover:border-peach-200 hover:shadow-2xl hover:shadow-peach-100/40 transition-all duration-500 hover:-translate-y-2 h-full overflow-hidden"
                >
                  {/* Gradient header */}
                  <div className={`bg-gradient-to-r ${cs.gradient} p-4 sm:p-6`}>
                    <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                      <span className="text-[10px] sm:text-xs font-bold text-white/90 bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                        {cs.category}
                      </span>
                      <span className="text-[10px] sm:text-xs font-semibold text-white/80 bg-white/10 px-2.5 py-0.5 rounded-full">
                        {cs.value}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{cs.title}</h3>
                    <p className="text-xs sm:text-sm text-white/80">{cs.client}</p>
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-6">
                    {/* Hero metric */}
                    <div className="mb-3 sm:mb-4">
                      <span className="text-3xl sm:text-4xl font-extrabold text-warm-800">
                        {cs.heroMetric}
                      </span>
                      <span className="ml-2 text-xs sm:text-sm text-warm-500">
                        {cs.heroMetricLabel}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-warm-500 leading-relaxed line-clamp-3 mb-4">
                      {cs.summary}
                    </p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cs.techStack.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] sm:text-xs font-medium text-warm-600 bg-warm-50 border border-warm-200 px-2 py-0.5 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                      {cs.techStack.length > 4 && (
                        <span className="text-[10px] sm:text-xs font-medium text-warm-400">
                          +{cs.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    <span className="text-peach-500 text-xs sm:text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      View case study <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-warm-800 to-warm-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Have a similar challenge?
          </h2>
          <p className="text-sm sm:text-base text-warm-400 mb-6 sm:mb-8">
            Book a free consultation and let&apos;s discuss how we can deliver the same results for your business.
          </p>
          <a
            href="mailto:info@codes-ai.uk"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-400 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-sm w-full sm:w-auto justify-center"
          >
            Book Free Consultation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-warm-900 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">
              CODES <span className="text-peach-400">AI</span>
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-warm-600">
            &copy; 2026 CODES AI LIMITED (16078672). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
