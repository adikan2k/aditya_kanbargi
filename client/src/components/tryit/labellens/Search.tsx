import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronDown, Search as SearchIcon } from "lucide-react";
import { Cite } from "../../cite/Cite";
import { ApiError, getJson, GradeBadge, isAbort, NOVA, Thumb, type ProductSummary } from "./api";
import ProductDetail from "./ProductDetail";

// "organic" is the opening search because its first results run from A to E.
const FIRST = "organic";
const TRIES = ["greek yogurt", "oat milk", "pizza", "0016000169685"];

type State =
  | { kind: "idle" }
  | { kind: "loading"; q: string }
  | { kind: "done"; q: string; results: ProductSummary[]; ms: number }
  | { kind: "error"; q: string; waking: boolean };

/** The real LabelLens product search. Opening a result shows what LabelLens knows about it. */
export default function Search() {
  const reduced = useReducedMotion();
  const [text, setText] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const [typing, setTyping] = useState(true);
  const [slow, setSlow] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const request = useRef<AbortController | null>(null);

  const search = async (q: string) => {
    const query = q.trim();
    request.current?.abort();
    setOpen(null);
    if (!query) {
      setState({ kind: "idle" });
      return;
    }
    const controller = new AbortController();
    request.current = controller;
    setState({ kind: "loading", q: query });
    try {
      const { data, ms } = await getJson<{ results: ProductSummary[] }>(`/search?q=${encodeURIComponent(query)}&limit=8`, controller.signal, true);
      setState({ kind: "done", q: query, results: data.results, ms });
    } catch (error) {
      if (isAbort(error)) return;
      setState({ kind: "error", q: query, waking: error instanceof ApiError && error.status === 503 });
    }
  };

  // On open, the first search types itself, then the box is the visitor's.
  useEffect(() => {
    if (reduced) {
      setText(FIRST);
      setTyping(false);
      search(FIRST);
      return;
    }
    let i = 0;
    let timer = window.setTimeout(function tick() {
      i += 1;
      setText(FIRST.slice(0, i));
      if (i < FIRST.length) timer = window.setTimeout(tick, 70);
      else {
        setTyping(false);
        search(FIRST);
      }
    }, 600);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // After that, results follow the typing.
  useEffect(() => {
    if (typing) return;
    if (state.kind !== "idle" && state.q === text.trim()) return;
    const timer = window.setTimeout(() => search(text), 280);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, typing]);

  // Say so when the API is waking up, instead of looking stuck.
  useEffect(() => {
    setSlow(false);
    if (state.kind !== "loading") return;
    const timer = window.setTimeout(() => setSlow(true), 2200);
    return () => window.clearTimeout(timer);
  }, [state]);

  const results = state.kind === "done" ? state.results : [];

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setTyping(false);
          search(text);
        }}
        className="flex h-[56px] items-center gap-3 rounded-xl border-2 border-foreground bg-card px-4 md:h-[64px] md:px-5"
      >
        <SearchIcon className="h-5 w-5 shrink-0 text-faint" aria-hidden="true" />
        <input
          value={text}
          onChange={(e) => {
            setTyping(false);
            setText(e.target.value);
          }}
          onFocus={() => setTyping(false)}
          aria-label="Search US food products with LabelLens"
          placeholder="Search any packaged food"
          autoComplete="off"
          spellCheck={false}
          className="display min-w-0 flex-1 bg-transparent text-[20px] text-foreground outline-none placeholder:text-faint md:text-[26px]"
          style={{ fontWeight: 700, fontStretch: "100%", letterSpacing: "-0.02em", lineHeight: 1.2 }}
        />
        <button type="submit" className="press shrink-0 rounded-lg bg-foreground px-4 py-2.5 font-sans text-[14px] font-semibold text-background">
          Search
        </button>
      </form>

      <p className="figure-nums mt-2.5 flex min-h-[1.25rem] justify-between gap-3 font-sans text-[13px] font-medium text-muted-foreground" aria-live="polite">
        <span>
          Searching <Cite id="ll-pipeline" before="985,260" /> US food products, live. <span className="text-faint">Open one for its additives and better swaps.</span>
        </span>
        <span className="shrink-0">
          {state.kind === "loading" && (slow ? "Waking the search up…" : "Searching…")}
          {state.kind === "done" && `${results.length} ${results.length === 1 ? "result" : "results"} in ${state.ms} ms`}
        </span>
      </p>

      <ul className="mt-1 min-h-[26rem]">
        {results.map((r, i) => {
          const isOpen = open === r.code;
          return (
            <li key={r.code} className="replay-in border-t border-border" style={{ animationDelay: `${i * 45}ms` }}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : r.code)}
                aria-expanded={isOpen}
                className="group grid w-full grid-cols-[44px_1fr_auto_auto] items-center gap-3 py-1.5 text-left md:grid-cols-[44px_1fr_auto_auto_auto] md:gap-4"
              >
                <Thumb src={r.image_url} name={r.name} />
                <span className="min-w-0 font-sans">
                  <span className="block truncate text-[16px] font-semibold text-foreground group-hover:underline md:text-[17px]">{r.name ?? "Unnamed product"}</span>
                  <span className="block truncate text-[13px] text-muted-foreground">{[r.brand, r.category_main?.replace(/-/g, " ")].filter(Boolean).join(" · ")}</span>
                </span>
                {r.nova_group ? (
                  <span className="hidden whitespace-nowrap rounded-full border border-foreground/50 px-2.5 py-1 font-sans text-[12px] font-semibold text-foreground md:inline">
                    NOVA {r.nova_group} · {NOVA[r.nova_group]}
                  </span>
                ) : (
                  <span className="hidden md:inline" />
                )}
                <GradeBadge grade={r.nutriscore_grade} />
                <ChevronDown className={`h-4 w-4 text-faint transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {isOpen && <ProductDetail code={r.code} />}
            </li>
          );
        })}
        {state.kind === "done" && results.length === 0 && (
          <li className="border-t border-border py-6 font-sans text-[15px] text-muted-foreground">No product matches &ldquo;{state.q}&rdquo;. Try a brand or a barcode.</li>
        )}
        {state.kind === "error" && (
          <li className="border-t border-border py-6 font-sans text-[15px] text-muted-foreground">
            {state.waking ? "The search is still waking up from idle." : "The search did not answer."}{" "}
            <button type="button" onClick={() => search(state.q)} className="ref-link font-semibold text-foreground">
              Try again
            </button>
          </li>
        )}
      </ul>

      <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3 font-sans text-[13.5px] font-medium text-muted-foreground">
        <span className="mr-1">Try</span>
        {TRIES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTyping(false);
              setText(t);
              search(t);
            }}
            className="press rounded-full border border-foreground/35 px-3 py-1.5 text-foreground transition-colors duration-200 hover:border-foreground"
          >
            {/^\d+$/.test(t) ? "a barcode" : t}
          </button>
        ))}
      </div>
    </div>
  );
}
