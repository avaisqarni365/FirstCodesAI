"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft, Mail, Phone, Star, CheckCircle2, Code2, Sparkles, Menu, X, ArrowUpRight, Award, ChevronDown, Send, Gauge, Database } from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";
import { SiteFrame } from "@/components/marketing/SiteFrame";

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^([€£$]?)(\d+(?:\.\d+)?)(.*)/);
    if (!match) { setDisplay(value); return; }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = 1 - Math.pow(1 - frame / 50, 3);
      if (frame >= 50) { setDisplay(value); clearInterval(timer); }
      else setDisplay(`${prefix}${numStr.includes('.') ? (target * progress).toFixed(1) : Math.floor(target * progress)}${suffix}`);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <span ref={ref}>{display}</span>;
}

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay, duration: 0.5 }} className={className}>
    {children}
  </motion.div>
);

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((cs) => cs.slug === slug);
  const otherStudies = caseStudies.filter((cs) => cs.slug !== slug);

  // Hooks must run before any early return (Rules of Hooks)
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroParallax = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "8%"]);

  if (!study) {
    return (
      <SiteFrame active="work">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <h1 className="text-3xl font-semibold text-ink">Case study not found</h1>
          <Link href="/case-studies" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700"><ArrowLeft className="w-4 h-4" /> All work</Link>
        </div>
      </SiteFrame>
    );
  }

  const Icon = study.icon;

  return (
    <SiteFrame active="work">
      <section ref={heroRef} className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <Link href="/case-studies" className="inline-flex items-center gap-1 text-sm text-ink/50 hover:text-teal-700">
          <ArrowLeft className="w-3.5 h-3.5" /> All work
        </Link>
        <motion.div style={{ y: heroParallax }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-brass">{study.category} · {study.industry}</p>
          <p className="mt-4 text-sm text-ink/60">{study.client}</p>
          <h1 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-tight text-ink">{study.title}</h1>
          <p className="mt-8 text-5xl sm:text-6xl font-semibold text-teal-600 tracking-tight"><AnimatedCounter value={study.heroMetric} /></p>
          <p className="mt-2 text-sm text-ink/60">{study.heroMetricLabel}</p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-ink/60">
            <span>Timeline <strong className="text-ink font-semibold">{study.timeline}</strong></span>
            <span>Team <strong className="text-ink font-semibold">{study.teamSize}</strong></span>
            <span>Value <strong className="text-ink font-semibold">{study.value}</strong></span>
          </div>
        </motion.div>
      </section>

      {/* Story + sticky KPI rail — skimmers always see impact */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Narrative column */}
          <div className="space-y-4">
            {[
              { title: "Summary", body: study.summary, color: "border-l-brass" },
              { title: "The Challenge", body: study.challenge, color: "border-l-amber-400" },
              { title: "Our Solution", body: study.solution, color: "border-l-emerald-400" },
            ].map((sec, i) => (
              <FadeIn key={sec.title} delay={i * 0.08}>
                <div className={`bg-white rounded-xl border border-warm-100 border-l-4 ${sec.color} p-5 sm:p-6`}>
                  <h3 className="text-sm sm:text-base font-bold text-warm-800 mb-2">{sec.title}</h3>
                  <p className="text-xs sm:text-sm text-warm-500 leading-relaxed">{sec.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Sticky KPI panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl border border-warm-100 shadow-sm p-5 sm:p-7">
              <h2 className="text-lg sm:text-2xl font-bold text-warm-800 mb-1">Results & <span className="text-brass">Impact</span></h2>
              <p className="text-xs sm:text-sm text-warm-500 mb-5">The numbers that mattered.</p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {study.results.map((r, i) => (
                  <FadeIn key={r.label} delay={i * 0.06}>
                    <div className="bg-warm-50 rounded-xl border border-warm-100 p-4 sm:p-5 text-center hover:shadow-lg hover:border-line transition-all h-full">
                      <p className="text-2xl sm:text-3xl font-extrabold text-warm-800"><AnimatedCounter value={r.metric} /></p>
                      <p className="text-xs sm:text-sm font-bold text-teal-700 mt-1">{r.label}</p>
                      <p className="text-[9px] sm:text-[10px] text-warm-400 mt-0.5">{r.detail}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Flow — LIGHT themed, graphical */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
        <FadeIn className="text-center mb-6">
          <span className="inline-flex items-center gap-2 bg-brass-50 border border-line rounded-full px-3 py-1 mb-3">
            <Database className="w-3 h-3 text-brass" />
            <span className="text-[10px] sm:text-xs font-semibold text-brass">ARCHITECTURE</span>
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-warm-800">Data <span className="text-brass">Architecture</span></h2>
        </FadeIn>

        <div className="bg-white rounded-2xl border border-warm-100 p-5 sm:p-8 shadow-sm">
          {study.architectureLayers.map((layer, i) => (
            <div key={layer.label}>
              <FadeIn delay={i * 0.1}>
                <div className="rounded-[12px] border border-line p-4 sm:p-5 bg-mist/40">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-teal-500 flex items-center justify-center shrink-0">
                      <span className="text-white font-semibold text-sm sm:text-base">{i + 1}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-warm-800">{layer.label}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-0 sm:ml-[52px]">
                    {layer.items.map((item) => (
                      <span key={item} className="text-[10px] sm:text-xs font-medium text-warm-600 bg-white border border-warm-200 px-2.5 py-1 rounded-lg shadow-sm">{item}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
              {i < study.architectureLayers.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-brass" />
                    <ChevronDown className="w-5 h-5 text-brass -mt-1" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Process Steps */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
        <FadeIn className="text-center mb-6">
          <span className="inline-flex items-center gap-2 bg-brass-50 border border-line rounded-full px-3 py-1 mb-3">
            <Gauge className="w-3 h-3 text-brass" />
            <span className="text-[10px] sm:text-xs font-semibold text-brass">PROCESS</span>
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-warm-800">How we <span className="text-brass">delivered</span></h2>
        </FadeIn>

        <div className="space-y-3 sm:space-y-4">
          {study.processSteps.map((step, i) => {
            const StepIcon = step.icon;
            return (
              <FadeIn key={step.title} delay={i * 0.06}>
                <div className="bg-white rounded-xl border border-warm-100 p-4 sm:p-5 flex gap-4 items-start hover:shadow-md hover:border-line transition-all">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-brass-50 to-mist border border-line flex items-center justify-center shrink-0 relative">
                    <StepIcon className="w-5 h-5 text-teal-700" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brass-500 text-white text-[9px] font-bold flex items-center justify-center">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-warm-800 mb-1">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-warm-500 leading-relaxed mb-2">{step.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {step.tech.map((t) => (
                        <span key={t} className="text-[9px] sm:text-[10px] font-medium text-brass bg-brass-50 border border-line px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
        <FadeIn className="text-center mb-5">
          <h2 className="text-lg sm:text-2xl font-bold text-warm-800">Tech <span className="text-brass">Stack</span></h2>
        </FadeIn>
        <FadeIn>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {study.techStack.map((tech, i) => (
              <motion.span key={tech} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                className="text-xs sm:text-sm font-medium text-warm-700 bg-white border border-warm-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-sm hover:border-line hover:text-brass transition-all cursor-default">
                {tech}
              </motion.span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Testimonial */}
      {study.testimonial && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
          <FadeIn>
            <div className="bg-white rounded-2xl border border-warm-100 border-l-4 border-l-brass p-5 sm:p-8 relative overflow-hidden shadow-sm">
              <span className="absolute top-2 left-4 text-5xl sm:text-7xl font-serif text-brass/30 select-none">&ldquo;</span>
              <div className="relative z-10 pt-6 sm:pt-4">
                <p className="text-sm sm:text-base text-warm-700 italic leading-relaxed mb-4">&ldquo;{study.testimonial.quote}&rdquo;</p>
                <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map((j) => <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}</div>
                <p className="text-sm font-bold text-warm-800">{study.testimonial.name}</p>
                <p className="text-xs text-warm-500">{study.testimonial.role}</p>
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
        <FadeIn>
          <div className="bg-gradient-to-br bg-white border border-line rounded-2xl p-6 sm:p-10 text-center">
            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse-glow">
              <Send className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-warm-800 mb-2">Start a similar project</h2>
            <p className="text-sm text-warm-500 mb-6 max-w-md mx-auto">Free consultation and project estimate within 24 hours.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="mailto:info@codes-ai.uk" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3.5 rounded-[12px] text-sm">
                <Mail className="w-4 h-4" /> info@codes-ai.uk
              </a>
              <a href="tel:+447586094540" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-warm-200 text-warm-600 font-medium px-6 py-3.5 rounded-xl text-sm hover:border-line transition-all">
                <Phone className="w-4 h-4" /> +44 7586 094540
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Other Case Studies */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16">
        <h2 className="text-lg sm:text-xl font-bold text-warm-800 mb-5 text-center">More Case Studies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {otherStudies.map((cs) => (
            <Link key={cs.slug} href={`/case-studies/${cs.slug}`}
              className="group bg-white rounded-xl border border-warm-100 overflow-hidden hover:shadow-lg hover:border-line transition-all hover:-translate-y-0.5">
              <div className="p-4 border-b border-line">
                <span className="font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-brass">{cs.category}</span>
                <h3 className="text-sm font-semibold text-ink mt-2">{cs.title}</h3>
                <p className="text-[11px] text-ink/55">{cs.client}</p>
              </div>
              <div className="p-4">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-xl font-extrabold text-warm-800">{cs.heroMetric}</span>
                  <span className="text-[10px] text-warm-500">{cs.heroMetricLabel}</span>
                </div>
                <span className="text-brass text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Read more <ArrowUpRight className="w-3.5 h-3.5" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
    </SiteFrame>
  );
}
