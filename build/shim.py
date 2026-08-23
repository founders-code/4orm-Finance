# -*- coding: utf-8 -*-
"""Adapter: the v8 content modules, emitted in the new language.

The p_*.py content files are not edited. Only what they call changes. The
important conversion is table(): a four column province comparison stops being
a table and becomes a segmented control the reader operates, one province at a
time, which is how anybody actually reads it.
"""
import re
import pkit
from kit import ARROW

SITE = "https://www.4ormfinance.com"

_seg_n = [0]


def hero(eye, h1_plain, h1_accent, lede):
    return pkit.hero(eye, h1_plain, h1_accent, lede)


def section(eye, h2, body, p=None, band=False, tight=False, sid=None):
    return pkit.sec(eye, h2, body, p=p, alt=band, sid=sid)


def tiles(items, cols=3):
    tones = ["blue", "gold", "ok"]
    return pkit.softs([(k, h, b, tones[i % 3]) for i, (k, h, b) in enumerate(items)], cols=cols)


def steps(items):
    return pkit.flow(items)


def callout(strong, gold="", tail="", top=26):
    g = ' <b>%s</b>' % gold if gold else ""
    t = " %s" % tail if tail else ""
    return pkit.note("w", "<b>%s</b>%s%s" % (strong, g, t))


def _strip(h):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", h)).strip()


def table(cap_left, cap_right, headers, rows):
    """Four column comparisons become a segmented control. Everything else
    becomes a clean list of duty rows."""
    labels = [h for h, _ in headers]

    if len(headers) >= 3:
        _seg_n[0] += 1
        name = "t%d" % _seg_n[0]
        panes = []
        for ci in range(1, len(headers)):
            body = []
            for lv, cells in rows:
                if ci >= len(cells):
                    continue
                key = _strip(cells[0][0])
                val = cells[ci][0]
                body.append(pkit.duty(key, val))
            panes.append((labels[ci].lower().replace(" ", "-"), "".join(body)))
        seg_items = [(labels[i].lower().replace(" ", "-"), labels[i]) for i in range(1, len(headers))]
        return (pkit.segmented(name, seg_items) +
                pkit.panel(cap_left, '<span class="pl">%s</span>' % cap_right,
                           pkit.Panes(name, panes)))

    body = "".join(pkit.duty(_strip(c[0][0]), c[1][0] if len(c) > 1 else "") for _, c in rows)
    return pkit.panel(cap_left, '<span class="pl">%s</span>' % cap_right,
                      pkit.Panes("x%d" % id(rows), [("only", body)]))


def tbl_legend(items, note):
    return '<p class="rv" style="margin-top:14px;font-size:12.5px;color:var(--tx-3)">%s</p>' % note


def cx_card(eye, heading, body_html, accent=False):
    return ('<div class="soft %s rv"><span class="sk">%s</span><h3>%s</h3>%s</div>'
            % ("gold" if accent else "blue", eye, heading, body_html))


def cx_grid(cards):
    return '<div class="softs c%d">%s</div>' % (2 if len(cards) > 1 else 1, "".join(cards))


def cx_para(text):
    return '<p style="font-size:14.6px;color:var(--tx-2);line-height:1.62;margin-top:12px">%s</p>' % text


def cx_lines(pairs):
    return '<div style="margin-top:14px">%s</div>' % "".join(pkit.duty(k, v) for k, v in pairs)


def cx_links(pairs):
    return '<div class="srclist" style="margin-top:12px">%s</div>' % "".join(
        '<a href="%s" target="_blank" rel="noopener"><span class="sk2">%s</span>'
        '<span class="sn">%s</span></a>' % (href, k, n) for k, n, href in pairs)


def ol(items):
    return '<div class="flow" style="margin-top:10px">%s</div>' % "".join(
        '<div class="fstep" style="padding:14px 0"><span class="fn">%02d</span>'
        '<div><p style="font-size:14.6px">%s</p></div></div>' % (i + 1, x)
        for i, x in enumerate(items))


def dgrid(cols):
    tone = {"past": "", "recurring": "now", "ahead": "next"}
    return pkit.timeline([(tag + "  " + date, what, say, src, tone.get(kind, ""))
                          for kind, tag, date, what, say, src in cols])


def tally(rows):
    return pkit.bignums([(n, "bad" if zero else "", t) for n, t, zero in rows])


# ---- the three shared closers, rebuilt --------------------------------------
def partners_section():
    counsel = cx_card("Counsel", "Two lawyers, at two firms.", cx_lines([
        ("Technology, corporate and securities",
         "Michael Stephens, partner at Fasken in Vancouver. He is the lawyer we work with. "
         "The engagement is with him, not with the firm at large."),
        ("Founder structuring, governance and the raise",
         "James Atherton, partner at Capiche Legal LLP. Same again. Our file sits with James."),
    ]), accent=True)

    build = cx_card("Build and bench", "Who builds it, and who checks us.", cx_lines([
        ("Engineering", "Speer Technologies, Toronto. The engineering firm building the platform, "
                        "under a signed engagement and a mutual non-disclosure agreement."),
        ("Capital markets", "Bruce Fair, president of Mench Capital Corp."),
        ("Capital strategy", "Miika Makela, chartered financial analyst."),
        ("Growth and technology leadership", "Dean McCall."),
        ("Systems architecture", "Zahiruddin Sandeela. Twenty years designing systems in banking, "
                                 "insurance and the public sector, including payments and anti money "
                                 "laundering work at a credit union."),
        ("First cheque", "Don H., angel investor and an independent sounding board."),
    ]))

    body = cx_grid([counsel, build]) + callout(
        "Naming a firm here says where a person works.",
        "It is not a statement that the firm has been engaged by 4orm Finance, and it is not an "
        "endorsement by that firm.",
        'Where we name an individual, that individual is who we work with. The full bench, with bios, '
        'is on the <a href="/company" style="color:var(--blue-dp)">company page</a>.')

    return section("Who we work with", "The people behind this, named.", body,
                   p="You are being asked to put your record keeping in the hands of a company you have "
                     "not heard of. Here is who is standing behind it.", band=True)


def limits_section(extra=None):
    lim = cx_card("Limits", "What we will not do.", ol([
        "We do not hold or move your clients&rsquo; money. We are not a bank and we need no banking licence.",
        "We do not invent evidence, and we do not alter a record once it is made.",
        "We do not decide whether your firm is compliant, and we do not certify that it is.",
        "We do not file anything with a regulator. Your firm does, after your signatory approves it.",
        "We give no legal, accounting or compliance advice. You will still need your counsel and your auditor.",
    ]), accent=True)

    state = cx_card("Where we are", "Pre-revenue, and the product is not finished.", cx_para(
        "4orm Finance is an Alberta company. It is pre-revenue and the platform is under development. "
        "Everything on this page describes what the software is built to do, not a running system with "
        "customers behind it. We are taking design partners now, and the first ones shape what gets built "
        "first. If you need something you can switch on this quarter, we are not that yet, and we would "
        "rather you heard it here than on a call.") + (cx_para(extra) if extra else ""))

    return section("Hold us to it", "Two things to read before you talk to us.", cx_grid([lim, state]))


def sources_section(cards):
    return section("Sources", "Read the wording yourself.", cx_grid(cards),
                   p="Checked 19 August 2026. Rules change, and several of the instruments below were "
                     "amended within the last year. Confirm against the current published text before "
                     "relying on anything here.", band=True, sid="sources")
