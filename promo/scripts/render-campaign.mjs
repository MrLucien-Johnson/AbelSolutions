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
  const url = `http://127.0.0.1:${port}/compositions/player.html?set=${encodeURIComponent(set)}&ratio=${encodeURIComponent(ratio)}&capture=1`;
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
  // Do NOT burn ASS/SRT into the picture — composition already has on-screen copy.
  // Burning captions stacked a second text layer under the headlines ("subtitles under subtitles").
  // Soft sidecar .srt/.vtt remain in promo/subtitles/ for optional player captions.
  void srt;
  void ratio;
  const vfilt = "[0:v]null[v]";

  if (mutedMix || !vo) {
    // Music-only: quiet, hearing-safer bed for the full runtime
    run([
      "ffmpeg", "-y",
      "-i", silent,
      "-stream_loop", "-1", "-i", music,
      "-filter_complex",
      `${vfilt};` +
        `[1:a]aformat=sample_rates=48000:channel_layouts=stereo,` +
        `highpass=f=80,lowpass=f=3500,equalizer=f=90:t=q:w=1:g=-4,volume=0.42,` +
        `afade=t=in:st=0:d=0.4,afade=t=out:st=${Math.max(seconds - 1.2, 0)}:d=1.1,` +
        `atrim=0:${seconds},alimiter=limit=0.85:level=false,` +
        `loudnorm=I=-20:TP=-3:LRA=8,aformat=sample_rates=48000:channel_layouts=stereo[a]`,
      "-map", "[v]", "-map", "[a]",
      "-t", String(seconds),
      "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
      "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
      "-movflags", "+faststart",
      out,
    ]);
    return;
  }

  // Stable speech-first mix:
  // - pad VO to full duration (prevents audio dying mid-video / bass takeover)
  // - kill >8 kHz whistle band
  // - keep music very quiet and bass-light so it never drowns VO
  // - single burned caption layer only (no composition caption bar)
  const mix = [
    "ffmpeg", "-y",
    "-i", silent,
    "-i", vo,
    "-stream_loop", "-1", "-i", music,
    "-filter_complex",
    `${vfilt};` +
      `[1:a]aformat=sample_rates=48000:channel_layouts=mono,` +
      `aresample=48000,highpass=f=100,lowpass=f=7800,` +
      `equalizer=f=12000:t=q:w=2:g=-40,` +
      `equalizer=f=2000:t=q:w=1.0:g=2.0,` +
      `acompressor=threshold=-20dB:ratio=2.2:attack=15:release=160:makeup=2,` +
      `volume=1.35,apad=whole_dur=${seconds},aformat=channel_layouts=stereo[vo];` +
      `[2:a]aformat=sample_rates=48000:channel_layouts=stereo,` +
      `highpass=f=100,lowpass=f=3200,` +
      `equalizer=f=80:t=q:w=1.0:g=-6,` +
      `equalizer=f=120:t=q:w=1.0:g=-4,` +
      `equalizer=f=2400:t=q:w=1.2:g=-6,` +
      `volume=0.09,atrim=0:${seconds},asetpts=PTS-STARTPTS[mus];` +
      `[mus][vo]amix=inputs=2:duration=longest:dropout_transition=0:normalize=0,` +
      `atrim=0:${seconds},alimiter=limit=0.88:level=false,` +
      `loudnorm=I=-16:TP=-3:LRA=8,aformat=sample_rates=48000:channel_layouts=stereo[a]`,
    "-map", "[v]", "-map", "[a]",
    "-t", String(seconds),
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
    "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
    "-movflags", "+faststart",
    out,
  ];
  run(mix);
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
