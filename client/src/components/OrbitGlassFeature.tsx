import { ArrowUpRight, FileText } from "lucide-react";
import { SiGithub } from "react-icons/si";
import CountUp from "./motion/CountUp";
import { FadeUp, Lines } from "./motion/Reveal";
import LayeredShots from "./motion/LayeredShots";
import labShot from "@assets/orbitglass/lab.webp";
import atlasShot from "@assets/orbitglass/atlas.webp";

const DEMO_URL = "https://adikan2k.github.io/orbitglass---inside-language-model-loops/";
const GUIDED_DEMO_URL = "https://adikan2k.github.io/orbitglass---inside-language-model-loops/#demo/1";
const REPORT_URL = "https://adikan2k.github.io/orbitglass---inside-language-model-loops/files/Research_Report.pdf";
const CODE_URL = "https://github.com/adikan2k/orbitglass---inside-language-model-loops";

// Every number comes from the project's README and research report.
const metrics = [
  { to: 5, suffix: "", label: "language model families compared: GPT-2, DistilGPT-2, GPT-Neo, Gemma and Qwen" },
  { to: 20, suffix: "", label: "decoding temperatures per sweep, from 0.05 to 1.00" },
  { to: 368, suffix: "", label: "token sequences tested for short repeating cycles" },
  { to: 13, suffix: "", label: "research notebooks behind a 32-page illustrated report" },
];

const points = [
  {
    title: "Temperature sweeps across real models",
    body: "Generated continuations with PyTorch and Hugging Face Transformers at 20 temperatures, then turned each response into a stream of sentence clusters with TF-IDF and cosine clustering.",
  },
  {
    title: "Testing outputs for hidden cycles",
    body: "Tested 368 Gemma and Qwen token sequences for exact repeating cycles: 181 of 200 Gemma and 149 of 168 Qwen sequences had none of length 16 or shorter. At temperature 0.55, Gemma alternated between two sentence clusters at all 44 boundaries, a loop that a check on neighbouring sentences alone would miss.",
  },
  {
    title: "A mechanism you can step through",
    body: "A four-token transformer where moving one embedding coordinate from 0.80 to 0.88 stretches a repeated run from 6 tokens to 21, with every attention score visible.",
  },
  {
    title: "An interactive lab, reproducible from CSV",
    body: "A static web lab replays the saved outputs, a logistic map and the toy decoder in the browser, and a standard-library Python script with unit tests reproduces the headline numbers.",
  },
];

const stack = ["Python", "PyTorch", "Hugging Face Transformers", "scikit-learn", "NumPy", "pandas", "SciPy", "NetworkX", "Gephi", "JavaScript", "Canvas + SVG"];

export default function OrbitGlassFeature() {
  return (
    <div className="mx-auto mt-28 max-w-[1600px] px-5 md:mt-40 md:px-10" data-testid="card-project-orbitglass">
      <div className="grid gap-10 border-t border-border pt-10 grid-cols-1 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <FadeUp className="mb-6 flex flex-wrap items-center gap-3">
            <span className="label-mono rounded-full bg-signal px-3 py-1.5 text-[hsl(240_7%_5%)]">Featured</span>
            <span className="label-mono text-muted-foreground">LLM research · Interpretability · 2026</span>
          </FadeUp>
          <h3 className="display text-[clamp(3rem,8.5vw,8rem)]">
            <Lines lines={["OrbitGlass"]} />
          </h3>
          <FadeUp delay={0.15}>
            <p className="serif-italic mt-3 text-3xl text-signal-text md:text-5xl">Inside language model loops.</p>
          </FadeUp>
        </div>
        <FadeUp delay={0.25} className="flex flex-col justify-end gap-8 lg:col-span-5">
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            How do you tell a language model that is exploring from one that is going in circles? We measured how
            decoding temperature changes repetition in five model families, tested their outputs for hidden loops,
            and built an interactive lab where anyone can replay the results.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={GUIDED_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-medium text-[hsl(240_7%_5%)] transition-transform duration-300 hover:scale-[1.03]"
              data-testid="button-orbitglass-demo"
            >
              Open the demo
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={REPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition-colors duration-300 hover:border-foreground"
              data-testid="button-orbitglass-report"
            >
              <FileText className="h-4 w-4" />
              Read the report
            </a>
            <a
              href={CODE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition-colors duration-300 hover:border-foreground"
              data-testid="button-orbitglass-code"
            >
              <SiGithub className="h-4 w-4" />
              Code
            </a>
          </div>
        </FadeUp>
      </div>

      <LayeredShots
        className="mt-14 md:mt-20"
        back={{ src: labShot, alt: "OrbitGlass lab home: the shape of model behavior", href: DEMO_URL }}
        front={{
          src: atlasShot,
          alt: "OrbitGlass repetition atlas comparing GPT-2 and DistilGPT-2",
          href: `${DEMO_URL}#lab/trace`,
        }}
      />

      <dl className="mt-16 grid grid-cols-2 border-l border-t border-border md:mt-24 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <FadeUp key={metric.label} delay={i * 0.08} className="border-b border-r border-border p-5 md:p-8">
            <dd className="display text-4xl md:text-5xl xl:text-6xl">
              <CountUp to={metric.to} suffix={metric.suffix} />
            </dd>
            <dt className="mt-3 max-w-[16rem] text-sm leading-snug text-muted-foreground">{metric.label}</dt>
          </FadeUp>
        ))}
      </dl>

      <div className="mt-16 grid gap-12 grid-cols-1 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="label-mono mb-6 text-muted-foreground">What we built</div>
          <ol>
            {points.map((point, i) => (
              <FadeUp key={point.title} delay={i * 0.05}>
                <li className="grid grid-cols-[3rem_1fr] gap-2 border-t border-border py-5">
                  <span className="label-mono pt-1 text-signal-text">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="text-lg font-medium">{point.title}</div>
                    <p className="mt-1 text-muted-foreground">{point.body}</p>
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
          <p className="text-sm text-muted-foreground">
            A three-person group research project in network data science at The George Washington University.
          </p>
        </FadeUp>
      </div>
    </div>
  );
}
