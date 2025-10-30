import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Senior Data Scientist",
    company: "TechCorp Analytics",
    location: "San Francisco, CA",
    period: "2022 - Present",
    description: [
      "Led ML model development for customer churn prediction, improving retention by 15%",
      "Architected real-time data pipeline processing 10M+ events daily",
      "Mentored team of 5 junior data scientists on best practices",
    ],
    skills: ["Python", "TensorFlow", "AWS", "Spark", "SQL"],
  },
  {
    title: "Data Scientist",
    company: "DataDrive Solutions",
    location: "Remote",
    period: "2020 - 2022",
    description: [
      "Built recommendation system increasing user engagement by 25%",
      "Developed NLP models for sentiment analysis on social media data",
      "Created automated reporting dashboards using Tableau and Python",
    ],
    skills: ["Python", "scikit-learn", "NLP", "Tableau", "PostgreSQL"],
  },
  {
    title: "Junior Data Analyst",
    company: "FinTech Innovations",
    location: "New York, NY",
    period: "2018 - 2020",
    description: [
      "Analyzed financial datasets to identify fraud patterns",
      "Developed ETL pipelines for data warehouse integration",
      "Created statistical models for risk assessment",
    ],
    skills: ["R", "Python", "Excel", "Statistics", "SQL"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
          Experience
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
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
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">
                    {exp.title}
                  </h3>
                  <div className="text-lg font-medium text-primary mb-2">
                    {exp.company}
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
                  <li key={i} className="text-foreground">
                    {item}
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
