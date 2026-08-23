# -*- coding: utf-8 -*-
"""Research: the State of Financial Trust in Canada.

The home for every figure the rest of the site quotes, so no commercial page
has to carry a research load. One rule governs this file: every number shows
what it means, the year, the scope it covers, and a link to the body that
published it. A figure that cannot do all four does not appear.
"""
import kit
from pkit import hero, sec, note

# figure, meaning, year, scope, source name, source url, tag
DATA = [
    ("47%", "of homebuyers reported feeling concerned or uncertain during the homebuying process. "
            "Down from close to two thirds in earlier surveys.",
     "2026", "CMHC Mortgage Consumer Survey respondents, not all Canadian buyers",
     "Canada Mortgage and Housing Corporation",
     "https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research", "mortgage"),

    ("26%", "of mortgage consumers reported concern or uncertainty specifically while going "
            "through the mortgage process.",
     "2026", "CMHC survey respondents", "Canada Mortgage and Housing Corporation",
     "https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research", "mortgage"),

    ("$704M+", "in reported losses to fraud, across more than 112,000 reports. Investment fraud "
               "alone accounted for $351 million of it.",
     "2025", "Reports made to the Canadian Anti-Fraud Centre. Reported, not total.",
     "Canadian Anti-Fraud Centre", "https://antifraudcentre-centreantifraude.ca/", "fraud"),

    ("5 to 10%", "the estimated share of frauds that are reported at all, which is why the figure "
                 "above is a floor rather than a measure.",
     "ongoing", "Government partner estimate", "Canadian Anti-Fraud Centre",
     "https://antifraudcentre-centreantifraude.ca/", "fraud"),

    ("100%", "of files reviewed had no documented suitability assessment.",
     "2024 to 2025", "FSRA private-mortgage supervision sample. Not all Ontario mortgages.",
     "Financial Services Regulatory Authority of Ontario", "https://www.fsrao.ca/", "mortgage"),

    ("73%", "of those same files were missing or had inadequate disclosure of material risk.",
     "2024 to 2025", "The same FSRA supervision sample",
     "Financial Services Regulatory Authority of Ontario", "https://www.fsrao.ca/", "mortgage"),

    ("65%", "were missing or had inadequate disclosure of the relationship or the conflict.",
     "2024 to 2025", "The same FSRA supervision sample",
     "Financial Services Regulatory Authority of Ontario", "https://www.fsrao.ca/", "mortgage"),

    ("100%", "of the entities examined had inadequate supervision of their mortgage brokering. "
             "The finding extended beyond individual files to the firm level.",
     "2024 to 2025", "Entities examined in that FSRA exercise",
     "Financial Services Regulatory Authority of Ontario", "https://www.fsrao.ca/", "mortgage"),

    ("105", "registered firms reviewed. Some had little or no documentation, or recorded only that "
            "an investment was suitable without showing the basis for that determination.",
     "December 2025", "Registered firms across Canada",
     "Joint CSA and CIRO Staff Notice 31-368",
     "https://www.securities-administrators.ca/", "investing"),

    ("2,332", "charges laid against dealers, salespeople and unregistered sellers, drawing "
              "$1.9 million in fines.",
     "2025", "Ontario", "Ontario Motor Vehicle Industry Council",
     "https://www.omvic.ca/news/news-releases/omvic-releases-2025-annual-report/", "auto"),

    ("895", "charges laid against 174 alleged curbsiders, people selling vehicles commercially "
            "while presenting as private sellers.",
     "2025", "Ontario", "Ontario Motor Vehicle Industry Council",
     "https://www.omvic.ca/news/selling/omvic-steps-up-enforcement/", "auto"),

    ("$1.5M", "paid to consumers from the Motor Vehicle Dealers Compensation Fund, with a further "
              "$825,552 returned through dealer compensation or refunds.",
     "2025", "Ontario", "Ontario Motor Vehicle Industry Council",
     "https://www.omvic.ca/news/news-releases/omvic-releases-2025-annual-report/", "auto"),

    ("712", "mystery shopping interactions at the six largest banks. 45% of credit card shoppers "
            "and 32% of chequing shoppers reported an inappropriate product recommendation.",
     "fieldwork 2019, published 2022", "The six largest Canadian banks",
     "Financial Consumer Agency of Canada",
     "https://www.canada.ca/en/financial-consumer-agency.html", "banking"),

    ("+11.8%", "consumer insolvencies against the same month a year earlier. Consumer filings were "
               "96.8% of all insolvency filings.",
     "June 2026", "Canada",
     "Office of the Superintendent of Bankruptcy",
     "https://ised-isde.canada.ca/site/office-superintendent-bankruptcy/en", "lending"),

    ("35%", "a year is the criminal interest rate in Canada, outside a narrow exemption for "
            "licensed payday lending capped at 14% of the amount advanced.",
     "in force 1 January 2025", "Canada, Criminal Code and SOR/2024-114",
     "Government of Canada",
     "https://gazette.gc.ca/rp-pr/p2/2024/2024-06-19/html/sor-dors114-eng.html", "lending"),

    ("43%", "of payday borrowers understood that a payday loan is more expensive than the "
            "alternatives. Nearly a quarter had taken six or more loans in three years.",
     "fieldwork 2016", "1,500 payday loan users. Not replaced since.",
     "Financial Consumer Agency of Canada",
     "https://www.canada.ca/en/financial-consumer-agency/programs/research/payday-loans-market-trends.html",
     "lending"),
]

TAGS = [("all", "Everything"), ("mortgage", "Mortgage"), ("auto", "Auto"), ("fraud", "Fraud"),
        ("investing", "Investing"), ("banking", "Banking"), ("lending", "Lending")]


def build():
    filters = '<div class="rfil">' + "".join(
        '<button class="rf%s" type="button" data-tag="%s">%s</button>'
        % (" on" if k == "all" else "", k, lab) for k, lab in TAGS) + '</div>'

    rows = "".join(
        '<article class="rd rv" data-tag="%s">'
        '<div class="rdl"><span class="rdf">%s</span></div>'
        '<div class="rdr">'
          '<p class="rdm">%s</p>'
          '<dl class="rdmeta">'
            '<div><dt>Year</dt><dd>%s</dd></div>'
            '<div><dt>Scope</dt><dd>%s</dd></div>'
            '<div><dt>Source</dt><dd><a href="%s" target="_blank" rel="noopener">%s</a></dd></div>'
          '</dl>'
        '</div></article>' % (tag, fig, mean, yr, scope, url, src)
        for fig, mean, yr, scope, src, url, tag in DATA)

    S = [sec("The figures", "Every number, with what it covers.",
             filters + '<div class="rlist" id="rlist">' + rows + '</div>' +
             note("b", "<b>How to read these.</b> A supervision sample is not a national rate. "
                       "Where a figure covers one regulator's review of one set of files, the "
                       "scope line says so, and quoting it as anything wider would be wrong."),
             p="Sixteen figures the rest of this site draws on. Each one shows its year, the "
               "population it actually covers, and a link to the body that published it.")]

    S.append(sec("What is deliberately absent", "Three things we will not put on a page.",
        '<div class="dgrid">'
        '<div class="duty"><span class="dk">One figure about software use</span>'
        '<span class="dv">No screen on this site names the tooling behind it, so a figure '
        'measuring that tooling has no place here either.</span></div>'
        '<div class="duty"><span class="dk">Current auto loan terms</span>'
        '<span class="dv">There is no current Canadian primary source for average loan term or '
        'negative equity. The last government figures are from 2015 and are not presented as '
        'today.</span></div>'
        '<div class="duty"><span class="dk">Anything we could not trace</span>'
        '<span class="dv">If a number could not be followed back to the body that published it, '
        'it was left out rather than softened.</span></div>'
        '</div>', alt=True))

    body = hero("Research", "The state of financial",
                "trust in Canada.",
                "Every figure this site uses, in one place, with the year it covers, the "
                "population it actually describes, and a link to the primary source.") + "".join(S)
    yield kit.write("research", "/research", "The state of financial trust in Canada.",
                    "Sixteen sourced figures on mortgage, auto, fraud, investing, banking and "
                    "lending, each with its year, scope and primary source.", body,
                    extra='\n<script src="/assets/research.js?v=%s" defer></script>' % kit.V)
