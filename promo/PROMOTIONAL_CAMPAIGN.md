# PROMOTIONAL CAMPAIGN — Abel Solutions

## Campaign

| Field | Value |
| --- | --- |
| Name | Abel Solutions — Dependable Dual-Trade Launch |
| Positioning | Premium practical technology + construction support for homes and businesses in London & nearby |
| Core message | Technology and construction solutions you can depend on — clear scope, careful work, honest quotations |
| Audiences | Homeowners/tenants, landlords, local SMEs, prospects evaluating digital delivery |

## Creative direction

Navy authority (`#0B1C2C`), accent blue (`#1F6FAD`), warm construction (`#8A6A45`), Outfit display + Source Sans body. Motion is kinetic typography + real public UI captures in device frames — not stock “startup purple” aesthetics.

Hooks prepared in compositions:

- A problem-led (“Stop juggling providers”)
- B benefit-led (“Clear communication / careful work / honest quotations”)
- C curiosity-led (“Public projects you can open today”)
- D visually led (brand film with sparse narration)

CTA used (real): **Request a Quote** / **Explore Our Services**

## Video catalogue (rendered)

| Video | Duration | Formats | VO | Music | Captions | Path |
| --- | --- | --- | --- | --- | --- | --- |
| Hero / main promo | 55s | 16:9, 9:16 | Yes | Yes | Yes | `promo/renders/*/promo-hero-55s-*.mp4` |
| Short product promo | 29s | 16:9, 9:16 | Yes | Yes | Yes | `promo/renders/*/promo-short-29s-*.mp4` |
| Social ad | 15s | 9:16, 1:1 | Yes | Yes | Yes | `promo/renders/*/promo-social-15s-*.mp4` |
| Micro promo | 8.5s | 9:16 | Yes | Yes | Yes | `promo/renders/9x16/promo-micro-8s-9x16.mp4` |
| Explainer | 72s | 16:9 | Yes | Yes | Yes | `promo/renders/16x9/promo-explainer-72s-16x9.mp4` |
| Feature showcase | 46s | 16:9, 9:16 | Yes | Yes | Yes | `promo/renders/*/promo-features-46s-*.mp4` |
| Cinematic brand film | 30s | 16:9, 9:16 | Yes | Yes | Yes | `promo/renders/*/promo-brand-film-30s-*.mp4` |
| Silent/autoplay | 20s | 16:9 | No (music+captions) | Yes | Yes | `promo/renders/16x9/promo-autoplay-muted-20s-16x9.mp4` |

Machine-readable status: `promo/manifests/campaign.manifest.json`  
Validation: `promo/qa/validation-report.json`

## Audio approach

- **Voice:** Microsoft Edge neural TTS `en-GB-SoniaNeural` (free/local CLI via `edge-tts`)
- **Music:** Original multi-layer instrumental beds generated with FFmpeg (licence-safe, no copyrighted commercial tracks)
- **Captions:** `.srt` + `.vtt` in `promo/subtitles/`, burned into MP4s
- **Mix:** loudnorm + music ducking under VO

## Technical implementation

- UI capture: Playwright Chromium (`promo/scripts/capture-ui.mjs`)
- Motion compositions: HTML/CSS kinetic scenes (`promo/compositions/player.html`)
- Recording: Playwright `recordVideo` at target resolution
- Compositing: FFmpeg (H.264 + AAC, faststart)
- Orchestration: `promo/scripts/render-campaign.mjs`

## Limitations

- Music is original ambient synthesis, not a full studio score
- Voice is high-quality neural TTS, not a hired human VO artist
- Some GitHub Pages captures reflect the currently deployed site (may lag unmerged feature branches)
- Device-frame UI quality depends on capture sharpness of public pages

## Future ideas

- Human VO replaceable by dropping files into `promo/audio/voice/`
- Add scroll-clip overlays from `promo/captures/clips/*.webm`
- A/B hook variants as separate `set` entries in `player.html`
