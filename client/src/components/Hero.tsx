import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import DotField from "./motion/DotField";
import Magnetic from "./motion/Magnetic";
import CountUp from "./motion/CountUp";
import Marquee from "./motion/Marquee";
import { FadeUp, Lines } from "./motion/Reveal";
import { scrollToId } from "@/lib/motion";

interface HeroProps {
  isDark?: boolean;
  /** False while the intro is still covering the page. */
  ready?: boolean;
}

// Career numbers, each one backed by a section further down the page.
const proof = [
  { to: 3, label: "years of experience across analytics and AI engineering", decimals: 0, suffix: "+" },
  { to: 18, label: "projects built, from tool-using agents to dashboards", decimals: 0, suffix: "" },
  { to: 1, label: "research paper published (IJSREM, 2023)", decimals: 0, suffix: "" },
  { to: 3.93, label: "GPA, MS in Data Science at George Washington University", decimals: 2, suffix: "" },
];

const marqueeWords = [
  "Tool-using agents",
  "Retrieval",
  "Evals",
  "MCP servers",
  "Knowledge graphs",
  "dbt + SQL",
  "Data pipelines",
  "Warehouses",
  "Dashboards",
];

export default function Hero({ isDark = true, ready = true }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // The headline drifts up and fades as the hero scrolls away.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <>
      <section id="hero" ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <DotField isDark={isDark} />

        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end px-5 pb-10 pt-32 md:px-10 md:pb-14 md:pt-40"
          style={{ y, opacity }}
        >
          <FadeUp show={ready} delay={0.1} className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 md:mb-10">
            <span className="label-mono flex items-center gap-2.5 rounded-full border border-border bg-background/60 px-4 py-2 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              Open to relocation and remote roles
            </span>
            <span className="label-mono text-muted-foreground">AI and Analytics Engineer</span>
          </FadeUp>

          <h1 className="display text-[clamp(3rem,10.5vw,11rem)]">
            <span className="sr-only">Aditya Kanbargi, AI and Analytics Engineer. </span>
            <Lines
              show={ready}
              delay={0.15}
              stagger={0.11}
              lines={[
                <>I build AI systems</>,
                <>
                  that <span className="serif-italic text-signal-text">show their work.</span>
                </>,
              ]}
            />
          </h1>

          <div className="mt-10 grid gap-8 md:mt-14 grid-cols-1 lg:grid-cols-12 lg:items-end">
            <FadeUp show={ready} delay={0.55} className="lg:col-span-6">
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                I'm <span className="text-foreground">Aditya Kanbargi</span>. I build LLM applications end to end:
                tool-using agents, retrieval, and evals that run before a feature ships. Underneath them I build the
                analytics: tested data pipelines, warehouses and dashboards.
              </p>
            </FadeUp>

            <FadeUp show={ready} delay={0.7} className="flex flex-wrap items-center gap-3 lg:col-span-6 lg:justify-end">
              <Magnetic>
                <button
                  onClick={() => scrollToId("projects")}
                  className="group flex items-center gap-3 rounded-full bg-signal py-2 pl-6 pr-2 text-sm font-medium text-[hsl(240_7%_5%)]"
                  data-testid="button-view-work"
                >
                  See the work
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(240_7%_5%)] text-signal transition-transform duration-500 group-hover:rotate-[360deg]">
                    <ArrowDown className="h-4 w-4" />
                  </span>
                </button>
              </Magnetic>
              <Magnetic>
                <a
                  href="/Aditya_Kanbargi_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-[1.05rem] text-sm font-medium backdrop-blur transition-colors duration-300 hover:border-foreground"
                  data-testid="button-download-resume"
                >
                  Resume
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/adikan2k"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur transition-colors duration-300 hover:border-foreground"
                  data-testid="link-github"
                >
                  <SiGithub className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/adikan2k/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur transition-colors duration-300 hover:border-foreground"
                  data-testid="link-linkedin"
                >
                  <SiLinkedin className="h-4 w-4" />
                </a>
              </div>
            </FadeUp>
          </div>

          <FadeUp show={ready} delay={0.9} className="mt-12 border-t border-border pt-6 md:mt-16">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
              {proof.map((item) => (
                <div key={item.label}>
                  <dd className="display text-4xl md:text-5xl xl:text-6xl">
                    <CountUp to={item.to} decimals={item.decimals} suffix={item.suffix} start={ready} />
                  </dd>
                  <dt className="mt-3 max-w-[15rem] text-sm leading-snug text-muted-foreground">{item.label}</dt>
                </div>
              ))}
            </dl>
          </FadeUp>
        </motion.div>
      </section>

      <Marquee speed={-3} className="border-y border-border py-5 md:py-7">
        {marqueeWords.map((word) => (
          <span key={word} className="flex items-center">
            <span className="display px-6 text-3xl md:px-10 md:text-5xl">{word}</span>
            <span className="text-2xl text-signal-text md:text-4xl">✳</span>
          </span>
        ))}
      </Marquee>
    </>
  );
}
