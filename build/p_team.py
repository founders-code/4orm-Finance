# -*- coding: utf-8 -*-
"""4orm Family: the people building this, and why each of them is here.

Nine full biographies on one page would run seven screens and be read by
nobody. So the page shows nine faces, and a face opens the person. The long
version is one click away and takes up no room until it is asked for.
"""
import io, json, os
import kit
from pkit import hero, sec, cta

A = "&#8594;"
_C = os.path.join(os.path.dirname(os.path.abspath(__file__)), "content")

LI = ('<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'
      '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 '
      '1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 '
      '0-2.11 1.43-2.11 2.9V21h-4V9z"/></svg>')


def _load():
    with io.open(os.path.join(_C, "team.json"), encoding="utf-8") as f:
        return json.load(f)


def card(i, m):
    """A face, a name, and what the person is here to do."""
    link = ('<a class="tmli" href="%s" target="_blank" rel="noopener" '
            'aria-label="%s on LinkedIn" onclick="event.stopPropagation()">%s</a>'
            % (m["link"], m["name"], LI)) if m.get("link") else ""
    return ('<button class="tmc rv" type="button" data-who="%d" aria-expanded="false">'
            '<span class="tmph"><span class="tmini" aria-hidden="true">%s</span>'
            '<img src="%s" alt="%s" loading="lazy" width="420" height="420" /></span>'
            '<span class="tmk">%s</span>'
            '<span class="tmn">%s</span>'
            '<span class="tmr">%s</span>'
            '<span class="tmb">%s</span>'
            '<span class="tmmore">Read more <b>%s</b></span>%s'
            '</button>' % (i, m["ini"], m["img"], m["name"], m["kick"], m["name"],
                           m["role"], m["short"], A, link))


def build():
    TEAM = _load()

    S = []

    S.append(sec("4orm Family", "Nine people, and each one is here for a reason.",
        '<div class="tmgrid">' + "".join(card(i, m) for i, m in enumerate(TEAM)) + '</div>',
        p="Operations, architecture, securities law, capital markets and growth. Click a face to "
          "read what that person has actually done."))

    S.append(sec("Why this group", "Three things every one of them has seen up close.",
        '<div class="tmwhy">' + "".join(
            '<div class="tw rv"><span class="twk">%s</span><h3>%s</h3><p>%s</p></div>' % r
            for r in [
                ("Regulated work", "A record that has to hold up later",
                 "Banking, insurance, securities and public sector systems, where a regulator can "
                 "ask years afterwards what was decided on a given day and who stood behind it."),
                ("Consequence", "Decisions that cost people something",
                 "Industrial safety, private capital and client files. Places where a missed step "
                 "is not an inconvenience, it is a person's money or a person's life."),
                ("Canada", "The rules that actually apply here",
                 "Canadian securities law, Canadian privacy law, Canadian registers and Canadian "
                 "deadlines. This is built for the country it operates in."),
            ]) + '</div>', alt=True))

    S.append(cta("Talk to one of us.",
        "There are nine of us. A first message reaches a person, and a person answers it.",
        primary=("Experience 4orm", "/#personal"), secondary=("Talk to the team", "/contact")))

    # The long biographies travel with the page as data, so nothing loads on
    # click and nothing is fetched from anywhere.
    payload = json.dumps([
        {"n": m["name"], "k": m["kick"], "r": m["role"], "i": m["img"],
         "p": m.get("paras", []), "l": m.get("link", "")}
        for m in TEAM], ensure_ascii=False)

    body = (hero("4orm Family", "A record is only worth",
                 "the people behind it.",
                 "Most of us have spent a career somewhere the record mattered, and where being "
                 "unable to produce it was the expensive part.") + "".join(S) +
            '\n<div class="tmdest" id="tmdest" aria-hidden="true" role="dialog" '
            'aria-label="Team member">'
            '<div class="tmpanel"><button class="tmx" type="button" aria-label="Close">'
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
            'stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>'
            '</button><div class="tmbody" id="tmbody"></div></div></div>'
            '\n<script id="tmdata" type="application/json">%s</script>' % payload)

    yield kit.write("team", "/team", "4orm Family.",
                    "The nine people building 4orm Finance, and what each of them has done "
                    "before this.", body,
                    extra='\n<script src="/assets/team.js?v=%s" defer></script>' % kit.V)
