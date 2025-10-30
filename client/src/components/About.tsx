import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Award, Rocket, BookOpen, Brain, GraduationCap } from "lucide-react";
import headshotImage from "@assets/generated_images/Professional_headshot_portrait_d6e9d2d3.png";

const skills = [
  {
    category: "Core Competencies",
    icon: Brain,
    items: ["Machine Learning & Predictive Modeling", "AI Systems Engineering & LLM Integration", "Data Visualization & Decision Science", "Quantitative Analysis & Statistical Modelling"],
  },
  {
    category: "Education",
    icon: GraduationCap,
    items: ["Master's in Data Science", "George Washington University", "GPA 4.0", "Global Leaders Fellowship"],
    coursework: ["Data Visualization", "Machine Learning", "Data Mining", "NLP", "Deep Learning", "Cloud Computing", "Algorithm Design", "Linux for DevOps"],
  },
];

const achievements = [
  {
    icon: Briefcase,
    title: "2+ Years",
    description: "Professional Experience in Data Science",
  },
  {
    icon: Award,
    title: "Global Leaders",
    description: "Fellowship Recipient recognized for academic excellence @ GW",
  },
  {
    icon: Rocket,
    title: "10+ Projects",
    description: "End-to-end Deployments",
  },
  {
    icon: BookOpen,
    title: "Published",
    description: "IJSREM Journal on ML",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
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

          <div className="flex-1 border-2 border-black dark:border-white rounded-md p-6 space-y-4 text-foreground leading-relaxed">
            <p className="text-justify">
              It all started with me asking too many "why's" until I discovered that data had a language for every one of them. What began as curiosity turned into a lifelong fascination with how information shapes the world around us.
            </p>
            <p className="text-justify">
              I'm Aditya Kanbargi, a data scientist who believes the best insights come from combining rigorous analysis with a sense of human context. For me, data isn't just numbers and models; it's a way to understand people, decisions, and the little patterns that make big things happen. It all started with me staring at a dataset like it was a mystery novel, every column a clue and every row a story, and I've been hooked on solving those stories ever since.
            </p>
            <p className="text-justify">
              I'm currently pursuing my Master's in Data Science at The George Washington University (GPA 4.0), where I was awarded the Global Leaders Fellowship for academic excellence. Between projects on machine learning, NLP, and cloud computing, I've learned that the magic of data science lies in connecting technical depth with real-world impact.
            </p>
            <p className="text-justify">
              Over the past few years, I've worked across public health and enterprise analytics, building everything from early-warning prediction systems that help clinicians act faster to dashboards that power smarter business decisions.
            </p>
            <p className="text-justify">
              I'm fluent in Python, R, and SQL, and love experimenting with TensorFlow, PyTorch, and LangChain. Whether it's designing an LLM-powered research assistant or optimizing a data workflow in the cloud, I enjoy building solutions that feel as good to use as they are to explain.
            </p>
            <p className="text-justify">
              Outside the world of code and models, you'll probably find me at the gym, watching football, or diving into a good read. I'm driven by curiosity, caffeine, and the thrill of turning raw data into something that tells a great story — one that actually means something.
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
      </div>
    </section>
  );
}
