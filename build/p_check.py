# -*- coding: utf-8 -*-
"""The red flag check. A route into published registers, and a record that you looked."""
import kit
from pkit import hero, sec, softs, flow, note, cta

APP = '''
<div id="check-app">
  <form class="ck-form rv d1" id="ck-form" autocomplete="off">
    <div class="ck-row">
      <input id="ck-input" type="text" name="firm" placeholder="Type a company, a brokerage or a person"
             aria-label="Company, brokerage or person to check" maxlength="90" />
      <button type="submit">Check the registers</button>
    </div>
    <div class="ck-tracks" role="group" aria-label="What you are dealing with">
      <button type="button" data-track="mortgage">A mortgage</button>
      <button type="button" data-track="investing">An investment</button>
      <button type="button" data-track="payments">Payments or crypto</button>
      <button type="button" data-track="insurance">Insurance</button>
      <button type="button" data-track="lending">A loan</button>
      <button type="button" data-track="any" class="on">Show me everything</button>
    </div>
    <div class="ck-demos" aria-label="Worked examples on invented firms">
      <button type="button" data-demo="0">See a clean result</button>
      <button type="button" data-demo="1">See a penalty on the record</button>
      <button type="button" data-demo="2">See a firm that appears nowhere</button>
    </div>
  </form>
  <div id="check-out" aria-live="polite"></div>
</div>'''

STANCE = softs([
    ("We hold no list",
     "4orm does not keep a register of accused companies.",
     "There is no 4orm blacklist, no score and no opinion of ours attached to any firm. A list like that "
     "would be a private accusation, and a private accusation is worth less to you than a public finding.",
     ""),
    ("We send you to the source",
     "Every result traces to an authority that published it.",
     "Each register named here belongs to a regulator or a federal agency. You open it, you read what they "
     "wrote, and you keep their words rather than ours. If the register is silent, that silence is the answer.",
     "b"),
    ("We record that you looked",
     "The check becomes a dated line on your file.",
     "What you read, and when. If a firm later tells a different story about what you were told at the "
     "outset, the record already holds the date you did your own reading.",
     "g"),
])

WHY = flow([
    ("Absence is the finding people miss",
     "A firm taking money for a financial product in Canada is meant to appear on a register somewhere. "
     "The most common shape of a bad one is not a firm with a black mark. It is a firm with no entry at all, "
     "a good website, and an answer ready for why."),
    ("A licence is a starting point, not a verdict",
     "Licensed and penalized are not opposites. Plenty of registered firms carry a published penalty, and "
     "the register is what lets you hold both facts at once and ask about the second one before you sign."),
    ("Search the person as well as the firm",
     "People move between firms and the record follows the person. A brokerage with a spotless name can "
     "employ an advisor carrying a finding from three years and two employers ago."),
    ("Read the method, then read the name",
     "Most people are taken by a method rather than by a company. Pressure to move fast, a return that does "
     "not move with the market, a request to send funds somewhere that is not the firm. The Anti-Fraud "
     "Centre publishes what is being used on people this month."),
])

LIMITS = note("warn",
    "<b>What this check cannot tell you.</b> These registers cover the parts of finance that carry a "
    "licence or a registration. A contractor, a private lender operating outside the licensed channel, or a "
    "company incorporated last month will be absent from all of them, and absence there means only that "
    "nobody has looked. A clean read is also a moment in time: it describes what was published on the day "
    "you read it. Neither a clean read nor a silent register is advice from 4orm about whether to proceed, "
    "and 4orm does not make a finding about any company.")


def build():
    body = (
        hero("The red flag check",
             "Before you trust them,",
             "read what is already published.",
             "Type a company, a brokerage or a person. 4orm routes the name into the public registers "
             "Canadian regulators maintain, tells you what a hit in each one would mean, and keeps a dated "
             "record that you did the reading.")
        + '\n<section class="sec" id="check" style="padding-top:6px">\n  <div class="wrap">\n' + APP + '\n  </div>\n</section>\n'
        + sec("Where we stand", "The value is the route and the record, not an opinion of ours.",
              STANCE + LIMITS, alt=True, center=True,
              p="A search that told you a named company was dangerous, on our say so, would be worth nothing "
                "to you and a great deal of trouble to us both. So this does something more useful.")
        + sec("How to read a register", "Four things worth knowing before you type a name.", WHY,
              sid="how")
        + cta("A check is worth more when it is on the record.",
              "Reading a register protects you on the day. Holding the dated record of what you read, beside "
              "the transaction it belongs to, protects you for the years afterwards. That is the rest of 4orm.",
              primary=("Form your experience", "/#stage"),
              secondary=("The passport", "/passport"))
    )
    yield kit.write(
        "check", "/check-a-firm",
        "Check a firm against the public registers",
        "Type a company, a brokerage or a person. 4orm routes the name into the registers Canadian "
        "regulators publish, explains what a hit in each one means, and records that you looked.",
        body,
        extra='\n<script src="/assets/check.js?v=%s" defer></script>' % kit.V)
