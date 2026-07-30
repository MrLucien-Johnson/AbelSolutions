import type { QuoteFormValues, ContactFormValues } from "@/lib/validation";
import {
  budgetRangeLabels,
  preferredContactLabels,
  serviceCategoryLabels,
} from "@/lib/validation";

export function formatQuoteEmail(data: QuoteFormValues): string {
  const lines = [
    "New quote request — Abel Solutions website",
    "",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Telephone: ${data.telephone}`,
    `Area / postcode: ${data.postcodeOrArea}`,
    `Service category: ${serviceCategoryLabels[data.serviceCategory]}`,
    `Preferred contact: ${preferredContactLabels[data.preferredContact]}`,
    `Preferred timeframe: ${data.preferredTimeframe || "Not specified"}`,
    `Budget range: ${budgetRangeLabels[data.budgetRange ?? ""] ?? "Not specified"}`,
    "",
    "Description:",
    data.description,
    "",
    "Consent to contact: Yes",
    "Privacy policy acknowledged: Yes",
  ];

  return lines.join("\n");
}

export function formatContactEmailBody(data: ContactFormValues): string {
  const lines = [
    "New contact message — Abel Solutions website",
    "",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Telephone: ${data.telephone || "Not provided"}`,
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
    "",
    "Consent to contact: Yes",
    "Privacy policy acknowledged: Yes",
  ];

  return lines.join("\n");
}
