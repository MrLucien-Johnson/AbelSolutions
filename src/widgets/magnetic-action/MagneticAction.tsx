"use client";

import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "../core/usePrefersReducedMotion";

type MagneticActionProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

/**
 * Wraps a CTA so it gently tracks the pointer (magnetic affordance).
 * Pass a link/button as children — this only handles motion.
 */
export function MagneticAction({
  children,
  className,
  strength = 10,
}: MagneticActionProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = usePrefersReducedMotion();

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      const clamp = (v: number) =>
        Math.max(-strength, Math.min(strength, v * 0.22));
      el.style.setProperty("--mx", `${clamp(x)}px`);
      el.style.setProperty("--my", `${clamp(y)}px`);
    },
    [reduced, strength],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  }, []);

  return (
    <span
      ref={ref}
      className={cn("aw-magnetic", className)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </span>
  );
}
