# 4orm Finance — Full Site

Multi-page institutional site for **4orm Finance**, Canada's institution-grade RWA exchange and digital settlement network, plus **4ormEx** — the institutional sandbox preview of the product itself.

Operated as a separately governed regulated entity; technology developed by KCS Capital.

No build step. Static HTML + CSS + JS. Drop into any static host.

---

## Repository structure

```
4orm-finance-landing/
├── index.html                  ← homepage (hero + summary sections + waitlist + FAQ)
├── platform.html               ← Platform deep-dive (6 capabilities, architecture, deployment)
├── who.html                    ← Who we serve (6 audience segments, pain/solution/engagement)
├── market.html                 ← Canadian tokenization market (sizing, ecosystem map, momentum)
├── regulatory.html             ← Regulatory posture (CIRO/CSA/OSFI/FINTRAC + structure + timeline)
├── leadership.html             ← Leadership & governance (team, board, offices, advisors)
├── assets/
│   ├── 4orm-logo.png           ← brand logo (you add this)
│   ├── site.css                ← shared site styles (all landing pages)
│   └── exchange.css            ← shared exchange app styles
├── exchange/                   ← 4ormEx sandbox preview
│   ├── index.html              ← Exchange overview (6 modules, 5 personas, listings table)
│   ├── marketplace.html        ← LIVE sandbox order book (ticks every 4s, trade ticket works)
│   ├── issuer.html             ← Alpha Capital — offerings, distribution rules, new-offering modal
│   ├── investor.html           ← Bay Street — portfolio, custody balances, open subscriptions
│   ├── compliance.html         ← Compliance Officer — KYC queue, AML alerts, pre-trade log
│   ├── settlement.html         ← Tetra Trust — atomic DvP, corridors, reconciliation
│   └── admin.html              ← Platform Admin — audit log, report builder, system health
├── vercel.json                 ← Vercel config + security headers + asset caching
├── .gitignore
└── README.md
```

### Routes
| Route | Page |
|---|---|
| `/` | 4orm Finance homepage |
| `/platform.html` | Platform deep-dive |
| `/who.html` | Who we serve |
| `/market.html` | Canadian market |
| `/regulatory.html` | Regulatory posture |
| `/leadership.html` | Leadership & governance |
| `/exchange/` | 4ormEx overview |
| `/exchange/marketplace.html` | Live sandbox order book |
| `/exchange/issuer.html` | Issuer Portal (Alpha Capital) |
| `/exchange/investor.html` | Investor Portal (Bay Street) |
| `/exchange/compliance.html` | Compliance Console |
| `/exchange/settlement.html` | Settlement Ledger (Tetra Trust) |
| `/exchange/admin.html` | Admin & Audit |

---

## Deploy to Vercel via GitHub

### First-time setup

```bash
mkdir 4orm-finance-landing && cd 4orm-finance-landing
# copy all files from this bundle, then:
mkdir -p assets
# drop 4orm-logo.png into ./assets/

git init && git add . && git commit -m "Initial commit — 4orm Finance"
git branch -M main
git remote add origin git@github.com:<your-org>/4orm-finance-landing.git
git push -u origin main
```

Then go to [vercel.com/new](https://vercel.com/new), import the repo, framework preset **Other**, leave build settings blank, click **Deploy**.

### Updating an existing repo

If you already have the v2 repo on GitHub:
1. Upload the new files: `assets/site.css`, `assets/exchange.css`, the five new landing sub-pages (`platform.html`, `who.html`, `market.html`, `regulatory.html`, `leadership.html`), and the updated exchange pages.
2. Replace `index.html` (the nav now points to real pages instead of `#anchors`).
3. Replace `README.md`.
4. Commit and push. Vercel auto-redeploys.

### Custom domain

Project settings → **Domains** → add `4ormfinance.com` (or your domain) → update DNS at your registrar with the records Vercel gives you. SSL is automatic.

---

## What's on each page

### Landing (5 pages + homepage)
- **`/`** — Hero, stat band, marquee, six capabilities summary, six audience tiles, market snapshot, leadership snapshot, regulatory snapshot, waitlist form, FAQ, footer.
- **`/platform.html`** — Each of the six capabilities expanded with use cases, key facts (finality, mechanism, reference, integration), 3-layer architecture diagram (institution / control plane / chain), 3-step deployment model.
- **`/who.html`** — Six audience segments expanded: each with problem statement, what 4orm provides, and how to engage. Plus a "what 4orm is NOT" section.
- **`/market.html`** — Full Canadian sizing (today 75–175 projects, 2031 250–600), $1.9B/yr TAM, "what Canada has / doesn't have", 16-cell ecosystem map of known Canadian participants, 6-row momentum timeline.
- **`/regulatory.html`** — Six-track regulatory matrix (active/pathway/verified), four-entity corporate structure (HoldCo/OpCo/CustodyCo + KCS), seven-step regulatory timeline Q1 2026 → Q2 2027, three pillars of embedded compliance.
- **`/leadership.html`** — Six-card team grid (Chad + 5 TBD placeholders for you to fill), four-cell governance grid (3 boards + technology partner), three offices (Calgary HQ, Vancouver, Edmonton), advisor categories.

### 4ormEx (7 pages)
- **`/exchange/`** — Dark hero, 4 KPIs, 5 persona switcher cards (Issuer, Investor, Compliance, Custodian, Admin), 6 module cards with status badges, live-listings snapshot table.
- **`/exchange/marketplace.html`** — Functional sandbox: 8 listed Canadian assets, 20-level order book with depth shading, market header with live price, trade ticket with Buy/Sell + Limit/Market/Stop + GTC/IOC/FOK/DAY, your open orders, recent-trades tape. Updates live every 4–7 seconds.
- **`/exchange/issuer.html`** — Alpha Capital persona. 4 KPIs (active offerings, total raised, whitelisted investors, tokens minted), active offerings table with progress bars, recent investor subscriptions, distribution rules panel, compliance status panel, modal-form "Create new offering" with full ERC-3643 distribution rules.
- **`/exchange/investor.html`** — Bay Street Investments persona. AUM/positions/income/subscriptions KPIs, full portfolio holdings table with P&L, available primary offerings to subscribe, custody balances across 3 custodians, recent activity feed.
- **`/exchange/compliance.html`** — Compliance Officer persona. 4 KPIs (pending/approved/flagged/pass-rate), filterable KYC/KYB queue, AML alerts table, live pre-trade check log (showing passed/blocked/warn), regulatory reports table, 30-day compliance health metrics.
- **`/exchange/settlement.html`** — Tetra Trust custodian persona. 4 KPIs (settled/in-flight/failed/avg-finality), atomic DvP visualization for the latest settlement with 6-step lifecycle, recent settlements table, settlement corridors (8 bank↔custodian pairs), custody balances breakdown, reconciliation panel.
- **`/exchange/admin.html`** — Platform Admin persona. 4 KPIs (events/sessions/health/storage), 4-gauge infrastructure health, full immutable audit log with filters, regulatory report builder with 5 tabs (CIRO/CSA/OSFI/FINTRAC/Internal), infrastructure detail panel, user & permissions table.

---

## Before you go live — things to wire up

### 1. The logo
Drop `4orm-logo.png` into `./assets/`. Every page references it at `../assets/4orm-logo.png` (exchange pages) or `./assets/4orm-logo.png` (landing pages). Logo height is 42px in nav.

### 2. Waitlist form
On the homepage in the `<script>` block — there's a `// TODO` marker. Wire to:
- **Formspree** (easiest): `<form action="https://formspree.io/f/YOUR_ID" method="POST">`
- **Vercel + Resend serverless function**: create `api/waitlist.js` and update the script's `fetch()` target.

### 3. Leadership cards
Edit `leadership.html` — the team grid has Chad in the first card; five others are TBD placeholders. Replace names, roles, initials in `.avatar`, and bios. Same for the landing homepage `index.html` if you want the snapshot synced.

### 4. (Optional) Real interactivity on exchange persona pages
The marketplace page is functionally live. The issuer/investor/compliance/settlement/admin pages render rich mock data and have a working "Create offering" modal on the issuer page. Adding real persistence would require a backend.

### 5. (Optional) Open Graph image
Add `assets/og-image.png` (1200×630) and link it from each `<head>`.

---

## Editing

All design tokens live in `assets/site.css` under `:root`:

```css
:root {
  --brand: #2E6BF2;       /* 4orm electric blue */
  --gold:  #E7C76C;       /* 4orm gold */
  --text:  #142036;       /* navy ink */
  /* ... */
}
```

Change once, all pages update. The landing page `index.html` has its CSS inline (legacy from v1) — change tokens in the inline `:root` there too if you adjust palette.

---

## Tech notes

- **No build step.** Pure HTML + linked CSS + inline JS.
- **One web font.** Inter, loaded from Google Fonts.
- **One image.** The 4orm logo. Everything else is CSS or inline SVG.
- **Shared CSS.** `assets/site.css` for all landing pages; `assets/exchange.css` for all exchange pages. Vercel caches both for 1 year.
- **No external JS dependencies.** All interactivity (marketplace order book, modal, persona switching hooks) is vanilla JS.
- **Accessibility:** semantic landmarks, `aria-label`, `prefers-reduced-motion`.
- **Performance:** each landing page ~25–35 KB HTML + cached CSS + cached font + cached logo.

---

## Legal

4orm Finance is an early-stage platform in development (sandbox-stage), not a licensed exchange or dealer. This website does not constitute an offer or solicitation to buy or sell securities and is not financial, legal or tax advice. Corporate structure is operationalized per the CIRO Digital Asset Custody Framework: HoldCo / OpCo / CustodyCo, independently governed from KCS Capital, the technology developer.

---

© 2026 4orm Finance · 4orm Finance Holdings Inc.
