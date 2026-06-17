"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { ArrowRight, Check, Copy } from "lucide-react";
import { CONTACT } from "../../../constants/agency";

type Status = "idle" | "submitting" | "done";

const inputClass =
  "w-full rounded-xl border border-neutral-3 bg-white px-4 py-3 text-sm text-neutral-8 placeholder:text-neutral-5 transition-colors focus:border-neutral-orangeBg focus:outline-none focus:ring-1 focus:ring-neutral-orangeBg dark:border-neutral-dark-3 dark:bg-neutral-dark-1 dark:text-neutral-dark-8 dark:placeholder:text-neutral-dark-5";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
      company: data.get("company"), // honeypot
    };

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && json.ok) {
        setStatus("done");
        form.reset();
        toast.success("Got it — I'll get back to you shortly.");
      } else {
        setStatus("idle");
        toast.error(json.error || "Something went wrong. Try email instead.");
      }
    } catch {
      setStatus("idle");
      toast.error("Network error. Try emailing me directly.");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 px-4 py-20 sm:py-28">
      <div className="mx-auto grid max-w-screen-lg gap-12 rounded-3xl border border-neutral-3 bg-neutral-1/60 p-7 sm:p-12 lg:grid-cols-2 dark:border-neutral-dark-3 dark:bg-neutral-dark-1/40">
        {/* Left: pitch */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-orangeBg">
            Get in touch
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tighter text-neutral-8 sm:text-4xl dark:text-neutral-dark-8">
            Let&apos;s find your hidden revenue.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-neutral-7 dark:text-neutral-dark-7">
            Want the free audit, or just have a question about what AI could do
            in your business? Send it here. It reaches me directly and I
            actually read it.
          </p>

          <div className="mt-8 border-t border-neutral-3 pt-6 dark:border-neutral-dark-3">
            <button
              type="button"
              onClick={copyEmail}
              className="group inline-flex items-center gap-2 text-sm text-neutral-8 dark:text-neutral-dark-8"
            >
              <span className="font-medium">{CONTACT.email}</span>
              {copied ? (
                <Check size={15} className="text-neutral-orangeBg" />
              ) : (
                <Copy
                  size={15}
                  className="text-neutral-5 transition-colors group-hover:text-neutral-orangeBg"
                />
              )}
            </button>
            <p className="mt-1.5 text-xs text-neutral-5 dark:text-neutral-dark-5">
              Usually replies within a day.
            </p>
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          {/* Honeypot — visually hidden, off the tab order. */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              name="name"
              required
              placeholder="Name"
              autoComplete="name"
              className={inputClass}
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              autoComplete="email"
              className={inputClass}
            />
          </div>

          <input
            name="subject"
            placeholder="What's this about? (your business or website)"
            className={inputClass}
          />

          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell me a bit more — what's eating the most time or money right now?"
            className={`${inputClass} resize-y`}
          />

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-neutral-orangeBg px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting"
              ? "Sending…"
              : status === "done"
                ? "Sent ✓"
                : "Send it"}
            {status === "idle" && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </section>
  );
}
