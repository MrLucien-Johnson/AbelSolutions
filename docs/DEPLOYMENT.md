# Deployment (GitHub Pages — free)

The live public site is intended for **GitHub Pages**. Visitors only need a link. Your computer does not need to stay on.

## Public URL

https://mrlucien-johnson.github.io/AbelSolutions/


## If the live URL shows npm / README instead of the website

GitHub Pages is still on the **legacy** source (`main` branch root). That publishes the README via Jekyll, not the Next.js build.

Fix (one-time, repo owner):

1. Open https://github.com/MrLucien-Johnson/AbelSolutions/settings/pages
2. Under **Build and deployment → Source**, choose **GitHub Actions** (preferred) **or** Deploy from a branch → **`gh-pages`** → **`/`**
3. Save, wait about a minute, reload the public URL

Until that is changed, a static export is also kept at the repository root (`index.html`, `_next/`, `.nojekyll`) so the legacy `main` source can still serve the real site.

## One-time Pages setting

In the repository on GitHub:

1. Open **Settings → Pages**
2. Under **Build and deployment → Source**, choose **GitHub Actions**
3. Save

After that, every push to `main` rebuilds and publishes the site automatically.

## Manual publish from this branch

```bash
npm ci
npm run build:pages
touch out/.nojekyll
```

Then publish the `out/` folder to the `gh-pages` branch (or rely on the Actions workflow on `main`).

## Checklist before sharing widely

1. Confirm the Pages URL loads
2. Add contact email/phone when ready (GitHub Actions secrets or `src/config/site.ts`)
3. Optional: add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` so quote/contact forms can deliver
4. Replace the temporary text logo when artwork is ready
5. Review legal page drafts

## Local preview of the Pages build

```bash
npm run build:pages
npx --yes serve out
```
