import { useCallback, useEffect, useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { ArrowUpRight } from "lucide-react";
import { getSource, sourceNumber, type SourceId } from "@/lib/sources";
import { useFinePointer } from "@/lib/motion";

/**
 * Citations. Every figure on the page carries a numbered marker that opens its
 * source: the eval report, repo file or live page it came from. Hover opens the
 * card on a mouse; a tap or a press of Enter opens it everywhere.
 */

// Once one source card has been open, the next opens at once, like a toolbar's tooltips.
let lastClosedAt = 0;
const OPEN_DELAY = 140;
const WARM_WINDOW = 500;
const CLOSE_DELAY = 120;

interface CiteProps {
  id: SourceId;
  /** The word the marker follows. It is kept on the same line as the marker. */
  before?: string;
  /** Punctuation that follows the marker, kept on the same line too. */
  after?: string;
}

/**
 * A marker never starts or ends a line on its own: pass the word it follows and any
 * punctuation after it, and the three are set as one unbreakable unit.
 */
export function Cite({ id, before, after }: CiteProps) {
  const marker = <Marker id={id} />;
  if (!before && !after) return marker;
  return (
    <span className="whitespace-nowrap">
      {before}
      {marker}
      {after}
    </span>
  );
}

function Marker({ id }: { id: SourceId }) {
  const source = getSource(id);
  const n = sourceNumber(id);
  const fine = useFinePointer();
  const [open, setOpen] = useState(false);
  const openTimer = useRef<number>();
  const closeTimer = useRef<number>();

  const clearTimers = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };

  useEffect(() => clearTimers, []);

  const show = useCallback(() => {
    clearTimers();
    const warm = Date.now() - lastClosedAt < WARM_WINDOW;
    openTimer.current = window.setTimeout(() => setOpen(true), warm ? 0 : OPEN_DELAY);
  }, []);

  const hide = useCallback(() => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      lastClosedAt = Date.now();
    }, CLOSE_DELAY);
  }, []);

  return (
    <sup className="cite-sup">
      <Popover.Root
        open={open}
        onOpenChange={(next) => {
          clearTimers();
          setOpen(next);
          if (!next) lastClosedAt = Date.now();
        }}
      >
        <Popover.Trigger asChild>
          <button
            type="button"
            className="cite-marker"
            aria-label={`Source ${n}: ${source.title}`}
            data-cite={id}
            onMouseEnter={fine ? show : undefined}
            onMouseLeave={fine ? hide : undefined}
          >
            {n}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            side="top"
            align="center"
            sideOffset={8}
            collisionPadding={16}
            className="cite-card"
            onMouseEnter={fine ? () => clearTimers() : undefined}
            onMouseLeave={fine ? hide : undefined}
            onOpenAutoFocus={(e) => {
              // Hover opens should not steal focus from the page.
              if (fine) e.preventDefault();
            }}
          >
            <SourceBody id={id} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </sup>
  );
}

/** The contents of a source card. */
export function SourceBody({ id }: { id: SourceId }) {
  const source = getSource(id);
  const n = sourceNumber(id);
  return (
    <div className="grid grid-cols-[1.5rem_1fr] gap-x-2">
      <span className="figure-nums pt-px font-sans text-sm font-semibold text-cite">{n}</span>
      <div className="min-w-0">
        <p className="font-sans text-sm font-semibold leading-snug text-foreground">{source.title}</p>
        <p className="mt-1 font-sans text-sm leading-snug text-muted-foreground">{source.note}</p>
        {source.path && (
          <p className="mt-2 truncate font-mono text-[11.5px] text-faint" title={source.path}>
            {source.path}
          </p>
        )}
        <a
          href={source.href}
          target={source.href.startsWith("#") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="ref-link mt-2 inline-flex items-center gap-1 font-sans text-[13px] font-medium text-foreground"
        >
          {source.linkLabel ?? "Open the source"}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
