# Project images

## Rules

- Use only approved Abel Solutions photography or clearly labelled placeholders
- Do not copy competitor images
- Prefer workmanship, hardware, media walls and finished spaces over generic stock poses
- Meaningful images need descriptive `alt` text; decorative images use empty `alt`

## Placeholder assets

Development placeholders live in:

- `public/images/placeholders/project-technology.svg`
- `public/images/placeholders/project-construction.svg`

They are referenced by sample project entries with `isPlaceholder: true`.

## Replacing placeholders

1. Export optimised JPG/WebP images (aim under ~300KB where practical)
2. Save to `public/images/projects/<slug>/`
3. Update the project entry in `src/content/projects.ts`
4. Provide width-appropriate images; lazy-load below the fold
5. Remove or keep placeholder samples behind `NEXT_PUBLIC_SHOW_PLACEHOLDER_PROJECTS`

## Future projects

Use `status: "coming-soon"` for genuine work where photography is still being prepared. These appear in the **Future projects** section on `/projects`.

Example folder: `public/images/projects/mobile-access-tower/`

- Drop approved Abel Solutions site photography there (see the folder README)
- Do **not** publish PASMA Ltd copyrighted training slides
- Do **not** claim PASMA certification until `siteConfig.credentials.pasmaConfirmed` is true

## Production filtering

Placeholder projects are excluded from production builds unless `NEXT_PUBLIC_SHOW_PLACEHOLDER_PROJECTS=true`.
