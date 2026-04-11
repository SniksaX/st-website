This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Mailing List Setup

The `/00` page posts to `/api/mailing-list/subscribe`.

Required `.env.local` keys:

```env
MAILING_LIST_SECRET_KEY=change-me-with-a-long-random-secret

ZIMBRA_SMTP_HOST=smtp.mail.ovh.net
ZIMBRA_SMTP_TLS_SERVERNAME=smtp.mail.ovh.net
ZIMBRA_SMTP_PORT=587
ZIMBRA_SMTP_SECURE=false
ZIMBRA_SMTP_USER=hedji@sanstransition.fr
ZIMBRA_SMTP_PASS=change-me

MAILING_LIST_FROM=hedji@sanstransition.fr
MAILING_LIST_TO=mailinglist@sanstransition.fr
MAILING_LIST_REPLY_TO=hedji@sanstransition.fr
MAILING_LIST_CONFIRM_SUBJECT=Bienvenue sur la newsletter Sans Transition
MAILING_LIST_PUBLIC_BASE_URL=https://sanstransition.fr
```

`MAILING_LIST_SECRET_KEY` is used to derive encryption and hashing keys for subscriber storage in `data/mailing-list-subscribers.json`.

Send grouped campaigns from the stored list:

```bash
# stats
npm run mailing-list:stats

# export decrypted emails as CSV
npm run mailing-list:export -- --out data/mailing-list-emails.csv

# dry-run a campaign (no real send)
npm run mailing-list:send -- --subject "Actu Sans Transition" --text-file data/campaign.txt --dry-run

# real send (one email per recipient)
npm run mailing-list:send -- --subject "Actu Sans Transition" --text-file data/campaign.txt
```

The send script decrypts emails in memory and sends one message per recipient (no exposed recipient list).
Use `{{unsubscribe_url}}` in `.txt` and `.html` templates to inject a working one-click unsubscribe link.
If you skip `--html-file`, the `.txt` body is rendered as Markdown to HTML automatically.
See `data/campaigns/MARKDOWN_GUIDELINES.md` for cards (`:::card`), CTA buttons (`[button:...]`) and supported syntax.

Automation (scheduled sends):

```bash
# run due campaigns from queue file
npm run mailing-list:send-scheduled

# safe test
npm run mailing-list:send-scheduled -- --dry-run
```

Create `data/mailing-list-campaigns.json` from `data/mailing-list-campaigns.example.json` and set `sendAt` in UTC.
Each sent campaign is marked with `status: "sent"` and `sentAt` by the script.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
