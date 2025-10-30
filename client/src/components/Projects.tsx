import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import project1Image from "@assets/1_1761838910338.jpg";
import project2Image from "@assets/2_1761838910338.jpg";
import project3Image from "@assets/3_1761838910338.png";
import project4Image from "@assets/4_1761838910338.png";
import project5Image from "@assets/5_1761838910338.png";
import project6Image from "@assets/6_1761838910339.jpg";
import webAppImage from "@assets/generated_images/Web_app_project_showcase_83480b2a.png";
import mobileAppImage from "@assets/generated_images/Mobile_app_project_showcase_c25f05fd.png";
import designImage from "@assets/generated_images/Design_project_showcase_d267c0ce.png";

const projects = [
  {
    id: 1,
    title: "Evidentia - Multimodal Multiagent Research Analyst",
    description:
      "Agentic AI research framework that transforms messy, multimodal data into clear, citation-rich insights. AI-powered research analyst that plans, navigates, verifies, and synthesizes.",
    image: project1Image,
    tags: ["LangGraph", "FastAPI", "Next.js", "Qdrant", "Postgres", "LLM Agents"],
    categories: ["AI"],
  },
  {
    id: 2,
    title: "Telehealth Compass: AI-Powered Telehealth Policy Intelligence Platform",
    description:
      "End-to-end platform using Llama-3.1-70B and BGE-large embeddings within a RAG pipeline, enabling natural-language Q&A with citations, automated multi-state policy comparisons, and structured regulatory insights. Improved policy analysis efficiency by >50% with sub-5s response latency across 100+ documents.",
    image: project2Image,
    tags: ["Llama-3.1-70B", "RAG", "BGE Embeddings", "LLMs", "Python", "NLP"],
    categories: ["AI"],
  },
  {
    id: 3,
    title: "Pixels to Patterns: ML-Driven Analytics of Steam Games",
    description:
      "Built an end-to-end analytics pipeline combining EDA, regression, clustering, statistical testing, and ML models (XGBoost, LightGBM, LSTMs) to analyze 100k+ Steam game records with 92% forecast accuracy. Designed & deployed interactive visualizations and dashboards (Plotly, Tableau) to communicate market trends, ownership forecasting, and player behavior insights.",
    image: project3Image,
    tags: ["XGBoost", "LightGBM", "LSTM", "EDA", "Plotly", "Tableau", "Python"],
    categories: ["Machine Learning", "Analytics and Forecasting"],
  },
  {
    id: 4,
    title: "Few-shot Image Classification on AWS using Meta-Learning (MAML)",
    description:
      "Designed and deployed a cloud-native few-shot image classification system on AWS using MAML, building a full-stack pipeline with Python, Flask, S3, SageMaker, and EC2 to deliver real-time inference with end-to-end scalability, automation, and cloud integration.",
    image: project4Image,
    tags: ["MAML", "AWS", "SageMaker", "Flask", "S3", "EC2", "Meta-Learning"],
    categories: ["Machine Learning"],
  },
  {
    id: 5,
    title: "Music Genre Classification Using Machine Learning Techniques",
    description:
      "Performed comparative study to detect and classify music files automatically based on genre using various classification algorithms including SVM, K-Nearest Neighbors, CNN, RNN, Random Forest and Decision trees. Published in International Journal of Science Research and Management (IJSREM) Volume 7, Issue 12 on December 14, 2023.",
    image: project5Image,
    tags: ["SVM", "CNN", "RNN", "Random Forest", "K-Nearest Neighbors", "Python"],
    categories: ["Machine Learning"],
  },
  {
    id: 6,
    title: "Detection of Face Mask using Keras and TensorFlow",
    description:
      "Real-time face mask detection system using deep learning. Built with OpenCV, Keras, and TensorFlow to detect face masks in real-time video streams, enabling automated compliance monitoring for safety protocols.",
    image: project6Image,
    tags: ["Keras", "TensorFlow", "OpenCV", "Deep Learning", "Computer Vision"],
    categories: ["Computer Vision", "Machine Learning", "Deep Learning"],
  },
  {
    id: 7,
    title: "Social Distancing Detector using YOLO and OpenCV",
    description:
      "Social distancing detector built using YOLO (COCO Model) along with OpenCV. Applies object detection to detect all people in video streams, computes pairwise distances between detected people, and checks if any two people are less than N pixels apart for social distancing compliance.",
    image: webAppImage,
    tags: ["YOLO", "OpenCV", "Computer Vision", "Deep Learning", "Object Detection"],
    categories: ["Computer Vision", "Deep Learning"],
  },
  {
    id: 8,
    title: "Bitcoin Price Prediction using LSTM and Google Trends",
    description:
      "LSTM-based Bitcoin price prediction project using Google Trend keywords. Determines if LSTM algorithm can predict Bitcoin close price by analyzing keyword volume from Google Trends. Bitcoin price dataset downloaded hourly using coinapi.io API, and Google Trends keywords downloaded using Python pytrend library. Predicted Bitcoin close prices better than expected by improving learning in every epoch.",
    image: designImage,
    tags: ["LSTM", "RNN", "Deep Learning", "Bitcoin", "Google Trends", "Python", "Time Series"],
    categories: ["Deep Learning", "Analytics and Forecasting"],
  },
  {
    id: 9,
    title: "Dead Ends and Data Trends: A Journey Through America's Recent Accident Stats",
    description:
      "Insightful journey into understanding the patterns behind road fatalities in the U.S. and creating actionable insights for a safer future. Analysis of 36,891 observations with 83 features from FARS 2022 Dataset using R programming language for comprehensive statistical analysis and visualization.",
    image: mobileAppImage,
    tags: ["R", "Statistical Analysis", "Data Visualization", "FARS Dataset", "Public Health"],
    categories: ["Analytics and Forecasting", "Data Science Foundations"],
  },
  {
    id: 10,
    title: "Beats and Bytes: A Statistical Symphony of Spotify's Best Tracks",
    description:
      "Delves into the top-ranking songs on Spotify, exploring the intricate dynamics behind global and regional music trends. Using data on track features like danceability, energy, tempo, and popularity, uncovers what makes a song a chart-topper. By examining patterns in explicit content, album releases, and listener preferences across countries, this exploratory analysis offers valuable insights into the evolving world of music streaming.",
    image: webAppImage,
    tags: ["Python", "Spotify API", "Data Analysis", "Music Analytics", "Statistical Analysis"],
    categories: ["Analytics and Forecasting", "Data Science Foundations"],
  },
  {
    id: 11,
    title: "PNB Nerve Segmentation from Ultrasound Images using Deep Learning",
    description:
      "Deep learning model built to detect the precise location of the Brachial Plexus nerve that is present near the shoulder from ultrasound images. Implements advanced image segmentation techniques to aid in medical diagnostics and improve accuracy in nerve block procedures.",
    image: designImage,
    tags: ["Deep Learning", "Medical Imaging", "Ultrasound", "Image Segmentation", "Computer Vision", "Healthcare"],
    categories: ["Deep Learning", "Computer Vision"],
  },
];

const categories = ["All", "Machine Learning", "AI", "Analytics and Forecasting", "Data Science Foundations", "Deep Learning", "Computer Vision"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(activeCategory));

  const displayedProjects =
    activeCategory === "All" && !showAllProjects
      ? filteredProjects.slice(0, 5)
      : filteredProjects;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setShowAllProjects(false);
  };

  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
          Featured Projects
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A selection of my recent work spanning web development, mobile apps,
          and creative design projects.
        </p>

        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              data-testid={`button-filter-${category.toLowerCase()}`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover-elevate cursor-pointer group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              data-testid={`card-project-${project.id}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {hoveredProject === project.id && (
                  <div className="absolute inset-0 bg-primary/90 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white font-semibold">
                      View Details
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {activeCategory === "All" && !showAllProjects && projects.length > 5 && (
          <div className="flex justify-center mt-12">
            <Button
              size="lg"
              onClick={() => setShowAllProjects(true)}
              data-testid="button-view-all-projects"
            >
              View All Projects ({projects.length})
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
