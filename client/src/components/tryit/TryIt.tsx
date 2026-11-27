import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/motion";
import LabelLensDemo from "./labellens/LabelLensDemo";
import ResearchReplay from "./ResearchReplay";
import AuditReplay from "./AuditReplay";
import TemperatureLab from "./TemperatureLab";

const DEMOS = [
  { id: "search", project: "LabelLens", name: "Search a million food labels", note: "Live. Search, open a product, look up an additive, see the whole shelf." },
  { id: "research", project: "Evidentia", name: "Research a question", note: "A recorded run: it searches, reads, quotes and checks itself." },
  { id: "audit", project: "Evidentia", name: "Audit an AI answer", note: "A recorded audit of a real answer, sentence by sentence." },
  { id: "lab", project: "OrbitGlass", name: "Watch a model loop", note: "Recorded outputs at seven temperatures. Drag through them." },
] as const;

type DemoId = (typeof DEMOS)[number]["id"];

const OPEN_EVENT = "tryit:open";

/** Scroll to this section with one of its demos open. Used by the project sections below. */
export function openDemo(id: DemoId) {
  window.dispatchEvent(new CustomEvent<DemoId>(OPEN_EVENT, { detail: id }));
  scrollToId("try");
}

/**
 * Straight after the first screen: the work, running. One live search, two replays of
 * recorded runs and one lab on recorded data, each labelled as what it is.
 */
export default function TryIt() {
  const [demo, setDemo] = useState<DemoId>("search");

  useEffect(() => {
    const open = (e: Event) => setDemo((e as CustomEvent<DemoId>).detail);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  return (
    <section id="try" aria-labelledby="try-title" className="relative scroll-mt-20 border-t border-border py-16 md:py-24">
      <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-x-12 gap-y-8 px-5 md:px-10 2xl:px-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
        <div>
          <h2 id="try-title" className="display text-[clamp(2.4rem,5vw,4.5rem)]" style={{ lineHeight: 0.92 }}>
            Don&rsquo;t read about my work. <span className="text-cite">Use it.</span>
          </h2>

          <div role="tablist" aria-label="Things to try" aria-orientation="vertical" className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:mt-10 lg:block lg:overflow-visible lg:px-0">
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
                  className={`press group shrink-0 rounded-lg border px-4 py-3 text-left font-sans transition-colors duration-200 lg:grid lg:w-full lg:grid-cols-[2.5rem_1fr] lg:rounded-none lg:border-x-0 lg:border-b-0 lg:border-t lg:px-0 lg:py-4 ${
                    on ? "border-foreground lg:border-border" : "border-border"
                  }`}
                >
                  <span className={`figure-nums hidden pt-1 font-mono text-[12px] lg:block ${on ? "text-cite" : "text-faint"}`}>0{i + 1}</span>
                  <span className="block">
                    <span className={`block text-[12.5px] font-semibold uppercase tracking-[0.08em] ${on ? "text-cite" : "text-faint"}`}>{d.project}</span>
                    <span
                      className={`display mt-0.5 block whitespace-nowrap text-[17px] transition-colors duration-200 lg:whitespace-normal lg:text-[24px] ${
                        on ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                      style={{ fontWeight: 700, fontStretch: "104%", letterSpacing: "-0.02em", lineHeight: 1.1 }}
                    >
                      {d.name}
                    </span>
                    <span className={`mt-1 text-[14.5px] leading-snug text-muted-foreground ${on ? "hidden lg:block" : "hidden"}`}>{d.note}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="try-panel"
          role="tabpanel"
          aria-labelledby={`try-tab-${demo}`}
          data-lenis-prevent
          className="paper demo-panel h-[min(86svh,720px)] min-h-[480px] overflow-y-auto overflow-x-hidden rounded-2xl bg-background p-4 text-foreground shadow-[0_50px_100px_rgba(0,0,0,0.5)] md:p-7 lg:sticky lg:top-24"
        >
          {demo === "search" && <LabelLensDemo />}
          {demo === "research" && <ResearchReplay />}
          {demo === "audit" && <AuditReplay />}
          {demo === "lab" && <TemperatureLab plain />}
        </div>
      </div>
    </section>
  );
}
