/* ============================================================
   4orm Mortgage Guardian — landing motion + interactive demo
   No dependencies. Synthetic data only. Session state, resettable.
   ============================================================ */
(function () {
'use strict';

var D = window.MG_DATA;
var FIRST = String(D.meta.client).split(' ')[0];
var GUARDIAN = FIRST + '\u2019s Guardian';
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

function el(tag, cls, html) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(ts) {
  if (!ts) return '—';
  var d = ts.split('T'); var p = d[0].split('-');
  return parseInt(p[2], 10) + ' ' + MONTHS[parseInt(p[1], 10) - 1] + ' ' + p[0];
}
function fmtTime(ts) {
  if (!ts) return '—';
  var t = ts.split('T')[1] || ''; return t.slice(0, 5);
}
function fmtStamp(ts) { return ts ? fmtDate(ts) + ' · ' + fmtTime(ts) : '—'; }

function pillClass(state) {
  var s = String(state).toLowerCase();
  if (s.indexOf('verified') > -1 || s.indexOf('active') > -1 || s.indexOf('approval') > -1) return 'p-ok';
  if (s.indexOf('attention') > -1 || s.indexOf('outstanding') > -1 || s.indexOf('review') > -1 || s.indexOf('monitoring') > -1) return 'p-warn';
  if (s.indexOf('discrepancy') > -1 || s.indexOf('declined') > -1 || s.indexOf('withdrawn') > -1 || s.indexOf('open') > -1) return 'p-bad';
  if (s.indexOf('uploaded') > -1 || s.indexOf('relied') > -1) return 'p-info';
  return 'p-mute';
}
function pill(state) {
  return '<span class="pill ' + pillClass(state) + '"><span class="dot"></span>' + esc(state) + '</span>';
}
function docById(id) { for (var i = 0; i < D.documents.length; i++) if (D.documents[i].id === id) return D.documents[i]; return null; }
function factById(id) { for (var i = 0; i < D.facts.length; i++) if (D.facts[i].id === id) return D.facts[i]; return null; }
function consentById(id) { for (var i = 0; i < D.consents.length; i++) if (D.consents[i].id === id) return D.consents[i]; return null; }
function partyById(id) { for (var i = 0; i < D.parties.length; i++) if (D.parties[i].id === id) return D.parties[i]; return null; }

/* ============================================================
   Landing: scroll reveal + sticky nav
   ============================================================ */
/* ============================================================
   Landing: hero conversation, plays once on view
   ============================================================ */
function initHeroChat() {
  var box = $('#heroChat');
  if (!box) return;
  var played = false;

  function add(node, delay) {
    return new Promise(function (res) {
      setTimeout(function () { box.appendChild(node); box.scrollTop = box.scrollHeight; res(); }, delay);
    });
  }
  function typing(ms) {
    var t = el('div', 'bub bub-ai', '<span class="typing"><i></i><i></i><i></i></span>');
    t.style.padding = '0';
    return add(t, 260).then(function () {
      return new Promise(function (r) { setTimeout(function () { t.remove(); r(); }, ms); });
    });
  }

  function play() {
    if (played) return; played = true;
    var g = D.guardian.opening;
    var userB = el('div', 'bub bub-user', esc(g.user));

    add(userB, 500)
      .then(function () { return typing(1500); })
      .then(function () {
        var blocks = g.reply.blocks.map(function (b) {
          return '<div class="bub-blk"><div class="bk">' + esc(b.head) + '</div><div class="bv">' + esc(b.body) + '</div></div>';
        }).join('');
        return add(el('div', 'bub bub-ai',
          '<div class="bhead">' + GUARDIAN + '</div>' + esc(g.reply.lead) + blocks), 0);
      })
      .then(function () { return add(el('div', 'bub-note', esc(g.reply.note)), 700); })
      .then(function () { return typing(900); })
      .then(function () {
        var card = el('div', 'pp-card',
          '<div class="pph"><span class="ppt">Mortgage Passport</span><span class="pill p-info" style="font-size:9.5px"><span class="dot"></span>Created</span></div>' +
          '<div class="pp-row"><span class="k">Annual income, stated</span><span class="v">$118,000</span></div>' +
          '<div class="pp-row"><span class="k">Savings, stated</span><span class="v">$145,000</span></div>' +
          '<div class="pp-row"><span class="k">Documents on file</span><span class="v">0 of 6</span></div>' +
          '<div class="meter"><i></i></div>' +
          '<div style="font-size:10.5px; color:var(--text-3); margin-top:8px">Profile 34 percent complete. Nothing here has been shared with anyone yet.</div>');
        return add(card, 0).then(function () {
          setTimeout(function () { var m = $('.meter i', card); if (m) m.style.width = '34%'; }, 220);
        });
      })
      .then(function () {
        return add(el('div', 'bub-note',
          'Every answer above is educational. No application exists yet, and no professional has been given access.'), 800);
      });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { play(); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(box);
  } else { play(); }
}

/* ============================================================
   Toast + drawer
   ============================================================ */
var toastTimer = null;
function toast(line, sub) {
  var t = $('#toast'); if (!t) return;
  t.innerHTML = esc(line) + (sub ? '<div class="tl2">' + esc(sub) + '</div>' : '');
  t.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.classList.remove('on'); }, 4200);
}

function openDrawer(kicker, title, bodyHtml) {
  var dr = $('#drawer'), sc = $('#scrim');
  dr.innerHTML =
    '<div class="drawer-h"><div><div class="dh1">' + esc(kicker) + '</div><h3>' + esc(title) + '</h3></div>' +
    '<button class="drawer-x" data-drawer-close="1" aria-label="Close">&times;</button></div>' +
    '<div class="drawer-b">' + bodyHtml + '</div>';
  dr.classList.add('open'); dr.setAttribute('aria-hidden', 'false');
  sc.classList.add('on');
}
function closeDrawer() {
  $('#drawer').classList.remove('open');
  $('#drawer').setAttribute('aria-hidden', 'true');
  $('#scrim').classList.remove('on');
}

/* provenance drawer for a fact */
function factDrawer(id) {
  var f = factById(id); if (!f) return;
  var ev = (f.evidence || []).map(function (d) {
    var doc = docById(d); if (!doc) return '';
    return '<button class="rowbtn" data-doc="' + doc.id + '" style="width:100%">' +
      '<span><span class="rk" style="display:block; font-weight:600; color:var(--text)">' + esc(doc.label) + '</span>' +
      '<span style="font-size:11.5px; color:var(--text-3)">' + esc(doc.extracted) + '</span></span>' +
      pill(doc.status) + '</button>';
  }).join('') || '<div class="note note-warn">No supporting document is attached to this value.</div>';

  var hist = (f.history || []).map(function (h) {
    return '<div class="ev' + (h.to === '$136,000' ? ' hi' : '') + '">' +
      '<div class="et">' + fmtStamp(h.ts) + '</div>' +
      '<div class="el">' + esc(h.from) + ' &rarr; ' + esc(h.to) + '</div>' +
      '<div class="ea">' + esc(h.actor) + (h.where ? ' · ' + esc(h.where) : '') + '</div></div>';
  }).join('');

  var shared = (f.shared || []).map(function (p) {
    var party = partyById(p); if (!party) return '';
    return '<div class="row"><span class="rk">' + esc(party.name) + '</span><span class="rv" style="font-weight:600; font-family:var(--font-sans); color:var(--text-3)">' + esc(party.role) + '</span></div>';
  }).join('');

  openDrawer('Where this value came from', f.label,
    '<div class="dsec"><div class="dst">Current value</div>' +
      '<div style="display:flex; align-items:center; gap:14px; flex-wrap:wrap">' +
      '<span class="mono" style="font-size:26px; font-weight:800">' + esc(f.value) + '</span>' + pill(f.status) + '</div>' +
      (f.support ? '<div class="note note-warn" style="margin-top:14px">' + esc(f.support) + '</div>' : '') +
      (f.note ? '<div class="note note-mute" style="margin-top:14px">' + esc(f.note) + '</div>' : '') +
    '</div>' +
    '<div class="dsec"><div class="dst">Originally stated by the consumer</div>' +
      '<div class="mono" style="font-size:16px; font-weight:700">' + esc(f.stated) + '</div></div>' +
    '<div class="dsec"><div class="dst">Supporting evidence</div>' + ev + '</div>' +
    '<div class="dsec"><div class="dst">Change history</div><div class="tl">' + hist + '</div></div>' +
    '<div class="dsec"><div class="dst">Organizations that have received this value</div>' + shared + '</div>');
}

function docDrawer(id) {
  var d = docById(id); if (!d) return;
  openDrawer('Evidence object', d.label,
    '<div class="dsec"><div class="dst">Status</div>' + pill(d.status) + '</div>' +
    '<div class="dsec"><div class="dst">Record</div><div class="kv">' +
      '<span class="k">Type</span><span class="v">' + esc(d.kind) + '</span>' +
      '<span class="k">Source</span><span class="v">' + esc(d.source) + '</span>' +
      '<span class="k">Owner</span><span class="v">' + esc(d.owner) + '</span>' +
      '<span class="k">Received</span><span class="v mono">' + fmtStamp(d.ts) + '</span>' +
    '</div></div>' +
    '<div class="dsec"><div class="dst">What was read from it</div>' +
      '<div class="note note-info">' + esc(d.extracted) + '</div></div>' +
    '<div class="dsec"><div class="dst">Confirmation</div>' +
      '<div class="note note-mute">' + esc(d.confidence) + '</div></div>');
}

function consentDrawer(id) {
  var c = consentById(id); if (!c) return;
  openDrawer('Permission', c.label,
    '<div class="dsec"><div class="dst">State</div>' + pill(c.state) + '</div>' +
    '<div class="dsec"><div class="dst">Record</div><div class="kv">' +
      '<span class="k">Scope</span><span class="v">' + esc(c.scope) + '</span>' +
      '<span class="k">Granted</span><span class="v mono">' + (c.granted ? fmtStamp(c.granted) : 'Not granted') + '</span>' +
      (c.revoked ? '<span class="k">Withdrawn</span><span class="v mono">' + fmtStamp(c.revoked) + '</span>' : '') +
    '</div></div>' +
    '<div class="dsec"><div class="dst">What this means</div><div class="note note-mute">' + esc(c.note) + '</div></div>');
}

/* "What 4orm just created" */
var CREATED = {
  1: { t: 'A record opened before any professional was involved',
       items: ['Transaction ' + D.meta.txId + ' opened', 'Consumer party created', '2 consumer-stated facts captured with timestamps', 'Guardian exchange stored as an evidence object'] },
  2: { t: 'A structured profile with per-item provenance',
       items: ['Mortgage Passport created', '5 documents read and extraction results stored', '8 facts, each with a source and a confirmation status', '1 outstanding item recorded against a request'] },
  3: { t: 'A party relationship with a scoped permission',
       items: ['Broker and brokerage parties added', 'Permission granted, scoped and timestamped', 'Business relationship opened for identity and monitoring purposes'] },
  4: { t: 'Communications turned into evidence objects',
       items: ['Document request recorded with its timestamp', 'Consumer note stored and labelled as recollection', 'Extraction proposed, not established, until confirmed'] },
  5: { t: 'A versioned application with field-level history',
       items: ['Application V1 created from passport values', 'Every field carries an origin and a change history', 'Field-level provenance available to the consumer'] },
  6: { t: 'A consent ledger separating past use from future access',
       items: ['5 permissions with grant, use and withdrawal timestamps', 'Historical reliance recorded separately from active scope', 'Withdrawal recorded without altering the prior record'] },
  7: { t: 'A submission snapshot proving what the lender received',
       items: ['Exact contents of the package frozen at 24 Mar 2026 09:15', 'Purpose of the transmission recorded', 'Consumer acknowledgement captured 12 seconds later'] },
  8: { t: 'A material-change exception, raised without accusation',
       items: ['Change detected: annual income, V1 to V2', 'Actor, timestamp and prior value recorded', 'Evidence support compared and the gap stated', 'Downstream recipients of the changed value identified'] },
  9: { t: 'An answer that cannot be given without its sources',
       items: ['Every factual sentence linked to a document or a version', 'Conflict stated rather than resolved by the product', 'Suggested questions recorded as consumer actions'] },
  10:{ t: 'The same transaction, read from the professional side',
       items: ['No new data created, only a different view of it', 'Outstanding items surfaced against the file', 'Reconstruction work replaced by a live record'] },
  11:{ t: 'A suitability decision record built while the work happened',
       items: ['Options considered, with the reason each was or was not recommended', 'Risk disclosures with acknowledgement timestamps', 'Open evidence gaps stated rather than hidden'] },
  12:{ t: 'A supervision queue across the brokerage',
       items: ['6 files with open exceptions ranked by severity', 'Each exception traceable to the underlying evidence', 'Principal-broker review captured as an event'] },
  13:{ t: 'A lender view limited to what it was permitted to receive',
       items: ['Snapshot of the package as received, not as it stands now', 'Provenance status for each value relied upon', 'Material changes since the prior version listed'] },
  14:{ t: 'One value, followed end to end',
       items: ['14 nodes and 17 edges across parties, versions and decisions', 'The income trail highlighted from statement to decision', 'Every node opens the object behind it'] },
  15:{ t: 'The whole transaction, assembled in one action',
       items: ['14 sections in the order a reviewer reads them', 'Outstanding gaps listed rather than omitted', 'Produced from the record, not reconstructed from memory'] }
};

/* ============================================================
   Scenes
   ============================================================ */
var SCENES = [
  { n: 1,  view: 'consumer',  rail: 'Before a broker',     title: 'She has not chosen a broker. The record has already started.',
    kicker: 'Scene 01 · Consumer',
    lede: 'Sarah opens Guardian to ask a question, not to apply for anything. The answer is educational. The Passport it creates is not.' },
  { n: 2,  view: 'consumer',  rail: 'Readiness',           title: 'Six documents, four states, one honest picture.',
    kicker: 'Scene 02 · Consumer',
    lede: 'Each item is self-reported, uploaded, verified or needs attention. Guardian explains why a lender asks for it.' },
  { n: 3,  view: 'consumer',  rail: 'Connect a broker',    title: 'Two ways in, and the consumer holds the key either way.',
    kicker: 'Scene 03 · Consumer',
    lede: 'Sarah can invite a professional she already knows, or accept an invitation from one. Nothing moves until she grants access.' },
  { n: 4,  view: 'consumer',  rail: 'Evidence',            title: 'A request, a document, a phone call. All three become evidence.',
    kicker: 'Scene 04 · Consumer',
    lede: 'The system reads what it is given and proposes the facts. Nothing is treated as established until Sarah confirms it.' },
  { n: 5,  view: 'consumer',  rail: 'Application',         title: 'Every field on the application answers four questions.',
    kicker: 'Scene 05 · Consumer',
    lede: 'Where did this come from, who set it, what supports it, and who has received it. Click any value.' },
  { n: 6,  view: 'consumer',  rail: 'Consent centre',      title: 'What has been used, and what can still be withdrawn.',
    kicker: 'Scene 06 · Consumer',
    lede: 'A permission already relied upon is shown separately from one that governs future access.' },
  { n: 7,  view: 'consumer',  rail: 'Submission',          title: 'Before it leaves, she sees exactly what leaves.',
    kicker: 'Scene 07 · Consumer',
    lede: 'Contents, purpose, recipient, and an acknowledgement. 4orm keeps the snapshot so the package can be proved later.' },
  { n: 8,  view: 'consumer',  rail: 'The change',          title: 'A lender declined on Sunday. On Monday the income changed.',
    kicker: 'Scene 08 · Consumer',
    lede: 'The product states what changed and what the evidence supports. It does not decide what happened.' },
  { n: 9,  view: 'consumer',  rail: 'Ask Guardian',        title: 'Ask it anything about this file. Every sentence shows its source.',
    kicker: 'Scene 09 · Consumer',
    lede: 'Answers are drawn from the seeded transaction record. Where two sources disagree, both are shown.' },
  { n: 10, view: 'broker',    rail: 'Broker',              title: 'Same transaction. Different job.',
    kicker: 'Scene 10 · Broker',
    lede: 'The transaction ID and stage do not change. What changes is what this party is permitted to see and expected to do.' },
  { n: 11, view: 'broker',    rail: 'Suitability record',  title: 'The rationale, written while the work happened.',
    kicker: 'Scene 11 · Broker',
    lede: 'What the client wanted, what was considered, why the recommendation fits, and what was acknowledged and when.' },
  { n: 12, view: 'compliance',rail: 'Compliance',          title: 'Six open files. One of them is Sarah.',
    kicker: 'Scene 12 · Brokerage',
    lede: 'The principal broker supervises by exception. Every row opens the evidence behind it.' },
  { n: 13, view: 'lender',    rail: 'Lender',              title: 'The lender sees what it received, not what the file says now.',
    kicker: 'Scene 13 · Lender',
    lede: 'A snapshot, its provenance status, and the material changes since the version this decision was made on.' },
  { n: 14, view: 'any',       rail: 'Evidence graph',      title: 'One number, followed from the day it was said.',
    kicker: 'Scene 14 · All parties',
    lede: 'Click a node to open the object behind it. Click the income trail to highlight the path a reviewer would follow.' },
  { n: 15, view: 'any',       rail: 'Transaction record',  title: 'One consumer journey. One re-performable record.',
    kicker: 'Scene 15 · Output',
    lede: 'Generated from the events above in a single action. A preview, not a certified or approved report.' }
];

var state = { scene: 1, view: 'consumer', asked: [], recognized: null, packetSent: false, connected: false };

/* ---------- scene bodies ---------- */
function sceneBody(n) {
  switch (n) {
    case 1: return s1();
    case 2: return s2();
    case 3: return s3();
    case 4: return s4();
    case 5: return s5();
    case 6: return s6();
    case 7: return s7();
    case 8: return s8();
    case 9: return s9();
    case 10: return s10();
    case 11: return s11();
    case 12: return s12();
    case 13: return s13();
    case 14: return s14();
    case 15: return s15();
  }
  return '';
}

function s1() {
  var g = D.guardian.opening;
  var blocks = g.reply.blocks.map(function (b) {
    return '<div class="bub-blk"><div class="bk">' + esc(b.head) + '</div><div class="bv">' + esc(b.body) + '</div></div>';
  }).join('');
  var edu = D.guardian.education.map(function (e, i) {
    return '<button data-edu="' + i + '">' + esc(e.q) + '</button>';
  }).join('');
  return '<div class="grid-side">' +
    '<div class="chatwrap"><div class="chatlog" id="s1log">' +
      '<div class="bub bub-user">' + esc(g.user) + '</div>' +
      '<div class="bub bub-ai"><div class="bhead">' + GUARDIAN + '</div>' + esc(g.reply.lead) + blocks + '</div>' +
      '<div class="bub-note">' + esc(g.reply.note) + '</div>' +
    '</div>' +
    '<div class="chatask"><div class="presets" id="s1presets">' + edu + '</div>' +
    '<div style="font-size:11.5px; color:var(--text-3); margin-top:11px">Education answers carry no evidence references, because at this point there is no transaction to reference.</div>' +
    '</div></div>' +
    '<div>' +
      '<div class="card"><div class="card-h"><span class="ct">Created in this scene</span></div><div class="card-b">' +
        '<div class="row"><span class="rk">Transaction</span><span class="rv">' + D.meta.txId + '</span></div>' +
        '<div class="row"><span class="rk">Opened</span><span class="rv">' + fmtDate(D.meta.opened) + '</span></div>' +
        '<div class="row"><span class="rk">Parties</span><span class="rv">1</span></div>' +
        '<div class="row"><span class="rk">Facts captured</span><span class="rv">2</span></div>' +
        '<div class="row"><span class="rk">Shared with anyone</span><span class="rv">No</span></div>' +
      '</div></div>' +
      '<div class="note note-mute" style="margin-top:16px">The consumer wedge starts here. Adoption does not require a broker, a lender or an integration.</div>' +
    '</div></div>';
}

function s2() {
  var prof = D.readiness.profile.map(function (p) {
    return '<div class="row"><span class="rk">' + esc(p.label) + '</span>' + pill(p.state) + '</div>';
  }).join('');
  var docs = D.readiness.documents.map(function (d, i) {
    return '<button class="rowbtn" data-why="' + i + '">' +
      '<span><span class="rk" style="display:block; color:var(--text); font-weight:600">' + esc(d.label) + '</span>' +
      '<span style="font-size:11.5px; color:var(--text-3)">Why this is asked for</span></span>' + pill(d.state) + '</button>';
  }).join('');
  return '<div class="grid-2">' +
    '<div class="card"><div class="card-h"><span class="ct">Profile</span><span class="pill p-info"><span class="dot"></span>5 of 6 complete</span></div>' +
      '<div class="card-b">' + prof + '</div></div>' +
    '<div class="card"><div class="card-h"><span class="ct">Documents</span><span class="pill p-warn"><span class="dot"></span>1 needs attention</span></div>' +
      '<div class="card-b" style="padding:8px 12px">' + docs + '</div></div>' +
    '</div>' +
    '<div class="note note-mute" style="margin-top:20px">A readiness view is used here as user experience only. It does not imply creditworthiness, and it is not an indication of approval probability.</div>';
}

function s3() {
  return '<div class="grid-2">' +
    '<div class="card"><div class="card-h"><span class="ct">Path A · consumer-led</span></div><div class="card-b">' +
      '<h4 style="margin-bottom:10px">Sarah invites a professional she already knows.</h4>' +
      '<p style="font-size:14.4px; color:var(--text-2)">She searches for a mortgage professional or sends an invitation to one. Access starts at zero and is granted deliberately.</p>' +
      '<button class="btn btn-ghost btn-sm" style="margin-top:18px" data-invite="1">Send an invitation</button>' +
    '</div></div>' +
    '<div class="card"><div class="card-h"><span class="ct">Path B · broker-led</span></div><div class="card-b">' +
      '<h4 style="margin-bottom:10px">Alex sends Sarah a 4orm invitation before their first meeting.</h4>' +
      '<p style="font-size:14.4px; color:var(--text-2)">The professional brings the client onto the record. This is the second acquisition channel, and it is the one that scales through brokerages.</p>' +
      '<button class="btn btn-ghost btn-sm" style="margin-top:18px" data-invite="2">Accept an invitation</button>' +
    '</div></div></div>' +
    '<div class="card" style="margin-top:20px"><div class="card-h"><span class="ct">The professional on this file</span>' + pill('Active') + '</div><div class="card-b">' +
      '<div class="grid-3">' +
        '<div><div class="kv"><span class="k">Name</span><span class="v">Alex Chen</span>' +
          '<span class="k">Brokerage</span><span class="v">Northbridge Mortgage Group</span>' +
          '<span class="k">Licence status</span><span class="v" style="color:var(--text-3)">Placeholder for the demo</span></div></div>' +
        '<div><div class="kv"><span class="k">Service areas</span><span class="v">Ottawa, Eastern Ontario</span>' +
          '<span class="k">Languages</span><span class="v">English, Mandarin</span>' +
          '<span class="k">Principal broker</span><span class="v">J. Okonkwo</span></div></div>' +
        '<div>' + (state.connected
            ? '<div class="pill p-ok" style="font-size:12px; padding:6px 13px"><span class="dot"></span>Connected 24 Feb 2026 · 09:05</div>' +
              '<div style="font-size:12.5px; color:var(--text-2); margin-top:10px">Scope: profile, documents and journey. Withdrawable at any time from the consent centre.</div>'
            : '<button class="btn btn-primary btn-sm" data-connect="1">Connect to Mortgage Passport</button>') +
          '<div style="font-size:11.5px; color:var(--text-3); margin-top:10px">No ratings or reviews are shown. The demo does not invent them.</div></div>' +
      '</div>' +
    '</div></div>';
}

function s4() {
  var rows = D.documents.map(function (d) {
    return '<tr class="clickable" data-doc="' + d.id + '">' +
      '<td><b>' + esc(d.label) + '</b><div style="font-size:11.5px; color:var(--text-3); margin-top:2px">' + esc(d.source) + '</div></td>' +
      '<td>' + esc(d.kind) + '</td>' +
      '<td class="mono" style="font-size:11.5px; color:var(--text-3)">' + fmtStamp(d.ts) + '</td>' +
      '<td>' + pill(d.status) + '</td></tr>';
  }).join('');
  return '<div class="grid-side">' +
    '<div class="card"><div class="card-h"><span class="ct">Evidence register</span><span style="font-size:11.5px; color:var(--text-3)">Click any row</span></div>' +
      '<div class="card-b"><div class="tblwrap"><table class="tbl"><thead><tr><th>Object</th><th>Type</th><th>Received</th><th>Status</th></tr></thead>' +
      '<tbody>' + rows + '</tbody></table></div></div></div>' +
    '<div>' +
      '<div class="card"><div class="card-h"><span class="ct">The request that started it</span></div><div class="card-b">' +
        '<div class="tl"><div class="ev"><div class="et">18 Mar 2026 · 09:40</div><div class="el">Alex requested an employment letter</div><div class="ea">Explained by Guardian in plain language</div></div>' +
        '<div class="ev"><div class="et">6 Apr 2026 · 16:22</div><div class="el">Sarah recorded a note about a phone call</div><div class="ea">Stored as recollection, not as fact</div></div></div>' +
      '</div></div>' +
      '<div class="note note-warn" style="margin-top:16px">A consumer recollection is evidence that a conversation was recalled a certain way. It is not evidence that the other party said it.</div>' +
    '</div></div>';
}

function s5() {
  var groups = {};
  D.facts.forEach(function (f) { (groups[f.group] = groups[f.group] || []).push(f); });
  var cols = Object.keys(groups).map(function (g) {
    var rows = groups[g].map(function (f) {
      return '<button class="rowbtn" data-fact="' + f.id + '">' +
        '<span class="rk">' + esc(f.label) + '</span>' +
        '<span style="display:flex; align-items:center; gap:9px"><span class="rv"' + (f.status === 'Discrepancy' ? ' style="color:var(--danger)"' : '') + '>' + esc(f.value) + '</span>' +
        '<span class="prov">Trace</span></span></button>';
    }).join('');
    return '<div class="card"><div class="card-h"><span class="ct">' + esc(g) + '</span></div><div class="card-b" style="padding:6px 10px">' + rows + '</div></div>';
  }).join('');
  return '<div class="grid-3" style="align-items:start">' + cols + '</div>' +
    '<div class="note note-info" style="margin-top:20px">Click any value to open its provenance: the original statement, the supporting evidence, every change with its actor, and the organizations that have received it.</div>';
}

function s6() {
  var rows = D.consents.map(function (c) {
    return '<button class="rowbtn" data-consent="' + c.id + '" style="align-items:flex-start">' +
      '<span><span class="rk" style="display:block; color:var(--text); font-weight:600">' + esc(c.label) + '</span>' +
      '<span style="font-size:11.5px; color:var(--text-3)">' + esc(c.scope) + ' · ' + (c.granted ? fmtDate(c.granted) : 'not granted') + '</span></span>' +
      pill(c.state) + '</button>';
  }).join('');
  return '<div class="grid-side">' +
    '<div class="card"><div class="card-h"><span class="ct">Permissions</span><span style="font-size:11.5px; color:var(--text-3)">Click any row</span></div>' +
      '<div class="card-b" style="padding:8px 12px">' + rows + '</div></div>' +
    '<div>' +
      '<div class="card"><div class="card-h"><span class="ct">Two different things</span></div><div class="card-b">' +
        '<h4 style="margin-bottom:8px">Future access</h4>' +
        '<p style="font-size:14px; color:var(--text-2)">Can be narrowed or withdrawn at any time. Takes effect from the timestamp of the withdrawal.</p>' +
        '<h4 style="margin:18px 0 8px">Past reliance</h4>' +
        '<p style="font-size:14px; color:var(--text-2)">A permission that has already been used stays on the record with the date it was used. Withdrawing it going forward does not remove that.</p>' +
      '</div></div>' +
      '<div class="note note-mute" style="margin-top:16px">The credit inquiry on 24 Mar 2026 is the clearest case. It happened. It stays in the record.</div>' +
    '</div></div>';
}

function s7() {
  var sub = D.submissions[0];
  var contents = sub.contents.map(function (c) {
    return '<div class="row"><span class="rk">' + esc(c) + '</span><span class="pill p-ok"><span class="dot"></span>Included</span></div>';
  }).join('');
  return '<div class="grid-side">' +
    '<div>' +
      '<div class="card"><div class="card-h"><span class="ct">Review before sending</span><span class="mono" style="font-size:11.5px; color:var(--text-3)">' + fmtStamp(sub.ts) + '</span></div>' +
        '<div class="card-b">' +
          '<div class="kv" style="margin-bottom:16px">' +
            '<span class="k">Recipient</span><span class="v">' + esc(sub.lender) + '</span>' +
            '<span class="k">Purpose</span><span class="v">' + esc(sub.purpose) + '</span>' +
            '<span class="k">Application</span><span class="v">Version ' + sub.appVersion + '</span>' +
          '</div>' + contents +
          '<div style="margin-top:18px; display:flex; gap:10px; align-items:center; flex-wrap:wrap">' +
            '<button class="btn btn-primary btn-sm" data-send="1">Acknowledge and send</button>' +
            '<span style="font-size:12.5px; color:var(--text-3)">Sarah acknowledged this at ' + fmtTime(sub.acknowledged) + ':' + sub.acknowledged.slice(-2) + '</span>' +
          '</div>' +
        '</div></div>' +
      '<div class="flight" id="flight">' +
        '<div class="node"><div class="nk">From</div><div class="nn">Sarah &amp; Alex</div></div>' +
        '<div class="track"><span class="pk" id="packet">&#9993;</span></div>' +
        '<div class="node"><div class="nk">To</div><div class="nn">Maple Bank</div></div>' +
      '</div>' +
    '</div>' +
    '<div>' +
      '<div class="card"><div class="card-h"><span class="ct">What 4orm keeps</span></div><div class="card-b">' +
        '<p style="font-size:14.2px; color:var(--text-2)">A snapshot of the package as it stood at the moment of transmission. If the file changes afterwards, the snapshot does not.</p>' +
        '<div class="row" style="margin-top:14px"><span class="rk">Snapshot</span><span class="rv">V1 · frozen</span></div>' +
        '<div class="row"><span class="rk">Acknowledged</span><span class="rv">12 seconds later</span></div>' +
        '<div class="row"><span class="rk">Decision received</span><span class="rv">' + fmtDate(sub.decisionTs) + '</span></div>' +
        '<div class="row"><span class="rk">Outcome</span>' + pill(sub.decision) + '</div>' +
      '</div></div>' +
      '<div class="note note-warn" style="margin-top:16px">' + esc(sub.reason) + '</div>' +
    '</div></div>';
}

function s8() {
  var f = factById('f.income');
  var recognized = state.recognized;
  var answer = '';
  if (recognized === 'yes') {
    answer = '<div class="note note-warn" style="margin-top:18px"><b>Recorded: the consumer recognizes the change.</b> ' +
      'The exception stays open until a document supporting $136,000 is on file. Recognition is not evidence of income.</div>';
  } else if (recognized === 'no') {
    answer = '<div class="note note-warn" style="margin-top:18px"><b>Recorded: the consumer does not recognize the change.</b> ' +
      'The file is flagged for the principal broker, Cascade Trust is notified that the figure it relied on is under review, and the exception is carried into the transaction record.</div>';
  }
  return '<div class="grid-side">' +
    '<div>' +
      '<div class="alertcard">' +
        '<div class="ah"><span class="ic">!</span><span class="tt">A value on your application changed</span></div>' +
        '<div class="ab">' +
          '<div class="delta"><span class="was">$118,000</span><span class="arr">&rarr;</span><span class="now">$136,000</span></div>' +
          '<div class="support">Annual employment income. Supporting evidence on file currently supports approximately <b class="mono">$118,400</b>. Do you recognize this change?</div>' +
          '<div class="choices">' +
            '<button data-fact="f.income">Review change</button>' +
            '<button data-ask="0">Ask Guardian why</button>' +
            '<button data-recog="yes">I recognize this</button>' +
            '<button data-recog="no">I do not recognize this</button>' +
          '</div>' + answer +
        '</div></div>' +
      '<div class="note note-mute" style="margin-top:18px">The product states the discrepancy and the evidence available. It does not allege that anyone did anything wrong. An anomaly is a question for the people on the file, not a finding against one of them.</div>' +
    '</div>' +
    '<div>' +
      '<div class="card"><div class="card-h"><span class="ct">The change record</span></div><div class="card-b">' +
        '<div class="kv">' +
          '<span class="k">Actor</span><span class="v">Alex Chen</span>' +
          '<span class="k">Timestamp</span><span class="v mono">6 Apr 2026 · 15:12</span>' +
          '<span class="k">Previous value</span><span class="v mono">$118,000</span>' +
          '<span class="k">New value</span><span class="v mono chg">$136,000</span>' +
          '<span class="k">Source version</span><span class="v">Application V2</span>' +
          '<span class="k">Document attached</span><span class="v" style="color:var(--danger)">None</span>' +
          '<span class="k">Evidence supports</span><span class="v mono">$118,400</span>' +
        '</div>' +
        '<div style="margin-top:16px; padding-top:14px; border-top:1px solid var(--border)">' +
          '<div style="font-size:10.5px; font-weight:800; letter-spacing:.13em; text-transform:uppercase; color:var(--text-3); margin-bottom:10px">Downstream recipients</div>' +
          '<div class="row"><span class="rk">Cascade Trust</span><span class="rv" style="font-family:var(--font-sans); font-weight:600">Received 7 Apr</span></div>' +
          '<div class="row"><span class="rk">Conditional approval</span><span class="rv" style="font-family:var(--font-sans); font-weight:600; color:var(--danger)">Relied on V2</span></div>' +
        '</div>' +
      '</div></div>' +
      '<button class="btn btn-ghost btn-sm" style="margin-top:16px; width:100%" data-fact="f.income">Open the full provenance</button>' +
    '</div></div>';
}

function s9() {
  var presets = D.guardian.presets.map(function (p, i) {
    return '<button data-ask="' + i + '"' + (state.asked.indexOf(i) > -1 ? ' disabled' : '') + '>' + esc(p.q) + '</button>';
  }).join('');
  return '<div class="chatwrap" style="height:620px"><div class="chatlog" id="chatlog">' +
    '<div class="bub bub-ai"><div class="bhead">' + GUARDIAN + '</div>' +
    'Ask about this file. Answers come from the transaction record, and every factual line shows the object it came from.</div>' +
    '</div><div class="chatask"><div class="presets" id="presets">' + presets + '</div>' +
    '<div style="font-size:11.5px; color:var(--text-3); margin-top:11px">Preset questions keep the demonstration deterministic. Free-form questions are a later phase, constrained to this record and approved mortgage education content.</div>' +
    '</div></div>';
}

function s10() {
  var open = D.documents.filter(function (d) { return d.status === 'Needs attention'; });
  return '<div class="grid-3" style="align-items:start">' +
    '<div class="card"><div class="card-h"><span class="ct">Client readiness</span></div><div class="card-b">' +
      '<div class="row"><span class="rk">Profile</span><span class="rv">5 of 6</span></div>' +
      '<div class="row"><span class="rk">Documents verified</span><span class="rv">5 of 8</span></div>' +
      '<div class="row"><span class="rk">Consent</span>' + pill('Active') + '</div>' +
      '<div class="row"><span class="rk">Stage</span><span class="rv" style="font-family:var(--font-sans); font-weight:600">Conditional approval</span></div>' +
    '</div></div>' +
    '<div class="card"><div class="card-h"><span class="ct">Outstanding</span><span class="pill p-warn"><span class="dot"></span>' + open.length + ' open</span></div><div class="card-b" style="padding:8px 12px">' +
      open.map(function (d) { return '<button class="rowbtn" data-doc="' + d.id + '"><span class="rk">' + esc(d.label) + '</span>' + pill(d.status) + '</button>'; }).join('') +
      '<button class="rowbtn" data-fact="f.tenure"><span class="rk">Time in role, unsupported</span>' + pill('Needs attention') + '</button>' +
    '</div></div>' +
    '<div class="card"><div class="card-h"><span class="ct">Unresolved discrepancies</span><span class="pill p-bad"><span class="dot"></span>1 open</span></div><div class="card-b" style="padding:8px 12px">' +
      '<button class="rowbtn" data-fact="f.income"><span><span class="rk" style="display:block; color:var(--text); font-weight:600">Annual income</span>' +
      '<span style="font-size:11.5px; color:var(--text-3)">V1 $118,000 &rarr; V2 $136,000</span></span>' + pill('Discrepancy') + '</button>' +
    '</div></div>' +
    '</div>' +
    '<div class="grid-2" style="margin-top:20px; align-items:start">' +
      '<div class="card"><div class="card-h"><span class="ct">Submission history</span></div><div class="card-b" style="padding:8px 12px">' +
        D.submissions.map(function (s) {
          return '<button class="rowbtn" data-sub="' + s.id + '"><span><span class="rk" style="display:block; color:var(--text); font-weight:600">' + esc(s.lender) + ' · V' + s.appVersion + '</span>' +
            '<span style="font-size:11.5px; color:var(--text-3)">' + fmtStamp(s.ts) + '</span></span>' + pill(s.decision) + '</button>';
        }).join('') +
      '</div></div>' +
      '<div class="card"><div class="card-h"><span class="ct">Transaction timeline</span></div><div class="card-b" style="max-height:330px; overflow-y:auto">' + timelineHtml() + '</div></div>' +
    '</div>' +
    '<div class="note note-info" style="margin-top:20px">Nothing on this screen was entered twice. It is the consumer\'s own activity, read from the other side, which is where the file-reconstruction hours go today.</div>';
}

function timelineHtml() {
  return '<div class="tl">' + D.events.map(function (e) {
    var cls = (e.type === 'exception' || e.type === 'change') ? ' hi' : (e.type === 'decision' ? ' ok' : '');
    return '<div class="ev' + cls + '"><div class="et">' + fmtStamp(e.ts) + '</div>' +
      '<div class="el">' + esc(e.label) + '</div><div class="ea">' + esc(e.actor) + '</div></div>';
  }).join('') + '</div>';
}

function s11() {
  var su = D.suitability;
  var opts = su.considered.map(function (o, i) {
    return '<tr class="clickable" data-option="' + i + '"><td><b>' + esc(o.option) + '</b></td><td>' + pill(o.outcome === 'Recommended' ? 'Verified' : 'Discussed') +
      '</td><td style="color:var(--text-2)">' + esc(o.why) + '</td></tr>';
  }).join('');
  var risks = su.risks.map(function (r, i) {
    return '<button class="rowbtn" data-risk="' + i + '"><span class="rk">' + esc(r.label) + '</span>' +
      '<span class="rv" style="font-size:11.5px; color:var(--text-3)">Acknowledged ' + fmtStamp(r.acknowledged) + '</span></button>';
  }).join('');
  var gaps = su.gaps.map(function (g) { return '<li>' + esc(g) + '</li>'; }).join('');
  return '<div class="card"><div class="card-h"><span class="ct">Client objectives, as recorded</span></div><div class="card-b">' +
    '<p style="font-size:15px; color:var(--text-2)">' + esc(su.objectives) + '</p></div></div>' +
    '<div class="card" style="margin-top:20px"><div class="card-h"><span class="ct">Options considered</span></div><div class="card-b">' +
    '<div class="tblwrap"><table class="tbl"><thead><tr><th>Option</th><th>Outcome</th><th>Reason recorded at the time</th></tr></thead><tbody>' + opts + '</tbody></table></div></div></div>' +
    '<div class="grid-2" style="margin-top:20px; align-items:start">' +
      '<div class="card"><div class="card-h"><span class="ct">Risks and disclosures</span><span style="font-size:11.5px; color:var(--text-3)">Click a row</span></div><div class="card-b" style="padding:8px 12px">' + risks + '</div></div>' +
      '<div class="card"><div class="card-h"><span class="ct">Open evidence gaps</span><span class="pill p-warn"><span class="dot"></span>' + su.gaps.length + '</span></div>' +
        '<div class="card-b"><ul style="margin:0; padding-left:18px; font-size:14px; color:var(--text-2); line-height:1.8">' + gaps + '</ul>' +
        '<div class="note note-mute" style="margin-top:14px">Gaps are stated in the record rather than left out of it. A reviewer who cannot see the gap cannot supervise the file.</div></div></div>' +
    '</div>';
}

function s12() {
  var rows = D.exceptions.map(function (e) {
    return '<tr class="clickable' + (e.isDemo ? ' flagged' : '') + '"' + (e.isDemo ? ' data-goto="8"' : ' data-portfolio="1"') + '>' +
      '<td class="mono" style="font-size:11.5px">' + esc(e.file) + '</td>' +
      '<td><b>' + esc(e.client) + '</b></td><td>' + esc(e.broker) + '</td><td>' + esc(e.issue) + '</td>' +
      '<td>' + pill(e.severity === 'High' ? 'Open' : e.severity === 'Medium' ? 'Review' : 'Monitoring') + '</td>' +
      '<td class="mono" style="font-size:11.5px; color:var(--text-3)">' + esc(e.age) + '</td></tr>';
  }).join('');
  return '<div class="grid-3" style="margin-bottom:20px">' +
    '<div class="card"><div class="card-b"><div style="font-size:11px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:var(--text-3)">Open exceptions</div>' +
      '<div class="mono" style="font-size:36px; font-weight:800; margin-top:6px">6</div></div></div>' +
    '<div class="card"><div class="card-b"><div style="font-size:11px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:var(--text-3)">Material changes after submission</div>' +
      '<div class="mono" style="font-size:36px; font-weight:800; margin-top:6px; color:var(--danger)">1</div></div></div>' +
    '<div class="card"><div class="card-b"><div style="font-size:11px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:var(--text-3)">Files missing a rationale</div>' +
      '<div class="mono" style="font-size:36px; font-weight:800; margin-top:6px; color:var(--warn)">1</div></div></div>' +
    '</div>' +
    '<div class="card"><div class="card-h"><span class="ct">Exception queue · Northbridge Mortgage Group</span><span style="font-size:11.5px; color:var(--text-3)">Sarah\'s file is highlighted</span></div>' +
    '<div class="card-b"><div class="tblwrap"><table class="tbl"><thead><tr><th>File</th><th>Client</th><th>Broker</th><th>Issue</th><th>State</th><th>Age</th></tr></thead><tbody>' + rows + '</tbody></table></div></div></div>' +
    '<div class="note note-mute" style="margin-top:20px">Five of these files are invented portfolio filler so the queue reads realistically. Only Sarah Mitchell has a full record behind her.</div>';
}

function s13() {
  var s2 = D.submissions[1];
  var contents = s2.contents.map(function (c) { return '<div class="row"><span class="rk">' + esc(c) + '</span>' + pill('Received') + '</div>'; }).join('');
  return '<div class="grid-side">' +
    '<div>' +
      '<div class="card"><div class="card-h"><span class="ct">Package as received · Cascade Trust</span><span class="mono" style="font-size:11.5px; color:var(--text-3)">' + fmtStamp(s2.ts) + '</span></div>' +
        '<div class="card-b">' + contents +
        '<div class="note note-warn" style="margin-top:16px"><b>Material change since this version.</b> Annual income was reconciled to $118,400 in V3 on 20 Apr 2026. This decision was made on V2.</div>' +
        '</div></div>' +
      '<div class="card" style="margin-top:20px"><div class="card-h"><span class="ct">Provenance status of values relied upon</span></div><div class="card-b" style="padding:8px 12px">' +
        '<button class="rowbtn" data-fact="f.income"><span class="rk">Annual income · $136,000</span>' + pill('Discrepancy') + '</button>' +
        '<button class="rowbtn" data-fact="f.savings"><span class="rk">Savings · $145,320</span>' + pill('Verified') + '</button>' +
        '<button class="rowbtn" data-fact="f.debt"><span class="rk">Monthly debts · $312</span>' + pill('Self-reported') + '</button>' +
        '<button class="rowbtn" data-fact="f.down"><span class="rk">Down payment · $124,000</span>' + pill('Verified') + '</button>' +
      '</div></div>' +
    '</div>' +
    '<div>' +
      '<div class="card"><div class="card-h"><span class="ct">Decision</span></div><div class="card-b">' +
        '<div class="kv"><span class="k">Outcome</span><span class="v">' + esc(s2.decision) + '</span>' +
        '<span class="k">Date</span><span class="v mono">' + fmtDate(s2.decisionTs) + '</span>' +
        '<span class="k">Relied on</span><span class="v">Application V2</span>' +
        '<span class="k">Broker</span><span class="v">Alex Chen</span>' +
        '<span class="k">Brokerage</span><span class="v">Northbridge</span></div>' +
        '<div class="note note-mute" style="margin-top:14px">' + esc(s2.reason) + '</div>' +
      '</div></div>' +
      '<div class="note note-info" style="margin-top:16px">This does not replace the lender\'s own origination system. It makes the incoming data, and where it came from, easier to trust and to reconstruct.</div>' +
    '</div></div>';
}

function s14() {
  return '<div class="graphwrap"><div class="card-h" style="border-bottom:1px solid var(--border)">' +
    '<span class="ct">Evidence graph · ' + D.meta.txId + '</span>' +
    '<span style="display:flex; gap:8px; flex-wrap:wrap">' +
      '<button class="btn btn-ghost btn-sm" data-trail="income">Highlight the income trail</button>' +
      '<button class="btn btn-ghost btn-sm" data-trail="clear">Show everything</button>' +
    '</span></div>' +
    '<div class="graphscroll">' + graphSvg() + '</div></div>' +
    '<div class="note note-mute" style="margin-top:18px">Click any node to open the object behind it: a party, a document, a version, a permission or a decision.</div>';
}

var GKIND = {
  party:    { fill: '#EAF1FE', stroke: '#CFE0FD', tag: 'PARTY' },
  fact:     { fill: '#FBF3DC', stroke: '#E2C88B', tag: 'STATED' },
  document: { fill: '#FFFFFF', stroke: '#CCD6E4', tag: 'DOCUMENT' },
  consent:  { fill: '#E3F2FB', stroke: '#A9D4EC', tag: 'CONSENT' },
  version:  { fill: '#FFFFFF', stroke: '#142036', tag: 'VERSION' },
  decision: { fill: '#E3F6EE', stroke: '#9CCFBB', tag: 'DECISION' },
  exception:{ fill: '#FCE6EA', stroke: '#EBB6C0', tag: 'EXCEPTION' }
};
function gnodeById(id) { for (var i = 0; i < D.graph.nodes.length; i++) if (D.graph.nodes[i].id === id) return D.graph.nodes[i]; return null; }

function graphSvg() {
  var W = 1200, H = 540, NW = 122, NH = 46;
  var edges = D.graph.edges.map(function (e, i) {
    var a = gnodeById(e.from), b = gnodeById(e.to); if (!a || !b) return '';
    var x1 = a.x + NW / 2, y1 = a.y, x2 = b.x - NW / 2, y2 = b.y;
    var mx = (x1 + x2) / 2;
    var d = 'M' + x1 + ' ' + y1 + ' C ' + mx + ' ' + y1 + ', ' + mx + ' ' + y2 + ', ' + x2 + ' ' + y2;
    return '<path class="gedge" data-edge="' + e.from + '|' + e.to + '" d="' + d + '" fill="none" stroke="#CCD6E4" stroke-width="1.3"/>' +
      '<text class="gelab" x="' + mx + '" y="' + ((y1 + y2) / 2 - 5) + '" text-anchor="middle">' + esc(e.label) + '</text>';
  }).join('');
  var nodes = D.graph.nodes.map(function (n) {
    var k = GKIND[n.kind] || GKIND.document;
    return '<g class="gnode" data-node="' + n.id + '" transform="translate(' + (n.x - NW / 2) + ',' + (n.y - NH / 2) + ')">' +
      '<rect width="' + NW + '" height="' + NH + '" rx="9" fill="' + k.fill + '" stroke="' + k.stroke + '" stroke-width="1.3"/>' +
      '<text class="gkind" x="11" y="16">' + k.tag + '</text>' +
      '<text class="glabel" x="11" y="33">' + esc(n.label) + '</text></g>';
  }).join('');
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="Evidence graph">' +
    '<rect width="' + W + '" height="' + H + '" fill="#FFFFFF"/>' + edges + nodes + '</svg>';
}

function s15() {
  var m = D.meta;
  function sec(title, rows) {
    return '<h4>' + esc(title) + '</h4>' + rows.map(function (r) {
      return '<div class="rrow"><span class="k">' + esc(r[0]) + '</span><span class="v">' + esc(r[1]) + '</span></div>';
    }).join('');
  }
  var today = new Date();
  var gen = today.getDate() + ' ' + MONTHS[today.getMonth()] + ' ' + today.getFullYear();

  var body =
    '<h4>1 · Executive summary</h4>' +
    '<p style="font-size:13.6px; color:var(--text-2)">One consumer journey, from a question asked before any application existed to a lender decision now under review. ' +
      D.events.length + ' recorded events, ' + D.documents.length + ' evidence objects, ' + D.applications.length + ' application versions, ' +
      D.submissions.length + ' lender submissions and ' + D.consents.length + ' permissions. ' +
      'One material change remains unreconciled and two evidence gaps are open. Both are listed below rather than omitted.</p>' +
    sec('2 · Parties and roles', D.parties.filter(function (p) { return p.id !== 'p.4orm'; }).map(function (p) { return [p.name, p.role]; })) +
    sec('3 · Consumer profile snapshot', D.facts.map(function (f) { return [f.label, f.value + '  ·  ' + f.status]; })) +
    sec('4 · Consent and permission history', D.consents.map(function (c) {
      return [c.label, c.state + (c.granted ? '  ·  ' + fmtDate(c.granted) : '')]; })) +
    '<h4>5 · Transaction timeline</h4>' +
    D.events.map(function (e) {
      return '<div class="rrow"><span class="k mono" style="font-size:11.5px">' + fmtStamp(e.ts) + '</span>' +
        '<span class="v" style="text-align:right; font-family:var(--font-sans); font-weight:500">' + esc(e.label) + '</span></div>'; }).join('') +
    sec('6 · Document and evidence register', D.documents.map(function (d) { return [d.label, d.status + '  ·  ' + fmtDate(d.ts)]; })) +
    sec('7 · Application version history', D.applications.map(function (a) {
      return ['Version ' + a.version + '  ·  ' + fmtDate(a.created), a.fields['Annual income'] + '  ·  by ' + a.by]; })) +
    sec('8 · Submission snapshots', D.submissions.map(function (s) {
      return [s.lender + '  ·  V' + s.appVersion + '  ·  ' + fmtDate(s.ts), s.contents.length + ' items  ·  ' + s.decision]; })) +
    '<h4>9 · Suitability decision record</h4>' +
    '<div class="rrow"><span class="k">Client objectives</span><span class="v" style="text-align:right; font-family:var(--font-sans); font-weight:500; max-width:60%">' + esc(D.suitability.objectives) + '</span></div>' +
    D.suitability.considered.map(function (o) {
      return '<div class="rrow"><span class="k">' + esc(o.option) + '</span><span class="v">' + esc(o.outcome) + '</span></div>'; }).join('') +
    sec('10 · Material risks, disclosures and acknowledgements', D.suitability.risks.map(function (r) {
      return [r.label, 'Acknowledged ' + fmtStamp(r.acknowledged)]; })) +
    sec('11 · Exceptions and resolutions', [
      ['Material change after submission, annual income', 'Open'],
      ['Consumer review of the change', state.recognized === 'no' ? 'Not recognized by the consumer' : state.recognized === 'yes' ? 'Recognized, still unsupported' : 'Awaiting consumer response'],
      ['Reconciliation to the pay statement in V3', 'Sent to Cascade Trust 21 Apr 2026']]) +
    sec('12 · Decision history', D.submissions.map(function (s) {
      return [s.lender + '  ·  ' + (s.decisionTs ? fmtDate(s.decisionTs) : 'no decision yet'), s.decision + '  ·  on V' + s.appVersion]; })) +
    sec('13 · Audit log', [
      ['Events recorded', String(D.events.length)],
      ['Values with full provenance', String(D.facts.length) + ' of ' + String(D.facts.length)],
      ['Field-level changes recorded', '3'],
      ['Transmissions with a frozen snapshot', String(D.submissions.length)],
      ['Acknowledgements captured', String(D.suitability.risks.length)],
      ['Record generated', gen + '  ·  in one action']]) +
    sec('14 · Outstanding evidence gaps', D.suitability.gaps.map(function (g) { return [g, 'Open']; }));

  return '<div style="text-align:center; margin-bottom:26px">' +
    '<button class="btn btn-primary" data-generate="1">Generate transaction record</button>' +
    '<div style="font-size:12.5px; color:var(--text-3); margin-top:11px">A preview assembled from the record above. It carries no certification and no regulatory approval.</div></div>' +
    '<div id="recmount" class="hidden"><div class="rec">' +
      '<div class="rh"><div><div class="rt">Transaction record</div>' +
        '<div style="font-size:13px; color:var(--text-2); margin-top:4px">' + esc(m.client) + ' · first mortgage · ' + esc(m.jurisdiction) + '</div></div>' +
        '<div class="rs">' + m.txId + '<br/>Generated ' + gen + '<br/>Synthetic data</div></div>' +
      body +
      '<div class="rnote">Sarah Mitchell, Alex Chen, Northbridge Mortgage Group, Maple Bank and Cascade Trust are invented for this demonstration. ' +
      'Every figure, document and decision is synthetic. No bank, credit bureau, lender or regulator was contacted, and nothing here is a legal, compliance or credit opinion.</div>' +
    '</div></div>';
}

/* ============================================================
   Shell
   ============================================================ */
var VIEWS = [
  { id: 'consumer', label: 'Consumer', first: 1 },
  { id: 'broker', label: 'Broker', first: 10 },
  { id: 'compliance', label: 'Compliance', first: 12 },
  { id: 'lender', label: 'Lender', first: 13 }
];

function stageLabel(n) {
  if (n <= 2) return 'Pre-application';
  if (n <= 4) return 'Preparation';
  if (n <= 6) return 'Application';
  if (n <= 7) return 'Lender submission';
  if (n <= 9) return 'Under review';
  if (n <= 13) return 'Conditional approval';
  return 'Record assembled';
}

function buildShell() {
  var demo = $('#demo');
  var views = VIEWS.map(function (v) {
    return '<button data-view="' + v.id + '">' + v.label + '</button>';
  }).join('');
  var rail = SCENES.map(function (s) {
    return '<button data-scene="' + s.n + '"><span class="num">' + (s.n < 10 ? '0' + s.n : s.n) + '</span>' + esc(s.rail) + '</button>';
  }).join('');

  demo.innerHTML =
    '<div class="dbar"><div class="dbar-in">' +
      '<div class="dtitle"><span class="g">4</span>' + GUARDIAN + '</div>' +
      '<span class="dchip">Demo client <b>' + esc(D.meta.client) + '</b></span>' +
      '<span class="dchip opt opt-tx">Transaction <b class="mono">' + D.meta.txId + '</b></span>' +
      '<span class="dchip opt">Stage <b id="dstage">Pre-application</b></span>' +
      '<span class="spacer"></span>' +
      '<div class="vswitch" id="vswitch">' + views + '</div>' +
      '<button class="icobtn" data-reset="1" title="Reset the demonstration" aria-label="Reset the demonstration">' +
        '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/></svg></button>' +
      '<button class="icobtn" data-demo-close="1" title="Close" aria-label="Close the demonstration">' +
        '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
    '</div></div>' +
    '<div class="drail"><div class="drail-in" id="drail">' + rail + '</div></div>' +
    '<div class="dstage" id="dstageBox"><div class="dstage-in" id="sceneMount"></div></div>' +
    '<div class="dfoot"><div class="dfoot-in">' +
      '<span class="hint" id="dhint"></span>' +
      '<span class="acts">' +
        '<button class="btn btn-ghost btn-sm" data-created="1">What 4orm just created</button>' +
        '<button class="btn btn-ghost btn-sm" data-step="-1">Back</button>' +
        '<button class="btn btn-primary btn-sm" data-step="1">Next<svg class="arr" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg></button>' +
      '</span>' +
    '</div></div>';
}

function renderScene(n) {
  n = Math.max(1, Math.min(SCENES.length, n));
  state.scene = n;
  var s = SCENES[n - 1];
  if (s.view !== 'any') state.view = s.view;

  $('#sceneMount').innerHTML =
    '<div class="scene on"><div class="scene-head">' +
      '<div class="sk">' + esc(s.kicker) + '</div><h2>' + esc(s.title) + '</h2><p>' + esc(s.lede) + '</p></div>' +
      sceneBody(n) + '</div>';

  $$('#drail button').forEach(function (b) {
    var i = parseInt(b.getAttribute('data-scene'), 10);
    b.classList.toggle('on', i === n);
    b.classList.toggle('done', i < n);
  });
  var active = $('#drail button[data-scene="' + n + '"]');
  if (active && active.scrollIntoView) active.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });

  $$('#vswitch button').forEach(function (b) {
    b.classList.toggle('on', b.getAttribute('data-view') === state.view);
  });
  $('#dstage').textContent = stageLabel(n);
  $('#dhint').textContent = 'Scene ' + n + ' of ' + SCENES.length + ' · ' + s.rail;
  $('#dstageBox').scrollTop = 0;

  if (n === 7 && !state.packetSent) { setTimeout(function () { var p = $('#packet'); if (p) p.classList.add('fly'); }, 500); }
  if (n === 14) { setTimeout(function () { var sc = $('.graphscroll'); if (sc) sc.scrollLeft = 0; }, 60); }
}

function openDemo(target) {
  document.body.classList.add('is-demo');
  $('#demo').classList.add('open');
  var n = 1;
  if (target === 'broker') n = 10;
  else if (!isNaN(parseInt(target, 10))) n = parseInt(target, 10);
  renderScene(n);
}
function closeDemo() {
  document.body.classList.remove('is-demo');
  $('#demo').classList.remove('open');
  closeDrawer();
}
function resetDemo() {
  state = { scene: 1, view: 'consumer', asked: [], recognized: null, packetSent: false, connected: false };
  renderScene(1);
  toast('Demonstration reset', 'All seeded state returned to 14 Feb 2026.');
}

/* ---------- guardian answer rendering ---------- */
function answerEducation(i) {
  var e = D.guardian.education[i]; if (!e) return;
  var log = $('#s1log'); if (!log) return;
  log.appendChild(el('div', 'bub bub-user', esc(e.q)));
  log.scrollTop = log.scrollHeight;
  var t = el('div', 'bub bub-ai', '<span class="typing"><i></i><i></i><i></i></span>');
  t.style.padding = '0';
  log.appendChild(t); log.scrollTop = log.scrollHeight;
  setTimeout(function () {
    t.remove();
    var blocks = e.points.map(function (pt) { return '<div class="bub-blk"><div class="bv">' + esc(pt) + '</div></div>'; }).join('');
    log.appendChild(el('div', 'bub bub-ai', '<div class="bhead">' + GUARDIAN + '</div>' + esc(e.lead) + blocks));
    log.scrollTop = log.scrollHeight;
    var b = $('#s1presets button[data-edu="' + i + '"]');
    if (b) b.disabled = true;
  }, 900);
}

function askPreset(i) {
  var p = D.guardian.presets[i]; if (!p) return;
  var log = $('#chatlog');
  if (!log) { renderScene(9); setTimeout(function () { askPreset(i); }, 220); return; }
  if (state.asked.indexOf(i) === -1) state.asked.push(i);

  log.appendChild(el('div', 'bub bub-user', esc(p.q)));
  log.scrollTop = log.scrollHeight;

  var t = el('div', 'bub bub-ai', '<span class="typing"><i></i><i></i><i></i></span>');
  t.style.padding = '0';
  log.appendChild(t); log.scrollTop = log.scrollHeight;

  setTimeout(function () {
    t.remove();
    var a = p.a;
    var refs = a.refs.map(function (r) {
      var o = factById(r) || docById(r) || consentById(r);
      var label = o ? (o.label) : r;
      var attr = factById(r) ? 'data-fact' : docById(r) ? 'data-doc' : 'data-consent';
      return '<button class="evref" ' + attr + '="' + r + '"><span class="ei">EV</span>' + esc(label) + '</button>';
    }).join('');
    var node = el('div', 'answer',
      '<div class="alead">' + esc(a.lead) + '</div>' +
      '<div class="ablk"><div class="albl">What I found</div><ul>' + a.found.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="ablk"><div class="albl">Why this matters</div><div style="font-size:13.5px; color:var(--text-2); line-height:1.55">' + esc(a.matters) + '</div></div>' +
      '<div class="ablk"><div class="albl">What you can do next</div><ul>' + a.next.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="arefs">' + refs + '</div>');
    log.appendChild(node); log.scrollTop = log.scrollHeight;

    var pr = $('#presets');
    if (pr) {
      var btn = $('button[data-ask="' + i + '"]', pr);
      if (btn) btn.disabled = true;
    }
  }, 1100);
}

function submissionDrawer(id) {
  var s = null;
  for (var i = 0; i < D.submissions.length; i++) if (D.submissions[i].id === id) s = D.submissions[i];
  if (!s) return;
  openDrawer('Submission snapshot', s.lender + ' · Application V' + s.appVersion,
    '<div class="dsec"><div class="dst">Transmission</div><div class="kv">' +
      '<span class="k">Sent</span><span class="v mono">' + fmtStamp(s.ts) + '</span>' +
      '<span class="k">Acknowledged</span><span class="v mono">' + fmtStamp(s.acknowledged) + '</span>' +
      '<span class="k">Purpose</span><span class="v">' + esc(s.purpose) + '</span></div></div>' +
    '<div class="dsec"><div class="dst">Exactly what was sent</div>' +
      s.contents.map(function (c) { return '<div class="row"><span class="rk">' + esc(c) + '</span>' + pill('Included') + '</div>'; }).join('') + '</div>' +
    '<div class="dsec"><div class="dst">Decision</div>' + pill(s.decision) +
      '<div class="note note-mute" style="margin-top:12px">' + esc(s.reason) + '</div>' +
      (s.decisionTs ? '<div class="row"><span class="rk">Decided</span><span class="rv mono">' + fmtStamp(s.decisionTs) + '</span></div>' : '') + '</div>');
}

function createdDrawer() {
  var c = CREATED[state.scene]; if (!c) return;
  openDrawer('What 4orm just created', c.t,
    '<div class="dsec">' + c.items.map(function (i) {
      return '<div class="row"><span class="rk" style="color:var(--text)">' + esc(i) + '</span>' +
        '<span class="pill p-ok"><span class="dot"></span>Recorded</span></div>';
    }).join('') + '</div>' +
    '<div class="note note-info">The consumer never sees this list. It is the enterprise side of the same activity, and it is the part a brokerage, a lender or a reviewer pays for.</div>');
}

/* graph highlight */
function trail(kind) {
  var nodes = $$('.gnode'), edges = $$('.gedge');
  if (kind === 'clear') {
    nodes.forEach(function (n) { n.classList.remove('dim', 'hot'); });
    edges.forEach(function (e) { e.classList.remove('dim', 'hot'); });
    return;
  }
  var set = D.graph.incomeTrail;
  nodes.forEach(function (n) {
    var id = n.getAttribute('data-node');
    var on = set.indexOf(id) > -1;
    n.classList.toggle('dim', !on);
    n.classList.toggle('hot', on && (id === 'g.v2' || id === 'g.flag'));
  });
  edges.forEach(function (e) {
    var p = e.getAttribute('data-edge').split('|');
    var on = set.indexOf(p[0]) > -1 && set.indexOf(p[1]) > -1;
    e.classList.toggle('dim', !on);
    e.classList.toggle('hot', on && p[1] === 'g.v2');
  });
  toast('Income trail highlighted', 'Stated 14 Feb, supported at $118,400, changed 6 Apr, relied on 14 Apr.');
}

var GRAPH_TARGET = {
  'g.sarah':   function () { openDrawer('Party', 'Sarah Mitchell', '<div class="dsec"><div class="dst">Role</div>Consumer, first-time buyer</div><div class="dsec"><div class="dst">On this file</div><div class="kv"><span class="k">Facts stated</span><span class="v">8</span><span class="k">Documents provided</span><span class="v">7</span><span class="k">Permissions granted</span><span class="v">4</span></div></div>'); },
  'g.stated':  function () { factDrawer('f.income'); },
  'g.pay':     function () { docDrawer('d.paystub'); },
  'g.t4':      function () { docDrawer('d.t4'); },
  'g.consent': function () { consentDrawer('c.lender'); },
  'g.alex':    function () { openDrawer('Party', 'Alex Chen', '<div class="dsec"><div class="dst">Role</div>Mortgage broker, Northbridge Mortgage Group</div><div class="dsec"><div class="dst">Actions on this file</div><div class="kv"><span class="k">Versions created</span><span class="v">3</span><span class="k">Submissions sent</span><span class="v">3</span><span class="k">Changes made</span><span class="v">2</span></div></div><div class="note note-mute">The record states what was done and when. It draws no conclusion about why.</div>'); },
  'g.v1':      function () { versionDrawer(1); },
  'g.v2':      function () { versionDrawer(2); },
  'g.v3':      function () { versionDrawer(3); },
  'g.maple':   function () { submissionDrawer('s.1'); },
  'g.cascade': function () { submissionDrawer('s.2'); },
  'g.dec1':    function () { submissionDrawer('s.1'); },
  'g.dec2':    function () { submissionDrawer('s.2'); },
  'g.flag':    function () { factDrawer('f.income'); }
};

function versionDrawer(v) {
  var a = D.applications[v - 1]; if (!a) return;
  var rows = Object.keys(a.fields).map(function (k) {
    var changed = (a.changed || []).indexOf(k) > -1;
    return '<div class="row"><span class="rk">' + esc(k) + '</span><span class="rv"' + (changed ? ' style="color:var(--danger)"' : '') + '>' + esc(a.fields[k]) + (changed ? ' ·' : '') + '</span></div>';
  }).join('');
  openDrawer('Application version', 'Version ' + a.version,
    '<div class="dsec"><div class="dst">Created</div><div class="kv"><span class="k">When</span><span class="v mono">' + fmtStamp(a.created) + '</span>' +
    '<span class="k">By</span><span class="v">' + esc(a.by) + '</span></div></div>' +
    '<div class="dsec"><div class="dst">Fields</div>' + rows + '</div>' +
    '<div class="dsec"><div class="dst">Note on this version</div><div class="note note-mute">' + esc(a.note) + '</div></div>');
}

/* ============================================================
   Events
   ============================================================ */
function initEvents() {
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-demo-open],[data-demo-close],[data-reset],[data-step],[data-scene],[data-view],[data-fact],[data-doc],[data-consent],[data-sub],[data-ask],[data-created],[data-drawer-close],[data-recog],[data-trail],[data-node],[data-generate],[data-goto],[data-portfolio],[data-why],[data-invite],[data-connect],[data-send],[data-edu],[data-option],[data-risk]') : null;
    if (!t) return;
    var g = function (a) { return t.getAttribute(a); };

    if (g('data-demo-open') != null) { e.preventDefault(); openDemo(g('data-demo-open')); return; }
    if (g('data-demo-close') != null) { closeDemo(); return; }
    if (g('data-reset') != null) { resetDemo(); return; }
    if (g('data-drawer-close') != null) { closeDrawer(); return; }
    if (g('data-step') != null) { renderScene(state.scene + parseInt(g('data-step'), 10)); return; }
    if (g('data-scene') != null) { renderScene(parseInt(g('data-scene'), 10)); return; }
    if (g('data-goto') != null) { renderScene(parseInt(g('data-goto'), 10)); return; }
    if (g('data-view') != null) {
      var v = g('data-view');
      for (var i = 0; i < VIEWS.length; i++) if (VIEWS[i].id === v) renderScene(VIEWS[i].first);
      toast('Same transaction, different party', D.meta.txId + ' · stage unchanged');
      return;
    }
    if (g('data-fact') != null) { factDrawer(g('data-fact')); return; }
    if (g('data-doc') != null) { docDrawer(g('data-doc')); return; }
    if (g('data-consent') != null) { consentDrawer(g('data-consent')); return; }
    if (g('data-sub') != null) { submissionDrawer(g('data-sub')); return; }
    if (g('data-created') != null) { createdDrawer(); return; }
    if (g('data-ask') != null) {
      var idx = parseInt(g('data-ask'), 10);
      if (state.scene !== 9) { renderScene(9); setTimeout(function () { askPreset(idx); }, 260); }
      else askPreset(idx);
      return;
    }
    if (g('data-recog') != null) {
      state.recognized = g('data-recog');
      renderScene(8);
      toast(state.recognized === 'no' ? 'Recorded: change not recognized' : 'Recorded: change recognized',
        'The response is stored as an event with its timestamp.');
      return;
    }
    if (g('data-trail') != null) { trail(g('data-trail')); return; }
    if (g('data-node') != null) {
      var fn = GRAPH_TARGET[g('data-node')];
      if (fn) fn(); else toast('Node opened', g('data-node'));
      return;
    }
    if (g('data-generate') != null) {
      var m = $('#recmount');
      if (m) { m.classList.remove('hidden'); m.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      toast('Transaction record generated', '14 sections assembled from ' + D.events.length + ' recorded events.');
      return;
    }
    if (g('data-portfolio') != null) {
      toast('Portfolio filler', 'Only Sarah Mitchell has a full record behind her in this demonstration.');
      return;
    }
    if (g('data-why') != null) {
      var d = D.readiness.documents[parseInt(g('data-why'), 10)];
      if (d) openDrawer('Why this is asked for', d.label,
        '<div class="dsec"><div class="dst">Guardian explains</div><div class="note note-info">' + esc(d.why) + '</div></div>' +
        '<div class="dsec"><div class="dst">Current state</div>' + pill(d.state) + '</div>');
      return;
    }
    if (g('data-invite') != null) {
      toast(g('data-invite') === '1' ? 'Invitation sent to a mortgage professional' : 'Invitation from Alex Chen accepted',
        'No data has moved yet. Access starts when the permission is granted.');
      return;
    }
    if (g('data-connect') != null) {
      state.connected = true;
      renderScene(3);
      toast('Alex Chen connected to the Mortgage Passport', 'Permission granted 24 Feb 2026 · scoped and withdrawable.');
      return;
    }
    if (g('data-edu') != null) { answerEducation(parseInt(g('data-edu'), 10)); return; }
    if (g('data-option') != null) {
      var o = D.suitability.considered[parseInt(g('data-option'), 10)];
      if (o) openDrawer('Option considered', o.option,
        '<div class="dsec"><div class="dst">Outcome</div>' + pill(o.outcome === 'Recommended' ? 'Verified' : 'Discussed') + '</div>' +
        '<div class="dsec"><div class="dst">Reason recorded at the time</div><div class="note note-info">' + esc(o.why) + '</div></div>' +
        '<div class="dsec"><div class="dst">Why this is kept</div><div class="note note-mute">A reviewer re-performing the assessment needs the options that were rejected, and why, not only the one that was chosen.</div></div>');
      return;
    }
    if (g('data-risk') != null) {
      var rk = D.suitability.risks[parseInt(g('data-risk'), 10)];
      if (rk) openDrawer('Disclosure and acknowledgement', rk.label,
        '<div class="dsec"><div class="dst">Acknowledgement</div><div class="kv">' +
        '<span class="k">Acknowledged by</span><span class="v">Sarah Mitchell</span>' +
        '<span class="k">Timestamp</span><span class="v mono">' + fmtStamp(rk.acknowledged) + '</span>' +
        '<span class="k">Method</span><span class="v">In-product acknowledgement</span></div></div>' +
        '<div class="note note-mute">The acknowledgement is a first-class record, not a line inside a signed document that has to be found again later.</div>');
      return;
    }
    if (g('data-send') != null) {
      state.packetSent = true;
      var p = $('#packet'); if (p) { p.classList.remove('fly'); void p.offsetWidth; p.classList.add('fly'); }
      toast('Package sent to Maple Bank', 'Snapshot frozen. Acknowledged 12 seconds later.');
      return;
    }
  });

  $('#scrim').addEventListener('click', closeDrawer);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if ($('#drawer').classList.contains('open')) { closeDrawer(); return; }
      if ($('#demo').classList.contains('open')) closeDemo();
    }
    if (!$('#demo').classList.contains('open')) return;
    if ($('#drawer').classList.contains('open')) return;
    if (e.key === 'ArrowRight') renderScene(state.scene + 1);
    if (e.key === 'ArrowLeft') renderScene(state.scene - 1);
  });
}

/* ============================================================
   Boot
   ============================================================ */
function boot() {
  initHeroChat();
  buildShell();
  initEvents();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();
