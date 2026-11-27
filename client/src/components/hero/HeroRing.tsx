import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import llHome from "@assets/ring/labellens-home.webp";
import llAsk from "@assets/ring/labellens-ask.webp";
import llDashboard from "@assets/ring/labellens-dashboard.webp";
import llProduct from "@assets/ring/labellens-product.webp";
import evAudit from "@assets/ring/evidentia-audit.webp";
import evResearch from "@assets/ring/evidentia-research.webp";
import evEvals from "@assets/ring/evidentia-evals.webp";
import ogLab from "@assets/ring/orbitglass-lab.webp";
import ogTrace from "@assets/ring/orbitglass-trace.webp";
import lumina from "@assets/ring/lumina.webp";
import riskmetric from "@assets/ring/riskmetric.webp";
import nutrimap from "@assets/ring/nutrimap.webp";
import { featured } from "@/content/featured";
import { Cite } from "../cite/Cite";
import { scrollToId, useFinePointer } from "@/lib/motion";
import { FitName, HeroActions, LINE, TITLE } from "./shared";

/** `anchor` is where a click lands: the project's own section, or the index of earlier projects. */
const PROJECTS = {
  labellens: { anchor: "labellens", name: "LabelLens", line: "A million US food labels, made searchable", glow: "16 76% 30%" },
  evidentia: { anchor: "evidentia", name: "Evidentia", line: "Researches a question, and audits AI answers", glow: "222 72% 34%" },
  orbitglass: { anchor: "orbitglass", name: "OrbitGlass", line: "Why language models get stuck in loops", glow: "128 40% 21%" },
  lumina: { anchor: "index", name: "Lumina", line: "US grid demand and what renewables cost", glow: "190 72% 24%" },
  riskmetric: { anchor: "index", name: "RiskMetric", line: "Fraud detection with spatial and temporal risk", glow: "352 62% 28%" },
  nutrimap: { anchor: "index", name: "NutriMap", line: "Food deserts and grocery inflation", glow: "30 82% 27%" },
} as const;

interface Screen {
  project: keyof typeof PROJECTS;
  /** Which page or view of the project this is. */
  view: string;
  /** What the browser bar shows: the live address, or the tool the screens come from. */
  bar: string;
  /** A live site (the bar shows a green dot when it is in front). */
  site: boolean;
  src: string;
  alt: string;
  /** Height over width of the capture: the screen in front scrolls through it. */
  tall: number;
}

const LL = "labellens-beige.vercel.app";
const EV = "evidentia-green.vercel.app";
const OG = "adikan2k.github.io/orbitglass";

// Twelve screens, one per place on the ring. Neighbours are always different projects.
const SCREENS: Screen[] = [
  { project: "labellens", view: "Home and search", bar: LL, site: true, src: llHome, alt: "LabelLens home page with product search", tall: 1.5455 },
  { project: "evidentia", view: "Auditing an answer", bar: EV, site: true, src: evAudit, alt: "Evidentia auditing an AI answer sentence by sentence", tall: 1.7364 },
  { project: "orbitglass", view: "The lab", bar: OG, site: true, src: ogLab, alt: "OrbitGlass lab home", tall: 1.1055 },
  { project: "lumina", view: "Looker Studio dashboards", bar: "Lumina · Looker Studio", site: false, src: lumina, alt: "Lumina dashboards of US grid demand and renewable prices", tall: 1.6964 },
  { project: "labellens", view: "Ask agent", bar: `${LL}/ask`, site: true, src: llAsk, alt: "LabelLens ask agent answering a question step by step", tall: 1.15 },
  { project: "evidentia", view: "Research agent", bar: `${EV}/research`, site: true, src: evResearch, alt: "Evidentia research run with a quote for every claim", tall: 1.7364 },
  { project: "riskmetric", view: "Streamlit app", bar: "RiskMetric · Streamlit", site: false, src: riskmetric, alt: "RiskMetric fraud detection app with a triage queue", tall: 1.4818 },
  { project: "labellens", view: "Dashboard", bar: `${LL}/dashboard`, site: true, src: llDashboard, alt: "LabelLens dashboard of the US label landscape", tall: 1.2364 },
  { project: "orbitglass", view: "Experiments", bar: `${OG}/#lab`, site: true, src: ogTrace, alt: "OrbitGlass experiments: repetition atlas, logistic map and toy transformer", tall: 1.5973 },
  { project: "evidentia", view: "Evals", bar: `${EV}/evals`, site: true, src: evEvals, alt: "Evidentia evaluation results", tall: 1.7364 },
  { project: "labellens", view: "A product page", bar: `${LL}/product`, site: true, src: llProduct, alt: "LabelLens product page for a breakfast cereal", tall: 1.4082 },
  { project: "nutrimap", view: "Power BI report", bar: "NutriMap · Power BI", site: false, src: nutrimap, alt: "NutriMap report on food deserts and grocery prices", tall: 1.6882 },
];
const CARDS = SCREENS;
const COUNT = CARDS.length;
const STEP = 360 / COUNT;
const BAR = 30;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Smallest signed angle, in degrees, between a card and the front of the ring. */
function fromFront(index: number, rot: number) {
  const a = (((index * STEP + rot) % 360) + 540) % 360;
  return a - 180;
}

/**
 * The first screen is the work: twelve real screens from six projects on a ring that
 * turns when dragged. The screen in front scrolls through its own page, and clicking
 * it goes to the project.
 */
export default function HeroRing() {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 600, h: 375, r: 1240, cy: 220 });
  const [front, setFront] = useState(0);
  const [taught, setTaught] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);

  const rot = useMotionValue(reduced ? 0 : 64);
  const intro = useMotionValue(reduced ? 1 : 0);
  const tiltX = useSpring(0, { stiffness: 60, damping: 16 });
  const tiltY = useSpring(0, { stiffness: 60, damping: 16 });
  const discX = useSpring(0, { stiffness: 320, damping: 30 });
  const discY = useSpring(0, { stiffness: 320, damping: 30 });
  const radius = useMotionValue(size.r);
  const depth = useTransform(radius, (r) => -r);

  // Scrolling on, the ring leans back, as if set down on a table.
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const lean = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 22]);
  const pitch = useTransform([tiltX, lean], ([t, l]) => (t as number) + (l as number));
  const turn = useTransform([rot, tiltY], ([r, t]) => (r as number) + (t as number));
  const ringTransform = useMotionTemplate`translateZ(${depth}px) rotateX(${pitch}deg) rotateY(${turn}deg)`;
  const stageScale = useTransform(intro, [0, 1], [0.84, 1]);
  const stageOpacity = useTransform(intro, [0, 0.5], [0, 1]);

  const drag = useRef({ active: false, moved: false, startX: 0, startRot: 0, lastX: 0, lastT: 0, velocity: 0 });
  const lastTouch = useRef(0);
  const stop = useRef<{ stop: () => void } | null>(null);

  // Card size follows the room there is; the ring's radius follows the card.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => {
      const narrow = el.clientWidth < 640;
      const byHeight = (el.clientHeight - BAR - 30) / (0.625 * 1.2);
      const w = Math.round(Math.max(220, Math.min(780, el.clientWidth * (narrow ? 0.86 : 0.74), byHeight)));
      const h = Math.round(w * 0.625);
      const r = Math.round((w * 1.08) / (2 * Math.sin((STEP * Math.PI) / 360)));
      // Sit the screen in the middle of the room left once its reflection is counted.
      setSize({ w, h, r, cy: Math.round(Math.max(10 + (BAR + h) / 2, (el.clientHeight - h * 0.2) / 2)) });
      radius.set(r);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [radius]);

  const settle = (target: number, slow = false) => {
    stop.current?.stop();
    stop.current = animate(
      rot,
      Math.round(target / STEP) * STEP,
      slow ? { duration: 1.5, ease: [0.65, 0, 0.35, 1] } : { type: "spring", stiffness: 70, damping: 18, mass: 1 },
    );
  };
  const step = (dir: 1 | -1) => {
    lastTouch.current = performance.now();
    settle(Math.round(rot.get() / STEP) * STEP - dir * STEP);
  };
  const bringToFront = (index: number) => {
    lastTouch.current = performance.now();
    settle(rot.get() - fromFront(index, rot.get()));
  };

  // On open the ring swings round into place.
  useEffect(() => {
    if (reduced) return;
    lastTouch.current = performance.now();
    const a = animate(intro, 1, { duration: 1.5, ease: EASE_OUT });
    const b = animate(rot, 0, { duration: 1.9, ease: EASE_OUT });
    stop.current = b;
    return () => {
      a.stop();
      b.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useMotionValueEvent(rot, "change", (v) => {
    const i = ((Math.round(-v / STEP) % COUNT) + COUNT) % COUNT;
    setFront((prev) => (prev === i ? prev : i));
  });

  // Left alone, the ring moves on to the next screen every few seconds.
  useAnimationFrame(() => {
    if (reduced || drag.current.active || hovering) return;
    const now = performance.now();
    if (now - lastTouch.current < 8000) return;
    lastTouch.current = now;
    settle(Math.round(rot.get() / STEP) * STEP - STEP, true);
  });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    stop.current?.stop();
    const d = drag.current;
    Object.assign(d, { active: true, moved: false, startX: e.clientX, startRot: rot.get(), lastX: e.clientX, lastT: performance.now(), velocity: 0 });
    const perPixel = STEP / (size.w * 1.08);
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - d.startX;
      if (Math.abs(dx) > 5 && !d.moved) {
        d.moved = true;
        setDragging(true);
      }
      const now = performance.now();
      if (now > d.lastT) d.velocity = ((ev.clientX - d.lastX) * perPixel * 1000) / (now - d.lastT);
      d.lastX = ev.clientX;
      d.lastT = now;
      rot.set(d.startRot + dx * perPixel);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      d.active = false;
      setDragging(false);
      lastTouch.current = performance.now();
      if (d.moved) {
        setTaught(true);
        const fling = performance.now() - d.lastT < 80 ? d.velocity * 0.22 : 0;
        const steps = (rot.get() - d.startRot + Math.max(-STEP * 2, Math.min(STEP * 2, fling))) / STEP;
        const whole = Math.abs(steps) < 0.12 ? 0 : Math.sign(steps) * Math.max(1, Math.round(Math.abs(steps)));
        settle(Math.round(d.startRot / STEP) * STEP + whole * STEP);
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = stage.current;
    if (!el || !fine) return;
    const box = el.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    if (!reduced) {
      tiltY.set((x / box.width - 0.5) * 8);
      tiltX.set(-(y / box.height - 0.5) * 6);
    }
    discX.set(x + 22);
    discY.set(y + 22);
    // Where the light falls on the front screen, as a share of its width and height.
    el.style.setProperty("--gx", `${((x - (box.width - size.w) / 2) / size.w) * 100}%`);
    el.style.setProperty("--gy", `${((y - (size.cy - (BAR + size.h) / 2)) / (BAR + size.h)) * 100}%`);
  };

  const card = CARDS[front];
  const project = PROJECTS[card.project];
  const paper = featured.find((p) => p.id === card.project);
  const glowMask = "radial-gradient(58% 46% at 50% 32%, black, transparent 74%)";

  return (
    <section id="top" ref={section} aria-labelledby="hero-title" className="relative flex h-[100svh] min-h-[660px] flex-col overflow-hidden pt-[68px]">
      {/* The glow behind the ring takes the colour of the project in front. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-[background-color] duration-1000"
        style={{ backgroundColor: `hsl(${project.glow} / 0.6)`, maskImage: glowMask, WebkitMaskImage: glowMask }}
      />

      <div
        ref={stage}
        className="relative min-h-0 flex-1 cursor-grab touch-pan-y select-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => {
          setHovering(false);
          tiltX.set(0);
          tiltY.set(0);
        }}
      >
        <motion.div className="absolute inset-0" style={{ perspective: "1700px", perspectiveOrigin: `50% ${size.cy}px`, scale: stageScale, opacity: stageOpacity }}>
          <motion.div className="absolute left-1/2 h-0 w-0" style={{ top: size.cy, transformStyle: "preserve-3d", transform: ringTransform }}>
            {CARDS.map((c, i) => (
              <RingCard
                key={i}
                index={i}
                rot={rot}
                size={size}
                screen={c}
                isFront={i === front}
                live={i === front && !dragging && !reduced}
                glare={i === front && hovering && fine}
                eager={i < 2 || i === COUNT - 1}
                onPick={() => {
                  if (drag.current.moved) return;
                  if (i === front) scrollToId(PROJECTS[c.project].anchor);
                  else bringToFront(i);
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {fine && !taught && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 grid h-[68px] w-[68px] place-items-center rounded-full bg-cite font-sans text-[13px] font-bold text-cite-ink"
            style={{ x: discX, y: discY }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.6 }}
            transition={{ duration: 0.2 }}
          >
            Drag
          </motion.div>
        )}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-10">
        <div className="flex items-center justify-between gap-4 pb-3 md:pb-4">
          <motion.div
            key={card.src}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-0.5 font-sans"
          >
            <a
              href={`#${project.anchor}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(project.anchor);
              }}
              className="group flex items-baseline gap-2"
            >
              <span className="display text-[22px] md:text-[26px]">{project.name}</span>
              <ArrowDown className="h-4 w-4 shrink-0 translate-y-0.5 text-cite transition-transform duration-200 group-hover:translate-y-1.5" aria-hidden="true" />
              <span className="sr-only">Go to this project</span>
            </a>
            <span className="text-[14px] font-medium text-faint md:text-[15px]">{card.view}</span>
            <span className="hidden text-[15px] text-muted-foreground md:inline md:text-[16px]">{project.line}</span>
            {paper && (
              <span className="hidden text-[15px] text-muted-foreground xl:inline">
                <span className="figure-nums mx-1 font-semibold text-cite">{paper.headline.value}</span>
                <Cite id={paper.headline.cite} before={paper.headline.note} />
              </span>
            )}
          </motion.div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="figure-nums hidden font-sans text-[13px] text-faint sm:inline" aria-hidden="true">
              {String(front + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => step(-1)} aria-label="Previous screen" className="press grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-foreground">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next screen" className="press grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-foreground">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-x-10 gap-y-2 border-t border-border pt-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="display text-[22px] md:text-[27px]" style={{ fontStretch: "105%", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {TITLE}
          </p>
          <p className="font-sans text-[15px] leading-snug text-muted-foreground md:text-[17px]">{LINE}</p>
          <HeroActions />
        </div>

        <FitName className="pb-5 pt-4 md:pb-6 md:pt-5" />
      </div>
    </section>
  );
}

interface RingCardProps {
  index: number;
  rot: MotionValue<number>;
  size: { w: number; h: number; r: number };
  screen: Screen;
  isFront: boolean;
  /** In front and at rest: the page inside scrolls. */
  live: boolean;
  glare: boolean;
  eager: boolean;
  onPick: () => void;
}

/**
 * One screen on the ring, in a browser frame, with its reflection on the floor. It
 * dims as it turns away and disappears round the back.
 */
function RingCard({ index, rot, size, screen, isFront, live, glare, eager, onPick }: RingCardProps) {
  const { w, h, r } = size;
  const shade = useTransform(rot, (v) => Math.min(0.8, (Math.abs(fromFront(index, v)) / 70) * 0.66));
  const visibility = useTransform(rot, (v) => (Math.abs(fromFront(index, v)) > 95 ? "hidden" : "visible"));
  const travel = Math.max(0, Math.round(w * screen.tall - h));
  const total = BAR + h;
  const fade = "linear-gradient(to top, black, transparent 26%)";

  return (
    <motion.div
      className="absolute"
      style={{
        width: w,
        height: total,
        marginLeft: -w / 2,
        marginTop: -total / 2,
        transform: `rotateY(${index * STEP}deg) translateZ(${r}px)`,
        transformStyle: "preserve-3d",
        visibility,
      }}
    >
      <div
        className={`absolute inset-0 overflow-hidden rounded-xl border bg-card shadow-[0_50px_90px_rgba(0,0,0,0.55)] transition-[border-color] duration-500 ${isFront ? "border-white/30" : "border-white/10"}`}
        style={{ backfaceVisibility: "hidden" }}
        onClick={onPick}
      >
        <div className="flex items-center gap-1.5 border-b border-black/10 bg-[#e9e3d6] px-3" style={{ height: BAR }}>
          <span className="h-2 w-2 rounded-full bg-black/20" />
          <span className="h-2 w-2 rounded-full bg-black/20" />
          <span className="h-2 w-2 rounded-full bg-black/20" />
          <span className="ml-2 truncate rounded bg-black/[0.07] px-2 py-[3px] font-mono text-[10.5px] leading-none text-black/60">{screen.bar}</span>
          <span className={`ml-auto h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500 ${isFront && screen.site ? "bg-emerald-600" : "bg-black/20"}`} />
        </div>
        <div className="relative overflow-hidden" style={{ height: h }}>
          <img
            src={screen.src}
            alt={screen.alt}
            draggable={false}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className={`block w-full ${live && travel > 0 ? "ring-pan" : ""}`}
            style={{ ["--pan" as string]: `${-travel}px`, ["--pan-time" as string]: `${Math.max(5, travel / 62)}s` }}
          />
        </div>
        {glare && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{ background: "radial-gradient(circle at var(--gx, 50%) var(--gy, 40%), rgba(255,255,255,0.55), transparent 42%)" }}
          />
        )}
        <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-background" style={{ opacity: shade }} />
      </div>

      {/* The floor's reflection: the same screen, upside down, fading out. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 w-full overflow-hidden rounded-xl"
        style={{ top: total + 10, height: total, transform: "scaleY(-1)", backfaceVisibility: "hidden", opacity: 0.34, maskImage: fade, WebkitMaskImage: fade }}
      >
        <div className="bg-[#e9e3d6]" style={{ height: BAR }} />
        <div className="overflow-hidden" style={{ height: h }}>
          <img src={screen.src} alt="" draggable={false} loading="lazy" decoding="async" className={`block w-full`} />
        </div>
        <motion.span className="absolute inset-0 bg-background" style={{ opacity: shade }} />
      </div>
    </motion.div>
  );
}
