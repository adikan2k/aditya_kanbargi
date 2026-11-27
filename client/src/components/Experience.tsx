import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHead from "./site/SectionHead";
import { Cite } from "./cite/Cite";
import { EASE } from "@/lib/motion";

// Phrases with a measurable result, set in the foreground colour. The figures come from the
// resume, which the section heading cites.
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
            <span key={`metric-${key++}`} className="metric-mark font-semibold text-foreground">
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
  /** A shorter name for the timeline on phones. */
  short?: string;
  period: string;
  /** First and last month, as [year, month] with January = 1. */
  span: [[number, number], [number, number]];
  description: string[];
  skills: string[];
}

const roles: Role[] = [
  {
    title: "AI Systems Analyst (LLM and Agent Engineering)",
    company: "Flypower",
    period: "Mar 2026 – Nov 2026",
    span: [[2026, 3], [2026, 11]],
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
    short: "GW Nursing",
    period: "Dec 2024 – May 2025",
    span: [[2024, 12], [2025, 5]],
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
    title: "Analytics Engineer",
    company: "LTIMindtree",
    period: "Sep 2022 – Jun 2024",
    span: [[2022, 9], [2024, 6]],
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

// The timeline runs from July 2022 to the start of 2027, in months.
const AXIS_START = 2022 * 12 + 6;
const AXIS_END = 2027 * 12;
const month = (y: number, m: number) => y * 12 + (m - 1);
const at = (t: number) => ((t - AXIS_START) / (AXIS_END - AXIS_START)) * 100;

function months(role: Role) {
  const [[y1, m1], [y2, m2]] = role.span;
  return month(y2, m2) - month(y1, m1) + 1;
}

function duration(n: number) {
  const years = Math.floor(n / 12);
  const rest = n % 12;
  return [years ? `${years} yr` : "", rest ? `${rest} mo` : ""].filter(Boolean).join(" ");
}

// Milestones with a known month, each with its source.
const milestones = [
  { label: "Paper published", when: month(2023, 12), cite: "paper" as const },
  { label: "MS Data Science, GWU", when: month(2026, 5), cite: "resume" as const },
];

/** Where the time went: each role as a bar on one line, milestones as marks below it. */
function Timeline() {
  const reduced = useReducedMotion();
  const ordered = [...roles].reverse();
  return (
    <motion.figure
      className="mt-12 md:mt-16"
      aria-label="Timeline of roles from 2022 to 2026"
      initial={reduced ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="relative h-[10.5rem] md:h-[9.5rem]">
        {/* Years */}
        {[2023, 2024, 2025, 2026].map((y) => (
          <span key={y} className="absolute inset-y-0 border-l border-dashed border-border" style={{ left: `${at(month(y, 1))}%` }}>
            <span className="figure-nums absolute -bottom-0.5 left-1.5 font-sans text-[12.5px] font-medium text-faint">{y}</span>
          </span>
        ))}

        {/* Roles */}
        {ordered.map((role, i) => {
          const [[y1, m1], [y2, m2]] = role.span;
          const left = at(month(y1, m1));
          const width = at(month(y2, m2) + 1) - left;
          const newest = i === ordered.length - 1;
          return (
            <div key={role.company} className="absolute top-3" style={{ left: `${left}%`, width: `${width}%` }}>
              <p className={`whitespace-nowrap font-sans text-[12.5px] font-semibold md:text-[14px] ${newest ? "text-cite" : "text-foreground"}`}>
                <span className="md:hidden">{role.short ?? role.company}</span>
                <span className="hidden md:inline">{role.company}</span>
              </p>
              <motion.span
                className={`mt-1.5 block h-7 rounded-md md:h-9 ${newest ? "bg-cite" : "bg-foreground/80"}`}
                style={{ transformOrigin: "left" }}
                variants={{
                  hidden: { scaleX: 0 },
                  shown: { scaleX: 1, transition: { duration: 0.9, delay: 0.15 + i * 0.18, ease: [0.16, 1, 0.3, 1] } },
                }}
              />
              <p className="figure-nums mt-1.5 whitespace-nowrap font-sans text-[12px] text-muted-foreground">{duration(months(role))}</p>
            </div>
          );
        })}

        {/* Milestones */}
        {milestones.map((m) => (
          <div key={m.label} className="absolute bottom-6 -translate-x-1/2 md:bottom-7" style={{ left: `${at(m.when) + 0.8}%` }}>
            <span className="mx-auto block h-2.5 w-2.5 rotate-45 bg-foreground" aria-hidden="true" />
            <span className="mt-1 hidden whitespace-nowrap font-sans text-[12px] font-medium text-muted-foreground sm:block">
              <Cite id={m.cite} before={m.label} />
            </span>
          </div>
        ))}
      </div>
    </motion.figure>
  );
}

function RoleRow({ role }: { role: Role }) {
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const restId = useId();
  const first = role.description.slice(0, VISIBLE_BULLETS);
  const rest = role.description.slice(VISIBLE_BULLETS);

  const bullet = (item: string) => (
    <li key={item} className="grid grid-cols-[1.25rem_1fr] font-sans text-[16.5px] leading-relaxed text-muted-foreground md:text-[18px]">
      <span aria-hidden="true" className="mt-[0.62em] block h-1.5 w-1.5 rounded-full bg-cite" />
      <span>{highlightMetrics(item)}</span>
    </li>
  );

  return (
    <article className="grid grid-cols-1 gap-6 border-t border-border py-10 lg:grid-cols-12 lg:gap-10 lg:py-16">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <p className="figure-nums font-sans text-[15px] font-medium text-faint">
            {role.period} · {duration(months(role))}
          </p>
          <h3 className="display mt-3 text-[clamp(2.75rem,5.5vw,5rem)]" style={{ lineHeight: 0.92 }}>
            {role.company}
          </h3>
          <p className="mt-3 max-w-sm font-sans text-[17px] font-medium text-foreground/85">{role.title}</p>
        </div>
      </div>

      <div className="lg:col-span-7">
        <ul className="max-w-[64ch] space-y-4">{first.map(bullet)}</ul>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={restId}
              key="rest"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <ul className="max-w-[64ch] space-y-4 pt-4">{rest.map(bullet)}</ul>
            </motion.div>
          )}
        </AnimatePresence>

        {rest.length > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={restId}
            className="press group mt-6 inline-flex items-center gap-2.5 font-sans text-[15px] font-semibold text-foreground"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors duration-200 group-hover:border-foreground">
              <Plus
                className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-45" : ""}`}
                style={{ transitionTimingFunction: "var(--ease-out)" }}
                aria-hidden="true"
              />
            </span>
            {expanded ? "Show fewer" : `${rest.length} more`}
          </button>
        )}

        <ul className="mt-8 flex flex-wrap gap-1.5" aria-label="Tools">
          {role.skills.map((t) => (
            <li key={t} className="rounded-full border border-border px-3 py-1.5 font-sans text-[13px] font-medium text-muted-foreground">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-20 pt-32 md:pt-48">
      <div className="mx-auto max-w-[1920px] px-5 md:px-10 2xl:px-16">
        <SectionHead id="experience-title" title="Experience">
          About three years across analytics and AI engineering, newest first. Figures as on my{" "}
          <Cite id="resume" before="resume" after="." />
        </SectionHead>
        <Timeline />
        <div className="mt-10 border-b border-border md:mt-14">
          {roles.map((role) => (
            <RoleRow key={role.company} role={role} />
          ))}
        </div>
      </div>
    </section>
  );
}
