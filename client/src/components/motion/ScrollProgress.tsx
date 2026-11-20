import { motion, useScroll, useSpring } from "framer-motion";

/** Thin accent bar across the top that fills as the page is read. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-signal"
      style={{ scaleX }}
    />
  );
}
