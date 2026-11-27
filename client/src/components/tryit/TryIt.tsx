import { useEffect, useState } from "react";
import { ArrowRight, MousePointerClick } from "lucide-react";
import { scrollToId } from "@/lib/motion";
import LabelLensDemo from "./labellens/LabelLensDemo";
import ResearchReplay from "./ResearchReplay";
import AuditReplay from "./AuditReplay";
import TemperatureLab from "./TemperatureLab";

type Kind = "Live" | "Replay" | "Interactive";

const DEMOS = [
  {
    id: "search",
    project: "LabelLens",
    name: "Search a million food labels",
    kind: "Live" as Kind,
    note: "The real search, running now.",
    hint: "Type any food, or tap a product to open its label, additives and better swaps.",
  },
  {
    id: "research",
    project: "Evidentia",
    name: "Research a question",
    kind: "Replay" as Kind,
    note: "A recorded run: it searches, reads, quotes and checks itself.",
    hint: "Watch it plan, search, read and check. Tap any claim to see its exact quote.",
  },
  {
    id: "audit",
    project: "Evidentia",
    name: "Audit an AI answer",
    kind: "Replay" as Kind,
    note: "A recorded audit of a real answer, sentence by sentence.",
    hint: "When it finishes, point at or tap a sentence to see what its page says.",
  },
  {
    id: "lab",
    project: "OrbitGlass",
    name: "Watch a model loop",
    kind: "Interactive" as Kind,
    note: "Recorded outputs at seven temperatures.",
    hint: "Pick a temperature, then point at or tap a cell to read that sentence.",
  },
] as const;

type DemoId = (typeof DEMOS)[number]["id"];

const OPEN_EVENT = "tryit:open";

/** Scroll to this section with one of its demos open. Used by the project sections below. */
export function openDemo(id: DemoId) {
  window.dispatchEvent(new CustomEvent<DemoId>(OPEN_EVENT, { detail: id }));
  scrollToId("try");
}

function KindBadge({ kind, on }: { kind: Kind; on: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-[0.06em] ${
        on ? "border-foreground/40 text-foreground" : "border-border text-faint"
      }`}
    >
      {kind === "Live" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden="true" />}
      {kind}
    </span>
  );
}

/**
 * Straight after the first screen: the work, running. One live search, two replays of
 * recorded runs and one lab on recorded data, each labelled as what it is. The picker
 * reads as a set of cards to choose from, and the panel says what can be done in it.
 */
export default function TryIt() {
  const [demo, setDemo] = useState<DemoId>("search");
  const active = DEMOS.find((d) => d.id === demo)!;

  useEffect(() => {
    const open = (e: Event) => setDemo((e as CustomEvent<DemoId>).detail);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  return (
    <section id="try" aria-labelledby="try-title" className="relative scroll-mt-20 border-t border-border py-16 md:py-24">
      <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-x-12 gap-y-6 px-5 md:px-10 2xl:px-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
        <div>
          <h2 id="try-title" className="display text-[clamp(2.4rem,5vw,4.5rem)]" style={{ lineHeight: 0.92 }}>
            Don&rsquo;t read about my work. <span className="text-cite">Use it.</span>
          </h2>
          <p className="mt-4 flex items-start gap-2 font-sans text-[16px] leading-snug text-muted-foreground md:text-[18px]">
            <MousePointerClick className="mt-0.5 h-5 w-5 shrink-0 text-cite" aria-hidden="true" />
            <span>
              Pick one of four projects below. Each one runs right here: search it, tap it, drag it.
            </span>
          </p>

          <div role="tablist" aria-label="Projects to try" className="mt-6 grid grid-cols-2 gap-2 lg:mt-8 lg:grid-cols-1 lg:gap-2.5">
            {DEMOS.map((d, i) => {
              const on = demo === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  id={`try-tab-${d.id}`}
                  aria-selected={on}
                  aria-controls="try-panel"
                  onClick={() => setDemo(d.id)}
                  className={`press group relative flex flex-col overflow-hidden rounded-xl border p-3.5 text-left font-sans transition-colors duration-200 lg:grid lg:grid-cols-[2.25rem_1fr_auto] lg:items-center lg:gap-x-3 lg:p-4 ${
                    on ? "border-cite bg-foreground/[0.07]" : "border-border hover:border-foreground/50 hover:bg-foreground/[0.03]"
                  }`}
                >
                  {/* The chosen card carries a bar on its left edge. */}
                  <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 bg-cite transition-opacity duration-200 ${on ? "opacity-100" : "opacity-0"}`} />
                  <span className={`figure-nums hidden font-mono text-[12px] lg:block ${on ? "text-cite" : "text-faint"}`}>0{i + 1}</span>
                  <span className="block min-w-0">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className={`text-[11.5px] font-semibold uppercase tracking-[0.08em] ${on ? "text-cite" : "text-faint"}`}>{d.project}</span>
                      <span className="hidden lg:inline-flex">
                        <KindBadge kind={d.kind} on={on} />
                      </span>
                    </span>
                    <span
                      className={`display mt-1 block text-[15.5px] transition-colors duration-200 lg:text-[23px] ${
                        on ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                      style={{ fontWeight: 700, fontStretch: "104%", letterSpacing: "-0.02em", lineHeight: 1.12 }}
                    >
                      {d.name}
                    </span>
                    <span className="mt-1 hidden text-[14px] leading-snug text-muted-foreground lg:block">{d.note}</span>
                    <span className="mt-2 lg:hidden">
                      <KindBadge kind={d.kind} on={on} />
                    </span>
                  </span>
                  <ArrowRight
                    className={`hidden h-5 w-5 transition-transform duration-200 lg:block ${
                      on ? "translate-x-0 text-cite" : "-translate-x-1 text-faint group-hover:translate-x-0 group-hover:text-foreground"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="try-panel"
          role="tabpanel"
          aria-labelledby={`try-tab-${demo}`}
          className="paper flex flex-col overflow-hidden rounded-2xl bg-background text-foreground shadow-[0_50px_100px_rgba(0,0,0,0.5)] lg:sticky lg:top-24 lg:h-[min(86svh,760px)] lg:min-h-[520px]"
        >
          {/* What can be done in this panel, always in view. */}
          <p
            key={active.id}
            className="replay-in flex items-start gap-2.5 border-b border-foreground/10 bg-foreground/[0.04] px-4 py-3 font-sans text-[14px] leading-snug text-foreground md:px-7"
          >
            <span className="relative mt-1.5 flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cite opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cite" />
            </span>
            <span>
              <span className="font-semibold">Try it: </span>
              {active.hint}
            </span>
          </p>
          <div data-lenis-prevent className="demo-panel min-h-0 flex-1 overflow-x-hidden p-4 md:p-7 lg:overflow-y-auto">
            {demo === "search" && <LabelLensDemo />}
            {demo === "research" && <ResearchReplay />}
            {demo === "audit" && <AuditReplay />}
            {demo === "lab" && <TemperatureLab plain />}
          </div>
        </div>
      </div>
    </section>
  );
}
