/**
 * Every figure on the page, and where it came from.
 *
 * The order of this list is the order in which each source is first cited on the
 * page, so its position is its reference number. When a section moves, or a new
 * citation appears earlier on the page, reorder this list to match.
 */

export interface Source {
  id: string;
  /** Short name of the source. */
  title: string;
  /** What the source says, in one or two sentences. */
  note: string;
  /** File path or page the figure is read from, shown in mono. */
  path?: string;
  href: string;
  linkLabel?: string;
}

const LL = "https://github.com/adikan2k/labellens/blob/main";
const EV = "https://github.com/adikan2k/evidentia/blob/main";
const OG = "https://github.com/adikan2k/orbitglass---inside-language-model-loops";

const list = [
  {
    id: "ll-ask",
    title: "LabelLens: ask agent eval",
    note: "Fact score 0.98 (0.93 to 1.00) for the tool-using agent against 0.26 (0.14 to 0.40) for search alone, on 50 questions. It called the expected tool 43 of 43 times and refused all 5 requests for advice.",
    path: "labellens/evals/results/ask_agent.md",
    href: `${LL}/evals/results/ask_agent.md`,
  },
  {
    id: "ll-pipeline",
    title: "LabelLens: pipeline",
    note: "1,002,769 products sold in the US go through dbt on DuckDB with 94 data tests; 985,260 of them have a name and can be searched.",
    path: "labellens-beige.vercel.app/dashboard",
    href: "https://labellens-beige.vercel.app/dashboard",
    linkLabel: "Open the dashboard",
  },
  {
    id: "ev-research",
    title: "Evidentia: recorded research run, CBO deficit outlook",
    note: "Recorded on 24 November 2026. 4 searches found 12 pages; it read 11 (2 PDFs), indexed 64 passages and wrote 6 claims, each with an exact quote. The first check passed 1 claim; after one repair round, 5 were supported and 1 partly supported. The run took 36.6 seconds and cost $0.10.",
    path: "evidentia/web/public/replays/cbo-deficit-outlook.json",
    href: "https://evidentia-green.vercel.app/research",
    linkLabel: "Open Evidentia research",
  },
  {
    id: "ev-crispr",
    title: "Evidentia: recorded audit, CRISPR",
    note: "gpt-6.2-sol's answer with web search, audited on 24 November 2026: 10 claims against 2 cited pages. 5 supported, 3 not on the cited page, 1 contradicted, 1 for a human. The audit cost $0.0048.",
    path: "evidentia/web/public/audits/crispr.json",
    href: "https://evidentia-green.vercel.app/recorded/crispr",
    linkLabel: "Open the recorded audit",
  },
  {
    id: "og-traces",
    title: "OrbitGlass: sentence traces",
    note: "336 saved sentences from GPT-2 and DistilGPT-2 answering “Is the Earth flat?” at seven temperatures, one run each (top-k 50, seed 1). At 0.10, GPT-2 alternates across all 33 sentences while DistilGPT-2 switches once across 52.",
    path: "orbitglass/data/sentence_traces.csv",
    href: `${OG}/blob/main/data/sentence_traces.csv`,
  },
  {
    id: "ll-retrieval",
    title: "LabelLens: explainer search eval",
    note: "145 queries over 1,019 explainers. The right explainer is in the top 5 for 98% (93 to 99%), MRR@10 0.91. Vector search alone: 74%; BM25: 58%. Vector search found E-numbers 1 of 30 times; an exact lookup made it 30 of 30.",
    path: "labellens/evals/results/retrieval.md",
    href: `${LL}/evals/results/retrieval.md`,
  },
  {
    id: "ll-label",
    title: "LabelLens: label reading eval",
    note: "Claude Haiku read 98% (95 to 99%) of 159 nutrient values correctly from 27 real label photos, matching Sonnet at about 5% of its cost ($0.0195 against $0.3814 for 30 labels).",
    path: "labellens/evals/results/label_reading_claude-haiku-5-5.md",
    href: `${LL}/evals/results/label_reading_claude-haiku-5-5.md`,
  },
  {
    id: "ll-tools",
    title: "LabelLens: connector tool choice",
    note: "Inside Claude, the right LabelLens tool was picked for 29 of 30 requests, 97% (83 to 99%).",
    path: "labellens/evals/results/mcp_tools.md",
    href: `${LL}/evals/results/mcp_tools.md`,
  },
  {
    id: "ll-latency",
    title: "LabelLens: search latency",
    note: "95th-percentile search latency on the public API across three runs: 175.0, 192.9 and 215.7 ms.",
    path: "labellens/evals/results/search_latency_public.md",
    href: `${LL}/evals/results/search_latency_public.md`,
  },
  {
    id: "ll-enrich",
    title: "LabelLens: enrichment and cost",
    note: "Claude categorised 676,320 products through the Batch API for $5.18 and wrote 1,019 additive and ingredient explainers. Model spend for the whole project is about $6.",
    path: "labellens/docs/decisions/0005-enrichment.md",
    href: `${LL}/docs/decisions/0005-enrichment.md`,
  },
  {
    id: "ev-flags",
    title: "Evidentia: auditor against human labels",
    note: "On 1,100 held-out LLM-AggreFact claims: flags right 0.806 (0.767 to 0.844), supported marks right 0.926 (0.897 to 0.951). Counting partly backed as a flag gives 0.700.",
    path: "evidentia/evals/results/aggrefact_pooled-dev550b+test2_q-haiku_p-haiku.json",
    href: `${EV}/README.md#results-at-a-glance`,
  },
  {
    id: "ev-retrieval",
    title: "Evidentia: retrieval eval",
    note: "40 questions over 2,362 passages from 50 pages. Dense search with reranking: nDCG@10 0.804 and recall@10 0.938, against 0.454 and 0.571 for BM25. Adding BM25 as a hybrid measured worse, so it was switched off.",
    path: "evidentia/evals/results/retrieval.json",
    href: `${EV}/README.md#search-recall-and-precision-at-k`,
  },
  {
    id: "ev-cost",
    title: "Evidentia: judge cost",
    note: "Two Haiku judges cost $0.000687 per claim. Sonnet as the judge was no better and cost $0.01103 per claim, about 15 times as much.",
    path: "evidentia/evals/results/REPORT.md",
    href: `${EV}/evals/results/REPORT.md`,
  },
  {
    id: "ev-checker",
    title: "Evidentia: checker on broken claims",
    note: "The research agent's checker caught 49 of 50 deliberately broken claims. All 15 hostile-page trials passed (hidden instructions, a paywall and a contradiction).",
    path: "evidentia/evals/results/nasty.json",
    href: `${EV}/README.md#results-at-a-glance`,
  },
  {
    id: "ev-handcheck",
    title: "Evidentia: blind hand checks",
    note: "I labelled samples of its verdicts on real answers, blind to tool and verdict. Flags upheld: 54% (7 of 13), then 69% (9 of 13) after a fix, against a 70% bar set before labelling. The bar was missed, so the tool comparison is withheld.",
    path: "evidentia/evals/results/realworld_hand_check_2.json",
    href: `${EV}/README.md#the-auditor-on-real-answers-blind-hand-checks`,
  },
  {
    id: "ev-pivot",
    title: "Evidentia: decision D-034",
    note: "The first version's own evals found the research agent no more accurate than plain retrieval (0.928 against 0.917, intervals overlapping) at about 3.5 times the cost, so Evidentia became an auditor of other tools' answers.",
    path: "evidentia/docs/DECISIONS.md",
    href: `${EV}/docs/DECISIONS.md#d-034-evidentia-becomes-an-auditor-of-other-ai-tools-answers`,
  },
  {
    id: "og-models",
    title: "OrbitGlass: models and sweeps",
    note: "GPT-2, DistilGPT-2, GPT-Neo, Gemma and Qwen, with sentence clusters at 20 temperatures from 0.05 to 1.00 and token-level cycle tests across 10 prompts.",
    path: "orbitglass/README.md",
    href: `${OG}#which-models-did-we-study`,
  },
  {
    id: "og-cycles",
    title: "OrbitGlass: cycle detection",
    note: "181 of 200 Gemma 2 2B and 149 of 168 Qwen1.5-1.8B sequences had no exact period of 16 or shorter.",
    path: "orbitglass/README.md, report p. 10",
    href: `${OG}#findings-and-their-limits`,
  },
  {
    id: "og-embedding",
    title: "OrbitGlass: one embedding edit",
    note: "In a four-token transformer, moving B's first coordinate from 0.80 to 0.88 stretches its run from 6 tokens to 21 before the model switches to D.",
    path: "orbitglass/examples/reproduce.py",
    href: `${OG}#3-change-one-embedding-and-replay-the-decoder`,
  },
  {
    id: "resume",
    title: "Resume, 2026",
    note: "LTIMindtree (Sep 2022 to Jun 2024), GW School of Nursing (Dec 2024 to May 2025) and Flypower (Mar to Nov 2026). MS in Data Science, The George Washington University, 2026; AWS Certified AI Practitioner.",
    path: "Aditya_Kanbargi_Resume.pdf",
    href: "/Aditya_Kanbargi_Resume.pdf",
    linkLabel: "Open the resume",
  },
  {
    id: "paper",
    title: "Music Genre Classification Using Machine Learning Techniques",
    note: "International Journal of Scientific Research in Engineering and Management (IJSREM), Volume 7, Issue 12, December 2023. XGBoost reached 90% accuracy against 81% for random forests.",
    path: "MUSIC-GENRE-CLASSIFICATION-USING-MACHINE-LEARNING-TECHNIQUES",
    href: "https://github.com/adikan2k/MUSIC-GENRE-CLASSIFICATION-USING-MACHINE-LEARNING-TECHNIQUES",
    linkLabel: "Open the code",
  },
  {
    id: "github",
    title: "GitHub, adikan2k",
    note: "The three projects featured here and the 16 in the index below, each with its own public repository.",
    path: "github.com/adikan2k",
    href: "https://github.com/adikan2k",
    linkLabel: "Open GitHub",
  },
] as const satisfies readonly Source[];

export type SourceId = (typeof list)[number]["id"];

export const sources: readonly Source[] = list;

const index = new Map<string, number>(list.map((s, i) => [s.id, i]));

export function getSource(id: SourceId): Source {
  return list[index.get(id)!];
}

/** The reference number shown in the marker. */
export function sourceNumber(id: SourceId): number {
  return index.get(id)! + 1;
}
