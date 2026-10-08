"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, Mail, Phone, Menu, X } from "lucide-react";
import { servicesData } from "@/lib/services-data";
import { SERVICE_VARIANTS, DEFAULT_VARIANT, accentOf } from "@/lib/service-variants";
import { Starburst, FadeIn } from "@/components/vibe";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ProcessGraphic } from "@/components/services/ProcessGraphic";
import { Wordmark } from "@/components/marketing/Wordmark";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData.find((s) => s.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-warm-800">Service not found</h1>
          <Link href="/services" className="text-peach-500 mt-4 inline-block">View all services</Link>
        </div>
      </div>
    );
  }

  const meta = SERVICE_VARIANTS[slug] ?? DEFAULT_VARIANT;
  const a = accentOf(meta.accent);
  const otherServices = servicesData.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="grain min-h-screen bg-warm-50 text-warm-800 font-mono overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-50/85 backdrop-blur-lg border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Starburst size={22} className="text-peach-500" />
            <Wordmark />
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            {[["Studio", "/studio"], ["Services", "/services"], ["Case Studies", "/case-studies"], ["About", "/about"]].map(([l, h]) => (
              <Link key={l} href={h} className={`transition-colors ${h === "/services" ? "text-peach-600 font-semibold" : "text-warm-600 hover:text-peach-600"}`}>{l}</Link>
            ))}
            <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-peach-500 hover:bg-peach-600 px-4 py-2 rounded-lg transition-colors">
              Portal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 -mr-2 text-warm-700" aria-label="Menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-warm-50 border-t border-warm-200 overflow-hidden">
              <div className="px-4 py-4 space-y-1">
                {[["Studio", "/studio"], ["All Services", "/services"], ["Case Studies", "/case-studies"], ["About CEO", "/about"]].map(([l, h]) => (
                  <Link key={l} href={h} onClick={() => setMenuOpen(false)} className="block px-3 py-3 text-base text-warm-700 hover:bg-peach-50 rounded-lg">{l}</Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Bespoke hero (per-variant terminal) ── */}
      <ServiceHero service={service} meta={meta} />

      {/* ── Overview + benefits ── */}
      <section className="py-10 sm:py-16 bg-white border-y border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-12">
            <FadeIn className="lg:col-span-3">
              <span className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${a.text} flex items-center gap-2`}><Starburst size={12} className={a.textStrong} /> Overview</span>
              <p className="mt-3 text-sm sm:text-lg text-warm-600 leading-relaxed">{service.longDescription}</p>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-2">
              <div className={`rounded-2xl border ${a.border} ${a.bgSoft} p-5 sm:p-6`}>
                <h3 className="text-sm font-bold text-warm-800 mb-4">Key benefits</h3>
                <div className="space-y-3">
                  {service.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-warm-700">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Bespoke process graphic ── */}
      <section className="py-12 sm:py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-8 sm:mb-14">
            <span className={`inline-flex items-center gap-2 bg-white border ${a.border} rounded-full px-3 py-1 mb-4`}>
              <Starburst size={12} className={a.textStrong} />
              <span className={`text-[10px] sm:text-xs font-semibold ${a.text}`}>// HOW IT FLOWS</span>
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-warm-800 tracking-tight">How we <span className={a.textStrong}>deliver</span></h2>
          </FadeIn>
          <ProcessGraphic service={service} meta={meta} />
        </div>
      </section>

      {/* ── Technologies ── */}
      <section className="py-12 sm:py-20 bg-white border-y border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-8 sm:mb-14">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-warm-800 tracking-tight">The <span className={a.textStrong}>stack</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {service.technologies.map((tech, i) => (
              <FadeIn key={tech.category} delay={i * 0.08}>
                <div className="bg-warm-50 rounded-2xl border border-warm-100 p-5 sm:p-6 hover:shadow-lg transition-all h-full">
                  <h3 className={`text-xs sm:text-sm font-bold text-warm-800 mb-3 pb-2.5 border-b ${a.border}`}>{tech.category}</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {tech.items.map((item) => (
                      <span key={item} className={`px-2.5 py-1.5 bg-white text-warm-600 text-[10px] sm:text-xs font-medium rounded-lg border border-warm-100 hover:${a.border} hover:${a.bgSoft} transition-colors`}>
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

      {/* ── Use cases ── */}
      <section className="py-12 sm:py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-8 sm:mb-14">
            <span className={`inline-flex items-center gap-2 ${a.bgSoft} border ${a.border} rounded-full px-3 py-1 mb-4`}>
              <span className={`text-[10px] sm:text-xs font-semibold ${a.text}`}>// RESULTS</span>
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-warm-800 tracking-tight">Real-world <span className={a.textStrong}>impact</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {service.useCases.map((uc, i) => (
              <FadeIn key={uc.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-warm-100 p-5 sm:p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${a.grad} text-white text-[10px] font-bold mb-4`}>{uc.metric}</div>
                  <h3 className="text-sm sm:text-base font-bold text-warm-800 mb-2">{uc.title}</h3>
                  <p className="text-xs sm:text-sm text-warm-500 leading-relaxed">{uc.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-12 sm:py-20 bg-white border-t border-warm-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-3xl font-bold text-warm-800 tracking-tight">Frequently <span className={a.textStrong}>asked</span></h2>
          </FadeIn>
          <div className="space-y-2 sm:space-y-3">
            {service.faq.map((item, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="bg-warm-50 rounded-xl border border-warm-100 overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-warm-100/50 transition-colors">
                    <span className="text-xs sm:text-sm font-semibold text-warm-800 pr-4">{item.q}</span>
                    <ChevronDown className={`w-4 h-4 ${a.textStrong} shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5"><p className="text-xs sm:text-sm text-warm-500 leading-relaxed">{item.a}</p></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`py-14 sm:py-20 ${a.bgSoft} border-t ${a.border} relative overflow-hidden`}>
        <div className={`absolute top-0 right-1/4 w-48 sm:w-96 h-48 sm:h-96 ${a.bg} opacity-30 rounded-full blur-3xl`} />
        <FadeIn className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <Starburst size={40} className={`${a.textStrong} mx-auto mb-5 animate-starburst`} />
          <h2 className="text-xl sm:text-3xl font-bold text-warm-800 mb-3">Ready for {service.title}?</h2>
          <p className="text-sm sm:text-base text-warm-600 mb-6 sm:mb-8">Free consultation and project estimate within 24 hours — or price it yourself in the Studio.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:info@codes-ai.uk" className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r ${a.grad} text-white font-semibold px-6 sm:px-8 py-3.5 rounded-xl shadow-lg hover:-translate-y-1 transition-all text-sm`}>
              <Mail className="w-4 h-4" /> info@codes-ai.uk
            </a>
            <Link href="/studio" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-warm-200 text-warm-700 font-medium px-6 sm:px-8 py-3.5 rounded-xl hover:border-peach-300 hover:bg-peach-50 shadow-sm transition-all text-sm">
              Build in Studio
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── Other services ── */}
      <section className="py-12 sm:py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl font-bold text-warm-800 mb-6 sm:mb-8 text-center">Other services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
            {otherServices.map((s) => {
              const sm = SERVICE_VARIANTS[s.slug] ?? DEFAULT_VARIANT;
              const sa = accentOf(sm.accent);
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="group p-4 sm:p-6 rounded-2xl bg-white border border-warm-100 hover:border-peach-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${sa.grad} flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-warm-800">{s.title}</h3>
                  <p className="text-[10px] sm:text-xs text-warm-500 mt-1 line-clamp-2">{s.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warm-50 border-t border-warm-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Starburst size={18} className="text-peach-500" />
            <Wordmark size="sm" />
          </Link>
          <p className="text-[9px] sm:text-[10px] text-warm-500">&copy; 2026 CODES AI LIMITED (16078672). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
