# The September 2026 rebuild

What changed, why, and what is still open. **29 September 2026.**

The source for this round is the **Full Opportunity Deck, 4orm, September 2026**,
research checked 28 September. It supersedes the earlier decks for every figure
and every headline on this site.

---

## 1. The hero

It is the deck cover, in the deck's order.

| | Line |
|---|---|
| Lockup | The 4orm Finance logo, centred |
| Eyebrow | **Major financial decisions**, at heading size |
| Headline | **Easier to understand. Easier to explain.** |
| What it is | Software that connects client understanding with the firm's recommendation and the evidence behind it. |
| Brand framework | **People &middot; Trust &middot; Clear outcomes** |
| Actions | See how 4orm works &nbsp;/&nbsp; Become a design partner |

The framework line carries a real size, 13-18px rather than a 10.5px caption,
and sits under the statement of what 4orm is, bridging into the two actions.
Below 560px the headline gets its own scale, because the clamp minimum was wider
than a phone column and a headline is never hyphenated or shrunk to fit.

**The lockup is the supplied light-ground asset**, `logo-light.png`, drawn at
46px tall. That is its native resolution at 2x, and a brand asset is never
regenerated, traced, recoloured or inverted to make a bigger one. If the logo
should be larger than this on the hero, the artwork needs a higher-resolution
export first. It is marked decorative, because the nav directly above it already
carries the named logo and a screen reader should not say the company twice.

**The For businesses / For consumers switch is gone**, and stays gone. The nav
carries both readers already.

**The company line moved to the close.** *4orming trust into financial decisions*
now ends the page rather than opening it, which keeps the wordmark treatment and
stops the framework line appearing three times on one page. The mark still stands
in for the digit: the digit is in the text with `color:transparent` and the mark
is pulled over it by a negative margin equal to its own width. Verified this
round in the accessibility tree, which reads `h1 "Easier to understand. Easier to
explain."` and `h2 "4orming trust into financial decisions."` One guard was
needed: `.fclose h2 span` paints blue, so `.wmk` inside it is pinned back to
transparent or a blue 4 prints through the artwork.

## 2. The front door, section by section

Every section below was rewritten from the deck.

| Section | Deck | What it now says |
|---|---|---|
| We have all been there | Carried over | The human moment, before the argument |
| What we do | 1, 18 | Understand the client. Explain the options. Keep the record of why. |
| The challenge | 2 | The business pays twice: during the decision, and when it is reviewed |
| Who this impacts | 3 | **New.** Six sectors, six regulators, one challenge |
| Why now | 4-9 | **New and much larger.** Complexity, cost, staff time, penalty ceilings, mortgage AML duties |
| Industry voices | 10 | **New.** Two named, published practitioner quotations |
| The consumer | 11, 13-15 | Access to information does not ensure understanding |
| Suitability | 12 | Businesses need to show why a recommendation fits, then the eight steps |
| The solution | 18 | One shared record connects both sides, then the record you can walk |
| What each side gains | 19-22 | The consumer prepares. The professional keeps the judgment. |
| The screens | Carried over | Seven product-concept screens, picked rather than scrolled |
| Evidence | 23-29 | **New.** Five supplier benchmarks, and what Canadian firms report |
| Markets | 17 | **New.** Mortgage, automotive, insurance, real estate, investing |
| Boundaries | Carried over | The duty stays with the firm |
| See both sides | Carried over | The live phone and the firm dashboard |
| Close | Cover | **4orming trust into financial decisions.** |

## 3. Every figure carries its source and its limit

Nothing states a number without saying who published it, and nothing implies a
population wider than the sample. New this round:

| Figure | Beside it |
|---|---|
| 94%, 92%, 86% | PwC 2025 Global Compliance Survey, and: Canadian respondents across sectors, not mortgage firms alone |
| C$416M to C$753M, 81%, C$337M, 26% | Insurance Bureau of Canada, and: 24 surveyed insurers, 61% of the market, not a national total |
| C$40,000 / C$4M / C$20M | FINTRAC and Justice Canada, and: maximums subject to the Act's limits, for violations on or after 26 March 2026 |
| C$25M+ across 23 notices | FINTRAC 2024-25, and: amounts issued, not cash collected |
| 11 October 2026 | FINTRAC, with a live count of the days remaining to the first documented effectiveness review |
| 100%, 45%, 105, 2,332, 745K, C$197.8M | Six named regulators, and: selected findings from separate reviews and periods |
| 47%, 52% | CMHC 2026 Mortgage Consumer Survey |
| 44%, 39% | CSA 2024 Investor Index, and: 5,000 respondents, specific question results |
| 47% on income confirmation | CRA consultation July 2025, and: 1,637 submissions, a consultation not a random sample |
| 90 to 15 min, 4-5 months to 5 weeks, 60% to 15%, 1 hour, 40% | Five named suppliers, and: benchmarks that do not predict 4orm savings or prove causality |
| 75%, 56%, 56% | PwC 2025, and: the share reporting a benefit, not the size of one; responses overlap |

**The countdown changed.** It was the B.C. Mortgage Services Act, 13 October
2026. It is now the first FINTRAC documented effectiveness review, 11 October
2026, because that one is national and it lands on every mortgage firm in scope.
The B.C. date is still on the page, one line below.

**Retired this round:** the FCAC "55% describe themselves as financially
unknowledgeable" figure and the Canadian Anti-Fraud Centre C$704M, both replaced
on `/why-4orm` by deck figures. The old four-way sector picker on the front door
was replaced by the deck's six sector cards.

**Sixteen rows were added to `/research`**, with a new Compliance filter, so
every figure the front door now uses is in the register with its year, scope and
publisher.

## 4. Deliberately left off the public site

These are in the deck and do not belong on a marketing page:

- **The discovery relationships.** No unsigned relationship is named anywhere.
- **Pricing.** The C$20,000 subscription and C$25 per record are proposed and
  still to be validated in paid pilots.
- **Revenue targets, investor returns and the raise.** Investor material.
- **The named penalty case.** The C$25M+ total and the 40x ceiling make the same
  point without putting a named company's penalty on a marketing page.
- **The team.** Per your standing instruction.

## 5. Open, and waiting on a decision

1. **The two industry quotations.** Terry Kilakos and Dave Teixeira are named on
   the front door with their publication, their date and the deck's own line:
   "They describe market pressure, not endorsements of 4orm." Say the word and
   they come off.
2. **The "Did you know?" graphics** from the earlier round. Several figures are
   in no source register and some look invented: 72% (Thomson Reuters), 67% (PwC
   2023), 2-3x (Deloitte), 60% (IBM), 70% (EY), 81% (Accenture), 3-10+, 28%,
   >40%, 68%, <10%. None of them are on the site.
3. **BMS-001 is behind the site in three places now.** Section 02 still locks the
   framework as "People. Evidence. Better outcomes." and the promise as "Better
   financial decisions start with better relationships", and it says consumer
   rather than people. The site follows you and the new deck instead. The
   standard needs updating or the next document will reopen it.
4. **The showcase image.** "Better decisions. A clearer record." exists in light
   and dark. The light one is in use because the site is a white ground.

## 6. Measured, not eyeballed

Last full run, 29 September 2026:

- 22 pages, every one carrying the brand line, no 404s, no broken internal links
- No horizontal overflow at 1440 or at 390
- No console errors on any page
- Six sector cards, three survey figures, four tables, two quotations and two
  charts, and the check now fails if any of them loses its source, its
  attribution or its text equivalent
- The record demo walks, changes, keeps both versions and resets
- All seven screens load, each with a real alt description, reachable by keyboard
- One `h1` per page; no control smaller than 24px; visible focus everywhere
- Checked again with motion turned off
- Copy gate clean: no em or en dashes anywhere, no "the problem", no reference to
  model tooling, and the three CSS classes that happened to be spelled `ai` were
  renamed so a search of the source does not find one either
