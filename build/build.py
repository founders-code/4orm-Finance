# -*- coding: utf-8 -*-
"""Build every page of the site."""
import importlib, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import kit, pkit, shim
REAL_KIT = kit                     # keep a handle before the swap

CARRIED = ["p_hub", "p_real_estate", "p_payments", "p_credit_unions", "p_insurance", "p_law_firms"]
AUTHORED = ["p_home", "p_passport", "p_rules", "p_hard", "p_whatwedo", "p_mortgage", "p_check", "p_team", "p_contact", "p_legal"]

# The carried v8 modules set their headlines in Title Case. Every authored page
# on this site is sentence case, and mixed capitalisation is the loudest thing
# on a page that is meant to read as calm. Converted here rather than in the
# content modules, so their research still carries untouched and the whole
# change is auditable in one place.
SENTENCE_CASE = {
    "Four Penalties in Your Sector.":            "Four penalties in your sector.",
    "Not One of Them for Laundering.":           "Not one of them for laundering.",
    "Six Weeks of Somebody Else&rsquo;s Money,": "Six weeks of somebody else&rsquo;s money,",
    "In an Account You Control.":                "in an account you control.",
    "Fifty-Five Days Between the Event":         "Fifty-five days between the event",
    "and the Control That Would Catch It.":      "and the control that would catch it.",
    "The Reconciliation Runs Once a Month.":     "The reconciliation runs once a month.",
    "The Money Moves Every Day.":                "The money moves every day.",
    "Five Industries.":                          "Five industries.",
    "One Question, Asked Five Different Ways.":  "One question, asked five different ways.",
    "One Record Per Customer,":                  "One record per customer,",
    "At the End of Every Day.":                  "at the end of every day.",
}


def sentence_case(html):
    for a, b in SENTENCE_CASE.items():
        html = html.replace(a, b)
    return html

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
    body = sentence_case(body)
    record(*REAL_KIT.write(page["slug"], "/" + page["slug"], page["title"],
                           sentence_case(page["desc"]), body))

for b in sorted(built):
    print("%-24s %8d bytes" % (os.path.basename(b), os.path.getsize(b)))
print("\nHARD GATE: %d" % len(hard))
for x in hard:
    print("  " + x)
print("STYLE NOTES: %d" % len(soft))
for x in soft[:6]:
    print("  " + x)
