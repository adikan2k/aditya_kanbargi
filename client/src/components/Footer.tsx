import { ArrowUp, ArrowUpRight } from "lucide-react";
import { scrollToTop } from "@/lib/motion";

const EMAIL = "adityakan2000@gmail.com";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border md:mt-36">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-8 font-sans text-[13px] text-faint md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[14px] font-medium">
          <a href={`mailto:${EMAIL}`} className="ref-link py-3 text-foreground">
            {EMAIL}
          </a>
          <a
            href="/Aditya_Kanbargi_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ref-link inline-flex items-center gap-1 py-3 text-foreground"
          >
            Resume (PDF)
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
        <p>
          © {year} Aditya Kanbargi. Set in Archivo and Hanken Grotesk.{" "}
          <span className="figure-nums">
            Revised {__BUILD_DATE__}, build {__BUILD_SHA__}.
          </span>
        </p>
        <button
          type="button"
          onClick={scrollToTop}
          className="press inline-flex w-fit items-center gap-1.5 py-3 font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
