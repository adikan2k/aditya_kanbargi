import { motion, useReducedMotion } from "framer-motion";
import SectionHead from "./site/SectionHead";
import { Cite } from "./cite/Cite";
import { EASE } from "@/lib/motion";
import headshotImage from "@assets/web/profile.webp";

const facts = [
  { title: "Education", body: <>MS in Data Science, The George Washington University, 2026. Global Leaders Fellowship.</> },
  { title: "Certifications", body: <>AWS Certified AI Practitioner. Databricks Generative AI accreditation.</> },
  {
    title: "Published",
    body: (
      <>
        Music Genre Classification Using Machine Learning Techniques. IJSREM, Volume 7, Issue 12, <Cite id="paper" before="2023" after="." />
      </>
    ),
  },
  { title: "Looking for", body: <>AI and analytics engineering roles. Open to relocation and remote roles.</> },
];

export default function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 pt-32 md:pt-48">
      <div className="mx-auto max-w-[1920px] px-5 md:px-10 2xl:px-16">
        <SectionHead id="about-title" title="About" />

        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <motion.div
              className="relative aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-2xl border border-border"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.05 }}
            >
              <img
                src={headshotImage}
                alt="Aditya Kanbargi"
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover [filter:saturate(0.9)_contrast(1.03)]"
              />
              {/* A cover slides off the photo; clipping the photo itself would delay its download. */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom bg-background"
                variants={{
                  hidden: { scaleY: reduced ? 0 : 1 },
                  shown: { scaleY: 0, transition: { duration: reduced ? 0.01 : 0.9, ease: EASE } },
                }}
              />
            </motion.div>
          </div>

          <div className="space-y-6 font-sans text-[19px] leading-relaxed text-foreground/90 md:text-[22px] lg:col-span-7">
            <p>
              I&rsquo;m Aditya, and I work in data and AI: building agentic AI systems, orchestrating LLM workflows, and
              developing data pipelines to automate research. I enjoy turning complex, manual processes into something
              reliable, useful, and easier for people to work with.
            </p>
            <p>
              My background is in data and business analytics. Some days, that meant building a dashboard someone could
              open on a Monday morning and know what to act on. Other days, it meant digging into the numbers to
              understand what was happening and what the team could do about it. I bring that same mindset to AI: ask
              the right questions, check the answers, and make sure the work solves a real business problem.
            </p>
            <p>
              I like being the person who gets both sides: comfortable digging into why something isn&rsquo;t working,
              and just as comfortable explaining it without making it more complicated than it needs to be.
            </p>
            <p>
              Outside of work, I&rsquo;m usually lifting, chasing a football, turning pages, or saying &ldquo;one more
              game.&rdquo; When the mountains call, I&rsquo;m already planning the hike.
            </p>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-3 font-sans sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.title} className="rounded-xl border border-border p-5">
              <dt className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-faint">{fact.title}</dt>
              <dd className="mt-2.5 text-[16px] leading-snug text-foreground">{fact.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
