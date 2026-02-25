import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import gwLogoImage from "@assets/image_1761868019368.png";
import ltiLogoImage from "@assets/image_1761867956939.png";

// Helper function to highlight quantitative outcomes with full phrases
function highlightMetrics(text: string) {
  // Extended patterns to capture full phrases with quantitative outcomes
  const phrases = [
    /enabled clinical teams to extend early-warning prediction lead times by 6 hours/gi,
    /slashing data preparation time by 40%/gi,
    /increasing research throughput by 25%/gi,
    /optimizing nurse-to-patient allocation by 20%/gi,
    /cut annual turnover by 8-10%/gi,
    /improving predictive accuracy by 25%/gi,
    /expedite strategic decision-making by 3x/gi,
    /boosting stakeholder trust in analytics adoption by 30%/gi,
    /reducing data availability latency by 40%/gi,
    /accelerating the end-to-end analytics project lifecycle by 15%/gi,
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
    companyLogo: gwLogoImage,
    location: "Virginia",
    period: "Dec 2024 – May 2025",
    description: [
      "Engineered an automated ETL pipeline for EHR systems using Python (Pandas) scripts to parse and clean JSON/CSV files, replacing manual Excel workflows and slashing data preparation time by 40%.",
      "Developed interactive Power BI dashboards to visualize clinical KPIs (patient recovery rates, vitals trends), streamlining data access for faculty and increasing research throughput by 25%.",
      "Executed risk stratification models (SciPy/Statsmodels) on patient data to identify key deterioration drivers, optimizing nurse-to-patient allocation by 20%.",
      "Analyzed high-frequency patient data using SQL and Python to identify key deterioration patterns, creating visualizations that enabled clinical teams to extend early-warning prediction lead times by 6 hours for critical conditions like sepsis.",
      "Modeled historical staffing logs to pinpoint attrition drivers, providing data-backed strategies that cut annual turnover by 8-10%.",
    ],
    skills: ["Python", "SQL", "Power BI", "Pandas", "SciPy", "Statsmodels", "ETL", "EHR Data", "Healthcare Analytics"],
  },
  {
    title: "Technical Business Analyst - ServiceNow",
    company: "LTIMindtree",
    companyLogo: ltiLogoImage,
    location: "India",
    period: "Sept 2022 – June 2024",
    description: [
      "Architected real-time executive dashboards using Power BI and ServiceNow Performance Analytics to visualize real-time operational KPIs, enabling leadership to identify process bottlenecks and expedite strategic decision-making by 3x.",
      "Implemented a comprehensive data quality framework by writing SQL validation scripts to audit enterprise datasets, resolving inconsistencies and boosting stakeholder trust in analytics adoption by 30%.",
      "Engineered scalable ETL pipelines to migrate multi-format customer and incident data (JSON/CSV) from ServiceNow into AWS S3 and Redshift, reducing data availability latency by 40% for downstream analytics and reporting.",
      "Translated complex business requirements into technical specifications for 3+ global engineering teams, accelerating the end-to-end analytics project lifecycle by 15%.",
      "Performed advanced statistical modeling and machine learning (XGBoost and Time-Series models) on customer, operational, and transactional datasets, improving predictive accuracy by 25% and enabling more reliable business forecasting.",
    ],
    skills: ["Power BI", "SQL", "AWS S3", "Redshift", "ServiceNow", "ETL", "XGBoost", "Time-Series", "Statistical Modeling"],
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
                  <div className="flex items-center gap-3 text-lg font-medium mb-2">
                    {exp.companyLogo && (
                      <img 
                        src={exp.companyLogo} 
                        alt={`${exp.company} logo`} 
                        className="h-6 object-contain"
                        data-testid={`img-company-logo-${index}`}
                      />
                    )}
                    <span className="text-foreground">{exp.company}</span>
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
