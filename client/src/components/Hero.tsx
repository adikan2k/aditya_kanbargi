import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, BookOpen, Sparkles, Brain, Compass, Globe, ChefHat } from "lucide-react";
import heroImage from "@assets/generated_images/Professional_workspace_hero_image_1752f486.png";

interface HeroProps {
  onBookMeeting?: () => void;
  onViewWork?: () => void;
}

const typewriterPhrases = [
  { text: "Data Storyteller", icon: BookOpen },
  { text: "AI Enthusiast", icon: Sparkles },
  { text: "Machine learning engineer", icon: Brain },
  { text: "Curious Voyager", icon: Compass },
  { text: "Digital Explorer", icon: Globe },
  { text: "Culinary Creator", icon: ChefHat },
];

export default function Hero({ onBookMeeting, onViewWork }: HeroProps) {
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

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20 animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 3 + "s",
              animationDuration: Math.random() * 3 + 2 + "s",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
            <span className="text-sm md:text-base font-medium text-primary tracking-widest uppercase">
              Decoding Data With
            </span>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8">
            Aditya Kanbargi
          </h1>

          <div className="flex items-center justify-center gap-3 mb-8 min-h-[3rem]">
            <CurrentIcon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary">
              {displayedText}
              <span
                className={`inline-block w-0.5 h-8 md:h-10 lg:h-12 bg-primary ml-1 ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>

          <p className="text-lg md:text-xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto">
            Turning digital chaos into elegant insight. Specializing in machine
            learning, predictive analytics, and data-driven solutions that drive
            business impact.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="gap-2"
              onClick={onBookMeeting}
              data-testid="button-book-meeting"
            >
              <Calendar className="h-5 w-5" />
              Book a Meeting
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20"
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
