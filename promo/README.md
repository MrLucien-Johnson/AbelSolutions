# Abel Solutions promotional campaign

Reusable engine for producing playable promotional MP4s for **Abel Solutions Limited**.

## Quick start

```bash
# From repository root
node promo/scripts/capture-ui.mjs
python3 promo/scripts/generate-audio.py
node promo/scripts/render-campaign.mjs
```

Or:

```bash
bash promo/scripts/render-all.sh
```

Outputs: `promo/renders/{16x9,9x16,1x1}/*.mp4`  
Also copied to: `public/marketing/videos/` for easy download from GitHub.

**Download the finished MP4s:** see [`DOWNLOADS.md`](./DOWNLOADS.md) and [`public/marketing/videos/README.md`](../public/marketing/videos/README.md).

## What this campaign promotes

Abel Solutions is a UK dual-trade company:

- Technology services (repairs, custom PCs, networks, small-business IT)
- Construction services (media walls, mounting, fitting, labour support)

Public digital proof points used in the films:

- https://mrlucien-johnson.github.io/KweyolDictionary/
- https://mrlucien-johnson.github.io/programming-foundations-course/

## Restrictions enforced

- No invented contact details, reviews, certifications, insurance or PASMA claims
- No residential addresses
- No PASMA training-slide media
- Kwéyòl Dictionary described as a public learning aid (provisional content), not a certified curriculum

## Structure

See `PROMOTIONAL_CAMPAIGN.md` and `PROMO_RENDERING_GUIDE.md`.
