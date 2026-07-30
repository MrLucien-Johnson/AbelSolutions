import type { NextConfig } from "next";

/**
 * GitHub Pages serves this project at:
 * https://mrlucien-johnson.github.io/AbelSolutions/
 */
const repoName = "AbelSolutions";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(isGithubPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
};

export default nextConfig;
