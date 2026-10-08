"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Code2, Menu, X } from "lucide-react";
import { Wordmark } from "@/components/marketing/Wordmark";

const LINKS = [
  { id: "products", label: "Products", href: "/#products" },
  { id: "partners", label: "Partners", href: "/#partners" },
  { id: "services", label: "Services", href: "/services" },
  { id: "work", label: "Work", href: "/case-studies" },
  { id: "about", label: "About", href: "/about" },
];

export function SiteFrame({
  children,
  active,
  flush = false,
}: {
  children: React.ReactNode;
  active?: string;
  flush?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas overflow-x-hidden text-ink">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-canvas/90 backdrop-blur-lg border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <Wordmark />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {LINKS.map((l) => (
              <Link
                key={l.id}
                href={l.href}
                className={`text-sm font-medium transition-colors ${active === l.id ? "text-teal-700" : "text-ink/60 hover:text-teal-700"}`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-[12px]">
              Talk to us <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 -mr-2 text-ink/70" aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="md:hidden bg-canvas border-t border-line overflow-hidden">
              <div className="px-4 py-4 space-y-1">
                {LINKS.map((l) => (
                  <Link key={l.id} href={l.href} onClick={() => setMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-ink hover:bg-teal-50 rounded-lg">{l.label}</Link>
                ))}
                <Link href="/#contact" onClick={() => setMenuOpen(false)} className="block mt-2 text-center text-sm font-semibold text-white bg-teal-500 py-3 rounded-[12px]">Talk to us</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {flush ? children : <div className="pt-14 sm:pt-16">{children}</div>}

      <footer className="bg-forest pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-brass rounded-[8px] flex items-center justify-center"><Code2 className="w-4 h-4 text-forest" /></div>
                <Wordmark onDark size="sm" />
              </div>
              <p className="text-xs text-[#F4F0E6]/60 leading-relaxed">Products on Claude, served on NVIDIA.</p>
            </div>
            <div>
              <h4 className="font-mono text-[11px] font-semibold tracking-wide text-brass uppercase mb-3">Services</h4>
              <ul className="space-y-2">
                {[["Remote Sales & CRM", "/services/remote-sales-crm-ops"], ["Lead Generation", "/services/global-lead-generation"], ["Comms Desk", "/services/remote-communications-desk"], ["Finance Ops", "/services/remote-finance-invoicing-ops"], ["Team Enablement", "/services/remote-team-enablement"]].map(([l, h]) => (
                  <li key={l}><Link href={h} className="text-xs text-[#F4F0E6]/70 hover:text-brass">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[11px] font-semibold tracking-wide text-brass uppercase mb-3">Products</h4>
              <ul className="space-y-2">
                {[["SparkVibe", "https://vibe.codes-ai.uk"], ["ACCA — Kontai", "https://acca.codes-ai.uk"], ["Artizai", "https://artizai.uk"], ["Studio", "/studio"]].map(([l, h]) => (
                  <li key={l}>{h.startsWith("http") ? <a href={h} target="_blank" rel="noopener noreferrer" className="text-xs text-[#F4F0E6]/70 hover:text-brass">{l}</a> : <Link href={h} className="text-xs text-[#F4F0E6]/70 hover:text-brass">{l}</Link>}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[11px] font-semibold tracking-wide text-brass uppercase mb-3">Company</h4>
              <ul className="space-y-2">
                {[["About", "/about"], ["Case studies", "/case-studies"], ["All services", "/services"], ["Contact", "/#contact"]].map(([l, h]) => (
                  <li key={l}><Link href={h} className="text-xs text-[#F4F0E6]/70 hover:text-brass">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[11px] font-semibold tracking-wide text-brass uppercase mb-3">Contact</h4>
              <ul className="space-y-2 text-xs text-[#F4F0E6]/70">
                <li><a href="mailto:info@codes-ai.uk" className="hover:text-brass">info@codes-ai.uk</a></li>
                <li><a href="tel:+447586094540" className="hover:text-brass">+44 7586 094540</a></li>
                <li>codes-ai.uk</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10">
            <p className="text-[11px] text-[#F4F0E6]/45">&copy; 2026 CODES AI LIMITED (16078672). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
