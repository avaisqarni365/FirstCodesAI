/**
 * House lockup beside the mark.
 * CODES is forest on ivory, ivory on the dark footer.
 * A brass rule sits under it, and AI sits in brass, set to the right.
 */
export function Wordmark({ onDark = false, size = "md" }: { onDark?: boolean; size?: "sm" | "md" }) {
  const codes = onDark ? "footer-text font-bold" : "text-black font-bold";
  const codesSize = size === "sm" ? "text-[11px]" : "text-[13px] sm:text-[15px]";
  const aiSize = size === "sm" ? "text-[9px]" : "text-[10px] sm:text-[11px]";

  return (
    <span className="inline-flex flex-col justify-center leading-none">
      <span className={`font-bold tracking-[0.26em] -mr-[0.26em] ${codesSize} ${codes}`}>CODES</span>
      <span className="mt-[5px] mb-[4px] h-px bg-brass" aria-hidden />
      <span className={`self-end font-semibold tracking-[0.46em] -mr-[0.46em] text-brass ${aiSize}`}>AI</span>
    </span>
  );
}
