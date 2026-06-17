import type { NewLead } from "@/db/schema";

export type ContactInput = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** Honeypot — real users never fill this; bots do. */
  company?: unknown;
};

export type ValidationResult =
  | { ok: true; value: Omit<NewLead, "id" | "createdAt"> }
  | { ok: false; error: string; spam?: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/**
 * Pure, dependency-free validation so it can be unit-tested without a DB or
 * network. Also performs the honeypot spam check.
 */
export function validateContactInput(
  input: ContactInput,
  meta: { userAgent?: string; source?: string } = {}
): ValidationResult {
  // Honeypot: if filled, silently treat as spam.
  if (str(input.company).length > 0) {
    return { ok: false, error: "Rejected.", spam: true };
  }

  const name = str(input.name);
  const email = str(input.email);
  const subject = str(input.subject);
  const message = str(input.message);

  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (name.length > 200) return { ok: false, error: "That name is too long." };
  if (!EMAIL_RE.test(email))
    return { ok: false, error: "Please enter a valid email address." };
  if (email.length > 320)
    return { ok: false, error: "That email is too long." };
  if (message.length < 5)
    return { ok: false, error: "Tell me a little more so I can help." };
  if (message.length > 5000)
    return { ok: false, error: "That message is a bit too long." };
  if (subject.length > 300)
    return { ok: false, error: "That subject is too long." };

  return {
    ok: true,
    value: {
      name,
      email,
      subject: subject || null,
      message,
      source: meta.source ?? "homepage",
      userAgent: meta.userAgent ?? null,
    },
  };
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}
