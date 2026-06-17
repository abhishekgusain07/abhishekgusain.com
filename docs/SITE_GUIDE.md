# abhishekgusain.com — Site Guide

This site is now a **personal-brand AI-services hub**, not a job-seeking portfolio.

- **`/`** — the AI-services landing page ("I build AI systems that grow service businesses"). This is the conversion asset.
- **`/resume`** — the old portfolio (bio, projects, GitHub graph) + the downloadable resume PDF.
- **`/logs`** — devlogs (unchanged).

## Why this structure (the strategy)

Research was clear: for a **solo operator selling high-trust services**, leading with your **own name** converts better than a faceless agency brand — a named, accountable human is the strongest lever against both the offshore-trust gap and 2026 "AI hype" skepticism. So the homepage sells _you_, and the business stays on your personal domain.

When you later run a **vertical funnel** (e.g. a med-spa-specific offer), put it on its **own brandable domain** as a separate landing page that borrows credibility from this hub — don't cram it in here, and don't rename the business after yourself (keep it sellable). This is the "hub + spokes" model.

## Editing the copy

Almost all marketing copy lives in **`constants/agency.ts`** — hero, services, process, about, guarantee, FAQs, final CTA, nav links, and the primary CTA. Edit there; the components render it. Keeping it as typed data is also what makes it unit-testable.

- **Primary CTA**: `LINKS.calendar` is empty, so every "Book a free AI audit" button currently opens a pre-filled email. When you set up scheduling, paste your **Cal.com / Calendly** URL into `LINKS.calendar` and every CTA switches to it automatically.
- **Services**: outcome/role names only (the tests enforce "no chatbot/automation/workflow" naming). Exactly one service is the flagship (`flagship: true`) — your gen-media Content Engine edge.

## Landing-page components

`src/components/landing/` — one component per section, composed in `src/app/page.tsx`:
`SiteNav`, `Hero`, `ProblemSection`, `ServicesSection`, `ProcessSection`, `AboutSection`, `GuaranteeSection`, `FaqSection`, `FinalCta`, `ContactSection`, `SiteFooter`.

Design system is the existing Tailwind setup, now themed with the **"Claude" theme** (tweakcn): a warm cream/terracotta light palette and a warm dark-brown dark palette, `neutral-orangeBg` = the Claude primary `#c96442`, dark/light via `next-themes`.

> **Theme note:** The theme's oklch tokens were converted to HSL triplets (in `globals.css` `:root` / `.dark`) so they work with this Tailwind **v3** project and keep `/opacity` modifiers functioning. The custom `neutral` / `neutral-dark` scales in `tailwind.config.ts` were remapped to the Claude palette, which themes the whole app (agency, resume, logs) with no per-component changes. To switch themes later, grab another theme JSON from [tweakcn.com](https://tweakcn.com), convert its oklch→HSL, and replace the values in `globals.css` + the `neutral` hex in `tailwind.config.ts`.

> **Font note:** the site previously loaded "Innovator Grotesk" from a scraper CDN that 404'd (so everything silently fell back to default sans). It's now self-hosted via `next/font` (Inter for body, Bricolage Grotesque for display) wired through CSS variables in `src/lib/fonts.ts` + `globals.css`.

## The contact form (lead capture)

**Form** → **`POST /api/contact`** → **(1) save to Postgres via Drizzle** + **(2) email you via Resend**.

Why both: instant email = speed-to-lead (respond before a competitor); the DB = you own the leads and can build follow-up automation on them later.

### Stack

- **Neon** (serverless Postgres) + **Drizzle ORM** (`src/db/schema.ts`, `src/db/index.ts`)
- **Resend** for the notification email
- Spam honeypot + server-side validation (`src/lib/leads.ts`, pure & unit-tested)

### One-time setup

1. **Database** — create a free Postgres at [neon.tech](https://neon.tech), copy the connection string.
2. **Email** — create a free key at [resend.com](https://resend.com).
3. Copy `.env.example` → `.env.local` and fill in:
   ```
   DATABASE_URL=...        # Neon connection string
   RESEND_API_KEY=...      # Resend key
   LEAD_NOTIFY_EMAIL=...   # where lead alerts go (defaults to your Gmail)
   ```
4. **Create the table:**
   ```bash
   npm run db:migrate     # applies drizzle/0000_*.sql to your DB
   # (or `npm run db:push` to push the schema directly the first time)
   ```
5. **View leads anytime:** `npm run db:studio`

### Behaviour without config

- **Dev, no `DATABASE_URL`:** submissions are validated and logged to the console (form still "works" so you can build the UI).
- **Production, no `DATABASE_URL`:** the route returns a 503 rather than silently dropping a real lead — so you can't accidentally ship a black-hole form.
- **No `RESEND_API_KEY`:** the lead is still saved; you just don't get the email ping.

### Changing the schema

Edit `src/db/schema.ts`, then `npm run db:generate` (creates a new migration) and `npm run db:migrate`.

## Scripts

| Command               | What it does                                            |
| --------------------- | ------------------------------------------------------- |
| `npm run dev`         | Local dev server                                        |
| `npm run build`       | Production build (typechecks too)                       |
| `npm test`            | Vitest suite (copy data, sections, form, validation)    |
| `npm run lint`        | ESLint                                                  |
| `npm run db:generate` | Create a Drizzle migration from the schema              |
| `npm run db:migrate`  | Apply migrations to `DATABASE_URL`                      |
| `npm run db:push`     | Push schema straight to the DB (first-time convenience) |
| `npm run db:studio`   | Browse the `leads` table in Drizzle Studio              |

## Tests

`npm test` — 29 tests covering: the agency copy data integrity (incl. the anti-commodity naming rule), every landing section renders its content, the contact form renders + posts, and the lead validator (valid/invalid/honeypot/length edge cases). Test setup lives in `test/` and `vitest.config.ts` (which stubs `next/link` for jsdom).

## Deploy notes

Netlify (`netlify.toml`). Remember to add the three env vars (`DATABASE_URL`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`) in the Netlify dashboard, and run the migration against your Neon DB once.
