import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";
import { Button } from "@/components/ui/Button";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const cover = project.images[0];
  const isTechnology = project.category === "technology";

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]",
        featured && "md:grid md:grid-cols-2",
        !featured && "flex h-full flex-col",
      )}
    >
      <div
        className={cn(
          "relative border-b border-[var(--color-border)] md:border-b-0",
          featured
            ? "aspect-[16/10] md:aspect-auto md:min-h-[300px] md:border-r"
            : "aspect-[16/10]",
          isTechnology
            ? "bg-[var(--color-accent-soft)]"
            : "bg-[var(--color-construction-soft)]",
        )}
      >
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            className="object-cover"
            sizes={
              featured
                ? "(min-width: 768px) 50vw, 100vw"
                : "(min-width: 768px) 33vw, 100vw"
            }
            unoptimized
          />
        ) : null}
        {project.isPlaceholder ? (
          <span className="absolute left-3 top-3 rounded-md bg-[var(--color-navy)] px-2.5 py-1 text-xs font-semibold text-white">
            Development placeholder
          </span>
        ) : (
          <span className="absolute left-3 top-3 rounded-md bg-[var(--color-accent)] px-2.5 py-1 text-xs font-semibold text-white">
            Live example
          </span>
        )}
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col",
          featured ? "justify-center p-6 sm:p-8 lg:p-10" : "p-6",
        )}
      >
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.08em]",
            isTechnology
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-construction)]",
          )}
        >
          {isTechnology ? "Technology" : "Construction"}
        </p>
        <h3 className={cn("mb-3", featured ? "text-2xl md:text-3xl" : "text-xl")}>
          {project.title}
        </h3>
        <p
          className={cn(
            "mb-4 text-[var(--color-slate)] leading-relaxed",
            featured ? "text-base" : "flex-1",
          )}
        >
          {project.summary}
        </p>

        {featured && project.outcome ? (
          <p className="mb-4 text-sm leading-relaxed text-[var(--color-slate)]">
            <span className="font-semibold text-[var(--color-navy)]">
              Why it matters:{" "}
            </span>
            {project.outcome}
          </p>
        ) : null}

        {featured && project.services.length > 0 ? (
          <ul className="mb-5 flex flex-wrap gap-2">
            {project.services.map((service) => (
              <li
                key={service}
                className="rounded-full bg-[var(--color-surface-soft)] px-2.5 py-1 text-xs font-medium text-[var(--color-slate)]"
              >
                {service}
              </li>
            ))}
          </ul>
        ) : null}

        <p className="mb-5 text-sm text-[var(--color-muted)]">{project.location}</p>

        <div className="mt-auto flex flex-wrap items-center gap-3">
          {project.externalUrl ? (
            <Button
              href={project.externalUrl}
              external
              variant="primary"
              size={featured ? "lg" : "md"}
            >
              {project.ctaLabel ?? "View project"}
            </Button>
          ) : null}
          <Link
            href="/quote/"
            className="text-sm font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline"
          >
            Discuss a similar brief
          </Link>
        </div>
      </div>
    </article>
  );
}
