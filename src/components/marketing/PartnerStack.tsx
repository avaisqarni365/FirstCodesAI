"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PARTNERS, STACK_TRAIL } from "@/lib/marketing-data";

/**
 * Claude Startups + NVIDIA Inception.
 * Editorial cards in the ACCA / Kontai register: cream, hairline, teal.
 */
export function PartnerStack() {
  return (
    <section id="partners" className="py-16 sm:py-24 bg-canvas border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-brass uppercase mb-4">
            Claude Startups · NVIDIA Inception
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-[1.05]">
            Claude reasons.
            <br />
            NVIDIA runs it.
          </h2>
          <p className="mt-5 text-sm sm:text-base text-ink/70 leading-relaxed max-w-2xl">
            CODES AI is joining both startup programmes. The products are already built for the stack those programmes exist to support: Claude for the judgement, NVIDIA hardware for the compute. ACCA is where that is easiest to see.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-5">
          {PARTNERS.map((p, i) => {
            const claude = p.tone === "claude";
            return (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="bg-white border border-line rounded-[12px] p-6 sm:p-8 flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${claude ? "bg-peach-100 text-peach-700" : "bg-nvidia-50 text-nvidia-700"}`}>
                      <p.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-ink tracking-tight">{p.name}</h3>
                      <p className="text-xs text-ink/50">{p.by}</p>
                    </div>
                  </div>
                  <span className={`shrink-0 font-mono text-[10px] font-semibold px-2.5 py-1 rounded-full ${claude ? "bg-peach-50 text-peach-700" : "bg-nvidia-50 text-nvidia-700"}`}>
                    {p.programme}
                  </span>
                </div>
                <p className="text-sm text-ink/80 leading-relaxed mb-6">{p.lead}</p>
                <ol className="space-y-4 mb-8">
                  {p.points.map((pt, n) => (
                    <li key={pt.title} className="flex gap-3">
                      <span className="font-mono text-[11px] font-semibold text-ink/35 pt-0.5">0{n + 1}</span>
                      <div>
                        <p className="text-sm font-semibold text-ink">{pt.title}</p>
                        <p className="text-sm text-ink/60 leading-relaxed mt-0.5">{pt.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-flex items-center gap-1.5 text-sm font-semibold ${claude ? "text-peach-700" : "text-nvidia-700"}`}
                >
                  {p.programme} <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-4 bg-white border border-line rounded-[12px] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-brass uppercase mb-2">ACCA · the proof</p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">One document. A trail you can read.</h3>
            </div>
            <p className="text-sm text-ink/60 max-w-sm">This is the path inside Kontai on acca.codes-ai.uk — Claude decides, NVIDIA serves, the ledger keeps the reason.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {STACK_TRAIL.map((step) => (
              <div key={step.n} className="rounded-[12px] bg-mist border border-line p-4">
                <p className="font-mono text-[11px] font-semibold text-teal-600">{step.n}</p>
                <p className="mt-2 text-sm font-semibold text-ink">{step.title}</p>
                <p className="mt-1 text-xs text-ink/60 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
