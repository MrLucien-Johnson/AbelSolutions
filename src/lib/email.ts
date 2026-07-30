/**
 * Email delivery helpers.
 *
 * Delivery is only attempted when EMAIL_DELIVERY_ENABLED=true and
 * the required provider credentials are present.
 * Never hard-code API keys or SMTP passwords.
 */

export type EnquiryEmailPayload = {
  type: "quote" | "contact";
  subject: string;
  replyTo: string;
  textBody: string;
};

export type EmailDeliveryResult =
  | { status: "sent"; provider: string }
  | { status: "not_configured" }
  | { status: "failed"; message: string };

function isDeliveryEnabled(): boolean {
  return process.env.EMAIL_DELIVERY_ENABLED === "true";
}

function getRecipient(): string | null {
  return process.env.CONTACT_INBOX_EMAIL ?? process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? null;
}

/**
 * Attempt to deliver an enquiry email.
 * Currently supports a Resend-compatible HTTP API when configured.
 * If delivery is not configured, returns `not_configured` so the
 * frontend can show an honest message rather than a false success.
 */
export async function sendEnquiryEmail(
  payload: EnquiryEmailPayload,
): Promise<EmailDeliveryResult> {
  if (!isDeliveryEnabled()) {
    return { status: "not_configured" };
  }

  const recipient = getRecipient();
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.EMAIL_FROM_ADDRESS;

  if (!recipient || !apiKey || !fromAddress) {
    return { status: "not_configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [recipient],
        reply_to: payload.replyTo,
        subject: payload.subject,
        text: payload.textBody,
      }),
    });

    if (!response.ok) {
      // Do not leak provider response bodies to clients
      console.error("Email delivery failed with status", response.status);
      return {
        status: "failed",
        message: "The email service could not accept this enquiry.",
      };
    }

    return { status: "sent", provider: "resend" };
  } catch (error) {
    console.error("Email delivery error", error);
    return {
      status: "failed",
      message: "The email service could not be reached.",
    };
  }
}

export function isEmailConfigured(): boolean {
  return (
    isDeliveryEnabled() &&
    Boolean(getRecipient()) &&
    Boolean(process.env.RESEND_API_KEY) &&
    Boolean(process.env.EMAIL_FROM_ADDRESS)
  );
}
