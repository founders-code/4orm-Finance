# -*- coding: utf-8 -*-
"""Why 4orm, how it works, the Standard, the evidence gap, and the company.

The rule these five obey: every regulatory figure appears as an answer to
"what are we protecting, and from what". Never as a threat, never as a
compliance pitch.
"""
import kit
from pkit import hero, sec, softs, flow, note, cta, duty, timeline, bignums, sources


def why():
    S = []

    S.append(sec("The gap", "Financial relationships are breaking in the gaps.",
        softs([
            ("Confusion", "The person does not understand what they are agreeing to",
             "Nearly half of Canadian homebuyers told CMHC they felt uncertain or concerned during "
             "the process. That figure has improved a great deal in recent years, from close to "
             "two thirds. It is still nearly half.", "blue"),
            ("Fraud", "$704 million reported lost in a single year",
             "The Canadian Anti-Fraud Centre recorded more than 112,000 reports and over $704 "
             "million in reported losses in 2025, including $351 million in investment fraud "
             "alone. Reported. The real number is larger.", "gold"),
            ("Fragmentation", "The relationship lives in eight systems",
             "The conversation is in one place, the documents in another, the consent somewhere "
             "else again, and the reasoning is usually in one person&rsquo;s head.", "ok"),
            ("Evidence gaps", "The conclusion survives, the reason does not",
             "Regulators in three separate sectors have now published the same finding: the file "
             "records what was decided and cannot show why.", "blue"),
        ], cols=2),
        p="Not one thing going wrong. Four, at once, in the space between a person making an "
          "important financial decision and the firm serving them."))

    S.append(sec("What we are protecting", "Two things, and they are the same thing.",
        flow([
            ("The person, before the decision rather than at it",
             "A disclosure handed over at signing is not information. Information is what a person "
             "gets early enough to change their mind. 4orm exists in the weeks before anybody has "
             "anything to sell, which is the only time understanding is free."),
            ("The person, afterwards",
             "The record is not only the firm&rsquo;s defence. It is the person&rsquo;s proof that "
             "they were told, that they understood, and that they agreed knowing what they were "
             "agreeing to. That has never belonged to them before."),
            ("The firm, from the gap in its own file",
             "Every finding on this page describes a firm that did the work and could not show it. "
             "That is the exposure. Not bad intent, an absent record."),
            ("The relationship, which is what both of them actually have",
             "A person who understands the decision is a better client. A firm that can explain "
             "its reasoning is a better firm. The evidence is what falls out of doing both."),
        ]), alt=True,
        p="The fines and the findings on this site are not a threat. They are the answer to one "
          "question: what are we protecting, and from what."))

    S.append(sec("What the regulators said", "Three sectors. Three regulators. One complaint.",
        timeline([
            ("2024&ndash;25", "FSRA, on private mortgage files",
             "Every file reviewed had no documented suitability assessment. Seventy-three per cent "
             "were missing adequate disclosure of material risk. Sixty-five per cent were missing "
             "adequate disclosure of the relationship or the conflict. In every entity examined, "
             "supervision was inadequate.",
             "Financial Services Regulatory Authority of Ontario", "gold"),
            ("10 Dec 2025", "The CSA and CIRO, on 105 registered firms",
             "Some firms had little or no documentation, or recorded only that an investment was "
             "suitable without showing the basis for that determination. In many cases registrants "
             "could not show evidence that a reasonable range of alternatives was considered.",
             "Joint CSA/CIRO Staff Notice 31-368", "gold"),
            ("31 Jul 2025", "FCAC, on how banks handle complaints",
             "Employees did not fully understand what counted as a complaint, so it was never "
             "recorded. A complaint never recorded never starts the clock and never reaches "
             "anybody.",
             "Financial Consumer Agency of Canada", "blue"),
        ]),
        p="These were published independently, in different years, about different products, by "
          "people who were not talking to each other. They describe the same failure."))

    S.append(sec("Why this becomes a category", "Utility first. Distribution through professionals.",
        flow([
            ("The usefulness starts before the transaction",
             "A person preparing for a decision has a reason to use 4orm before any firm is "
             "involved. That is where trust is cheap to earn and impossible to buy later."),
            ("Distribution comes through the professional",
             "A better-prepared client is worth more to a broker, an agent or an advisor than any "
             "marketing. The professional brings 4orm to the person, because it makes their own "
             "work easier."),
            ("Evidence grows while the relationship happens",
             "Nobody has to remember to create it. The record is a by-product of the conversation, "
             "which is the only version of this that survives contact with a busy week."),
            ("The same architecture crosses the sectors",
             "Mortgage, auto, real estate, insurance, investing, banking, lending. Seven different "
             "rulebooks, one relationship."),
        ]), alt=True))

    S.append(cta("Better financial decisions start with better relationships.",
        "Everything else on this site is an argument for that sentence."))

    body = hero("Why 4orm", "Financial relationships are breaking",
                "in the gaps.",
                "Not in the products, and not in the rules. In the space between a person making a "
                "decision that will shape their life and the firm that is meant to be helping them "
                "make it.") + "".join(S)
    return kit.write("why", "/why-4orm", "Financial relationships are breaking in the gaps.",
                     "Confusion, fraud, fragmentation and evidence gaps. What 4orm protects, and "
                     "what three Canadian regulators independently found.", body)


def how():
    S = []

    LINE = ["The person", "The conversation", "The information", "The permission",
            "The verification", "The professional", "The action", "The change",
            "The decision", "The evidence", "The outcome"]

    S.append(sec("The line", "One relationship, end to end.",
        '<div class="lline">' + "".join(
            '<span class="lnode"><b>%02d</b>%s</span>' % (i + 1, n) for i, n in enumerate(LINE)) +
        '</div>' +
        note("b", "<b>Everything 4orm does sits on this line.</b> Not a product suite. One "
                  "relationship, followed from before it starts to after it ends, with each step "
                  "answering the same five questions: what happened, when, who was involved, what "
                  "was shown, and what was agreed."),
        p="Most software owns one node and calls it a platform. The gap is not inside any single "
          "node. It is in the joins between them."))

    S.append(sec("What the person gets", "Understand it, prepare for it, check them, keep it.",
        flow([
            ("Understand what you are actually deciding",
             "In your own words, before anybody has anything to sell you. Ask the awkward "
             "questions here, where they cost nothing and nobody is watching."),
            ("Walk in prepared",
             "Identity verified once. Income supported by a document rather than stated. The "
             "things a professional will ask for, gathered before they ask."),
            ("Check who you are dealing with",
             "Every sector has a public register. 4orm takes you to the right one and tells you "
             "what it does and does not cover."),
            ("Keep what happened",
             "Everything in your record carries where it came from. What you said, what a document "
             "supports, and what has been independently verified never look the same."),
        ])))

    S.append(sec("How sure are we", "Five labels, never blurred.",
        '<div class="dgrid">' +
        duty("You told us", "The person said it. Useful, and not yet evidence.") +
        duty("Document supported", "A document backs it, and the document is in the record.") +
        duty("Verified", "Checked independently, and the result of that check is kept.") +
        duty("Professional provided", "It came from the firm, not the person.") +
        duty("Needs confirmation", "Something is missing, and everybody can see which thing.") +
        duty("Changed", "It used to say something else, and the previous version is still there.") +
        '</div>',
        p="This is the smallest idea in 4orm and the one that carries the most weight. Nothing on a "
          "screen is allowed to look more certain than it is.", alt=True))

    S.append(sec("What the firm gets", "The record assembles itself.",
        flow([
            ("Better-prepared clients arrive",
             "Identity done, income supported, the obvious questions already answered. The first "
             "meeting starts where the third one used to."),
            ("Material events surface while they are still fixable",
             "When the application stops matching the record, that is a difference today rather "
             "than an allegation in eighteen months."),
            ("Supervision has something to supervise",
             "Which files are complete, which are waiting, which need a person. Not a monthly "
             "report assembled by hand."),
            ("The evidence pack already exists",
             "Conversations, documents, consent, versions, reasoning, and the resolution of "
             "anything that went sideways. Assembled continuously, not reconstructed on demand."),
        ])))

    S.append(cta("The same conversation, doing two jobs.",
        "The person understands the decision. The firm can show how it was handled. Neither of "
        "them has to do extra work for the other one to get what they need."))

    body = hero("How it works", "One line, from before the relationship",
                "to long after it.",
                "4orm is not a suite of tools. It is a single line through a financial "
                "relationship, and everything it does happens somewhere on that line.") + "".join(S)
    return kit.write("how", "/how-it-works", "One line, from before the relationship to long after it.",
                     "Person, conversation, information, permission, verification, professional, "
                     "action, change, decision, evidence, outcome.", body)


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

    S.append(cta("A higher standard for financial relationships.",
        "Every principle here exists because a regulator has already described what happens "
        "without it."))

    body = hero("The Standard", "A higher standard",
                "for financial relationships.",
                "Ten operating principles a participating firm adopts, what they mean in practice, "
                "and the four things they deliberately do not promise.") + "".join(S)
    return kit.write("standard", "/the-standard", "A higher standard for financial relationships.",
                     "Ten auditable operating principles, what regulators are actually asking for, "
                     "and what the Standard does not claim.", body)


def gap():
    S = []

    S.append(sec("The shape of it", "Regulators describe the outcome. Systems record the pieces.",
        softs([
            ("The conversation", "Where the reasoning actually lives",
             "It happens by phone, by message, across a desk. It is the part that explains "
             "everything and the part least likely to reach a file.", "blue"),
            ("The documents", "Correct, and mute",
             "A signed form proves a signature. It does not prove the person understood what they "
             "were signing, or what they were told beforehand.", "blue"),
            ("The consent", "In a third system",
             "Captured somewhere, by someone, usually in a tool bought for a different purpose.",
             "gold"),
            ("The versions", "Overwritten",
             "The application says what it says today. What it said in March, and who changed it, "
             "is frequently unrecoverable.", "gold"),
            ("The supervision", "A monthly report, assembled by hand",
             "By the time a pattern is visible in it, the file it describes has closed.", "ok"),
            ("The reasoning", "In one person&rsquo;s head",
             "Which is fine until the person leaves, or until enough time passes that they no "
             "longer remember. Both of those are certainties.", "ok"),
        ], cols=3),
        p="Every one of these systems does its own job well. The duty a firm is held to spans all "
          "of them, and nothing spans all of them."))

    S.append(sec("What it costs", "The record is what fails, not the work.",
        bignums([
            ("100%", "gold", "of private mortgage files reviewed by FSRA in 2024&ndash;25 had no "
                             "documented suitability assessment"),
            ("73%", "gold", "were missing or had inadequate disclosure of material risk"),
            ("65%", "blue", "were missing or had inadequate disclosure of the relationship or the "
                            "conflict"),
            ("100%", "blue", "of the entities examined had inadequate supervision"),
        ]),
        p="Read those four figures together. They do not describe firms that gave bad advice. They "
          "describe firms whose files could not show what advice was given, or why, or by whom, or "
          "who was watching.", alt=True))

    S.append(sec("Closing it", "Evidence as a by-product, not a project.",
        flow([
            ("It has to come from the conversation",
             "Any system that asks a busy professional to go and create evidence afterwards will "
             "be defeated by a busy week. The record has to fall out of the work itself."),
            ("It has to carry its own provenance",
             "Every item knows where it came from and how sure anybody is about it. Otherwise "
             "reassembling it later is guesswork with better formatting."),
            ("It has to keep what changed",
             "The previous version, who changed it, and when. A record that overwrites itself "
             "cannot answer the only question that ever gets asked."),
            ("It has to belong to both sides",
             "The firm needs it to explain the work. The person needs it to prove they were "
             "informed. It is the same record."),
        ])))

    S.append(cta("The requirement exists. The evidence is scattered.",
        "Closing that distance is the whole of what 4orm does."))

    body = hero("The evidence gap", "Regulators describe the outcome.",
                "Existing systems record the pieces.",
                "The duty is clear and increasingly explicit. The record of it still lives in "
                "systems that were never joined up, and gets reassembled by hand under "
                "deadline.") + "".join(S)
    return kit.write("gap", "/evidence-gap", "Regulators describe the outcome. Systems record the pieces.",
                     "Where the record of a financial relationship actually lives, why it cannot "
                     "answer the question, and what closing it requires.", body)


def company():
    S = []

    S.append(sec("Why", "Because financial decisions change people&rsquo;s lives.",
        '<div class="mission">'
        '<p>A person should understand what they are agreeing to.</p>'
        '<p>A professional doing the right thing should be able to demonstrate it.</p>'
        '<p>A firm should know how its client relationships are actually being handled.</p>'
        '</div>' +
        note("b", "<b>None of those three is controversial.</b> All three are currently hard, and "
                  "they are hard for the same reason: the relationship and the record of it live "
                  "in different places."),
        p="4orm is being built because the largest decisions most people make are the ones they "
          "understand least at the moment they make them, and because the firms serving them "
          "frequently did the work and cannot show it."))

    S.append(sec("How we work", "Four commitments that constrain what we build.",
        softs([
            ("Sources", "Every figure traces to a primary source",
             "Nothing on this site is quoted from a summary of a summary. If a number cannot be "
             "traced to the body that published it, it does not appear.", "blue"),
            ("Trends", "A number that is improving is shown as improving",
             "Nearly half of Canadian homebuyers report uncertainty. That is down from close to "
             "two thirds. Both halves of that sentence get said.", "blue"),
            ("Names", "We do not label anybody",
             "This site points at published registers and published findings. It does not "
             "characterise any real person or firm, and it never will.", "gold"),
            ("Limits", "We say what we cannot do",
             "4orm does not certify quality, guarantee outcomes, or control what a third party "
             "does with information downstream. Where a regulated firm has its own retention "
             "duties, those survive anything we offer.", "gold"),
        ], cols=2), alt=True))

    S.append(sec("What we are not building", "Three things we have deliberately left alone.",
        flow([
            ("Not the verification infrastructure",
             "Identity checking, open banking, credit and signature are specialist industries with "
             "good operators in them. 4orm connects to that work rather than rebuilding it. Those "
             "are integration layers, not the reason to exist."),
            ("Not a replacement for the professional",
             "The regulated judgment stays with the person licensed to make it. 4orm makes their "
             "reasoning explicable and their work demonstrable. It does not make the decision."),
            ("Not a surveillance product",
             "A firm should feel it can finally see whether client relationships are being handled "
             "properly. A professional should feel it helps them take care of a client. If it ever "
             "reads as monitoring installed by an employer, we have built it wrong."),
        ])))

    S.append(sec("Where the claims come from", "Read the sources yourself.",
        sources([
            ("Regulators", [
                ("Mortgage and insurance", "Financial Services Regulatory Authority of Ontario",
                 "https://www.fsrao.ca/"),
                ("Banking conduct", "Financial Consumer Agency of Canada",
                 "https://www.canada.ca/en/financial-consumer-agency.html"),
                ("Investing", "Canadian Securities Administrators",
                 "https://www.securities-administrators.ca/"),
                ("Dealers and advisors", "Canadian Investment Regulatory Organization",
                 "https://www.ciro.ca/"),
            ]),
            ("Registers", [
                ("Investment registration", "CSA National Registration Search",
                 "https://info.securities-administrators.ca/nrsmobile/NrsSearch.aspx"),
                ("Advisor history", "CIRO Advisor Report", "https://www.ciro.ca/advisor-report-search"),
                ("Car dealers, Ontario", "OMVIC dealer search", "https://www.omvic.ca/dealer-search/"),
                ("Bank complaints", "Ombudsman for Banking Services and Investments",
                 "https://www.obsi.ca/"),
            ]),
            ("Research", [
                ("Homebuyer experience", "CMHC Mortgage Consumer Survey",
                 "https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research"),
                ("Fraud reporting", "Canadian Anti-Fraud Centre",
                 "https://antifraudcentre-centreantifraude.ca/"),
                ("Insolvency", "Office of the Superintendent of Bankruptcy",
                 "https://ised-isde.canada.ca/site/office-superintendent-bankruptcy/en"),
            ]),
        ])))

    S.append(cta("Tell us what your firm does, and who regulates it.",
        "Thirty minutes, no client data, and at the end you will know whether we can help. "
        "Sometimes we cannot, and we would rather say so early."))

    body = hero("Company", "A record is only worth",
                "the people behind it.",
                "Why 4orm is being built, the commitments that constrain what goes into it, and "
                "the three things we have deliberately decided not to build.") + "".join(S)
    return kit.write("company", "/company", "A record is only worth the people behind it.",
                     "Why 4orm exists, how we handle claims and sources, and what we are "
                     "deliberately not building.", body)


def build():
    yield why()
    yield how()
    yield standard()
    yield gap()
    yield company()
