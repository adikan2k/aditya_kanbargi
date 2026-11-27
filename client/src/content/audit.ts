/**
 * One real Evidentia audit, replayed in the hero.
 *
 * Source: github.com/adikan2k/evidentia, web/public/audits/crispr.json (recorded
 * 24 November 2026). The answer is gpt-6.2-sol's, with web search. Each sentence
 * carries the verdicts of the claims Evidentia split it into; the margin shows the
 * worst of them, as Evidentia's own sheet does. The evidence lines quote the cited
 * pages or summarise the judges' reasons from the same file.
 */

export type Verdict = "supported" | "not_found" | "contradicted" | "needs_human";

export interface AuditSentence {
  text: string;
  /** Source tag the answer gave after this sentence, if any. */
  cites?: string;
  /** Verdicts of the claims in this sentence, in claim order. */
  claims: Verdict[];
  /** What the cited page says, or why the judges ruled as they did. */
  evidence: string;
}

export const audit = {
  model: "gpt-6.2-sol",
  question: "What is CRISPR gene editing, and what was the first CRISPR-based therapy to be approved?",
  pages: 2,
  costUsd: "0.0048",
  sentences: [
    {
      text: "CRISPR gene editing is a way to change DNA at a chosen location.",
      claims: ["supported"],
      evidence:
        "medlineplus.gov: “These technologies allow genetic material to be added, removed, or altered at particular locations in the genome.”",
    },
    {
      text: "In CRISPR-Cas9, a guide RNA directs the Cas9 enzyme to a matching DNA sequence.",
      claims: ["supported"],
      evidence: "medlineplus.gov: “This guide RNA also attaches to the Cas9 enzyme.”",
    },
    {
      text: "Cas9 cuts the DNA, and the cell’s own repair process can be used to disable a gene or change its sequence.",
      cites: "medlineplus.gov",
      claims: ["supported", "supported"],
      evidence:
        "medlineplus.gov: “Once the DNA is cut, researchers use the cell’s own DNA repair machinery to add or delete pieces of genetic material.”",
    },
    {
      text: "Casgevy (exagamglogene autotemcel) was the first CRISPR-based therapy approved anywhere in the world.",
      claims: ["needs_human"],
      evidence:
        "The judges split: the page calls Casgevy a “world-first”, but it only covers the UK authorisation, so a person decides.",
    },
    {
      text: "The UK authorized it on November 16, 2023, for sickle cell disease and transfusion-dependent beta thalassemia.",
      claims: ["contradicted"],
      evidence: "gov.uk: “The new indication was granted on 15 November 2023.” The answer says the 16th.",
    },
    {
      text: "The U.S. FDA approved it for sickle cell disease on December 8, 2023, and for transfusion-dependent beta thalassemia on January 16, 2024.",
      cites: "gov.uk",
      claims: ["not_found", "not_found"],
      evidence: "The cited page is a UK announcement. It says nothing about the FDA or either date.",
    },
    {
      text: "Casgevy works by editing a patient’s own blood-forming stem cells outside the body, then returning them to the patient so they can produce red blood cells with more fetal hemoglobin.",
      cites: "gov.uk",
      claims: ["supported", "not_found"],
      evidence:
        "The page backs editing the stem cells outside the body, but never mentions fetal haemoglobin: one claim supported, one not on the page.",
    },
  ] satisfies AuditSentence[],
};

const severity: Record<Verdict, number> = { supported: 0, needs_human: 1, not_found: 2, contradicted: 3 };

/** The mark shown in the margin: the worst verdict among the sentence's claims. */
export function sentenceVerdict(sentence: AuditSentence): Verdict {
  return sentence.claims.reduce((worst, v) => (severity[v] > severity[worst] ? v : worst), "supported" as Verdict);
}

export const verdictLabel: Record<Verdict, string> = {
  supported: "Supported",
  not_found: "Not on the page",
  contradicted: "Contradicted",
  needs_human: "Needs a human",
};
