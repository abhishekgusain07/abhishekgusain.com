import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Wider than the site's default prose column for richer landing sections. */
  width?: "prose" | "wide";
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
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 px-4 py-16 sm:py-24", className)}
    >
      <div
        className={cn(
          "mx-auto w-full",
          width === "wide" ? "max-w-screen-lg" : "max-w-screen-md"
        )}
      >
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
        "mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-orangeBg",
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
        "text-balance text-3xl font-semibold tracking-tighter text-neutral-8 sm:text-4xl dark:text-neutral-dark-8",
        className
      )}
    >
      {children}
    </h2>
  );
}
