import { z } from "zod";

const ukPostcodeOrArea = z
  .string()
  .trim()
  .min(2, "Please enter a postcode or general area.")
  .max(80, "Please keep this under 80 characters.");

const phoneSchema = z
  .string()
  .trim()
  .min(7, "Please enter a valid telephone number.")
  .max(30, "Please enter a valid telephone number.")
  .regex(/^[0-9+\s()-]+$/, "Please use numbers and common phone characters only.");

export const serviceCategoryEnum = z.enum([
  "technology",
  "construction",
  "not-sure",
]);

export const preferredContactEnum = z.enum(["email", "phone", "either"]);

export const budgetRangeEnum = z.enum([
  "",
  "under-250",
  "250-500",
  "500-1000",
  "1000-2500",
  "2500-plus",
  "not-sure",
]);

export const quoteFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(200),
  telephone: phoneSchema,
  postcodeOrArea: ukPostcodeOrArea,
  serviceCategory: serviceCategoryEnum,
  description: z
    .string()
    .trim()
    .min(20, "Please provide a little more detail (at least 20 characters).")
    .max(4000, "Please keep your description under 4,000 characters."),
  preferredContact: preferredContactEnum,
  preferredTimeframe: z
    .string()
    .trim()
    .max(200, "Please keep the timeframe under 200 characters.")
    .optional()
    .default(""),
  budgetRange: budgetRangeEnum.optional().default(""),
  consent: z.literal(true, {
    message: "Please confirm you agree to be contacted about this enquiry.",
  }),
  privacyAck: z.literal(true, {
    message: "Please acknowledge the privacy policy.",
  }),
  /** Honeypot — must remain empty */
  companyWebsite: z.string().max(0).optional().default(""),
});

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  telephone: z.union([phoneSchema, z.literal("")]).optional(),
  subject: z
    .string()
    .trim()
    .min(3, "Please enter a subject.")
    .max(150, "Subject must be 150 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(20, "Please provide a little more detail (at least 20 characters).")
    .max(4000),
  consent: z.literal(true, {
    message: "Please confirm you agree to be contacted about this message.",
  }),
  privacyAck: z.literal(true, {
    message: "Please acknowledge the privacy policy.",
  }),
  companyWebsite: z.string().max(0).optional().default(""),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const serviceCategoryLabels: Record<
  z.infer<typeof serviceCategoryEnum>,
  string
> = {
  technology: "Technology Services",
  construction: "Construction Services",
  "not-sure": "Not sure",
};

export const preferredContactLabels: Record<
  z.infer<typeof preferredContactEnum>,
  string
> = {
  email: "Email",
  phone: "Telephone",
  either: "Either",
};

export const budgetRangeLabels: Record<string, string> = {
  "": "Prefer not to say",
  "under-250": "Under £250",
  "250-500": "£250 – £500",
  "500-1000": "£500 – £1,000",
  "1000-2500": "£1,000 – £2,500",
  "2500-plus": "£2,500+",
  "not-sure": "Not sure yet",
};
