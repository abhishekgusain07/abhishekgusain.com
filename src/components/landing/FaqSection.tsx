"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Section, Kicker, SectionTitle } from "./Section";
import { FAQS } from "../../../constants/agency";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" width="prose" number="06">
      <Kicker>Questions</Kicker>
      <SectionTitle>The things people ask before we start.</SectionTitle>

      <div className="mt-10 divide-y divide-[var(--field-line)] border-y-2 border-[var(--field-ink)]">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={faq.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-sm font-bold text-[var(--field-ink)] sm:text-base">
                  {faq.q}
                </span>
                <span className="shrink-0 text-[var(--field-rust)]">
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              {isOpen && (
                <p className="fade-in-50 animate-in -mt-1 max-w-2xl pb-5 text-sm leading-relaxed text-[var(--field-muted)]">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
