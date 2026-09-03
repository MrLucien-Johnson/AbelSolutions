/**
 * Abel Widgets — reusable interactive UI for Abel Solutions sites.
 *
 * Import styles once in the app shell:
 *   import "@/widgets/styles/widgets.css";
 *
 * Widgets are client components that consume CSS variables from the host
 * design system. They intentionally avoid hard-coded brand hex values so
 * they can move into a shared package later.
 */

export { AmbientStage } from "./ambient-stage/AmbientStage";
export { MagneticAction } from "./magnetic-action/MagneticAction";
export { Reveal } from "./reveal/Reveal";
export { DualOrbit } from "./dual-orbit/DualOrbit";
export type { DualOrbitItem } from "./dual-orbit/DualOrbit";
export { ProcessRail } from "./process-rail/ProcessRail";
export type { ProcessRailStep } from "./process-rail/ProcessRail";
export { SpotlightGallery } from "./spotlight-gallery/SpotlightGallery";
export type { SpotlightItem } from "./spotlight-gallery/SpotlightGallery";
export { IntentLaunch } from "./intent-launch/IntentLaunch";
export type { IntentChip } from "./intent-launch/IntentLaunch";
export { usePrefersReducedMotion } from "./core/usePrefersReducedMotion";
export { usePointerField } from "./core/usePointerField";
export { useInView } from "./core/useInView";
