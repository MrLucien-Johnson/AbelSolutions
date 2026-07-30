import Link from "next/link";
import { PageHero } from "@/components/ui/BrandMark";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Abel Solutions Limited explaining how personal information submitted through this website is handled.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const privacyContact =
    siteConfig.contact.email ?? siteConfig.social.instagram.handle;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Privacy Policy", path: "/privacy" }]} />
      <PageHero
        title="Privacy Policy"
        description="How Abel Solutions Limited handles personal information submitted through this website."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <Section tone="white">
        <div className="prose-legal">
          <p className="notice-banner mb-10">
            <strong>Owner / solicitor review required.</strong> This page is a
            practical UK-oriented draft for the current website. It is not formal
            legal advice. Confirm the wording before treating it as final,
            especially once a company number, registered office approach, email
            delivery provider and any analytics tools are confirmed.
          </p>

          <p>
            <strong>Last reviewed:</strong> 30 July 2026 (draft)
          </p>

          <h2>1. Who we are</h2>
          <p>
            {siteConfig.legalName} (“we”, “us”, “our”) operates this website.
            Company number:{" "}
            {siteConfig.companyNumber ?? siteConfig.companyNumberPlaceholder}.
          </p>
          <p>
            For privacy enquiries, contact us via{" "}
            {siteConfig.contact.email ? (
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="underline underline-offset-2"
              >
                {siteConfig.contact.email}
              </a>
            ) : (
              <>
                Instagram{" "}
                <a
                  href={siteConfig.social.instagram.url}
                  className="underline underline-offset-2"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {privacyContact}
                </a>{" "}
                or the Contact page once a business email is published
              </>
            )}
            .
          </p>
          <p>
            We do not publish a residential address on this website. If a
            suitable business or registered office address is confirmed later, it
            may be added here.
          </p>

          <h2>2. Scope</h2>
          <p>
            This policy covers personal information collected through this
            website, including quote and contact forms and related enquiry
            follow-up. It does not cover websites or platforms we do not control,
            such as Instagram itself, which has its own terms and privacy
            notices.
          </p>

          <h2>3. What information we collect</h2>
          <p>We may collect information you choose to submit, such as:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Telephone number</li>
            <li>Postcode or general area</li>
            <li>Service category and project or issue description</li>
            <li>Preferred contact method, timeframe and optional budget range</li>
          </ul>
          <p>
            We aim to collect only what is needed to respond to enquiries and
            provide requested services. Please avoid sending special-category
            information (for example health details) or other people’s personal
            data unless it is necessary for the enquiry.
          </p>
          <p>
            Technical information such as browser type, approximate location
            derived by the hosting platform, and basic request logs may also be
            processed by our hosting provider as part of delivering the website
            securely.
          </p>

          <h2>4. Why we use personal information</h2>
          <ul>
            <li>To respond to quote requests and contact messages</li>
            <li>To assess suitability and prepare quotations</li>
            <li>To arrange work where an enquiry proceeds</li>
            <li>To keep business records and meet legal obligations</li>
            <li>To protect the website against spam and misuse</li>
          </ul>

          <h2>5. Lawful bases</h2>
          <p>
            Depending on the context, processing may rely on:
          </p>
          <ul>
            <li>
              Steps taken at your request before entering a contract (for example
              responding to a quote enquiry)
            </li>
            <li>
              Legitimate interests in operating the website and responding to
              business enquiries, balanced against your rights
            </li>
            <li>Consent, where we ask for it and it is required</li>
            <li>Legal obligations, where applicable</li>
          </ul>
          <p>
            Final mapping of each processing activity to a lawful basis should be
            confirmed during owner/solicitor review.
          </p>

          <h2>6. Sharing information</h2>
          <p>
            We do not sell personal information. Information may be shared with
            service providers that help us operate the website or deliver
            enquiries, only as needed for those purposes. Depending on
            configuration, this may include:
          </p>
          <ul>
            <li>Website hosting (currently GitHub Pages)</li>
            <li>
              An enquiry-delivery provider, if connected (for example a form or
              email delivery service)
            </li>
          </ul>
          <p>
            Provider names, locations and retention details should be listed here
            once confirmed.
          </p>

          <h2>7. International transfers</h2>
          <p>
            Some providers used to host or deliver the website may process data
            outside the United Kingdom. Where that happens, appropriate safeguards
            should be confirmed as part of legal review and supplier setup.
          </p>

          <h2>8. Retention</h2>
          <p>
            Enquiry information is kept only for as long as needed to handle the
            request, provide related services and meet record-keeping needs.
            Exact retention periods should be set by the owner (for example,
            enquiry records kept for a defined period after the last contact).
          </p>

          <h2>9. Your rights</h2>
          <p>
            Under UK data protection law, you may have rights to access, correct,
            delete or restrict certain personal information, and to object to
            certain processing. To exercise these rights, contact us using the
            details in section 1.
          </p>
          <p>
            You may also contact the Information Commissioner’s Office (ICO) if
            you have a complaint:{" "}
            <a
              href="https://ico.org.uk"
              className="underline underline-offset-2"
              rel="noopener noreferrer"
              target="_blank"
            >
              ico.org.uk
            </a>
            .
          </p>

          <h2>10. Cookies and similar technologies</h2>
          <p>
            See our{" "}
            <Link href="/cookies" className="underline underline-offset-2">
              Cookie Policy
            </Link>
            . Non-essential tracking cookies are not enabled by default on this
            website.
          </p>

          <h2>11. Children</h2>
          <p>
            This website is intended for adults making enquiries about technology
            or construction services. We do not knowingly seek to collect
            personal information from children.
          </p>

          <h2>12. Updates</h2>
          <p>
            This policy may be updated as the business, website or legal
            requirements change. The review date above should be revised when
            changes are published.
          </p>
        </div>
      </Section>
    </>
  );
}
