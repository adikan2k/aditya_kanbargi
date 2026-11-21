import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Preloader from "@/components/motion/Preloader";

const INTRO_KEY = "ak-intro-seen";

function introAlreadySeen() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

export default function Home() {
  const reduced = useReducedMotion();
  // The site always opens in dark mode. The toggle still switches themes for
  // the current visit, but the choice is not remembered across page loads.
  const [isDark, setIsDark] = useState(true);
  // The intro plays once per browser session, and never when motion is reduced.
  const [showIntro] = useState(() => !introAlreadySeen());
  const [introDone, setIntroDone] = useState(false);
  const ready = introDone || !showIntro || Boolean(reduced);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const finishIntro = () => {
    setIntroDone(true);
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      // Storage can be unavailable; the intro then simply plays again next load.
    }
  };

  return (
    <div className="min-h-screen">
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <div className="grain" aria-hidden="true" />
      {showIntro && !reduced && !introDone && <Preloader onDone={finishIntro} />}

      <Navigation onThemeToggle={toggleTheme} isDark={isDark} />
      <main>
        <Hero isDark={isDark} ready={ready} />
        <Projects />
        <Experience />
        <About />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
