import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Award, Rocket, BookOpen, Brain, GraduationCap } from "lucide-react";
import headshotImage from "@assets/profile_1761803769301.png";
import NeuralNetworkAnimation from "./NeuralNetworkAnimation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SiAmazon, SiDatabricks } from "react-icons/si";

// Helper function to highlight keywords
function highlightKeywords(text: string) {
  const keywords = [
    "Data & AI", "agentic AI systems", "LLM workflows", "data pipelines",
    "data and business analytics", "Master's in Data Science", "GPA 4.0",
    "Global Leaders Fellowship"
  ];
  
  let result: (string | JSX.Element)[] = [text];
  let keyCounter = 0;
  
  keywords.forEach((keyword) => {
    const newResult: (string | JSX.Element)[] = [];
    result.forEach((part) => {
      if (typeof part === "string") {
        const parts = part.split(new RegExp(`(${keyword})`, "gi"));
        parts.forEach((subPart) => {
          if (subPart.toLowerCase() === keyword.toLowerCase()) {
            newResult.push(
              <span key={`kw-${keyCounter++}`} className="text-primary font-semibold">
                {subPart}
              </span>
            );
          } else if (subPart) {
            newResult.push(subPart);
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

const skills = [
  {
    category: "Core Competencies",
    icon: Brain,
    items: ["Agentic AI & LLM Workflows", "LLM Evaluation & Benchmarking", "RAG, MCP & Knowledge Graphs", "Analytics Engineering & Data Pipelines", "Data Visualization & BI Dashboards", "Machine Learning & Predictive Analytics"],
  },
  {
    category: "Education",
    icon: GraduationCap,
    items: ["Master's in Data Science", "George Washington University", "GPA 4.0", "Global Leaders Fellowship"],
    coursework: ["Visualization of Complex Data", "Data Mining", "Natural Language Processing", "Cloud Computing", "Algorithm Design", "Data Warehousing", "Statistical Modeling", "Machine Learning"],
  },
];

const achievements = [
  {
    icon: Briefcase,
    title: "~3 Years",
    description: "Professional Experience in Data & AI",
  },
  {
    icon: Award,
    title: "Global Leaders",
    description: "Fellowship Recipient recognized for academic excellence @ GW",
  },
  {
    icon: Rocket,
    title: "15+ Projects",
    description: "End-to-end Deployments",
  },
  {
    icon: BookOpen,
    title: "Published",
    description: "IJSREM Journal on ML",
  },
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      id="about" 
      className={`relative py-24 bg-background overflow-hidden scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <NeuralNetworkAnimation />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
          About Me
        </h2>

        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="flex-shrink-0">
            <img
              src={headshotImage}
              alt="Aditya Kanbargi"
              className="w-48 h-48 rounded-full object-cover shadow-lg"
              data-testid="img-headshot"
            />
          </div>

          <div className="flex-1 border-2 border-black dark:border-white rounded-md p-6 space-y-4 text-foreground leading-relaxed bg-background/90 backdrop-blur-sm">
            <p className="text-lg font-semibold">
              I came for the patterns. I stayed for the pipelines. Now I'm building the systems that put both to work.
            </p>
            <p className="text-justify">
              {highlightKeywords("I'm Aditya Kanbargi, and I work in Data & AI, building agentic AI systems, orchestrating LLM workflows, and developing data pipelines to automate research. I enjoy turning complex, manual processes into something reliable, useful, and easier for people to work with.")}
            </p>
            <p className="text-justify">
              {highlightKeywords("My background is in data and business analytics. Some days, that meant building a dashboard someone could open on a Monday morning and know what to act on. Other days, it meant digging into the numbers to understand what was happening and what the team could do about it. I bring that same mindset to AI: ask the right questions, check the answers, and make sure the work solves a real business problem.")}
            </p>
            <p className="text-justify">
              {highlightKeywords("I hold a Master's in Data Science from The George Washington University (GPA 4.0), where I was awarded the Global Leaders Fellowship for academic excellence.")}
            </p>
            <p className="text-justify">
              {highlightKeywords("I like being the person who gets both sides: comfortable digging into why something isn't working, and just as comfortable explaining it without making it more complicated than it needs to be.")}
            </p>
            <p className="text-justify">
              {highlightKeywords("Outside of work, I'm usually lifting, chasing a football, turning pages, or saying \"one more game.\" When the mountains call, I'm already planning the hike.")}
            </p>
            <p className="text-justify">
              {highlightKeywords("Always happy to connect over data, AI, a good game, or a shared interest. Feel free to reach out!")}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {skills.map((skillGroup) => {
            const SkillIcon = skillGroup.icon;
            return (
              <Card key={skillGroup.category} className="p-6 hover-elevate transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <SkillIcon className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-lg">
                    {skillGroup.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skillGroup.items.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                {skillGroup.coursework && (
                  <>
                    <h4 className="font-medium text-sm mb-2 text-muted-foreground">
                      Coursework:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.coursework.map((course) => (
                        <Badge key={course} variant="outline">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <Card
                key={achievement.title}
                className="p-6 text-center hover-elevate"
              >
                <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="font-semibold text-xl mb-1">
                  {achievement.title}
                </div>
                <div className="text-sm text-muted-foreground">
                  {achievement.description}
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-6 hover-elevate">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Professional Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <SiAmazon className="h-8 w-8 text-orange-500 flex-shrink-0" />
              <div>
                <div className="font-medium text-sm">AWS Certified</div>
                <div className="text-xs text-muted-foreground">AI Practitioner</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <SiDatabricks className="h-8 w-8 text-red-500 flex-shrink-0" />
              <div>
                <div className="font-medium text-sm">Databricks Certified</div>
                <div className="text-xs text-muted-foreground">GenAI Accreditation</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
