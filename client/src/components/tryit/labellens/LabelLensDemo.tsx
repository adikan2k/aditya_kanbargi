import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { getJson, SITE } from "./api";
import Search from "./Search";
import AdditiveGuide from "./AdditiveGuide";
import ShelfStats from "./ShelfStats";

const VIEWS = [
  { id: "search", label: "Search products" },
  { id: "additives", label: "Explain an additive" },
  { id: "shelf", label: "The whole shelf" },
] as const;

type ViewId = (typeof VIEWS)[number]["id"];

/**
 * LabelLens, running live in three of its parts: the product search (with each
 * product's label, additives and better swaps), the additive guide and the dashboard
 * figures. The parts that cost money per use, the ask agent and the label reader,
 * link out to the site.
 */
export default function LabelLensDemo() {
  const [view, setView] = useState<ViewId>("search");

  // Wake the API as soon as the section is on the page.
  useEffect(() => {
    getJson("/warm", undefined, true).catch(() => undefined);
  }, []);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div role="group" aria-label="Parts of LabelLens" className="no-scrollbar inline-flex max-w-full overflow-x-auto rounded-full border border-foreground/25 p-1 font-sans text-[13.5px] font-semibold">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              aria-pressed={view === v.id}
              onClick={() => setView(v.id)}
              className={`press whitespace-nowrap rounded-full px-3 py-1.5 transition-colors duration-200 md:px-4 ${
                view === v.id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <p className="font-sans text-[13px] text-muted-foreground">
          Also on the site:{" "}
          <a href={`${SITE}/ask`} target="_blank" rel="noopener noreferrer" className="ref-link font-medium text-foreground">
            ask agent
          </a>
          ,{" "}
          <a href={`${SITE}/label`} target="_blank" rel="noopener noreferrer" className="ref-link font-medium text-foreground">
            label reader
          </a>
          ,{" "}
          <a href={`${SITE}/graph`} target="_blank" rel="noopener noreferrer" className="ref-link inline-flex items-center gap-0.5 font-medium text-foreground">
            food graph
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </p>
      </div>

      {/* The search stays mounted, so coming back to it does not start it over. */}
      <div hidden={view !== "search"}>
        <Search />
      </div>
      {view === "additives" && <AdditiveGuide />}
      {view === "shelf" && <ShelfStats />}
    </div>
  );
}
