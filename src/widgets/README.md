# Abel Widgets

Reusable interactive widgets for Abel Solutions marketing sites.

## Goals

- Feel state-of-the-art without depending on a heavy UI kit
- Stay accessible (keyboard, ARIA, reduced motion)
- Consume host **CSS variables** so brands can re-theme
- Stay extractable into `@abel/widgets` when a second app needs them

## Widgets

| Widget | Role |
| --- | --- |
| `AmbientStage` | Full-bleed pointer-reactive hero atmosphere |
| `MagneticAction` | Soft magnetic pull around CTAs |
| `Reveal` | Scroll-triggered section presence |
| `DualOrbit` | Interactive dual-division explorer |
| `ProcessRail` | Keyboard process scrubber |
| `SpotlightGallery` | Tabbed project spotlight stage |
| `IntentLaunch` | Dark CTA band with intent chips → quote deep links |

## Usage in this app

```tsx
import {
  AmbientStage,
  DualOrbit,
  MagneticAction,
  ProcessRail,
  Reveal,
  SpotlightGallery,
  IntentLaunch,
} from "@/widgets";
```

Styles are imported once from `src/app/layout.tsx`:

```ts
import "@/widgets/styles/widgets.css";
```

## Extracting to another project

1. Copy `src/widgets/` into the consumer (or publish as a workspace package).
2. Provide the same CSS tokens used here (`--color-navy`, `--color-accent`, `--radius-*`, `--shadow-soft`, …) or remap them.
3. Replace Next-specific pieces if needed:
   - `next/link` / `next/image` / `next/navigation` in `DualOrbit`, `SpotlightGallery`, `IntentLaunch`
   - Swap for your router/image primitives behind thin adapters
4. Keep `Button` as a peer dependency or inject a `renderAction` slot in a future iteration.

## Design rules baked in

- No hero cards / floating promo chips
- Motion respects `prefers-reduced-motion`
- Widgets own interaction; page owns content copy
- British English in Abel Solutions copy — widgets stay locale-neutral
