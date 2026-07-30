# Form setup — Web3Forms (step by step)

This site is on GitHub Pages, so quote/contact messages need a free delivery service.
**Web3Forms** sends form submissions to your email.

## What you will get

- An **Access Key**
- Quote and contact forms on the live site will email you when someone submits

## Step 1 — Open Web3Forms

1. Go to [https://web3forms.com](https://web3forms.com)
2. Click **Create Access Key** / **Get Started** (wording may vary slightly)
3. Sign up with the email address where you want enquiries to arrive  
   Example: your business email, or a personal email you check often for now

## Step 2 — Create the access key

When asked for details, use:

| Field | What to enter |
| --- | --- |
| **Email / Inbox email** | The email that should receive quote and contact messages |
| **Website / Domain** | `mrlucien-johnson.github.io` |
| **Name / Project name** (if asked) | `Abel Solutions website` |

Notes:

- Use a real inbox you control
- You can change the inbox later in the Web3Forms dashboard
- Free plan is enough for this site

## Step 3 — Copy the Access Key

1. After signup, Web3Forms shows an **Access Key**
2. It usually looks like a long string of letters/numbers
3. Copy it somewhere safe temporarily
4. Do **not** paste it into a public GitHub issue, chat, or commit

## Step 4 — Add the key to GitHub (required for the live site)

1. Open your repo:  
   [https://github.com/MrLucien-Johnson/AbelSolutions](https://github.com/MrLucien-Johnson/AbelSolutions)
2. Go to **Settings**
3. In the left sidebar, open **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Enter exactly:

| Setting | Value |
| --- | --- |
| **Name** | `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` |
| **Secret** | paste your Web3Forms Access Key |

6. Click **Add secret**

Optional secrets you can also add later (same place):

| Name | Example |
| --- | --- |
| `NEXT_PUBLIC_CONTACT_EMAIL` | your business email |
| `NEXT_PUBLIC_CONTACT_PHONE` | your business phone |
| `NEXT_PUBLIC_COMPANY_NUMBER` | Companies House number |

## Step 5 — Redeploy the website

The key is built into the site at deploy time, so you must redeploy after saving the secret.

### Easiest option

1. Open:  
   [https://github.com/MrLucien-Johnson/AbelSolutions/actions](https://github.com/MrLucien-Johnson/AbelSolutions/actions)
2. Click **Deploy GitHub Pages**
3. Click **Run workflow**
4. Choose branch **main**
5. Click **Run workflow**
6. Wait until it shows a green tick (usually under 2 minutes)

### Alternative

Make any small commit/push to `main` — that also triggers a deploy.

## Step 6 — Test it

1. Open:  
   [https://mrlucien-johnson.github.io/AbelSolutions/quote/](https://mrlucien-johnson.github.io/AbelSolutions/quote/)
2. Fill in a real test enquiry using your own email
3. Tick the consent boxes
4. Submit
5. You should see **Enquiry sent**
6. Check the inbox you registered with Web3Forms (and spam folder)

Also test:

- [Contact form](https://mrlucien-johnson.github.io/AbelSolutions/contact/)

## What the site sends

Each submission includes:

- Subject line (quote or contact)
- Customer name, email, phone
- Message / job description
- Extra fields such as area, service category, preferred contact method

Reply-to is set to the customer’s email where supported, so you can reply directly.

## Local testing (optional)

Only if you run the site on your computer:

1. Create `.env.local` in the project root (never commit this file)
2. Add:

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

3. Rebuild:

```bash
npm run build:pages
npx serve out
```

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Form still says delivery is not connected | Secret name spelling, then redeploy |
| Form says sent, but no email | Check spam; confirm Web3Forms inbox email |
| Deploy failed | Open the failed Actions run and check the log |
| Wrong inbox | Update email in Web3Forms dashboard |

## Security note

`NEXT_PUBLIC_...` keys are visible in the built frontend. That is normal for Web3Forms access keys.
Still:

- Do not commit the key into source files
- Keep it only in GitHub Actions secrets / `.env.local`
- If a key is ever exposed publicly in a repo commit, create a new key and replace the secret

## After it works

Tell me when the secret is added and redeployed if you want a final check of the live forms.
