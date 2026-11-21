import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { SiGithub } from "react-icons/si";
import LabelLensShowcase from "./LabelLensShowcase";
import { FadeUp, SectionHeader } from "./motion/Reveal";
import { EASE, useFinePointer } from "@/lib/motion";
import evidentiaImage from "@assets/web/evidentia.webp";
import telehealthImage from "@assets/web/telehealth.webp";
import nutritionalArbitrageImage from "@assets/web/nutritional-arbitrage.webp";
import scholarlyImage from "@assets/web/scholarly.webp";
import luminaImage from "@assets/web/lumina.webp";
import nutrimapImage from "@assets/web/nutrimap.webp";
import riskmetricImage from "@assets/web/riskmetric.webp";
import steamImage from "@assets/web/steam.webp";
import johnLewisImage from "@assets/web/johnlewis.webp";
import mamlImage from "@assets/web/maml.webp";
import spotifyImage from "@assets/web/spotify.webp";
import accidentsImage from "@assets/web/accidents.webp";
import musicImage from "@assets/web/music.webp";
import bitcoinImage from "@assets/web/bitcoin.webp";
import nerveImage from "@assets/web/nerve.webp";
import faceMaskImage from "@assets/web/facemask.webp";
import distancingImage from "@assets/web/distancing.webp";

interface Project {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  categories: string[];
  /** Left out when there is no public repository for the project. */
  githubUrl?: string;
}

// AI projects first, then analytics engineering, then earlier ML and deep learning work.
const projects: Project[] = [
  {
    id: 1,
    name: "Evidentia",
    subtitle: "Multimodal multi-agent research analyst",
    description:
      "Agentic AI research framework that transforms messy, multimodal data into clear, citation-rich insights. AI-powered research analyst that plans, navigates, verifies, and synthesizes.",
    image: evidentiaImage,
    tags: ["LangGraph", "FastAPI", "Next.js", "Qdrant", "Postgres", "LLM Agents"],
    categories: ["Gen AI"],
    githubUrl: "https://github.com/adikan2k/Evidentia---Multimodal-Multi-Agent-Research-Analyst",
  },
  {
    id: 2,
    name: "Telehealth Compass",
    subtitle: "AI-powered telehealth policy intelligence platform",
    description:
      "End-to-end platform using Llama-3.1-70B and BGE-large embeddings within a RAG pipeline, enabling natural-language Q&A with citations, automated multi-state policy comparisons, and structured regulatory insights. Improved policy analysis efficiency by >50% with sub-5s response latency across 100+ documents.",
    image: telehealthImage,
    tags: ["Llama-3.1-70B", "RAG", "BGE Embeddings", "LLMs", "Python", "NLP"],
    categories: ["Gen AI"],
    githubUrl: "https://github.com/adikan2k/TeleCompass-AI-Powered-Telehealth-Policy-Intelligence-Platform",
  },
  {
    id: 17,
    name: "Nutritional Arbitrage",
    subtitle: "AI-powered grocery optimization",
    description:
      "An intelligent web application that uses linear programming to optimize grocery shopping. It finds the perfect combination of foods to meet your nutrition goals at the lowest possible cost.",
    image: nutritionalArbitrageImage,
    tags: ["PuLP", "SQLite", "RapidFuzz", "Streamlit", "Plotly"],
    categories: ["Gen AI"],
    githubUrl: "https://github.com/adikan2k/Nutritional-Arbitrage-AI-Powered-Grocery-Optimization",
  },
  {
    id: 18,
    name: "Scholarly Topic Navigator",
    subtitle: "Explainable research digest pipeline",
    description:
      "This project tackles the surge of NLP publications (arXiv, ACL, EMNLP, etc.) by building an automated pipeline that surfaces timely, relevant papers with transparent recommendation logic. It combines modern neural methods with standard NLP preprocessing to enable clustering, classification, retrieval, and summarization, while incorporating faculty feedback for continuous improvement.",
    image: scholarlyImage,
    tags: ["BERTopic", "Word2Vec", "SciBERT", "FAISS", "Zero-Shot Learning", "LIME", "Plotly"],
    categories: ["Natural Language Processing"],
    githubUrl: "https://github.com/adikan2k/Scholarly-Topic-Navigator---Explainable-Research-Digest-Pipeline",
  },
  {
    id: 14,
    name: "Lumina",
    subtitle: "Real-time U.S. grid intelligence and demand forecasting",
    description:
      "Scalable energy analytics platform processing 400K+ hourly demand records across 10 U.S. balancing authorities and 50 states, revealing that high-renewable states pay 30% less than the national average - disproving the \"clean energy = expensive\" myth.",
    image: luminaImage,
    tags: ["Python", "SQL", "Google BigQuery", "Looker Studio", "EIA API"],
    categories: ["Analytics Engineering & Forecasting"],
    githubUrl: "https://github.com/adikan2k/Lumina-Real-Time-U.S.-Grid-Intelligence-Demand-Forecasting",
  },
  {
    id: 15,
    name: "NutriMap",
    subtitle: "Geospatial food analytics and inflation forecasting",
    description:
      "Real-time geospatial analytics quantifying the 2.5× grocery affordability gap between food deserts and high-access areas across 13.6M Americans.",
    image: nutrimapImage,
    tags: ["Power BI", "PostgreSQL", "dbt", "Prophet", "Python", "Kroger & USDA Data"],
    categories: ["Analytics Engineering & Forecasting"],
    githubUrl: "https://github.com/adikan2k/NutriMap-Geospatial-Food-Analytics-Inflation-Forecasting",
  },
  {
    id: 16,
    name: "RiskMetric",
    subtitle: "Fraud detection and spatial-temporal risk scoring",
    description:
      "A zero-cost, high-performance Trust Engine that identifies complex fraud archetypes across 1M+ synthetic banking transactions with sub-second inference speed.",
    image: riskmetricImage,
    tags: ["Python", "SQL", "DuckDB", "dbt", "Streamlit", "Plotly"],
    categories: ["Analytics Engineering & Forecasting"],
    githubUrl: "https://github.com/adikan2k/RiskMetric---Algorithmic-Fraud-Detection-Spatial-Temporal-Risk-Modeling",
  },
  {
    id: 3,
    name: "Steam Market Trends",
    subtitle: "Customer segmentation and ownership forecasting",
    description:
      "Built an end-to-end analytics pipeline combining EDA, regression, clustering, statistical testing, and ML models (XGBoost, LightGBM, LSTMs) to analyze 100k+ Steam game records with 92% forecast accuracy. Designed & deployed interactive visualizations and dashboards (Plotly, Tableau) to communicate market trends, ownership forecasting, and player behavior insights.",
    image: steamImage,
    tags: ["XGBoost", "LightGBM", "LSTM", "EDA", "Plotly", "Tableau", "Python"],
    categories: ["Machine Learning", "Analytics Engineering & Forecasting"],
    githubUrl: "https://github.com/adikan2k/Steam-Market-Trends-and-Customer-Segmentation",
  },
  {
    id: 13,
    name: "John Lewis Christmas Ad",
    subtitle: "Sentiment and topic modeling",
    description:
      "This project investigates audience sentiment and topic patterns in YouTube comments about the John Lewis 2025 Christmas advertisement. The ad's portrayal of masculinity and gender roles generated significant online discussion, making it an interesting case study for sentiment analysis and topic modeling.",
    image: johnLewisImage,
    tags: ["Python", "NLP", "Sentiment Analysis", "Topic Modeling", "YouTube API", "NLTK", "Transformers"],
    categories: ["Natural Language Processing"],
    githubUrl: "https://github.com/adikan2k/NLP-Topic-Modeling-Sentiment-Analysis",
  },
  {
    id: 4,
    name: "Few-shot Image Classification",
    subtitle: "Meta-learning (MAML) on AWS",
    description:
      "Designed and deployed a cloud-native few-shot image classification system on AWS using MAML, building a full-stack pipeline with Python, Flask, S3, SageMaker, and EC2 to deliver real-time inference with end-to-end scalability, automation, and cloud integration.",
    image: mamlImage,
    tags: ["MAML", "AWS", "SageMaker", "Flask", "S3", "EC2", "Meta-Learning"],
    categories: ["Machine Learning"],
    githubUrl: "https://github.com/adikan2k/AWS_META_LEARNING",
  },
  {
    id: 10,
    name: "Spotify Acoustic Typologies",
    subtitle: "Clustering ensemble classification of global Spotify data",
    description:
      "Delves into the top-ranking songs on Spotify, exploring the intricate dynamics behind global and regional music trends. Using data on track features like danceability, energy, tempo, and popularity, uncovers what makes a song a chart-topper. By examining patterns in explicit content, album releases, and listener preferences across countries, this exploratory analysis offers valuable insights into the evolving world of music streaming.",
    image: spotifyImage,
    tags: ["Python", "Spotify API", "Data Analysis", "Music Analytics", "Statistical Analysis"],
    categories: ["Analytics Engineering & Forecasting"],
    githubUrl:
      "https://github.com/adikan2k/Predictive-Analytics-Acoustic-Typologies-Clustering-Ensemble-Classification-of-Global-Spotify-Data",
  },
  {
    id: 9,
    name: "Dead Ends and Data Trends",
    subtitle: "A journey through America's recent accident stats",
    description:
      "Insightful journey into understanding the patterns behind road fatalities in the U.S. and creating actionable insights for a safer future. Analysis of 36,891 observations with 83 features from FARS 2022 Dataset using R programming language for comprehensive statistical analysis and visualization.",
    image: accidentsImage,
    tags: ["R", "Statistical Analysis", "Data Visualization", "FARS Dataset", "Public Health"],
    categories: ["Analytics Engineering & Forecasting"],
    githubUrl: "https://github.com/adikan2k/Dead-Ends-and-Data-Trends-A-Journey-Through-America-s-Recent-Accident-Stats",
  },
  {
    id: 5,
    name: "Music Genre Classification",
    subtitle: "A comparative study of machine learning techniques",
    description:
      "Performed comparative study to detect and classify music files automatically based on genre using various classification algorithms including SVM, K-Nearest Neighbors, CNN, RNN, Random Forest and Decision trees. Published in International Journal of Science Research and Management (IJSREM) Volume 7, Issue 12 on December 14, 2023.",
    image: musicImage,
    tags: ["SVM", "CNN", "RNN", "Random Forest", "K-Nearest Neighbors", "Python"],
    categories: ["Machine Learning"],
    githubUrl: "https://github.com/adikan2k/MUSIC-GENRE-CLASSIFICATION-USING-MACHINE-LEARNING-TECHNIQUES",
  },
  {
    id: 8,
    name: "Bitcoin Price Prediction",
    subtitle: "LSTM and Google Trends",
    description:
      "LSTM-based Bitcoin price prediction project using Google Trend keywords. Determines if LSTM algorithm can predict Bitcoin close price by analyzing keyword volume from Google Trends. Bitcoin price dataset downloaded hourly using coinapi.io API, and Google Trends keywords downloaded using Python pytrend library. Predicted Bitcoin close prices better than expected by improving learning in every epoch.",
    image: bitcoinImage,
    tags: ["LSTM", "RNN", "Deep Learning", "Bitcoin", "Google Trends", "Python", "Time Series"],
    categories: ["Deep Learning and Computer Vision", "Analytics Engineering & Forecasting"],
    githubUrl: "https://github.com/adikan2k/Bitcoin-price-prediction",
  },
  {
    id: 11,
    name: "PNB Nerve Segmentation",
    subtitle: "Deep learning on ultrasound images",
    description:
      "Deep learning model built to detect the precise location of the Brachial Plexus nerve that is present near the shoulder from ultrasound images. Implements advanced image segmentation techniques to aid in medical diagnostics and improve accuracy in nerve block procedures.",
    image: nerveImage,
    tags: ["Deep Learning", "Medical Imaging", "Ultrasound", "Image Segmentation", "Computer Vision", "Healthcare"],
    categories: ["Deep Learning and Computer Vision"],
    githubUrl: "https://github.com/adikan2k/PNB-Nerve-Segmentation-from-Ultrasound-images-using-DL-techniques",
  },
  {
    id: 6,
    name: "Face Mask Detection",
    subtitle: "Keras and TensorFlow",
    description:
      "Real-time face mask detection system using deep learning. Built with OpenCV, Keras, and TensorFlow to detect face masks in real-time video streams, enabling automated compliance monitoring for safety protocols.",
    image: faceMaskImage,
    tags: ["Keras", "TensorFlow", "OpenCV", "Deep Learning", "Computer Vision"],
    categories: ["Deep Learning and Computer Vision"],
    githubUrl: "https://github.com/adikan2k/MASK-DETECTION-TSF-21",
  },
  {
    id: 7,
    name: "Social Distancing Detector",
    subtitle: "YOLO and OpenCV",
    description:
      "Social distancing detector built using YOLO (COCO Model) along with OpenCV. Applies object detection to detect all people in video streams, computes pairwise distances between detected people, and checks if any two people are less than N pixels apart for social distancing compliance.",
    image: distancingImage,
    tags: ["YOLO", "OpenCV", "Computer Vision", "Deep Learning", "Object Detection"],
    categories: ["Deep Learning and Computer Vision"],
    githubUrl: "https://github.com/adikan2k/social-distancing-detector-TSF-GRIP-21",
  },
];

const categories = [
  "All",
  "Gen AI",
  "Natural Language Processing",
  "Analytics Engineering & Forecasting",
  "Machine Learning",
  "Deep Learning and Computer Vision",
];

const shortCategory: Record<string, string> = {
  "Gen AI": "Gen AI",
  "Natural Language Processing": "NLP",
  "Analytics Engineering & Forecasting": "Analytics Eng",
  "Machine Learning": "ML",
  "Deep Learning and Computer Vision": "Deep Learning / CV",
};

/** Image that trails the mouse while a project row is hovered. */
function HoverPreview({ project }: { project: Project | null }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <AnimatePresence>
        {project && (
          <motion.div
            key={project.id}
            className="absolute left-10 top-[-7rem] w-[22rem] overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <img src={project.image} alt="" className="aspect-[16/10] w-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered =
    activeCategory === "All" ? projects : projects.filter((p) => p.categories.includes(activeCategory));
  const hovered = projects.find((p) => p.id === hoveredId) ?? null;
  const showPreview = fine && !reduced && hovered !== null && hovered.id !== openId;

  return (
    <section id="projects" className="relative pt-24 md:pt-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeader
          index="01"
          label="Work"
          lines={[
            <>Built, shipped</>,
            <>
              <span className="serif-italic text-signal-text">and measured.</span>
            </>,
          ]}
          aside={
            <p>
              One lead project with its evals published, then seventeen more across Gen AI, analytics engineering,
              NLP and machine learning.
            </p>
          }
        />
      </div>

      <LabelLensShowcase />

      <div className="mx-auto mt-28 max-w-[1600px] px-5 md:mt-40 md:px-10">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <FadeUp>
            <h3 className="display text-[clamp(2rem,5vw,4.5rem)]">
              More projects <span className="serif-italic text-muted-foreground">({projects.length})</span>
            </h3>
          </FadeUp>
          <FadeUp delay={0.1} className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const count =
                category === "All" ? projects.length : projects.filter((p) => p.categories.includes(category)).length;
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenId(null);
                  }}
                  data-testid={`button-filter-${category.toLowerCase()}`}
                  className={`label-mono rounded-full border px-4 py-2.5 transition-colors duration-300 ${
                    active
                      ? "border-signal bg-signal text-[hsl(240_7%_5%)]"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {category === "All" ? "All" : shortCategory[category]} {count}
                </button>
              );
            })}
          </FadeUp>
        </div>

        <ul className="border-t border-border" onMouseLeave={() => setHoveredId(null)}>
          <AnimatePresence initial={false}>
            {filtered.map((project, i) => {
              const open = openId === project.id;
              const dimmed = fine && hoveredId !== null && hoveredId !== project.id;
              return (
                <motion.li
                  key={project.id}
                  className="border-b border-border"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -6% 0px" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: Math.min(i, 6) * 0.04 }}
                  data-testid={`card-project-${project.id}`}
                >
                  <button
                    onClick={() => setOpenId(open ? null : project.id)}
                    onMouseEnter={() => setHoveredId(project.id)}
                    aria-expanded={open}
                    data-cursor={open ? "Close" : "Open"}
                    className={`group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 text-left transition-opacity duration-300 md:grid-cols-[4rem_1fr_14rem_auto] md:py-8 ${
                      dimmed ? "opacity-35" : "opacity-100"
                    }`}
                  >
                    <span className="label-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <span className="transition-transform duration-500 ease-out group-hover:translate-x-3">
                      <span
                        className={`display block text-2xl transition-colors duration-300 md:text-4xl xl:text-5xl ${
                          open ? "text-signal-text" : "group-hover:text-signal-text"
                        }`}
                      >
                        {project.name}
                      </span>
                      <span className="mt-2 block text-sm text-muted-foreground md:text-base">{project.subtitle}</span>
                    </span>
                    <span className="label-mono hidden text-muted-foreground md:block">
                      {project.categories.map((c) => shortCategory[c]).join(" · ")}
                    </span>
                    <span
                      className={`flex h-10 w-10 items-center justify-center self-center rounded-full border transition-all duration-500 ${
                        open
                          ? "rotate-45 border-signal bg-signal text-[hsl(240_7%_5%)]"
                          : "border-border group-hover:border-foreground"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduced ? 0.01 : 0.6, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-10 md:grid-cols-12 md:pl-[5rem]">
                          <motion.div
                            className="overflow-hidden rounded-xl border border-border md:col-span-5"
                            initial={{ clipPath: "inset(0 0 100% 0)" }}
                            animate={{ clipPath: "inset(0 0 0% 0)" }}
                            transition={{ duration: reduced ? 0.01 : 0.8, ease: EASE, delay: 0.1 }}
                          >
                            <img
                              src={project.image}
                              alt={`${project.name} preview`}
                              loading="lazy"
                              className="aspect-[16/10] w-full object-cover"
                            />
                          </motion.div>
                          <div className="flex flex-col gap-6 md:col-span-7">
                            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag) => (
                                <span key={tag} className="rounded-full border border-border px-3 py-1.5 text-sm">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-fit items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-[hsl(240_7%_5%)]"
                                data-testid={`link-project-${project.id}`}
                              >
                                <SiGithub className="h-4 w-4" />
                                View the code
                                <ArrowUpRight className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

      {fine && !reduced && <HoverPreview project={showPreview ? hovered : null} />}
    </section>
  );
}
