import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Sparkles, Brain, Compass, Globe, ChefHat, Mail, Code2 } from "lucide-react";
import { SiLinkedin, SiGithub, SiGmail } from "react-icons/si";
import NetworkBackground from "./NetworkBackground";

interface HeroProps {
  onBookMeeting?: () => void;
  onViewWork?: () => void;
  isDark?: boolean;
}

const typewriterPhrases = [
  { text: "Data Alchemist", icon: Sparkles, color: "text-blue-400" },
  { text: "AI Enthusiast", icon: Brain, color: "text-purple-400" },
  { text: "Machine Learning Engineer", icon: Code2, color: "text-pink-400" },
  { text: "Curious Voyager", icon: Compass, color: "text-emerald-400" },
  { text: "Digital Explorer", icon: Globe, color: "text-cyan-400" },
  { text: "Culinary Creator", icon: ChefHat, color: "text-orange-400" },
];

export default function Hero({ onBookMeeting, onViewWork, isDark = false }: HeroProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentPhrase = typewriterPhrases[currentPhraseIndex].text;
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentPhrase.length) {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentPhraseIndex]);

  const CurrentIcon = typewriterPhrases[currentPhraseIndex].icon;
  const currentColor = typewriterPhrases[currentPhraseIndex].color;

  return (
    <section id="hero" className={`relative min-h-screen flex items-center overflow-hidden ${
      isDark ? "bg-slate-950" : "bg-slate-50"
    }`}>
      <NetworkBackground isDark={isDark} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                    isDark ? "bg-blue-500" : "bg-indigo-600"
                  }`}
                  style={{
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
            <span className={`text-sm md:text-base font-semibold tracking-widest uppercase ${
              isDark ? "text-blue-400" : "text-indigo-700"
            }`}>
              Decoding Data With
            </span>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                    isDark ? "bg-blue-500" : "bg-indigo-600"
                  }`}
                  style={{
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Aditya Kanbargi
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8 min-h-[3.5rem]">
            <div className={`text-2xl md:text-3xl lg:text-4xl font-bold ${currentColor}`}>
              {displayedText}
              <span
                className={`inline-block w-0.5 h-8 md:h-10 lg:h-12 ml-1 ${currentColor} ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
            <CurrentIcon className={`h-7 w-7 md:h-9 md:w-9 lg:h-10 lg:w-10 ${currentColor} animate-pulse`} />
          </div>

          <div className="mb-10">
            <p className={`text-xl md:text-2xl font-semibold tracking-wide ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}>
              Turning digital chaos into elegant insight.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
            <a
              href="https://linkedin.com/in/adityakanbargi"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 hover-elevate active-elevate-2 ${
                isDark ? "bg-slate-800/50 hover:bg-blue-600" : "bg-white hover:bg-blue-600"
              }`}
              data-testid="link-linkedin"
            >
              <SiLinkedin className={`h-6 w-6 transition-colors duration-300 ${
                isDark ? "text-blue-400 group-hover:text-white" : "text-blue-600 group-hover:text-white"
              }`} />
            </a>
            <a
              href="https://github.com/adityakanbargi"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 hover-elevate active-elevate-2 ${
                isDark ? "bg-slate-800/50 hover:bg-slate-700" : "bg-white hover:bg-slate-800"
              }`}
              data-testid="link-github"
            >
              <SiGithub className={`h-6 w-6 transition-colors duration-300 ${
                isDark ? "text-slate-300 group-hover:text-white" : "text-slate-700 group-hover:text-white"
              }`} />
            </a>
            <a
              href="mailto:aditya@kanbargi.com"
              className={`group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 hover-elevate active-elevate-2 ${
                isDark ? "bg-slate-800/50 hover:bg-red-600" : "bg-white hover:bg-red-600"
              }`}
              data-testid="link-email"
            >
              <SiGmail className={`h-6 w-6 transition-colors duration-300 ${
                isDark ? "text-red-400 group-hover:text-white" : "text-red-600 group-hover:text-white"
              }`} />
            </a>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onBookMeeting}
              data-testid="button-book-meeting"
            >
              <Calendar className="h-5 w-5" />
              Book a Meeting
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`gap-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
                isDark 
                  ? "bg-slate-800/50 border-slate-600 text-slate-200 hover:bg-slate-700" 
                  : "bg-white border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
              onClick={onViewWork}
              data-testid="button-view-work"
            >
              View My Work
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
