# -*- coding: utf-8 -*-
"""The home page.

The landing page captures attention. The experiences make somebody say
"I get it." This page has to make them say "now I understand why this
company needs to exist."

It is written as one story, not a set of features, and it is deliberately
the only page on the site allowed to run long. One dominant idea per
viewport, and the thin blue line carries the relationship the whole way
down: connection, then permission, then information, then evidence.

Nothing here leads with AI, compliance, regulators, penalties or KYC.
Those arrive late, as proof of what sits underneath the relationship.
"""
import kit

ARROW = ('<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
         'stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">'
         '<path d="M5 12h14M13 5l7 7-7 7"/></svg>')


# ---------------------------------------------------------------- 01 thesis
THESIS = """
<section class="hs hs-thesis">
  <div class="hwrap">
    <h1 class="hbig rv">Better financial decisions<br />start with <span class="bl">better
      relationships.</span></h1>
    <p class="hlede rv d1">4orm helps people understand important financial decisions, and gives
      the firms serving them a clearer, more defensible record of the relationship.</p>

    <div class="htwo rv d2">
      <div class="hside">
        <span class="hk">For you</span>
        <p class="hsh">Know before you decide.</p>
        <a class="hb hb-p" href="/#personal">Experience 4orm <span class="cir">{a}</span></a>
      </div>
      <span class="hsplit" aria-hidden="true"></span>
      <div class="hside">
        <span class="hk">For your firm</span>
        <p class="hsh">Protect the relationship.<br />Prove the work.</p>
        <a class="hb hb-g" href="/#professional">For firms <span class="cir">{a}</span></a>
      </div>
    </div>
  </div>
</section>
""".format(a=ARROW)


# ------------------------------------------------------------- 02 the pain
SCATTER = ["Conversation", "Email", "Documents", "Broker", "Application", "Lender",
           "Credit", "Consent", "Text message", "Disclosure", "Decision"]

# hand placed, so it reads as scattered rather than as a grid pretending to be scattered
POS = [(8, 6), (67, 2), (30, 17), (79, 22), (4, 32), (52, 12), (88, 44),
       (18, 49), (60, 39), (38, 60), (74, 63)]

PAIN = """
<section class="hs hs-pain">
  <div class="hwrap">
    <h2 class="hh rv">Financial decisions are not<br />happening in one place.</h2>
    <div class="scatter rv d1" aria-hidden="true">
      {words}
      <svg class="thread" viewBox="0 0 1000 420" preserveAspectRatio="none">
        <path d="M20,300 C180,300 200,90 380,110 C540,128 520,330 700,300 C840,276 880,180 985,150" />
      </svg>
    </div>
    <p class="hsub rv d2">Important financial decisions move through conversations, people,
      documents and systems that were never designed to preserve the whole relationship.</p>
    <p class="hpunch rv d3">That is where things get lost.</p>
  </div>
</section>
""".format(words="".join(
    '<span class="sw" style="left:{}%;top:{}%">{}</span>'.format(x, y, w)
    for w, (x, y) in zip(SCATTER, POS)))


# -------------------------------------------------------------- 03 the data
NUMS = [
    ("$704M+", "Reported to the Canadian Anti-Fraud Centre as lost to fraud in 2025, across more "
               "than 112,000 reports.", "Canadian Anti-Fraud Centre"),
    ("47%", "of homebuyers reported feeling uncertain or concerned during the process. Better "
            "than it was, and still nearly half of them.", "CMHC Mortgage Consumer Survey 2026"),
    ("100%", "of the private mortgage files reviewed in one supervision exercise had no documented "
             "suitability assessment.", "Financial Services Regulatory Authority of Ontario"),
    ("100%", "of the entities examined in that same review had inadequate supervision of their "
             "mortgage brokering.", "Financial Services Regulatory Authority of Ontario"),
]

DATA = """
<section class="hs hs-data">
  <div class="hwrap">
    <h2 class="hh rv">The numbers tell the story.</h2>
    <div class="nums">
      {rows}
    </div>
    <p class="hsub rv">People need clarity. Firms need evidence. Both of them need a better
      relationship.</p>
    <a class="hlink rv" href="/why-4orm">See the research {a}</a>
  </div>
</section>
""".format(a=ARROW, rows="".join(
    '<div class="num rv"><span class="nfig">{}</span><p class="nbody">{}</p>'
    '<span class="nsrc">{}</span></div>'.format(n, b, s) for n, b, s in NUMS))


# -------------------------------------------------------------- 04 the line
EVENTS = ["Question", "Information", "Verification", "Permission", "Professional",
          "Recommendation", "Change", "Decision", "Evidence"]

LINE = """
<section class="hs hs-line">
  <div class="hwrap">
    <h2 class="hh rv">One relationship.<br />One connected record.</h2>
    <div class="rel rv d1">
      <div class="relend"><span class="rk">You</span></div>
      <div class="relmid">
        <span class="relline" aria-hidden="true"></span>
        <div class="relev">{ev}</div>
      </div>
      <div class="relend"><span class="rk">Your firm</span></div>
    </div>
    <p class="hsub rv d2">4orm preserves the context between these moments, rather than only the
      documents made at the end of them.</p>
  </div>
</section>
""".format(ev="".join('<span class="rev" style="--i:{}">{}</span>'.format(i, e)
                      for i, e in enumerate(EVENTS)))


# ---------------------------------------------------------- 05 consumer side
CONSUMER = """
<section class="hs hs-you">
  <div class="hwrap hsplit2">
    <div class="hcol">
      <span class="hk rv">For you</span>
      <h2 class="hh rv">Know before<br />you decide.</h2>
      <p class="hsub left rv d1">Ask the questions you would rather not ask out loud. Prepare
        properly. Check who you are dealing with. Understand what you are being asked to share,
        and see it when something changes.</p>
      <p class="hclaim rv d2">Your information. Your decision.</p>
      <p class="hfine rv d2">You can see what you have provided, what has been verified, and what
        you are being asked to share. Where permission is required, 4orm asks before information
        moves.</p>
      <div class="hbtns rv d3">
        <a class="hb hb-p" href="/#personal">Pick up 4orm <span class="cir">{a}</span></a>
        <a class="hb hb-g" href="/how-it-works">How it works</a>
      </div>
    </div>
    <div class="hcol hphone rv d1">
      <a class="phoneshot" href="/#personal" aria-label="Pick up the 4orm phone">
        <span class="psnotch" aria-hidden="true"></span>
        <span class="pshead">Your 4orm</span>
        <span class="pssub">Before anybody has sold you anything</span>
        <span class="psrow">Mortgage</span>
        <span class="psrow">Auto</span>
        <span class="psrow soon2">Insurance</span>
        <span class="psrow soon2">Lending</span>
        <span class="psask">Ask your 4orm Guardian anything</span>
        <span class="psgo">Pick up 4orm {a}</span>
      </a>
    </div>
  </div>
</section>
""".format(a=ARROW)


# ------------------------------------------------------ 06 professional side
PRO = """
<section class="hs hs-pro">
  <div class="hwrap hsplit2 flip">
    <div class="hcol">
      <span class="hk rv">For your firm</span>
      <h2 class="hh rv">Better prepared clients.<br />Better relationships.</h2>
      <p class="hsub left rv d1">The client arrives with their identity verified and their income
        supported. And when something stops matching, it surfaces while it is still a correction
        rather than an allegation.</p>
      <p class="hclaim rv d2">Protect the relationship before it becomes an argument.</p>
    </div>
    <div class="hcol rv d1">
      <div class="minirec">
        <div class="mrhead"><b>Sarah Mitchell</b><span>Mortgage &middot; MTG-2026-0417</span></div>
        <div class="mrrow"><span>Identity</span><em class="ok">Verified</em></div>
        <div class="mrrow"><span>Income</span><em class="doc">Document supported</em></div>
        <div class="mrrow"><span>Permissions</span><em class="ok">Current</em></div>
        <div class="mrrow"><span>Questions</span><em class="ok">Resolved</em></div>
        <div class="mrrow att"><span>Needs attention</span><em class="warn">1</em></div>
        <div class="mrflag">
          <b>The income does not match.</b>
          <div class="mrcmp">
            <span><i>Supported by the client</i>$120,000</span>
            <span class="v"><i>On the application</i>$138,000</span>
          </div>
          <div class="mracts"><span>Explain</span><span>Correct</span><span>Request evidence</span></div>
        </div>
      </div>
    </div>
  </div>
</section>
"""


# --------------------------------------------------------- 07 the executive
EXEC = """
<section class="hs hs-exec">
  <div class="hwrap">
    <h2 class="hh rv">Know how your clients<br />are actually being served.</h2>
    <div class="exnums rv d1">
      <div class="exn"><span class="exf">148</span><span class="exl">Active relationships</span></div>
      <div class="exn"><span class="exf ok">141</span><span class="exl">On track</span></div>
      <div class="exn"><span class="exf warn">7</span><span class="exl">Need attention</span></div>
    </div>
    <ul class="exlist rv d2">
      <li>A client question nobody has answered</li>
      <li>Information that differs from the evidence behind it</li>
      <li>A material change waiting to be acknowledged</li>
      <li>A permission that was never given</li>
      <li>The same document requested three times</li>
    </ul>
    <p class="hsub rv d3">4orm surfaces material relationship gaps while there is still time to
      do something about them.</p>
    <p class="hpunch rv d3">Not employee surveillance. Relationship integrity.</p>
  </div>
</section>
"""


# ------------------------------------------------------ 08 the evidence reveal
TIMELINE = [
    ("09:14", "Question asked, and answered", "In her own words, before any professional existed"),
    ("09:31", "Identity verified", "Government photo ID, confirmed"),
    ("10:02", "Income supported", "Employment letter, $120,000"),
    ("10:23", "Permission given, knowingly", "What was shown, and what was agreed"),
    ("10:24", "Information shared", "To Alex Morgan, six items, chosen one by one"),
    ("14:41", "A difference found", "The application read $138,000"),
    ("15:06", "Explained and corrected", "By the professional whose job it was"),
]

REVEAL = """
<section class="hs hs-reveal dark">
  <div class="hwrap">
    <h2 class="hh rv">The evidence was being created<br />the whole time.</h2>
    <div class="evline rv d1">
      {rows}
    </div>
    <div class="revfour rv d2">
      <p>The person experienced guidance.</p>
      <p>The professional experienced a better prepared client.</p>
      <p>The firm received a clearer record.</p>
      <p>4orm preserved what mattered between them.</p>
    </div>
    <p class="hpunch light rv d3">One honest interaction. One defensible record.</p>
  </div>
</section>
""".format(rows="".join(
    '<div class="evr"><span class="evt2">{}</span><span class="evh">{}</span>'
    '<span class="evs">{}</span></div>'.format(t, h, s) for t, h, s in TIMELINE))


# ------------------------------------------------------- 09 the regulators
QUOTES = [
    ("Tell a clear story.", "How FSRA describes what suitability documentation should do."),
    ("Show your work.", "The same regulator, on what a file has to contain."),
    ("Re-performance.", "The test: could a reviewer outside the firm follow the reasoning again."),
]

REGS = """
<section class="hs hs-regs">
  <div class="hwrap">
    <h2 class="hh rv">The standard is moving<br />toward proof.</h2>
    <div class="quotes">
      {rows}
    </div>
    <p class="hsub rv">The expectation is no longer simply that a process happened. Firms
      increasingly need records capable of showing how and why a decision was reached.</p>
    <a class="hlink rv" href="/the-standard">See what regulators are asking for {a}</a>
  </div>
</section>
""".format(a=ARROW, rows="".join(
    '<figure class="quote rv"><blockquote>&ldquo;{}&rdquo;</blockquote>'
    '<figcaption>{}</figcaption></figure>'.format(q, c) for q, c in QUOTES))


# ------------------------------------------------------- 10 what 4orm is not
NOT = """
<section class="hs hs-not">
  <div class="hwrap">
    <h2 class="hh rv">We do not replace<br />the relationship.</h2>
    <div class="nots">
      <p class="rv">Not your mortgage broker.</p>
      <p class="rv d1">Not your dealer.</p>
      <p class="rv d2">Not your lender.</p>
      <p class="rv d3">Not the regulator.</p>
    </div>
    <p class="hpunch rv">4orm makes the relationship clearer.</p>
    <p class="hfine mid rv">The professional stays responsible for professional judgment and
      regulated advice. 4orm helps a person understand, prepare, and keep what mattered around
      the decision.</p>
  </div>
</section>
"""


# ------------------------------------------------------------- 11 privacy
PRIVACY = """
<section class="hs hs-priv dark">
  <div class="hwrap">
    <h2 class="hbig light rv">Your financial life<br />is not ours.</h2>
    <ul class="privlist rv d1">
      <li>See what you have shared.</li>
      <li>Know why information is being asked for.</li>
      <li>Control optional permissions, where they are optional.</li>
      <li>Correct what is wrong.</li>
      <li>Understand where every piece of it came from.</li>
    </ul>
    <p class="hfine light rv d2">One honest limit: a participating firm may have its own legal
      duty to keep records after information has reached it. Withdrawing future access does not
      undo that, and we will not tell you otherwise.</p>
    <a class="hlink light rv d2" href="/privacy">How 4orm handles information {a}</a>
  </div>
</section>
""".format(a=ARROW)


# ------------------------------------------------------------- 12 breadth
BREADTH = """
<section class="hs hs-breadth">
  <div class="hwrap">
    <h2 class="hh rv">Starting with the decisions<br />that matter most.</h2>
    <div class="decs rv d1">
      <a class="dec" href="/industries/mortgage"><b>Mortgage</b><span>Experience available</span></a>
      <a class="dec" href="/industries/auto"><b>Auto</b><span>Experience available</span></a>
      <a class="dec" href="/industries/insurance"><b>Insurance</b><span class="exp">Expanding</span></a>
      <a class="dec" href="/industries/lending"><b>Lending</b><span class="exp">Expanding</span></a>
    </div>
    <p class="hsub rv d2">Different decisions. The same need to understand it, permission it,
      know where it came from, and be able to show it afterwards.</p>
    <a class="hlink rv d2" href="/industries">All seven decisions {a}</a>
  </div>
</section>
""".format(a=ARROW)


# --------------------------------------------------------- 13 integrations
CAPS = ["Identity", "Financial data", "Credit", "Documents",
        "Professional systems", "Authoritative sources", "Reporting"]

INTEG = """
<section class="hs hs-int">
  <div class="hwrap">
    <h2 class="hh rv">Built to work with<br />the financial system.</h2>
    <div class="orbit rv d1">
      <div class="orow">{top}</div>
      <span class="ocore">4orm</span>
      <div class="orow">{bottom}</div>
    </div>
    <p class="hsub rv d2">4orm does not need to replace the systems a firm already runs. It
      connects the evidence that matters around them.</p>
  </div>
</section>
""".format(
    top="".join('<span class="ocap" style="--i:{}">{}</span>'.format(i, c)
                for i, c in enumerate(CAPS[:4])),
    bottom="".join('<span class="ocap" style="--i:{}">{}</span>'.format(i + 4, c)
                   for i, c in enumerate(CAPS[4:])))


# ------------------------------------------------------------- 14 the close
CLOSE = """
<section class="hs hs-close">
  <div class="hwrap">
    <h2 class="hbig rv">Better financial decisions<br />start with <span class="bl">better
      relationships.</span></h2>
    <div class="htwo rv d1">
      <div class="hside">
        <span class="hk">I am making a decision</span>
        <a class="hb hb-p" href="/#personal">Experience 4orm <span class="cir">{a}</span></a>
      </div>
      <span class="hsplit" aria-hidden="true"></span>
      <div class="hside">
        <span class="hk">I serve clients</span>
        <a class="hb hb-p" href="/#professional">See 4orm for firms <span class="cir">{a}</span></a>
      </div>
    </div>
    <a class="hlink rv d2" href="/contact">Talk to 4orm {a}</a>
  </div>
</section>
""".format(a=ARROW)


def build():
    body = (THESIS + PAIN + DATA + LINE + CONSUMER + PRO + EXEC + REVEAL +
            REGS + NOT + PRIVACY + BREADTH + INTEG + CLOSE)
    yield kit.write(
        "homepage", "/home",
        "Better financial decisions start with better relationships.",
        "4orm helps people understand important financial decisions, and gives the firms serving "
        "them a clearer, more defensible record of the relationship.",
        body,
        extra='\n<script src="/assets/homepage.js?v=%s" defer></script>' % kit.V)
