/**
 * Single source of truth for the AI-services landing page (the homepage).
 *
 * Why this file exists: the homepage is a conversion asset, not a static
 * brochure. Keeping the offer, services, process and FAQs as typed data means
 * the copy can be tuned without touching layout, and the structure can be
 * unit-tested (see src/components/landing/__tests__).
 *
 * Positioning (from research): lead with the named human (trust beats a faceless
 * agency for an offshore solo), sell OUTCOMES via NAMED mechanisms (never
 * "chatbot"/"automation"), anti-hype, proof-in-advance via a free audit.
 */

export const CONTACT = {
  email: "abhishek.gusain1007fb@gmail.com",
  linkedin: "https://www.linkedin.com/in/abhishekgusain1007/",
  twitter: "https://x.com/IamAbhiGusain",
  github: "https://github.com/abhishekgusain07",
} as const;

/**
 * Primary CTA destination. Defaults to a pre-filled email so it works the
 * instant this ships. Swap `bookCall` to a Cal.com / Calendly URL when ready —
 * every CTA on the page reads from here, so one edit updates them all.
 */
const auditSubject = "Free AI Audit — let's find the gaps";
const auditBody =
  "Hi Abhishek,\n\nI run a business and I'd like the free AI audit.\n\n" +
  "- Business / website:\n- What I do:\n- Roughly how I get customers today:\n" +
  "- The one thing eating the most time or money right now:\n\nThanks!";

export const LINKS = {
  bookCall: `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    auditSubject
  )}&body=${encodeURIComponent(auditBody)}`,
  email: `mailto:${CONTACT.email}`,
  resume: "/resume",
  // TODO: when you set up scheduling, paste the Cal.com/Calendly link here and
  // it becomes the primary CTA everywhere automatically.
  calendar: "" as string,
} as const;

/** The single primary call-to-action, resolved once.
 *  Defaults to scrolling to the on-page contact form (#contact). If you set
 *  `LINKS.calendar`, every CTA switches to your scheduling link instead. */
export const PRIMARY_CTA = {
  label: "Book a free AI audit",
  href: LINKS.calendar || "#contact",
} as const;

export const SECONDARY_CTA = {
  label: "See what I build",
  href: "#services",
} as const;

export const HERO = {
  eyebrow: "AI automation for service businesses · forward-deployed engineer",
  // Outcome-led headline (CityCliq: plain-outcome headlines beat clever ones).
  titleLead: "I build AI systems that",
  titleRotators: [
    "book more clients",
    "recover lost revenue",
    "kill the busywork",
  ],
  titleTail: "for your business.",
  // Subhead = mechanism + objection-handler ("without …").
  subhead:
    "I'm Abhishek — an engineer who installs AI into how your business actually runs, then makes sure it works. You get booked appointments, recovered revenue and hours back. No hype, no buzzwords, and no full-time hire.",
  microline:
    "For US service businesses that already have customers and want AI that pays for itself — not a science project.",
} as const;

/**
 * Honest problem framing. These are INDUSTRY stats (attributed), used to make
 * the pain visceral — they are NOT claimed as the operator's own results.
 */
export const PROBLEM = {
  kicker: "The real problem",
  title: "Everyone has AI. Almost nobody is getting results.",
  body: "Roughly 8 in 10 businesses now use AI — and only about 1 in 16 sees a real bottom-line impact (McKinsey, 2025). The tools aren't the problem. The gap is everything between a shiny demo and a system that quietly runs in your business every day. That's the part I do.",
  pains: [
    {
      stat: "62%",
      label: "of calls to local businesses go unanswered",
      detail:
        "and most callers never call back — they just book your competitor.",
    },
    {
      stat: "5 min",
      label: "is all it takes for a lead to go cold",
      detail:
        "respond in minutes and you book the job; respond tomorrow and it's gone.",
    },
    {
      stat: "10–20%",
      label: "of booked appointments are no-shows",
      detail: "empty slots you already paid marketing to fill.",
    },
    {
      stat: "hours/day",
      label: "lost to manual follow-up and admin",
      detail: "copy-paste work a system should be doing while you sleep.",
    },
  ],
} as const;

export type Service = {
  /** lucide-react icon name */
  icon: string;
  /** Outcome/role name — never the mechanism (no "chatbot"/"automation"). */
  name: string;
  /** One-line outcome promise. */
  promise: string;
  /** What it actually does, in plain English. */
  detail: string;
  /** True for the operator's unfair-advantage offer (gen-media background). */
  flagship?: boolean;
};

export const SERVICES: Service[] = [
  {
    icon: "PhoneCall",
    name: "AI Front Desk",
    promise: "Never miss another lead — answered in seconds, 24/7.",
    detail:
      "A voice + text agent that picks up every call and message, answers questions, and books the appointment straight into your calendar — nights, weekends, while you're with a client.",
  },
  {
    icon: "Zap",
    name: "Speed-to-Lead Engine",
    promise: "Reach new leads before your competitor does.",
    detail:
      "The instant a lead comes in from an ad, form or DM, it gets an instant personal reply and a booking link — automatically. First to respond usually wins the job.",
  },
  {
    icon: "CalendarCheck",
    name: "No-Show Shield",
    promise: "Turn empty slots back into revenue.",
    detail:
      "Smart reminders, confirmations and instant rebooking that cut no-shows and backfill cancellations — so the calendar you worked to fill actually shows up.",
  },
  {
    icon: "RefreshCw",
    name: "Database Reactivation",
    promise: "Pull revenue out of customers you already have.",
    detail:
      "A campaign that quietly works your old leads and past customers and brings the warm ones back to book again. Usually the fastest money in the building.",
  },
  {
    icon: "Star",
    name: "Review Engine",
    promise: "More 5-star reviews, on autopilot.",
    detail:
      "Every happy customer gets asked at the right moment, and every review gets a reply — so you climb the map rankings without chasing anyone.",
  },
  {
    icon: "Clapperboard",
    name: "Content Engine",
    promise: "Scroll-stopping content without a production team.",
    detail:
      "AI-generated reels, before/after visuals and ads in your brand — produced at a quality and pace a template-reselling agency simply can't match. This is what I did before this.",
    flagship: true,
  },
  {
    icon: "Globe",
    name: "Conversion Website",
    promise: "A fast site built to book, not just to look pretty.",
    detail:
      "A clean, quick, mobile-first site wired to your booking, your CRM and every system above — so traffic turns into appointments instead of bouncing.",
  },
  {
    icon: "LineChart",
    name: "Daily Business Brief",
    promise: "Know your numbers without opening a dashboard.",
    detail:
      "A plain-English text each morning: new leads, bookings, no-shows, reviews and what needs your attention. Your whole growth engine on one screen.",
  },
];

export type ProcessStep = {
  step: string;
  title: string;
  detail: string;
};

export const PROCESS: ProcessStep[] = [
  {
    step: "01",
    title: "Audit",
    detail:
      "I look at how you get and keep customers today and map exactly where money is leaking — missed calls, dead leads, no-shows, manual work. You get a clear plan and the numbers, free, before you spend a rupee. (Yes, even if we never work together.)",
  },
  {
    step: "02",
    title: "Build",
    detail:
      "I install the specific systems that fix the biggest leaks first — wired into the tools you already use. Because I actually code, it's built around your business and you own it. No duct-taped templates, no black box.",
  },
  {
    step: "03",
    title: "Run",
    detail:
      "I keep it running, watch the numbers, and improve it every month. You get the daily brief and a single person accountable for results — not a ticket queue. We scale what works.",
  },
];

export const ABOUT = {
  kicker: "Why me",
  title: "An engineer who ships — not an agency reselling templates.",
  paragraphs: [
    'I\'m Abhishek Gusain. I build software for a living, and before this I worked at an AI startup building the systems behind AI image, audio and video generation. So when I say "AI," I mean things I can actually build — not a ChatGPT subscription with a markup.',
    'Most "AI agencies" resell the same template and disappear. I write the code, wire it into your business, and stay accountable for whether it actually moves your numbers. You own everything I build.',
    "I work remotely with US businesses, which means I'm fast, async, and a fraction of the cost of a local hire — without cutting corners on quality. The work speaks first: I'll show you the gaps before you ever pay me.",
  ],
  proofPoints: [
    "Real engineer — I build custom systems, you own the IP",
    "Background in AI image / audio / video generation",
    "One accountable human, not a ticket queue",
    "Proof first: free audit before any commitment",
  ],
} as const;

export const GUARANTEE = {
  kicker: "Risk reversal",
  title: "The risk is mine, not yours.",
  body: "Start with the free audit. If I can't point to real, recoverable revenue hiding in your business, we shake hands and part as friends — you keep the plan either way. And when we do build, the first system is tied to a clear outcome: if it doesn't do what I said it would, I fix it free until it does.",
} as const;

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Is this just ChatGPT with a markup?",
    a: "No. I'm an engineer — I build real systems wired into your phone, calendar, CRM and website, and you own them. ChatGPT is one small ingredient, not the product. The value is in the plumbing that makes it run reliably in your business every day.",
  },
  {
    q: "You're remote — does that actually work?",
    a: "Yes, and it's an advantage. Everything I build is digital, so location is irrelevant to the result. You get faster turnaround, clear async updates, screen-recorded walkthroughs of everything, and a price a local agency can't touch. We hop on a call whenever you want to see it live.",
  },
  {
    q: "What does it cost?",
    a: "It depends on what's leaking and what we fix — most engagements start with a focused build and a monthly fee to run and improve it. The free audit gives you exact numbers and a scoped quote before you commit to anything. No surprises.",
  },
  {
    q: "What if something breaks?",
    a: "I monitor the systems and I'm the one person accountable for them — not a support queue. If something needs attention, it gets handled. You also get the Daily Business Brief so you always know things are running.",
  },
  {
    q: "I've been burned by an 'AI guy' before.",
    a: "Most people have — that's exactly why I lead with a free audit and a fix-it-free guarantee. You see real value and a clear plan before you pay, and I stay on the hook for results. Proof first, promises never.",
  },
  {
    q: "Do I own what you build?",
    a: "Completely. It's built into your accounts and your tools, in your name. If we ever stop working together, you keep everything — no hostage situations, no locked black box.",
  },
];

export const FINAL_CTA = {
  title: "Let's find the money your business is leaving on the table.",
  body: "The audit is free and there's no pitch — just a clear look at where AI can win you appointments, recover revenue, and buy back your time. Worst case, you walk away with a plan.",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#process" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;
