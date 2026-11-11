import { Card } from "@/components/ui/card";
import { Code2, Database, BarChart3, Sparkles, GitBranch, Zap, Activity, Grid3x3, FileSpreadsheet, Building2, TrendingUp, Bot, Workflow, Network, ShieldCheck, Cloud, Layers, MessagesSquare, ClipboardCheck, FileText } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  SiPython, SiR, SiPostgresql,
  SiFastapi, SiScikitlearn, SiTensorflow,
  SiPytorch, SiPandas, SiNumpy, SiScipy,
  SiPlotly, SiMysql,
  SiAmazonwebservices, SiGooglecloud,
  SiDocker, SiApachespark, SiTableau,
  SiStreamlit, SiOpenai, SiMeta,
  SiGit, SiGithub, SiJira, SiConfluence, SiNotion,
  SiGoogle, SiAmazonwebservices as SiAmazonQuicksight,
  SiClaude, SiLangchain, SiHuggingface, SiOllama,
  SiSnowflake, SiGooglebigquery, SiAmazonredshift, SiApacheairflow, SiDbt,
  SiGithubactions, SiSlack
} from "react-icons/si";

const techCategories = [
  {
    icon: Bot,
    iconColor: "text-violet-500",
    title: "AI & LLM Engineering",
    description: "Building, grounding, and evaluating agentic systems: from multi-agent orchestration and MCP integrations to RAG pipelines and LLM evals.",
    technologies: [
      { name: "Agentic Workflows", icon: Workflow, color: "text-[#8B5CF6]" },
      { name: "Multi-Agent Systems", icon: Network, color: "text-[#6366F1]" },
      { name: "MCP (Model Context Protocol)", icon: Layers, color: "text-[#D97757]" },
      { name: "RAG", icon: Sparkles, color: "text-[#8B5CF6]" },
      { name: "LLM Evaluation (Evals)", icon: ShieldCheck, color: "text-[#059669]" },
      { name: "Prompt & Context Engineering", icon: MessagesSquare, color: "text-[#0EA5E9]" },
      { name: "Agent Skills (Claude Code, Codex, Perplexity)", icon: SiClaude, color: "text-[#D97757]" },
      { name: "LangGraph", icon: SiLangchain, color: "text-[#00ADD8]" },
      { name: "LangChain", icon: SiLangchain, color: "text-[#1C3C3C] dark:text-[#4DBFA8]" },
      { name: "LlamaIndex", icon: Sparkles, color: "text-[#A855F7]" },
      { name: "CrewAI", icon: Sparkles, color: "text-[#FF6B6B]" },
      { name: "Hugging Face", icon: SiHuggingface, color: "text-[#FFD21E]" },
      { name: "Ollama", icon: SiOllama, color: "text-foreground" },
      { name: "OpenAI (GPT)", icon: SiOpenai, color: "text-[#412991] dark:text-foreground" },
      { name: "Llama", icon: SiMeta, color: "text-[#0467DF]" },
      { name: "Mistral", icon: Sparkles, color: "text-[#FF7000]" },
    ],
  },
  {
    icon: TrendingUp,
    iconColor: "text-emerald-500",
    title: "Data & Analytics Engineering",
    description: "Warehouses, orchestration, and modeling that keep analytics reliable and reproducible, plus vector and graph stores for AI retrieval.",
    technologies: [
      { name: "Snowflake", icon: SiSnowflake, color: "text-[#29B5E8]" },
      { name: "BigQuery", icon: SiGooglebigquery, color: "text-[#4285F4]" },
      { name: "Redshift", icon: SiAmazonredshift, color: "text-[#8C4FFF]" },
      { name: "dbt (Core/Cloud)", icon: SiDbt, color: "text-[#FF694B]" },
      { name: "Airflow", icon: SiApacheairflow, color: "text-[#017CEE]" },
      { name: "Prefect", icon: Activity, color: "text-[#024DFD]" },
      { name: "ETL/ELT", icon: Workflow, color: "text-[#10B981]" },
      { name: "Data Modeling", icon: Layers, color: "text-[#6366F1]" },
      { name: "Data Reconciliation", icon: ClipboardCheck, color: "text-[#059669]" },
      { name: "REST APIs", icon: Code2, color: "text-[#0EA5E9]" },
      { name: "FastAPI", icon: SiFastapi, color: "text-[#009688]" },
      { name: "Vector DBs (Qdrant, Pinecone, FAISS)", icon: Database, color: "text-[#DC244C]" },
      { name: "Graph DBs (Neo4j, Memgraph)", icon: Network, color: "text-[#4581C3]" },
    ],
  },
  {
    icon: Cloud,
    iconColor: "text-sky-500",
    title: "Cloud & DevOps",
    description: "Cloud platforms, containers, and CI/CD that take pipelines and agents from prototype to something a team can rely on.",
    technologies: [
      { name: "AWS (Bedrock, SageMaker, S3, EC2)", icon: SiAmazonwebservices, color: "text-[#FF9900]" },
      { name: "GCP", icon: SiGooglecloud, color: "text-[#4285F4]" },
      { name: "Docker", icon: SiDocker, color: "text-[#2496ED]" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "text-[#2088FF]" },
      { name: "CI/CD", icon: GitBranch, color: "text-[#F97316]" },
      { name: "Git/GitHub", icon: SiGit, color: "text-[#F05032]" },
    ],
  },
  {
    icon: Code2,
    iconColor: "text-blue-500",
    title: "Programming & Databases",
    description: "Core languages and database systems for building robust data pipelines, analytical models, and production-grade solutions.",
    technologies: [
      { name: "Python (Pandas, scikit-learn, PyTorch, XGBoost)", icon: SiPython, color: "text-[#3776AB]" },
      { name: "SQL (CTEs, Window Functions)", icon: SiPostgresql, color: "text-[#4169E1]" },
      { name: "R", icon: SiR, color: "text-[#276DC3]" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
      { name: "DuckDB", icon: Database, color: "text-[#FFF000]" },
      { name: "MySQL", icon: SiMysql, color: "text-[#4479A1]" },
    ],
  },
  {
    icon: BarChart3,
    iconColor: "text-amber-500",
    title: "BI & Reporting",
    description: "Dashboards, KPI reporting, and data storytelling that turn analysis into something stakeholders can act on Monday morning.",
    technologies: [
      { name: "Power BI (DAX)", icon: Grid3x3, color: "text-[#F2C811]" },
      { name: "Tableau", icon: SiTableau, color: "text-[#E97627]" },
      { name: "Looker Studio", icon: SiGoogle, color: "text-[#4285F4]" },
      { name: "Excel (Power Query, Pivot Tables, VLOOKUP, VBA)", icon: FileSpreadsheet, color: "text-[#217346]" },
      { name: "Amazon QuickSight", icon: SiAmazonQuicksight, color: "text-[#FF9900]" },
      { name: "Plotly", icon: SiPlotly, color: "text-[#3F4F75]" },
      { name: "Streamlit", icon: SiStreamlit, color: "text-[#FF4B4B]" },
      { name: "KPI Reporting", icon: TrendingUp, color: "text-[#059669]" },
      { name: "Data Storytelling", icon: BarChart3, color: "text-[#8B5CF6]" },
    ],
  },
  {
    icon: TrendingUp,
    iconColor: "text-purple-500",
    title: "Statistical Modeling & Analysis",
    description: "Techniques and frameworks for hypothesis testing, forecasting, and extracting actionable insights from complex datasets.",
    technologies: [
      { name: "A/B Testing", icon: BarChart3, color: "text-[#6366F1]" },
      { name: "Hypothesis Testing", icon: BarChart3, color: "text-[#8B5CF6]" },
      { name: "Regression Analysis", icon: TrendingUp, color: "text-[#059669]" },
      { name: "Time Series (ARIMA, Prophet)", icon: Activity, color: "text-[#EA580C]" },
      { name: "Anomaly Detection", icon: Zap, color: "text-[#DC2626]" },
      { name: "PCA", icon: BarChart3, color: "text-[#7C3AED]" },
    ],
  },
  {
    icon: BarChart3,
    iconColor: "text-cyan-500",
    title: "ML & Data Science Libraries",
    description: "The analytical toolkit for experimentation—classical ML, deep learning, scientific computing, and storytelling layers.",
    technologies: [
      { name: "Scikit-learn", icon: SiScikitlearn, color: "text-[#F7931E]" },
      { name: "TensorFlow", icon: SiTensorflow, color: "text-[#FF6F00]" },
      { name: "PyTorch", icon: SiPytorch, color: "text-[#EE4C2C]" },
      { name: "XGBoost", icon: Zap, color: "text-[#FF6600]" },
      { name: "LightGBM", icon: Activity, color: "text-[#FFD43B]" },
      { name: "Pandas", icon: SiPandas, color: "text-[#150458]" },
      { name: "NumPy", icon: SiNumpy, color: "text-[#013243]" },
      { name: "SciPy", icon: SiScipy, color: "text-[#8CAAE6]" },
      { name: "Matplotlib", icon: BarChart3, color: "text-[#11557c]" },
      { name: "Seaborn", icon: BarChart3, color: "text-[#3776AB]" },
      { name: "PySpark", icon: SiApachespark, color: "text-[#E25A1C]" },
    ],
  },
  {
    icon: GitBranch,
    iconColor: "text-rose-500",
    title: "Collaboration & Dev Practices",
    description: "Systems and habits that preserve velocity, governance, and shared ownership across cross-functional initiatives.",
    technologies: [
      { name: "GitHub", icon: SiGithub, color: "text-foreground" },
      { name: "Jira", icon: SiJira, color: "text-[#0052CC]" },
      { name: "Confluence", icon: SiConfluence, color: "text-[#172B4D] dark:text-[#2684FF]" },
      { name: "Slack", icon: SiSlack, color: "text-[#4A154B] dark:text-[#E01E5A]" },
      { name: "Notion", icon: SiNotion, color: "text-foreground" },
      { name: "Google Workspace", icon: SiGoogle, color: "text-[#4285F4]" },
      { name: "Microsoft 365", icon: Building2, color: "text-[#D83B01]" },
      { name: "Stakeholder Communication", icon: MessagesSquare, color: "text-[#0EA5E9]" },
      { name: "Cross-Functional Collaboration", icon: Network, color: "text-[#6366F1]" },
      { name: "Documentation", icon: FileText, color: "text-[#64748B]" },
    ],
  },
];

export default function TechStack() {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      id="tech-stack" 
      className={`py-24 bg-background scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
          Tech Stack
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Technologies and tools I use to build AI systems and data solutions,
          from pipelines and warehouses to agents, evals, and dashboards.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <Card
                key={index}
                className="p-6 hover-elevate transition-all duration-300 group"
                data-testid={`card-tech-${index}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg bg-muted group-hover:bg-muted/80 transition-colors duration-300`}>
                    <CategoryIcon className={`h-6 w-6 ${category.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.technologies.map((tech) => {
                    const TechIcon = tech.icon;
                    return (
                      <div
                        key={tech.name}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted rounded-md hover-elevate transition-all duration-300 group/tech"
                        data-testid={`tech-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <TechIcon className={`h-4 w-4 ${tech.color} flex-shrink-0`} />
                        <span className="text-xs font-medium text-foreground">
                          {tech.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Always exploring new technologies and staying current with the
            latest developments in data science and AI.
          </p>
        </div>
      </div>
    </section>
  );
}
