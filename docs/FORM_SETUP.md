# Form setup (GitHub Pages)

This site is statically hosted on GitHub Pages, so there is no server-side `/api` route.

## Behaviour

1. Client-side Zod validation with accessible error messages
2. Honeypot field (`companyWebsite`) for basic spam filtering
3. Optional delivery through **Web3Forms** (free)
4. Honest messaging when delivery is not configured

## Enable free enquiry delivery

1. Create a free account at [https://web3forms.com](https://web3forms.com)
2. Create an access key for your inbox email
3. Add a GitHub Actions repository secret named `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
4. Redeploy (push to `main` or run the Deploy GitHub Pages workflow)

For local testing, put the key in `.env.local`:

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

Then run:

```bash
npm run build:pages
npx serve out
```

## Honest delivery states

| Result | UI behaviour |
| --- | --- |
| sent | Success confirmation |
| not_configured | Explains delivery is not connected; does not claim the message was emailed |
| failed | Error asking the user to try again later |

Never commit secrets to Git.
