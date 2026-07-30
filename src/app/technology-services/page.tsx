import { Button } from "@/components/ui/Button";
import { QuoteCta } from "@/components/ui/Cards";
import { PageHero } from "@/components/ui/BrandMark";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { technologyCategories } from "@/content/services";

export const metadata = createPageMetadata({
  title: "Technology Services",
  description:
    "IT support, computer repair, custom PC builds, networking help and small-business technology support from Abel Solutions in London and surrounding areas.",
  path: "/technology-services",
});

export default function TechnologyServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Technology Services", path: "/technology-services" }]}
      />
      <ServiceJsonLd
        name="Technology Services"
        description="Computer repairs, custom PC builds, IT support, networking and related technology services for homes and businesses."
        path="/technology-services"
      />
      <PageHero
        title="Technology Services"
        description="Practical IT support in London for homes and businesses — from computer repair and custom PC builds to networks, software troubleshooting and equipment removal."
        breadcrumbs={[{ label: "Technology Services" }]}
      >
        <Button href="/quote?service=technology" variant="on-dark" size="lg">
          Request a technology quote
        </Button>
      </PageHero>

      <Section tone="white" ariaLabelledby="tech-intro">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div>
            <SectionHeading
              id="tech-intro"
              eyebrow="Abel Solutions Technology"
              title="Clear help when technology gets in the way."
              description="Whether a laptop has slowed to a crawl, you need a gaming PC built properly, or a small business needs dependable day-to-day support, we focus on practical advice and careful work."
            />
          </div>
          <aside className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-accent-soft)] p-6 md:p-7">
            <h2 className="mb-3 text-xl">Good to know</h2>
            <ul className="space-y-3 text-[var(--color-slate)]">
              <li>We do not claim certifications or partnerships unless documented.</li>
              <li>Software licences are not included with builds unless agreed separately.</li>
              <li>Some faults need diagnosis before a firm quotation can be given.</li>
            </ul>
          </aside>
        </div>
      </Section>

      {technologyCategories.map((category) => (
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
          title="Need help with a computer, network or custom build?"
          description="Share what is going wrong or what you want to achieve. We will review the details and advise on the next step, including whether an assessment is needed."
        />
      </Section>
    </>
  );
}
