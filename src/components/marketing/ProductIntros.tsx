"use client";

import { ArrowUpRight } from "lucide-react";
import { PRODUCT_INTROS } from "@/lib/marketing-data";

/**
 * Product launches in the Kontai register: one card, a number, a ledger.
 * Claude and NVIDIA are named in the row, not painted as a second theme.
 */
export function ProductIntros() {
  return (
    <section id="products" className="py-20 sm:py-28 bg-canvas border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-brass uppercase">Launching</p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-[1.05]">
            Three products.
            <br />
            One stack.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ink/70 leading-relaxed">
            ACCA is the full demonstration. Claude does the judgement. NVIDIA hardware does the compute. The booking keeps the reason.
          </p>
        </div>

        <div className="space-y-4">
          {PRODUCT_INTROS.map((p, i) => (
            <article key={p.name} className="bg-white border border-line rounded-[12px] overflow-hidden">
              <div className="grid lg:grid-cols-12">
                <div className="lg:col-span-7 p-6 sm:p-8">
                  <p className="font-mono text-[11px] font-semibold text-teal-600">
                    0{i + 1} / 03
                    <span className="text-ink/35"> · {p.domain}</span>
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-ink tracking-tight">{p.name}</h3>
                  <p className="mt-1 text-base text-ink">{p.tagline}</p>
                  <p className="mt-4 text-sm text-ink/70 leading-relaxed">{p.solution}</p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-[12px] transition-colors"
                  >
                    {p.cta} <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="lg:col-span-5 bg-mist border-t lg:border-t-0 lg:border-l border-line p-6 sm:p-8">
                  <dl className="space-y-4">
                    <div>
                      <dt className="font-mono text-[11px] font-semibold tracking-wide text-peach-700 uppercase">Claude</dt>
                      <dd className="mt-1 text-sm text-ink/75 leading-relaxed">{p.claude}</dd>
                    </div>
                    <div className="border-t border-line pt-4">
                      <dt className="font-mono text-[11px] font-semibold tracking-wide text-nvidia-700 uppercase">NVIDIA</dt>
                      <dd className="mt-1 text-sm text-ink/75 leading-relaxed">{p.nvidia}</dd>
                    </div>
                    <div className="border-t border-line pt-4 space-y-2">
                      {p.screen.map((row) => (
                        <div key={row.label} className="flex items-baseline justify-between gap-4">
                          <span className="text-sm text-ink/70">{row.label}</span>
                          <span className="text-xs font-mono text-teal-700 text-right">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </dl>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
