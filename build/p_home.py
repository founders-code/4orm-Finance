# -*- coding: utf-8 -*-
import sitekit as kit
from sitekit import sec_head, ARROW

HERO_CARD = """
<figure class="card reveal rv-d2" style="margin:0; box-shadow:var(--sh-lg); overflow:hidden">
  <div class="card-h">
    <span class="ct">Evidence pack &middot; illustration</span>
    <span class="mono" style="font-size:11px; color:var(--text-3)">8 Sep 2026 &middot; 14:02</span>
  </div>
  <div class="card-b">
    <div style="font-size:10.5px; font-weight:800; letter-spacing:.13em; text-transform:uppercase; color:var(--text-3); margin-bottom:10px">The record</div>
    <div class="row"><span class="rk">Client trust &middot; 4021</span><span class="rv">1,284,300.00</span></div>
    <div class="row"><span class="rk">Client trust &middot; 4022</span><span class="rv">318,940.15</span></div>
    <div class="row"><span class="rk">Client trust &middot; 4088</span><span class="rv">902,115.60</span></div>
    <div class="row"><span class="rk">Client trust &middot; 4103</span><span class="rv">75,600.00</span></div>
    <div class="row" style="border-top:1px solid var(--border-strong)">
      <span class="rk" style="color:var(--text); font-weight:650">Held in trust</span>
      <span class="rv" style="font-size:14px">2,580,955.75</span></div>
    <div class="row"><span class="rk">Owed to customers</span><span class="rv" style="color:var(--text-2)">2,580,955.75</span></div>
    <div style="margin-top:14px; padding:13px 15px; background:var(--success-bg); border:1px solid var(--success-br);
                border-radius:var(--r-sm); display:flex; justify-content:space-between; align-items:center">
      <span style="font-size:13px; font-weight:700; color:var(--success)">Variance</span>
      <span class="mono" style="font-size:15px; font-weight:800; color:var(--success)">0.00</span>
    </div>
    <div style="margin-top:18px; padding-top:16px; border-top:1px solid var(--border)">
      <div style="font-size:10.5px; font-weight:800; letter-spacing:.13em; text-transform:uppercase; color:var(--text-3); margin-bottom:10px">The rule, as it stood</div>
      <div style="font-size:13.5px; font-weight:650">Retail Payment Activities Regulations</div>
      <div style="font-size:12.5px; color:var(--text-3); margin-top:3px">Safeguarding of end user funds &middot; section 15</div>
      <div style="margin-top:12px; display:inline-flex; align-items:center; gap:8px; padding:6px 12px; border-radius:999px;
                  background:var(--brand-50); border:1px solid var(--brand-100)">
        <span class="mono" style="font-size:9.5px; font-weight:800; letter-spacing:.14em; color:var(--brand-700)">IN FORCE ON THIS DATE</span>
      </div>
      <p style="font-size:12.5px; color:var(--text-3); margin-top:12px; line-height:1.55">The wording is kept with the record rather than looked up later.</p>
    </div>
    <div style="margin-top:18px; padding-top:16px; border-top:1px solid var(--border); display:flex;
                justify-content:space-between; gap:16px; flex-wrap:wrap">
      <div><div style="font-size:10.5px; font-weight:800; letter-spacing:.13em; text-transform:uppercase; color:var(--text-3)">Signed by</div>
           <div style="font-size:13.5px; font-weight:700; margin-top:5px">The authorised signatory</div>
           <div style="font-size:12px; color:var(--text-3)">Controller &middot; reviewed before release</div></div>
      <div style="text-align:right"><div style="font-size:10.5px; font-weight:800; letter-spacing:.13em; text-transform:uppercase; color:var(--text-3)">Exported</div>
           <div class="mono" style="font-size:13.5px; font-weight:800; margin-top:5px">8 Sep 2026 &middot; 14:02</div>
           <div style="font-size:12px; color:var(--text-3)">produced in one action</div></div>
    </div>
  </div>
  <div style="padding:12px 20px; background:var(--surface-2); border-top:1px solid var(--border);
              font-size:11.5px; color:var(--text-3)">Drawn for illustration. The firm, the accounts and the figures are invented.</div>
</figure>
"""

STEPS = [
    ("Money arrives", "A client deposit, an employee's pay, a month's rent, a payment collected for a creditor."),
    ("It stays theirs", "You are the custodian. The money belongs to the sender, or to the person waiting for it, the entire time you hold it."),
    ("It sits apart", "In its own account, identified to the person it belongs to. That is a trust account."),
    ("It gets checked", "Your list against the bank's. Daily for payment firms, monthly for law firms, trustees and property managers."),
    ("It gets produced", "An examiner, an auditor or a court names a date. You hand over that day's record, and the working behind it."),
]

LIMITS = [
    ("Not a bank", "It never holds or moves customer money", "No customer funds pass through 4orm Finance at any point."),
    ("Not your filer", "It signs no filing for anybody", "Nothing goes to a regulator with our name where yours should be."),
    ("Not your judgement", "The decision is always the firm's", "The software gathers, checks and drafts. A named person at your firm decides."),
    ("Not your duty", "The duty stays where the money is", "And so does the signature. What we sell is the proof the law asks to see."),
]

CASES = [
    ("QuadrigaCX", "2019", "$169M", "76,000 investors. The Ontario Securities Commission attributed about $115 million of it to fraudulent trading by the chief executive. No independent daily record existed of what the platform actually held.", "The company collapsed"),
    ("Bridging Finance", "2021", "$1.3B expected", "$2.09 billion under management at receivership, across 26,000 investors. Reconstructing what the firm had been holding cost $43 million in professional fees over the first two years, paid out of what was left.", "A receiver was appointed"),
    ("iPro Realty", "2025", "$10M", "$6.5 million of consumer deposits and $3.5 million of commission money. The Real Estate Council of Ontario calls it the largest trust misappropriation since it was founded in 1997. Consumer deposit insurance caps at $4 million for a single event.", "Self reported, one day before a scheduled audit"),
    ("Save Max brokerages", "2025", "$2.7M", "Moved out of four trust accounts and used for loan payments, taxes, credit card balances and vendor services. Regulators found the money was typically replaced before the month end reconciliation.", "A regulator looked between the monthly checks"),
]

PENALTIES = [
    ("Money laundering, company, before 26 March 2026", "CA$500,000", 2.5, "var(--border-strong)"),
    ("Payment rules, serious breach", "CA$1,000,000", 5, "var(--gold-2)"),
    ("Money laundering, individual, now", "CA$4,000,000", 20, "var(--warn)"),
    ("Payment rules, very serious breach", "CA$10,000,000", 50, "var(--brand)"),
    ("Money laundering, company, now", "CA$20,000,000", 100, "var(--danger)"),
]

INDUSTRIES = [
    ("mortgage", "Mortgage", "6 years &middot; Ontario", "Brokerages and administrators",
     "An advance payment on a mortgage becomes trust money the moment it arrives. The consumer on the other side of the file can now see it too."),
    ("payments", "Payments", "Daily &middot; Bank of Canada", "Providers holding end user funds",
     "Payroll bureaus, money transfer apps, gift card issuers. Any business holding or moving money for other people without being a bank."),
    ("law-firms", "Law firms", "Monthly &middot; law societies", "Firms holding client money in trust",
     "House deposits, settlement funds and retainers sit in the firm's trust account. The money belongs to the client throughout."),
    ("real-estate", "Real estate", "Monthly &middot; provincial", "Brokerages and property management",
     "Deposits on offers, rent and damage deposits, commission held pending. Rent belongs to the landlord, damage deposits belong to the tenant."),
    ("insurance", "Insurance", "Twice a year &middot; provincial", "General and life agencies",
     "Agency bill premium owed to insurers, return premium owed back to clients, and claims funds passing through."),
    ("credit-unions", "Credit unions", "Continuous &middot; provincial", "Provincially and federally regulated",
     "Member deposits, and the record of every decision you made about them. Your regulator, your guarantor, and the money laundering regulator."),
]


def build():
    steps = "\n".join(
        '<div class="numitem reveal rv-d%d"><div class="n">%02d</div><div><h4>%s</h4><p>%s</p></div></div>'
        % (min(i, 5), i + 1, t, d) for i, (t, d) in enumerate(STEPS))

    limits = "\n".join(
        '<div class="pane reveal rv-d%d"><div class="ptag">%s</div><h3 style="font-size:19px">%s</h3><p>%s</p></div>'
        % (min(i + 1, 4), tag, h, p) for i, (tag, h, p) in enumerate(LIMITS))

    cases = "\n".join(
        '<tr><td><b>%s</b><div style="font-size:11.5px; color:var(--text-3); margin-top:2px">%s</div></td>'
        '<td class="mono" style="font-weight:800; color:var(--danger); white-space:nowrap">%s</td>'
        '<td style="color:var(--text-2)">%s</td>'
        '<td style="color:var(--text-3); font-size:12.5px">%s</td></tr>' % c for c in CASES)

    bars = "\n".join(
        '<div class="barrow reveal"><div class="top"><span class="bl">%s</span><span class="bv">%s</span></div>'
        '<div class="bt"><i data-pct="%s" data-fill="%s"></i></div></div>' % p for p in PENALTIES)

    inds = "\n".join(
        '<a class="ind reveal rv-d%d" href="/%s"><div class="ik">%s</div><h3>%s</h3>'
        '<div class="isub">%s</div><dl><dt>What it covers</dt><dd>%s</dd></dl>'
        '<span class="go">Read the rules for this sector %s</span></a>'
        % (min(i + 1, 5), slug, clock, name, sub, desc, ARROW)
        for i, (slug, name, clock, sub, desc) in enumerate(INDUSTRIES))

    body = """
<section class="hero">
  <div class="wrap">
    <div class="hero-grid">
      <div>
        <span class="eyebrow reveal"><span class="pulse"></span>The maximum for one money laundering violation reached $20M in March 2026</span>
        <h1 class="reveal rv-d1">Compliance isn't what you did. <span class="accent">It's what you can prove.</span></h1>
        <p class="lede reveal rv-d2">4orm is software that creates the evidence behind every regulated decision.
          If your firm holds money that belongs to your clients, a regulator can name any single day,
          years after the fact, and ask to see the record for it.</p>
        <div class="hero-actions reveal rv-d3">
          <a class="btn btn-primary" href="/contact">Tell us what your firm does %(arrow)s</a>
          <a class="btn btn-ghost" href="#produce">See what we produce</a>
        </div>
        <div class="hero-foot reveal rv-d4">
          <span><i class="tickmark">&#10003;</i>We never touch the money</span>
          <span><i class="tickmark">&#10003;</i>Every rule cited to its section</span>
          <span><i class="tickmark">&#10003;</i>Alberta company, pre-revenue</span>
        </div>
      </div>
      <div>%(card)s</div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="wrap">
    <div class="statrow">
      <div class="stat reveal"><div class="l">Supervision began</div><div class="v blue">8 Sep 2025</div>
        <div class="d">the Bank of Canada started supervising payment firms</div></div>
      <div class="stat reveal rv-d1"><div class="l">Records a year, per customer</div><div class="v gold">365</div>
        <div class="d">payment firms owe one for every day, weekends included</div></div>
      <div class="stat reveal rv-d2"><div class="l">Money laundering ceiling, company</div>
        <div class="v red"><span class="cur">CA$</span>20M</div>
        <div class="d">up from $500,000 on 26 March 2026, a 40 times rise</div></div>
      <div class="stat reveal rv-d3"><div class="l">Days the duty has already fallen due</div>
        <div class="v blue" data-days-since="2025-09-08">350</div>
        <div class="d">one record owed for every one, since 8 September 2025</div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    %(sh_steps)s
    <div class="numlist">%(steps)s</div>
    <div class="note note-warn reveal" style="margin-top:32px; font-size:15px">
      <b>Step five is the expensive one.</b> Most firms handle the first four. The fifth is where the weeks go.
      Reconstructing proof for a date two years back means going through bank exports, ledgers, spreadsheets and
      email, and hoping the person who did the work still remembers it.
    </div>
  </div>
</section>

<section class="section alt" id="produce">
  <div class="wrap">
    %(sh_produce)s
    <div class="split-2">
      <div class="pane reveal rv-d1">
        <div class="ptag">Today &middot; month end</div>
        <h3>Six places to look.</h3>
        <p>And no single record of the answer. The proof gets assembled by hand every time it is asked for.</p>
        <div class="scatter" style="margin-top:22px">
          <div class="sc"><div class="n">Bank portal</div><div class="d">2,580,955.75</div></div>
          <div class="sc"><div class="n">Ledger export</div><div class="d">2,580,140.15</div></div>
          <div class="sc"><div class="n">Spreadsheet</div><div class="d">2,581,002.00</div></div>
          <div class="sc"><div class="n">Second bank</div><div class="d">not stated</div></div>
          <div class="sc"><div class="n">Email thread</div><div class="d">unknown</div></div>
          <div class="sc"><div class="n">Filing cabinet</div><div class="d">unknown</div></div>
        </div>
        <div class="note note-warn" style="margin-top:20px"><b>3 weeks.</b> Six systems and one person's memory.</div>
      </div>
      <div class="pane gold reveal rv-d2">
        <div class="ptag">With 4orm &middot; one export</div>
        <h3>The same question, answered from one record.</h3>
        <p>An examiner names a date. You hand over one file, and the working behind it comes with it.</p>
        <ul>
          <li><span class="b">&#10003;</span><span>The position for that day, per customer, as it stood.</span></li>
          <li><span class="b">&#10003;</span><span>The wording of the rule as it stood on that day, kept with the record.</span></li>
          <li><span class="b">&#10003;</span><span>Who approved it, and when they approved it.</span></li>
          <li><span class="b">&#10003;</span><span>Every difference found, its cause, and what was done about it.</span></li>
        </ul>
        <div class="note note-info" style="margin-top:20px"><b>Same day.</b> Produced in one action, from records already made.</div>
      </div>
    </div>
    <div class="note note-mute reveal" style="margin-top:26px">
      We are taking design partners now, and the first ones shape what gets built first. The product is under
      development and we would rather build it against a real month end than a guess at one.
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    %(sh_stop)s
    <div class="split-2" style="grid-template-columns:repeat(2,1fr)">%(limits)s</div>
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    %(sh_two)s
    <div class="statrow reveal" style="margin-bottom:30px">
      <div class="stat"><div class="l">Products read</div><div class="v">23</div><div class="d">on their own published material, 16 and 17 August 2026</div></div>
      <div class="stat"><div class="l">With a real Canadian presence</div><div class="v">6</div><div class="d">of the twenty three</div></div>
      <div class="stat"><div class="l">Of those six touching end user funds</div><div class="v red">0</div><div class="d">not one of them</div></div>
      <div class="stat"><div class="l">Doing it under the Canadian rule</div><div class="v red">0</div><div class="d">four do a daily calculation somewhere in the world</div></div>
    </div>
    <div class="note note-info reveal">
      Not one of the evidence and audit platforms connects to a bank account. Not one of them connects to a
      customer funds ledger either. Both connections are needed before the daily comparison can exist at all.
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    %(sh_fail)s
    <div class="card reveal rv-d1">
      <div class="card-h"><span class="ct">Four Canadian cases</span>
        <span style="font-size:11.5px; color:var(--text-3)">Read 17 Aug 2026 &middot; CAD</span></div>
      <div class="card-b"><div class="tblwrap"><table class="tbl">
        <thead><tr><th>Case</th><th>What was lost</th><th>What happened</th><th>How it surfaced</th></tr></thead>
        <tbody>%(cases)s
        <tr><td><b>Detected by a routine reconciliation</b></td>
            <td class="mono" style="font-weight:800">None</td>
            <td style="color:var(--text-2)">In three of the four, the money was gone for months and the monthly check never saw it.</td>
            <td style="color:var(--text-3)">&mdash;</td></tr>
        </tbody></table></div></div>
    </div>
    <div class="note note-warn reveal" style="margin-top:24px">
      <b>A daily record does not stop someone taking money.</b> It stops them putting it back before anybody
      looks. The median internal fraud studied worldwide runs for twelve months before anybody notices, and the
      most common cause is that the control did not exist at all.
    </div>
    <p class="legal reveal">Losses as published by the Ontario Securities Commission, the Real Estate Council of Ontario,
      The Globe and Mail and Global News. Internal fraud duration from the Association of Certified Fraud Examiners.</p>
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    %(sh_cost)s
    <div class="card reveal rv-d1"><div class="card-h">
      <span class="ct">Maximum penalty for a single violation</span>
      <span style="font-size:11.5px; color:var(--text-3)">As at 19 Aug 2026 &middot; CAD</span></div>
      <div class="card-b">%(bars)s</div></div>
    <p class="legal reveal">Money laundering figures from section 73.1 of the Proceeds of Crime (Money Laundering) and
      Terrorist Financing Act, as amended by Bill C-12, in force 26 March 2026. Payment figures from the Retail
      Payment Activities Act. All bars share one scale.</p>
    <div class="note note-mute reveal" style="margin-top:20px">
      In October 2025 the money laundering regulator assessed $176,960,190 against Xeltox Enterprises Ltd. It is the
      largest penalty in Canadian history and it is under appeal. In its 2024 to 2025 financial year the regulator
      issued 23 notices of violation totalling more than $25 million. A cancelled registration ends the business
      outright, which for most firms is the heavier outcome.
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    %(sh_who)s
    <div class="industries">%(inds)s</div>
    <div class="note note-mute reveal" style="margin-top:26px">
      Also in scope and not shown above: insolvency trustees, collection agencies, payroll bureaus, escrow and
      title agents. Ten kinds of firm, ten regulators, one shape of work.
    </div>
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <div class="closer reveal">
      <h2>Tell us what your firm does.</h2>
      <p>Five questions, 30 minutes, no customer data. At the end of it you will know whether the duty applies to
        you, what it asks for, and whether we can help. Sometimes we cannot.</p>
      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap">
        <a class="btn btn-primary" href="/contact">Talk to us %(arrow)s</a>
        <a class="btn btn-ghost" href="/the-rules">Read the wording</a>
      </div>
    </div>
  </div>
</section>
""" % {
        "arrow": ARROW,
        "card": HERO_CARD,
        "steps": steps,
        "limits": limits,
        "cases": cases,
        "bars": bars,
        "inds": inds,
        "sh_steps": sec_head("How the duty works", "Five steps. Four of them are easy.",
                             "This is the shape of the obligation, whichever regulator you answer to."),
        "sh_produce": sec_head("What we produce", "An examiner names a date. You hand over one file.",
                               "The same question, asked of the same firm, before and after. This is the whole of what the software is for."),
        "sh_stop": sec_head("Where we stop", "We never touch the money.",
                            "This is the first question every compliance officer asks, so it is answered before anything else."),
        "sh_two": sec_head("Why nothing you own does this", "It needs two connections. Almost nothing has both.",
                           "Software that proves a daily position has to reach two places at once: the bank account, to see what is actually there, and the customer ledger, to see what is owed. Reaching both sides is a different product rather than a feature, which is why the category has stayed split."),
        "sh_fail": sec_head("What it looks like when it fails", "Four Canadian cases. In none of them did the record catch it.",
                            "All published, all in the last seven years. In each of them the record is what would have caught it."),
        "sh_cost": sec_head("What a breach costs", "The ceiling rose by up to 40 times in March 2026.",
                            "A ceiling is the maximum a regulator may impose. Until 26 March 2026 the money laundering maximum for a company was $500,000. It is now $20,000,000, or 3 per cent of worldwide revenue where one notice covers several violations, whichever is greater."),
        "sh_who": sec_head("Who carries it", "The duty sits with the firm holding the money.",
                           "No bank, processor or sponsor carries it for you. Six of the ten kinds of firm this covers, each with its own rulebook."),
    }

    return kit.write("home", "/", "Compliance isn't what you did. It's what you can prove.",
                     "4orm is software that creates the evidence behind every regulated decision. If your firm holds money that belongs to your clients, a regulator can name any single day, years after the fact, and ask to see the record for it.",
                     body)
