import { Button } from "@/components/ui/Button";
import {
  DivisionCard,
  FeatureCard,
  ProcessSteps,
  QuoteCta,
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
import { getProjects, getLiveProjectCount } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import Link from "next/link";

export default function HomePage() {
  const projects = getProjects().slice(0, 3);
  const liveCount = getLiveProjectCount();

  return (
    <>
      <section className="hero-atmosphere relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[48px_48px]" />
        </div>
        <div className="container-site relative grid gap-12 py-[var(--hero-y)] lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <p className="fade-up mb-5 font-[family-name:var(--font-outfit)] text-sm font-semibold tracking-[0.16em] text-white/70 uppercase">
              Abel Solutions
            </p>
            <h1 className="fade-up mb-6 max-w-3xl text-white">
              Technology and construction solutions you can depend on.
            </h1>
            <p className="fade-up-delay mb-10 max-w-2xl text-lg md:text-xl leading-relaxed text-white/80">
              Abel Solutions helps homes and businesses with technology support,
              repairs, installations, custom computer systems and practical
              construction services across London and surrounding areas.
            </p>
            <div className="fade-up-delay-2 flex flex-wrap gap-3">
              <Button href="/quote" variant="on-dark" size="lg">
                Request a Quote
              </Button>
              <Button href="#services" variant="on-dark-secondary" size="lg">
                Explore Our Services
              </Button>
            </div>
          </div>

          <div
            className="fade-up-delay relative min-h-[280px] overflow-hidden rounded-[var(--radius-lg)] border border-white/15 bg-white/5 p-6 md:min-h-[360px] md:p-8"
            aria-hidden="true"
          >
            <HeroVisual />
          </div>
        </div>
      </section>

      <Section id="services" ariaLabelledby="services-heading" tone="white">
        <SectionHeading
          id="services-heading"
          eyebrow="What we do"
          title="Two service divisions. One trusted company."
          description="Whether you need help with a computer, a custom PC, a media wall or practical construction support, Abel Solutions keeps both areas under one clear point of contact."
        />
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <DivisionCard
            title="Technology Services"
            description="Support for repairs, upgrades, custom PCs, IT assistance, software, networks and business technology — explained clearly and scoped to what you actually need."
            href="/technology-services"
            accent="technology"
            points={[
              "Computer and laptop repairs",
              "Custom and gaming PC builds",
              "Network and Wi-Fi support",
              "Small-business technical support",
            ]}
          />
          <DivisionCard
            title="Construction Services"
            description="Practical construction and property improvement support, including media walls, TV mounting, shelving, stud walls, groundwork and dependable labour."
            href="/construction-services"
            accent="construction"
            points={[
              "Media walls and TV mounting",
              "Shelving and interior fitting",
              "Stud walls and room improvements",
              "Groundwork and labour support",
            ]}
          />
        </div>
      </Section>

      <Section ariaLabelledby="why-heading" tone="soft">
        <SectionHeading
          id="why-heading"
          eyebrow="Why choose Abel Solutions"
          title="Practical help without the hard sell."
          description="We focus on clear communication, careful work and honest quotations — for homeowners, landlords and local businesses alike."
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {whyChoose.map((item) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Section>

      <Section ariaLabelledby="featured-heading" tone="white">
        <SectionHeading
          id="featured-heading"
          eyebrow="Featured services"
          title="A focused selection of what we help with most."
          description="Explore the full lists on each service page. These are common starting points for homes and businesses."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredServices.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Section>

      <Section ariaLabelledby="process-heading" tone="warm">
        <SectionHeading
          id="process-heading"
          eyebrow="How it works"
          title="A straightforward process from enquiry to completion."
          description="Some quotations may require photographs, specifications or an on-site assessment before we can price the work accurately."
        />
        <ProcessSteps steps={processSteps} />
      </Section>

      <Section ariaLabelledby="projects-heading" tone="white">
        <SectionHeading
          id="projects-heading"
          eyebrow="Projects"
          title="Work we can show with confidence."
          description="Genuine project photography and case studies will appear here as approved examples become available. We do not invent reviews or results."
        />
        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Project gallery coming soon"
            description="Once genuine Abel Solutions project images are ready, they will be published here with clear summaries. In the meantime, request a quote to discuss your own requirements."
          />
        )}
        <div className="mt-8">
          <Button href="/projects" variant="secondary">
            View projects{liveCount > 0 ? "" : " page"}
          </Button>
        </div>
      </Section>

      <Section ariaLabelledby="area-heading" tone="soft">
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
              <Link href="/about" className="font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline">
                Learn more about Abel Solutions
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section tone="white" className="!pt-0">
        <QuoteCta />
      </Section>
    </>
  );
}

function HeroVisual() {
  return (
    <div className="relative h-full min-h-[240px]">
      <div className="absolute inset-x-4 top-4 rounded-xl border border-white/20 bg-[#0f2436] p-4 shadow-lg md:inset-x-6 md:top-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
          <span className="text-xs tracking-wide text-white/60 uppercase">
            Technology
          </span>
        </div>
        <div className="space-y-2">
          <div className="h-2.5 w-4/5 rounded bg-white/15" />
          <div className="h-2.5 w-3/5 rounded bg-white/10" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="h-14 rounded-md bg-white/8 border border-white/10" />
            <div className="h-14 rounded-md bg-white/8 border border-white/10" />
            <div className="h-14 rounded-md bg-white/8 border border-white/10" />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-8 bottom-4 rounded-xl border border-white/15 bg-[#1a2a22]/90 p-4 backdrop-blur-sm md:inset-x-10 md:bottom-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-construction)]" />
          <span className="text-xs tracking-wide text-white/60 uppercase">
            Construction
          </span>
        </div>
        <div className="flex items-end gap-2">
          <div className="h-16 flex-1 rounded-t-md bg-white/12 border border-white/10" />
          <div className="h-24 w-20 rounded-md bg-white/10 border border-white/15" />
          <div className="h-12 flex-1 rounded-t-md bg-white/12 border border-white/10" />
        </div>
      </div>
    </div>
  );
}
