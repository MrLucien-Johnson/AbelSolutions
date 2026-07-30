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

- Display / headings: Outfit
- Body: Source Sans 3
- Responsive sizing via `clamp()`
- Heading line-height ~1.08–1.15
- Body line-height ~1.65

## Spacing

- Max content width: 1200px
- Horizontal padding: `clamp(1.25rem, 4vw, 4rem)`
- Section vertical rhythm: `clamp(4.5rem, 8vw, 8.5rem)`
- Hero vertical rhythm: `clamp(6rem, 12vw, 10.5rem)`

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

Temporary text brand mark until official artwork is supplied. Documented in the footer and README.
