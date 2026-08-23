from kit import section, callout, cx_card, cx_grid, cx_lines, tiles

S = []

S.append(section(
    "Five industries",
    "Pick the one you are in.",
    cx_grid([
        cx_card("Real estate", '<a href="/real-estate">Brokerages, property and condominium '
                               'management</a>',
                cx_lines([
                    ("What you hold", "Deposits on offers, rent and damage deposits, commission "
                                      "held pending."),
                    ("Who asks", "The Real Estate Council of Alberta, the BC Financial Services "
                                 "Authority, the Real Estate Council of Ontario, and the money "
                                 "laundering regulator."),
                    ("The pinch", "Two of the three reconciliation clocks start when the bank "
                                  "statement arrives, not at month end. And Ontario is moving to "
                                  "monthly reporting."),
                ]),
                accent=True),
        cx_card("Payments", '<a href="/payments">Payment service providers holding end user funds</a>',
                cx_lines([
                    ("What you hold", "End user funds, in a trust account, a prescribed account, "
                                      "or a segregated account backed by insurance."),
                    ("Who asks", "The Bank of Canada since 8 September 2025, and the money "
                                 "laundering regulator if you are also a money services business."),
                    ("The pinch", "One record per customer at the end of every day, and an "
                                  "independent review with no first date and no lookback attached "
                                  "to it."),
                ])),
        cx_card("Credit unions", '<a href="/credit-unions">Provincially and federally regulated '
                                 'credit unions</a>',
                cx_lines([
                    ("What you hold", "Member deposits, and the record of every decision you made "
                                      "about them."),
                    ("Who asks", "Your provincial regulator and deposit guarantor, plus the money "
                                 "laundering regulator regardless of which."),
                    ("The pinch", "Not one of the four published penalties in your sector was "
                                  "for laundering, and a program now has to be effective, not "
                                  "merely present."),
                ])),
        cx_card("Insurance", '<a href="/insurance">General and life agencies and brokerages</a>',
                cx_lines([
                    ("What you hold", "Agency bill premium owed to insurers, return premium owed "
                                      "back to clients, claims funds passing through."),
                    ("Who asks", "The Alberta Insurance Council, the Insurance Council of British "
                                 "Columbia, the Registered Insurance Brokers of Ontario. Life only, "
                                 "the money laundering regulator."),
                    ("The pinch", "Six to eight weeks of float, a continuous obligation, a monthly "
                                  "test and a twice yearly filing."),
                ])),
        cx_card("Law firms", '<a href="/law-firms">Firms holding client money in trust</a>',
                cx_lines([
                    ("What you hold", "Retainers, house deposits, settlement money, estate funds."),
                    ("Who asks", "The Law Society of Alberta, of British Columbia, of Ontario. Not "
                                 "the money laundering regulator, since 2015."),
                    ("The pinch", "Up to 55 days in Ontario between an event and the control "
                                  "that would catch it, and a reconciliation that balances even "
                                  "when the ledger was adjusted too."),
                ])),
        cx_card("Not on this list", "Same question, different rulebook.",
                cx_lines([
                    ("Also in scope", "Insolvency trustees, mortgage brokerages and "
                                      "administrators, collection agencies, payroll bureaus, "
                                      "escrow and title agents."),
                    ("What they share", "Money that belongs to somebody else, a deadline to prove "
                                        "what was held, and a period over which the proof has to "
                                        "survive."),
                    ("What to do", '<a href="/contact">Tell us what your firm does and who '
                                   'regulates you.</a> We will tell you plainly whether the duty '
                                   'applies, what it asks for, and what it does not.'),
                ])),
    ]),
    p="Each page sets out the job step by step, where the money sits, the rules that bind you in "
      "Alberta, British Columbia and Ontario with every instrument named and linked, what the "
      "regulators are actually finding, and what we do about it.",
    tight=True))

S.append(section(
    "What these firms have in common",
    "The money is usually fine. The record of it is not.",
    tiles([
        ("The duty",
         "Prove what you held, on a named day",
         "Daily, monthly, or on arrival, depending on your rulebook. The obligation is not to have "
         "the money. It is to be able to show what belonged to whom."),
        ("The record",
         "In six places",
         "Bank statement, a ledger, a spreadsheet, a folder of signed approvals, an email thread, "
         "and one person who understands how they fit together."),
        ("The gap",
         "Between the event and the proof",
         "Two months, in most of these rulebooks. Long enough that money can leave and come "
         "back before anything looks at it."),
    ]),
    p="They are regulated by different bodies, on different clocks, under different statutes. The "
      "shape of the challenge is the same in all five.",
    band=True))

PAGE = {
    "slug": "who-it-is-for",
    "title": "Who it is for",
    "desc": "Real estate brokerages, payment service providers, credit unions, insurance "
            "agencies and law firms. What each one owes, in Alberta, British Columbia and Ontario.",
    "hero": (
        "Who it is for",
        "Five Industries.",
        "One Question, Asked Five Different Ways.",
        "Every firm on this page holds money that belongs to somebody else, and every one of them "
        "can be asked, sometimes years later, to prove what it held on a single day. The rulebooks "
        "differ. The challenge does not. Every rule named on these pages is linked so you can read "
        "the wording yourself. Checked 19 August 2026."),
    "sections": S,
}
