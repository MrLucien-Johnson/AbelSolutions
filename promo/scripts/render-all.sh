#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/.."

echo "==> Capturing public UI"
node promo/scripts/capture-ui.mjs

echo "==> Generating music, voice and captions"
python3 promo/scripts/generate-audio.py

echo "==> Rendering campaign MP4s"
node promo/scripts/render-campaign.mjs

echo "==> Done. Outputs in promo/renders/"
find promo/renders -name '*.mp4' | sort
