#!/usr/bin/env python3
"""Assemble the front door.

index.html is generated from front.html, and the front-door styles are the tail
of assets/site.css. Everything else in deploy/ is edited directly.

The one piece that is not in front.html is the pair of rows carrying the live
4ormIQ phone and the firm dashboard. That markup is driven by assist.js,
guardian.js and firm.js, so it is lifted out of the current index.html and
spliced back in at @@ROWS@@ rather than being maintained in two places.

    cd source && python3 build.py
"""
import pathlib
import sys

HERE = pathlib.Path(__file__).resolve().parent
DEPLOY = HERE.parent / 'deploy'
INDEX = DEPLOY / 'index.html'
CSS = DEPLOY / 'assets' / 'site.css'

MARK = '/* ==================================================================\n   THE FRONT DOOR'


def main():
    idx = INDEX.read_text()
    a = idx.find('<div class="front">')
    b = idx.find('<!-- Personal -->')
    if a < 0 or b < 0:
        sys.exit('index.html does not look like the front door any more')

    cur = idx[a:b]
    open_tag = '<div class="lrows in" id="lways">'
    ra = cur.find(open_tag) + len(open_tag)
    rb = cur.find('</div>\n</section>', ra)
    rows = cur[ra:rb].rstrip()
    if 'a4phone' not in rows or 'dashmini' not in rows:
        sys.exit('could not find the phone and dashboard rows to carry over')

    front = (HERE / 'front.html').read_text().replace('@@ROWS@@', rows)
    INDEX.write_text(idx[:a] + front + '\n\n' + idx[b:])

    css = CSS.read_text()
    m = css.find(MARK)
    if m < 0:
        sys.exit('site.css has no front-door block to replace')
    CSS.write_text(css[:m].rstrip() + '\n' + (HERE / 'front.css').read_text())

    print('index.html and site.css rebuilt from source')


if __name__ == '__main__':
    main()
