"use client";

import { motion } from "framer-motion";

/**
 * macOS-window-style container — the signature framing device.
 * Traffic-light dots, frosted title bar, soft shadow, rounded corners.
 */
export function MacWindow({
  title,
  children,
  className = "",
  bodyClassName = "",
  dark = false,
  animate = true,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  dark?: boolean;
  animate?: boolean;
}) {
  const Wrapper = animate ? motion.div : "div";
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 24, scale: 0.98 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, ease: "easeOut" as const },
      }
    : {};

  return (
    <Wrapper className={`mac-window ${dark ? "mac-window--dark" : ""} ${className}`} {...motionProps}>
      <div className="mac-titlebar">
        <span className="mac-dot mac-dot--red" />
        <span className="mac-dot mac-dot--amber" />
        <span className="mac-dot mac-dot--green" />
        {title && (
          <span
            className={`flex-1 text-center pr-12 text-[11px] font-medium truncate ${
              dark ? "text-warm-300" : "text-warm-500"
            }`}
          >
            {title}
          </span>
        )}
      </div>
      <div className={`${bodyClassName || "p-5"}`}>{children}</div>
    </Wrapper>
  );
}
