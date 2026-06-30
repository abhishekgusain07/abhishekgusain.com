"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowRight, Check, Copy } from "lucide-react";
import { FINAL_CTA, CONTACT } from "../../../constants/agency";

type FormValues = {
  name: string;
  email: string;
  message: string;
  /** Honeypot — real users never fill this. */
  company?: string;
};

const field =
  "w-full border border-[var(--field-line)] bg-[var(--field-panel)] px-4 py-3 text-sm text-[var(--field-ink)] placeholder:text-[var(--field-muted)] transition-colors focus:border-[var(--field-rust)] focus:outline-none focus:ring-1 focus:ring-[var(--field-rust)]";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && json.ok) {
        setDone(true);
        reset();
        toast.success("Got it — we'll get back to you shortly.");
      } else {
        toast.error(json.error || "Something went wrong. Try email instead.");
      }
    } catch {
      toast.error("Network error — try emailing us directly.");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-[var(--field-line)] px-4 py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-screen-lg overflow-hidden border-2 border-[var(--field-ink)] bg-[var(--field-ink)] px-6 py-14 shadow-[12px_12px_0_rgba(27,27,23,0.12)] sm:px-12">
        <div className="relative mx-auto grid max-w-4xl items-center gap-10 lg:grid-cols-2">
          {/* Pitch */}
          <div className="text-center lg:text-left">
            <p className="mb-4 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-normal text-[var(--field-gold)] before:block before:h-0.5 before:w-9 before:bg-[var(--field-gold)] lg:justify-start">
              Contact
            </p>
            <h2 className="field-serif text-balance text-3xl font-bold leading-tight text-[var(--field-panel)] sm:text-4xl">
              {FINAL_CTA.title}
            </h2>
            <p className="mx-auto mt-5 max-w-md text-pretty text-base leading-relaxed text-[#d8c8ad] lg:mx-0">
              {FINAL_CTA.body}
            </p>
            <button
              type="button"
              onClick={copyEmail}
              className="group mt-6 inline-flex items-center gap-2 text-sm text-[#d8c8ad] transition-colors hover:text-[var(--field-panel)]"
            >
              <span>or email us directly: {CONTACT.email}</span>
              {copied ? (
                <Check size={14} className="text-[var(--field-gold)]" />
              ) : (
                <Copy
                  size={14}
                  className="opacity-60 group-hover:opacity-100"
                />
              )}
            </button>
          </div>

          {/* Form */}
          {done ? (
            <div className="flex min-h-[18rem] flex-col items-center justify-center border border-[var(--field-line)] bg-[rgba(255,250,240,0.08)] p-8 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center border border-[var(--field-gold)] bg-[var(--field-panel)] text-[var(--field-forest)]">
                <Check size={24} />
              </span>
              <p className="mt-4 text-lg font-bold text-[var(--field-panel)]">
                Message sent.
              </p>
              <p className="mt-1 text-sm text-[#d8c8ad]">
                We&apos;ll get back to you shortly — usually within a day.
              </p>
              <button
                type="button"
                onClick={() => setDone(false)}
                className="mt-5 text-sm font-bold text-[var(--field-gold)] hover:underline"
              >
                Send another →
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col gap-3"
            >
              {/* Honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                {...register("company")}
              />

              <div>
                <input
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  className={field}
                  {...register("name", {
                    required: "Please enter your name.",
                    minLength: { value: 2, message: "Please enter your name." },
                  })}
                />
                {errors.name && (
                  <p className="mt-1 px-1 text-xs text-[#f4a98c]">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  className={field}
                  {...register("email", {
                    required: "Please enter your email.",
                    pattern: {
                      value: EMAIL_RE,
                      message: "Please enter a valid email.",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 px-1 text-xs text-[#f4a98c]">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  rows={4}
                  placeholder="What do you need help with? (e.g. missed calls, no-shows, follow-up…)"
                  aria-invalid={!!errors.message}
                  className={`${field} resize-y`}
                  {...register("message", {
                    required: "Tell us a bit about what you need.",
                    minLength: {
                      value: 5,
                      message: "Tell us a little more so we can help.",
                    },
                  })}
                />
                {errors.message && (
                  <p className="mt-1 px-1 text-xs text-[#f4a98c]">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 inline-flex items-center justify-center gap-2 border border-[var(--field-panel)] bg-[var(--field-rust)] px-6 py-3 text-sm font-bold text-[var(--field-panel)] shadow-[5px_5px_0_rgba(255,250,240,0.12)] transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending…" : "Book my free audit"}
                {!isSubmitting && <ArrowRight size={16} />}
              </button>
              <p className="text-center text-xs text-[#d8c8ad]">
                Free · no pitch · you keep the plan either way.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
