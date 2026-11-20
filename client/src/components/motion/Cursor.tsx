import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "@/lib/motion";

type CursorState = { mode: "default" | "link" | "label"; label: string };

/**
 * A ring that trails the mouse. It grows over links and buttons, and turns into
 * a labelled disc over any element with a `data-cursor="Some label"` attribute.
 * The native cursor stays visible.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 420, damping: 38, mass: 0.6 });
  const [state, setState] = useState<CursorState>({ mode: "default", label: "" });
  const [visible, setVisible] = useState(false);

  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    let lastTarget: HTMLElement | null = null;

    const read = (target: HTMLElement | null) => {
      if (!target?.closest) return;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setState({ mode: "label", label: labelled.dataset.cursor || "" });
        return;
      }
      if (target.closest("a, button, [role='button'], input, textarea")) {
        setState({ mode: "link", label: "" });
        return;
      }
      setState({ mode: "default", label: "" });
    };

    const onOver = (e: MouseEvent) => {
      lastTarget = e.target as HTMLElement | null;
      read(lastTarget);
    };

    // A click can change the label of the element under the mouse (Open becomes Close).
    const onClick = () => window.setTimeout(() => read(lastTarget), 0);

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("click", onClick);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = state.mode === "label" ? 92 : state.mode === "link" ? 52 : 14;

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[90] ${
        state.mode === "label" ? "" : "mix-blend-difference"
      }`}
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className={`flex items-center justify-center rounded-full ${
          state.mode === "label"
            ? "bg-signal text-[hsl(240_7%_5%)]"
            : state.mode === "link"
              ? "border border-white bg-transparent"
              : "bg-white"
        }`}
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        {state.mode === "label" && (
          <span className="label-mono text-[10px] font-medium">{state.label}</span>
        )}
      </motion.div>
    </motion.div>
  );
}
