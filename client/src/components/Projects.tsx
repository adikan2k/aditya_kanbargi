import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Eye } from "lucide-react";
import project1Image from "@assets/1_1761838910338.jpg";
import project2Image from "@assets/2_1761838910338.jpg";
import project3Image from "@assets/3_1761838910338.png";
import project4Image from "@assets/4_1761838910338.png";
import project5Image from "@assets/5_1761838910338.png";
import project6Image from "@assets/6_1761838910339.jpg";
import project7Image from "@assets/7_1761840145743.png";
import project8Image from "@assets/8_1761840145744.jpg";
import project9Image from "@assets/9_1761840145744.png";
import project10Image from "@assets/10_1761840145744.png";
import project11Image from "@assets/11_1761840145744.jpg";
import project13Image from "@assets/image_1763919442225.png";
import luminaImage from "@assets/lumina_thumbnail.png";
import nutrimapImage from "@assets/nutrimap_thumbnail.png";
import riskmetricImage from "@assets/Riskmetric.png";
import nutritionalArbitrageImage from "@assets/na.jpg";
import scholarlyImage from "@assets/scholarly.jpg";

const projects = [
  {
    id: 14,
    title: "Lumina: Real-Time U.S. Grid Intelligence & Demand Forecasting",
    description:
      "Scalable energy analytics platform processing 400K+ hourly demand records across 10 U.S. balancing authorities and 50 states, revealing that high-renewable states pay 30% less than the national average - disproving the \"clean energy = expensive\" myth.",
    image: luminaImage,
    tags: ["Python", "SQL", "Google BigQuery", "Looker Studio", "EIA API"],
    categories: ["Analytics Engineering & Forecasting"],
    githubUrl: "https://github.com/adikan2k/Lumina-Real-Time-U.S.-Grid-Intelligence-Demand-Forecasting",
  },
  {
    id: 15,
    title: "NutriMap: Geospatial Food Analytics & Inflation Forecasting",
    description:
      "Real-time geospatial analytics quantifying the 2.5\u00D7 grocery affordability gap between food deserts and high-access areas across 13.6M Americans.",
    image: nutrimapImage,
    tags: ["Power BI", "PostgreSQL", "dbt", "Prophet", "Python", "Kroger & USDA Data"],
    categories: ["Analytics Engineering & Forecasting"],
    githubUrl: "https://github.com/adikan2k/NutriMap-Geospatial-Food-Analytics-Inflation-Forecasting",
  },
  {
    id: 16,
    title: "RiskMetric: Fraud Detection & Spatial-Temporal Risk Scoring",
    description:
      "A zero-cost, high-performance Trust Engine that identifies complex fraud archetypes across 1M+ synthetic banking transactions with sub-second inference speed.",
    image: riskmetricImage,
    tags: ["Python", "SQL", "DuckDB", "dbt", "Streamlit", "Plotly"],
    categories: ["Analytics Engineering & Forecasting"],
    githubUrl: "https://github.com/adikan2k/RiskMetric---Algorithmic-Fraud-Detection-Spatial-Temporal-Risk-Modeling",
  },
  {
    id: 17,
    title: "Nutritional Arbitrage: AI-Powered Grocery Optimization",
    description:
      "An intelligent web application that uses linear programming to optimize grocery shopping. It finds the perfect combination of foods to meet your nutrition goals at the lowest possible cost.",
    image: nutritionalArbitrageImage,
    tags: ["PuLP", "SQLite", "RapidFuzz", "Streamlit", "Plotly"],
    categories: ["Gen AI"],
    githubUrl: "https://github.com/adikan2k/Nutritional-Arbitrage-AI-Powered-Grocery-Optimization",
  },
  {
    id: 18,
    title: "Scholarly Topic Navigator - Explainable Research Digest Pipeline",
    description:
      "This project tackles the surge of NLP publications (arXiv, ACL, EMNLP, etc.) by building an automated pipeline that surfaces timely, relevant papers with transparent recommendation logic. It combines modern neural methods with standard NLP preprocessing to enable clustering, classification, retrieval, and summarization, while incorporating faculty feedback for continuous improvement.",
    image: scholarlyImage,
    tags: ["BERTopic", "Word2Vec", "SciBERT", "FAISS", "Zero-Shot Learning", "LIME", "Plotly"],
    categories: ["Natural Language Processing"],
    githubUrl: "https://github.com/adikan2k/Scholarly-Topic-Navigator---Explainable-Research-Digest-Pipeline",
  },
  {
    id: 3,
    title: "Steam Market Trends & Customer Segmentation",
    description:
      "Built an end-to-end analytics pipeline combining EDA, regression, clustering, statistical testing, and ML models (XGBoost, LightGBM, LSTMs) to analyze 100k+ Steam game records with 92% forecast accuracy. Designed & deployed interactive visualizations and dashboards (Plotly, Tableau) to communicate market trends, ownership forecasting, and player behavior insights.",
    image: project3Image,
    tags: ["XGBoost", "LightGBM", "LSTM", "EDA", "Plotly", "Tableau", "Python"],
    categories: ["Machine Learning", "Analytics Engineering & Forecasting"],
    githubUrl: "https://github.com/adikan2k/Steam-Market-Trends-and-Customer-Segmentation",
  },
  {
    id: 1,
    title: "Evidentia - Multimodal Multiagent Research Analyst",
    description:
      "Agentic AI research framework that transforms messy, multimodal data into clear, citation-rich insights. AI-powered research analyst that plans, navigates, verifies, and synthesizes.",
    image: project1Image,
    tags: ["LangGraph", "FastAPI", "Next.js", "Qdrant", "Postgres", "LLM Agents"],
    categories: ["Gen AI"],
    githubUrl: "https://github.com/adikan2k/Evidentia---Multimodal-Multi-Agent-Research-Analyst",
  },
  {
    id: 2,
    title: "Telehealth Compass: AI-Powered Telehealth Policy Intelligence Platform",
    description:
      "End-to-end platform using Llama-3.1-70B and BGE-large embeddings within a RAG pipeline, enabling natural-language Q&A with citations, automated multi-state policy comparisons, and structured regulatory insights. Improved policy analysis efficiency by >50% with sub-5s response latency across 100+ documents.",
    image: project2Image,
    tags: ["Llama-3.1-70B", "RAG", "BGE Embeddings", "LLMs", "Python", "NLP"],
    categories: ["Gen AI"],
    githubUrl: "https://github.com/adikan2k/TeleCompass-AI-Powered-Telehealth-Policy-Intelligence-Platform",
  },
  {
    id: 4,
    title: "Few-shot Image Classification on AWS using Meta-Learning (MAML)",
    description:
      "Designed and deployed a cloud-native few-shot image classification system on AWS using MAML, building a full-stack pipeline with Python, Flask, S3, SageMaker, and EC2 to deliver real-time inference with end-to-end scalability, automation, and cloud integration.",
    image: project4Image,
    tags: ["MAML", "AWS", "SageMaker", "Flask", "S3", "EC2", "Meta-Learning"],
    categories: ["Machine Learning"],
    githubUrl: "https://github.com/adikan2k",
  },
  {
    id: 5,
    title: "Music Genre Classification Using Machine Learning Techniques",
    description:
      "Performed comparative study to detect and classify music files automatically based on genre using various classification algorithms including SVM, K-Nearest Neighbors, CNN, RNN, Random Forest and Decision trees. Published in International Journal of Science Research and Management (IJSREM) Volume 7, Issue 12 on December 14, 2023.",
    image: project5Image,
    tags: ["SVM", "CNN", "RNN", "Random Forest", "K-Nearest Neighbors", "Python"],
    categories: ["Machine Learning"],
    githubUrl: "https://github.com/adikan2k",
  },
  {
    id: 6,
    title: "Detection of Face Mask using Keras and TensorFlow",
    description:
      "Real-time face mask detection system using deep learning. Built with OpenCV, Keras, and TensorFlow to detect face masks in real-time video streams, enabling automated compliance monitoring for safety protocols.",
    image: project6Image,
    tags: ["Keras", "TensorFlow", "OpenCV", "Deep Learning", "Computer Vision"],
    categories: ["Deep Learning and Computer Vision"],
    githubUrl: "https://github.com/adikan2k",
  },
  {
    id: 7,
    title: "Social Distancing Detector using YOLO and OpenCV",
    description:
      "Social distancing detector built using YOLO (COCO Model) along with OpenCV. Applies object detection to detect all people in video streams, computes pairwise distances between detected people, and checks if any two people are less than N pixels apart for social distancing compliance.",
    image: project7Image,
    tags: ["YOLO", "OpenCV", "Computer Vision", "Deep Learning", "Object Detection"],
    categories: ["Deep Learning and Computer Vision"],
    githubUrl: "https://github.com/adikan2k",
  },
  {
    id: 8,
    title: "Bitcoin Price Prediction using LSTM and Google Trends",
    description:
      "LSTM-based Bitcoin price prediction project using Google Trend keywords. Determines if LSTM algorithm can predict Bitcoin close price by analyzing keyword volume from Google Trends. Bitcoin price dataset downloaded hourly using coinapi.io API, and Google Trends keywords downloaded using Python pytrend library. Predicted Bitcoin close prices better than expected by improving learning in every epoch.",
    image: project8Image,
    tags: ["LSTM", "RNN", "Deep Learning", "Bitcoin", "Google Trends", "Python", "Time Series"],
    categories: ["Deep Learning and Computer Vision", "Analytics Engineering & Forecasting"],
    githubUrl: "https://github.com/adikan2k",
  },
  {
    id: 9,
    title: "Dead Ends and Data Trends: A Journey Through America's Recent Accident Stats",
    description:
      "Insightful journey into understanding the patterns behind road fatalities in the U.S. and creating actionable insights for a safer future. Analysis of 36,891 observations with 83 features from FARS 2022 Dataset using R programming language for comprehensive statistical analysis and visualization.",
    image: project9Image,
    tags: ["R", "Statistical Analysis", "Data Visualization", "FARS Dataset", "Public Health"],
    categories: ["Analytics Engineering & Forecasting"],
    githubUrl: "https://github.com/adikan2k",
  },
  {
    id: 10,
    title: "Predictive Analytics & Acoustic Typologies: Clustering Ensemble Classification of Global Spotify Data",
    description:
      "Delves into the top-ranking songs on Spotify, exploring the intricate dynamics behind global and regional music trends. Using data on track features like danceability, energy, tempo, and popularity, uncovers what makes a song a chart-topper. By examining patterns in explicit content, album releases, and listener preferences across countries, this exploratory analysis offers valuable insights into the evolving world of music streaming.",
    image: project10Image,
    tags: ["Python", "Spotify API", "Data Analysis", "Music Analytics", "Statistical Analysis"],
    categories: ["Analytics Engineering & Forecasting"],
    githubUrl: "https://github.com/adikan2k/Predictive-Analytics-Acoustic-Typologies-Clustering-Ensemble-Classification-of-Global-Spotify-Data",
  },
  {
    id: 11,
    title: "PNB Nerve Segmentation from Ultrasound Images using Deep Learning",
    description:
      "Deep learning model built to detect the precise location of the Brachial Plexus nerve that is present near the shoulder from ultrasound images. Implements advanced image segmentation techniques to aid in medical diagnostics and improve accuracy in nerve block procedures.",
    image: project11Image,
    tags: ["Deep Learning", "Medical Imaging", "Ultrasound", "Image Segmentation", "Computer Vision", "Healthcare"],
    categories: ["Deep Learning and Computer Vision"],
    githubUrl: "https://github.com/adikan2k",
  },
  {
    id: 13,
    title: "John Lewis Christmas Ad Sentiment and Topic Modeling",
    description:
      "This project investigates audience sentiment and topic patterns in YouTube comments about the John Lewis 2025 Christmas advertisement. The ad's portrayal of masculinity and gender roles generated significant online discussion, making it an interesting case study for sentiment analysis and topic modeling.",
    image: project13Image,
    tags: ["Python", "NLP", "Sentiment Analysis", "Topic Modeling", "YouTube API", "NLTK", "Transformers"],
    categories: ["Natural Language Processing"],
    githubUrl: "https://github.com/adikan2k",
  },
];

const categories = ["All", "Analytics Engineering & Forecasting", "Gen AI", "Natural Language Processing", "Machine Learning", "Deep Learning and Computer Vision"];

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(activeCategory));

  const displayedProjects =
    activeCategory === "All" && !showAllProjects
      ? filteredProjects.slice(0, 6)
      : filteredProjects;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setShowAllProjects(false);
  };

  const getTagline = () => {
    const taglines: Record<string, string> = {
      "All": "A comprehensive showcase of my work across Analytics Engineering, Gen AI, Machine Learning, Deep Learning, Computer Vision, and NLP projects.",
      "Analytics Engineering & Forecasting": "End-to-end data pipelines, warehousing, and forecasting dashboards that drive strategic decision-making.",
      "Gen AI": "Intelligent systems leveraging LLMs, agentic frameworks, and advanced AI architectures.",
      "Natural Language Processing": "Advanced NLP systems for language understanding, generation, and semantic analysis.",
      "Machine Learning": "Predictive models and ML systems tackling real-world challenges with advanced algorithms.",
      "Deep Learning and Computer Vision": "Neural networks and visual intelligence systems for pattern recognition, image analysis, and object detection.",
    };
    return taglines[activeCategory] || taglines["All"];
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      id="projects" 
      className={`py-24 bg-muted/30 scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
          Featured Projects
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {getTagline()}
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
            <a
              key={project.id}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              data-testid={`link-project-${project.id}`}
            >
              <Card
                className="overflow-hidden hover-elevate cursor-pointer group h-full"
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
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300">
                      <div className="bg-white/90 dark:bg-gray-800/90 p-4 rounded-full shadow-lg backdrop-blur-sm">
                        <Eye className="h-8 w-8 text-foreground" />
                      </div>
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
            </a>
          ))}
        </div>

        {activeCategory === "All" && !showAllProjects && projects.length > 6 && (
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
