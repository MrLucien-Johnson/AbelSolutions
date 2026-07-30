import { describe, expect, it } from "vitest";
import { getProjects, getLiveProjectCount } from "@/content/projects";

describe("projects content", () => {
  it("has no live projects by default", () => {
    expect(getLiveProjectCount()).toBe(0);
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
