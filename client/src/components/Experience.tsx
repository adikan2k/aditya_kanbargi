import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { FadeUp, Lines, SectionHeader } from "./motion/Reveal";
import { EASE } from "@/lib/motion";

// Phrases with a measurable result. They are shown brighter and underlined in the accent colour.
const metricPhrases = [
  /contributing to 10\+ client siting due diligence reports/gi,
  /reusable agent skills across 3 platforms/gi,
  /automated by 6 GitHub Actions workflows/gi,
  /against 4 criteria/gi,
  /enabled clinical teams to extend early-warning prediction lead times by 6 hours/gi,
  /slashing data preparation time by 40%/gi,
  /increasing research throughput by 25%/gi,
  /optimizing nurse-to-patient allocation by 20%/gi,
  /cut annual turnover by 8-10%/gi,
  /Accelerated monthly close and portfolio reporting by 40%/gi,
  /cutting query latency by 30%/gi,
  /reconciling 1TB\+ of enterprise data/gi,
  /Reduced operational turnaround time by 25%/gi,
  /reducing data availability latency by 40%/gi,
];

function highlightMetrics(text: string) {
  let result: (string | JSX.Element)[] = [text];
  let key = 0;

  metricPhrases.forEach((pattern) => {
    const next: (string | JSX.Element)[] = [];
    result.forEach((part) => {
      if (typeof part !== "string") {
        next.push(part);
        return;
      }
      const pieces = part.split(pattern);
      const matches = part.match(pattern);
      pieces.forEach((piece, i) => {
        if (piece) next.push(piece);
        if (matches && i < matches.length) {
          next.push(
            <span
              key={`metric-${key++}`}
              className="font-medium text-foreground underline decoration-signal decoration-2 underline-offset-4"
            >
              {matches[i]}
            </span>,
          );
        }
      });
    });
    result = next;
  });

  return result;
}

interface Role {
  title: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

const roles: Role[] = [
  {
    title: "AI Evaluation Engineer (Independent Contractor)",
    company: "Handshake AI",
    period: "Nov 2026 – Present",
    description: [
      "Authored containerized agentic benchmark tasks in Docker, each with a reference solution and automated verifier, to test how frontier LLM agents handle multi-step work.",
      "Formulated domain-specific prompts, then evaluated, graded, and revised model responses and annotated evaluation data to improve large language model training.",
    ],
    skills: ["LLM Evaluation", "Agentic Benchmarks", "Docker", "Automated Verifiers", "Prompt Engineering", "Data Annotation"],
  },
  {
    title: "AI Systems Analyst (LLM and Agent Engineering)",
    company: "Flypower",
    period: "Mar 2026 – Nov 2026",
    description: [
      "Streamlined LLM-orchestrated agentic workflows with both founders of a 6-person team, adding a RAG pipeline that grounds drafts in cited sources and contributing to 10+ client siting due diligence reports for renewable energy and data center developers.",
      "Led development of reusable agent skills across 3 platforms (Claude Code, Codex, Perplexity) for social media intelligence, community sentiment analysis, stakeholder profiling, and extraction from government portals, meeting records, and audio.",
      "Built custom MCP (Model Context Protocol) servers and integrated existing ones, connecting Claude Code and Codex agents to Jira, Confluence, Slack, AWS, GitHub, Google Drive, and Granola meeting transcripts.",
      "Centralized skills scattered across tools and Google Drive into one GitHub registry, automated by 6 GitHub Actions workflows: format validation, duplicate detection, sample-input tests, an auto-generated catalog, versioned releases with a changelog, and team alerts.",
      "Designed evaluation and review workflows that validate AI outputs against 4 criteria (accuracy, source credibility, geographic relevance, client usefulness) and diagnosed recurring model and workflow failure modes to drive product fixes.",
      "Devised an evidence ontology and prototype knowledge graph in Neo4j and Memgraph to map source evidence to report findings and created a prototype analyst workspace unifying multiple LLMs and the skill library.",
    ],
    skills: ["Agentic Workflows", "RAG", "MCP", "Claude Code", "Codex", "Agent Skills", "LLM Evals", "GitHub Actions", "Neo4j", "Memgraph", "Knowledge Graphs"],
  },
  {
    title: "Data Analyst (Graduate Assistant)",
    company: "GW School of Nursing",
    period: "Dec 2024 – May 2025",
    description: [
      "Engineered an automated ETL pipeline for EHR systems using Python (Pandas) scripts to parse and clean JSON/CSV files, replacing manual Excel workflows and slashing data preparation time by 40%.",
      "Developed interactive Power BI dashboards to visualize clinical KPIs (patient recovery rates, vitals trends), streamlining data access for faculty and increasing research throughput by 25%.",
      "Executed risk stratification models (SciPy/Statsmodels) on patient data to identify key deterioration drivers, optimizing nurse-to-patient allocation by 20%.",
      "Analyzed high-frequency patient data using SQL and Python to identify key deterioration patterns, creating visualizations that enabled clinical teams to extend early-warning prediction lead times by 6 hours for critical conditions like sepsis.",
      "Modeled historical staffing logs to pinpoint attrition drivers, providing data-backed strategies that cut annual turnover by 8-10%.",
    ],
    skills: ["Python", "SQL", "Power BI", "Pandas", "SciPy", "Statsmodels", "ETL", "EHR Data", "Healthcare Analytics"],
  },
  {
    title: "Technical Business Analyst, ServiceNow",
    company: "LTIMindtree",
    period: "Sep 2022 – Jun 2024",
    description: [
      "Accelerated monthly close and portfolio reporting by 40% by partnering with Finance and 3+ teams to convert business requirements into SQL reporting logic and standardized KPI definitions, creating one agreed source for cost, occupancy, and performance data.",
      "Consolidated ServiceNow and AWS datasets into one Snowflake warehouse by migrating enterprise reporting pipelines, cutting query latency by 30% and enabling self-serve analytics across 3+ business units.",
      "Eliminated recurring mismatches between reports and source systems by reconciling 1TB+ of enterprise data, validating KPI calculations, and implementing reusable SQL-based quality and variance checks upstream of BI reports.",
      "Reduced operational turnaround time by 25% by building Power BI dashboards on ServiceNow and pipeline data that surface workflow bottlenecks, processing delays, and SLA risks, so support teams pinpoint failing jobs without escalating to the data team.",
      "Engineered ETL pipelines moving multi-format customer and incident data (JSON/CSV) from ServiceNow into AWS S3 and Redshift, reducing data availability latency by 40% for downstream analytics.",
    ],
    skills: ["SQL", "Snowflake", "ServiceNow", "Power BI", "AWS S3", "Redshift", "ETL", "Data Reconciliation", "KPI Reporting"],
  },
];

const VISIBLE_BULLETS = 3;

function RoleRow({ role, index }: { role: Role; index: number }) {
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const first = role.description.slice(0, VISIBLE_BULLETS);
  const rest = role.description.slice(VISIBLE_BULLETS);

  const bullet = (item: string) => (
    <div role="listitem" className="grid grid-cols-[1.5rem_1fr] text-base leading-relaxed text-muted-foreground md:text-lg">
      <span className="pt-[0.7em]">
        <span className="block h-1.5 w-1.5 rounded-full bg-signal" />
      </span>
      <span>{highlightMetrics(item)}</span>
    </div>
  );

  return (
    <article
      className="grid gap-8 border-t border-border py-12 grid-cols-1 lg:grid-cols-12 lg:gap-8 lg:py-16"
      data-testid={`card-experience-${index}`}
    >
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <FadeUp className="label-mono mb-4 flex items-center gap-3 text-signal-text">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-6 bg-signal" />
            <span>{role.period}</span>
          </FadeUp>
          <h3 className="display text-4xl md:text-5xl xl:text-6xl">
            <Lines lines={[role.company]} />
          </h3>
          <FadeUp delay={0.15}>
            <p className="mt-4 max-w-xs text-lg text-muted-foreground">{role.title}</p>
          </FadeUp>
        </div>
      </div>

      <div className="lg:col-span-8">
        <div role="list" className="space-y-5">
          {first.map((item, i) => (
            <FadeUp key={item} delay={i * 0.07}>
              {bullet(item)}
            </FadeUp>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="rest"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.6, ease: EASE }}
              className="overflow-hidden"
            >
              <div role="list" className="space-y-5 pt-5">
                {rest.map((item) => (
                  <div key={item}>{bullet(item)}</div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {rest.length > 0 && (
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="label-mono group mt-7 flex items-center gap-3 text-foreground"
            data-testid={`button-experience-more-${index}`}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all duration-500 group-hover:border-signal group-hover:bg-signal group-hover:text-[hsl(240_7%_5%)] ${
                expanded ? "rotate-45" : ""
              }`}
            >
              <Plus className="h-3.5 w-3.5" />
            </span>
            {expanded ? "Show less" : `${rest.length} more ${rest.length === 1 ? "result" : "results"}`}
          </button>
        )}

        <FadeUp delay={0.2} className="mt-8 flex flex-wrap gap-2">
          {role.skills.map((skill) => (
            <span key={skill} className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground">
              {skill}
            </span>
          ))}
        </FadeUp>
      </div>
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="pt-28 md:pt-44">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeader
          index="02"
          label="Experience"
          lines={[
            <>From dashboards</>,
            <>
              <span className="serif-italic text-signal-text">to agents.</span>
            </>,
          ]}
          aside={
            <p>
              About three years across enterprise analytics, healthcare data and AI engineering. The underlined parts
              are results I can put a number on.
            </p>
          }
        />
        <div className="border-b border-border">
          {roles.map((role, i) => (
            <RoleRow key={role.company} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
