import Link from "next/link";
import { PageHero } from "@/components/ui/BrandMark";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy draft for Abel Solutions Limited. This page requires owner or solicitor review before being relied upon as final legal wording.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Privacy Policy", path: "/privacy" }]} />
      <PageHero
        title="Privacy Policy"
        description="How Abel Solutions Limited intends to handle personal information submitted through this website."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <Section tone="white">
        <div className="prose-legal">
          <p className="notice-banner mb-10">
            <strong>Draft for review.</strong> This page is a practical starting
            structure for a UK website. It is not formal legal advice and must be
            reviewed by the business owner and, where appropriate, a solicitor
            before being treated as final.
          </p>

          <p>
            <strong>Last updated:</strong> July 2026 (draft)
          </p>

          <h2>1. Who we are</h2>
          <p>
            {siteConfig.legalName} (“we”, “us”) operates this website. Company
            number:{" "}
            {siteConfig.companyNumber ?? siteConfig.companyNumberPlaceholder}.
          </p>
          <p>
            Privacy contact:{" "}
            {siteConfig.contact.email ??
              "[Privacy contact email — to be confirmed]"}
            .
          </p>

          <h2>2. What information we collect</h2>
          <p>We may collect information you submit through forms, such as:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Telephone number</li>
            <li>Postcode or general area</li>
            <li>Details of your enquiry or project</li>
            <li>Preferred contact method and timeframe</li>
          </ul>
          <p>
            We aim to collect only what is needed to respond to enquiries and
            provide requested services.
          </p>

          <h2>3. Why we use personal information</h2>
          <ul>
            <li>To respond to quote requests and contact messages</li>
            <li>To assess suitability and prepare quotations</li>
            <li>To arrange work where an enquiry proceeds</li>
            <li>To keep records needed for business and legal obligations</li>
          </ul>

          <h2>4. Lawful bases</h2>
          <p>
            Depending on the context, processing may rely on steps taken at your
            request before entering a contract, legitimate interests in
            responding to enquiries, consent where required, or legal
            obligations. Final wording should be confirmed during legal review.
          </p>

          <h2>5. Sharing information</h2>
          <p>
            We do not sell personal information. Information may be shared with
            service providers that help us operate the website or deliver email
            (for example a hosting or email-delivery provider), only as needed
            for those purposes. Providers and retention details should be listed
            here once confirmed.
          </p>

          <h2>6. Retention</h2>
          <p>
            Enquiry information is kept only for as long as needed to handle the
            request and meet record-keeping needs. Exact retention periods should
            be confirmed by the owner.
          </p>

          <h2>7. Your rights</h2>
          <p>
            Under UK data protection law, you may have rights to access, correct,
            delete or restrict certain personal information, and to object to
            certain processing. To exercise these rights, contact us using the
            privacy contact details above.
          </p>
          <p>
            You may also contact the Information Commissioner’s Office (ICO) if
            you have a complaint.
          </p>

          <h2>8. Cookies and analytics</h2>
          <p>
            See our{" "}
            <Link href="/cookies" className="underline underline-offset-2">
              Cookie Policy
            </Link>
            . Non-essential tracking cookies are not enabled by default on this
            website.
          </p>

          <h2>9. Updates</h2>
          <p>
            This policy may be updated as the business, website or legal
            requirements change. The date above should be revised when changes
            are published.
          </p>
        </div>
      </Section>
    </>
  );
}
