import Link from "next/link";
import { Check } from "lucide-react";
import { Section, Kicker, SectionTitle } from "./Section";
import { ABOUT } from "../../../constants/agency";

export function AboutSection() {
  return (
    <Section id="about" className="bg-neutral-1/60 dark:bg-neutral-dark-1/40">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.8fr]">
        <div className="max-w-2xl">
          <Kicker>{ABOUT.kicker}</Kicker>
          <SectionTitle>{ABOUT.title}</SectionTitle>
          <div className="mt-6 space-y-4">
            {ABOUT.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-pretty text-base leading-relaxed text-neutral-7 dark:text-neutral-dark-7"
              >
                {p}
              </p>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-6 dark:text-neutral-dark-6">
            Want the full track record?{" "}
            <Link
              href="/resume"
              className="font-medium text-neutral-orangeBg underline-offset-4 hover:underline"
            >
              See the resume and recent work →
            </Link>
          </p>
        </div>

        <ul className="grid gap-3 rounded-2xl border border-neutral-3 bg-white p-6 dark:border-neutral-dark-3 dark:bg-neutral-dark-1">
          {ABOUT.proofPoints.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-orangeBg/15 text-neutral-orangeBg">
                <Check size={13} />
              </span>
              <span className="text-sm text-neutral-7 dark:text-neutral-dark-7">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
