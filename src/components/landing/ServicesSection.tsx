import {
  PhoneCall,
  Zap,
  CalendarCheck,
  RefreshCw,
  Star,
  Clapperboard,
  Globe,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { Section, Kicker, SectionTitle } from "./Section";
import { CtaButton } from "./CtaButton";
import { SERVICES, PRIMARY_CTA } from "../../../constants/agency";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  PhoneCall,
  Zap,
  CalendarCheck,
  RefreshCw,
  Star,
  Clapperboard,
  Globe,
  LineChart,
};

export function ServicesSection() {
  return (
    <Section
      id="services"
      className="bg-neutral-1/60 dark:bg-neutral-dark-1/40"
    >
      <div className="max-w-2xl">
        <Kicker>What we build</Kicker>
        <SectionTitle>
          Systems with names and jobs — not vague “AI solutions.”
        </SectionTitle>
        <p className="mt-5 text-pretty text-base leading-relaxed text-neutral-7 dark:text-neutral-dark-7">
          Each one fixes a specific leak. We start with the one that wins you
          the most money fastest, then stack the rest.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => {
          const Icon = ICONS[s.icon] ?? Zap;
          return (
            <div
              key={s.name}
              className={cn(
                "group relative flex flex-col rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                s.flagship
                  ? "border-neutral-orangeBg/40 bg-neutral-orangeBg/[0.06]"
                  : "border-neutral-3 bg-white dark:border-neutral-dark-3 dark:bg-neutral-dark-1"
              )}
            >
              {s.flagship && (
                <span className="absolute right-4 top-4 rounded-full bg-neutral-orangeBg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  My edge
                </span>
              )}
              <span
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-lg",
                  s.flagship
                    ? "bg-neutral-orangeBg/15 text-neutral-orangeBg"
                    : "bg-neutral-2 text-neutral-8 dark:bg-neutral-dark-2 dark:text-neutral-dark-8"
                )}
              >
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-neutral-8 dark:text-neutral-dark-8">
                {s.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-neutral-orangeBg">
                {s.promise}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-6 dark:text-neutral-dark-6">
                {s.detail}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-neutral-3 bg-white p-6 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-dark-3 dark:bg-neutral-dark-1">
        <p className="text-sm text-neutral-7 dark:text-neutral-dark-7">
          Not sure which leak is costing you most?{" "}
          <span className="font-semibold text-neutral-8 dark:text-neutral-dark-8">
            That's exactly what the free audit tells you.
          </span>
        </p>
        <CtaButton href={PRIMARY_CTA.href} className="shrink-0">
          {PRIMARY_CTA.label}
        </CtaButton>
      </div>
    </Section>
  );
}
