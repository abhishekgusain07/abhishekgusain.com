import { describe, it, expect } from "vitest";
import {
  SERVICES,
  PROCESS,
  FAQS,
  PRIMARY_CTA,
  SECONDARY_CTA,
  PROBLEM,
  NAV_LINKS,
  LINKS,
} from "./agency";

describe("agency data integrity", () => {
  it("has services, each fully populated", () => {
    expect(SERVICES.length).toBeGreaterThanOrEqual(6);
    for (const s of SERVICES) {
      expect(s.icon).toBeTruthy();
      expect(s.name).toBeTruthy();
      expect(s.promise).toBeTruthy();
      expect(s.detail).toBeTruthy();
    }
  });

  it("marks exactly one flagship service (the gen-media edge)", () => {
    expect(SERVICES.filter((s) => s.flagship)).toHaveLength(1);
  });

  it("never names services after the raw mechanism (anti-commodity rule)", () => {
    const banned = /\b(chatbot|automation|workflow|integration|bot)\b/i;
    for (const s of SERVICES) {
      expect(s.name).not.toMatch(banned);
    }
  });

  it("has a 3-step audit→build→run process", () => {
    expect(PROCESS).toHaveLength(3);
    expect(PROCESS.map((p) => p.title)).toEqual(["Audit", "Build", "Run"]);
  });

  it("has FAQs, each with a question and answer", () => {
    expect(FAQS.length).toBeGreaterThanOrEqual(4);
    for (const f of FAQS) {
      expect(f.q.length).toBeGreaterThan(0);
      expect(f.a.length).toBeGreaterThan(0);
    }
  });

  it("resolves a working primary CTA and an in-page secondary CTA", () => {
    expect(PRIMARY_CTA.label).toBeTruthy();
    expect(PRIMARY_CTA.href).toBeTruthy();
    // Either a scheduling URL, or the in-page contact form anchor.
    expect(PRIMARY_CTA.href).toMatch(/^(#|mailto:|https?:\/\/)/);
    expect(SECONDARY_CTA.href.startsWith("#")).toBe(true);
  });

  it("prefers a calendar link when configured, else the contact form anchor", () => {
    // Guards the swap path: setting LINKS.calendar must take over the CTA;
    // otherwise the CTA scrolls to the on-page form (#contact).
    if (LINKS.calendar) {
      expect(PRIMARY_CTA.href).toBe(LINKS.calendar);
    } else {
      expect(PRIMARY_CTA.href).toBe("#contact");
    }
  });

  it("points every nav link at a real section anchor", () => {
    for (const l of NAV_LINKS) {
      expect(l.href.startsWith("#")).toBe(true);
    }
  });

  it("frames the problem with concrete pains", () => {
    expect(PROBLEM.pains.length).toBeGreaterThanOrEqual(3);
    for (const p of PROBLEM.pains) {
      expect(p.stat).toBeTruthy();
      expect(p.label).toBeTruthy();
    }
  });
});
