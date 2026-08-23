# -*- coding: utf-8 -*-
"""Contact.

Three routes, because three very different people arrive here and each of
them wants something different. Nothing on this page asks a visitor what
regulator they answer to before it will talk to them.
"""
import kit
from pkit import hero, sec, note

EMAIL = "office@4ormfinance.com"

ROUTES = [
    ("I am using 4orm",
     "A question about the product, something that is not working, or a piece of feedback.",
     "Contact 4orm", "?subject=Using%204orm"),
    ("I work in financial services",
     "See how 4orm would sit alongside the way you already work with your clients, and what it "
     "would give the firm.",
     "Request a walkthrough", "?subject=Walkthrough%20request"),
    ("I am interested in the company",
     "Investor, advisor, technology, media, or a strategic relationship.",
     "Contact the team", "?subject=About%20the%20company"),
]


def build():
    cards = "".join(
        '<a class="croute rv" href="mailto:%s%s">'
        '<span class="crk">%s</span>'
        '<p class="crb">%s</p>'
        '<span class="crc">%s <b>&#8594;</b></span>'
        '</a>' % (EMAIL, q, k, b, c)
        for k, b, c, q in ROUTES)

    S = [sec("Three ways in", "Tell us which one you are.",
             '<div class="croutes">' + cards + '</div>' +
             '<p class="cmail rv">Or write to us at '
             '<a href="mailto:%s">%s</a>. One email is enough to start.</p>' % (EMAIL, EMAIL) +
             note("w",
                  "<b>One request before you write.</b> Please do not send government "
                  "identification, banking documents or client files through ordinary email. If we "
                  "need anything sensitive, we will give you a secure way to send it."),
             p="A short first message is fine. We would rather understand what you are trying to "
               "do than receive a brief.")]

    body = hero("Contact", "Start a conversation.",
                "",
                "We are a small team in Calgary. Whichever route you take, a person reads it and a "
                "person answers it.") + "".join(S)
    yield kit.write("contact", "/contact", "Start a conversation.",
                    "Three ways to reach 4orm Finance: using the product, working in financial "
                    "services, or interested in the company.", body)
