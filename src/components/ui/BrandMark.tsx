import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex flex-col leading-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 rounded-sm",
        className,
      )}
      aria-label="Abel Solutions — home"
    >
      <span
        className={cn(
          "font-[family-name:var(--font-outfit)] text-[1.05rem] font-bold tracking-[0.14em]",
          tone === "light" ? "text-white" : "text-[var(--color-navy)]",
        )}
      >
        ABEL SOLUTIONS
      </span>
      <span
        className={cn(
          "mt-1 text-[0.65rem] font-medium tracking-[0.04em]",
          tone === "light" ? "text-white/65" : "text-[var(--color-muted)]",
        )}
      >
        Technology · Construction
      </span>
    </Link>
  );
}

export function Breadcrumbs({
  items,
  tone = "light",
}: {
  items: Array<{ label: string; href?: string }>;
  tone?: "light" | "dark";
}) {
  const muted = tone === "light" ? "text-white/65" : "text-[var(--color-muted)]";
  const current =
    tone === "light" ? "text-white font-medium" : "text-[var(--color-navy)] font-medium";
  const linkHover =
    tone === "light"
      ? "hover:text-white underline-offset-2 hover:underline"
      : "hover:text-[var(--color-accent)] underline-offset-2 hover:underline";

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className={cn("flex flex-wrap items-center gap-2 text-sm", muted)}>
        <li>
          <Link href="/" className={linkHover}>
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href} className={linkHover}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={current}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  title,
  description,
  breadcrumbs,
  children,
}: {
  title: string;
  description: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  children?: React.ReactNode;
}) {
  return (
    <header className="bg-[var(--color-navy)] text-white">
      <div className="container-site pt-28 pb-16 md:pt-32 md:pb-20">
        <Breadcrumbs items={breadcrumbs} />
        <div className="max-w-3xl">
          <h1 className="mb-6 text-white">{title}</h1>
          <p className="text-lg md:text-xl leading-relaxed text-white/80">
            {description}
          </p>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </header>
  );
}
