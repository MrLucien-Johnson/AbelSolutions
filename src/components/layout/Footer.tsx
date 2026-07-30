import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import {
  footerServiceLinks,
  legalLinks,
  siteConfig,
} from "@/config/site";
import {
  formatContactEmail,
  formatContactPhone,
  hasRealEmail,
  hasRealPhone,
} from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();
  const email = formatContactEmail();
  const phone = formatContactPhone();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-navy)] text-white">
      <div className="container-site py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <BrandMark tone="light" />
            <p className="mt-5 text-white/70 leading-relaxed max-w-sm">
              {siteConfig.shortDescription}
            </p>
            <p className="mt-4 text-sm text-white/55">
              Serving {siteConfig.address.serviceArea}.{" "}
              {siteConfig.address.serviceAreaNote}
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-white/55">
              Services
            </h2>
            <ul className="space-y-2.5">
              {footerServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/85 hover:text-white underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-white/55">
              Contact
            </h2>
            <ul className="space-y-3 text-white/85">
              <li>
                <span className="block text-sm text-white/55 mb-1">Email</span>
                {hasRealEmail() ? (
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-white underline-offset-4 hover:underline"
                  >
                    {email}
                  </a>
                ) : (
                  <span>{email}</span>
                )}
              </li>
              <li>
                <span className="block text-sm text-white/55 mb-1">Telephone</span>
                {hasRealPhone() ? (
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="hover:text-white underline-offset-4 hover:underline"
                  >
                    {phone}
                  </a>
                ) : (
                  <span>{phone}</span>
                )}
              </li>
              <li>
                <span className="block text-sm text-white/55 mb-1">Instagram</span>
                <a
                  href={siteConfig.social.instagram.url}
                  className="hover:text-white underline-offset-4 hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {siteConfig.social.instagram.handle}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-white/55">
              Company
            </h2>
            <ul className="space-y-2.5 text-white/85">
              <li>{siteConfig.legalName}</li>
              <li>
                Company number:{" "}
                {siteConfig.companyNumber ?? siteConfig.companyNumberPlaceholder}
              </li>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>{siteConfig.brand.logoNote}</p>
        </div>
      </div>
    </footer>
  );
}
