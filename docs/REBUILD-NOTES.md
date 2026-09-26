# The September 2026 rebuild

What changed, why, and what is still open. **26 September 2026.**

Sources: the *Intro to 4orm* deck of 21 September, the *Investment Overview*, the
*Evidence and Validation* brief of 19 September, the Investor FAQ, and BMS-001,
the Brand Message Standard.

---

## 1. There is a new front door

`/` was a landing page: a headline, a live phone and two thumbnails. It is now
the business homepage, in this order.

| Section | What it does |
|---|---|
| Hero | The company line, the brand framework, the benefit, two actions. |
| We have all been there | The human moment, verbatim from deck 03. |
| What we do | The plainest statement on the site. |
| The challenge | Pick a sector, see that regulator's own findings. |
| Where the cost sits | The business pays twice, and the four places the file lives. |
| Why now | Four layers of supervision, and the FINTRAC jump from 8 penalties to 30. |
| What suitability means | The eight steps. |
| The solution | A record you walk, then change, and watch version. |
| The screens | Seven product-concept screens, picked rather than scrolled. |
| Who it serves | Three readers, the preparation split, the four boundaries. |
| Did you know? | Four verified figures. |
| See both sides | The live phone and the firm dashboard. |
| Close | Check 4orm. Know more. Decide better. |

**The hero is five things and nothing else.** A For businesses / For consumers
switch lived there briefly and was removed: the nav already carries both, and a
control that repeats the navigation is a control that costs a decision for
nothing.

## 2. The words

| Placement | Line | Source |
|---|---|---|
| Company, everywhere | 4orming trust into financial decisions. | Deck cover |
| Brand framework | People &middot; Trust &middot; Clear outcomes | Chad, 24 Sep |
| Front door | Better client understanding. Less work for your team. | Chad, 25 Sep |
| `/personal` | Know more. Decide better. | BMS-001 4ormIQ primary |
| `/professional` | Build the evidence while the decision is happening. | BMS-001 business campaign |
| Close | Check 4orm. Know more. Decide better. | Deck 34 |

The mark stands in for the digit in **4orming**. The digit stays in the text and
the mark is painted over it, so the heading reads correctly to a screen reader, a
scraper and a link preview alike. Two simpler ways of doing that were tried and
rejected; both failures are written into the stylesheet so they are not
reintroduced.

## 3. What was retired

- **`/home`.** A second homepage telling the same story with a different company
  line. Deleted, with a permanent redirect to `/`, out of the sitemap, and the
  one link still pointing at it repointed. `/explore` now lands on `/` too.
- **`assets/homepage.js` and `assets/home-thumb.jpg`**, which only that page used.
- **The gold kicker rule.** Gold was retired from consumer screens in September;
  the small dash before every section label is now blue.

## 4. Every figure carries its source and its limit

Nothing on the site states a number without saying who published it, and nothing
implies a population wider than the sample.

| Figure | Beside it |
|---|---|
| 100%, 73%, 65% of private mortgage files | FSRA Supervision Plan 2025-26, and: a risk-focused sample, not a rate for every mortgage in Ontario |
| 45%, 32% of life and health agents | FSRA 2024-25, and: 92 agents selected for review |
| 105 firms | CSA and CIRO Staff Notice 31-368, December 2025 |
| 90 min, 2 hrs, 5-10% | Vendor-published baselines, and: not 4orm results |
| 47%, 52% | CMHC 2026 Mortgage Consumer Survey |
| 20%, 13% | FCAC mortgage renewal research, June 2026 |
| 93%, 88% | PwC 2024 Trust Survey; Edelman 2026 Trust Barometer |
| 13 October 2026 | BCFSA, with a live count of the days remaining |

The pilot measures are labelled as what a pilot would test, not as results. The
product screens say the clients and data in them are invented. The boundary line
says 4orm supports suitability evidence, does not guarantee compliance, and that
no regulator has reviewed or endorsed a 4orm record.

## 5. Open, and waiting on a decision

1. **The "Did you know?" graphics.** Several figures in them are not in any
   source register and some look invented. The ones to check first: 72% (Thomson
   Reuters), 67% (PwC 2023), 2-3x (Deloitte), 60% (IBM), 70% (EY), 81%
   (Accenture), 3-10+, 28%, >40%, 68%, <10%. The 15-30% Oliver Wyman figure is
   marked "being confirmed" in your own register. None of them are on the site.
2. **The showcase image.** "Better decisions. A clearer record." exists in light
   and dark. The light one is in use because the site is a white ground.
3. **BMS-001 is now behind the site in two places.** Section 02 locks the
   framework as "People. Evidence. Better outcomes." and the platform promise as
   "Better financial decisions start with better relationships." The site follows
   you instead. The standard needs updating or the next document will reopen it.
4. **The word *people*.** BMS-001 says consumer, never person or people. The
   front door says decisions "start with people" because that is how you wrote it.

## 6. Measured, not eyeballed

Last full run, 26 September 2026:

- 22 pages, every one carrying the brand line, no 404s, no broken internal links
- No horizontal overflow at 1440 or at 390
- No console errors, on any page
- The record demo walks, changes, keeps both versions and resets
- All seven screens load, each with a real alt description, reachable by keyboard
- One `h1` per page; no control smaller than 24px; visible focus everywhere
- Checked again with motion turned off
