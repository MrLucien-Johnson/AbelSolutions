import { describe, expect, it } from "vitest";
import {
  getProjects,
  getLiveProjectCount,
  getFeaturedProjects,
} from "@/content/projects";

describe("projects content", () => {
  it("includes the live Programming Foundations course", () => {
    expect(getLiveProjectCount()).toBeGreaterThanOrEqual(1);

    const featured = getFeaturedProjects(1)[0];
    expect(featured?.slug).toBe("programming-foundations-course");
    expect(featured?.isPlaceholder).toBe(false);
    expect(featured?.externalUrl).toContain("programming-foundations-course");
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
