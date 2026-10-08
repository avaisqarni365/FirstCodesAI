"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { servicesData } from "@/lib/services-data";
import { SiteFrame } from "@/components/marketing/SiteFrame";

const REMOTE_SLUGS = [
  "remote-sales-crm-ops",
  "global-lead-generation",
  "remote-communications-desk",
  "remote-finance-invoicing-ops",
  "remote-team-enablement",
];

export default function ServicesPage() {
  const remoteServices = servicesData.filter((s) => REMOTE_SLUGS.includes(s.slug));
  const engineeringServices = servicesData.filter((s) => !REMOTE_SLUGS.includes(s.slug));

  return (
    <SiteFrame active="services">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">Services</p>
        <h1 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-ink">
          Everything we<br />run for you.
        </h1>
        <p className="mt-5 max-w-xl text-base text-ink/70 leading-relaxed">
          Remote operations for the back office and the growth desk, backed by the engineering that builds the software.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">Remote operations</p>
        <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-ink">What we run for you.</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {remoteServices.map((service, i) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group flex flex-col bg-white border border-line rounded-[12px] p-6 h-full">
              <p className="font-mono text-[11px] text-teal-600">0{i + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-ink">{service.title}</h3>
              <p className="mt-2 text-sm text-ink/65 leading-relaxed flex-1">{service.description}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal-700">
                View <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">Engineering</p>
        <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-ink">How we build it.</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-[12px] overflow-hidden">
          {engineeringServices.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group bg-white p-6 h-full">
              <h3 className="text-base font-semibold text-ink">{service.title}</h3>
              <p className="mt-2 text-sm text-ink/65 leading-relaxed">{service.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700">
                View <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="border-t border-line pt-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">Not sure which service you need?</h2>
          <p className="mt-3 text-ink/70 max-w-lg">A short note is enough. We come back with a view of the work and what it would take.</p>
          <a href="mailto:info@codes-ai.uk" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 px-5 py-3 rounded-[12px]">
            Talk to us
          </a>
        </div>
      </section>
    </SiteFrame>
  );
}
