/* ============================================================
   4orm - the red flag check
   Routes a name into what regulators have already published.
   It holds no list of its own and makes no finding of its own.
   ============================================================ */
(function () {
'use strict';

var root = document.getElementById('check-app');
if (!root) return;

var ARROW = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';
var OUT = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';
var TICK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5.2 5.2L20 7"/></svg>';

/* ---------------------------------------------------------- the registers */
/* Every entry is a register a Canadian public authority publishes itself.
   4orm asserts nothing about any firm. It sends you to the source. */
var REG = [
  { id: 'nrs', kick: 'Registration', who: 'Canadian Securities Administrators',
    name: 'National Registration Search',
    what: 'Every person and firm permitted to advise on or sell securities in Canada, the categories they hold, and the provinces they hold them in.',
    means: 'Anybody selling you an investment who is absent from this search is not permitted to sell it to you.',
    href: 'https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx',
    tracks: ['investing', 'lending', 'any'] },

  { id: 'alerts', kick: 'Warnings', who: 'Canadian Securities Administrators',
    name: 'Investor alerts',
    what: 'Companies and people Canadian securities regulators have named publicly as a warning to the public.',
    means: 'A name here has already been the subject of a published caution by a provincial regulator. Syndicated mortgage offerings are covered by these alerts in most provinces.',
    href: 'https://www.securities-administrators.ca/investor-alerts/',
    tracks: ['mortgage', 'investing', 'payments', 'lending', 'any'] },

  { id: 'disc', kick: 'Discipline', who: 'Canadian Securities Administrators',
    name: 'The Disciplined List',
    what: 'Every person and company disciplined by a securities regulator in Canada, with the date and the finding.',
    means: 'This is a finding already made by a regulator, on the record, with a date attached to it.',
    href: 'https://www.securities-administrators.ca/csa-activities/enforcement/disciplined-list/',
    tracks: ['investing', 'lending', 'any'] },

  { id: 'ciro', kick: 'Discipline', who: 'CIRO',
    name: 'Advisor Report',
    what: 'The registration status, approval categories, past firms, qualifications and disclosed disciplinary history of an individual advisor.',
    means: 'Search the person, not only the letterhead. People move between firms and the record follows them.',
    href: 'https://www.ciro.ca/advisor-report-search',
    tracks: ['investing', 'any'] },

  { id: 'fintrac', kick: 'Penalties', who: 'FINTRAC',
    name: 'Public notice of monetary penalties',
    what: 'Businesses penalized for failing their obligations under the money laundering and terrorist financing rules, with the amount and the date.',
    means: 'Mortgage lenders, brokers and administrators came under these obligations in October 2024, so this register now reaches the mortgage sector.',
    href: 'https://fintrac-canafe.canada.ca/pen/4-eng',
    tracks: ['mortgage', 'payments', 'lending', 'any'] },

  { id: 'psp', kick: 'Registration', who: 'Bank of Canada',
    name: 'Registry of payment service providers',
    what: 'Every payment firm registered under the Retail Payment Activities Act, with a violations column printed beside each one.',
    means: 'If a firm is moving your money and is not on this registry, ask them under what authority they are doing it.',
    href: 'https://www.bankofcanada.ca/core-functions/retail-payments-supervision/psp-registry/',
    tracks: ['payments', 'any'] },

  { id: 'fsra-m', kick: 'Licence', who: 'FSRA Ontario',
    name: 'Licensed mortgage brokerages and agents',
    what: 'Every mortgage brokerage, administrator, broker and agent licensed to operate in Ontario.',
    means: 'A mortgage in Ontario has to be arranged by a licensee. The licence carries the number you can quote in a complaint.',
    href: 'https://mbsweblist.fsco.gov.on.ca/agents.aspx',
    tracks: ['mortgage', 'any'] },

  { id: 'fsra-i', kick: 'Licence', who: 'FSRA Ontario',
    name: 'Licensed insurance agents',
    what: 'Life, accident and sickness, and general insurance agents licensed in Ontario, with the status of the licence.',
    means: 'A lapsed or revoked licence shows here before it shows anywhere the agent controls.',
    href: 'https://alias2a.fsco.gov.on.ca/agents.aspx',
    tracks: ['insurance', 'any'] },

  { id: 'ribo', kick: 'Licence', who: 'RIBO Ontario',
    name: 'Broker search',
    what: 'Property and casualty insurance brokers registered in Ontario, and the standing of that registration.',
    means: 'Home and auto insurance in Ontario runs through this register rather than the one above it.',
    href: 'https://www.ribo.com/consumer-information/licensee-directory-status/broker-search/',
    tracks: ['insurance', 'any'] },

  { id: 'cafc', kick: 'Fraud', who: 'RCMP, OPP and Competition Bureau',
    name: 'Canadian Anti-Fraud Centre',
    what: 'The national collection point for fraud reports, and the running list of the methods being used on people right now.',
    means: 'Read the current methods before you read the firm. Most people are taken by a method, not by a name.',
    href: 'https://antifraudcentre-centreantifraude.ca/index-eng.htm',
    tracks: ['mortgage', 'investing', 'payments', 'insurance', 'lending', 'any'] }
];

var TRACKS = [
  ['mortgage',  'A mortgage'],
  ['investing', 'An investment'],
  ['payments',  'Payments or crypto'],
  ['insurance', 'Insurance'],
  ['lending',   'A loan'],
  ['any',       'Show me everything']
];

/* Three invented firms. Nothing here describes a real company. */
var DEMO = [
  { name: 'Rivercrest Mortgage Group', tone: 'ok', verdict: 'Licensed. Nothing published against it.',
    lines: [
      ['ok',   'Licence', 'Brokerage licence 10-something, in good standing, held since 2016.'],
      ['ok',   'Penalties', 'No entry on the money laundering penalty register.'],
      ['ok',   'Warnings', 'No entry on any provincial warning list.'],
      ['note', 'What that means', 'A clean read is the ordinary result. It tells you the firm is inside the system, and it tells you where to complain if that changes.']
    ] },
  { name: 'Halbrook Capital Partners', tone: 'warn', verdict: 'Registered, and carrying a published penalty.',
    lines: [
      ['ok',   'Registration', 'Registered as an exempt market dealer in three provinces.'],
      ['bad',  'Penalties', 'A monetary penalty published against it in 2024 for failures in reporting and record keeping.'],
      ['warn', 'Discipline', 'One individual at the firm appears on the disciplined list.'],
      ['note', 'What that means', 'Registered and penalized are not opposites. The register is what lets you hold both facts at once and ask the firm about the second one.']
    ] },
  { name: 'Meridian Yield Trust', tone: 'bad', verdict: 'Absent from every register searched.',
    lines: [
      ['bad',  'Registration', 'No entry in the national registration search under this name or any close variant.'],
      ['bad',  'Licence', 'No provincial licence found.'],
      ['warn', 'Warnings', 'A name of this shape appears on a provincial investor alert. Read it before you go further.'],
      ['note', 'What that means', 'Absence is the finding. A firm taking money for a financial product in Canada is meant to appear somewhere. Nowhere is the answer, and it is the most common shape of a bad one.']
    ] }
];

/* --------------------------------------------------------------- state */
var S = { firm: '', track: 'any', done: {}, ran: false, demo: null };

function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function list() {
  return REG.filter(function (r) { return r.tracks.indexOf(S.track) >= 0; });
}

function nDone() {
  var n = 0, l = list();
  for (var i = 0; i < l.length; i++) if (S.done[l[i].id]) n++;
  return n;
}

function today() {
  var d = new Date();
  var M = ['January','February','March','April','May','June','July',
           'August','September','October','November','December'];
  return d.getDate() + ' ' + M[d.getMonth()] + ' ' + d.getFullYear();
}

/* --------------------------------------------------------------- render */
function render() {
  var out = document.getElementById('check-out');
  if (!out) return;

  if (S.demo != null) { out.innerHTML = demoHTML(DEMO[S.demo]); wire(out); return; }
  if (!S.ran) { out.innerHTML = ''; return; }

  var l = list(), n = nDone(), pct = l.length ? Math.round(n / l.length * 100) : 0;

  var head =
    '<div class="ck-head">' +
      '<div class="ck-hl">' +
        '<span class="ck-kick">Check sheet</span>' +
        '<h3>' + esc(S.firm) + '</h3>' +
        '<p>' + l.length + ' registers to read. 4orm holds no record of this firm and makes no finding about it. ' +
        'Each one below is published by the authority named on it.</p>' +
      '</div>' +
      '<div class="ck-meter"><div class="ck-mn"><b>' + n + '</b> of ' + l.length + '</div>' +
      '<div class="ck-mb"><i style="width:' + pct + '%"></i></div>' +
      '<div class="ck-ms">' + (n === l.length ? 'Every register read.' : 'Open each one and mark it.') + '</div></div>' +
    '</div>';

  var cards = l.map(function (r) {
    var on = !!S.done[r.id];
    return '<article class="ck-card' + (on ? ' on' : '') + '">' +
      '<div class="ck-top"><span class="ck-k">' + r.kick + '</span>' +
        '<span class="ck-who">' + r.who + (r.prov ? ' &middot; ' + r.prov : '') + '</span></div>' +
      '<h4>' + r.name + '</h4>' +
      '<p class="ck-what">' + r.what + '</p>' +
      '<p class="ck-means"><span>What a hit means</span>' + r.means + '</p>' +
      '<div class="ck-act">' +
        '<a class="ck-open" href="' + r.href + '" target="_blank" rel="noopener noreferrer" ' +
          'data-open="' + r.id + '">Open the register ' + OUT + '</a>' +
        '<button class="ck-mark" type="button" data-mark="' + r.id + '">' +
          (on ? TICK + ' Read' : 'Mark as read') + '</button>' +
      '</div></article>';
  }).join('');

  var tail = '';
  if (n === l.length && l.length) {
    tail =
      '<div class="ck-rec">' +
        '<span class="ck-kick">Recorded</span>' +
        '<h3>You did the thing almost nobody does.</h3>' +
        '<p>You read ' + l.length + ' public registers on ' + today() + ' before handing anybody your file. ' +
        'Inside 4orm this becomes a dated line on the transaction: what you checked, when you checked it, ' +
        'and what was published at the time. If the firm later says you were told something, the record ' +
        'already says what you knew.</p>' +
        '<div class="ck-recline">' +
          '<span class="ck-rt">' + today() + '</span>' +
          '<span class="ck-rd">Counterparty check on ' + esc(S.firm) + '. ' + l.length +
          ' registers read by the consumer.</span>' +
        '</div>' +
        '<a class="btn btn-p" href="/#stage">Form your experience <span class="cir">' + ARROW + '</span></a>' +
      '</div>';
  }

  out.innerHTML = head + '<div class="ck-grid">' + cards + '</div>' + tail;
  wire(out);
}

function demoHTML(d) {
  var rows = d.lines.map(function (x) {
    return '<div class="ck-line ' + x[0] + '"><span class="ck-lk">' + x[1] + '</span>' +
           '<span class="ck-lv">' + x[2] + '</span></div>';
  }).join('');
  return '<div class="ck-demo ' + d.tone + '">' +
    '<div class="ck-dh"><span class="ck-kick">Worked example, invented firm</span>' +
      '<h3>' + d.name + '</h3><p class="ck-verdict">' + d.verdict + '</p></div>' +
    '<div class="ck-lines">' + rows + '</div>' +
    '<p class="ck-dfoot">This firm does not exist. The shape of the answer is what is being shown, ' +
    'because 4orm does not publish a finding about a real company and does not invent evidence about one. ' +
    'To read a real firm, type its name above.</p>' +
    '<button class="ck-back" type="button" data-back="1">Back to the check</button></div>';
}

/* ----------------------------------------------------------------- wire */
function wire(scope) {
  scope.querySelectorAll('[data-mark]').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-mark');
      S.done[k] = !S.done[k];
      render();
    });
  });
  scope.querySelectorAll('[data-open]').forEach(function (a) {
    a.addEventListener('click', function () {
      var k = a.getAttribute('data-open');
      if (!S.done[k]) { setTimeout(function () { S.done[k] = true; render(); }, 400); }
    });
  });
  scope.querySelectorAll('[data-back]').forEach(function (b) {
    b.addEventListener('click', function () { S.demo = null; render(); });
  });
}

function run(name) {
  name = (name || '').trim();
  if (!name) { var i = document.getElementById('ck-input'); if (i) i.focus(); return; }
  S.firm = name; S.ran = true; S.demo = null; S.done = {};
  render();
  var out = document.getElementById('check-out');
  if (out) {
    var y = out.getBoundingClientRect().top + window.pageYOffset - 96;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function boot() {
  var form = document.getElementById('ck-form');
  var input = document.getElementById('ck-input');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      run(input ? input.value : '');
    });
  }

  root.querySelectorAll('[data-track]').forEach(function (b) {
    b.addEventListener('click', function () {
      root.querySelectorAll('[data-track]').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      S.track = b.getAttribute('data-track');
      if (S.ran) render();
    });
  });

  root.querySelectorAll('[data-demo]').forEach(function (b) {
    b.addEventListener('click', function () {
      S.demo = parseInt(b.getAttribute('data-demo'), 10);
      S.ran = true;
      render();
      var out = document.getElementById('check-out');
      if (out) window.scrollTo({ top: out.getBoundingClientRect().top + window.pageYOffset - 96, behavior: 'smooth' });
    });
  });

  /* Arriving from the homepage box: /check-a-firm?firm=Name */
  var q = (location.search || '').match(/[?&]firm=([^&]*)/);
  if (q) {
    var v = decodeURIComponent(q[1].replace(/\+/g, ' '));
    if (input) input.value = v;
    if (v.trim()) run(v);
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();
