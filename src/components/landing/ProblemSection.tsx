import { Section, Kicker, SectionTitle } from "./Section";
import { PROBLEM } from "../../../constants/agency";

export function ProblemSection() {
  return (
    <Section id="problem" number="01">
      <div className="max-w-2xl">
        <Kicker>{PROBLEM.kicker}</Kicker>
        <SectionTitle>{PROBLEM.title}</SectionTitle>
        <p className="mt-5 text-pretty text-base leading-relaxed text-[var(--field-muted)]">
          {PROBLEM.body}
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROBLEM.pains.map((p) => (
          <div key={p.label} className="field-card p-5">
            <p className="field-serif text-3xl font-bold text-[var(--field-rust)]">
              {p.stat}
            </p>
            <p className="mt-2 text-sm font-bold text-[var(--field-ink)]">
              {p.label}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--field-muted)]">
              {p.detail}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
