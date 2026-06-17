import { NextResponse } from "next/server";
import { getDb, isDbConfigured } from "@/db";
import { leads } from "@/db/schema";
import { validateContactInput } from "@/lib/leads";

// Always run on the server, never statically optimized.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NOTIFY_TO =
  process.env.LEAD_NOTIFY_EMAIL || "abhishek.gusain1007fb@gmail.com";
const NOTIFY_FROM =
  process.env.LEAD_NOTIFY_FROM || "Website Leads <onboarding@resend.dev>";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const userAgent = req.headers.get("user-agent") ?? undefined;
  const result = validateContactInput(body as Record<string, unknown>, {
    userAgent,
  });

  if (!result.ok) {
    // Honeypot hit: pretend success so bots don't learn anything.
    if (result.spam) return NextResponse.json({ ok: true });
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 422 }
    );
  }

  const lead = result.value;

  // 1) PERSIST (required). The lead must never be silently lost.
  if (isDbConfigured()) {
    try {
      await getDb().insert(leads).values(lead);
    } catch (err) {
      console.error("[contact] DB insert failed:", err);
      return NextResponse.json(
        { ok: false, error: "Something went wrong saving your message." },
        { status: 500 }
      );
    }
  } else if (process.env.NODE_ENV === "production") {
    // Misconfigured in prod — fail loudly rather than drop a real lead.
    console.error("[contact] DATABASE_URL not set in production.");
    return NextResponse.json(
      { ok: false, error: "Contact form is not configured yet." },
      { status: 503 }
    );
  } else {
    // Dev convenience: no DB yet, so just log and continue.
    console.info("[contact] (dev, no DB) lead received:", lead);
  }

  // 2) NOTIFY (best-effort). Speed-to-lead — your inbox pings instantly.
  await sendNotification(lead).catch((err) =>
    console.error("[contact] notification failed:", err)
  );

  return NextResponse.json({ ok: true });
}

async function sendNotification(lead: {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info("[contact] RESEND_API_KEY not set — skipping email.");
    return;
  }
  // Imported lazily so the dep isn't pulled into builds that don't email.
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: NOTIFY_FROM,
    to: NOTIFY_TO,
    replyTo: lead.email,
    subject: `New lead: ${lead.name}${lead.subject ? ` — ${lead.subject}` : ""}`,
    text: [
      `Name:    ${lead.name}`,
      `Email:   ${lead.email}`,
      `About:   ${lead.subject ?? "—"}`,
      "",
      lead.message,
      "",
      "— Sent from abhishekgusain.com contact form",
    ].join("\n"),
  });
}
