# Field Guide Site Restyle Design

## Goal

Restyle the site into the `field-guide-report-style` visual system while keeping the existing copy, content structure, and homepage hero diagram. Apply the style to the homepage, logs list, log detail pages, shared navigation/footer/buttons, and global theme tokens. Leave `/resume` unchanged.

## Approved Direction

The page should feel like a practical operator's field guide: warm paper, crisp ink borders, visible grid texture, serif report headings, compact sans body text, small-radius cards, and grounded accents in rust, forest, gold, and blue.

The homepage hero keeps the existing right-side AI Front Desk phone/proof-card diagram. That diagram should be restyled with paper panels, ink borders, block shadows, and report-like labels, but its content and purpose must remain the same.

## Scope

In scope:

- Global color/font/background tokens.
- Homepage landing sections under `src/components/landing`.
- Logs index at `/logs`.
- Log detail pages at `/logs/[date]`.
- Shared button, theme toggle, and footer styling used by non-resume surfaces.
- `.gitignore` entry for local `.superpowers/` brainstorming files.

Out of scope:

- `/resume` page implementation and `PortfolioHome` styling.
- Copy changes.
- New data, integrations, or behavior changes.

## Component Approach

Use the existing components and constants. Do not introduce a new design system package. Add small reusable landing utilities in `Section.tsx` for numbered field-guide sections and consistent heading/kicker styles. Keep cards as simple bordered panels, not nested card structures.

Use global CSS variables for the field-guide palette so Tailwind theme colors and raw CSS agree. The body background should be warm paper with a subtle grid field. Dark mode can remain functional, but the primary non-resume experience should read as the field-guide paper style.

## Verification

- Build or typecheck the project.
- Run existing tests.
- Visually inspect homepage and logs on desktop and mobile.
- Confirm `/resume` still renders with its existing page component and has not been edited.
