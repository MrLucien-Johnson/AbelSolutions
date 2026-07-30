/**
 * Client-side enquiry delivery for static GitHub Pages hosting.
 *
 * Optional free provider: Web3Forms (https://web3forms.com)
 * Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in the build environment.
 * Never claim success if no delivery provider is configured.
 */

export type EnquiryPayload = {
  type: "quote" | "contact";
  subject: string;
  replyTo: string;
  textBody: string;
  name: string;
  fields?: Record<string, string | boolean | undefined>;
};

export type EnquiryResult =
  | { status: "sent" }
  | { status: "not_configured"; message: string }
  | { status: "failed"; message: string };

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
  body?: {
    message?: string;
  };
};

export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<EnquiryResult> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return {
      status: "not_configured",
      message:
        "Your details were validated, but enquiry delivery is not connected on this website yet. Please use the contact details on the Contact page once they are published, or ask the site owner to add a free Web3Forms access key (see docs/FORM_SETUP.md).",
    };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: payload.subject,
        from_name: "Abel Solutions website",
        name: payload.name,
        email: payload.replyTo,
        message: payload.textBody,
        ...(payload.fields ?? {}),
      }),
    });

    let data: Web3FormsResponse = {};
    try {
      data = (await response.json()) as Web3FormsResponse;
    } catch {
      data = {};
    }

    const providerMessage =
      data.message || data.body?.message || "Unknown provider response.";

    if (!response.ok || !data.success) {
      return {
        status: "failed",
        message: `Delivery failed (${response.status}): ${providerMessage}`,
      };
    }

    return { status: "sent" };
  } catch {
    return {
      status: "failed",
      message:
        "A network error occurred while sending. Please check your connection and try again.",
    };
  }
}
