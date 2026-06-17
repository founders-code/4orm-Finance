# 4orm Finance v50 — corporate website rebuild

Static site for `4ormfinance.com`. Full rebuild with the new positioning lifted from the brand showcase: **"Regulated settlement finality for Canadian capital markets."** Seven pages, one shared design system, one shared family footer block. The hub in the hub-and-spoke architecture; the other 4orm properties (4ormEx, Data Room, Demo Exchange) and the sister brand (KCS Capital) are linked from every page footer.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home. Hero, six pillars, distinction pull quote, lifecycle, Project Samara proof, family-properties section, closing CTA. |
| `platform.html` | Six-pillar deep dive (issuance · trading · settlement · custody · reporting · supervision). |
| `who.html` | Three audiences (Tier-1 banks + Crown · credit unions + provincial banks · issuers + originators). |
| `market.html` | Canadian RWA opportunity sizing, Canadian landscape, recent institutional momentum. |
| `regulatory.html` | OSFI · CSA · CIRO · FINTRAC pathway, four-entity corporate structure, regulatory roadmap through 2028. |
| `leadership.html` | Founders, advisors, hiring plan tied to capital raised. |
| `faq.html` | Twelve institutional questions, organized by Platform / Regulatory / Corporate Structure / Raise. |

## Design system

- **Typography:** Inter (400-900)
- **Colors:** Brand blue `#2E6BF2`, gold `#E7C76C` / `#FFD9A8`, success green `#7BE3B0`, dark hero gradient `#1F3CA8 → #15233F → #0B1220`, light surfaces `#FFFFFF` / `#F4F7FB`
- **Stylesheets:** `assets/styles.css` (the demo-exchange master, verbatim) + `assets/site.css` (4orm Finance overrides for nav, hero, family footer, section header)

The compact black nav, the 3× logo overflow, the dark navy hero, the family footer block — these are all locked patterns identical on every page. The eight body sections per page use the `.psec` system: light surface, light band, dark, or dark-alt, alternating.

## Deploy

1. Push contents of this folder to a new GitHub repo, e.g. `founders-code/4orm-finance`.
2. In Vercel: "Add new project" → import the repo. Framework preset: **Other**. Build command: empty. Output directory: empty.
3. Add custom domain `4ormfinance.com`. Point DNS as Vercel instructs.
4. Done. All seven pages live.

## What changed from v41

- **Positioning lifted to "regulated settlement finality"** across every page H1, hero subhead, and supporting copy. The previous "control plane" framing is preserved as supporting evidence (mostly on `platform.html`).
- **Compact black nav with 3× logo overflow** locked across all seven pages.
- **Family footer block** added to every page, linking to 4ormEx, Data Room, Demo Exchange, and KCS Capital sister brand.
- **Stripped AI-tell language.** No "in plain English", "no jargon", "let me explain", or condescending phrasing.
- **No em-dashes.** Commas, semicolons, periods only.
- **Demo Exchange refactored as a domain target (4ormedc.com)** in all family-block references, replacing the demo-exchange.vercel.app URL (which stays as the link target until the new domain is connected).
- **Single locked footer fine print** with the corporate structure, KCS relationship, and no-offer-no-solicitation language.

## Visual reference

The brand showcase that informed this rebuild lives at `4orm-showcase-v1/index.html` in the workspace. Mockups for all four 4orm properties + KCS Capital are demonstrated there with the new positioning.

## What still needs to ship (Phase 2 from the brand strategy)

- Real screenshots for the family thumbnails (currently the data room uses them; this site uses cards instead).
- Real logo as SVG (currently raster PNG).
- Bing Webmaster Tools registration.
- Schema.org Organization markup with `sameAs` to Wikidata, Crunchbase, LinkedIn.
- 90-day Search Everywhere Optimization roadmap from the Phase 1 research memo.

## File tree

```
4orm-finance-v50/
├── index.html
├── platform.html
├── who.html
├── market.html
├── regulatory.html
├── leadership.html
├── faq.html
├── vercel.json
├── README.md
├── .gitignore
└── assets/
    ├── styles.css           (the demo-exchange master)
    ├── site.css             (4orm Finance overrides)
    └── 4orm-logo.png
```
