# -*- coding: utf-8 -*-
import kit
from pkit import hero, sec, segmented, panel, Panes, duty, softs, flow, note, sources, cta


def build():
    S = []

    S.append(sec("The challenge", "One transaction split across six organizations and nobody holding the "
                                  "evidence of it.",
        softs([
            ("What the consumer sees", "A request, then silence",
             "You send documents into an email thread and wait. When a number on your file changes, you "
             "find out at the end, if at all.", "blue"),
            ("What the professional owes", "A file another broker could re-perform",
             "Ontario expects mortgage documentation to tell the story of how a recommendation was suitable "
             "for that specific client, in enough detail that a third party could redo the assessment.", "gold"),
            ("What nobody holds", "The transaction itself",
             "A broker, a brokerage, one or more lenders, an insurer, a lawyer and the consumer&rsquo;s own "
             "inbox. Each holds a piece. None holds the story.", "ok"),
        ]),
        p="Your mortgage moves through six organizations. The record of it moves through none of them intact."))

    SIDES = [
        ("consumer", "The consumer", [
            ("Before an application exists", "Plain answers about the stages, what to gather, and what you "
             "will be asked, before you have chosen anybody."),
            ("A passport you own", "Identity, income, employment, assets and debts, each with the document "
             "behind it and a status you can see."),
            ("You decide who receives it", "Every permission is scoped, dated and withdrawable, and you can "
             "see who holds what."),
            ("You are told when it changes", "A value moves on your application and you hear about it the "
             "same minute, with who changed it and what your evidence supports."),
        ]),
        ("broker", "The broker", [
            ("A prepared client", "The file arrives with identity verified and income supported, so the work "
             "starts at the second step rather than the first."),
            ("The rationale, recorded as you go", "What the client wanted, what was considered, why the "
             "recommendation fits, and what was acknowledged and when."),
            ("Submission snapshots", "Exactly what each lender received, frozen at the moment of "
             "transmission, so it can be proved later."),
            ("The review stops being a project", "It becomes an export from records already made."),
        ]),
        ("brokerage", "The brokerage", [
            ("Supervision by exception", "Open items, consent gaps, missing acknowledgements and material "
             "changes, ranked, across every file in the office."),
            ("Every exception traceable", "Each row opens the evidence underneath it rather than a summary "
             "somebody typed."),
            ("Principal broker review captured", "As an event on the file, with its timestamp."),
        ]),
        ("lender", "The lender", [
            ("The package as received", "Not as the file stands now. A snapshot, with the date it arrived."),
            ("Provenance on the values relied upon", "Which figures were verified, which were self-reported, "
             "and which are unreconciled."),
            ("Material changes since that version", "Listed, so a decision made on an old version does not "
             "sit unnoticed."),
        ]),
    ]
    panes = Panes("side", [(k, "".join(duty(a, b) for a, b in rows)) for k, _, rows in SIDES])
    S.append(sec("Four parties", "The same transaction, from wherever you stand.",
        segmented("side", [(k, lab) for k, lab, _ in SIDES]) +
        panel("One transaction, four points of view", '<span class="pl">Mortgage</span>', panes),
        p="Pick where you sit.", alt=True))

    S.append(sec("What it catches", "An income figure moved by $18,000. No document moved with it.",
        flow([
            ("A lender declines",
             "On 5 April, at the stated income of $118,000."),
            ("The next day the figure changes",
             "Annual income becomes $136,000 on the application. No supporting document is attached to the "
             "change."),
            ("A second lender approves on the new figure",
             "A conditional approval is issued on 14 April, relying on a number the evidence on file does "
             "not support."),
            ("Both sides are told, the same minute",
             "The consumer sees what changed and what their own documents support. The brokerage sees an "
             "evidence exception. Neither is told who is at fault."),
        ]) +
        note("w", "<b>4orm does not accuse anyone.</b> It states the change, shows what the evidence "
                  "supports, and asks the one person who can settle it. An anomaly is a question for the "
                  "people on the file, not a finding against one of them."),
        p="Every figure in this example is invented. The shape of it is not."))

    S.append(sec("Why it matters", "The requirement already exists. The record to satisfy it usually does not.",
        sources([
            ("The instruments", [
                ("FSRA, Ontario", "Show your work: documenting mortgage suitability",
                 "https://www.fsrao.ca/industry/mortgage-brokering/regulatory-framework/supervision/"
                 "show-your-work-documenting-mortgage-suitable-your-client"),
                ("Ontario", "Ontario Regulation 188/08, trust money and records",
                 "https://www.ontario.ca/laws"),
                ("Federal", "FINTRAC, obligations for the mortgage sector",
                 "https://fintrac-canafe.canada.ca/re-ed/mortgage-hypotheque-eng"),
                ("Federal", "Bank of Canada, consumer-driven banking",
                 "https://www.bankofcanada.ca/regulatory-oversight/consumer-driven-banking/"),
            ]),
            ("What each one means here", [
                ("Suitability", "Rationale and decision history preserved as data, not only as documents",
                 "https://www.fsrao.ca/industry/mortgage-brokering"),
                ("Trust money", "Advance payments become trust money on arrival, with records kept 6 years",
                 "https://www.ontario.ca/laws"),
                ("Identity and monitoring", "Built to extend into the reporting-entity workflows",
                 "https://fintrac-canafe.canada.ca/re-ed/mortgage-hypotheque-eng"),
                ("Permission and provenance", "Core architecture, even while the demonstration runs on "
                 "synthetic data",
                 "https://www.bankofcanada.ca/regulatory-oversight/consumer-driven-banking/"),
            ]),
        ]), alt=True))

    S.append(cta("Run the whole transaction, on an invented file.",
                 "The conversation before a broker exists, the passport, the permission, the submission, "
                 "the change nobody flagged, and the record it all produces."))

    body = hero("Who it is for &middot; Mortgage",
                "Know what is happening", "with your mortgage.",
                "The consumer prepares before they choose anybody. The broker receives a prepared client and "
                "a rationale recorded as the work happens. The brokerage supervises by exception. And every "
                "one of them is looking at the same record.") + "".join(S)

    yield kit.write("mortgage", "/mortgage", "Know what is happening with your mortgage",
                    "The consumer prepares, the broker proves, the brokerage supervises by exception, and "
                    "every party reads the same transaction record.", body)
