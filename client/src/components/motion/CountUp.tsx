import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  /** Hold the animation until this is true (the hero waits for the intro to finish). */
  start?: boolean;
  className?: string;
}

function format(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Counts from zero to a number the first time it scrolls into view. */
export default function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.8,
  start = true,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduced = useReducedMotion();
  const final = `${prefix}${format(to, decimals)}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || !start) return;
    if (reduced) {
      node.textContent = final;
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${prefix}${format(v, decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, start, reduced, to, decimals, prefix, suffix, duration, final]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`} aria-label={final}>
      {`${prefix}${format(0, decimals)}${suffix}`}
    </span>
  );
}
