# -*- coding: utf-8 -*-
import json, os, re
import kit
from pkit import hero, sec, note, cta

_C = os.path.join(os.path.dirname(os.path.abspath(__file__)), "content")


def _people():
    with open(os.path.join(_C, "team.json"), encoding="utf-8") as f:
        return json.load(f)


def _card(p, i):
    bio = "".join("<p>%s</p>" % re.sub(r"\s+", " ", x).strip() for x in p["paras"])
    link = ('<a class="btn btn-g btn-sm" style="margin-top:16px" href="%s" target="_blank" '
            'rel="noopener">LinkedIn</a>' % p["link"]) if p["link"] else ""
    shot = ('<img src="%s" alt="%s" width="480" height="480" loading="lazy" onerror="this.remove()" />'
            % (p["img"], p["name"])) if p["img"] else ""
    return ('<article class="person rv%s">%s<div class="pb2">'
            '<div class="pk2">%s</div><div class="pn2">%s</div><div class="pr2">%s</div>'
            '<div class="pd2">%s</div>'
            '<details><summary>Read the full bio</summary>%s%s</details>'
            '</div></article>'
            % (["", " d1", " d2"][i % 3], shot, p["kick"], p["name"], p["role"], p["short"], bio, link))


def build():
    people = _people()
    body = hero("Team", "A record is only worth", "the people behind it.",
                "4orm Finance is a Calgary company. These are the people building it and the counsel, "
                "capital-markets and architecture bench around them. Every name is real, every firm is "
                "named, and every bio links to the person&rsquo;s own profile.")

    body += sec("The bench", "Nine people, named.",
        '<div class="people">%s</div>' % "".join(_card(p, i) for i, p in enumerate(people)) +
        note("m", "<b>Naming a firm here says where a person works.</b> It is not a statement that the firm "
                  "has been engaged by 4orm Finance, and it is not an endorsement by that firm. Where we "
                  "name an individual, that individual is who we work with."),
        p="Founders, securities counsel, capital markets, enterprise architecture and the founding cheque. "
          "Read the short line, or open the full bio.")

    body += cta("Want to talk to one of them?",
                "Tell us what your firm does and who regulates it. The first call is thirty minutes and "
                "needs no customer data.", ("Talk to us", "/contact"), ("Experience 4orm", "/"))

    yield kit.write("team", "/team", "A record is only worth the people behind it",
                    "The people building 4orm Finance and the counsel, capital-markets and architecture "
                    "bench around them.", body)
