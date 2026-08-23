# -*- coding: utf-8 -*-
"""Drop-in replacement for the v8 industry-page emitter.

Same public functions and same signatures as the original build/kit.py, so the
existing p_*.py content modules run unchanged. Only the markup changes: this
version emits the components in assets/site.css instead of the old stylesheet.

House rules still enforced upstream in the content modules: no em or en dashes,
Canadian spelling, every rule claim carries its named instrument, numerals.
"""
SITE = "https://www.4ormfinance.com"
ARROW = ('<svg class="arr" width="14" height="14" viewBox="0 0 24 24" fill="none" '
         'stroke="currentColor" stroke-width="2.4" stroke-linecap="round" '
         'stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>')


_rv = ["", " rv-d1", " rv-d2", " rv-d3", " rv-d4", " rv-d5"]


def _sh(eye, h2, p=None):
    sub = '\n  <p>%s</p>' % p if p else ""
    return ('<div class="sec-head reveal">\n'
            '  <div class="sec-eye"><span class="tick"></span>%s</div>\n'
            '  <h2>%s</h2>%s\n'
            '</div>' % (eye, h2, sub))


def hero(eye, h1_plain, h1_accent, lede):
    return ('\n<section class="page-hero">\n'
            '  <div class="wrap">\n'
            '    <span class="eyebrow reveal"><span class="pulse"></span>%s</span>\n'
            '    <h1 class="reveal rv-d1">%s <span class="accent">%s</span></h1>\n'
            '    <p class="lede reveal rv-d2">%s</p>\n'
            '  </div>\n</section>\n' % (eye, h1_plain, h1_accent, lede))


def section(eye, h2, body, p=None, band=False, tight=False, sid=None):
    cls = "section" + (" alt" if band else "") + (" tight" if tight else "")
    idattr = ' id="%s"' % sid if sid else ""
    return ('\n<section class="%s"%s>\n  <div class="wrap">\n%s\n%s\n  </div>\n</section>\n'
            % (cls, idattr, _sh(eye, h2, p), body))


TILE_TONES = ["", " gold", " mint"]


def tiles(items, cols=3):
    out = ['<div class="tiles c%d">' % cols]
    for i, (kicker, heading, body) in enumerate(items):
        out.append('  <div class="tile%s reveal%s"><span class="kicker">%s</span>'
                   '<h3>%s</h3><p>%s</p></div>'
                   % (TILE_TONES[i % 3], _rv[min(i, 5)], kicker, heading, body))
    out.append('</div>')
    return "\n".join(out)


def steps(items):
    out = ['<div class="numlist">']
    for i, (heading, body) in enumerate(items):
        out.append('  <div class="numitem reveal%s"><div class="n">%02d</div>'
                   '<div><h4>%s</h4><p>%s</p></div></div>'
                   % (_rv[min(i, 3)], i + 1, heading, body))
    out.append('</div>')
    return "\n".join(out)


def callout(strong, gold="", tail="", top=26):
    g = ' <span class="gold">%s</span>' % gold if gold else ""
    t = " %s" % tail if tail else ""
    return ('<div class="note note-warn reveal" style="margin-top:%dpx; font-size:15px">'
            '<b>%s</b>%s%s</div>' % (top, strong, g, t))


def table(cap_left, cap_right, headers, rows):
    th = "".join('<th%s>%s</th>' % ((' class="%s"' % c) if c else "", h) for h, c in headers)
    body = []
    for lv, cells in rows:
        tds = []
        for cell, dl, css in cells:
            cattr = ' class="%s"' % css if css else ""
            tds.append('<td%s data-l="%s">%s</td>' % (cattr, dl, cell))
        body.append('        <tr class="lv-%s">%s</tr>' % (lv, "".join(tds)))
    return ('<div class="reveal">\n'
            '  <div class="tbl-cap"><span>%s</span><span>%s</span></div>\n'
            '  <div class="tbl-shell"><div class="tblwrap">\n'
            '    <table class="tbl">\n      <thead><tr>%s</tr></thead>\n      <tbody>\n%s\n      </tbody>\n'
            '    </table>\n  </div></div>\n</div>'
            % (cap_left, cap_right, th, "\n".join(body)))


def tbl_legend(items, note):
    li = "".join('<span class="tl-item"><i class="lv%s"></i>%s</span>' % (lv, txt)
                 for lv, txt in items)
    return '<div class="tbl-legend reveal">%s<span class="tl-note">%s</span></div>' % (li, note)


def cx_card(eye, heading, body_html, accent=False):
    cls = "cxcard accent" if accent else "cxcard"
    return ('  <div class="%s reveal">\n'
            '    <div class="sec-eye" style="margin-bottom:0"><span class="tick"></span>%s</div>\n'
            '    <h3>%s</h3>\n%s\n  </div>' % (cls, eye, heading, body_html))


def cx_grid(cards):
    one = " one" if len(cards) == 1 else ""
    return '<div class="cxgrid%s">\n%s\n</div>' % (one, "\n".join(cards))


def cx_para(text):
    return '    <p class="cxp">%s</p>' % text


def cx_lines(pairs):
    out = ['    <div class="cxlines">']
    for label, value in pairs:
        out.append('      <div class="cxline"><span class="cl">%s</span>'
                   '<span class="cv">%s</span></div>' % (label, value))
    out.append('    </div>')
    return "\n".join(out)


def cx_links(pairs):
    out = ['    <div class="cxlines">']
    for label, text, href in pairs:
        out.append('      <div class="cxline"><span class="cl">%s</span>'
                   '<a class="cv" href="%s" target="_blank" rel="noopener">%s</a></div>'
                   % (label, href, text))
    out.append('    </div>')
    return "\n".join(out)


def ol(items):
    li = "\n".join('      <li>%s</li>' % i for i in items)
    return '    <ol class="ol">\n%s\n    </ol>' % li


def dgrid(cols):
    kindcls = {"past": "past", "recurring": "now", "ahead": "next"}
    out = ['<div class="dates">']
    for i, (kind, tag, date, what, say, src) in enumerate(cols):
        out.append('  <div class="datecard %s reveal%s"><div class="dh">%s</div><div class="db">'
                   '<div class="dv">%s</div><h4>%s</h4><p>%s</p><div class="src">%s</div>'
                   '</div></div>' % (kindcls.get(kind, "past"), _rv[min(i, 3)], tag, date, what, say, src))
    out.append('</div>')
    return "\n".join(out)


def tally(rows):
    out = ['<div class="tally reveal">']
    for n, t, zero in rows:
        out.append('  <div class="ty-row%s"><div class="ty-n">%s</div><div class="ty-t">%s</div></div>'
                   % (" zero" if zero else "", n, t))
    out.append('</div>')
    return "\n".join(out)


# ---------------------------------------------------------------------------
# The three sections every industry page ends with. Carried over verbatim
# from the v8 build so the wording, the named individuals and the limits
# are identical. Only the emitters they call have changed.
# ---------------------------------------------------------------------------

def partners_section():
    """Who we work with. Named at Chad's instruction, 19 Aug 2026, with the
    individual named in each firm rather than the firm at large."""
    counsel = cx_card(
        "Counsel",
        "Two lawyers, at two firms.",
        cx_lines([
            ("Technology, corporate and securities",
             "Michael Stephens, partner at Fasken in Vancouver. He is the lawyer we work with. "
             "The engagement is with him, not with the firm at large."),
            ("Founder structuring, governance and the raise",
             "James Atherton, partner at Capiche Legal LLP. Same again. Our file sits with James."),
        ]),
        accent=True)

    build = cx_card(
        "Build and bench",
        "Who builds it, and who checks us.",
        cx_lines([
            ("Engineering", "Speer Technologies, Toronto. The engineering firm building the "
                            "platform, under a signed engagement and a mutual non-disclosure "
                            "agreement."),
            ("Capital markets", "Bruce Fair, president of Mench Capital Corp."),
            ("Capital strategy", "Miika Makela, chartered financial analyst."),
            ("Growth and technology leadership", "Dean McCall."),
            ("Systems architecture", "Zahiruddin Sandeela. Twenty years designing systems in "
                                     "banking, insurance and the public sector, including payments "
                                     "and anti money laundering work at a credit union."),
            ("First cheque", "Don H., angel investor and an independent sounding board."),
        ]))

    body = (cx_grid([counsel, build]) + "\n\n" + callout(
        "Naming a firm here says where a person works.",
        "It is not a statement that the firm has been engaged by 4orm Finance, and it is not an "
        "endorsement by that firm.",
        "Where we name an individual, that individual is who we work with. The full bench, "
        'with bios, is on the <a href="/team">team page</a>.', top=28))

    return section("Who we work with", "The people behind this, named.", body,
                   p="You are being asked to put your record keeping in the hands of a company you "
                     "have not heard of. Here is who is standing behind it.",
                   band=True)


def limits_section(extra=None):
    """The section that does not end in our favour."""
    lim = cx_card(
        "Limits",
        "What we will not do.",
        ol([
            "We do not hold or move your clients&rsquo; money. We are not a bank and we need no banking licence.",
            "We do not invent evidence, and we do not alter a record once it is made.",
            "We do not decide whether your firm is compliant, and we do not certify that it is.",
            "We do not file anything with a regulator. Your firm does, after your signatory approves it.",
            "We give no legal, accounting or compliance advice. You will still need your counsel and your auditor.",
        ]),
        accent=True)

    state = cx_card(
        "Where we are",
        "Pre-revenue, and the product is not finished.",
        cx_para(
            "4orm Finance is an Alberta company. It is pre-revenue and the platform is under "
            "development. Everything on this page describes what the software is built to do, not "
            "a running system with customers behind it. We are taking design partners now, and the "
            "first ones shape what gets built first. If you need something you can switch on this "
            "quarter, we are not that yet, and we would rather you heard it here than on a call.")
        + (("\n" + cx_para(extra)) if extra else ""))

    return section("Hold us to it", "Two things to read before you talk to us.",
                   cx_grid([lim, state]))


def sources_section(cards):
    return section("Sources", "Read the wording yourself.", cx_grid(cards),
                   p="Checked 19 August 2026. Rules change, and several of the instruments below "
                     "were amended within the last year. Confirm against the current published text "
                     "before relying on anything here.",
                   band=True, sid="sources")
