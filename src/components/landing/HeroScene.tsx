"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  PhoneCall,
  CalendarCheck,
  Star,
  RefreshCw,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * The hero "scene": a phone showing the AI Front Desk booking an after-hours
 * customer, with floating ✓ proof-cards orbiting it and faint connector lines —
 * i.e. the client's business running itself while they're closed.
 *
 * The warm gradient backdrop is a placeholder for a painterly illustration:
 * drop a file at /assets/hero-scene.png and set BG_IMAGE to swap it in.
 */
const BG_IMAGE = ""; // e.g. "/assets/hero-scene.png"

const CHAT = [
  { from: "them", text: "Hi, any openings this week?" },
  { from: "ai", text: "Yes — Tue 2:00 or Wed 11:00. Want me to hold one?" },
  { from: "them", text: "Tuesday works" },
  { from: "ai", text: "Booked ✓ Tue 2:00 PM. Confirmation + reminder sent." },
] as const;

type Card = {
  icon: LucideIcon;
  label: string;
  sub: string;
  pos: string;
  delay: number;
};

const CARDS: Card[] = [
  {
    icon: PhoneCall,
    label: "Missed call",
    sub: "texted back in 4s",
    pos: "left-0 top-10 sm:-left-6",
    delay: 0.6,
  },
  {
    icon: CalendarCheck,
    label: "Appointment booked",
    sub: "Tue 2:00 PM",
    pos: "right-0 top-28 sm:-right-8",
    delay: 0.9,
  },
  {
    icon: Star,
    label: "5-star review",
    sub: "requested automatically",
    pos: "left-0 bottom-16 sm:-left-8",
    delay: 1.2,
  },
  {
    icon: RefreshCw,
    label: "No-show",
    sub: "auto-rebooked",
    pos: "right-0 bottom-8 sm:-right-6",
    delay: 1.5,
  },
];

export function HeroScene() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md px-2 sm:px-6">
      {/* Background panel (clipped to rounded corners). The cards live in a
          separate, non-clipped layer on top so they can overhang the edges. */}
      <div
        className="absolute inset-0 overflow-hidden rounded-3xl border border-neutral-3 bg-gradient-to-b from-neutral-2 to-neutral-1 dark:border-neutral-dark-3 dark:from-neutral-dark-2 dark:to-neutral-dark-1"
        style={
          BG_IMAGE
            ? {
                backgroundImage: `url(${BG_IMAGE})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {/* warm lamp glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-neutral-orangeBg/25 blur-3xl"
        />
        {/* faint connector lines from centre toward the cards */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full text-neutral-orangeBg opacity-25"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            strokeDasharray="1.6 1.6"
          >
            <path d="M50 50 Q 28 36, 8 30" />
            <path d="M50 50 Q 74 40, 96 36" />
            <path d="M50 50 Q 26 66, 7 80" />
            <path d="M50 50 Q 74 70, 95 84" />
          </g>
        </svg>
      </div>

      {/* LIVE pill */}
      <div className="absolute right-4 top-4 z-40 inline-flex items-center gap-1.5 rounded-full bg-neutral-8/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white sm:right-8 dark:bg-black/70">
        <span className="relative flex h-2 w-2">
          {!reduce && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Live
      </div>

      {/* Content layer — phone + overhanging cards (not clipped) */}
      <div className="relative z-20 flex min-h-[460px] items-center justify-center py-10">
        <Phone reduce={!!reduce} />

        {CARDS.map((c, i) => (
          <motion.div
            key={c.label}
            className={`absolute z-30 ${c.pos}`}
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: c.delay, duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={
                reduce
                  ? undefined
                  : {
                      duration: 4 + i * 0.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: c.delay,
                    }
              }
            >
              <ProofCard {...c} />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-neutral-5 dark:text-neutral-dark-5">
        While you were closed.
      </p>
    </div>
  );
}

function Phone({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative z-10 w-[214px] rounded-[2rem] border-[5px] border-neutral-8 bg-neutral-1 p-2 shadow-2xl dark:border-black dark:bg-neutral-dark-1">
      {/* speaker notch */}
      <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-neutral-8/25 dark:bg-white/15" />

      {/* chat header */}
      <div className="flex items-center gap-2 px-2 pb-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-orangeBg text-white">
          <Sparkles size={13} />
        </span>
        <div className="leading-tight">
          <p className="text-[11px] font-semibold text-neutral-8 dark:text-neutral-dark-8">
            AI Front Desk
          </p>
          <p className="text-[9px] text-emerald-600 dark:text-emerald-500">
            online · replies in seconds
          </p>
        </div>
      </div>

      {/* messages */}
      <div className="flex min-h-[150px] flex-col gap-1.5 px-2 pb-1">
        {CHAT.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduce ? 0 : 0.4 + i * 0.55,
              duration: 0.35,
            }}
            className={m.from === "ai" ? "self-end" : "self-start"}
          >
            <span
              className={`inline-block max-w-[155px] rounded-2xl px-2.5 py-1.5 text-[10px] leading-snug ${
                m.from === "ai"
                  ? "rounded-br-sm bg-neutral-orangeBg text-white"
                  : "rounded-bl-sm bg-neutral-3 text-neutral-8 dark:bg-neutral-dark-3 dark:text-neutral-dark-8"
              }`}
            >
              {m.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* composer */}
      <div className="mx-2 mb-1 mt-1 flex items-center justify-between rounded-full border border-neutral-3 px-3 py-1.5 dark:border-neutral-dark-3">
        <span className="text-[9px] text-neutral-5 dark:text-neutral-dark-5">
          Message…
        </span>
        <span className="text-[9px] text-neutral-orangeBg">↑</span>
      </div>
    </div>
  );
}

function ProofCard({ icon: Icon, label, sub }: Card) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-neutral-3 bg-white/95 px-2.5 py-1.5 shadow-md backdrop-blur-sm dark:border-neutral-dark-3 dark:bg-neutral-dark-1/95">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-neutral-orangeBg/15 text-neutral-orangeBg">
        <Icon size={13} />
      </span>
      <div className="leading-tight">
        <p className="text-[10px] font-semibold text-neutral-8 dark:text-neutral-dark-8">
          {label}
        </p>
        <p className="text-[9px] text-neutral-6 dark:text-neutral-dark-6">
          {sub}
        </p>
      </div>
      <span className="ml-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-500">
        ✓
      </span>
    </div>
  );
}
