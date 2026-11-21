import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FadeUp, SectionHeader } from "./motion/Reveal";
import { EASE } from "@/lib/motion";
import headshotImage from "@assets/web/profile.webp";

const statement =
  "I came for the patterns. I stayed for the pipelines. Now I'm building the systems that put both to work.";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.24em] inline-block">
      {children}
    </motion.span>
  );
}

/** Large statement whose words light up one by one as it is scrolled through. */
function ScrollStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = statement.split(" ");

  if (reduced) {
    return <p className="display text-[clamp(2rem,5.6vw,5.5rem)]">{statement}</p>;
  }

  return (
    <p ref={ref} className="display text-[clamp(2rem,5.6vw,5.5rem)]" aria-label={statement}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

const facts = [
  {
    label: "Education",
    lines: ["MS, Data Science", "The George Washington University, 2026", "Global Leaders Fellowship"],
  },
  {
    label: "Certifications",
    lines: ["AWS Certified AI Practitioner", "Databricks GenAI Accreditation"],
  },
  {
    label: "Published",
    lines: ["Music Genre Classification Using Machine Learning Techniques", "IJSREM, Volume 7, Issue 12 (2023)"],
  },
  {
    label: "Experience",
    lines: ["About three years", "Analytics, data and AI engineering"],
  },
];

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section id="about" className="pt-28 md:pt-44">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeader
          index="03"
          label="About"
          lines={[
            <>The person</>,
            <>
              <span className="serif-italic text-signal-text">behind the work.</span>
            </>,
          ]}
        />

        <ScrollStatement />

        <div className="mt-20 grid gap-12 lg:mt-28 grid-cols-1 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <motion.div
              ref={imageRef}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border"
              initial={{ clipPath: reduced ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <motion.img
                src={headshotImage}
                alt="Aditya Kanbargi"
                width={800}
                height={800}
                loading="lazy"
                className="absolute inset-0 h-[116%] w-full object-cover"
                style={{ y: imageY }}
                data-testid="img-headshot"
              />
            </motion.div>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl lg:col-span-7 lg:col-start-6">
            <FadeUp>
              <p>
                I'm Aditya, and I work in <span className="text-foreground">data and AI</span>: building agentic AI
                systems, orchestrating LLM workflows, and developing data pipelines to automate research. I enjoy
                turning complex, manual processes into something reliable, useful, and easier for people to work with.
              </p>
            </FadeUp>
            <FadeUp delay={0.05}>
              <p>
                My background is in data and business analytics. Some days, that meant building a dashboard someone
                could open on a Monday morning and know what to act on. Other days, it meant digging into the numbers
                to understand what was happening and what the team could do about it. I bring that same mindset to AI:{" "}
                <span className="text-foreground">
                  ask the right questions, check the answers, and make sure the work solves a real business problem.
                </span>
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p>
                I like being the person who gets both sides: comfortable digging into why something isn't working, and
                just as comfortable explaining it without making it more complicated than it needs to be.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p>
                Outside of work, I'm usually lifting, chasing a football, turning pages, or saying "one more game."
                When the mountains call, I'm already planning the hike.
              </p>
            </FadeUp>
          </div>
        </div>

        <dl className="mt-20 grid border-l border-t border-border sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {facts.map((fact, i) => (
            <FadeUp key={fact.label} delay={i * 0.07} className="border-b border-r border-border p-6 md:p-8">
              <dt className="label-mono mb-5 text-signal-text">{fact.label}</dt>
              <dd>
                <div className="text-xl font-medium tracking-tight">{fact.lines[0]}</div>
                {fact.lines.slice(1).map((line) => (
                  <div key={line} className="mt-1.5 text-sm text-muted-foreground">
                    {line}
                  </div>
                ))}
              </dd>
            </FadeUp>
          ))}
        </dl>
      </div>
    </section>
  );
}
