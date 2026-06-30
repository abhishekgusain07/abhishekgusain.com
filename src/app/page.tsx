import type { Metadata } from "next";
import { SiteNav } from "@/components/landing/SiteNav";
import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { GuaranteeSection } from "@/components/landing/GuaranteeSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const metadata: Metadata = {
  title: "Abhishek Gusain — AI Systems That Grow Service Businesses",
  description:
    "I'm an engineer who installs AI into how your business runs — booking more clients, recovering lost revenue, and saving you hours. No hype, no full-time hire. Start with a free AI audit.",
  openGraph: {
    title: "Abhishek Gusain — AI Systems That Grow Service Businesses",
    description:
      "An engineer who builds AI systems that book more clients, recover lost revenue, and kill the busywork. Start with a free AI audit.",
    type: "website",
    url: "https://abhishekgusain.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Gusain — AI Systems That Grow Service Businesses",
    description:
      "An engineer who builds AI systems that book more clients and recover lost revenue. Free AI audit.",
  },
};

export default function Home() {
  return (
    <div className="field-surface">
      <SiteNav />
      <main>
        <Hero />
        <ProblemSection />
        <ServicesSection />
        <ProcessSection />
        <AboutSection />
        <GuaranteeSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
