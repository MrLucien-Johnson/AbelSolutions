/**
 * Central site configuration for Abel Solutions Limited.
 * Replace PLACEHOLDER values before production launch.
 * Never invent contact details, addresses, or accreditations.
 */

export const siteConfig = {
  name: "Abel Solutions",
  legalName: "Abel Solutions Limited",
  shortDescription:
    "UK-based technology and construction solutions for homes and businesses in London and surrounding areas.",
  description:
    "Abel Solutions Limited provides practical technology support — including repairs, custom PC builds and IT assistance — alongside construction services such as media walls, TV mounting, shelving and property improvements across London and surrounding areas.",
  tagline: "Technology and construction solutions you can depend on.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://mrlucien-johnson.github.io/AbelSolutions",
  locale: "en_GB",

  /** PLACEHOLDER — replace with genuine contact details before launch */
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? null,
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? null,
    emailPlaceholder: "[Business email — to be confirmed]",
    phonePlaceholder: "[Business telephone — to be confirmed]",
  },

  /** PLACEHOLDER — company registration number not yet supplied */
  companyNumber: process.env.NEXT_PUBLIC_COMPANY_NUMBER ?? null,
  companyNumberPlaceholder: "[Company number — to be confirmed]",

  /**
   * Do not publish a residential address.
   * Registered office remains private until a suitable business address is confirmed.
   */
  address: {
    visibility: "hidden" as const,
    registeredOffice: null as string | null,
    serviceArea: "London and surrounding areas",
    serviceAreaNote:
      "Availability depends on job type, schedule and travel requirements.",
  },

  openingHours: null as string | null,
  openingHoursPlaceholder: "[Opening hours — to be confirmed]",

  social: {
    instagram: {
      handle: "@abelsolutionslimited",
      url: "https://www.instagram.com/abelsolutionslimited",
    },
  },

  /**
   * Accreditations and certifications — only publish when confirmed.
   * PASMA status, insurance details and similar claims remain placeholders.
   */
  credentials: {
    pasmaConfirmed: false,
    insuranceConfirmed: false,
    accreditations: [] as string[],
  },

  brand: {
    /**
     * Text-based temporary brand mark.
     * Replace with the official Abel Solutions logo when available.
     */
    logoType: "text-placeholder" as const,
    logoNote:
      "Using a temporary text-based brand mark until an official logo is supplied.",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const navLinks = [
  { href: "/technology-services", label: "Technology" },
  { href: "/construction-services", label: "Construction" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerServiceLinks = [
  { href: "/technology-services", label: "Technology Services" },
  { href: "/construction-services", label: "Construction Services" },
  { href: "/quote", label: "Request a Quote" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/terms", label: "Terms and Conditions" },
] as const;
