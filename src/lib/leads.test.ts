import { describe, it, expect } from "vitest";
import { validateContactInput, isValidEmail } from "./leads";

describe("validateContactInput", () => {
  const good = {
    name: "Jane Doe",
    email: "jane@example.com",
    subject: "Glow Med Spa",
    message: "We miss a lot of calls after hours.",
  };

  it("accepts a valid submission and trims fields", () => {
    const res = validateContactInput({
      ...good,
      name: "  Jane Doe  ",
    });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.value.name).toBe("Jane Doe");
      expect(res.value.email).toBe("jane@example.com");
      expect(res.value.subject).toBe("Glow Med Spa");
      expect(res.value.source).toBe("homepage");
    }
  });

  it("treats a filled honeypot as spam (silently)", () => {
    const res = validateContactInput({ ...good, company: "bot inc" });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.spam).toBe(true);
  });

  it("rejects an invalid email", () => {
    const res = validateContactInput({ ...good, email: "not-an-email" });
    expect(res.ok).toBe(false);
  });

  it("rejects a too-short message", () => {
    const res = validateContactInput({ ...good, message: "hi" });
    expect(res.ok).toBe(false);
  });

  it("rejects a missing name", () => {
    const res = validateContactInput({ ...good, name: "" });
    expect(res.ok).toBe(false);
  });

  it("allows an empty subject (stored as null)", () => {
    const res = validateContactInput({ ...good, subject: "" });
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.value.subject).toBeNull();
  });

  it("rejects an over-long message", () => {
    const res = validateContactInput({ ...good, message: "x".repeat(5001) });
    expect(res.ok).toBe(false);
  });
});

describe("isValidEmail", () => {
  it("validates common formats", () => {
    expect(isValidEmail("a@b.co")).toBe(true);
    expect(isValidEmail("first.last@sub.domain.com")).toBe(true);
    expect(isValidEmail("nope")).toBe(false);
    expect(isValidEmail("a@b")).toBe(false);
  });
});
