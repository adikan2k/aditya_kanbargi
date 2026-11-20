import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface DotFieldProps {
  isDark: boolean;
}

/**
 * Hero background: a grid of dots with a slow wave moving through it. Near the
 * mouse the dots swell, turn the accent colour and get pushed outward, like a
 * lens passing over data. Pauses when off screen.
 */
export default function DotField({ isDark }: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const SPACING = 30;
    const RADIUS = 240;
    const base = isDark ? "236, 233, 225" : "18, 18, 20";
    const accent = isDark ? "199, 255, 51" : "70, 120, 0";

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      // Ease the lens toward the real mouse position so it glides.
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

      const t = time * 0.0006;
      for (let gy = SPACING / 2; gy < height; gy += SPACING) {
        for (let gx = SPACING / 2; gx < width; gx += SPACING) {
          const wave = Math.sin(gx * 0.011 + t * 1.7) * Math.cos(gy * 0.014 - t) * 0.5 + 0.5;
          const dx = gx - mouse.x;
          const dy = gy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pull = dist < RADIUS ? 1 - dist / RADIUS : 0;
          const eased = pull * pull;

          const push = eased * 16;
          const px = dist > 0.001 ? gx + (dx / dist) * push : gx;
          const py = dist > 0.001 ? gy + (dy / dist) * push : gy;
          const r = 0.7 + wave * 0.8 + eased * 2.4;

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle =
            eased > 0.02
              ? `rgba(${accent}, ${Math.min(1, 0.25 + eased * 0.9)})`
              : `rgba(${base}, ${0.07 + wave * 0.16})`;
          ctx.fill();
        }
      }
    };

    const loop = (time: number) => {
      draw(time);
      if (running) frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };

    const onResize = () => {
      resize();
      if (!running) draw(0);
    };

    resize();
    draw(0);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    observer.observe(canvas);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [isDark, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{
        maskImage: "radial-gradient(ellipse 85% 75% at 50% 45%, black 35%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 45%, black 35%, transparent 100%)",
      }}
    />
  );
}
