# -*- coding: utf-8 -*-
"""The homepage. One transaction, three views, four industries."""
import os
import kit

_C = os.path.join(os.path.dirname(os.path.abspath(__file__)), "content")


def build():
    with open(os.path.join(_C, "home-body.html"), encoding="utf-8") as f:
        body = f.read()
    # the shared chrome supplies the nav and footer, so drop anything before the
    # first real block. `>= 0`, because the landing starts at index zero.
    for tag in ('<main', '<section'):
        i = body.find(tag)
        if i >= 0:
            body = body[i:]
            break
    yield kit.write(
        "home", "/",
        "4orm Finance",
        "4orm helps you understand a financial decision before you make it, and helps the firm "
        "serving you keep the record of how it was made.",
        body,
        extra='\n<script src="/assets/landing.js?v=%s" defer></script>' % kit.V)
