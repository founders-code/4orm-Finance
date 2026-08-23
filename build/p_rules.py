# -*- coding: utf-8 -*-
from ikit import (section, tiles, callout, table, tbl_legend, cx_card, cx_grid,
                  cx_para, cx_lines, cx_links, dgrid)

S = []

S.append(section(
    "Terms",
    "Nine terms worth knowing.",
    cx_grid([
        cx_card("Money terms", "What the money is called.",
                cx_lines([
                    ("Trust account", "A bank account holding money that belongs to your clients"),
                    ("Safeguarding", "Keeping customer money apart from the firm&rsquo;s own, with evidence"),
                    ("Reconciliation", "Your list of what you hold for each client, checked against the bank"),
                    ("Shortfall", "Less money in the account than your records say should be there"),
                ]), accent=True),
        cx_card("Regulatory terms", "What the authorities are called.",
                cx_lines([
                    ("Regulator", "The body that writes the rules and checks that firms follow them"),
                    ("Registration", "Permission to operate. You apply, the regulator decides"),
                    ("Ceiling", "The maximum a regulator may impose for one breach"),
                    ("Independent review", "A sufficiently skilled individual, internal or external, who had no "
                                           "role in the framework, checking compliance and recording the result"),
                    ("Retention period", "How long the proof has to be kept"),
                ])),
    ])))

S.append(section(
    "In force",
    "Two dates and a limit.",
    dgrid([
        ("past", "Past", "8 Sep 2025", "Supervision began.",
         "The Bank of Canada started supervising payment firms. The safeguarding requirements took effect the same day.",
         "Retail Payment Activities Act"),
        ("recurring", "Every year", "31 Mar", "The annual report is due.",
         "Every registered payment firm files a report covering the year before. The filing window does not move.",
         "SOR/2023-229, section 18"),
        ("ahead", "Ahead", "3 years", "The longest gap between reviews.",
         "An independent review of safeguarding compliance, at least once every three years, by a sufficiently "
         "skilled individual who had no role in building the framework. The regulation names no first date.",
         "SOR/2023-229, section 17"),
    ]) + "\n" + callout(
        "A day that was not recorded cannot be reconstructed.",
        "The review reads backwards.",
        "Whenever it happens, it reads records already made. A day that was not recorded cannot be reconstructed, "
        "at any price."),
    band=True))

S.append(section(
    "The wording",
    "Two sections carry almost all of it.",
    tiles([
        ("Section 15 &middot; every day", "The daily ledger",
         "The safeguarding framework must keep a ledger naming each end user whose funds are held, and show the "
         "amount held for each of them at the end of each day."),
        ("Section 17 &middot; every 3 years at most", "The independent review",
         "A review of safeguarding compliance, carried out by a sufficiently skilled individual who had no role in "
         "establishing, implementing or maintaining the framework. Independent by function, not by employer."),
        ("Section 18 &middot; 31 March", "The annual report",
         "The only obligation in the regime carrying a fixed statutory date. Every registered provider owes it "
         "every year, covering the previous calendar year, without exception."),
    ]) + "\n" + callout(
        "Two things the regulation does not say.",
        "It names no first date for the review, and it imposes no period the review must cover.",
        "Three years is the longest gap allowed between reviews, not a window the reviewer looks back over. Anyone "
        "quoting you a first review date is doing arithmetic, not citing the rule.")
    + "\n" + callout(
        "There are two different reviews, and they bind different firms.",
        "",
        "Section 10 covers risk management and binds only a provider that has an internal or external auditor. "
        "Section 17 covers safeguarding and binds every provider holding end user funds.", top=16),
    p="The rules are the Retail Payment Activities Regulations, published as SOR/2023-229."))

S.append(section(
    "What a breach costs",
    "Maximums for a single violation.",
    table("Maximum penalty for a single violation", "As at 19 Aug 2026 &middot; CAD",
          [("Maximum", "num"), ("What it covers", ""), ("Source", ""), ("Since", "")],
          [(3, [("$1,000,000", "Maximum", "num"), ("Serious breach of the payment rules", "Covers", ""),
                ("Retail Payment Activities Act", "Source", ""), ("8 Sep 2025", "Since", "")]),
           (2, [("$4,000,000", "Maximum", "num"), ("One money laundering violation, individual", "Covers", ""),
                ("Proceeds of Crime Act, s. 73.1(2)", "Source", ""), ("26 Mar 2026", "Since", "")]),
           (2, [("$10,000,000", "Maximum", "num"), ("Very serious breach of the payment rules", "Covers", ""),
                ("Retail Payment Activities Act", "Source", ""), ("8 Sep 2025", "Since", "")]),
           (1, [("$20,000,000", "Maximum", "num"), ("One money laundering violation, company", "Covers", ""),
                ("Proceeds of Crime Act, s. 73.1(2)", "Source", ""), ("26 Mar 2026", "Since", "")]),
           (1, [("3% of revenue", "Maximum", "num"),
                ("Where one notice covers several violations, the cap is the greater of the amounts above and 3 per "
                 "cent of gross global income or revenue", "Covers", ""),
                ("Proceeds of Crime Act, s. 73.1(3)", "Source", ""), ("26 Mar 2026", "Since", "")])])
    + "\n" + tbl_legend([("1", "Company exposure"), ("2", "Individual and serious"), ("3", "Payment rules")],
                        "The edge colour marks the regime, nothing else.")
    + "\n" + callout(
        "In October 2025 the money laundering regulator assessed $176,960,190 against Xeltox Enterprises Ltd.",
        "The largest penalty in Canadian history, and under appeal.",
        "Treat it as an amount imposed rather than collected. In fiscal 2024 to 2025 the regulator issued 23 "
        "notices of violation totalling more than $25 million."),
    p="Before 26 March 2026 the money laundering maximum was $500,000 for a company and $100,000 for an "
      "individual. Bill C-12 received Royal Assent on 26 March 2026 and the new limits took effect the same day.",
    band=True))

S.append(section(
    "Who owes what",
    "A payment firm owes one record per customer, per day.",
    table("Who owes what, and how often", "As at 19 Aug 2026 &middot; 10 rows",
          [("Firm", ""), ("Clock", ""), ("Retention", ""), ("Source", "")],
          [(1, [("Payment firms", "Firm", ""),
                ("A record per customer at the end of every day, plus a report each 31 March", "Clock", ""),
                ("Records supporting the safeguarding arrangements", "Retention", ""),
                ("Retail Payment Activities Act and regulations", "Source", "")]),
           (2, [("Law firms, British Columbia", "Firm", ""), ("Monthly, completed within 30 days", "Clock", ""),
                ("At least 10 years", "Retention", ""), ("Law Society of British Columbia, Rule 3-73", "Source", "")]),
           (2, [("Law firms, Alberta", "Firm", ""), ("Monthly, before the end of the next month", "Clock", ""),
                ("Shortfalls above $2,500, or unfixed after 7 days, are reportable", "Retention", ""),
                ("Law Society of Alberta, Rules 119.37 and 119.39", "Source", "")]),
           (2, [("Law firms, Ontario", "Firm", ""), ("Monthly", "Clock", ""),
                ("Trust records under the society&rsquo;s rule", "Retention", ""),
                ("Law Society of Ontario, By-Law 9", "Source", "")]),
           (2, [("Insolvency trustees", "Firm", ""),
                ("Monthly, within 45 days of the bank statement date", "Clock", ""),
                ("The prescribed supporting records", "Retention", ""),
                ("Superintendent of Bankruptcy, Directive 5R8", "Source", "")]),
           (3, [("Mortgage brokerages, Ontario", "Firm", ""),
                ("Advance payments are trust money on arrival", "Clock", ""), ("6 years", "Retention", ""),
                ("Ontario Regulation 188/08", "Source", "")]),
           (3, [("Mortgage administrators, Ontario", "Firm", ""),
                ("Investor money administered under the same regulation", "Clock", ""), ("6 years", "Retention", ""),
                ("Ontario Regulation 188/08", "Source", "")]),
           (3, [("Insurance brokerages, Ontario", "Firm", ""),
                ("A position report twice a year and at financial year end", "Clock", ""),
                ("Trust, general and equity positions on one page", "Retention", ""),
                ("Registered Insurance Brokers of Ontario, Form 1", "Source", "")]),
           (2, [("Collection agencies, Ontario", "Firm", ""),
                ("Into trust within 2 banking days, paid out by the 20th of the next month", "Clock", ""),
                ("An accounting on request", "Retention", ""), ("Ontario Regulation 74", "Source", "")]),
           (2, [("Property and real estate", "Firm", ""),
                ("Monthly to a provincial council in most provinces", "Clock", ""),
                ("Varies by province", "Retention", ""), ("Provincial real estate legislation", "Source", "")])])
    + "\n" + tbl_legend([("1", "Daily, or on arrival"), ("2", "Monthly"), ("3", "Twice a year or less")],
                        "The edge colour marks how often the record is owed, nothing else."),
    p="For a firm carrying 400 customer balances that is 146,000 records a year, and any one of them can be "
      "requested 18 months later. The other nine rows run on slower clocks. Rules differ by province, and a row "
      "written for one province does not describe another."))

S.append(section(
    "How late the proof may be",
    "Most of this work is proved once a month and signed weeks later.",
    table("How often the position is proved, and how late", "Read 17 Aug 2026",
          [("Who holds it", ""), ("What is proved", ""), ("How late", ""), ("Source", "")],
          [(2, [("Alberta real estate brokerage", "Who", ""),
                ("Monthly bank reconciliation, signed by the broker", "Proved", ""),
                ("30 days after the prior month&rsquo;s statement", "How late", ""),
                ("Real Estate Council of Alberta", "Source", "")]),
           (2, [("Ontario real estate brokerage", "Who", ""), ("Monthly trust reconciliation", "Proved", ""),
                ("30 days after month end", "How late", ""), ("Real Estate Council of Ontario", "Source", "")]),
           (2, [("British Columbia real estate brokerage", "Who", ""),
                ("Monthly bank and trust asset and liability reconciliation", "Proved", ""),
                ("5 weeks after month end", "How late", ""), ("BC Financial Services Authority", "Source", "")]),
           (2, [("Ontario law firm", "Who", ""),
                ("Monthly comparison of trust balances to unexpended balances", "Proved", ""),
                ("25 days after month end", "How late", ""), ("Law Society of Ontario, By-Law 9", "Source", "")]),
           (2, [("British Columbia law firm", "Who", ""), ("Three way monthly reconciliation", "Proved", ""),
                ("30 days after the date", "How late", ""), ("LSBC Trust Accounting Handbook", "Source", "")]),
           (2, [("Alberta law firm", "Who", ""), ("Three way monthly reconciliation", "Proved", ""),
                ("Before the end of the next month", "How late", ""), ("Law Society of Alberta", "Source", "")]),
           (1, [("4orm Finance", "Who", ""), ("Every day", "Proved", ""), ("Same day", "How late", ""),
                ("&mdash;", "Source", "")])])
    + "\n" + callout(
        "Up to sixty days can pass between an event and its confirmation.",
        "",
        "At four Ontario brokerages, roughly $2.7 million was taken from trust accounts and typically replaced "
        "before the month end reconciliation ran. The check was not wrong. It was not often enough to see anything."),
    p="Six Canadian regulators, six monthly cycles. Every deadline below is published by the body named beside it.",
    band=True))

S.append(section(
    "Sources",
    "Read the wording yourself.",
    cx_grid([
        cx_card("Federal", "Payments, money laundering, evidence.",
                cx_links([
                    ("Payments", "Retail Payment Activities Act",
                     "https://laws-lois.justice.gc.ca/eng/acts/R-7.36/page-1.html"),
                    ("The regulations", "SOR/2023-229, Retail Payment Activities Regulations",
                     "https://laws.justice.gc.ca/eng/regulations/SOR-2023-229/FullText.html"),
                    ("Supervision", "Bank of Canada, retail payments supervision",
                     "https://www.bankofcanada.ca/core-functions/retail-payments-supervision/"),
                    ("Safeguarding", "Bank of Canada, safeguarding end user funds",
                     "https://www.bankofcanada.ca/wp-content/uploads/2024/02/safeguarding-end-user-funds.pdf"),
                    ("Money laundering", "Proceeds of Crime Act, section 73.1",
                     "https://laws-lois.justice.gc.ca/eng/acts/P-24.501/"),
                    ("Insolvency", "Superintendent of Bankruptcy",
                     "https://ised-isde.canada.ca/site/office-superintendent-bankruptcy/en"),
                ]), accent=True),
        cx_card("Provincial and professional", "Law societies and Ontario regulations.",
                cx_links([
                    ("Law, BC", "Law Society of British Columbia", "https://www.lawsociety.bc.ca/"),
                    ("Law, Alberta", "Law Society of Alberta", "https://www.lawsociety.ab.ca/"),
                    ("Law, Ontario", "Law Society of Ontario", "https://lso.ca/"),
                    ("Mortgages, collections", "Ontario e-Laws", "https://www.ontario.ca/laws"),
                    ("Insurance, Ontario", "Registered Insurance Brokers of Ontario", "https://www.ribo.com/"),
                    ("Real estate, Ontario", "Real Estate Council of Ontario", "https://www.reco.on.ca/"),
                ])),
    ]),
    p="Checked 19 August 2026. Rules change, so confirm against the current published text before relying on "
      "anything here.",
    sid="sources"))

PAGE = {
    "slug": "the-rules",
    "title": "$20 million changes the cost of compliance",
    "desc": "Every date, deadline and maximum that binds a Canadian firm holding money for other people, cited to its section. Checked 19 August 2026.",
    "hero": ("The rules",
             "$20 million changes",
             "the cost of compliance.",
             "For payment firms, money services businesses and crypto platforms, compliance evidence is no longer "
             "paperwork. It is infrastructure. Every date, deadline and maximum below is cited to its section. This "
             "page is a summary, and the named source governs. Sources checked 19 August 2026."),
    "sections": S,
}
