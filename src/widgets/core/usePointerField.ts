"use client";

import { useCallback, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type PointerFieldOptions = {
  /** Soften pointer response (0–1). Default 0.35 */
  strength?: number;
};

/**
 * Maps pointer position inside an element to CSS custom properties
 * `--wx` / `--wy` (0–1) for atmosphere and magnetic widgets.
 */
export function usePointerField<T extends HTMLElement>(
  options: PointerFieldOptions = {},
) {
  const { strength = 0.35 } = options;
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();

  const onPointerMove = useCallback(
    (event: React.PointerEvent<T>) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      el.style.setProperty("--wx", String(0.5 + (x - 0.5) * strength * 2));
      el.style.setProperty("--wy", String(0.5 + (y - 0.5) * strength * 2));
      el.style.setProperty("--wx-raw", String(x));
      el.style.setProperty("--wy-raw", String(y));
    },
    [reduced, strength],
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--wx", "0.5");
    el.style.setProperty("--wy", "0.5");
    el.style.setProperty("--wx-raw", "0.5");
    el.style.setProperty("--wy-raw", "0.5");
  }, []);

  return { ref, onPointerMove, onPointerLeave, reduced };
}
