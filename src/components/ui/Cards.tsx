import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function DivisionCard({
  title,
  description,
  href,
  accent = "technology",
  points,
}: {
  title: string;
  description: string;
  href: string;
  accent?: "technology" | "construction";
  points: string[];
}) {
  const isTech = accent === "technology";

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border bg-[var(--color-surface)] p-7 md:p-9",
        "border-[var(--color-border)] shadow-[var(--shadow-soft)]",
      )}
    >
      <div
        className={cn(
          "mb-6 h-1.5 w-14 rounded-full",
          isTech ? "bg-[var(--color-accent)]" : "bg-[var(--color-construction)]",
        )}
        aria-hidden="true"
      />
      <h3 className="mb-4">{title}</h3>
      <p className="mb-6 text-[var(--color-slate)] leading-relaxed">{description}</p>
      <ul className="mb-8 space-y-2.5 text-[var(--color-slate)]">
        {points.map((point) => (
          <li key={point} className="flex gap-3">
            <span
              className={cn(
                "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                isTech ? "bg-[var(--color-accent)]" : "bg-[var(--color-construction)]",
              )}
              aria-hidden="true"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <Button href={href} variant="secondary">
          Explore {title}
        </Button>
      </div>
    </article>
  );
}

export function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-7">
      <h3 className="mb-3 text-xl">{title}</h3>
      <p className="text-[var(--color-slate)] leading-relaxed">{description}</p>
    </article>
  );
}

export function ServiceCard({
  title,
  description,
  href,
  division,
}: {
  title: string;
  description: string;
  href: string;
  division: "technology" | "construction";
}) {
  return (
    <article className="group flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-7 transition-colors hover:border-[var(--color-border-strong)]">
      <p
        className={cn(
          "mb-4 text-xs font-semibold uppercase tracking-[0.08em]",
          division === "technology"
            ? "text-[var(--color-accent)]"
            : "text-[var(--color-construction)]",
        )}
      >
        {division === "technology" ? "Technology" : "Construction"}
      </p>
      <h3 className="mb-3 text-xl">
        <Link
          href={href}
          className="hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
        >
          {title}
        </Link>
      </h3>
      <p className="mb-5 flex-1 text-[var(--color-slate)] leading-relaxed">
        {description}
      </p>
      <Link
        href={href}
        className="text-sm font-semibold text-[var(--color-accent)] underline-offset-4 hover:underline"
      >
        Learn more
        <span className="sr-only"> about {title}</span>
      </Link>
    </article>
  );
}

export function ProcessSteps({
  steps,
}: {
  steps: Array<{ step: number; title: string; description: string }>;
}) {
  return (
    <ol className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {steps.map((item) => (
        <li
          key={item.step}
          className="relative rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
        >
          <span
            className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-sm font-bold text-[var(--color-accent)]"
            aria-hidden="true"
          >
            {item.step}
          </span>
          <h3 className="mb-3 text-lg">{item.title}</h3>
          <p className="text-[var(--color-slate)] text-[0.95rem] leading-relaxed">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function QuoteCta({
  title = "Ready to discuss your project?",
  description = "Tell us what you need and we will provide a clear initial response. Some quotations may require photographs, specifications or an on-site assessment.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-navy)] px-7 py-10 md:px-12 md:py-14 text-white">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_auto] lg:items-center">
        <div>
          <h2 className="mb-4 text-white">{title}</h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/quote" variant="on-dark" size="lg">
            Request a Quote
          </Button>
          <Button href="/contact" variant="on-dark-secondary" size="lg">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)] px-6 py-14 text-center">
      <h3 className="mb-3">{title}</h3>
      <p className="mx-auto max-w-xl text-[var(--color-slate)]">{description}</p>
    </div>
  );
}
