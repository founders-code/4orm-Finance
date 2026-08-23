# -*- coding: utf-8 -*-
import kit
from pkit import hero, sec, softs, flow, duty, note, ARROW


def build():
    body = hero("Contact", "Not sure whether this applies to you?", "Ask.",
                "Tell us what your firm does and who regulates it. We will tell you whether the duty "
                "applies, what it asks for, and what it leaves alone. No charge, no obligation.")

    body += sec("Get in touch", "One email is enough to start.",
        '<div class="softs c2">'
        '<div class="soft gold rv"><span class="sk">Write to us</span>'
        '<h3>Tell us which regulator you answer to.</h3>'
        '<p>And roughly how many customer balances you carry. That is enough to make the first call '
        'useful.</p><div style="margin-top:16px">' +
        duty("Email", '<a href="mailto:office@4ormfinance.com" style="color:var(--blue-dp)">'
                      'office@4ormfinance.com</a>') +
        duty("Where we are", "Alberta, Canada") +
        duty("Cost of a first call", "Free") +
        duty("What we need from you", "No customer data, and we take no copy of any.") +
        '</div><div style="margin-top:22px;display:flex;gap:10px;flex-wrap:wrap">'
        '<a class="btn btn-p btn-sm" href="mailto:office@4ormfinance.com">Email us '
        '<span class="cir">' + ARROW + '</span></a>'
        '<a class="btn btn-g btn-sm" href="/the-rules">Read the rules first</a></div></div>'
        '<div class="soft blue rv d1"><span class="sk">The first call</span>'
        '<h3>Five questions, thirty minutes.</h3>' +
        flow([
            ("What your firm does", "With money that belongs to other people."),
            ("Which rule that puts you under", "There are ten kinds of firm and ten regulators."),
            ("What that rule asks for", "And on what clock."),
            ("How the work gets done today", "Spreadsheets, portals, month-end, whatever it is."),
            ("Whether we can help", "Sometimes we cannot, and we will say so."),
        ]) +
        '<div class="note note-m" style="margin-top:16px">A first call needs no customer data, and we take '
        'no copy of any. A deeper session runs under a written agreement.</div></div></div>')

    body += sec("Who writes to us", "Three kinds of message.",
        softs([
            ("Most common", "Does this apply to me?",
             "You hold money for other people and you want to know which rule you sit under. We will tell "
             "you what we know and point you at the wording.", "blue"),
            ("Already registered", "We know it applies",
             "The duty is live, the month-end is painful, and you want to see whether this helps. This is "
             "the conversation we are best at.", "gold"),
            ("Advisers", "You sign off on this work",
             "Accountants, reviewers and counsel who put their name to these records for clients. We want "
             "to hear how it looks from your side.", "ok"),
        ]), alt=True)

    yield kit.write("contact", "/contact", "Not sure whether this applies to you? Ask.",
                    "Tell us what your firm does and who regulates it. We will tell you whether the duty "
                    "applies, what it asks for, and what it leaves alone.", body)
