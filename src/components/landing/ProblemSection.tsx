import { Section, Kicker, SectionTitle } from "./Section";
import { PROBLEM } from "../../../constants/agency";

export function ProblemSection() {
  return (
    <Section id="problem">
      <div className="max-w-2xl">
        <Kicker>{PROBLEM.kicker}</Kicker>
        <SectionTitle>{PROBLEM.title}</SectionTitle>
        <p className="mt-5 text-pretty text-base leading-relaxed text-neutral-7 dark:text-neutral-dark-7">
          {PROBLEM.body}
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROBLEM.pains.map((p) => (
          <div
            key={p.label}
            className="rounded-xl border border-neutral-3 bg-neutral-1 p-5 dark:border-neutral-dark-3 dark:bg-neutral-dark-1"
          >
            <p className="text-2xl font-semibold tracking-tight text-neutral-orangeBg">
              {p.stat}
            </p>
            <p className="mt-2 text-sm font-medium text-neutral-8 dark:text-neutral-dark-8">
              {p.label}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-6 dark:text-neutral-dark-6">
              {p.detail}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
