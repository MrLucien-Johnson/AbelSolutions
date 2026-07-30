import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getProjects } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticRoutes = [
    "",
    "/technology-services",
    "/construction-services",
    "/about",
    "/projects",
    "/quote",
    "/contact",
    "/privacy",
    "/cookies",
    "/terms",
  ];

  const projectRoutes = getProjects()
    .filter((project) => !project.isPlaceholder)
    .map((project) => ({
      url: `${base}/projects/${project.slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path === "" ? "/" : `${path}/`}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.includes("privacy") || path.includes("cookies") || path.includes("terms") ? 0.3 : 0.8,
    })),
    ...projectRoutes,
  ];
}
