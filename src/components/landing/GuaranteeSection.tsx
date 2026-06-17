import { ShieldCheck } from "lucide-react";
import { Section, Kicker } from "./Section";
import { GUARANTEE } from "../../../constants/agency";

export function GuaranteeSection() {
  return (
    <Section id="guarantee">
      <div className="relative overflow-hidden rounded-3xl border border-neutral-orangeBg/30 bg-neutral-orangeBg/[0.06] p-8 sm:p-12">
        <ShieldCheck
          aria-hidden
          className="absolute -right-6 -top-6 text-neutral-orangeBg/10"
          size={160}
        />
        <div className="relative max-w-2xl">
          <Kicker>{GUARANTEE.kicker}</Kicker>
          <h2 className="text-balance text-2xl font-semibold tracking-tighter text-neutral-8 sm:text-3xl dark:text-neutral-dark-8">
            {GUARANTEE.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-neutral-7 dark:text-neutral-dark-7">
            {GUARANTEE.body}
          </p>
        </div>
      </div>
    </Section>
  );
}
