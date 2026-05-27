# 4orm Finance — Landing Page

Single-page institutional landing site for **4orm Finance**, Canada's institution-grade RWA exchange and digital settlement network. Operated as a separately governed regulated entity; technology developed by KCS Capital.

Built as a single self-contained `index.html` with one image asset. No build step, no framework, no dependencies — drop into any static host.

---

## Repository structure

```
4orm-finance-landing/
├── index.html              ← the entire site (HTML + CSS + JS inlined)
├── assets/
│   └── 4orm-logo.png       ← brand logo (you'll add this)
├── vercel.json             ← Vercel static-hosting config
├── .gitignore
└── README.md
```

---

## Deploy to Vercel via GitHub — step by step

### 1. Create the GitHub repo

```bash
# from your local machine
mkdir 4orm-finance-landing && cd 4orm-finance-landing

# copy index.html, vercel.json, .gitignore, README.md into this folder
# create the assets folder and drop the logo in:
mkdir assets
# place 4orm-logo.png in ./assets/

git init
git add .
git commit -m "Initial commit — 4orm Finance landing page"

# create a new repo on github.com (private or public, your choice)
# then push:
git branch -M main
git remote add origin git@github.com:<your-org>/4orm-finance-landing.git
git push -u origin main
```

### 2. Deploy to Vercel

**Option A — via the Vercel dashboard (easiest)**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `4orm-finance-landing` GitHub repo
3. Framework preset: **Other** (Vercel will auto-detect it's a static site)
4. Build & Output settings: leave all defaults blank — no build command needed
5. Click **Deploy**

You'll get a `*.vercel.app` URL within ~30 seconds.

**Option B — via the Vercel CLI**

```bash
npm i -g vercel
cd 4orm-finance-landing
vercel           # follow the prompts
vercel --prod    # promote to production
```

### 3. Connect your custom domain

In the Vercel project settings → **Domains** → add `4ormfinance.com` (or whichever domain you own). Vercel will give you the DNS records to point at — either `A 76.76.21.21` or a `CNAME` to `cname.vercel-dns.com`. Update DNS at your registrar; SSL provisioning is automatic.

### 4. Future updates

Just push to `main`. Vercel auto-deploys every commit.

```bash
git add .
git commit -m "Updated leadership bios"
git push
```

---

## What's in `index.html`

| Section | Anchor | Notes |
|---|---|---|
| Hero (dark gradient) | top | Full headline, spec bar, gold pill status, CTAs |
| Stat strip | — | $16T / $1.5T+ / $1.9B/yr / $100M |
| Credibility marquee | — | Auto-scrolling validator names |
| The Distinction | — | Thesis lockup |
| Six capabilities | `#platform` | `.ncards` numbered grid |
| Who we serve | `#who` | 6-tile audience grid: institutions, tokenization projects, municipalities, governments, capital firms, dev firms |
| Thesis quote | — | "A rising tide raises all ships" |
| Canadian market | `#market` | Today vs 2031 horizon, momentum timeline |
| Leadership | `#team` | **Edit names/bios — placeholders for CEO, CCO, CTO** |
| Regulatory + structure | `#regulatory` | Pathway matrix + HoldCo/OpCo/CustodyCo + KCS |
| Waitlist | `#waitlist` | **Wire the submit handler — see below** |
| FAQ | `#faq` | 9 expand-collapse questions |
| Footer | — | Sitemap, contact, Calgary HQ |

---

## Before you go live — things to wire up

### 1. The logo

Drop `4orm-logo.png` into `./assets/`. The HTML references `./assets/4orm-logo.png` at 46px tall in the nav. If you want to use a hosted copy in the meantime, replace the `<img src>` with `https://demo-exchange.vercel.app/assets/4orm-logo.png`.

### 2. Waitlist form submission

In `index.html`, find the `<script>` block near the bottom — there's a `// TODO` marker. Currently the form just disables itself and shows a success message. Wire it to a real endpoint:

**Option A — Formspree (easiest)**

```html
<!-- Edit the form opening tag -->
<form class="wform" id="waitlist-form" autocomplete="on"
      action="https://formspree.io/f/YOUR_FORM_ID"
      method="POST">
```

Then sign up at [formspree.io](https://formspree.io), create a form, and paste the form ID.

**Option B — Vercel serverless function + Resend**

1. Create `api/waitlist.js` in your repo:

```js
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, org, role, org_type, notes } = req.body;

  await resend.emails.send({
    from: 'waitlist@4ormfinance.com',
    to: 'founders@kcs-capital.com',
    subject: `[4orm Waitlist] ${org} · ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nOrg: ${org} (${org_type})\nRole: ${role}\n\n${notes || ''}`,
  });

  return res.status(200).json({ ok: true });
}
```

2. Add `RESEND_API_KEY` in Vercel → Project Settings → Environment Variables
3. Update the `<script>` block in `index.html` to POST to `/api/waitlist`

### 3. Leadership

Edit the four `<div class="person">` blocks under `<section ... id="team">`. Replace names, roles, initials in the `.avatar`, and bios.

### 4. (Optional) Open Graph image

Add `assets/og-image.png` (1200×630) and add this to the `<head>`:

```html
<meta property="og:image" content="https://4ormfinance.com/assets/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## Editing the page

It's one HTML file. Open in any editor. CSS is in a `<style>` block at the top with design tokens in `:root`:

```css
:root {
  --brand: #2E6BF2;       /* 4orm electric blue */
  --gold:  #E7C76C;       /* 4orm gold */
  --text:  #142036;       /* navy ink */
  /* ... */
}
```

Change these once and the whole site updates.

---

## Tech notes

- **No build step.** Pure HTML + inline CSS + inline JS.
- **One web font:** Inter (loaded from Google Fonts).
- **One image:** the 4orm logo. Everything else is CSS.
- **Performance:** ~30KB HTML + ~80KB font + ~XX KB logo. Single round-trip after font caches.
- **Accessibility:** semantic landmarks (`<header>`, `<nav>`, `<section>`, `<footer>`), `aria-label` on the brand link, `prefers-reduced-motion` honored.
- **Browser support:** modern evergreen browsers. Uses CSS Grid, `clamp()`, `backdrop-filter`.

---

## Legal disclaimer

4orm Finance is an early-stage platform in development (sandbox-stage), not a licensed exchange or dealer. This website does not constitute an offer or solicitation to buy or sell securities and is not financial, legal or tax advice. Corporate structure is operationalized per the CIRO Digital Asset Custody Framework: HoldCo / OpCo / CustodyCo, independently governed from KCS Capital, the technology developer.

---

© 2026 4orm Finance · 4orm Finance Holdings Inc.
