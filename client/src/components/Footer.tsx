import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/lib/motion";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // The name rises into place as the footer comes into view.
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["45%", "0%"]);

  return (
    <footer ref={ref} className="mt-28 overflow-hidden border-t border-border md:mt-40">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
        <p>© 2026 Aditya Kanbargi. AI and Analytics Engineer.</p>
        <p>Built with React, TypeScript, Tailwind CSS and Framer Motion.</p>
        <button
          onClick={scrollToTop}
          className="label-mono group flex w-fit items-center gap-3 text-foreground"
          data-testid="button-back-to-top"
        >
          Back to top
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-[hsl(240_7%_5%)]">
            <ArrowUp className="h-4 w-4" />
          </span>
        </button>
      </div>
      <motion.div
        aria-hidden="true"
        className="display select-none whitespace-nowrap px-3 pb-[0.12em] text-center text-[13.2vw] leading-none text-foreground"
        style={{ y }}
      >
        Aditya Kanbargi
      </motion.div>
    </footer>
  );
}
