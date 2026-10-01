/* ============================================================
   The front door.

   Three things run here, and each does what it says: the record a
   visitor can walk and then change, the seven product screens, and
   the days left before the first FINTRAC effectiveness review.
   Nothing is stored and nothing leaves the browser.
   ============================================================ */
(function () {
'use strict';

var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------
   The first FINTRAC effectiveness review, due before 11 October
   2026 for mortgage firms in scope since commencement.
   Source: FINTRAC mortgage sector training video, June 2026.
   ------------------------------------------------------------ */
(function amlReview() {
  var el = $('#bcin');
  if (!el) return;
  var now = new Date();
  var today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  var days = Math.round((Date.UTC(2026, 9, 11) - today) / 86400000);
  el.textContent = days > 1 ? ', ' + days + ' days from today'
                 : days === 1 ? ', tomorrow'
                 : days === 0 ? ', today'
                 : '';
})();

/* ------------------------------------------------------------
   The record.

   Walk a mortgage renewal through the seven steps, then change the
   income and watch the record send the decision back to the step the
   change affects, keep the earlier version, and move forward again.
   Every name and figure is invented.
   ------------------------------------------------------------ */
(function record() {
  var box = $('#rec');
  if (!box) return;
  var steps = $$('#rsteps li');
  var K = $('#recK'), T = $('#recT'), LOG = $('#recLog');
  var bWalk = $('#recWalk'), bChg = $('#recChange'), bReset = $('#recReset');

  var WALK = [
    ['Identity', 'Identity confirmed against government photo ID, and consent to collect is recorded before anything else is asked.',
     'Identity confirmed &middot; consent recorded', '09:14'],
    ['Goals', 'Renew without moving lenders unless moving is clearly better. Stability matters more than the lowest rate. Income <b>$120,000</b>, supported by an employment letter.',
     'Goal and income recorded &middot; <em>$120,000</em> &middot; document supported', '09:31'],
    ['Expectations', 'At renewal the payment is <b>$2,410</b> a month and the emergency reserve after closing is <b>11 weeks</b>. Shown to the consumer before any product is.',
     'Payment and reserve shown &middot; 11 weeks', '10:02'],
    ['Options', 'Three options compared: stay fixed, switch lender fixed, or variable. Variable is excluded because it conflicts with the stability the consumer asked for.',
     '3 options compared &middot; variable excluded, with the reason', '10:20'],
    ['Recommendation', 'A five-year fixed term with the current lender. The reason is recorded in the professional&rsquo;s own words, beside the goal it answers.',
     'Recommendation and reason recorded', '10:31'],
    ['Check', 'Complete, consistent and current. Nothing is missing and nothing contradicts anything else in the file.',
     'Check passed &middot; complete, consistent, current', '10:33'],
    ['One record', 'One reviewable record. Who, what, when, why, source and version, for both sides of the same decision.',
     'Record complete', '10:34']
  ];
  var AFTER = [
    null,
    ['Goals', 'A new employment letter reads <b>$104,000</b>. The decision goes back to the step the change affects. The earlier figure is kept, marked as replaced, not erased.',
     'Income changed &middot; $120,000 to <em>$104,000</em> &middot; previous version kept', '14:41', 'chg'],
    ['Expectations', 'Same payment, smaller cushion. The reserve after closing falls to <b>7 weeks</b>, and the consumer is shown that before anything is re-signed.',
     'Reserve recalculated &middot; 7 weeks &middot; shown again', '14:43'],
    ['Options', 'The options are compared again on the new facts. A longer amortization is added as an alternative, with what it would cost over the term.',
     'Options re-compared &middot; 1 alternative added', '14:52'],
    ['Recommendation', 'The professional confirms the fixed term and records why it still fits at the lower income. The first recommendation stays in the record beside the second.',
     'Recommendation confirmed &middot; reason for v2 recorded', '15:06'],
    ['Check', 'Complete, consistent and current again. The change, the new explanation and the consumer&rsquo;s acknowledgement are all there.',
     'Check passed on v2', '15:08'],
    ['One record', 'Replay any point: what was known at 10:34, what changed at 14:41, and why the decision still made sense at 15:08.',
     'Record complete &middot; 2 versions, both kept', '15:09']
  ];

  var timer = null, at = -1, version = 1, busy = false, walked = false;

  function clearLog() { LOG.innerHTML = ''; }
  function log(ver, t, html, cls) {
    var e = $('.empty', LOG); if (e) e.remove();
    var li = document.createElement('li');
    if (cls) li.className = cls;
    li.innerHTML = '<span class="v">v' + ver + '</span><span class="t">' + t + '</span><span>' + html + '</span>';
    LOG.appendChild(li);
  }
  function paint(i, cls) {
    steps.forEach(function (s, j) {
      s.classList.remove('cur', 'back');
      s.classList.toggle('done', j < i || (j === i && i === steps.length - 1));
    });
    if (i >= 0 && i < steps.length) steps[i].classList.add(cls || 'cur');
  }
  function say(k, html) { K.innerHTML = k; T.innerHTML = html; }
  function lock(on) {
    busy = on;
    [bWalk, bChg].forEach(function (b) { b.disabled = on; });
  }

  function run(list, from, done) {
    var i = from;
    function next() {
      if (i >= list.length) { lock(false); if (done) done(); return; }
      var s = list[i];
      if (s) {
        at = i;
        paint(i, s[4] === 'chg' ? 'back' : 'cur');
        say(s[0] + (version > 1 ? ' &middot; version ' + version : ''), s[1]);
        log(version, s[3], s[2], s[4]);
      }
      i++;
      timer = setTimeout(next, REDUCED ? 0 : (s && s[4] === 'chg' ? 1500 : 950));
    }
    lock(true);
    next();
  }

  function reset() {
    clearTimeout(timer); lock(false);
    at = -1; version = 1; walked = false;
    paint(-1);
    say('Ready', 'Press <b>Walk the decision</b> to move one mortgage renewal through the record. Then change a fact and see what happens to it.');
    LOG.innerHTML = '<li class="empty">Nothing yet. Every step adds who, what, when, why, source and version.</li>';
    bChg.textContent = 'Income changes';
  }

  bWalk.addEventListener('click', function () {
    if (busy) return;
    reset();
    run(WALK, 0, function () {
      walked = true;
      say('One record', WALK[6][1] + ' Now press <b>Income changes</b>.');
    });
  });

  bChg.addEventListener('click', function () {
    if (busy) return;
    if (!walked) {
      say('Nothing to change yet', 'There is no income on the record until the decision has been walked. Press <b>Walk the decision</b> first.');
      return;
    }
    if (version > 1) {
      say('Already changed', 'The income has already changed once in this walk. Press <b>Start again</b> to see it from the beginning.');
      return;
    }
    version = 2;
    /* The earlier income stays, marked as replaced. */
    $$('li', LOG).forEach(function (li) {
      if (/\$120,000/.test(li.innerHTML)) li.classList.add('old');
    });
    run(AFTER, 1);
  });

  bReset.addEventListener('click', reset);
  reset();
})();

})();

/* ============================================================
   The screens.

   Seven images from the product concept. The rail is a real
   tablist, the stage is its panel, and every screen carries its
   own description so the picture is never the only thing said.
   ============================================================ */
(function screens() {
  var rail = document.getElementById('shwRail');
  if (!rail) return;
  var V = '?v=20261001';
  var S = [
    ['biz-file-review', 'For businesses', 'File review',
     'Run the review. See what needs attention.',
     'Every finding is linked to the document it came from, with an owner and a next action, so a review starts from evidence rather than from a search.',
     'A file review screen listing 24 mortgage files: 18 ready for review, 4 missing evidence and 2 needing clarification, with each finding linked to its source document.'],
    ['biz-action-queue', 'For businesses', 'Action queue',
     'Know which files need you next.',
     'File completeness and follow-up, not a financial risk score. Missing items carry a clear owner and a due date, and the screen says so on its face.',
     'A client file health screen: 24 active files, 6 needing attention, 3 overdue actions and 2 reviews due soon, with an action queue naming the owner and due date for each.'],
    ['biz-historical', 'For businesses', 'Historical review',
     'Two years later, the context is still here.',
     'Set the record to the date the decision was made and see what was known then. A note added afterwards is shown separately and never rewrites the original.',
     'A historical decision review dated 18 September 2026 showing the record as it stood on 18 September 2024: the client goal, the options discussed, the recorded rationale and the evidence available at the time.'],
    ['biz-reporting', 'For businesses', 'Reporting package',
     'Reporting season starts with the record.',
     'The evidence index, the exception register and the follow-up log assemble from the work already done. Unresolved items stay visible in the package rather than being tidied away.',
     'A draft internal compliance reporting package for Q3 2026: 24 files in scope, 18 ready for review, 6 open exceptions, a package contents list and a reviewer checklist.'],
    ['con-private-space', 'For consumers', 'Your private space',
     'Start with your life. Understand your choices.',
     'A private account to work out what you are trying to achieve, at your own pace, before any professional is involved and before anything is shared.',
     'Three phone screens: a private 4ormIQ account for a mortgage, a conversation asking what might change over the next three years, and a summary of goals, changes and questions to ask.'],
    ['con-share', 'For consumers', 'Before you share',
     'Review. Choose. Approve.',
     'Nothing leaves the private space until it is approved. A personal detail can be left out of the shared copy, and the original stays unchanged.',
     'Two phone screens: a document excerpt with a personal family detail highlighted and removed from the shared copy, then a sharing screen where goals, a decision summary and selected documents are ticked and the personal detail is excluded.'],
    ['both-sides', 'Both sides', 'One decision, two views',
     'A private space for consumers. A connected workspace for professionals.',
     'The same decision from both sides: what the consumer chose to share, and the goals, evidence and decision summary the professional receives with permission.',
     'A phone showing a consumer summary of goals and possible changes beside a professional workspace showing the same client, the shared goals and priorities, the linked evidence and a decision summary.']
  ];

  var img = document.getElementById('shwImg');
  var K = document.getElementById('shwK'), T = document.getElementById('shwT'),
      D = document.getElementById('shwD'), cap = document.getElementById('shwCap');

  rail.innerHTML = S.map(function (s, i) {
    return '<button class="shwb" type="button" role="tab" id="shwtab' + i + '" ' +
      'aria-controls="shwCap" aria-selected="' + (i === 0) + '" tabindex="' + (i ? '-1' : '0') + '">' +
      '<img src="/assets/showcase/' + s[0] + '-t.jpg' + V + '" alt="" width="360" height="203" ' +
      'loading="lazy" decoding="async" />' +
      '<span><b>' + s[2] + '</b><i>' + s[1] + '</i></span></button>';
  }).join('');

  var tabs = Array.prototype.slice.call(rail.querySelectorAll('[role="tab"]'));
  function pick(i, focus) {
    var s = S[i];
    tabs.forEach(function (t, j) {
      t.setAttribute('aria-selected', j === i ? 'true' : 'false');
      t.setAttribute('tabindex', j === i ? '0' : '-1');
    });
    img.src = '/assets/showcase/' + s[0] + '.jpg' + V;
    img.alt = s[5];
    K.textContent = s[1]; T.textContent = s[3]; D.textContent = s[4];
    cap.setAttribute('aria-labelledby', 'shwtab' + i);
    if (focus) tabs[i].focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { pick(i, false); });
    t.addEventListener('keydown', function (e) {
      var d = /Right|Down/.test(e.key) ? 1 : /Left|Up/.test(e.key) ? -1 : 0;
      if (e.key === 'Home') { e.preventDefault(); pick(0, true); return; }
      if (e.key === 'End') { e.preventDefault(); pick(tabs.length - 1, true); return; }
      if (!d) return;
      e.preventDefault();
      pick((i + d + tabs.length) % tabs.length, true);
    });
  });
})();
