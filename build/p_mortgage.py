# -*- coding: utf-8 -*-
"""Mortgage. The landing sections plus the Mortgage Guardian demo.

The markup is frozen under build/content so this build runs anywhere.
"""
import os

_C = os.path.join(os.path.dirname(os.path.abspath(__file__)), "content")


def _read(name):
    with open(os.path.join(_C, name), encoding="utf-8") as f:
        return f.read()


BODY = _read("mortgage-body.html")
TAIL = _read("mortgage-tail.html")

PAGE = {
    "slug": "mortgage",
    "title": "Know what is happening with your mortgage",
    "desc": "Mortgage Guardian helps the consumer prepare, understand what they are being asked for, track what changes and see who has their information. Underneath, it builds one verified record of the whole transaction.",
    "body": BODY,
    "tail": TAIL,
}
