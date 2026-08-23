# -*- coding: utf-8 -*-
"""The 4orm Financial Passport. The consumer product, starting with mortgages."""
from ikit import section, tiles, callout, cx_card, cx_grid, cx_para, cx_lines, ol, ARROW

ASKS = [
    "Can I afford a $700,000 house?",
    "What should I have ready?",
    "What will a broker ask me?",
    "Should I pay this debt down first?",
    "What does preapproval actually mean?",
    "What questions should I ask?",
    "Why is my broker asking for this?",
    "What did I authorize?",
    "Who has my information?",
    "Did my application change?",
    "How many lenders received it?",
    "Explain this mortgage commitment.",
    "What should I ask before signing?",
    "Does this document match what I was told?",
]

PASSPORT = [
    ("Identity", "Verified"), ("Income", "Verified"), ("Employment", "Supported"),
    ("Assets", "Recorded"), ("Down payment", "Traced"), ("Debts", "Recorded"),
    ("Documents", "Held in your vault"), ("Readiness", "Scored, not approved"),
]

READY_OK = ["Identity", "Income", "Employment", "Down payment"]
READY_ATT = ["Two documents outstanding", "Source of $18,000 not yet traced",
             "Credit authorization not completed"]

S = []

# ---- the four things -------------------------------------------------------
S.append(section(
    "The consumer product",
    "Four things, in the order you need them.",
    '<div class="pillars">'
    '<div class="pillar reveal"><div class="pw">ASK</div><h3>Understand the decision</h3>'
    '<p>Plain answers to the questions you would rather not ask a broker, before you have one. '
    'Educational, not a recommendation.</p></div>'
    '<div class="pillar reveal rv-d1"><div class="pw">PREPARE</div><h3>Build your verified passport</h3>'
    '<p>Identity, income, employment, assets, down payment and debts, each with the document behind it '
    'and a status you can see.</p></div>'
    '<div class="pillar reveal rv-d2"><div class="pw">CHECK</div><h3>Check before you proceed</h3>'
    '<p>Applications, commitments, disclosures and offers, compared against what you said, what your '
    'documents support, and what you agreed to last time.</p></div>'
    '<div class="pillar reveal rv-d3"><div class="pw">PROTECT</div><h3>Keep the record of what happened</h3>'
    '<p>Who has your information, what you authorized, what changed, and which version each decision '
    'was made on.</p></div>'
    '</div>',
    p="You open 4orm before you choose a broker. It prepares you, verifies you, builds your financial "
      "profile, and stays beside you through the transaction, independently of the broker and the lender."))

# ---- ask -------------------------------------------------------------------
S.append(section(
    "Ask",
    "The questions people are already asking, somewhere else.",
    '<div class="asks reveal">%s</div>' % "".join('<span class="ask">%s</span>' % q for q in ASKS)
    + "\n" + callout(
        "Educational, and it says so.",
        "Nothing here is a mortgage approval, and nothing here is a regulated recommendation about a "
        "mortgage product.",
        "The answers explain the process, the vocabulary and your own file. The decision, and the advice, "
        "stay with the licensed professional you choose."),
    p="The first half are asked before a broker exists. The second half are asked once one does, and "
      "today there is nobody neutral to ask.",
    band=True))

# ---- prepare ---------------------------------------------------------------
S.append(section(
    "Prepare",
    "A passport you own, in a vault you control.",
    cx_grid([
        cx_card("The passport", "What it carries.",
                '<div class="ppgrid" style="margin-top:16px">%s</div>'
                % "".join('<div class="ppchip"><div class="pt">%s</div><div class="ps">%s</div></div>'
                          % (a, b) for a, b in PASSPORT), accent=True),
        cx_card("The vault", "Who can see it.",
                cx_para("The passport sits in a private consumer vault. You own it and you control access "
                        "to it. Nothing is shared with a broker, a brokerage or a lender until you grant "
                        "the permission, and each permission is scoped, timestamped and withdrawable.")
                + "\n" + cx_lines([
                    ("Held by", "You"),
                    ("Shared with", "Nobody, until you say so"),
                    ("Each permission", "Scoped, dated and withdrawable"),
                    ("Withdrawing one", "Stops future use. It does not erase what was lawfully done before it"),
                ])),
    ])))

# ---- readiness -------------------------------------------------------------
READY = (
    '<div class="readycard reveal">'
    '  <div class="rh">'
    '    <div class="rq">Mortgage readiness</div>'
    '    <div class="rpct"><span class="n">82%%</span><span class="t">prepared to begin an application</span></div>'
    '    <div class="rbar"><i data-ready="82"></i></div>'
    '    <div class="rnote">This is a preparation score. It is not a credit decision, not an approval, '
    'and not an indication of how much you can borrow.</div>'
    '  </div>'
    '  <div class="rsec"><div class="rlbl ok">Ready</div>%s</div>'
    '  <div class="rsec"><div class="rlbl att">Needs attention</div>%s</div>'
    '</div>'
) % (
    "".join('<div class="ritem"><span class="ic ok">&#10003;</span>%s</div>' % r for r in READY_OK),
    "".join('<div class="ritem"><span class="ic att">!</span>%s</div>' % r for r in READY_ATT),
)

S.append(section(
    "The readiness check",
    "Not what you are approved for. What you are prepared for.",
    '<div class="grid-side" style="align-items:center">%s<div>%s</div></div>' % (
        READY,
        '<div class="reveal rv-d1">'
        '<h3 style="font-size:22px; margin-bottom:14px">Why it reads this way</h3>'
        '<p style="font-size:15.5px; color:var(--text-2); line-height:1.65">A number that looks like an '
        'approval would be one, and 4orm is not a lender. A preparation score says something different and '
        'more useful: here is what a broker or a lender is going to ask you for, here is what you already '
        'have, and here is what is missing.</p>'
        '<p style="font-size:15.5px; color:var(--text-2); line-height:1.65; margin-top:14px">Identification, '
        'employment and income, down payment and assets, and debt information are what a mortgage '
        'professional needs at preapproval. The score is measured against that list and nothing else.</p>'
        '<div class="note note-mute" style="margin-top:20px">Every item links to the document behind it, '
        'and every document shows what was read from it and whether you have confirmed it.</div>'
        '</div>'),
    band=True))

# ---- share -----------------------------------------------------------------
S.append(section(
    "Share my passport",
    "The broker meets a prepared client, not a blank form.",
    tiles([
        ("Before", "You start from zero, every time",
         "A first meeting is a document request list. You go away, gather, send, and wait to find out "
         "whether it was the right thing."),
        ("With the passport", "You arrive with the evidence already assembled",
         "You choose the professional. You choose what to share. They receive a prepared, evidence "
         "supported client, and the work starts at the second step rather than the first."),
        ("Either way", "The key stays with you",
         "You can narrow a permission or withdraw it. The record of what was shared, and when, does not "
         "disappear when you do."),
    ]),
    p="Sarah finds a broker. Instead of starting again, she shares a passport she already owns, and she "
      "decides what goes in it."))

# ---- check before I sign ---------------------------------------------------
CHECK = (
    '<div class="checkpanel reveal">'
    '  <div class="ch">'
    '    <div class="doc"><span class="di"></span><div>'
    '      <div class="dn">Mortgage commitment letter</div>'
    '      <div class="dd">Received today &middot; 6 pages &middot; Cascade Trust</div></div></div>'
    '    <button class="btn btn-primary btn-sm" data-check="1">Check with 4orm</button>'
    '  </div>'
    '  <div class="cb">'
    '    <div class="checkhead" id="checkhead"><span class="cn">3</span>'
    '      <span class="ct2">Three things to understand before continuing.</span></div>'
    '    <div class="findings" id="checkfindings">'
    '      <div class="finding"><div class="ft">Income changed</div>'
    '        <div class="fv"><span class="was">$118,000</span><span>&rarr;</span><span class="now">$136,000</span></div>'
    '        <div class="fd">You stated $118,000 on 14 February. The pay statement in your vault supports '
    'approximately $118,400 a year. This commitment relies on $136,000.</div></div>'
    '      <div class="finding"><div class="ft">A fee that was not there before</div>'
    '        <div class="fv"><span class="now">$2,400</span></div>'
    '        <div class="fd">A broker fee of $2,400 appears in this version. It was not present in the '
    'document you were shown on 7 April.</div></div>'
    '      <div class="finding"><div class="ft">A different term</div>'
    '        <div class="fv"><span class="was">3 year fixed</span><span>&rarr;</span><span class="now">5 year fixed</span></div>'
    '        <div class="fd">You recorded a preference for a 3 year fixed rate. This commitment is for 5 years.</div></div>'
    '    </div>'
    '    <div class="checkfoot" id="checkfoot">'
    '      <div class="note note-info">Ask your mortgage professional about these items before proceeding. '
    '4orm states what changed and what your own evidence supports. It does not tell you whether the change '
    'is wrong, and it does not give you advice about the product.</div>'
    '    </div>'
    '    <div class="note note-mute" style="margin-top:16px">Every name, figure and document in this '
    'example is invented.</div>'
    '  </div>'
    '</div>'
)

S.append(section(
    "Check before I sign",
    "Upload the document. See what moved since the last one.",
    CHECK + "\n" + callout(
        "What it compares against.",
        "What you told us, your verified information, what you previously agreed to, previous versions of "
        "the document, and the record of the conversation.",
        "An application, a commitment letter, a disclosure, a broker agreement, a lender offer, a renewal "
        "offer or a financing agreement. The same check, whichever one arrives."),
    p="This is the moment consumers have no help at all. A document arrives, it is long, it is the first "
      "time you have seen one, and the person explaining it is the person who prepared it."))

# ---- beyond mortgage -------------------------------------------------------
S.append(section(
    "Beyond mortgage",
    "One passport, one vault, one permission system.",
    '<div class="ladder reveal">'
    '  <div class="rung now"><div class="when">Today</div><div><div class="what">Mortgage</div>'
    '    <div class="desc">Preparation, the passport, the readiness check, sharing with a broker, and the '
    'evidence record through to closing. This is the build that exists.</div></div></div>'
    '  <div class="rung"><div class="when">Next</div><div><div class="what">Auto financing</div>'
    '    <div class="desc">You walk into a dealership and use the passport you already hold. Check before '
    'you authorize a credit inquiry, check before the application is submitted, and be told if anything '
    'changes before you sign.</div></div></div>'
    '  <div class="rung"><div class="when">After that</div><div><div class="what">Insurance, personal '
    'lending, investments, real estate</div>'
    '    <div class="desc">Same consumer, same private vault, same permission system, same evidence engine. '
    'The passport follows the person rather than the product.</div></div></div>'
    '</div>'
    + "\n" + callout(
        "Which is why the passport is not named after a mortgage.",
        "",
        "Mortgage Guardian is what the passport looks like inside a mortgage. The passport itself is not "
        "tied to one kind of decision, and neither is the vault underneath it."),
    p="The mortgage is the first decision, not the only one. Every one of these has the same shape: a large "
      "financial decision, a professional on the other side of the table, documents you see once, and no "
      "record afterwards that belongs to you.",
    band=True))

# ---- the two sided point ---------------------------------------------------
S.append(section(
    "What is happening underneath",
    "The consumer gets a guardian. The business gets a record.",
    cx_grid([
        cx_card("What the consumer downloads", "Help with a decision that matters.",
                cx_para("Nobody wants compliance evidence software. People do want to understand a large "
                        "financial decision before they make it, to know who holds their information, and "
                        "to be told when something changes.")),
        cx_card("What the transaction gains", "The evidence, built as a by-product.",
                ol(["Identity and verification, captured once and reusable.",
                    "A permission ledger showing who received what, and when.",
                    "Provenance on every value, from where it was stated to where it was relied on.",
                    "A decision history that survives staff changes on either side.",
                    "A transaction record another professional could re-perform."]), accent=True),
    ])
    + "\n" + callout(
        "One journey, two products.",
        "Every question answered, document uploaded and permission granted does both jobs at once.",
        "That is the whole design."),
    p="This is the same engine described everywhere else on this site, entered from the other end."))

# ---- limits ----------------------------------------------------------------
S.append(section(
    "What it is not",
    "Five limits, so nobody is surprised later.",
    cx_grid([
        cx_card("Limits", "The boundary.",
                ol(["4orm is not a mortgage brokerage, a lender, a law firm or a regulator.",
                    "It gives educational guidance and shows you your own record. It does not give "
                    "regulated advice about which mortgage product to take.",
                    "A readiness score is a preparation measure. It is not a credit decision, an approval, "
                    "or an indication of how much you can borrow.",
                    "Where two sources disagree, both are shown. 4orm does not decide who is right and does "
                    "not allege that anybody did anything wrong.",
                    "Withdrawing a permission stops future use. It does not erase what was lawfully done "
                    "before it."]),
                accent=True),
        cx_card("Where we are", "Pre-revenue, and under development.",
                cx_para("4orm Finance is an Alberta company. It is pre-revenue and the platform is under "
                        "development. Everything on this page describes what the software is built to do, "
                        "not a running system with customers behind it.")
                + "\n" + cx_para('The mortgage experience is built and clickable today. '
                                 '<a class="cv" href="/mortgage">Open the demonstration</a> and it runs the '
                                 'whole journey on invented data.')),
    ])))

# ---- close -----------------------------------------------------------------
S.append('''
<section class="section alt">
  <div class="wrap">
    <div class="closer reveal">
      <h2>See it running, on an invented file.</h2>
      <p>Fifteen scenes, one seeded transaction, four points of view. The conversation, the passport, the
        consent ledger, the submission, the change nobody flagged, and the record it all produces.</p>
      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap">
        <a class="btn btn-primary" href="/mortgage">Open Mortgage Guardian %s</a>
        <a class="btn btn-ghost" href="/contact">Talk to us</a>
      </div>
    </div>
  </div>
</section>
''' % ARROW)

PAGE = {
    "slug": "passport",
    "title": "The 4orm Financial Passport",
    "desc": "Before you speak to anyone about a mortgage, 4orm prepares you, verifies you, builds your financial profile, and stays beside you through the transaction, independently of the broker and the lender.",
    "hero": ("The consumer side &middot; starting with mortgages",
             "Walk in prepared.",
             "Stay protected all the way through.",
             "Before you speak to anyone about a mortgage, 4orm prepares you, verifies you, builds your "
             "financial profile, and stays beside you through the transaction, independently of the broker "
             "and the lender."),
    "sections": S,
}
