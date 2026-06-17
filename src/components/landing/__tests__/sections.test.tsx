import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { Hero } from "../Hero";
import { ProblemSection } from "../ProblemSection";
import { ServicesSection } from "../ServicesSection";
import { ProcessSection } from "../ProcessSection";
import { AboutSection } from "../AboutSection";
import { GuaranteeSection } from "../GuaranteeSection";
import { FaqSection } from "../FaqSection";
import { SiteFooter } from "../SiteFooter";
import {
  SERVICES,
  PROBLEM,
  PROCESS,
  ABOUT,
  GUARANTEE,
  FAQS,
  PRIMARY_CTA,
  HERO,
} from "../../../../constants/agency";

describe("Hero", () => {
  it("shows the outcome headline, primary CTA, and qualifying microline", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      HERO.titleLead
    );
    // primary CTA appears (mailto anchor)
    const ctas = screen.getAllByText(PRIMARY_CTA.label);
    expect(ctas.length).toBeGreaterThan(0);
    expect(screen.getByText(HERO.microline)).toBeInTheDocument();
  });
});

describe("ProblemSection", () => {
  it("renders the wedge title and every pain stat", () => {
    render(<ProblemSection />);
    expect(screen.getByText(PROBLEM.title)).toBeInTheDocument();
    for (const p of PROBLEM.pains) {
      expect(screen.getByText(p.label)).toBeInTheDocument();
    }
  });
});

describe("ServicesSection", () => {
  it("lists every named service offer", () => {
    render(<ServicesSection />);
    for (const s of SERVICES) {
      expect(screen.getByText(s.name)).toBeInTheDocument();
    }
  });

  it("badges the flagship (gen-media) service", () => {
    render(<ServicesSection />);
    expect(screen.getByText(/my edge/i)).toBeInTheDocument();
  });
});

describe("ProcessSection", () => {
  it("renders all three steps in order", () => {
    render(<ProcessSection />);
    for (const step of PROCESS) {
      expect(
        screen.getByRole("heading", { name: step.title })
      ).toBeInTheDocument();
    }
  });
});

describe("AboutSection", () => {
  it("renders the founder positioning and proof points", () => {
    render(<AboutSection />);
    expect(screen.getByText(ABOUT.title)).toBeInTheDocument();
    expect(screen.getByText(ABOUT.proofPoints[0])).toBeInTheDocument();
  });
});

describe("GuaranteeSection", () => {
  it("renders the risk-reversal", () => {
    render(<GuaranteeSection />);
    expect(screen.getByText(GUARANTEE.title)).toBeInTheDocument();
  });
});

describe("FaqSection", () => {
  it("opens the first answer by default and toggles others on click", () => {
    render(<FaqSection />);
    // first answer visible
    expect(screen.getByText(FAQS[0].a)).toBeInTheDocument();
    // second answer hidden until clicked
    expect(screen.queryByText(FAQS[1].a)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: FAQS[1].q }));
    expect(screen.getByText(FAQS[1].a)).toBeInTheDocument();
  });
});

describe("SiteFooter", () => {
  it("renders the connect links", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByText("LinkedIn")).toBeInTheDocument();
    expect(within(footer).getByText("GitHub")).toBeInTheDocument();
  });
});
