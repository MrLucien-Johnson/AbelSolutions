import Link from "next/link";
import { PageHero } from "@/components/ui/BrandMark";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "Cookie Policy for Abel Solutions Limited explaining how cookies and similar technologies may be used on this website.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Cookie Policy", path: "/cookies" }]} />
      <PageHero
        title="Cookie Policy"
        description="How cookies and similar technologies are handled on the Abel Solutions website."
        breadcrumbs={[{ label: "Cookie Policy" }]}
      />

      <Section tone="white">
        <div className="prose-legal">
          <p className="notice-banner mb-10">
            <strong>Owner / solicitor review required.</strong> This page
            reflects the current implementation: no analytics or advertising
            cookies are enabled by default. Update this policy before enabling
            any non-essential tracking tools.
          </p>

          <p>
            <strong>Last reviewed:</strong> 30 July 2026 (draft)
          </p>

          <h2>1. What are cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. Similar technologies can include local storage or pixels.
            They may be used to make a site work, remember preferences, or —
            where enabled and consented to — support analytics or advertising.
          </p>

          <h2>2. How this website uses cookies</h2>
          <p>
            This website is designed to work without non-essential tracking
            cookies. In the current implementation:
          </p>
          <ul>
            <li>
              No analytics cookies are set by Abel Solutions by default
            </li>
            <li>No advertising cookies are set by Abel Solutions by default</li>
            <li>No cookie consent banner is shown because non-essential cookies are not enabled</li>
          </ul>
          <p>
            Essential technical storage or cookies may still be used by the
            hosting platform or browser features needed to deliver pages
            securely and reliably. Exact technical cookies can vary by host and
            should be re-checked if the hosting setup changes.
          </p>

          <h2>3. Current cookie categories</h2>
          <h3>Strictly necessary / technical</h3>
          <p>
            May be required for security, load distribution, or basic site
            delivery by the hosting environment. These are not used by us for
            advertising.
          </p>
          <h3>Analytics</h3>
          <p>Not enabled in the current website build.</p>
          <h3>Advertising / marketing</h3>
          <p>Not enabled in the current website build.</p>

          <h2>4. If analytics or marketing tools are added later</h2>
          <p>
            If an analytics or marketing provider is introduced, non-essential
            cookies should only be set after valid consent is obtained where
            required. This policy should then be updated to name:
          </p>
          <ul>
            <li>The provider</li>
            <li>The purpose</li>
            <li>Cookie duration / retention</li>
            <li>How to withdraw consent</li>
          </ul>

          <h2>5. Managing cookies</h2>
          <p>
            You can control or delete cookies through your browser settings.
            Blocking some cookies may affect how certain websites function.
            Guidance is available from your browser provider and from the ICO.
          </p>

          <h2>6. More information</h2>
          <p>
            For personal data handling more broadly, see our{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
