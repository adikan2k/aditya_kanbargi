import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Minus, RotateCcw, Search, X } from "lucide-react";
import { research, type ClaimLabel } from "@/content/research";
import { Cite } from "../cite/Cite";

const EVIDENTIA_URL = "https://evidentia-green.vercel.app/research";
/** The recorded run took about 37 seconds; the replay plays it four times faster. */
const SPEED = 4;

const STAGES = [
  { key: "plan", label: "Plan" },
  { key: "search", label: "Search" },
  { key: "fetch", label: "Read" },
  { key: "index", label: "Index" },
  { key: "retrieve", label: "Retrieve" },
  { key: "write", label: "Write" },
  { key: "quote_check", label: "Quote check" },
  { key: "check", label: "Judge" },
  { key: "repair", label: "Repair" },
] as const;

/** Which stage of the strip each recorded step belongs to. */
const stageOf = (node: string) => (["rewrite", "reretrieve", "revise"].includes(node) ? "repair" : node);

const labelVar: Record<ClaimLabel, string> = {
  supported: "var(--v-supported)",
  partial: "var(--v-not-found)",
  unverified: "var(--v-contra)",
};
const labelText: Record<ClaimLabel, string> = { supported: "Supported", partial: "Partly supported", unverified: "Unverified" };

/**
 * A recorded run of Evidentia's research agent, replayed: it plans searches, reads the
 * pages, writes claims that each carry an exact quote, checks the quotes in code, has a
 * second model judge them, and repairs what failed.
 */
export default function ResearchReplay() {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { once: true, amount: 0.3 });
  const total = research.events.length;
  /** Number of recorded steps that have happened so far. */
  const [done, setDone] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const run = () => {
    clear();
    setOpen(null);
    if (reduced) {
      setDone(total);
      setOpen(0);
      return;
    }
    setDone(0);
    research.events.forEach((event, i) => {
      // Steps recorded at the same instant still land one after another.
      const at = 500 + (event.t / SPEED) * 1000 + i * 90;
      timers.current.push(window.setTimeout(() => setDone(i + 1), at));
    });
    const end = 500 + (research.durationS / SPEED) * 1000 + total * 90 + 400;
    timers.current.push(window.setTimeout(() => setOpen(0), end));
  };

  useEffect(() => {
    if (inView) run();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced]);

  const finished = done >= total;
  const current = done > 0 ? research.events[done - 1] : null;
  const reached = new Set(research.events.slice(0, done).map((e) => stageOf(e.node)));
  const activeStage = current && !finished ? stageOf(current.node) : null;
  const wrote = research.events.findIndex((e) => e.node === "write") < done;
  const quotesChecked = research.events.findIndex((e) => e.node === "quote_check") < done;
  const judged = research.events.findIndex((e) => e.node === "check") < done;

  return (
    <div ref={root} className="font-sans">
      <div className="flex items-start justify-between gap-4">
        <p className="text-[13px] font-medium text-muted-foreground">
          Evidentia research, a recorded <Cite id="ev-research" before="run" />
          <span className="text-faint"> · replayed at {SPEED}× speed</span>
        </p>
        <button type="button" onClick={run} className="press -mr-1 -mt-1.5 inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-2 text-[13px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground">
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Replay
        </button>
      </div>

      <p className="display mt-2 text-[20px] text-foreground md:text-[25px]" style={{ fontWeight: 700, fontStretch: "100%", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
        {research.question}
      </p>

      {/* The pipeline, lighting up step by step. */}
      <ol className="mt-4 grid grid-cols-3 gap-1 sm:grid-cols-9" aria-label="Steps of the run">
        {STAGES.map((s) => {
          const on = reached.has(s.key);
          const active = activeStage === s.key;
          return (
            <li key={s.key}>
              <span className="block h-1.5 overflow-hidden rounded-full bg-border">
                <span
                  className="block h-full rounded-full bg-foreground transition-transform duration-500 ease-out"
                  style={{ transform: on ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", background: active ? "hsl(var(--cite))" : undefined }}
                />
              </span>
              <span className={`mt-1.5 block text-[11.5px] font-semibold transition-colors duration-300 ${on ? "text-foreground" : "text-faint"}`}>{s.label}</span>
            </li>
          );
        })}
      </ol>

      <p className="figure-nums mt-3 flex min-h-[2.6rem] items-start justify-between gap-4 border-t border-border pt-2.5 text-[13.5px] text-muted-foreground sm:min-h-[1.6rem]" aria-live="off">
        <span>
          {current ? (
            <>
              <span className="font-semibold text-foreground">{current.summary.charAt(0).toUpperCase() + current.summary.slice(1)}</span>
            </>
          ) : (
            "Starting…"
          )}
        </span>
        <span className="shrink-0 whitespace-nowrap">
          {current ? `${current.t.toFixed(1)} s · $${current.usd.toFixed(3)}` : "0.0 s · $0.000"}
        </span>
      </p>

      {/* Until the claims are written, the searches it planned stand in their place. */}
      {!wrote && (
        <ul className="mt-2 min-h-[13rem] space-y-0.5" aria-label="Searches it planned">
          {done > 0 &&
            research.queries.map((query, i) => (
              <li
                key={query}
                className="replay-in grid grid-cols-[1.5rem_1fr] gap-x-2 border-t border-border py-2 text-[14.5px] leading-snug text-muted-foreground"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <Search className="mt-0.5 h-4 w-4 text-faint" aria-hidden="true" />
                {query}
              </li>
            ))}
        </ul>
      )}

      <ol className={`mt-2 space-y-0.5 ${wrote ? "min-h-[13rem]" : "hidden"}`}>
        {wrote &&
          research.claims.map((claim, i) => {
            const isOpen = open === i;
            return (
              <li key={claim.text} className="replay-in border-t border-border" style={{ animationDelay: `${i * 70}ms` }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="grid w-full grid-cols-[1.5rem_1fr] gap-x-2 py-2 text-left"
                >
                  <span className="pt-0.5">
                    <ClaimMark label={claim.label} state={finished ? "final" : judged ? "judged" : quotesChecked ? "quoted" : "written"} />
                  </span>
                  <span className="text-[14.5px] leading-snug text-foreground">
                    {claim.text}
                    <span className="ml-2 whitespace-nowrap text-[12px] text-faint">{claim.host}</span>
                  </span>
                </button>
                {isOpen && (
                  <div className="mb-2.5 ml-8 border-l-2 pl-3 text-[13.5px] leading-snug" style={{ borderColor: `hsl(${labelVar[claim.label]})` }}>
                    <p className="prose-serif text-muted-foreground">&ldquo;{claim.quote}&rdquo;</p>
                    <p className="mt-1.5 text-[12.5px]">
                      <span className="font-semibold" style={{ color: `hsl(${labelVar[claim.label]})` }}>
                        {labelText[claim.label]}.
                      </span>{" "}
                      <span className="text-faint">
                        {claim.reason || "The quote is on the page word for word, and a second model judged that it backs the claim."}
                      </span>{" "}
                      <a href={claim.url} target="_blank" rel="noopener noreferrer" className="ref-link whitespace-nowrap font-medium text-foreground">
                        Open the page
                      </a>
                    </p>
                  </div>
                )}
              </li>
            );
          })}
      </ol>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-3 text-[13px] text-muted-foreground">
        <span className="figure-nums">
          {finished ? (
            <>
              <span className="font-semibold text-foreground">
                {research.labels.supported} supported, {research.labels.partial} partly
              </span>{" "}
              · {research.sourcesRead} pages read · {research.passages} passages · ${research.costUsd.toFixed(2)} · {research.durationS.toFixed(0)} s
            </>
          ) : (
            "Every claim must carry a quote that is on the page word for word."
          )}
        </span>
        <a href={EVIDENTIA_URL} target="_blank" rel="noopener noreferrer" className="ref-link ml-auto inline-flex items-center gap-1 py-1.5 font-medium text-foreground">
          Ask your own question
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

/** A claim's mark: waiting, quote found, then the final verdict. */
function ClaimMark({ label, state }: { label: ClaimLabel; state: "written" | "quoted" | "judged" | "final" }) {
  if (state === "final") {
    const Icon = label === "supported" ? Check : label === "partial" ? Minus : X;
    return (
      <span className="grid h-5 w-5 place-items-center rounded-full text-white" style={{ background: `hsl(${labelVar[label]})` }}>
        <Icon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
        <span className="sr-only">{labelText[label]}</span>
      </span>
    );
  }
  return (
    <span
      className={`block h-5 w-5 rounded-full border-2 transition-colors duration-300 ${state === "written" ? "border-border" : "border-foreground/50"} ${state === "judged" ? "animate-pulse" : ""}`}
      aria-hidden="true"
    />
  );
}
