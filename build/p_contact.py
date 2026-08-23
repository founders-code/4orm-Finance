# -*- coding: utf-8 -*-
from ikit import section, tiles, cx_card, cx_grid, cx_para, cx_lines, ol, ARROW

S = []

S.append(section(
    "Get in touch",
    "One email is enough to start.",
    cx_grid([
        cx_card("Write to us", "Tell us which regulator you answer to.",
                cx_para("And roughly how many customer balances you carry. That is enough to make the first call "
                        "useful.")
                + "\n" + cx_lines([
                    ("Email", '<a class="cv" href="mailto:office@4ormfinance.com">office@4ormfinance.com</a>'),
                    ("Where we are", "Alberta, Canada"),
                    ("Cost of a first call", "Free"),
                    ("What we need from you", "No customer data, and we take no copy of any."),
                ])
                + '\n    <div style="margin-top:24px; display:flex; gap:10px; flex-wrap:wrap">'
                  '<a class="btn btn-primary btn-sm" href="mailto:office@4ormfinance.com">Email us ' + ARROW + '</a>'
                  '<a class="btn btn-ghost btn-sm" href="/the-rules">Read the rules first</a></div>',
                accent=True),
        cx_card("The first call", "Five questions, 30 minutes.",
                ol(["What your firm does with money that belongs to other people.",
                    "Which rule that puts you under.",
                    "What that rule asks for, and on what clock.",
                    "How the work gets done at your firm today.",
                    "Whether we can help. Sometimes we cannot."])
                + "\n" + cx_para("A first call needs no customer data, and we take no copy of any. A deeper "
                                 "session runs under a written agreement.")),
    ])))

S.append(section(
    "Who writes to us",
    "Three kinds of message.",
    tiles([
        ("Most common", "Does this apply to me?",
         "You hold money for other people and you want to know which rule you sit under. We will tell you what we "
         "know and point you at the wording."),
        ("Already registered", "We know it applies",
         "The duty is live, the month-end is painful, and you want to see whether this helps. This is the "
         "conversation we are best at."),
        ("Advisers", "You sign off on this work",
         "Accountants, reviewers and counsel who put their name to these records for clients. We want to hear how "
         "it looks from your side."),
    ]),
    band=True))

PAGE = {
    "slug": "contact",
    "title": "Not sure whether this applies to you? Ask.",
    "desc": "Tell us what your firm does and who regulates it. We will tell you whether the duty applies, what it asks for, and what it leaves alone. No charge, no obligation.",
    "hero": ("Contact",
             "Not sure whether this applies to you?",
             "Ask.",
             "Tell us what your firm does and who regulates it. We will tell you whether the duty applies, what it "
             "asks for, and what it leaves alone. No charge, no obligation."),
    "sections": S,
}
