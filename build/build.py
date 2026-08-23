# -*- coding: utf-8 -*-
"""Build every page of the site."""
import importlib, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import kit, pkit, shim
REAL_KIT = kit                     # keep a handle before the swap

CARRIED = ["p_hub", "p_real_estate", "p_payments", "p_credit_unions", "p_insurance", "p_law_firms"]
AUTHORED = ["p_home", "p_passport", "p_rules", "p_hard", "p_whatwedo", "p_mortgage", "p_team", "p_contact", "p_legal"]

hard, soft, built = [], [], []


def record(out, res):
    built.append(out)
    hard.extend(res[0])
    soft.extend(res[1])


for m in AUTHORED:
    try:
        mod = importlib.import_module(m)
    except ImportError:
        continue
    for out, res in mod.build():
        record(out, res)

# The carried v8 content modules do "from kit import (...)". Point that name at
# the shim so their copy is emitted in the new language, unedited.
sys.modules["kit"] = shim

for m in CARRIED:
    page = importlib.import_module(m).PAGE
    body = shim.hero(*page["hero"]) + "".join(page["sections"])
    record(*REAL_KIT.write(page["slug"], "/" + page["slug"], page["title"], page["desc"], body))

for b in sorted(built):
    print("%-24s %8d bytes" % (os.path.basename(b), os.path.getsize(b)))
print("\nHARD GATE: %d" % len(hard))
for x in hard:
    print("  " + x)
print("STYLE NOTES: %d" % len(soft))
for x in soft[:6]:
    print("  " + x)
