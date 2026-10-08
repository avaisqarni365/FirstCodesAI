"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MARKETING_STEPS, MARKET_REGIONS } from "@/lib/marketing-data";

/**
 * Remote marketing, drawn in the same ledger as the rest of the page.
 */
export function RemoteMarketing() {
  return (
    <section id="marketing" className="py-20 sm:py-28 bg-canvas border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-brass uppercase">Remote marketing</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-[1.05]">
              Any product.
              <br />
              Any country.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-ink/70 leading-relaxed">
              Research, language, launch and the next round — run from one desk, for every region you sell into.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {MARKET_REGIONS.map((r) => (
                <span key={r.code} className="font-mono text-[11px] font-semibold text-teal-700 bg-white border border-line rounded-full px-2.5 py-1">
                  {r.code}
                </span>
              ))}
            </div>
            <Link href="/services/global-lead-generation" className="mt-8 inline-flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-[12px] transition-colors">
              Market my product <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ol className="lg:col-span-7 bg-white border border-line rounded-[12px] divide-y divide-line">
            {MARKETING_STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4 p-5 sm:p-6">
                <span className="font-mono text-[11px] font-semibold text-teal-600 pt-1">0{i + 1}</span>
                <div>
                  <h3 className="text-base font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink/65 leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
