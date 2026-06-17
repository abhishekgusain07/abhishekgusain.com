"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, PhoneCall, Sparkles, CalendarCheck } from "lucide-react";
import { CtaButton } from "./CtaButton";
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

        <HeroSystemVisual />
      </div>
    </section>
  );
}

/**
 * An honest "what happens" diagram: a missed lead flows through the system and
 * becomes a booked appointment. Communicates the mechanism, not stock AI imagery.
 */
function HeroSystemVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-2xl border border-neutral-3 bg-neutral-1 p-5 shadow-sm dark:border-neutral-dark-3 dark:bg-neutral-dark-1">
        <FlowRow
          icon={<PhoneCall size={16} />}
          title="New lead, 9:47 PM"
          sub="“Do you have any openings this week?”"
          tone="muted"
        />
        <Connector label="answered in 4 seconds" />
        <FlowRow
          icon={<Sparkles size={16} />}
          title="AI Front Desk replies"
          sub="Answers, qualifies, offers two time slots."
          tone="accent"
        />
        <Connector label="books straight into your calendar" />
        <FlowRow
          icon={<CalendarCheck size={16} />}
          title="Appointment booked ✓"
          sub="Confirmation + reminder scheduled."
          tone="solid"
        />
      </div>
      <div className="mt-3 text-center text-xs text-neutral-5 dark:text-neutral-dark-5">
        While you were asleep.
      </div>
    </div>
  );
}

function FlowRow({
  icon,
  title,
  sub,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  tone: "muted" | "accent" | "solid";
}) {
  const toneClasses = {
    muted:
      "border-neutral-3 bg-white text-neutral-6 dark:border-neutral-dark-3 dark:bg-neutral-dark-2 dark:text-neutral-dark-6",
    accent:
      "border-neutral-orangeBg/40 bg-neutral-orangeBg/10 text-neutral-orangeBg",
    solid:
      "border-neutral-8 bg-neutral-8 text-white dark:border-neutral-dark-8 dark:bg-neutral-dark-8 dark:text-black",
  } as const;
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-3 ${toneClasses[tone]}`}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-tight">{title}</p>
        <p className="mt-0.5 text-xs opacity-80">{sub}</p>
      </div>
    </div>
  );
}

function Connector({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 py-2 pl-5">
      <span className="h-5 w-px bg-neutral-3 dark:bg-neutral-dark-3" />
      <span className="text-[11px] text-neutral-5 dark:text-neutral-dark-5">
        {label}
      </span>
    </div>
  );
}
