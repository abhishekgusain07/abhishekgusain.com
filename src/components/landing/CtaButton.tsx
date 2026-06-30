import Link from "next/link";
import { cn } from "@/lib/utils";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  /** External / mailto links render as <a>; in-page anchors and routes use Link. */
  external?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 border px-5 py-3 text-sm font-bold tracking-normal transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants = {
  primary:
    "border-[var(--field-ink)] bg-[var(--field-ink)] text-[var(--field-panel)] shadow-[5px_5px_0_rgba(27,27,23,0.12)] hover:bg-[var(--field-rust)]",
  secondary:
    "border-[var(--field-ink)] bg-[var(--field-panel)] text-[var(--field-ink)] shadow-[5px_5px_0_rgba(27,27,23,0.08)] hover:text-[var(--field-rust)]",
} as const;

export function CtaButton({
  href,
  children,
  variant = "primary",
  className,
  external,
}: CtaButtonProps) {
  const classes = cn(base, variants[variant], className);
  // Plain <a> for external, mailto, and same-page hash links (native scroll);
  // next/link only for real route navigations.
  const isPlainAnchor =
    external ??
    (href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("#"));

  if (isPlainAnchor) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
