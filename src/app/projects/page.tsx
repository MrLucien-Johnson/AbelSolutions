import { QuoteCta, EmptyState } from "@/components/ui/Cards";
import { PageHero } from "@/components/ui/BrandMark";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getProjects, getLiveProjectCount } from "@/content/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Browse Abel Solutions project examples across technology and construction services. Genuine case studies are published as approved photography becomes available.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects();
  const liveCount = getLiveProjectCount();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Projects", path: "/projects" }]} />
      <PageHero
        title="Projects and previous work"
        description="A place for genuine Abel Solutions project examples. We only publish work we can stand behind — no invented reviews, dates or before-and-after claims."
        breadcrumbs={[{ label: "Projects" }]}
      />

      <Section tone="white" ariaLabelledby="projects-list">
        <SectionHeading
          id="projects-list"
          eyebrow="Gallery"
          title={
            liveCount > 0
              ? "Selected work"
              : "Project entries will appear here"
          }
          description={
            liveCount > 0
              ? "Browse technology and construction examples. Locations are shown at a broad area level only."
              : "When approved project images and summaries are ready, they will be added through the content files documented in the project guide."
          }
        />

        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No published projects yet"
            description="This section is ready for genuine case studies. Development placeholders can be enabled locally with NEXT_PUBLIC_SHOW_PLACEHOLDER_PROJECTS=true."
          />
        )}

        {projects.some((p) => p.isPlaceholder) ? (
          <p className="mt-8 notice-banner max-w-3xl">
            One or more entries below or above are marked as development
            placeholders and are not real customer projects.
          </p>
        ) : null}
      </Section>

      <Section tone="soft">
        <QuoteCta
          title="Have a project in mind?"
          description="Share your requirements and we will advise on suitability, next steps and quotation needs."
        />
      </Section>
    </>
  );
}
