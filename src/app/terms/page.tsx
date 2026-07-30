import Link from "next/link";
import { PageHero } from "@/components/ui/BrandMark";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Terms and Conditions",
  description:
    "Website terms and conditions draft for Abel Solutions Limited. Requires owner or solicitor review before being treated as final.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Terms and Conditions", path: "/terms" }]}
      />
      <PageHero
        title="Terms and Conditions"
        description="Terms that apply to use of the Abel Solutions website and to enquiries submitted through it."
        breadcrumbs={[{ label: "Terms and Conditions" }]}
      />

      <Section tone="white">
        <div className="prose-legal">
          <p className="notice-banner mb-10">
            <strong>Draft for review.</strong> This page provides a practical
            website terms structure. It is not formal legal advice and should be
            reviewed before being relied upon as final contractual wording.
            Separate written quotations and contracts may apply to actual work.
          </p>

          <p>
            <strong>Last updated:</strong> July 2026 (draft)
          </p>

          <h2>1. About these terms</h2>
          <p>
            These terms apply to your use of the website operated by{" "}
            {siteConfig.legalName}. By using the site, you agree to these terms.
          </p>

          <h2>2. Website information</h2>
          <p>
            Service descriptions are provided for general information. They do
            not guarantee that a particular service will be available for every
            enquiry. Suitability is confirmed after assessment.
          </p>
          <p>
            We do not claim certifications, accreditations, partnerships or
            regulated professional statuses unless separately confirmed in
            writing.
          </p>

          <h2>3. Enquiries and quotations</h2>
          <p>
            Submitting a form is an enquiry, not an automatic acceptance of work.
            Quotations may require photographs, specifications or an on-site
            assessment. Prices and availability remain subject to confirmation.
          </p>

          <h2>4. Service limitations</h2>
          <p>
            Technology and construction services are assessed case by case.
            Specialist regulated work — including certain electrical, gas or
            structural engineering services — is not offered unless the
            appropriate qualifications are confirmed and agreed in writing.
          </p>

          <h2>5. Acceptable use</h2>
          <p>You agree not to misuse the website, including by:</p>
          <ul>
            <li>Submitting false or abusive content</li>
            <li>Attempting to disrupt or probe the site without authorisation</li>
            <li>Using automated means to overload forms or endpoints</li>
          </ul>

          <h2>6. Intellectual property</h2>
          <p>
            Website content, branding and design belong to {siteConfig.legalName}{" "}
            or its licensors unless otherwise stated. You may not copy or reuse
            materials for commercial purposes without permission.
          </p>

          <h2>7. Liability</h2>
          <p>
            The website is provided on a practical information basis. To the
            extent permitted by law, we are not liable for loss arising solely
            from use of website content. Nothing in these terms excludes
            liability that cannot be excluded under UK law.
          </p>

          <h2>8. Privacy</h2>
          <p>
            Personal information is handled as described in our{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>

          <h2>9. Governing law</h2>
          <p>
            These terms are governed by the laws of England and Wales. Courts in
            England and Wales have jurisdiction over disputes arising from them,
            subject to any mandatory consumer protections that apply.
          </p>

          <h2>10. Contact</h2>
          <p>
            Questions about these terms can be sent using the details on our{" "}
            <Link href="/contact" className="underline underline-offset-2">
              Contact
            </Link>{" "}
            page once business contact details are published.
          </p>
        </div>
      </Section>
    </>
  );
}
