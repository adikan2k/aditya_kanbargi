import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { getJson, GRADE_COLOUR, GRADES, isAbort, number, SITE, type Grade } from "./api";

interface Count {
  key: string | null;
  label: string;
  count: number;
}

interface Stats {
  product_count: number;
  named_product_count: number;
  brand_count: number;
  additive_count: number;
  nutriscore: Count[];
  nova: Count[];
  categories: Count[];
  nutriscore_by_category: { category_id: string; name: string; graded_count: number; grades: Record<Grade, number> }[];
  source: { snapshot_date: string };
}

const pct = (part: number, whole: number) => (whole ? (part / whole) * 100 : 0);

/** One bar split into the five Nutri-Score grades. */
function GradeBar({ grades, total, labels = false }: { grades: Record<Grade, number>; total: number; labels?: boolean }) {
  return (
    <span className={`flex overflow-hidden rounded-md ${labels ? "h-12" : "h-3.5"}`}>
      {GRADES.map((g) => {
        const share = pct(grades[g], total);
        return (
          <span key={g} className="grid place-items-center overflow-hidden text-white" style={{ width: `${share}%`, background: GRADE_COLOUR[g] }} title={`Nutri-Score ${g.toUpperCase()}: ${share.toFixed(0)}%`}>
            {labels && (
              <span className="figure-nums font-sans text-[13px] font-bold leading-tight">
                {g.toUpperCase()} <span className="font-semibold opacity-90">{share.toFixed(0)}%</span>
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

/**
 * LabelLens's dashboard figures, read live: how the whole US shelf grades, how much of
 * it is ultra-processed, and how the grades differ by category.
 */
export default function ShelfStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    getJson<Stats>("/stats/overview", controller.signal)
      .then(({ data }) => setStats(data))
      .catch((error) => !isAbort(error) && setFailed(true));
    return () => controller.abort();
  }, []);

  if (failed) return <p className="font-sans text-[15px] text-muted-foreground">The dashboard figures did not load.</p>;
  if (!stats) return <p className="font-sans text-[15px] text-faint">Loading the shelf…</p>;

  const grades = Object.fromEntries(GRADES.map((g) => [g, stats.nutriscore.find((n) => n.key === g)?.count ?? 0])) as Record<Grade, number>;
  const graded = GRADES.reduce((sum, g) => sum + grades[g], 0);
  const novaKnown = stats.nova.filter((n) => n.key !== null).reduce((sum, n) => sum + n.count, 0);
  const ultra = stats.nova.find((n) => n.key === "4")?.count ?? 0;
  const worse = pct(grades.c + grades.d + grades.e, graded);
  // Best-graded categories first, so the bars run from mostly green to mostly red.
  const byCategory = [...stats.nutriscore_by_category]
    .filter((c) => c.graded_count >= 3000)
    .sort((x, y) => pct(y.grades.a + y.grades.b, y.graded_count) - pct(x.grades.a + x.grades.b, x.graded_count));
  const shown = [...byCategory.slice(0, 4), ...byCategory.slice(-4)];

  return (
    <div className="replay-in font-sans">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
        {[
          { value: number(stats.product_count), label: "US products in the snapshot" },
          { value: number(stats.brand_count), label: "brands" },
          { value: number(stats.additive_count), label: "additives explained" },
          { value: `${pct(ultra, novaKnown).toFixed(0)}%`, label: "ultra-processed, of those with a NOVA group" },
        ].map((item) => (
          <div key={item.label}>
            <dd className="display figure-nums text-[26px] leading-none text-foreground md:text-[30px]" style={{ fontWeight: 800 }}>
              {item.value}
            </dd>
            <dt className="mt-1 text-[12.5px] leading-snug text-muted-foreground">{item.label}</dt>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-[15px] font-semibold text-foreground">{worse.toFixed(0)}% of graded products score C or worse</p>
      <div className="mt-2">
        <GradeBar grades={grades} total={graded} labels />
      </div>
      <p className="figure-nums mt-1.5 text-[12.5px] text-muted-foreground">Nutri-Score across the {number(graded)} products that have one.</p>

      <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">Best and worst categories</p>
      <ul className="mt-2 grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2">
        {shown.map((c) => (
          <li key={c.category_id} className="text-[13.5px]">
            <span className="mb-1 flex justify-between gap-3">
              <span className="truncate text-foreground">{c.name}</span>
              <span className="figure-nums shrink-0 text-muted-foreground">{pct(c.grades.a + c.grades.b, c.graded_count).toFixed(0)}% A or B</span>
            </span>
            <GradeBar grades={c.grades} total={c.graded_count} />
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-border pt-3 text-[13px] text-muted-foreground">
        <span>Read live from the LabelLens API. Open Food Facts snapshot of {stats.source.snapshot_date}.</span>
        <a href={`${SITE}/dashboard`} target="_blank" rel="noopener noreferrer" className="ref-link inline-flex items-center gap-1 py-1 font-medium text-foreground">
          The full dashboard
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
