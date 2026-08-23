from kit import (section, tiles, steps, callout, table, tbl_legend, cx_card,
                 cx_grid, cx_para, cx_lines, cx_links, dgrid, tally,
                 partners_section, limits_section, sources_section)

S = []

S.append(section(
    "Your month",
    "The client pays you now. The insurer gets paid on the insurer&rsquo;s cycle.",
    steps([
        ("The premium arrives",
         "Cheque, electronic transfer, credit card, increasingly an e-transfer. The first fork is "
         "agency bill against direct bill, and it decides everything downstream. On agency bill "
         "you collect the whole premium and owe the insurer the premium less commission. That "
         "money is the insurer&rsquo;s from the moment it lands."),
        ("It is receipted",
         "Against the client&rsquo;s account in the broker management system. In Ontario the form "
         "matters. Cash received has to be deposited as cash, not converted to a firm cheque."),
        ("It goes into trust",
         "In Ontario, within three banking days of receipt, into an account denoted IN TRUST with "
         "cheques imprinted accordingly. In Alberta and British Columbia there is no deadline and "
         "no prescribed account, and most brokerages run one anyway because the insurer&rsquo;s "
         "agency agreement requires it."),
        ("Then it waits",
         "Insurers issue monthly account current statements, typically due between the 15th and "
         "the 30th of the following month. A client who pays on 2 March may sit in your trust "
         "account until 20 April. That is six to eight weeks of float on other people&rsquo;s "
         "money, entirely lawful, in an account you control."),
        ("You reconcile the insurer&rsquo;s statement",
         "Against your own payables ledger. Endorsements the insurer has not processed, "
         "cancellations you have not booked, commission rate disputes. Every month, on every "
         "insurer."),
        ("You remit, and you move your commission across",
         "Paid out of trust, with commission transferred to the general account at the same time. "
         "In Ontario that transfer is one of a closed list of permitted withdrawals."),
        ("A cancellation creates a debt to the client",
         "The insurer credits you on a later statement. The client is owed now. Until refunded, "
         "that credit is a trust liability sitting on your books as refunds due."),
        ("Month end, then the filing",
         "In Ontario the principal broker completes an internal Form 1 monthly and personally "
         "certifies the filed one. In Alberta and British Columbia there is no prescribed "
         "reconciliation and no financial filing at all."),
    ]),
    p="Four pots of money move through a brokerage and the three provinces treat them very "
      "differently. Only one of the three runs a prescriptive, audited trust regime.",
    tight=True))

S.append(section(
    "Four pots",
    "Whose money it is, at each point.",
    tiles([
        ("Agency bill premium",
         "The insurer&rsquo;s, from the moment it lands",
         "You collected it. You owe it on. In Ontario it is trust money in a designated account. "
         "In Alberta section 504 of the Insurance Act deems it held in trust for the insurer. In "
         "British Columbia Council Rule 7(2) says you must pay it over less authorised deductions."),
        ("Return premium",
         "The client&rsquo;s, and owed before you have it",
         "A cancellation or a downward endorsement creates a credit. The client is owed now, and "
         "the insurer credits you later. This is where the trouble usually starts."),
        ("Claims funds passing through",
         "The claimant&rsquo;s",
         "A settlement cheque routed through the brokerage. In Ontario a claims payment is one of "
         "the enumerated permissible trust withdrawals, which means claims money in your hands is "
         "trust money."),
    ])
    + "\n\n" + callout(
        "Direct bill is the one that is out of scope, and it is also a hazard.",
        "The client pays the insurer, you are paid a commission later, and no trust question "
        "arises.",
        "The mix is where it goes wrong. Most brokerages run both, on different books, for different "
        "insurers, sometimes for different lines with the same insurer. A direct bill payment "
        "accepted at the counter has to be routed into trust and then out again."),
    band=True))

# ----------------------------------------------------------------- the rules
S.append(section(
    "The rules",
    "Ontario is prescriptive. Alberta and British Columbia are not.",
    table(
        "What each province asks of a general insurance brokerage",
        "Checked 19 Aug 2026",
        [("Duty", ""), ("Alberta", ""), ("British Columbia", ""), ("Ontario", "")],
        [
            (3, [("A trust account", "Duty", "k"),
                 ("Not prescribed. Premiums are deemed held in trust for the insurer under section "
                  "504 of the Insurance Act, with no account requirement attached", "Alberta", ""),
                 ("Only where you transact with an unauthorised insurer, Council Rule "
                  "7(11.1)(c)(iv)", "British Columbia", ""),
                 ("Required, at a regulated financial institution, denoted IN TRUST at all times",
                  "Ontario", "")]),
            (3, [("Deposit deadline", "Duty", "k"),
                 ("None prescribed", "Alberta", ""),
                 ("None prescribed", "British Columbia", ""),
                 ("Within 3 banking days of receipt, in original form",
                  "Ontario", "")]),
            (2, [("Reconciliation", "Duty", "k"),
                 ("None prescribed. The Code of Conduct requires you to properly safeguard and "
                  "account for money entrusted to you", "Alberta", ""),
                 ("None prescribed. Council Rule 7(9) requires books and records necessary for the "
                  "proper recording of transactions", "British Columbia", ""),
                 ("An internal Form 1 completed monthly by the principal broker, reconciling trust "
                  "bank to general ledger, premium receivables, insurer payables, and flagging "
                  "receivables over 90 days", "Ontario", "")]),
            (3, [("The trust position", "Duty", "k"),
                 ("Not measured", "Alberta", ""),
                 ("Not measured", "British Columbia", ""),
                 ("Trust assets must cover trust liabilities at all times. There is no dollar "
                  "floor. The test is continuous", "Ontario", "")]),
            (1, [("The filing", "Duty", "k"),
                 ("None. Annual renewal runs 1 May to 30 June and asks for fees, continuing "
                  "education and errors and omissions cover", "Alberta", ""),
                 ("None. An annual fee and annual confirmation of continuing education and errors "
                  "and omissions cover", "British Columbia", ""),
                 ("Form 1 at fiscal year end and again six months after it, each within 90 days of "
                  "its reporting date, certified personally by the principal broker",
                  "Ontario", "")]),
            (1, [("Retention", "Duty", "k"),
                 ("None prescribed", "Alberta", ""),
                 ("None found in the Council Rules or the Code of Conduct", "British Columbia", ""),
                 ("The six year period preceding the most recent fiscal year end",
                  "Ontario", "")]),
        ])
    + "\n\n" + callout(
        "Read that table the other way round before you relax.",
        "Alberta and British Columbia impose no reconciliation, no filing and no retention period. "
        "That is not the same as no exposure.",
        "Section 504 of the Alberta Insurance Act still deems the premium held in trust for the "
        "insurer. The duty to properly safeguard and account for it still bites in both provinces. And in practice most brokerages there run "
        "a trust account anyway, because the insurer&rsquo;s agency agreement requires it. Which "
        "means the obligation is contractual, enforced by the insurer&rsquo;s audit rights rather "
        "than by the council, and nobody outside your firm is checking it until something goes wrong."),
    p="A row written for one province does not describe another. This table covers general "
      "insurance brokerages. Life is different, and section five below explains how."))

# ------------------------------------------------------------ what goes wrong
S.append(section(
    "What goes wrong",
    "Two thirds of Ontario brokerages inspected had financial reporting deficiencies.",
    tally([
        ("68%", "Share of brokerages that received guidance on improving financial reporting and "
                "practices, in the Registered Insurance Brokers of Ontario spot check report "
                "covering 60 completed spot checks in 2024 and 2025. The single largest category "
                "of finding.", False),
        ("15%", "Share of the same 60 spot checks, being 9 files, referred to investigation for "
                "serious concerns including trust fund mishandling and books and records "
                "violations.", False),
        ("667", "New complaints received by the same regulator in the year to 31 July 2025, an "
                "increase of 84 per cent. Cases referred to the discipline committee rose from 9 "
                "to 43.", False),
        ("$46,065", "Taken by one Level 2 agent in client premiums by personal e-transfer between "
                    "2021 and 2023, in the Maxxam Insurance Services matter ordered in October "
                    "2025. Management found out in 2021, did not tell the agency&rsquo;s nominee, "
                    "suspended and then rehired him, and terminated him in January 2023.", False),
        ("$10,254", "Deposited into personal accounts by a British Columbia agent over roughly two "
                    "years, in the Draney matter, ordered in March 2015. The largest single "
                    "component was return premium owed back to clients, not premium owed to "
                    "insurers. Older than the rest of this list, and included because of what "
                    "the largest component was.", False),
    ])
    + "\n\n" + callout(
        "The named deficiencies are the boring ones, and that is the point.",
        "Trust accounts not properly designated or used for operational purposes. Credit balances "
        "over 90 days not refunded to clients in a timely manner. Position report filing errors "
        "and inaccurate balances. Trust deficit positions reported.",
        "The Ontario rule is that the trust position must be positive at all times. It is tested "
        "by a report prepared once a month and filed twice a year. The 68 per cent is the "
        "measurable consequence of that gap.")
    + "\n\n" + callout(
        "Digital payment has outrun the controls.",
        "The Maxxam facts describe money moving by personal e-transfer, a channel that did not "
        "exist when these rules were written and that bypasses the receipting step entirely.",
        "No reconciliation cadence catches a payment that was never receipted in the first place. "
        "That is a real limit on what any of this can do, ours included.", top=18),
    band=True))

# ------------------------------------------------------------- the AML split
S.append(section(
    "The federal split",
    "Life carries the money laundering rules. General insurance does not.",
    cx_grid([
        cx_card("Life insurance", "Inside the regime.",
                cx_lines([
                    ("Who is caught",
                     "Life insurance companies under section 5(c) of the Proceeds of Crime Act. "
                     "Life insurance brokers and agents through section 5(i) and section 17(1) of "
                     "the regulations."),
                    ("What they owe",
                     "A compliance program with six required parts, an effectiveness review every two "
                     "years reported in writing to a senior officer within 30 days, suspicious "
                     "transaction reports, cash of $10,000 or more within 15 calendar days, client "
                     "identification, and information records on policies of $10,000 or more."),
                    ("How long",
                     "Five years, and records produced to the regulator within 30 days of a request."),
                    ("Two carve-outs",
                     "An employed agent does not carry the obligations, the employer does, except "
                     "for suspicious transaction reporting. And managing general agents are not "
                     "subject to these requirements at all."),
                ]),
                accent=True),
        cx_card("General insurance", "Outside it.",
                cx_para(
                    "The Act reaches life companies at section 5(c) and life brokers and agents "
                    "through section 5(i) with section 17(1) of the regulations. Property and "
                    "casualty insurance and reinsurance are simply not enumerated, so a general "
                    "insurance brokerage carries no reporting entity obligations under the "
                    "Proceeds of Crime Act.")
                + "\n" + cx_para(
                    "So the two regimes are close to inverted. General brokerages carry the heavier "
                    "provincial money handling rules, at least in Ontario, and no federal burden. "
                    "Life agencies carry the federal burden and almost no provincial trust rules in "
                    "any of the three provinces. A firm that writes both is running two "
                    "unconnected rulebooks over one set of clients.")),
    ])
    + "\n\n" + callout(
        "Worth saying plainly, because it cuts against us.",
        "There is not one insurance entry anywhere on the money laundering regulator&rsquo;s "
        "public register, which runs from 6 November 2020 to 9 July 2026.",
        "Real estate brokerages, money services businesses, banks, credit unions, casinos, "
        "precious metals dealers, securities dealers and accounting firms are all on it. Insurance "
        "is not. If somebody sells you this on federal enforcement risk, ask them for the case.")))

S.append(section(
    "What is coming",
    "Three provinces, three different directions.",
    dgrid([
        ("past", "In force", "26 Mar 2026", "The money laundering maximums went up.",
         "For life agencies and life agents only. From $100,000 and $500,000 to $4,000,000 for a "
         "person and $20,000,000 for an entity, or 3 per cent of gross global revenue if that is "
         "greater. General insurance is unaffected.",
         "Proceeds of Crime Act, section 73.1"),
        ("recurring", "Ontario", "17 Aug 2026", "The managing general agent consultation has just closed.",
         "The Authority paused its managing general agent rule in February 2026. The Ministry of "
         "Finance then consulted on narrowing licensing while broadening conduct standards, and "
         "submissions closed on 17 August 2026. Where that lands decides who is regulated in the "
         "life distribution chain.",
         "Ontario Ministry of Finance"),
        ("ahead", "British Columbia", "1 Jan 2027", "Restricted insurance agency licensing begins.",
         "Motor vehicle and equipment dealers, credit grantors, deposit taking institutions, "
         "funeral providers, mortgage brokers, portable electronics vendors and others. Transition "
         "runs to 31 March 2027 and applications are expected to open in November 2026. No trust "
         "or money handling obligations have been identified in it.",
         "Insurance Council of British Columbia"),
    ])))

# ------------------------------------------------------- where it comes apart
S.append(section(
    "Where it comes apart",
    "Six places, and most of them are timing rather than dishonesty.",
    steps([
        ("The float",
         "The client pays now, the insurer is paid on the insurer&rsquo;s cycle. Weeks of other "
         "people&rsquo;s money in an account you control, with no mandated reconciliation outside "
         "Ontario."),
        ("Agency bill and direct bill do not reconcile the same way",
         "A direct bill payment received in error, or an agency bill policy the insurer flipped to "
         "direct bill mid term, creates money with no home."),
        ("Return premiums arrive later than they are owed",
         "You are short on that client until the insurer credits you. Funding the refund from "
         "your operating account is fine. Funding it from the pooled trust balance means paying "
         "one client with another client&rsquo;s money, which is the thing the Ontario rule "
         "prohibits outright."),
        ("Statement reconciliation is manual, every month, per insurer",
         "The statement and the broker management system disagree on endorsements, cancellations "
         "and commission rates. Every unreconciled difference is either an unrecorded trust "
         "liability or an overstated trust asset."),
        ("Premium financing crosses the trust boundary",
         "Internally financed premiums must be funded from the operating account into trust before "
         "the insurer is paid, and financed balances over 90 days have to be stripped out of the "
         "reported trust position."),
        ("The obligation is continuous, the test is monthly, the filing is twice a year",
         "That is three different frequencies for one number."),
    ])))

S.append(section(
    "What we do",
    "Four responsibilities, on the trust position rather than on the calendar.",
    tiles([
        ("01 &#183; daily",
         "It runs the check",
         "Trust assets against trust liabilities, every day, which is the standard Ontario "
         "actually sets. Cash, premiums receivable and trust investments against premiums payable, "
         "prepaid premiums, refunds due and sales tax payable."),
        ("02 &#183; the day it appears",
         "It surfaces the difference early",
         "A negative position, an ageing credit balance, an insurer statement that will not "
         "reconcile. Routed to a named person the day it shows, closed with a note of what was done."),
        ("03 &#183; for your retention period",
         "It keeps the proof",
         "Six years plus the current year in Ontario. In Alberta and British Columbia there is no "
         "prescribed period, so the sensible answer is to keep the record for as long as an "
         "insurer or a council could ask, and to know which rule it was made under."),
        ("04 &#183; on request",
         "It produces the pack",
         "The Form 1, the internal monthly one and the filed one, out of the record rather than "
         "out of a spreadsheet. A spot check answered from the same place."),
    ], cols=4)
    + "\n\n" + callout(
        "A person always signs.",
        "In Ontario the principal broker certifies the Form 1 personally. Nothing leaves your "
        "brokerage until that person has read it and approved it.",
        "We never hold premium, we never remit to an insurer, and we do not decide whether your "
        "trust position is compliant."),
    band=True))

S.append(section(
    "What changes",
    "For the brokerage, and for whoever prepares the Form 1.",
    cx_grid([
        cx_card("The business", "What changes on the books.",
                cx_lines([
                    ("The 90 day credit balance stops ageing unseen",
                     "It is a named deficiency in two thirds of inspected Ontario brokerages, and "
                     "it is a money debt to a client, not a bookkeeping nicety."),
                    ("The principal broker signs something they can see",
                     "The certification is personal. It should not be an act of faith in the "
                     "bookkeeper."),
                    ("A spot check is answered rather than survived",
                     "The regulator names a period. The period comes out of the record."),
                    ("Alberta and British Columbia firms get a standard where the rule gives none",
                     "Your insurer&rsquo;s agency agreement is the thing that actually audits you "
                     "out there. Being able to show a clean trust position on demand is the answer "
                     "to that."),
                ]),
                accent=True),
        cx_card("The person", "What changes for the accounting lead.",
                cx_lines([
                    ("The insurer statement stops eating the month",
                     "Differences surface as they arise rather than in a block at statement time."),
                    ("You stop chasing which pot a payment belongs in",
                     "Agency bill, direct bill and financed premium separated at receipt rather "
                     "than reconstructed later."),
                    ("You are not the only person who understands the file",
                     "In most brokerages one person knows how the trust account actually works. "
                     "That is a risk to the firm and a weight on that person."),
                    ("You keep your accountant",
                     "This replaces the assembling. It does not replace the year end, the "
                     "engagement, or your judgement."),
                ])),
    ])))

S.append(partners_section())

S.append(limits_section(
    "One more thing specific to this page. Ontario e-Laws and the Alberta King&rsquo;s Printer both "
    "block automated retrieval, so the section numbers for Regulation 991 and for the Alberta "
    "Insurance Act on this page come from the regulators&rsquo; own published handbooks and from "
    "discipline decisions that quote them, rather than from the statute text. They are consistent "
    "across sources. Confirm them against the instrument before relying on them."))

S.append(sources_section([
    cx_card("Provincial", "The three councils and their rules.", cx_links([
        ("Alberta", "Alberta Insurance Council, legislation and regulations",
         "https://www.abcouncil.ab.ca/licensee-resources/insurance-act-regulations/"),
        ("Alberta", "General Insurance Council Code of Conduct",
         "https://www.abcouncil.ab.ca/wp-content/uploads/2024/08/General-Insurance-Council.pdf"),
        ("British Columbia", "Insurance Council of BC, Council Rules",
         "https://www.insurancecouncilofbc.com/Website/media/Shared/Licensee%20Resources/Resources/Council-Rules.pdf"),
        ("British Columbia", "Insurance Council of BC, Code of Conduct",
         "https://www.insurancecouncilofbc.com/Website/media/Shared/Licensee%20Resources/Resources/Insurance-Council-Code-of-Conduct.pdf"),
        ("Ontario", "Registered Insurance Brokers Act",
         "https://www.ontario.ca/laws/statute/90r19"),
        ("Ontario", "RIBO principal broker handbook, which carries the trust requirements",
         "https://www.ribo.com/trust-requirements/"),
        ("Ontario", "RIBO guidelines for completing Form 1",
         "https://www.ribo.com/wp-content/uploads/2025/01/Form-1_Guidelines-and-Position-Report_2018-1.pdf"),
        ("Ontario", "RIBO 2024 to 2025 spot check report",
         "https://www.ribo.com/about-ribo/publications/other-publications/2024-2025-spot-check-report/"),
    ]), accent=True),
    cx_card("Federal, for life only", "And the enforcement record.", cx_links([
        ("Who is caught", "FINTRAC guidance for life insurance companies, brokers and agents",
         "https://fintrac-canafe.canada.ca/re-ed/li-eng"),
        ("The hook", "Proceeds of Crime Act, section 5",
         "https://laws-lois.justice.gc.ca/eng/acts/P-24.501/section-5.html"),
        ("The regulations", "SOR/2002-184, section 17(1)",
         "https://laws-lois.justice.gc.ca/eng/regulations/SOR-2002-184/FullText.html"),
        ("Penalties", "Proceeds of Crime Act, section 73.1",
         "https://laws-lois.justice.gc.ca/eng/acts/P-24.501/section-73.1.html"),
        ("The register", "FINTRAC public penalty register, with no insurance entry on it",
         "https://fintrac-canafe.canada.ca/pen/4-eng"),
        ("Ontario life and managing general agents", "FSRA life agent reporting requirements",
         "https://www.fsrao.ca/industry/life-and-health-insurance/regulatory-framework/guidance-life-and-health-insurance-and-property-and-casualty-and-general-insurance/life-agent-reporting-requirements-and-related-insurer-obligations"),
    ])),
]))

PAGE = {
    "slug": "insurance",
    "title": "Insurance agencies and brokerages",
    "desc": "Premium trust money in Alberta, British Columbia and Ontario. The float, the Form 1, "
            "the 68 per cent deficiency rate, and where life and general insurance diverge.",
    "hero": (
        "Who it is for &#183; Insurance",
        "Six Weeks of Somebody Else&rsquo;s Money,",
        "In an Account You Control.",
        "A client pays a premium today. The insurer is paid on the insurer&rsquo;s statement cycle, "
        "weeks later. In Ontario your trust position has to cover your trust liabilities the whole "
        "time, tested by a report prepared once a month and filed twice a year. In Alberta and "
        "British Columbia nobody prescribes a test at all. Checked 19 August 2026."),
    "sections": S,
}
