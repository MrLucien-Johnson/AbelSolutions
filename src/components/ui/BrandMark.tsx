import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/**
 * Primary site brand mark: refined text wordmark.
 * Optional logoImage (when supplied) appears as a compact mark beside the wordmark
 * and can later be reused for favicon or other placements without replacing the text.
 */
export function BrandMark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const logoImage = siteConfig.brand.logoImage;

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 rounded-sm leading-none",
        "focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4",
        className,
      )}
      aria-label="Abel Solutions — home"
    >
      {logoImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoImage}
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
        />
      ) : (
        <span
          className={cn(
            "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border",
            tone === "light"
              ? "border-white/25 bg-white/10 text-white"
              : "border-[var(--color-border-strong)] bg-[var(--color-accent-soft)] text-[var(--color-navy)]",
          )}
          aria-hidden="true"
        >
          <span className="font-[family-name:var(--font-outfit)] text-[0.72rem] font-bold tracking-[0.06em]">
            AS
          </span>
        </span>
      )}

      <span className="inline-flex flex-col">
        <span
          className={cn(
            "font-[family-name:var(--font-outfit)] text-[1.02rem] font-bold tracking-[0.12em]",
            tone === "light" ? "text-white" : "text-[var(--color-navy)]",
          )}
        >
          ABEL&nbsp;SOLUTIONS
        </span>
        <span
          className={cn(
            "mt-1.5 h-0.5 w-10 rounded-full",
            tone === "light" ? "bg-[var(--color-accent)]" : "bg-[var(--color-accent)]",
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            "mt-1.5 text-[0.62rem] font-medium tracking-[0.08em] uppercase",
            tone === "light" ? "text-white/65" : "text-[var(--color-muted)]",
          )}
        >
          Technology · Construction
        </span>
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
