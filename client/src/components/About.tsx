import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Zap, Users } from "lucide-react";
import headshotImage from "@assets/generated_images/Professional_headshot_portrait_d6e9d2d3.png";

const skills = [
  {
    category: "Core Competencies",
    items: ["Machine Learning", "Statistical Analysis", "Data Mining", "Predictive Modeling"],
  },
  {
    category: "Programming & Tools",
    items: ["Python", "R", "SQL", "TensorFlow", "PyTorch"],
  },
  {
    category: "Visualization & BI",
    items: ["Tableau", "Power BI", "Matplotlib", "Seaborn"],
  },
];

const achievements = [
  {
    icon: Code2,
    title: "30+ Projects",
    description: "ML models deployed",
  },
  {
    icon: Users,
    title: "20+ Clients",
    description: "Data solutions delivered",
  },
  {
    icon: Zap,
    title: "5+ Years",
    description: "Data science experience",
  },
  {
    icon: Palette,
    title: "Certified",
    description: "AWS & GCP ML",
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

          <div className="flex-1 space-y-4 text-foreground leading-relaxed">
            <p>
              Hi! I'm Aditya, a data scientist passionate about extracting
              insights from complex datasets and building machine learning
              solutions that drive real business impact. With over 5 years in
              the field, I've helped organizations leverage their data to make
              better decisions.
            </p>
            <p>
              I believe great data science is more than algorithms—it's about
              asking the right questions, understanding business context, and
              communicating insights effectively. My approach combines
              statistical rigor with practical problem-solving to deliver
              actionable results.
            </p>
            <p>
              When I'm not analyzing data, you'll find me exploring new ML
              techniques, contributing to open source projects, or sharing
              knowledge through technical writing and mentoring. I'm always
              excited to tackle challenging problems that push the boundaries of
              what's possible with data.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skills.map((skillGroup) => (
            <Card key={skillGroup.category} className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
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
