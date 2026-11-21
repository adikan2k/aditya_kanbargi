import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { SiGithub } from "react-icons/si";
import CountUp from "./motion/CountUp";
import LayeredShots from "./motion/LayeredShots";
import { FadeUp, Lines } from "./motion/Reveal";
import homeShot from "@assets/labellens/hero.webp";
import askShot from "@assets/labellens/ask.webp";

const LIVE_URL = "https://labellens-beige.vercel.app";
const HOW_BUILT_URL = "https://labellens-beige.vercel.app/how-its-built";
const CODE_URL = "https://github.com/adikan2k/labellens";
const MCP_URL = "https://labellens-api-1036759996795.us-east4.run.app/mcp";

// Every number is backed by a report in the repo's evals/results/.
const metrics = [
  { to: 985260, decimals: 0, prefix: "", suffix: "", label: "US products searchable, from a pipeline of 1,002,769" },
  { to: 0.98, decimals: 2, prefix: "", suffix: "", label: "ask agent fact score, against 0.26 for search alone" },
  { to: 98, decimals: 0, prefix: "", suffix: "%", label: "of nutrient values read correctly from real label photos" },
  { to: 175, decimals: 0, prefix: "", suffix: " ms", label: "search at the 95th percentile on the live API" },
];

const parts = [
  {
    title: "A tested pipeline over a million products",
    body: "Took the Open Food Facts export of 1,002,769 US products through dbt on DuckDB, with 94 data tests guarding it. 985,260 clean, named products come out the other side.",
  },
  {
    title: "LLM enrichment at batch scale",
    body: "Used Claude through the Batch API to fill in missing categories and write the additive and ingredient explainers, and kept model spend for the whole project to about $6.",
  },
  {
    title: "Search that stays fast",
    body: "Neon Postgres with pgvector for search, plus a Neo4j knowledge graph of products, brands, additives and ingredients. Search answers in 175 ms at the 95th percentile on the live API.",
  },
  {
    title: "One API, four surfaces",
    body: "A FastAPI service on Google Cloud Run behind a Next.js site: a tool-using ask agent, a label reader that works from a photo, and an MCP App that renders a label card inside Claude.",
  },
  {
    title: "An eval behind every AI feature",
    body: "The ask agent scores 0.98 on facts against 0.26 for search alone, the label reader gets 98% of nutrient values right from real photos, and Claude picks the right tool in 29 of 30 requests. Each report is published with its misses.",
  },
];

const stack = ["Claude (Haiku, Sonnet as eval judge)", "MCP", "FastAPI", "dbt", "DuckDB", "Postgres + pgvector", "Neo4j", "Next.js", "Google Cloud Run", "Vercel", "Langfuse"];

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
              I designed and shipped LabelLens end to end: a tested data pipeline over a million US packaged foods,
              one API, and four AI features that each had to pass an eval. It explains every label, looks up every
              additive, suggests a better swap, and answers questions from the data with its sources shown.
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

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <LayeredShots
          className="mt-14 md:mt-20"
          back={{ src: homeShot, alt: "LabelLens search across 985,260 US products", href: LIVE_URL }}
          front={{ src: askShot, alt: "LabelLens ask agent answering with its steps and sources", href: LIVE_URL }}
        />

        <dl className="mt-16 md:mt-24 grid grid-cols-2 border-l border-t border-border lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <FadeUp key={metric.label} delay={i * 0.08} className="border-b border-r border-border p-5 md:p-8">
              <dd className="display text-4xl md:text-5xl xl:text-6xl">
                <CountUp to={metric.to} decimals={metric.decimals} prefix={metric.prefix} suffix={metric.suffix} />
              </dd>
              <dt className="mt-3 max-w-[16rem] text-sm leading-snug text-muted-foreground">{metric.label}</dt>
            </FadeUp>
          ))}
        </dl>

        <div className="mt-16 grid gap-12 grid-cols-1 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="label-mono mb-4 text-muted-foreground">What I built</div>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed md:text-xl">
              The spec, the design and every call on scope, hosting and cost are mine. I built it with
              Claude Code as my coding partner and reviewed and approved each change before it merged.
            </p>
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
            <p className="text-sm text-muted-foreground">
              Code under the MIT licence; data from Open Food Facts under the ODbL.
            </p>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
