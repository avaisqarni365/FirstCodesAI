"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Mail, Phone, Star, CheckCircle2, Code2,
  Sparkles, Menu, X, ArrowUpRight,
} from "lucide-react";
import { caseStudies, CaseStudy } from "@/lib/case-studies-data";

/* ════════════════════════════════════════════════
   UTILITY — animated counter
   ════════════════════════════════════════════════ */

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;

    // Extract leading number and the rest (suffix)
    const match = value.match(/^([€£$]?)(\d+(?:\.\d+)?)(.*)/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const prefix = match[1];
    const target = parseFloat(match[2]);
    const suffix = match[3];
    const isDecimal = match[2].includes(".");

    let frame = 0;
    const totalFrames = 60;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (frame >= totalFrames) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(
          `${prefix}${isDecimal ? current.toFixed(1) : Math.floor(current)}${suffix}`
        );
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

/* ════════════════════════════════════════════════
   NAV LINKS
   ════════════════════════════════════════════════ */

const navLinks: [string, string][] = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Case Studies", "/case-studies"],
  ["About", "/about"],
  ["Client Portal", "/login"],
];

/* ════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════ */

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [mobileMenu, setMobileMenu] = useState(false);

  const study = caseStudies.find((cs) => cs.slug === slug);
  const otherStudies = caseStudies.filter((cs) => cs.slug !== slug);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEF9F4]">
        <div className="text-center p-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-warm-800 mb-4">Case study not found</h1>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-peach-600 font-semibold text-sm hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all case studies
          </Link>
        </div>
      </div>
    );
  }

  const Icon = study.icon;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
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
              <Link key={label} href={href} onClick={() => setMobileMenu(false)} className="block text-sm text-warm-600 py-2">
                {label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setMobileMenu(false)} className="block text-center text-sm font-semibold text-white bg-peach-500 py-2.5 rounded-xl">
              Client Portal
            </Link>
          </motion.div>
        )}
      </nav>

      {/* ═══════════ BACK LINK ═══════════ */}
      <div className="pt-20 sm:pt-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-warm-500 hover:text-peach-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> All case studies
        </Link>
      </div>

      {/* ═══════════ 1. GRADIENT HERO ═══════════ */}
      <section className="px-4 sm:px-6 mt-4 sm:mt-6">
        <div className={`max-w-7xl mx-auto rounded-2xl sm:rounded-3xl bg-gradient-to-br ${study.gradient} p-6 sm:p-10 lg:p-16 relative overflow-hidden`}>
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 sm:w-60 h-40 sm:h-60 rounded-full bg-black/5 blur-3xl" />

          <div className="relative z-10">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6"
            >
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3" /> {study.category}
              </span>
              <span className="bg-white/10 text-white/90 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full">
                {study.value}
              </span>
              <span className="bg-white/10 text-white/90 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full">
                {study.industry}
              </span>
            </motion.div>

            {/* Client + title */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-white/80 text-xs sm:text-sm font-medium mb-1 sm:mb-2"
            >
              {study.client}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              {study.title}
            </motion.h1>

            {/* Hero metric */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 sm:mt-10 inline-flex items-end gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-5 sm:px-8 py-4 sm:py-6"
            >
              <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none">
                <AnimatedCounter value={study.heroMetric} />
              </span>
              <span className="text-sm sm:text-base text-white/80 font-medium pb-1 sm:pb-2">
                {study.heroMetricLabel}
              </span>
            </motion.div>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 sm:mt-6 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-white/70"
            >
              <span>Timeline: <strong className="text-white">{study.timeline}</strong></span>
              <span>Team: <strong className="text-white">{study.teamSize}</strong></span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ 2. SUMMARY + CHALLENGE + SOLUTION ═══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { title: "Summary", body: study.summary },
            { title: "The Challenge", body: study.challenge },
            { title: "Our Solution", body: study.solution },
          ].map((sec, i) => (
            <motion.div
              key={sec.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#FEFAF6] rounded-2xl border border-warm-100 p-5 sm:p-7"
            >
              <h3 className="text-sm sm:text-base font-bold text-warm-800 mb-2 sm:mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-peach-500 shrink-0" />
                {sec.title}
              </h3>
              <p className="text-xs sm:text-sm text-warm-500 leading-relaxed">{sec.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════ 3. ARCHITECTURE FLOW ═══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg sm:text-2xl font-bold text-warm-800 mb-6 sm:mb-8 text-center"
        >
          Architecture Flow
        </motion.h2>

        <div className="flex flex-col items-center gap-0">
          {study.architectureLayers.map((layer, i) => (
            <div key={layer.label} className="flex flex-col items-center w-full max-w-2xl">
              {/* Connector from previous layer */}
              {i > 0 && (
                <div className="relative flex flex-col items-center h-12 sm:h-16">
                  {/* Vertical line */}
                  <div className="w-0.5 h-full bg-warm-200 relative overflow-hidden">
                    {/* Animated pulse packet */}
                    <motion.div
                      className="absolute left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-peach-400 shadow-lg shadow-peach-400/50"
                      animate={{ top: ["-10%", "110%"] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  {/* Arrow at the bottom */}
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-warm-300" />
                </div>
              )}

              {/* Layer card */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="w-full"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl border border-warm-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                  {/* Colored left border as a top gradient bar on mobile for clean look */}
                  <div className={`h-1.5 sm:h-0 sm:w-0 bg-gradient-to-r ${layer.color}`} />
                  <div className="flex">
                    {/* Colored left border on desktop */}
                    <div className={`hidden sm:block w-1.5 bg-gradient-to-b ${layer.color} shrink-0`} />
                    <div className="p-4 sm:p-5 flex-1">
                      <h4 className="text-sm sm:text-base font-bold text-warm-800 mb-2 sm:mb-3">
                        {layer.label}
                      </h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {layer.items.map((item) => (
                          <span
                            key={item}
                            className="text-[10px] sm:text-xs font-medium text-warm-600 bg-warm-50 border border-warm-200 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ 4. PROCESS STEPS ═══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg sm:text-2xl font-bold text-warm-800 mb-6 sm:mb-8 text-center"
        >
          Our Process
        </motion.h2>

        {/* Desktop: horizontal timeline */}
        <div className="hidden sm:block">
          <div className="flex items-start gap-0">
            {study.processSteps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <div key={step.title} className="flex items-start flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex flex-col items-center text-center flex-1"
                  >
                    {/* Step number + icon */}
                    <div className="relative mb-4">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-peach-100 to-peach-50 border border-peach-200 flex items-center justify-center shadow-sm">
                        <StepIcon className="w-5 h-5 lg:w-6 lg:h-6 text-peach-600" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-peach-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                        {i + 1}
                      </span>
                    </div>

                    <h4 className="text-xs lg:text-sm font-bold text-warm-800 mb-1.5 px-1">{step.title}</h4>
                    <p className="text-[10px] lg:text-xs text-warm-500 leading-relaxed mb-2 px-1 line-clamp-3">{step.desc}</p>

                    <div className="flex flex-wrap gap-1 justify-center">
                      {step.tech.map((t) => (
                        <span key={t} className="text-[9px] lg:text-[10px] font-medium text-peach-700 bg-peach-50 border border-peach-200 px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Connector */}
                  {i < study.processSteps.length - 1 && (
                    <div className="flex items-center pt-5 lg:pt-6 shrink-0">
                      <div className="relative w-6 lg:w-10 h-0.5 bg-warm-200 overflow-hidden">
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-peach-400 shadow-sm shadow-peach-400/50"
                          animate={{ left: ["-10%", "110%"] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="sm:hidden space-y-0">
          {study.processSteps.map((step, i) => {
            const StepIcon = step.icon;
            return (
              <div key={step.title}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex gap-3"
                >
                  {/* Left: number line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-peach-100 to-peach-50 border border-peach-200 flex items-center justify-center">
                      <span className="text-xs font-bold text-peach-600">{i + 1}</span>
                    </div>
                    {i < study.processSteps.length - 1 && (
                      <div className="relative w-0.5 flex-1 min-h-[24px] bg-warm-200 overflow-hidden my-1">
                        <motion.div
                          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-peach-400"
                          animate={{ top: ["-10%", "110%"] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Right: content */}
                  <div className="pb-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <StepIcon className="w-4 h-4 text-peach-500" />
                      <h4 className="text-sm font-bold text-warm-800">{step.title}</h4>
                    </div>
                    <p className="text-xs text-warm-500 leading-relaxed mb-1.5">{step.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {step.tech.map((t) => (
                        <span key={t} className="text-[9px] font-medium text-peach-700 bg-peach-50 border border-peach-200 px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════ 5. RESULTS GRID ═══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg sm:text-2xl font-bold text-warm-800 mb-6 sm:mb-8 text-center"
        >
          Results &amp; Impact
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {study.results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="bg-[#FEFAF6] rounded-2xl border border-warm-100 p-5 sm:p-7 text-center hover:shadow-lg hover:border-peach-200 transition-all cursor-default"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-warm-800 mb-1 sm:mb-2">
                <AnimatedCounter value={r.metric} />
              </div>
              <div className="text-sm sm:text-base font-bold text-peach-600 mb-1">{r.label}</div>
              <p className="text-[10px] sm:text-xs text-warm-500">{r.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════ 6. TECH STACK ═══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg sm:text-2xl font-bold text-warm-800 mb-6 sm:mb-8 text-center"
        >
          Technology Stack
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto"
        >
          {study.techStack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-xs sm:text-sm font-medium text-warm-700 bg-white border border-warm-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-sm hover:border-peach-300 hover:text-peach-700 hover:shadow-md transition-all cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* ═══════════ 7. TESTIMONIAL ═══════════ */}
      {study.testimonial && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto bg-gradient-to-br from-peach-50 to-white rounded-2xl border border-peach-200 p-6 sm:p-10 relative overflow-hidden"
          >
            {/* Large quote mark */}
            <div className="absolute -top-2 left-4 sm:left-8 text-peach-200 text-6xl sm:text-8xl font-serif leading-none select-none">
              &ldquo;
            </div>

            <div className="relative z-10">
              <p className="text-sm sm:text-base lg:text-lg text-warm-700 italic leading-relaxed mb-4 sm:mb-6 pt-6 sm:pt-4">
                &ldquo;{study.testimonial.quote}&rdquo;
              </p>

              {/* Star rating */}
              <div className="flex gap-0.5 mb-3 sm:mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <div>
                <p className="text-sm sm:text-base font-bold text-warm-800">{study.testimonial.name}</p>
                <p className="text-xs sm:text-sm text-warm-500">{study.testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ═══════════ 8. CTA ═══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-warm-800 to-warm-900 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-peach-500/10 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4">
              Start a similar project
            </h2>
            <p className="text-xs sm:text-sm text-warm-400 mb-6 sm:mb-8 max-w-lg mx-auto">
              Let&apos;s discuss how we can deliver the same results for your business. Free consultation, no commitment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="mailto:info@codes-ai.uk"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-peach-500 to-peach-400 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-sm w-full sm:w-auto"
              >
                <Mail className="w-4 h-4" /> info@codes-ai.uk
              </a>
              <a
                href="tel:+447908abortt"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-2xl hover:bg-white/20 transition-all text-sm backdrop-blur-sm w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" /> Book a Call
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ 9. OTHER CASE STUDIES ═══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg sm:text-2xl font-bold text-warm-800 mb-6 sm:mb-8 text-center"
        >
          More Case Studies
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {otherStudies.map((cs, i) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group block rounded-2xl overflow-hidden bg-[#FEFAF6] border border-warm-100 hover:border-peach-200 hover:shadow-xl hover:shadow-peach-100/40 transition-all duration-500 hover:-translate-y-1 h-full"
              >
                <div className={`bg-gradient-to-r ${cs.gradient} p-4 sm:p-5`}>
                  <span className="text-[10px] sm:text-xs font-bold text-white/90 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {cs.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-2">{cs.title}</h3>
                  <p className="text-[10px] sm:text-xs text-white/80 mt-0.5">{cs.client}</p>
                </div>
                <div className="p-4">
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-xl sm:text-2xl font-extrabold text-warm-800">{cs.heroMetric}</span>
                    <span className="text-[10px] sm:text-xs text-warm-500 pb-0.5">{cs.heroMetricLabel}</span>
                  </div>
                  <span className="text-peach-500 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
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
