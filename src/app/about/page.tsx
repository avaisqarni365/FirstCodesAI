"use client";

import Link from "next/link";
import {
  Award, Cloud, Code2, Database, Globe, GraduationCap, MapPin, Phone, Server,
} from "lucide-react";
import { SiteFrame } from "@/components/marketing/SiteFrame";

const stats = [
  { value: "12+", label: "Years" },
  { value: "40%", label: "Faster delivery" },
  { value: "99.9%", label: "Data accuracy" },
  { value: "€120K", label: "Annual savings" },
];

const expertise = [
  { category: "Cloud", icon: Cloud, items: ["Azure Synapse", "Data Factory", "Microsoft Fabric", "AWS"] },
  { category: "Data platforms", icon: Database, items: ["Databricks", "Delta Lake", "Snowflake", "Synapse SQL"] },
  { category: "Engineering", icon: Code2, items: ["Python", "PySpark", "SQL", "Claude"] },
  { category: "Enterprise", icon: Server, items: ["SAP S/4HANA", "Dynamics 365", "Kubernetes", "Terraform"] },
];

const career = [
  { period: "2025 – Present", role: "CEO & Founder", company: "CODES AI LIMITED", detail: "AI-assisted delivery for data platforms, products, and remote operations." },
  { period: "2024 – 2025", role: "Senior Data Engineer", company: "Anglian Water", detail: "Microsoft Fabric and Databricks. 250+ products on a single framework." },
  { period: "2023 – 2024", role: "Senior Data Engineer", company: "Delta Lakehouse", detail: "Billions of sensor files. ACID Delta Lake. 40% faster queries." },
  { period: "2022 – 2024", role: "BI Consultant", company: "Carl Zeiss", detail: "Customer 360 on SAP and Azure Synapse. 40% faster reporting." },
  { period: "2022 – 2023", role: "Senior Data Engineer", company: "Flaschenpost", detail: "Dynamics 365 to Azure. 50% faster reporting." },
  { period: "2021 – 2022", role: "Senior Data Engineer", company: "E.ON Energy", detail: "Global survey dashboard, row-level security, 99.5% accuracy." },
  { period: "2019 – 2021", role: "Senior Data Specialist", company: "Hermes", detail: "Azure sensor platform. 30% lower Azure cost." },
  { period: "2013 – 2015", role: "DWH Consultant", company: "Volkswagen AG", detail: "Enterprise warehouse. SAP BusinessObjects. 99.9% workflow success." },
  { period: "2011 – 2012", role: "Research Assistant", company: "Siemens AG", detail: "Cloud data-warehouse research across Azure, AWS, and SAP." },
];

const products = [
  { name: "ACCA", domain: "acca.codes-ai.uk", href: "https://acca.codes-ai.uk", text: "Kontai. Claude reads the document and decides the booking. NVIDIA hardware serves the model." },
  { name: "SparkVibe", domain: "vibe.codes-ai.uk", href: "https://vibe.codes-ai.uk", text: "The studio that turns repositories and databases into context Claude and Cursor can use." },
  { name: "Artizai", domain: "artizai.uk", href: "https://artizai.uk", text: "An AI platform, served on NVIDIA, built with the same shipping discipline." },
];

const education = [
  { degree: "M.Sc. E-Business", school: "Hochschule Fulda", place: "Germany · 2012" },
  { degree: "M.Sc. Informatics", school: "University of Central Punjab", place: "Pakistan · 2005" },
  { degree: "B.Sc. Informatics", school: "B.Z.U. University, Multan", place: "Pakistan · 2002" },
];

export default function AboutPage() {
  return (
    <SiteFrame active="about">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">About</p>
        <h1 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-ink">
          Avais Ahmad<br />Qarni
        </h1>
        <p className="mt-4 text-lg text-ink/80">CEO and founder, CODES AI LIMITED · 16078672</p>
        <p className="mt-5 max-w-2xl text-base text-ink/70 leading-relaxed">
          Twelve years designing large-scale data platforms on Azure, Databricks, and SAP. CODES AI now ships products where Claude does the judgement and NVIDIA hardware does the compute.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/70">
          <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-brass" /> London, UK</span>
          <span className="inline-flex items-center gap-1.5"><Globe className="w-4 h-4 text-brass" /> German nationality</span>
          <span className="inline-flex items-center gap-1.5"><Phone className="w-4 h-4 text-brass" /> +44 7586 094540</span>
          <span className="inline-flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-brass" /> Dual M.Sc.</span>
        </div>
        <a href="mailto:info@codes-ai.uk" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 px-5 py-3 rounded-[12px]">
          Get in touch
        </a>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-line rounded-[12px] overflow-hidden bg-white">
          {stats.map((s) => (
            <div key={s.label} className="p-6 border-line border-b lg:border-b-0 lg:border-r last:border-0">
              <p className="text-3xl font-semibold text-teal-600 tracking-tight">{s.value}</p>
              <p className="mt-1 text-sm text-ink/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">Products</p>
        <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-ink">What the company ships.</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {products.map((p) => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="bg-white border border-line rounded-[12px] p-6">
              <p className="font-mono text-[11px] text-teal-600">{p.domain}</p>
              <h3 className="mt-3 text-lg font-semibold text-ink">{p.name}</h3>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed">{p.text}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">Practice</p>
        <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-ink">Where the work was done.</h2>
        <div className="mt-8 border-t border-line">
          {career.map((c) => (
            <div key={c.company + c.period} className="grid sm:grid-cols-12 gap-2 sm:gap-6 py-5 border-b border-line">
              <span className="sm:col-span-3 font-mono text-[12px] text-teal-600">{c.period}</span>
              <span className="sm:col-span-4">
                <span className="block font-semibold text-ink">{c.role}</span>
                <span className="block text-sm text-ink/60">{c.company}</span>
              </span>
              <span className="sm:col-span-5 text-sm text-ink/70 leading-relaxed">{c.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">Capability</p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {expertise.map((group) => (
            <div key={group.category} className="bg-white border border-line rounded-[12px] p-5">
              <group.icon className="w-4 h-4 text-brass" />
              <h3 className="mt-3 font-semibold text-ink">{group.category}</h3>
              <ul className="mt-3 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-ink/70">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">Education</p>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {education.map((edu) => (
            <div key={edu.degree} className="bg-white border border-line rounded-[12px] p-5">
              <h3 className="font-semibold text-ink">{edu.degree}</h3>
              <p className="mt-2 text-sm text-ink/70">{edu.school}</p>
              <p className="mt-2 font-mono text-[11px] text-brass">{edu.place}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-ink/50 inline-flex items-center gap-2">
          <Award className="w-4 h-4 text-brass" />
          Clients include Anglian Water, Carl Zeiss, E.ON, Volkswagen, Flaschenpost, Hermes, and Siemens.
        </p>
        <Link href="/case-studies" className="mt-4 block text-sm font-semibold text-teal-700">See the work</Link>
      </section>
    </SiteFrame>
  );
}
