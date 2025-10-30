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
      const sections = ["home", "about", "experience", "tech-stack", "projects", "contact"];
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
    { label: "Tech Stack", href: "#tech-stack", icon: Code2 },
    { label: "Projects", href: "#projects", icon: FolderOpen },
    { label: "Contact", href: "#contact", icon: Mail },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="relative group">
            <a 
              href="#" 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`relative flex items-center justify-center w-12 h-12 font-bold text-xl tracking-tight rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                isDark 
                  ? "bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white" 
                  : "bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white"
              }`}
            >
              <span className="relative z-10">AK</span>
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isDark ? "from-blue-400/20 to-purple-400/20" : "from-indigo-400/20 to-purple-400/20"
              }`} />
            </a>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-card/50 backdrop-blur-sm rounded-full px-2 py-2 border border-card-border">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-visible ${
                    isActive 
                      ? "text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-primary rounded-full shadow-md transition-all duration-300" />
                  )}
                  <Icon className={`h-4 w-4 relative z-10 transition-transform duration-300 ${
                    isActive ? "" : "group-hover:scale-110"
                  }`} />
                  <span className="relative z-10 whitespace-nowrap">{link.label}</span>
                  {!isActive && (
                    <span className="absolute inset-0 rounded-full bg-accent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onThemeToggle}
              data-testid="button-theme-toggle"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-card/50 backdrop-blur-sm border border-card-border hover-elevate active-elevate-2 transition-all duration-300"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-foreground transition-transform duration-300 hover:rotate-90" />
              ) : (
                <Moon className="h-5 w-5 text-foreground transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-card/50 backdrop-blur-sm border border-card-border hover-elevate active-elevate-2 transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border animate-in slide-in-from-top duration-300">
          <div className="px-6 py-6 space-y-2">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "hover-elevate active-elevate-2"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
