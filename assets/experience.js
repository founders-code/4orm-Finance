/* ============================================================
   4orm  the product experience
   One transaction, three views. The phone is the product, not
   a screenshot of it. Everything below is synthetic.
   ============================================================ */
(function () {
'use strict';

var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var el = function (t, c, h) { var n = document.createElement(t); if (c) n.className = c;
  if (h != null) n.innerHTML = h; return n; };

var ARROW = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';
var CHEV  = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';


/* ---------------- industries ---------------- */
var IND = {
  mortgage: {
    label: 'Mortgage', first: 'Buy a home',
    goals: ['Buy a home', 'Refinance', 'Renew my mortgage', 'Understand an offer'],
    q2: 'When are you hoping to buy?',
    timing: ['0 to 3 months', '3 to 6 months', '6 to 12 months', 'Just exploring'],
    pro: 'mortgage professional', proName: 'Alex Chen', proInit: 'AC',
    proFirm: 'Northbridge Mortgage Group', subject: 'mortgage application',
    fields: [['Purchase price', '$620,000'], ['Down payment', '$124,000'], ['Term', '5 year fixed']],
    tx: 'MTG-2026-0417'
  },
  auto: {
    label: 'Auto', first: 'Finance a vehicle',
    goals: ['Finance a vehicle', 'Lease a vehicle', 'Refinance my loan', 'Understand an offer'],
    q2: 'When are you hoping to buy?',
    timing: ['This month', '1 to 3 months', '3 to 6 months', 'Just exploring'],
    pro: 'finance manager', proName: 'Dana Whitfield', proInit: 'DW',
    proFirm: 'Rideau Motors', subject: 'finance application',
    fields: [['Vehicle price', '$54,800'], ['Down payment', '$8,000'], ['Term', '72 months']],
    tx: 'AUT-2026-0912'
  },
  insurance: {
    label: 'Insurance', first: 'Insure a property',
    goals: ['Insure a property', 'Insure a vehicle', 'Review my coverage', 'Understand a renewal'],
    q2: 'When does cover need to start?',
    timing: ['Immediately', 'Within 30 days', '1 to 3 months', 'Just comparing'],
    pro: 'insurance broker', proName: 'Priya Raman', proInit: 'PR',
    proFirm: 'Kettle Valley Insurance', subject: 'application for cover',
    fields: [['Sum insured', '$740,000'], ['Deductible', '$1,000'], ['Term', '12 months']],
    tx: 'INS-2026-0338'
  },
  lending: {
    label: 'Lending', first: 'Borrow for a project',
    goals: ['Borrow for a project', 'Consolidate debt', 'Open a line of credit', 'Understand an offer'],
    q2: 'When do you need the funds?',
    timing: ['This month', '1 to 3 months', '3 to 6 months', 'Just exploring'],
    pro: 'lending adviser', proName: 'Marcus Hale', proInit: 'MH',
    proFirm: 'Bow River Credit Union', subject: 'credit application',
    fields: [['Amount requested', '$45,000'], ['Purpose', 'Home renovation'], ['Term', '60 months']],
    tx: 'LND-2026-0574'
  }
};
function I() { return IND[S.industry] || IND.mortgage; }

var S = {
  industry: 'mortgage',
  view: 'personal',
  step: 0,
  goal: null, timing: null,
  identity: false, income: false, financial: false, docs: 0,
  readiness: 12,
  events: [],
  shared: false,
  changed: false,
  alertOpen: false,
  resolved: null,
  packOpen: false
};

var VIEWSUB = {
  personal:     '<b>Understand it.</b> Pick a transaction, then use the phone.',
  professional: '<b>Prove it.</b> The same file, from the broker&rsquo;s side.',
  regulator:    '<b>Reconstruct it.</b> Name a date and rebuild the transaction.'
};

/* ---------------- evidence events ---------------- */
function addEvent(text, stamp, gold) {
  S.events.unshift({ t: text, s: stamp, g: !!gold });
  drawLines();
}

/* ---------------- the lines behind the phone ---------------- */
var LINE_DEFS = [
  'M40,300 C140,250 180,180 250,150', 'M40,420 C150,410 200,330 265,300',
  'M40,540 C150,560 210,480 268,450', 'M480,300 C380,250 340,180 270,150',
  'M480,430 C390,420 330,350 272,320', 'M480,560 C380,570 320,500 268,470',
  'M60,180 C160,120 200,90 258,110', 'M460,660 C370,650 310,600 265,560'
];

function buildLines() {
  var svg = $('#lines');
  if (!svg) return;
  var out = '';
  LINE_DEFS.forEach(function (d, i) {
    out += '<path d="' + d + '" data-i="' + i + '"/>';
  });
  LINE_DEFS.forEach(function (d, i) {
    var m = d.match(/M([\d.]+),([\d.]+)/);
    out += '<circle cx="' + m[1] + '" cy="' + m[2] + '" r="3.2" data-i="' + i + '"/>';
  });
  svg.innerHTML = out;
  $$('#lines path').forEach(function (p) {
    var L = p.getTotalLength();
    p.style.setProperty('--len', L);
  });
}

function drawLines() {
  var n = Math.min(S.events.length, LINE_DEFS.length);
  $$('#lines path').forEach(function (p, i) {
    var on = i < n;
    p.classList.toggle('on', on);
    p.classList.toggle('gold', on && S.events[S.events.length - 1 - i] && S.events[S.events.length - 1 - i].g);
  });
  $$('#lines circle').forEach(function (c, i) {
    var on = i < n;
    c.classList.toggle('on', on);
    c.classList.toggle('gold', on && S.events[S.events.length - 1 - i] && S.events[S.events.length - 1 - i].g);
  });
}

/* ============================================================
   The phone
   ============================================================ */


function opt(label, action, arg, done) {
  return '<button class="opt' + (done ? ' done' : '') + '" data-act="' + action + '" data-arg="' + (arg || '') + '">' +
    '<span>' + label + '</span><span class="ch">' + (done ? '&#10003;' : CHEV) + '</span></button>';
}

function renderPhone() {
  var b = $('#phBody'), t = $('#phTitle'), s = $('#phSub');
  if (!b) return;

  if (S.view === 'professional') {
    t.textContent = 'Sarah\u2019s 4orm';
    s.textContent = S.changed ? 'Something needs your attention' : 'Shared with ' + I().proName;
    b.innerHTML = S.changed ? phoneAlert() : phoneShared();
    return;
  }

  t.textContent = 'Sarah\u2019s 4orm';
  s.textContent = ['Before a mortgage professional exists', 'Understanding the decision',
                   'Understanding the decision', 'Getting ready'][Math.min(S.step, 3)];

  var h = '';
  if (S.step === 0) {
    h += '<div class="greet">Good afternoon, Sarah.<span>What are you thinking about?</span></div>';
    h += I().goals.map(function (g) { return opt(g, 'goal', g); }).join('');
    h += '<div class="ask"><span class="dot"></span>Ask 4orm anything about your decision</div>';
  } else if (S.step === 1) {
    h += '<div class="msg me">' + S.goal + '</div>';
    h += '<div class="msg ai"><div class="k">4orm</div>' + I().q2 + '</div>';
    h += I().timing.map(function (x) { return opt(x, 'timing', x); }).join('');
  } else if (S.step === 2) {
    h += '<div class="msg me">' + S.timing + '</div>';
    h += '<div class="msg ai"><div class="k">4orm</div>Would you like me to help you understand what you will ' +
         'need before speaking with a ' + I().pro + '?</div>';
    h += opt('Yes, walk me through it', 'yes') + opt('Not yet', 'notyet');
  } else {
    h += '<div class="msg ai"><div class="k">4orm</div>Here is what a mortgage professional will ask you for. ' +
         'Add each one and I will keep it in your own vault.</div>';
    h += opt('Verify your identity', 'do', 'identity', S.identity);
    h += opt('Add your income', 'do', 'income', S.income);
    h += opt('Connect your financial information', 'do', 'financial', S.financial);
    h += opt(S.docs ? 'Add another document (' + S.docs + ' added)' : 'Upload a document', 'do', 'doc', S.docs >= 2);
    if (S.identity && S.income && S.financial) {
      h += '<div class="msg ai" style="margin-top:4px"><div class="k">4orm</div>You are ready to speak to ' +
           'someone. You choose who, and you choose what they receive.</div>';
      h += '<button class="opt" data-act="share" style="border-color:#B9CDF5;background:#F4F8FF">' +
           '<span style="color:#1B4ABE">Share with a ' + I().pro + '</span>' +
           '<span class="ch">' + ARROW + '</span></button>';
    }
    h += '<div class="ask"><span class="dot"></span>Ask 4orm anything about your decision</div>';
  }
  b.innerHTML = h;
}

function phoneShared() {
  return '<div class="msg ai"><div class="k">4orm</div>Your passport is shared with Alex Chen at Northbridge ' +
    'Mortgage Group. You can narrow that permission or withdraw it at any time.</div>' +
    '<div class="msg ai"><div class="k">Watching for you</div>I will tell you if anything on your application ' +
    'changes, who changed it, and whether your own evidence supports it.</div>' +
    '<div class="ask"><span class="dot"></span>Ask 4orm anything about your decision</div>';
}

function phoneAlert() {
  var extra = '';
  if (S.resolved === 'no') {
    extra = '<div class="msg ai" style="margin-top:4px"><div class="k">Recorded</div>You do not recognize this ' +
      'change. Alex and the principal broker at Northbridge have been notified, and Cascade Trust has been told ' +
      'that the figure it relied on is under review.</div>';
  } else if (S.resolved === 'yes') {
    extra = '<div class="msg ai" style="margin-top:4px"><div class="k">Recorded</div>You recognize the change. ' +
      'It stays open until a document supporting $136,000 is in your vault. Recognising a figure is not ' +
      'evidence of it.</div>';
  }
  return '<div class="alert">' +
    '<div class="ah"><span class="i">!</span>Something changed in your mortgage application</div>' +
    '<div class="delta"><span class="was">$118,000</span><span style="color:#98A6BC">&rarr;</span>' +
    '<span class="now">$136,000</span></div>' +
    '<div class="ab">Annual income. Changed by Alex Chen just now. The evidence in your vault currently ' +
    'supports approximately <b>$118,400</b>.</div>' +
    '<div class="aacts">' +
      '<button data-act="rev">Review</button>' +
      '<button data-act="ask">Ask ' + I().proName.split(' ')[0] + '</button>' +
      '<button data-act="rec" data-arg="yes">I recognize this</button>' +
      '<button data-act="rec" data-arg="no">I do not</button>' +
    '</div></div>' + extra;
}

/* ============================================================
   The rail
   ============================================================ */
function railPersonal() {
  var fin = S.financial ? 'Complete' : (S.income || S.identity ? 'Building' : 'Starting');
  var evts = S.events.length
    ? S.events.map(function (e) {
        return '<div class="evt"><span class="d" style="' + (e.g ? '' : 'background:var(--blue-lt);box-shadow:0 0 12px rgba(91,140,255,.6)') +
          '"></span><div><div class="et">' + e.t + '</div><div class="es">' + e.s + '</div></div></div>';
      }).join('')
    : '<div class="evt" style="opacity:.55"><span class="d" style="background:var(--border-strong)"></span>' +
      '<div><div class="et">Nothing recorded yet.</div><div class="es">USE THE PHONE</div></div></div>';

  return '<div class="bezel"><div class="core">' +
    '<div class="core-h"><span class="lbl">Your 4orm</span>' +
      '<span class="chip c-mute"><span class="d"></span>Private to you</span></div>' +
    '<div class="core-b">' +
      '<div class="meter"><div class="mt"><span class="mn">' + S.readiness + '%</span>' +
        '<span class="ml">prepared to begin<br />a mortgage application</span></div>' +
        '<div class="bar"><i style="width:' + S.readiness + '%"></i></div>' +
        '<div class="hint"><i></i>A preparation measure. Not a credit decision, and not an approval.</div>' +
      '</div>' +
      '<div style="margin-top:26px">' +
        prow('Identity', S.identity ? 'Verified' : 'Not verified', S.identity) +
        prow('Income', S.income ? 'Recorded' : 'Not recorded', S.income) +
        prow('Financial profile', fin, S.financial) +
        prow('Evidence', S.events.length + (S.events.length === 1 ? ' record' : ' records'), S.events.length > 0) +
        prow('Permissions', S.shared ? 'Shared with 1' : 'You control access', false) +
      '</div>' +
    '</div>' +
    '<div class="core-h" style="border-top:1px solid var(--line);border-bottom:0">' +
      '<span class="lbl">What the transaction recorded</span></div>' +
    '<div class="core-b" style="padding-top:0"><div class="evtwrap">' + evts + '</div></div>' +
  '</div></div>';
}

function prow(k, v, on) {
  return '<div class="prow' + (on ? ' on' : '') + '"><span class="pk">' + k + '</span>' +
    '<span class="pv"><span class="tick">&#10003;</span>' + v + '</span></div>';
}

function railProfessional() {
  var exc = S.changed
    ? '<div class="exception"><div class="xh"><span>&#9888;</span>Evidence exception</div>' +
      '<div class="xb">Application income differs from the consumer-provided figure and from the verified ' +
      'evidence on file. Stated $118,000. Evidence supports approximately $118,400. This version carries ' +
      '$136,000 and no supporting document was attached to the change.' +
      (S.resolved === 'no' ? '<br /><br /><b style="color:var(--bad)">The consumer does not recognize this change.</b> ' +
        'Escalated to the principal broker.' : '') +
      '</div></div>'
    : '';

  return '<div class="bezel"><div class="core">' +
    '<div class="pro-h">' +
      '<div class="who"><span class="av">' + I().proInit + '</span><div><div class="wn">' + I().proName + '</div>' +
        '<div class="ws">' + I().proFirm + ' \u00b7 professional view</div></div></div>' +
      '<span class="chip ' + (S.changed ? 'c-bad' : 'c-ok') + '"><span class="d"></span>' +
        (S.changed ? '1 exception' : 'File in good order') + '</span>' +
    '</div>' +
    '<div class="pro-h" style="border-bottom:0;padding-bottom:14px">' +
      '<div class="who"><span class="av" style="background:#5E6E88">SM</span>' +
      '<div><div class="wn">Sarah Mitchell</div><div class="ws">Received prepared \u00b7 ' + I().tx + '</div></div></div>' +
      '<span class="chip c-ok"><span class="d"></span>Consent active</span>' +
    '</div>' +
    '<div class="facts">' +
      fact('Identity', 'Verified', 'ok') + fact('Income', 'Supported', 'ok') +
      fact('Down payment', 'Supported', 'ok') + fact('Documents', '8 of 10', 'warn') +
      fact('Open questions', '2', 'warn') + fact('Consent', 'Active', 'ok') +
    '</div>' +
    '<div style="padding:6px 0 2px">' +
      appline('Annual income', S.changed ? '$136,000' : '$118,000', S.changed) +
      I().fields.map(function (f) { return appline(f[0], f[1]); }).join('') +
    '</div>' +
    exc +
    '<div style="padding:0 24px 24px">' +
      (S.changed
        ? '<button class="btn btn-g btn-sm" data-act="undo">Reset this scene</button>'
        : '<button class="btn btn-p btn-sm" data-act="change">Change the income figure' +
          '<span class="cir">' + ARROW + '</span></button>' +
          '<div class="hint" style="margin-top:14px"><i></i>Press it. This is the moment the whole product exists for.</div>') +
    '</div>' +
  '</div></div>';
}

function fact(k, v, tone) {
  return '<div class="fact"><div class="fk">' + k + '</div><div class="fv">' + v +
    '<span class="chip c-' + tone + '" style="padding:3px 9px;font-size:10px"><span class="d"></span>' +
    (tone === 'ok' ? 'ok' : 'check') + '</span></div></div>';
}

function appline(k, v, hit) {
  return '<div class="appline' + (hit ? ' hit flash' : '') + '"><span class="ak">' + k + '</span>' +
    '<span class="av2">' + v + '</span></div>';
}

var TIMELINE = [
  ['14 Feb 2026 \u00b7 19:02', 'Sarah opens 4orm. No professional involved.', 'key'],
  ['14 Feb 2026 \u00b7 19:12', 'Financial passport created', ''],
  ['21 Feb 2026 \u00b7 10:19', 'Identity verified', ''],
  ['23 Feb 2026 \u00b7 18:05', 'Financial information verified', ''],
  ['24 Feb 2026 \u00b7 09:05', 'Passport shared with Alex Chen. Consent granted, scoped and dated.', 'key'],
  ['22 Mar 2026 \u00b7 11:40', 'Application V1 created', ''],
  ['24 Mar 2026 \u00b7 09:15', 'Package transmitted to Maple Bank', ''],
  ['05 Apr 2026 \u00b7 13:40', 'Maple Bank declines at the stated income', ''],
  ['06 Apr 2026 \u00b7 15:12', 'Annual income changed, $118,000 to $136,000, no document attached', 'bad'],
  ['06 Apr 2026 \u00b7 15:12', 'Consumer notified, same minute', 'key'],
  ['07 Apr 2026 \u00b7 10:02', 'Application V2 transmitted to Cascade Trust', ''],
  ['14 Apr 2026 \u00b7 16:20', 'Cascade Trust issues a conditional approval on V2', ''],
  ['17 Apr 2026 \u00b7 08:40', 'Consumer response recorded: change not recognized', 'bad'],
  ['20 Apr 2026 \u00b7 14:26', 'Application V3 reconciled to the pay statement', ''],
  ['21 Apr 2026 \u00b7 09:30', 'Amended package transmitted, decision reopened', 'key']
];

function railRegulator() {
  var rows = TIMELINE.map(function (t) {
    return '<div class="step ' + t[2] + '"><span class="ts">' + t[0] + '</span><span class="tn">' + t[1] + '</span></div>';
  }).join('');

  var pack = '<div class="pack' + (S.packOpen ? ' on' : '') + '" id="pack">' +
    '<div class="ph2"><span class="pt">Transaction record &middot; MTG-2026-0417</span>' +
      '<span class="chip c-mute"><span class="d"></span>Produced in one action</span></div>' +
    '<div class="pl">' +
      pi('Recorded events', '15') + pi('Evidence objects', '8') + pi('Application versions', '3') +
      pi('Transmissions, each with a frozen snapshot', '3') + pi('Permissions, with grant and use dates', '5') +
      pi('Values carrying full provenance', '8 of 8') +
      pi('Unresolved exceptions', '1') +
      pi('Consumer notified of the change', 'Same minute') +
    '</div></div>';

  return '<div class="bezel"><div class="core">' +
    '<div class="core-h"><span class="lbl">Evidence timeline &middot; MTG-2026-0417</span>' +
      '<span class="chip c-mute"><span class="d"></span>Read only</span></div>' +
    '<div class="tl">' + rows + '</div>' +
    '<div style="padding:0 24px 22px">' +
      (S.packOpen
        ? '<button class="btn btn-g btn-sm" data-act="unpack">Close the package</button>'
        : '<button class="btn btn-p btn-sm" data-act="pack">Reconstruct the transaction' +
          '<span class="cir">' + ARROW + '</span></button>') +
    '</div>' + pack +
  '</div></div>';
}

function pi(k, v) { return '<div class="pi"><span>' + k + '</span><span class="v">' + v + '</span></div>'; }

function renderRail() {
  var r = $('#rail');
  if (!r) return;
  r.innerHTML = S.view === 'personal' ? railPersonal()
              : S.view === 'professional' ? railProfessional()
              : railRegulator();
}

/* ============================================================
   View switching
   ============================================================ */
function movePipOf(sel) {
  var wrap = $(sel); if (!wrap) return;
  var on = wrap.querySelector('button.on'), pip = wrap.querySelector('.pip');
  if (!on || !pip) return;
  pip.style.width = on.offsetWidth + 'px';
  pip.style.transform = 'translateX(' + (on.offsetLeft - 5) + 'px)';
}
function movePip() { movePipOf('#views'); movePipOf('#inds'); }

function setView(v) {
  S.view = v;
  $$('#views button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-v') === v); });
  movePip();
  var vs = $('#viewsub'); if (vs) vs.innerHTML = VIEWSUB[v];
  var stage = $('#stageIn'), pw = $('#phoneW');
  stage.classList.toggle('pro', v === 'professional');
  if (v === 'regulator') { pw.style.display = 'none'; stage.style.gridTemplateColumns = 'minmax(0,1fr)'; }
  else { pw.style.display = ''; stage.style.gridTemplateColumns = ''; }
  renderPhone(); renderRail();
}

/* ============================================================
   Actions
   ============================================================ */
var DO = {
  identity: { label: 'Identity verified', stamp: 'GOVERNMENT PHOTO ID \u00b7 CONFIRMED', add: 22, gold: true },
  income:   { label: 'Income recorded', stamp: 'PAY STATEMENT \u00b7 $118,400 ANNUALIZED', add: 24, gold: true },
  financial:{ label: 'Financial information connected', stamp: 'ACCOUNTS \u00b7 $145,320 TRACED', add: 26, gold: true },
  doc:      { label: 'Document added to your vault', stamp: 'UPLOADED BY YOU \u00b7 UNALTERED', add: 8, gold: false }
};

document.addEventListener('click', function (e) {
  var t = e.target.closest ? e.target.closest('[data-act],[data-v],[data-go],[data-ind],[data-navview]') : null;
  if (!t) return;
  var v = t.getAttribute('data-v'), go = t.getAttribute('data-go'), a = t.getAttribute('data-act'),
      arg = t.getAttribute('data-arg');

  if (v) { setView(v); return; }
  var ind = t.getAttribute('data-ind');
  if (ind) {
    S.industry = ind;
    S.step = 0; S.goal = null; S.timing = null;
    S.identity = S.income = S.financial = false; S.docs = 0;
    S.readiness = 12; S.events = []; S.shared = false; S.changed = false; S.resolved = null;
    Array.prototype.slice.call(document.querySelectorAll('[data-ind]')).forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-ind') === ind);
    });
    movePipOf('#inds');
    drawLines(); setView('personal');
    return;
  }
  var nv = t.getAttribute('data-navview');
  if (nv) {
    e.preventDefault(); setView(nv);
    $('#stage').scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  if (go) {
    e.preventDefault(); setView(go);
    $('#stage').scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  if (!a) return;

  if (a === 'goal') {
    S.goal = arg; S.step = 1;
    addEvent('Transaction opened. Goal recorded: ' + arg.toLowerCase() + '.', I().tx + ' \u00b7 CONSUMER STATED');
    renderPhone(); renderRail(); return;
  }
  if (a === 'timing') {
    S.timing = arg; S.step = 2;
    addEvent('Timing recorded: ' + arg.toLowerCase() + '.', 'CONSUMER STATED');
    renderPhone(); renderRail(); return;
  }
  if (a === 'yes') { S.step = 3; renderPhone(); renderRail(); return; }
  if (a === 'notyet') { S.step = 3; renderPhone(); renderRail(); return; }

  if (a === 'do') {
    var d = DO[arg];
    if (!d) return;
    if (arg === 'doc') { if (S.docs >= 2) return; S.docs++; }
    else { if (S[arg]) return; S[arg] = true; }
    S.readiness = Math.min(100, S.readiness + d.add);
    addEvent(d.label, d.stamp, d.gold);
    renderPhone(); renderRail(); return;
  }

  /* the invitation is spent once they are playing with it */
  var _lure = document.getElementById('lure');
  if (_lure) _lure.classList.add('gone');

  if (a === 'share') {
    S.shared = true;
    addEvent('Passport shared with ' + I().proName, 'PERMISSION GRANTED \u00b7 SCOPED \u00b7 WITHDRAWABLE', true);
    /* somebody else is involved now, so the room comes back */
    focusLeave();
    setView('professional');
    return;
  }

  if (a === 'change') {
    S.changed = true;
    addEvent('Annual income changed, $118,000 to $136,000', 'BY ALEX CHEN \u00b7 NO DOCUMENT ATTACHED');
    renderRail();
    setTimeout(function () { renderPhone(); }, 700);
    return;
  }
  if (a === 'undo') {
    S.changed = false; S.resolved = null;
    S.events = S.events.filter(function (x) { return x.t.indexOf('Annual income changed') === -1 &&
      x.t.indexOf('not recognize') === -1 && x.t.indexOf('recognizes') === -1; });
    drawLines(); renderRail(); renderPhone(); return;
  }
  if (a === 'rec') {
    S.resolved = arg;
    addEvent(arg === 'no' ? 'Consumer does not recognize the change' : 'Consumer recognizes the change, still unsupported',
             'CONSUMER RESPONSE \u00b7 TIMESTAMPED');
    renderPhone(); renderRail(); return;
  }
  if (a === 'rev' || a === 'ask') {
    setView('regulator');
    return;
  }
  if (a === 'pack') { S.packOpen = true; renderRail(); return; }
  if (a === 'unpack') { S.packOpen = false; renderRail(); return; }
});

/* ============================================================
   Reveal
   ============================================================ */
function initReveal() {
  var els = $$('.rv');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
  }, { rootMargin: '0px 0px -6% 0px', threshold: .05 });
  els.forEach(function (e) { io.observe(e); });
}


/* ============================================================
   Focus mode
   Tap the phone and the room steps back. The lights come up
   again at the handoff, so the professional panel has somewhere
   to land.
   ============================================================ */
var FOCUS = { on: false };

function focusPlace() {
  var w = document.getElementById('phoneW');
  if (!w) return;
  if (!FOCUS.on || window.innerWidth <= 900) { w.style.transform = ''; return; }
  w.style.transform = '';
  var r = w.getBoundingClientRect();
  var dx = (window.innerWidth / 2) - (r.left + r.width / 2);
  var dy = (window.innerHeight / 2) - (r.top + r.height / 2);
  w.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1.05)';
}

function focusEnter() {
  if (FOCUS.on) return;
  var w = document.getElementById('phoneW'), sc = document.getElementById('scrim'),
      lure = document.getElementById('lure');
  if (!w || !sc) return;
  FOCUS.on = true;
  if (window.innerWidth <= 900) {
    /* narrow screens cannot translate the phone anywhere useful, so bring the
       page to it before the scroll lock goes on */
    var r0 = w.getBoundingClientRect();
    window.scrollTo({ top: r0.top + window.pageYOffset - (window.innerHeight - r0.height) / 2,
                      behavior: 'smooth' });
    setTimeout(function () { document.body.classList.add('infocus'); }, 460);
  } else {
    document.body.classList.add('infocus');
  }
  w.classList.add('focused');
  sc.classList.add('on');
  if (lure) lure.classList.add('gone');
  focusPlace();
}

function focusLeave() {
  if (!FOCUS.on) return;
  var w = document.getElementById('phoneW'), sc = document.getElementById('scrim');
  FOCUS.on = false;
  if (w) { w.classList.remove('focused'); w.style.transform = ''; }
  if (sc) sc.classList.remove('on');
  document.body.classList.remove('infocus');
}

function initFocus() {
  var w = document.getElementById('phoneW'), sc = document.getElementById('scrim');
  if (!w || !sc) return;
  w.addEventListener('click', function (e) {
    if (FOCUS.on) return;
    /* entering is the whole gesture; do not also fire the control underneath */
    if (e.target.closest('[data-act]') || e.target.closest('button')) return;
    focusEnter();
  });
  var lure = document.getElementById('lure');
  if (lure) {
    lure.addEventListener('click', function (e) {
      e.stopPropagation();
      focusEnter();
    });
  }
  sc.addEventListener('click', focusLeave);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') focusLeave(); });
  window.addEventListener('resize', focusPlace);
  window.addEventListener('scroll', function () { if (FOCUS.on) focusPlace(); }, { passive: true });
}

function boot() {
  var h = (location.hash || '').replace('#', '');
  if (h === 'personal' || h === 'professional' || h === 'regulator') S.view = h;
  buildLines();
  renderPhone();
  renderRail();
  initReveal();
  initFocus();
  requestAnimationFrame(movePip);
  window.addEventListener('resize', movePip);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();
