"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import { servicesData } from "@/lib/services-data";
import { SiteFrame } from "@/components/marketing/SiteFrame";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData.find((s) => s.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const others = servicesData.filter((s) => s.slug !== slug).slice(0, 3);

  if (!service) {
    return (
      <SiteFrame active="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <h1 className="text-3xl font-semibold text-ink">Service not found</h1>
          <Link href="/services" className="mt-4 inline-block text-sm font-semibold text-teal-700">All services</Link>
        </div>
      </SiteFrame>
    );
  }

  return (
    <SiteFrame active="services">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <Link href="/services" className="inline-flex items-center gap-1 text-sm text-ink/50 hover:text-teal-700">
          <ArrowLeft className="w-3.5 h-3.5" /> All services
        </Link>
        <p className="mt-8 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">Service</p>
        <h1 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-ink">{service.title}</h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-ink/70 leading-relaxed">{service.tagline}</p>
        <a href="mailto:info@codes-ai.uk" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 px-5 py-3 rounded-[12px]">
          Start this service
        </a>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">Overview</p>
          <p className="mt-4 text-base text-ink/75 leading-relaxed">{service.longDescription}</p>
        </div>
        <div className="lg:col-span-5 bg-white border border-line rounded-[12px] p-6">
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">Benefits</p>
          <ul className="mt-4 space-y-3">
            {service.benefits.map((b) => (
              <li key={b} className="text-sm text-ink/75 leading-relaxed border-t border-line pt-3 first:border-0 first:pt-0">{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">How it runs</p>
        <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-ink">How we deliver.</h2>
        <ol className="mt-8 border-t border-line">
          {service.process.map((step) => (
            <li key={step.step} className="grid sm:grid-cols-12 gap-2 sm:gap-6 py-5 border-b border-line">
              <span className="sm:col-span-1 font-mono text-sm text-teal-600">{step.step}</span>
              <span className="sm:col-span-3 font-semibold text-ink">{step.title}</span>
              <span className="sm:col-span-8 text-sm text-ink/70 leading-relaxed">{step.desc}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">Stack</p>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {service.technologies.map((tech) => (
            <div key={tech.category} className="bg-white border border-line rounded-[12px] p-5">
              <h3 className="text-sm font-semibold text-ink">{tech.category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {tech.items.map((item) => (
                  <span key={item} className="text-xs text-ink/70 bg-mist px-2 py-1 rounded-[8px]">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">Results</p>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {service.useCases.map((uc) => (
            <div key={uc.title} className="bg-white border border-line rounded-[12px] p-6">
              <p className="font-mono text-sm text-teal-600">{uc.metric}</p>
              <h3 className="mt-3 font-semibold text-ink">{uc.title}</h3>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed">{uc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">Questions</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">Asked often.</h2>
        <div className="mt-6 border-t border-line">
          {service.faq.map((item, i) => (
            <div key={item.q} className="border-b border-line">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-4 text-left">
                <span className="text-sm font-semibold text-ink pr-4">{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-brass shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && <p className="pb-4 text-sm text-ink/70 leading-relaxed">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="border-t border-line pt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">Ready for {service.title}?</h2>
            <p className="mt-2 text-sm text-ink/70">We reply within a day.</p>
          </div>
          <a href="mailto:info@codes-ai.uk" className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 px-5 py-3 rounded-[12px]">
            info@codes-ai.uk
          </a>
        </div>
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {others.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="bg-white border border-line rounded-[12px] p-5">
              <h3 className="font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink/65 line-clamp-2">{s.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal-700">View <ArrowUpRight className="w-4 h-4" /></span>
            </Link>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
