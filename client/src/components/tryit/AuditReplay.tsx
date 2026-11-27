import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { animate } from "animejs/animation";
import { createDrawable } from "animejs/svg";
import { stagger } from "animejs/utils";
import { ArrowDown, ArrowUpRight, RotateCcw } from "lucide-react";
import { Cite } from "@/components/cite/Cite";
import { audit, sentenceVerdict, verdictLabel, type Verdict } from "@/content/audit";
import { scrollToId, useIsTablet } from "@/lib/motion";

const EVIDENTIA_URL = "https://evidentia-green.vercel.app";

/** How long each sentence is read before its mark lands, and the pause after it. */
const READ_MS = 300;
const SETTLE_MS = 320;

const verdictVar: Record<Verdict, string> = {
  supported: "var(--v-supported)",
  not_found: "var(--v-not-found)",
  contradicted: "var(--v-contra)",
  needs_human: "var(--v-human)",
};

/** A margin mark, drawn in like a pen stroke when it lands. */
function VerdictMark({ verdict, shown, reduced }: { verdict: Verdict; shown: boolean; reduced: boolean | null }) {
  const ref = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const svg = ref.current;
    if (!svg || !shown || reduced) return;
    const strokes = createDrawable(svg.querySelectorAll("path, polyline, line"));
    const anim = animate(strokes, { draw: ["0 0", "0 1"], duration: 460, ease: "outExpo", delay: stagger(70) });
    return () => {
      anim.revert();
    };
  }, [shown, reduced]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-[18px] w-[18px] shrink-0 transition-opacity duration-200"
      style={{ color: `hsl(${verdictVar[verdict]})`, opacity: shown ? 1 : 0 }}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {verdict === "supported" && <polyline points="4.5 10.5 8.5 14.5 15.5 5.5" />}
      {verdict === "not_found" && (
        <>
          <line x1="5" y1="5" x2="15" y2="15" />
          <line x1="15" y1="5" x2="5" y2="15" />
        </>
      )}
      {verdict === "contradicted" && (
        <>
          <line x1="4" y1="8" x2="16" y2="8" />
          <line x1="4" y1="13" x2="16" y2="13" />
          <line x1="12.5" y1="4" x2="7.5" y2="17" />
        </>
      )}
      {verdict === "needs_human" && (
        <>
          <path d="M7.2 7.2a2.9 2.9 0 1 1 4.3 2.5c-.9.5-1.5 1.2-1.5 2.2v.5" />
          <line x1="10" y1="15.6" x2="10" y2="15.7" />
        </>
      )}
    </svg>
  );
}

/**
 * A recorded audit from Evidentia, one of my projects, replayed: each sentence of a
 * real AI answer is read against its cited page, its verdict mark lands in the margin,
 * and the tally of claims fills underneath. It plays once when it comes into view;
 * Replay runs it again. The title and the links at the foot say plainly whose it is.
 */
export default function AuditReplay({ startDelay = 0, inSection = false }: { startDelay?: number; inSection?: boolean }) {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { once: true, amount: 0.35 });
  // Still on screen? If the visitor scrolls away mid-replay, it jumps to the end.
  const onScreen = useInView(root, { amount: 0 });
  const wide = useIsTablet();
  const [showAll, setShowAll] = useState(false);
  const total = audit.sentences.length;
  // How many sentences have their verdict, and which one is being read.
  const [done, setDone] = useState(0);
  const [reading, setReading] = useState<number | null>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const run = useCallback(
    (delay: number) => {
      clear();
      setFocus(null);
      if (reduced) {
        setReading(null);
        setDone(total);
        return;
      }
      setDone(0);
      setReading(null);
      let t = delay;
      for (let i = 0; i < total; i++) {
        timers.current.push(window.setTimeout(() => setReading(i), t));
        t += READ_MS;
        timers.current.push(
          window.setTimeout(() => {
            setDone(i + 1);
            setReading(null);
          }, t),
        );
        t += SETTLE_MS;
      }
    },
    [reduced, total],
  );

  useEffect(() => {
    if (inView) run(startDelay);
  }, [inView, run, startDelay]);

  useEffect(() => clear, []);

  const finished = done === total;

  useEffect(() => {
    if (!onScreen && done > 0 && !finished) {
      clear();
      setReading(null);
      setDone(total);
    }
  }, [onScreen, done, finished, total]);

  // On phones the three supported sentences fold away; the flagged ones are the story.
  const folded = !wide && !showAll;
  const hiddenCount = audit.sentences.filter((s) => sentenceVerdict(s) === "supported").length;
  const shownIndex = focus ?? reading ?? (done > 0 ? done - 1 : null);
  const evidence = shownIndex !== null ? audit.sentences[shownIndex] : null;

  // Claim-level tally, filled as each sentence is checked.
  const claimCells = audit.sentences.flatMap((s, i) => s.claims.map((v) => ({ v, on: i < done })));
  const counts = claimCells.reduce<Record<Verdict, number>>(
    (acc, c) => {
      if (c.on) acc[c.v] += 1;
      return acc;
    },
    { supported: 0, not_found: 0, contradicted: 0, needs_human: 0 },
  );

  const status = finished
    ? `${claimCells.length} claims · ${audit.pages} cited pages · $${audit.costUsd}`
    : reading !== null
      ? `Checking ${reading + 1}/${total} · ${audit.sentences.slice(reading).find((s) => s.cites)?.cites ?? "its source"}`
      : done > 0
        ? `${done}/${total} sentences checked`
        : "Recorded audit, replayed";

  return (
    <figure
      ref={root}
      className="relative border-t border-foreground/25 pt-4"
      aria-label="A recorded Evidentia audit of an AI answer, replayed sentence by sentence"
    >
      <div className="flex items-start justify-between gap-4">
        <figcaption className="min-w-0 font-sans leading-snug">
          <span className="block text-[15px] font-semibold text-foreground">
            Evidentia, my auditor for AI <Cite id="ev-crispr" before="answers" />
          </span>
          <span className="figure-nums mt-0.5 block h-5 truncate text-[12.5px] text-muted-foreground">{status}</span>
        </figcaption>
        <button
          type="button"
          onClick={() => run(150)}
          className="press -mr-1 -mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-2.5 font-sans text-[13px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Replay
        </button>
      </div>
      <p className="mt-2.5 font-sans text-[12.5px] leading-snug text-faint">
        {audit.model}, with web search, was asked:{" "}
        <span className="text-muted-foreground">&ldquo;{audit.question}&rdquo;</span>
      </p>

      <ol className="mt-3 space-y-0.5 border-t border-border pt-2.5">
        {audit.sentences.map((sentence, i) => {
          const verdict = sentenceVerdict(sentence);
          const checked = i < done;
          const isReading = reading === i;
          if (folded && verdict === "supported") return null;
          return (
            <li key={sentence.text}>
              <button
                type="button"
                onMouseEnter={() => finished && setFocus(i)}
                onMouseLeave={() => finished && setFocus(null)}
                onFocus={() => finished && setFocus(i)}
                onBlur={() => finished && setFocus(null)}
                onClick={() => finished && setFocus(i)}
                className={`grid w-full grid-cols-[1.4rem_1fr] gap-x-2 rounded px-1.5 py-1 text-left transition-colors duration-300 ${
                  isReading || (finished && focus === i) ? "bg-foreground/[0.06]" : ""
                }`}
              >
                <span className="pt-[3px]">
                  <VerdictMark verdict={verdict} shown={checked} reduced={reduced} />
                </span>
                <span className="prose-serif text-[14.5px] leading-[1.5] md:text-[15px]">
                  <span
                    className={`audit-line transition-colors duration-300 ${
                      checked || isReading ? "text-foreground" : "text-foreground/70"
                    } ${checked ? "is-checked" : ""}`}
                    style={{ ["--verdict" as string]: verdictVar[verdict] }}
                  >
                    {sentence.text}
                  </span>
                  {sentence.cites && (
                    <span className="ml-1.5 whitespace-nowrap font-sans text-[11.5px] text-faint">({sentence.cites})</span>
                  )}
                  <span className="sr-only">. Verdict: {verdictLabel[verdict]}.</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      {!wide && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          className="press mt-1 inline-flex items-center px-1.5 py-2.5 font-sans text-[13px] font-medium text-muted-foreground"
        >
          {showAll ? "Hide the supported sentences" : `Show the ${hiddenCount} supported sentences`}
        </button>
      )}

      <div className="mt-3 min-h-[3.6rem] border-t border-border pt-3 font-sans text-[13px] leading-snug lg:min-h-[5.25rem] xl:min-h-[3.6rem]">
        {evidence ? (
          <p className="text-muted-foreground">
            <span className="font-semibold" style={{ color: `hsl(${verdictVar[sentenceVerdict(evidence)]})` }}>
              {verdictLabel[sentenceVerdict(evidence)]}.
            </span>{" "}
            {evidence.evidence}
          </p>
        ) : (
          <p className="text-faint">Each sentence is checked against the page it cites.</p>
        )}
      </div>

      <div className="mt-3 border-t border-border pt-3">
        <div className="flex gap-1" aria-hidden="true">
          {claimCells.map((cell, i) => (
            <span
              key={i}
              className="h-2.5 flex-1 rounded-[2px] transition-colors duration-300"
              style={{ background: cell.on ? `hsl(${verdictVar[cell.v]})` : "hsl(var(--border))" }}
            />
          ))}
        </div>
        <p className="figure-nums mt-2.5 flex flex-wrap gap-x-3 gap-y-1 font-sans text-[12.5px] text-muted-foreground">
          {(Object.keys(verdictLabel) as Verdict[]).map((v) => (
            <span key={v} className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-[2px]" style={{ background: `hsl(${verdictVar[v]})` }} aria-hidden="true" />
              {counts[v]} {verdictLabel[v].toLowerCase()}
            </span>
          ))}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 border-t border-border pt-2 font-sans text-[14px] font-medium">
        {!inSection && <a
          href="#evidentia"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("evidentia");
          }}
          className="ref-link inline-flex items-center gap-1.5 py-3 text-foreground"
        >
          How I built it
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </a>}
        <a
          href={EVIDENTIA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ref-link inline-flex items-center gap-1.5 py-3 text-foreground"
        >
          Try Evidentia
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </figure>
  );
}
