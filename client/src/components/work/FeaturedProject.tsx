import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Featured } from "@/content/featured";
import { Cite } from "../cite/Cite";
import BrowserScreen from "./BrowserScreen";
import { openDemo } from "../tryit/TryIt";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * One featured project: its name, the live screens (scrolling, switchable), the
 * headline result and the rest of the results, how it is built, and what it is made of.
 */
export default function FeaturedProject({ project, index, total }: { project: Featured; index: number; total: number }) {
  const reduced = useReducedMotion();
  const [view, setView] = useState(0);
  const screen = project.screens[view];
  const titleId = `${project.id}-title`;
  const glow = `radial-gradient(50% 55% at 30% 45%, black, transparent 75%)`;

  return (
    <article id={project.id} aria-labelledby={titleId} className="relative scroll-mt-20 pt-20 md:pt-28">
      {/* The project's own colour, behind its screens. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[85%] opacity-70 dark:opacity-100"
        style={{ backgroundColor: `hsl(${project.glow} / 0.42)`, maskImage: glow, WebkitMaskImage: glow }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-border pt-5 font-sans text-[14px] font-medium text-faint">
          <span className="figure-nums">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span>{project.made}</span>
        </div>

        <motion.h3
          id={titleId}
          className="display mt-6 overflow-hidden text-[clamp(3.5rem,11vw,10.5rem)]"
          style={{ lineHeight: 0.86 }}
          initial={reduced ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.span className="block" variants={{ hidden: { y: "100%" }, shown: { y: "0%", transition: { duration: 1, ease: EASE_OUT } } }}>
            {project.name}
          </motion.span>
        </motion.h3>
        <div className="mt-4 flex flex-col gap-x-10 gap-y-4 md:mt-6 lg:flex-row lg:items-end lg:justify-between">
          <p className="display text-[clamp(1.4rem,2.6vw,2.25rem)] text-muted-foreground" style={{ fontWeight: 600, fontStretch: "100%", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {project.question}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-sans text-[15px] font-semibold">
            {project.links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="ref-link inline-flex items-center gap-1 py-2.5 text-foreground">
                {link.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
            <button
              type="button"
              onClick={() => openDemo(project.demo)}
              className="press inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-background transition-colors duration-200 hover:bg-foreground/90"
            >
              Try it on this page
              <ArrowDown className="h-4 w-4 rotate-180" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <BrowserScreen screen={screen} />
            {project.screens.length > 1 && (
              <div role="group" aria-label={`Pages of ${project.name}`} className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto font-sans text-[14px] font-semibold">
                {project.screens.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    aria-pressed={view === i}
                    onClick={() => setView(i)}
                    className={`press shrink-0 rounded-full border px-4 py-2 transition-colors duration-200 ${
                      view === i ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <p className="display figure-nums text-[clamp(5rem,10vw,9rem)] text-cite" style={{ lineHeight: 0.85, fontWeight: 800 }}>
              <Cite id={project.headline.cite} before={project.headline.value} />
            </p>
            <p className="mt-3 max-w-[26rem] font-sans text-[18px] leading-snug text-foreground md:text-[20px]">{project.headline.note}</p>

            <ul className="mt-8 border-b border-border">
              {project.results.map((r) => (
                <li key={r.measure} className="grid grid-cols-[minmax(7.5rem,auto)_1fr] items-baseline gap-x-5 border-t border-border py-3.5">
                  <span className="display figure-nums whitespace-nowrap text-[24px] md:text-[28px]" style={{ fontWeight: 700, fontStretch: "100%", letterSpacing: "-0.02em" }}>
                    <Cite id={r.cite} before={r.value} />
                  </span>
                  <span className="font-sans text-[15px] leading-snug text-foreground">
                    {r.measure}
                    {r.note && <span className="block text-[13.5px] text-muted-foreground">{r.note}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 max-w-[62rem] font-sans text-[18px] leading-relaxed text-foreground/90 md:mt-16 md:text-[21px]">{project.what}</p>

        <div className="mt-10 md:mt-14">
          <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-faint">How it works</p>
          <ol
            className={`mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 ${
              project.steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
            }`}
          >
            {project.steps.map((s, i) => (
              <li key={s.title} className="bg-background p-5">
                <span className="figure-nums font-mono text-[12px] text-cite">{String(i + 1).padStart(2, "0")}</span>
                <p className="display mt-2 text-[20px]" style={{ fontWeight: 700, fontStretch: "100%", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  {s.title}
                </p>
                <p className="mt-2 font-sans text-[14.5px] leading-snug text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-col gap-x-10 gap-y-4 lg:flex-row lg:items-start lg:justify-between">
          <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
            {project.stack.map((t) => (
              <li key={t} className="rounded-full border border-border px-3 py-1.5 font-sans text-[13px] font-medium text-muted-foreground">
                {t}
              </li>
            ))}
          </ul>
          <p className="max-w-[34rem] shrink-0 font-sans text-[14px] leading-snug text-faint lg:basis-[34rem]">{project.credit}</p>
        </div>
      </div>
    </article>
  );
}
