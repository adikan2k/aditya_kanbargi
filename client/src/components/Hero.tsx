import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/Professional_workspace_hero_image_1752f486.png";

interface HeroProps {
  onBookMeeting?: () => void;
  onViewWork?: () => void;
}

export default function Hero({ onBookMeeting, onViewWork }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 mb-8">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-white">
              Available for opportunities • Responding within 24h
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Aditya Kanbargi
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium">
            Full-Stack Developer & Creative Problem Solver
          </p>
          <p className="text-lg text-white/80 mb-12 leading-relaxed max-w-2xl">
            Crafting elegant digital experiences that merge functionality with
            beautiful design. Specializing in React, Node.js, and modern web
            technologies.
          </p>

          <div className="flex flex-wrap gap-4">
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
