# Content guide

## Voice

Clear, professional, British English. Reassure without exaggeration. Avoid filler and unsupported superlatives.

Avoid words such as: innovative, cutting-edge, seamless, world-class, unmatched, revolutionary.

## Where to edit

| Content | File |
| --- | --- |
| Business details | `src/config/site.ts` |
| Service categories | `src/content/services.ts` |
| Projects | `src/content/projects.ts` |
| Page-specific copy | Corresponding files under `src/app/` |

## Adding a genuine project

1. Add approved images under `public/images/projects/`
2. Add an entry to `liveProjects` in `src/content/projects.ts`
3. Set `isPlaceholder: false`
4. Use broad location wording only (for example “South London”)
5. Do not invent testimonials or outcomes

## Legal pages

Privacy, Cookies and Terms are drafts marked for owner/solicitor review. Update the “Last updated” date when final wording is approved.

## SEO phrases

Use naturally where relevant:

- IT support in London
- Computer repair in London
- Custom PC builds
- Media wall installation
- TV wall mounting
- Construction services in London

Do not create thin location doorway pages.
