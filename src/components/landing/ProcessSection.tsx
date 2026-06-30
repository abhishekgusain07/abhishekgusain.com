import { Section, Kicker, SectionTitle } from "./Section";
import { PROCESS } from "../../../constants/agency";

export function ProcessSection() {
  return (
    <Section id="process" number="03">
      <div className="max-w-2xl">
        <Kicker>How it works</Kicker>
        <SectionTitle>Three steps. The first one is free.</SectionTitle>
        <p className="mt-5 text-pretty text-base leading-relaxed text-[var(--field-muted)]">
          No long contracts to find out if this works. You see the value before
          you commit to anything.
        </p>
      </div>

      <div className="mt-12 grid overflow-hidden border-2 border-[var(--field-ink)] bg-[var(--field-panel)] md:grid-cols-3">
        {PROCESS.map((step, idx) => (
          <div
            key={step.step}
            className="relative border-b border-[var(--field-line)] p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
          >
            <div className="flex items-center gap-3">
              <span className="field-serif text-4xl font-bold text-[var(--field-rust)]">
                {step.step}
              </span>
              <h3 className="text-lg font-bold tracking-normal text-[var(--field-ink)]">
                {step.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--field-muted)]">
              {step.detail}
            </p>
            {idx < PROCESS.length - 1 && (
              <span
                aria-hidden
                className="absolute -right-3 top-5 z-10 hidden bg-[var(--field-panel)] px-1 text-[var(--field-rust)] md:block"
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
