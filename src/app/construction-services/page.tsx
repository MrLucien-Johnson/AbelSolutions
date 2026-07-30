import { Button } from "@/components/ui/Button";
import { QuoteCta } from "@/components/ui/Cards";
import { PageHero } from "@/components/ui/BrandMark";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { constructionCategories } from "@/content/services";

export const metadata = createPageMetadata({
  title: "Construction Services",
  description:
    "Media wall installation, TV wall mounting, shelving, stud walls, groundwork and construction labour support from Abel Solutions in London and surrounding areas.",
  path: "/construction-services",
});

export default function ConstructionServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Construction Services", path: "/construction-services" },
        ]}
      />
      <ServiceJsonLd
        name="Construction Services"
        description="Media walls, TV mounting, interior installations, groundwork and construction labour support for homes and projects."
        path="/construction-services"
      />
      <PageHero
        title="Construction Services"
        description="Property improvement and construction support in London — including media walls, TV mounting, shelving, stud walls, groundwork and dependable labour for homes and project teams."
        breadcrumbs={[{ label: "Construction Services" }]}
      >
        <Button href="/quote?service=construction" variant="on-dark" size="lg">
          Request a construction quote
        </Button>
      </PageHero>

      <Section tone="white" ariaLabelledby="construction-intro">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div>
            <SectionHeading
              id="construction-intro"
              eyebrow="Abel Solutions Construction"
              title="Practical construction work, planned carefully."
              description="From a living-room media wall to site labour support, we assess each job for scope, access and safety before confirming what we can take on."
            />
          </div>
          <aside className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-construction-soft)] p-6 md:p-7">
            <h2 className="mb-3 text-xl">Important notes</h2>
            <ul className="space-y-3 text-[var(--color-slate)]">
              <li>
                We are not a structural engineer, architect, gas engineer or
                electrician.
              </li>
              <li>
                Specialist electrical work may require a suitably qualified
                electrician.
              </li>
              <li>
                PASMA-related access work is only offered once certification
                status is confirmed.
              </li>
            </ul>
          </aside>
        </div>
      </Section>

      {constructionCategories.map((category) => (
        <Section
          key={category.id}
          id={category.id}
          tone="soft"
          ariaLabelledby={`${category.id}-heading`}
          className="!py-16 md:!py-20 border-t border-[var(--color-border)]"
        >
          <SectionHeading
            id={`${category.id}-heading`}
            title={category.title}
            description={category.intro}
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {category.items.map((item) => (
              <article
                key={item.title}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
              >
                <h3 className="mb-3 text-lg">{item.title}</h3>
                <p className="text-[var(--color-slate)] leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
          {category.note ? (
            <p className="mt-8 notice-banner max-w-3xl">{category.note}</p>
          ) : null}
        </Section>
      ))}

      <Section tone="white">
        <QuoteCta
          title="Planning a media wall, fitting job or site support?"
          description="Tell us about the space, access and timing. We will confirm suitability and provide a clear quotation once the scope is understood."
        />
      </Section>
    </>
  );
}
