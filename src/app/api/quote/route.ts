import { NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/email";
import { formatQuoteEmail } from "@/lib/format-enquiry";
import { checkRateLimit, pruneRateLimitBuckets } from "@/lib/rate-limit";
import { quoteFormSchema } from "@/lib/validation";

export async function POST(request: Request) {
  pruneRateLimitBuckets();

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rate = checkRateLimit(`quote:${ip}`);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: `Too many requests. Please try again in ${rate.retryAfterSeconds} seconds.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = quoteFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Validation failed.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // Honeypot trip — pretend success without delivering
  if (parsed.data.companyWebsite) {
    return NextResponse.json({
      ok: true,
      delivery: "ignored",
      message: "Thank you.",
    });
  }

  const delivery = await sendEnquiryEmail({
    type: "quote",
    subject: `Quote request — ${parsed.data.serviceCategory} — ${parsed.data.fullName}`,
    replyTo: parsed.data.email,
    textBody: formatQuoteEmail(parsed.data),
  });

  if (delivery.status === "sent") {
    return NextResponse.json({ ok: true, delivery: "sent" });
  }

  if (delivery.status === "failed") {
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not deliver your enquiry just now. Please try again later or use another contact method.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    delivery: "not_configured",
    message:
      "Your enquiry passed validation, but email delivery is not configured on this server yet. Please contact Abel Solutions directly once business contact details are published, or ask the site owner to complete form setup (see docs/FORM_SETUP.md).",
  });
}
