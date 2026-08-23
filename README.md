# 4ormfinance.com

The whole site, rebuilt in the language of the first demo. Sixteen pages, no
build step required to deploy. Unzip into the repo root.

    index.html            the experience: three views, four industries
    passport.html         the consumer product
    mortgage.html         payments.html         real-estate.html
    insurance.html        law-firms.html        credit-unions.html
    who-it-is-for.html    the-rules.html        the-problem.html
    what-we-do.html       team.html             contact.html
    privacy.html          terms.html
    robots.txt            sitemap.xml           vercel.json
    assets/               build/

`vercel.json` carries all 39 redirects forward untouched.

## The design philosophy changed, not just the paint

The old site was: marketing page, explanation, card, table, another explanation.
This one is: product, interaction, discovery, transformation, explanation.

The clearest example is the four-column province comparison on the industry
pages. It used to be a table nobody reads across. It is now a segmented control
you operate: pick Alberta, and you see Alberta. Ten of those across the site.

Every page is white, airy, Inter and JetBrains Mono, with the soft blue and gold
wash. The nav is a floating dark pill, which is how the first demo carried the
logo, so your existing white wordmark reads with no new asset. **No brand asset
was generated, traced, recoloured or placeheld.**

## index.html, the experience

Two levels of navigation, exactly the hierarchy you described.

    Who are you?              PERSONAL   PROFESSIONAL   REGULATOR
    What transaction?         Mortgage   Auto   Insurance   Lending

Both switch the same object. The industry changes the conversation, the
professional, the fields on the application and the transaction ID. The view
changes who is looking at it.

The path a visitor takes:

1. **Personal.** Tap a goal, pick a timing, say yes, then tap the four readiness
   items. The panel beside the phone builds while they do: readiness climbs from
   12 per cent, identity and income flip to verified, the evidence list fills,
   and thin blue lines draw in behind the phone. Those lines are the evidence
   graph forming.
2. **Share.** The view switches itself to Professional. The file arrives prepared.
3. **The moment.** Press "Change the income figure". $118,000 animates to
   $136,000, an evidence exception opens on the professional side, and the phone
   lights up on the consumer side a second later. One event, two people, one
   record.
4. **Regulator.** The phone drops away, the transaction becomes a timeline, and
   "Reconstruct the transaction" assembles the package.

## assets/

    site.css          one stylesheet, the whole design system
    chrome.js         nav and footer injected once, plus scroll reveal,
                      the segmented controls, the animated scales,
                      the readiness meter and the document check
    experience.js     the homepage state machine
    logo.png          your existing lockup, untouched
    favicon*, og-image, team/   your existing files, untouched

## build/

Pages are generated so the copy lives in one place and the design in another.
`python3 build/build.py` regenerates all sixteen.

    kit.py       page shell, head, and the written-word gate
    pkit.py      the product-led emitters
    shim.py      adapter for the carried content modules
    p_*.py       one module per page

`shim.py` maps the old content vocabulary onto the new emitters, which is why
`p_payments.py`, `p_real_estate.py`, `p_insurance.py`, `p_law_firms.py`,
`p_credit_unions.py` and `p_hub.py` were **not edited**. Their research, every
cited section and every source link, carried across untouched and came out in
the new language.

## The written-word gate

The brand system governs the words. `kit.gate()` runs over the visible copy of
every page at build time and fails on: em dashes, en dashes, "problem" in any
form, "754 days", "three-year lookback", "224 firms", any claim that 4orm
performs or signs the independent review, any claim the reviewer must be
external, any published first-review date, any reference to AI or model tooling,
British spellings, and the full banned-word list from section 10 of the house
standard.

**Currently zero.**

Fifteen style notes are reported and not changed: uses of "somebody" as the
universal person, all in copy written before the gate existed. Listed on every
build so you can decide.

## Verified before packaging

All sixteen pages: nav and footer inject, every internal link resolves, no
console errors, no encoding artifacts, every scroll reveal fires, and no
horizontal overflow at 1440 or 390. Every segmented control on the site was
clicked through.

## Caching

Assets carry `?v=YYYYMMDD` from the build date. A returning visitor cannot be
served a stale file from the one-year immutable cache on `/assets/*`.

## Still open

- Insurance and Lending on the homepage run the same engine with their own data.
  They are honest demonstrations of the model, not built products.
- Every name, figure, document and decision in the experience is invented.
