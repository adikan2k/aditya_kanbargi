import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2, GraduationCap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Helper function to highlight quantitative outcomes with full phrases
function highlightMetrics(text: string) {
  // Extended patterns to capture full phrases with quantitative outcomes
  const phrases = [
    /Extended early-warning prediction lead time by 6 hours/gi,
    /Reduced projected readmissions and increased nurse-to-patient efficiency by 20%/gi,
    /Lowered projected nurse attrition by 8–10% annually/gi,
    /Increased research throughput by 25%/gi,
    /improving predictive accuracy by 25%/gi,
    /reducing data preparation time by 40%/gi,
    /Enabled 3x faster decision-making/gi,
    /boosting analytics adoption by 30%/gi,
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

const experiences = [
  {
    title: "Research Analyst – Public Health",
    company: "GW School of Nursing",
    companyIcon: GraduationCap,
    location: "Virginia",
    period: "Dec 2024 – May 2025",
    description: [
      "Extended early-warning prediction lead time by 6 hours by building machine learning models on EHR and vital signs data to detect patient deterioration risks such as sepsis, cardiac arrest, and chronic disease flare-ups, enabling faster clinical intervention",
      "Reduced projected readmissions and increased nurse-to-patient efficiency by 20% by applying clustering and predictive analytics for personalized care planning",
      "Lowered projected nurse attrition by 8–10% annually by developing statistical attrition prediction models that identified key turnover drivers, allowing administrators to implement targeted retention strategies in high-stress chronic care units",
      "Increased research throughput by 25% by developing interactive Tableau dashboards that streamlined analysis of patient outcomes, enabling faculty to rapidly test hypotheses, uncover patterns, and accelerate publication timelines",
    ],
    skills: ["Machine Learning", "Python", "EHR Data", "Tableau", "Statistical Modeling", "Clustering", "Healthcare Analytics"],
  },
  {
    title: "Quantitative Analyst / Decision Science Analyst",
    company: "LTIMindtree",
    companyIcon: Building2,
    location: "India",
    period: "Sept 2022 – May 2024",
    description: [
      "Performed advanced statistical modeling and machine learning (regression, clustering, classification) in Python & SQL on customer, operational, and transactional datasets, improving predictive accuracy by 25% and enabling more reliable business forecasting",
      "Automated scalable ETL workflows to ingest, clean, and transform multi-format data (JSON, CSV, APIs) from PostgreSQL, Oracle, and cloud data warehouses, reducing data preparation time by 40% and improving data consistency for downstream analytics",
      "Enabled 3x faster decision-making by developing and deploying interactive dashboards in Power BI that visualized KPIs, financial metrics, and statistical trends in real time, directly supporting senior leadership and cross-functional teams",
      "Strengthened data integrity and boosted analytics adoption by 30% by implementing robust SQL query validation, resolving data inconsistencies, and applying statistical anomaly detection methods across enterprise datasets, ensuring dashboards and ML models delivered accurate, trustworthy insights",
      "Streamlined cross-functional collaboration (business, operations, engineering) to translate requirements into analytics solutions, ensuring alignment of statistical outputs with corporate objectives",
    ],
    skills: ["Python", "SQL", "Machine Learning", "Power BI", "ETL", "PostgreSQL", "Oracle", "Statistical Modeling", "Data Warehousing"],
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
          My professional journey in data science and analytics, building
          solutions that leverage data for business value.
        </p>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
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
                  <div className="flex items-center gap-2 text-lg font-medium text-primary mb-2">
                    {exp.companyIcon && <exp.companyIcon className="h-5 w-5" />}
                    <span>{exp.company}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
}
