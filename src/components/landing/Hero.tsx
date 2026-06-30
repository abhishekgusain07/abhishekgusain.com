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
    <span className="relative block text-[var(--field-rust)]">
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
      <div className="relative mx-auto grid w-full max-w-screen-lg min-w-0 items-center gap-12 border-b-2 border-[var(--field-ink)] pb-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="w-[calc(100vw-2rem)] min-w-0 sm:w-full">
          <p className="mb-5 w-[calc(100vw-2rem)] whitespace-normal text-xs font-bold uppercase tracking-normal text-[var(--field-forest)] sm:w-auto">
            <span className="mr-3 inline-block h-0.5 w-10 align-middle bg-[var(--field-forest)]" />
            <Sparkles
              size={13}
              className="mr-2 inline-block text-[var(--field-rust)]"
            />
            <span>{HERO.eyebrow}</span>
          </p>

          <h1 className="field-serif w-[calc(100vw-2rem)] max-w-full break-words text-balance text-4xl font-bold leading-[1.02] text-[var(--field-ink)] sm:w-auto sm:text-6xl sm:leading-[0.98]">
            <span className="block">{HERO.titleLead}</span>
            <RotatingOutcome words={HERO.titleRotators} />
            <span className="block">{HERO.titleTail}</span>
          </h1>

          <p className="mt-6 w-[calc(100vw-2rem)] max-w-full text-pretty text-base leading-relaxed text-[var(--field-muted)] sm:w-auto sm:max-w-xl">
            {HERO.subhead}
          </p>

          <div className="mt-8 flex w-[calc(100vw-2rem)] flex-col gap-3 sm:w-auto sm:flex-row">
            <CtaButton href={PRIMARY_CTA.href}>
              {PRIMARY_CTA.label}
              <ArrowRight size={16} />
            </CtaButton>
            <CtaButton href={SECONDARY_CTA.href} variant="secondary">
              {SECONDARY_CTA.label}
            </CtaButton>
          </div>

          <p className="mt-6 w-[calc(100vw-2rem)] max-w-md border-l-4 border-[var(--field-gold)] pl-4 text-sm leading-relaxed text-[var(--field-muted)] sm:w-auto">
            {HERO.microline}
          </p>
        </div>

        <HeroScene />
      </div>
    </section>
  );
}
