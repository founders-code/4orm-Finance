# 4orm Finance, company site

Rebuilt 15 August 2026 after a language audit. Five pages.

| Page | Hook |
|---|---|
| index.html | The money is where it should be. Can you prove it was there in March? |
| the-rules.html | Every rule we cite, with the section it comes from |
| the-problem.html | You are typing the same number into four different places |
| what-we-do.html | One place that tells you what you owe, and shows you it is done |
| contact.html | Not sure whether this applies to you? Ask. |

## The writing rule this rebuild enforces

Copy states the thing. It never narrates the writing of it. Six shapes are
banned outright and the counts below are from before and after the rewrite.

| Banned shape | Before | After |
|---|---|---|
| Negative definition ("not X, Y" / "rather than") | 45 | 12, all load-bearing |
| "somebody" as the universal human | 20 | 0 |
| Announcing plainness or candour | 13 | 0 |
| Elbowing the reader ("notice that", "here is the thing") | 8 | 0 |
| British idiom, British spelling | 6 | 0 |
| Invented personas with a disclaimer | 4 | 0 |

The 12 surviving negatives are the boundary list on what-we-do, where the
negation carries the meaning: we do not hold money, we do not create evidence,
we do not certify compliance, we do not file with a regulator, we give no legal
advice. Plus "we never touch the money" and "the product is not finished."

Also enforced: sentence case headlines, numerals for anything actionable,
Canadian spelling, hyphens on month-end and cut-off and pre-revenue, roles named
rather than "somebody", one date format throughout.

Removed in this pass: the top legend bar. Its text announced the site's own
plainness, which is the same violation.

## Facts and their sources

Every figure is traced to a primary source. Verified 15 August 2026.

- Bank of Canada supervision and safeguarding in force 8 September 2025
- Annual report due 31 March; first independent review due 8 September 2028
- Bill C-12, Royal Assent and in force 26 March 2026, S.C. 2026 c. 4
- Proceeds of Crime Act s. 73.1(2): $4,000,000 individual, $20,000,000 company
- s. 73.1(3): the greater of that and 3 per cent of gross global revenue where
  one notice covers several violations
- Prior maximums: $500,000 company, $100,000 individual
- FINTRAC assessed $176,960,190 against Xeltox Enterprises Ltd, October 2025,
  under appeal
- FINTRAC issued 23 notices totalling more than $25 million in fiscal 2024-25
- Large cash transaction reports within 15 calendar days; terrorist property
  immediately; suspicious transactions as soon as practicable
- Compliance program effectiveness review every 2 years at a minimum
- About 1,600 payment providers registered in Canada in 2025

### Claims cut during the build, do not reinstate without a primary citation

- "30 penalties in 2025 against 8 in 2021." No regulator publishes either.
- "More than $197 million since July 2025." No regulator publishes this total.
- "$30,000,000 for breach of a compliance order." Not in s. 73.1.
- "Minor $40,000 / serious $4M / very serious $20M." The Act splits by person
  and company, not by that tiering.
- "Suspicious transaction reports within 30 days." The standard is as soon as
  practicable.
- "50 registrations cancelled in 2026, 47 crypto." Unsourceable, and it
  conflates cancelled with revoked.

## Before deploying

1. Nav, closing CTA and footer are injected by `assets/chrome.js`. The config
   block at the top of that file holds the nav links, the CTA label and the
   contact address.
2. Run the sweep. All four return nothing:

```
grep -rE '—|–|…' *.html
grep -rE '&mdash;|&ndash;|&rsquo;|&ldquo;' *.html
grep -rinE '\b(AI|LLM|artificial intelligence)\b' *.html assets/chrome.js
grep -rinE 'in plain words|our opinion|held against us|Notice that|programme' *.html
```
