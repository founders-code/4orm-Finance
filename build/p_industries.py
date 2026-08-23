# -*- coding: utf-8 -*-
"""The industries. Same relationship, different decision.

Every one of these pages is the same five questions in the same order, because
the whole argument of the site is that the decision changes and the relationship
does not. If one of them grows a bespoke section, the argument weakens.
"""
import kit
from pkit import hero, sec, softs, flow, note, cta, duty, timeline


# key, label, path, live?
IND = [
    ("mortgage",   "Mortgage",     "/industries/mortgage",    True),
    ("auto",       "Auto",         "/industries/auto",        True),
    ("realestate", "Real estate",  "/industries/real-estate", True),
    ("insurance",  "Insurance",    "/industries/insurance",   True),
    ("investing",  "Investing",    "/industries/investing",   True),
    ("banking",    "Banking",      "/industries/banking",     True),
    ("lending",    "Lending",      "/industries/lending",     True),
]

P = {}

P["mortgage"] = dict(
    eye="Mortgage",
    h1="The largest decision most people make,",
    h1b="explained after it is made.",
    lede="A mortgage is signed once and lived with for decades. Almost everything a person is told "
         "about it arrives at the point where saying no has become expensive.",
    decision="Whether to borrow several hundred thousand dollars, from whom, on what terms, and "
             "what happens at renewal.",
    who="FSRA in Ontario, BCFSA in British Columbia, RECA in Alberta. FINTRAC for identity and "
        "source of funds. The lender is separately federally supervised.",
    check=[("FSRA licensed mortgage professionals", "https://www.fsrao.ca/consumers/mortgage-brokering"),
           ("FINTRAC administrative penalties", "https://fintrac-canafe.canada.ca/pen/1-eng")],
    wrong=[
        ("What the file did not say", "No documented suitability assessment",
         "FSRA reviewed private mortgage files in 2024-25 and found no documented suitability "
         "assessment in every file it looked at. Not a wrong assessment. An absent one.", "gold"),
        ("What the person did not get", "Material risk left undisclosed",
         "Seventy-three per cent of those files had missing or inadequate disclosure of material "
         "risk. The person signed without being told what could go wrong.", "gold"),
        ("Who was in the room", "Relationship and conflict undisclosed",
         "Sixty-five per cent had missing or inadequate disclosure of the relationship or the "
         "conflict. The person did not know whose interest was being served.", "gold"),
        ("Above all of it", "Supervision was inadequate everywhere",
         "In every entity examined, supervision was inadequate. The failure was not one broker "
         "having a bad month. It was nobody watching.", "blue"),
    ],
    what=[
        ("Before a broker exists",
         "The person understands what a pre-approval is and is not, what a lender will actually "
         "ask for, and what their own numbers look like, before anyone has anything to sell."),
        ("When the relationship starts",
         "Identity is verified once. Income is supported by a document rather than stated. What "
         "gets shared is chosen by the person, item by item, and recorded."),
        ("While the file moves",
         "If the income on the application stops matching the income in the record, both sides see "
         "it while it can still be a correction rather than an allegation."),
        ("When it is asked about, years later",
         "The story is already assembled: what was said, what was shown, what was agreed, and why "
         "this mortgage rather than another one."),
    ],
    stat=("100%", "of private mortgage files reviewed by FSRA in 2024-25 had no documented "
          "suitability assessment"),
)

P["auto"] = dict(
    eye="Auto",
    h1="Two contracts, three parties,",
    h1b="and one afternoon to read them.",
    lede="A person at a dealership is usually signing a sale, a credit agreement and a set of "
         "optional products at the same desk, in the same hour, presented as one thing.",
    decision="What the vehicle costs, what is being financed, over how long, at what rate, and "
             "which of the things on the sheet were chosen rather than added.",
    who="OMVIC in Ontario, the Vehicle Sales Authority in British Columbia, AMVIC in Alberta. The "
        "lender may be federally supervised instead. A complaint about the car and a complaint "
        "about the loan go to two different places, which almost nobody knows.",
    check=[("OMVIC dealer and salesperson search", "https://www.omvic.ca/dealer-search/"),
           ("Vehicle Sales Authority of BC search",
            "https://vsabc.ca/salespeople/search-a-dealership-or-salesperson/")],
    wrong=[
        ("The price", "Fees outside the number",
         "Ontario requires the advertised price to include every fee the dealer intends to collect. "
         "Only tax and licensing may sit outside it. The rule exists because the practice did.",
         "blue"),
        ("The question", "What payment do you want",
         "Asked before the price and the term are settled, it moves the conversation off what the "
         "vehicle costs. Any payment can be reached by stretching the term.", "gold"),
        ("The sellers", "174 people charged as curbsiders",
         "OMVIC laid 895 charges against 174 alleged curbsiders in 2025 alone, and 2,332 charges "
         "in total, drawing $1.9 million in fines.", "gold"),
        ("The fund that exists because of it", "$1.5 million paid out",
         "Ontario runs a compensation fund for people harmed by dealers. It paid $1.5 million in "
         "2025, with a further $825,552 returned through dealer compensation or refunds.", "blue"),
    ],
    what=[
        ("Standing at the desk",
         "The person can see the three numbers that decide what they actually pay: total financed, "
         "rate, and term. Everything else on the sheet is arrangement around those three."),
        ("Before the credit application goes anywhere",
         "What is in it, where it may be sent, and what the person is agreeing to, shown before "
         "they agree rather than after."),
        ("As it is submitted",
         "Each submission is recorded as it happens, so the history belongs to the person too. If "
         "one lender appears twice, that is shown as an event, not named as an accusation."),
        ("When the paperwork differs from the sheet",
         "Only the changes are shown. Term, rate, and what got added. Any one can be legitimate. "
         "All three moving at once is worth a question."),
    ],
    stat=("2,332", "charges laid by OMVIC in Ontario in 2025, drawing $1.9 million in fines"),
)

P["realestate"] = dict(
    eye="Real estate",
    h1="You are asked to sign a relationship",
    h1b="before you understand what it is.",
    lede="A representation agreement decides who owes a duty to whom, for how long, and what "
         "happens when the same brokerage stands on both sides of the table.",
    decision="Who represents you, on what terms, for how long, and what changes if the brokerage "
             "also represents the other party.",
    who="RECO in Ontario, BCFSA in British Columbia, RECA in Alberta. Each maintains a public "
        "register of registrants and a public record of discipline.",
    check=[("RECO registrant search", "https://www.reco.on.ca/complaints-enforcement/registrant-search/"),
           ("BCFSA real estate registrant search", "https://www.bcfsa.ca/public-resources/registrant-search")],
    wrong=[
        ("The agreement", "Signed before it is understood",
         "Duration, holdover, commission, and what happens on a multiple representation are all in "
         "the document. Most people meet them for the first time afterwards.", "blue"),
        ("The duty", "Whose interest, exactly",
         "When one brokerage represents both sides, the duty owed to each changes. The person is "
         "entitled to have that explained in words they use.", "gold"),
        ("The record", "A conversation nobody wrote down",
         "Most of what determines a real estate outcome happens by phone and by message. Very "
         "little of it reaches the file.", "gold"),
        ("The moment it matters", "Years later, in a complaint",
         "By then the question is not what happened. It is what can be shown to have happened.",
         "blue"),
    ],
    what=[
        ("Before signing anything",
         "The agreement is explained as a set of consequences rather than a set of clauses: how "
         "long, what happens if you change your mind, and what you are owed."),
        ("When representation changes",
         "If the brokerage ends up on both sides, the change is surfaced as a change, with the "
         "person asked to acknowledge it rather than assumed to have noticed."),
        ("Through the offers",
         "What was presented, when, and what was recommended. The reasoning, not only the outcome."),
        ("Afterwards",
         "A record that answers who represented whom, what was disclosed, and when."),
    ],
    stat=("Two sides", "of the same table, and a duty that changes depending on which one you are on"),
)

P["insurance"] = dict(
    eye="Insurance",
    h1="Sold in an hour.",
    h1b="Relied on in the worst week of your life.",
    lede="Insurance is the one product where the person finds out what they actually bought at the "
         "moment they can least afford to be wrong about it.",
    decision="What is covered, what is excluded, what it costs, and whether replacing a policy you "
             "already hold is better for you or better for the person recommending it.",
    who="FSRA in Ontario, and the provincial regulator elsewhere. RIBO regulates general insurance "
        "brokers in Ontario. FSRA expects needs-based recommendations, written product "
        "information, records of the discussion, and a documented recommendation.",
    check=[("FSRA regulated entities and individuals", "https://www.fsrao.ca/consumers"),
           ("RIBO broker search", "https://www.ribo.com/broker-search/")],
    wrong=[
        ("What FSRA found", "Unsuitable sales and weak oversight",
         "Supervision work has identified unsuitable sales, consumers being misled, document "
         "falsification, and inadequate oversight of the people doing the selling.", "gold"),
        ("The replacement question", "Better for you, or better for them",
         "Replacing an existing policy can be right. It can also restart commissions. The person "
         "is entitled to know which case they are in.", "gold"),
        ("The needs analysis", "Recorded as a conclusion",
         "A file that records a recommendation without recording the need it answered proves "
         "nothing to anybody, including the professional who made it.", "blue"),
        ("The exclusion", "Read for the first time at claim",
         "The gap between what was explained and what was signed only becomes visible when it is "
         "too late to close.", "blue"),
    ],
    what=[
        ("Before a policy is bound",
         "What this covers, what it does not, and what would have to happen for it not to pay. In "
         "the person's own language, before the signature."),
        ("On a replacement",
         "The existing policy and the proposed one, side by side, with what is gained and what is "
         "given up, recorded as having been shown."),
        ("At every change",
         "A change in coverage is a material event. It is surfaced, acknowledged, and kept."),
        ("At claim",
         "The record shows what the person was told at the outset, so the argument is about the "
         "claim rather than about memory."),
    ],
    stat=("Needs first", "FSRA expects a documented recommendation that answers a recorded need, "
          "not a form signed at the end"),
)

P["investing"] = dict(
    eye="Investing",
    h1="The file says suitable.",
    h1b="It does not say why.",
    lede="Since the end of 2021, a Canadian registrant must put the client's interest first, know "
         "the client, know the product, and consider a reasonable range of alternatives. In "
         "December 2025 the regulators went and looked at whether that could be shown.",
    decision="Whether to hand investment decisions to someone else, to whom, under which "
             "registration, and on what basis this recommendation rather than another.",
    who="The CSA and the thirteen provincial and territorial commissions make the rules. CIRO "
        "oversees investment and mutual fund dealers and the individuals inside them. OBSI handles "
        "complaints that the firm could not resolve.",
    check=[("CSA National Registration Search",
            "https://info.securities-administrators.ca/nrsmobile/NrsSearch.aspx"),
           ("CIRO Advisor Report", "https://www.ciro.ca/advisor-report-search"),
           ("CSA Disciplined List", "https://www.securities-administrators.ca/csa-activities/enforcement/disciplined-list/")],
    wrong=[
        ("What the reviewers found", "Suitable, with nothing behind it",
         "Reviewing 105 registered firms, the CSA and CIRO reported that some had little or no "
         "documentation, or recorded only that an investment was suitable without showing the "
         "basis for that determination.", "gold"),
        ("The alternatives", "Never shown to have been weighed",
         "In many cases, registrants could not show evidence that a reasonable range of "
         "alternatives was considered at the time of the decision. The rule requires it. The "
         "record could not demonstrate it.", "gold"),
        ("The client's own instruction", "Undocumented",
         "Where a client insisted on something the registrant thought unsuitable, many did not "
         "document the determination they had performed before proceeding.", "blue"),
        ("The review note", "No changes",
         "The regulators were explicit: records should show a meaningful reassessment, and generic "
         "notes reading no changes are insufficient.", "blue"),
    ],
    what=[
        ("Before money moves",
         "The person understands what they are being asked to decide, and that asking why this "
         "option rather than another is an expected question with an expected answer."),
        ("At the recommendation",
         "The reasoning is captured as it is given, in the conversation where it is given, rather "
         "than reconstructed into a form afterwards."),
        ("On every review",
         "A reassessment that shows what was actually reconsidered, so the file does not read as "
         "two words repeated annually."),
        ("If it is ever questioned",
         "The basis is there, dated, alongside what the client said and what they were shown."),
    ],
    stat=("105 firms", "reviewed by the CSA and CIRO in December 2025. Some recorded only that an "
          "investment was suitable, without showing the basis for it"),
)

P["banking"] = dict(
    eye="Banking",
    h1="You went in to open an account.",
    h1b="You came out with three products.",
    lede="A bank is the custodian of a person's money and, at the same moment, is running a sales "
         "operation on them. Both things are true at once, and only one of them is obvious.",
    decision="Who holds your money, and what you agree to while it is being held.",
    who="FCAC supervises how banks treat and sell to customers. OSFI supervises whether they stay "
        "solvent, which is a different job. OBSI handles the complaint when the bank cannot. "
        "Confusing the three is the most common mistake a person makes.",
    check=[("FCAC list of regulated entities",
            "https://www.canada.ca/en/financial-consumer-agency/services/industry/regulated-entities.html"),
           ("FCAC decisions and proceedings",
            "https://www.canada.ca/en/financial-consumer-agency/services/industry/commissioner-decisions.html")],
    wrong=[
        ("What FCAC concluded", "A culture built to sell",
         "Retail banking culture is predominantly focused on selling products and services, "
         "increasing the risk that consumers' interests are not always given the appropriate "
         "priority. That is FCAC's finding, in its own words.", "gold"),
        ("What the shoppers found", "Nearly half, on credit cards",
         "Across 712 mystery shopping visits at the six largest banks, 45 per cent of credit card "
         "shoppers and 32 per cent of chequing shoppers reported an inappropriate product "
         "recommendation.", "gold"),
        ("Who had it worse", "Not everybody equally",
         "FCAC recorded that shoppers who self-identified as visible minorities, Indigenous persons "
         "and students had more concerning experiences than other shoppers.", "blue"),
        ("The complaint that never was", "Never written down",
         "FCAC's 2025 review found employees who did not understand what counted as a complaint, "
         "so it was never recorded, never started the clock, and never reached anybody.", "blue"),
    ],
    what=[
        ("Before the branch",
         "The person knows what they came in for, and has it written down, so a conversation that "
         "widens is visibly a conversation that widened."),
        ("At the recommendation",
         "What was offered, what need it was said to answer, and what the person actually agreed "
         "to, captured as it happens."),
        ("On consent",
         "Express consent for each product, recorded separately, because the law now requires each "
         "product to be its own agreement."),
        ("On a complaint",
         "It is recorded as a complaint the moment it is one, which is the only way the fifty-six "
         "day obligation means anything."),
    ],
    stat=("45%", "of credit card mystery shoppers reported an inappropriate product recommendation "
          "across the six largest banks"),
)

P["lending"] = dict(
    eye="Lending",
    h1="The only place that said yes",
    h1b="is the one you understand least.",
    lede="A person who needs money quickly is the least able to compare offers and the most likely "
         "to be shown only one. Everything difficult about this sector follows from that.",
    decision="What this will cost in total, over what period, and whether the lender is licensed "
             "to offer it at all.",
    who="The Criminal Code sets a ceiling of thirty-five per cent a year, in force since January "
        "2025, with a narrow exemption for licensed payday lending. Provinces license the lenders: "
        "Consumer Protection BC, Ontario's Consumer Protection Branch, Service Alberta.",
    check=[("Consumer Protection BC payday licence search",
            "https://www.consumerprotectionbc.ca/payday-licence-search/"),
           ("Ontario licensed payday lenders",
            "https://www.ontario.ca/page/search-business-licence-registration-or-appointment"),
           ("Service Alberta licensed business search",
            "https://www.servicealberta.gov.ab.ca/consumer/business_search/")],
    wrong=[
        ("The comparison", "Fewer than half knew",
         "In FCAC's national payday study, fewer than half of borrowers understood that a payday "
         "loan is more expensive than the alternatives. The study is from 2016 and has not been "
         "replaced.", "gold"),
        ("The repeat", "Six or more, in three years",
         "Nearly a quarter of borrowers in that study had taken six or more loans over three "
         "years. One loan is a bridge. Six is a condition.", "gold"),
        ("The ceiling", "Thirty-five per cent, since January 2025",
         "Above that, outside the payday exemption, the agreement is criminal rather than merely "
         "expensive. Most people have never been told the number exists.", "blue"),
        ("Where it ends", "Insolvencies up 11.8 per cent",
         "Consumer insolvencies in June 2026 were 11.8 per cent above June 2025. Consumer filings "
         "were 96.8 per cent of all insolvency filings.", "blue"),
    ],
    what=[
        ("Before the agreement",
         "The total cost of borrowing in dollars over the full term, which is the one number that "
         "cannot be reshaped by stretching the schedule."),
        ("On the lender",
         "Whether they hold a licence, and where to read that for yourself rather than take "
         "anyone's word for it."),
        ("On the optional products",
         "What was added, what it costs across the term, and confirmation when something is "
         "cancelled."),
        ("Afterwards",
         "A record of what was explained and what was agreed, which matters most for the people "
         "least able to argue about it later."),
    ],
    stat=("35%", "a year is the criminal interest rate in Canada since January 2025, outside a "
          "narrow payday exemption"),
)


def page(key, label, path, d):
    S = []

    S.append(sec("The decision", d["h1"].rstrip(',') + " " + d["h1b"],
        '<div class="dgrid">' +
        duty("What is being decided", d["decision"]) +
        duty("Who oversees it", d["who"]) +
        '</div>' +
        note("b", "<b>Check it yourself.</b> " + " &middot; ".join(
            '<a href="%s" target="_blank" rel="noopener">%s</a>' % (h, n) for n, h in d["check"]) +
            ". These are published registers. Nothing on this page asks you to take our word for "
            "anything you can read at the source."),
        p=d["lede"]))

    S.append(sec("Where it comes apart", "What actually goes wrong.",
        softs([(a, b, c, t) for a, b, c, t in d["wrong"]], cols=2),
        p="Not a list of villains. A list of places where the record and the relationship come "
          "apart, drawn from what the regulators themselves have published.", alt=True))

    S.append(sec("What 4orm does", "The same four moments, in this decision.",
        flow(d["what"]),
        p="Every industry on this site gets the same four moments, because the relationship is "
          "the thing that repeats. Only the decision changes."))

    S.append(cta("Better financial decisions start with better relationships.",
        "The person understands what they are deciding. The firm can show how it was handled. "
        "Both of those come out of the same conversation."))

    body = hero(d["eye"], d["h1"], d["h1b"], d["lede"]) + "".join(S)
    return kit.write(key, path, d["h1"].rstrip(',') + " " + d["h1b"],
                     d["lede"][:180], body)


def build():
    rows = "".join(
        '<a class="eln" href="%s"><span class="n">%s</span>'
        '<span class="d">%s</span><span class="a">&#8594;</span></a>' % (p, lab, P[k]["decision"])
        for k, lab, p, live in IND)

    S = [sec("Seven decisions", "Same relationship. Different decision.",
             '<div class="enav">' + rows + '</div>',
             p="A mortgage, a vehicle, a policy, a portfolio, an account, a loan, a home. Different "
               "products, different regulators, different rulebooks. The same person, trying to "
               "understand what they are agreeing to, and the same firm, trying to show how they "
               "handled it.")]

    S.append(sec("What repeats", "The decision changes. The relationship does not.",
        flow([
            ("The person has to understand what they are deciding",
             "Before anyone has anything to sell them, and in language they already use."),
            ("The person has to check who they are dealing with",
             "Every one of these seven has a public register. Almost nobody knows they exist."),
            ("The firm has to explain why this and not that",
             "Regulators in three of these sectors have now said, in writing, that recording the "
             "conclusion is not the same as recording the reason."),
            ("The firm has to be able to show it later",
             "Usually years later, usually to a person who was not there, and usually from systems "
             "that were never joined up."),
        ]), alt=True))

    S.append(cta("One architecture, seven decisions.",
        "That is the argument. If it only worked for mortgages it would be a feature. It works "
        "the same way in all seven because what it protects is the relationship, not the product."))

    body = hero("Industries", "Same relationship.", "Different decision.",
                "Seven financial decisions, seven sets of rules, and one thing they all have in "
                "common: the person needs to understand it, and the firm needs to be able to show "
                "how it was handled.") + "".join(S)
    # The hub lives inside the folder so /industries and /industries/mortgage
    # cannot collide on a host that resolves clean URLs against the filesystem.
    yield kit.write("industries", "/industries", "Same relationship. Different decision.",
                    "Mortgage, auto, real estate, insurance, investing, banking and lending. Seven "
                    "decisions, one relationship, one record.", body,
                    filename="industries/index.html")

    for k, lab, p, live in IND:
        yield page(k, lab, p, P[k])
