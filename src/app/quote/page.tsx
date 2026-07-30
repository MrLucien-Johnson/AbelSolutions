import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageHero } from "@/components/ui/BrandMark";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Request a Quote",
  description:
    "Request a quote from Abel Solutions for technology or construction services in London and surrounding areas.",
  path: "/quote",
});

type Props = {
  searchParams: Promise<{ service?: string }>;
};

export default async function QuotePage({ searchParams }: Props) {
  const params = await searchParams;
  const defaultCategory = params.service;

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Request a Quote", path: "/quote" }]}
      />
      <PageHero
        title="Request a quote"
        description="Tell us what you need. We will review the details and respond with next steps. Some quotations require photographs, specifications or an on-site assessment."
        breadcrumbs={[{ label: "Request a Quote" }]}
      />

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="mb-4">What happens next</h2>
            <ol className="space-y-4 text-[var(--color-slate)]">
              <li>
                <strong className="text-[var(--color-navy)]">1.</strong> We
                review your enquiry and confirm whether more detail is needed.
              </li>
              <li>
                <strong className="text-[var(--color-navy)]">2.</strong> You
                receive an initial assessment and, where possible, a clear
                quotation.
              </li>
              <li>
                <strong className="text-[var(--color-navy)]">3.</strong> If the
                work goes ahead, we arrange timing and access requirements.
              </li>
            </ol>
            <p className="mt-8 notice-banner">
              Email delivery depends on server configuration. If delivery is not
              yet enabled, the form will validate your details and explain that
              the enquiry could not be emailed automatically — it will not claim
              a message was sent when it was not.
            </p>
          </div>
          <QuoteForm defaultCategory={defaultCategory} />
        </div>
      </Section>
    </>
  );
}
