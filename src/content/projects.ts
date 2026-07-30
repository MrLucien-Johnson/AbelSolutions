/**
 * Project gallery content.
 *
 * Do not invent customer projects, reviews or results.
 * Entries marked `isPlaceholder: true` are development samples only
 * and are excluded from production builds by default.
 */

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  category: "technology" | "construction";
  summary: string;
  /** Broad area only — never a precise residential address */
  location: string;
  services: string[];
  challenge: string;
  solution: string;
  outcome: string;
  testimonial?: string;
  images: ProjectImage[];
  isPlaceholder: boolean;
};

/**
 * Development placeholders for layout testing.
 * These are filtered out unless NEXT_PUBLIC_SHOW_PLACEHOLDER_PROJECTS=true.
 */
const placeholderProjects: Project[] = [
  {
    slug: "placeholder-media-wall",
    title: "Media wall installation — sample layout",
    category: "construction",
    summary:
      "Development placeholder showing how a media-wall project entry will appear once genuine work is added.",
    location: "London area",
    services: ["Media wall installation", "TV mounting", "Cable management planning"],
    challenge:
      "[Placeholder] Describe the room constraints, wall condition and customer requirements here.",
    solution:
      "[Placeholder] Outline the agreed approach, materials and installation sequence here.",
    outcome:
      "[Placeholder] Summarise the finished result without inventing client feedback or measurements.",
    images: [
      {
        src: "/images/placeholders/project-construction.svg",
        alt: "Placeholder illustration for a media wall project",
      },
    ],
    isPlaceholder: true,
  },
  {
    slug: "placeholder-custom-pc",
    title: "Custom PC build — sample layout",
    category: "technology",
    summary:
      "Development placeholder demonstrating a technology project card and detail layout.",
    location: "London area",
    services: ["Custom PC build", "Component selection", "Assembly and testing"],
    challenge:
      "[Placeholder] Note the intended use, budget and performance goals here.",
    solution:
      "[Placeholder] Describe component choices, assembly and testing steps here.",
    outcome:
      "[Placeholder] Record the delivered specification and handover notes here.",
    images: [
      {
        src: "/images/placeholders/project-technology.svg",
        alt: "Placeholder illustration for a custom PC project",
      },
    ],
    isPlaceholder: true,
  },
];

/** Genuine projects — add entries here as approved photography and copy become available */
const liveProjects: Project[] = [];

export function getProjects(): Project[] {
  const showPlaceholders =
    process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_PROJECTS === "true";

  if (showPlaceholders || process.env.NODE_ENV !== "production") {
    return [...liveProjects, ...placeholderProjects];
  }

  return liveProjects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return [...liveProjects, ...placeholderProjects].find(
    (project) => project.slug === slug,
  );
}

export function getLiveProjectCount(): number {
  return liveProjects.length;
}
