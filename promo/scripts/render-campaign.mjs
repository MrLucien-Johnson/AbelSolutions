#!/usr/bin/env node
/**
 * Render Abel Solutions promo compositions via Playwright video capture,
 * then mix original music + VO + burned captions with FFmpeg.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import http from "http";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const RENDERS = path.join(ROOT, "renders");
const TMP = path.join("/tmp", "abel-promo-render");

const CATALOGUE = [
  { id: "promo-hero-55s", set: "hero", seconds: 55, vo: "hero", ratios: ["16x9", "9x16"] },
  { id: "promo-short-29s", set: "short", seconds: 29, vo: "short", ratios: ["16x9", "9x16"] },
  { id: "promo-social-15s", set: "social15", seconds: 15, vo: "social15", ratios: ["9x16", "1x1"] },
  { id: "promo-micro-8s", set: "micro", seconds: 8.5, vo: "micro", ratios: ["9x16"] },
  { id: "promo-explainer-72s", set: "explainer", seconds: 72, vo: "explainer", ratios: ["16x9"] },
  { id: "promo-features-46s", set: "features", seconds: 46, vo: "features", ratios: ["16x9", "9x16"] },
  { id: "promo-brand-film-30s", set: "brand", seconds: 30, vo: "brand", ratios: ["16x9", "9x16"] },
  { id: "promo-autoplay-muted-20s", set: "autoplay", seconds: 20, vo: null, ratios: ["16x9"], mutedMix: true },
];

const SIZE = {
  "16x9": { width: 1920, height: 1080 },
  "9x16": { width: 1080, height: 1920 },
  "1x1": { width: 1080, height: 1080 },
};

function run(cmd) {
  const res = spawnSync(cmd[0], cmd.slice(1), { stdio: "inherit" });
  if (res.status !== 0) throw new Error(`Command failed: ${cmd.join(" ")}`);
}

function probe(file) {
  const res = spawnSync(
    "ffprobe",
    ["-v", "error", "-show_entries", "format=duration,size", "-show_entries", "stream=codec_type,codec_name,width,height", "-of", "json", file],
    { encoding: "utf8" },
  );
  return JSON.parse(res.stdout || "{}");
}

function startStaticServer(rootDir) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    let filePath = path.join(rootDir, urlPath === "/" ? "/compositions/player.html" : urlPath);
    if (!filePath.startsWith(rootDir)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      const ext = path.extname(filePath);
      const types = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".svg": "image/svg+xml",
        ".webm": "video/webm",
      };
      res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
      res.end(data);
    });
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

async function recordComposition(port, set, ratio, seconds) {
  const size = SIZE[ratio];
  fs.mkdirSync(TMP, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: size,
    deviceScaleFactor: 1,
    recordVideo: { dir: TMP, size },
  });
  const page = await context.newPage();
  const url = `http://127.0.0.1:${port}/compositions/player.html?set=${set}&ratio=${ratio}`;
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForFunction(() => window.__PROMO__ && window.__PROMO__.scenes);
  // Play timeline (slightly pad end)
  await page.evaluate(async () => {
    await window.__PROMO__.play();
  });
  await page.waitForTimeout(400);
  await context.close();
  await browser.close();

  const webms = fs
    .readdirSync(TMP)
    .filter((f) => f.endsWith(".webm"))
    .map((f) => ({ f, t: fs.statSync(path.join(TMP, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t);
  if (!webms.length) throw new Error("No webm captured");
  const src = path.join(TMP, webms[0].f);
  const outSilent = path.join(TMP, `${set}-${ratio}-silent.mp4`);
  run([
    "ffmpeg", "-y", "-i", src,
    "-vf", `scale=${size.width}:${size.height}:force_original_aspect_ratio=decrease,pad=${size.width}:${size.height}:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p`,
    "-t", String(seconds),
    "-an",
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
    outSilent,
  ]);
  return outSilent;
}

function burnAndMix({ silent, vo, music, srt, out, seconds, mutedMix, ratio }) {
  const ass = path.join(TMP, `${path.basename(out)}.ass`);
  const size = SIZE[ratio] || SIZE["16x9"];
  const fontSize = ratio === "16x9" ? 48 : 44;
  if (fs.existsSync(srt)) {
    const srtText = fs.readFileSync(srt, "utf8");
    const cues = [];
    const blocks = srtText.trim().split(/\n\s*\n/);
    for (const block of blocks) {
      const lines = block.split("\n");
      if (lines.length < 3) continue;
      const m = lines[1].match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
      if (!m) continue;
      const toSec = (h, mi, s, ms) => +h * 3600 + +mi * 60 + +s + +ms / 1000;
      const start = toSec(m[1], m[2], m[3], m[4]);
      const end = toSec(m[5], m[6], m[7], m[8]);
      const text = lines.slice(2).join("\\N");
      cues.push({ start, end, text });
    }
    const ts = (v) => {
      const h = Math.floor(v / 3600);
      const mi = Math.floor((v % 3600) / 60);
      const s = v % 60;
      return `${h}:${String(mi).padStart(2, "0")}:${s.toFixed(2).padStart(5, "0")}`;
    };
    const assBody = cues
      .map((c) => `Dialogue: 0,${ts(c.start)},${ts(c.end)},Default,,0,0,0,,${c.text}`)
      .join("\n");
    fs.writeFileSync(
      ass,
      `[Script Info]
ScriptType: v4.00+
PlayResX: ${size.width}
PlayResY: ${size.height}

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial,${fontSize},&H00FFFFFF,&H000000FF,&H00101010,&H90000000,-1,0,0,0,100,100,0,0,1,3,0,2,80,80,70,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
${assBody}
`,
      "utf8",
    );
  }

  if (mutedMix || !vo) {
    run([
      "ffmpeg", "-y",
      "-i", silent,
      "-stream_loop", "-1", "-i", music,
      "-filter_complex",
      `[0:v]ass=${ass}[v];[1:a]volume=0.72,afade=t=in:st=0:d=0.4,afade=t=out:st=${Math.max(seconds - 1.2, 0)}:d=1.1,atrim=0:${seconds},loudnorm=I=-16:TP=-1.5:LRA=11,aformat=sample_rates=48000:channel_layouts=stereo[a]`,
      "-map", "[v]", "-map", "[a]",
      "-t", String(seconds),
      "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
      "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
      "-movflags", "+faststart",
      out,
    ]);
    return;
  }

  // Mux warm VO + study bed; duck music under speech, keep bed audible between phrases
  const ducked = [
    "ffmpeg", "-y",
    "-i", silent,
    "-i", vo,
    "-stream_loop", "-1", "-i", music,
    "-filter_complex",
    `[0:v]ass=${ass}[v];` +
      `[1:a]aformat=sample_rates=48000:channel_layouts=stereo,loudnorm=I=-14:TP=-1.5:LRA=9,afade=t=in:st=0:d=0.08,volume=1.12,asplit=2[vo][vo2];` +
      `[2:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.5[mus];` +
      `[mus][vo]sidechaincompress=threshold=0.04:ratio=7:attack=25:release=420:makeup=1.05[ducked];` +
      `[ducked][vo2]amix=inputs=2:duration=first:dropout_transition=0,atrim=0:${seconds},loudnorm=I=-15:TP=-1.5:LRA=11,aformat=sample_rates=48000:channel_layouts=stereo[a]`,
    "-map", "[v]", "-map", "[a]",
    "-t", String(seconds),
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
    "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
    "-movflags", "+faststart",
    out,
  ];
  const simple = [
    "ffmpeg", "-y",
    "-i", silent,
    "-i", vo,
    "-stream_loop", "-1", "-i", music,
    "-filter_complex",
    `[0:v]ass=${ass}[v];` +
      `[1:a]aformat=sample_rates=48000:channel_layouts=stereo,loudnorm=I=-14:TP=-1.5:LRA=9,volume=1.15[vo];` +
      `[2:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.3[mus];` +
      `[mus][vo]amix=inputs=2:duration=first:dropout_transition=2,atrim=0:${seconds},loudnorm=I=-15:TP=-1.5:LRA=11,aformat=sample_rates=48000:channel_layouts=stereo[a]`,
    "-map", "[v]", "-map", "[a]",
    "-t", String(seconds),
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
    "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
    "-movflags", "+faststart",
    out,
  ];
  const res = spawnSync(ducked[0], ducked.slice(1), { stdio: "inherit" });
  if (res.status !== 0) run(simple);
}

function makeThumbnail(video, outJpg) {
  run(["ffmpeg", "-y", "-ss", "2.5", "-i", video, "-frames:v", "1", "-update", "1", outJpg]);
}

async function main() {
  const remuxOnly = process.argv.includes("--remux-only");
  fs.mkdirSync(path.join(RENDERS, "16x9"), { recursive: true });
  fs.mkdirSync(path.join(RENDERS, "9x16"), { recursive: true });
  fs.mkdirSync(path.join(RENDERS, "1x1"), { recursive: true });
  fs.mkdirSync(path.join(ROOT, "thumbnails"), { recursive: true });
  fs.mkdirSync(TMP, { recursive: true });

  let server = null;
  let port = 0;
  if (!remuxOnly) {
    ({ server, port } = await startStaticServer(ROOT));
  }
  const manifestVideos = [];
  const validation = [];

  try {
    for (const item of CATALOGUE) {
      for (const ratio of item.ratios) {
        console.log(`\n=== ${remuxOnly ? "Remuxing" : "Rendering"} ${item.id} @ ${ratio} ===`);
        const cachedSilent = path.join(TMP, `${item.set}-${ratio}-silent.mp4`);
        let silent;
        if (remuxOnly) {
          if (!fs.existsSync(cachedSilent)) {
            throw new Error(`Missing cached silent video for remux: ${cachedSilent}`);
          }
          silent = cachedSilent;
        } else {
          silent = await recordComposition(port, item.set, ratio, item.seconds);
        }
        const outDir = path.join(RENDERS, ratio);
        const out = path.join(outDir, `${item.id}-${ratio}.mp4`);
        const vo = item.vo ? path.join(ROOT, "audio", "voice", `${item.vo}.mp3`) : null;
        const music = path.join(ROOT, "audio", "music", `${item.vo || "autoplay"}.m4a`);
        const srt = path.join(ROOT, "subtitles", `${item.vo || "autoplay"}.srt`);
        burnAndMix({
          silent,
          vo,
          music,
          srt,
          out,
          seconds: item.seconds,
          mutedMix: !!item.mutedMix || !item.vo,
          ratio,
        });
        const meta = probe(out);
        const streams = meta.streams || [];
        const videoStream = streams.find((s) => s.codec_type === "video");
        const audioStream = streams.find((s) => s.codec_type === "audio");
        const ok =
          fs.existsSync(out) &&
          Number(meta.format?.size || 0) > 10000 &&
          !!videoStream &&
          !!audioStream;
        validation.push({
          file: out,
          ok,
          duration: Number(meta.format?.duration || 0),
          size: Number(meta.format?.size || 0),
          width: videoStream?.width,
          height: videoStream?.height,
          videoCodec: videoStream?.codec_name,
          audioCodec: audioStream?.codec_name,
        });
        makeThumbnail(out, path.join(ROOT, "thumbnails", `${item.id}-${ratio}.jpg`));
        manifestVideos.push({
          id: `${item.id}-${ratio}`,
          title: item.id,
          set: item.set,
          duration: item.seconds,
          aspectRatio: ratio,
          resolution: SIZE[ratio],
          voiceOver: !!item.vo && !item.mutedMix,
          music: true,
          captions: true,
          output: path.relative(ROOT, out),
          renderStatus: ok ? "rendered" : "failed",
        });
        console.log(ok ? "OK" : "FAIL", out);
      }
    }
  } finally {
    if (server) server.close();
  }

  const report = {
    generatedAt: new Date().toISOString(),
    videos: manifestVideos,
    validation,
  };
  fs.writeFileSync(path.join(ROOT, "manifests", "campaign.manifest.json"), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(ROOT, "qa", "validation-report.json"), JSON.stringify(validation, null, 2));

  const failures = validation.filter((v) => !v.ok);
  if (failures.length) {
    console.error("Validation failures", failures);
    process.exit(1);
  }
  console.log(`\nRendered ${validation.length} videos successfully.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
