from kit import (section, tiles, steps, callout, table, tbl_legend, cx_card,
                 cx_grid, cx_para, cx_lines, cx_links, dgrid, tally,
                 partners_section, limits_section, sources_section)

S = []

S.append(section(
    "Your day",
    "One record per customer, at the end of every day.",
    steps([
        ("Money arrives and it is not yours",
         "End user funds land in the account you nominated. Section 20(1) of the Retail Payment "
         "Activities Act gives you three ways to hold them and you had to pick one: a trust "
         "account used for nothing else, a prescribed account and manner, or a segregated account "
         "backed by insurance or a guarantee covering the full balance."),
        ("Every dollar is attributed to a person",
         "The ledger has to carry the name and contact information of each end user whose funds "
         "you hold, and not only a balance. That contact data usually lives in onboarding or "
         "the customer system, and it goes stale without anybody noticing."),
        ("The end of day position is struck",
         "Section 15(2)(b)(ii) of the regulations asks for the amount belonging to each of those "
         "end users at the end of each day. For 400 customer balances that is 146,000 records a "
         "year, and any one of them can be asked for later."),
        ("Somebody compares it to the bank",
         "This is the part the regulation does not actually ask for, and it is worth knowing. "
         "You do it because section 16(1) requires you to identify, as soon as feasible after "
         "it occurs, any instance where the funds held would not have been payable to end users "
         "had an insolvency event occurred. Comparing to the bank is how that gets done in "
         "practice."),
        ("A difference turns up and the clock starts",
         "Section 16(2) requires the root cause to be investigated immediately. Every such "
         "instance, its cause and what you did about it goes into the annual report under section "
         "19(3)(c), which is written up to fifteen months later."),
        ("The framework gets reviewed and approved",
         "The written framework needs senior officer approval at least once a year under "
         "section 15(5), and board approval on the same cycle if you have a board, an annual "
         "review under section 15(6), and a dated record of the review&rsquo;s scope, "
         "methodology and findings under section 15(7)."),
        ("The annual report goes in",
         "By 31 March, through the Bank of Canada&rsquo;s electronic system. Section 19 sets out "
         "what it has to contain, and it is long."),
        ("The independent review comes, whenever it comes",
         "Somebody with no role in building or running the framework tests your compliance with "
         "section 20(1) of the Act and sections 13 to 16 of the regulations. They will ask for the "
         "framework and its version history, the review records, the board approvals, the daily "
         "ledgers, the account agreements, and the log of section 16(1) instances."),
    ]),
    p="Supervision of payment service providers began on 8 September 2025. The duty below is in "
      "force today, there is no bill still to pass, and the firms that owe it are on a public register.",
    tight=True))

# --------------------------------------------------------- what the rule says
S.append(section(
    "What the rule says, and what it does not",
    "Three sections carry almost all of it.",
    tiles([
        ("Section 15 &#183; every day",
         "The written framework and the daily ledger",
         "A written safeguarding of funds framework, which must include a ledger naming each end "
         "user and the amount held for each of them at the end of each day. The ledger is a "
         "content requirement of the framework, not a free standing duty."),
        ("Section 17 &#183; at most every 3 years",
         "The independent review",
         "By a sufficiently skilled individual who had no role in establishing, implementing or "
         "maintaining the framework. Independence is defined by function, not by employer."),
        ("Section 18 &#183; 31 March",
         "The annual report",
         "The only obligation in the regime carrying a fixed statutory date. Every registered "
         "provider owes it every year, covering the previous calendar year."),
    ])
    + "\n\n" + callout(
        "Four things the regulation does not say, all of which get sold to you as though it did.",
        "",
        "It does not require a reconciliation. The words reconcile and reconciliation do not appear "
        "in SOR/2023-229 at any frequency. It does not name a first date for the independent review. "
        "It does not set a period the review must look back over. And it does not require an "
        "auditor for that review, only a sufficiently skilled individual with no role in the "
        "framework. Anyone quoting you a first review date is doing arithmetic from 8 September "
        "2025, not citing the rule.")
    + "\n\n" + callout(
        "There are two different reviews and they bind different firms.",
        "Section 10 covers risk management and binds only a provider that has an internal or "
        "external auditor. Section 17 covers safeguarding and binds every provider holding end "
        "user funds.",
        "Section 15(6) adds a third thing people conflate with both: an annual internal review of "
        "the framework itself.", top=18),
    p="The rules are the Retail Payment Activities Regulations, published as SOR/2023-229. The "
      "duty sold against here is section 15, in force since 8 September 2025.",
    band=True))

# ------------------------------------------------------------- what it costs
S.append(section(
    "What a breach costs",
    "Two regimes, two sets of maximums, and one of them moved this year.",
    table(
        "Maximum penalty for a single violation",
        "As at 19 Aug 2026 &#183; CAD",
        [("Maximum", "num"), ("What it covers", ""), ("Source", ""), ("Since", "")],
        [
            (1, [("$500 a day", "Maximum", "num"),
                 ("A late annual report or late registration information, continued for 30 days "
                  "or less. Beyond 30 days the range is $15,000 to $1,000,000",
                  "What it covers", ""),
                 ("SOR/2023-229, section 48(2)", "Source", "src"),
                 ("8 Sep 2025", "Since", "date")]),
            (1, [("$1,000,000", "Maximum", "num"),
                 ("A serious violation of the payment rules", "What it covers", ""),
                 ("SOR/2023-229, section 48(1)(a)", "Source", "src"),
                 ("8 Sep 2025", "Since", "date")]),
            (2, [("$10,000,000", "Maximum", "num"),
                 ("A very serious violation of the payment rules", "What it covers", ""),
                 ("SOR/2023-229, section 48(1)(b)", "Source", "src"),
                 ("8 Sep 2025", "Since", "date")]),
            (3, [("$4,000,000", "Maximum", "num"),
                 ("One money laundering violation, individual", "What it covers", ""),
                 ("Proceeds of Crime Act, section 73.1(2)", "Source", "src"),
                 ("26 Mar 2026", "Since", "date")]),
            (3, [("$20,000,000", "Maximum", "num"),
                 ("One money laundering violation, company", "What it covers", ""),
                 ("Proceeds of Crime Act, section 73.1(2)", "Source", "src"),
                 ("26 Mar 2026", "Since", "date")]),
            (3, [("3% of revenue", "Maximum", "num"),
                 ("Where one notice covers several violations the maximum is the greater of the "
                  "amounts above and 3 per cent of gross global revenue. For affiliated entities "
                  "that is the group&rsquo;s revenue, not yours",
                  "What it covers", ""),
                 ("Proceeds of Crime Act, sections 73.1(3) and 73.1(4)", "Source", "src"),
                 ("26 Mar 2026", "Since", "date")]),
        ])
    + "\n\n" + callout(
        "The 3 per cent is not a cap. It is the greater of.",
        "",
        "It raises the ceiling rather than lowering it, and where you are part of a group it is "
        "computed on the group&rsquo;s revenue. A small Canadian subsidiary of a large foreign "
        "group is exposed on the group&rsquo;s number.")
    + "\n\n" + callout(
        "And the honest half of this.",
        "As at 19 August 2026 there is no published penalty under the Retail Payment Activities Act.",
        "Every enforcement number a vendor shows you in this category, including the ones on this "
        "page, comes from the money laundering regime rather than from Bank of Canada supervision. "
        "The Bank has published two temporary orders and has said it will begin publishing notices "
        "of violation. The payment rules carry the exposure. They do not yet carry a penalty "
        "record.", top=18),
    p="The payment rules and the money laundering rules can both bind the same firm, watched by "
      "two bodies on two schedules."))

# ---------------------------------------------------------------- overlay
S.append(section(
    "The second regulator",
    "If you are also a money services business, none of it lines up.",
    table(
        "The same firm, two rulebooks",
        "Checked 19 Aug 2026",
        [("Duty", ""), ("Bank of Canada, payment rules", ""), ("FINTRAC, money laundering rules", "")],
        [
            (2, [("The periodic review", "Duty", "k"),
                 ("At least once every 3 years, by a sufficiently skilled individual with no role "
                  "in the framework. Section 17", "Bank of Canada", ""),
                 ("At least every 2 years, by an internal or external auditor, or by you if you "
                  "have no auditor. Starting no later than 24 months from the start of the last one",
                  "FINTRAC", "")]),
            (1, [("The annual filing", "Duty", "k"),
                 ("Annual report by 31 March, contents set by section 19",
                  "Bank of Canada", ""),
                 ("No annual filing. Reports are event driven", "FINTRAC", "")]),
            (3, [("Transfers", "Duty", "k"),
                 ("No transfer level reporting", "Bank of Canada", ""),
                 ("International transfers of $10,000 or more, within 5 business days. Domestic "
                  "transfers of any size are not reportable", "FINTRAC", "")]),
            (3, [("Cash and virtual currency", "Duty", "k"),
                 ("Not addressed", "Bank of Canada", ""),
                 ("Cash of $10,000 or more within 15 calendar days. Virtual currency of $10,000 or "
                  "more within 5 business days", "FINTRAC", "")]),
            (1, [("How long records live", "Duty", "k"),
                 ("Records supporting the safeguarding arrangements, plus dated records of every "
                  "review", "Bank of Canada", ""),
                 ("5 years. Suspicious transaction reports run 5 years from the day they were "
                  "submitted, not from creation", "FINTRAC", "")]),
        ])
    + "\n\n" + callout(
        "A single combined review will not satisfy both regimes without deliberate scoping.",
        "Two years against three, an auditor against a sufficiently skilled individual, and two "
        "different subject matters.",
        "Registration under one regime does not satisfy the other, and your payment registration "
        "application asks whether you are registered with the other."),
    p="Registration with the Bank of Canada does not satisfy the money laundering rules, and "
      "registration with the Financial Transactions and Reports Analysis Centre of Canada does not "
      "satisfy the payment rules. They are cumulative.",
    band=True))

# ------------------------------------------------------------ what goes wrong
S.append(section(
    "What the record actually shows",
    "Every published penalty in this sector turned on a document, not on laundering.",
    tally([
        ("$176,960,190", "Assessed against Xeltox Enterprises Ltd. on 16 October 2025, the largest "
                         "in Canadian history. Failure to submit 1,068 suspicious transaction "
                         "reports and failure to report 1,518 virtual currency transactions of "
                         "$10,000 or more, among other violations. It is under appeal in Federal "
                         "Court and is not final.", False),
        ("$19,552,000", "Peken Global Limited, operating as KuCoin, a foreign money services "
                        "business, 28 July 2025.", False),
        ("$203M", "Published on the money laundering regulator&rsquo;s register across the "
                  "calendar 2025 entries. Xeltox alone is 87 per cent of that. Take it out and "
                  "everything else in the year comes to about $26 million.", False),
        ("23", "Notices of violation issued in the fiscal year to 31 March 2025, the largest number "
               "in the regulator&rsquo;s history, totalling more than $25 million. This is a "
               "different count over a different period from the row above, and the two cannot be "
               "added together.", False),
        ("0", "Published penalties under the Retail Payment Activities Act as at 19 August 2026. "
              "The Bank of Canada&rsquo;s enforcement decisions page reads, in full, that there "
              "are no decisions at this time. It has published two temporary orders, against "
              "XTM Inc. in February 2026, and said in June 2026 that it will begin publishing "
              "notices of violation.", True),
    ])
    + "\n\n" + callout(
        "The pattern in the register is not sophisticated crime.",
        "It is reports not filed, risk not documented, and policies that were never approved by a "
        "named senior officer on a named date.",
        "Those are all things an examiner finds by asking for a document that does not exist.")))

# --------------------------------------------------------------- what is coming
S.append(section(
    "What is coming",
    "Three things the Bank of Canada has said and one it has not put a date on.",
    dgrid([
        ("recurring", "Now", "48 hours", "Material incident reporting.",
         "A material incident must be reported within 48 hours of determining materiality. "
         "A significant change or new activity needs at least 5 business days notice, and "
         "registration information changes need 30 to 60 days.",
         "Bank of Canada reporting obligations"),
        ("ahead", "No date", "Assessment fees", "Cost recovery is coming, unpriced.",
         "The Bank has said regulations will establish a methodology for an annual assessment "
         "fee and that it will begin charging in due course. No formula and no date have been "
         "published, so this is a real forthcoming cost that nobody can budget for yet.",
         "Bank of Canada, retail payments supervision"),
        ("ahead", "2027", "Stablecoins", "A third mandate for the same regulator.",
         "A stablecoin framework was enacted in the budget implementation legislation that "
         "received Royal Assent on 26 March 2026. It is not in force, the Bank of Canada is the "
         "regulator, and it is expected in 2027. Consumer driven banking sits with the Bank of "
         "Canada too, with draft regulations published in the Canada Gazette on 27 June 2026 and "
         "later phases to follow.",
         "Budget 2025 Implementation Act, No. 1"),
    ])
    + "\n\n" + callout(
        "On how many firms are in scope, we will not give you a number.",
        "The Bank of Canada publishes a public register of payment service providers and a list of "
        "applicants, but it publishes no total and no as at date.",
        "Any headline count you are shown, including any we might be tempted to show you, is "
        "somebody&rsquo;s hand count of a page that changes. Go and read the register.")))

# ------------------------------------------------------- where it comes apart
S.append(section(
    "Where it comes apart",
    "The daily part is fine. The proving part is where it goes wrong.",
    steps([
        ("The ledger and the customer record drift",
         "Section 15(2)(b)(i) wants name and contact information for every end user whose funds "
         "you hold. That lives in onboarding. Keeping it current in the ledger is usually a "
         "periodic export, and nobody notices when it stops."),
        ("The comparison to the bank is a spreadsheet",
         "It is the control that discharges section 16(1), and in most firms it is the least "
         "systematised thing in the building."),
        ("The instance log and the annual report are thirteen months apart",
         "Something investigated in February has to be retrieved and narrated the following March, "
         "and again by a reviewer up to three years after that. The investigation itself usually "
         "sits in email or a ticket."),
        ("The evidence has to be dated and scoped",
         "Sections 15(7), 17(2) and 19(3) all ask for records that state the date, the scope, the "
         "methodology and the findings. Working papers without those fail the test even when the "
         "underlying control worked perfectly."),
        ("Proof of approval sits with the corporate secretary",
         "Section 15(5) needs board approval of the framework at least once a year. That evidence "
         "is in minutes, in a different system, owned by a different person."),
    ])
    + "\n\n" + callout(
        "A day that was not recorded cannot be reconstructed, at any price.",
        "Whenever the independent review happens, it reads records that were already made.",
        "That is the whole reason the daily part matters more than the review date does.")))

S.append(section(
    "What we do",
    "Four responsibilities, built to the sections rather than to a sales story.",
    tiles([
        ("01 &#183; every day",
         "It runs the check",
         "The end of day position per end user, struck and held, then compared against the account. "
         "The regulation asks for the ledger. Comparing it is how you discharge section 16(1), and "
         "it is the only way to find a difference on the day it happens."),
        ("02 &#183; as it happens",
         "It surfaces the instance early",
         "A difference goes to a named person the day it appears and closes with the root cause and "
         "what was done, in the structure section 19(3)(c) will ask for next March."),
        ("03 &#183; for the retention period",
         "It keeps the proof",
         "Dated, scoped records with the wording of the rule as it stood. The framework version "
         "history, the section 15(7) review records, the approvals, the instance log."),
        ("04 &#183; on request",
         "It produces the pack",
         "The independent reviewer names a period. The period comes out of the record, with the "
         "date, scope, methodology and findings fields already populated."),
    ], cols=4)
    + "\n\n" + callout(
        "A person always signs.",
        "Nothing is filed until your named senior officer has read it and approved it.",
        "We never hold or move end user funds. We are not a payment service provider, we do not "
        "need to be registered as one, and we are not your compliance officer of record."),
    band=True))

S.append(section(
    "What changes",
    "For the firm, and for whoever owns this today.",
    cx_grid([
        cx_card("The business", "What changes on the books.",
                cx_lines([
                    ("The review stops being a project",
                     "Right now the section 17 review is a scramble to reassemble two or three "
                     "years of evidence. It becomes an export."),
                    ("The annual report writes itself from the log",
                     "Section 19(3)(c) wants every section 16(1) instance, its root cause and the "
                     "remediation. If those were recorded properly when they happened, March is "
                     "an editing job."),
                    ("Two rulebooks, one evidence base",
                     "The two year money laundering review and the three year safeguarding review "
                     "test different things over the same operations. One record can serve both if "
                     "it is scoped for both."),
                    ("You can answer a supervisor in days",
                     "Bank of Canada supervision is new and its examination approach is still "
                     "settling. Being able to produce a dated record quickly is the cheapest form "
                     "of insurance available."),
                ]),
                accent=True),
        cx_card("The person", "What changes for the compliance or finance lead.",
                cx_lines([
                    ("You stop reconstructing February in December",
                     "The hardest part of this job is explaining something that happened ten "
                     "months ago to somebody who was not there."),
                    ("You can show the board a position, not a promise",
                     "Section 15(5) makes the board approve the framework once a year, if you "
                     "have a board. Giving them something to look at makes that a real approval "
                     "rather than a formality."),
                    ("Somebody else&rsquo;s memory stops being a dependency",
                     "Staff change. A record made on the day is the one that still answers the "
                     "question after they have gone."),
                    ("You get to be the person who found it",
                     "Same day rather than same year. That is a different conversation with your "
                     "senior officer."),
                ])),
    ])))

S.append(partners_section())

S.append(limits_section(
    "One more thing specific to this page. We have deliberately left out any count of registered "
    "payment service providers, any first date for the independent review, and any claim that the "
    "regulations require a daily reconciliation. All three are commonly quoted in this category "
    "and none of them can be sourced to the published rule or the published register."))

S.append(sources_section([
    cx_card("The payment rules", "Read the sections yourself.", cx_links([
        ("The regulations", "SOR/2023-229, Retail Payment Activities Regulations",
         "https://laws-lois.justice.gc.ca/eng/regulations/SOR-2023-229/FullText.html"),
        ("The Act", "Retail Payment Activities Act",
         "https://laws-lois.justice.gc.ca/eng/acts/R-7.36/FullText.html"),
        ("Supervision", "Bank of Canada, retail payments supervision",
         "https://www.bankofcanada.ca/core-functions/retail-payments-supervision/"),
        ("The register", "Bank of Canada, payment service provider registry",
         "https://www.bankofcanada.ca/regulatory-oversight/retail-payments/psp-registry/"),
        ("Guidance", "Bank of Canada, resources for payment service providers",
         "https://www.bankofcanada.ca/regulatory-oversight/retail-payments/resources-for-payment-service-providers/"),
        ("Reporting", "Reminder on reporting obligations, June 2026",
         "https://www.bankofcanada.ca/2026/06/reminder-psp-reporting-obligations-under-rpaa/"),
    ]), accent=True),
    cx_card("The money laundering rules", "And the enforcement record.", cx_links([
        ("Penalties", "Proceeds of Crime Act, section 73.1",
         "https://laws-lois.justice.gc.ca/eng/acts/P-24.501/section-73.1.html"),
        ("Obligations", "FINTRAC guidance for money services businesses",
         "https://fintrac-canafe.canada.ca/msb-esm/msb-eng"),
        ("Transfers", "FINTRAC electronic funds transfer reporting",
         "https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/eft-dt/eft-dt-eng"),
        ("The change", "FINTRAC on the new penalty maximums",
         "https://fintrac-canafe.canada.ca/pen/3-eng"),
        ("The register", "FINTRAC public penalty register",
         "https://fintrac-canafe.canada.ca/pen/4-eng"),
        ("Xeltox", "FINTRAC news release, 22 October 2025",
         "https://fintrac-canafe.canada.ca/new-neuf/nr/2025-10-22-eng"),
    ])),
]))

PAGE = {
    "slug": "payments",
    "title": "Payment service providers",
    "desc": "The safeguarding duty under SOR/2023-229, what sections 15, 17 and 18 actually say, "
            "what they do not say, and what 4orm Finance does about the evidence.",
    "hero": (
        "Who it is for &#183; Payments",
        "One Record Per Customer,",
        "At the End of Every Day.",
        "Since 8 September 2025 a payment service provider holding end user funds has had to know, "
        "at the end of every day, how much of the money it holds belongs to each of its customers. "
        "That is 365 records a year for every end user, and any one of them can be asked for later. "
        "Every section on this page is named and linked. Checked 19 August 2026."),
    "sections": S,
}
