import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "nav";
}) {
  return <Tag className={cn("container-site", className)}>{children}</Tag>;
}

export function Section({
  children,
  className,
  id,
  ariaLabelledby,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
  tone?: "default" | "soft" | "warm" | "navy" | "white";
}) {
  const tones = {
    default: "bg-[var(--color-surface-soft)]",
    soft: "bg-[var(--color-surface-soft)]",
    warm: "bg-[var(--color-surface-warm)]",
    navy: "bg-[var(--color-navy)] text-white",
    white: "bg-[var(--color-surface)]",
  };

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn("section-space", tones[tone], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14 max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 text-sm font-semibold tracking-[0.08em] uppercase",
            tone === "light" ? "text-white/70" : "text-[var(--color-accent)]",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "mb-5",
          tone === "light" ? "text-white" : "text-[var(--color-navy)]",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-lg leading-relaxed",
            tone === "light" ? "text-white/80" : "text-[var(--color-slate)]",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
