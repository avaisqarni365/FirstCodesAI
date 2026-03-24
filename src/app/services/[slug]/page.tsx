"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Code2, Star, CheckCircle2, ChevronDown, Mail, Phone, Sparkles } from "lucide-react";
import { servicesData } from "@/lib/services-data";
import { useState } from "react";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData.find((s) => s.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-warm-800">Service not found</h1>
          <Link href="/services" className="text-peach-500 mt-4 inline-block">View all services</Link>
        </div>
      </div>
    );
  }

  const otherServices = servicesData.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-warm-100/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/logo.svg" alt="CODES AI" width={160} height={40} priority className="h-9 w-auto" />
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {[["Home", "/"], ["Services", "/services"], ["About", "/about"]].map(([l, h]) => (
              <Link key={l} href={h} className="text-sm font-medium text-warm-500 hover:text-peach-600 transition-colors">{l}</Link>
            ))}
          </div>
          <Link href="/login" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-peach-500 to-peach-600 px-5 py-2.5 rounded-xl shadow-lg shadow-peach-300/30 hover:-translate-y-0.5 transition-all">
            Client Portal <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className={`pt-24 pb-16 sm:pt-28 sm:pb-20 bg-gradient-to-br ${service.gradient} relative overflow-hidden`}>
        <div className="absolute -top-20 -right-20 w-60 sm:w-96 h-60 sm:h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 sm:w-72 h-48 sm:h-72 bg-black/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/services" className="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Services
            </Link>
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                <service.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">{service.title}</h1>
                <p className="mt-3 text-lg sm:text-xl text-white/80 max-w-2xl">{service.tagline}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 sm:py-16 bg-[#FEFAF6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-warm-800 mb-4">Overview</h2>
              <p className="text-warm-500 leading-relaxed text-base sm:text-lg">{service.longDescription}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-warm-100 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-warm-800 mb-4">Key Benefits</h3>
                <div className="space-y-3">
                  {service.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-warm-600">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-warm-800 tracking-tight">Our <span className="text-peach-500">process</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {service.process.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group p-5 sm:p-6 rounded-2xl bg-[#FEFAF6] border border-warm-100 hover:border-peach-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
              >
                <span className="absolute top-3 right-3 text-3xl sm:text-4xl font-black text-warm-100 group-hover:text-peach-100 transition-colors">{step.step}</span>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-sm font-bold text-warm-800 mb-1">{step.title}</h3>
                <p className="text-xs text-warm-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 sm:py-20 bg-[#FEFAF6]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-warm-800 tracking-tight">Technologies we <span className="text-peach-500">use</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {service.technologies.map((tech, i) => (
              <motion.div key={tech.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-warm-100 p-6 hover:shadow-lg transition-all"
              >
                <h3 className="text-sm font-bold text-warm-800 mb-4 pb-3 border-b border-warm-100">{tech.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item) => (
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

      {/* Case Studies */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-warm-800 tracking-tight">Real-world <span className="text-peach-500">results</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {service.useCases.map((uc, i) => (
              <motion.div key={uc.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#FEFAF6] rounded-2xl border border-warm-100 p-6 sm:p-7 hover:shadow-xl hover:border-peach-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${service.gradient} text-white text-[10px] font-bold mb-4`}>
                  {uc.metric}
                </div>
                <h3 className="text-base font-bold text-warm-800 mb-2">{uc.title}</h3>
                <p className="text-sm text-warm-500 leading-relaxed">{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-[#FEFAF6]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-warm-800 tracking-tight">Frequently <span className="text-peach-500">asked</span></h2>
          </motion.div>
          <div className="space-y-3">
            {service.faq.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-warm-100 overflow-hidden"
              >
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-warm-50/50 transition-colors"
                >
                  <span className="text-sm font-semibold text-warm-800 pr-4">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-warm-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <p className="text-sm text-warm-500 leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 sm:py-20 bg-gradient-to-br ${service.gradient} relative overflow-hidden`}>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to get started with {service.title}?</h2>
          <p className="text-white/80 mb-8">Free consultation and project estimate within 24 hours.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:info@codes-ai.uk" className="inline-flex items-center gap-2 bg-white text-warm-800 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-sm w-full sm:w-auto justify-center">
              <Mail className="w-4 h-4" /> info@codes-ai.uk
            </a>
            <a href="tel:+447586094540" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-2xl hover:bg-white/20 transition-all text-sm w-full sm:w-auto justify-center">
              <Phone className="w-4 h-4" /> +44 7586 094540
            </a>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-warm-800 mb-8 text-center">Other services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}
                className="group p-5 sm:p-6 rounded-2xl bg-[#FEFAF6] border border-warm-100 hover:border-peach-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-3 sm:mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-warm-800">{s.title}</h3>
                <p className="text-xs text-warm-500 mt-1">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warm-900 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center"><Code2 className="w-4 h-4 text-white" /></div>
            <span className="font-bold text-white">CODES <span className="text-peach-400">AI</span></span>
          </div>
          <p className="text-[10px] text-warm-600">&copy; 2026 CODES AI LIMITED (16078672). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
