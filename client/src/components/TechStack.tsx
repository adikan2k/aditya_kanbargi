import { motion, useReducedMotion } from "framer-motion";
import { FadeUp, SectionHeader } from "./motion/Reveal";
import { EASE } from "@/lib/motion";

interface StackGroup {
  title: string;
  note: string;
  items: string[];
}

const groups: StackGroup[] = [
  {
    title: "AI & LLM Engineering",
    note: "Building, grounding and evaluating agentic systems.",
    items: [
      "Agentic workflows",
      "Multi-agent systems",
      "MCP",
      "RAG",
      "LLM evals",
      "Prompt & context engineering",
      "Agent skills (Claude Code, Codex, Perplexity)",
      "LangGraph",
      "LangChain",
      "LlamaIndex",
      "CrewAI",
      "Hugging Face",
      "Ollama",
      "OpenAI",
      "Llama",
      "Mistral",
    ],
  },
  {
    title: "Data & Analytics Engineering",
    note: "Warehouses, orchestration and modeling, plus vector and graph stores for retrieval.",
    items: [
      "Snowflake",
      "BigQuery",
      "Redshift",
      "PostgreSQL",
      "DuckDB",
      "dbt",
      "Airflow",
      "Prefect",
      "ETL/ELT",
      "Data modeling",
      "Data reconciliation",
      "REST APIs",
      "FastAPI",
      "Vector DBs (Qdrant, Pinecone, FAISS)",
      "Graph DBs (Neo4j, Memgraph)",
    ],
  },
  {
    title: "Cloud & DevOps",
    note: "Taking pipelines and agents from prototype to something a team can rely on.",
    items: ["AWS (Bedrock, SageMaker, S3, EC2)", "GCP", "Docker", "GitHub Actions", "CI/CD", "Git"],
  },
  {
    title: "Programming",
    note: "The languages underneath all of it.",
    items: ["Python (Pandas, scikit-learn, PyTorch, XGBoost)", "SQL (CTEs, window functions)", "R", "MySQL"],
  },
  {
    title: "BI & Reporting",
    note: "Dashboards and KPI reporting someone can act on Monday morning.",
    items: [
      "Power BI (DAX)",
      "Tableau",
      "Looker Studio",
      "Excel (Power Query, Pivot Tables, VLOOKUP, VBA)",
      "Amazon QuickSight",
      "Plotly",
      "Streamlit",
      "KPI reporting",
      "Data storytelling",
    ],
  },
  {
    title: "ML & Statistics",
    note: "Classical ML, deep learning and the statistics behind a forecast.",
    items: [
      "scikit-learn",
      "PyTorch",
      "TensorFlow",
      "XGBoost",
      "LightGBM",
      "PySpark",
      "Pandas",
      "NumPy",
      "SciPy",
      "Matplotlib",
      "Seaborn",
      "Time series (ARIMA, Prophet)",
      "A/B testing",
      "Hypothesis testing",
      "Regression analysis",
      "Anomaly detection",
      "PCA",
    ],
  },
  {
    title: "Collaboration",
    note: "How the work gets shared and shipped with other people.",
    items: [
      "GitHub",
      "Jira",
      "Confluence",
      "Slack",
      "Notion",
      "Google Workspace",
      "Microsoft 365",
      "Stakeholder communication",
      "Cross-functional collaboration",
      "Documentation",
    ],
  },
];

export default function TechStack() {
  const reduced = useReducedMotion();

  return (
    <section id="tech-stack" className="pt-28 md:pt-44">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeader
          index="04"
          label="Stack"
          lines={[
            <>Tools I</>,
            <>
              <span className="serif-italic text-signal-text">reach for.</span>
            </>,
          ]}
          aside={<p>Grouped by the job they do, with the AI and data engineering work first.</p>}
        />

        <div className="border-b border-border">
          {groups.map((group, groupIndex) => (
            <div
              key={group.title}
              className="group/row grid gap-6 border-t border-border py-9 grid-cols-1 lg:grid-cols-12 lg:gap-8 lg:py-12"
              data-testid={`card-tech-${groupIndex}`}
            >
              <FadeUp className="lg:col-span-4">
                <div className="flex items-baseline gap-4">
                  <span className="label-mono text-signal-text">{String(groupIndex + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{group.title}</h3>
                    <p className="mt-2 max-w-xs text-sm text-muted-foreground">{group.note}</p>
                  </div>
                </div>
              </FadeUp>

              <motion.ul
                className="flex flex-wrap gap-x-2 gap-y-2.5 lg:col-span-8"
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                variants={{ shown: { transition: { staggerChildren: reduced ? 0 : 0.025 } } }}
              >
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, y: reduced ? 0 : 14 },
                      shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }}
                    className="rounded-full border border-border px-4 py-2 text-sm transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-[hsl(240_7%_5%)] md:text-base"
                    data-testid={`tech-${item.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
