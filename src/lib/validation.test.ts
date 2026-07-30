import { describe, expect, it } from "vitest";
import { contactFormSchema, quoteFormSchema } from "@/lib/validation";

describe("quoteFormSchema", () => {
  const valid = {
    fullName: "Jane Smith",
    email: "jane@example.com",
    telephone: "07123 456789",
    postcodeOrArea: "SW1",
    serviceCategory: "technology" as const,
    description: "My laptop is running very slowly and needs a health check.",
    preferredContact: "email" as const,
    preferredTimeframe: "Next week",
    budgetRange: "250-500" as const,
    consent: true as const,
    privacyAck: true as const,
    companyWebsite: "",
  };

  it("accepts a valid quote request", () => {
    const result = quoteFormSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects short descriptions", () => {
    const result = quoteFormSchema.safeParse({ ...valid, description: "Help" });
    expect(result.success).toBe(false);
  });

  it("requires consent", () => {
    const result = quoteFormSchema.safeParse({ ...valid, consent: false });
    expect(result.success).toBe(false);
  });

  it("rejects honeypot content", () => {
    const result = quoteFormSchema.safeParse({
      ...valid,
      companyWebsite: "https://spam.example",
    });
    expect(result.success).toBe(false);
  });
});

describe("contactFormSchema", () => {
  it("accepts a valid contact message", () => {
    const result = contactFormSchema.safeParse({
      fullName: "Alex Jones",
      email: "alex@example.com",
      telephone: "",
      subject: "General enquiry",
      message: "I would like to know more about media wall installation.",
      consent: true,
      privacyAck: true,
      companyWebsite: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email addresses", () => {
    const result = contactFormSchema.safeParse({
      fullName: "Alex Jones",
      email: "not-an-email",
      telephone: "",
      subject: "Hello",
      message: "This is a sufficiently long message for validation.",
      consent: true,
      privacyAck: true,
      companyWebsite: "",
    });
    expect(result.success).toBe(false);
  });
});
