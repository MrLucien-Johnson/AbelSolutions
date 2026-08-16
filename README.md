# Abel Solutions Limited — Website

> **Live website:** [https://mrlucien-johnson.github.io/AbelSolutions/](https://mrlucien-johnson.github.io/AbelSolutions/)  
> This repository is the **source code**. If you see npm install instructions in the browser instead of the Abel Solutions site, open **Settings → Pages**, set Source to **GitHub Actions** (recommended) or branch **`gh-pages`** / folder **`/`**, then Save.


Production-ready website for **Abel Solutions Limited**, a UK-based company providing technology and construction services across London and surrounding areas.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- Zod validation
- Vitest unit tests
- Playwright end-to-end tests

## Prerequisites

- Node.js 20+ (22 recommended)
- npm 10+

## Installation

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` with confirmed values only. Never invent contact details or commit secrets.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Vitest unit tests |
| `npm run test:e2e` | Playwright tests (builds first via config) |
| `npm run format` | Prettier write |
| `npm run validate` | Lint + typecheck + unit tests + build |

## Environment variables

See `.env.example` for the full list.

Important placeholders:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_COMPANY_NUMBER`
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`

## Contact and quote forms

Forms validate in the browser. Optional free delivery uses Web3Forms.

If delivery is not configured, the UI explains that clearly and **does not** claim the enquiry was emailed.

Setup guide: [docs/FORM_SETUP.md](docs/FORM_SETUP.md)

## Content editing

- Business details: `src/config/site.ts`
- Services copy: `src/content/services.ts`
- Projects: `src/content/projects.ts`

Guidance: [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md)

## Images

Replace placeholders with genuine Abel Solutions photography only.

Guide: [docs/PROJECT_IMAGES.md](docs/PROJECT_IMAGES.md)

## Deployment (free public link)

Hosted on **GitHub Pages** so visitors only need a link:

**https://mrlucien-johnson.github.io/AbelSolutions/**

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Known placeholders

- Business email and telephone
- Company registration number
- Official logo (temporary text brand mark in use)
- Opening hours
- Genuine project photography and reviews
- PASMA / insurance confirmation status
- Web3Forms access key (optional form delivery)

## Documentation

- [docs/PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md)
- [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)
- [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md)
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- [docs/FORM_SETUP.md](docs/FORM_SETUP.md)
- [docs/PROJECT_IMAGES.md](docs/PROJECT_IMAGES.md)

## Brand note

The primary brand mark is the refined **ABEL SOLUTIONS** text wordmark. When an official logo is supplied, add it via `siteConfig.brand.logoImage` for secondary placements without removing the wordmark.
