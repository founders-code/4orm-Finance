# -*- coding: utf-8 -*-
"""Privacy and terms. Legal text carried across verbatim."""
import os, re

_C = os.path.join(os.path.dirname(os.path.abspath(__file__)), "content")


def _body(slug):
    with open(os.path.join(_C, slug + ".html"), encoding="utf-8") as f:
        return [ln for ln in f.read().split("\n") if ln.strip()]


def build_page(slug, title, hero_eye, h1a, h1b, lede):
    parts = _body(slug)
    h1 = next((p for p in parts if p.startswith('<h1')), None)
    body = [p for p in parts if not p.startswith('<h1')]
    prose = "\n".join(body)
    section = ('\n<section class="section">\n  <div class="wrap">\n'
               '    <div class="prose reveal">%s</div>\n  </div>\n</section>\n' % prose)
    return {
        "slug": slug,
        "title": title,
        "desc": lede,
        "hero": (hero_eye, h1a, h1b, lede),
        "sections": [section],
    }


PRIVACY = build_page(
    "privacy", "Privacy", "Legal", "How we handle", "information.",
    "What 4orm Finance collects, why, how long it is kept, and what you can ask us to do with it.")

TERMS = build_page(
    "terms", "Terms", "Legal", "Terms of", "use.",
    "The terms on which this website is provided, and the limits of what anything on it means.")
