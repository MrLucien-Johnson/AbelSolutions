"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type ProcessRailStep = {
  title: string;
  description: string;
};

type ProcessRailProps = {
  steps: ProcessRailStep[];
  className?: string;
  eyebrow?: string;
};

/**
 * Interactive process scrubber — select a step to read the detail panel.
 */
export function ProcessRail({
  steps,
  className,
  eyebrow = "Step detail",
}: ProcessRailProps) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const current = steps[active] ?? steps[0];

  if (!current) return null;

  return (
    <div className={cn("aw-rail", className)}>
      <div
        className="aw-rail__steps"
        role="tablist"
        aria-label="Process steps"
        aria-orientation="vertical"
      >
        {steps.map((step, index) => {
          const selected = index === active;
          const tabId = `${baseId}-tab-${index}`;
          const panelId = `${baseId}-panel`;
          return (
            <button
              key={step.title}
              type="button"
              role="tab"
              id={tabId}
              className="aw-rail__step"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              data-active={selected ? "true" : "false"}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setActive((index + 1) % steps.length);
                }
                if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setActive((index - 1 + steps.length) % steps.length);
                }
                if (event.key === "Home") {
                  event.preventDefault();
                  setActive(0);
                }
                if (event.key === "End") {
                  event.preventDefault();
                  setActive(steps.length - 1);
                }
              }}
            >
              <span className="aw-rail__index" aria-hidden="true">
                {index + 1}
              </span>
              <span>
                <span className="block font-semibold text-[var(--color-navy)]">
                  {step.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        className="aw-rail__panel"
        aria-labelledby={`${baseId}-tab-${active}`}
      >
        <p className="type-label mb-3 text-[var(--color-accent)]">{eyebrow}</p>
        <h3 className="mb-3">{current.title}</h3>
        <p className="text-[var(--color-slate)] leading-body">
          {current.description}
        </p>
        <p className="mt-6 text-sm text-[var(--color-muted)]">
          Step {active + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
}
