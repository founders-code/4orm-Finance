# 4orm Finance v58 — Canonical Facts Aligned

Rebuilt bundle for `www.4ormfinance.com`. Every file in this folder is ready to upload to the GitHub repo (`founders-code/4orm-Finance`).

## What was applied

- **Canonical Facts v14 alignment** (source-of-truth PDF, 2026-07-08).
  - Pre-seed opens **August 1, 2026** (was July 1). Closing shifted to approximately **October 30, 2026**.
  - Legal entity narrative reads **4orm Finance** (was "4orm Finance Holdings Inc.").
  - Footer city line reads **Calgary, AB** only (Vancouver + Edmonton are KCS Capital offices).
- **Corporate structure section on regulatory.html** replaced with a single-entity vague statement: "4orm Finance is incorporated under the ABCA, registered office Calgary. Corporate structure may expand as the regulatory pathway advances." No named subsidiaries (no HoldCo, no OpCo, no CustodyCo).
- **Trust Co references removed** sitewide. Pillar 04 becomes "Regulated Custody". FAQ answer updated. Terms trademark list updated. Legal "Proposed entity" paragraph removed.
- **Data room CTA URL** points to `https://4ormdr.com` on every page. `data.4ormfinance.com` references are gone.
- **Family footer restructured** to three cards on every page: `4orm Data Room`, `4ormEx`, `KCS Capital` (labeled "Sister · Developer"). Demo Exchange card removed.
- **Hero on index.html** now reads:
  - H1: "Interoperability and finality, on one settlement layer." (with "on one settlement layer" in gold)
  - Subhead: "The neutral settlement layer for Canadian tokenized assets."
- **Distinction callout** on index.html houses the previous long H1 as a punchy pull quote below capabilities.
- **Global market stat tile** on index.html updated to "$2T to $16T" (McKinsey base case to BCG/ADDX).
- **Leadership page rebuilt** with 7-person roster:
  - Founders (gold tags): Chad R. Johnston, Kevin Wong.
  - Advisory (blue tags): Michael Stephens, James Atherton, Miika Makela, Bruce Fair, Zahiruddin Sandeela.
  - Angelo Aquino, Dean Hesse, Don Hickling removed.
  - Miika's role tag now reads "Capital Strategy" (was "Securities Compliance").
- **Mobile hamburger nav.** New `assets/mobile-nav.js` + CSS in `assets/styles.css`. On viewports ≤ 900px:
  - Nav collapses to a hamburger button on the right.
  - Tapping opens a full-width dropdown with all links.
  - "Request access" renders as a full-width brand-blue button at the bottom.
  - Logo scales 20% larger.
  - Util bar and accredited-investor legend hide.

## Before you upload

**One thing you need to do locally.** The bundled `assets/team/` folder is empty. Your local repo already has the seven team photos (Chad, Kevin, Mike, James, Miika, Bruce, Zed) from the earlier Cursor prompt that downloaded them. When you upload this bundle:

1. **Do NOT delete `assets/team/` from your local repo.** Keep those images where they are.
2. Overwrite the 9 root HTML files, `README.md`, `assets/styles.css`, and add the new `assets/mobile-nav.js`.
3. Delete these three photos from `assets/team/` (they were removed from the leadership roster):
   - `team-angelo.png`
   - `team-dean.png`
   - `team-don.png`
4. Commit + push. Vercel will deploy.

If you already deleted your local `assets/team/` folder or don't have those seven images, download them from:
- `https://kcs-capital.com/team-chad.png`
- `https://kcs-capital.com/team-kevin.png`
- `https://kcs-capital.com/team-mike.png`
- `https://kcs-capital.com/team-james.png`
- `https://kcs-capital.com/team-miika.png`
- `https://kcs-capital.com/team-bruce.png`
- `https://kcs-capital.com/team-zed.png`

Save them into `assets/team/` with those exact filenames.

## Verification checklist after Vercel deploys

Hit each URL and confirm:

- `https://www.4ormfinance.com` — hero reads "Interoperability and finality, on one settlement layer." Distinction pull quote appears below the six-pillar grid. Global market stat reads "$2T to $16T".
- Every page util bar (top) → "Pre-Seed · Opening August 1, 2026 · 90-day window".
- Every page footer → "© 2026 4orm Finance · Calgary, AB".
- `https://www.4ormfinance.com/regulatory` — "Corporate structure" section shows one 4orm Finance card only (no HoldCo/OpCo/CustodyCo).
- `https://www.4ormfinance.com/leadership` — seven cards. Chad + Kevin with gold "Founder" tags. Five advisors with blue tags. Photos load. LinkedIn links work.
- Nav "Request access" button on every page → clicks through to `https://4ormdr.com`.
- Mobile (browser dev tools, ≤ 900px) — hamburger appears, dropdown opens, banners hidden.

## Commit message suggestion

```
v58 canonical: dates, entity name, family footer, corp structure, hero, leadership roster, mobile hamburger
```
