"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { MacWindow, Starburst } from "@/components/vibe";
import { PRODUCT_INTROS } from "@/lib/marketing-data";
import { accentOf } from "@/lib/service-variants";

/**
 * Persuasive, alternating product intros — each in its own macOS window with a
 * mini product "screenshot", problem→solution copy, proof stats, and a CTA.
 */
export function ProductIntros() {
  return (
    <section id="products" className="py-14 sm:py-24 bg-white border-y border-warm-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 bg-warm-50 border border-warm-200 rounded-full px-3 py-1.5 mb-4">
            <Starburst size={12} className="text-peach-500" />
            <span className="text-[10px] sm:text-xs font-semibold text-peach-600">// OUR PRODUCTS</span>
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-warm-800 tracking-tight">Software we&apos;ve <span className="text-peach-500">shipped</span></h2>
          <p className="mt-3 text-sm sm:text-base text-warm-600 max-w-xl mx-auto">Live products of CODES AI LIMITED — vibe-coded end-to-end. Proof that we build what we sell.</p>
        </div>

        <div className="space-y-16 sm:space-y-24">
          {PRODUCT_INTROS.map((p, i) => {
            const a = accentOf(p.accent);
            const flip = i % 2 === 1;
            return (
              <div key={p.name} className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                {/* copy */}
                <motion.div
                  initial={{ opacity: 0, x: flip ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                  className={flip ? "lg:order-2" : ""}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.grad} flex items-center justify-center shadow-lg`}>
                      <p.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-warm-800">{p.name}</h3>
                      <p className={`text-xs font-mono ${a.text}`}>{p.domain}</p>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg font-semibold text-warm-800 mb-3">{p.tagline}</p>
                  <p className="text-sm text-warm-500 leading-relaxed mb-2"><span className="font-semibold text-warm-700">The problem:</span> {p.problem}</p>
                  <p className="text-sm text-warm-600 leading-relaxed mb-5"><span className="font-semibold text-warm-700">What we built:</span> {p.solution}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.proof.map((pr) => (
                      <div key={pr.label} className={`px-3 py-2 rounded-xl border ${a.border} ${a.bgSoft}`}>
                        <span className={`text-lg font-bold ${a.text}`}>{pr.stat}</span>
                        <span className="text-[10px] text-warm-500 ml-1.5">{pr.label}</span>
                      </div>
                    ))}
                  </div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 bg-gradient-to-r ${a.grad} text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all text-sm`}>
                    {p.cta} <ArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.div>

                {/* product window */}
                <div className={flip ? "lg:order-1" : ""}>
                  <MacWindow title={p.window} className="max-w-md mx-auto" bodyClassName="p-0">
                    <div className={`px-5 py-4 bg-gradient-to-br ${a.grad}`}>
                      <div className="flex items-center gap-2 text-white">
                        <p.icon className="w-5 h-5" />
                        <span className="font-bold text-sm">{p.name}</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      {p.screen.map((row, j) => (
                        <motion.div
                          key={row.label}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + j * 0.12 }}
                          className="flex items-center justify-between rounded-lg border border-warm-100 bg-warm-50 px-3 py-2.5"
                        >
                          <span className="flex items-center gap-2 text-xs text-warm-700">
                            <Check className={`w-3.5 h-3.5 ${a.text}`} /> {row.label}
                          </span>
                          <span className={`text-xs font-mono font-semibold ${a.text}`}>{row.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </MacWindow>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
