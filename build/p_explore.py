# -*- coding: utf-8 -*-
"""Why 4orm, how it works, the Standard, the evidence gap, and the company.

The rule these five obey: every regulatory figure appears as an answer to
"what are we protecting, and from what". Never as a threat, never as a
compliance pitch.
"""
import io
import kit
from pkit import hero, sec, softs, flow, note, cta, duty, timeline, bignums, sources


def why():
    """Why 4orm is now the company page.

    The research it used to carry lives on /research. What stays is the
    answer to four questions: why are you doing this, what do you believe,
    who are you, and why are you different.
    """
    import json, os
    here = os.path.dirname(os.path.abspath(__file__))
    with io.open(os.path.join(here, "content", "team.json"), encoding="utf-8") as f:
        TEAM = json.load(f)

    S = []

    S.append(sec("Why now", "Three numbers, and what each one covers.",
        bignums([
            ("47%", "gold", "of homebuyers reported concern or uncertainty during the process. "
                            "CMHC survey respondents, 2026."),
            ("$704M+", "blue", "in reported fraud losses across more than 112,000 reports. "
                               "Canadian Anti-Fraud Centre, 2025."),
            ("100%", "gold", "of files in one FSRA private-mortgage supervision sample had no "
                             "documented suitability assessment. 2024 to 2025."),
        ]) +
        note("b", "<b>Read the scope, not just the number.</b> A supervision sample is not a "
                  "national rate. Every figure this site uses carries its year, its scope and its "
                  "source on the <a href=\'/research\'>research page</a>."),
        p="Finance has more technology than it has ever had. That has not always made the "
          "relationship any clearer."))

    S.append(sec("What makes us different", "Five things, and each one is a choice.",
        flow([
            ("We start with the person, not the compliance department",
             "The first useful minute of 4orm happens before any firm is involved, because that is "
             "the only moment understanding is free."),
            ("The professional stays the professional",
             "4orm supports the relationship. It does not replace the expertise, and it does not "
             "make the regulated recommendation."),
            ("The record starts before anything goes wrong",
             "Evidence grows while the interaction happens, rather than being assembled afterwards "
             "by a person trying to remember."),
            ("Both sides get something from the same interaction",
             "Clarity for the person and evidence for the firm are not two products. They fall out "
             "of one conversation."),
            ("We care about what happens between systems",
             "Identity checking, documents, credit and messaging are all pieces. What 4orm "
             "protects is the relationship running between them."),
        ]), alt=True))

    S.append(sec("What we stand for", "Four values, and they describe the product.",
        softs([
            ("Protect people", "Leave the person safer than you found them",
             "Financial technology should leave a person clearer and more capable than it found "
             "them, not merely further along a funnel.", "blue"),
            ("Tell the truth", "Three kinds of knowing are not one kind",
             "What a person said, what a document supports, what has been independently verified "
             "and what remains unknown are different things. We will not present them as though "
             "they are the same.", "gold"),
            ("Sovereignty", "Your information. Your decisions. Your record.",
             "A person's information, choices and understanding should not disappear simply "
             "because they entered a complicated financial process.", "blue"),
            ("Transparency", "Show the request, the reason and the result",
             "What is being asked for. Why. What changed. Who received it. What happened next.",
             "gold"),
        ], cols=2)))

    S.append(sec("When a person is needed", "Technology when it helps. A person when you need one.",
        note("b", "<b>Launching with Canadian client support, around the clock.</b> We do not "
                  "believe the last thing a worried person can reach should be a screen."),
        p="The moment a person most needs help with a financial decision is rarely between nine "
          "and five.", alt=True))

    S.append(sec("Built in Canada", "For the relationships Canadians already have.",
        '<div class="chainflow rv">' + "".join(
            '<span class="cf" style="--i:%d">%s</span>' % (i, x) for i, x in enumerate(
                ["Mortgage", "Auto", "Insurance", "Lending", "Canadian privacy law",
                 "Canadian regulators", "Canadian support"])) + '</div>',
        p="Canadian deadlines, Canadian regulators, Canadian registers. This is a statement of "
          "where we are focused rather than a flag on a page."))

    cards = "".join(
        '<article class="tm rv">'
        '<div class="tmph"><img src="%s" alt="%s" loading="lazy" width="480" height="480" />'
        '<span class="tmini" aria-hidden="true">%s</span></div>'
        '<span class="tmk">%s</span><h3 class="tmn">%s</h3>'
        '<p class="tmr">%s</p><p class="tmb">%s</p></article>'
        % (m["img"], m["name"], m["ini"], m["kick"], m["name"], m["role"], m["short"])
        for m in TEAM)

    S.append(sec("The people building it", "Nine of us, and why each one is here.",
        '<div class="tmgrid">' + cards + '</div>',
        p="Most of us have spent a career somewhere the record mattered. Reach any of us at "
          "<a href=\'mailto:office@4ormfinance.com\'>office@4ormfinance.com</a>.", alt=True))

    S.append(cta("This is what we are building, and what we are building it around.",
        "Use it, or tell us where it falls short. Both are useful to us.",
        primary=("Experience 4orm", "/#personal"), secondary=("Talk to the team", "/contact")))

    body = hero("Why 4orm", "Finance has more technology",
                "than it has ever had.",
                "That has not always made the relationship clearer. We believe a person should "
                "understand an important financial decision before they make it, and a firm "
                "should be able to demonstrate how it took care of the "
                "relationship.") + "".join(S)
    return kit.write("why", "/why-4orm", "Why 4orm.",
                     "Why we are building this, what we believe, and the nine people building "
                     "it.", body)


def standard():
    S = []

    RULES = [
        ("Explain before you sell",
         "The person is given what they need to understand the decision before anybody has a "
         "commercial interest in which way it goes."),
        ("Say who you are and who pays you",
         "The relationship, the remuneration and any conflict are disclosed in words the person "
         "uses, and the disclosure is recorded as having happened."),
        ("Record the reason, not only the result",
         "Why this option and not another. The regulators have now said in writing that recording "
         "the conclusion alone is not enough."),
        ("Show the alternatives that were weighed",
         "A recommendation with nothing behind it is an assertion. The range considered is part of "
         "the record."),
        ("Ask permission, and show what is being asked for",
         "Before information moves, the person sees what is being requested, by whom, and why."),
        ("Surface every material change",
         "When something moves between what was shown and what was signed, both sides see the "
         "change as a change."),
        ("Keep the previous version",
         "A record that overwrites itself without saying so is not a record."),
        ("Resolve, and record the resolution",
         "A difference that gets explained or corrected is part of the story. Closing it silently "
         "is not."),
        ("Let the person hold their own copy",
         "The evidence that they were informed belongs to them as much as to the firm."),
        ("Do not promise what you cannot control",
         "4orm does not certify quality, guarantee outcomes, or claim authority over what a third "
         "party does downstream. Neither may a participating firm, using our name."),
    ]

    S.append(sec("Ten principles", "What a participating firm agrees to.",
        flow(RULES),
        p="These are operating principles that can be checked, not a badge that can be bought. A "
          "firm either does these things and can show it, or it does not."))

    S.append(sec("What it is not", "The four things the Standard does not mean.",
        softs([
            ("Not a rating", "It does not say a firm is good",
             "It says a firm operates a relationship this way and can demonstrate it. Quality of "
             "advice is a different question, and not ours to answer.", "blue"),
            ("Not a guarantee", "It does not promise an outcome",
             "No standard can. Markets move, lenders decline, claims get denied for reasons nobody "
             "controls.", "blue"),
            ("Not a licence", "It does not replace a regulator",
             "The registers on this site are the authority. The Standard sits alongside them and "
             "never in front of them.", "gold"),
            ("Not for sale", "It is not a paid trust badge",
             "A trust mark a firm can purchase is worth precisely what it cost.", "gold"),
        ], cols=2), alt=True))

    S.append(sec("What regulators are asking for", "The standard moved beyond disclosure.",
        timeline([
            ("Mortgage", "Documentation should tell a clear story",
             "FSRA's framing is show your work: documentation that supports why the mortgage was "
             "suitable for this specific person, capable of supporting third-party "
             "re-performance. Not only the final forms.",
             "Financial Services Regulatory Authority of Ontario", "gold"),
            ("Banking", "Appropriate, and demonstrably so",
             "Since June 2022 banks must collect and assess information to understand a "
             "customer's needs, offer products appropriate to their circumstances, obtain express "
             "consent, and keep records demonstrating the assessment and its outcome.",
             "Financial Consumer Agency of Canada", "blue"),
            ("Investing", "Show the basis, and the alternatives",
             "Records should show a meaningful reassessment; generic notes reading no changes are "
             "insufficient. Where a holding sits outside internal thresholds but remains suitable, "
             "the rationale must be documented in detail.",
             "Joint CSA/CIRO Staff Notice 31-368", "gold"),
            ("Insurance", "A recorded need, then a documented recommendation",
             "Needs-based recommendations, written product information, clear explanations, "
             "records of the discussion, and a documented recommendation.",
             "Financial Services Regulatory Authority of Ontario", "blue"),
            ("Auto finance", "Transparency about what was approved",
             "Guidance emphasises transparency about approved financing offers, commissions and "
             "financing terms, and the maintenance of trade records.",
             "Ontario Motor Vehicle Industry Council", "blue"),
        ]),
        p="Understand the client. Explain the decision. Preserve the consent, the disclosure and "
          "the reasoning. Keep records that show what happened and why. Five regulators, five "
          "products, one direction."))

    S.append(cta("Every one of these exists because it was missing somewhere.",
        "None of these principles were invented at a whiteboard. Each answers something a "
        "regulator has already found, written down, and published."))

    body = hero("The Standard", "A higher standard",
                "for financial relationships.",
                "Ten operating principles a participating firm adopts, what they mean in practice, "
                "and the four things they deliberately do not promise.") + "".join(S)
    return kit.write("standard", "/the-standard", "A higher standard for financial relationships.",
                     "Ten auditable operating principles, what regulators are actually asking for, "
                     "and what the Standard does not claim.", body)


def build():
    # /form replaced how(), /research and /form absorbed gap(), and the team
    # moved onto why(). Those three pages are gone rather than orphaned.
    yield why()
    yield standard()
