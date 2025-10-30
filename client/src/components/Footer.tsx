import { Mail, Github, Linkedin, Heart } from "lucide-react";
import headshotImage from "@assets/generated_images/Professional_headshot_portrait_d6e9d2d3.png";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={headshotImage}
                alt="Aditya Kanbargi"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">Aditya Kanbargi</h3>
                <p className="text-sm text-muted-foreground">
                  Data Scientist & ML Engineer
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Transforming data into insights and building ML solutions.
              Available for data science projects and collaboration.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: "About", href: "#about" },
                { label: "Experience", href: "#experience" },
                { label: "Projects", href: "#projects" },
                { label: "Tech Stack", href: "#tech-stack" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector(link.href)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-3 mb-6">
              <a
                href="mailto:adityakan2000@gmail.com"
                className="h-10 w-10 rounded-lg bg-muted hover-elevate flex items-center justify-center"
                data-testid="link-footer-email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/adikan2k"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-muted hover-elevate flex items-center justify-center"
                data-testid="link-footer-github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/adikan2k/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-muted hover-elevate flex items-center justify-center"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Response time: <span className="font-medium">Within 24h</span>
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 Aditya Kanbargi. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" />{" "}
            using React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
