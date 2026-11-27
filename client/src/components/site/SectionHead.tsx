import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionHeadProps {
  /** Id for the heading, referenced by the section's aria-labelledby. */
  id: string;
  title: ReactNode;
  /** A sentence or two on what the section holds. */
  children?: ReactNode;
  /** Something to set to the right of the heading on wide screens (filters, a link). */
  aside?: ReactNode;
  size?: "xl" | "lg";
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * A section title in the same face as the name on the first screen. It rises out of a
 * mask once, when it first comes into view; that is the only entrance in the section.
 */
export default function SectionHead({ id, title, children, aside, size = "xl" }: SectionHeadProps) {
  const reduced = useReducedMotion();
  return (
    <header className="flex flex-col gap-x-10 gap-y-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <motion.h2
          id={id}
          className={`display overflow-hidden pb-[0.06em] ${size === "xl" ? "text-[clamp(3rem,8vw,7.5rem)]" : "text-[clamp(2.5rem,5.5vw,5rem)]"}`}
          style={{ lineHeight: 0.92 }}
          initial={reduced ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: "105%" }, shown: { y: "0%", transition: { duration: 0.9, ease: EASE_OUT } } }}
          >
            {title}
          </motion.span>
        </motion.h2>
        {children && <p className="mt-5 max-w-[46ch] font-sans text-[17px] leading-snug text-muted-foreground md:text-[20px]">{children}</p>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </header>
  );
}
