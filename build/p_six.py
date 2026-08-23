# -*- coding: utf-8 -*-
"""Personal, Professional, Form and Family.

Four of the six pages the site hangs off. Each one answers a different
person's question, and none of them requires the reader to understand
regulation or evidence architecture to see the point.

The design rule: one dominant idea per viewport. Where a paragraph could be
a comparison, a flow or a status change, it is built as one.
"""
import kit
from pkit import hero, sec, softs, flow, note, cta, duty, bignums

A = "&#8594;"


# ============================================================ shared pieces

def verbs(items):
    """Four large verbs, one idea each. Not a feature grid."""
    return '<div class="verbs">' + "".join(
        '<div class="vb rv"><span class="vbw">%s</span><p>%s</p></div>' % (w, b)
        for w, b in items) + '</div>'


def statuschain(rows):
    """The same value, changing what is known about it."""
    return '<div class="chain">' + "".join(
        '<div class="chl%s"><span class="chv">%s</span><span class="chs %s">%s</span></div>'
        % (" att" if t == "chg" else "", v, t, lab) for v, lab, t in rows) + '</div>'


def compare(title_a, rows_a, title_b, rows_b):
    """Before and after, with only the changes carrying weight."""
    def col(t, rows, side):
        return ('<div class="cmpc2 %s"><span class="cmk">%s</span>' % (side, t) +
                "".join('<div class="cmr%s"><span>%s</span><b>%s</b></div>'
                        % (" chg" if ch else "", k, v) for k, v, ch in rows) + '</div>')
    return ('<div class="cmp2">' + col(title_a, rows_a, 'was') +
            '<span class="cmarrow" aria-hidden="true">' + A + '</span>' +
            col(title_b, rows_b, 'now') + '</div>')


def steps(items):
    """A single line of the relationship, drawn rather than described."""
    return '<div class="chainflow rv">' + "".join(
        '<span class="cf" style="--i:%d">%s</span>' % (i, x) for i, x in enumerate(items)) + '</div>'


# ============================================================ 1. PERSONAL

def personal():
    S = []

    S.append(sec("What you can do", "Four things, before anybody is selling.",
        verbs([
            ("Understand", "Ask the questions you do not yet know how to ask, in your own words, "
                           "while asking them still costs you nothing."),
            ("Prepare", "Know what you will be asked for before a professional asks for it, and "
                        "turn up with it ready."),
            ("Check", "Verify the information that matters, and check who you are dealing with "
                      "against the published register."),
            ("Protect", "Keep a record of what you were shown, what you shared and what you "
                        "agreed to."),
        ])))

    S.append(sec("My 4orm", "Your information does not disappear into the process.",
        '<div class="my4">' + "".join(
            '<div class="m4"><span class="m4k">%s</span><p>%s</p></div>' % (k, v) for k, v in [
                ("Identity", "Verified once, and the result travels with you."),
                ("Income", "What you said, and what a document supports."),
                ("Documents", "Yours, unaltered, with the date you added them."),
                ("Permissions", "What you allowed, to whom, and when."),
                ("Professionals", "Who you are connected with, and what each of them can see."),
                ("Evidence", "What happened, in order, with where every piece came from."),
            ]) + '</div>',
        p="One place for the information around your decision. You can see what you contributed, "
          "where it came from, what has been supported and what has moved.", alt=True))

    S.append(sec("Mortgage", "It should not begin with a form you do not understand.",
        steps(["Ask 4orm", "Mortgage Passport", "Verify", "Prepare", "Connect a professional",
               "Review sharing", "See what changed"]) +
        '<div class="hbtns"><a class="hb hb-p" href="/#personal">Experience Mortgage '
        '<span class="cir">' + A + '</span></a>'
        '<a class="hb hb-g" href="/industries/mortgage">Read about mortgage</a></div>'))

    S.append(sec("Auto", "Know what changed before you sign it.",
        compare("As you were shown it", [
            ("Vehicle", "$52,000", False),
            ("Term", "72 months", False),
            ("Rate", "7.49%", False),
            ("Protection package", "$1,495", False),
        ], "As the paperwork reads", [
            ("Vehicle", "$52,000", False),
            ("Term", "84 months", True),
            ("Rate", "8.19%", True),
            ("Protection package", "$2,295", True),
        ]) +
        '<div class="hbtns"><a class="hb hb-p" href="/#personal">Experience Auto '
        '<span class="cir">' + A + '</span></a>'
        '<a class="hb hb-g" href="/industries/auto">Read about auto</a></div>',
        alt=True, p="Only the three lines that moved carry any weight. Everything else on the "
                    "sheet stayed the same."))

    S.append(sec("Ask 4orm", "Ask it the way you would say it out loud.",
        '<div class="qs">' + "".join('<span class="q">%s</span>' % q for q in [
            "What does pre-approval actually mean?",
            "Why do they need my bank statements?",
            "What did I agree to share?",
            "What changed since the first quote?",
            "Who has access to my information?",
            "Is this rate normal?",
        ]) + '</div>' +
        note("b", "<b>Where the line sits.</b> 4orm explains and prepares. Licensed professionals "
                  "remain responsible for regulated advice and recommendations.")))

    S.append(sec("Check a firm", "Something does not feel right? Check it before you act.",
        steps(["Check", "Explain", "Preserve", "Report"]) +
        '<div class="lvls">' +
        '<span class="lv ok">Low concern</span>'
        '<span class="lv warn">Caution</span>'
        '<span class="lv bad">High concern</span>' +
        '</div>' +
        note("w", "<b>Why we do not say scam.</b> We are not in a position to conclude that, and "
                  "saying it about a real firm on the strength of a screenshot would be wrong. "
                  "We show you what is published, and what it means."),
        alt=True,
        p="Paste a message, add a screenshot, enter a website, or describe what happened. In 2025 "
          "the Canadian Anti-Fraud Centre received more than 112,000 reports covering over $704 "
          "million in reported losses, and government partners estimate only five to ten per cent "
          "of frauds are reported at all."))

    S.append(cta("Nothing you do in there reaches anybody until you say so.",
        "Pick it up and use it. Ask the awkward question. Nobody is watching, and nothing moves "
        "without you.",
        primary=("Pick up 4orm", "/#personal"), secondary=("How it works", "/form")))

    body = hero("Personal", "Know before",
                "you decide.",
                "4orm helps you understand a financial decision, prepare for it, check what "
                "matters, and keep a clearer record of what actually happened.") + "".join(S)
    return kit.write("personal", "/personal", "Know before you decide.",
                     "Understand, prepare, check and protect. What a person can do with 4orm "
                     "before anybody is selling them anything.", body)


# ======================================================== 2. PROFESSIONAL

def professional():
    S = []

    S.append(sec("What arrives with the client", "Start where the third meeting used to.",
        '<div class="minirec wide">'
        '<div class="mrhead"><b>Sarah Mitchell</b><span>Mortgage &middot; MTG-2026-0417</span></div>'
        '<div class="mrrow"><span>Identity</span><em class="ok">Verified</em></div>'
        '<div class="mrrow"><span>Income</span><em class="doc">Document supported</em></div>'
        '<div class="mrrow"><span>What she is trying to do</span><em class="ok">Known</em></div>'
        '<div class="mrrow"><span>Questions</span><em class="ok">Resolved</em></div>'
        '<div class="mrrow"><span>Documents</span><em class="doc">Prepared</em></div>'
        '<div class="mrrow"><span>Permissions</span><em class="ok">Visible</em></div>'
        '</div>',
        p="The client has already asked the awkward questions somewhere private, gathered what you "
          "were going to ask for, and decided what they are willing to share."))

    S.append(sec("Where every fact came from", "Six labels, and none of them blur.",
        '<div class="dgrid">' +
        duty("You told us", "The client said it. Useful, and not yet evidence.") +
        duty("Document supported", "A document backs it, and the document is in the record.") +
        duty("Verified", "Checked independently, with the result kept.") +
        duty("Professional provided", "It came from your side, not theirs.") +
        duty("Needs confirmation", "Something is missing, and both of you can see which thing.") +
        duty("Changed", "It used to say something else, and the previous version is still there.") +
        '</div>', alt=True,
        p="Nothing on a 4orm screen is allowed to look more certain than it is. That is as useful "
          "to you as it is to the client."))

    S.append(sec("Catch it early", "A difference today is easier than an allegation later.",
        '<div class="mrflag standalone">'
        '<b>The income does not match.</b>'
        '<div class="mrcmp">'
          '<span><i>Supported by the client</i>$120,000</span>'
          '<span class="v"><i>On the application</i>$138,000</span>'
        '</div>'
        '<div class="mracts"><span>Explain</span><span>Correct</span>'
        '<span>Request updated support</span></div>'
        '</div>' +
        note("b", "<b>No accusation anywhere in that screen.</b> There may be a perfectly good "
                  "reason. The point is that both of you can see it while it is still a "
                  "correction."),
        p="Protect the relationship while there is still time to fix it."))

    S.append(sec("What management sees", "See the relationship, not the employee.",
        '<div class="exnums">' +
        '<div class="exn"><span class="exf">148</span><span class="exl">Active relationships</span></div>'
        '<div class="exn"><span class="exf ok">141</span><span class="exl">On track</span></div>'
        '<div class="exn"><span class="exf warn">7</span><span class="exl">Need attention</span></div>'
        '<div class="exn"><span class="exf">94%</span><span class="exl">Questions resolved</span></div>'
        '</div>'
        '<ul class="exlist rv">'
        '<li>A client question nobody has answered</li>'
        '<li>Information that differs from the evidence behind it</li>'
        '<li>A material change waiting to be acknowledged</li>'
        '<li>A permission that was never given</li>'
        '<li>The same document requested three times</li>'
        '</ul>' +
        note("b", "<b>Not every conversation. Not every employee.</b> 4orm surfaces material "
                  "relationship events rather than monitoring the people having them."),
        alt=True))

    S.append(sec("The record builds from the work", "Nobody has to remember to create it.",
        steps(["Conversation", "Source", "Permission", "Versions", "Rationale",
               "Acknowledgement", "Resolution"]) +
        note("b", "<b>Why it matters to a principal broker.</b> FSRA has noted that complete "
                  "records can improve borrower relationships and give a principal broker an "
                  "objective base for reviewing what an agent or broker actually did. "
                  "<a href=\"https://www.fsrao.ca/\" target=\"_blank\" rel=\"noopener\">"
                  "Read FSRA</a>."),
        p="When a complaint, an audit, an errors and omissions matter, an internal review or a "
          "regulatory examination legitimately requires it, the file is easier to reconstruct "
          "because it was never taken apart."))

    S.append(sec("The boundary", "The professional stays the professional.",
        '<div class="nots left">'
        '<p>4orm does not make the regulated recommendation.</p>'
        '<p>It does not approve the loan.</p>'
        '<p>It does not sell the vehicle.</p>'
        '<p>It does not replace professional judgment.</p>'
        '</div>',
        p="This one is not negotiable, and it is written into the Standard a participating firm "
          "adopts."))

    S.append(cta("Start where the third meeting used to.",
        "See the professional experience end to end, with synthetic data, in about four minutes.",
        primary=("See the dashboard", "/#professional"),
        secondary=("The Standard", "/the-standard")))

    body = hero("Professional", "Better prepared clients.",
                "Better relationships.",
                "Clients arrive with more context, better organized information and clearer "
                "questions, and the work you do creates a stronger record of how the relationship "
                "was handled.") + "".join(S)
    return kit.write("professional", "/professional",
                     "Better prepared clients. Better relationships.",
                     "What arrives with the client, where every fact came from, how differences "
                     "get caught early, and what management actually sees.", body)


# ================================================================ 3. FORM

def form():
    S = []

    S.append(sec("The line", "Six steps first. The other five when you want them.",
        steps(["Person", "My 4orm", "Permission", "Professional", "Decision", "Record"]) +
        '<details class="expand rv"><summary>See the full relationship</summary>'
        '<div class="expin">' +
        steps(["Conversation", "Information", "Permission", "Verification", "Professional",
               "Action", "Change", "Decision", "Evidence", "Outcome"]) +
        '</div></details>',
        p="4orm follows the important information, permissions, changes and decisions around a "
          "financial relationship, from before it begins to well after it ends."))

    S.append(sec("My 4orm", "The person has a side of the record too.",
        '<div class="archdiag">'
        '<span class="ad p">Person</span>'
        '<span class="adarr">&#8595;</span>'
        '<span class="ad core">My 4orm</span>'
        '<div class="adrow">'
          '<span class="ad s">Information</span><span class="ad s">Documents</span>'
          '<span class="ad s">Identity</span><span class="ad s">Permissions</span>'
          '<span class="ad s">Evidence</span>'
        '</div></div>',
        alt=True,
        p="Financial records have traditionally lived inside the firm's systems. My 4orm gives the "
          "person a clear view of the information and the relationship around their own "
          "decision."))

    S.append(sec("Identity", "Verify once. Keep what was verified, not the document.",
        steps(["Government ID", "Secure verification", "Verification result", "Relationship record"]) +
        note("b", "<b>Why the separation matters.</b> Sensitive identity evidence should be "
                  "minimised and kept apart wherever possible. 4orm needs proof that verification "
                  "happened, not a copy of the licence in every workflow that touches the file.")))

    S.append(sec("Permission", "Requested, explained, chosen, recorded.",
        steps(["Request", "Purpose", "Information", "Your choice", "Share", "History"]),
        alt=True,
        p="Where permission is required, the person sees what is being asked for and why, before "
          "anything moves."))

    S.append(sec("Provenance", "A new value does not erase the old one.",
        statuschain([
            ("$120,000", "You told us", "told"),
            ("$120,000", "Document supported", "doc"),
            ("Identity", "Verified", "ver"),
            ("$138,000", "Changed &middot; previous value kept", "chg"),
        ]),
        p="4orm keeps source, status and change visible, instead of letting every number on a "
          "screen look equally certain."))

    S.append(sec("The conversation, and its limits", "It explains. It does not decide.",
        '<div class="cando">'
        '<div class="cd yes"><span class="cdk">It can</span>'
          '<span>Explain</span><span>Ask the next useful question</span><span>Interpret</span>'
          '<span>Compare</span><span>Summarize</span></div>'
        '<div class="cd no"><span class="cdk">It cannot silently</span>'
          '<span>Verify a fact</span><span>Change provenance</span><span>Grant permission</span>'
          '<span>Rewrite history</span><span>Replace professional judgment</span></div>'
        '</div>', alt=True,
        p="The conversation is the way in. The structured record is the source of truth, and the "
          "two are deliberately not the same thing."))

    S.append(sec("Evidence", "A by-product, never another form to fill in.",
        note("b", "<b>The test.</b> Any system that asks a busy professional to go and create "
                  "evidence afterwards loses to a busy week. The record has to fall out of the "
                  "work itself, or it does not get made."),
        p="The same line you have followed down this page becomes the timeline: what happened, "
          "when, who was involved, what was shown, what was agreed."))

    S.append(sec("Integrations", "Built around the systems already there.",
        '<div class="orbit rv">'
        '<div class="orow">'
          '<span class="ocap" style="--i:0">Identity</span>'
          '<span class="ocap" style="--i:1">Financial data</span>'
          '<span class="ocap" style="--i:2">Credit</span>'
          '<span class="ocap" style="--i:3">Documents</span>'
        '</div>'
        '<span class="ocore">4orm</span>'
        '<div class="orow">'
          '<span class="ocap" style="--i:4">Broker and dealer systems</span>'
          '<span class="ocap" style="--i:5">Signature</span>'
          '<span class="ocap" style="--i:6">Official registers</span>'
          '<span class="ocap" style="--i:7">Reporting</span>'
        '</div></div>',
        p="4orm does not need to replace the financial system. It connects the relationship "
          "around it."))

    S.append(cta("Evidence that made itself while the work was happening.",
        "See the line running, with synthetic data, from before a professional exists to long "
        "after the decision is made.",
        primary=("Experience 4orm", "/#personal"),
        secondary=("Privacy and security", "/privacy")))

    body = hero("Form", "One relationship.",
                "One line.",
                "How 4orm actually works: where the information sits, who has to permit what, and "
                "why the evidence is a by-product of the conversation rather than a second "
                "job.") + "".join(S)
    return kit.write("form", "/form", "One relationship. One line.",
                     "The architecture: My 4orm, identity, permission, provenance, evidence and "
                     "the systems 4orm connects.", body)


# ============================================================== 4. FAMILY

def family():
    S = []

    S.append(sec("How it looks", "Being involved does not mean seeing everything.",
        '<div class="famdiag">'
        '<span class="fc core">Sarah</span>'
        '<div class="frow">'
          '<span class="fc">Partner</span>'
          '<span class="fc">Parent</span>'
          '<span class="fc">Someone she trusts</span>'
          '<span class="fc pro">Her professional</span>'
        '</div>'
        '<p class="fnote">Each connection carries its own permission.</p>'
        '</div>',
        p="One household, different information. The person at the centre decides what each "
          "connection can see, and can change it later."))

    S.append(sec("Three situations", "The same control, three different shapes.",
        softs([
            ("Together", "Buying a home with someone",
             "Both people can understand what is being decided, what it will cost and what is "
             "still missing, without either of them having to relay it second hand.", "blue"),
            ("Helping", "A parent contributing to a down payment",
             "Share only what relates to the contribution. A gift letter and the funds it "
             "supports, rather than the whole file.", "blue"),
            ("Checking", "Looking at something that feels wrong",
             "A trusted person can help review a suspicious message without automatically "
             "receiving the whole financial record it arrived beside.", "gold"),
        ], cols=3), alt=True))

    S.append(sec("Who comes in", "You decide, and you can undo it.",
        steps(["Invite", "Choose the purpose", "Choose the information", "Confirm",
               "Review it later"]),
        p="Role-appropriate access, set by the person whose decision it is."))

    S.append(sec("When a person is needed", "Someone is there.",
        note("b", "<b>Canadian client support, around the clock.</b> Launching with 24/7 support "
                  "for 4orm clients, so the last thing a worried person reaches is never a "
                  "screen."),
        p="Financial worry does not keep office hours, and the moment a person most needs help "
          "is usually the moment it is hardest to get."))

    S.append(cta("One household. Different information.",
        "A home purchase, a loan, an insurance decision or a suspicious request can involve a "
        "partner, a parent, a child or someone trusted. Each of them sees what their part "
        "requires, and no more than that.",
        primary=("Experience 4orm", "/#personal"),
        secondary=("Privacy and security", "/privacy")))

    body = hero("Family", "Financial decisions rarely",
                "affect only one person.",
                "A partner, a parent, a child or someone you trust can take part in a decision "
                "without seeing everything in it.") + "".join(S)
    return kit.write("family", "/family",
                     "Financial decisions rarely affect only one person.",
                     "How a partner, a parent or a trusted person takes part in a financial "
                     "decision with role-appropriate access.", body)


def build():
    yield personal()
    yield professional()
    yield form()
    yield family()
