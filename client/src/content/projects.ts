import nutritionalArbitrageImage from "@assets/web/nutritional-arbitrage.webp";
import luminaImage from "@assets/web/lumina.webp";
import nutrimapImage from "@assets/web/nutrimap.webp";
import riskmetricImage from "@assets/web/riskmetric.webp";
import mamlImage from "@assets/web/maml.webp";
import musicImage from "@assets/web/music.webp";
import bitcoinImage from "@assets/web/bitcoin.webp";
import distancingImage from "@assets/web/distancing.webp";

export type Category = "AI and NLP" | "Analytics" | "ML and vision";

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  /** A real screen or chart from the project, shown on hover. */
  preview?: string;
  tags: string[];
  categories: Category[];
  githubUrl: string;
}

// AI work first, then analytics engineering, then earlier machine learning and vision.
export const projects: Project[] = [
  {
    id: "telehealth",
    name: "Telehealth Compass",
    subtitle: "Policy questions answered with citations",
    description:
      "A RAG platform over telehealth policy documents using Llama-3.1-70B and BGE-large embeddings: questions answered with citations, multi-state comparisons and structured regulatory facts. Policy analysis more than 50% faster, under 5 s a response across 100+ documents.",
    tags: ["Llama-3.1-70B", "RAG", "BGE embeddings", "Python"],
    categories: ["AI and NLP"],
    githubUrl: "https://github.com/adikan2k/TeleCompass-AI-Powered-Telehealth-Policy-Intelligence-Platform",
  },
  {
    id: "nutritional-arbitrage",
    name: "Nutritional Arbitrage",
    subtitle: "The cheapest groceries that meet a nutrition goal",
    description:
      "A web app that uses linear programming to find the cheapest combination of foods meeting a set of nutrition goals, with fuzzy matching of grocery items.",
    preview: nutritionalArbitrageImage,
    tags: ["PuLP", "SQLite", "RapidFuzz", "Streamlit", "Plotly"],
    categories: ["Analytics"],
    githubUrl: "https://github.com/adikan2k/Nutritional-Arbitrage-AI-Powered-Grocery-Optimization",
  },
  {
    id: "scholarly",
    name: "Scholarly Topic Navigator",
    subtitle: "An explainable digest of new NLP papers",
    description:
      "A pipeline over new NLP papers from arXiv, ACL and EMNLP that clusters, classifies, retrieves and summarises them, explains each recommendation, and takes feedback from the faculty lab that reads them.",
    tags: ["BERTopic", "SciBERT", "Word2Vec", "FAISS", "Zero-shot", "LIME"],
    categories: ["AI and NLP"],
    githubUrl: "https://github.com/adikan2k/Scholarly-Topic-Navigator---Explainable-Research-Digest-Pipeline",
  },
  {
    id: "lumina",
    name: "Lumina",
    subtitle: "US grid demand and what renewables cost",
    description:
      "Energy analytics over 400K+ hourly demand records across 10 US balancing authorities and 50 states. States with the most renewable power pay 30% less than the national average.",
    preview: luminaImage,
    tags: ["Python", "SQL", "BigQuery", "Looker Studio", "EIA API"],
    categories: ["Analytics"],
    githubUrl: "https://github.com/adikan2k/Lumina-Real-Time-U.S.-Grid-Intelligence-Demand-Forecasting",
  },
  {
    id: "nutrimap",
    name: "NutriMap",
    subtitle: "Food deserts and grocery inflation",
    description:
      "Geospatial analytics measuring a 2.5× grocery affordability gap between food deserts and high-access areas, across 13.6M Americans, with price forecasts.",
    preview: nutrimapImage,
    tags: ["Power BI", "PostgreSQL", "dbt", "Prophet", "Python"],
    categories: ["Analytics"],
    githubUrl: "https://github.com/adikan2k/NutriMap-Geospatial-Food-Analytics-Inflation-Forecasting",
  },
  {
    id: "riskmetric",
    name: "RiskMetric",
    subtitle: "Fraud detection with spatial and temporal risk",
    description:
      "A fraud-detection engine that scores 1M+ synthetic banking transactions for spatial and temporal risk patterns, with sub-second inference on free tooling.",
    preview: riskmetricImage,
    tags: ["Python", "SQL", "DuckDB", "dbt", "Streamlit"],
    categories: ["Analytics"],
    githubUrl: "https://github.com/adikan2k/RiskMetric---Algorithmic-Fraud-Detection-Spatial-Temporal-Risk-Modeling",
  },
  {
    id: "steam",
    name: "Steam Market Trends",
    subtitle: "Player segments and ownership forecasts",
    description:
      "An analytics pipeline over 100k+ Steam game records: EDA, regression, clustering, statistical tests and models (XGBoost, LightGBM, LSTM), with 92% forecast accuracy and dashboards in Plotly and Tableau.",
    tags: ["XGBoost", "LightGBM", "LSTM", "Plotly", "Tableau"],
    categories: ["Analytics"],
    githubUrl: "https://github.com/adikan2k/Steam-Market-Trends-and-Customer-Segmentation",
  },
  {
    id: "john-lewis",
    name: "John Lewis Christmas Ad",
    subtitle: "Sentiment and topics in YouTube comments",
    description:
      "Sentiment analysis and topic modelling of YouTube comments on the John Lewis 2025 Christmas advert, whose portrayal of masculinity and gender roles drew wide discussion, with traditional and transformer methods side by side.",
    tags: ["NLTK", "Transformers", "Topic modelling", "YouTube API"],
    categories: ["AI and NLP"],
    githubUrl: "https://github.com/adikan2k/NLP-Topic-Modeling-Sentiment-Analysis",
  },
  {
    id: "maml",
    name: "Few-shot Image Classification",
    subtitle: "Meta-learning (MAML) deployed on AWS",
    description:
      "A few-shot image classifier trained with MAML and deployed on AWS (Flask, S3, SageMaker and EC2) for real-time inference.",
    preview: mamlImage,
    tags: ["MAML", "SageMaker", "S3", "EC2", "Flask"],
    categories: ["ML and vision"],
    githubUrl: "https://github.com/adikan2k/AWS_META_LEARNING",
  },
  {
    id: "spotify",
    name: "Spotify Acoustic Typologies",
    subtitle: "Clustering and genre classification",
    description:
      "EDA, statistical clustering and predictive modelling on a large Spotify dataset: how audio features relate to popularity, which tracks group together, and how well genre can be predicted.",
    tags: ["Python", "Clustering", "Ensembles", "Spotify API"],
    categories: ["ML and vision"],
    githubUrl:
      "https://github.com/adikan2k/Predictive-Analytics-Acoustic-Typologies-Clustering-Ensemble-Classification-of-Global-Spotify-Data",
  },
  {
    id: "dead-ends",
    name: "Dead Ends and Data Trends",
    subtitle: "US road fatalities, FARS 2022",
    description:
      "Statistical analysis in R of 36,891 records with 83 features from the FARS 2022 dataset, looking for the patterns behind road deaths in the US.",
    tags: ["R", "Statistics", "Data visualisation", "FARS"],
    categories: ["Analytics"],
    githubUrl: "https://github.com/adikan2k/Dead-Ends-and-Data-Trends-A-Journey-Through-America-s-Recent-Accident-Stats",
  },
  {
    id: "music-genre",
    name: "Music Genre Classification",
    subtitle: "Published in IJSREM, 2023",
    description:
      "A comparison of SVM, KNN, CNN, RNN, random forest and decision tree classifiers for music genre. Published in the International Journal of Scientific Research in Engineering and Management, Volume 7, Issue 12, December 2023.",
    preview: musicImage,
    tags: ["SVM", "CNN", "RNN", "Random forest", "KNN"],
    categories: ["ML and vision"],
    githubUrl: "https://github.com/adikan2k/MUSIC-GENRE-CLASSIFICATION-USING-MACHINE-LEARNING-TECHNIQUES",
  },
  {
    id: "bitcoin",
    name: "Bitcoin Price Prediction",
    subtitle: "LSTM on Google Trends",
    description:
      "An LSTM that predicts Bitcoin's hourly close from Google Trends keyword volume, with prices from the coinapi.io API and keywords from pytrends.",
    preview: bitcoinImage,
    tags: ["LSTM", "Time series", "Google Trends", "Python"],
    categories: ["ML and vision"],
    githubUrl: "https://github.com/adikan2k/Bitcoin-price-prediction",
  },
  {
    id: "nerve",
    name: "PNB Nerve Segmentation",
    subtitle: "Locating a nerve in ultrasound images",
    description:
      "A deep learning segmentation model that locates the brachial plexus nerve near the shoulder in ultrasound images, to support nerve block procedures.",
    tags: ["Segmentation", "Medical imaging", "Deep learning"],
    categories: ["ML and vision"],
    githubUrl: "https://github.com/adikan2k/PNB-Nerve-Segmentation-from-Ultrasound-images-using-DL-techniques",
  },
  {
    id: "face-mask",
    name: "Face Mask Detection",
    subtitle: "Real-time video, Keras and TensorFlow",
    description: "Real-time face mask detection in video streams with OpenCV, Keras and TensorFlow.",
    tags: ["Keras", "TensorFlow", "OpenCV"],
    categories: ["ML and vision"],
    githubUrl: "https://github.com/adikan2k/MASK-DETECTION-TSF-21",
  },
  {
    id: "distancing",
    name: "Social Distancing Detector",
    subtitle: "YOLO and OpenCV",
    description:
      "Person detection with YOLO (COCO) and OpenCV that measures the distance between every pair of people in a video and flags pairs closer than a set threshold.",
    preview: distancingImage,
    tags: ["YOLO", "OpenCV", "Object detection"],
    categories: ["ML and vision"],
    githubUrl: "https://github.com/adikan2k/social-distancing-detector-TSF-GRIP-21",
  },
];
