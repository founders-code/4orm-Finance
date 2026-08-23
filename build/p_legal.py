# -*- coding: utf-8 -*-
import os
import kit
from pkit import hero

_C = os.path.join(os.path.dirname(os.path.abspath(__file__)), "content")


def _prose(slug):
    with open(os.path.join(_C, slug + ".html"), encoding="utf-8") as f:
        lines = [l for l in f.read().split("\n") if l.strip() and not l.strip().startswith("<h1")]
    return "\n".join(lines)


def build():
    for slug, title, a, b, lede in [
        ("privacy", "Privacy", "How we handle", "information.",
         "What 4orm Finance collects, why, how long it is kept, and what you can ask us to do with it."),
        ("terms", "Terms", "Terms of", "use.",
         "The terms on which this website is provided, and the limits of what anything on it means."),
    ]:
        body = hero("Legal", a, b, lede) + (
            '\n<section class="sec" style="padding-top:40px">\n  <div class="wrap">\n'
            '    <div class="prose rv">%s</div>\n  </div>\n</section>\n' % _prose(slug))
        yield kit.write(slug, "/" + slug, title, lede, body)
