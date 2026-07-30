import { NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/email";
import { formatContactEmailBody } from "@/lib/format-enquiry";
import { checkRateLimit, pruneRateLimitBuckets } from "@/lib/rate-limit";
import { contactFormSchema } from "@/lib/validation";

export async function POST(request: Request) {
  pruneRateLimitBuckets();

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rate = checkRateLimit(`contact:${ip}`);
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

  const parsed = contactFormSchema.safeParse(body);
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

  if (parsed.data.companyWebsite) {
    return NextResponse.json({
      ok: true,
      delivery: "ignored",
      message: "Thank you.",
    });
  }

  const delivery = await sendEnquiryEmail({
    type: "contact",
    subject: `Contact — ${parsed.data.subject} — ${parsed.data.fullName}`,
    replyTo: parsed.data.email,
    textBody: formatContactEmailBody(parsed.data),
  });

  if (delivery.status === "sent") {
    return NextResponse.json({ ok: true, delivery: "sent" });
  }

  if (delivery.status === "failed") {
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not deliver your message just now. Please try again later.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    delivery: "not_configured",
    message:
      "Your message passed validation, but email delivery is not configured on this server yet. See docs/FORM_SETUP.md for setup instructions.",
  });
}
