// Generated from Evidentia's recorded research run
// (evidentia/web/public/replays/cbo-deficit-outlook.json). Do not edit by hand.

export type ClaimLabel = "supported" | "partial" | "unverified";

export interface ResearchEvent {
  /** Seconds into the run. */ t: number;
  node: string;
  summary: string;
  /** Dollars spent so far. */ usd: number;
}

export interface ResearchClaim {
  text: string;
  quote: string;
  host: string;
  url: string;
  label: ClaimLabel;
  revised: boolean;
  reason: string;
}

export interface ResearchRun {
  id: string;
  question: string;
  recordedAt: string;
  durationS: number;
  writer: string;
  queries: string[];
  events: ResearchEvent[];
  claims: ResearchClaim[];
  labels: Record<ClaimLabel, number>;
  sourcesRead: number;
  sourcesSkipped: number;
  passages: number;
  costUsd: number;
}

export const research: ResearchRun = {
  "id": "cbo-deficit-outlook",
  "question": "What did the CBO project in February 2024 for the federal deficit in 2024 and in 2034?",
  "recordedAt": "2026-11-24",
  "durationS": 36.56,
  "writer": "claude-sonnet-5-5",
  "queries": [
    "CBO Budget and Economic Outlook 2024 to 2034 federal deficit projection",
    "CBO February 2024 deficit $1.5 trillion 2024 $2.6 trillion 2034",
    "CBO \"The Budget and Economic Outlook: 2024 to 2034\" key projections deficit percent of GDP",
    "CBO February 2024 baseline deficit projections news coverage debt held by public 2034"
  ],
  "events": [
    {
      "t": 2.59,
      "node": "plan",
      "summary": "wrote 4 search queries",
      "usd": 0.0023
    },
    {
      "t": 7.5,
      "node": "search",
      "summary": "found 12 pages on 7 sites",
      "usd": 0.0343
    },
    {
      "t": 17.86,
      "node": "fetch",
      "summary": "read 11 pages (2 PDFs), skipped 1 (1 disallowed by robots.txt)",
      "usd": 0.0343
    },
    {
      "t": 19.09,
      "node": "index",
      "summary": "indexed 64 passages (dense + BM25)",
      "usd": 0.0363
    },
    {
      "t": 19.64,
      "node": "retrieve",
      "summary": "kept the best 10 passages after reranking",
      "usd": 0.0368
    },
    {
      "t": 24.53,
      "node": "write",
      "summary": "wrote 6 claims",
      "usd": 0.0556
    },
    {
      "t": 24.53,
      "node": "quote_check",
      "summary": "6 of 6 quotes found word for word",
      "usd": 0.0556
    },
    {
      "t": 26.55,
      "node": "check",
      "summary": "1 supported, 4 partial, 1 unverified",
      "usd": 0.0702
    },
    {
      "t": 28.48,
      "node": "rewrite",
      "summary": "1 claim failed; wrote a new query for each",
      "usd": 0.0703
    },
    {
      "t": 28.98,
      "node": "reretrieve",
      "summary": "searched the fetched pages again, 6 passages to re-read",
      "usd": 0.0708
    },
    {
      "t": 34.02,
      "node": "revise",
      "summary": "rewrote 5 claims",
      "usd": 0.0899
    },
    {
      "t": 34.02,
      "node": "quote_check",
      "summary": "6 of 6 quotes found word for word",
      "usd": 0.0899
    },
    {
      "t": 36.05,
      "node": "check",
      "summary": "5 supported, 1 partial, 0 unverified",
      "usd": 0.1023
    }
  ],
  "claims": [
    {
      "text": "CBO projected the federal budget deficit would grow from $1.6 trillion in fiscal year 2024 to $2.6 trillion in 2034.",
      "quote": "In CBO’s projections, the federal budget deficit grows from $1.6 trillion in fiscal year 2024 to $2.6 trillion in 2034.",
      "host": "congress.gov",
      "url": "https://www.congress.gov/118/meeting/house/116833/witnesses/HHRG-118-BU00-Wstate-SwagelP-20240214.pdf",
      "label": "supported",
      "revised": true,
      "reason": ""
    },
    {
      "text": "CBO projected the deficit would equal 5.6 percent of GDP in 2024 and, after rising to 6.1 percent in 2025 and shrinking to 5.2 percent by 2027, return to 6.1 percent of GDP by 2034.",
      "quote": "Deficits also expand in relation to the size of the economy, from 5.6 percent of gross domestic product (GDP) in 2024, when the collection of certain postponed tax payments temporarily boosts revenues, to 6.1 percent of GDP in 2025. In 2026 and 2027, revenues increase faster than outlays, causing the deficit to shrink to 5.2 percent of GDP by 2027. Thereafter, outlays rise faster than revenues. By 2034, the deficit returns to 6.1 percent of GDP",
      "host": "congress.gov",
      "url": "https://www.congress.gov/118/meeting/house/116833/witnesses/HHRG-118-BU00-Wstate-SwagelP-20240214.pdf",
      "label": "partial",
      "revised": true,
      "reason": "The quote backs the 5.6% (2024), 6.1% (2025), 5.2% (2027) and 6.1% (2034) figures, but it never names CBO or says these are projections, so the attribution is not stated."
    },
    {
      "text": "By 2034, the deficit was projected to return to 6.1 percent of GDP, significantly larger than the 3.7 percent average over the past 50 years.",
      "quote": "By 2034, the deficit returns to 6.1 percent of GDP— significantly larger than the 3.7 percent that deficits have averaged over the past 50 years.",
      "host": "congress.gov",
      "url": "https://www.congress.gov/118/meeting/house/116833/witnesses/HHRG-118-BU00-Wstate-SwagelP-20240214.pdf",
      "label": "supported",
      "revised": false,
      "reason": ""
    },
    {
      "text": "The U.S. Congressional Budget Office projected a $1.507 trillion federal deficit for fiscal 2024, slightly smaller than a previous projection.",
      "quote": "The U.S. Congressional Budget Office on Wednesday projected a slightly smaller $1.507 trillion federal deficit for fiscal 2024",
      "host": "finance.yahoo.com",
      "url": "https://finance.yahoo.com/news/u-cbo-forecasts-slightly-smaller-190000599.html",
      "label": "supported",
      "revised": true,
      "reason": ""
    },
    {
      "text": "The CBO said its deficit projection would resume rising to $1.772 trillion in fiscal 2025 and reach $2.579 trillion in fiscal 2034.",
      "quote": "The CBO said the deficit would dip this year from $1.695 trillion in fiscal 2023, but resume its march upward to $1.772 trillion in fiscal 2025, hitting $2.579 trillion in fiscal 2034.",
      "host": "finance.yahoo.com",
      "url": "https://finance.yahoo.com/news/u-cbo-forecasts-slightly-smaller-190404400.html",
      "label": "supported",
      "revised": true,
      "reason": ""
    },
    {
      "text": "The projections are based on current tax and spending laws and assume that the individual tax cuts passed by Republicans in 2017 expire at the end of 2025, pushing revenues higher in later years.",
      "quote": "The figures are based on current tax and spending laws and assume that individual tax cuts passed by Republicans in 2017 expire at the end of 2025, pushing revenues higher in later years.",
      "host": "finance.yahoo.com",
      "url": "https://finance.yahoo.com/news/u-cbo-forecasts-slightly-smaller-190404400.html",
      "label": "supported",
      "revised": true,
      "reason": ""
    }
  ],
  "labels": {
    "supported": 5,
    "partial": 1,
    "unverified": 0
  },
  "sourcesRead": 11,
  "sourcesSkipped": 1,
  "passages": 64,
  "costUsd": 0.1023
};
