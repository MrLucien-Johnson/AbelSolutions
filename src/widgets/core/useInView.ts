"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

/** IntersectionObserver helper for Reveal and lazy widget activation. */
export function useInView<T extends HTMLElement>(options: UseInViewOptions = {}) {
  const { once = true, rootMargin = "0px 0px -8% 0px", threshold = 0.12 } =
    options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
