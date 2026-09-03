"use client";

import { cn } from "@/lib/utils";
import { useInView } from "../core/useInView";
import { usePrefersReducedMotion } from "../core/usePrefersReducedMotion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
};

/** Scroll-triggered presence for section blocks. */
export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className={cn("aw-reveal", inView || reduced ? "is-visible" : "", className)}
      style={
        reduced || delayMs === 0
          ? undefined
          : { transitionDelay: `${delayMs}ms` }
      }
    >
      {children}
    </div>
  );
}
