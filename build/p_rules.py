# -*- coding: utf-8 -*-
import kit, pkit
from pkit import hero, sec, segmented, panel, Panes, duty, scale, timeline, softs, note, sources, cta


def build():
    S = []

    S.append(sec("In force", "Two dates bind you, and one gap.",
        timeline([
            ("PAST  8 Sep 2025", "Supervision began.",
             "The Bank of Canada started supervising payment firms. The safeguarding requirements took "
             "effect the same day, and every day since has owed a record.",
             "Retail Payment Activities Act", "now"),
            ("EVERY YEAR  31 Mar", "The annual report is due.",
             "Every registered payment firm files a report covering the year before. This is the only "
             "obligation in the regime carrying a fixed statutory date. The window does not move.",
             "SOR/2023-229, section 18", ""),
            ("AHEAD  3 years", "The longest gap between reviews.",
             "An independent review of safeguarding compliance, at least once every three years, by a "
             "sufficiently skilled individual who had no role in building the framework. The regulation "
             "names no first date, and it imposes no period the review must cover.",
             "SOR/2023-229, section 17", "next"),
        ]) + note("w", "<b>A day that was not recorded cannot be reconstructed.</b> The review reads "
                       "backwards. Whenever it happens, it reads records already made, and no amount of "
                       "money buys back a day nobody wrote down."),
        p="Every date and maximum on this page is cited to its section. This page is a summary and the "
          "named source governs. Sources checked 19 August 2026."))

    S.append(sec("The wording", "Two sections carry almost all of it.",
        softs([
            ("Section 15 &middot; every day", "The daily ledger",
             "The safeguarding framework must keep a ledger naming each end user whose funds are held, "
             "and show the amount held for each of them at the end of each day.", "blue"),
            ("Section 17 &middot; every 3 years at most", "The independent review",
             "Carried out by a sufficiently skilled individual who had no role in establishing, "
             "implementing or maintaining the framework. Independent by function, not by employer.", "gold"),
            ("Section 18 &middot; 31 March", "The annual report",
             "Every registered provider owes it every year, covering the previous calendar year, "
             "without exception.", "ok"),
        ]) + note("i",
            "<b>Two things the regulation does not say.</b> It names no first date for the review, and it "
            "imposes no period the review must look back over. Three years is the longest gap allowed "
            "between reviews. Anyone quoting you a first review date is doing arithmetic, not citing the "
            "rule.") +
        note("m", "<b>There are two different reviews, and they bind different firms.</b> Section 10 covers "
                  "risk management and binds only a provider that has an internal or external auditor. "
                  "Section 17 covers safeguarding and binds every provider holding end user funds."),
        p="The rules are the Retail Payment Activities Regulations, published as SOR/2023-229.",
        alt=True))

    S.append(sec("What a breach costs", "The ceiling rose by up to 40 times in March 2026.",
        scale([
            ("Money laundering, company, before 26 March 2026", "$500,000", 3, "var(--border-strong)"),
            ("Payment rules, serious breach", "$1,000,000", 5, "var(--gold-dp)"),
            ("Money laundering, individual, now", "$4,000,000", 20, "var(--warn)"),
            ("Payment rules, very serious breach", "$10,000,000", 50, "var(--blue)"),
            ("Money laundering, company, now", "$20,000,000", 100, "var(--bad)"),
        ]) + note("m",
            "Money laundering figures from section 73.1 of the Proceeds of Crime (Money Laundering) and "
            "Terrorist Financing Act, as amended by Bill C-12, in force 26 March 2026. Payment figures from "
            "the Retail Payment Activities Act. All bars share one scale, and it starts at zero.") +
        note("w", "<b>In October 2025 the money laundering regulator assessed $176,960,190 against Xeltox "
                  "Enterprises Ltd.</b> The largest penalty in Canadian history, and under appeal. Treat it "
                  "as an amount imposed rather than collected. In fiscal 2024 to 2025 the regulator issued "
                  "23 notices of violation totalling more than $25 million."),
        p="A ceiling is the maximum a regulator may impose for one breach. Until 26 March 2026 the money "
          "laundering maximum for a company was $500,000. It is now $20,000,000, or 3 per cent of worldwide "
          "revenue where one notice covers several violations, whichever is greater."))

    CLOCKS = [
        ("daily", "Daily or on arrival", [
            ("Payment firms", "A record per customer at the end of every day, plus a report each 31 March.",
             "Retail Payment Activities Act and regulations"),
            ("Collection agencies, Ontario", "Into trust within 2 banking days, paid out by the 20th of "
             "the next month.", "Ontario Regulation 74"),
            ("Mortgage brokerages, Ontario", "Advance payments become trust money on arrival. Records kept "
             "6 years.", "Ontario Regulation 188/08"),
        ]),
        ("monthly", "Monthly", [
            ("Law firms, British Columbia", "Monthly, completed within 30 days. Records kept at least 10 years.",
             "Law Society of British Columbia, Rule 3-73"),
            ("Law firms, Alberta", "Monthly, before the end of the next month. Shortfalls above $2,500, or "
             "unfixed after 7 days, are reportable.", "Law Society of Alberta, Rules 119.37 and 119.39"),
            ("Law firms, Ontario", "Monthly, within 25 days of month end.", "Law Society of Ontario, By-Law 9"),
            ("Insolvency trustees", "Monthly, within 45 days of the bank statement date.",
             "Superintendent of Bankruptcy, Directive 5R8"),
            ("Property and real estate", "Monthly to a provincial council in most provinces. Retention "
             "varies by province.", "Provincial real estate legislation"),
        ]),
        ("periodic", "Twice a year or less", [
            ("Insurance brokerages, Ontario", "A position report twice a year and at financial year end.",
             "Registered Insurance Brokers of Ontario, Form 1"),
            ("Mortgage administrators, Ontario", "Investor money administered under the same regulation. "
             "Records kept 6 years.", "Ontario Regulation 188/08"),
        ]),
    ]
    panes = Panes("clock", [(k, "".join(duty(a, b, c) for a, b, c in rows)) for k, _, rows in CLOCKS])
    S.append(sec("Who owes what", "A payment firm owes one record per customer, per day.",
        segmented("clock", [(k, lab) for k, lab, _ in CLOCKS]) +
        panel("Who owes what, and how often", '<span class="pl">As at 19 Aug 2026</span>', panes) +
        note("m", "For a firm carrying 400 customer balances that is 146,000 records a year, and any one of "
                  "them can be requested 18 months later. Rules differ by province, and a row written for "
                  "one province does not describe another."),
        p="Pick the clock you run on. The other rows are somebody else's month.",
        alt=True))

    S.append(sec("Sources", "Read the wording yourself.",
        sources([
            ("Federal", [
                ("Payments", "Retail Payment Activities Act",
                 "https://laws-lois.justice.gc.ca/eng/acts/R-7.36/page-1.html"),
                ("The regulations", "SOR/2023-229",
                 "https://laws.justice.gc.ca/eng/regulations/SOR-2023-229/FullText.html"),
                ("Supervision", "Bank of Canada, retail payments supervision",
                 "https://www.bankofcanada.ca/core-functions/retail-payments-supervision/"),
                ("Safeguarding", "Bank of Canada, safeguarding end user funds",
                 "https://www.bankofcanada.ca/wp-content/uploads/2024/02/safeguarding-end-user-funds.pdf"),
                ("Money laundering", "Proceeds of Crime Act, section 73.1",
                 "https://laws-lois.justice.gc.ca/eng/acts/P-24.501/"),
            ]),
            ("Provincial and professional", [
                ("Law, BC", "Law Society of British Columbia", "https://www.lawsociety.bc.ca/"),
                ("Law, Alberta", "Law Society of Alberta", "https://www.lawsociety.ab.ca/"),
                ("Law, Ontario", "Law Society of Ontario", "https://lso.ca/"),
                ("Mortgages, collections", "Ontario e-Laws", "https://www.ontario.ca/laws"),
                ("Insurance, Ontario", "Registered Insurance Brokers of Ontario", "https://www.ribo.com/"),
                ("Real estate, Ontario", "Real Estate Council of Ontario", "https://www.reco.on.ca/"),
            ]),
        ]),
        p="Checked 19 August 2026. Rules change, so confirm against the current published text before "
          "relying on anything here.", sid="sources"))

    S.append(cta("Not sure which of these binds you?",
                 "Tell us what your firm does and who regulates it. We will tell you plainly whether the "
                 "duty applies, what it asks for, and what it leaves alone.",
                 ("Talk to us", "/contact"), ("Experience 4orm", "/")))

    body = hero("The rules", "$20 million changed", "the cost of compliance.",
                "For payment firms, money services businesses and crypto platforms, compliance evidence is "
                "no longer paperwork. It is infrastructure.") + "".join(S)

    yield kit.write("rules", "/the-rules", "$20 million changed the cost of compliance",
                    "Every date, deadline and maximum that binds a Canadian firm holding money for other "
                    "people, cited to its section. Checked 19 August 2026.", body)
