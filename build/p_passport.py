# -*- coding: utf-8 -*-
import kit
from pkit import hero, sec, softs, flow, note, timeline, cta

ASKS = ["Can I afford a $700,000 house?", "What should I have ready?", "What will a broker ask me?",
        "Should I pay this debt down first?", "What does preapproval actually mean?",
        "What questions should I ask?", "Why is my broker asking for this?", "What did I authorize?",
        "Who has my information?", "Did my application change?", "How many lenders received it?",
        "Explain this commitment letter.", "What should I ask before signing?",
        "Does this document match what I was told?"]

READY = '''
<div class="readycard reveal rv">
  <div class="rh">
    <div class="rq">Mortgage readiness</div>
    <div class="rpct"><span class="n">82%</span><span class="t">prepared to begin an application</span></div>
    <div class="rbar"><i data-ready="82"></i></div>
    <div class="rnote">A preparation measure. Not a credit decision, not an approval, and not an
      indication of how much you can borrow.</div>
  </div>
  <div class="rsec"><div class="rlbl ok">Ready</div>
    <div class="ritem"><span class="ic ok">&#10003;</span>Identity</div>
    <div class="ritem"><span class="ic ok">&#10003;</span>Income</div>
    <div class="ritem"><span class="ic ok">&#10003;</span>Employment</div>
    <div class="ritem"><span class="ic ok">&#10003;</span>Down payment</div>
  </div>
  <div class="rsec"><div class="rlbl att">Needs attention</div>
    <div class="ritem"><span class="ic att">!</span>Two documents outstanding</div>
    <div class="ritem"><span class="ic att">!</span>Source of $18,000 not yet traced</div>
    <div class="ritem"><span class="ic att">!</span>Credit authorization not completed</div>
  </div>
</div>'''

CHECK = '''
<div class="checkpanel rv d1">
  <div class="ch">
    <div class="doc"><span class="di"></span><div>
      <div class="dn">Mortgage commitment letter</div>
      <div class="dd">Received today &middot; 6 pages &middot; Cascade Trust</div></div></div>
    <button class="btn btn-p btn-sm" data-check="1">Check with 4orm</button>
  </div>
  <div class="cb">
    <div class="checkhead" id="checkhead"><span class="cn">3</span>
      <span class="ct2">Three things to understand before continuing.</span></div>
    <div class="findings" id="checkfindings">
      <div class="finding"><div class="ft">Income changed</div>
        <div class="fv"><span class="was">$118,000</span><span>&rarr;</span><span class="now">$136,000</span></div>
        <div class="fd">You stated $118,000 on 14 February. The pay statement in your vault supports
          approximately $118,400 a year. This commitment relies on $136,000.</div></div>
      <div class="finding"><div class="ft">A fee that was not there before</div>
        <div class="fv"><span class="now">$2,400</span></div>
        <div class="fd">A broker fee of $2,400 appears in this version. It was not present in the document
          you were shown on 7 April.</div></div>
      <div class="finding"><div class="ft">A different term</div>
        <div class="fv"><span class="was">3 year fixed</span><span>&rarr;</span><span class="now">5 year fixed</span></div>
        <div class="fd">You recorded a preference for a 3 year fixed rate. This commitment is for 5 years.</div></div>
    </div>
    <div class="checkfoot" id="checkfoot">
      <div class="note note-i">Ask your mortgage professional about these items before proceeding. 4orm
        states what changed and what your own evidence supports. It does not tell you whether the change is
        wrong, and it does not give you advice about the product.</div>
    </div>
    <div class="note note-m" style="margin-top:16px">Every name, figure and document in this example is
      invented.</div>
  </div>
</div>'''


def build():
    S = []

    S.append(sec("The consumer product", "Four things, in the order you need them.",
        softs([
            ("ASK", "Understand the decision",
             "Plain answers to the questions you would rather not ask a broker, before you have one. "
             "Educational, and never a recommendation about a product.", "blue"),
            ("PREPARE", "Build your verified passport",
             "Identity, income, employment, assets, down payment and debts, each with the document behind "
             "it and a status you can see.", "gold"),
            ("CHECK", "Check before you proceed",
             "Applications, commitments, disclosures and offers, compared against what you said, what your "
             "documents support, and what you agreed to last time.", "ok"),
            ("PROTECT", "Keep the record of what happened",
             "Who has your information, what you authorized, what changed, and which version each decision "
             "was made on.", "blue"),
        ], cols=4),
        p="You open 4orm before you choose a broker. It prepares you, verifies you, builds your financial "
          "profile, and stays beside you through the transaction, independently of the broker and the lender."))

    S.append(sec("Ask", "The questions people are already asking, somewhere else.",
        '<div class="asks rv">%s</div>' % "".join('<span class="ask">%s</span>' % q for q in ASKS) +
        note("m", "The first half get asked before a broker exists. The second half get asked once one does, "
                  "and today there is nobody neutral to ask. Nothing here is an approval, and nothing here "
                  "is a regulated recommendation. The advice stays with the licensed professional you choose."),
        alt=True))

    S.append(sec("The readiness check", "Not what you are approved for. What you are prepared for.",
        '<div class="grid-side" style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);'
        'gap:44px;align-items:center">' + READY +
        '<div class="rv d1"><h3 style="font-size:23px;margin-bottom:14px">Why it reads this way</h3>'
        '<p style="font-size:15.5px;color:var(--tx-2);line-height:1.65">A number that looks like an approval '
        'would be one, and 4orm is not a lender. A preparation score says something more useful: here is '
        'what a professional will ask you for, here is what you already have, and here is what is missing.</p>'
        '<p style="font-size:15.5px;color:var(--tx-2);line-height:1.65;margin-top:14px">Identification, '
        'employment and income, down payment and assets, and debt information are what a mortgage '
        'professional needs at preapproval. The score is measured against that list and nothing else.</p>'
        '<div class="note note-m" style="margin-top:20px">Every item links to the document behind it, and '
        'every document shows what was read from it and whether you have confirmed it.</div></div></div>'))

    S.append(sec("Check before I sign", "Upload the document. See what moved since the last one.",
        CHECK +
        note("w", "<b>What it compares against.</b> What you told us, your verified information, what you "
                  "previously agreed to, previous versions of the document, and the record of the "
                  "conversation. An application, a commitment letter, a disclosure, a broker agreement, a "
                  "lender offer, a renewal offer or a financing agreement. The same check, whichever one "
                  "arrives."),
        p="This is the moment consumers have no help at all. A document arrives, it is long, it is the first "
          "time you have seen one, and the person explaining it is the person who prepared it.", alt=True))

    S.append(sec("Beyond mortgage", "One passport, one vault, one permission system.",
        timeline([
            ("TODAY", "Mortgage",
             "Preparation, the passport, the readiness check, sharing with a broker, and the evidence record "
             "through to closing. This is the build that exists.", "Live in the demonstration", "now"),
            ("NEXT", "Auto financing",
             "You walk into a dealership and use the passport you already hold. Check before you authorize a "
             "credit inquiry, check before the application is submitted, and be told if anything changes "
             "before you sign.", "In the experience today", ""),
            ("AFTER THAT", "Insurance, personal lending, investments, real estate",
             "Same consumer, same private vault, same permission system, same evidence engine. The passport "
             "follows the person rather than the product.", "Design intent", "next"),
        ]) +
        note("i", "<b>Which is why the passport is not named after a mortgage.</b> Mortgage Guardian is what "
                  "the passport looks like inside a mortgage. The passport itself is not tied to one kind of "
                  "decision, and neither is the vault underneath it."),
        p="The mortgage is the first decision, not the only one. Every one of these has the same shape: a "
          "large financial decision, a professional on the other side of the table, documents you see once, "
          "and no record afterwards that belongs to you."))

    S.append(sec("What it is not", "Five limits, so nobody is surprised later.",
        flow([
            ("4orm is not a brokerage, a lender, a law firm or a regulator",
             "It gives educational guidance and shows you your own record."),
            ("A readiness score is a preparation measure",
             "It is not a credit decision, an approval, or an indication of how much you can borrow."),
            ("Where two sources disagree, both are shown",
             "4orm does not decide who is right and does not allege that anybody did anything wrong."),
            ("Withdrawing a permission stops future use",
             "It does not erase what was lawfully done before it."),
            ("The product is under development",
             "4orm Finance is an Alberta company and it is pre-revenue. Everything here describes what the "
             "software is built to do."),
        ]), alt=True))

    S.append(cta("See it running, on an invented file.",
                 "One transaction, three views. The conversation, the passport, the permission, the "
                 "submission, the change nobody flagged, and the record it all produces."))

    body = hero("The consumer side &middot; starting with mortgages",
                "Walk in prepared.", "Stay protected all the way through.",
                "Before you speak to anyone about a mortgage, 4orm prepares you, verifies you, builds your "
                "financial profile, and stays beside you through the transaction, independently of the "
                "broker and the lender.") + "".join(S)

    yield kit.write("passport", "/passport", "The 4orm Financial Passport",
                    "Ask, prepare, check and protect. A verified financial passport you own, in a vault you "
                    "control, and a check on every document before you sign it.", body)
