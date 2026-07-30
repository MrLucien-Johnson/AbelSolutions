import Link from "next/link";
import { PageHero } from "@/components/ui/BrandMark";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Terms and Conditions",
  description:
    "Website terms and conditions for Abel Solutions Limited covering use of this site and enquiries submitted through it.",
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
            <strong>Owner / solicitor review required.</strong> This page is a
            practical draft for website use and online enquiries. It is not
            formal legal advice and is not a substitute for written quotations,
            work agreements or insurance terms that may apply to actual jobs.
          </p>

          <p>
            <strong>Last reviewed:</strong> 30 July 2026 (draft)
          </p>

          <h2>1. About these terms</h2>
          <p>
            These terms apply to your use of the website operated by{" "}
            {siteConfig.legalName} (“we”, “us”, “our”). By using the site, you
            agree to these terms. If you do not agree, please do not use the
            site.
          </p>

          <h2>2. About Abel Solutions</h2>
          <p>
            Abel Solutions provides technology-related and construction-related
            services for homes and businesses, primarily across{" "}
            {siteConfig.address.serviceArea}. Availability depends on job type,
            schedule and travel requirements.
          </p>
          <p>
            Company number:{" "}
            {siteConfig.companyNumber ?? siteConfig.companyNumberPlaceholder}.
          </p>

          <h2>3. Website information</h2>
          <p>
            Service descriptions are general information only. They do not
            guarantee that a particular service will be available for every
            enquiry. Suitability is confirmed after assessment.
          </p>
          <p>
            We do not claim certifications, accreditations, partnerships or
            regulated professional statuses on this website unless separately
            confirmed in writing. Specialist regulated work — including certain
            electrical, gas or structural engineering services — is not offered
            unless the appropriate qualifications are confirmed and agreed.
          </p>

          <h2>4. Enquiries and quotations</h2>
          <p>
            Submitting a form or message is an enquiry, not an automatic
            acceptance of work and not a binding contract for services.
            Quotations may require photographs, specifications or an on-site
            assessment. Prices, scope and availability remain subject to
            confirmation.
          </p>
          <p>
            If enquiry delivery is not configured on the website, validated form
            details may not be emailed automatically. In that case, please use
            the published contact channels, including Instagram{" "}
            <a
              href={siteConfig.social.instagram.url}
              className="underline underline-offset-2"
              rel="noopener noreferrer"
              target="_blank"
            >
              {siteConfig.social.instagram.handle}
            </a>
            .
          </p>

          <h2>5. Service limitations</h2>
          <p>
            Technology and construction services are assessed case by case for
            scope, access and safety. We are not a structural engineer,
            architect, gas engineer or electrician unless such status is
            separately confirmed in writing.
          </p>

          <h2>6. Acceptable use</h2>
          <p>You agree not to misuse the website, including by:</p>
          <ul>
            <li>Submitting false, misleading or abusive content</li>
            <li>
              Attempting to disrupt, probe or interfere with the site without
              authorisation
            </li>
            <li>Using automated means to overload forms or endpoints</li>
            <li>
              Attempting to extract data or content unlawfully or at a volume
              that harms site performance
            </li>
          </ul>

          <h2>7. Intellectual property</h2>
          <p>
            Website content, branding and design belong to {siteConfig.legalName}{" "}
            or its licensors unless otherwise stated. You may view and print
            pages for personal reference. You may not copy or reuse materials for
            commercial purposes without permission.
          </p>

          <h2>8. Third-party sites and hosting</h2>
          <p>
            This website may link to third-party sites such as Instagram. Those
            sites have their own terms and privacy notices. The website may also
            be hosted by a third-party provider. We are not responsible for the
            content or availability of external sites we do not control.
          </p>

          <h2>9. Liability</h2>
          <p>
            The website is provided for practical information and enquiry
            purposes. To the extent permitted by law, we are not liable for loss
            arising solely from use of website content or temporary unavailability
            of the site. Nothing in these terms excludes or limits liability that
            cannot be excluded under UK law, including for death or personal
            injury caused by negligence, or for fraud.
          </p>
          <p>
            Any work carried out following an enquiry will be subject to the
            scope, price and terms agreed for that work, which may be set out in
            a quotation or separate agreement.
          </p>

          <h2>10. Privacy</h2>
          <p>
            Personal information is handled as described in our{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>

          <h2>11. Changes</h2>
          <p>
            We may update these terms from time to time. The review date above
            will be revised when changes are published. Continued use of the
            website after changes are posted means you accept the updated terms.
          </p>

          <h2>12. Governing law</h2>
          <p>
            These terms are governed by the laws of England and Wales. Courts in
            England and Wales have jurisdiction over disputes arising from them,
            subject to any mandatory consumer protections that apply.
          </p>

          <h2>13. Contact</h2>
          <p>
            Questions about these terms can be sent using the details on our{" "}
            <Link href="/contact" className="underline underline-offset-2">
              Contact
            </Link>{" "}
            page, or via Instagram{" "}
            <a
              href={siteConfig.social.instagram.url}
              className="underline underline-offset-2"
              rel="noopener noreferrer"
              target="_blank"
            >
              {siteConfig.social.instagram.handle}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
