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
    <Section id="services" number="02" className="bg-[rgba(255,250,240,0.52)]">
      <div className="max-w-2xl">
        <Kicker>What we build</Kicker>
        <SectionTitle>
          Systems with names and jobs — not vague “AI solutions.”
        </SectionTitle>
        <p className="mt-5 text-pretty text-base leading-relaxed text-[var(--field-muted)]">
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
                "field-card group relative flex flex-col p-5 transition-all duration-200 hover:-translate-y-0.5",
                s.flagship
                  ? "border-[var(--field-rust)] bg-[#fff4df] dark:bg-[var(--field-panel)]"
                  : ""
              )}
            >
              {s.flagship && (
                <span className="absolute right-4 top-4 border border-[var(--field-ink)] bg-[var(--field-rust)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-normal text-[var(--field-panel)]">
                  My edge
                </span>
              )}
              <span
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center border",
                  s.flagship
                    ? "border-[var(--field-rust)] bg-[var(--field-paper)] text-[var(--field-rust)]"
                    : "border-[var(--field-line)] bg-[var(--field-paper)] text-[var(--field-ink)]"
                )}
              >
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-base font-bold tracking-normal text-[var(--field-ink)]">
                {s.name}
              </h3>
              <p className="mt-1 text-sm font-bold text-[var(--field-rust)]">
                {s.promise}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--field-muted)]">
                {s.detail}
              </p>
            </div>
          );
        })}
      </div>

      <div className="field-ink-panel mt-10 flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--field-panel)]">
          Not sure which leak is costing you most?{" "}
          <span className="font-bold text-white">
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
