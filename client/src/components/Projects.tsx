import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import webAppImage from "@assets/generated_images/Web_app_project_showcase_83480b2a.png";
import mobileAppImage from "@assets/generated_images/Mobile_app_project_showcase_c25f05fd.png";
import designImage from "@assets/generated_images/Design_project_showcase_d267c0ce.png";

const projects = [
  {
    id: 1,
    title: "Evidentia 📊 🔍",
    description:
      "Agentic AI research framework that transforms messy, multimodal data into clear, citation-rich insights. AI-powered research analyst that plans, navigates, verifies, and synthesizes.",
    image: webAppImage,
    tags: ["LangGraph", "FastAPI", "Next.js", "Qdrant", "Postgres", "LLM Agents"],
    category: "AI",
  },
  {
    id: 2,
    title: "Fitness Tracking App",
    description:
      "Mobile-first progressive web app for tracking workouts and nutrition goals.",
    image: mobileAppImage,
    tags: ["React Native", "Firebase", "TypeScript"],
    category: "Mobile",
  },
  {
    id: 3,
    title: "Brand Identity System",
    description:
      "Complete brand redesign including logo, color system, and design guidelines.",
    image: designImage,
    tags: ["Figma", "Brand Design", "UI/UX"],
    category: "Design",
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description:
      "Real-time data visualization platform with customizable widgets and reports.",
    image: webAppImage,
    tags: ["React", "D3.js", "Express", "MongoDB"],
    category: "Web",
  },
  {
    id: 5,
    title: "Task Management System",
    description:
      "Collaborative project management tool with kanban boards and team features.",
    image: mobileAppImage,
    tags: ["Next.js", "Tailwind", "Prisma"],
    category: "Web",
  },
  {
    id: 6,
    title: "Portfolio Redesign",
    description:
      "Modern portfolio website with smooth animations and interactive elements.",
    image: designImage,
    tags: ["Design System", "Framer Motion", "React"],
    category: "Design",
  },
];

const categories = ["All", "Machine Learning", "AI", "Analytics and Forecasting", "Data Science Foundations", "Deep Learning", "Computer Vision"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
          Featured Projects
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A selection of my recent work spanning web development, mobile apps,
          and creative design projects.
        </p>

        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              data-testid={`button-filter-${category.toLowerCase()}`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover-elevate cursor-pointer group"
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
                  <div className="absolute inset-0 bg-primary/90 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white font-semibold">
                      View Details
                    </span>
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
          ))}
        </div>
      </div>
    </section>
  );
}
