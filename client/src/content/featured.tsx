import type { ReactNode } from "react";
import { Cite } from "@/components/cite/Cite";
import type { SourceId } from "@/lib/sources";
import llHome from "@assets/ring/labellens-home.webp";
import llAsk from "@assets/ring/labellens-ask.webp";
import llDashboard from "@assets/ring/labellens-dashboard.webp";
import llProduct from "@assets/ring/labellens-product.webp";
import evAudit from "@assets/ring/evidentia-audit.webp";
import evResearch from "@assets/ring/evidentia-research.webp";
import evEvals from "@assets/ring/evidentia-evals.webp";
import ogLab from "@assets/ring/orbitglass-lab.webp";
import ogTrace from "@assets/ring/orbitglass-trace.webp";

export interface Result {
  /** The figure itself; its citation marker attaches here. */
  value: string;
  measure: string;
  /** Context in a quieter tone. */
  note?: string;
  cite: SourceId;
}

export interface Screen {
  label: string;
  src: string;
  alt: string;
  /** What the browser bar shows. */
  bar: string;
  /** The live page it was captured from. */
  href: string;
  /** Height over width of the capture: the screen scrolls through it. */
  tall: number;
}

export interface Featured {
  id: string;
  name: string;
  question: string;
  /** Who built it and when, in a few words. */
  made: string;
  /** Hue, saturation and lightness of the glow behind it. */
  glow: string;
  headline: { value: string; note: string; cite: SourceId };
  what: ReactNode;
  links: { label: string; href: string }[];
  /** Which demo in the "Use it" section belongs to it. */
  demo: "search" | "research" | "audit" | "lab";
  screens: Screen[];
  results: Result[];
  steps: { title: string; body: string }[];
  stack: string[];
  credit: ReactNode;
}

const LABELLENS = "https://labellens-beige.vercel.app";
const EVIDENTIA = "https://evidentia-green.vercel.app";
const ORBITGLASS = "https://adikan2k.github.io/orbitglass---inside-language-model-loops/";

export const featured: Featured[] = [
  {
    id: "labellens",
    name: "LabelLens",
    question: "What's really in your food?",
    made: "2026 · solo build",
    glow: "16 76% 30%",
    headline: { value: "0.98", note: "fact score for the ask agent, against 0.26 for search alone", cite: "ll-ask" },
    what: (
      <>
        The Open Food Facts export of 1,002,769 US products, run through a tested dbt{" "}
        <Cite id="ll-pipeline" before="pipeline" after="," /> explained by Claude for about $6 in{" "}
        <Cite id="ll-enrich" before="all" after="," /> and served three ways: a website, an ask agent that shows its sources, and a
        connector that works inside Claude.
      </>
    ),
    links: [
      { label: "Live site", href: LABELLENS },
      { label: "How it's built", href: `${LABELLENS}/how-its-built` },
      { label: "Code", href: "https://github.com/adikan2k/labellens" },
    ],
    demo: "search",
    screens: [
      { label: "Home", src: llHome, alt: "LabelLens home page with product search", bar: "labellens-beige.vercel.app", href: LABELLENS, tall: 1.5455 },
      { label: "Ask agent", src: llAsk, alt: "LabelLens ask agent answering a question step by step", bar: "labellens-beige.vercel.app/ask", href: `${LABELLENS}/ask`, tall: 1.15 },
      { label: "Dashboard", src: llDashboard, alt: "LabelLens dashboard of the US label landscape", bar: "labellens-beige.vercel.app/dashboard", href: `${LABELLENS}/dashboard`, tall: 1.2364 },
      { label: "Product", src: llProduct, alt: "LabelLens product page with additives and better swaps", bar: "labellens-beige.vercel.app/product", href: `${LABELLENS}/product/0016000169685`, tall: 1.4082 },
    ],
    results: [
      { value: "98%", measure: "right explainer in the top 5", note: "vs 74% vector search, 58% BM25", cite: "ll-retrieval" },
      { value: "98%", measure: "of nutrient values read right from label photos", note: "of 159", cite: "ll-label" },
      { value: "29 / 30", measure: "right tool picked inside Claude", cite: "ll-tools" },
      { value: "175–215 ms", measure: "search latency, p95, live API", cite: "ll-latency" },
    ],
    steps: [
      { title: "Pipeline", body: "dbt on DuckDB with 94 data tests, from the raw export to 985,260 named, searchable products." },
      { title: "Enrichment", body: "676,320 products categorised and 1,019 additive and ingredient explainers written by Claude through the Batch API." },
      { title: "Retrieval", body: "Postgres with pgvector and Voyage embeddings, plus an exact E-number lookup added after the eval showed vector search missing them." },
      { title: "Serving", body: "FastAPI on Google Cloud Run, a Next.js site on Vercel, an MCP connector for Claude and a Neo4j graph of 36,729 nodes." },
      { title: "Evals", body: "Nine published eval reports, each listing its misses alongside the scores." },
    ],
    stack: ["Claude", "MCP", "FastAPI", "dbt", "DuckDB", "Postgres + pgvector", "Voyage AI", "Neo4j", "Next.js", "Cloud Run", "Vercel", "Langfuse"],
    credit: (
      <>
        Built with Claude Code as my coding partner. The spec, the design, the evals and every call on scope, hosting and
        cost are mine. Code under the MIT licence; data from Open Food Facts under the ODbL.
      </>
    ),
  },
  {
    id: "evidentia",
    name: "Evidentia",
    question: "Do the citations say what the answer says?",
    made: "2026 · solo rebuild",
    glow: "222 72% 34%",
    headline: { value: "81%", note: "of its flags right, on 1,100 human-labelled claims", cite: "ev-flags" },
    what: (
      <>
        Paste an answer from ChatGPT, Claude or Perplexity with its sources. Evidentia reads every cited page and marks
        each claim supported, partly backed, not on the page or contradicted, and hands it to a person when its two judges
        disagree. I rebuilt it as an auditor after the first version&rsquo;s own evals showed its research agent was no more
        accurate than plain retrieval, at about 3.5 times the <Cite id="ev-pivot" before="cost" after="." />
      </>
    ),
    links: [
      { label: "Live site", href: EVIDENTIA },
      { label: "Evals", href: `${EVIDENTIA}/evals` },
      { label: "Code", href: "https://github.com/adikan2k/evidentia" },
    ],
    demo: "audit",
    screens: [
      { label: "Audit", src: evAudit, alt: "Evidentia auditing an AI answer sentence by sentence", bar: "evidentia-green.vercel.app", href: EVIDENTIA, tall: 1.7364 },
      { label: "Research", src: evResearch, alt: "Evidentia research run with a quote behind every claim", bar: "evidentia-green.vercel.app/research", href: `${EVIDENTIA}/research`, tall: 1.7364 },
      { label: "Evals", src: evEvals, alt: "Evidentia evaluation results", bar: "evidentia-green.vercel.app/evals", href: `${EVIDENTIA}/evals`, tall: 1.7364 },
    ],
    results: [
      { value: "0.93", measure: "of its “supported” marks right", note: "95% interval 0.90 to 0.95", cite: "ev-flags" },
      { value: "0.80", measure: "retrieval nDCG@10", note: "vs 0.45 for BM25", cite: "ev-retrieval" },
      { value: "$0.0007", measure: "per claim, both judges", note: "Sonnet cost 15× more and was no better", cite: "ev-cost" },
      { value: "49 / 50", measure: "deliberately broken claims caught", cite: "ev-checker" },
      { value: "69%", measure: "of flags upheld in my blind hand check", note: "bar set beforehand: 70%, so the tool comparison is withheld", cite: "ev-handcheck" },
    ],
    steps: [
      { title: "Two judges", body: "A LangGraph graph with a quote judge, whose quotes code checks are exact spans of the page, and a page judge. A verdict only when both agree." },
      { title: "Fetcher", body: "Obeys robots.txt, rate-limits per domain and blocks private addresses at connect time." },
      { title: "Retrieval", body: "Voyage embeddings in Qdrant with reranking. Hybrid BM25 was switched off because it measured worse." },
      { title: "Evals", body: "Bootstrap 95% intervals on LLM-AggreFact, and two blind hand checks against a bar set before labelling." },
      { title: "Serving", body: "Streaming FastAPI on Google Cloud Run, Next.js on Vercel, about 375 tests in CI and Langfuse tracing." },
    ],
    stack: ["Claude", "LangGraph", "FastAPI", "Qdrant", "Voyage AI", "Tavily", "Next.js", "Cloud Run", "Vercel", "Langfuse", "pytest"],
    credit: (
      <>
        Rebuilt alone in 2026, with Claude Code as my coding partner; the hand-check labels are mine. The first version
        (2025) was a group project with Sanjana Kadambe Muralidhar.
      </>
    ),
  },
  {
    id: "orbitglass",
    name: "OrbitGlass",
    question: "Is the model exploring, or going in circles?",
    made: "2026 · three-person research",
    glow: "128 40% 21%",
    headline: { value: "5", note: "language model families tested for hidden loops", cite: "og-models" },
    what: (
      <>
        How decoding temperature changes repetition in language models, with tests for hidden cycles in their token streams
        and an interactive lab where anyone can replay the saved outputs, a logistic map and a four-token transformer.
      </>
    ),
    links: [
      { label: "Open the lab", href: `${ORBITGLASS}#demo/1` },
      { label: "Report (PDF)", href: `${ORBITGLASS}files/Research_Report.pdf` },
      { label: "Code", href: "https://github.com/adikan2k/orbitglass---inside-language-model-loops" },
    ],
    demo: "lab",
    screens: [
      { label: "The lab", src: ogLab, alt: "OrbitGlass lab home", bar: "adikan2k.github.io/orbitglass", href: ORBITGLASS, tall: 1.1055 },
      { label: "Experiments", src: ogTrace, alt: "OrbitGlass experiments: repetition atlas, logistic map and toy transformer", bar: "adikan2k.github.io/orbitglass/#lab", href: `${ORBITGLASS}#lab/trace`, tall: 1.5973 },
    ],
    results: [
      { value: "181 / 200", measure: "Gemma sequences with no cycle of 16 or shorter", cite: "og-cycles" },
      { value: "149 / 168", measure: "Qwen sequences with no cycle of 16 or shorter", cite: "og-cycles" },
      { value: "6 → 21", measure: "tokens of repetition after one embedding edit", cite: "og-embedding" },
    ],
    steps: [
      { title: "Temperature sweeps", body: "Continuations from PyTorch and Hugging Face models at 20 temperatures, turned into sentence-cluster streams." },
      { title: "Cycle tests", body: "Exact-period detection on 368 Gemma and Qwen token sequences, checked first on a logistic map with a known answer." },
      { title: "A mechanism to step through", body: "A four-token transformer where every attention score and next-token choice is visible." },
      { title: "The lab", body: "A static web lab that replays the saved results, and a Python script with tests that reproduces them." },
    ],
    stack: ["Python", "PyTorch", "Hugging Face", "scikit-learn", "NumPy", "pandas", "SciPy", "NetworkX", "JavaScript"],
    credit: <>A three-person group research project in network data science at The George Washington University.</>,
  },
];
