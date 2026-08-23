# -*- coding: utf-8 -*-
"""Why it is hard. Served at /the-problem so the existing URL keeps working."""
from ikit import hero, section, tiles, steps, callout, cx_card, cx_grid, cx_para

S = []

S.append(section(
    "What the work looks like",
    "The same work, over and over, in six places.",
    tiles([
        ("The spreadsheet", "And then the second one",
         "One file held the balances until it got slow. Now there are two, and a third that checks the first two against each other."),
        ("The accounts", "More than one bank",
         "Different banks for different purposes. Different portals, different export formats, different cut-off times. Each one gets pulled separately."),
        ("The ledgers", "Two systems, one truth",
         "The accounting system says one thing, the operational system says another, and both are answering the question they were built for."),
        ("The same number", "Entered three or four times",
         "Once where it happened, once in the ledger, once in the spreadsheet, once in the report. Every retyping is a chance to be off by a digit."),
        ("The approvals", "Sitting in email",
         "The controller signed off on a variance. The evidence lives in one person&rsquo;s inbox."),
        ("Month-end", "Two days you cannot plan around",
         "It lands whatever else is happening, and one person understands how the whole thing fits together."),
    ]) + "\n" + callout(
        "We hear the same sentence on every call.",
        "I want one place that tells me what I owe and shows me it is done."),
    p="Today that evidence is a spreadsheet for the balances, a second one because the first got slow, "
      "the bank portal in one tab and the accounting system in another, a folder of signed approvals, and "
      "an email thread where the controller explained a variance last March. At month-end you are the only "
      "connection between them."))

S.append(section(
    "Four firms",
    "Same duty, four different shapes.",
    cx_grid([
        cx_card("A payroll bureau", "400 employers, one float account.",
                cx_para("Employer funds land a few days before payday and sit with the bureau until staff are paid. "
                        "At the end of every day the bureau states how much of the balance belongs to which employer. "
                        "Easy on a quiet Tuesday. Harder on the Friday before a long weekend, when four employers "
                        "funded late and one payment bounced back."), accent=True),
        cx_card("A law firm", "11 lawyers, one bookkeeper.",
                cx_para("House deposits, settlement money and retainers sit in the trust account. Each month the "
                        "bookkeeper checks the bank against the firm&rsquo;s list, client by client, inside the window "
                        "the law society sets. A partner signs a report they did not personally check.")),
        cx_card("An insolvency trustee", "300 estates, 300 reconciliations.",
                cx_para("Each bankruptcy is its own pot of money owed to creditors. Every account is reconciled "
                        "monthly, within 45 days of the bank statement date, under a federal directive. Three hundred "
                        "small jobs rather than one large one, every month.")),
        cx_card("A property manager", "1,200 units, two kinds of money.",
                cx_para("Rent belongs to landlords, damage deposits belong to tenants and have to be returned. Both "
                        "sit in trust, tracked unit by unit, reconciled monthly to a provincial council that can ask "
                        "for the working. It runs on a spreadsheet beside the accounting system.")),
    ]),
    band=True))

S.append(section(
    "Where it comes apart",
    "Five record-keeping failures. The money is usually fine.",
    steps([
        ("The record is in six places",
         "Bank statement, two spreadsheets, the accounting system, a folder of signed approvals, an email chain. "
         "The proof gets assembled by hand every time it is asked for."),
        ("The deadline does not move",
         "Monthly, or 45 days, or daily. It arrives whether or not the person who does it is available."),
        ("Variances surface late",
         "A difference between two records gets found during the check, weeks after the day it happened, when the "
         "explanation is hardest to recover."),
        ("The rule changes underneath",
         "A record made in 2026 was made under the 2026 wording. Almost nobody keeps a copy of the rule as it stood."),
        ("Production takes weeks",
         "A request covering a period years back becomes a search across systems, filing cabinets and former staff."),
    ])))

S.append(section(
    "Why now",
    "A live duty, a public list of who owes it, and manual tooling.",
    tiles([
        ("01", "The duty is live",
         "Supervision of payment firms started 8 September 2025. There is no bill still to pass and no industry "
         "consensus to wait for."),
        ("02", "The buyers are published",
         "Registered firms are named publicly on the Bank of Canada&rsquo;s register. The register carries each "
         "firm&rsquo;s registration date and the payment functions it performs."),
        ("03", "A daily duty becomes a habit",
         "An annual duty buys one purchase order. A daily one becomes part of how the firm operates."),
        ("04", "A review is coming, on each firm&rsquo;s own clock",
         "Every provider holding end user funds owes an independent review at least once every three years. The "
         "regulation names no first date and no period the review must cover. Whenever it lands, it reads records "
         "already made."),
        ("05", "The work is manual",
         "Spreadsheets beside accounting systems, month-end scrambles, folders of signed paper. General purpose "
         "tools were built for other jobs."),
        ("06", "The rules are Canadian",
         "Canadian deadlines, Canadian retention periods, provincial professional bodies. Software built for "
         "another country&rsquo;s rulebook does not cross the border."),
    ]),
    band=True))

PAGE = {
    "slug": "the-problem",
    "title": "Compliance has consequences. Evidence is your defence.",
    "desc": "The record sits in six places, the deadline does not move, and production takes weeks. Why proving what you held on a named day is the hard part, and why the money is usually fine.",
    "hero": ("Why it is hard",
             "Compliance has consequences.",
             "Evidence is your defence.",
             "The money is usually fine. The record of it is not. It sits across bank statements, a ledger, a "
             "spreadsheet, an inbox and a filing cabinet, and it gets reassembled by hand under deadline."),
    "sections": S,
}
