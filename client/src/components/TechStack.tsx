import { Card } from "@/components/ui/card";
import { Code2, Database, Cloud, BarChart3, Sparkles, GitBranch, Zap, Activity, Grid3x3, FileSpreadsheet, Briefcase, Building2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  SiPython, SiR, SiPostgresql, SiJavascript, SiC, SiHtml5, SiCss3,
  SiReact, SiNextdotjs, SiFastapi, SiFlask, SiScikitlearn, SiTensorflow,
  SiPytorch, SiPandas, SiNumpy, SiScipy,
  SiPlotly, SiSelenium, SiMysql, SiOracle,
  SiRedis, SiPrisma, SiAmazonwebservices, SiGooglecloud, SiRender,
  SiDocker, SiKubernetes, SiApachespark, SiTableau,
  SiStreamlit, SiGrafana, SiOpenai, SiMeta,
  SiGit, SiGithub, SiJira, SiTrello, SiConfluence, SiNotion,
  SiD3Dotjs, SiGoogle, SiAmazonwebservices as SiAmazonQuicksight
} from "react-icons/si";

const techCategories = [
  {
    icon: Code2,
    iconColor: "text-blue-500",
    title: "Programming & Frameworks",
    description: "Languages and runtimes that let me move from idea to deployable experience without slowing the feedback loop.",
    technologies: [
      { name: "Python", icon: SiPython, color: "text-[#3776AB]" },
      { name: "R", icon: SiR, color: "text-[#276DC3]" },
      { name: "SQL", icon: SiPostgresql, color: "text-[#4169E1]" },
      { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "C", icon: SiC, color: "text-[#A8B9CC]" },
      { name: "HTML5", icon: SiHtml5, color: "text-[#E34F26]" },
      { name: "CSS3", icon: SiCss3, color: "text-[#1572B6]" },
      { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-foreground" },
      { name: "FastAPI", icon: SiFastapi, color: "text-[#009688]" },
      { name: "Flask", icon: SiFlask, color: "text-foreground" },
    ],
  },
  {
    icon: BarChart3,
    iconColor: "text-purple-500",
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
      { name: "Plotly", icon: SiPlotly, color: "text-[#3F4F75]" },
      { name: "D3.js", icon: SiD3Dotjs, color: "text-[#F9A03C]" },
      { name: "Selenium", icon: SiSelenium, color: "text-[#43B02A]" },
    ],
  },
  {
    icon: Database,
    iconColor: "text-cyan-500",
    title: "Databases & ORMs",
    description: "Relational, document, and vector stores paired with ORMs that keep data access ergonomic and performant.",
    technologies: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
      { name: "MySQL", icon: SiMysql, color: "text-[#4479A1]" },
      { name: "SQL Server", icon: Database, color: "text-[#CC2927]" },
      { name: "Oracle DB", icon: SiOracle, color: "text-[#F80000]" },
      { name: "Redis", icon: SiRedis, color: "text-[#DC382D]" },
      { name: "Qdrant", icon: Database, color: "text-[#DC143C]" },
      { name: "FAISS", icon: Database, color: "text-[#00ADD8]" },
      { name: "Prisma", icon: SiPrisma, color: "text-[#2D3748]" },
    ],
  },
  {
    icon: Cloud,
    iconColor: "text-emerald-500",
    title: "Cloud, Data & Infrastructure",
    description: "Managed services, schedulers, and container tooling that keep data products observable, reproducible, and production-ready.",
    technologies: [
      { name: "AWS", icon: SiAmazonwebservices, color: "text-[#FF9900]" },
      { name: "Google Cloud", icon: SiGooglecloud, color: "text-[#4285F4]" },
      { name: "Render", icon: SiRender, color: "text-[#46E3B7]" },
      { name: "Docker", icon: SiDocker, color: "text-[#2496ED]" },
      { name: "Kubernetes", icon: SiKubernetes, color: "text-[#326CE5]" },
      { name: "PySpark", icon: SiApachespark, color: "text-[#E25A1C]" },
    ],
  },
  {
    icon: BarChart3,
    iconColor: "text-amber-500",
    title: "Visualization & BI",
    description: "Visualization platforms that translate analysis into narratives stakeholders can act on quickly.",
    technologies: [
      { name: "Tableau", icon: SiTableau, color: "text-[#E97627]" },
      { name: "Power BI", icon: Grid3x3, color: "text-[#F2C811]" },
      { name: "Amazon QuickSight", icon: SiAmazonQuicksight, color: "text-[#FF9900]" },
      { name: "Plotly", icon: SiPlotly, color: "text-[#3F4F75]" },
      { name: "Streamlit", icon: SiStreamlit, color: "text-[#FF4B4B]" },
      { name: "Grafana", icon: SiGrafana, color: "text-[#F46800]" },
      { name: "Excel (VBA, Power Query, Pivot Tables)", icon: FileSpreadsheet, color: "text-[#217346]" },
    ],
  },
  {
    icon: Sparkles,
    iconColor: "text-violet-500",
    title: "Generative AI & LLMs",
    description: "Frameworks that operationalize LLMs, retrieval pipelines, and multi-agent orchestration for augmented analysis.",
    technologies: [
      { name: "LangChain", icon: Sparkles, color: "text-[#1C3C3C]" },
      { name: "LangGraph", icon: Sparkles, color: "text-[#00ADD8]" },
      { name: "CrewAI", icon: Sparkles, color: "text-[#FF6B6B]" },
      { name: "OpenAI (GPT)", icon: SiOpenai, color: "text-[#412991]" },
      { name: "Llama", icon: SiMeta, color: "text-[#0467DF]" },
      { name: "Mistral", icon: Sparkles, color: "text-[#FF7000]" },
      { name: "Ollama", icon: Sparkles, color: "text-foreground" },
      { name: "Hugging Face", icon: Sparkles, color: "text-[#FFD21E]" },
      { name: "RAG", icon: Sparkles, color: "text-[#8B5CF6]" },
    ],
  },
  {
    icon: GitBranch,
    iconColor: "text-rose-500",
    title: "Collaboration & Dev Practices",
    description: "Systems that preserve velocity, governance, and shared ownership across cross-functional initiatives.",
    technologies: [
      { name: "Git", icon: SiGit, color: "text-[#F05032]" },
      { name: "GitHub", icon: SiGithub, color: "text-foreground" },
      { name: "Jira", icon: SiJira, color: "text-[#0052CC]" },
      { name: "Trello", icon: SiTrello, color: "text-[#0052CC]" },
      { name: "Confluence", icon: SiConfluence, color: "text-[#172B4D]" },
      { name: "Notion", icon: SiNotion, color: "text-foreground" },
      { name: "Google Workspace", icon: SiGoogle, color: "text-[#4285F4]" },
      { name: "Microsoft 365", icon: Building2, color: "text-[#D83B01]" },
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
          Technologies and tools I use to build data solutions, from data
          collection to model deployment.
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
