# 4orm Finance, the company site

Built 15 August 2026. Five pages, educational, written so a reader meeting this
subject for the first time can follow it.

| Page | What it does |
|---|---|
| index.html | Somebody else is holding your money. Five steps, the fines, the six kinds of firm |
| the-rules.html | Plain-word glossary, the clock, the fines table, the reporting deadlines, who owes what, sources |
| the-problem.html | The mess, four firms, five failures, where the opening is |
| what-we-do.html | The what, the why, the boundary, and what we will not do |
| contact.html | One email is enough |

## The rule this site is built to

What and why, never how. Patent applications are pending, so no page describes
how anything is built. No company estimate, no market size, no forecast and no
pricing appears anywhere.

Every number on the site is published by the body named beside it. Where a claim
could not be traced to a primary source, it was cut rather than softened.

## Claims that were cut during the build

These appeared in a secondary source and did not survive verification against
FINTRAC and Justice Laws Canada. Do not add them back without a primary citation.

- "30 penalties in 2025 against 8 in 2021." No regulator publishes either figure,
  and the public register only keeps five years, so the older number cannot be
  counted.
- "More than $197 million in penalties since July 2025." No regulator publishes
  this total.
- "$30,000,000 for breach of a compliance order." Not found in section 73.1 or in
  any regulator page.
- "Minor $40,000, serious $4,000,000, very serious $20,000,000." The Act does not
  tier it that way. Section 73.1(2) splits by person and company, and the site now
  follows the statute.
- "Suspicious transaction reports are due within 30 days." Wrong. The standard is
  as soon as practicable after the checks are complete.
- "Fifty registrations cancelled in 2026, forty seven of them crypto." Could not
  be sourced, and it conflates cancelled with revoked, which are different things
  in the register.

## What is verified and used

- Bill C-12, Royal Assent and in force 26 March 2026, S.C. 2026 c. 4
- Proceeds of Crime Act s. 73.1(2), $4,000,000 person and $20,000,000 company
- Proceeds of Crime Act s. 73.1(3), the greater of that and 3 per cent of gross
  global income or revenue where one notice covers several violations
- Prior ceilings, $500,000 company and $100,000 individual
- A single penalty of $176,960,190 imposed October 2025, recorded as under appeal
- 23 notices of violation totalling more than $25 million, fiscal 2024 to 2025
- Large cash transaction reports within 15 calendar days
- Terrorist property reports immediately
- Compliance programme effectiveness review every two years at a minimum
- Bank of Canada supervision and safeguarding in force 8 September 2025
- Annual report due 31 March, first independent review due 8 September 2028
- Law society, insolvency, mortgage, insurance and collections rules as cited on
  the rules page

## Before deploying

1. The design system, `assets/styles.css` and `assets/chrome.js`, is the same one
   used on the platform preview build. Nav, legend, closing CTA and footer are
   injected by `chrome.js`. Edit the config block at the top of that file to change
   any of them.
2. Increment the asset paths if you cache-bust. This build ships unversioned and
   relies on the immutable cache header in `vercel.json`.
3. Run the sweep. All four must return nothing:

```
grep -rE '—|–|…' *.html
grep -rE '&mdash;|&ndash;|&rsquo;|&ldquo;' *.html
grep -rinE '\b(AI|LLM|artificial intelligence)\b' *.html assets/chrome.js
grep -rinE '\bhash|append-only|tenant.isolat|vector|inference|corpus\b' *.html
```
