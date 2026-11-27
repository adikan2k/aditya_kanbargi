import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { EASE, scrollToId, scrollToTop } from "@/lib/motion";

interface NavigationProps {
  onThemeToggle?: () => void;
  isDark?: boolean;
}

const RESUME_URL = "/Aditya_Kanbargi_Resume.pdf";

const navLinks = [
  { label: "Try it", id: "try" },
  { label: "Work", id: "work" },
  { label: "Experience", id: "experience" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Navigation({ onThemeToggle, isDark = true }: NavigationProps) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  // Hide the bar while scrolling down, bring it back on the way up.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (menuOpen) return;
    setHidden(latest > previous && latest > 400);
  });

  // Mark the section in view. The hero is watched too, so nothing is marked at the top.
  useEffect(() => {
    const sections = ["top", ...navLinks.map((link) => link.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === "top" ? "" : entry.target.id);
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

  const go = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    const wasOpen = menuOpen;
    setMenuOpen(false);
    // Let the menu start closing before the page moves.
    window.setTimeout(() => scrollToId(id), wasOpen ? 250 : 0);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[60] -translate-y-24 rounded-md bg-foreground px-4 py-3 font-sans text-sm font-semibold text-background focus-visible:translate-y-0"
      >
        Skip to content
      </a>

      <motion.header
        className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
          scrolled && !menuOpen ? "border-b border-border bg-background/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        onFocusCapture={() => setHidden(false)}
        transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
      >
        <div className="mx-auto flex h-16 max-w-[1920px] items-center justify-between gap-6 px-5 md:h-[4.5rem] md:px-10 2xl:px-16">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              scrollToTop();
            }}
            className="display whitespace-nowrap py-2.5 text-[1.35rem] leading-none md:text-[1.5rem]"
          >
            Aditya Kanbargi
          </a>

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => go(e, link.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative rounded-md px-3.5 py-2.5 font-sans text-[15px] font-medium transition-colors duration-200 lg:px-4 ${
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-1 left-3.5 right-3.5 h-[2px] origin-left rounded-full bg-foreground/60 transition-transform duration-300 lg:left-4 lg:right-4 ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                        style={{ transitionTimingFunction: "var(--ease-out)" }}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="press hidden items-center gap-1.5 rounded-md bg-foreground px-4 py-2.5 font-sans text-[15px] font-medium text-background transition-colors duration-200 hover:bg-foreground/90 sm:inline-flex"
            >
              Resume
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onThemeToggle}
              aria-label={isDark ? "Switch to the light theme" : "Switch to the dark theme"}
              className="press flex h-11 w-11 items-center justify-center rounded-md border border-border transition-colors duration-200 hover:border-foreground"
            >
              {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
            </button>
            <button
              type="button"
              className="press flex h-11 items-center rounded-md border border-border px-4 font-sans text-[15px] font-medium lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-background px-5 pb-10 pt-24 lg:hidden"
            initial={{ opacity: 0, y: reduced ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <nav aria-label="Sections">
              <ul>
                {navLinks.map((link) => (
                  <li key={link.id} className="border-b border-border">
                    <a href={`#${link.id}`} onClick={(e) => go(e, link.id)} className="display block py-4 text-[2.6rem]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="press flex items-center justify-center gap-2 rounded-md bg-foreground py-4 font-sans text-base font-semibold text-background"
            >
              Resume (PDF)
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
