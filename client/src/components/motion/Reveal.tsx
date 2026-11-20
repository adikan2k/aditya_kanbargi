import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

interface LinesProps {
  /** One entry per line. Each line slides up from behind a mask. */
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /**
   * Leave undefined to play when scrolled into view.
   * Pass a boolean to control it yourself (used by the hero, which waits for the intro).
   */
  show?: boolean;
}

/** Headline reveal: every line rises out of its own clipping mask, one after another. */
export function Lines({ lines, className, lineClassName, delay = 0, stagger = 0.09, show }: LinesProps) {
  const reduced = useReducedMotion();
  const controlled = show !== undefined;

  // The wrapper is what gets watched for visibility. The moving lines start
  // outside their masks, so they can never count as "in view" themselves.
  return (
    <motion.span
      className={`block ${className ?? ""}`}
      initial="hidden"
      {...(controlled
        ? { animate: show ? "shown" : "hidden" }
        : { whileInView: "shown", viewport: { once: true, margin: "0px 0px -12% 0px" } })}
    >
      {lines.map((line, i) => (
        // Padding and negative margin stop descenders being clipped by the mask.
        <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <motion.span
            className={`block will-change-transform ${lineClassName ?? ""}`}
            variants={{
              hidden: { y: "115%" },
              shown: {
                y: "0%",
                transition: {
                  duration: reduced ? 0.01 : 1.05,
                  ease: EASE,
                  delay: reduced ? 0 : delay + i * stagger,
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  show?: boolean;
}

/** Fades and lifts a block into place. */
export function FadeUp({ children, className, delay = 0, y = 28, show }: FadeUpProps) {
  const reduced = useReducedMotion();
  const controlled = show !== undefined;
  const hidden = { opacity: 0, y: reduced ? 0 : y };
  const shown = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      {...(controlled
        ? { animate: show ? shown : hidden }
        : { whileInView: shown, viewport: { once: true, margin: "0px 0px -10% 0px" } })}
      transition={{ duration: reduced ? 0.01 : 0.9, ease: EASE, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeaderProps {
  index: string;
  label: string;
  lines: ReactNode[];
  aside?: ReactNode;
}

/** Numbered section heading used by every section after the hero. */
export function SectionHeader({ index, label, lines, aside }: SectionHeaderProps) {
  return (
    <header className="mb-14 md:mb-20">
      <FadeUp className="mb-6 flex items-center gap-4 text-muted-foreground">
        <span className="label-mono text-signal-text">{index}</span>
        <span className="h-px w-10 bg-border" />
        <span className="label-mono">{label}</span>
      </FadeUp>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="display text-[clamp(2.5rem,7vw,6.5rem)]">
          <Lines lines={lines} />
        </h2>
        {aside && (
          <FadeUp delay={0.2} className="max-w-sm text-muted-foreground lg:pb-3">
            {aside}
          </FadeUp>
        )}
      </div>
    </header>
  );
}
