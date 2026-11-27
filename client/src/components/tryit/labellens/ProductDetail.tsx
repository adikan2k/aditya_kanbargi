import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { getJson, GradeBadge, isAbort, SITE, Thumb, type Product, type Swap } from "./api";

const FACTS: { key: keyof Product["nutrition"]; label: string; unit: string }[] = [
  { key: "energy_kcal_100g", label: "Energy", unit: "kcal" },
  { key: "sugars_100g", label: "Sugars", unit: "g" },
  { key: "salt_100g", label: "Salt", unit: "g" },
  { key: "saturated_fat_100g", label: "Sat. fat", unit: "g" },
  { key: "fiber_100g", label: "Fibre", unit: "g" },
  { key: "proteins_100g", label: "Protein", unit: "g" },
];

const amount = (v: number | null, unit: string) => (v === null ? "–" : `${unit === "kcal" ? Math.round(v) : Math.round(v * 10) / 10} ${unit}`);

/**
 * What LabelLens knows about one product: nutrition per 100 g, each additive with a
 * plain-English explainer, and better-graded swaps from the same category.
 */
export default function ProductDetail({ code }: { code: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [swaps, setSwaps] = useState<Swap[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setProduct(null);
    setSwaps(null);
    setFailed(false);
    getJson<{ product: Product }>(`/products/${code}`, controller.signal)
      .then(({ data }) => {
        setProduct(data.product);
        setOpen(data.product.additives[0]?.additive_id ?? null);
      })
      .catch((error) => !isAbort(error) && setFailed(true));
    getJson<{ swaps: Swap[] }>(`/products/${code}/swaps?limit=3`, controller.signal)
      .then(({ data }) => setSwaps(data.swaps))
      .catch((error) => !isAbort(error) && setSwaps([]));
    return () => controller.abort();
  }, [code]);

  if (failed) return <p className="pb-4 pl-[3.75rem] font-sans text-[14px] text-muted-foreground">This product did not load.</p>;
  if (!product) return <p className="pb-4 pl-[3.75rem] font-sans text-[14px] text-faint">Loading the label…</p>;

  const shown = product.additives.find((a) => a.additive_id === open);

  return (
    <div className="replay-in grid grid-cols-1 gap-x-8 gap-y-4 pb-5 pl-0 font-sans md:grid-cols-2 md:pl-[3.75rem]">
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">Per 100 g</p>
        <dl className="mt-1.5 grid grid-cols-3 gap-x-3 gap-y-2">
          {FACTS.map((f) => (
            <div key={f.key}>
              <dt className="text-[12px] text-muted-foreground">{f.label}</dt>
              <dd className="figure-nums text-[15px] font-semibold text-foreground">{amount(product.nutrition[f.key], f.unit)}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">
          {product.additives.length === 0 ? "No additives listed" : `${product.additives.length} ${product.additives.length === 1 ? "additive" : "additives"}, explained`}
        </p>
        {product.additives.length > 0 && (
          <>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {product.additives.slice(0, 6).map((a) => (
                <button
                  key={a.additive_id}
                  type="button"
                  onClick={() => setOpen(a.additive_id)}
                  aria-pressed={open === a.additive_id}
                  className={`press rounded-full border px-2.5 py-1 text-[12.5px] font-semibold transition-colors duration-200 ${
                    open === a.additive_id ? "border-foreground bg-foreground text-background" : "border-foreground/35 text-foreground hover:border-foreground"
                  }`}
                >
                  {a.e_number ?? a.name}
                  {a.flagged && <span className="ml-1.5 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-[#e67e22]" aria-label="flagged" />}
                </button>
              ))}
            </div>
            {shown && (
              <p className="mt-2 text-[13.5px] leading-snug text-muted-foreground">
                <span className="font-semibold text-foreground">{shown.name}.</span> {shown.explainer?.text ?? shown.function ?? "No explainer yet."}
                {shown.flagged && <span className="text-[#b85c00]"> Flagged by Open Food Facts for high exposure.</span>}
                {shown.explainer?.ai_generated && <span className="text-faint"> (AI-written explainer)</span>}
              </p>
            )}
          </>
        )}
      </div>

      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">Better swaps in the same category</p>
        {swaps === null ? (
          <p className="mt-2 text-[14px] text-faint">Looking for swaps…</p>
        ) : swaps.length === 0 ? (
          <p className="mt-2 text-[14px] text-muted-foreground">Nothing better-graded was found in its category.</p>
        ) : (
          <ul className="mt-1.5 space-y-2">
            {swaps.map((s) => (
              <li key={s.product.code}>
                <a href={`${SITE}/product/${s.product.code}`} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[36px_1fr_auto] items-center gap-2.5">
                  <Thumb src={s.product.image_url} name={s.product.name} small />
                  <span className="min-w-0">
                    <span className="block truncate text-[14.5px] font-semibold text-foreground group-hover:underline">{s.product.name ?? "Unnamed product"}</span>
                    <span className="block truncate text-[12.5px] text-muted-foreground">{s.reason}</span>
                  </span>
                  <GradeBadge grade={s.product.nutriscore_grade} small />
                </a>
              </li>
            ))}
          </ul>
        )}
        <a href={`${SITE}/product/${product.code}`} target="_blank" rel="noopener noreferrer" className="ref-link mt-3 inline-flex items-center gap-1 py-1 text-[13.5px] font-medium text-foreground">
          The full label on LabelLens
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
