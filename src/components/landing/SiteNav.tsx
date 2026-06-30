"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CtaButton } from "./CtaButton";
import { NAV_LINKS, PRIMARY_CTA } from "../../../constants/agency";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b-2 border-[var(--field-ink)] bg-[var(--field-paper)]/95 shadow-[0_8px_0_rgba(27,27,23,0.04)] backdrop-blur-sm"
          : "border-b-2 border-[var(--field-ink)] bg-[var(--field-paper)]/85"
      )}
    >
      <nav className="mx-auto flex max-w-screen-lg items-center justify-between px-4 py-3.5">
        <Link
          href="/"
          className="field-serif text-lg font-bold tracking-normal text-[var(--field-ink)]"
          onClick={() => setOpen(false)}
        >
          Abhishek Gusain
          <span className="text-[var(--field-rust)]">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-[var(--field-muted)] transition-colors hover:text-[var(--field-rust)]"
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
          <CtaButton href={PRIMARY_CTA.href} className="px-4 py-2">
            {PRIMARY_CTA.label}
          </CtaButton>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center border border-[var(--field-ink)] bg-[var(--field-panel)] text-[var(--field-ink)]"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[var(--field-ink)] bg-[var(--field-paper)] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--field-line)] px-2 py-2.5 text-sm font-semibold text-[var(--field-ink)] hover:text-[var(--field-rust)]"
              >
                {l.label}
              </a>
            ))}
            <CtaButton href={PRIMARY_CTA.href} className="mt-2 w-full">
              {PRIMARY_CTA.label}
            </CtaButton>
          </div>
        </div>
      )}
    </header>
  );
}
