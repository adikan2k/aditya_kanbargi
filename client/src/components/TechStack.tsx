import SectionHead from "./site/SectionHead";

interface MethodGroup {
  title: string;
  items: string[];
}

// Grouped by the job they do, AI and data engineering first.
const groups: MethodGroup[] = [
  {
    title: "AI and LLM engineering",
    items: [
      "Agentic workflows",
      "Multi-agent systems",
      "MCP",
      "RAG",
      "LLM evals",
      "Prompt and context engineering",
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
    title: "Data and analytics engineering",
    items: [
      "Snowflake",
      "BigQuery",
      "Redshift",
      "PostgreSQL",
      "DuckDB",
      "dbt",
      "Airflow",
      "Prefect",
      "ETL and ELT",
      "Data modelling",
      "Data reconciliation",
      "REST APIs",
      "FastAPI",
      "Vector databases (Qdrant, Pinecone, FAISS)",
      "Graph databases (Neo4j, Memgraph)",
    ],
  },
  {
    title: "Cloud and DevOps",
    items: ["AWS (Bedrock, SageMaker, S3, EC2)", "GCP", "Docker", "GitHub Actions", "CI/CD", "Git"],
  },
  {
    title: "Languages",
    items: ["Python (pandas, scikit-learn, PyTorch, XGBoost)", "SQL (CTEs, window functions)", "R", "MySQL"],
  },
  {
    title: "BI and reporting",
    items: [
      "Power BI (DAX)",
      "Tableau",
      "Looker Studio",
      "Excel (Power Query, pivot tables, VBA)",
      "Amazon QuickSight",
      "Plotly",
      "Streamlit",
      "KPI reporting",
    ],
  },
  {
    title: "Machine learning and statistics",
    items: [
      "scikit-learn",
      "PyTorch",
      "TensorFlow",
      "XGBoost",
      "LightGBM",
      "PySpark",
      "NumPy",
      "SciPy",
      "Time series (ARIMA, Prophet)",
      "A/B testing",
      "Hypothesis testing",
      "Regression",
      "Anomaly detection",
      "PCA",
    ],
  },
];

export default function TechStack() {
  return (
    <section id="methods" aria-labelledby="methods-title" className="scroll-mt-20 pt-32 md:pt-48">
      <div className="mx-auto max-w-[1920px] px-5 md:px-10 2xl:px-16">
        <SectionHead id="methods-title" title="What I work with" size="lg">
          Languages, frameworks and platforms, AI and data engineering first.
        </SectionHead>

        <div className="mt-12 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((group, i) => (
            <div key={group.title} className={`rounded-xl border p-5 md:p-6 ${i < 2 ? "border-foreground/40" : "border-border"}`}>
              <h3 className="display text-[22px] md:text-[24px]" style={{ fontWeight: 700, fontStretch: "100%", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full bg-foreground/[0.07] px-3 py-1.5 font-sans text-[13.5px] font-medium text-foreground/85">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
