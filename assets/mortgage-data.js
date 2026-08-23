/* ============================================================
   4orm Mortgage Guardian — seeded demo transaction
   Every name, firm, figure and document in this file is invented.
   No real consumer, broker, brokerage or lender is represented.
   ============================================================ */
(function (w) {
  'use strict';

  var D = {};

  /* --------------------------------------------------------
     Transaction header
     -------------------------------------------------------- */
  D.meta = {
    txId: 'MTG-2026-0417',
    client: 'Sarah Mitchell',
    jurisdiction: 'Ontario',
    opened: '2026-02-14',
    stage: 'Pre-application',
    disclaimer: 'Synthetic demonstration data. Not a real mortgage file.'
  };

  /* --------------------------------------------------------
     Parties
     -------------------------------------------------------- */
  D.parties = [
    { id: 'p.sarah',   role: 'Consumer',    name: 'Sarah Mitchell',        detail: 'First-time buyer · Ottawa, Ontario', initials: 'SM' },
    { id: 'p.alex',    role: 'Broker',      name: 'Alex Chen',             detail: 'Licence status placeholder · Ontario', initials: 'AC' },
    { id: 'p.house',   role: 'Brokerage',   name: 'Northbridge Mortgage Group', detail: 'Principal broker: J. Okonkwo', initials: 'NB' },
    { id: 'p.maple',   role: 'Lender A',    name: 'Maple Bank',            detail: 'Fictional lender', initials: 'MB' },
    { id: 'p.cascade', role: 'Lender B',    name: 'Cascade Trust',         detail: 'Fictional lender', initials: 'CT' },
    { id: 'p.4orm',    role: 'Record',      name: '4orm Evidence Engine',  detail: 'Holds the transaction record', initials: '4' }
  ];

  /* --------------------------------------------------------
     Documents and evidence objects
     -------------------------------------------------------- */
  D.documents = [
    { id: 'd.paystub', label: 'Pay statement · 13 Feb 2026', kind: 'Income', status: 'Verified',
      owner: 'Sarah Mitchell', source: 'Uploaded by consumer', ts: '2026-02-21T10:14:00',
      extracted: 'Gross $4,553.85 biweekly · 26 periods · $118,400.10 annualized', confidence: 'Confirmed by consumer' },
    { id: 'd.t4', label: 'T4 · 2025 tax year', kind: 'Income', status: 'Verified',
      owner: 'Sarah Mitchell', source: 'Uploaded by consumer', ts: '2026-02-21T10:16:00',
      extracted: 'Box 14 employment income $116,850.00', confidence: 'Confirmed by consumer' },
    { id: 'd.noa', label: 'Notice of assessment · 2025', kind: 'Income', status: 'Verified',
      owner: 'Sarah Mitchell', source: 'Uploaded by consumer', ts: '2026-02-21T10:19:00',
      extracted: 'Line 15000 total income $117,020.00', confidence: 'Confirmed by consumer' },
    { id: 'd.bank', label: 'Bank statement · Jan 2026', kind: 'Assets', status: 'Verified',
      owner: 'Sarah Mitchell', source: 'Uploaded by consumer', ts: '2026-02-23T18:02:00',
      extracted: 'Chequing $12,410.44 · Savings $132,910.00 · Total $145,320.44', confidence: 'Confirmed by consumer' },
    { id: 'd.id', label: 'Government photo identification', kind: 'Identity', status: 'Verified',
      owner: 'Sarah Mitchell', source: 'Uploaded by consumer', ts: '2026-02-23T18:05:00',
      extracted: 'Name and date of birth match the profile', confidence: 'Confirmed by consumer' },
    { id: 'd.employ', label: 'Employment letter · Halden Systems Inc.', kind: 'Income', status: 'Needs attention',
      owner: 'Sarah Mitchell', source: 'Requested by broker', ts: '2026-03-18T09:40:00',
      extracted: 'Not yet provided', confidence: 'Outstanding' },
    { id: 'd.psa', label: 'Agreement of purchase and sale', kind: 'Property', status: 'Uploaded',
      owner: 'Sarah Mitchell', source: 'Uploaded by consumer', ts: '2026-04-12T20:31:00',
      extracted: 'Purchase price $620,000 · Closing 26 Jun 2026', confidence: 'Extracted, awaiting confirmation' },
    { id: 'd.note', label: 'Consumer note · phone call with broker', kind: 'Communication', status: 'Self-reported',
      owner: 'Sarah Mitchell', source: 'Manual note by consumer', ts: '2026-04-06T16:22:00',
      extracted: '"Alex said the file would work better at a higher income figure and he would look at it."',
      confidence: 'Consumer recollection, unconfirmed by the other party' }
  ];

  /* --------------------------------------------------------
     Facts, each with provenance
     -------------------------------------------------------- */
  D.facts = [
    { id: 'f.name', group: 'Identity', label: 'Legal name', value: 'Sarah Mitchell',
      stated: 'Sarah Mitchell', status: 'Verified', evidence: ['d.id'],
      history: [{ ts: '2026-02-14T19:02:00', actor: 'Sarah Mitchell', from: '—', to: 'Sarah Mitchell' }],
      shared: ['p.alex', 'p.maple', 'p.cascade'] },
    { id: 'f.employer', group: 'Employment', label: 'Employer', value: 'Halden Systems Inc.',
      stated: 'Halden Systems Inc.', status: 'Self-reported', evidence: ['d.paystub', 'd.t4'],
      history: [{ ts: '2026-02-14T19:05:00', actor: 'Sarah Mitchell', from: '—', to: 'Halden Systems Inc.' }],
      shared: ['p.alex', 'p.maple', 'p.cascade'] },
    { id: 'f.tenure', group: 'Employment', label: 'Time in role', value: '3 years 4 months',
      stated: '3 years 4 months', status: 'Needs attention', evidence: [],
      history: [{ ts: '2026-02-14T19:06:00', actor: 'Sarah Mitchell', from: '—', to: '3 years 4 months' }],
      shared: ['p.alex'], note: 'An employment letter has been requested and is outstanding.' },
    { id: 'f.income', group: 'Income', label: 'Annual employment income', value: '$136,000',
      stated: '$118,000', status: 'Discrepancy', evidence: ['d.paystub', 'd.t4', 'd.noa'],
      support: '$118,400 supported by the pay statement on file',
      history: [
        { ts: '2026-02-14T19:08:00', actor: 'Sarah Mitchell', from: '—', to: '$118,000', where: 'Guardian conversation' },
        { ts: '2026-03-22T11:40:00', actor: 'Alex Chen', from: '$118,000', to: '$118,000', where: 'Application V1' },
        { ts: '2026-04-06T15:12:00', actor: 'Alex Chen', from: '$118,000', to: '$136,000', where: 'Application V2' }
      ],
      shared: ['p.alex', 'p.house', 'p.maple', 'p.cascade'] },
    { id: 'f.savings', group: 'Assets', label: 'Savings available', value: '$145,320',
      stated: '$145,000', status: 'Verified', evidence: ['d.bank'],
      history: [
        { ts: '2026-02-14T19:09:00', actor: 'Sarah Mitchell', from: '—', to: '$145,000' },
        { ts: '2026-02-23T18:04:00', actor: '4orm extraction, confirmed by Sarah Mitchell', from: '$145,000', to: '$145,320' }
      ],
      shared: ['p.alex', 'p.maple', 'p.cascade'] },
    { id: 'f.debt', group: 'Liabilities', label: 'Monthly debt payments', value: '$312',
      stated: '$312', status: 'Self-reported', evidence: [],
      history: [{ ts: '2026-02-14T19:11:00', actor: 'Sarah Mitchell', from: '—', to: '$312' }],
      shared: ['p.alex', 'p.maple', 'p.cascade'], note: 'Student loan. No supporting statement on file.' },
    { id: 'f.price', group: 'Property', label: 'Purchase price', value: '$620,000',
      stated: '$620,000', status: 'Uploaded', evidence: ['d.psa'],
      history: [{ ts: '2026-04-12T20:33:00', actor: 'Sarah Mitchell', from: '—', to: '$620,000' }],
      shared: ['p.alex', 'p.cascade'] },
    { id: 'f.down', group: 'Property', label: 'Down payment', value: '$124,000',
      stated: '$124,000', status: 'Verified', evidence: ['d.bank'],
      history: [{ ts: '2026-04-12T20:34:00', actor: 'Sarah Mitchell', from: '—', to: '$124,000' }],
      shared: ['p.alex', 'p.cascade'] }
  ];

  /* --------------------------------------------------------
     Readiness checklist (Scene 2)
     -------------------------------------------------------- */
  D.readiness = {
    profile: [
      { label: 'Identity',        state: 'Verified' },
      { label: 'Employment',      state: 'Self-reported' },
      { label: 'Income',          state: 'Verified' },
      { label: 'Savings',         state: 'Verified' },
      { label: 'Debts',           state: 'Self-reported' },
      { label: 'Home-buying goal', state: 'Self-reported' }
    ],
    documents: [
      { label: 'Pay statements',        state: 'Verified',       why: 'A lender reads income from the pay cycle, not from a stated salary.' },
      { label: 'T4 and notice of assessment', state: 'Verified', why: 'These confirm what was actually reported to the Canada Revenue Agency.' },
      { label: 'Bank statements',       state: 'Verified',       why: 'Down payment funds have to be traceable for 90 days.' },
      { label: 'Down-payment evidence', state: 'Verified',       why: 'The source of the funds matters as much as the balance.' },
      { label: 'Government photo ID',   state: 'Verified',       why: 'Identity has to be confirmed before a file can be submitted.' },
      { label: 'Employment letter',     state: 'Needs attention', why: 'Confirms role, tenure and pay in writing from the employer.' }
    ]
  };

  /* --------------------------------------------------------
     Consent ledger (Scene 6)
     -------------------------------------------------------- */
  D.consents = [
    { id: 'c.broker', label: 'Share the Mortgage Passport with Alex Chen',
      granted: '2026-02-24T09:05:00', scope: 'Profile, documents, journey', state: 'Active', revocable: true,
      note: 'Covers everything the broker needs to prepare and submit the application.' },
    { id: 'c.lender', label: 'Transmit the application and supporting documents to lenders',
      granted: '2026-03-22T11:02:00', scope: 'Application snapshot, income and asset documents', state: 'Active', revocable: true,
      note: 'Each transmission is recorded separately with the exact contents sent.' },
    { id: 'c.credit', label: 'Credit inquiry',
      granted: '2026-03-22T11:04:00', scope: 'One inquiry, Maple Bank', state: 'Relied upon 24 Mar 2026', revocable: false,
      note: 'This permission was used. Withdrawing future access does not undo a lawful past inquiry or remove it from the record.' },
    { id: 'c.market', label: 'Brokerage marketing contact',
      granted: '2026-02-24T09:05:00', revoked: '2026-04-15T08:12:00', scope: 'Email and SMS', state: 'Withdrawn', revocable: true,
      note: 'Withdrawn by Sarah on 15 Apr 2026. No marketing contact is permitted after that timestamp.' },
    { id: 'c.insurer', label: 'Share with a mortgage default insurer',
      scope: 'Not requested', state: 'Not granted', revocable: true,
      note: 'The down payment is 20 percent, so default insurance has not been raised on this file.' }
  ];

  /* --------------------------------------------------------
     Application versions
     -------------------------------------------------------- */
  D.applications = [
    { version: 1, created: '2026-03-22T11:40:00', by: 'Alex Chen',
      fields: { 'Annual income': '$118,000', 'Employer': 'Halden Systems Inc.', 'Savings': '$145,320',
                'Monthly debts': '$312', 'Purchase price': 'Not yet identified', 'Down payment': '$124,000',
                'Term': '5 year fixed', 'Amortization': '25 years' },
      note: 'First submission package to Maple Bank.' },
    { version: 2, created: '2026-04-06T15:12:00', by: 'Alex Chen',
      fields: { 'Annual income': '$136,000', 'Employer': 'Halden Systems Inc.', 'Savings': '$145,320',
                'Monthly debts': '$312', 'Purchase price': '$620,000', 'Down payment': '$124,000',
                'Term': '5 year fixed', 'Amortization': '25 years' },
      changed: ['Annual income', 'Purchase price'],
      note: 'Created the day after the Maple Bank decline. Income raised by $18,000 with no new document attached.' },
    { version: 3, created: '2026-04-20T14:26:00', by: 'Alex Chen, confirmed by Sarah Mitchell',
      fields: { 'Annual income': '$118,400', 'Employer': 'Halden Systems Inc.', 'Savings': '$145,320',
                'Monthly debts': '$312', 'Purchase price': '$620,000', 'Down payment': '$124,000',
                'Term': '5 year fixed', 'Amortization': '25 years' },
      changed: ['Annual income'],
      note: 'Reconciled to the pay statement on file. Amended package sent to Cascade Trust.' }
  ];

  /* --------------------------------------------------------
     Lender submissions
     -------------------------------------------------------- */
  D.submissions = [
    { id: 's.1', to: 'p.maple', lender: 'Maple Bank', ts: '2026-03-24T09:15:00', appVersion: 1,
      contents: ['Application V1', 'Pay statement', 'T4 2025', 'Notice of assessment 2025', 'Bank statement Jan 2026', 'Photo identification'],
      purpose: 'Assessment for a first mortgage on a property to be identified',
      acknowledged: '2026-03-24T09:15:12', decision: 'Declined', decisionTs: '2026-04-05T13:40:00',
      reason: 'Debt service ratios above the lender threshold at the stated income.' },
    { id: 's.2', to: 'p.cascade', lender: 'Cascade Trust', ts: '2026-04-07T10:02:00', appVersion: 2,
      contents: ['Application V2', 'Pay statement', 'T4 2025', 'Notice of assessment 2025', 'Bank statement Jan 2026', 'Photo identification'],
      purpose: 'Assessment for a first mortgage at $620,000 purchase price',
      acknowledged: '2026-04-07T10:02:08', decision: 'Conditional approval', decisionTs: '2026-04-14T16:20:00',
      reason: 'Approved subject to an employment letter and confirmation of income.' },
    { id: 's.3', to: 'p.cascade', lender: 'Cascade Trust', ts: '2026-04-21T09:30:00', appVersion: 3,
      contents: ['Application V3', 'Change record for annual income', 'Pay statement', 'T4 2025', 'Notice of assessment 2025'],
      purpose: 'Amended package correcting the income figure relied upon',
      acknowledged: '2026-04-21T09:30:05', decision: 'Under review', decisionTs: null,
      reason: 'Amended figures received. Reassessment in progress.' }
  ];

  /* --------------------------------------------------------
     Transaction timeline
     -------------------------------------------------------- */
  D.events = [
    { ts: '2026-02-14T19:02:00', type: 'guardian',  actor: 'Sarah Mitchell', label: 'Started a Guardian conversation before choosing a broker' },
    { ts: '2026-02-14T19:12:00', type: 'passport',  actor: '4orm',           label: 'Mortgage Passport created' },
    { ts: '2026-02-21T10:19:00', type: 'evidence',  actor: 'Sarah Mitchell', label: 'Income documents uploaded and confirmed' },
    { ts: '2026-02-23T18:05:00', type: 'evidence',  actor: 'Sarah Mitchell', label: 'Bank statement and identification uploaded' },
    { ts: '2026-02-24T09:05:00', type: 'consent',   actor: 'Sarah Mitchell', label: 'Passport shared with Alex Chen' },
    { ts: '2026-03-18T09:40:00', type: 'request',   actor: 'Alex Chen',      label: 'Employment letter requested' },
    { ts: '2026-03-22T11:40:00', type: 'version',   actor: 'Alex Chen',      label: 'Application V1 created' },
    { ts: '2026-03-24T09:15:00', type: 'submission',actor: 'Alex Chen',      label: 'Package sent to Maple Bank' },
    { ts: '2026-04-05T13:40:00', type: 'decision',  actor: 'Maple Bank',     label: 'Declined at the stated income' },
    { ts: '2026-04-06T15:12:00', type: 'change',    actor: 'Alex Chen',      label: 'Annual income changed from $118,000 to $136,000' },
    { ts: '2026-04-06T15:12:30', type: 'exception', actor: '4orm',           label: 'Material change flagged: no supporting document attached' },
    { ts: '2026-04-07T10:02:00', type: 'submission',actor: 'Alex Chen',      label: 'Package sent to Cascade Trust on V2' },
    { ts: '2026-04-12T20:31:00', type: 'evidence',  actor: 'Sarah Mitchell', label: 'Agreement of purchase and sale uploaded' },
    { ts: '2026-04-14T16:20:00', type: 'decision',  actor: 'Cascade Trust',  label: 'Conditional approval issued on V2' },
    { ts: '2026-04-15T08:12:00', type: 'consent',   actor: 'Sarah Mitchell', label: 'Marketing permission withdrawn' },
    { ts: '2026-04-17T08:40:00', type: 'exception', actor: 'Sarah Mitchell', label: 'Change reviewed by the consumer: not recognized' },
    { ts: '2026-04-20T14:26:00', type: 'version',   actor: 'Alex Chen',      label: 'Application V3 reconciled to the pay statement' },
    { ts: '2026-04-21T09:30:00', type: 'submission',actor: 'Alex Chen',      label: 'Amended package sent to Cascade Trust' }
  ];

  /* --------------------------------------------------------
     Suitability decision record (Scene 11)
     -------------------------------------------------------- */
  D.suitability = {
    objectives: 'Purchase of a first home in Ottawa within six months. Predictable payment preferred over the lowest available rate.',
    considered: [
      { option: '5 year fixed, 25 year amortization', outcome: 'Recommended', why: 'Payment certainty over the buyer\'s stated planning horizon.' },
      { option: '5 year variable, 25 year amortization', outcome: 'Discussed, not recommended', why: 'Buyer stated she did not want payment movement in the first term.' },
      { option: '3 year fixed', outcome: 'Discussed, not recommended', why: 'Renewal falls inside the period the buyer expects to change roles.' }
    ],
    risks: [
      { label: 'Renewal at a higher rate in 2031', acknowledged: '2026-04-14T17:02:00' },
      { label: 'Cost of borrowing disclosure', acknowledged: '2026-04-14T17:02:00' },
      { label: 'Broker remuneration and relationship disclosure', acknowledged: '2026-02-24T09:06:00' }
    ],
    gaps: ['Employment letter outstanding', 'Income figure relied upon in V2 is not supported by a document on file']
  };

  /* --------------------------------------------------------
     Brokerage exception queue (Scene 12) — fictional portfolio
     -------------------------------------------------------- */
  D.exceptions = [
    { file: 'MTG-2026-0417', client: 'Sarah Mitchell', broker: 'Alex Chen', issue: 'Material change after submission', severity: 'High', age: '11 days', state: 'Open', isDemo: true },
    { file: 'MTG-2026-0392', client: 'R. Vasquez',     broker: 'Alex Chen', issue: 'Suitability rationale missing', severity: 'High', age: '6 days', state: 'Open' },
    { file: 'MTG-2026-0401', client: 'D. Osei',        broker: 'M. Tremblay', issue: 'Acknowledgement not returned', severity: 'Medium', age: '3 days', state: 'Open' },
    { file: 'MTG-2026-0388', client: 'K. Brar',        broker: 'M. Tremblay', issue: 'Consent gap before transmission', severity: 'High', age: '14 days', state: 'Open' },
    { file: 'MTG-2026-0375', client: 'L. Fontaine',    broker: 'P. Adeyemi', issue: 'Repeated document request', severity: 'Low', age: '2 days', state: 'Monitoring' },
    { file: 'MTG-2026-0361', client: 'T. Nakamura',    broker: 'P. Adeyemi', issue: 'Income document older than 60 days', severity: 'Medium', age: '9 days', state: 'Open' }
  ];

  /* --------------------------------------------------------
     Evidence graph
     -------------------------------------------------------- */
  D.graph = {
    nodes: [
      { id: 'g.sarah',  label: 'Sarah Mitchell',   kind: 'party',    x: 90,   y: 250 },
      { id: 'g.stated', label: 'Stated $118,000',  kind: 'fact',     x: 290,  y: 130 },
      { id: 'g.pay',    label: 'Pay statement',    kind: 'document', x: 290,  y: 250 },
      { id: 'g.t4',     label: 'T4 · $116,850',    kind: 'document', x: 290,  y: 350 },
      { id: 'g.consent',label: 'Consent ledger',   kind: 'consent',  x: 290,  y: 450 },
      { id: 'g.alex',   label: 'Alex Chen',        kind: 'party',    x: 500,  y: 250 },
      { id: 'g.v1',     label: 'Application V1',   kind: 'version',  x: 710,  y: 130 },
      { id: 'g.v2',     label: 'Application V2',   kind: 'version',  x: 710,  y: 270 },
      { id: 'g.v3',     label: 'Application V3',   kind: 'version',  x: 710,  y: 410 },
      { id: 'g.maple',  label: 'Maple Bank',       kind: 'party',    x: 920,  y: 110 },
      { id: 'g.cascade',label: 'Cascade Trust',    kind: 'party',    x: 920,  y: 300 },
      { id: 'g.dec1',   label: 'Declined',         kind: 'decision', x: 1105, y: 110 },
      { id: 'g.dec2',   label: 'Conditional approval', kind: 'decision', x: 1105, y: 300 },
      { id: 'g.flag',   label: 'Change flagged',   kind: 'exception',x: 500,  y: 430 }
    ],
    edges: [
      { from: 'g.sarah', to: 'g.stated', label: 'stated' },
      { from: 'g.sarah', to: 'g.pay',    label: 'uploaded' },
      { from: 'g.sarah', to: 'g.t4',     label: 'uploaded' },
      { from: 'g.sarah', to: 'g.consent',label: 'granted' },
      { from: 'g.stated',to: 'g.alex',   label: 'shared' },
      { from: 'g.pay',   to: 'g.alex',   label: 'shared' },
      { from: 'g.t4',    to: 'g.alex',   label: 'shared' },
      { from: 'g.consent',to:'g.alex',   label: 'permits' },
      { from: 'g.alex',  to: 'g.v1',     label: 'created' },
      { from: 'g.alex',  to: 'g.v2',     label: 'changed income' },
      { from: 'g.alex',  to: 'g.v3',     label: 'reconciled' },
      { from: 'g.v2',    to: 'g.flag',   label: 'unsupported' },
      { from: 'g.v1',    to: 'g.maple',  label: 'submitted' },
      { from: 'g.v2',    to: 'g.cascade',label: 'submitted' },
      { from: 'g.v3',    to: 'g.cascade',label: 'amended' },
      { from: 'g.maple', to: 'g.dec1',   label: 'decided' },
      { from: 'g.cascade',to:'g.dec2',   label: 'decided' }
    ],
    /* the income trail the Scene 14 button highlights */
    incomeTrail: ['g.sarah','g.stated','g.pay','g.alex','g.v1','g.maple','g.dec1','g.v2','g.cascade','g.dec2','g.flag']
  };

  /* --------------------------------------------------------
     Guardian scripted exchanges
     -------------------------------------------------------- */
  D.guardian = {
    opening: {
      user: 'I am hoping to buy my first home in the next six months. I make about $118,000 and have $145,000 saved. Where do I start?',
      reply: {
        lead: 'Here is the shape of what is ahead, and what you can do this month.',
        blocks: [
          { head: 'The stages', body: 'Preparation, choosing a mortgage professional, application, lender submission, underwriting, approval, then closing. Most of the work that decides the outcome happens before the application is written.' },
          { head: 'What to gather now', body: 'Two recent pay statements, your 2025 T4 and notice of assessment, 90 days of bank statements covering the down payment, and government photo identification.' },
          { head: 'What you will be asked', body: 'How long you have been in your role, what you owe each month, where the down payment came from, and whether any of it is a gift.' },
          { head: 'Terms worth knowing', body: 'Debt service ratios, the qualifying rate, amortization, and the difference between a pre-approval and an approval on a specific property.' }
        ],
        note: 'This is educational guidance. It is not a mortgage approval, and it is not a regulated recommendation about a mortgage product.'
      }
    },
    education: [
      { q: 'What is a debt service ratio?',
        lead: 'Two percentages a lender uses to decide how much of your income is already committed.',
        points: [
          'Gross debt service compares housing costs — mortgage payment, property tax, heat and half of any condo fee — against your gross income.',
          'Total debt service adds everything else you owe each month: loans, lines of credit and card minimums.',
          'Lenders test both against a qualifying rate that is higher than the rate you would actually pay.',
          'On your file the ratios are calculated from the income figure on the application, which is why that figure has to be right.'
        ] },
      { q: 'What is the difference between a pre-approval and an approval?',
        lead: 'A pre-approval is about you. An approval is about you and a specific property.',
        points: [
          'A pre-approval is a lender\'s view of what you could borrow based on the information given at the time, usually with a rate held for a set period.',
          'It is not a commitment to lend, and it can change if your income, debts or the information on file change.',
          'An approval comes after there is an accepted offer, and it depends on the property, the appraisal and the conditions the lender sets.',
          'A conditional approval, like the one on this file, is an approval with outstanding requirements still to be met.'
        ] }
    ],
    presets: [
      { q: 'Why is 4orm flagging this?',
        a: {
          lead: 'The income figure on the current application is higher than both what you told me and what your documents support.',
          found: [
            'You stated $118,000 on 14 Feb 2026.',
            'Your pay statement supports approximately $118,400 a year.',
            'Application V1 carried $118,000. Application V2 carries $136,000.',
            'The change was made by Alex Chen on 6 Apr 2026, the day after Maple Bank declined the file.',
            'No new income document was attached to the change.'
          ],
          matters: 'Cascade Trust issued a conditional approval on 7 Apr 2026 using the $136,000 figure. A lender decision that relies on an unsupported number can be reopened, and the file cannot be reconciled until the figure and the evidence agree.',
          next: ['Ask Alex where the $136,000 came from.', 'If a second income source exists, upload the document that shows it.', 'If it does not, ask for the application to be corrected before closing.'],
          refs: ['f.income', 'd.paystub', 'd.t4']
        } },
      { q: 'Who currently has my information?',
        a: {
          lead: 'Four organizations hold some part of this file, each under a permission you granted.',
          found: [
            'Alex Chen, since 24 Feb 2026, under the passport-sharing permission.',
            'Northbridge Mortgage Group, as the brokerage supervising the file.',
            'Maple Bank, which received Application V1 and five documents on 24 Mar 2026.',
            'Cascade Trust, which received Application V2 on 7 Apr 2026 and the amended package on 21 Apr 2026.'
          ],
          matters: 'Marketing contact was withdrawn on 15 Apr 2026, so no marketing may follow that date. Withdrawing a permission stops future use. It does not erase what was lawfully done before it.',
          next: ['Open the consent centre to see the exact scope of each permission.', 'Withdraw any permission you no longer want to be relied on going forward.'],
          refs: ['c.broker', 'c.lender', 'c.credit']
        } },
      { q: 'What is still outstanding on my file?',
        a: {
          lead: 'Two items are open, and one of them is holding the conditional approval.',
          found: [
            'The employment letter requested on 18 Mar 2026 has not been provided.',
            'Time in role is self-reported and has no supporting document.',
            'The income figure relied upon in V2 is unreconciled.'
          ],
          matters: 'Cascade Trust made its conditional approval subject to an employment letter and confirmation of income. Both conditions sit on the same underlying fact.',
          next: ['Request the letter from your employer and upload it here.', 'Confirm which income figure is correct so the record can be reconciled.'],
          refs: ['d.employ', 'f.tenure', 'f.income']
        } },
      { q: 'What does 4orm have that proves what happened?',
        a: {
          lead: 'Every value on this file carries its source, the person who set it, and the organizations that received it.',
          found: [
            '18 recorded events between 14 Feb 2026 and 21 Apr 2026.',
            '8 documents with extraction results and your confirmation status.',
            '3 application versions with a field-level change record.',
            '3 lender submissions, each with a snapshot of exactly what was sent.',
            '5 permissions, with grant, use and withdrawal timestamps.'
          ],
          matters: 'Someone who was not there can reconstruct this transaction from the record alone, which is what a supervising broker or an examiner has to be able to do.',
          next: ['Open the evidence graph to follow one value end to end.', 'Generate the transaction record to see the whole file assembled.'],
          refs: ['f.income']
        } }
    ]
  };

  w.MG_DATA = D;
})(window);
