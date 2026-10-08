"use client";

import Link from "next/link";
import { caseStudies } from "@/lib/case-studies-data";
import { SiteFrame } from "@/components/marketing/SiteFrame";

export default function CaseStudiesPage() {
  return (
    <SiteFrame active="work">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">Work</p>
        <h1 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-ink">
          The result,<br />not the claim.
        </h1>
        <p className="mt-5 max-w-xl text-ink/70 leading-relaxed">
          Enterprise data platforms, AI frameworks, and cloud migrations delivered for the companies named here.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="hidden sm:grid grid-cols-12 gap-4 px-1 pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40">
          <span className="col-span-3">Client</span>
          <span className="col-span-4">Project</span>
          <span className="col-span-3">Result</span>
          <span className="col-span-2 text-right">Value</span>
        </div>
        <div className="border-t border-line">
          {caseStudies.map((cs) => (
            <Link key={cs.slug} href={`/case-studies/${cs.slug}`} className="grid sm:grid-cols-12 gap-1 sm:gap-4 py-5 border-b border-line hover:bg-white/70 px-1">
              <span className="sm:col-span-3 text-sm font-semibold text-ink">{cs.client}</span>
              <span className="sm:col-span-4 text-sm text-ink/75">{cs.title}</span>
              <span className="sm:col-span-3 text-sm text-teal-700">{cs.heroMetric} {cs.heroMetricLabel}</span>
              <span className="sm:col-span-2 sm:text-right text-sm text-ink/60">{cs.value}</span>
            </Link>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
