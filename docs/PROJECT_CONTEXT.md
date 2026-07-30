# Project context

## Business

Abel Solutions Limited is a UK-based multi-service company with two divisions:

1. Technology Services
2. Construction Services

The website presents one cohesive brand with clearly separated service areas.

## Non-negotiable rules

- British English throughout
- Company name is “Abel Solutions”, never “Able Solutions”
- Do not invent contact details, reviews, projects, certifications or regulated capabilities
- Do not publish a residential address
- Do not claim email delivery success when delivery is not configured
- Do not hard-code secrets

## Current placeholders

Centralised in `src/config/site.ts` and `.env.example`:

- Email / telephone
- Company number
- Opening hours
- Official logo
- PASMA confirmation
- Insurance details
- Genuine projects and testimonials

## Architecture

- Next.js App Router + TypeScript + Tailwind CSS
- Structured local content files (no paid CMS)
- Zod schemas shared by client forms and API routes
- Optional Resend-based email delivery behind environment flags
- `src/proxy.ts` adds security headers (Next.js 16 proxy convention)
