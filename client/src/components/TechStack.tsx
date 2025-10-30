import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Brain, 
  BarChart3, 
  Cloud, 
  Code2,
  Layers
} from "lucide-react";

const techCategories = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Building intelligent models and algorithms",
    technologies: [
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "XGBoost",
      "Keras",
      "LightGBM",
    ],
  },
  {
    icon: Code2,
    title: "Programming",
    description: "Core languages and frameworks",
    technologies: [
      "Python",
      "R",
      "SQL",
      "Scala",
      "Julia",
      "Pandas",
      "NumPy",
    ],
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "ETL, pipelines, and data infrastructure",
    technologies: [
      "Apache Spark",
      "Airflow",
      "Kafka",
      "PostgreSQL",
      "MongoDB",
      "Redis",
    ],
  },
  {
    icon: BarChart3,
    title: "Visualization & BI",
    description: "Creating insights through visual analytics",
    technologies: [
      "Tableau",
      "Power BI",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "D3.js",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & MLOps",
    description: "Deployment and infrastructure",
    technologies: [
      "AWS SageMaker",
      "Google Cloud AI",
      "Azure ML",
      "Docker",
      "Kubernetes",
      "MLflow",
    ],
  },
  {
    icon: Layers,
    title: "Specialized Areas",
    description: "Domain expertise and tools",
    technologies: [
      "NLP/LLMs",
      "Computer Vision",
      "Time Series",
      "Deep Learning",
      "A/B Testing",
      "Statistics",
    ],
  },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-24 bg-background">
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
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="p-6 hover-elevate transition-all duration-300 group"
                data-testid={`card-tech-${index}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-primary" />
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

                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
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
