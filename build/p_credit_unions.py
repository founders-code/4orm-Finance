from kit import (section, tiles, steps, callout, table, tbl_legend, cx_card,
                 cx_grid, cx_para, cx_lines, cx_links, dgrid, tally,
                 partners_section, limits_section, sources_section)

S = []

S.append(section(
    "Your year",
    "Two regulators, two calendars, and one set of members.",
    steps([
        ("The core system flags something",
         "Cash at or near $10,000, a pattern that looks structured, an international transfer at "
         "or above the threshold, a behavioural indicator. Most credit unions run this on vendor "
         "software, and the risk assessment that is supposed to drive the rules is a separate "
         "document nobody reconciles against the actual alert configuration."),
        ("An analyst works the queue",
         "Most alerts close as false positives. The decision to close is itself the evidence. If "
         "there are no reasonable grounds to suspect then no report is filed, but the reasoning "
         "has to be defensible to an examiner years later. In most credit unions that reasoning "
         "is free text in a case note."),
        ("Reports go out on three different clocks",
         "Suspicious transactions as soon as practicable, with no dollar floor and attempts "
         "counted. Cash of $10,000 or more within 15 calendar days. International transfers of "
         "$10,000 or more within 5 business days."),
        ("Member records are maintained and kept",
         "Identification at onboarding, beneficial ownership for entities, politically exposed "
         "person determinations, ongoing monitoring. Signature cards, intended use, operating "
         "agreements, deposit slips, statements, credit arrangements. Five years, from creation "
         "or from account closure."),
        ("Finance files the returns, on a different track",
         "In British Columbia that is five or six monthly returns due 20 to 30 days after month "
         "end plus six quarterly ones. In Ontario the monthly information return roughly 21 days "
         "after month end. In Alberta the monthly financial and statistical report to the deposit "
         "guarantor plus periodic returns to the Superintendent."),
        ("Internal audit reports to the board",
         "An annual risk based audit plan, findings reported directly, documented follow-up on "
         "every issue. Those findings and their remediation status become examination evidence."),
        ("The board approves and the approvals have to be provable",
         "Policies approved by a named senior officer on a named date. That evidence often exists "
         "only in minutes, held by the corporate secretary."),
        ("Every two years, somebody tests whether any of it works",
         "The effectiveness review. It has to start no later than 24 months from the start of the "
         "last one, not from the end of it."),
        ("Then an examiner arrives and asks for the documents",
         "The risk assessment. The policies with the approval date. The training records. The "
         "effectiveness review and its remediation. A sample of alert closures. A sample of "
         "member files. The board minutes showing the compliance report was received."),
    ]),
    p="A credit union carries prudential supervision from its province and money laundering "
      "supervision from Ottawa. The prudential side is well systematised in most institutions. "
      "The other side runs on documents.",
    tight=True))

# ------------------------------------------------------------- who regulates
S.append(section(
    "Who is watching",
    "Almost all of you are provincially regulated, and it matters more than it sounds.",
    table(
        "Prudential supervision and deposit protection",
        "Checked 19 Aug 2026",
        [("Province", ""), ("Statute", ""), ("Regulator", ""), ("Deposit protection", "")],
        [
            (2, [("Alberta", "Province", "k"),
                 ("Credit Union Act, RSA 2000, c. C-32", "Statute", ""),
                 ("Office of the Alberta Superintendent of Financial Institutions, with the Credit "
                  "Union Deposit Guarantee Corporation supervising and guaranteeing",
                  "Regulator", ""),
                 ("100 per cent of deposits, no dollar cap, backed by a Government of Alberta "
                  "guarantee", "Deposit protection", "")]),
            (2, [("British Columbia", "Province", "k"),
                 ("Financial Institutions Act and Credit Union Incorporation Act", "Statute", ""),
                 ("BC Financial Services Authority, which also administers the deposit insurer",
                  "Regulator", ""),
                 ("100 per cent of eligible deposits, unlimited since 2008",
                  "Deposit protection", "")]),
            (2, [("Ontario", "Province", "k"),
                 ("Credit Unions and Caisses Populaires Act, 2020, in force 1 March 2022",
                  "Statute", ""),
                 ("Financial Services Regulatory Authority of Ontario", "Regulator", ""),
                 ("$250,000 per depositor for non-registered deposits, unlimited for registered "
                  "ones", "Deposit protection", "")]),
            (1, [("Federal credit unions", "Province", "k"),
                 ("Bank Act, continued under section 35.1", "Statute", ""),
                 ("Office of the Superintendent of Financial Institutions, with the Financial "
                  "Consumer Agency of Canada on conduct", "Regulator", ""),
                 ("Canada Deposit Insurance Corporation, $100,000 per depositor per category, "
                  "9 categories", "Deposit protection", "")]),
        ])
    + "\n\n" + callout(
        "This is where a lot of vendor material gets it wrong, in your favour and against it.",
        "The Office of the Superintendent of Financial Institutions guideline E-23 on model risk, "
        "effective 1 May 2027, binds federally regulated institutions. It does not bind a "
        "provincially regulated credit union in Alberta, British Columbia or Ontario. Neither does "
        "guideline B-13 on technology and cyber risk.",
        "What binds you in Ontario is the Authority&rsquo;s own information technology risk "
        "guidance, in force since 1 April 2024, and its operational risk and resilience guidance, "
        "in force since 1 March 2024. In Alberta it is the deposit guarantor&rsquo;s standards of "
        "sound business and financial practices. Some large credit unions adopt the federal "
        "guidelines voluntarily as a benchmark. That is a board decision, not a legal obligation.")
    + "\n\n" + callout(
        "The one federal layer that binds every one of you.",
        "Money laundering supervision does not care who your prudential regulator is.",
        "A credit union is a financial entity under the Proceeds of Crime (Money Laundering) and "
        "Terrorist Financing Act whether it is provincially or federally regulated.", top=18),
    band=True))

# -------------------------------------------------------------- the filings
S.append(section(
    "The filing calendar",
    "British Columbia publishes the fullest one. It is a fair picture of the load.",
    tiles([
        ("Monthly &#183; 20 days",
         "Financial and statistical, capital, liquidity",
         "The financial and statistical return and the liquidity adequacy return from every "
         "credit union, with the capital adequacy return from the larger tiers. The liquidity "
         "coverage ratio follows at 30 days."),
        ("Quarterly &#183; 20 to 30 days",
         "Six more returns",
         "Quarterly financial and statistical, capital adequacy for the smaller tiers, liquidity "
         "coverage, net cumulative cash flow, the residential mortgage loans report, and a loan "
         "data report new since June 2026."),
        ("Annually &#183; 90 to 150 days",
         "A board attested package",
         "Audited financial statements, an auditor&rsquo;s report on the capital adequacy return, "
         "a directors&rsquo; resolution approving the year end filings, the internal capital "
         "adequacy assessment at 120 days, and a market conduct annual report 31 days after "
         "calendar year end."),
    ])
    + "\n\n" + callout(
        "Ontario runs on the same shape with different names.",
        "A monthly information return roughly 21 days after month end and an annual information "
        "return roughly 74 to 77 days after the reporting date, filed through the Authority&rsquo;s "
        "portal and reviewed by risk analysts and relationship managers.",
        "Alberta sends a monthly financial and statistical report to the deposit guarantor, with "
        "periodic returns and audited annual statements to the Superintendent, an annual return "
        "within 30 days after the annual general meeting, and that meeting within 5 months of "
        "fiscal year end.")))

# ------------------------------------------------------------ what goes wrong
S.append(section(
    "What goes wrong",
    "Four credit unions are on the public penalty register.",
    table(
        "Every credit union penalty published by the money laundering regulator",
        "Register read 19 Aug 2026 &#183; dates are when the penalty was imposed, which is "
        "earlier than the date the register publishes",
        [("Credit union", ""), ("Where", ""), ("Imposed", ""), ("Penalty", "num")],
        [
            (3, [("Synergy Credit Union", "Credit union", "k"),
                 ("Lloydminster, Saskatchewan", "Where", ""),
                 ("26 Sep 2025", "Imposed", "date"),
                 ("$214,500", "Penalty", "num")]),
            (2, [("Cambrian Credit Union", "Credit union", "k"),
                 ("Winnipeg, Manitoba", "Where", ""),
                 ("3 Mar 2025", "Imposed", "date"),
                 ("$116,160", "Penalty", "num")]),
            (2, [("Taiwanese Canadian Toronto Credit Union Limited", "Credit union", "k"),
                 ("Markham, Ontario", "Where", ""),
                 ("1 Nov 2021", "Imposed", "date"),
                 ("$175,000", "Penalty", "num")]),
            (2, [("Libro Credit Union Limited", "Credit union", "k"),
                 ("London, Ontario", "Where", ""),
                 ("12 Oct 2021", "Imposed", "date"),
                 ("$156,750", "Penalty", "num")]),
        ])
    + "\n\n" + callout(
        "Where the regulator itemised the violations, they are almost interchangeable.",
        "For Synergy and for Cambrian, the published sets are: suspicious transactions not "
        "reported, money laundering risk not assessed and documented, written compliance policies "
        "not current or not approved by senior management, and transfer reporting gaps.",
        "None of those is evidence of laundering. They are evidence of process, and they are "
        "found by an examiner asking for a document that does not exist. Cambrian&rsquo;s penalty "
        "followed a 2023 examination. The two 2021 penalties are not itemised in anything the "
        "regulator has published.")
    + "\n\n" + callout(
        "Those four penalties are not a guide to what the same conduct costs now.",
        "All of them were imposed under the old maximums of $100,000 and $500,000.",
        "Since 26 March 2026 the maximum for one violation is $4,000,000 for a person and "
        "$20,000,000 for an entity, or 3 per cent of gross global revenue if that is greater, "
        "computed across the group where entities are affiliated.", top=18),
    band=True))

S.append(section(
    "The new violation",
    "A compliance program that exists is no longer the test.",
    cx_grid([
        cx_card("What changed", "From process to outcome.",
                cx_para("Bill C-12 added a new very serious violation: failing to ensure that a "
                        "compliance program is reasonably designed, risk based and effective. "
                        "Before, the obligation was to have the six required parts. Now the "
                        "obligation is that they work. A program that exists on paper and does "
                        "not function is independently sanctionable at the $20,000,000 tier."),
                accent=True),
        cx_card("What that asks of you", "Evidence that it worked, not that it existed.",
                cx_lines([
                    ("Alert closures", "The reasoning behind a decision not to file, retrievable "
                                       "years later and readable by somebody who was not there."),
                    ("Risk assessment to monitoring rules",
                     "The mapping from the factors you assessed to the rules actually configured "
                     "in the system. Usually a document on one side and a configuration on the other."),
                    ("Policy approval", "Which version, approved by which named senior officer, on "
                                        "which date."),
                    ("Training", "That a specific person completed a specific version of the "
                                 "material."),
                    ("The effectiveness review", "Its working papers, its findings, and what "
                                                 "happened to each finding afterwards."),
                ])),
    ])))

# ------------------------------------------------------- where it comes apart
S.append(section(
    "Where it comes apart",
    "Everywhere the work crosses a system boundary.",
    steps([
        ("The reasoning lives in free text",
         "Alert closure rationales, in case notes, spreadsheets or email. This is the single "
         "largest body of unstructured evidence in a credit union, and it is the first thing an "
         "examiner samples."),
        ("Compliance and finance do not share a system",
         "Reports go one way, returns go the other, and the same underlying transactions have to "
         "reconcile to both."),
        ("Approval evidence sits in minutes",
         "Proving a named senior officer approved a named policy version on a named date usually "
         "means going to the corporate secretary."),
        ("Remediation tracking is a spreadsheet",
         "Findings from internal audit, from the effectiveness review and from the last "
         "examination, each with an owner and a date, each of which an examiner will ask about."),
        ("Everything is fine until somebody asks for all of it at once",
         "The transactions were reportable and the risks were assessable. What was missing in "
         "every published penalty was the artefact proving it was done."),
    ])
    + "\n\n" + callout(
        "There is a second cost, and the industry has said so out loud.",
        "The Canadian Credit Union Association told the House of Commons finance committee that "
        "credit unions need to consolidate to reach the scale required to invest in technology and "
        "to be compliant with the many regulations handed down, and predicted the sector will fall "
        "below 100 institutions by the end of the decade.",
        "In that brief the association counted 185 credit unions and caisses populaires outside "
        "Quebec. Published counts since then do not agree with each other, so we are not printing "
        "one. Alberta had 12 credit unions holding $35.8 billion for 717,006 members at "
        "31 December 2025, on the deposit guarantor&rsquo;s own figures. Compliance cost is not "
        "the only driver of consolidation, but it is the one the sector names first.")))

S.append(section(
    "What we do",
    "Four responsibilities, aimed at the artefact rather than the alert.",
    tiles([
        ("01 &#183; daily",
         "It runs the check",
         "The comparison your rule requires, on the schedule your rule sets, across the member "
         "records and the returns that have to agree with each other."),
        ("02 &#183; as it happens",
         "It surfaces the difference early",
         "A variance goes to a named person the day it appears and closes with the reasoning "
         "recorded in a structure, not in an inbox. That reasoning is what an examiner samples."),
        ("03 &#183; five years, and the wording with it",
         "It keeps the proof",
         "Report copies, member records, policy versions with the approver and the approval date, "
         "training completions, review working papers, and the remediation trail behind each "
         "finding."),
        ("04 &#183; on request",
         "It produces the pack",
         "An examination names a period and a sample. The period and the sample come out of the "
         "record you already hold."),
    ], cols=4)
    + "\n\n" + callout(
        "A person always signs.",
        "Nothing is filed until your compliance officer or a named senior officer has read it and "
        "approved it.",
        "We do not hold member money, we do not decide whether to file a report, and we are not "
        "your compliance officer of record."),
    band=True))

S.append(section(
    "What changes",
    "For the credit union, and for the person who owns compliance.",
    cx_grid([
        cx_card("The institution", "What changes on the books.",
                cx_lines([
                    ("An examination stops being a fire drill",
                     "The documents an examiner asks for are the documents the system already "
                     "holds, dated and scoped."),
                    ("The effectiveness review has something to test",
                     "It stops being an opinion about whether the program works and starts being a "
                     "read of what the program actually did."),
                    ("Scale stops being the only answer to compliance cost",
                     "The sector&rsquo;s stated reason for consolidating is that compliance and "
                     "technology cost too much to carry alone. Software that carries part of it is "
                     "the alternative to a merger, for the institutions that would rather stay "
                     "independent."),
                    ("The board sees a position rather than an assurance",
                     "Which matters more now that the program has to be effective, not merely "
                     "present."),
                ]),
                accent=True),
        cx_card("The person", "What changes for the compliance officer.",
                cx_lines([
                    ("You stop defending a decision you cannot reconstruct",
                     "An alert closed in 2024 gets sampled in 2027 by somebody who was not there. "
                     "Your note is the whole defence."),
                    ("You can show the board what you actually did",
                     "Not a count of reports filed, but the reasoning behind the ones you did not "
                     "file."),
                    ("Somebody leaving stops being an exposure",
                     "In a small credit union the compliance function is one or two people. The "
                     "record should outlast them."),
                    ("You keep your analysts",
                     "This replaces the assembling of evidence, not the judgement. The decision to "
                     "file stays yours."),
                ])),
    ])))

S.append(partners_section())

S.append(limits_section(
    "One more thing specific to this page. We have not printed a current national or provincial "
    "count of credit unions, because the sector association&rsquo;s quarterly data sits behind a "
    "members only login and the public figures do not reconcile with each other or with the "
    "provincial regulators&rsquo; numbers. The one count on this page, 185 outside Quebec, is the "
    "association&rsquo;s own figure from its July 2024 brief to the House of Commons finance "
    "committee. Alberta&rsquo;s figures come from the deposit guarantor&rsquo;s 2025 annual "
    "report. Take Ontario and British Columbia figures from the provincial regulator rather "
    "than from us."))

S.append(sources_section([
    cx_card("Provincial", "Your prudential regulator.", cx_links([
        ("Alberta", "Credit Union Deposit Guarantee Corporation",
         "https://cudgc.ab.ca/our-role/"),
        ("Alberta", "Financial institutions regulatory framework",
         "https://www.alberta.ca/financial-institutions-regulatory-framework"),
        ("British Columbia", "BCFSA credit union filing requirements",
         "https://www.bcfsa.ca/industry-resources/credit-union-resources/credit-union-filing-requirements"),
        ("British Columbia", "BCFSA legislation",
         "https://www.bcfsa.ca/about-us/legislation"),
        ("Ontario", "FSRA rules for credit unions and caisses populaires",
         "https://www.fsrao.ca/regulation/rules/credit-unions-and-caisse-populaires-rules"),
        ("Ontario", "FSRA information technology risk management guidance",
         "https://www.fsrao.ca/regulation/guidance/information-technology-it-risk-management"),
        ("Ontario", "FSRA operational risk and resilience guidance",
         "https://www.fsrao.ca/industry/credit-unions-and-caisses-populaires/regulatory-framework/guidance-credit-unions-and-caisses-populaires/operational-risk-and-resilience"),
    ]), accent=True),
    cx_card("Federal", "The layer that binds everybody.", cx_links([
        ("Penalties", "Proceeds of Crime Act, section 73.1",
         "https://laws-lois.justice.gc.ca/eng/acts/P-24.501/section-73.1.html"),
        ("Obligations", "FINTRAC record keeping for financial entities",
         "https://fintrac-canafe.canada.ca/guidance-directives/recordkeeping-document/record/fin-eng"),
        ("The program", "FINTRAC compliance program requirements",
         "https://fintrac-canafe.canada.ca/guidance-directives/compliance-conformite/Guide4/4-eng"),
        ("The change", "FINTRAC on the new penalty maximums",
         "https://fintrac-canafe.canada.ca/pen/3-eng"),
        ("The register", "FINTRAC public penalty register",
         "https://fintrac-canafe.canada.ca/pen/4-eng"),
        ("Model risk", "OSFI guideline E-23, effective 1 May 2027, federally regulated only",
         "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027-letter"),
    ])),
]))

PAGE = {
    "slug": "credit-unions",
    "title": "Credit unions",
    "desc": "What a provincially regulated credit union in Alberta, British Columbia or Ontario "
            "actually owes, which federal guidelines do not bind you, and what the four published "
            "penalties have in common.",
    "hero": (
        "Who it is for &#183; Credit unions",
        "Four Penalties in Your Sector.",
        "Not One of Them for Laundering.",
        "Four Canadian credit unions appear on the money laundering regulator&rsquo;s public "
        "penalty register. Not one of them was penalised for laundering. They were penalised for "
        "reports not filed, risk not assessed and documented, and policies nobody could show had "
        "been approved. Every rule on this page is named and linked. Checked 19 August 2026."),
    "sections": S,
}
