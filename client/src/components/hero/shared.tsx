import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { scrollToId } from "@/lib/motion";

export const TITLE = "AI and Analytics Engineer";
export const LINE = "Agents, retrieval and evals, built on data pipelines I test.";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * The name, sized so its widest line spans the box it sits in. `stacked` puts the two
 * words on two lines at every width; otherwise they share one line from `lg` up.
 */
export function FitName({ stacked = false, className = "" }: { stacked?: boolean; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    const fit = () => {
      el.style.fontSize = "100px";
      const width = el.scrollWidth;
      if (width > 0) el.style.fontSize = `${(100 * box.clientWidth) / width}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [stacked]);

  let n = 0;
  const word = (text: string) =>
    text.split("").map((ch) => {
      const i = n++;
      return (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block"
          initial={reduced ? false : { y: "0.5em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1 + i * 0.035, ease: EASE_OUT }}
        >
          {ch}
        </motion.span>
      );
    });

  const wordClass = stacked ? "block" : "block lg:inline-block";
  return (
    <h1 id="hero-title" aria-label="Aditya Kanbargi" className={`w-full ${className}`}>
      <span
        ref={ref}
        aria-hidden="true"
        className="display inline-block whitespace-nowrap uppercase"
        style={{ fontStretch: "118%", lineHeight: 0.84, fontWeight: 800, fontSize: "12vw" }}
      >
        <span className={wordClass}>{word("Aditya")}</span>
        {!stacked && <span className="hidden w-[0.28em] lg:inline-block" />}
        <span className={wordClass}>{word("Kanbargi")}</span>
      </span>
    </h1>
  );
}

/** See the work, plus the two profiles. */
export function HeroActions({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-2.5 font-sans text-[16px] font-semibold sm:flex sm:flex-wrap sm:items-center ${className}`}>
      <button
        type="button"
        onClick={() => scrollToId("work")}
        className="press col-span-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-background transition-colors duration-200 hover:bg-foreground/90 sm:col-span-1"
      >
        See the work
        <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </button>
      {[
        { label: "GitHub", href: "https://github.com/adikan2k", Icon: Github },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/adikan2k/", Icon: Linkedin },
      ].map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="press group inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-foreground/30 px-5 text-foreground transition-colors duration-200 hover:border-foreground hover:bg-foreground/[0.06]"
        >
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          {label}
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
