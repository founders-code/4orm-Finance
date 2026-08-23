# -*- coding: utf-8 -*-
from ikit import section, tiles, steps, callout, table, cx_card, cx_grid, cx_para, cx_lines, ol

S = []

S.append(section(
    "What it does",
    "Four responsibilities.",
    tiles([
        ("01 &middot; daily or monthly", "It runs the check",
         "The comparison your rule requires, on the schedule your rule sets."),
        ("02 &middot; as it happens", "It surfaces variances early",
         "A difference between two records goes to a named person the day it appears, and closes with a note of "
         "what was done."),
        ("03 &middot; for the retention period", "It keeps the proof",
         "The record and the wording of the rule it was made under stay together. Six years, 10 years, whatever "
         "applies to you."),
        ("04 &middot; on request", "It produces the pack",
         "A request covering a period years back is answered from the record you already hold."),
    ], cols=4) + "\n" + callout(
        "A person always signs.",
        "Nothing leaves the firm until an authorised signatory has read it and approved it.",
        "The software gathers, checks and drafts. A named human being decides.")))

S.append(section(
    "Hold us to it",
    "Three claims, and how you test each one without trusting us.",
    table("The claim, and the test", "No signature needed to read this",
          [("The claim", ""), ("How you test it, without trusting us", "")],
          [(3, [("A stored record cannot be changed or deleted. A correction stands beside the record it replaces "
                 "rather than over it.", "The claim", ""),
                ("Export a month. Export the same month again a year later. Compare the two. The same file, or the "
                 "claim is false.", "The test", "")]),
           (3, [("The system can say what was held on a named past day, under the rule in force on that day.", "The claim", ""),
                ("Name a day before a rule change and ask for it. The answer should carry the old wording of the "
                 "rule, not today&rsquo;s.", "The test", "")]),
           (3, [("One build carries a second regulator, so the tenth customer costs no more to serve than the first.", "The claim", ""),
                ("Hand a new duty to the person who owns the rules and watch whether it goes live without a builder, "
                 "a ticket or a code release.", "The test", "")])])
    + "\n" + callout(
        "What this does not prove.",
        "The re-export test needs a year of records behind it before anyone can run it, and the second-regulator "
        "claim is testable at month eighteen.",
        "We are describing a build, not a running system, and we would rather you knew which was which."),
    p="Each test is one you can run against any vendor in this category, including us. That is why they are "
      "written down.",
    band=True))

S.append(section(
    "Why we built it",
    "Three reasons this and nothing else.",
    steps([
        ("The law is in force",
         "The duty exists today, it is supervised today, and the firms that owe it are named on a public list."),
        ("The work is unpleasant",
         "Nobody enjoys month-end, or reconstructing a year of records for an examiner. Software earns its place "
         "by removing work people already resent."),
        ("Proof outlives people",
         "A review reads records made years earlier. Staff and systems change. A record made on the day is the one "
         "that still answers the question."),
    ])))

S.append(section(
    "What we will not do",
    "Five limits, so you can hold us to them.",
    cx_grid([
        cx_card("Limits", "The boundary.",
                ol(["We do not hold or move customer money. We are not a bank and we need no banking licence.",
                    "We do not invent evidence, and we do not alter a record once it is made.",
                    "We do not decide whether your firm is compliant, and we do not certify that it is.",
                    "We do not file anything with a regulator. Your firm does, after your signatory approves it.",
                    "We give no legal, accounting or compliance advice. You will still need your counsel and your auditor."]),
                accent=True),
        cx_card("On how it works", "What this site leaves out.",
                cx_para("This site describes what the software produces. The design behind it is confidential, "
                        "patent applications are pending, and we show it under a written agreement. It is the same "
                        "reason a firm keeps its security arrangements private.")
                + "\n" + cx_lines([("Ask for the detail",
                                    '<a class="cv" href="/contact">Tell us what your firm does</a>')])),
    ]),
    band=True))

S.append(section(
    "Where we are",
    "An Alberta company. The product is not finished.",
    cx_grid([
        cx_card("Status", "Pre-revenue, and under development.",
                cx_para("4orm Finance is pre-revenue and the product is under development. Everything on this site "
                        "describes what the software is built to do. We are taking design partners now, and the "
                        "first ones shape what gets built first."), accent=True),
    ])))

PAGE = {
    "slug": "what-we-do",
    "title": "Built for the day someone asks, prove it",
    "desc": "4orm turns compliance activity into permanent, defensible evidence. It runs the check, surfaces variances early, keeps the proof with the wording of the rule, and produces the pack when an examiner names a date.",
    "hero": ("What we do",
             "Built for the day someone asks,",
             "prove it.",
             "4orm turns compliance activity into permanent, defensible evidence. It sits alongside your bank, "
             "your accountant and your accounting software, holds the record those systems produce, and answers "
             "the question when an examiner names a date. We never touch the money."),
    "sections": S,
}
