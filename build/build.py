# -*- coding: utf-8 -*-
"""Build every page of 4ormfinance.com."""
import importlib, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import sitekit
import ikit
sys.modules["kit"] = ikit          # the v8 content modules import "kit"

PAGES = ["p_hub", "p_real_estate", "p_payments", "p_credit_unions", "p_insurance", "p_law_firms",
            "p_rules", "p_hard", "p_whatwedo", "p_contact", "p_team", "p_passport"]

hard, soft, built = [], [], []

# --- pages written for the new site -----------------------------------------
for m in ["p_home"]:
    out, (h, sf) = importlib.import_module(m).build()
    built.append(out); hard += h; soft += sf

# --- industry pages, content carried over unchanged --------------------------
for m in PAGES:
    page = importlib.import_module(m).PAGE
    body = ikit.hero(*page["hero"]) + "".join(page["sections"])
    slug = page["slug"]
    out, (h, sf) = sitekit.write(slug, "/" + slug, page["title"], page["desc"], body)
    built.append(out); hard += h; soft += sf

# --- mortgage: landing sections plus the Guardian demo -----------------------
import p_mortgage
_m = p_mortgage.PAGE
_mbody = _m["body"] + """
<section class="section tight">
  <div class="wrap">
    <p class="legal reveal">Sarah Mitchell, Alex Chen, Northbridge Mortgage Group, Maple Bank and Cascade Trust are
      invented for this demonstration. All figures, documents and decisions shown are synthetic. The demonstration
      simulates external systems through seeded events and connects to no bank, credit bureau, lender or regulator.
      Mortgage Guardian gives educational guidance and shows you your own record. It is not a mortgage approval, it
      is not a regulated product recommendation, and 4orm Finance is not a mortgage brokerage, a lender, a law firm
      or a regulator.</p>
  </div>
</section>
""" + _m["tail"]
out, (h, sf) = sitekit.write("mortgage", "/mortgage", _m["title"], _m["desc"], _mbody,
                             extra_scripts='\n<script src="/assets/mortgage-data.js?v=1"></script>'
                                           '\n<script src="/assets/mortgage-demo.js?v=1"></script>')
built.append(out); hard += h; soft += sf

# --- legal pages -------------------------------------------------------------
import p_legal
for page in (p_legal.PRIVACY, p_legal.TERMS):
    body = ikit.hero(*page["hero"]) + "".join(page["sections"])
    out, (h, sf) = sitekit.write(page["slug"], "/" + page["slug"], page["title"], page["desc"], body)
    built.append(out); hard += h; soft += sf

for b in built:
    print("%-28s %8d bytes" % (os.path.basename(b), os.path.getsize(b)))
print("\nHARD GATE (must not ship): %d" % len(hard))
for x in hard:
    print("  " + x)
print("\nSTYLE NOTES (pre-existing copy): %d" % len(soft))
for x in soft:
    print("  " + x)
