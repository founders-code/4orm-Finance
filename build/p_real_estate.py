from kit import (section, tiles, steps, callout, table, tbl_legend, cx_card,
                 cx_grid, cx_para, cx_lines, cx_links, dgrid, tally,
                 partners_section, limits_section, sources_section)

S = []

# ---------------------------------------------------------------- the job
S.append(section(
    "Your month",
    "Every deposit you take is somebody else&rsquo;s money until closing.",
    steps([
        ("A deposit arrives",
         "A bank draft, a certified cheque or an e-transfer, from a buyer, a tenant or another "
         "brokerage. It may land at a branch, with an agent, or straight into the account "
         "electronically. The agent carrying a draft to the office is where date disputes start."),
        ("A receipt is written",
         "To the payer, and a copy to the file. Usually a receipt book or a template, not the "
         "accounting system."),
        ("It is posted to the trust ledger",
         "Against the specific trade file, which creates the trust liability. The deal lives in "
         "the transaction system. The ledger lives in the accounting software. The two are rarely "
         "joined."),
        ("It goes into the trust account",
         "Ontario gives you five business days from receipt under Ontario Regulation 567/05, "
         "section 17. British Columbia sets timing by situation under section 27 of the Real "
         "Estate Services Act."),
        ("The deal moves and the file moves with it",
         "Amendments, assignments, deposit increases, collapses. Each one changes what you hold "
         "for whom, and each one usually arrives by email to somebody who has to remember to "
         "forward it to accounting."),
        ("Closing, and the money goes out",
         "To the lawyer, to the seller&rsquo;s brokerage, to the co-operating brokerage, or across "
         "to commission trust. The Real Estate Council of Ontario names disbursing before the "
         "deposit has cleared as a recurring failure."),
        ("The bank statement arrives",
         "In Alberta and Ontario the reconciliation clock starts here, not at month end. If the "
         "statement is mailed, or the person who downloads it is away, the clock is already running."),
        ("The reconciliation, then the signature",
         "Bank balance against the cash book against the sum of the individual trust liabilities. "
         "Then the broker, managing broker or broker of record reviews, dates and signs it."),
    ]),
    p="Most of what follows is not hard. It is just numerous, it repeats, and every step is a "
      "place where the record can stop matching the money without anybody noticing.",
    tight=True))

# ------------------------------------------------------- where money sits
S.append(section(
    "Three pots, three sets of rules",
    "Where the money sits while you hold it.",
    tiles([
        ("Deposits on offers",
         "The buyer&rsquo;s money",
         "Held from acceptance to closing or collapse. It belongs to the buyer until the terms of "
         "the trust say otherwise, and a collapsed deal cannot be released without the required "
         "authority."),
        ("Rent and damage deposits",
         "The landlord&rsquo;s and the tenant&rsquo;s",
         "Two kinds of money in one account. Rent is owed up to the landlord, damage deposits are "
         "owed back to the tenant. In Alberta and British Columbia property management trust money "
         "sits under its own division of the rules, separate from trading."),
        ("Commission held pending",
         "Yours, but not yet",
         "Remuneration earned but not payable, or in dispute. British Columbia and Alberta run it "
         "through a separate commission trust account. In Ontario it is trust money until it is "
         "earned."),
    ]),
    p="The unifying rule across all three provinces is the same. The money is impressed with a "
      "trust, it stays apart from the brokerage&rsquo;s own money, it never pays a brokerage "
      "expense, and it comes out only on the terms of the trust.",
    band=True))

# ------------------------------------------------------------- the rules
rules_tbl = table(
    "What each province asks of a brokerage",
    "Checked 19 Aug 2026",
    [("Duty", ""), ("Alberta", ""), ("British Columbia", ""), ("Ontario", "")],
    [
        (3, [("Money into trust", "Duty", "k"),
             ("Set by the Real Estate Act Rules. Part 3 was consulted on in 2024 and the rule "
              "numbers may move, so confirm the current wording with the Real Estate Council "
              "of Alberta", "Alberta", ""),
             ("Section 27 of the Real Estate Services Act, with specific timing rules for "
              "particular situations rather than one flat deadline", "British Columbia", ""),
             ("Within 5 business days of receipt, Ontario Regulation 567/05, section 17",
              "Ontario", "")]),
        (2, [("The monthly reconciliation", "Duty", "k"),
             ("Reviewed and signed by the broker or a delegate within 30 days of the prior "
              "month&rsquo;s bank statement date", "Alberta", ""),
             ("Two of them. A bank reconciliation under section 80 and a trust liability and asset "
              "reconciliation under section 72, both no later than 5 weeks after the monthly "
              "accounting cut-off", "British Columbia", ""),
             ("Not later than 30 days after the monthly account statement is received, Ontario "
              "Regulation 579/05, section 13(1)", "Ontario", "")]),
        (2, [("Who signs it", "Duty", "k"),
             ("The broker, or a delegate appointed under the rules", "Alberta", ""),
             ("Reviewed, dated and initialled by a related managing broker, or by a person "
              "the managing broker designates, section 72(2)", "British Columbia", ""),
             ("The broker of record reviews it monthly", "Ontario", "")]),
        (3, [("A shortfall", "Duty", "k"),
             ("Fund it immediately. No payment may create a negative balance", "Alberta", ""),
             ("Tell the regulator immediately if a compensable loss is possible, and otherwise "
              "where the negative balance is not eliminated within 10 days, section 73",
              "British Columbia", ""),
             ("Immediately notify the Real Estate Council of Ontario and immediately fund it, "
              "Bulletin 8.2", "Ontario", "")]),
        (1, [("How long you keep it", "Duty", "k"),
             ("3 years", "Alberta", ""),
             ("7 years after creation, section 92", "British Columbia", ""),
             ("6 years after the transaction completes, Ontario Regulation 579/05, section 19",
              "Ontario", "")]),
        (1, [("The annual filing", "Duty", "k"),
             ("Fiscal year end report within 3 months of year end, under the policy in force since "
              "1 October 2025", "Alberta", ""),
             ("Financial statements, an accountant&rsquo;s report and a brokerage activity report "
              "within 120 days of year end, section 75", "British Columbia", ""),
             ("An initial filing due 30 October 2026 covering year ends between 1 August 2025 and "
              "31 July 2026, then within 90 days of year end for year ends on or after "
              "1 August 2026, with a broker of record attestation", "Ontario", "")]),
    ])

S.append(section(
    "The rules",
    "Three provinces, three clocks, and none of them start at month end.",
    rules_tbl + "\n\n" + tbl_legend(
        [(3, "Immediate, or within days"), (2, "Monthly"), (1, "Yearly or longer")],
        "The edge colour marks how often the duty comes round, nothing else.")
    + "\n\n" + callout(
        "Two of the three clocks start when the bank statement arrives, not at month end.",
        "Alberta runs 30 days from the prior month&rsquo;s bank statement date and Ontario runs "
        "30 days from the day the statement is received.",
        "A statement that sits unopened for a week has already spent a week of your deadline. "
        "This is the single most common way a brokerage discovers it is late."),
    p="A row written for one province does not describe another. Read the row for the province "
      "you are licensed in."))

# ------------------------------------------------------- the second rulebook
S.append(section(
    "The other rulebook",
    "You are also a reporting entity, on a separate track.",
    tiles([
        ("As soon as practicable",
         "Suspicious transactions",
         "No dollar threshold, and an attempted transaction counts. The clock starts when the "
         "measures that establish reasonable grounds to suspect are complete."),
        ("15 calendar days",
         "Cash of $10,000 or more",
         "In one transaction, or two or more amounts inside a 24 hour window. Reported to the "
         "Financial Transactions and Reports Analysis Centre of Canada."),
        ("Every 2 years",
         "The effectiveness review",
         "Your compliance program has six required parts, and one of them is a review that tests "
         "whether the other five actually work. It must start no later than 24 months from the "
         "start of the last one."),
        ("5 years",
         "How long the records live",
         "Report copies, receipt of funds records, client identification records. This is a "
         "different clock from your provincial retention period, running over the same transactions."),
    ], cols=4)
    + "\n\n" + callout(
        "Nothing in the provincial trust workflow satisfies any of this, and nothing here "
        "satisfies the provincial rules.",
        "Most brokerages run two disconnected sets of paperwork over the same transactions.",
        "That duplication is one of the largest hidden costs in a brokerage back office, and it "
        "is invisible until somebody asks for both at once."),
    p="Real estate brokers and sales representatives are reporting entities under the Proceeds of "
      "Crime (Money Laundering) and Terrorist Financing Act. This sits on top of your provincial "
      "trust rules. It is a separate regime with its own records, its own clock and its own "
      "penalties.",
    band=True))

# ------------------------------------------------------------- what changed
S.append(section(
    "What changed and what is coming",
    "The cost of getting it wrong moved by a factor of 40 this year.",
    dgrid([
        ("past", "In force", "26 Mar 2026", "The money laundering maximums went up.",
         "Bill C-12 received Royal Assent and the new penalty framework took effect the same day. "
         "The maximum for one violation is now $4,000,000 for a person and $20,000,000 for a "
         "company, against $100,000 and $500,000 before. It applies to violations after that date.",
         "Proceeds of Crime Act, section 73.1"),
        ("recurring", "Ontario", "30 Oct 2026", "The first mandatory annual financial filing falls due.",
         "Every Ontario brokerage files financial statement information, trust assets and "
         "liabilities, unclaimed trust money, and a broker of record attestation that a monthly "
         "reconciliation was prepared for every month end in the year and that the signed "
         "reconciliations were reviewed. The first filing is due 30 October 2026 and covers "
         "year ends between 1 August 2025 and 31 July 2026. After that it runs 90 days from "
         "year end.",
         "Real Estate Council of Ontario"),
        ("ahead", "Ontario", "2027", "Monthly reconciliations reported to the regulator.",
         "The Real Estate Council of Ontario has said it plans to move to monthly trust "
         "reconciliation reporting. That turns a document you keep in a drawer into a recurring "
         "filing somebody reads.",
         "Announced, details to follow"),
    ])
    + "\n\n" + callout(
        "Every published penalty against a Canadian real estate brokerage so far was assessed "
        "under the old ceilings.",
        "Century 21 Heritage Group at $148,912.50 and Manor Windsor Realty at $107,250, both of "
        "which are recorded as appealed to the Federal Court and are therefore not final. "
        "LeHomes Realty Premier at $149,886, paid in full.",
        "Those are the numbers people quote. Conduct after 26 March 2026 sits under maximums up "
        "to 40 times higher.")))

# ------------------------------------------------------- where it comes apart
S.append(section(
    "Where it comes apart",
    "The control is a monthly snapshot. The money moves daily.",
    steps([
        ("The record is in six places",
         "Bank statement, trust ledger, the deal file, a spreadsheet, a folder of signed "
         "approvals, an email chain. The proof gets assembled by hand every time it is asked for."),
        ("The clock started before you opened the envelope",
         "Alberta and Ontario both run the reconciliation deadline from the bank statement, not "
         "from month end."),
        ("A signature on a month end snapshot proves nothing about the 12th",
         "Money can leave on the 12th and come back on the 27th and the reconciliation will "
         "balance. That is not a theory. It is what the Real Estate Council of Ontario described "
         "at four Ontario brokerages."),
        ("The rule changes underneath the record",
         "British Columbia renumbered its entire rulebook on 1 August 2021, so rule 7-4 became "
         "section 72. Alberta is rewriting Part 3 now. A record made under the old wording has to "
         "be read against the old wording."),
        ("Production takes weeks",
         "Seven years of retention in British Columbia, six in Ontario, and a separate five year "
         "federal set. A request covering a period years back becomes a search across systems, "
         "cabinets and former staff."),
    ])
    + "\n\n" + callout(
        "On 3 February 2026 the Real Estate Council of Ontario froze the accounts of four Save Max "
        "brokerages.",
        "It found approximately $2.7 million disbursed unlawfully from four real estate trust "
        "accounts, and that the funds were typically replaced before month end.",
        "The reconciliation was not wrong. It ran once a month, against a balance that had been "
        "restored before it looked. The brokerages have publicly disputed the characterisation "
        "and say no funds are missing.")
    + "\n\n" + callout(
        "It is not only Save Max, and it is not only Ontario.",
        "",
        "iPro Realty closed on 19 August 2025 with shortfalls of roughly $10.5 million, later "
        "reduced to under $8 million, on the regulator&rsquo;s own account. Reported in the "
        "trade press: HomeLife Today Realty, about $580,000 in December 2025, and MEhome Realty "
        "and 5I5J Realty, about $525,000 and $40,000 in March 2026. In its 2025 "
        "annual report the Real Estate Council of Ontario paid $2,669,564 on 19 consumer deposit "
        "insurance occurrences and $12,392,407 on 42 commission protection occurrences.", top=18)))

# ---------------------------------------------------------- the regulator sees it
S.append(section(
    "It is already the top finding",
    "Your regulator is looking at exactly this.",
    tally([
        ("1,308", "Brokerage inspections completed by the Real Estate Council of Ontario in 2025, "
                  "up 23 per cent on 2024. 417 of them were trust reconciliation inspections.", False),
        ("210", "Re-inspections. The Council names deficiencies in completing trust account "
                "reconciliations as the most common reason for one.", False),
        ("1", "In its June 2026 newsletter the Council named the monthly reconciliation as the "
              "number one compliance deficiency found in 2026 inspections.", False),
        ("35", "Instances, in a BC Financial Services Authority review of over 120 brokerage "
               "audits reported in August 2023, of a reconciliation not completed inside the "
               "five weeks. A further 29 instances of one not reviewed, dated and initialled.",
               False),
        ("27%", "Share of registered Ontario brokerages the Auditor General of Ontario found, in "
                "her 2022 audit, had never had a full on-site inspection. At a further 35 per "
                "cent there had not been one for at least five years. That gap is closing.",
                False),
    ])
    + "\n\n" + callout(
        "This cuts both ways, and it is worth saying so.",
        "",
        "A regulator finding reconciliation failures in the majority of its re-inspections is "
        "also a regulator that has not, historically, been inspecting most brokerages very often. "
        "The change is that it now is.", top=24),
    p="These are the regulators&rsquo; own published numbers, not ours.",
    band=True))

# ------------------------------------------------------------ what you want
S.append(section(
    "What you are actually asking for",
    "Nobody wants compliance software. They want the question answered.",
    cx_grid([
        cx_card("What we hear", "The sentence, more or less word for word.",
                cx_para("One place that tells me what I owe and shows me it is done. Told the day "
                        "something is off, not five weeks later. And when the Council writes and "
                        "names a date, the answer comes out of a system instead of out of three "
                        "people&rsquo;s memories."),
                accent=True),
        cx_card("What the tools do instead", "Built for a different job.",
                cx_lines([
                    ("Accounting software",
                     "Built to produce financial statements. The trust ledger is a chart of "
                     "accounts entry, not a regulated record with a retention clock."),
                    ("The transaction system",
                     "Built to move a deal to closing. It knows the deposit amount. It does not "
                     "know your bank balance."),
                    ("The spreadsheet",
                     "Built by whoever was here in 2019. It works, right up until they leave."),
                    ("Anti money laundering software",
                     "Built for the federal rulebook. It has nothing to say about a provincial "
                     "trust reconciliation."),
                ])),
    ])))

# --------------------------------------------------------------- what we do
S.append(section(
    "What we do",
    "Four responsibilities, on your rules and your clock.",
    tiles([
        ("01 &#183; daily",
         "It runs the check",
         "Bank against the cash book against the sum of your trust liabilities, every day rather "
         "than once after the statement arrives. Your monthly reconciliation still gets prepared "
         "and signed the way the rule requires. It just stops being the first time anybody looked."),
        ("02 &#183; the day it appears",
         "It surfaces the difference early",
         "A variance goes to a named person the day it shows up, and it closes with a note of "
         "what was done and who did it. Not a queue, and not an inbox."),
        ("03 &#183; for your retention period",
         "It keeps the proof",
         "3 years in Alberta, 7 in British Columbia, 6 in Ontario, 5 for the federal set. The "
         "record and the wording of the rule it was made under stay together, so a 2026 record "
         "still reads against the 2026 rule."),
        ("04 &#183; on request",
         "It produces the pack",
         "An inspection, a spot check or an annual filing attestation is answered from the record "
         "you already hold, including the broker of record attestation that every month end was "
         "prepared and reviewed."),
    ], cols=4)
    + "\n\n" + callout(
        "A person always signs.",
        "Nothing leaves your brokerage until your broker of record has read it and approved it.",
        "The software gathers, checks and drafts. A named human being decides. We never touch the "
        "money."),
    band=True))

# ------------------------------------------------------------- what changes
S.append(section(
    "What changes",
    "For the brokerage, and for the person who currently carries this.",
    cx_grid([
        cx_card("The business", "What changes on the books.",
                cx_lines([
                    ("Month end stops being an event",
                     "The check has already run 30 times. The reconciliation becomes a review and "
                     "a signature rather than two days of assembly."),
                    ("The gap between an event and its discovery closes",
                     "From up to two months to same day. That is the whole difference between "
                     "catching something and explaining it."),
                    ("An inspection is answered, not survived",
                     "The Council asks for a period. The period comes out of the record."),
                    ("The Ontario attestation is already true",
                     "From 1 October 2026 the broker of record signs that every month end was "
                     "prepared and reviewed. Signing that is easier when it is a fact you can see."),
                    ("The federal set stops being a second job",
                     "Same transactions, one record, two retention clocks running off it."),
                ]),
                accent=True),
        cx_card("The person", "What changes for whoever holds this today.",
                cx_lines([
                    ("You stop being the only connection between six systems",
                     "Right now, in most brokerages, one person understands how the whole thing "
                     "fits together. That is a risk to the brokerage and a weight on that person."),
                    ("You can take a week off in the first half of the month",
                     "The deadline arrives whether or not you are available. It should not have to."),
                    ("You are not signing on faith",
                     "A broker of record signs a document somebody else prepared. Seeing the daily "
                     "check behind it is the difference between signing and hoping."),
                    ("You keep your bookkeeper and your accountant",
                     "This replaces the assembling, not the people. Your accountant still does the "
                     "year end."),
                ])),
    ])))

S.append(partners_section())

S.append(limits_section(
    "One more thing specific to this page. The Real Estate Council of Alberta consulted in 2024 "
    "on rewriting and renumbering Part 3 of the Real Estate Act Rules, and no in-force date for "
    "that has been published. We have left Alberta&rsquo;s deposit deadline off this page rather "
    "than print a figure we could not confirm against the current rule text, and the Alberta "
    "retention period is stated without a rule number for the same reason. If you need either "
    "answer, ask the Council directly."))

# ---------------------------------------------------------------- sources
S.append(sources_section([
    cx_card("Provincial", "The three real estate regulators.", cx_links([
        ("Alberta", "Real Estate Council of Alberta, Real Estate Act Rules",
         "https://www.reca.ca/about-reca/legislation-standards/real-estate-act-rules/"),
        ("Alberta", "RECA internal controls bulletin, the source of the 30 day reconciliation rule",
         "https://www.reca.ca/wp-content/uploads/Strengthening-Trust-Account-Administration.pdf"),
        ("Alberta", "Fiscal year end reporting and closing audit policy",
         "https://www.reca.ca/wp-content/uploads/Fiscal-Closing-Reporting-Policy-External-Pdf.pdf"),
        ("Alberta", "Part 3 rules review, phase 2 discussion paper, April 2024",
         "https://www.reca.ca/wp-content/uploads/2024/04/Phase-2-Part-3-Discussion-Paper.pdf"),
        ("British Columbia", "Real Estate Services Rules, B.C. Reg. 209/2021",
         "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/209_2021"),
        ("British Columbia", "BCFSA trust accounts guidelines",
         "https://www.bcfsa.ca/industry-resources/real-estate-professional-resources/knowledge-base/guidelines/trust-accounts-guidelines"),
        ("Ontario", "Trust in Real Estate Services Act, 2002",
         "https://www.ontario.ca/laws/statute/02t30"),
        ("Ontario", "RECO guide to brokerage inspections",
         "https://www.reco.on.ca/wp-content/uploads/Guide_Brokerage-Inspections_vF_web.pdf"),
        ("Ontario", "RECO bulletin 8.2, shortfalls and missing property",
         "https://www.reco.on.ca/agents-and-brokerages/reco-bulletins/reco-bulletin-8-2-shortfalls-and-missing-property"),
        ("Ontario", "RECO annual financial filing requirements",
         "https://www.reco.on.ca/agents-and-brokerages/annual-financial-filing/submission-and-information-requirements"),
    ]), accent=True),
    cx_card("Federal, and the record of what went wrong", "Penalties, cases and counts.", cx_links([
        ("Money laundering", "Proceeds of Crime Act, section 73.1",
         "https://laws-lois.justice.gc.ca/eng/acts/P-24.501/section-73.1.html"),
        ("Money laundering", "FINTRAC guidance for real estate",
         "https://fintrac-canafe.canada.ca/re-ed/real-eng"),
        ("Penalties", "FINTRAC public penalty register",
         "https://fintrac-canafe.canada.ca/pen/4-eng"),
        ("Save Max", "RECO regulatory action, 3 February 2026",
         "https://www.reco.on.ca/news/reco-takes-regulatory-action-involving-four-save-max-brokerages"),
        ("iPro Realty", "RECO update for consumers and agents",
         "https://www.reco.on.ca/news/update-for-consumers-and-agents-ipro-closure"),
        ("Top finding", "RECO, For the Record, June 2026",
         "https://www.reco.on.ca/news/for-the-record-june-2026"),
        ("Inspection numbers", "RECO annual report 2025",
         "https://www.reco.on.ca/wp-content/uploads/RECO-Annual-Report-2025.pdf"),
        ("Oversight gap", "Auditor General of Ontario, RECO follow-up 2024",
         "https://www.auditor.on.ca/en/content/annualreports/arreports/en24/1-16FU_RECO_en24.pdf"),
    ])),
]))

PAGE = {
    "slug": "real-estate",
    "title": "Real estate brokerages",
    "desc": "Trust reconciliation for Alberta, British Columbia and Ontario brokerages. "
            "The deadlines, the shortfall duties, what the regulators are finding, and what "
            "4orm Finance does about it.",
    "hero": (
        "Who it is for &#183; Real estate",
        "The Reconciliation Runs Once a Month.",
        "The Money Moves Every Day.",
        "A brokerage holds deposits, rent, damage deposits and commission that belong to other "
        "people. Three provinces give you three different clocks to prove it, and two of the "
        "three start when the bank statement arrives rather than at month end. Every rule on this "
        "page is named and linked. Checked 19 August 2026."),
    "sections": S,
}
