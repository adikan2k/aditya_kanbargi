import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import Magnetic from "./motion/Magnetic";
import { FadeUp, Lines } from "./motion/Reveal";

const EMAIL = "adityakan2000@gmail.com";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adikan2k/", icon: SiLinkedin, testId: "link-linkedin" },
  { label: "GitHub", href: "https://github.com/adikan2k", icon: SiGithub, testId: "link-github" },
  { label: "Resume", href: "/Aditya_Kanbargi_Resume.pdf", icon: null, testId: "link-contact-resume" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address is still on screen and the mail link still works.
    }
  };

  return (
    <section id="contact" className="pt-28 md:pt-44">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <FadeUp className="mb-6 flex items-center gap-4 text-muted-foreground">
          <span className="label-mono text-signal-text">05</span>
          <span className="h-px w-10 bg-border" />
          <span className="label-mono">Contact</span>
        </FadeUp>

        <h2 className="display text-[clamp(2.5rem,8.6vw,9.5rem)]">
          <Lines
            lines={[
              <>Let's build something</>,
              <>
                <span className="serif-italic text-signal-text">that holds up.</span>
              </>,
            ]}
          />
        </h2>

        <div className="mt-14 grid gap-12 border-t border-border pt-10 lg:mt-20 grid-cols-1 lg:grid-cols-12 lg:gap-8">
          <FadeUp className="lg:col-span-7">
            <div className="label-mono mb-4 text-muted-foreground">Email is the fastest way to reach me</div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="link-wipe break-all pb-1 text-2xl font-medium tracking-tight sm:text-3xl md:text-5xl"
                data-cursor="Email"
                data-testid="link-email"
              >
                {EMAIL}
              </a>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className="label-mono flex items-center gap-2 rounded-full border border-border px-4 py-2.5 transition-colors duration-300 hover:border-foreground"
                data-testid="button-copy-email"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-signal-text" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="label-mono mt-8 flex items-center gap-2.5 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              Open to relocation and remote roles
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="flex flex-wrap items-start gap-3 lg:col-span-5 lg:justify-end">
            {links.map((link) => (
              <Magnetic key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-full border border-border px-6 py-4 text-sm font-medium transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-[hsl(240_7%_5%)]"
                  data-testid={link.testId}
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
            ))}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
