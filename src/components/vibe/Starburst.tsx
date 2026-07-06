"use client";

/**
 * Claude-style starburst / asterisk mark.
 * A many-pointed radial burst used as an accent bullet, divider, or logo motif.
 */
export function Starburst({
  className = "",
  size = 24,
  spin = false,
  color = "currentColor",
}: {
  className?: string;
  size?: number;
  spin?: boolean;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill={color}
      className={`${spin ? "animate-starburst" : ""} ${className}`}
      aria-hidden
    >
      <path d="M50 2 L55.5 38 L78 12 L62 40 L98 45 L62 50 L98 55 L62 60 L78 88 L55.5 62 L50 98 L44.5 62 L22 88 L38 60 L2 55 L38 50 L2 45 L38 40 L22 12 L44.5 38 Z" />
    </svg>
  );
}
