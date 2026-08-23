# -*- coding: utf-8 -*-
import kit
from pkit import hero, sec, segmented, panel, Panes, duty, softs, flow, note, cta


def build():
    S = []

    S.append(sec("What it does", "Four responsibilities, and a person signs at the end of all of them.",
        softs([
            ("01 &middot; daily or monthly", "It runs the check",
             "The comparison your rule requires, on the schedule your rule sets.", "blue"),
            ("02 &middot; as it happens", "It surfaces variances early",
             "A difference between two records goes to a named person the day it appears, and closes with a "
             "note of what was done.", "gold"),
            ("03 &middot; for the retention period", "It keeps the proof",
             "The record and the wording of the rule it was made under stay together. Six years, 10 years, "
             "whatever applies to you.", "ok"),
            ("04 &middot; on request", "It produces the pack",
             "A request covering a period years back is answered from the record you already hold.", "blue"),
        ], cols=4) +
        note("i", "<b>A person always signs.</b> Nothing leaves the firm until an authorised signatory has "
                  "read it and approved it. The software gathers, checks and drafts. A named human being "
                  "decides.")))

    CLAIMS = [
        ("c1", "It cannot be changed", [
            ("The claim", "A stored record cannot be changed or deleted. A correction stands beside the "
             "record it replaces rather than over it."),
            ("How you test it", "Export a month. Export the same month again a year later. Compare the two. "
             "The same file, or the claim is false."),
            ("What it does not prove", "The re-export test needs a year of records behind it before anybody "
             "can run it."),
        ]),
        ("c2", "It knows the rule as it stood", [
            ("The claim", "The system can say what was held on a named past day, under the rule in force on "
             "that day."),
            ("How you test it", "Name a day before a rule change and ask for it. The answer should carry the "
             "old wording of the rule, not today&rsquo;s."),
            ("What it does not prove", "It proves the wording was kept. It does not prove the firm was "
             "compliant, and we never claim it does."),
        ]),
        ("c3", "A second regulator costs nothing", [
            ("The claim", "One build carries a second regulator, so the tenth customer costs no more to "
             "serve than the first."),
            ("How you test it", "Hand a new duty to the person who owns the rules and watch whether it goes "
             "live without a builder, a ticket or a code release."),
            ("What it does not prove", "This one is testable at month eighteen, not today."),
        ]),
    ]
    panes = Panes("claim", [(k, "".join(duty(a, b) for a, b in rows)) for k, _, rows in CLAIMS])
    S.append(sec("Hold us to it", "Three claims, and how you test each one without trusting us.",
        segmented("claim", [(k, lab) for k, lab, _ in CLAIMS]) +
        panel("The claim, and the test", '<span class="pl">No signature needed to read this</span>', panes) +
        note("m", "Each test is one you can run against any vendor in this category, including us. That is "
                  "why they are written down. We are describing a build rather than a running system, and we "
                  "would rather you knew which was which."),
        p="Pick a claim and read how to break it.", alt=True))

    S.append(sec("Why we built it", "Three reasons this and nothing else.",
        flow([
            ("The law is in force",
             "The duty exists today, it is supervised today, and the firms that owe it are named on a "
             "public list."),
            ("The work is unpleasant",
             "Nobody enjoys month-end, or reconstructing a year of records for an examiner. Software earns "
             "its place by removing work people already resent."),
            ("Proof outlives people",
             "A review reads records made years earlier. Staff and systems change. A record made on the day "
             "is the one that still answers the question."),
        ])))

    S.append(sec("What we will not do", "Five limits, so you can hold us to them.",
        flow([
            ("We never touch the money",
             "We do not hold or move customer money. We are not a bank and we need no banking licence."),
            ("We never invent evidence",
             "And we do not alter a record once it is made."),
            ("We do not decide whether you are compliant",
             "And we do not certify that you are."),
            ("We file nothing with a regulator",
             "Your firm does, after your signatory approves it."),
            ("We give no legal, accounting or compliance advice",
             "You will still need your counsel and your auditor."),
        ]) +
        note("m", "<b>On how it works.</b> This site describes what the software produces. The design behind "
                  "it is confidential, patent applications are pending, and we show it under a written "
                  "agreement. It is the same reason a firm keeps its security arrangements private.") +
        note("w", "<b>Where we are.</b> 4orm Finance is an Alberta company. It is pre-revenue and the "
                  "product is under development. We are taking design partners now, and the first ones shape "
                  "what gets built first."),
        alt=True))

    S.append(cta("See it running, on an invented file.",
                 "One transaction, three views, four industries. The conversation, the passport, the "
                 "permission, the change nobody flagged, and the record it all produces."))

    body = hero("What we do", "Built for the day someone asks,", "prove it.",
                "4orm turns compliance activity into permanent, defensible evidence. It sits alongside your "
                "bank, your accountant and your accounting software, and answers the question when an "
                "examiner names a date. We never touch the money.") + "".join(S)

    yield kit.write("what", "/what-we-do", "Built for the day someone asks, prove it",
                    "4orm runs the check, surfaces variances early, keeps the proof with the wording of the "
                    "rule, and produces the pack when an examiner names a date.", body)
