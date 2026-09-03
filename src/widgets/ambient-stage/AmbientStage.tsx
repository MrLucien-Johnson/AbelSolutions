"use client";

import { cn } from "@/lib/utils";
import { usePointerField } from "../core/usePointerField";

type AmbientStageProps = {
  children: React.ReactNode;
  className?: string;
  /** Extra aria label for the stage landmark */
  label?: string;
};

/**
 * Full-bleed atmospheric stage with pointer-reactive light.
 * Designed as the first-viewport composition shell for branded landings.
 */
export function AmbientStage({
  children,
  className,
  label = "Hero",
}: AmbientStageProps) {
  const { ref, onPointerMove, onPointerLeave } =
    usePointerField<HTMLElement>({ strength: 0.42 });

  return (
    <section
      ref={ref}
      aria-label={label}
      className={cn("aw-stage", className)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="aw-stage__grid" aria-hidden="true" />
      <div className="aw-stage__beam" aria-hidden="true" />
      <div className="relative z-[1]">{children}</div>
    </section>
  );
}
