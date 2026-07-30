import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div
        className={cn(
          "relative aspect-[16/10] border-b border-[var(--color-border)]",
          project.category === "technology"
            ? "bg-[var(--color-accent-soft)]"
            : "bg-[var(--color-construction-soft)]",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.images[0]?.src}
          alt={project.images[0]?.alt ?? ""}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {project.isPlaceholder ? (
          <span className="absolute left-3 top-3 rounded-md bg-[var(--color-navy)] px-2.5 py-1 text-xs font-semibold text-white">
            Development placeholder
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.08em]",
            project.category === "technology"
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-construction)]",
          )}
        >
          {project.category === "technology" ? "Technology" : "Construction"}
        </p>
        <h3 className="mb-3 text-xl">{project.title}</h3>
        <p className="mb-4 flex-1 text-[var(--color-slate)] leading-relaxed">
          {project.summary}
        </p>
        <p className="text-sm text-[var(--color-muted)]">{project.location}</p>
      </div>
    </article>
  );
}
