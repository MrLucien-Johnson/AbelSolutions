"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MagneticAction } from "../magnetic-action/MagneticAction";
import { Button } from "@/components/ui/Button";

export type IntentChip = {
  id: string;
  label: string;
  /** Query value appended as ?service= */
  serviceParam: string;
};

type IntentLaunchProps = {
  title: string;
  description: string;
  chips: IntentChip[];
  className?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

/**
 * Dark CTA band with interactive intent chips that deep-link into /quote.
 */
export function IntentLaunch({
  title,
  description,
  chips,
  className,
  ctaLabel = "Request a Quote",
  secondaryHref = "/contact",
  secondaryLabel = "Contact Us",
}: IntentLaunchProps) {
  const router = useRouter();
  const [active, setActive] = useState(chips[0]?.id ?? "");
  const selected = chips.find((chip) => chip.id === active) ?? chips[0];

  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] bg-[var(--color-navy)] px-7 py-10 md:px-12 md:py-14 text-white",
        className,
      )}
    >
      <div className="grid gap-8 lg:grid-cols-[1.35fr_auto] lg:items-end">
        <div>
          <h2 className="mb-4 text-white">{title}</h2>
          <p className="mb-6 max-w-2xl text-lg leading-body text-white/80">
            {description}
          </p>
          <div
            className="aw-intent"
            role="group"
            aria-label="What do you need help with?"
          >
            {chips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                className="aw-intent__chip"
                data-active={chip.id === active ? "true" : "false"}
                aria-pressed={chip.id === active}
                onClick={() => setActive(chip.id)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <MagneticAction>
            <Button
              type="button"
              variant="on-dark"
              size="lg"
              onClick={() => {
                if (!selected) {
                  router.push("/quote/");
                  return;
                }
                router.push(
                  `/quote/?service=${encodeURIComponent(selected.serviceParam)}`,
                );
              }}
            >
              {ctaLabel}
            </Button>
          </MagneticAction>
          <MagneticAction>
            <Button href={secondaryHref} variant="on-dark-secondary" size="lg">
              {secondaryLabel}
            </Button>
          </MagneticAction>
        </div>
      </div>
    </div>
  );
}
