import { Button } from "@/components/ui/Button";
import {
  FeatureCard,
  ServiceCard,
  EmptyState,
} from "@/components/ui/Cards";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import {
  featuredServices,
  processSteps,
  whyChoose,
} from "@/content/services";
import { getFeaturedProjects } from "@/content/projects";
import Link from "next/link";
import {
  AmbientStage,
  DualOrbit,
  IntentLaunch,
  MagneticAction,
  ProcessRail,
  Reveal,
  SpotlightGallery,
} from "@/widgets";

export default function HomePage() {
  const projects = getFeaturedProjects(3);

  const spotlightItems = projects.map((project) => ({
    id: project.slug,
    title: project.title,
    categoryLabel:
      project.category === "technology" ? "Technology" : "Construction",
    summary: project.summary,
    whyItMatters: project.outcome || undefined,
    location: project.location,
    imageSrc: project.images[0]?.src ?? "/images/placeholders/project-technology.svg",
    imageAlt: project.images[0]?.alt ?? project.title,
    externalUrl: project.externalUrl,
    externalLabel: project.ctaLabel ?? "View the live project",
    secondaryHref: "/quote/",
    secondaryLabel: "Discuss a similar brief",
    badge: project.status === "live" ? "Live example" : "Coming soon",
  }));

  return (
    <>
      <AmbientStage className="min-h-[min(92vh,920px)] overflow-x-clip" label="Abel Solutions home">
        <div className="container-site relative flex min-h-[min(92vh,920px)] flex-col justify-end pb-[clamp(3.5rem,8vw,6rem)] pt-[clamp(6rem,12vw,11rem)]">
          <p className="fade-up font-display max-w-full text-[clamp(2.15rem,11vw,5.4rem)] font-bold leading-[0.94] tracking-[0.04em] text-white sm:tracking-[0.08em]">
            <span className="block sm:inline">ABEL</span>
            <span className="hidden sm:inline"> </span>
            <span className="block sm:inline">SOLUTIONS</span>
          </p>
          <div className="mt-3 h-1 w-16 rounded-[var(--radius-sm)] bg-[var(--color-accent)] fade-up" aria-hidden="true" />
          <p className="fade-up mt-4 type-eyebrow text-white/70">
            Technology · Construction
          </p>
          <h1 className="fade-up mt-8 max-w-3xl text-balance text-white">
            Technology and construction solutions you can depend on.
          </h1>
          <p className="fade-up-delay mt-6 mb-10 max-w-2xl text-lg md:text-xl leading-body text-white/90">
            Practical help for homes and businesses across London and surrounding
            areas — repairs, custom systems, installations and construction support
            under one clear point of contact.
          </p>
          <div className="fade-up-delay-2 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
            <MagneticAction className="w-full sm:w-auto">
              <Button href="/quote/" variant="on-dark" size="lg" className="w-full sm:w-auto">
                Request a Quote
              </Button>
            </MagneticAction>
            <MagneticAction className="w-full sm:w-auto">
              <Button href="#services" variant="on-dark-secondary" size="lg" className="w-full sm:w-auto">
                Explore Our Services
              </Button>
            </MagneticAction>
          </div>
        </div>
      </AmbientStage>

      <Section id="services" ariaLabelledby="services-heading" tone="white">
        <Reveal>
          <SectionHeading
            id="services-heading"
            eyebrow="What we do"
            title="Two service divisions. One trusted company."
            description="Select a division to explore what we handle — then open the full service page when you are ready."
          />
        </Reveal>
        <Reveal delayMs={80}>
          <DualOrbit
            defaultActiveId="technology"
            items={[
              {
                id: "technology",
                tone: "technology",
                title: "Technology Services",
                description:
                  "Support for repairs, upgrades, custom PCs, IT assistance, software, networks and business technology — explained clearly and scoped to what you actually need.",
                href: "/technology-services/",
                points: [
                  "Computer and laptop repairs",
                  "Custom and gaming PC builds",
                  "Network and Wi-Fi support",
                  "Small-business technical support",
                ],
              },
              {
                id: "construction",
                tone: "construction",
                title: "Construction Services",
                description:
                  "Practical construction and property improvement support, including media walls, TV mounting, shelving, stud walls, groundwork and dependable labour.",
                href: "/construction-services/",
                points: [
                  "Media walls and TV mounting",
                  "Shelving and interior fitting",
                  "Stud walls and room improvements",
                  "Groundwork and labour support",
                ],
              },
            ]}
          />
        </Reveal>
      </Section>

      <Section ariaLabelledby="why-heading" tone="soft">
        <Reveal>
          <SectionHeading
            id="why-heading"
            eyebrow="Why choose Abel Solutions"
            title="Practical help without the hard sell."
            description="We focus on clear communication, careful work and honest quotations — for homeowners, landlords and local businesses alike."
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 60}>
              <FeatureCard title={item.title} description={item.description} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section ariaLabelledby="featured-heading" tone="white">
        <Reveal>
          <SectionHeading
            id="featured-heading"
            eyebrow="Featured services"
            title="A focused selection of what we help with most."
            description="Explore the full lists on each service page. These are common starting points for homes and businesses."
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredServices.map((service, index) => (
            <Reveal key={service.title} delayMs={index * 50}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section ariaLabelledby="process-heading" tone="warm">
        <Reveal>
          <SectionHeading
            id="process-heading"
            eyebrow="How it works"
            title="A straightforward process from enquiry to completion."
            description="Step through the sequence — some quotations may need photographs, specifications or an on-site assessment first."
          />
        </Reveal>
        <Reveal delayMs={80}>
          <ProcessRail steps={processSteps} />
        </Reveal>
      </Section>

      <Section ariaLabelledby="projects-heading" tone="white">
        <Reveal>
          <SectionHeading
            id="projects-heading"
            eyebrow="Projects"
            title="Public work you can open today."
            description="Live technology examples from Abel Solutions — with construction photography joining as approved images become available."
          />
        </Reveal>
        <Reveal delayMs={80}>
          {spotlightItems.length > 0 ? (
            <SpotlightGallery items={spotlightItems} />
          ) : (
            <EmptyState
              title="Project gallery coming soon"
              description="Once genuine Abel Solutions project images are ready, they will be published here with clear summaries. In the meantime, request a quote to discuss your own requirements."
            />
          )}
        </Reveal>
        <div className="mt-8">
          <MagneticAction>
            <Button href="/projects/" variant="secondary">
              View all projects
            </Button>
          </MagneticAction>
        </div>
      </Section>

      <Section ariaLabelledby="area-heading" tone="soft">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <SectionHeading
                id="area-heading"
                eyebrow="Service area"
                title={`Based around ${siteConfig.address.serviceArea}.`}
                description={`${siteConfig.address.serviceAreaNote} Tell us your location when you enquire and we will confirm suitability for the job.`}
              />
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-7 md:p-8">
              <h3 className="mb-3">Who we help</h3>
              <ul className="space-y-2.5 text-[var(--color-slate)]">
                <li>Homeowners and tenants</li>
                <li>Landlords and property managers</li>
                <li>Local businesses and SMEs</li>
                <li>Construction companies needing labour support</li>
              </ul>
              <p className="mt-6 text-sm text-[var(--color-muted)]">
                Prefer to browse first?{" "}
                <Link
                  href="/about/"
                  className="font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline"
                >
                  Learn more about Abel Solutions
                </Link>
                .
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section tone="white" className="!pt-0">
        <Reveal>
          <IntentLaunch
            title="Ready to discuss your project?"
            description="Choose what you need help with, then request a quote. Some quotations may require photographs, specifications or an on-site assessment."
            chips={[
              {
                id: "tech",
                label: "Technology",
                serviceParam: "technology",
              },
              {
                id: "construction",
                label: "Construction",
                serviceParam: "construction",
              },
              {
                id: "both",
                label: "Both / not sure",
                serviceParam: "general",
              },
            ]}
          />
        </Reveal>
      </Section>
    </>
  );
}
