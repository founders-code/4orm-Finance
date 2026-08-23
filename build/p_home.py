# -*- coding: utf-8 -*-
"""The homepage. One transaction, three views, four industries."""
import os
import kit

_C = os.path.join(os.path.dirname(os.path.abspath(__file__)), "content")


def build():
    with open(os.path.join(_C, "home-body.html"), encoding="utf-8") as f:
        body = f.read()
    # the shared chrome supplies the nav and footer, so drop the standalone ones
    i = body.find('<section class="hero')
    if i > 0:
        body = body[i:]
    yield kit.write(
        "home", "/",
        "Know before you decide. Prove what happened after.",
        "4orm is the intelligence and evidence layer for major financial decisions. One transaction, "
        "seen from three sides: Personal, Professional and Regulator.",
        body,
        extra='\n<script src="/assets/experience.js?v=%s" defer></script>' % kit.V)
