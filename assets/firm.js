/* ============================================================
   The firm dashboard
   A product screen a manager operates, not a picture of one.
   Every panel is clickable and every number opens what is behind it.
   ============================================================ */
(function () {
'use strict';
var root = document.getElementById('d-firm');
if (!root) return;
function $(s){ return root.querySelector(s); }
function $$(s){ return Array.prototype.slice.call(root.querySelectorAll(s)); }

/* ---- stage completeness ---- */
var STAGES = [
  ['Enquiry', 99, 'b', '41 files. Every one carries the question the client actually asked.'],
  ['Preparation', 96, 'b', '38 files. Two are missing a traced source of funds.'],
  ['Application', 93, 'b', '29 files. Two have an unanswered material question.'],
  ['Submission', 91, 'b', '18 files. One was changed after submission with no rationale.'],
  ['Underwriting', 84, 'g', '12 files. Below the 90 per cent target. Lender queries not being logged back.'],
  ['Commitment', 79, 'g', '6 files. Below target. Disclosure acknowledgement is the usual gap.'],
  ['Closing', 88, 'g', '4 files. One consent grant expired before funding.']
];
function drawBars(){
  var w = $('#stagebars'); if (!w) return;
  w.innerHTML = STAGES.map(function (s, i) {
    return '<button class="bx" type="button" data-bar="' + i + '">' +
      '<span class="bxl">' + s[0] + '</span>' +
      '<span class="bxt"><i class="' + s[2] + '" style="width:' + s[1] + '%"></i></span>' +
      '<span class="bxv">' + s[1] + '%</span></button>';
  }).join('') + '<div class="barout" id="barout"></div>';
  $$('[data-bar]').forEach(function (b) {
    b.addEventListener('click', function () {
      var s = STAGES[+b.getAttribute('data-bar')];
      $$('[data-bar]').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      $('#barout').innerHTML = '<b>' + s[0] + '</b> ' + s[3];
      $('#barout').classList.add('show');
    });
  });
}

/* ---- clients ---- */
var WHO = [
  ['SM','b','Sarah Mitchell','Waiting on an answer about the rate change','6 days','bad',
   'Asked on 18 Feb why the rate on her commitment moved from 4.94 to 5.61. No reply recorded. Her file holds the original quote, the revised one, and the time between them.'],
  ['TO','g','Tomas Oyelaran','Asked twice for the same document','5 days','bad',
   'The same pay stub was requested on 14 Feb and again on 19 Feb. The first upload is in the record. This is a handling gap, not a client gap.'],
  ['RK','p','Renu Kaur','Has not acknowledged the disclosure sent','4 days','warn',
   'Key Facts v3.2 sent 20 Feb, delivered, never opened. Closing is 11 days out. The record shows sent and unopened, which is the fact that matters later.'],
  ['DW','b','Daniel Weir','Down payment source still untraced','3 days','warn',
   'A deposit of 18,000 dollars landed 9 Feb with no source attached. Until it is traced the file cannot evidence where the money came from.'],
  ['MC','g','Mei Chen','Renewal window opens in eleven days','upcoming','',
   'Nothing is wrong. Her term ends 7 Mar and the file is complete. Contacting her now is the difference between a renewal and a departure.']
];
function drawWho(){
  var w = $('#wholist'); if (!w) return;
  w.innerHTML = WHO.map(function (c, i) {
    return '<button class="who" type="button" data-who="' + i + '">' +
      '<span class="av ' + c[1] + '">' + c[0] + '</span>' +
      '<span class="wt"><b>' + c[2] + '</b>' + c[3] + '</span>' +
      '<span class="wd ' + c[5] + '">' + c[4] + '</span></button>';
  }).join('') + '<div class="whoout" id="whoout"></div>';
  $$('[data-who]').forEach(function (b) {
    b.addEventListener('click', function () {
      var c = WHO[+b.getAttribute('data-who')];
      $$('[data-who]').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      $('#whoout').innerHTML = '<b>' + c[2] + '</b>' + c[6] +
        '<span class="whoact"><i>Open the file</i><i>Reply now</i><i>Mark handled</i></span>';
      $('#whoout').classList.add('show');
    });
  });
}

/* ---- exceptions ---- */
var CK = [
  ['bad','Rationale missing','on an application changed after submission','today'],
  ['bad','Consent grant expired','while the file is still being worked','today'],
  ['warn','Disclosure never opened','eleven days before closing','2 days'],
  ['warn','Two income figures conflict','neither marked as correct','3 days'],
  ['warn','Suitability note not recorded','against a recommendation','4 days'],
  ['ok','Identity re-verified','on two files','done'],
  ['ok','Trust deposit reconciled','and evidenced','done']
];
function drawCk(){
  var w = $('#cklist'); if (!w) return;
  w.innerHTML = CK.map(function (c, i) {
    return '<button class="ck' + (c[0] === 'ok' ? ' done' : '') + '" type="button" data-ck="' + i + '">' +
      '<i class="lt ' + c[0] + '"></i><span class="ckt"><b>' + c[1] + '</b> ' + c[2] + '</span>' +
      '<span class="ckd">' + c[3] + '</span></button>';
  }).join('');
  $$('[data-ck]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.classList.contains('done')) return;
      b.classList.add('done');
      b.querySelector('.lt').className = 'lt ok';
      b.querySelector('.ckd').textContent = 'resolved';
      var left = $$('[data-ck]').filter(function (x) { return !x.classList.contains('done'); }).length;
      var tile = root.querySelector('.tile.alert .tv');
      if (tile) tile.textContent = left;
      var em = root.querySelector('[data-view="exceptions"] em');
      if (em) em.textContent = left;
    });
  });
}

/* ---- evidence pack ---- */
var EP = [
  ['412','Conversations','In app messages between the client and the firm, timestamped, in the words used',
   'Every message either side sent, with who sent it, when, and what it was about. Nothing is summarised: the words are the record.'],
  ['1,046','Emails','Captured with attachments, sender, recipients and whether it was opened',
   'Pulled from the firm mailbox against the file. Attachments are versioned, so the pack shows which copy was sent, not just that something was.'],
  ['88','Screenshots','What the client was shown, as they saw it, with the version on screen',
   'Taken at the moment of a material disclosure. Later argument about what was on screen stops being argument.'],
  ['2,317','Documents','Every version, who uploaded it, what replaced it, and which one was signed',
   'Version three of an offer pack is not the same document as version two. The pack knows which one the signature landed on.'],
  ['6,204','Portal events','Logins, views, downloads and acknowledgements, with time and device',
   'Sent and opened are different facts. So are opened and acknowledged. All three are here.'],
  ['148','Consent grants','Purpose, scope, who received it, and whether it is still live',
   'A grant that expired mid file is visible as expired, on the date it expired, not quietly absent.'],
  ['41,208','Material events','Every change to a figure, a term, a decision or a permission',
   'The spine of the pack. If a number moved, this says what it was, what it became, who moved it and when.'],
  ['39','Decisions','The recommendation, the rationale, the approver and the version relied on',
   'This is the one regulators ask for and firms most often cannot produce.']
];
function drawEp(){
  var w = $('#epk'); if (!w) return;
  w.innerHTML = EP.map(function (e, i) {
    return '<button class="ep" type="button" data-ep="' + i + '">' +
      '<span class="epn">' + e[0] + '</span><span class="epl">' + e[1] + '</span>' +
      '<span class="epd">' + e[2] + '</span></button>';
  }).join('');
  $$('[data-ep]').forEach(function (b) {
    b.addEventListener('click', function () {
      var e = EP[+b.getAttribute('data-ep')];
      $$('[data-ep]').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      $('#epout').innerHTML = '<b>' + e[1] + '</b>' + e[3];
      $('#epout').classList.add('show');
    });
  });
}

/* ---- flags ---- */
var FLAG = [
  'Register entry, published 11 Nov 2025, naming the lender. The date, the authority and the wording are carried into the file unchanged. 4orm makes no finding of its own.',
  'Both files show a deposit originating from the same account within nine days. That is not wrongdoing. It is a question a principal broker would rather ask now than be asked later.'
];
function drawFlags(){
  $$('[data-flag]').forEach(function (b) {
    b.addEventListener('click', function () {
      $('#flagout').innerHTML = FLAG[+b.getAttribute('data-flag')];
      $('#flagout').classList.add('show');
    });
  });
}

/* ---- assemble ---- */
var STEPS = [
  'Reading the file spine, 41,208 material events',
  'Gathering conversations, emails and attachments',
  'Matching document versions to signatures',
  'Attaching consent grants and their scope',
  'Verifying the chain is unbroken',
  'Pack assembled. 612 days, end to end.'
];
function initAssemble(){
  var b = document.getElementById('assemble'), out = document.getElementById('asm');
  if (!b || !out) return;
  b.addEventListener('click', function () {
    b.disabled = true; out.innerHTML = ''; out.classList.add('show');
    STEPS.forEach(function (s, i) {
      setTimeout(function () {
        out.insertAdjacentHTML('beforeend',
          '<div class="asr' + (i === STEPS.length - 1 ? ' last' : '') + '">' +
          '<i></i>' + s + '</div>');
        if (i === STEPS.length - 1) { b.disabled = false; b.textContent = 'Assemble again'; }
      }, 380 * (i + 1));
    });
  });
}

/* ---- panes ---- */
function show(v){
  $$('.pane').forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-pane') === v); });
  $$('.ar').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-view') === v); });
  var m = root.querySelector('.appmain'); if (m) m.scrollTop = 0;
}
$$('[data-view]').forEach(function (b) {
  b.addEventListener('click', function () { show(b.getAttribute('data-view')); });
});

drawBars(); drawWho(); drawCk(); drawEp(); drawFlags(); initAssemble();
})();


/* ------------------------------------------------------------------
   The reporting stays folded until somebody asks for it. Opening on
   evidence completeness and red flags reads as a compliance tool;
   opening on four numbers reads as knowing how your clients are.
   ------------------------------------------------------------------ */
document.addEventListener('click', function (e) {
  if (!e.target.closest) return;
  var t = e.target.closest('[data-openapp]');
  if (!t) return;
  var d = document.getElementById('d-firm');
  if (!d) return;
  d.classList.add('opened');
  setTimeout(function () {
    var app = d.querySelector('.app');
    if (app) app.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 260);
});
