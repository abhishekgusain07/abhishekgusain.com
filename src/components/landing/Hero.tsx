"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { CtaButton } from "./CtaButton";
import { HeroScene } from "./HeroScene";
import { HERO, PRIMARY_CTA, SECONDARY_CTA } from "../../../constants/agency";

/**
 * Rotates the accent word on its own line. An invisible copy of the longest
 * word reserves the box size, so the headline never reflows or jumps as words
 * swap — only the orange word crossfades in place.
 */
function RotatingOutcome({ words }: { words: readonly string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, [words.length]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className="relative block text-neutral-orangeBg">
      <span className="invisible" aria-hidden>
        {longest}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={i}
          initial={{ opacity: 0, y: "45%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-45%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-32 sm:pt-40">
      {/* soft accent glow, not stock art */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-neutral-orangeBg/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-screen-lg items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-3 px-3 py-1 text-xs font-medium tracking-tight text-neutral-6 dark:border-neutral-dark-3 dark:text-neutral-dark-6">
            <Sparkles size={13} className="text-neutral-orangeBg" />
            {HERO.eyebrow}
          </p>

          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tighter text-neutral-8 sm:text-5xl dark:text-neutral-dark-8">
            <span className="block">{HERO.titleLead}</span>
            <RotatingOutcome words={HERO.titleRotators} />
            <span className="block">{HERO.titleTail}</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-neutral-7 dark:text-neutral-dark-7">
            {HERO.subhead}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaButton href={PRIMARY_CTA.href}>
              {PRIMARY_CTA.label}
              <ArrowRight size={16} />
            </CtaButton>
            <CtaButton href={SECONDARY_CTA.href} variant="secondary">
              {SECONDARY_CTA.label}
            </CtaButton>
          </div>

          <p className="mt-6 max-w-md text-sm text-neutral-5 dark:text-neutral-dark-5">
            {HERO.microline}
          </p>
        </div>

        <HeroScene />
      </div>
    </section>
  );
}
