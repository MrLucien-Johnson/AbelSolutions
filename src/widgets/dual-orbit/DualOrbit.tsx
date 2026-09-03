"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export type DualOrbitItem = {
  id: string;
  tone: "technology" | "construction";
  title: string;
  description: string;
  points: string[];
  href: string;
  ctaLabel?: string;
};

type DualOrbitProps = {
  items: DualOrbitItem[];
  className?: string;
  defaultActiveId?: string;
};

/**
 * Interactive dual-panel explorer — expand one division at a time.
 */
export function DualOrbit({
  items,
  className,
  defaultActiveId,
}: DualOrbitProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(
    defaultActiveId ?? items[0]?.id ?? "",
  );

  return (
    <div
      className={cn("aw-orbit", className)}
      role="group"
      aria-label="Service divisions"
    >
      {items.map((item, index) => {
        const active = item.id === activeId;
        const panelId = `${baseId}-${item.id}`;
        const detailId = `${panelId}-detail`;
        return (
          <div
            key={item.id}
            className="aw-orbit__panel"
            data-tone={item.tone}
            data-active={active ? "true" : "false"}
          >
            <button
              type="button"
              id={panelId}
              className="w-full text-left"
              aria-expanded={active}
              aria-controls={detailId}
              onClick={() => setActiveId(item.id)}
              onFocus={() => setActiveId(item.id)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
                  return;
                }
                event.preventDefault();
                const next =
                  event.key === "ArrowRight"
                    ? items[(index + 1) % items.length]
                    : items[(index - 1 + items.length) % items.length];
                if (!next) return;
                setActiveId(next.id);
                document.getElementById(`${baseId}-${next.id}`)?.focus();
              }}
            >
              <div className="aw-orbit__rail" aria-hidden="true" />
              <h3 className="mb-3">{item.title}</h3>
              <p className="mb-2 text-[var(--color-slate)] leading-body">
                {item.description}
              </p>
              {!active ? (
                <p className="text-sm font-semibold text-[var(--color-muted)]">
                  Select to expand details
                </p>
              ) : null}
            </button>

            <div
              id={detailId}
              className="aw-orbit__detail"
              role="region"
              aria-labelledby={panelId}
              aria-hidden={!active}
              {...(!active ? { inert: true } : {})}
            >
              <div className="aw-orbit__detail-inner">
                <ul className="mb-6 mt-4 space-y-2.5 text-[var(--color-slate)]">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "var(--aw-accent)" }}
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Button href={item.href} variant="secondary">
                  {item.ctaLabel ?? `Explore ${item.title}`}
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
