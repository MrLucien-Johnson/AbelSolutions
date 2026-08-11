# Promo rendering guide

Regenerate the campaign after site or script changes.

## Prerequisites

- Node.js 20+
- Python 3.10+
- `ffmpeg` / `ffprobe`
- `npm i` (Playwright available in this repo)
- `pip install edge-tts`
- `npx playwright install chromium` (first run)

## Commands

```bash
# 1) Capture public UI (Abel Solutions + public project sites)
node promo/scripts/capture-ui.mjs

# 2) Generate instrumental beds, British VO, SRT/VTT
python3 promo/scripts/generate-audio.py

# 3) Render all MP4 compositions + validate
node promo/scripts/render-campaign.mjs
```

One-shot:

```bash
bash promo/scripts/render-all.sh
```

## Edit scripts / scenes

- Narration + caption cues: `promo/scripts/generate-audio.py` (`SCRIPTS`)
- Scene timelines / on-screen copy: `promo/compositions/player.html` (`SETS`)
- Output catalogue / ratios: `promo/scripts/render-campaign.mjs` (`CATALOGUE`)

## Replace voice with human VO

1. Export WAV/MP3 named like `promo/audio/voice/hero.mp3`
2. Keep timing close to existing cue sheet in `promo/subtitles/hero.srt`
3. Re-run `node promo/scripts/render-campaign.mjs`

## Outputs

- MP4: `promo/renders/{16x9,9x16,1x1}/`
- Thumbnails: `promo/thumbnails/`
- Manifest: `promo/manifests/campaign.manifest.json`
- Validation: `promo/qa/validation-report.json`
