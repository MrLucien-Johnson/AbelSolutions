import { siteConfig } from "@/config/site";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function absoluteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatContactEmail(): string {
  return siteConfig.contact.email ?? siteConfig.contact.emailPlaceholder;
}

export function formatContactPhone(): string {
  return siteConfig.contact.phone ?? siteConfig.contact.phonePlaceholder;
}

export function hasRealEmail(): boolean {
  return Boolean(siteConfig.contact.email);
}

export function hasRealPhone(): boolean {
  return Boolean(siteConfig.contact.phone);
}
