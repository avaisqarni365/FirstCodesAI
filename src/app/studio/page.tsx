"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Check, Coins, Clock, Layers, Rocket, Terminal,
  Sparkles, Cpu, Zap, CircleDollarSign,
} from "lucide-react";
import { MacWindow, Counter, TypeWriter } from "@/components/vibe";
import { SiteFrame } from "@/components/marketing/SiteFrame";
import {
  FEATURES, COMPLEXITY, computeEstimate, buildSprintPlan, DISCIPLINE_COLOR,
} from "@/lib/studio-catalog";

const STEP = (n: string) => (
  <span className="font-mono text-[11px] font-semibold text-brass uppercase tracking-[0.16em]">{n}</span>
);

const DEFAULT_REQUIREMENTS = "# My product\n\nA marketplace where creators sell digital goods.\n- users sign in and list products\n- buyers pay by card\n- an AI assistant recommends items\n- admin can moderate listings";

export default function StudioPage() {
  const [selected, setSelected] = useState<string[]>(["auth", "dashboard", "ai-chat"]);
  const [complexityId, setComplexityId] = useState("standard");
  const [requirements, setRequirements] = useState(DEFAULT_REQUIREMENTS);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const complexity = COMPLEXITY.find((c) => c.id === complexityId)!;
  const estimate = useMemo(() => computeEstimate(selected, complexity.multiplier), [selected, complexity]);
  const sprints = useMemo(() => buildSprintPlan(selected, complexity.multiplier), [selected, complexity]);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  async function submitBuild() {
    if (!requirements.trim() || submitState === "sending") return;
    setSubmitState("sending");
    try {
      const featureNames = FEATURES.filter((f) => selected.includes(f.id)).map((f) => f.name);
      const res = await fetch("/api/studio-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, requirements,
          features: featureNames,
          complexity: complexityId,
          estTokens: estimate.tokens, estPrice: estimate.price,
          estSprints: estimate.sprints, estWeeks: estimate.weeks,
        }),
      });
      setSubmitState(res.ok ? "sent" : "error");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <SiteFrame>
      <section className="relative py-14 sm:py-20 overflow-hidden">
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[130%] aspect-square aurora-bg pointer-events-none opacity-[0.16]" aria-hidden />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-teal-100/40 blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-white border border-warm-200 rounded-full px-3 py-1.5 mb-6 shadow-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[11px] font-semibold text-teal-700">// VIBE CODING STUDIO · REMOTE · WORLDWIDE</span>
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-warm-800 leading-[1.08] tracking-tight">
                Have an idea?
                <br />
                <span className="text-brass">Ship a product.</span>
                <br />
                <span className="text-warm-400 text-2xl sm:text-3xl lg:text-4xl">
                  <TypeWriter words={["describe it.", "price it.", "we build it.", "you own it."]} />
                </span>
              </h1>
              <p className="mt-5 text-sm sm:text-base text-warm-600 leading-relaxed max-w-lg">
                Write your requirements, pick the features you want, and get a live token &amp; cost
                estimate. Our remote vibe-coding team + domain experts build it <span className="text-teal-700 font-semibold">sprint by sprint</span> — and hand you a ready project.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#build" className="group inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3.5 rounded-xl  transition-all hover:-translate-y-0.5">
                  Build your app <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#how" className="inline-flex items-center justify-center gap-2 bg-white border border-warm-200 text-warm-700 font-medium px-6 py-3.5 rounded-xl hover:border-teal-200 hover:bg-teal-50 transition-all shadow-sm">
                  How it works
                </a>
              </div>
            </div>

            {/* Hero terminal — Apple window */}
            <MacWindow title="sparkvibe ~ build" bodyClassName="p-4 bg-[#1c1a19]" dark className="mac-window--dark">
              <div className="font-mono text-xs space-y-2 leading-relaxed">
                {[
                  { d: 0.5, c: <><span className="text-brass">$</span> <span className="text-emerald-400">sparkvibe</span> <span className="text-warm-300">new</span> <span className="text-gold-500">&quot;marketplace app&quot;</span></> },
                  { d: 0.9, c: <span className="text-warm-500">// reading requirements…</span> },
                  { d: 1.3, c: <><span className="text-brass">✦</span> <span className="text-warm-200">Features</span> <span className="text-warm-500">→ auth · payments · dashboard · AI</span></> },
                  { d: 1.7, c: <><span className="text-brass">✦</span> <span className="text-warm-200">Estimate</span> <span className="text-warm-500">→ 860k tokens · £9,300 · 4 sprints</span></> },
                  { d: 2.1, c: <><span className="text-brass">✦</span> <span className="text-warm-200">Team</span> <span className="text-warm-500">→ FE · BE · AI · QA assigned</span></> },
                  { d: 2.5, c: <><span className="text-emerald-400">✓ Sprint 1</span> <span className="text-warm-500">foundations shipped</span></> },
                  { d: 2.9, c: <div className="pt-1.5 border-t border-white/10 mt-1"><span className="text-brass font-bold">ready project</span> <span className="text-warm-500">delivered · you own the code</span></div> },
                ].map((l, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: l.d }}>{l.c}</motion.div>
                ))}
              </div>
            </MacWindow>
          </div>
        </div>
      </section>

      {/* ─── BUILD: the interactive flow ─── */}
      <section id="build" className="py-12 sm:py-20 border-t border-warm-200 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            {STEP("Build your app in the studio")}
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-warm-800 tracking-tight">Describe · Pick · Price · Ship</h2>
            <p className="mt-3 text-warm-600 max-w-xl mx-auto text-sm">Everything below is live. Pick features and watch the token cost, price, and sprint plan update.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* LEFT: requirements + features (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1 — requirements */}
              <div>
                <div className="mb-3">{STEP("Step 1 · Describe your idea")}</div>
                <MacWindow title="requirements.md" bodyClassName="p-0">
                  <textarea
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    rows={7}
                    className="w-full resize-none bg-transparent p-4 text-sm text-warm-700 leading-relaxed outline-none placeholder:text-warm-400 font-mono"
                    placeholder="Describe what you want to build…"
                  />
                </MacWindow>
              </div>

              {/* Step 2 — feature picker */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  {STEP("Step 2 · Pick features")}
                  <span className="text-[11px] text-warm-500">{selected.length} selected</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {FEATURES.map((f) => {
                    const on = selected.includes(f.id);
                    return (
                      <button
                        key={f.id}
                        onClick={() => toggle(f.id)}
                        className={`group text-left rounded-xl border p-4 transition-all duration-200 ${
                          on
                            ? "border-teal-500 bg-teal-50  -translate-y-0.5"
                            : "border-warm-200 bg-white hover:border-teal-200 hover:-translate-y-0.5"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${on ? "bg-teal-500 text-white" : "bg-warm-100 text-warm-600 group-hover:bg-teal-100"}`}>
                            <f.icon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                          </div>
                          <span className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${on ? "bg-teal-500 border-teal-500" : "border-warm-300"}`}>
                            <AnimatePresence>
                              {on && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check className="w-3.5 h-3.5 text-white" /></motion.span>}
                            </AnimatePresence>
                          </span>
                        </div>
                        <h4 className="mt-3 text-sm font-bold text-warm-800">{f.name}</h4>
                        <p className="text-[11px] text-warm-500 leading-snug mt-0.5">{f.blurb}</p>
                        <div className="mt-3 flex items-center gap-3 text-[10px] font-semibold">
                          <span className="text-teal-700 flex items-center gap-1"><Coins className="w-3 h-3" />{f.tokens}k</span>
                          <span className="text-warm-600 flex items-center gap-1"><CircleDollarSign className="w-3 h-3" />£{f.price.toLocaleString()}</span>
                          <span className="text-warm-500 flex items-center gap-1"><Clock className="w-3 h-3" />{f.sprints} spr</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT: sticky live calculator */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-20 space-y-4">
                <div className="mb-1">{STEP("Step 3 · Live token calculator")}</div>
                <MacWindow title="estimate.json" animate={false}>
                  {/* complexity */}
                  <p className="text-[11px] font-semibold text-warm-500 uppercase tracking-wider mb-2">Complexity</p>
                  <div className="grid grid-cols-3 gap-1.5 mb-5">
                    {COMPLEXITY.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setComplexityId(c.id)}
                        className={`rounded-lg border px-2 py-2 text-[11px] font-semibold transition-all ${
                          complexityId === c.id ? "border-teal-500 bg-teal-500 text-white" : "border-warm-200 bg-white text-warm-600 hover:border-teal-200"
                        }`}
                      >
                        {c.label}
                        <span className="block text-[9px] font-normal opacity-80 mt-0.5">×{c.multiplier}</span>
                      </button>
                    ))}
                  </div>

                  {/* totals */}
                  <div className="space-y-3">
                    <Metric icon={Coins} label="Estimated tokens" value={<><Counter target={estimate.tokens} suffix="k" /></>} accent />
                    <Metric icon={CircleDollarSign} label="Total price" value={<><Counter target={estimate.price} prefix="£" /></>} accent />
                    <div className="grid grid-cols-2 gap-3">
                      <Metric icon={Layers} label="Sprints" value={<Counter target={estimate.sprints} />} />
                      <Metric icon={Clock} label="~ Weeks" value={<Counter target={estimate.weeks} />} />
                    </div>
                  </div>

                  <p className="mt-4 text-[10px] text-warm-400 leading-snug">Illustrative estimate. Pay per feature, per sprint — final quote confirmed after your requirements review.</p>

                  {submitState === "sent" ? (
                    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-center">
                      <Check className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                      <p className="text-xs font-semibold text-warm-800">Request received!</p>
                      <p className="text-[10px] text-warm-500 mt-0.5">We&apos;ll send your costed sprint plan within 24 hours.</p>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-2">
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                        className="w-full rounded-lg border border-warm-200 bg-white px-3 py-2 text-xs text-warm-800 outline-none focus:border-teal-500 placeholder:text-warm-400" />
                      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email (so we can reply)"
                        className="w-full rounded-lg border border-warm-200 bg-white px-3 py-2 text-xs text-warm-800 outline-none focus:border-teal-500 placeholder:text-warm-400" />
                      <button onClick={submitBuild} disabled={submitState === "sending"}
                        className="w-full inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-60 text-white font-semibold px-4 py-3 rounded-xl text-sm transition-colors">
                        {submitState === "sending" ? "Sending…" : <>Start this build <ArrowUpRight className="w-4 h-4" /></>}
                      </button>
                      {submitState === "error" && <p className="text-[10px] text-red-500 text-center">Something went wrong — please try again or email info@codes-ai.uk.</p>}
                    </div>
                  )}
                </MacWindow>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STEP 4: sprint plan ─── */}
      <section className="py-12 sm:py-20 border-t border-warm-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            {STEP("Step 4 · Sprint-by-sprint delivery")}
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-warm-800 tracking-tight">Your build plan</h2>
            <p className="mt-3 text-warm-600 text-sm">Each sprint is 2 weeks. Every task carries its own token cost, owned by a domain expert.</p>
          </div>

          {sprints.length === 0 ? (
            <div className="text-center text-warm-500 text-sm">Pick some features above to generate a sprint plan.</div>
          ) : (
            <div className="relative">
              <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-brass via-warm-200 to-warm-200 hidden sm:block" />
              <div className="space-y-4">
                {sprints.map((s, i) => (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="relative sm:pl-14"
                  >
                    <div className="hidden sm:flex absolute left-0 top-1 w-10 h-10 rounded-xl bg-teal-500 text-white items-center justify-center font-bold text-sm ">
                      {s.n}
                    </div>
                    <div className="bg-white rounded-xl border border-warm-200 p-4 sm:p-5 hover:shadow-lg hover:border-line transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-warm-800">
                          <span className="sm:hidden text-brass">Sprint {s.n} · </span>{s.title}
                        </h3>
                        <span className="text-[10px] text-warm-500">Week {s.n * 2 - 1}–{s.n * 2}</span>
                      </div>
                      <div className="space-y-2">
                        {s.tasks.map((t) => (
                          <div key={t.feature} className="flex items-center justify-between gap-2 text-xs">
                            <span className="flex items-center gap-2 text-warm-700">
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${DISCIPLINE_COLOR[t.discipline]}`}>{t.discipline}</span>
                              {t.feature}
                            </span>
                            <span className="text-teal-700 font-semibold flex items-center gap-1 shrink-0"><Coins className="w-3 h-3" />{t.tokens}k</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Delivery finale */}
                <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative sm:pl-14">
                  <div className="hidden sm:flex absolute left-0 top-1 w-10 h-10 rounded-xl bg-emerald-500 text-white items-center justify-center shadow-md">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div className="bg-gradient-to-br from-brass-50 to-white rounded-xl border border-line p-5">
                    <h3 className="text-sm font-bold text-warm-800 flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Ready project delivered</h3>
                    <p className="text-xs text-warm-600 mt-1">You own 100% of the source code, deployed and documented. Iterate anytime — same team, same studio.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── HOW / manifesto ─── */}
      <section id="how" className="py-12 sm:py-20 border-t border-warm-200 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            {STEP("How our vibe coding works")}
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-warm-800 tracking-tight">AI speed. Expert judgement. Remote.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Cpu, title: "AI-native builds", desc: "We direct Claude, Cursor & Kimi to write production code at 10× speed — you pay for output, not hours." },
              { icon: Sparkles, title: "Domain experts", desc: "Every sprint is owned by a specialist — frontend, backend, AI, mobile, QA — so quality holds as speed rises." },
              { icon: Zap, title: "Fully remote, worldwide", desc: "Timezone-agnostic delivery. Your product ships continuously, wherever you and your market are." },
            ].map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white rounded-xl border border-warm-200 p-6 hover:shadow-lg hover:border-line transition-all">
                <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4"><c.icon className="w-5 h-5" /></div>
                <h3 className="text-base font-bold text-warm-800 mb-1.5">{c.title}</h3>
                <p className="text-sm text-warm-600 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 sm:py-24 border-t border-warm-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">Studio</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-ink tracking-tight">Bring the idea. We&apos;ll bring the build.</h2>
          <p className="mt-3 text-warm-600 text-sm max-w-lg mx-auto">Send your requirements and we&apos;ll return a costed, sprint-by-sprint plan within 24 hours.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:info@codes-ai.uk?subject=SparkVibe%20build%20request" className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-7 py-3.5 rounded-xl  transition-all hover:-translate-y-0.5 text-sm">
              <Terminal className="w-4 h-4" /> Start your build
            </a>
            <a href="https://vibe.codes-ai.uk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white border border-warm-200 text-warm-700 font-medium px-7 py-3.5 rounded-xl hover:border-teal-200 hover:bg-teal-50 transition-all shadow-sm text-sm">
              Open SparkVibe <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
    </SiteFrame>
  );
}

function Metric({ icon: Icon, label, value, accent = false }: { icon: typeof Coins; label: string; value: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-3 ${accent ? "border-line bg-teal-50" : "border-warm-200 bg-white"}`}>
      <p className="text-[10px] font-semibold text-warm-500 uppercase tracking-wider flex items-center gap-1.5"><Icon className="w-3 h-3" />{label}</p>
      <p className={`mt-1 text-2xl font-bold tabular-nums ${accent ? "text-teal-700" : "text-warm-800"}`}>{value}</p>
    </div>
  );
}
