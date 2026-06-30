import Link from "next/link";
import { Check } from "lucide-react";
import { Section, Kicker, SectionTitle } from "./Section";
import { ABOUT } from "../../../constants/agency";

export function AboutSection() {
  return (
    <Section id="about" number="04" className="bg-[rgba(255,250,240,0.52)]">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.8fr]">
        <div className="max-w-2xl">
          <Kicker>{ABOUT.kicker}</Kicker>
          <SectionTitle>{ABOUT.title}</SectionTitle>
          <div className="mt-6 space-y-4">
            {ABOUT.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-pretty text-base leading-relaxed text-[var(--field-muted)]"
              >
                {p}
              </p>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--field-muted)]">
            Want the full track record?{" "}
            <Link
              href="/resume"
              className="font-bold text-[var(--field-rust)] underline-offset-4 hover:underline"
            >
              See the resume and recent work →
            </Link>
          </p>
        </div>

        <ul className="field-card grid gap-3 p-6">
          {ABOUT.proofPoints.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center border border-[var(--field-line)] bg-[var(--field-paper)] text-[var(--field-forest)]">
                <Check size={13} />
              </span>
              <span className="text-sm text-[var(--field-muted)]">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
