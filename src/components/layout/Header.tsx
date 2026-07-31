"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)]/80 bg-[var(--color-surface)]/95 backdrop-blur-md">
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4 md:h-[5rem]">
        <BrandMark />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-[var(--radius-md)] px-3 py-2 text-base font-medium transition-colors",
                      active
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-slate)] hover:text-[var(--color-navy)]",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/quote" className="hidden sm:inline-flex" size="md">
            Request a Quote
          </Button>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-navy)] lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id={panelId}
        className={cn(
          "lg:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)]",
          open ? "block" : "hidden",
        )}
      >
        <div className="container-site py-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-[var(--color-muted)]">Menu</p>
            <button
              ref={closeButtonRef}
              type="button"
              className="rounded-md px-3 py-2 text-sm font-medium text-[var(--color-slate)]"
              onClick={() => {
                setOpen(false);
                menuButtonRef.current?.focus();
              }}
            >
              Close
            </button>
          </div>
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "block rounded-md px-3 py-3 text-base font-medium",
                      active
                        ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                        : "text-[var(--color-navy)] hover:bg-[var(--color-surface-soft)]",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6">
            <Button href="/quote" className="w-full" size="lg" onClick={closeMenu}>
              Request a Quote
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
