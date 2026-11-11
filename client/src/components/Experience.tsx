import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Handshake, Zap, type LucideIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import gwLogoImage from "@assets/image_1761868019368.png";
import ltiLogoImage from "@assets/image_1761867956939.png";

// Helper function to highlight quantitative outcomes with full phrases
function highlightMetrics(text: string) {
  // Extended patterns to capture full phrases with quantitative outcomes
  const phrases = [
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

  let result: (string | JSX.Element)[] = [text];
  let keyCounter = 0;

  phrases.forEach((phrasePattern) => {
    const newResult: (string | JSX.Element)[] = [];
    result.forEach((part) => {
      if (typeof part === "string") {
        const parts = part.split(phrasePattern);
        const matches = part.match(phrasePattern);

        parts.forEach((subPart, subIndex) => {
          if (subPart) {
            newResult.push(subPart);
          }
          if (matches && subIndex < matches.length) {
            newResult.push(
              <span key={`metric-${keyCounter++}`} className="font-bold text-primary bg-primary/10 px-1 rounded">
                {matches[subIndex]}
              </span>
            );
          }
        });
      } else {
        newResult.push(part);
      }
    });
    result = newResult;
  });

  return result;
}

type ExperienceItem = {
  title: string;
  company: string;
  companyLogo?: string;
  fallbackIcon?: LucideIcon;
  location: string;
  period: string;
  description: string[];
  skills: string[];
};

const experiences: ExperienceItem[] = [
  {
    title: "AI Evaluation Engineer (Independent Contractor)",
    company: "Handshake AI",
    fallbackIcon: Handshake,
    location: "Remote",
    period: "Nov 2026 – Present",
    description: [
      "Authored containerized agentic benchmark tasks in Docker, each with a reference solution and automated verifier, to test how frontier LLM agents handle multi-step work.",
      "Formulated domain-specific prompts, then evaluate, grade, and revise model responses and annotate evaluation data to improve large language model training.",
    ],
    skills: ["LLM Evaluation", "Agentic Benchmarks", "Docker", "Automated Verifiers", "Prompt Engineering", "Data Annotation"],
  },
  {
    title: "AI Systems Analyst (LLM and Agent Engineering)",
    company: "Flypower",
    fallbackIcon: Zap,
    location: "Remote",
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
    companyLogo: gwLogoImage,
    location: "Virginia",
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
    companyLogo: ltiLogoImage,
    location: "Remote",
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

export default function Experience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="experience"
      className={`py-24 bg-muted/30 scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
          Experience
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          From data pipelines and dashboards to agentic AI systems and LLM
          evaluation, building work that solves real business problems.
        </p>

        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const FallbackIcon = exp.fallbackIcon;
            return (
            <Card
              key={index}
              className="p-6 md:p-8 hover-elevate transition-all duration-300"
              data-testid={`card-experience-${index}`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-3 text-lg font-medium mb-2">
                    {exp.companyLogo ? (
                      <img
                        src={exp.companyLogo}
                        alt={`${exp.company} logo`}
                        className="h-6 object-contain"
                        data-testid={`img-company-logo-${index}`}
                      />
                    ) : FallbackIcon ? (
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10"
                        aria-hidden="true"
                        data-testid={`icon-company-${index}`}
                      >
                        <FallbackIcon className="h-4 w-4 text-primary" />
                      </span>
                    ) : null}
                    <span className="text-foreground">{exp.company}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 mb-4 list-disc list-inside">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-foreground text-justify">
                    {highlightMetrics(item)}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
