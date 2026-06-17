import { ArrowRight } from "lucide-react";
import { CtaButton } from "./CtaButton";
import { FINAL_CTA, PRIMARY_CTA } from "../../../constants/agency";

export function FinalCta() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="relative mx-auto max-w-screen-lg overflow-hidden rounded-3xl bg-neutral-8 px-6 py-14 text-center sm:px-12 dark:bg-neutral-dark-2">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-neutral-orangeBg/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
            {FINAL_CTA.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-neutral-4 dark:text-neutral-dark-7">
            {FINAL_CTA.body}
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton
              href={PRIMARY_CTA.href}
              className="px-6 py-3.5 text-base"
            >
              {PRIMARY_CTA.label}
              <ArrowRight size={18} />
            </CtaButton>
          </div>
          <p className="mt-4 text-xs text-neutral-5">
            Free · no pitch · you keep the plan either way.
          </p>
        </div>
      </div>
    </section>
  );
}
