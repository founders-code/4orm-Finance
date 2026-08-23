# -*- coding: utf-8 -*-
"""Product-led emitters.

The old kit turned every idea into a paragraph, a card or a four column table.
These turn the same content into something the reader operates: a segmented
control instead of a comparison table, an animated scale instead of a list of
maximums, a real timeline instead of three date boxes.
"""
from kit import ARROW

_D = ["", " d1", " d2", " d3"]


def hero(eye, h1_plain, h1_accent, lede):
    return ('\n<section class="phero">\n  <div class="wrap">\n'
            '    <span class="eyebrow rv"><i></i>%s</span>\n'
            '    <h1 class="rv d1">%s <span class="b">%s</span></h1>\n'
            '    <p class="sub rv d2">%s</p>\n'
            '  </div>\n</section>\n' % (eye, h1_plain, h1_accent, lede))


def head(kick, h2, p=None):
    sub = '\n    <p>%s</p>' % p if p else ""
    return ('  <div class="sec-head rv">\n    <span class="kick">%s</span>\n'
            '    <h2>%s</h2>%s\n  </div>\n' % (kick, h2, sub))


def sec(kick, h2, body, p=None, alt=False, sid=None, center=False):
    cls = "sec" + (" alt" if alt else "")
    idattr = ' id="%s"' % sid if sid else ""
    hd = head(kick, h2, p)
    if center:
        hd = hd.replace('class="sec-head rv"', 'class="sec-head rv" style="margin:0 auto;text-align:center"')
    return ('\n<section class="%s"%s>\n  <div class="wrap">\n%s\n%s\n  </div>\n</section>\n'
            % (cls, idattr, hd, body))


def segmented(name, items, gold=False):
    """items: list of (key, label). The first is selected."""
    btns = "".join('<button data-key="%s"%s>%s</button>' % (k, ' class="on"' if i == 0 else '', lab)
                   for i, (k, lab) in enumerate(items))
    return ('<div class="seg-w rv"><div class="seg%s" data-seg="%s"><span class="pip"></span>%s</div></div>'
            % (" gold" if gold else "", name, btns))


def panel(label, right, panes):
    """panes: list of (key, inner_html). First is shown."""
    body = "".join('<div class="swap%s" data-swap="%s" data-key="%s">%s</div>'
                   % (" on" if i == 0 else "", panes.name, k, inner)
                   for i, (k, inner) in enumerate(panes.items))
    return ('<div class="panel rv d1"><div class="panel-in">'
            '<div class="panel-h"><span class="pl">%s</span>%s</div>'
            '<div class="panel-b">%s</div></div></div>' % (label, right, body))


class Panes(object):
    def __init__(self, name, items):
        self.name = name
        self.items = items


def duty(k, v, src=None):
    s = '<span class="dsrc">%s</span>' % src if src else ""
    return '<div class="duty"><span class="dk">%s</span><span class="dv">%s%s</span></div>' % (k, v, s)


def bignums(rows):
    """rows: list of (number, tone, text)."""
    return '<div class="bignums rv">%s</div>' % "".join(
        '<div class="bignum"><span class="n %s">%s</span><span class="t">%s</span></div>' % (t, n, x)
        for n, t, x in rows)


def scale(rows):
    """rows: list of (label, value, pct, colour)."""
    return '<div class="panel rv d1"><div class="panel-in"><div class="panel-b" style="padding-top:18px">' \
           '<div class="scale">%s</div></div></div></div>' % "".join(
        '<div class="srow"><div class="st"><span class="sl">%s</span><span class="sv">%s</span></div>'
        '<div class="sb"><i data-pct="%s" data-fill="%s"></i></div></div>' % r for r in rows)


def timeline(events):
    """events: list of (stamp, head, body, source, tone)."""
    return '<div class="tline rv">%s</div>' % "".join(
        '<div class="tev %s"><div class="tt">%s</div><div class="th">%s</div>'
        '<div class="tb">%s</div><div class="ts2">%s</div></div>' % (tone, st, hd, bd, src)
        for st, hd, bd, src, tone in events)


def softs(items, cols=3):
    """items: list of (kicker, heading, body, tone)."""
    return '<div class="softs c%d">%s</div>' % (cols, "".join(
        '<div class="soft %s rv%s"><span class="sk">%s</span><h3>%s</h3><p>%s</p></div>'
        % (tone, _D[min(i, 3)], k, h, b) for i, (k, h, b, tone) in enumerate(items)))


def flow(steps, two=None):
    """steps: list of (heading, body).

    Anything four steps or longer runs in two columns by default. A single
    column of numbered steps is most of a screen on its own, and the page is
    already asking for more scrolling than it has earned. The numbers carry
    the order, so reading across rather than down costs nothing.
    """
    if two is None:
        two = len(steps) >= 4
    return '<div class="flow%s rv">%s</div>' % (" two" if two else "", "".join(
        '<div class="fstep"><span class="fn">%02d</span><div><h4>%s</h4><p>%s</p></div></div>'
        % (i + 1, h, b) for i, (h, b) in enumerate(steps)))


def note(kind, html):
    return '<div class="note note-%s rv" style="margin-top:26px">%s</div>' % (kind, html)


def sources(cols):
    """cols: list of (title, [(kicker, name, href)])."""
    out = []
    for t, links in cols:
        rows = "".join('<a href="%s" target="_blank" rel="noopener">'
                       '<span class="sk2">%s</span><span class="sn">%s</span></a>' % (href, k, n)
                       for k, n, href in links)
        out.append('<div class="rv"><div class="fh" style="font-family:var(--mono);font-size:10px;'
                   'font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:var(--tx-3);'
                   'margin-bottom:14px">%s</div><div class="srclist">%s</div></div>' % (t, rows))
    return '<div class="srcs">%s</div>' % "".join(out)


def cta(h2, p, primary=("Experience 4orm", "/"), secondary=("Talk to us", "/contact")):
    return ('\n<section class="sec alt">\n  <div class="wrap">\n'
            '    <div class="sec-head rv" style="margin:0 auto;text-align:center;max-width:720px">\n'
            '      <h2>%s</h2>\n      <p>%s</p>\n'
            '      <div style="margin-top:32px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">\n'
            '        <a class="btn btn-p" href="%s">%s <span class="cir">%s</span></a>\n'
            '        <a class="btn btn-g" href="%s">%s</a>\n      </div>\n    </div>\n'
            '  </div>\n</section>\n' % (h2, p, primary[1], primary[0], ARROW, secondary[1], secondary[0]))
