import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { EASE } from "@/lib/motion";

interface PreloaderProps {
  /** Called once the curtain has fully lifted. */
  onDone: () => void;
}

/** Short intro: a counter runs to 100, then the curtain lifts to show the page. */
export default function Preloader({ onDone }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const controls = animate(0, 100, {
      duration: 1.15,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setOpen(false),
    });
    return () => {
      controls.stop();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        onDone();
      }}
    >
      {open && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-background p-6 md:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="label-mono">Aditya Kanbargi</span>
            <span className="label-mono">AI and Analytics Engineer</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="label-mono text-muted-foreground">Loading the work</span>
            <span className="display text-[clamp(5rem,22vw,18rem)] leading-[0.8] tabular-nums">
              {String(count).padStart(2, "0")}
              <span className="text-signal-text">%</span>
            </span>
          </div>
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-signal"
            style={{ scaleX: count / 100 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
