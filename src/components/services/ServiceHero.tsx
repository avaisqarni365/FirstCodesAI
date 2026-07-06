"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { MacWindow, Starburst } from "@/components/vibe";
import type { ServiceData } from "@/lib/services-data";
import { type ServiceVariantMeta, accentOf } from "@/lib/service-variants";

/**
 * Bespoke service hero — an animated macOS terminal window that "runs" the
 * service, listing its process steps as build output. Accent-coloured per service.
 */
export function ServiceHero({ service, meta }: { service: ServiceData; meta: ServiceVariantMeta }) {
  const a = accentOf(meta.accent);
  return (
    <section className="relative pt-24 sm:pt-32 pb-10 sm:pb-16 overflow-hidden bg-warm-50">
      <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[130%] aspect-square aurora-bg pointer-events-none opacity-[0.14]" aria-hidden />
      <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full ${a.bg} opacity-40 blur-[100px]`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <Link href="/services" className="inline-flex items-center gap-1 text-warm-500 text-xs sm:text-sm mb-6 hover:text-peach-500 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> All Services
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`inline-flex items-center gap-2 bg-white border ${a.border} rounded-full px-3 py-1.5 mb-5 shadow-sm`}>
              <Starburst size={12} className={a.textStrong} />
              <span className={`text-[10px] font-semibold ${a.text}`}>// {meta.tagWord}</span>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-800 leading-[1.08] tracking-tight">
              {service.title}
            </h1>
            <p className="mt-4 text-sm sm:text-lg text-warm-600 leading-relaxed max-w-lg">{service.tagline}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="mailto:info@codes-ai.uk" className={`inline-flex items-center gap-2 bg-gradient-to-r ${a.grad} text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg text-sm hover:-translate-y-0.5 transition-all`}>
                Start this service
              </a>
              <Link href="/studio" className="inline-flex items-center gap-2 bg-white border border-warm-200 text-warm-700 font-medium px-6 py-3.5 rounded-xl hover:border-peach-300 hover:bg-peach-50 transition-all shadow-sm text-sm">
                Build in Studio
              </Link>
            </div>
          </div>

          {/* Terminal — runs the service */}
          <MacWindow title={meta.window} dark className="mac-window--dark" bodyClassName="p-4 bg-[#1c1a19]">
            <div className="font-mono text-xs space-y-1.5 leading-relaxed">
              <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <span className={a.textStrong}>$</span> <span className="text-emerald-400">{meta.command.split(" ")[0]}</span>{" "}
                <span className="text-warm-300">{meta.command.split(" ").slice(1).join(" ")}</span>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-warm-500">// {service.description.slice(0, 52)}…</motion.div>
              {service.process.map((step, i) => (
                <motion.div key={step.step} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.28 }}>
                  <span className={a.textStrong}>✦</span> <span className="text-warm-200">{step.title}</span>{" "}
                  <span className="text-warm-500">→ {step.desc.slice(0, 34)}…</span>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + service.process.length * 0.28 }} className="pt-1.5 border-t border-white/10 mt-1">
                <span className="text-emerald-400 font-bold">✓ operational</span> <span className="text-warm-500">· fully remote · worldwide</span>
              </motion.div>
            </div>
          </MacWindow>
        </div>
      </div>
    </section>
  );
}
