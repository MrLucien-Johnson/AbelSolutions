import { Button } from "@/components/ui/Button";
import { QuoteCta, FeatureCard } from "@/components/ui/Cards";
import { PageHero } from "@/components/ui/BrandMark";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about Abel Solutions Limited — a UK-based company providing technology support and practical construction services for homes and businesses in London and surrounding areas.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "About", path: "/about" }]} />
      <PageHero
        title="About Abel Solutions"
        description="A practical multi-service company helping homes and businesses with technology support and construction-related work — under one clear brand."
        breadcrumbs={[{ label: "About" }]}
      />

      <Section tone="white" ariaLabelledby="about-story">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeading
              id="about-story"
              eyebrow="Who we are"
              title="One company. Two clearly separated service areas."
              description="Abel Solutions Limited brings together technology services and construction support so customers do not have to juggle disconnected providers for everyday practical work."
            />
            <div className="space-y-5 text-[var(--color-slate)] leading-body max-w-3xl">
              <p>
                Technology work covers the problems people hit most often:
                unreliable computers, upgrades, custom builds, networks, software
                troubleshooting and small-business technical support.
              </p>
              <p>
                Construction work focuses on practical installations and project
                support — media walls, TV mounting, shelving, stud walls,
                groundwork and labour — assessed carefully for scope and safety.
              </p>
              <p>
                We aim to communicate clearly, quote honestly and treat customers’
                property and equipment with care. We do not make unsupported claims
                about certifications, rankings or guaranteed outcomes.
              </p>
            </div>
          </div>
          <aside className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-7 h-fit">
            <h3 className="mb-4">Company details</h3>
            <dl className="space-y-4 text-[var(--color-slate)]">
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Legal name</dt>
                <dd className="font-medium text-[var(--color-navy)]">
                  {siteConfig.legalName}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted)]">
                  Company number
                </dt>
                <dd>
                  {siteConfig.companyNumber ??
                    siteConfig.companyNumberPlaceholder}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Service area</dt>
                <dd>{siteConfig.address.serviceArea}</dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Instagram</dt>
                <dd>
                  <a
                    href={siteConfig.social.instagram.url}
                    className="text-[var(--color-accent)] underline-offset-2 hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {siteConfig.social.instagram.handle}
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-sm text-[var(--color-muted)]">
              Registered office details are not published on this website. A
              residential address will never be shown.
            </p>
          </aside>
        </div>
      </Section>

      <Section tone="soft" ariaLabelledby="about-values">
        <SectionHeading
          id="about-values"
          eyebrow="How we work"
          title="What you can expect when you get in touch."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <FeatureCard
            title="Straightforward explanations"
            description="We describe issues and options in plain language so you can make an informed decision."
          />
          <FeatureCard
            title="Scoped quotations"
            description="Pricing is based on what we can assess. Photos or a site visit may be needed before a firm quote."
          />
          <FeatureCard
            title="Respect on site and at the desk"
            description="Whether the work involves a PC or a wall installation, we treat spaces and equipment carefully."
          />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/technology-services" variant="secondary">
            Technology Services
          </Button>
          <Button href="/construction-services" variant="secondary">
            Construction Services
          </Button>
        </div>
      </Section>

      <Section tone="white">
        <QuoteCta />
      </Section>
    </>
  );
}
