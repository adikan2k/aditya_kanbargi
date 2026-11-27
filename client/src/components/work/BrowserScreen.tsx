import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Screen } from "@/content/featured";

const BAR = 34;

/**
 * A captured page in a browser frame. While it is on screen it scrolls slowly
 * through the whole page and back, like the front screen of the ring on the first
 * screen. Clicking it opens the live page.
 */
export default function BrowserScreen({ screen }: { screen: Screen }) {
  const reduced = useReducedMotion();
  const box = useRef<HTMLAnchorElement>(null);
  const inView = useInView(box, { amount: 0.35 });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const height = Math.round(width * 0.625);
  const travel = Math.max(0, Math.round(width * screen.tall - height));

  return (
    <a
      ref={box}
      href={screen.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${screen.alt}. Opens the live page.`}
      className="group relative block overflow-hidden rounded-xl border border-white/20 bg-card shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
    >
      <span className="flex items-center gap-1.5 border-b border-black/10 bg-[#e9e3d6] px-3.5" style={{ height: BAR }} aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
        <span className="ml-2 min-w-0 truncate rounded bg-black/[0.07] px-2.5 py-1 font-mono text-[11.5px] leading-none text-black/60">{screen.bar}</span>
        <span className="ml-auto inline-flex shrink-0 items-center gap-1 font-sans text-[12px] font-semibold text-black/55 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Open
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </span>
      <span className="relative block overflow-hidden bg-[#f3efe6]" style={{ height: height || undefined, aspectRatio: height ? undefined : "16 / 10" }}>
        <img
          key={screen.src}
          src={screen.src}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className={`replay-in block w-full ${inView && !reduced && travel > 0 ? "ring-pan" : ""}`}
          style={{ ["--pan" as string]: `${-travel}px`, ["--pan-time" as string]: `${Math.max(6, travel / 55)}s` }}
        />
      </span>
    </a>
  );
}
