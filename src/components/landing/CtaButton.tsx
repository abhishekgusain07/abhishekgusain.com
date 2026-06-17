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
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold tracking-tight transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-orangeBg focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black";

const variants = {
  primary:
    "bg-neutral-orangeBg text-white shadow-sm hover:brightness-110 hover:shadow-md",
  secondary:
    "border border-neutral-3 bg-transparent text-neutral-8 hover:border-neutral-orangeBg hover:text-neutral-orangeBg dark:border-neutral-dark-3 dark:text-neutral-dark-8 dark:hover:border-neutral-orangeBg dark:hover:text-neutral-orangeBg",
} as const;

export function CtaButton({
  href,
  children,
  variant = "primary",
  className,
  external,
}: CtaButtonProps) {
  const classes = cn(base, variants[variant], className);
  const isExternal =
    external ?? (href.startsWith("http") || href.startsWith("mailto:"));

  if (isExternal) {
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
