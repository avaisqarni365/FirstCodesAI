"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { MacWindow, Starburst } from "@/components/vibe";
import type { ServiceData } from "@/lib/services-data";
import { type ServiceVariantMeta, accentOf } from "@/lib/service-variants";

type Step = ServiceData["process"][number];

/**
 * Bespoke, animated process visualisation. Each `variant` renders a genuinely
 * different diagram from the same `service.process` data, so every service page
 * looks distinct. Accent-coloured per service.
 */
export function ProcessGraphic({ service, meta }: { service: ServiceData; meta: ServiceVariantMeta }) {
  const a = accentOf(meta.accent);
  const steps = service.process;
  const common = { steps, a, grad: a.grad };

  switch (meta.variant) {
    case "pipeline":
    case "graph":
    case "cloudmap":
      return <HorizontalFlow {...common} nodeShape={meta.variant === "graph" ? "hex" : meta.variant === "cloudmap" ? "cloud" : "chip"} />;
    case "switchboard":
      return <Switchboard {...common} />;
    case "ledger":
    case "dashboard":
      return <BoardRows {...common} kind={meta.variant} />;
    case "orbit":
      return <Orbit {...common} />;
    case "neural":
      return <Neural {...common} />;
    case "lakehouse":
      return <LayerStack {...common} />;
    case "browser":
      return <BrowserFrame {...common} window={meta.window} />;
    case "device":
      return <DeviceScreens {...common} />;
    case "blueprint":
      return <Blueprint {...common} />;
    case "vault":
      return <Vault {...common} />;
    case "terminal":
    default:
      return <TerminalLog {...common} window={meta.window} />;
  }
}

/* helper */
type P = { steps: Step[]; a: ReturnType<typeof accentOf>; grad: string };
const reveal = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { delay: i * 0.08, duration: 0.45 },
});

/* ── 1. Terminal log (vertical, numbered lines) ── */
function TerminalLog({ steps, a, grad, window }: P & { window: string }) {
  return (
    <MacWindow title={window} dark className="mac-window--dark max-w-3xl mx-auto" bodyClassName="p-5 bg-[#1c1a19]">
      <div className="font-mono text-xs sm:text-sm space-y-3">
        {steps.map((s, i) => (
          <motion.div key={s.step} {...reveal(i)} className="flex gap-3">
            <span className={`shrink-0 ${a.textStrong} font-bold`}>{s.step}</span>
            <div>
              <span className="text-warm-200 font-semibold">{s.title}</span>
              <span className="text-warm-500"> — {s.desc}</span>
              {s.tech && s.tech.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {s.tech.map((t) => <span key={t} className={`px-1.5 py-0.5 rounded text-[9px] ${a.text} bg-white/5 border border-white/10`}>{t}</span>)}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </MacWindow>
  );
}

/* ── 2. Horizontal flow (pipeline / graph / cloudmap) ── */
function HorizontalFlow({ steps, a, grad, nodeShape }: P & { nodeShape: "hex" | "cloud" | "chip" }) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-2">
        {steps.map((s, i) => (
          <div key={s.step} className="flex flex-col lg:flex-row items-center gap-3 lg:gap-2 flex-1">
            <motion.div {...reveal(i)} className="flex-1 w-full">
              <div className={`relative bg-white border ${a.border} rounded-2xl p-4 h-full hover:shadow-lg transition-all ${nodeShape === "hex" ? "rounded-[20px]" : ""}`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center mb-3 shadow-md`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`absolute top-3 right-3 text-[10px] font-mono font-bold ${a.text}`}>{s.step}</span>
                <h4 className="text-sm font-bold text-warm-800">{s.title}</h4>
                <p className="text-[11px] text-warm-500 leading-snug mt-1">{s.desc}</p>
              </div>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 + 0.2 }} className={`${a.textStrong} shrink-0`}>
                <ArrowRight className="w-5 h-5 hidden lg:block" />
                <ChevronDown className="w-5 h-5 lg:hidden" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 3. Switchboard (comms channels) ── */
function Switchboard({ steps, a, grad }: P) {
  return (
    <MacWindow title="switchboard" className="max-w-4xl mx-auto" bodyClassName="p-5">
      <div className="grid sm:grid-cols-2 gap-3">
        {steps.map((s, i) => (
          <motion.div key={s.step} {...reveal(i)} className={`flex items-center gap-3 rounded-xl border ${a.border} ${a.bgSoft} p-3.5`}>
            <span className="relative flex w-2.5 h-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${a.dot} opacity-40`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${a.dot}`} />
            </span>
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center shrink-0`}>
              <s.icon className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-warm-800 truncate">{s.title}</h4>
              <p className="text-[10px] text-warm-500 truncate">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </MacWindow>
  );
}

/* ── 4. Board rows (ledger / dashboard) ── */
function BoardRows({ steps, a, grad, kind }: P & { kind: "ledger" | "dashboard" }) {
  return (
    <MacWindow title={kind === "ledger" ? "ledger.csv" : "dashboard"} className="max-w-4xl mx-auto" bodyClassName="p-0">
      <div className="divide-y divide-warm-100">
        <div className={`grid grid-cols-[auto_1fr_auto] gap-4 px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider ${a.text} ${a.bgSoft}`}>
          <span>#</span><span>{kind === "ledger" ? "Entry" : "Panel"}</span><span>Status</span>
        </div>
        {steps.map((s, i) => (
          <motion.div key={s.step} {...reveal(i)} className="grid grid-cols-[auto_1fr_auto] gap-4 px-5 py-3.5 items-center hover:bg-warm-50 transition-colors">
            <span className={`font-mono font-bold text-xs ${a.text}`}>{s.step}</span>
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center shrink-0`}>
                <s.icon className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-warm-800 truncate">{s.title}</h4>
                <p className="text-[10px] text-warm-500 truncate">{s.desc}</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">● done</span>
          </motion.div>
        ))}
      </div>
    </MacWindow>
  );
}

/* ── 5. Orbit (team hub) ── */
function Orbit({ steps, a, grad }: P) {
  return (
    <div className="relative max-w-2xl mx-auto aspect-square flex items-center justify-center">
      <div className={`absolute inset-[18%] rounded-full border-2 border-dashed ${a.border} opacity-60`} />
      <div className={`absolute inset-[32%] rounded-full border ${a.border} opacity-40`} />
      <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className={`relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center shadow-xl`}>
        <Starburst size={40} className="text-white" spin />
      </motion.div>
      {steps.map((s, i) => {
        const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(angle) * 40;
        const y = 50 + Math.sin(angle) * 40;
        return (
          <motion.div key={s.step} initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
            className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
            <div className={`bg-white border ${a.border} rounded-xl p-2.5 shadow-lg w-28 text-center`}>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center mx-auto mb-1`}>
                <s.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-[10px] font-bold text-warm-800 leading-tight">{s.title}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── 6. Neural (AI columns with connectors) ── */
function Neural({ steps, a, grad }: P) {
  return (
    <div className="max-w-4xl mx-auto flex items-center justify-between gap-1 sm:gap-2">
      {steps.map((s, i) => (
        <div key={s.step} className="flex-1 flex items-center gap-1 sm:gap-2">
          <motion.div {...reveal(i)} className="flex-1">
            <div className={`bg-white border ${a.border} rounded-2xl p-3 text-center hover:shadow-lg transition-all`}>
              <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center mx-auto mb-2 shadow-md`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-[11px] font-bold text-warm-800 leading-tight">{s.title}</h4>
            </div>
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 + 0.2 }} className={`h-0.5 w-3 sm:w-5 ${a.dot} origin-left rounded-full`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── 7. Layer stack (lakehouse) ── */
function LayerStack({ steps, a, grad }: P) {
  return (
    <MacWindow title="lakehouse" className="max-w-3xl mx-auto" bodyClassName="p-5">
      <div className="space-y-2">
        {steps.map((s, i) => (
          <motion.div key={s.step} {...reveal(i)}>
            <div className={`flex items-center gap-3 rounded-xl border-l-4 ${a.border} bg-warm-50 p-3.5`} style={{ borderLeftColor: "currentColor" }}>
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center shrink-0`}>
                <s.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-warm-800">{s.title}</h4>
                <p className="text-[10px] text-warm-500">{s.desc}</p>
              </div>
              <span className={`text-[10px] font-mono font-bold ${a.text}`}>L{i + 1}</span>
            </div>
            {i < steps.length - 1 && <div className="flex justify-center py-0.5"><ChevronDown className={`w-4 h-4 ${a.textStrong}`} /></div>}
          </motion.div>
        ))}
      </div>
    </MacWindow>
  );
}

/* ── 8. Browser frame (web apps) ── */
function BrowserFrame({ steps, a, grad, window }: P & { window: string }) {
  return (
    <div className="mac-window max-w-4xl mx-auto">
      <div className="mac-titlebar">
        <span className="mac-dot mac-dot--red" /><span className="mac-dot mac-dot--amber" /><span className="mac-dot mac-dot--green" />
        <span className="flex-1 mx-3"><span className="block text-[11px] text-warm-500 bg-warm-100 rounded-md px-3 py-1 truncate">{window}</span></span>
      </div>
      <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {steps.map((s, i) => (
          <motion.div key={s.step} {...reveal(i)} className={`rounded-xl border ${a.border} p-4 hover:shadow-md transition-all`}>
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center mb-2.5`}>
              <s.icon className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-xs font-bold text-warm-800">{s.title}</h4>
            <p className="text-[10px] text-warm-500 mt-0.5 leading-snug">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── 9. Device screens (mobile) ── */
function DeviceScreens({ steps, a, grad }: P) {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
      {steps.map((s, i) => (
        <motion.div key={s.step} {...reveal(i)} className="w-32 sm:w-36">
          <div className={`rounded-[24px] border-[5px] border-warm-800 bg-white overflow-hidden shadow-xl`}>
            <div className="h-4 bg-warm-800 flex items-center justify-center"><span className="w-8 h-1 rounded-full bg-warm-600" /></div>
            <div className="p-3 aspect-[9/16] flex flex-col items-center justify-center text-center">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center mb-2`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-[11px] font-bold text-warm-800 leading-tight">{s.title}</h4>
              <p className="text-[9px] text-warm-500 mt-1 leading-snug">{s.desc.slice(0, 40)}</p>
            </div>
          </div>
          <p className={`text-center text-[10px] font-mono font-bold ${a.text} mt-2`}>{s.step}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ── 10. Blueprint (custom software grid) ── */
function Blueprint({ steps, a, grad }: P) {
  return (
    <div className="relative max-w-4xl mx-auto rounded-2xl border border-warm-200 bg-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#191919 1px, transparent 1px), linear-gradient(90deg, #191919 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="relative p-5 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {steps.map((s, i) => (
          <motion.div key={s.step} {...reveal(i)} className={`rounded-xl border-2 border-dashed ${a.border} bg-warm-50/70 p-3 text-center`}>
            <span className={`text-[10px] font-mono font-bold ${a.text}`}>{s.step}</span>
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center mx-auto my-2`}>
              <s.icon className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-[11px] font-bold text-warm-800 leading-tight">{s.title}</h4>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── 11. Vault (security) ── */
function Vault({ steps, a, grad }: P) {
  return (
    <MacWindow title="security-audit" dark className="mac-window--dark max-w-3xl mx-auto" bodyClassName="p-5 bg-[#1c1a19]">
      <div className="space-y-2.5">
        {steps.map((s, i) => (
          <motion.div key={s.step} {...reveal(i)} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center shrink-0`}>
              <s.icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-warm-100">{s.title}</h4>
              <p className="text-[10px] text-warm-400">{s.desc}</p>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 shrink-0">✓ secured</span>
          </motion.div>
        ))}
      </div>
    </MacWindow>
  );
}
