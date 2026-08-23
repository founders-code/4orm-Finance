from kit import (section, tiles, steps, callout, table, tbl_legend, cx_card,
                 cx_grid, cx_para, cx_lines, cx_links, dgrid, tally,
                 partners_section, limits_section, sources_section)

S = []

S.append(section(
    "Your month",
    "Three legs have to agree, and the deadline runs from month end.",
    steps([
        ("A retainer arrives",
         "Cheque, transfer, draft, occasionally cash. If cash, the limit bites straight away. Not "
         "more than $7,500 per matter in Alberta and British Columbia, and in Ontario the "
         "prohibition starts at $7,500 rather than above it. Alberta wants a duplicate cash "
         "receipt signed by both the recipient and the payer."),
        ("It goes into the pooled trust account",
         "As soon as practicable, at a qualifying institution, designated as a trust account. Only "
         "money directly related to legal services you are actually providing may go in."),
        ("Two entries, not one",
         "The trust receipts journal and the individual client trust ledger. British Columbia "
         "requires the trust posting within 7 days under Rule 3-72. Ontario requires the records "
         "to be current at all times."),
        ("Money goes out under a lawyer&rsquo;s hand",
         "A cheque signed by a practising lawyer, never to cash or bearer, or an electronic "
         "transfer with dual authentication in British Columbia, or a signed requisition and a "
         "signed printed confirmation in Ontario. In Alberta every withdrawal or transfer must be "
         "approved by a lawyer under Rule 119.27(1)."),
        ("Fees move to general, after the bill",
         "A bill has to be delivered first, and no transfer against a disputed amount."),
        ("Something anomalous creates a shortage the moment it happens",
         "A bounced deposit, a bank service charge debited to trust, a cheque cut against uncleared "
         "funds. Alberta and British Columbia both require it corrected immediately, and the "
         "reporting clock starts at once."),
        ("The bank statement arrives, somewhere between day 1 and day 8",
         "Nothing can start until it lands. This is the first hard dependency and the first place "
         "delay accumulates."),
        ("The three way comparison",
         "Trust assets, being the bank balance adjusted for deposits in transit and outstanding "
         "cheques. Trust liabilities, being every client&rsquo;s unexpended balance. And the book "
         "balance from the trust journal. All three must agree, and any difference has to be "
         "explained in writing on the record itself."),
        ("The responsible lawyer reviews and signs",
         "Which is a separate person from the one who prepared it, and in a small firm that person "
         "is the bottleneck. Ontario has 25 days after the last day of the month, British Columbia "
         "30 days from the effective date, Alberta the end of the following month."),
    ]),
    p="House deposits, settlement money, retainers and estate funds. The work below is the same in "
      "all three provinces. Only the deadlines and the formality of the signature differ.",
    tight=True))

# ----------------------------------------------------------------- the rules
S.append(section(
    "The rules",
    "Same duty, three deadlines, and one province with no self-report at all.",
    table(
        "What each law society asks",
        "Checked 19 Aug 2026",
        [("Duty", ""), ("Alberta", ""), ("British Columbia", ""), ("Ontario", "")],
        [
            (2, [("The monthly reconciliation", "Duty", "k"),
                 ("No later than the end of the following month, Rule 119.37(1). It applies even "
                  "where the balance is nil or there was no activity", "Alberta", ""),
                 ("Within 30 days of the effective date, Rule 3-73(5), and the record must show "
                  "the date it was prepared", "British Columbia", ""),
                 ("Within 25 days after the last day of the month, By-Law 9, section 22(2)",
                  "Ontario", "")]),
            (2, [("Who signs it", "Duty", "k"),
                 ("The responsible lawyer signs and dates it, or shows evidence of review. The "
                  "rule wants the dates of both preparation and review", "Alberta", ""),
                 ("Sign and date, once all three legs agree", "British Columbia", ""),
                 ("By-Law 9 contains no express signature requirement. The Law Society&rsquo;s own "
                  "guidance says the review requires a licensee signature", "Ontario", "")]),
            (3, [("A trust shortage", "Duty", "k"),
                 ("Correct immediately. Report to the Law Society where it exceeds $2,500 whenever "
                  "corrected, or where it is under $2,500 and not corrected within 7 days, "
                  "Rule 119.39", "Alberta", ""),
                 ("Eliminate immediately. Report in writing to the Executive Director where it "
                  "exceeds $2,500, or where you cannot deliver up trust funds when due, Rule 3-74",
                  "British Columbia", ""),
                 ("No express duty to report a shortfall in By-Law 9. The only trace is the "
                  "reasons for any difference noted on the monthly comparison",
                  "Ontario", "")]),
            (1, [("How long you keep it", "Duty", "k"),
                 ("A minimum of ten full years, retrievable on demand", "Alberta", ""),
                 ("At least 10 years from the final accounting transaction, Rule 3-75. "
                  "Non-electronic records at the chief place of practice for at least 3 years",
                  "British Columbia", ""),
                 ("Six years generally, and ten years for the trust records, the client trust "
                  "ledgers, the monthly comparisons, bank statements and electronic transfer "
                  "records, By-Law 9, section 23", "Ontario", "")]),
            (1, [("The annual filing", "Duty", "k"),
                 ("The law firm self report under Rule 119.38, plus the accounting upload or an "
                  "accountant&rsquo;s report. Failure to file suspends the responsible lawyer",
                  "Alberta", ""),
                 ("The trust report under Rule 3-79, within 3 months of the reporting period end. "
                  "Late fees of $200 then $400 a month, suspension after 60 days",
                  "British Columbia", ""),
                 ("The annual report filing by 31 March, under By-Law 8", "Ontario", "")]),
            (3, [("Cash", "Duty", "k"),
                 ("Not more than $7,500 in total from a client for any one matter, Rules 119.56 to "
                  "119.58", "Alberta", ""),
                 ("Must not receive cash over $7,500 in aggregate on any one client matter, "
                  "Rule 3-59", "British Columbia", ""),
                 ("Must not receive cash in an aggregate amount of $7,500 or more on any one client "
                  "file, By-Law 9, section 4(1). Note that Ontario bites at $7,500, not above it",
                  "Ontario", "")]),
        ])
    + "\n\n" + callout(
        "One correction worth carrying back to your own materials.",
        "In British Columbia, Rule 3-73 is the monthly reconciliation and its 30 day deadline. "
        "Rule 3-75 is the ten year retention period.",
        "The two get transposed constantly, including in published summaries. Four Law Society "
        "publications agree on the split, including the Trust Accounting Handbook."),
    p="A row written for one province does not describe another. Read the row for the society you "
      "are called in. The Ontario section numbers are from the By-Law 9 consolidation of "
      "27 April 2017, which is the version the Law Society publishes. It has a project running "
      "to amend By-Laws 9 and 11, so confirm before you rely on a number."))

# ------------------------------------------------------------------- no AML
S.append(section(
    "The gap the Supreme Court left",
    "You are not a reporting entity. Your law society fills it instead.",
    cx_grid([
        cx_card("What the Court held",
                "Canada (Attorney General) v Federation of Law Societies of Canada, 2015 SCC 7.",
                cx_para(
                    "The Court struck down the money laundering regime&rsquo;s application to "
                    "lawyers and law firms. The warrantless search powers failed for inadequate "
                    "protection of solicitor client privilege, and the client identification and "
                    "record keeping requirements breached a principle of fundamental justice the "
                    "Court recognised for the first time: that the state cannot impose duties on "
                    "lawyers that undermine their duty of commitment to their clients&rsquo; "
                    "causes.")
                + "\n" + cx_para(
                    "The Court was explicit that this does not place lawyers above the law, and "
                    "that Parliament retains authority to design a compliant mechanism. As at "
                    "19 August 2026 no federal attempt to do so has been introduced. Mortgage "
                    "lenders, brokers and administrators were brought into the regime by "
                    "regulation on 1 October 2024. The legal profession was not."),
                accent=True),
        cx_card("What fills it", "Three model rules, adopted by all fourteen societies.",
                cx_lines([
                    ("Cash", "$7,500 per client matter, with the exceptions for fees, "
                             "disbursements, bail, fines and financial institutions."),
                    ("Client identification and verification",
                     "Identification, verification on a financial transaction, beneficial "
                     "ownership, source of funds and ongoing monitoring. Alberta adopted the "
                     "current amendments on 1 January 2025."),
                    ("Trust accounting",
                     "Trust accounts may hold only money directly related to legal services "
                     "actually being provided."),
                    ("One carve-out to get right",
                     "British Columbia notaries public and notary corporations are reporting "
                     "entities. Lawyers are not."),
                ])),
    ])
    + "\n\n" + callout(
        "The Federation&rsquo;s own position, and the pressure behind it.",
        "It told the international assessors in 2025 that law society regulation and supervision "
        "establishes a framework that often exceeds the federal one.",
        "That is the argument being tested. The live pressure point on this file is the "
        "international evaluation of Canada, not new legislation."),
    band=True))

# ------------------------------------------------------------ what goes wrong
S.append(section(
    "What goes wrong",
    "The audit happened. The theft continued.",
    cx_grid([
        cx_card("Ontario, 2024", "Two spot audits, and it kept going.",
                cx_para(
                    "A licensee misappropriated $17,972.85 between January and September 2019 and "
                    "a further $5,621.32 between October 2019 and March 2020, to cover business "
                    "expenses. The Tribunal found the firm non-compliant with its books and records "
                    "obligations at two consecutive spot audits, in April 2018 and September 2019, "
                    "and that the misappropriation continued after both. Licence revoked, decision "
                    "released 31 May 2024."),
                accent=True),
        cx_card("Ontario, 2022 to 2024", "Roughly $7 million, and a clean audit in the middle of it.",
                cx_para(
                    "Approximately $7 million was taken from a Toronto firm&rsquo;s client trust "
                    "account, with the theft beginning in 2014. In June 2022 alone, $138,800 left "
                    "the trust account in 28 American Express payments. The Law Society conducted a "
                    "spot audit in August 2022, reviewed those bank statements, and raised no red "
                    "flags. Licences were provisionally suspended in April 2024, criminal fraud "
                    "charges followed in July 2024, and one partner has been disbarred.")),
    ])
    + "\n\n" + callout(
        "This is the uncomfortable part, and it applies to the control you are required to run.",
        "The three way reconciliation catches imbalance. It does not catch dishonesty.",
        "If the same person takes the money and adjusts the client ledger, all three legs still "
        "agree and the reconciliation passes. Both cases above passed through periodic assurance "
        "without the fraud surfacing.")
    + "\n\n" + callout(
        "And the lag, which is structural rather than anybody&rsquo;s fault.",
        "A misappropriation on 1 January is not visible in a reconciliation until the January "
        "close, and the January close is not due until late February.",
        "Measured from the first day of a 31 day month to the reconciliation deadline, that is at "
        "most 55 days in Ontario, 60 in British Columbia and 58 in Alberta between the event and "
        "the first control that could catch it. And only if the reviewer reads the client listing "
        "rather than checking that three totals match.", top=18)))

S.append(section(
    "What it costs the profession",
    "Somebody pays for this, and it is your indemnity fee.",
    tally([
        ("$37,298,000", "The Law Society of Ontario&rsquo;s provision for unpaid compensation fund "
                        "grants at the end of 2024, against $31,875,000 the year before. The "
                        "compensation fund expense for the lawyer pool that year was $8,790,000.",
         False),
        ("26%", "The increase in average claim severity since 2023, reported by the Law Society of "
                "Ontario in November 2025, driving projected costs up even as claim volume fell "
                "slightly. The maximum grant per claim for lawyer dishonesty is $500,000.", False),
        ("$247,831", "Paid on the Alberta misappropriation indemnity in the year to 30 June 2025, "
                     "against $139,936 the year before.", False),
        ("560", "Compliance audits conducted by the Law Society of British Columbia in 2024, with "
                "89 trust reports and audits referred for professional conduct investigation. In "
                "2019, 14.7 per cent of compliance audits resulted in a referral to investigations.",
         False),
        ("5 to 10", "Client files sampled in a British Columbia compliance audit, on the Law "
                    "Society&rsquo;s own description, alongside bank statements, reconciliations "
                    "and client ledgers. The notice letter sets the dates by which each tranche "
                    "is due.", False),
    ])
    + "\n\n" + callout(
        "What a compliance audit actually asks for.",
        "Bank statements, reconciliations, client ledgers and a sample of five to ten client files, "
        "on the Law Society of British Columbia&rsquo;s own description.",
        "Every British Columbia firm with a trust account is audited at least once in a four or "
        "six year cycle depending on its area of practice, and new firms within three years. In "
        "Alberta, solicitor client privilege is not a ground for refusing production to a "
        "compliance auditor, under Rule 119.59."),
    band=True))

S.append(section(
    "What is changing",
    "Three societies, three live files.",
    dgrid([
        ("past", "Alberta", "1 Aug 2026", "The late filing fee structure came out of the rules.",
         "Rules 119.38(5), (6) and (7) were struck out and renumbered in the consolidation "
         "effective this month. The consequence architecture for a late annual filing has changed.",
         "Rules of the Law Society of Alberta, 2026_V3"),
        ("recurring", "Alberta", "1 Jan 2027", "The reporting year moves.",
         "The membership year moves to 1 March through the end of February, and the trust "
         "accounting annual reporting deadline moves with it to the last day of February. Confirm "
         "the current deadline directly with the Law Society, because its published pages do not "
         "yet agree with each other on this.",
         "Law Society of Alberta"),
        ("ahead", "British Columbia", "Under appeal", "The regulator itself is scheduled to change.",
         "The Legal Professions Act received Royal Assent on 16 May 2024. The Law Society&rsquo;s "
         "constitutional challenge was dismissed by the BC Supreme Court on 29 April 2026 and is "
         "under appeal. The Act remains in force. Whether the trust rules are re-issued under a "
         "new regulator is not yet known.",
         "Law Society of British Columbia"),
    ])
    + "\n\n" + callout(
        "Ontario has added one requirement that is already live.",
        "An irrevocable written authorization to the Law Society within 30 days of opening a trust "
        "account, allowing it to obtain trust account information directly from your bank.",
        "The committee recommended it because some licensees refuse or fail to produce records, "
        "delaying audits and investigations. The Law Society is also running a trust account "
        "management and enforcement project with a workstream amending By-Laws 9 and 11. The "
        "amendments have not been published in a form we could read.")))

S.append(section(
    "What we do",
    "Four responsibilities, and the honest limit on the fourth.",
    tiles([
        ("01 &#183; daily",
         "It runs the check",
         "The three way comparison, run every day rather than once after the bank statement "
         "arrives. Your monthly reconciliation still gets prepared, reviewed and signed the way "
         "your rule requires. It just stops being the first time anybody looked."),
        ("02 &#183; the day it appears",
         "It surfaces the difference early",
         "An overdrawn client ledger, a stale-dated cheque, a service charge debited to trust, or "
         "in British Columbia a lawyer&rsquo;s float above the $300 cap in Rule 3-60. Routed to "
         "the responsible lawyer the day it shows, which is also when the shortage reporting "
         "clock starts."),
        ("03 &#183; ten years",
         "It keeps the proof",
         "The record and the wording of the rule it was made under, kept together. Alberta and "
         "British Columbia both want ten years. Ontario wants ten for the trust records and six "
         "for the rest."),
        ("04 &#183; on request",
         "It produces the pack",
         "A compliance audit asks for an 18 month period and a sample of client files, with one to "
         "two weeks to produce the first tranche. That comes out of the record."),
    ], cols=4)
    + "\n\n" + callout(
        "What this does not do, said plainly.",
        "Running the comparison daily closes that gap between an event and its discovery. It "
        "does not make a reconciliation catch a lawyer who adjusts the client ledger at the same "
        "time as taking the money.",
        "What it does do is make every change to a ledger a dated, attributable, unalterable record "
        "that stands beside the original rather than over it. That is a different control from "
        "reconciliation, and it is the one the two Ontario cases needed."),
    band=True))

S.append(section(
    "What changes",
    "For the firm, and for the lawyer who signs.",
    cx_grid([
        cx_card("The firm", "What changes on the books.",
                cx_lines([
                    ("The bookkeeper stops waiting for the bank statement",
                     "The close becomes a review of work already done rather than the start of it."),
                    ("The shortage reporting clock starts on time",
                     "Alberta and British Columbia both trigger on the day the shortage arises. "
                     "You cannot report inside 7 days if you find out in 40."),
                    ("A compliance audit is answered from one place",
                     "Ledgers, reconciliations, statements and the client sample, on the "
                     "society&rsquo;s timetable rather than yours."),
                    ("The annual filing stops being a reconstruction",
                     "The trust report or self report is assembled from records already made."),
                ]),
                accent=True),
        cx_card("The lawyer", "What changes for the responsible lawyer.",
                cx_lines([
                    ("You are not signing on faith",
                     "British Columbia puts it most plainly, at Rule 3-54: the lawyer is "
                     "personally responsible, and the work can be delegated but the "
                     "accountability cannot. Right now most responsible lawyers sign a document "
                     "somebody else prepared, weeks after the events in it."),
                    ("You get to read the substance, not the arithmetic",
                     "Inactive files, unusually large balances, unidentified funds, overdrawn "
                     "client ledgers, fees earned and not withdrawn. That is what the review is "
                     "supposed to be for."),
                    ("Your partners are protected from each other",
                     "Uncomfortable to say and true. The profession&rsquo;s indemnity claims are "
                     "rising in severity, and the cases that drive them were inside firms with "
                     "reconciliations that balanced."),
                    ("You keep your bookkeeper and your accountant",
                     "This replaces the assembling, not the people."),
                ])),
    ])))

S.append(partners_section())

S.append(limits_section(
    "One more thing specific to this page. Several law society sites block automated retrieval, so "
    "some rule text here comes from the societies&rsquo; own handbooks, filing instructions and "
    "practice resources rather than from the rule directory. Where sources disagreed we have said "
    "so on the page, and the Alberta annual filing deadline is one where the Law Society&rsquo;s "
    "own published pages do not currently agree."))

S.append(sources_section([
    cx_card("The three societies", "Rule text and handbooks.", cx_links([
        ("British Columbia", "Trust Accounting Handbook, version 11, January 2026",
         "https://www.lawsociety.bc.ca/getContentAsset/3b95e965-4107-4d0c-af7e-0d274ae902b5/dfc3d011-8f63-43f6-9ed8-4b444333a1d0/Trust-Accounting-Handbook.pdf?language=en-CA"),
        ("British Columbia", "Law Society of British Columbia",
         "https://www.lawsociety.bc.ca/"),
        ("British Columbia", "Compliance audit frequently asked questions",
         "https://www.lawsociety.bc.ca/for-lawyers/trust-assurance-program/compliance-audits/compliance-audit-faqs/"),
        ("Alberta", "Trust bank reconciliations",
         "https://www.lawsociety.ab.ca/resource-centre/key-resources/practice-management/trust-bank-reconciliations/"),
        ("Alberta", "Trust shortage and reporting",
         "https://www.lawsociety.ab.ca/resource-centre/key-resources/practice-management/trust-shortage-and-reporting/"),
        ("Alberta", "Compliance audits",
         "https://www.lawsociety.ab.ca/lawyers-and-students/trust-accounting-and-safety/compliance-audits/"),
        ("Ontario", "By-Law 9, financial transactions and records",
         "https://lawsocietyontario-dwd0dscmayfwh7bj.a01.azurefd.net/media/lso/media/legacy/pdf/b/by/by-law-9-financial-transactions-records-april-27-2017.pdf"),
        ("Ontario", "Key trust account requirements",
         "https://lawsocietyontario-dwd0dscmayfwh7bj.a01.azurefd.net/media/lso/media/lawyers/practice-supports-resources/key-trust-account-requirements-en.pdf"),
    ]), accent=True),
    cx_card("The federal position", "And what it costs the profession.", cx_links([
        ("The case", "Canada (Attorney General) v Federation of Law Societies of Canada, 2015 SCC 7",
         "https://decisions.scc-csc.ca/scc-csc/scc-csc/en/item/14639/index.do"),
        ("Not reporting entities", "FINTRAC special bulletin on the legal profession",
         "https://fintrac-canafe.canada.ca/intel/bulletins/legal-juridique-eng"),
        ("The model rules", "Federation of Law Societies of Canada",
         "https://flsc.ca/"),
        ("Ontario", "Law Society of Ontario 2024 financial statements",
         "https://lawsocietyontario-dwd0dscmayfwh7bj.a01.azurefd.net/media/lso/media/about/annual%20report/2024/financial-statements-2024-en.pdf"),
        ("British Columbia", "Law Society of British Columbia 2024 annual report",
         "https://www.lawsociety.bc.ca/getContentAsset/e14806c7-6cd0-4770-ae76-c19c38bc648e/dfc3d011-8f63-43f6-9ed8-4b444333a1d0/2024-Annual-Report.pdf?language=en-CA"),
        ("Alberta", "Alberta Lawyers Indemnity Association financial statements",
         "https://alia.ca/wp-content/uploads/2025/12/Updated-ALIA-FS-2025-v2.pdf"),
        ("The 2024 case", "Law Times report on the revocation following two spot audits",
         "https://www.lawtimesnews.com/resources/professional-regulation/lso-revokes-license-of-lawyer-who-misappropriated-funds-from-trust-to-cover-expenses-repaying-later/386581"),
        ("The $7 million case", "CBC and Radio-Canada investigation",
         "https://ici.radio-canada.ca/rci/en/news/2194702/law-society-of-ontario-failed-to-spot-toronto-firms-years-long-7m-fraud"),
    ])),
]))

PAGE = {
    "slug": "law-firms",
    "title": "Law firms",
    "desc": "Trust accounting for Alberta, British Columbia and Ontario firms. The three "
            "deadlines, the shortage reporting triggers, what a compliance audit asks for, and "
            "the 55 day gap between an event and the control that would catch it.",
    "hero": (
        "Who it is for &#183; Law firms",
        "Fifty-Five Days Between the Event",
        "and the Control That Would Catch It.",
        "A misappropriation on 1 January is not visible until the January reconciliation, which in "
        "Ontario is not due until 25 February. In two of the largest recent Ontario cases the spot "
        "audits happened and the theft continued anyway. Every rule on this page is named and "
        "linked. Checked 19 August 2026."),
    "sections": S,
}
