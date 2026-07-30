/**
 * Central site configuration for Abel Solutions Limited.
 * Replace PLACEHOLDER values before production launch.
 * Never invent contact details, addresses, or accreditations.
 */

function envOrNull(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const siteConfig = {
  name: "Abel Solutions",
  legalName: "Abel Solutions Limited",
  shortDescription:
    "UK-based technology and construction solutions for homes and businesses in London and surrounding areas.",
  description:
    "Abel Solutions Limited provides practical technology support — including repairs, custom PC builds and IT assistance — alongside construction services such as media walls, TV mounting, shelving and property improvements across London and surrounding areas.",
  tagline: "Technology and construction solutions you can depend on.",
  url:
    envOrNull(process.env.NEXT_PUBLIC_SITE_URL) ??
    "https://mrlucien-johnson.github.io/AbelSolutions",
  locale: "en_GB",

  /** PLACEHOLDER — replace with genuine contact details before launch */
  contact: {
    email: envOrNull(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    phone: envOrNull(process.env.NEXT_PUBLIC_CONTACT_PHONE),
    emailPlaceholder: "[Business email — to be confirmed]",
    phonePlaceholder: "[Business telephone — to be confirmed]",
  },

  /** PLACEHOLDER — company registration number not yet supplied */
  companyNumber: envOrNull(process.env.NEXT_PUBLIC_COMPANY_NUMBER),
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
      handle: "@AbelSolutionsLimited",
      url: "https://www.instagram.com/AbelSolutionsLimited",
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
     * Primary brand mark is the refined text wordmark.
     * When an official logo file is supplied, set logoImage to its public path
     * (for example "/images/logo.svg"). The logo can then be used in favicon,
     * social cards or secondary placements without replacing the wordmark.
     */
    logoType: "text" as const,
    logoImage: null as string | null,
    logoNote:
      "Primary brand mark is the ABEL SOLUTIONS text wordmark. A supplied logo can be added separately later.",
  },

  ogImage: {
    path: "/images/og-default.png",
    alt: "Abel Solutions — Technology and Construction",
    width: 1200,
    height: 630,
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
