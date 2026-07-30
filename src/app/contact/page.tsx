import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/ui/BrandMark";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import {
  formatContactEmail,
  formatContactPhone,
  hasRealEmail,
  hasRealPhone,
} from "@/lib/utils";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Abel Solutions about technology support, construction services or a general enquiry in London and surrounding areas.",
  path: "/contact",
});

export default function ContactPage() {
  const email = formatContactEmail();
  const phone = formatContactPhone();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Contact", path: "/contact" }]} />
      <PageHero
        title="Contact Abel Solutions"
        description="Get in touch about technology support, construction services or a general question. For detailed project pricing, the quote form is usually the best place to start."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <aside className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-7 space-y-6">
            <div>
              <h2 className="mb-4 text-xl">Contact details</h2>
              <dl className="space-y-4 text-[var(--color-slate)]">
                <div>
                  <dt className="text-sm text-[var(--color-muted)]">Email</dt>
                  <dd>
                    {hasRealEmail() ? (
                      <a
                        href={`mailto:${email}`}
                        className="font-medium text-[var(--color-accent)] underline-offset-2 hover:underline"
                      >
                        {email}
                      </a>
                    ) : (
                      <span>{email}</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--color-muted)]">Telephone</dt>
                  <dd>
                    {hasRealPhone() ? (
                      <a
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="font-medium text-[var(--color-accent)] underline-offset-2 hover:underline"
                      >
                        {phone}
                      </a>
                    ) : (
                      <span>{phone}</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--color-muted)]">Instagram</dt>
                  <dd>
                    <a
                      href={siteConfig.social.instagram.url}
                      className="font-medium text-[var(--color-accent)] underline-offset-2 hover:underline"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {siteConfig.social.instagram.handle}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--color-muted)]">
                    Service area
                  </dt>
                  <dd>{siteConfig.address.serviceArea}</dd>
                </div>
              </dl>
            </div>
            <Button href="/quote" variant="secondary" className="w-full">
              Prefer a quote request?
            </Button>
            <p className="text-sm text-[var(--color-muted)]">
              We do not publish a residential address on this website.
            </p>
          </aside>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}
