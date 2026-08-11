# Design system

## Direction

Premium, practical and approachable. Navy authority with clean off-white surfaces and a confident blue accent. Construction areas use a warm secondary accent, not aggressive industrial styling.

## Colour tokens

Defined in `src/app/globals.css`:

| Token | Role |
| --- | --- |
| `--color-navy` | Authority, headers, footer |
| `--color-accent` | Primary actions / technology |
| `--color-construction` | Construction accent |
| `--color-surface` / `--color-surface-soft` | Page backgrounds |
| `--color-slate` / `--color-muted` | Body / supporting text |
| `--color-border` | Dividers and card edges |

## Typography

| Role | Family | Size |
| --- | --- | --- |
| Display / headings | Outfit (`font-display`) | Element rules below |
| Body | Source Sans 3 (`font-sans`) | `clamp(1rem … 1.125rem)` |
| Eyebrow / section label | Source Sans or Outfit for brand moments | `.type-eyebrow` — 0.875rem, tracking `0.08em` |
| In-card label | Source Sans | `.type-label` — 0.75rem, tracking `0.08em` |

### Heading scale (do not override with `text-lg` / `text-xl` on `h1`–`h3`)

| Element | Size | Line-height |
| --- | --- | --- |
| `h1` | `clamp(2.25rem … 3.75rem)` | 1.08 |
| `h2` | `clamp(1.75rem … 2.5rem)` | 1.12 |
| `h3` | `clamp(1.25rem … 1.5rem)` | 1.15 |
| `h4` | `clamp(1.1rem … 1.25rem)` | 1.2 |

Body line-height: `1.65` (`.leading-body`).

**Rules**

- Prefer semantic heading levels; never shrink `h2` with `text-sm` / `text-xl` for labels — use `.type-eyebrow` or `<p>`.
- Buttons and nav use at least `1rem` so they do not sit smaller than body text on large screens.
- Text links use `.text-link` for consistent weight and underline offset.

## Spacing

- Max content width: 1200px
- Horizontal padding: `clamp(1.25rem, 4vw, 4rem)`
- Section vertical rhythm: `clamp(4.5rem, 8vw, 8.5rem)` (`.section-space`)
- Compact section rhythm: `clamp(3.25rem, 5vw, 5.5rem)` (`Section compact` / `.section-space-compact`)
- Hero vertical rhythm: `clamp(6rem, 12vw, 10.5rem)`

## Radius and shadow

| Token | Value |
| --- | --- |
| `--radius-sm` | 6px |
| `--radius-md` | 10px |
| `--radius-lg` | 16px |
| `--shadow-soft` | Soft navy elevation for division cards and key panels |

Prefer brand radius tokens (`--radius-sm`, `--radius-md`, `--radius-lg`) over one-off pixel radii.

## Components

Reusable pieces live under `src/components/`:

- Layout: Header, Footer, SkipLink
- UI: Button, Section, Container, cards, BrandMark, PageHero
- Forms: QuoteForm, ContactForm
- Projects: ProjectCard
- SEO: JSON-LD helpers

## Motion

Light fade-up on the homepage hero only, disabled under `prefers-reduced-motion`.

## Logo

Primary brand mark is the refined **ABEL SOLUTIONS** text wordmark with a compact AS monogram. When an official logo file is supplied, set `siteConfig.brand.logoImage` (for example `/images/logo.svg`) so it can appear beside the wordmark and be reused for favicon or other placements without replacing the text.
