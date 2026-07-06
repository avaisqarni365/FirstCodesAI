"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Starburst } from "@/components/vibe";
import { MARKETING_STEPS, MARKET_REGIONS } from "@/lib/marketing-data";

/**
 * Remote Marketing — sell "market any product, in any country".
 * Animated world motif (hub → regions with drawing arcs) + a 4-step process flow.
 */
export function RemoteMarketing() {
  const hub = { x: 47, y: 30 }; // UK hub

  return (
    <section id="marketing" className="py-14 sm:py-24 bg-warm-50 relative overflow-hidden">
      <div className="absolute -top-24 left-1/3 w-96 h-96 rounded-full bg-peach-200/30 blur-[100px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 bg-white border border-warm-200 rounded-full px-3 py-1.5 mb-4 shadow-sm">
            <Starburst size={12} className="text-peach-500" />
            <span className="text-[10px] sm:text-xs font-semibold text-peach-600">// REMOTE MARKETING</span>
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-warm-800 tracking-tight">Market any product. <span className="text-peach-500">Any country.</span></h2>
          <p className="mt-3 text-sm sm:text-base text-warm-600 max-w-xl mx-auto">We run your growth from a remote desk — research, localise, launch and optimise across every region you sell to.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Geo motif */}
          <div className="relative aspect-[4/3] rounded-2xl border border-warm-200 bg-white overflow-hidden shadow-sm">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#191919 1px, transparent 1px), linear-gradient(90deg, #191919 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            <svg viewBox="0 0 100 75" className="absolute inset-0 w-full h-full" fill="none">
              {MARKET_REGIONS.filter((r) => r.code !== "UK").map((r, i) => {
                const midX = (hub.x + r.x) / 2;
                const midY = Math.min(hub.y, r.y) - 12;
                const d = `M ${hub.x} ${hub.y} Q ${midX} ${midY} ${r.x} ${r.y}`;
                return (
                  <motion.path
                    key={r.code}
                    d={d}
                    stroke="var(--color-peach-400)"
                    strokeWidth={0.5}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.7 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
                  />
                );
              })}
            </svg>
            {/* Hub */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
            >
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-peach-500/40 animate-ping" />
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-peach-500 to-peach-600 flex items-center justify-center shadow-lg">
                  <Starburst size={16} className="text-white" spin />
                </div>
              </div>
            </motion.div>
            {/* Region pins */}
            {MARKET_REGIONS.filter((r) => r.code !== "UK").map((r, i) => (
              <motion.div
                key={r.code}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.15 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${r.x}%`, top: `${r.y}%` }}
              >
                <span className="px-2 py-0.5 rounded-full bg-white border border-peach-200 text-[9px] font-bold text-peach-600 shadow-sm">{r.code}</span>
              </motion.div>
            ))}
          </div>

          {/* Process flow */}
          <div>
            <div className="space-y-3">
              {MARKETING_STEPS.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-white rounded-xl border border-warm-200 p-4 hover:border-peach-200 hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-peach-100 text-peach-600 flex items-center justify-center shrink-0">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-warm-800">{s.title}</h4>
                    <p className="text-xs text-warm-500">{s.desc}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-warm-300">0{i + 1}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/services/global-lead-generation" className="inline-flex items-center gap-2 bg-peach-500 hover:bg-peach-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg text-sm hover:-translate-y-0.5 transition-all">
                Market my product <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
