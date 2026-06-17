"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Section, Kicker, SectionTitle } from "./Section";
import { FAQS } from "../../../constants/agency";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" width="prose">
      <Kicker>Questions</Kicker>
      <SectionTitle>The things people ask before we start.</SectionTitle>

      <div className="mt-10 divide-y divide-neutral-3 border-y border-neutral-3 dark:divide-neutral-dark-3 dark:border-neutral-dark-3">
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
                <span className="text-sm font-medium text-neutral-8 sm:text-base dark:text-neutral-dark-8">
                  {faq.q}
                </span>
                <span className="shrink-0 text-neutral-orangeBg">
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              {isOpen && (
                <p className="fade-in-50 animate-in -mt-1 max-w-2xl pb-5 text-sm leading-relaxed text-neutral-6 dark:text-neutral-dark-6">
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
