import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { SiGithub } from "react-icons/si";
import CountUp from "./motion/CountUp";
import Magnetic from "./motion/Magnetic";
import { FadeUp, Lines } from "./motion/Reveal";
import { useIsDesktop } from "@/lib/motion";
import homeShot from "@assets/labellens/hero.webp";
import productShot from "@assets/labellens/product.webp";
import askShot from "@assets/labellens/ask.webp";
import labelReadShot from "@assets/labellens/label-read.webp";
import mcpShot from "@assets/labellens/mcp-in-claude.webp";
import dashboardShot from "@assets/labellens/dashboard.webp";
import graphShot from "@assets/labellens/graph.webp";

const LIVE_URL = "https://labellens-beige.vercel.app";
const HOW_BUILT_URL = "https://labellens-beige.vercel.app/how-its-built";
const CODE_URL = "https://github.com/adikan2k/labellens";
const BUILD_NOTE_URL = "https://github.com/adikan2k/labellens#how-i-built-it";
const MCP_URL = "https://labellens-api-1036759996795.us-east4.run.app/mcp";

const shots = [
  { src: homeShot, w: 1280, h: 1160, title: "Search", caption: "985,260 named US products, searchable by name, brand or barcode." },
  { src: productShot, w: 1280, h: 1000, title: "Product page", caption: "The label explained, every additive looked up, and a better swap." },
  { src: askShot, w: 1280, h: 1250, title: "Ask agent", caption: "A tool-using agent that answers from the data and shows its steps and sources." },
  { src: labelReadShot, w: 1280, h: 1250, title: "Label reader", caption: "Photograph a label and get the Nutrition Facts read back." },
  { src: mcpShot, w: 1137, h: 961, title: "Inside Claude", caption: "An MCP App that renders a label card in the conversation." },
  { src: dashboardShot, w: 1280, h: 1000, title: "Dashboard", caption: "The US label landscape, from 1,002,769 products in the pipeline." },
  { src: graphShot, w: 1280, h: 1250, title: "Food graph", caption: "A Neo4j knowledge graph of products, brands, additives and ingredients." },
];

// Every number is backed by a report in the repo's evals/results/.
const metrics = [
  { to: 985260, decimals: 0, prefix: "", suffix: "", label: "named US products" },
  { to: 0.98, decimals: 2, prefix: "", suffix: "", label: "ask agent fact score, against 0.26 for search alone" },
  { to: 98, decimals: 0, prefix: "", suffix: "%", label: "of nutrient values read correctly from real label photos" },
  { to: 29, decimals: 0, prefix: "", suffix: " / 30", label: "requests where Claude picks the right tool" },
  { to: 175, decimals: 0, prefix: "", suffix: " ms", label: "search at the 95th percentile on the live API" },
  { to: 6, decimals: 0, prefix: "~$", suffix: "", label: "model spend for the whole project, on free-tier hosting" },
];

const parts = [
  { title: "Tested data pipeline", body: "The Open Food Facts export through dbt on DuckDB, with 94 data tests." },
  { title: "AI enrichment", body: "Claude fills in missing categories and writes additive and ingredient explainers through the Batch API." },
  { title: "Storage", body: "Neon Postgres with pgvector, plus a Neo4j knowledge graph." },
  { title: "One API, four surfaces", body: "A FastAPI service on Google Cloud Run behind a Next.js site on Vercel: a tool-using ask agent, a label reader that works from a photo, and an MCP App that renders a label card inside Claude." },
  { title: "Evals for every AI feature", body: "Each one has a published report that lists its misses." },
];

const stack = ["Claude (Haiku, Sonnet as eval judge)", "MCP", "FastAPI", "dbt", "DuckDB", "Postgres + pgvector", "Neo4j", "Next.js", "Google Cloud Run", "Vercel", "Langfuse"];

function ShotPanel({ shot, index, className }: { shot: (typeof shots)[number]; index: number; className: string }) {
  return (
    <figure className="shrink-0">
      <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" data-cursor="Open" className="block">
        <img
          src={shot.src}
          alt={`LabelLens ${shot.title.toLowerCase()} screen`}
          width={shot.w}
          height={shot.h}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={`rounded-xl border border-border object-cover object-top ${className}`}
          style={{ aspectRatio: `${shot.w} / ${shot.h}` }}
        />
      </a>
      <figcaption className="mt-4 flex max-w-md items-baseline gap-4">
        <span className="label-mono whitespace-nowrap text-signal-text">
          {String(index + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
        </span>
        <span className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{shot.title}.</span> {shot.caption}
        </span>
      </figcaption>
    </figure>
  );
}

/** Screenshots that travel sideways while the page is pinned (desktop), or a swipe row (touch). */
function Gallery() {
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distanceRef = useRef(0);
  const [distance, setDistance] = useState(0);
  const pinned = desktop && !reduced;

  useEffect(() => {
    if (!pinned) return;
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const next = Math.max(0, track.scrollWidth - window.innerWidth);
      distanceRef.current = next;
      setDistance(next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * distanceRef.current);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!pinned) {
    return (
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:-mx-10 md:px-10">
        {shots.map((shot, i) => (
          <div key={shot.title} className="w-[82vw] max-w-xl shrink-0 snap-center">
            <ShotPanel shot={shot} index={i} className="h-auto w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} className="flex w-max items-start gap-10 px-10 will-change-transform" style={{ x }}>
          <div className="flex h-[62vh] w-[26vw] shrink-0 flex-col justify-between">
            <span className="label-mono text-muted-foreground">Keep scrolling: a tour of the product</span>
            <p className="display text-[clamp(2.5rem,4.2vw,4.5rem)]">
              Seven screens, <span className="serif-italic text-signal-text">one API.</span>
            </p>
          </div>
          {shots.map((shot, i) => (
            <ShotPanel key={shot.title} shot={shot} index={i} className="h-[62vh] w-auto max-w-none" />
          ))}
          <div className="flex h-[62vh] w-[30vw] shrink-0 items-center justify-center">
            <Magnetic strength={0.25}>
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="display flex h-56 w-56 flex-col items-center justify-center rounded-full bg-signal text-center text-2xl text-[hsl(240_7%_5%)] transition-transform duration-500 hover:scale-105"
                data-testid="link-labellens-gallery-live"
              >
                Try it live
                <ArrowUpRight className="mt-2 h-6 w-6" />
              </a>
            </Magnetic>
          </div>
        </motion.div>
        <div className="mx-10 mt-10 h-px bg-border">
          <motion.div className="h-px bg-signal" style={{ width: progress }} />
        </div>
      </div>
    </div>
  );
}

function McpAddress() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(MCP_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address stays visible and selectable.
    }
  };

  return (
    <div>
      <div className="label-mono mb-3 text-muted-foreground">Use it inside Claude (MCP connector address)</div>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
        <code className="min-w-0 flex-1 truncate font-mono text-xs" title={MCP_URL}>
          {MCP_URL}
        </code>
        <button
          onClick={copy}
          aria-label="Copy MCP connector address"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-muted"
          data-testid="button-labellens-copy-mcp"
        >
          {copied ? <Check className="h-4 w-4 text-signal-text" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

export default function LabelLensShowcase() {
  return (
    <div data-testid="card-project-labellens">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-10 border-t border-border pt-10 grid-cols-1 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <FadeUp className="mb-6 flex flex-wrap items-center gap-3">
              <span className="label-mono rounded-full bg-signal px-3 py-1.5 text-[hsl(240_7%_5%)]">Lead project</span>
              <span className="label-mono text-muted-foreground">Gen AI · Analytics Engineering · 2026</span>
            </FadeUp>
            <h3 className="display text-[clamp(3.5rem,11vw,10rem)]">
              <Lines lines={["LabelLens"]} />
            </h3>
            <FadeUp delay={0.15}>
              <p className="serif-italic mt-3 text-3xl text-signal-text md:text-5xl">What's really in your food?</p>
            </FadeUp>
          </div>
          <FadeUp delay={0.25} className="flex flex-col justify-end gap-8 lg:col-span-5">
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              A million US packaged foods from Open Food Facts, made readable: every label explained, every additive
              looked up, a better swap for every product, and an AI agent that answers questions from the data and
              shows its sources.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-medium text-[hsl(240_7%_5%)] transition-transform duration-300 hover:scale-[1.03]"
                data-testid="button-labellens-live"
              >
                Try it live
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={HOW_BUILT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition-colors duration-300 hover:border-foreground"
                data-testid="button-labellens-how-built"
              >
                How it's built
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={CODE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition-colors duration-300 hover:border-foreground"
                data-testid="button-labellens-code"
              >
                <SiGithub className="h-4 w-4" />
                Code
              </a>
            </div>
          </FadeUp>
        </div>
      </div>

      <div className="mt-14 lg:mt-0">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:max-w-none lg:px-0">
          <Gallery />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1600px] px-5 md:px-10 lg:mt-4">
        <dl className="grid grid-cols-2 border-l border-t border-border lg:grid-cols-3">
          {metrics.map((metric, i) => (
            <FadeUp key={metric.label} delay={(i % 3) * 0.08} className="border-b border-r border-border p-5 md:p-8">
              <dd className="display text-4xl md:text-6xl">
                <CountUp to={metric.to} decimals={metric.decimals} prefix={metric.prefix} suffix={metric.suffix} />
              </dd>
              <dt className="mt-3 max-w-[16rem] text-sm leading-snug text-muted-foreground">{metric.label}</dt>
            </FadeUp>
          ))}
        </dl>

        <div className="mt-16 grid gap-12 grid-cols-1 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="label-mono mb-6 text-muted-foreground">How it's built</div>
            <ol>
              {parts.map((part, i) => (
                <FadeUp key={part.title} delay={i * 0.05}>
                  <li className="grid grid-cols-[3rem_1fr] gap-2 border-t border-border py-5">
                    <span className="label-mono pt-1 text-signal-text">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <div className="text-lg font-medium">{part.title}</div>
                      <p className="mt-1 text-muted-foreground">{part.body}</p>
                    </div>
                  </li>
                </FadeUp>
              ))}
            </ol>
          </div>

          <FadeUp delay={0.1} className="flex flex-col gap-10 lg:col-span-5">
            <div>
              <div className="label-mono mb-4 text-muted-foreground">Stack</div>
              <div className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <span key={tech} className="rounded-full border border-border px-3 py-1.5 text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <McpAddress />
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Built in four days with Claude Code; I set the direction and made the calls.{" "}
                <a
                  href={BUILD_NOTE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-wipe text-signal-text"
                >
                  How I built it
                </a>
              </p>
              <p>Code under the MIT licence; data from Open Food Facts under the ODbL.</p>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
