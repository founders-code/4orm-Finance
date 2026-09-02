# Mortgage discovery: where every question came from

The question set is not invented. It is the list an Ontario mortgage brokerage
is required to establish and document, asked in the words a person uses,
before a broker exists.

## The spine: what FSRA requires a brokerage to establish

From FSRA's Mortgage Product Suitability Assessment guidance. A brokerage must
gather an understanding of the client's:

- employment status and stability (full-time, part-time, contract, probation, unemployed)
- income type and stability (salary, commission, base plus commission, bonus, dividend)
- the property and what is already secured against it
- financial knowledge and mortgage experience
- short- and long-term financing objectives, risk tolerance, and housing timeline
- language barriers or other vulnerability factors
- prior bankruptcy, power of sale or foreclosure

And the standard it sets for the file: *"a third party who has not been involved
in a particular mortgage transaction can re-perform the suitability assessment."*
The file must carry the recommendation **and the rationale for how it meets the
client's unique needs and circumstances**, plus written acknowledgement that the
client understood the options.

**This is why the discovery is deterministic and not generated.** A record that
a stranger has to be able to re-perform cannot come out of something that
answers differently the second time.

## Where each question's answers came from

| Question | Options drawn from |
|---|---|
| Why now | The categories Canadians actually chose: more space for a growing family 31%, a nicer home 25%, current home no longer suitable 24%, somewhere less expensive 10%, closer to friends and family 10%, rental income (72% of first-time buyers called it very important) — Mortgage Professionals Canada 2025 |
| How do you work | FSRA's own employment-stability list |
| Does what you earn change | FSRA's income-type list |
| Where is the down payment from | 23% of buyers received a gift, median $30,000 (CMHC 2026). 70% could not have bought without down payment assistance (MPC 2025). The gift branch exists because a gift needs a letter |
| Which of these matters most | The suitability-defining question. 59% pick a broker for rate, but 28% pick one to understand their options — the second group is never asked this |
| If your payment went up $375 | The real average increase Canadians saw at renewal, CMHC 2026. A concrete number tests risk tolerance better than a scale of one to ten |
| Have you done this before | FSRA: financial knowledge and mortgage experience |

## Why every question offers "I am not sure"

In a 2026 REMIC survey of 1,000 Canadians:

- **68%** could not say what their payment would be at 5% interest
- **59%** could not identify the current interest rate
- **58%** could not recall their own monthly payment without checking
- **34%** regret their current mortgage

Not knowing is the honest answer far more often than the industry admits, and
it is precisely the vulnerability signal FSRA asks a brokerage to record. So an
unknown is stored as an answer with status `needs`, it is marked NOT YET KNOWN
on the read-back, and **it does not count as progress on the meter.** A person
who answers "I do not know" to everything sees 10%, not 98%.

## What a model should and should not do here

| Stays fixed | Belongs to a model |
|---|---|
| The question set, its order and its branches | Free text: "say it in your own words", mapped onto a goal |
| How an answer is stored and dated | The explanation when somebody asks what a term means |
| The meter, and what counts as progress | Reading an uploaded document and raising the questions |
| The read-back of what was said | Checking a message against what is published |

Three seams, unchanged: `ANSWER(q)`, `runSend(key, typed)`, `readDoc(key)`.

## Sources

- FSRA, Mortgage Product Suitability Assessment guidance
- CMHC 2026 Mortgage Consumer Survey (4,100+ respondents, January 2026)
- Mortgage Professionals Canada, 2025 State of the Housing Market, annual consumer survey
- REMIC survey of 1,000 Canadians on mortgage understanding and regret
