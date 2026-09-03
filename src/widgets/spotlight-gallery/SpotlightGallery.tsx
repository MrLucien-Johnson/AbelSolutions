"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { cn, publicAsset } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export type SpotlightItem = {
  id: string;
  title: string;
  categoryLabel: string;
  summary: string;
  whyItMatters?: string;
  location?: string;
  imageSrc: string;
  imageAlt: string;
  externalUrl?: string;
  externalLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  badge?: string;
};

type SpotlightGalleryProps = {
  items: SpotlightItem[];
  className?: string;
};

/**
 * Interactive project spotlight — tabbed stage with media + narrative.
 */
export function SpotlightGallery({ items, className }: SpotlightGalleryProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const active = items.find((item) => item.id === activeId) ?? items[0];

  if (!active) return null;

  return (
    <div className={cn("aw-spotlight", className)}>
      <div
        className="aw-spotlight__tabs"
        role="tablist"
        aria-label="Featured projects"
      >
        {items.map((item, index) => {
          const selected = item.id === active.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              className="aw-spotlight__tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              data-active={selected ? "true" : "false"}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
                  return;
                }
                event.preventDefault();
                const nextIndex =
                  event.key === "ArrowRight"
                    ? (index + 1) % items.length
                    : (index - 1 + items.length) % items.length;
                const next = items[nextIndex];
                if (next) setActiveId(next.id);
              }}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        className="aw-spotlight__stage"
        aria-labelledby={`${baseId}-tab-${active.id}`}
      >
        <div className="aw-spotlight__media">
          <Image
            src={publicAsset(active.imageSrc)}
            alt={active.imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
            unoptimized
          />
          {active.badge ? (
            <span className="absolute left-3 top-3 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-2.5 py-1 text-xs font-semibold text-white">
              {active.badge}
            </span>
          ) : null}
        </div>
        <div className="aw-spotlight__body">
          <p className="type-label mb-3 text-[var(--color-accent)]">
            {active.categoryLabel}
          </p>
          <h3 className="mb-3">{active.title}</h3>
          <p className="mb-4 text-[var(--color-slate)] leading-body">
            {active.summary}
          </p>
          {active.whyItMatters ? (
            <p className="mb-4 text-sm leading-body text-[var(--color-slate)]">
              <span className="font-semibold text-[var(--color-navy)]">
                Why it matters:{" "}
              </span>
              {active.whyItMatters}
            </p>
          ) : null}
          {active.location ? (
            <p className="mb-5 text-sm text-[var(--color-muted)]">
              {active.location}
            </p>
          ) : null}
          <div className="mt-auto flex flex-wrap items-center gap-3">
            {active.externalUrl ? (
              <Button href={active.externalUrl} external variant="primary">
                {active.externalLabel ?? "Open project"}
              </Button>
            ) : null}
            {active.secondaryHref ? (
              <Button href={active.secondaryHref} variant="ghost">
                {active.secondaryLabel ?? "Learn more"}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
