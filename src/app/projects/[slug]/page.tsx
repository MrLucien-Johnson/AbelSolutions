import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/BrandMark";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getProjectBySlug, getProjects } from "@/content/projects";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return createPageMetadata({
      title: "Project not found",
      description: "This project could not be found.",
      path: `/projects/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    noIndex: project.isPlaceholder,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      />
      <PageHero
        title={project.title}
        description={project.summary}
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />

      <Section tone="white">
        {project.isPlaceholder ? (
          <p className="notice-banner mb-10 max-w-3xl">
            This is a development placeholder used to demonstrate layout. It is
            not a real Abel Solutions customer project.
          </p>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div
              className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-soft)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.images[0]?.src}
                alt={project.images[0]?.alt ?? ""}
                className="w-full object-cover"
              />
            </div>

            <div>
              <h2 className="mb-3">Challenge</h2>
              <p className="text-[var(--color-slate)] leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div>
              <h2 className="mb-3">Solution</h2>
              <p className="text-[var(--color-slate)] leading-relaxed">
                {project.solution}
              </p>
            </div>
            <div>
              <h2 className="mb-3">Outcome</h2>
              <p className="text-[var(--color-slate)] leading-relaxed">
                {project.outcome}
              </p>
            </div>
            {project.testimonial ? (
              <blockquote className="rounded-[var(--radius-md)] border-l-4 border-[var(--color-accent)] bg-[var(--color-accent-soft)] p-6 text-[var(--color-slate)]">
                {project.testimonial}
              </blockquote>
            ) : null}
          </div>

          <aside className="h-fit rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-7">
            <dl className="space-y-5">
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Category</dt>
                <dd className="font-medium text-[var(--color-navy)] capitalize">
                  {project.category}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Location</dt>
                <dd>{project.location}</dd>
              </div>
              <div>
                <dt className="mb-2 text-sm text-[var(--color-muted)]">
                  Services completed
                </dt>
                <dd>
                  <ul className="space-y-1.5">
                    {project.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            <div className="mt-8">
              <Button href="/quote" className="w-full">
                Request a similar quote
              </Button>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
