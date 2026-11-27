import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Cite } from "@/components/cite/Cite";
import { traceModels, traceTemperatures, traces, type TraceModel } from "@/content/traces";

/** Colours for sentence clusters that loop (used three times or more), in order of first use. */
const LOOP_COLOURS = ["var(--v-supported)", "var(--v-not-found)", "var(--v-human)", "var(--v-loop)"];
const SWEEP_START_MS = 1200;
const SWEEP_STEP_MS = 780;
/** The longest run has 52 sentences; every row uses that many columns so cells line up. */
const MAX_CELLS = Math.max(
  ...traceTemperatures.flatMap((t) => traceModels.map((m) => traces[t][m].clusters.length)),
);

function analyse(clusters: string) {
  const n = clusters.length;
  const counts: Record<string, number> = {};
  for (const c of clusters) counts[c] = (counts[c] ?? 0) + 1;
  const distinct = Object.keys(counts).length;
  let switches = 0;
  let longest = 1;
  let run = 1;
  for (let i = 1; i < n; i++) {
    if (clusters[i] !== clusters[i - 1]) {
      switches += 1;
      run = 1;
    } else {
      run += 1;
      longest = Math.max(longest, run);
    }
  }
  const colour: Record<string, string> = {};
  let next = 0;
  for (const c of clusters) {
    if (counts[c] >= 3 && !(c in colour)) colour[c] = LOOP_COLOURS[next++ % LOOP_COLOURS.length];
  }
  let summary: string;
  if (longest >= 0.6 * n) summary = `repeats one sentence ${longest} times in a row`;
  else if (distinct === 2 && switches === n - 1) summary = `alternates between two sentences at all ${switches} boundaries`;
  else if (distinct === n) summary = "never repeats a sentence";
  else summary = `says ${distinct} different sentences; its longest run is ${longest}`;
  return { n, switches, longest, colour, summary };
}

/**
 * OrbitGlass's repetition atlas as a working figure: the saved outputs of GPT-2 and
 * DistilGPT-2 at seven temperatures. Once in view it sweeps through the temperatures
 * (under five seconds), then it is the visitor's to drag.
 */
export default function TemperatureLab({ plain = false }: { plain?: boolean }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const [ti, setTi] = useState(0);
  const [inspect, setInspect] = useState<{ model: TraceModel; i: number } | null>(null);
  const timers = useRef<number[]>([]);

  const stopSweep = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => {
    if (!inView || reduced) return;
    for (let step = 1; step < traceTemperatures.length; step++) {
      timers.current.push(
        window.setTimeout(() => {
          setInspect(null);
          setTi(step);
        }, SWEEP_START_MS + (step - 1) * SWEEP_STEP_MS),
      );
    }
    return stopSweep;
  }, [inView, reduced]);

  const choose = (i: number) => {
    stopSweep();
    setInspect(null);
    setTi(i);
  };

  const temp = traceTemperatures[ti];
  const runs = useMemo(
    () => traceModels.map((m) => ({ model: m, trace: traces[temp][m], ...analyse(traces[temp][m].clusters) })),
    [temp],
  );

  const inspectedTrace = inspect ? traces[temp][inspect.model] : null;
  // A cell index from a previous temperature may not exist in this run.
  const inspected = inspectedTrace && inspect && inspect.i < inspectedTrace.clusters.length ? inspectedTrace : null;

  return (
    <figure ref={ref} className="mt-16 border-t border-border pt-8 md:mt-20">
      <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-sans text-[15px]">
        {!plain && <span className="figure-nums font-semibold text-foreground">Fig. 3c</span>}
        <span className="text-foreground">
          The repetition atlas: two models asked &ldquo;Is the Earth flat?&rdquo; at seven{" "}
          <Cite id="og-traces" before="temperatures" />
        </span>
      </figcaption>

      <div className="mt-6 grid grid-cols-1 items-start gap-3 sm:grid-cols-[13rem_1fr] sm:gap-5">
        <p id="temperature-label" className="font-sans text-[14.5px] text-foreground sm:pt-2.5">
          Temperature <span className="figure-nums ml-1 text-[1.35rem] font-semibold">{temp}</span>
        </p>
        <div
          role="radiogroup"
          aria-labelledby="temperature-label"
          className="figure-nums grid grid-cols-7 gap-1 rounded-md border border-border p-1 font-sans text-[13px]"
          onKeyDown={(e) => {
            const last = traceTemperatures.length - 1;
            const to =
              e.key === "ArrowRight" || e.key === "ArrowDown"
                ? Math.min(ti + 1, last)
                : e.key === "ArrowLeft" || e.key === "ArrowUp"
                  ? Math.max(ti - 1, 0)
                  : e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? last
                      : null;
            if (to === null) return;
            e.preventDefault();
            choose(to);
            (e.currentTarget.children[to] as HTMLElement | undefined)?.focus();
          }}
        >
          {traceTemperatures.map((t, i) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={i === ti}
              tabIndex={i === ti ? 0 : -1}
              onClick={() => choose(i)}
              className={`press rounded px-1 py-2.5 font-medium transition-colors duration-200 ${
                i === ti ? "bg-foreground text-background" : "text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-5" onMouseLeave={() => setInspect(null)}>
        {runs.map((run) => (
          <div key={run.model} className="grid grid-cols-1 gap-2 sm:grid-cols-[13rem_1fr] sm:gap-5">
            <div className="font-sans text-[14.5px] leading-snug">
              <span className="font-semibold text-foreground">{run.model}</span>
              <span className="figure-nums block text-[13px] text-faint">
                {run.n} sentences · {run.switches} {run.switches === 1 ? "switch" : "switches"} · longest run{" "}
                {run.longest}
              </span>
            </div>
            <div>
              <div
                className="grid gap-[2px] sm:gap-[3px]"
                style={{ gridTemplateColumns: `repeat(${MAX_CELLS}, minmax(0, 1fr))`, maxWidth: `${MAX_CELLS * 15}px` }}
                aria-hidden="true"
              >
                {run.trace.clusters.split("").map((c, i) => (
                  <span
                    key={i}
                    onMouseEnter={() => setInspect({ model: run.model, i })}
                    className="trace-cell h-6 rounded-[2px]"
                    style={{
                      background: run.colour[c] ? `hsl(${run.colour[c]})` : "hsl(var(--border))",
                      animationDelay: reduced ? undefined : `${Math.min(i * 7, 300)}ms`,
                      outline: inspect && inspect.model === run.model && inspect.i === i ? "2px solid hsl(var(--foreground))" : undefined,
                      outlineOffset: 1,
                    }}
                  />
                ))}
              </div>
              <p className="mt-2 font-sans text-[14px] text-muted-foreground">
                At {temp}, {run.model} {run.summary}.
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 min-h-[3rem] max-w-[72ch] font-sans text-[14px] leading-relaxed text-muted-foreground">
        {inspect && inspected ? (
          <>
            <span className="font-semibold text-foreground">
              {inspect.model}, sentence {inspect.i + 1}, cluster {inspected.clusters[inspect.i]}:
            </span>{" "}
            <span className="prose-serif text-foreground/90">&ldquo;{inspected.sentences[inspect.i]}&rdquo;</span>
          </>
        ) : (
          "Each cell is one saved sentence. Coloured cells belong to a sentence the model keeps coming back to; grey ones it said once. Point at a cell to read it."
        )}
      </p>
    </figure>
  );
}
