"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft, Mail, Phone, Star, CheckCircle2, Code2, Sparkles, Menu, X, ArrowUpRight, Award, ChevronDown, Send, Gauge, Database } from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^([€£$]?)(\d+(?:\.\d+)?)(.*)/);
    if (!match) { setDisplay(value); return; }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = 1 - Math.pow(1 - frame / 50, 3);
      if (frame >= 50) { setDisplay(value); clearInterval(timer); }
      else setDisplay(`${prefix}${numStr.includes('.') ? (target * progress).toFixed(1) : Math.floor(target * progress)}${suffix}`);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <span ref={ref}>{display}</span>;
}

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay, duration: 0.5 }} className={className}>
    {children}
  </motion.div>
);

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [menuOpen, setMenuOpen] = useState(false);
  const study = caseStudies.find((cs) => cs.slug === slug);
  const otherStudies = caseStudies.filter((cs) => cs.slug !== slug);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEFAF6]">
        <div className="text-center p-6">
          <h1 className="text-xl font-bold text-warm-800 mb-4">Case study not found</h1>
          <Link href="/case-studies" className="text-peach-500 text-sm font-semibold"><ArrowLeft className="w-4 h-4 inline mr-1" />Back</Link>
        </div>
      </div>
    );
  }

  const Icon = study.icon;

  return (
    <div className="min-h-screen bg-[#FEFAF6] overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-warm-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center shadow-md"><Code2 className="w-4 h-4 text-white" /></div>
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

      {/* Hero — gradient card */}
      <section className="pt-16 sm:pt-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto pt-4 sm:pt-6">
          <Link href="/case-studies" className="inline-flex items-center gap-1 text-warm-500 text-sm mb-4 hover:text-peach-500 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> All Case Studies
          </Link>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${study.gradient} rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 relative overflow-hidden`}>
            <div className="absolute -top-16 -right-16 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-[10px] sm:text-xs font-bold text-white bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">{study.category}</span>
                <span className="text-[10px] sm:text-xs font-semibold text-white/90 bg-white/10 px-2.5 py-1 rounded-full">{study.value}</span>
                <span className="text-[10px] sm:text-xs font-semibold text-white/90 bg-white/10 px-2.5 py-1 rounded-full">{study.industry}</span>
              </div>
              <p className="text-white/70 text-sm">{study.client}</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1">{study.title}</h1>

              {/* Hero metric */}
              <div className="mt-6 sm:mt-8 inline-flex items-end gap-3 bg-white/15 backdrop-blur-sm rounded-xl px-5 sm:px-6 py-3 sm:py-4">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-none"><AnimatedCounter value={study.heroMetric} /></span>
                <span className="text-sm text-white/80 pb-0.5">{study.heroMetricLabel}</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-xs sm:text-sm text-white/70">
                <span>Timeline: <strong className="text-white">{study.timeline}</strong></span>
                <span>Team: <strong className="text-white">{study.teamSize}</strong></span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Summary / Challenge / Solution */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            { title: "Summary", body: study.summary, color: "border-l-peach-400" },
            { title: "The Challenge", body: study.challenge, color: "border-l-amber-400" },
            { title: "Our Solution", body: study.solution, color: "border-l-emerald-400" },
          ].map((sec, i) => (
            <FadeIn key={sec.title} delay={i * 0.08}>
              <div className={`bg-white rounded-xl border border-warm-100 border-l-4 ${sec.color} p-5 sm:p-6 h-full`}>
                <h3 className="text-sm sm:text-base font-bold text-warm-800 mb-2">{sec.title}</h3>
                <p className="text-xs sm:text-sm text-warm-500 leading-relaxed">{sec.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Results Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
        <FadeIn className="text-center mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-warm-800">Results & <span className="text-peach-500">Impact</span></h2>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {study.results.map((r, i) => (
            <FadeIn key={r.label} delay={i * 0.06}>
              <div className="bg-white rounded-xl border border-warm-100 p-4 sm:p-5 text-center hover:shadow-lg hover:border-peach-200 transition-all">
                <p className="text-2xl sm:text-3xl font-extrabold text-warm-800"><AnimatedCounter value={r.metric} /></p>
                <p className="text-xs sm:text-sm font-bold text-peach-600 mt-1">{r.label}</p>
                <p className="text-[9px] sm:text-[10px] text-warm-400 mt-0.5">{r.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Architecture Flow — LIGHT themed, graphical */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
        <FadeIn className="text-center mb-6">
          <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-3 py-1 mb-3">
            <Database className="w-3 h-3 text-peach-500" />
            <span className="text-[10px] sm:text-xs font-semibold text-peach-700">ARCHITECTURE</span>
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-warm-800">Data <span className="text-peach-500">Architecture</span></h2>
        </FadeIn>

        <div className="bg-white rounded-2xl border border-warm-100 p-5 sm:p-8 shadow-sm">
          {study.architectureLayers.map((layer, i) => (
            <div key={layer.label}>
              <FadeIn delay={i * 0.1}>
                <div className={`rounded-xl border-2 p-4 sm:p-5 bg-gradient-to-r ${layer.color} bg-opacity-5`} style={{ borderColor: 'rgba(212,118,78,0.15)', background: `linear-gradient(135deg, rgba(255,248,243,1) 0%, rgba(255,241,232,0.5) 100%)` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center shadow-md shrink-0`}>
                      <span className="text-white font-bold text-sm sm:text-base">{i + 1}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-warm-800">{layer.label}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-0 sm:ml-[52px]">
                    {layer.items.map((item) => (
                      <span key={item} className="text-[10px] sm:text-xs font-medium text-warm-600 bg-white border border-warm-200 px-2.5 py-1 rounded-lg shadow-sm">{item}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
              {i < study.architectureLayers.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-peach-300" />
                    <ChevronDown className="w-5 h-5 text-peach-400 -mt-1" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Process Steps */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
        <FadeIn className="text-center mb-6">
          <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-3 py-1 mb-3">
            <Gauge className="w-3 h-3 text-peach-500" />
            <span className="text-[10px] sm:text-xs font-semibold text-peach-700">PROCESS</span>
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-warm-800">How we <span className="text-peach-500">delivered</span></h2>
        </FadeIn>

        <div className="space-y-3 sm:space-y-4">
          {study.processSteps.map((step, i) => {
            const StepIcon = step.icon;
            return (
              <FadeIn key={step.title} delay={i * 0.06}>
                <div className="bg-white rounded-xl border border-warm-100 p-4 sm:p-5 flex gap-4 items-start hover:shadow-md hover:border-peach-200 transition-all">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-peach-50 to-peach-100 border border-peach-200 flex items-center justify-center shrink-0 relative">
                    <StepIcon className="w-5 h-5 text-peach-600" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-peach-500 text-white text-[9px] font-bold flex items-center justify-center">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-warm-800 mb-1">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-warm-500 leading-relaxed mb-2">{step.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {step.tech.map((t) => (
                        <span key={t} className="text-[9px] sm:text-[10px] font-medium text-peach-700 bg-peach-50 border border-peach-200 px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
        <FadeIn className="text-center mb-5">
          <h2 className="text-lg sm:text-2xl font-bold text-warm-800">Tech <span className="text-peach-500">Stack</span></h2>
        </FadeIn>
        <FadeIn>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {study.techStack.map((tech, i) => (
              <motion.span key={tech} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                className="text-xs sm:text-sm font-medium text-warm-700 bg-white border border-warm-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-sm hover:border-peach-300 hover:text-peach-700 transition-all cursor-default">
                {tech}
              </motion.span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Testimonial */}
      {study.testimonial && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
          <FadeIn>
            <div className="bg-white rounded-2xl border border-peach-200 p-5 sm:p-8 relative overflow-hidden">
              <span className="absolute top-2 left-4 text-5xl sm:text-7xl font-serif text-peach-100 select-none">&ldquo;</span>
              <div className="relative z-10 pt-6 sm:pt-4">
                <p className="text-sm sm:text-base text-warm-700 italic leading-relaxed mb-4">&ldquo;{study.testimonial.quote}&rdquo;</p>
                <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map((j) => <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}</div>
                <p className="text-sm font-bold text-warm-800">{study.testimonial.name}</p>
                <p className="text-xs text-warm-500">{study.testimonial.role}</p>
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
        <FadeIn>
          <div className="bg-gradient-to-br from-peach-50 to-amber-50 border-2 border-peach-200 rounded-2xl p-6 sm:p-10 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-peach-400 to-peach-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse-glow">
              <Send className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-warm-800 mb-2">Start a similar project</h2>
            <p className="text-sm text-warm-500 mb-6 max-w-md mx-auto">Free consultation and project estimate within 24 hours.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="mailto:info@codes-ai.uk" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-peach-500 to-peach-600 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg text-sm hover:-translate-y-0.5 transition-all">
                <Mail className="w-4 h-4" /> info@codes-ai.uk
              </a>
              <a href="tel:+447586094540" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-warm-200 text-warm-600 font-medium px-6 py-3.5 rounded-xl text-sm hover:border-peach-300 transition-all">
                <Phone className="w-4 h-4" /> +44 7586 094540
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Other Case Studies */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16">
        <h2 className="text-lg sm:text-xl font-bold text-warm-800 mb-5 text-center">More Case Studies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {otherStudies.map((cs) => (
            <Link key={cs.slug} href={`/case-studies/${cs.slug}`}
              className="group bg-white rounded-xl border border-warm-100 overflow-hidden hover:shadow-lg hover:border-peach-200 transition-all hover:-translate-y-0.5">
              <div className={`bg-gradient-to-r ${cs.gradient} p-4`}>
                <span className="text-[10px] font-bold text-white bg-white/20 px-2 py-0.5 rounded-full">{cs.category}</span>
                <h3 className="text-sm font-bold text-white mt-2">{cs.title}</h3>
                <p className="text-[10px] text-white/80">{cs.client}</p>
              </div>
              <div className="p-4">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-xl font-extrabold text-warm-800">{cs.heroMetric}</span>
                  <span className="text-[10px] text-warm-500">{cs.heroMetricLabel}</span>
                </div>
                <span className="text-peach-500 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Read more <ArrowUpRight className="w-3.5 h-3.5" /></span>
              </div>
            </Link>
          ))}
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
