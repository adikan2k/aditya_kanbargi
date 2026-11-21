import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE, useIsTablet } from "@/lib/motion";

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
 * Two product screens side by side, never overlapping, so neither hides the
 * other. On wide screens the second sits a little lower and the two drift at
 * different speeds as the page scrolls; on phones they simply stack.
 * Each screen is cropped to 16:10 from the top, so taller screenshots fit too.
 *
 * The reveal is a cover that slides off the image, not a clip on the image
 * itself: a fully clipped image counts as off screen, so the browser would not
 * start downloading a lazy image until the reveal had already begun.
 */
export default function LayeredShots({ back, front, className }: LayeredShotsProps) {
  const reduced = useReducedMotion();
  const wide = useIsTablet();
  const drift = wide && !reduced;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backY = useTransform(scrollYProgress, [0, 1], drift ? ["3%", "-3%"] : ["0%", "0%"]);
  const frontY = useTransform(scrollYProgress, [0, 1], drift ? ["12%", "-12%"] : ["0%", "0%"]);

  const panels = [
    { shot: back, y: backY, place: "", frame: "" },
    { shot: front, y: frontY, place: "md:mt-16", frame: "" },
  ];

  return (
    // Both screens reveal together as soon as a sliver of the pair is on screen.
    <motion.div
      ref={ref}
      className={`grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6 md:pb-16 ${className ?? ""}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.05 }}
    >
      {panels.map(({ shot, y, place, frame }, i) => (
        <motion.a
          key={shot.src}
          href={shot.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Open"
          className={`block ${place}`}
          style={{ y }}
        >
          <span className={`relative block overflow-hidden rounded-xl border border-border ${frame}`}>
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="block aspect-[16/10] w-full object-cover object-top"
            />
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom bg-background"
              variants={{
                hidden: { scaleY: reduced ? 0 : 1 },
                shown: {
                  scaleY: 0,
                  transition: { duration: reduced ? 0.01 : 0.85, ease: EASE, delay: reduced ? 0 : i * 0.12 },
                },
              }}
            />
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}
