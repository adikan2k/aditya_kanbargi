import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";

const EMAIL = "adityakan2000@gmail.com";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adikan2k/" },
  { label: "GitHub", href: "https://github.com/adikan2k" },
  { label: "Resume (PDF)", href: "/Aditya_Kanbargi_Resume.pdf" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address stays visible and selectable.
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-20 overflow-hidden pt-32 md:pt-48">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: "hsl(var(--cite) / 0.16)",
          maskImage: "radial-gradient(60% 70% at 50% 75%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(60% 70% at 50% 75%, black, transparent 75%)",
        }}
      />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <p className="font-sans text-[15px] font-semibold text-faint">Contact</p>
        <h2 id="contact-title" className="display mt-4 max-w-[14ch] text-[clamp(3rem,8vw,7.5rem)]" style={{ lineHeight: 0.92 }}>
          Hiring for AI or analytics engineering? <span className="text-cite">Let&rsquo;s talk.</span>
        </h2>
        <p className="mt-6 font-sans text-[17px] text-muted-foreground md:text-[20px]">Open to relocation and remote roles.</p>

        <div className="mt-12 border-t border-border pt-10 md:mt-16 md:pt-12">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
            <a
              href={`mailto:${EMAIL}`}
              className="display break-all py-1.5 text-[clamp(1.4rem,6.2vw,4.75rem)] decoration-foreground/60 decoration-2 underline-offset-[0.18em] transition-colors duration-200 hover:underline"
            >
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={copy}
              className="press inline-flex h-11 items-center gap-2 rounded-md border border-border px-4 font-sans text-[15px] font-medium transition-colors duration-200 hover:border-foreground"
            >
              {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copied ? "Copied" : "Copy address"}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied" : ""}
            </span>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-sans text-[16px] font-medium">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ref-link inline-flex items-center gap-1.5 py-2 text-foreground"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
