# 4ormfinance.com

A complete rebuild. Fifteen static pages, no build step required to deploy.
Everything in this folder is the site.

    index.html            passport.html         the-rules.html
    the-problem.html      what-we-do.html       who-it-is-for.html
    mortgage.html         payments.html         real-estate.html
    insurance.html        law-firms.html        credit-unions.html
    team.html             contact.html          privacy.html
    terms.html
    robots.txt            sitemap.xml           vercel.json
    assets/               build/

Drop the whole folder into the repo. Vercel serves it with the existing
`cleanUrls` config and all 39 redirects are preserved in `vercel.json`.

## assets/

    site.css              one stylesheet, the whole design system
    chrome.js             injects the nav and footer on every page,
                          plus scroll reveal, the live day counter
                          and the animated penalty scales
    mortgage-data.js      the seeded Mortgage Guardian transaction
    mortgage-demo.js      the 15-scene demo engine
    logo.png              your existing lockup, untouched
    favicon*, og-image    your existing icons, untouched
    team/                 your existing team photographs, untouched

Nav and footer are defined once, in `chrome.js`. To add a page to the menu,
edit the `NAV` or `INDUSTRIES` array at the top of that file.

## build/

The pages are generated, so the copy lives in one place and the design lives
in another. `python3 build/build.py` regenerates all fifteen.

    sitekit.py            page shell, head, and the language gate
    ikit.py               the component emitter
    p_*.py                one module per page, content only

`ikit.py` is a drop-in replacement for the emitter in the v8 build, which is
why the six industry pages carry their existing copy across unchanged. Their
`p_*.py` modules were not edited.

## The language gate

`sitekit.gate()` runs over the visible copy of every page at build time and
splits what it finds in two.

**Hard gate, must not ship.** Em dashes, en dashes, "the problem" in any form,
"754 days", "three-year lookback", "224 firms", any claim that 4orm performs or
signs the independent review, any claim that the reviewer must be external, any
published first-review date, any reference to AI or model tooling, British
spellings, and the whole banned-word list from section 10 of the house standard:
really, clearly, quietly, substantially, genuinely, honestly, straightforward,
delve, leverage as a verb, robust, seamless, crucial, vital, pivotal,
comprehensive, holistic, underscore, testament, "in today's landscape", "in an
era of", "the rapidly evolving", "not just X but Y", "let's dive in", "at the end
of the day", "when it comes to", "plays a key role", "a game changer", "in
conclusion", and sentences opening with Moreover, Furthermore, Additionally or
Notably. **Currently zero.**

**Style notes, reported only.** 14 uses of "somebody" as the universal person,
across five pages that were written before this gate existed. The house rule
says name the role instead. They are listed on every build so you can decide;
nothing was changed.

### Two words I did change, both in your own bio on the team page

- "pointed at a narrower problem than the one he set out to solve" became
  "a narrower challenge". "The problem" is an absolute house rule.
- "the importance of robust governance" became "disciplined governance".
  "Robust" is on the banned list.

Revert either in `build/content/team.json` if you would rather keep them.

Two claims were corrected on the way through, both from the old
"why it is hard" page:

- "Every registered firm owes an independent review by 8 September 2028"
  became a statement that the review falls at least once every three years on
  each firm's own clock, because no first date is published anywhere.
- "reading the 3 years before it" was removed. The regulation imposes no
  period the review must cover.

## Headline capitalisation

The six industry pages, `who-it-is-for` and `team` carry the Title Case
headlines you wrote. `index`, `mortgage`, `the-problem`, `what-we-do`,
`the-rules` and `contact` use sentence case, matching the mortgage page.
Pick one and I will normalise the rest in a single pass.

## The consumer page

`/passport` is the 4orm Financial Passport: ASK, PREPARE, CHECK, PROTECT, the
readiness score, share-my-passport, "Check before I sign" and the ladder out to
auto financing, insurance, lending, investments and real estate. Two things on
it are interactive: the readiness meter fills on scroll, and the check panel
reveals its three findings when you press the button.

Mortgage Guardian is what the Passport looks like inside a mortgage. In the
demo the companion is personalised to the client, so it reads "Sarah's Guardian"
rather than a product name. That string is built in `mortgage-demo.js` from
`D.meta.client`, so changing the client name changes it everywhere.

The page says nothing about AI, per the standing house rule, and it carries no
market figures, so it needs no disclosure line. The CMHC statistic about
information seekers is not on the page: I could not verify it, and it is a claim
about AI use.

## What is not here

No analytics, no tracking, no cookies, no third-party scripts. The only
external request any page makes is to Google Fonts.
