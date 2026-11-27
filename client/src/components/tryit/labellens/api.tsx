import { useState } from "react";

export const SITE = "https://labellens-beige.vercel.app";
// The LabelLens API only answers its own site, so the portfolio calls it through a
// same-origin path that the host forwards (see vercel.json and vite.config.ts).
const API = "/labellens-api";

export type Grade = "a" | "b" | "c" | "d" | "e";

export interface ProductSummary {
  code: string;
  name: string | null;
  brand: string | null;
  category_main: string | null;
  nutriscore_grade: Grade | null;
  nova_group: 1 | 2 | 3 | 4 | null;
  image_url: string | null;
}

export interface Additive {
  additive_id: string;
  e_number: string | null;
  name: string;
  function: string | null;
  explainer: { text: string; ai_generated: boolean } | null;
  flagged: boolean;
}

export interface Product extends ProductSummary {
  category_name: string | null;
  nutrition: Record<"energy_kcal_100g" | "sugars_100g" | "salt_100g" | "fat_100g" | "saturated_fat_100g" | "fiber_100g" | "proteins_100g", number | null>;
  additives: Additive[];
  ingredients: { ingredient_id: string; name: string }[];
}

export interface Swap {
  product: ProductSummary;
  reason: string;
  additive_count: number;
}

export class ApiError extends Error {
  constructor(readonly status: number) {
    super(String(status));
  }
}

/**
 * GET from the LabelLens API. The API and its database sleep when idle and answer 503
 * while they wake, so a 503 is retried a few times. `ms` is the time the answering
 * request took, not counting earlier retries.
 */
export async function getJson<T>(path: string, signal?: AbortSignal, fresh = false): Promise<{ data: T; ms: number }> {
  for (let attempt = 0; ; attempt++) {
    const started = performance.now();
    const response = await fetch(`${API}${path}`, { signal, cache: fresh ? "no-store" : "default" });
    if (response.status === 503 && attempt < 5) {
      await new Promise((resolve) => window.setTimeout(resolve, 2500));
      if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
      continue;
    }
    if (!response.ok) throw new ApiError(response.status);
    return { data: (await response.json()) as T, ms: Math.round(performance.now() - started) };
  }
}

export const isAbort = (error: unknown) => (error as { name?: string } | null)?.name === "AbortError";

export const GRADE_COLOUR: Record<Grade, string> = { a: "#1e8f4e", b: "#6fae3d", c: "#e2b007", d: "#e67e22", e: "#d93a26" };
export const GRADES: Grade[] = ["a", "b", "c", "d", "e"];
export const NOVA: Record<number, string> = { 1: "unprocessed", 2: "culinary ingredient", 3: "processed", 4: "ultra-processed" };

/** The Nutri-Score letter in its colour. */
export function GradeBadge({ grade, small = false }: { grade: Grade | null; small?: boolean }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-lg font-sans font-bold uppercase text-white ${small ? "h-7 w-7 text-[14px]" : "h-9 w-9 text-[17px]"}`}
      style={{ background: grade ? GRADE_COLOUR[grade] : "hsl(var(--faint) / 0.45)" }}
      title={grade ? `Nutri-Score ${grade.toUpperCase()}` : "No Nutri-Score"}
    >
      {grade ?? "–"}
      <span className="sr-only">{grade ? "Nutri-Score" : "No Nutri-Score"}</span>
    </span>
  );
}

/** A product photo, or its initial when there is none. */
export function Thumb({ src, name, small = false }: { src: string | null; name: string | null; small?: boolean }) {
  const [broken, setBroken] = useState(false);
  const box = small ? "h-9 w-9" : "h-11 w-11";
  if (!src || broken) {
    return (
      <span className={`grid ${box} shrink-0 place-items-center rounded-lg bg-muted font-sans text-[16px] font-bold text-faint`} aria-hidden="true">
        {(name ?? "?").charAt(0).toUpperCase()}
      </span>
    );
  }
  return <img src={src} alt="" loading="lazy" onError={() => setBroken(true)} className={`${box} shrink-0 rounded-lg bg-muted object-cover`} />;
}

export const number = (n: number) => n.toLocaleString("en-US");
