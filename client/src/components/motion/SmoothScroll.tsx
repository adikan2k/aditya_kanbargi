import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

/** Runs inertia scrolling for wheel input. Touch scrolling stays native. */
export default function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [reduced]);

  return null;
}
