import { PageHero } from "@/components/ui/BrandMark";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "Cookie Policy draft for Abel Solutions Limited explaining how cookies may be used on this website.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Cookie Policy", path: "/cookies" }]} />
      <PageHero
        title="Cookie Policy"
        description="Information about cookies and similar technologies on the Abel Solutions website."
        breadcrumbs={[{ label: "Cookie Policy" }]}
      />

      <Section tone="white">
        <div className="prose-legal">
          <p className="notice-banner mb-10">
            <strong>Draft for review.</strong> This page is not formal legal
            advice. Confirm final wording with the business owner and legal
            adviser before launch where required.
          </p>

          <p>
            <strong>Last updated:</strong> July 2026 (draft)
          </p>

          <h2>1. What are cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They can help the site function, remember preferences or —
            where enabled — support analytics.
          </p>

          <h2>2. How this website uses cookies</h2>
          <p>
            This website is designed to work without non-essential tracking
            cookies. Essential cookies or local storage may be used by the
            hosting platform or framework to deliver secure, reliable pages.
          </p>
          <p>
            No analytics or advertising cookies are enabled by default in this
            implementation.
          </p>

          <h2>3. If analytics is added later</h2>
          <p>
            If an analytics provider is introduced in future, non-essential
            cookies should only be set after valid consent is obtained, and this
            policy should be updated to name the provider, purpose and retention.
          </p>

          <h2>4. Managing cookies</h2>
          <p>
            You can control cookies through your browser settings. Blocking some
            cookies may affect how certain websites function.
          </p>

          <h2>5. More information</h2>
          <p>
            For personal data handling more broadly, see our{" "}
            <a href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
