import { describe, expect, it } from "vitest";
import {
  getProjects,
  getLiveProjectCount,
  getFeaturedProjects,
  getUpcomingProjects,
} from "@/content/projects";

describe("projects content", () => {
  it("features the live Kwéyòl Dictionary and includes the programming course", () => {
    expect(getLiveProjectCount()).toBeGreaterThanOrEqual(2);

    const featured = getFeaturedProjects(2);
    expect(featured[0]?.slug).toBe("kweyol-dictionary");
    expect(featured[0]?.externalUrl).toContain("KweyolDictionary");
    expect(featured.some((project) => project.slug === "programming-foundations-course")).toBe(
      true,
    );

    for (const project of featured) {
      expect(project.isPlaceholder).toBe(false);
      expect(project.status).toBe("live");
      expect(project.externalUrl).toBeTruthy();
    }
  });

  it("lists mobile access tower work under future projects", () => {
    const upcoming = getUpcomingProjects();
    expect(upcoming.some((project) => project.slug === "mobile-access-tower")).toBe(
      true,
    );
    for (const project of upcoming) {
      expect(project.status).toBe("coming-soon");
      expect(project.isPlaceholder).toBe(false);
    }
  });

  it("marks any returned placeholders clearly", () => {
    const projects = getProjects();
    for (const project of projects) {
      if (project.isPlaceholder) {
        expect(project.title.toLowerCase()).toContain("sample");
      }
    }
  });
});
