"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Code2, CheckCircle2, ChevronDown, Mail, Phone, Sparkles, Menu, X, Award, Star, Gauge, Send } from "lucide-react";
import { servicesData } from "@/lib/services-data";
import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";

// unused import cleanup


const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay, duration: 0.5, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData.find((s) => s.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Service not found</h1>
          <Link href="/services" className="text-peach-400 mt-4 inline-block">View all services</Link>
        </div>
      </div>
    );
  }

  const otherServices = servicesData.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-warm-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center shadow-md">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="font-bold text-warm-800 text-base sm:text-lg tracking-tight">CODES<span className="text-peach-500">AI</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {[["Services", "/services"], ["Case Studies", "/case-studies"], ["About", "/about"]].map(([l, h]) => (
              <Link key={l} href={h} className={`text-sm font-medium transition-colors ${h === "/services" ? "text-peach-600" : "text-warm-500 hover:text-peach-600"}`}>{l}</Link>
            ))}
            <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-gradient-to-r from-peach-500 to-peach-600 px-4 py-2 rounded-lg shadow-md">
              Portal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 -mr-2" aria-label="Menu">
            {menuOpen ? <X className="w-6 h-6 text-warm-600" /> : <Menu className="w-6 h-6 text-warm-600" />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t overflow-hidden">
              <div className="px-4 py-4 space-y-1">
                {[["All Services", "/services"], ["Case Studies", "/case-studies"], ["About CEO", "/about"], ["Contact", "/#contact"]].map(([l, h]) => (
                  <Link key={l} href={h} onClick={() => setMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-warm-700 hover:bg-peach-50 rounded-lg">{l}</Link>
                ))}
                <Link href="/login" onClick={() => setMenuOpen(false)} className="block mt-2 text-center text-sm font-semibold text-white bg-peach-500 py-3 rounded-xl">Client Portal</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══ DARK HERO ═══ */}
      <section className="relative pt-14 sm:pt-16 pb-12 sm:pb-20 bg-gradient-to-b from-warm-900 via-[#1a1510] to-warm-900 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-peach-500/10 blur-[80px]" />
        <div className="absolute -bottom-32 -left-32 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-violet-500/8 blur-[60px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(212,118,78,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,118,78,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/services" className="inline-flex items-center gap-1 text-warm-500 text-xs sm:text-sm mb-6 hover:text-peach-400 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> All Services
            </Link>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shrink-0 shadow-xl animate-pulse-glow`}>
                <service.icon className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-3">
                  <Sparkles className="w-3 h-3 text-peach-400" />
                  <span className="text-[10px] font-mono font-semibold text-warm-300">// SERVICE</span>
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">{service.title}</h1>
                <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-warm-400 max-w-2xl">{service.tagline}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ OVERVIEW + BENEFITS ═══ */}
      <section className="py-10 sm:py-16 bg-[#FEFAF6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-12">
            <FadeIn className="lg:col-span-3">
              <h2 className="text-xl sm:text-2xl font-bold text-warm-800 mb-3 sm:mb-4">Overview</h2>
              <p className="text-sm sm:text-base text-warm-500 leading-relaxed">{service.longDescription}</p>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-2">
              <div className="bg-white rounded-xl sm:rounded-2xl border border-warm-100 p-5 sm:p-6 shadow-sm">
                <h3 className="text-sm font-bold text-warm-800 mb-3 sm:mb-4">Key Benefits</h3>
                <div className="space-y-2.5 sm:space-y-3">
                  {service.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-warm-600">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ PROCESS (dark section like landing page) ═══ */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-warm-900 to-[#0d0b09] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(212,118,78,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,118,78,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <FadeIn className="text-center mb-8 sm:mb-14">
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4 font-mono">
              <Gauge className="w-3 h-3 text-peach-400" />
              <span className="text-[10px] sm:text-xs font-semibold text-warm-300">// OUR PROCESS</span>
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">How we <span className="text-peach-400">deliver</span></h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {service.process.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.08}>
                <div className="group bg-white/[0.04] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:bg-white/[0.08] hover:border-peach-500/30 transition-all duration-300 h-full relative">
                  <span className="absolute top-2 right-3 text-2xl font-black text-white/[0.04]">{step.step}</span>
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-[10px] sm:text-xs text-warm-500 leading-relaxed">{step.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-2 sm:mt-3">
                    {(step.tech || []).map((t) => (
                      <span key={t} className="px-1.5 py-0.5 bg-white/5 text-[8px] sm:text-[9px] text-warm-400 rounded font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TECHNOLOGIES ═══ */}
      <section className="py-12 sm:py-20 bg-[#FEFAF6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-8 sm:mb-14">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-warm-800 tracking-tight">Technologies we <span className="text-peach-500">use</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {service.technologies.map((tech, i) => (
              <FadeIn key={tech.category} delay={i * 0.08}>
                <div className="bg-white rounded-xl sm:rounded-2xl border border-warm-100 p-5 sm:p-6 hover:shadow-lg transition-all h-full">
                  <h3 className="text-xs sm:text-sm font-bold text-warm-800 mb-3 pb-2.5 border-b border-warm-100">{tech.category}</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {tech.items.map((item) => (
                      <span key={item} className="px-2 sm:px-2.5 py-1 sm:py-1.5 bg-warm-50 text-warm-600 text-[10px] sm:text-xs font-medium rounded-md sm:rounded-lg border border-warm-100 hover:border-peach-200 hover:bg-peach-50 hover:text-peach-700 transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CASE STUDIES ═══ */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-8 sm:mb-14">
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-3 py-1 mb-4">
              <Award className="w-3 h-3 text-peach-500" />
              <span className="text-[10px] sm:text-xs font-semibold text-peach-700">// RESULTS</span>
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-warm-800 tracking-tight">Real-world <span className="text-peach-500">impact</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {service.useCases.map((uc, i) => (
              <FadeIn key={uc.title} delay={i * 0.08}>
                <div className="bg-[#FEFAF6] rounded-xl sm:rounded-2xl border border-warm-100 p-5 sm:p-7 hover:shadow-xl hover:border-peach-200 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className={`inline-flex px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r ${service.gradient} text-white text-[9px] sm:text-[10px] font-bold mb-3 sm:mb-4`}>
                    {uc.metric}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-warm-800 mb-1.5 sm:mb-2">{uc.title}</h3>
                  <p className="text-xs sm:text-sm text-warm-500 leading-relaxed">{uc.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-12 sm:py-20 bg-[#FEFAF6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-3xl font-bold text-warm-800 tracking-tight">Frequently <span className="text-peach-500">asked</span></h2>
          </FadeIn>
          <div className="space-y-2 sm:space-y-3">
            {service.faq.map((item, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="bg-white rounded-lg sm:rounded-xl border border-warm-100 overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-warm-50/50 transition-colors">
                    <span className="text-xs sm:text-sm font-semibold text-warm-800 pr-4">{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-warm-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                          <p className="text-xs sm:text-sm text-warm-500 leading-relaxed">{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA (dark like landing) ═══ */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-warm-900 via-[#0d0b09] to-warm-900 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-peach-500/5 rounded-full blur-3xl" />
        <FadeIn className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-peach-400 to-peach-600 rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-2xl animate-pulse-glow">
            <Send className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-3">Ready for {service.title}?</h2>
          <p className="text-sm sm:text-base text-warm-400 mb-6 sm:mb-8">Free consultation and project estimate within 24 hours.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:info@codes-ai.uk" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-peach-500 to-peach-400 text-white font-semibold px-6 sm:px-8 py-3.5 rounded-xl shadow-xl hover:-translate-y-1 transition-all text-sm">
              <Mail className="w-4 h-4" /> info@codes-ai.uk
            </a>
            <a href="tel:+447586094540" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-6 sm:px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all text-sm">
              <Phone className="w-4 h-4" /> +44 7586 094540
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ═══ OTHER SERVICES ═══ */}
      <section className="py-12 sm:py-16 bg-[#FEFAF6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl font-bold text-warm-800 mb-6 sm:mb-8 text-center">Other services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}
                className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-warm-100 hover:border-peach-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                  <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-warm-800">{s.title}</h3>
                <p className="text-[10px] sm:text-xs text-warm-500 mt-1 line-clamp-2">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warm-900 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center"><Code2 className="w-3.5 h-3.5 text-white" /></div>
            <span className="font-bold text-white text-sm">CODES<span className="text-peach-400">AI</span></span>
          </Link>
          <p className="text-[9px] sm:text-[10px] text-warm-600">&copy; 2026 CODES AI LIMITED (16078672). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
