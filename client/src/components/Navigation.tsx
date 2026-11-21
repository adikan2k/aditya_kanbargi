import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { EASE, scrollToId, scrollToTop } from "@/lib/motion";

interface NavigationProps {
  onThemeToggle?: () => void;
  isDark?: boolean;
}

const RESUME_URL = "/Aditya_Kanbargi_Resume.pdf";

const navLinks = [
  { label: "Work", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "About", id: "about" },
  { label: "Stack", id: "tech-stack" },
  { label: "Contact", id: "contact" },
];

export default function Navigation({ onThemeToggle, isDark = true }: NavigationProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  // Hide the bar while scrolling down, bring it back on the way up.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    if (menuOpen) return;
    setHidden(latest > previous && latest > 320);
  });

  useEffect(() => {
    // The hero is watched too, so no link stays marked once the page is back at the top.
    const sections = ["hero", ...navLinks.map((link) => link.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === "hero" ? "" : entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    // Let the menu start closing before the page moves.
    window.setTimeout(() => scrollToId(id), menuOpen ? 250 : 0);
  };

  return (
    <>
      <motion.nav
        className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !menuOpen ? "border-b border-border/60 bg-background/70 backdrop-blur-xl" : "border-b border-transparent"
        }`}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
          <button
            onClick={() => {
              setMenuOpen(false);
              scrollToTop();
            }}
            className="group flex items-center gap-3"
            aria-label="Back to top"
            data-testid="link-nav-home"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
            </span>
            <span className="text-base font-semibold tracking-tight md:text-lg">Aditya Kanbargi</span>
          </button>

          <div className="hidden items-center gap-1 rounded-full border border-border bg-background/80 p-1.5 shadow-lg shadow-black/20 backdrop-blur-xl md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => go(link.id)}
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2.5 font-mono text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 lg:px-5 ${
                    isActive ? "text-[hsl(240_7%_5%)]" : "text-foreground/85 hover:bg-foreground/10 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-signal"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-signal px-5 py-3 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-[hsl(240_7%_5%)] transition-transform duration-300 hover:scale-[1.04] sm:flex"
              data-testid="link-nav-resume"
            >
              Resume
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              onClick={onThemeToggle}
              data-testid="button-theme-toggle"
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-xl transition-colors duration-300 hover:border-foreground"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              className="label-mono flex h-10 items-center rounded-full border border-border px-4 md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              data-testid="button-mobile-menu"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-background px-5 pb-10 pt-28 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex flex-col">
              {navLinks.map((link, i) => (
                <div key={link.id} className="overflow-hidden border-b border-border">
                  <motion.button
                    onClick={() => go(link.id)}
                    className="display flex w-full items-baseline justify-between py-4 text-left text-5xl"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.06 }}
                  >
                    {link.label}
                    <span className="label-mono text-muted-foreground">0{i + 1}</span>
                  </motion.button>
                </div>
              ))}
            </div>
            <motion.a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono flex items-center justify-center gap-2 rounded-full bg-signal py-4 text-[hsl(240_7%_5%)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
            >
              Resume
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
