import { ShieldCheck } from "lucide-react";
import { Section, Kicker } from "./Section";
import { GUARANTEE } from "../../../constants/agency";

export function GuaranteeSection() {
  return (
    <Section id="guarantee" number="05">
      <div className="relative overflow-hidden border-2 border-[var(--field-rust)] bg-[#fff1df] p-8 shadow-[8px_8px_0_rgba(184,74,47,0.12)] sm:p-12 dark:bg-[var(--field-panel)]">
        <ShieldCheck
          aria-hidden
          className="absolute -right-6 -top-6 text-[var(--field-rust)] opacity-10"
          size={160}
        />
        <div className="relative max-w-2xl">
          <Kicker>{GUARANTEE.kicker}</Kicker>
          <h2 className="field-serif text-balance text-2xl font-bold leading-tight text-[var(--field-ink)] sm:text-3xl">
            {GUARANTEE.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-[var(--field-muted)]">
            {GUARANTEE.body}
          </p>
        </div>
      </div>
    </Section>
  );
}
