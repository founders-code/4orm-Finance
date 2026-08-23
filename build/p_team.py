# -*- coding: utf-8 -*-
"""Team. People and bios are lifted verbatim from the existing team page."""
import json, os, re
from ikit import section, callout

_C = os.path.join(os.path.dirname(os.path.abspath(__file__)), "content")


def _people():
    with open(os.path.join(_C, "team.json"), encoding="utf-8") as f:
        return json.load(f)


def _card(p, i):
    rv = ["", " rv-d1", " rv-d2"][i % 3]
    bio = "".join('<p>%s</p>' % re.sub(r"\s+", " ", x).strip() for x in p["paras"])
    link = ('<a class="btn btn-ghost btn-sm" style="margin-top:16px" href="%s" target="_blank" rel="noopener">'
            'LinkedIn</a>' % p["link"]) if p["link"] else ""
    shot = ('<img src="%s" alt="%s" width="480" height="480" loading="lazy" onerror="this.remove()" />'
            % (p["img"], p["name"])) if p["img"] else ""
    return ('<article class="person reveal%s">%s<div class="pb">'
            '<div class="pr" style="color:var(--text-3); font-size:10.5px; font-weight:800; letter-spacing:.12em">%s</div>'
            '<div class="pn" style="margin-top:6px">%s</div>'
            '<div class="pr">%s</div>'
            '<div class="pd">%s</div>'
            '<details style="margin-top:14px"><summary style="cursor:pointer; font-size:13px; font-weight:650; '
            'color:var(--brand-700); list-style:none">Read the full bio</summary>'
            '<div class="prose" style="margin-top:12px; max-width:none">%s</div>%s</details>'
            '</div></article>' % (rv, shot, p["kick"], p["name"], p["role"], p["short"], bio, link))


PEOPLE = _people()

S = [section(
    "The bench",
    "Nine people, named.",
    '<div class="people">%s</div>' % "".join(_card(p, i) for i, p in enumerate(PEOPLE))
    + "\n" + callout(
        "Naming a firm here says where a person works.",
        "It is not a statement that the firm has been engaged by 4orm Finance, and it is not an endorsement by "
        "that firm.",
        "Where we name an individual, that individual is who we work with."),
    p="Founders, securities counsel, capital markets, enterprise architecture and the founding cheque. Read the "
      "short line, or open the full bio.")]

PAGE = {
    "slug": "team",
    "title": "A record is only worth the people behind it",
    "desc": "The people building 4orm Finance and the counsel, capital-markets and architecture bench around them. Every name is real, every firm is named, and every bio links to the person's own profile.",
    "hero": ("Team",
             "A record is only worth",
             "the people behind it.",
             "4orm Finance is a Calgary company. These are the people building it and the counsel, capital-markets "
             "and architecture bench around them. Every name is real, every firm is named, and every bio links to "
             "the person&rsquo;s own profile."),
    "sections": S,
}
