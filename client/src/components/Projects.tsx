import SectionHead from "./site/SectionHead";
import FeaturedProject from "./work/FeaturedProject";
import EarlierProjects from "./work/EarlierProjects";
import { featured } from "@/content/featured";

/** The work: three featured projects in full, then the index of the other sixteen. */
export default function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 pt-28 md:pt-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHead id="work-title" title="Selected work">
          Three systems I built and measured, with every number linked to where it came from. Then sixteen earlier projects.
        </SectionHead>
      </div>

      {featured.map((project, i) => (
        <FeaturedProject key={project.id} project={project} index={i} total={featured.length} />
      ))}

      <EarlierProjects />
    </section>
  );
}
