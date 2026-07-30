# Form setup

Quote and contact forms share the same delivery approach.

## Behaviour

1. Client-side Zod validation with accessible error messages
2. Server-side validation in `/api/quote` and `/api/contact`
3. Honeypot field (`companyWebsite`) for basic spam filtering
4. In-memory rate limiting per IP
5. Email delivery only when explicitly enabled and configured

## Honest delivery states

| Delivery result | UI behaviour |
| --- | --- |
| `sent` | Success confirmation |
| `not_configured` | Explains that email delivery is not set up; does not claim the message was emailed |
| `failed` | Error asking the user to try again later |

## Enabling Resend delivery

1. Create a Resend account and API key
2. Verify a sending domain
3. Set in `.env.local`:

```bash
EMAIL_DELIVERY_ENABLED=true
RESEND_API_KEY=re_xxx
EMAIL_FROM_ADDRESS="Abel Solutions <enquiries@your-domain.co.uk>"
CONTACT_INBOX_EMAIL=you@your-domain.co.uk
NEXT_PUBLIC_CONTACT_EMAIL=you@your-domain.co.uk
```

4. Restart the server and submit a test enquiry

Never commit API keys.

## File uploads

Uploads are intentionally not enabled in this version. Customers can mention that photos are available; staff can request them by email once contact details are live.

## Future hardening

For multi-instance hosting, replace the in-memory rate limiter with Redis or an edge rate-limit service.
