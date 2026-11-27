import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TryIt from "@/components/tryit/TryIt";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";

export default function Home() {
  // The site always opens in the dark (ink) theme. The toggle switches to paper for the
  // current visit; the choice is not remembered across page loads.
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next ? "#0d1322" : "#f3eee3");
  };

  return (
    <div className="min-h-screen">
      <SmoothScroll />
      <ScrollProgress />
      <Navigation onThemeToggle={toggleTheme} isDark={isDark} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <TryIt />
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
