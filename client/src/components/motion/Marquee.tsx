import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

interface MarqueeProps {
  children: ReactNode;
  /** Percent of one copy's width travelled per second. Negative runs right to left. */
  speed?: number;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/**
 * An endless band of content. It drifts on its own, speeds up while the page is
 * being scrolled, and flips direction when the scroll direction flips.
 */
export default function Marquee({ children, speed = -4, className }: MarqueeProps) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const direction = useRef(1);

  // Four copies sit side by side; moving by 25% of the track is one full copy.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    const perSecond = (speed / 4) * direction.current;
    baseX.set(baseX.get() + perSecond * (1 + Math.abs(factor)) * (delta / 1000));
  });

  return (
    <div className={`overflow-hidden ${className ?? ""}`} aria-hidden="true">
      <motion.div className="flex w-max flex-nowrap will-change-transform" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 flex-nowrap items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
