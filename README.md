# 4orm Finance website

Static site. No build step is required to deploy: `deploy/` is what ships.

    deploy/            what goes on the server, exactly as it is
    source/            the hand-edited source for the front door
    verify/            the checks, so the next change can be proved as well
    docs/              what changed in this rebuild, and what is still open

**Prepared 29 September 2026.**

---

## Deploying

Upload the contents of `deploy/` to the host. It is a Vercel project:
`vercel.json` carries `cleanUrls`, the redirect table and the cache headers, so
`/personal` serves `personal.html` and `/assets/*` is cached for a year.

Because assets are cached hard, **every asset URL carries `?v=YYYYMMDD`**. If you
edit anything in `assets/`, bump that stamp in the files that reference it or the
change will not reach anyone who has visited before.

## The pages

| Path | What it is |
|---|---|
| `/` | The front door. The business story, with the 4ormIQ phone and the firm dashboard inside it. |
| `/personal` | Know more. Decide better. The consumer side. |
| `/professional` | Build the evidence while the decision is happening. The firm side. |
| `/how-it-works` | One relationship, one line. |
| `/why-4orm` | Why the company exists, the research, and who is building it. |
| `/the-standard` | Suitability, the eight steps, the ten principles, what regulators ask for. |
| `/industries/*` | Seven sectors, same relationship, different decision. |
| `/check-a-firm`, `/research`, `/team`, `/contact` | Secondary pages. |
| `/intelligence` | 4orm Intelligence. Self-contained: it carries its own CSS and JS. |
| `/privacy`, `/terms`, `/website-privacy` | Legal. |

`/home` was retired in this rebuild and redirects to `/`.

## How the front door is assembled

`index.html` is generated, not hand-edited. Two source files build it:

    source/front.html      the page body, with @@ROWS@@ where the phone and
                           dashboard rows are spliced in
    source/front.css       the front-door styles, appended to assets/site.css

`source/build.py` does the assembly. Run it from `source/`:

    python3 build.py

It rewrites `deploy/index.html` and the tail of `deploy/assets/site.css`, keeping
the live phone and dashboard markup that the rest of the site's scripts drive.
Everything else in `deploy/` is edited directly.

## The scripts

| File | What it runs |
|---|---|
| `chrome.js` | Nav, menu, footer, scroll reveals, segmented controls, counters. On every page. |
| `atmos.js` | The ambient light behind the page. On every page. |
| `front.js` | The front door: the record demo, the screens picker, the B.C. countdown. |
| `assist.js` | The 4ormIQ phone on the front door. |
| `guardian.js` | The full consumer experience behind `#personal`. |
| `firm.js` | The firm dashboard behind `#professional`. |
| `landing.js` | Opens and closes those two experiences from the hash. |
| `check.js`, `research.js`, `team.js` | One page each. |

## Verifying a change

`verify/` holds the Playwright checks used on this rebuild. They need
`playwright` and a local Chromium; each one serves `deploy/` on a port and
reports pass or fail.

    node verify/all.js       every page: the brand line, overflow, status codes
    node verify/t.js         the front door at 1440, 390 and with motion off
    node verify/s.js         the screens picker: all seven, alt text, keyboard
    node verify/full.js      whole-site link check and full-page screenshots

Run all four before shipping. The last full run was clean.
