#!/usr/bin/env node
/**
 * Capture real public UI for the Abel Solutions promo campaign.
 * Only public pages — no admin, secrets, or private data.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "captures");

const TARGETS = [
  {
    id: "abel-home",
    url: "https://mrlucien-johnson.github.io/AbelSolutions/",
    wait: "networkidle",
  },
  {
    id: "abel-projects",
    url: "https://mrlucien-johnson.github.io/AbelSolutions/projects/",
    wait: "networkidle",
  },
  {
    id: "abel-technology",
    url: "https://mrlucien-johnson.github.io/AbelSolutions/technology-services/",
    wait: "networkidle",
  },
  {
    id: "abel-construction",
    url: "https://mrlucien-johnson.github.io/AbelSolutions/construction-services/",
    wait: "networkidle",
  },
  {
    id: "abel-quote",
    url: "https://mrlucien-johnson.github.io/AbelSolutions/quote/",
    wait: "networkidle",
  },
  {
    id: "kweyol-home",
    url: "https://mrlucien-johnson.github.io/KweyolDictionary/",
    wait: "networkidle",
  },
  {
    id: "course-home",
    url: "https://mrlucien-johnson.github.io/programming-foundations-course/",
    wait: "domcontentloaded",
  },
];

async function capture() {
  fs.mkdirSync(path.join(OUT, "stills"), { recursive: true });
  fs.mkdirSync(path.join(OUT, "clips"), { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const target of TARGETS) {
    console.log("Capturing", target.id, target.url);
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      recordVideo: {
        dir: path.join(OUT, "clips"),
        size: { width: 1440, height: 900 },
      },
    });
    const page = await context.newPage();
    try {
      await page.goto(target.url, { waitUntil: target.wait, timeout: 60000 });
      await page.waitForTimeout(1200);
      await page.screenshot({
        path: path.join(OUT, "stills", `${target.id}-hero.png`),
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });
      // gentle scroll for motion clip
      await page.evaluate(async () => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const max = Math.min(document.body.scrollHeight, 2200);
        for (let y = 0; y <= max; y += 40) {
          window.scrollTo(0, y);
          await sleep(30);
        }
        window.scrollTo(0, 0);
        await sleep(400);
      });
      await page.screenshot({
        path: path.join(OUT, "stills", `${target.id}-full.png`),
        fullPage: false,
      });
    } catch (err) {
      console.error("Failed", target.id, err.message);
    }
    await context.close();
    // rename latest webm in clips
    const clips = fs
      .readdirSync(path.join(OUT, "clips"))
      .filter((f) => f.endsWith(".webm"))
      .map((f) => ({
        f,
        t: fs.statSync(path.join(OUT, "clips", f)).mtimeMs,
      }))
      .sort((a, b) => b.t - a.t);
    if (clips[0]) {
      const from = path.join(OUT, "clips", clips[0].f);
      const to = path.join(OUT, "clips", `${target.id}-scroll.webm`);
      fs.renameSync(from, to);
    }
  }

  await browser.close();
  console.log("Captures complete →", OUT);
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
