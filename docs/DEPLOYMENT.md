# Deployment

## Recommended platforms

- Vercel
- Netlify
- Any Node host supporting Next.js standalone/output as preferred

## Checklist before go-live

1. Set `NEXT_PUBLIC_SITE_URL` to the live domain
2. Add confirmed email / telephone / company number
3. Replace the temporary text logo if artwork is ready
4. Configure email delivery or leave it disabled with clear UI messaging
5. Review Privacy, Cookies and Terms with a solicitor/owner
6. Add genuine projects only when approved
7. Run `npm run validate`
8. Confirm `robots.txt` and `sitemap.xml` resolve on the live domain

## Build

```bash
npm install
npm run build
npm run start
```

## Security notes

- Do not commit `.env.local`
- Keep `EMAIL_DELIVERY_ENABLED=false` until credentials are ready
- Security headers are applied via `src/proxy.ts`
- `/api/*` is disallowed in `robots.ts`

## Caching

Static pages are generated at build time where possible. API routes remain dynamic and uncached.
