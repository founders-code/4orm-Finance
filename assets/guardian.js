/* ============================================================
   The 4orm phone.

   One rule governs this file: 4orm may talk, but it may
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
    qi: 0,
    mode: '',
    check: null,
    doc: null,
    grant: null,
    disc: {},
    di: 0,
    dwhy: false,
    node: ''
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

function I() {
  var i = IND[ST.ind];
  /* If the visitor told 4ormIQ their name on the way in, the whole
     experience uses it. It never left their browser to get here. */
  var given = (window.FourmWho && window.FourmWho.name && window.FourmWho.name()) || '';
  if (given) {
    var first = given.split(/\s+/)[0];
    i = Object.keys(i).reduce(function (o, k) { o[k] = i[k]; return o; }, {});
    i.who = first;
    i.person = given;
  }
  return i;
}

/* ============================================================
   Ask 4orm.

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
  ST.thread = [];
  ST.opened = true;
  runNode('open');
};

/* The goal screen. This is where "Know before you look" arrives, once the
   person has said which decision they are thinking about. */
SCREEN.goals = function () {
  var i = I();
  head(i.who + '&rsquo;s 4orm', i.sub);
  paint(
    '<div class="ghead"><h3>Good afternoon, ' + i.who + '.</h3>' +
    '<p>You don&rsquo;t need to know what matters yet. Tell me what you&rsquo;re thinking about doing.</p></div>' +
    i.opens.map(function (o) { return opt('goal', o[1], '', o[0]); }).join('') +
    '<div class="gor">or just say it in your own words</div>' +
    '<button class="opt ghost" data-act="example"><span class="ptxt"><b>Use the example</b>' +
    '<i>' + esc(i.ex.slice(0, 62)) + '&hellip;</i></span><span class="ch">&#8250;</span></button>' +
    '<button class="opt ghost" data-act="modes"><span class="ptxt"><b>The other three</b>' +
    '<i>Send, sign, or join a professional</i></span><span class="ch">&#8250;</span></button>'
  );
};

/* --- the conversation -------------------------------------

   Everything 4orm says goes through think(). It never
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

/* 4orm answering, always after a beat of thinking */
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

/* Several 4orm turns in a row, each waiting for the one before it. */
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

  /* If a question is on the table, what the person typed is an answer to it,
     not a new topic. Reading it against that question is what makes typing
     feel like being listened to rather than being ignored. */
  if (ST.node && NODE[ST.node]) {
    var v = readTyped(q);
    if (v) { ST.asked++; reply(v, q); return; }
    var n = NODE[ST.node];
    ST.asked++;
    me(q);
    think('<p>Didn&rsquo;t catch that. I&rsquo;d rather ask than guess.</p>' +
          '<p class="gm">Closest one?</p>' + rchips(n.replies), null, 900);
    return;
  }

  ST.asked++;
  me(q);

  /* If the person is answering a question 4orm asked, that is a
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

  /* An answer of "I am not sure" is recorded, but it is NOT progress. Counting
     it as progress would let a person who answered every question with "I do
     not know" watch the bar fill to nearly full, which is the exact dishonesty
     this product exists to remove. Only what is actually known counts. */
  var keys = Object.keys(ST.pass);
  var done = keys.filter(function (k) {
    var st = ST.pass[k].status;
    return st && st !== 'needs' && st !== 'none';
  }).length;
  var total = Math.max(prepList().length + 3, keys.length);
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
   THE FOUR THINGS 4orm DOES

   Every one of them is the same promise at a different moment:
   know the thing before the thing is irreversible.

     send   a message, a link or a request arrived, and money or
            information is about to move
     look   nobody is selling yet, and there is time to work out
            what is actually needed
     sign   a document is in front of the person and the reading
            of it is the last chance
     join   a professional has invited them in, and the evidence
            starts being built by both sides

   THE SEAMS. Each mode has one function that produces its
   findings: runSend(), readDoc(), and ANSWER() for the guided
   questions. They take input and return findings. Swap a body
   for a service call and every screen below keeps working.
   ============================================================ */

var MODES = [
  ['send',   'Check something',        'Money or documents are about to move'],
  ['look',   'Work out what I need',   'Nobody is selling yet'],
  ['sign',   'Read a document with me','It is in front of me now'],
  ['invite', 'Join a professional',    'A firm has invited me in']
];

SCREEN.modes = function () {
  var i = I();
  head('4ormIQ', 'Nothing here reaches anybody until you say so');
  paint(
    '<div class="ghead"><h3>Good afternoon, ' + i.who + '.</h3>' +
    '<p>Four things, each one before the part you cannot take back.</p></div>' +
    MODES.map(function (m) { return opt('mode', m[1], m[2], m[0]); }).join('')
  );
};

/* ============================================================
   1. KNOW BEFORE YOU SEND

   The check that runs against what is published, and stops
   there. It reports what a register says and what a message
   does. It never concludes that a person or a company is a
   criminal, because we are not in a position to conclude that
   and saying it about a real firm would be wrong.
   ============================================================ */

var SENDS = [
  { k: 'refund',
    t: 'Text message',
    p: 'CRA: Your 2025 refund of $1,482.60 could not be deposited. Confirm your banking ' +
       'details within 24 hours at cra-refund-secure.ca/verify or the amount will be returned ' +
       'to the treasury.',
    level: 'bad',
    find: [
      ['Where it wants you to go', 'The address is not a Government of Canada address. ' +
       'Federal services sit on canada.ca.', 'The link in the message'],
      ['What it is asking for', 'Banking details, entered on a page reached from a message ' +
       'you did not expect.', 'The message'],
      ['The clock', 'A deadline measured in hours. Urgency is what stops a person checking.',
       'The message'],
      ['What a refund actually does', 'A refund you are owed does not expire, and is not ' +
       'collected by confirming your account from a text.', 'How the process works']
    ],
    doing: [
      'Do not open the link, and do not enter anything on the page behind it.',
      'If you want to know whether a refund is waiting, sign in to your own account ' +
      'the way you normally do, or telephone the number on a document you already had.',
      'Report the message to the Canadian Anti-Fraud Centre. Reporting it is what makes ' +
      'the next person’s check work.'
    ] },

  { k: 'invest',
    t: 'Investment offer',
    p: 'Hi, following up from the group. We are opening a small allocation in the arbitrage ' +
       'fund this week. 4 to 6 per cent monthly, principal protected, audited. Minimum ' +
       '$25,000, funded by wire or transfer today to hold your place.',
    level: 'bad',
    find: [
      ['Is the person registered', 'No individual or firm is named in a way that can be ' +
       'looked up. Anyone advising on or selling securities in Canada is normally required ' +
       'to be registered, or to fit an exemption.', 'CSA National Registration Search'],
      ['The return being promised', 'A fixed monthly return described as protected is not ' +
       'how an investment behaves. A return that cannot fall is not an investment.',
       'What the words mean'],
      ['How the money is meant to move', 'Wire or transfer, today, to hold a place. ' +
       'Once it has gone it is usually gone.', 'The message'],
      ['The clock', 'This week, today, a place to hold. Every one of those exists to ' +
       'stop you checking.', 'The message']
    ],
    doing: [
      'Do not send anything today. Nothing that is real needs the money before you can ' +
      'check who is asking.',
      'Ask for the full legal name of the firm and the individual, then look both up on ' +
      'the CSA National Registration Search and the CSA Disciplined List.',
      'If they will not give you a name you can look up, that is the answer.'
    ] },

  { k: 'renewal',
    t: 'Renewal email',
    p: 'Good afternoon. Ahead of your renewal we need updated documents. Please reply to ' +
       'this address with your two most recent pay stubs, a void cheque and a photo of your ' +
       'driver’s licence. Sent from a personal address, not the firm domain.',
    level: 'warn',
    find: [
      ['Who sent it', 'The address is a personal one, not the firm’s. That can be ' +
       'somebody working from a phone, and it can be somebody who is not them at all.',
       'The sender address'],
      ['What it is asking for', 'A void cheque and a licence photograph, by ordinary email. ' +
       'Email is not a safe place to put either of those.', 'The message'],
      ['What is normal here', 'A renewal genuinely does need documents. That part is not ' +
       'unusual, which is what makes the sender address worth checking.', 'How the process works']
    ],
    doing: [
      'Do not reply to that address with anything.',
      'Telephone the firm on the number from your original agreement and ask whether they ' +
      'sent it.',
      'If they did, ask them to send you a secure upload link rather than taking documents ' +
      'by email.'
    ] }
];

var LEVEL = {
  ok:   { l: 'Low concern',  k: 'ok',   s: 'Nothing came back that should stop you' },
  warn: { l: 'Caution',      k: 'warn', s: 'Some of this is worth confirming before you act' },
  bad:  { l: 'High concern', k: 'bad',  s: 'Do not send anything until this is resolved' }
};

var REGISTERS = [
  ['CSA National Registration Search', 'Is the person or firm registered'],
  ['CSA Disciplined List',             'Has action been taken before'],
  ['CIRO Advisor Report',              'Investment advisor history'],
  ['Canadian Anti-Fraud Centre',       'Reported patterns'],
  ['Provincial regulator registers',   'FSRA, OMVIC, RIBO, VSA']
];

SCREEN.send = function () {
  head('Checking it', 'Before anything moves');
  paint(
    '<div class="ghead"><h3>What came in?</h3>' +
    '<p>Paste it below. Or open one of these and I&rsquo;ll run the same check.</p></div>' +
    SENDS.map(function (s) {
      return opt('sendrun', s.t, esc(s.p.slice(0, 74)) + '&hellip;', s.k);
    }).join('') +
    '<div class="gor">or paste what you got</div>' +
    '<form class="gpaste" id="sendform">' +
      '<textarea id="sendinput" rows="3" maxlength="600" ' +
        'placeholder="Paste the message, email or link"></textarea>' +
      '<button class="gcta wide" type="submit">Check it &#8594;</button>' +
    '</form>' +
    note('I read what&rsquo;s published and what the message does. I don&rsquo;t conclude that ' +
         'anyone has committed a crime.')
  );
};

function note(txt) {
  return '<div class="gnote"><b>Where the line sits.</b> ' + txt + '</div>';
}

/* THE SEAM. Give it text, get findings back. */
function runSend(key, typed) {
  var s = null;
  if (key) { s = SENDS.filter(function (x) { return x.k === key; })[0]; }
  if (!s && typed) { s = matchSend(typed); }
  return s;
}

/* Typed text is matched against the patterns the prepared cases stand for, so
   pasting something real still lands on the right reading rather than nothing. */
function matchSend(t) {
  var x = String(t).toLowerCase();
  if (/refund|cra|revenue agency|tax|deposit|benefit/.test(x)) return SENDS[0];
  if (/invest|fund|return|per cent|percent|%|crypto|wire|guarantee|arbitrage/.test(x)) return SENDS[1];
  if (/renew|pay stub|void cheque|licence|license|document|upload/.test(x)) return SENDS[2];
  return {
    k: 'unclear', t: 'What you pasted', p: String(t).slice(0, 240), level: 'warn',
    find: [
      ['What I can see', 'There is not enough in this on its own to place it. That is not ' +
       'the same as it being fine.', 'What you pasted'],
      ['The two questions that settle most of these', 'Who exactly is asking, by full legal ' +
       'name, and where is the money or the document going.', 'How to check anything']
    ],
    doing: [
      'Ask for the full legal name of the firm and the individual.',
      'Look that name up on the published register for what they are selling.',
      'Do not send money or documents until both of those come back.'
    ]
  };
}

function sendRun(key, typed) {
  var s = runSend(key, typed);
  ST.check = s;
  ST.screen = 'sendrun';
  head('Checking it', 'Reading the published registers');

  paint(
    '<div class="gquote"><span class="gqk">' + s.t + '</span><p>' + esc(s.p) + '</p></div>' +
    '<div class="gruns" id="gruns">' +
      REGISTERS.map(function (r, n) {
        return '<div class="grun" data-n="' + n + '"><span class="gspin"></span>' +
          '<span class="ptxt"><b>' + r[0] + '</b><i>' + r[1] + '</i></span></div>';
      }).join('') +
    '</div>'
  );

  /* Each register lands in turn. A check that finished instantly would not
     read as a check. */
  REGISTERS.forEach(function (r, n) {
    setTimeout(function () {
      var el = $('#gruns .grun[data-n="' + n + '"]');
      if (el) el.className = 'grun done';
      if (n === REGISTERS.length - 1) setTimeout(sendResult, 700);
    }, 620 + n * 560);
  });

  evt('Checked something before acting on it', 'AGAINST WHAT IS PUBLISHED', 'gold');
}

function sendResult() {
  var s = ST.check;
  if (!s) return;
  var L = LEVEL[s.level];
  ST.screen = 'sendresult';
  head('Checking it', L.l);

  put('checked', 'Checked before acting', s.t + ' · ' + L.l, 'verified',
      'Against published registers');

  paint(
    '<div class="glevel ' + L.k + '"><span class="glv">' + L.l + '</span>' +
      '<span class="gls">' + L.s + '</span></div>' +

    '<div class="gsec">What I found</div>' +
    s.find.map(function (f) {
      return '<div class="gfind"><b>' + f[0] + '</b><p>' + f[1] + '</p>' +
        '<span class="gsrc">' + f[2] + '</span></div>';
    }).join('') +

    '<div class="gsec">What to do now</div>' +
    '<ol class="gdo">' + s.doing.map(function (d) { return '<li>' + d + '</li>'; }).join('') + '</ol>' +

    note('That&rsquo;s what the registers say and what the message does. It&rsquo;s not a '
         + 'finding that anyone broke the law, and I won&rsquo;t pretend it is.') +

    '<button class="gcta wide" data-act="modes">Done &#8594;</button>' +
    '<button class="opt ghost" data-act="send"><span class="ptxt"><b>Check something else</b>' +
    '</span><span class="ch">&#8250;</span></button>'
  );

  evt('Kept what was checked, and when', 'PART OF THE RECORD · ' + L.l.toUpperCase(), 'gold');
}

/* ============================================================
   2. KNOW BEFORE YOU LOOK

   Four decisions, and then the guided questions. This is the
   arc that already existed: say it in your own words, get read
   back what you actually said, answer three questions that
   change the answer, and end up with something a professional
   can work from.
   ============================================================ */

var LOOKS = [
  ['mortgage',  'A home',      'Buying, refinancing or renewing'],
  ['auto',      'A vehicle',   'Buying, financing or trading one in'],
  ['insurance', 'Insurance',   'Taking out cover, or replacing what you hold'],
  ['investing', 'Investing',   'Starting, moving an account, or checking a recommendation']
];

SCREEN.look = function () {
  head('Working it out', 'Before anybody is selling');
  paint(
    '<div class="ghead"><h3>What are you thinking about?</h3>' +
    '<p>Pick the one closest to it. I will ask you a few things, and none of it goes ' +
    'anywhere.</p></div>' +
    LOOKS.map(function (l) { return opt('lookpick', l[1], l[2], l[0]); }).join('') +
    note('Asking me commits you to nothing. No professional can see any of this unless you ' +
         'send it to one.')
  );
};

/* ============================================================
   3. KNOW BEFORE YOU SIGN

   A document goes in and what is worth asking about comes back.
   Every flag says where in the document it is and what question
   it turns into, because a flag a person cannot act on is just
   a worry.

   The line is absolute and appears on the screen: this is not
   legal advice, and 4orm is not telling anybody whether to sign.
   ============================================================ */

var DOCS = [
  { k: 'commit', t: 'Mortgage commitment', sub: '6 pages · from a lender',
    flags: [
      ['warn', 'The rate is held until a date', 'Page 1, Rate and term',
       'The rate you were quoted is held to a date on page one. After that date it is ' +
       'repriced at whatever is current.',
       'Ask what happens to my rate if closing moves past that date, and get the answer ' +
       'in writing.'],
      ['warn', 'The penalty is a formula, not a number', 'Page 4, Prepayment',
       'Breaking early is calculated by a formula rather than stated as an amount. On a ' +
       'fixed rate that formula can produce a far larger number than three months of interest.',
       'Ask them to work out the penalty in dollars on today’s numbers, as an example.'],
      ['info', 'Conditions still to satisfy', 'Page 2, Conditions',
       'Three conditions are outstanding. Until they are met this is an offer, not a ' +
       'commitment.',
       'Ask which of these are on me and what the deadline is for each one.'],
      ['warn', 'Creditor insurance is pre-ticked', 'Page 5, Optional products',
       'An optional product is selected by default. Optional means you can decline it, ' +
       'and declining it cannot change the lending decision.',
       'Ask what it costs over the full term in dollars, and what it does not cover.']
    ] },

  { k: 'bill', t: 'Bill of sale', sub: '2 pages · from a dealership',
    flags: [
      ['bad', 'The term is longer than the quote', 'Page 1, Payment schedule',
       'The paperwork shows 84 months. The quote you were shown was 72. The payment looks ' +
       'similar because the term moved, not because the price did.',
       'Ask why the term changed, and what the total cost of borrowing is at each one.'],
      ['bad', 'The rate is higher than the quote', 'Page 1, Annual percentage rate',
       'The rate on the paperwork is above the one on the quote.',
       'Ask what changed between the quote and this sheet.'],
      ['warn', 'Added products', 'Page 2, Protection',
       'A protection package appears at a higher price than the one discussed.',
       'Ask for the price of the vehicle with every added product removed, then decide ' +
       'about each one separately.'],
      ['info', 'Total cost of borrowing', 'Page 2, Disclosure',
       'The dollar total you will pay over the full term is disclosed here. It is the ' +
       'number that actually compares two deals.',
       'Read that number out loud before you sign anything.']
    ] },

  { k: 'policy', t: 'Insurance policy', sub: '14 pages · from an insurer',
    flags: [
      ['warn', 'Exclusions sit apart from coverage', 'Pages 3 and 9',
       'What is covered is on page three. What is excluded is on page nine. They have to ' +
       'be read together to mean anything.',
       'Ask which exclusions apply to the thing I actually bought this for.'],
      ['warn', 'A replacement is being recommended', 'Page 1, Application',
       'This replaces cover you already hold. A replacement restarts contestability and ' +
       'can be priced on your age now rather than your age then.',
       'Ask for a written comparison of the policy I have against this one.'],
      ['info', 'Claims deadline', 'Page 11, Claims',
       'There is a time limit for reporting a claim. Missing it can end an otherwise ' +
       'valid claim.',
       'Note that deadline somewhere you will find it under stress.']
    ] },

  { k: 'kyc', t: 'Account opening form', sub: '4 pages · from an investment firm',
    flags: [
      ['warn', 'The risk box does not match what you said', 'Page 2, Risk tolerance',
       'The form records a higher risk tolerance than the one described in the conversation.',
       'Ask them to change it to what I actually said, and to initial the change.'],
      ['warn', 'Time horizon is blank', 'Page 2, Objectives',
       'Horizon is one of the things suitability is judged against. Leaving it empty makes ' +
       'almost anything defensible later.',
       'Fill it in before signing, in my own words.'],
      ['info', 'How they are paid', 'Page 3, Fees',
       'The fee arrangement is disclosed here, including anything paid by a third party.',
       'Ask them to say out loud how they get paid on what they are recommending.']
    ] }
];

var FLAG = { bad: 'High', warn: 'Worth asking', info: 'Note' };

SCREEN.sign = function () {
  head('Reading it with you', 'Before you initial anything');
  paint(
    '<div class="ghead"><h3>Add the document.</h3>' +
    '<p>I&rsquo;ll read it and point at what&rsquo;s worth asking about. Choose a file, or open '
    + 'one of these.</p></div>' +
    '<button class="gdrop" data-act="signpick" data-arg="commit">' +
      '<span class="gdi">&#8593;</span><b>Choose a file</b>' +
      '<i>PDF, or a photo of the pages</i></button>' +
    DOCS.map(function (d) { return opt('signpick', d.t, d.sub, d.k); }).join('') +
    note('I point at what&rsquo;s worth asking about. I won&rsquo;t tell you whether to sign, '
         + 'and none of this is legal advice.')
  );
};

/* THE SEAM. Give it a document, get flags back. */
function readDoc(key) {
  return DOCS.filter(function (d) { return d.k === key; })[0] || DOCS[0];
}

function signRead(key) {
  var d = readDoc(key);
  ST.doc = d;
  ST.screen = 'signread';
  head('Reading it with you', esc(d.t));
  paint(
    '<div class="gquote"><span class="gqk">' + d.t + '</span><p>' + d.sub + '</p></div>' +
    '<div class="gruns" id="gruns">' +
      [['Pages', 'Reading every page'],
       ['Numbers', 'Rate, term, totals and dates'],
       ['Options', 'What&rsquo;s added, and what&rsquo;s optional'],
       ['Against what you were told', 'Comparing it with your record']]
      .map(function (r, n) {
        return '<div class="grun" data-n="' + n + '"><span class="gspin"></span>' +
          '<span class="ptxt"><b>' + r[0] + '</b><i>' + r[1] + '</i></span></div>';
      }).join('') +
    '</div>'
  );
  [0, 1, 2, 3].forEach(function (n) {
    setTimeout(function () {
      var el = $('#gruns .grun[data-n="' + n + '"]');
      if (el) el.className = 'grun done';
      if (n === 3) setTimeout(signResult, 700);
    }, 600 + n * 620);
  });
  evt('Added a document to be read', 'BEFORE SIGNING · ' + d.t.toUpperCase());
}

function signResult() {
  var d = ST.doc;
  if (!d) return;
  ST.screen = 'signresult';
  var worst = d.flags.filter(function (f) { return f[0] === 'bad'; }).length;
  head('Reading it with you', d.flags.length + ' things worth asking');

  put('reviewed', 'Document read', d.t + ' · ' + d.flags.length + ' questions', 'doc',
      worst ? worst + ' of them do not match what you were told' : '');

  paint(
    '<div class="glevel ' + (worst ? 'bad' : 'warn') + '">' +
      '<span class="glv">' + d.flags.length + ' questions</span>' +
      '<span class="gls">' + (worst
        ? worst + ' of these do not match what you told me you were shown'
        : 'None of these say do not sign. They say ask first') + '</span></div>' +

    d.flags.map(function (f) {
      return '<div class="gflag ' + f[0] + '">' +
        '<span class="gfh"><span class="gft">' + FLAG[f[0]] + '</span>' +
        '<span class="gfw">' + f[2] + '</span></span>' +
        '<b>' + f[1] + '</b><p>' + f[3] + '</p>' +
        '<span class="gask">Ask: ' + f[4] + '</span></div>';
    }).join('') +

    note('These are the parts worth a question. Whether to sign is yours to decide, and if it '
         + 'needs reading as a legal matter that&rsquo;s a lawyer&rsquo;s job, not mine.') +

    '<button class="gcta wide" data-act="record">Keep this with my record &#8594;</button>' +
    '<button class="opt ghost" data-act="sign"><span class="ptxt"><b>Read another document</b>' +
    '</span><span class="ch">&#8250;</span></button>'
  );

  evt(d.flags.length + ' questions raised from the document',
      'KEPT WITH WHAT YOU WERE SHOWN', worst ? 'amber' : 'blue');
}

/* ============================================================
   4. JOIN A PROFESSIONAL

   The invitation comes from the firm, and the consumer decides
   what to grant, item by item. What it produces is the thing
   both sides actually need: the professional gets the evidence
   that the recommendation was suitable and reportable, and the
   person gets a record of what was asked, what they gave and
   what was said back.

   The firm never sees anything the person did not grant, and
   the honest limit about a regulated firm's own retention
   duties is on the screen rather than in a footnote.
   ============================================================ */

var ASKS = [
  ['identity',   'Identity',            'Verified once, so you are not photographed again', true],
  ['income',     'Income',              'What you said, and what a document supports', true],
  ['employment', 'Employment',          'Where you work and since when', true],
  ['goal',       'What you are trying to do', 'In the words you used, not a form field', true],
  ['funds',      'Available funds',     'The amount, and whether any of it is a gift', true],
  ['history',    'Everything else in your record', 'Other decisions, other firms, other years', false],
  ['contacts',   'Your contacts',       'Not needed for this, and not asked for', false]
];

SCREEN.invite = function () {
  var i = I();
  var pro = i.pro;
  head('An invitation', 'From a firm you are working with');
  paint(
    '<div class="ginv">' +
      '<span class="givk">Invitation</span>' +
      '<div class="givp"><span class="giva">' + pro.n.split(' ').map(function (w) {
        return w[0]; }).join('') + '</span>' +
        '<span class="ptxt"><b>' + pro.n + '</b><i>' + pro.r + ' &middot; ' + pro.f + '</i>' +
        '</span></div>' +
      '<p class="givm">&ldquo;I have opened a file for you. If you join, I will only see what ' +
      'you grant me, and everything I ask for will be on the record with the reason I asked.&rdquo;</p>' +
      '<span class="givs">Sent today, 2:14 PM &middot; expires in 7 days</span>' +
    '</div>' +
    '<div class="gsec">What joining does</div>' +
    '<div class="gwhat">' +
      '<div class="gwr"><b>You choose what they see</b><p>Item by item, and you can narrow ' +
      'it later.</p></div>' +
      '<div class="gwr"><b>They stop asking you twice</b><p>What is already verified does ' +
      'not get asked for again.</p></div>' +
      '<div class="gwr"><b>The record builds itself</b><p>What was asked, what was shown and ' +
      'what was agreed, on both sides, as it happens.</p></div>' +
    '</div>' +
    '<button class="gcta wide" data-act="invreview">See what they are asking for &#8594;</button>' +
    '<button class="opt ghost" data-act="modes"><span class="ptxt"><b>Not now</b>' +
    '<i>The invitation stays open for seven days</i></span><span class="ch">&#8250;</span></button>' +
    note('Declining changes nothing and is not reported to anybody.')
  );
};

SCREEN.invreview = function () {
  var pro = I().pro;
  ST.grant = ST.grant || ASKS.filter(function (a) { return a[3]; })
                              .map(function (a) { return a[0]; });
  head('What ' + esc(pro.n.split(' ')[0]) + ' is asking for', 'Turn off anything you do not want to send');
  paint(
    '<div class="ghead"><h3>Five things, not everything.</h3>' +
    '<p>Each one carries the reason it was asked for. The two at the bottom were not ' +
    'requested, and I am showing them so you can see the difference.</p></div>' +
    ASKS.map(function (a) {
      var on = ST.grant.indexOf(a[0]) >= 0;
      if (!a[3]) {
        return '<div class="ggrant off"><span class="ptxt"><b>' + a[1] + '</b><i>' + a[2] +
          '</i></span><span class="gno">Not asked for</span></div>';
      }
      return '<button class="ggrant' + (on ? ' on' : '') + '" data-act="toggle" data-arg="' +
        a[0] + '"><span class="ptxt"><b>' + a[1] + '</b><i>' + a[2] + '</i></span>' +
        '<span class="gsw"></span></button>';
    }).join('') +
    '<button class="gcta wide" data-act="invjoin">Join, and send ' +
      '<span id="gcount">' + ST.grant.length + '</span> things &#8594;</button>' +
    note('What you decline does not travel, and the decision that you declined it is part ' +
         'of your record too.')
  );
};

function invJoin() {
  var i = I(), pro = i.pro;
  ST.connected = pro;
  ST.screen = 'invjoined';
  head('Joined', pro.f);

  ST.grant.forEach(function (k) {
    var a = ASKS.filter(function (x) { return x[0] === k; })[0];
    if (a) ST.perms.push(a[1]);
  });
  put('professional', 'Professional', pro.n + ' · ' + pro.f, 'verified',
      ST.grant.length + ' things shared, by you');

  evt('Joined a professional, on their invitation',
      ST.grant.length + ' THINGS GRANTED · ' + (ASKS.length - ST.grant.length) +
      ' WITHHELD', 'gold');

  paint(
    '<div class="glevel ok"><span class="glv">You are in</span>' +
      '<span class="gls">' + pro.n + ' can see ' + ST.grant.length + ' things, and nothing ' +
      'else</span></div>' +

    '<div class="gsec">What this now produces</div>' +
    '<div class="gwhat">' +
      '<div class="gwr"><b>For you</b><p>What was asked for, what you sent, what was ' +
      'recommended and why, each with the date it happened.</p></div>' +
      '<div class="gwr"><b>For ' + esc(pro.f) + '</b><p>The suitability evidence behind the ' +
      'recommendation, and the reporting that goes with it, built while the work happened ' +
      'rather than assembled afterwards.</p></div>' +
    '</div>' +

    '<div class="gsec">Already on the record</div>' +
    '<div class="gchain">' +
      '<div class="gcr"><span class="gcd"></span>Invitation sent by ' + esc(pro.n) +
        '<em>2:14 PM</em></div>' +
      '<div class="gcr"><span class="gcd"></span>You read what was being asked for' +
        '<em>2:31 PM</em></div>' +
      '<div class="gcr on"><span class="gcd"></span>You granted ' + ST.grant.length +
        ' of ' + ASKS.length + '<em>2:32 PM</em></div>' +
    '</div>' +

    note('Once information reaches a regulated firm, that firm may have its own legal duty ' +
         'to keep records of it. Narrowing what they can see from here does not undo what ' +
         'they are already required to hold. I would rather say that than promise you ' +
         'something I cannot deliver.') +

    '<button class="gcta wide" data-act="perms">Review what they can see &#8594;</button>' +
    '<button class="opt ghost" data-act="record"><span class="ptxt"><b>See the whole record</b>' +
    '</span><span class="ch">&#8250;</span></button>'
  );
}


/* ============================================================
   MORTGAGE DISCOVERY

   The question set is not invented. It is the list a mortgage
   brokerage in Ontario is required to establish and document,
   asked in the words a person actually uses, before a broker
   exists.

   FSRA, Mortgage Product Suitability Assessment guidance:
   employment status and stability, income type and stability,
   the property and what is already secured against it, financial
   knowledge and mortgage experience, short and long term
   financing objectives, risk tolerance, the housing timeline,
   anything that makes a person vulnerable, and prior insolvency.
   The file has to let a third party who was never involved
   re-perform the assessment.

   So this is deliberately NOT generated. A suitability record
   that a stranger has to be able to re-perform cannot come out
   of something that answers differently the second time. The
   model belongs on the explaining, the reading and the checking.
   This part stays fixed, ordered and auditable.

   THE ANSWERS PEOPLE GIVE, AND WHY THESE OPTIONS

   The goals are the categories Canadians actually chose in the
   2025 Mortgage Professionals Canada consumer survey: more space
   for a growing family (31%), a nicer home (25%), the current
   home no longer suits (24%), somewhere less expensive (10%),
   closer to friends and family (10%). Rental income sits with
   them because 72% of first time buyers called it very important.

   Every question carries "I am not sure", because it is the
   honest answer far more often than the industry admits. In a
   2026 survey of 1,000 Canadians, 68% could not say what their
   payment would be at 5%, and 58% could not recall their own
   monthly payment without looking it up. Not knowing is not a
   failure to be hidden. It is the thing a professional most
   needs to be told.
   ============================================================ */

var DISC = [
  { k: 'situation', q: 'What are you doing?',
    why: 'Everything after this changes depending on the answer.',
    a: [['buy', 'Buying a home', 'First one, or moving'],
        ['renew', 'Renewing', 'The term is ending'],
        ['refi', 'Refinancing', 'Taking equity out, or changing the mortgage'],
        ['unsure', 'I am not sure yet', 'Working out whether it is even possible']] },

  { k: 'goal', q: 'Why now?',
    why: 'A professional is required to record what you were trying to achieve, not just what '
       + 'you bought. This is that, in your words.',
    a: [['space', 'We need more space', 'A growing family'],
        ['nicer', 'A better home', 'Somewhere we would rather live'],
        ['unsuit', 'This one no longer suits us', 'It stopped working for how we live'],
        ['cheaper', 'Somewhere less expensive', 'Lowering what we spend'],
        ['family', 'Closer to family', 'Or closer to work'],
        ['income', 'Rental income', 'Part of it would be rented out'],
        ['unsure', 'I am not sure', 'Still working that out']],
    skip: function (s) { return s.situation === 'renew'; } },

  { k: 'when', q: 'When does this happen?',
    why: 'Your timeline decides what can be arranged and what has to be rushed.',
    a: [['now', 'I am looking now', 'Offers could happen any week'],
        ['soon', 'Within three months', ''],
        ['later', 'Six months or more', ''],
        ['fixed', 'A date is already fixed', 'A renewal or a closing date'],
        ['unsure', 'I am not sure', '']] },

  { k: 'work', q: 'How do you work?',
    why: 'A lender treats these very differently, and it is one of the first things you will be '
       + 'asked. Nothing here is a wrong answer.',
    a: [['ft', 'Full time, salaried', ''],
        ['hourly', 'Hourly', ''],
        ['self', 'Self employed', 'Or incorporated'],
        ['comm', 'Commission', 'Or base plus commission'],
        ['contract', 'Contract or probation', ''],
        ['multi', 'More than one job', ''],
        ['unsure', 'It is complicated', 'More than one of these']] },

  { k: 'incstable', q: 'Does what you earn change month to month?',
    why: 'Steady and variable income are proved in different ways. Knowing which you have now '
       + 'saves you being asked for the wrong documents later.',
    a: [['steady', 'No, it is the same', ''],
        ['varies', 'Yes, it moves', 'Bonus, commission, tips or overtime'],
        ['seasonal', 'It is seasonal', ''],
        ['unsure', 'I am not sure', '']] },

  { k: 'down', q: 'Where is the down payment coming from?',
    why: 'Nearly a quarter of Canadian buyers use a gift, and a gift needs a letter. Better to '
       + 'know that now than three days before closing.',
    a: [['saved', 'My own savings', ''],
        ['gift', 'A gift from family', 'Needs a letter, and we will tell you what it says'],
        ['sale', 'Selling my current home', ''],
        ['reg', 'RRSP or first home savings account', ''],
        ['mix', 'More than one of these', ''],
        ['unsure', 'I do not have it yet', 'That is still worth knowing']],
    skip: function (s) { return s.situation === 'renew'; } },

  { k: 'owed', q: 'What else are you paying every month?',
    why: 'This is the number that changes what you can borrow, more than almost anything else, '
       + 'and it usually lands lower than people expect.',
    a: [['none', 'Nothing else', ''],
        ['car', 'A vehicle payment', ''],
        ['cards', 'Credit cards or a line of credit', ''],
        ['student', 'A student loan', ''],
        ['other', 'Another property', ''],
        ['several', 'Several of these', ''],
        ['unsure', 'I would have to check', '']] },

  { k: 'matters', q: 'Which of these matters most to you?',
    why: 'This is the question that decides which mortgage actually suits you, and it is the one '
       + 'least often asked. There is no right answer, only yours.',
    a: [['payment', 'The lowest monthly payment', 'Cash flow now'],
        ['total', 'The lowest total cost', 'Even if the payment is higher'],
        ['certain', 'Certainty', 'The payment must not move'],
        ['flex', 'Flexibility', 'Paying it off faster, without a penalty'],
        ['move', 'Being able to move it', 'If we sell or move house'],
        ['unsure', 'I am not sure', 'Explain the trade-off to me']] },

  { k: 'risk', q: 'If your payment went up $375 a month, what happens?',
    why: 'That is the real average increase Canadians saw at renewal in 2026. It is a better '
       + 'question than asking you to rate your risk tolerance out of ten.',
    a: [['fine', 'We would be fine', ''],
        ['tight', 'It would be tight', 'We would cut other things'],
        ['serious', 'That would be a serious problem', ''],
        ['unsure', 'I do not know', 'I have not worked that out']] },

  { k: 'before', q: 'Have you done this before?',
    why: 'A professional is required to take your experience into account. It changes how much '
       + 'should be explained, and how.',
    a: [['first', 'This is the first time', ''],
        ['once', 'Once or twice', ''],
        ['many', 'Several times', 'I know how this works']] },
];

var DLABEL = {};   /* value -> the words the person actually chose */
DISC.forEach(function (d) { d.a.forEach(function (o) { DLABEL[d.k + ':' + o[0]] = o[1]; }); });

/* Which questions apply, given what has been answered so far. */
function discSteps() {
  return DISC.filter(function (d) { return !(d.skip && d.skip(ST.disc)); });
}

SCREEN.discover = function () {
  var steps = discSteps();
  var n = Math.min(ST.di, steps.length - 1);
  var d = steps[n];
  if (ST.di >= steps.length) { discDone(); return; }

  head('Getting to know you', 'Question ' + (n + 1) + ' of ' + steps.length);
  paint(
    '<div class="dprog" aria-hidden="true">' +
      steps.map(function (s, i) {
        return '<i class="' + (i < n ? 'done' : i === n ? 'on' : '') + '"></i>';
      }).join('') +
    '</div>' +
    '<div class="ghead"><h3>' + d.q + '</h3></div>' +
    '<div class="dopts">' +
      d.a.map(function (o) {
        var on = ST.disc[d.k] === o[0];
        return '<button class="dopt' + (on ? ' on' : '') + '" data-act="dpick" ' +
          'data-arg="' + o[0] + '"><span class="ptxt"><b>' + o[1] + '</b>' +
          (o[2] ? '<i>' + o[2] + '</i>' : '') + '</span></button>';
      }).join('') +
    '</div>' +
    '<button class="dwhy" data-act="dwhy" type="button">Why are you asking? ' +
      '<span class="dwc">' + (ST.dwhy ? '&minus;' : '+') + '</span></button>' +
    (ST.dwhy ? '<div class="dwhyb">' + d.why + '</div>' : '') +
    (n > 0 ? '<button class="opt ghost" data-act="dback"><span class="ptxt">' +
             '<b>Back</b></span><span class="ch">&#8249;</span></button>' : '')
  );
};

function discPick(v) {
  var steps = discSteps();
  var d = steps[Math.min(ST.di, steps.length - 1)];
  ST.disc[d.k] = v;

  /* "I am not sure" is a real answer and it is recorded as one. A record that
     shows what the person did not know is more useful to the professional than
     a record that quietly filled the gap. */
  var unsure = v === 'unsure';
  put(d.k, d.q.replace(/\?$/, ''), DLABEL[d.k + ':' + v],
      unsure ? 'needs' : 'told', unsure ? 'Said so plainly' : '');
  if (unsure) {
    evt('Said what they did not know', 'RECORDED AS UNKNOWN, NOT GUESSED', 'amber');
  }

  ST.di++;
  ST.dwhy = false;
  go('discover');
}

/* What the answers mean, read back before anybody is asked for a document. */
function discDone() {
  var D = ST.disc;
  var i = I();
  ST.screen = 'discdone';
  head('Here is what you told me', 'Nothing has left this phone');

  var unsure = Object.keys(D).filter(function (k) { return D[k] === 'unsure'; });

  /* The one or two things that will actually change the answer for this person. */
  var flags = [];
  if (D.down === 'gift') {
    flags.push(['A gift needs a letter',
      'The person giving it signs a short letter saying it is a gift and not a loan. Ask for it '
      + 'now rather than in the last week.']);
  }
  if (D.work === 'self' || D.work === 'comm' || D.incstable === 'varies'
      || D.incstable === 'seasonal') {
    flags.push(['Your income will be proved differently',
      'Variable and self employed income is usually averaged over two years. Expect to be asked '
      + 'for notices of assessment rather than pay stubs.']);
  }
  if (D.owed === 'car' || D.owed === 'several' || D.owed === 'cards') {
    flags.push(['What you already pay will move the number',
      'Existing payments come off what you can borrow before anything else does. It is worth '
      + 'knowing the exact figures before you are asked for them.']);
  }
  if (D.matters === 'certain' && D.risk !== 'fine') {
    flags.push(['Certainty is worth naming out loud',
      'You said the payment must not move and that an increase would hurt. Those two together '
      + 'point somewhere specific, and a professional should be told both.']);
  }
  if (D.matters === 'payment') {
    flags.push(['The lowest payment is not the lowest cost',
      'A longer term lowers the monthly payment and raises the total. Ask for both numbers, in '
      + 'dollars, on every option you are shown.']);
  }
  if (D.risk === 'serious' || D.risk === 'unsure') {
    flags.push(['Say this to the professional in these words',
      'How a payment increase would land on you is part of what suitability is judged against. '
      + 'It belongs on the record, from you.']);
  }
  if (!flags.length) {
    flags.push(['Nothing here needs fixing first',
      'What you have told me is enough to have a useful first conversation.']);
  }

  var rows = Object.keys(ST.pass).filter(function (k) {
    return DISC.some(function (d) { return d.k === k; });
  });

  paint(
    '<div class="glevel ok"><span class="glv">' + rows.length + ' answers</span>' +
      '<span class="gls">' + (unsure.length
        ? unsure.length + ' of them recorded as something you do not know yet, which is the '
          + 'honest answer'
        : 'Enough to start a real conversation') + '</span></div>' +

    '<div class="gsec">What you told me</div>' +
    '<div class="drecap">' + rows.map(function (k) {
      var p = ST.pass[k];
      return '<div class="drow' + (p.status === 'needs' ? ' un' : '') + '">' +
        '<span class="drk">' + p.label + '</span>' +
        '<span class="drv">' + p.value + '</span></div>';
    }).join('') + '</div>' +

    '<div class="gsec">What this means for you</div>' +
    flags.map(function (f) {
      return '<div class="gfind"><b>' + f[0] + '</b><p>' + f[1] + '</p></div>';
    }).join('') +

    note('This is not advice about which mortgage to take. It is what you said, written down '
       + 'while it is fresh, so the person advising you starts from your situation rather than '
       + 'from a blank form.') +

    '<button class="gcta wide" data-act="prepare">Show me what to have ready &#8594;</button>' +
    '<button class="opt ghost" data-act="dredo"><span class="ptxt"><b>Change an answer</b>' +
    '</span><span class="ch">&#8250;</span></button>'
  );

  evt('Discovery completed by the person',
      rows.length + ' ANSWERS · BEFORE A PROFESSIONAL EXISTS', 'gold');
}


/* ============================================================
   THE CONVERSATION

   This replaces a menu. The old opening screen offered four
   cards called "Know before you send", "Know before you look"
   and "Know before you sign", which is a filing system, not a
   thing a person says. Nobody arrives thinking "I would like to
   know before I look."

   People arrive mid-sentence. "I'm renewing." "They want the
   money today." "I don't understand what I signed." So the
   phone opens by asking, and then it actually talks: it reacts
   to what was said, tells the person something they did not
   know, and asks the next question because of their answer
   rather than because it was next on a list.

   THREE RULES THIS FILE OBEYS

   1. Every reaction must be worth reading. Never "Got it." A
      person who has just typed something private deserves a
      sentence back that makes them feel understood and slightly
      better informed than they were.

   2. Every question exists because of the answer before it. A
      renewal is not asked about a down payment.

   3. Suggested replies are shortcuts, never the only way in.
      The input is always live, and typing something unexpected
      is a first class answer.

   The facts inside the reactions are the survey findings in
   MORTGAGE-DISCOVERY.md. They are what make the conversation
   feel like it knows something, rather than like a form that
   learned to say hello.
   ============================================================ */

var NODE = {};

/* ---------------------------------------------------------------------

   TURN ECONOMY

   Every turn has to move something. The previous version opened with
   "Is now a bad time?" and gated the money questions behind "Would it
   be unreasonable to ask?" Both are good negotiation technique and both
   were wrong here: two turns that delivered nothing.

   Intercom's own guidance for Fin is answer first and skip the
   qualification gatekeeping, because people prefer help to being
   screened. Current chat UX research says the same: most people decide
   within five seconds, so front-load the usefulness and never open with
   a long welcome.

   So no-orientation moved out of the questions and into the places it
   costs nothing:

     - the reply labels, where "No, show me" is one tap either way
     - the close, where "Anything I've got wrong?" beats "Is that right?"
     - a way out visible on every screen, rather than asked for up front

   And the accusation audit moved inside the question line. "Nosy one:"
   is three words and does the same work as a whole turn asking
   permission.

   Reactions are two bubbles maximum. Three is a lecture.
   --------------------------------------------------------------------- */

NODE.open = {
  ask: '<p>Hello, {who}. Tell me what&rsquo;s going on and I&rsquo;ll tell you what to watch '
     + 'for.</p>'
     + '<p class="gm">However it comes out. None of this goes to anyone.</p>',
  replies: [
    ['renew', 'Renewing my mortgage'],
    ['buy',   'Buying a home'],
    ['money', 'Someone wants money from me'],
    ['doc',   'I don&rsquo;t understand a document']
  ],
  store: ['doing', 'What&rsquo;s going on'],
  react: {
    renew: ['<p>Renewing. Good, you&rsquo;re early.</p>',
            '<p>Most people open the letter three weeks out and sign it. You&rsquo;ve got room '
            + 'to look.</p>'],
    buy:   ['<p>Buying. Best time to talk, before there&rsquo;s a house you&rsquo;ve fallen '
            + 'for.</p>'],
    money: ['<p>Then nothing moves till we&rsquo;ve looked at it.</p>',
            '<p>Most of what goes wrong here goes wrong because someone felt rushed.</p>'],
    doc:   ['<p>Send it over, we&rsquo;ll read it together.</p>',
            '<p>Right order. Much harder to unpick after you&rsquo;ve signed.</p>']
  },
  go: { renew: 'r_when', buy: 'b_when', money: '@send', doc: '@sign' }
};

/* The read-back's own replies. "That's right" is the target response, and
   "Not quite" has to be as easy to reach as agreeing with us. */
NODE.readback = {
  ask: '',
  replies: [['right', 'That&rsquo;s right'], ['wrong', 'Not quite']],
  go: { right: '@ready', wrong: '@redo' },
  react: {
    right: ['<p>Good. That&rsquo;s the bit most people never get written down.</p>'],
    /* Say what actually happens. It starts over rather than editing one
       answer, and pretending otherwise is a small lie the person catches
       one second later. */
    wrong: ['<p>Then let&rsquo;s go again. It&rsquo;s quick.</p>']
  }
};

/* ------------------------------------------------------------- renewal */
NODE.r_when = {
  ask: '<p>When&rsquo;s your term up?</p>',
  replies: [['soon', 'Within three months'], ['mid', 'Three to six months'],
            ['late', 'Later than that'], ['dunno', 'I&rsquo;d have to check']],
  store: ['term', 'Term up'],
  react: {
    soon:  ['<p>That&rsquo;s the sweet spot.</p>',
            '<p>Lenders hold a rate up to 120 days, so you can shop without a deadline on '
            + 'you.</p>'],
    mid:   ['<p>Plenty of time. Rates you&rsquo;re quoted now will still mean something when '
            + 'you sign.</p>'],
    late:  ['<p>Early. Nothing has to be decided today, which is the best way to think.</p>'],
    dunno: ['<p>Sounds like nobody&rsquo;s put that where you&rsquo;d find it.</p>',
            '<p>It&rsquo;s on the renewal letter. Adding it to your list.</p>']
  },
  next: 'r_rate'
};

NODE.r_rate = {
  ask: '<p>Do you know the rate they&rsquo;ve offered?</p>',
  replies: [['have', 'Yes, it&rsquo;s in the letter'], ['none', 'Nothing&rsquo;s come yet'],
            ['dunno', 'I&rsquo;d have to look']],
  store: ['offer', 'The offer'],
  react: {
    have:  ['<p>Then you&rsquo;ve got something to compare against. That&rsquo;s the starting '
            + 'point.</p>'],
    none:  ['<p>They land four to six months out. If you&rsquo;re inside that, ring and '
            + 'ask.</p>'],
    dunno: ['<p>Sounds like nobody&rsquo;s made that easy to find.</p>',
            '<p>59% of Canadians couldn&rsquo;t name their own rate. You&rsquo;re in the '
            + 'majority. It&rsquo;s on the letter.</p>']
  },
  next: 'r_changed'
};

NODE.r_changed = {
  ask: '<p>Anything changed since you last signed?</p>' +
       '<p class="gm">Income, work, someone moving in or out.</p>',
  replies: [['same', 'Nothing&rsquo;s changed'], ['income', 'My income changed'],
            ['work', 'My work changed'], ['life', 'Something at home changed'],
            ['dunno', 'Not sure what counts']],
  store: ['changed', 'Since you signed'],
  react: {
    same:   ['<p>Simpler, then. A straight renewal with the same lender usually doesn&rsquo;t '
             + 're-check your income.</p>'],
    income: ['<p>Good to know.</p>',
             '<p>Stay put and nobody looks again. Move lenders and they check today&rsquo;s '
             + 'income, not the old one.</p>'],
    work:   ['<p>Worth raising now, not in week three.</p>',
             '<p>Self employed, commission, contract. All fine, just different paperwork.</p>'],
    life:   ['<p>Counts. Who&rsquo;s on the mortgage and who lives there are two questions.</p>',
             '<p>Either one moving changes your options.</p>'],
    dunno:  ['<p>Fair question. Anything that changed what comes in, what goes out, or whose '
             + 'name&rsquo;s on it.</p>']
  },
  next: 'r_shock'
};

/* The accusation audit lives in the question, not in a turn of its own.
   "Nosy one" does the same work as asking permission, and costs nothing. */
NODE.r_shock = {
  ask: '<p>Nosy one. If the payment went up $375 a month, what happens?</p>' +
       '<p class="gm">That&rsquo;s what Canadians actually saw at renewal this year.</p>',
  replies: [['fine', 'We&rsquo;d be fine'], ['tight', 'It&rsquo;d be tight'],
            ['bad', 'That would really hurt'], ['skip', 'Rather not say']],
  store: ['shock', 'If it went up $375'],
  react: {
    fine:  ['<p>That gives you room. Worth saying, so nobody assumes otherwise.</p>'],
    tight: ['<p>Sounds like the payment is the part that actually worries you.</p>',
            '<p>Say it in those words. Not &ldquo;I want a good rate&rdquo;, but '
            + '&ldquo;an increase that size would hurt&rdquo;.</p>'],
    bad:   ['<p>Sounds like that wasn&rsquo;t easy to say.</p>',
            '<p>59% of Canadians said the same. It&rsquo;s also the thing that most changes '
            + 'what should be put in front of you.</p>'],
    skip:  ['<p>Understood. Skipping it.</p>']
  },
  next: 'r_matters'
};

NODE.r_matters = {
  ask: '<p>Last one. What matters most?</p>',
  replies: [['payment', 'Lowest monthly payment'], ['total', 'Lowest total cost'],
            ['certain', 'The payment can&rsquo;t move'], ['flex', 'Paying it off early'],
            ['dunno', 'What&rsquo;s the trade?']],
  store: ['matters', 'What matters most'],
  react: {
    payment: ['<p>Cash flow now. Fair, and common.</p>',
              '<p>Watch the term. Longer term, smaller payment, bigger total. Ask for both in '
              + 'dollars.</p>'],
    total:   ['<p>That&rsquo;s the number almost nobody asks for.</p>',
              '<p>Total cost of borrowing, full term, in dollars. Only fair way to compare two '
              + 'offers.</p>'],
    certain: ['<p>Seven in ten Canadians land there too.</p>',
              '<p>Ask what it costs to break early. Certainty going in can cost you coming '
              + 'out.</p>'],
    flex:    ['<p>Then prepayment terms matter more to you than the rate.</p>',
              '<p>People who broke early last year and paid a penalty paid $6,732 on '
              + 'average.</p>'],
    dunno:   ['<p>Seems like nobody&rsquo;s laid the trade out for you.</p>',
              '<p>Lower payment costs more overall. Certainty costs more than gambling. '
              + 'Flexibility costs more than being locked in.</p>']
  },
  next: '@done'
};

/* -------------------------------------------------------------- buying */
NODE.b_when = {
  ask: '<p>How far along are you?</p>',
  replies: [['looking', 'Looking at places'], ['soon', 'A few months off'],
            ['early', 'Working out if we can'], ['offer', 'There&rsquo;s an offer in']],
  store: ['stage', 'How far along'],
  react: {
    looking: ['<p>Then know your number before you fall for a house, not after.</p>'],
    soon:    ['<p>Good window. This is where getting organised changes what you end up '
              + 'with.</p>'],
    early:   ['<p>Sounds like the hardest question to ask out loud.</p>',
              '<p>It&rsquo;s the right one to start with. Nothing here commits you.</p>'],
    offer:   ['<p>Right, let&rsquo;s be quick.</p>',
              '<p>Tell me what you&rsquo;ve got and I&rsquo;ll tell you what&rsquo;s '
              + 'missing.</p>']
  },
  next: 'b_work'
};

NODE.b_work = {
  ask: '<p>How do you work?</p>',
  replies: [['ft', 'Full time, salaried'], ['self', 'Self employed'],
            ['comm', 'Commission or bonus'], ['contract', 'Contract or probation'],
            ['multi', 'More than one job']],
  store: ['work', 'How you work'],
  react: {
    ft:       ['<p>Easiest to prove. A letter and two pay stubs and that part&rsquo;s '
               + 'done.</p>'],
    self:     ['<p>Provable, just proved differently.</p>',
               '<p>Two years of notices of assessment instead of pay stubs, and they work from '
               + 'the figure after expenses.</p>'],
    comm:     ['<p>Usually averaged over two years.</p>',
               '<p>If this year beat last, raise it early. There are ways to have it counted '
               + 'properly.</p>'],
    contract: ['<p>Good to say up front. Not a blocker.</p>',
               '<p>It changes which lenders are comfortable. A matching question, not a '
               + 'qualifying one.</p>'],
    multi:    ['<p>All of it can count.</p>',
               '<p>Needs a longer history than one job would. Start gathering it now.</p>']
  },
  next: 'b_down'
};

NODE.b_down = {
  ask: '<p>Nosy one. Where&rsquo;s the down payment coming from?</p>',
  replies: [['saved', 'Saved it'], ['gift', 'A gift from family'],
            ['sale', 'Selling where we live'], ['reg', 'RRSP or FHSA'],
            ['none', 'Haven&rsquo;t got it yet']],
  store: ['down', 'Down payment'],
  react: {
    saved: ['<p>That took doing. Also the simplest to show.</p>',
            '<p>They want to see it sit still about three months, so try not to move it between '
            + 'accounts.</p>'],
    gift:  ['<p>Almost a quarter of Canadian buyers had help. Median $30,000. Ordinary, not '
            + 'unusual.</p>',
            '<p>Ask for the gift letter this week. A missing one holds up more closings than '
            + 'anything else on this list.</p>'],
    sale:  ['<p>Then the two dates have to line up. Far easier to plan before either is '
            + 'fixed.</p>'],
    reg:   ['<p>Sensible. It&rsquo;s what they&rsquo;re for.</p>',
            '<p>Both have withdrawal rules and timing. Check before you count on the money '
            + 'landing on a day.</p>'],
    none:  ['<p>Sounds like that&rsquo;s the bit actually holding things up.</p>',
            '<p>Canadians take about four and a half years to save one. You&rsquo;re not '
            + 'behind.</p>']
  },
  next: 'b_owed'
};

NODE.b_owed = {
  ask: '<p>What else goes out every month?</p>',
  replies: [['none', 'Nothing'], ['car', 'A car payment'],
            ['cards', 'Cards or a line of credit'], ['student', 'A student loan'],
            ['several', 'A few of those']],
  store: ['owed', 'Going out monthly'],
  react: {
    none:    ['<p>That helps you more than almost anything else on this list.</p>'],
    car:     ['<p>That&rsquo;s the one that surprises people.</p>',
              '<p>It comes off what you can borrow, and it moves the house price more than the '
              + 'payment makes it look.</p>'],
    cards:   ['<p>Get the exact balances rather than guessing.</p>',
              '<p>A line of credit is often counted at a payment well above what you actually '
              + 'pay.</p>'],
    student: ['<p>Counted, but more gently than people fear. Have the monthly figure '
              + 'handy.</p>'],
    several: ['<p>Then their total sets your budget before the house price does.</p>',
              '<p>Worth adding up properly one evening.</p>']
  },
  next: 'b_shock'
};

NODE.b_shock = {
  ask: '<p>Last one. Once you&rsquo;re in, if the payment went up $375 a month, what '
     + 'happens?</p>'
     + '<p class="gm">That&rsquo;s what Canadians renewing actually saw this year.</p>',
  replies: NODE.r_shock.replies,
  store: NODE.r_shock.store,
  react: {
    fine:  ['<p>That gives you room. Worth saying, so nobody assumes otherwise.</p>'],
    tight: ['<p>Sounds like you already know their number will be bigger than yours.</p>',
            '<p>Approved for and comfortable with are two numbers. Only one is yours.</p>'],
    bad:   ['<p>Sounds like that wasn&rsquo;t easy to put into words.</p>',
            '<p>It points at buying well under what you&rsquo;re approved for. Say it in those '
            + 'words to whoever advises you.</p>'],
    skip:  ['<p>Understood. Skipping it.</p>']
  },
  next: 'r_matters'
};

/* ============================================================
   Running it
   ============================================================ */

function rchips(list) {
  return '<div class="gchips">' + list.map(function (c) {
    /* The value is escaped. The label is not, because we author it and it
       carries typographic entities like a proper apostrophe. */
    return '<button class="gchip" data-reply="' + esc(c[0]) + '">' + c[1] + '</button>';
  }).join('') + '</div>';
}

function fill(h) {
  return String(h).replace(/\{who\}/g, I().who);
}

/* Play a node: whatever it has to say, then the question, then the replies. */
/* Every conversation gets a number. Anything queued by an older one is dropped
   when it comes due, so restarting, switching decision or arriving from the
   landing can never leave a half-finished thought from the previous
   conversation landing in the middle of this one. */
var GEN = 0;
function turn(gen, fn) {
  return function () { if (gen === GEN) fn(); };
}

function runNode(key) {
  var n = NODE[key];
  if (!n) { convoDone(); return; }
  var g = GEN;
  ST.node = key;
  ST.screen = 'talk';
  head('4ormIQ', I().sub);
  thread();

  var t = 0;
  (n.say || []).forEach(function (row) {
    var ms = row[1] || 900;
    setTimeout(turn(g, function () { think(fill(row[0]), null, ms); }), t);
    t += ms + 320;
  });
  setTimeout(turn(g, function () {
    think(fill(n.ask), null, 820);
    setTimeout(turn(g, function () {
      if (n.replies) {
        var th = $('#gthread');
        if (th && th.lastChild) {
          th.lastChild.innerHTML += rchips(n.replies);
          toBottom();
        }
      }
      focusAsk();
    }), 860);
  }), t);
}

/* An answer arrives, by tap or typed. React to it, then move on. */
function reply(v, typedLabel) {
  var n = NODE[ST.node];
  if (!n) return;

  var ours = !typedLabel;
  var lbl = typedLabel ||
    (n.replies.filter(function (r) { return r[0] === v; })[0] || [, v])[1];

  var th = $('#gthread');
  if (th) $$('.gchips', th).forEach(function (c) { c.remove(); });
  /* A label we wrote already carries its own typography. Text the person typed
     is escaped, because it is theirs and could be anything. */
  if (ours) { push('me', lbl); } else { me(lbl); }

  if (n.store) {
    var unsure = /dunno|none$/.test(v) && v !== 'none';
    put(n.store[0], n.store[1], lbl, unsure ? 'needs' : 'told');
    evt(n.store[1] + ' recorded', unsure ? 'SAID PLAINLY THEY DO NOT KNOW YET'
                                         : 'IN THEIR OWN WORDS', unsure ? 'amber' : 'blue');
  }

  var react = (n.react && n.react[v]) || null;
  var g = GEN, t = 0;
  if (react) {
    react.forEach(function (h) {
      var ms = Math.min(2000, 700 + h.length * 3);
      setTimeout(turn(g, function () { think(fill(h), null, ms); }), t);
      t += ms + 340;
    });
  }

  var dest = (n.go && n.go[v]) || n.next || '@done';
  setTimeout(turn(g, function () {
    /* Handing off to a screen ends this conversation. Bumping the number stops
       anything it still had queued from repainting over the screen. */
    if (dest === '@ready') { GEN++; go('prepare'); return; }
    if (dest === '@redo')  { GEN++; boot(ST.ind); return; }
    if (dest === '@send') { GEN++; ST.mode = 'send'; go('send'); return; }
    if (dest === '@sign') { GEN++; ST.mode = 'sign'; go('sign'); return; }
    if (dest === '@done') { convoDone(); return; }
    runNode(dest);
  }), t + 520);
}

/* Typed text, matched against what this question is actually asking. */
var TYPED = {
  doing:   [[/renew|renewal|term.*end|coming up/i, 'renew'],
            [/buy|buying|purchas|first home|house|condo/i, 'buy'],
            [/send|money|wire|transfer|invest|scam|suspicious|asking me/i, 'money'],
            [/document|contract|paper|sign|read|commitment|bill of sale/i, 'doc']],
  term:    [[/week|month|soon|now|[1-3] month/i, 'soon'], [/four|five|six|4|5|6/i, 'mid'],
            [/year|later|next/i, 'late']],
  offer:   [[/yes|have|got|letter|received/i, 'have'], [/not|no|haven|nothing/i, 'none']],
  changed: [[/noth|no |same|nope/i, 'same'], [/income|earn|salary|raise|less|more/i, 'income'],
            [/job|work|quit|laid|self|contract/i, 'work'],
            [/baby|child|partner|married|separat|divorc|moved/i, 'life']],
  shock:   [[/fine|ok|fine|no problem|manage/i, 'fine'], [/tight|hard|difficult|squeeze/i, 'tight'],
            [/serious|cannot|can't|couldn|lose|no way|disaster/i, 'bad']],
  matters: [[/payment|monthly|afford/i, 'payment'], [/total|overall|cost|cheapest/i, 'total'],
            [/certain|fixed|not move|stable|safe/i, 'certain'],
            [/flex|early|pay.*off|lump/i, 'flex']],
  work:    [[/self|own business|incorporat|freelanc/i, 'self'],
            [/commission|bonus|tips/i, 'comm'], [/contract|probation|temp/i, 'contract'],
            [/two job|second job|multiple/i, 'multi'], [/salary|full time|salaried|steady/i, 'ft']],
  down:    [[/gift|parent|mom|dad|family|help/i, 'gift'], [/sav|own money/i, 'saved'],
            [/sell|selling|current home/i, 'sale'], [/rrsp|fhsa|first home savings/i, 'reg'],
            [/not|none|do not have|dont have/i, 'none']],
  owed:    [[/noth|none|no debt/i, 'none'], [/car|truck|vehicle|lease/i, 'car'],
            [/card|credit|line of credit|loc/i, 'cards'], [/student|osap|loan/i, 'student'],
            [/several|few|couple|all of/i, 'several']],
  stage:   [[/look|view|see/i, 'looking'], [/offer|bid|accepted/i, 'offer'],
            [/month|soon/i, 'soon'], [/if we can|afford|early|think/i, 'early']]
};

/* Read a typed answer against the question that was actually asked. */
function readTyped(text) {
  var n = NODE[ST.node];
  if (!n || !n.store) return null;
  var pats = TYPED[n.store[0]];
  if (!pats) return null;
  for (var i = 0; i < pats.length; i++) {
    if (pats[i][0].test(text)) return pats[i][1];
  }
  return null;
}

/* The read-back. Not a summary: what it means, and what to do next. */
function convoDone() {
  ST.screen = 'convodone';
  var g = GEN;
  var D = ST.pass;
  var got = function (k) { return D[k] && D[k].value; };
  head('Where that leaves you', 'Nothing has left this phone');
  thread();

  var acts = [];
  if (got('down') && /gift/i.test(got('down'))) {
    acts.push('Ask for the gift letter this week. One page, says it&rsquo;s a gift and not a '
            + 'loan.');
  }
  if (got('offer') && /look|check/i.test(got('offer'))) {
    acts.push('Find your current rate and the offer. Both on the letter, or one phone call '
            + 'away.');
  }
  if (got('shock') && /tight|serious|not worked/i.test(got('shock'))) {
    acts.push('Tell whoever advises you what a $375 increase would do, in the words you used '
            + 'here. It changes what they should recommend.');
  }
  if (got('owed') && !/nothing/i.test(got('owed'))) {
    acts.push('Add up everything else going out each month, to the dollar.');
  }
  if (got('matters')) {
    acts.push('On every option, ask for the total cost over the full term in dollars. Not just '
            + 'the payment.');
  }
  if (!acts.length) {
    acts.push('Nothing&rsquo;s blocking you. Next useful step is talking to someone with this '
            + 'in front of them.');
  }

  var rows = Object.keys(D).filter(function (k) { return D[k].label; });

  /* The buttons wait for the last thing said, rather than racing it. A fixed
     delay put them on a typing indicator that was then removed. */
  var after = thinkSeq([
    ['<p>Let me make sure I&rsquo;ve got this right.</p>', null, 720],
    ['<div class="gsec">What you told me</div><div class="drecap">' +
      rows.map(function (k) {
        return '<div class="drow' + (D[k].status === 'needs' ? ' un' : '') + '">' +
          '<span class="drk">' + D[k].label + '</span>' +
          '<span class="drv">' + D[k].value + '</span></div>';
      }).join('') + '</div>', null, 1000],
    ['<div class="gsec">What I&rsquo;d do next</div><ol class="gdo">' +
      acts.map(function (a) { return '<li>' + a + '</li>'; }).join('') + '</ol>' +
     '<p class="gm">None of this tells you which mortgage to take. It&rsquo;s your situation in '
     + 'your words, written down while it&rsquo;s fresh, so whoever advises you starts from you '
     + 'and not from a blank form.</p>'
     + '<p>Anything I&rsquo;ve got wrong?</p>', null, 1200]
  ]);

  setTimeout(turn(g, function () {
    var th = $('#gthread');
    if (th && th.lastChild) {
      th.lastChild.innerHTML +=
        rchips([['right', 'That&rsquo;s right'], ['wrong', 'Not quite']]) +
        '<div class="gacts">' +
        '<button class="gcta wide" data-act="prepare">No, show me what I&rsquo;ll be asked for ' +
        '&#8594;</button>' +
        '<button class="gchip" data-act="invite">A professional has invited me</button>' +
        '</div>';
      toBottom();
    }
  }), after + 260);

  ST.node = 'readback';
  evt('Discovery finished by the person', rows.length + ' ANSWERS · NO PROFESSIONAL INVOLVED YET',
      'gold');
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
  /* Taking the example straight from the opening screen has to reach the same
     place as choosing a goal first. Without this it skipped the read-back and
     the three questions entirely, which is what made the phone feel broken. */
  example: function () {
    if (!ST.opened) {
      ST.opened = true;
      ST.thread = [];
      thread();
    }
    ask(I().ex);
  },
  'Use the example': function () { ACT.example(); },

  /* The four things, and the way back to them. */
  modes: function () { ST.mode = ''; go('modes'); },
  restart: function () { boot(ST.ind); },
  mode: function (arg) {
    ST.mode = arg;
    if (arg === 'look') { go('look'); return; }
    go(arg);
  },
  lookpick: function (arg) {
    /* Picking the decision here is the same act as picking it on the rail
       outside the phone, so it goes through the same door.

       Mortgage runs the real discovery. The others still open the goal screen
       until their question sets are written, because a half-built discovery is
       worse than none. */
    switchTo(arg, arg === 'mortgage' ? 'discover' : 'goals');
  },
  discover: function () { go('discover'); },
  dpick:   function (arg) { discPick(arg); },
  dwhy:    function () { ST.dwhy = !ST.dwhy; go('discover'); },
  dback:   function () { if (ST.di > 0) { ST.di--; ST.dwhy = false; } go('discover'); },
  dredo:   function () { ST.di = 0; ST.dwhy = false; go('discover'); },
  sendrun:  function (arg) { sendRun(arg); },
  send:     function () { go('send'); },
  sign:     function () { go('sign'); },
  signpick: function (arg) { signRead(arg); },
  invite:   function () { go('invite'); },
  invreview: function () { go('invreview'); },
  invjoin:  invJoin,
  toggle: function (arg) {
    var n = ST.grant.indexOf(arg);
    if (n >= 0) { ST.grant.splice(n, 1); } else { ST.grant.push(arg); }
    go('invreview');
  },
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
function boot(ind, screen) {
  GEN++;
  ST = fresh(ind);

  /* 4ormIQ on the landing can hand over an intent as well as a decision.
     "Send an investment" is money about to leave, so it opens the check on
     that case rather than the four things. The person already told us which
     door they wanted; making them pick it again would be rude. */
  var intent = '';
  try { intent = sessionStorage.getItem('4orm.intent') || ''; } catch (e) {}
  /* Whatever the phone opens on, the pill outside it has to agree. */
  if (intent) { markInd(ind); }
  if (!screen && intent === 'invest') {
    try { sessionStorage.removeItem('4orm.intent'); } catch (e) {}
    ST.mode = 'send';
    sendRun('invest');
    return;
  }
  if (!screen && intent === 'decide') {
    try { sessionStorage.removeItem('4orm.intent'); } catch (e) {}
    var said = '';
    try { said = sessionStorage.getItem('4orm.said') || ''; } catch (e) {}
    ST.thread = [];
    ST.opened = true;
    /* They already said what they are doing on the landing. Asking again would
       be the rudest possible opening, so the phone skips its own first
       question and reacts to what they said out there. */
    if (said && NODE.open.go[said]) {
      ST.node = 'open';
      setTimeout(function () {
        reply(said, (NODE.open.replies.filter(function (r) {
          return r[0] === said; })[0] || [, ''])[1]);
      }, 260);
      thread();
      head('4ormIQ', I().sub);
      return;
    }
    go('open');
    return;
  }
  go(screen || 'open');
}

/* `screen` is what "Know before you look" passes, so picking a decision inside
   the phone lands on the goal screen rather than back at the four things. */
function markInd(ind) {
  $$('[data-ind]').forEach(function (b) {
    b.classList.toggle('on', b.getAttribute('data-ind') === ind);
  });
  var pip = $('#inds .pip'), on = $('#inds button.on');
  if (pip && on) {
    pip.style.width = on.offsetWidth + 'px';
    pip.style.transform = 'translateX(' + (on.offsetLeft - 5) + 'px)';
  }
}

function switchTo(ind, screen) {
  markInd(ind);
  boot(ind, screen);
}

document.addEventListener('click', function (e) {
  if (!e.target.closest) return;

  var pick = e.target.closest('[data-ind]');
  if (pick) {
    switchTo(pick.getAttribute('data-ind'));
    return;
  }
  var rep = e.target.closest('[data-reply]');
  if (rep) { reply(rep.getAttribute('data-reply')); return; }

  var chipEl = e.target.closest('[data-ask]');
  if (chipEl) {
    var q = chipEl.getAttribute('data-ask');
    /* Two chips are navigation rather than conversation. */
    if (q === 'Show me mortgage') { switchTo('mortgage'); return; }
    if (q === 'Show me auto')     { switchTo('auto');     return; }
    /* Checking who you are dealing with is a real page, not an answer in a
       thread. Send them to the registers. */
    if (q === 'Take me to the checks') { window.location.href = '/check-a-firm'; return; }
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
  var sf = e.target.closest('#sendform');
  if (sf) {
    e.preventDefault();
    var ta = $('#sendinput');
    var v = ta ? ta.value.trim() : '';
    if (!v) return;
    sendRun(null, v);
    return;
  }
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

  /* The name and the intent both arrive after this file has already painted a
     screen, because 4ormIQ asks for them on the landing. Re-open with them the
     first time the phone is actually picked up.

     The intent has to be checked here rather than relying on the industry
     button being pressed, because picking "Buy a home" leaves the industry
     exactly where it already was and no button ever moves. */
  (function adoptName(){
    var applied = '';
    function refresh(){
      var intent = '';
      try { intent = sessionStorage.getItem('4orm.intent') || ''; } catch (e) {}
      var given = (window.FourmWho && window.FourmWho.name && window.FourmWho.name()) || '';
      if (intent) {
        applied = given;
        var want = '';
        try { want = sessionStorage.getItem('4orm.ind') || ''; } catch (e) {}
        boot(want || (ST && ST.ind) || 'mortgage');
        return;
      }
      if (!given || given === applied) return;
      applied = given;
      if (ST) boot(ST.ind);
    }
    window.addEventListener('hashchange', function(){ setTimeout(refresh, 40); });
    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('[data-go="you"]')) setTimeout(refresh, 40);
    });
    setTimeout(refresh, 400);
  })();
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
