import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Wider than the site's default prose column for richer landing sections. */
  width?: "prose" | "wide";
  number?: string;
};

/**
 * Consistent vertical rhythm + max-width for landing sections.
 * Keeps the brand's centered-column feel while allowing wider grids.
 */
export function Section({
  id,
  children,
  className,
  width = "wide",
  number,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 border-t border-[var(--field-line)] px-4 py-16 sm:py-24",
        className
      )}
    >
      <div
        className={cn(
          "relative mx-auto w-full",
          width === "wide" ? "max-w-screen-lg" : "max-w-screen-md"
        )}
      >
        {number && (
          <span
            aria-hidden
            className="field-serif mb-6 block text-6xl font-bold leading-none text-[var(--field-rust)] sm:absolute sm:-left-24 sm:top-0 sm:mb-0"
          >
            {number}
          </span>
        )}
        {children}
      </div>
    </section>
  );
}

type KickerProps = { children: React.ReactNode; className?: string };

/** Small uppercase eyebrow label in the accent colour. */
export function Kicker({ children, className }: KickerProps) {
  return (
    <p
      className={cn(
        "mb-3 text-xs font-bold uppercase tracking-normal text-[var(--field-forest)] before:mr-3 before:inline-block before:h-0.5 before:w-9 before:align-middle before:bg-[var(--field-forest)]",
        className
      )}
    >
      {children}
    </p>
  );
}

type SectionTitleProps = { children: React.ReactNode; className?: string };

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "field-serif text-balance text-3xl font-bold leading-tight text-[var(--field-ink)] sm:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
}
