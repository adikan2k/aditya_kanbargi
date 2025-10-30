import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Zap, Users } from "lucide-react";
import headshotImage from "@assets/generated_images/Professional_headshot_portrait_d6e9d2d3.png";

const skills = [
  {
    category: "Frontend Development",
    items: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    category: "Backend Development",
    items: ["Node.js", "Express", "PostgreSQL", "REST APIs"],
  },
  {
    category: "Tools & Design",
    items: ["Git", "Figma", "Docker", "CI/CD"],
  },
];

const achievements = [
  {
    icon: Code2,
    title: "50+ Projects",
    description: "Successfully delivered",
  },
  {
    icon: Users,
    title: "30+ Clients",
    description: "Satisfied worldwide",
  },
  {
    icon: Zap,
    title: "5 Years",
    description: "Industry experience",
  },
  {
    icon: Palette,
    title: "Award Winner",
    description: "Design excellence",
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
              Hi! I'm Aditya, a passionate full-stack developer with a keen eye
              for design and a love for building seamless digital experiences.
              With over 5 years in the industry, I've helped startups and
              established companies bring their visions to life.
            </p>
            <p>
              I believe great software is more than just code—it's about
              understanding user needs, solving real problems, and creating
              interfaces that feel natural and intuitive. My approach combines
              technical excellence with creative thinking.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open source, or mentoring aspiring developers.
              I'm always excited to collaborate on innovative projects that make
              a difference.
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
