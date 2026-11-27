import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { getJson, GradeBadge, isAbort, number, SITE, Thumb, type ProductSummary } from "./api";

interface ListItem {
  slug: string;
  e_number: string | null;
  name: string;
  function: string | null;
  flagged: boolean;
  product_count: number;
}

interface Guide extends ListItem {
  explainer: { text: string; ai_generated: boolean } | null;
  share_of_products: number;
  top_categories: { category_id: string; name: string; products: number }[];
  examples: ProductSummary[];
}

/**
 * LabelLens's additive guide: pick or look up an E-number and it says what it is, how
 * much of the shelf lists it and where it turns up most.
 */
export default function AdditiveGuide() {
  const [list, setList] = useState<ListItem[]>([]);
  const [slug, setSlug] = useState("e330");
  const [guide, setGuide] = useState<Guide | null>(null);
  const [failed, setFailed] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    getJson<{ additives: ListItem[] }>("/additives", controller.signal)
      .then(({ data }) => setList(data.additives))
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setFailed(false);
    getJson<Guide>(`/additives/${slug}`, controller.signal)
      .then(({ data }) => setGuide(data))
      .catch((error) => !isAbort(error) && setFailed(true));
    return () => controller.abort();
  }, [slug]);

  // The most common ones, plus two that Open Food Facts flags, as quick picks.
  const picks = useMemo(() => {
    const common = list.slice(0, 5);
    const flagged = list.filter((a) => a.flagged && !common.includes(a)).slice(0, 2);
    return [...common, ...flagged];
  }, [list]);

  const matches = useMemo(() => {
    const q = text.trim().toLowerCase();
    if (q.length < 2) return [];
    return list.filter((a) => a.name.toLowerCase().includes(q) || (a.e_number ?? "").toLowerCase().includes(q)).slice(0, 6);
  }, [list, text]);

  const most = guide ? Math.max(...guide.top_categories.map((c) => c.products), 1) : 1;

  return (
    <div className="font-sans">
      <div className="relative">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Look up a food additive by name or E-number"
          placeholder="Look up an additive: carrageenan, E471, red 40…"
          autoComplete="off"
          spellCheck={false}
          className="h-[52px] w-full rounded-xl border-2 border-foreground bg-card px-4 text-[17px] font-semibold text-foreground outline-none placeholder:font-medium placeholder:text-faint"
        />
        {matches.length > 0 && (
          <ul className="absolute inset-x-0 top-full z-10 mt-1 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            {matches.map((a) => (
              <li key={a.slug}>
                <button
                  type="button"
                  onClick={() => {
                    setSlug(a.slug);
                    setText("");
                  }}
                  className="flex w-full items-baseline justify-between gap-3 px-4 py-2 text-left text-[14.5px] hover:bg-muted"
                >
                  <span className="font-semibold text-foreground">
                    {a.e_number} {a.name}
                  </span>
                  <span className="figure-nums shrink-0 text-[12.5px] text-muted-foreground">{number(a.product_count)} products</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-3 flex min-h-[2rem] flex-wrap gap-1.5">
        {picks.map((a) => (
          <button
            key={a.slug}
            type="button"
            onClick={() => setSlug(a.slug)}
            aria-pressed={slug === a.slug}
            className={`press rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-colors duration-200 ${
              slug === a.slug ? "border-foreground bg-foreground text-background" : "border-foreground/35 text-foreground hover:border-foreground"
            }`}
          >
            {a.e_number} {a.name}
            {a.flagged && <span className="ml-1.5 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-[#e67e22]" aria-label="flagged" />}
          </button>
        ))}
      </div>

      {failed && <p className="mt-6 text-[15px] text-muted-foreground">That additive did not load.</p>}
      {!guide && !failed && <p className="mt-6 text-[15px] text-faint">Loading the guide…</p>}

      {guide && !failed && (
        <div key={guide.slug} className="replay-in mt-4 border-t border-border pt-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="display text-[26px] text-foreground md:text-[32px]" style={{ fontWeight: 700, fontStretch: "100%", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              {guide.e_number} {guide.name}
            </h3>
            {guide.function && <span className="text-[14px] text-muted-foreground">{guide.function}</span>}
          </div>
          <p className="mt-2 max-w-[44rem] text-[15.5px] leading-snug text-foreground">
            {guide.explainer?.text ?? "No explainer yet."}
            {guide.explainer?.ai_generated && <span className="text-[13px] text-faint"> (AI-written explainer)</span>}
          </p>
          {guide.flagged && <p className="mt-1.5 text-[13.5px] font-medium text-[#b85c00]">Open Food Facts flags it for a high risk of overexposure. LabelLens never suggests a swap that contains one.</p>}

          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div>
              <p className="display figure-nums text-[40px] leading-none text-foreground" style={{ fontWeight: 800 }}>
                {(guide.share_of_products * 100).toFixed(1)}%
              </p>
              <p className="mt-1 text-[13.5px] text-muted-foreground">of US products list it: {number(guide.product_count)} of them.</p>
              <ul className="mt-3 space-y-1.5">
                {guide.examples.slice(0, 3).map((p) => (
                  <li key={p.code}>
                    <a href={`${SITE}/product/${p.code}`} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[36px_1fr_auto] items-center gap-2.5">
                      <Thumb src={p.image_url} name={p.name} small />
                      <span className="min-w-0">
                        <span className="block truncate text-[14px] font-semibold text-foreground group-hover:underline">{p.name ?? "Unnamed product"}</span>
                        <span className="block truncate text-[12.5px] text-muted-foreground">{p.brand}</span>
                      </span>
                      <GradeBadge grade={p.nutriscore_grade} small />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">Where it turns up most</p>
              <ul className="mt-2 space-y-2">
                {guide.top_categories.slice(0, 5).map((c) => (
                  <li key={c.category_id} className="text-[13.5px]">
                    <span className="flex justify-between gap-3">
                      <span className="truncate text-foreground">{c.name}</span>
                      <span className="figure-nums shrink-0 text-muted-foreground">{number(c.products)}</span>
                    </span>
                    <span className="mt-1 block h-1.5 rounded-full bg-border">
                      <span className="block h-full rounded-full bg-foreground" style={{ width: `${(c.products / most) * 100}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <a href={`${SITE}/additives/${guide.slug}`} target="_blank" rel="noopener noreferrer" className="ref-link mt-4 inline-flex items-center gap-1 py-1 text-[13.5px] font-medium text-foreground">
            The full guide on LabelLens
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}
