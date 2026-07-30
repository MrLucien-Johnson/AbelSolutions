/**
 * Project gallery content.
 *
 * Do not invent customer projects, reviews or results.
 * Entries marked `isPlaceholder: true` are development samples only
 * and are excluded from production builds by default.
 *
 * Use `status: "coming-soon"` for genuine work where photography is
 * prepared but not yet ready to feature as a finished case study.
 */

export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectStatus = "live" | "coming-soon";

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
  status: ProjectStatus;
  /** Optional public link to a live demo, course or case study page */
  externalUrl?: string;
  ctaLabel?: string;
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
    status: "live",
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
    status: "live",
  },
];

/**
 * Genuine published work.
 * Only include real projects, courses or case studies that Abel Solutions can stand behind.
 */
const liveProjects: Project[] = [
  {
    slug: "programming-foundations-course",
    title: "Programming Foundations course",
    category: "technology",
    summary:
      "A beginner-friendly programming course site covering Python, C# and AI prompt creation, built to take learners from first steps through to portfolio-ready projects.",
    location: "Online",
    services: [
      "Website and course structure",
      "Python learning pathway",
      "C# learning pathway",
      "AI prompt creation track",
    ],
    challenge:
      "Create a clear, approachable learning hub for people with little or no programming experience, without overwhelming them on the first visit.",
    solution:
      "Organised the course into practical modules for Python and C#, plus an AI prompt creation track, with guided starting points and project-based outcomes learners can show to employers.",
    outcome:
      "A live public course website that presents the learning pathways cleanly and gives future clients a concrete example of Abel Solutions technology and web work.",
    images: [
      {
        src: "/images/projects/programming-foundations.svg",
        alt: "Cover graphic for the Programming Foundations course covering Python, C# and AI prompts",
      },
    ],
    isPlaceholder: false,
    status: "live",
    externalUrl:
      "https://mrlucien-johnson.github.io/programming-foundations-course/",
    ctaLabel: "View the course website",
  },
];

/**
 * Genuine upcoming examples — photography or final copy still being prepared.
 * Shown under “Future projects”. Do not invent certifications or client results.
 */
const upcomingProjects: Project[] = [
  {
    slug: "mobile-access-tower",
    title: "Mobile access tower site work",
    category: "construction",
    summary:
      "Site photography from mobile access tower work is being prepared for the gallery — showing careful setup, PPE and practical construction access support.",
    location: "London area",
    services: [
      "Mobile access tower support",
      "Site labour",
      "Safe working at height practices",
    ],
    challenge:
      "Present construction access capability clearly for future clients without publishing unfinished case studies or unconfirmed certification claims.",
    solution:
      "Prepare approved on-site photography of tower work and PPE standards, then publish a finished case study once images and wording are signed off.",
    outcome:
      "A construction example clients can review alongside technology work, with honest scope and safety notes.",
    images: [
      {
        src: "/images/projects/mobile-access-tower/cover.svg",
        alt: "Cover graphic for upcoming mobile access tower site photography",
      },
    ],
    isPlaceholder: false,
    status: "coming-soon",
  },
];

function publishedProjects(): Project[] {
  return [...liveProjects, ...upcomingProjects];
}

export function getProjects(): Project[] {
  const showPlaceholders =
    process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_PROJECTS === "true";

  if (showPlaceholders || process.env.NODE_ENV !== "production") {
    return [...publishedProjects(), ...placeholderProjects];
  }

  return publishedProjects();
}

export function getProjectBySlug(slug: string): Project | undefined {
  return [...publishedProjects(), ...placeholderProjects].find(
    (project) => project.slug === slug,
  );
}

export function getLiveProjectCount(): number {
  return liveProjects.length;
}

export function getFeaturedProjects(limit = 3): Project[] {
  return getProjects()
    .filter((project) => !project.isPlaceholder && project.status === "live")
    .slice(0, limit);
}

export function getUpcomingProjects(): Project[] {
  return getProjects().filter(
    (project) => !project.isPlaceholder && project.status === "coming-soon",
  );
}
