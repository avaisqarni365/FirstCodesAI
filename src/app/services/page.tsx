"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Code2, Sparkles, Menu, X } from "lucide-react";
import { servicesData } from "@/lib/services-data";
import { useState } from "react";

export default function ServicesPage() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-warm-100/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/logo.svg" alt="CODES AI" width={160} height={40} priority className="h-9 w-auto" />
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {[["Home", "/"], ["Services", "/services"], ["About CEO", "/about"]].map(([l, h]) => (
              <Link key={l} href={h} className={`text-sm font-medium transition-colors ${h === "/services" ? "text-peach-600" : "text-warm-500 hover:text-peach-600"}`}>{l}</Link>
            ))}
          </div>
          <Link href="/login" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-peach-500 to-peach-600 px-5 py-2.5 rounded-xl shadow-lg shadow-peach-300/30 hover:-translate-y-0.5 transition-all">
            Client Portal <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-[#FEF9F4] to-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-peach-200/30 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-peach-50 border border-peach-200 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-peach-500" />
              <span className="text-xs font-semibold text-peach-700">// ALL SERVICES</span>
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold text-warm-800 tracking-tight">
              Everything we <span className="text-peach-500">build</span>
            </h1>
            <p className="mt-4 text-lg text-warm-500 max-w-2xl mx-auto">
              9 core services covering the full spectrum of modern software engineering — from AI and data to cloud and security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, i) => (
              <motion.div key={service.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link href={`/services/${service.slug}`}
                  className="group block p-7 rounded-2xl bg-[#FEFAF6] border border-warm-100 hover:border-peach-200 hover:shadow-2xl hover:shadow-peach-100/40 transition-all duration-500 hover:-translate-y-2 h-full"
                >
                  {i === 0 && (
                    <span className="inline-block mb-3 bg-gradient-to-r from-peach-500 to-amber-500 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full">MOST POPULAR</span>
                  )}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-warm-800 mb-2">{service.title}</h3>
                  <p className="text-sm text-warm-500 leading-relaxed mb-4">{service.description}</p>
                  <span className="text-peach-500 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    View details <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-warm-800 to-warm-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not sure which service you need?</h2>
          <p className="text-warm-400 mb-8">Book a free consultation — we&apos;ll help you figure out the best approach for your project.</p>
          <a href="mailto:info@codes-ai.uk" className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-500 to-peach-400 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-sm">
            Book Free Consultation <ArrowRight className="w-4 h-4" />
          </a>
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
