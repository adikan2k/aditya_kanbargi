import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { projects, type Category, type Project } from "@/content/projects";
import { useFinePointer } from "@/lib/motion";

const filters: ("All" | Category)[] = ["All", "AI and NLP", "Analytics", "ML and vision"];
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * The other sixteen projects as an index. On a mouse, pointing at a project that has a
 * real screen or chart shows it beside the pointer; any row opens for the details.
 */
export default function EarlierProjects() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const [active, setActive] = useState<"All" | Category>("All");
  const [hovered, setHovered] = useState<Project | null>(null);
  const list = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 260, damping: 30 });
  const y = useSpring(0, { stiffness: 260, damping: 30 });

  const shown = active === "All" ? projects : projects.filter((p) => p.categories.includes(active));
  const count = (f: "All" | Category) => (f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length);

  return (
    <div id="index" className="mx-auto mt-28 max-w-[1440px] scroll-mt-24 px-5 md:mt-40 md:px-10">
      <div className="flex flex-col gap-x-10 gap-y-5 border-t border-border pt-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="display text-[clamp(2.5rem,6vw,5.5rem)]" style={{ lineHeight: 0.92 }}>
            Sixteen more.
          </h3>
          <p className="mt-4 max-w-[40ch] font-sans text-[17px] leading-snug text-muted-foreground md:text-[19px]">
            Earlier projects in AI, analytics and machine learning, each with its code.
          </p>
        </div>
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-1.5 font-sans text-[14px] font-semibold">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={active === f}
              onClick={() => setActive(f)}
              className={`press inline-flex items-center gap-2 rounded-full border px-4 py-2.5 transition-colors duration-200 ${
                active === f ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {f}
              <span className={`figure-nums text-[12px] ${active === f ? "text-background/70" : "text-faint"}`}>{count(f)}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        ref={list}
        className="relative mt-8"
        onPointerMove={(e) => {
          const box = list.current?.getBoundingClientRect();
          if (!box) return;
          x.set(e.clientX - box.left + 28);
          y.set(e.clientY - box.top - 110);
        }}
        onPointerLeave={() => setHovered(null)}
      >
        <ol className="border-b border-border">
          {shown.map((project, i) => (
            <Row key={project.id} project={project} number={i + 1} onHover={(p) => fine && setHovered(p)} />
          ))}
        </ol>

        {/* The preview that follows the pointer. */}
        {fine && (
          <AnimatePresence>
            {hovered?.preview && (
              <motion.div
                key={hovered.id}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-20 hidden w-[360px] overflow-hidden rounded-xl border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.5)] lg:block"
                style={{ x, y }}
                initial={{ opacity: 0, scale: reduced ? 1 : 0.92, rotate: reduced ? 0 : -3 }}
                animate={{ opacity: 1, scale: 1, rotate: reduced ? 0 : -1.5 }}
                exit={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
                transition={{ duration: 0.22, ease: EASE_OUT }}
              >
                <img src={hovered.preview} alt="" className="block aspect-[16/10] w-full object-cover object-top" />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function Row({ project, number, onHover }: { project: Project; number: number; onHover: (p: Project | null) => void }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li className="border-t border-border" onPointerEnter={() => onHover(project)} onPointerLeave={() => onHover(null)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-x-3 py-4 text-left md:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1fr)_9rem_auto] md:gap-x-6 md:py-5"
      >
        <span className="figure-nums font-mono text-[12.5px] text-faint">{String(number).padStart(2, "0")}</span>
        <span className="min-w-0">
          <span
            className="display block text-[1.45rem] transition-transform duration-300 group-hover:translate-x-2 md:truncate md:text-[2.2rem]"
            style={{ lineHeight: 1.05, transitionTimingFunction: "var(--ease-out)" }}
          >
            {project.name}
          </span>
          <span className="mt-0.5 block truncate font-sans text-[14.5px] text-muted-foreground md:hidden">{project.subtitle}</span>
        </span>
        <span className="hidden font-sans text-[15.5px] text-muted-foreground md:block">{project.subtitle}</span>
        <span className="hidden font-sans text-[13px] font-semibold text-faint md:block">{project.categories.join(", ")}</span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors duration-200 group-hover:border-foreground">
          <Plus className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-45" : ""}`} style={{ transitionTimingFunction: "var(--ease-out)" }} aria-hidden="true" />
          <span className="sr-only">{open ? "Hide details" : "Show details"}</span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0.01 : 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-6 pb-8 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,22rem)] md:gap-x-6">
              <span className="hidden md:block" />
              <div>
                <p className="max-w-[60ch] font-sans text-[17px] leading-relaxed text-foreground/90">{project.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools">
                  {project.tags.map((t) => (
                    <li key={t} className="rounded-full border border-border px-3 py-1 font-sans text-[13px] font-medium text-muted-foreground">
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ref-link mt-4 inline-flex items-center gap-1 py-2 font-sans text-[15px] font-semibold text-foreground"
                >
                  Code on GitHub
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              {project.preview && (
                <img
                  src={project.preview}
                  alt={`${project.name}: a screen from the project`}
                  loading="lazy"
                  className="aspect-[16/10] w-full rounded-lg border border-border object-cover object-top"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
