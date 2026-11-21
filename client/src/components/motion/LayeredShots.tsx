import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

export interface Shot {
  src: string;
  alt: string;
  href: string;
}

interface LayeredShotsProps {
  back: Shot;
  front: Shot;
  className?: string;
}

/**
 * Two product screens, one overlapping the other. On wide screens they drift at
 * different speeds as the page scrolls; on phones they simply stack.
 * Each screen is cropped to 16:10 from the top, so taller screenshots fit too.
 */
export default function LayeredShots({ back, front, className }: LayeredShotsProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["6%", "-6%"]);
  const frontY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["14%", "-14%"]);

  const panels = [
    { shot: back, y: backY, delay: 0, place: "md:left-0 md:top-0 md:w-[64%]", extra: "" },
    { shot: front, y: frontY, delay: 0.15, place: "md:bottom-0 md:right-0 md:w-[48%]", extra: "shadow-2xl shadow-black/50" },
  ];

  return (
    <div ref={ref} className={`relative grid grid-cols-1 gap-4 md:block md:h-[min(52vw,760px)] ${className ?? ""}`}>
      {panels.map(({ shot, y, delay, place, extra }) => (
        <motion.a
          key={shot.src}
          href={shot.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Open"
          className={`block md:absolute ${place}`}
          style={{ y }}
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: reduced ? 0.01 : 1.1, ease: EASE, delay: reduced ? 0 : delay }}
        >
          <img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            className={`aspect-[16/10] w-full rounded-xl border border-border object-cover object-top ${extra}`}
          />
        </motion.a>
      ))}
    </div>
  );
}
