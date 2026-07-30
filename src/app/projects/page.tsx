import { QuoteCta, EmptyState } from "@/components/ui/Cards";
import { PageHero } from "@/components/ui/BrandMark";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import {
  getProjects,
  getLiveProjectCount,
  getFeaturedProjects,
  getUpcomingProjects,
} from "@/content/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Browse Abel Solutions project examples, including technology work such as the Programming Foundations course website, plus construction case studies and future project photography as it becomes available.",
  path: "/projects",
});

export default function ProjectsPage() {
  const liveProjects = getProjects().filter(
    (project) => !project.isPlaceholder && project.status === "live",
  );
  const upcoming = getUpcomingProjects();
  const placeholders = getProjects().filter((project) => project.isPlaceholder);
  const liveCount = getLiveProjectCount();
  const featured = getFeaturedProjects(1)[0];
  const remaining = featured
    ? liveProjects.filter((project) => project.slug !== featured.slug)
    : liveProjects;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Projects", path: "/projects" }]} />
      <PageHero
        title="Projects and previous work"
        description="Selected work from Abel Solutions. We publish genuine examples only — no invented reviews, dates or before-and-after claims."
        breadcrumbs={[{ label: "Projects" }]}
      />

      {featured ? (
        <Section tone="white" ariaLabelledby="featured-project">
          <SectionHeading
            id="featured-project"
            eyebrow="Featured"
            title="A clear example of our technology work."
            description="This live course website shows how Abel Solutions can structure practical digital resources for learners and clients."
          />
          <ProjectCard project={featured} featured />
        </Section>
      ) : null}

      <Section
        tone={featured ? "soft" : "white"}
        ariaLabelledby="projects-list"
      >
        <SectionHeading
          id="projects-list"
          eyebrow="Gallery"
          title={liveCount > 0 ? "Selected work" : "Project entries will appear here"}
          description={
            liveCount > 0
              ? "Browse published examples across technology and construction. More case studies will be added as approved photography becomes available."
              : "When approved project images and summaries are ready, they will be added through the content files documented in the project guide."
          }
        />

        {remaining.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {remaining.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : liveCount === 0 ? (
          <EmptyState
            title="No published projects yet"
            description="This section is ready for genuine case studies. Development placeholders can be enabled locally with NEXT_PUBLIC_SHOW_PLACEHOLDER_PROJECTS=true."
          />
        ) : (
          <p className="text-[var(--color-slate)]">
            More project examples will appear here as construction and technology
            case studies are approved for publication.
          </p>
        )}

        {placeholders.length > 0 ? (
          <p className="mt-8 notice-banner max-w-3xl">
            Development placeholders may appear in local development only and are
            not real customer projects.
          </p>
        ) : null}
      </Section>

      {upcoming.length > 0 ? (
        <Section tone="white" ariaLabelledby="future-projects">
          <SectionHeading
            id="future-projects"
            eyebrow="Future projects"
            title="Construction photography in preparation."
            description="Approved on-site photos from mobile access tower and construction work will appear here once ready. Training slides and unconfirmed certifications are not published."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {upcoming.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="soft">
        <QuoteCta
          title="Have a project in mind?"
          description="Share your requirements and we will advise on suitability, next steps and quotation needs."
        />
      </Section>
    </>
  );
}
