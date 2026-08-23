/* ============================================================
   The 4orm phone.

   One rule governs this file: the Guardian may talk, but it may
   never invent a fact about the person. Everything the person is
   told about their own record comes out of ST.pass, and every
   entry there carries where it came from and how sure we are.
   ============================================================ */
(function () {
'use strict';

var $  = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var esc = function (s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

/* ---------------------------------------------------------
   How sure are we? Never let two different kinds of knowing
   look the same on screen.
   --------------------------------------------------------- */
var STATUS = {
  told:     { l: 'You told us',           k: 'st-told' },
  doc:      { l: 'Document supported',    k: 'st-doc'  },
  verified: { l: 'Verified',              k: 'st-ver'  },
  pro:      { l: 'Professional provided', k: 'st-pro'  },
  needs:    { l: 'Needs confirmation',    k: 'st-need' },
  changed:  { l: 'Changed',               k: 'st-chg'  },
  none:     { l: 'Not started',           k: 'st-none' }
};

/* ---------------------------------------------------------
   State
   --------------------------------------------------------- */
var ST = null;

function fresh(ind) {
  return {
    ind: ind || 'mortgage',
    screen: 'open',
    thread: [],
    pass: {},
    events: [],
    perms: [],
    connected: null,
    asked: 0,
    step: 0,
    opened: false,
    situated: false,
    awaiting: null,
    qi: 0
  };
}

function put(key, label, value, status, note) {
  var prev = ST.pass[key];
  ST.pass[key] = { label: label, value: value, status: status, note: note || '',
                   was: prev && prev.value !== value ? prev.value : null };
  return ST.pass[key];
}

function evt(text, stamp, tone) {
  ST.events.unshift({ t: text, s: stamp, tone: tone || 'blue' });
  drawRail();
}

/* ---------------------------------------------------------
   The industries. Each one is the same 4orm, a different
   decision, so they share every screen below.
   --------------------------------------------------------- */
var IND = {
  mortgage: {
    name: 'Mortgage', who: 'Sarah', person: 'Sarah Mitchell',
    sub: 'Before a mortgage professional exists',
    ref: 'MTG-2026-0417',
    pro: { n: 'Alex Morgan', r: 'Mortgage Professional', f: 'Northstar Mortgage' },
    opens: [
      ['buy',    'Buy a home'],
      ['refi',   'Refinance'],
      ['renew',  'Renew my mortgage'],
      ['offer',  'Understand an offer']
    ],
    ex: 'I’m looking at homes around $600,000. I make about $120,000, have $35,000 saved and ' +
        'still have a truck payment. My realtor said I should get pre-approved, but I don’t ' +
        'really understand what that means.'
  },
  auto: {
    name: 'Auto', who: 'Sarah', person: 'Sarah Mitchell',
    sub: 'Standing in the dealership right now',
    ref: 'AUT-2026-0912',
    pro: { n: 'Dana Iqbal', r: 'Financial Services Manager', f: 'Northstar Auto' },
    opens: [
      ['buying',  'Buying a vehicle'],
      ['finance', 'Financing a vehicle'],
      ['trade',   'Trading a vehicle'],
      ['atdealer','I’m already at the dealership']
    ],
    ex: 'I’m looking at a $52,000 truck. They’re asking what monthly payment I want and ' +
        'said they’re going to send my credit out to see who approves me. I don’t really ' +
        'understand what they’re doing.'
  },
  realestate: {
    name: 'Real estate', who: 'Priya', person: 'Priya Raman',
    sub: 'Before signing a representation agreement',
    ref: 'RES-2026-1188',
    pro: { n: 'Jordan Wells', r: 'Real Estate Salesperson', f: 'Harbourline Realty' },
    opens: [['list','Sell my home'], ['buy2','Buy a home'], ['rep','Understand representation'],
            ['off','Review an offer']],
    shallow: 'A representation agreement decides who owes a duty to whom, for how long, and what happens if the same brokerage ends up on both sides.',
    ex: 'I’m about to sign with an agent. I don’t understand what I’m agreeing to, ' +
        'how long it lasts, or what happens if the same brokerage represents the buyer too.'
  },
  insurance: {
    name: 'Insurance', who: 'Sarah', person: 'Sarah Mitchell',
    sub: 'Before a policy is bound',
    ref: 'INS-2026-0655',
    pro: { n: 'Ruth Okafor', r: 'Insurance Agent', f: 'Meridian Insurance' },
    opens: [['life','Life coverage'], ['home','Home and property'], ['claim','Understand a claim'],
            ['rev','Review what I have']],
    shallow: 'The questions that matter are what is covered, what is excluded, and whether replacing a policy you hold is better for you or better for the person recommending it.',
    ex: 'Someone is recommending I replace a policy I already have. I don’t know whether that ' +
        'is better for me or better for them.'
  },
  investing: {
    name: 'Investing', who: 'Marcus', person: 'Marcus Bell',
    sub: 'Before money is moved',
    ref: 'INV-2026-0233',
    pro: { n: 'Elena Cho', r: 'Investment Advisor', f: 'Kestrel Wealth Partners' },
    opens: [['start','Start investing'], ['move','Move an account'], ['why','Why this recommendation'],
            ['risk','Check my risk profile']],
    shallow: 'You are entitled to ask why this option and not another, and to get more back than the word suitable.',
    ex: 'My advisor is recommending I move everything into one fund. I asked why and got told it ' +
        'was suitable for me. I would like to understand what else was considered.'
  },
  banking: {
    name: 'Banking', who: 'Elena', person: 'Elena Vos',
    sub: 'Before signing at the branch',
    ref: 'BNK-2026-0761',
    pro: { n: 'Tomas Reyes', r: 'Financial Advisor', f: 'Meridian Trust Bank' },
    opens: [['acct','Open an account'], ['credit','A credit product'], ['ins','Creditor insurance'],
            ['fees','Understand my fees']],
    shallow: 'The bank is the custodian of your money and is running a sales operation on you at the same moment. Both are true at once.',
    ex: 'I went in to open a chequing account and came out with a credit card and insurance on it. ' +
        'I am not sure I needed either of them.'
  },
  lending: {
    name: 'Lending', who: 'Sarah', person: 'Sarah Mitchell',
    sub: 'Before the agreement is signed',
    ref: 'LND-2026-0388',
    pro: { n: 'Priya Anand', r: 'Lending Specialist', f: 'Northstar Credit' },
    opens: [['need','I need money quickly'], ['consol','Consolidate what I owe'],
            ['cost','What will this cost me'], ['lic','Is this lender licensed']],
    shallow: 'The number that matters is the total cost of borrowing over the full term, in dollars, not the monthly payment.',
    ex: 'I need $4,000 and the only place that said yes wants a lot back. I do not know if the rate ' +
        'they quoted is even legal.'
  }
};

function I() { return IND[ST.ind]; }

/* ============================================================
   The Guardian.

   Answers are written, not generated. That is a deliberate
   choice: a scripted answer can be checked by a person before
   it ships, and this one is about money. ANSWER() is the single
   seam. Swap its body for a call to a service later and every
   screen below keeps working unchanged.
   ============================================================ */
var KB = [
  { k: ['pre-approval', 'preapproval', 'pre approved', 'preapproved', 'pre-approved'],
    a: 'A pre-approval is a lender telling you, in advance, roughly how much they would lend and ' +
       'holding a rate for a set period. It is not a promise to fund. It is based on what you have ' +
       'told them, before anybody has checked it.',
    m: 'The gap between what you said and what gets verified later is where most deals wobble. ' +
       'That is the gap I am here to close before you walk in.',
    c: ['So what should I have ready?', 'Does it hurt my credit?'] },

  { k: ['afford', 'how much can i', 'budget', 'qualify'],
    a: 'I will not put a number on that, and you should be careful with anyone who does before they ' +
       'have seen anything. What I can do is get the four things a lender will actually look at into ' +
       'one place: your income and how steady it is, what you already owe each month, what you have ' +
       'saved and where it came from, and your credit.',
    m: 'Once those are supported rather than just stated, the number a professional gives you is one ' +
       'you can rely on.',
    c: ['Let’s get me ready', 'Why does the source of my savings matter?'] },

  { k: ['bank statement', 'statements', 'why do they want', '90 days'],
    a: 'Mortgage professionals and lenders use account history to understand where a down payment ' +
       'came from and whether the money is actually available. A large deposit that appeared last ' +
       'month raises a question they have to be able to answer.',
    m: 'It is not suspicion of you. It is a rule they are held to, and the record has to show it.',
    c: ['What if some of it was a gift?', 'Who else sees my statements?'] },

  { k: ['amortization', 'amortisation'],
    a: 'Amortization is the total time it would take to pay the mortgage off completely. Your term ' +
       'is the shorter stretch you are locked into with one lender, often five years. A longer ' +
       'amortization lowers the payment and raises what you pay overall.',
    c: ['What is a term then?', 'What will this cost me in total?'] },

  { k: ['default insurance', 'cmhc', 'mortgage insurance'],
    a: 'If your down payment is under twenty per cent, mortgage default insurance is generally ' +
       'required. It protects the lender, not you, and you pay the premium, usually added to the ' +
       'loan. It is worth knowing which one of you it protects.',
    c: ['How much is the premium?', 'How do I avoid it?'] },

  { k: ['72', '84', 'term length', 'longer term', 'months'],
    a: 'A longer term lowers the monthly payment and raises the total. It also stretches the period ' +
       'where you owe more than the vehicle is worth, which is what makes the next trade harder.',
    m: 'Watch for the term changing quietly between the first quote and the paperwork. That is one ' +
       'of the changes I flag for you.',
    c: ['What is negative equity?', 'Show me what changed'] },

  { k: ['negative equity', 'upside down', 'owe more'],
    a: 'Negative equity is owing more on the loan than the vehicle is worth. If it is rolled into a ' +
       'new loan, you are financing part of the last vehicle inside the payments for this one.',
    m: 'It is legal and it is common. It should never be invisible to you.',
    c: ['Is that happening in my deal?', 'What should I ask them?'] },

  { k: ['payment i want', 'monthly payment', 'what payment'],
    a: 'Being asked what monthly payment you want, before the price and the term are settled, moves ' +
       'the conversation away from what the vehicle costs. Any payment can be reached by stretching ' +
       'the term or moving what is inside the loan.',
    m: 'The three numbers that decide what you actually pay are the total amount financed, the rate, ' +
       'and the term. Ask for those three.',
    c: ['Show me the three numbers', 'What should I ask them?'] },

  { k: ['several lenders', 'multiple lender', 'send my credit', 'shop my', 'every lender pull'],
    a: 'A dealer may submit your application to more than one lender. That is normal. What you are ' +
       'entitled to know is where it went, how many times, and which approval you were shown.',
    m: 'I record each submission as it happens, so the history is yours and not only theirs.',
    c: ['Show me where it went', 'Why does that matter?'] },

  { k: ['who', 'trust', 'legit', 'scam', 'licence', 'license', 'registered', 'real'],
    a: 'Do not take my word for it, or theirs. Every one of these is a published register you can ' +
       'read yourself: OMVIC and the VSA for car dealers, FSRA for mortgage and insurance in ' +
       'Ontario, the CSA National Registration Search and the CIRO Advisor Report for anyone giving ' +
       'investment advice, and the CSA Disciplined List.',
    m: 'One catch worth knowing: someone banned from the business can be absent from the ' +
       'registration search and present on the Disciplined List. Check both.',
    c: ['Take me to the checks', 'What if they are not on there?'] },

  { k: ['rate', 'interest', 'apr'],
    a: 'The rate on its own does not tell you much. What matters is the rate together with what is ' +
       'inside the amount being financed, and over how long. A lower rate on a bigger balance for a ' +
       'longer time can cost more.',
    m: 'Also worth knowing: since January 2025 the criminal interest rate in Canada is 35 per cent ' +
       'a year, with a narrow exemption for licensed payday lending.',
    c: ['What will this cost me in total?', 'Is my rate normal?'] },

  { k: ['changed', 'what changed', 'different', 'not the same'],
    a: 'I keep every version, so I can show you exactly what moved between them rather than asking ' +
       'you to remember.',
    c: ['Show me what changed'] },

  { k: ['verified', 'what is verified', 'what do you have', 'what have i told', 'my record', 'missing'],
    a: 'Everything in your record carries where it came from. Some of it you told me, some is ' +
       'supported by a document, some is independently verified. I never let those look the same.',
    c: ['Open my record', 'What is still missing?'] },

  { k: ['who has my', 'privacy', 'share', 'sharing', 'access', 'my information'],
    a: 'Nothing goes to a professional unless you choose to connect and authorise it. You can see ' +
       'what was requested, what you allowed, and when.',
    m: 'One honest limit: if you later withdraw access, a regulated firm may still be required by ' +
       'law to keep records it already holds. I will not pretend otherwise.',
    c: ['Open sharing', 'What have I shared?'] },

  { k: ['warranty', 'protection package', 'add-on', 'addon', 'gap'],
    a: 'Add-ons sold at the desk are usually financed into the loan, so you pay interest on them for ' +
       'the whole term. They may be worth having. They should be a separate decision from the vehicle.',
    c: ['What is in my deal?', 'Can I remove one?'] },

  { k: ['suitable', 'suitability', 'why this option', 'why this one', 'alternatives'],
    a: 'You are entitled to ask why this option and not another, and to get more than the word ' +
       '“suitable” back. In December 2025 Canadian securities regulators reviewed 105 firms and ' +
       'found some had recorded only that an investment was suitable, without showing the basis for ' +
       'it, and that many could not evidence that a reasonable range of alternatives was considered.',
    m: 'So the question is fair, it is expected, and a good professional will welcome it.',
    c: ['How do I ask that?', 'What should the answer contain?'] },

  { k: ['cost', 'total', 'how much will'],
    a: 'Ask for the total cost of borrowing over the full term, in dollars, not the monthly payment. ' +
       'It is the one number that cannot be reshaped by stretching the term.',
    c: ['What else should I ask?'] }
];

var FALLBACK = {
  a: 'I do not have a good answer to that one, and I would rather say so than guess at something ' +
     'that affects your money.',
  m: 'I can help with what you are agreeing to, why an option is being recommended, what it will ' +
     'cost, what changed, who has your information, and who to speak to next.',
  c: ['What should I have ready?', 'Who am I dealing with?', 'What will this cost?']
};

/* The single seam. Later this becomes a call to a service; the
   shape of what it returns must not change. */
function ANSWER(q) {
  var s = String(q || '').toLowerCase();
  var best = null, score = 0;
  KB.forEach(function (row) {
    var hit = 0;
    row.k.forEach(function (k) { if (s.indexOf(k) > -1) hit += k.length; });
    if (hit > score) { score = hit; best = row; }
  });
  return best || FALLBACK;
}

/* ============================================================
   Screen furniture
   ============================================================ */
function chip(status) {
  var s = STATUS[status] || STATUS.none;
  return '<span class="stg ' + s.k + '">' + s.l + '</span>';
}

function bubble(who, html) {
  return '<div class="gb ' + who + '">' + html + '</div>';
}

function chips(list) {
  if (!list || !list.length) return '';
  return '<div class="gchips">' + list.map(function (c) {
    return '<button class="gchip" data-ask="' + esc(c) + '">' + esc(c) + '</button>';
  }).join('') + '</div>';
}

function opt(act, label, sub, arg) {
  return '<button class="opt" data-act="' + act + '"' + (arg ? ' data-arg="' + esc(arg) + '"' : '') + '>' +
    '<span class="ptxt"><b>' + label + '</b>' + (sub ? '<i>' + sub + '</i>' : '') + '</span>' +
    '<span class="ch">&#8250;</span></button>';
}

function head(t1, t2) {
  var a = $('#phTitle'), b = $('#phSub');
  if (a) a.innerHTML = t1;
  if (b) b.innerHTML = t2;
}

function paint(html) {
  var b = $('#phBody');
  if (!b) return;
  b.innerHTML = html;
  b.scrollTop = 0;
}

function toBottom() {
  var b = $('#phBody');
  if (b) b.scrollTop = b.scrollHeight;
}

/* ============================================================
   Screens
   ============================================================ */
var SCREEN = {};

/* --- the way in ------------------------------------------- */
SCREEN.open = function () {
  var i = I();
  head(i.who + '&rsquo;s 4orm', i.sub);
  paint(
    '<div class="ghead"><h3>Good afternoon, ' + i.who + '.</h3>' +
    '<p>You don&rsquo;t need to know what matters yet. Tell me what you&rsquo;re thinking about doing.</p></div>' +
    i.opens.map(function (o) { return opt('goal', o[1], '', o[0]); }).join('') +
    '<div class="gor">or just say it in your own words</div>' +
    '<button class="opt ghost" data-act="example"><span class="ptxt"><b>Use the example</b>' +
    '<i>' + esc(i.ex.slice(0, 62)) + '&hellip;</i></span><span class="ch">&#8250;</span></button>'
  );
};

/* --- the conversation -------------------------------------

   Everything the Guardian says goes through think(). It never
   answers instantly, because a considered answer that arrives
   instantly reads as a lookup table, which is exactly what the
   old click-face felt like.
   ----------------------------------------------------------- */
SCREEN.talk = function () { thread(); };

/* Make sure the thread element exists and holds what has been said.
   Painting is idempotent, so calling this twice costs nothing. */
function thread() {
  var th = $('#gthread');
  if (th) return th;
  ST.screen = 'talk';
  paint('<div class="gthread" id="gthread"></div>');
  th = $('#gthread');
  ST.thread.forEach(function (t) {
    var d = document.createElement('div');
    d.className = 'gb ' + t.w;
    d.innerHTML = t.h;
    th.appendChild(d);
  });
  toBottom();
  return th;
}

function push(who, html) {
  ST.thread.push({ w: who, h: html });
  var th = thread();
  var d = document.createElement('div');
  d.className = 'gb ' + who;
  d.innerHTML = html;
  th.appendChild(d);
  toBottom();
  return d;
}

/* the person */
function me(text) { return push('me', esc(text)); }

/* the Guardian, always after a beat of thinking */
function think(html, chipList, ms) {
  var th = thread();
  var dots = document.createElement('div');
  dots.className = 'gb g typing';
  dots.innerHTML = '<i></i><i></i><i></i>';
  th.appendChild(dots);
  toBottom();
  /* Long answers take longer to arrive, the way they would from a person
     who was actually reading the question. */
  var wait = ms || Math.min(1900, 620 + String(html).length * 3.1);
  setTimeout(function () {
    if (dots.parentNode) dots.parentNode.removeChild(dots);
    push('g', html + (chipList && chipList.length ? chips(chipList) : ''));
  }, wait);
  return wait;
}

/* Several Guardian turns in a row, each waiting for the one before it. */
function thinkSeq(turns) {
  var t = 0;
  turns.forEach(function (turn) {
    setTimeout(function () { think(turn[0], turn[1], turn[2]); }, t);
    t += (turn[2] || Math.min(1900, 620 + String(turn[0]).length * 3.1)) + 340;
  });
  return t;
}

function ask(q) {
  q = String(q || '').trim();
  if (!q) return;
  ST.asked++;
  me(q);

  /* If the person is answering a question the Guardian asked, that is a
     different kind of turn from a question of their own. */
  if (ST.awaiting) {
    var slot = ST.awaiting;
    ST.awaiting = null;
    if (slot.take) { slot.take(q); return; }
  }

  var r = ANSWER(q);
  var short = q.length > 58 ? q.slice(0, 55).replace(/\s+\S*$/, '') + '\u2026' : q;
  evt('Asked: \u201c' + esc(short) + '\u201d',
      (r === FALLBACK ? 'ANSWERED HONESTLY \u00b7 NO ANSWER GIVEN'
                      : 'ANSWERED \u00b7 BEFORE ANY DECISION'));

  /* The opening statement is not a question. It is somebody describing their
     situation, and it deserves to be read back before anything is answered. */
  if (ST.opened && !ST.situated && DEEP[ST.ind] && q.length > 60) {
    ST.situated = true;
    situate(q);
    return;
  }

  var w = think('<p>' + r.a + '</p>' + (r.m ? '<p class="gm">' + r.m + '</p>' : ''), r.c);
  if (ST.asked === 1 && !ST.opened) offerPrepare(w + 700);
}

/* ============================================================
   The deep arcs.

   Mortgage and auto are modelled all the way through. The other
   five open, take one turn, and say plainly that they are not
   built yet rather than pretending.
   ============================================================ */
var DEEP = { mortgage: true, auto: true };

/* Read the situation back, then ask the three things that actually
   change the answer. This is the moment the phone stops feeling like
   a set of buttons. */
var SITUATE = {
  mortgage: {
    read: '<p>Let me say that back, so you know I have it.</p>' +
          '<p class="gm">You are looking at homes around <b>$600,000</b>, you earn about ' +
          '<b>$120,000</b>, you have <b>$35,000</b> saved, and you still have a vehicle payment. ' +
          'Somebody has told you to get pre-approved and nobody has told you what that means.</p>',
    then: '<p>A pre-approval is a lender saying, in advance, roughly what they would lend and ' +
          'holding a rate for a while. It is not a promise to fund, and it is based on what you ' +
          'have told them before anybody has checked it.</p>' +
          '<p class="gm">Before you speak to a mortgage professional I can help you understand ' +
          'the process and get together what you will be asked for. Three things change the ' +
          'answer more than anything else.</p>',
    qs: [
      { k: 'incomeKind', q: 'First. Is that $120,000 salary, or does it move?',
        chips: ['Salary, steady', 'It varies'],
        take: function (a) {
          var varies = /var|move|commis|hour|self|bonus/i.test(a);
          put('income', 'Income', '$120,000', 'told',
              varies ? 'Variable \u00b7 a lender will average it' : 'Salaried, steady');
          evt('Income and how steady it is', 'STATED BY THE PERSON \u00b7 NOT YET SUPPORTED');
          think(varies
            ? '<p>Then a lender will likely average it over two years rather than take this ' +
              'year. Worth knowing now, because it usually lands lower than people expect.</p>'
            : '<p>Good. Steady salary is the simplest case, and it is the one a document can ' +
              'settle quickly.</p>');
          nextQ();
        } },
      { k: 'truck', q: 'Second. What is the vehicle payment each month?',
        chips: ['$720', 'Something else'],
        take: function (a) {
          var m = String(a).match(/([\d,]{3,})/);
          var v = m ? '$' + m[1].replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '$720';
          put('debts', 'Debts', v + ' a month', 'told', 'Vehicle payment');
          evt('Existing obligations recorded', 'STATED BY THE PERSON');
          think('<p>' + v + ' a month. That single number moves what a lender will advance you ' +
                'more than almost anything else on this list, which is why they ask early.</p>');
          nextQ();
        } },
      { k: 'funds', q: 'Third. Is the $35,000 all your own savings?',
        chips: ['All mine', 'Some is a gift'],
        take: function (a) {
          var gift = /gift|parent|famil|help|mom|dad|some/i.test(a);
          put('funds', 'Available funds', '$35,000', gift ? 'needs' : 'told',
              gift ? 'Part gift \u00b7 will need a letter' : 'All own savings');
          evt(gift ? 'Down payment includes a gift' : 'Available funds recorded',
              gift ? 'NEEDS SUPPORTING INFORMATION' : 'STATED BY THE PERSON', gift ? 'amber' : 'blue');
          think(gift
            ? '<p>Then you will be asked for a gift letter, and for the money to have been in ' +
              'your account for a while. Not a difficulty, just something to have ready ' +
              'rather than be surprised by.</p>'
            : '<p>That is the straightforward case. You will still be asked for about ninety ' +
              'days of account history to show where it came from.</p>');
          nextQ();
        } }
    ],
    done: '<p>That is enough for me to be useful.</p>' +
          '<p class="gm">Everything you just told me is in your record marked as something you ' +
          'said, not something anybody has checked. Turning it into something a lender can rely ' +
          'on is the next step, and it takes about four minutes.</p>'
  },
  auto: {
    read: '<p>Let me say that back to you.</p>' +
          '<p class="gm">You are looking at a <b>$52,000</b> truck, they have asked what monthly ' +
          'payment you want, and they are about to send your credit application out to see who ' +
          'approves you.</p>',
    then: '<p>Being asked what payment you want, before the price and the term are settled, ' +
          'moves the conversation away from what the vehicle costs. Any payment can be reached ' +
          'by stretching the term or moving what sits inside the loan.</p>' +
          '<p class="gm">Three numbers decide what you actually pay: the total amount financed, ' +
          'the rate, and the term. Everything else on that sheet is arrangement around those ' +
          'three. Let me get yours.</p>',
    qs: [
      { k: 'trade', q: 'Are you trading something in?',
        chips: ['Yes, an SUV', 'No trade'],
        take: function (a) {
          if (/no|nope|nothing/i.test(a)) {
            put('trade', 'Your trade', 'None', 'told');
            think('<p>Simpler. One less place for a number to move.</p>');
          } else {
            put('trade', 'Your trade', '$18,500 offered', 'pro', 'Dealer provided');
            put('owing', 'Still owing on it', '$11,200', 'told', 'You told us');
            evt('Trade and payout recorded separately', 'TWO NUMBERS, NEVER SHOWN AS ONE');
            think('<p>Then there are two numbers here, and dealers often show you one. They are ' +
                  'offering <b>$18,500</b> and you still owe <b>$11,200</b>, so the trade is ' +
                  'worth <b>$7,300</b> to this deal, not $18,500.</p>' +
                  '<p class="gm">The $11,200 does not disappear. If it goes into the new loan, ' +
                  'you are financing part of the last vehicle inside the payments for this one.</p>');
          }
          nextQ();
        } },
      { k: 'sheet', q: 'What term and rate have they shown you so far?',
        chips: ['72 months at 7.49%', 'They have not said'],
        take: function (a) {
          put('vehicle', 'The vehicle', '$52,000', 'pro', '2026 example truck \u00b7 dealer provided');
          if (/not|haven|no/i.test(a)) {
            put('financing', 'Financing', 'Not disclosed yet', 'needs', 'Ask before you agree');
            evt('Terms not disclosed', 'NEEDS CONFIRMATION', 'amber');
            think('<p>Then do not authorise anything yet. Ask for the term, the rate and the ' +
                  'total amount financed, and have them written down before your credit goes ' +
                  'anywhere.</p>');
          } else {
            put('financing', 'Financing', '72 months at 7.49%', 'pro', 'As shown to you');
            evt('Financing terms recorded as shown', 'FIRST VERSION \u00b7 KEPT');
            think('<p>Recorded, with today&rsquo;s date on it. That matters more than it sounds ' +
                  'like: if the paperwork later says something else, I can show you both.</p>');
          }
          nextQ();
        } },
      { k: 'addons', q: 'Has anything been added? Warranty, protection, fees?',
        chips: ['Warranty and a package', 'Not that I know of'],
        take: function (a) {
          if (/not|no |none|dunno|know of/i.test(a)) {
            put('addons', 'Add-ons', 'None disclosed', 'needs', 'Worth asking directly');
            evt('Add-ons not disclosed', 'NEEDS CONFIRMATION', 'amber');
            think('<p>Ask directly, because they are usually financed into the loan rather than ' +
                  'paid separately, which means you pay interest on them for the whole term.</p>');
          } else {
            put('addons', 'Add-ons', '$1,495 protection package', 'pro',
                'Plus warranty $3,200, fees $895');
            evt('Add-ons recorded separately from the vehicle', 'SO THEY STAY A SEPARATE DECISION');
            think('<p>Then <b>$5,590</b> of what you are financing is not the truck. Those may ' +
                  'well be worth having. They should be a separate decision from the vehicle, ' +
                  'and right now they are inside the same number.</p>');
          }
          nextQ();
        } }
    ],
    done: '<p>Now you can walk back in knowing what you are looking at.</p>' +
          '<p class="gm">Everything you told me is in your record, dated. If any of it changes ' +
          'between now and the paperwork, I will show you what moved.</p>'
  }
};

function situate(q) {
  var S2 = SITUATE[ST.ind];
  if (!S2) return;
  evt('Described the situation in their own words', 'THE STARTING POINT \u00b7 KEPT');
  ST.qi = 0;
  var t = thinkSeq([[S2.read, null, 1100], [S2.then, null, 1500]]);
  setTimeout(nextQ, t);
}

function nextQ() {
  var S2 = SITUATE[ST.ind];
  if (!S2) return;
  setTimeout(function () {
    if (ST.qi >= S2.qs.length) {
      var w = think(S2.done, null, 1000);
      setTimeout(function () {
        think('<p>Shall I show you what to have ready?</p>' +
              '<button class="gcta" data-act="prepare">Prepare me &#8594;</button>', null, 640);
      }, w + 420);
      return;
    }
    var Q = S2.qs[ST.qi++];
    ST.awaiting = Q;
    think('<p>' + Q.q + '</p>', Q.chips, 800);
    setTimeout(focusAsk, 900);
  }, 620);
}

/* The five that are not modelled yet. Two turns, then the truth. */
function shallow(lbl) {
  var i = I();
  thinkSeq([
    ['<p>' + lbl + '. Tell me what is happening and I will keep it.</p>' +
     '<p class="gm">' + i.shallow + '</p>', null, 950],
    ['<p><b>Modelling coming.</b> The ' + i.name.toLowerCase() + ' experience is designed and not ' +
     'yet built. Mortgage and auto are, all the way through, and they are the same 4orm, ' +
     'so what you see there is what this becomes.</p>',
     ['Show me mortgage', 'Show me auto'], 1200]
  ]);
  setTimeout(focusAsk, 1400);
}

function offerPrepare(after) {
  setTimeout(function () {
    think('<p>Want to see what you&rsquo;re likely to need, before you speak to anyone?</p>' +
      '<button class="gcta" data-act="prepare">Prepare me &#8594;</button>', null, 700);
  }, after || 900);
}

/* --- the passport ----------------------------------------- */
var ORDER = ['goal', 'target', 'timeline', 'identity', 'income', 'employment', 'funds',
             'debts', 'credit', 'docs', 'vehicle', 'trade', 'owing', 'financing', 'addons'];

function passRows() {
  var keys = ORDER.filter(function (k) { return ST.pass[k]; });
  if (!keys.length) return '<p class="gempty">Nothing in your record yet.</p>';
  return keys.map(function (k) {
    var p = ST.pass[k];
    return '<div class="prow2' + (p.status === 'changed' || p.status === 'needs' ? ' att' : '') + '">' +
      '<span class="pk">' + p.label + '</span>' +
      '<span class="pvv">' + esc(p.value) + '</span>' +
      chip(p.status) +
      (p.note ? '<span class="pnote">' + p.note + '</span>' : '') +
      '</div>';
  }).join('');
}

SCREEN.passport = function () {
  var i = I();
  head('My 4orm', 'Everything, and where it came from');
  paint(
    '<div class="ghead sm"><h3>Your ' + i.name + ' Passport</h3>' +
    '<p>Nothing here is shared with a professional unless you choose to connect and authorise it.</p></div>' +
    '<div class="pass">' + passRows() + '</div>' +
    '<div class="glegend"><b>Why the labels differ.</b> What you told me, what a document supports ' +
    'and what has been independently verified are three different things. They should never look ' +
    'the same.</div>' +
    opt('prepare', 'Keep preparing', 'What is still missing') +
    opt('perms', 'Sharing', 'Who has what, and when') +
    opt('back', 'Back', '')
  );
};

/* --- prepare ---------------------------------------------- */
var PREP = {
  mortgage: [
    ['identity',   'Identity',     'ident'],
    ['income',     'Income',       'income'],
    ['employment', 'Employment',   'employ'],
    ['funds',      'Down payment', 'funds'],
    ['debts',      'Debts',        'debts'],
    ['credit',     'Credit',       'credit'],
    ['docs',       'Documents',    'docs']
  ],
  auto: [
    ['identity',  'Identity',        'ident'],
    ['income',    'Income',          'income'],
    ['vehicle',   'The vehicle',     'vehicle'],
    ['trade',     'Your trade',      'trade'],
    ['financing', 'Financing',       'financing'],
    ['credit',    'Credit permission','credit'],
    ['addons',    'Add-ons',         'addons']
  ]
};

function prepList() {
  return (PREP[ST.ind] || PREP.mortgage);
}

SCREEN.prepare = function () {
  head('Get ready', 'One step at a time');
  paint(
    '<div class="ghead sm"><h3>Get ready, one step at a time.</h3>' +
    '<p>No giant form. Tap whichever one you want to deal with.</p></div>' +
    prepList().map(function (r) {
      var p = ST.pass[r[0]];
      var st = p ? p.status : 'none';
      var val = p ? p.value : '';
      return '<button class="opt step' + (p && (st === 'verified' || st === 'doc') ? ' done' : '') +
        '" data-act="' + r[2] + '">' +
        '<span class="ptxt"><b>' + r[1] + '</b>' +
        '<i>' + (val ? esc(val) + ' &middot; ' : '') + (STATUS[st] || STATUS.none).l + '</i></span>' +
        '<span class="ch">&#8250;</span></button>';
    }).join('') +
    '<button class="opt ghost" data-act="passport"><span class="ptxt"><b>See my whole record</b></span>' +
    '<span class="ch">&#8250;</span></button>'
  );
};

/* --- identity --------------------------------------------- */
SCREEN.ident = function () {
  head('Identity', 'Confirming who you are');
  paint(
    '<div class="ghead sm"><h3>Confirming who you are</h3>' +
    '<p>Verifying your identity means you stop repeating the same information to everyone, and it ' +
    'makes the rest of your record stronger.</p></div>' +
    '<div class="gnote">Your identity documents are handled through secure verification ' +
    'infrastructure. 4orm records the result and the evidence of it, not the raw document.</div>' +
    '<button class="gcta wide" data-act="runident">Verify identity &#8594;</button>' +
    opt('prepare', 'Not now', 'Go back to the list')
  );
};

function runIdent() {
  var steps = ['Driver&rsquo;s licence', 'Document check', 'Selfie and liveness', 'Identity verified'];
  head('Identity', 'Checking');
  paint('<div class="runner" id="runner">' + steps.map(function (s, n) {
    return '<div class="rstep" data-n="' + n + '"><span class="rdot"></span><span>' + s + '</span></div>';
  }).join('') + '</div>');
  var n = 0;
  var tick = setInterval(function () {
    var el = $('.rstep[data-n="' + n + '"]');
    if (el) el.classList.add('on');
    n++;
    if (n >= steps.length) {
      clearInterval(tick);
      put('identity', 'Identity', 'Confirmed', 'verified', 'Government photo ID');
      evt('Identity verified', 'GOVERNMENT PHOTO ID · CONFIRMED', 'gold');
      setTimeout(function () { go('prepare'); }, 900);
    }
  }, 620);
}

/* --- income ----------------------------------------------- */
SCREEN.income = function () {
  var amt = ST.ind === 'auto' ? '$82,000' : '$120,000';
  head('Income', 'Supporting what you earn');
  paint(
    '<div class="ghead sm"><h3>Supporting what you earn</h3>' +
    '<p>You told me ' + amt + '. A document turns that from something you said into something the ' +
    'record can stand on.</p></div>' +
    opt('incdoc', 'Use the sample employment letter', 'For this demonstration') +
    opt('prepare', 'Not now', 'Go back to the list')
  );
};

function incomeDoc() {
  var salary = ST.ind === 'auto' ? '$82,000' : '$120,000';
  head('Income', 'Reading the document');
  paint('<div class="scan"><span class="sbar2"></span><p>Checking document&hellip;</p></div>');
  setTimeout(function () {
    paint(
      '<div class="ghead sm"><h3>Here&rsquo;s what I found.</h3></div>' +
      '<div class="found">' +
        '<div class="fr"><span>Employer</span><b>Northstar Industries</b></div>' +
        '<div class="fr"><span>Role</span><b>Operations Manager</b></div>' +
        '<div class="fr"><span>Annual salary</span><b>' + salary + '</b></div>' +
        '<div class="fr"><span>Start date</span><b>March 2021</b></div>' +
      '</div>' +
      '<p class="gq">Does this look correct?</p>' +
      '<button class="gcta wide" data-act="inc-yes">Yes, confirm</button>' +
      opt('inc-no', 'Something is wrong', 'Tell me what')
    );
  }, 1400);
}

function incomeConfirm() {
  var salary = ST.ind === 'auto' ? '$82,000' : '$120,000';
  put('income', 'Income', salary, 'doc', 'Source: employment letter');
  put('employment', 'Employment', 'Northstar Industries', 'doc', 'Operations Manager, since March 2021');
  evt('Income supported by document', 'EMPLOYMENT LETTER · ' + salary.toUpperCase(), 'gold');
  go('prepare');
}

/* --- the other prepare steps ------------------------------ */
SCREEN.employ = function () {
  head('Employment', 'How steady it is');
  paint('<div class="ghead sm"><h3>How steady your income is</h3>' +
    '<p>Lenders treat salary, hourly, commission and self-employment very differently. It is worth ' +
    'getting this right early rather than at the underwriting stage.</p></div>' +
    opt('emp-set', 'Salaried, full time', 'Since March 2021') +
    opt('prepare', 'Not now', ''));
};

SCREEN.funds = function () {
  head('Down payment', 'Where it came from');
  paint('<div class="ghead sm"><h3>Where your down payment came from</h3>' +
    '<p>You told me $35,000. Lenders have to be able to show where a down payment came from, so ' +
    'this one usually needs support rather than a number.</p></div>' +
    opt('funds-own', 'All my own savings', 'Over about two years') +
    opt('funds-gift', 'Some of it is a gift', 'Needs a letter') +
    opt('prepare', 'Not now', ''));
};

SCREEN.debts = function () {
  head('Debts', 'What you already owe monthly');
  paint('<div class="ghead sm"><h3>What you already owe each month</h3>' +
    '<p>This is the number that moves what you can borrow more than almost anything else.</p></div>' +
    opt('debt-set', 'Truck payment, $720 a month', 'Nothing else outstanding') +
    opt('prepare', 'Not now', ''));
};

SCREEN.credit = function () {
  var auto = ST.ind === 'auto';
  head('Credit', auto ? 'Before you agree' : 'Your credit position');
  paint('<div class="ghead sm"><h3>' + (auto ? 'Before you agree' : 'Your credit position') + '</h3>' +
    '<p>' + (auto
      ? 'Your credit application may carry personal and financial information that lenders use to ' +
        'decide whether to finance you.'
      : 'Nothing is pulled without you saying so. When you connect a professional, you decide.') +
    '</p></div>' +
    '<div class="gwhat"><b>Information involved</b><span>Identity</span><span>Employment</span>' +
    '<span>Income</span><span>Housing</span>' + (auto ? '<span>Vehicle</span>' : '') +
    '<span>Credit-related information</span></div>' +
    '<div class="gnote">4orm records what you agreed to and shows you the financing activity ' +
    'available to your record. It cannot control what a third party does downstream.</div>' +
    '<button class="gcta wide" data-act="credit-ok">I understand</button>' +
    opt('ask-open', 'Ask a question', 'Before you decide'));
};

SCREEN.docs = function () {
  head('Documents', 'What is in your vault');
  var n = (ST.pass.docs && parseInt(ST.pass.docs.value, 10)) || 0;
  paint('<div class="ghead sm"><h3>Your documents</h3>' +
    '<p>' + n + ' of 6 gathered. These stay yours. Connecting a professional shares only what you ' +
    'choose, when you choose it.</p></div>' +
    opt('doc-add', 'Add a document', 'From this device') +
    opt('prepare', 'Not now', ''));
};

/* --- vehicle / trade / financing / add-ons ---------------- */
SCREEN.vehicle = function () {
  head('The vehicle', 'What is actually on the sheet');
  paint('<div class="ghead sm"><h3>The vehicle</h3><p>Take what they showed you and put it ' +
    'somewhere you can read it.</p></div>' +
    opt('veh-set', 'Use the deal sheet', '2026 example truck, $52,000') +
    opt('prepare', 'Not now', ''));
};

SCREEN.trade = function () {
  head('Your trade', 'And what is still owing on it');
  paint('<div class="ghead sm"><h3>Your trade</h3><p>Two numbers matter here, and they are often ' +
    'shown as one: what they will give you, and what you still owe.</p></div>' +
    opt('trade-set', 'Use the deal sheet', '$18,500 offered, $11,200 owing') +
    opt('prepare', 'Not now', ''));
};

SCREEN.financing = function () {
  head('Financing', 'The three numbers');
  paint('<div class="ghead sm"><h3>The three numbers</h3>' +
    '<p>Total amount financed, the rate, and the term. Everything else is arrangement.</p></div>' +
    opt('fin-set', 'Use the offer they showed me', '72 months at 7.49%') +
    opt('prepare', 'Not now', ''));
};

SCREEN.addons = function () {
  head('Add-ons', 'What got added at the desk');
  paint('<div class="ghead sm"><h3>What got added at the desk</h3>' +
    '<p>These are financed into the loan, so you pay interest on them for the whole term. They may ' +
    'be worth having. They are a separate decision from the vehicle.</p></div>' +
    opt('add-set', 'Use the deal sheet', 'Warranty, protection package, fees') +
    opt('prepare', 'Not now', ''));
};

/* --- readiness -------------------------------------------- */
function readiness() {
  var p = ST.pass;
  var ready = p.identity && p.identity.status === 'verified' && p.income && p.income.status === 'doc';
  if (!ready) { go('prepare'); return; }
  head('Ready', 'For a better conversation');
  paint(
    '<div class="ghead"><h3>You&rsquo;re ready to have a better conversation.</h3>' +
    '<p>Your identity is verified and your income is supported. Your down payment still needs ' +
    'supporting information. That is fine, and worth knowing before you walk in.</p></div>' +
    '<div class="gnote amber">This is not an approval, and I will never tell you that you are ' +
    'approved. Only a lender can do that.</div>' +
    opt('prepare', 'Keep preparing', 'Close the last gaps') +
    '<button class="gcta wide" data-act="connect">Connect a professional &#8594;</button>'
  );
}

/* --- connecting ------------------------------------------- */
SCREEN.connect = function () {
  var pr = I().pro;
  head('Connect', 'You decide what goes');
  paint(
    '<div class="ghead sm"><h3>' + pr.n + '</h3><p>' + pr.r + ' &middot; ' + pr.f + '</p></div>' +
    '<div class="gdemo">Demonstration professional</div>' +
    '<p class="gq">What would you like to share with ' + pr.n.split(' ')[0] + '?</p>' +
    '<div class="shr">' +
      shareRow('identity', 'Identity verification', 'So they do not ask you to prove it again.') +
      shareRow('income', 'Income', 'So the numbers they work from are the supported ones.') +
      shareRow('employment', 'Employment', 'How steady the income is.') +
      shareRow('goal', 'What you are trying to do', 'So the advice is about your decision.') +
      shareRow('funds', 'Available funds', 'What you have, and where it came from.') +
      shareRow('docs', 'Supporting documents', 'Only the ones you tick.') +
    '</div>' +
    '<div class="gnote">' + pr.n.split(' ')[0] + ' receives only what is ticked here. You can review ' +
    'your sharing history at any time.</div>' +
    '<button class="gcta wide" data-act="dosend">Share with ' + pr.n.split(' ')[0] + '</button>' +
    opt('prepare', 'Not yet', '')
  );
};

function shareRow(k, label, why) {
  var have = !!ST.pass[k];
  return '<label class="shrow' + (have ? '' : ' off') + '">' +
    '<input type="checkbox" data-share="' + k + '"' + (have ? ' checked' : ' disabled') + ' />' +
    '<span class="shb"><b>' + label + '</b><i>' + why + '</i></span></label>';
}

function doSend() {
  var picked = $$('[data-share]').filter(function (c) { return c.checked; })
    .map(function (c) { return c.getAttribute('data-share'); });
  var pr = I().pro;
  head('Sharing', 'On its way');
  paint('<div class="fly"><div class="flyline"></div>' +
    picked.map(function (k, n) {
      var p = ST.pass[k];
      return '<span class="flyi" style="--d:' + (n * 0.13) + 's">' + (p ? p.label : k) + '</span>';
    }).join('') + '</div>');
  ST.connected = pr;
  ST.perms.push({ to: pr.n, firm: pr.f, items: picked, at: 'Today, 2:38 PM' });
  evt('Information shared, with permission', 'TO ' + pr.n.toUpperCase() + ' · ' + picked.length + ' ITEMS', 'gold');
  setTimeout(function () {
    paint('<div class="ghead mid"><h3>Better prepared.<br />Better connected.</h3>' +
      '<p>' + pr.n + ' has what you allowed, and nothing else.</p></div>' +
      opt('perms', 'See what I shared', '') +
      '<button class="gcta wide" data-act="request">Continue &#8594;</button>');
  }, 2400);
}

/* --- the request back ------------------------------------- */
SCREEN.request = function () {
  var pr = ST.connected || I().pro, f = pr.n.split(' ')[0];
  head('A request', 'From ' + f);
  paint(
    '<div class="ghead sm"><h3>' + f + ' asked for something</h3>' +
    '<p>90 days of account statements, to support your down payment.</p></div>' +
    opt('why-stmt', 'Why is this needed?', 'Plain answer, no jargon') +
    '<button class="gcta wide" data-act="give-stmt">Provide document</button>' +
    opt('ask-open', 'Ask ' + f, 'Straight to them')
  );
};

/* --- the integrity moment: something changed -------------- */
function mismatch() {
  var auto = ST.ind === 'auto';
  var mine = auto ? '$82,000' : '$120,000';
  var theirs = auto ? '$96,000' : '$138,000';
  var pr = ST.connected || I().pro, f = pr.n.split(' ')[0];
  put('income', 'Income', mine, 'changed', 'Application shows ' + theirs);
  evt('Difference found between the record and the application', 'NEEDS ATTENTION · NOT RESOLVED', 'amber');
  head('Something changed', 'Worth a look');
  paint(
    '<div class="ghead sm amberh"><h3>Something changed.</h3>' +
    '<p>The income on the ' + (auto ? 'financing submission' : 'application') +
    ' doesn&rsquo;t match what you confirmed and supported.</p></div>' +
    '<div class="cmp">' +
      '<div class="cmpc"><span>Your record</span><b>' + mine + '</b>' + chip('doc') + '</div>' +
      '<div class="cmpv">vs</div>' +
      '<div class="cmpc att"><span>' + (auto ? 'Submission' : 'Application') + '</span><b>' +
        theirs + '</b>' + chip('needs') + '</div>' +
    '</div>' +
    '<div class="gnote">I am not telling you what happened, because I don&rsquo;t know. There may be ' +
    'a good reason. What matters is that you can see it now, rather than months from now.</div>' +
    opt('see-src', 'See supporting information', 'Where your number came from') +
    '<button class="gcta wide" data-act="ask-pro">Ask ' + f + '</button>'
  );
}

function proResolves() {
  var auto = ST.ind === 'auto';
  var mine = auto ? '$82,000' : '$120,000';
  var pr = ST.connected || I().pro, f = pr.n.split(' ')[0];
  head('Resolved', 'By ' + f);
  paint('<div class="scan"><span class="sbar2"></span><p>' + f + ' is looking at it&hellip;</p></div>');
  setTimeout(function () {
    put('income', 'Income', mine, 'doc', 'Source: employment letter · corrected ' + (auto ? 'on submission' : 'on the application'));
    evt('Difference resolved by the professional', 'APPLICATION CORRECTED TO ' + mine.toUpperCase(), 'gold');
    paint(
      '<div class="ghead sm"><h3>' + f + ' corrected it.</h3>' +
      '<p>The ' + (auto ? 'submission' : 'application') + ' now reads ' + mine + ', matching the ' +
      'letter you provided. Both the difference and the correction are in your record.</p></div>' +
      '<div class="gnote gold">This is the whole point. The problem was caught while it could still ' +
      'be fixed, by the person whose job it is to fix it.</div>' +
      opt('record', 'See my record', 'Everything, in order') +
      opt('passport', 'See my 4orm', '')
    );
  }, 1700);
}

/* --- auto: submissions and the deal changing -------------- */
function submissions() {
  head('Your financing activity', 'Where it went');
  var rows = [
    ['Lender A', '2:41 PM', ''],
    ['Lender B', '2:44 PM', ''],
    ['Lender C', '2:46 PM', ''],
    ['Lender A', '2:52 PM', 'again']
  ];
  paint(
    '<div class="ghead sm"><h3>Where your application went</h3>' +
    '<p>Each submission as it happened. This history is yours.</p></div>' +
    '<div class="subs">' + rows.map(function (r, n) {
      return '<div class="sub' + (r[2] ? ' rep' : '') + '" style="--d:' + (n * .3) + 's">' +
        '<b>' + r[0] + '</b><span>Submitted ' + r[1] + '</span>' +
        (r[2] ? '<em>appears again</em>' : '') + '</div>';
    }).join('') + '</div>' +
    '<div class="gnote">Lender A appears more than once. I am showing you the event, not naming it. ' +
    'there can be ordinary reasons for a second submission, and I would rather you ask than assume.</div>' +
    opt('ask-open', 'Ask about this', '') +
    '<button class="gcta wide" data-act="dealchange">Continue &#8594;</button>'
  );
  evt('Financing submitted to four lenders', 'FOUR SUBMISSIONS · ONE REPEATED');
}

function dealChange() {
  put('financing', 'Financing', '84 months at 8.19%', 'changed', 'Was 72 months at 7.49%');
  put('addons', 'Add-ons', '$2,295 protection package', 'changed', 'Was $1,495');
  evt('The deal changed after you saw it', 'THREE CHANGES · UNACKNOWLEDGED', 'amber');
  head('Your deal changed', 'Three things moved');
  paint(
    '<div class="ghead sm amberh"><h3>Your deal changed.</h3>' +
    '<p>Three things moved between the sheet you were shown and the paperwork. Only the changes ' +
    'are below. Everything else is the same.</p></div>' +
    '<div class="chgs">' +
      dRow('Protection package', '$1,495', '$2,295') +
      dRow('Term', '72 months', '84 months') +
      dRow('Rate', '7.49%', '8.19%') +
    '</div>' +
    '<div class="gnote">Any one of these can be legitimate. Together they change what you pay by ' +
    'more than the payment on the page suggests.</div>' +
    opt('ask-open', 'Explain what these mean', '') +
    '<button class="gcta wide" data-act="mismatch">Keep going &#8594;</button>'
  );
}

function dRow(k, a, b) {
  return '<div class="drow"><span class="dk2">' + k + '</span>' +
    '<span class="dwas">' + a + '</span><span class="darr">&#8594;</span>' +
    '<span class="dnow">' + b + '</span></div>';
}

/* --- permissions ------------------------------------------ */
SCREEN.perms = function () {
  head('Sharing', 'You&rsquo;re in control');
  var body;
  if (!ST.perms.length) {
    body = '<div class="gnote"><b>Currently shared with</b><br />Nobody.<br /><br />When you connect ' +
      'a professional, I show you what they are asking for and ask you first.</div>';
  } else {
    body = ST.perms.map(function (p) {
      return '<div class="perm"><div class="ph"><b>' + p.to + '</b><span>' + p.at + '</span></div>' +
        '<div class="pf">' + p.firm + '</div>' +
        '<div class="pit">' + p.items.map(function (k) {
          return '<span>' + ((ST.pass[k] && ST.pass[k].label) || k) + '</span>';
        }).join('') + '</div></div>';
    }).join('');
  }
  paint('<div class="ghead sm"><h3>You&rsquo;re in control.</h3>' +
    '<p>What you allowed, when, and to whom.</p></div>' + body +
    '<div class="gnote">One honest limit: withdrawing future access does not remove records a ' +
    'regulated firm is legally required to keep. I will not pretend otherwise.</div>' +
    opt('passport', 'Back to my 4orm', ''));
};

/* --- the record ------------------------------------------- */
SCREEN.record = function () {
  head('My record', 'What happened, in order');
  paint('<div class="ghead sm"><h3>Your record</h3>' +
    '<p>Everything that happened, in the order it happened, with where each piece came from.</p></div>' +
    '<div class="rec">' + (ST.events.length
      ? ST.events.map(function (e) {
          return '<div class="recr ' + e.tone + '"><b>' + e.t + '</b><i>' + e.s + '</i></div>';
        }).join('')
      : '<p class="gempty">Nothing yet.</p>') + '</div>' +
    '<div class="gnote gold">You experienced a better relationship. 4orm protected the record.</div>' +
    opt('passport', 'My 4orm', '') + opt('perms', 'Sharing', ''));
};

/* ============================================================
   The rail beside the phone
   ============================================================ */
function drawRail() {
  var r = $('#rail');
  if (!r) return;
  var i = I();
  var done = Object.keys(ST.pass).length;
  var total = prepList().length + 3;
  var pct = Math.min(98, Math.round((done / total) * 100));
  r.innerHTML =
    '<div class="bezel"><div class="core">' +
      '<div class="core-h"><span class="lbl">Evidence timeline &middot; ' + i.ref + '</span>' +
        '<span class="pv"><span class="dotb"></span>Read only</span></div>' +
      '<div class="core-b">' +
        '<div class="meter"><div class="mt"><span class="mn">' + pct + '%</span>' +
          '<span class="ml">of what a professional<br />will ask you for</span></div>' +
          '<div class="bar"><i style="width:' + pct + '%"></i></div></div>' +
        '<div class="evtwrap">' + (ST.events.length
          ? ST.events.map(function (e) {
              return '<div class="evt ' + e.tone + '"><span class="d"></span>' +
                '<span class="ptxt"><span class="et">' + e.t + '</span>' +
                '<span class="es">' + e.s + '</span></span></div>';
            }).join('')
          : '<div class="evt"><span class="d"></span><span class="ptxt">' +
            '<span class="et">' + i.person + ' opens 4orm. No professional involved yet.</span>' +
            '<span class="es">' + i.ref + ' · STARTED BY THE PERSON</span></span></div>') +
        '</div>' +
      '</div>' +
    '</div></div>';
}

/* ============================================================
   Routing
   ============================================================ */
function go(s) {
  ST.screen = s;
  if (SCREEN[s]) SCREEN[s]();
  drawRail();
}

var ACT = {
  goal: function (arg) {
    var i = I();
    var lbl = (i.opens.filter(function (o) { return o[0] === arg; })[0] || [, arg])[1];
    put('goal', 'Goal', lbl, 'told');
    evt('Said what they are trying to do', 'IN THEIR OWN WORDS · BEFORE A PROFESSIONAL EXISTS');
    ST.thread = [];
    ST.opened = true;
    thread();
    me(lbl);

    if (!DEEP[ST.ind]) { shallow(lbl); return; }

    thinkSeq([
      ['<p>' + lbl + '. That is enough to start with.</p>' +
       '<p class="gm">I am not going to hand you an article. Tell me what is actually ' +
       'happening, the way you would say it out loud. Do not tidy it up.</p>', null, 900],
      ['<p>If it is easier, use the example below and I will work from that.</p>',
       ['Use the example'], 780]
    ]);
    ST.opened = true;
    setTimeout(focusAsk, 1200);
  },
  example: function () { ask(I().ex); },
  'Use the example': function () { ask(I().ex); },
  prepare: function () { go('prepare'); },
  passport: function () { go('passport'); },
  perms: function () { go('perms'); },
  record: function () { go('record'); },
  connect: function () { go('connect'); },
  request: function () { go('request'); },
  ident: function () { go('ident'); },
  income: function () { go('income'); },
  employ: function () { go('employ'); },
  funds: function () { go('funds'); },
  debts: function () { go('debts'); },
  credit: function () { go('credit'); },
  docs: function () { go('docs'); },
  vehicle: function () { go('vehicle'); },
  trade: function () { go('trade'); },
  financing: function () { go('financing'); },
  addons: function () { go('addons'); },
  back: function () { go('prepare'); },

  runident: runIdent,
  incdoc: incomeDoc,
  'inc-yes': incomeConfirm,
  'inc-no': function () { ask('Something on my employment letter is wrong'); },

  'emp-set': function () {
    put('employment', 'Employment', 'Salaried, full time', 'told', 'Since March 2021');
    evt('Employment recorded', 'STATED BY THE PERSON'); go('prepare');
  },
  'funds-own': function () {
    put('funds', 'Available funds', '$35,000', 'told', 'All own savings');
    evt('Available funds recorded', 'STATED BY THE PERSON · NOT YET SUPPORTED'); go('prepare');
  },
  'funds-gift': function () {
    put('funds', 'Available funds', '$35,000', 'needs', 'Part gift · needs a letter');
    evt('Down payment includes a gift', 'NEEDS SUPPORTING INFORMATION', 'amber'); go('prepare');
  },
  'debt-set': function () {
    put('debts', 'Debts', '$720 a month', 'told', 'Vehicle payment');
    evt('Existing obligations recorded', 'STATED BY THE PERSON'); go('prepare');
  },
  'credit-ok': function () {
    put('credit', ST.ind === 'auto' ? 'Credit permission' : 'Credit', 'Authorised by you', 'told',
        'Today, 2:38 PM');
    evt('Permission given, knowingly', 'WHAT WAS SHOWN AND WHAT WAS AGREED', 'gold');
    if (ST.ind === 'auto') { submissions(); } else { go('prepare'); }
  },
  'doc-add': function () {
    var n = ((ST.pass.docs && parseInt(ST.pass.docs.value, 10)) || 0) + 1;
    put('docs', 'Documents', n + ' of 6', 'doc', 'Added by you, unaltered');
    evt('Document added to the vault', 'UPLOADED BY THE PERSON · UNALTERED'); go('docs');
  },
  'veh-set': function () {
    put('vehicle', 'The vehicle', '$52,000', 'pro', '2026 example truck · dealer provided');
    evt('Vehicle recorded from the deal sheet', 'PROVIDED BY THE DEALER'); go('prepare');
  },
  'trade-set': function () {
    put('trade', 'Your trade', '$18,500 offered', 'pro', 'Dealer provided');
    put('owing', 'Still owing on it', '$11,200', 'told', 'You told us');
    evt('Trade and payout recorded', 'TWO NUMBERS, SHOWN SEPARATELY'); go('prepare');
  },
  'fin-set': function () {
    put('financing', 'Financing', '72 months at 7.49%', 'pro', 'As shown to you');
    evt('Financing terms recorded as shown', 'FIRST VERSION · KEPT'); go('prepare');
  },
  'add-set': function () {
    put('addons', 'Add-ons', '$1,495 protection package', 'pro', 'Plus warranty $3,200, fees $895');
    evt('Add-ons recorded separately from the vehicle', 'SO THEY STAY A SEPARATE DECISION');
    go('prepare');
  },

  dosend: doSend,
  'why-stmt': function () { ask('Why do they want my bank statements?'); },
  'give-stmt': function () {
    put('docs', 'Documents', '1 of 6', 'doc', '90 days of statements');
    evt('Requested document provided', 'ACCOUNT HISTORY · 90 DAYS');
    setTimeout(mismatch, 700);
  },
  'see-src': function () { ask('What is verified in my record?'); },
  'ask-pro': proResolves,
  mismatch: mismatch,
  dealchange: dealChange,
  'ask-open': focusAsk
};

function focusAsk() {
  var el = $('#askinput');
  if (el) { el.focus(); }
}

/* ============================================================
   Wiring
   ============================================================ */
function boot(ind) {
  ST = fresh(ind);
  go('open');
}

function switchTo(ind) {
  $$('[data-ind]').forEach(function (b) {
    b.classList.toggle('on', b.getAttribute('data-ind') === ind);
  });
  var pip = $('#inds .pip'), on = $('#inds button.on');
  if (pip && on) {
    pip.style.width = on.offsetWidth + 'px';
    pip.style.transform = 'translateX(' + (on.offsetLeft - 5) + 'px)';
  }
  boot(ind);
}

document.addEventListener('click', function (e) {
  if (!e.target.closest) return;

  var pick = e.target.closest('[data-ind]');
  if (pick) {
    switchTo(pick.getAttribute('data-ind'));
    return;
  }
  var chipEl = e.target.closest('[data-ask]');
  if (chipEl) {
    var q = chipEl.getAttribute('data-ask');
    /* Two chips are navigation rather than conversation. */
    if (q === 'Show me mortgage') { switchTo('mortgage'); return; }
    if (q === 'Show me auto')     { switchTo('auto');     return; }
    if (q === 'Use the example')  { ask(I().ex);          return; }
    ask(q);
    return;
  }

  var t = e.target.closest('[data-act]');
  if (!t || !$('#phBody') || !$('#phBody').contains(t)) {
    if (!t || !t.closest('.expdest')) return;
  }
  var a = t.getAttribute('data-act');
  if (ACT[a]) { e.preventDefault(); ACT[a](t.getAttribute('data-arg')); }
});

document.addEventListener('submit', function (e) {
  var f = e.target.closest('#askform');
  if (!f) return;
  e.preventDefault();
  var el = $('#askinput');
  if (!el) return;
  var v = el.value;
  el.value = '';
  ask(v);
});

if (document.getElementById('phBody')) {
  boot('mortgage');
  /* Readiness is checked whenever the record grows enough to earn it. */
  var seen = 0;
  setInterval(function () {
    if (!ST) return;
    var n = Object.keys(ST.pass).length;
    if (n !== seen) {
      seen = n;
      if (ST.screen === 'prepare' && ST.pass.identity && ST.pass.income &&
          ST.pass.identity.status === 'verified' && ST.pass.income.status === 'doc' &&
          !ST.connected) { readiness(); }
    }
  }, 700);
}

window.FourmPhone = { state: function () { return ST; }, go: go, ask: ask };
})();
