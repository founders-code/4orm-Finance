# -*- coding: utf-8 -*-
"""4orm site kit. One head, one shell, and the written-word gate.

The visual language is the first demo. The verbal standard is the house
standard: section 10 banned words, canonical facts, no em or en dashes,
Canadian spelling, headings that make a claim rather than name a topic.
"""
import datetime, os, re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://www.4ormfinance.com"
V = datetime.date.today().strftime("%Y%m%d")

ARROW = ('<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
         'stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">'
         '<path d="M5 12h14M13 5l7 7-7 7"/></svg>')

HEAD = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>{title} | 4orm</title>
<meta name="description" content="{desc}" />
<meta name="robots" content="index,follow" />
<meta property="og:title" content="{title} | 4orm" />
<meta property="og:description" content="{desc}" />
<meta property="og:type" content="website" />
<meta property="og:image" content="{site}/assets/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="{site}{path}" />
<meta property="og:site_name" content="4orm Finance" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="canonical" href="{site}{path}" />
<link rel="icon" href="/assets/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon-192.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
<meta name="theme-color" content="#FFFFFF" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;650;700;750;800&family=JetBrains+Mono:wght@400;500;700;800&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/assets/site.css?v={v}" />
</head>
<body data-page="{slug}">
<div class="glow"></div>
<div id="nav-mount"></div>
<main>
{body}
</main>
<div id="foot-mount"></div>
<script src="/assets/chrome.js?v={v}" defer></script>{extra}
</body>
</html>
"""

# ---------------------------------------------------------------- the gate
BANNED = [
    (r"—", "em dash"), (r"–", "en dash"),
    (r"(?i)\bproblems?\b", 'the word "problem"'),
    (r"(?i)754 days", "754 days"),
    (r"(?i)three[- ]year lookback", "three-year lookback"),
    (r"(?i)\b224 firms\b", "224 firms"),
    (r"(?i)we (perform|conduct|sign)[^.]{0,40}independent review", "4orm performing the review"),
    (r"(?i)reviewer must be an external", "external-reviewer requirement"),
    (r"(?i)first mandatory review", "a published first review date"),
    (r"(?i)\breally\b", "really"), (r"(?i)\bclearly\b", "clearly"),
    (r"(?i)\bquietly\b", "quietly"), (r"(?i)\bsubstantially\b", "substantially"),
    (r"(?i)\bgenuinely\b", "genuinely"), (r"(?i)\bhonestly\b", "honestly"),
    (r"(?i)\bstraightforward\b", "straightforward"), (r"(?i)\bdelve\b", "delve"),
    (r"(?i)\bleverag(e|es|ed|ing)\b", "leverage as a verb"), (r"(?i)\brobust\b", "robust"),
    (r"(?i)\bseamless(ly)?\b", "seamless"), (r"(?i)\bcrucial\b", "crucial"),
    (r"(?i)\bvital\b", "vital"), (r"(?i)\bpivotal\b", "pivotal"),
    (r"(?i)\bcomprehensive\b", "comprehensive"), (r"(?i)\bholistic\b", "holistic"),
    (r"(?i)\bunderscore(s|d)?\b", "underscore"), (r"(?i)\btestament\b", "testament"),
    (r"(?i)in today.s landscape", "in today's landscape"), (r"(?i)\bin an era of\b", "in an era of"),
    (r"(?i)rapidly evolving", "rapidly evolving"),
    (r"(?i)not just [^.,;]{2,40}\bbut\b", "not just X but Y"),
    (r"(?i)let.s dive in", "let's dive in"), (r"(?i)at the end of the day", "at the end of the day"),
    (r"(?i)when it comes to", "when it comes to"), (r"(?i)plays? a key role", "plays a key role"),
    (r"(?i)game changer", "a game changer"), (r"(?i)in conclusion", "in conclusion"),
    (r"(?i)(^|[.!?]\s)(Moreover|Furthermore|Additionally|Notably)\b", "sentence opening with Moreover and friends"),
    (r"(?i)\bartificial intelligence\b", "a reference to AI"),
    (r"(?i)(^|[^A-Za-z])AI([^A-Za-z]|$)", "a reference to AI"),
    (r"(?i)\bmachine learning\b", "a reference to model tooling"),
    (r"(?i)\bprogramme\b", "British spelling"),
    (r"(?i)\borganis(e|ed|ation)\b", "British spelling"),
    (r"(?i)\brecognise\b", "British spelling"),
]
ADVISORY = [(r"(?i)\bsomebody\b(?! else)", 'the universal "somebody"')]


def _scan(txt, rules, name):
    out = []
    for pat, label in rules:
        for m in re.finditer(pat, txt):
            frag = re.sub(r"\s+", " ", txt[max(0, m.start() - 45):m.end() + 45]).strip()
            out.append("%s: %s  ...%s..." % (name, label, frag))
    return out


def gate(html, name):
    txt = re.sub(r"<[^>]+>", " ", html)
    return _scan(txt, BANNED, name), _scan(txt, ADVISORY, name)


def write(slug, path, title, desc, body, extra="", filename=None):
    html = HEAD.format(title=title, desc=desc, site=SITE, path=path, slug=slug,
                       body=body, v=V, extra=extra)
    out = os.path.join(BASE, filename or (("index" if path == "/" else path.strip("/")) + ".html"))
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    return out, gate(body, os.path.basename(out))
