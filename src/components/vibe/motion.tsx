"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ── Choreographed stagger reveal ── */
const revealContainer = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
export const revealItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={revealContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Single fade-in ── */
export function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Spotlight card wrapper — radial glow follows the pointer ── */
export function Spotlight({
  children,
  className = "",
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "a";
  [k: string]: unknown;
}) {
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const Comp = Tag as "div";
  return (
    <Comp onMouseMove={onMove} className={`spotlight ${className}`} {...rest}>
      {children}
    </Comp>
  );
}

/* ── Count-up on scroll into view ── */
export function Counter({
  target,
  suffix = "",
  prefix = "",
  duration = 1400,
  className = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const steps = Math.max(1, Math.round(duration / 16));
    const step = target / steps;
    const t = setInterval(() => {
      v += step;
      if (v >= target) {
        setCount(target);
        clearInterval(t);
      } else setCount(Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── Typewriter cycling through words ── */
export function TypeWriter({ words, className = "" }: { words: string[]; className?: string }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx];
    const timer = setTimeout(
      () => {
        if (!del) {
          setText(word.slice(0, text.length + 1));
          if (text.length === word.length) setTimeout(() => setDel(true), 1800);
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length === 0) {
            setDel(false);
            setIdx((i) => (i + 1) % words.length);
          }
        }
      },
      del ? 30 : 70
    );
    return () => clearTimeout(timer);
  }, [text, del, idx, words]);
  return (
    <span className={className}>
      {text}
      <span className="text-peach-500 animate-pulse">▋</span>
    </span>
  );
}

/* ── FlowLine — an SVG connector that draws itself when scrolled into view ── */
export function FlowLine({
  d,
  className = "",
  strokeWidth = 2,
  color = "var(--color-peach-400)",
  height = 60,
  width = 200,
}: {
  d: string;
  className?: string;
  strokeWidth?: number;
  color?: string;
  height?: number;
  width?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} className={className} fill="none" aria-hidden>
      <motion.path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray="1"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </svg>
  );
}
