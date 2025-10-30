import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, Home, User, Briefcase, FolderOpen, Code2, Mail } from "lucide-react";

interface NavigationProps {
  onThemeToggle?: () => void;
  isDark?: boolean;
}

export default function Navigation({
  onThemeToggle,
  isDark = false,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Track active section
      const sections = ["home", "about", "experience", "projects", "tech-stack", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section === "home" ? "hero" : section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero", icon: Home },
    { label: "About", href: "#about", icon: User },
    { label: "Experience", href: "#experience", icon: Briefcase },
    { label: "Projects", href: "#projects", icon: FolderOpen },
    { label: "Tech Stack", href: "#tech-stack", icon: Code2 },
    { label: "Contact", href: "#contact", icon: Mail },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="font-bold text-2xl tracking-tight">
            <a 
              href="#" 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover-elevate active-elevate-2 px-3 py-1 rounded-lg inline-block transition-all duration-300"
            >
              AK
            </a>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <Button
                  key={link.href}
                  variant="ghost"
                  onClick={() => handleNavClick(link.href)}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  className={`gap-2 transition-all duration-300 hover-elevate active-elevate-2 ${
                    isActive ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-medium">{link.label}</span>
                </Button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={onThemeToggle}
              data-testid="button-theme-toggle"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-in slide-in-from-top duration-300">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <Button
                  key={link.href}
                  variant="ghost"
                  className={`w-full justify-start gap-3 hover-elevate active-elevate-2 ${
                    isActive ? "bg-primary/10 text-primary" : ""
                  }`}
                  onClick={() => handleNavClick(link.href)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
