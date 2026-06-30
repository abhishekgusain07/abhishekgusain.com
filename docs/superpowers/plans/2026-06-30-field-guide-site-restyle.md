# Field Guide Site Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle all non-resume site surfaces into the approved field-guide report style while preserving existing content and behavior.

**Architecture:** Update global tokens first, then restyle shared primitives, landing sections, hero diagram, and logs pages in place. Avoid broad restructuring; this is a presentation-layer change over the existing component tree.

**Tech Stack:** Next.js App Router, React, Tailwind CSS, lucide-react, motion.

---

### Task 1: Global Field-Guide Foundation

**Files:**

- Modify: `.gitignore`
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `src/components/theme-toggle.tsx`

- [ ] Add `.superpowers/` to `.gitignore`.
- [ ] Replace global palette values with warm paper, ink, panel, rust, forest, gold, and blue equivalents.
- [ ] Add subtle grid-paper background to `body`.
- [ ] Switch global body font stack to Aptos/Segoe UI and add helper styles for serif headings.
- [ ] Restyle theme toggle as a small ink-bordered utility control.

### Task 2: Shared Landing Primitives

**Files:**

- Modify: `src/components/landing/Section.tsx`
- Modify: `src/components/landing/CtaButton.tsx`
- Modify: `src/components/landing/SiteNav.tsx`
- Modify: `src/components/landing/SiteFooter.tsx`

- [ ] Add optional `number` support to `Section` for oversized section numerals.
- [ ] Restyle `Kicker` and `SectionTitle` to match the field-guide system.
- [ ] Make CTAs crisp rectangular ink/rust controls with no pill or glass styling.
- [ ] Restyle nav as an editorial top rule with paper background and ink text.
- [ ] Restyle footer as a bordered report closing section.

### Task 3: Homepage Sections

**Files:**

- Modify: `src/components/landing/Hero.tsx`
- Modify: `src/components/landing/HeroScene.tsx`
- Modify: `src/components/landing/ProblemSection.tsx`
- Modify: `src/components/landing/ServicesSection.tsx`
- Modify: `src/components/landing/ProcessSection.tsx`
- Modify: `src/components/landing/AboutSection.tsx`
- Modify: `src/components/landing/GuaranteeSection.tsx`
- Modify: `src/components/landing/FaqSection.tsx`
- Modify: `src/components/landing/ContactSection.tsx`

- [ ] Convert the hero to a two-column report lead with serif headline and field-guide buttons.
- [ ] Keep the current hero diagram content, but restyle the phone scene and proof cards with paper panels, ink borders, small radii, and block shadows.
- [ ] Convert repeated cards to ink-bordered paper panels.
- [ ] Turn process into a timeline strip.
- [ ] Turn guarantee into a warning/risk-reversal panel.
- [ ] Turn contact into a high-contrast thesis/contact panel with field-guide form styling.

### Task 4: Logs Pages

**Files:**

- Modify: `src/app/logs/page.tsx`
- Modify: `src/app/logs/[date]/page.tsx`
- Modify: `src/components/ShareButton.tsx`

- [ ] Restyle `/logs` as a field log index with paper controls and bordered rows.
- [ ] Restyle `/logs/[date]` as a printable field note with a serif masthead and bordered sections.
- [ ] Restyle share button to match shared report controls.

### Task 5: Verification

**Files:**

- Inspect: `/`
- Inspect: `/logs`
- Inspect: `/logs/2025-07-08`
- Inspect: `/resume`

- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Start the dev server.
- [ ] Inspect desktop and mobile screenshots.
- [ ] Confirm text does not overlap and `/resume` was not modified.
