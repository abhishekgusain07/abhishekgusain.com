import { Bricolage_Grotesque, Inter } from "next/font/google";

const bricolage_grotesque_init = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter_init = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// className helpers (kept for existing usage, e.g. ui/Title.tsx)
export const bricolage_grotesque = bricolage_grotesque_init.className;
export const inter = inter_init.className;

// CSS-variable classes applied once on <html> so the whole site can reference
// `var(--font-sans)` / `var(--font-display)`. Replaces the dead remote
// "Innovator Grotesk" @font-face that was 404ing from a scraper CDN.
export const fontVariables = `${inter_init.variable} ${bricolage_grotesque_init.variable}`;
