import { Section, Kicker, SectionTitle } from "./Section";
import { PROCESS } from "../../../constants/agency";

export function ProcessSection() {
  return (
    <Section id="process">
      <div className="max-w-2xl">
        <Kicker>How it works</Kicker>
        <SectionTitle>Three steps. The first one is free.</SectionTitle>
        <p className="mt-5 text-pretty text-base leading-relaxed text-neutral-7 dark:text-neutral-dark-7">
          No long contracts to find out if this works. You see the value before
          you commit to anything.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PROCESS.map((step, idx) => (
          <div key={step.step} className="relative">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold tracking-tighter text-neutral-orangeBg">
                {step.step}
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-neutral-8 dark:text-neutral-dark-8">
                {step.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-neutral-6 dark:text-neutral-dark-6">
              {step.detail}
            </p>
            {idx < PROCESS.length - 1 && (
              <span
                aria-hidden
                className="absolute -right-3 top-3 hidden text-neutral-3 md:block dark:text-neutral-dark-3"
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
