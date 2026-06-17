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
          ? "border-b border-neutral-3 bg-white/80 backdrop-blur-md dark:border-neutral-dark-3 dark:bg-black/70"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-screen-lg items-center justify-between px-4 py-3.5">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-neutral-8 dark:text-neutral-dark-8"
          onClick={() => setOpen(false)}
        >
          Abhishek Gusain
          <span className="text-neutral-orangeBg">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-neutral-6 transition-colors hover:text-neutral-8 dark:text-neutral-dark-6 dark:hover:text-neutral-dark-8"
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-3 text-neutral-8 dark:border-neutral-dark-3 dark:text-neutral-dark-8"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-neutral-3 bg-white px-4 py-4 md:hidden dark:border-neutral-dark-3 dark:bg-black">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm text-neutral-7 hover:bg-neutral-2 dark:text-neutral-dark-7 dark:hover:bg-neutral-dark-2"
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
