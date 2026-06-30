"use client";

import { useReducedMotion } from "motion/react";
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
    <div className="relative mx-auto w-[calc(100vw-2rem)] max-w-md min-w-0 px-2 sm:w-full sm:px-6">
      {/* Background panel (clipped to rounded corners). The cards live in a
          separate, non-clipped layer on top so they can overhang the edges. */}
      <div
        className="field-panel absolute inset-0 overflow-hidden rotate-1"
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
        {/* faint connector lines from centre toward the cards */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full text-[var(--field-rust)] opacity-35"
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
      <div className="absolute right-4 top-4 z-40 inline-flex items-center gap-1.5 border border-[var(--field-ink)] bg-[var(--field-ink)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-normal text-[var(--field-panel)] sm:right-8">
        <span className="relative flex h-2 w-2">
          {!reduce && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--field-forest)] opacity-75" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--field-forest)]" />
        </span>
        Live
      </div>

      {/* Content layer — phone + overhanging cards (not clipped) */}
      <div className="relative z-20 flex min-h-[460px] items-center justify-center py-10">
        <Phone reduce={!!reduce} />

        {CARDS.map((c) => (
          <div key={c.label} className={`absolute z-30 ${c.pos}`}>
            <ProofCard {...c} />
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-xs font-semibold uppercase tracking-normal text-[var(--field-muted)]">
        While you were closed.
      </p>
    </div>
  );
}

function Phone({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative z-10 w-[214px] rounded-[1.25rem] border-[5px] border-[var(--field-ink)] bg-[var(--field-paper)] p-2 shadow-[0_18px_34px_rgba(43,32,18,0.18)]">
      {/* speaker notch */}
      <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-[rgba(27,27,23,0.25)] dark:bg-[rgba(247,242,232,0.25)]" />

      {/* chat header */}
      <div className="flex items-center gap-2 px-2 pb-2">
        <span className="flex h-7 w-7 items-center justify-center border border-[var(--field-ink)] bg-[var(--field-rust)] text-[var(--field-panel)]">
          <Sparkles size={13} />
        </span>
        <div className="leading-tight">
          <p className="text-[11px] font-bold text-[var(--field-ink)]">
            AI Front Desk
          </p>
          <p className="text-[9px] font-semibold text-[var(--field-forest)]">
            online · replies in seconds
          </p>
        </div>
      </div>

      {/* messages */}
      <div className="flex min-h-[150px] flex-col gap-1.5 px-2 pb-1">
        {CHAT.map((m, i) => (
          <div key={i} className={m.from === "ai" ? "self-end" : "self-start"}>
            <span
              className={`inline-block max-w-[155px] rounded px-2.5 py-1.5 text-[10px] leading-snug ${
                m.from === "ai"
                  ? "rounded-br-sm border border-[var(--field-ink)] bg-[var(--field-rust)] text-[var(--field-panel)]"
                  : "rounded-bl-sm border border-[var(--field-line)] bg-[#ede3d2] text-[var(--field-ink)] dark:bg-[var(--field-panel)]"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>

      {/* composer */}
      <div className="mx-2 mb-1 mt-1 flex items-center justify-between border border-[var(--field-line)] bg-[var(--field-panel)] px-3 py-1.5">
        <span className="text-[9px] text-[var(--field-muted)]">Message…</span>
        <span className="text-[9px] text-[var(--field-rust)]">↑</span>
      </div>
    </div>
  );
}

function ProofCard({ icon: Icon, label, sub }: Card) {
  return (
    <div className="flex items-center gap-2 border border-[var(--field-ink)] bg-[var(--field-panel)] px-2.5 py-1.5 shadow-[4px_4px_0_rgba(27,27,23,0.1)]">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-[var(--field-line)] bg-[var(--field-paper)] text-[var(--field-rust)]">
        <Icon size={13} />
      </span>
      <div className="leading-tight">
        <p className="text-[10px] font-bold text-[var(--field-ink)]">{label}</p>
        <p className="text-[9px] text-[var(--field-muted)]">{sub}</p>
      </div>
      <span className="ml-0.5 text-[11px] font-bold text-[var(--field-forest)]">
        ✓
      </span>
    </div>
  );
}
