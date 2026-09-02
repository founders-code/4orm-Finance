/* ============================================================
   4ormIQ, on the landing.

   The phone on the landing is not a picture of the product. It is
   the product, asking the one question worth asking: what can I
   help you with. The answers are decisions people recognise, so
   the landing explains what 4orm is by offering to do it.

   Answering opens the full experience on that decision. Anything
   the visitor types stays in this browser and goes when the tab
   closes.
   ============================================================ */
(function () {
'use strict';

var thread = document.getElementById('a4thread');
var bar    = document.getElementById('a4bar');
var input  = document.getElementById('a4input');
var panel  = document.getElementById('a4chat');
var ways   = document.getElementById('lways');
if (!thread || !bar || !input) return;

var esc = function (s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

/* ---------------------------------------------------------
   What Assist is waiting for
   --------------------------------------------------------- */
var WAIT = null;
var GOAL = '';

function remember(key, value) {
  try { sessionStorage.setItem('4orm.' + key, value); } catch (e) {}
}
function recall(key) {
  try { return sessionStorage.getItem('4orm.' + key) || ''; } catch (e) { return ''; }
}

/* ---------------------------------------------------------
   Saying things
   --------------------------------------------------------- */
function bubble(who, html) {
  var d = document.createElement('div');
  d.className = 'a4b ' + who;
  d.innerHTML = html;
  thread.appendChild(d);
  thread.scrollTop = thread.scrollHeight;
  return d;
}

function me(text) { return bubble('me', esc(text)); }

/* Assist never answers instantly. An instant answer reads as a lookup. */
function say(html, chips, ms) {
  var dots = document.createElement('div');
  dots.className = 'a4b a4 typing';
  dots.innerHTML = '<i></i><i></i><i></i>';
  thread.appendChild(dots);
  thread.scrollTop = thread.scrollHeight;
  var wait = ms || Math.min(1500, 520 + String(html).length * 2.6);
  setTimeout(function () {
    if (dots.parentNode) dots.parentNode.removeChild(dots);
    var b = bubble('a4', html);
    if (chips && chips.length) {
      var c = document.createElement('div');
      c.className = 'a4chips';
      c.innerHTML = chips.map(function (x) {
        return '<button class="a4chip" type="button" data-pick="' + x[0] + '">' + x[1] + '</button>';
      }).join('');
      b.appendChild(c);
      thread.scrollTop = thread.scrollHeight;
    }
  }, wait);
  return wait;
}

function seq(turns) {
  var t = 0;
  turns.forEach(function (turn) {
    setTimeout(function () { say(turn[0], turn[1], turn[2]); }, t);
    t += (turn[2] || Math.min(1500, 520 + String(turn[0]).length * 2.6)) + 300;
  });
  return t;
}

/* ---------------------------------------------------------
   The conversation

   One question, and the answers are the things a person actually
   came here to do. Naming them is the fastest way to say what the
   product is: nobody reads "financial decision infrastructure",
   everybody understands "buy a home".
   --------------------------------------------------------- */
/* Four of these are decisions with time in front of them, and they open the
   discovery. The fifth is money about to leave, which is a different kind of
   moment and opens the check instead. Same architecture underneath, different
   entry, because a person about to wire funds today should not be handed a ten
   question interview. */
var GOALS = [
  ['mortgage:renew',  'Renewing my mortgage'],
  ['mortgage:buy',    'Buying a home'],
  ['realestate:sell', 'Selling my home'],
  ['auto:buy',        'Buying a car'],
  ['insurance:buy',   'Buying insurance'],
  ['send:invest',     'Sending an investment']
];

function open(){
  return seq([
    ['<p>Hello. I am 4ormIQ.</p>', null, 800],
    ['<p>What can I help you with?</p>', GOALS.map(function (g) {
      return ['goal:' + g[0] + ':' + g[1], g[1]];
    }), 1000]
  ]);
}

function askName(kind) {
  WAIT = kind;
  if (kind === 'you') {
    say('<p>Good. What is your first name?</p>' +
        '<p class="a4m">Everything you see from here on will use it, so it reads as yours ' +
        'rather than ours. It stays in this browser and goes when you close the tab.</p>',
        null, 900);
  } else {
    say('<p>What is your firm called?</p>' +
        '<p class="a4m">The dashboard will carry it instead of our example name. It stays in ' +
        'this browser and goes when you close the tab.</p>', null, 900);
  }
  setTimeout(function () { input.focus(); }, 1000);
}

function takeName(kind, value) {
  var clean = value.replace(/[^\w\s'&.-]/g, '').trim().slice(0, 40);
  if (!clean) { enter(kind); return; }

  if (kind === 'you') {
    remember('name', clean);
    say('<p>Thank you, ' + esc(clean) + '. Picking up the phone now.</p>', null, 750);
  } else {
    remember('firm', clean);
    say('<p>Thank you. Opening the reading for ' + esc(clean) + '.</p>', null, 750);
  }
  setTimeout(function () { enter(kind); }, 1500);
}

/* Hand over to the experience the visitor asked for.

   `ind` is a decision and opens the discovery for it. `ind` prefixed with
   "send:" is money about to move, and opens the check on that case instead. */
function enter(kind, ind) {
  var intent = '', said = '';
  if (ind && ind.indexOf(':') > 0) {
    var bits = ind.split(':');
    ind = bits[0]; said = bits[1];
    if (ind === 'send') { intent = said; ind = 'investing'; }
    else { intent = 'decide'; }
  }
  try {
    if (ind) sessionStorage.setItem('4orm.ind', ind);
    sessionStorage.setItem('4orm.intent', intent);
    sessionStorage.setItem('4orm.said', said);
  } catch (e) {}
  /* The phone reads the decision and the intent out of the browser itself and
     opens on the right screen. Clicking the industry button from here as well
     used to re-open the phone a second time and land the person back on the
     menu they had already answered. */
  location.hash = kind === 'firm' ? '#professional' : '#personal';
}

/* ---------------------------------------------------------
   Wiring
   --------------------------------------------------------- */
thread.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-pick]');
  if (!b) return;
  e.stopPropagation();
  var k = b.getAttribute('data-pick');
  var label = b.textContent;
  Array.prototype.slice.call(thread.querySelectorAll('.a4chips')).forEach(function (c) {
    c.remove();
  });
  me(label);

  /* A goal is a decision. One short beat for a name, so the whole experience
     reads as theirs, and then it opens on that decision. */
  if (k.indexOf('goal:') === 0) {
    GOAL = k.slice(5).replace(/:[^:]*$/, '');
    WAIT = 'goal';
    say('<p>Good. And your first name?</p>' +
        '<p class="a4m">Everything you see from here on will use it. It stays in this browser ' +
        'and goes when you close the tab.</p>',
        [['skip', 'Skip this']], 780);
    setTimeout(function () { input.focus(); }, 900);
    return;
  }
  if (k === 'skip') { WAIT = null; enter('you', GOAL); return; }
  askName(k);
});

bar.addEventListener('click', function (e) { e.stopPropagation(); });

bar.addEventListener('submit', function (e) {
  e.preventDefault();
  e.stopPropagation();
  var v = input.value.trim();
  if (!v) return;
  input.value = '';
  me(v);
  if (WAIT === 'goal') {
    WAIT = null;
    var clean = v.replace(/[^\w\s'&.-]/g, '').trim().slice(0, 40);
    if (clean) remember('name', clean);
    say('<p>Thank you' + (clean ? ', ' + esc(clean) : '') + '. Opening 4orm now.</p>', null, 700);
    setTimeout(function () { enter('you', GOAL); }, 1300);
    return;
  }
  if (WAIT) { var k = WAIT; WAIT = null; takeName(k, v); return; }
  /* Anything typed before Assist has been answered is a goal in the visitor's
     own words. Match it against what 4orm covers, and open there. */
  var t = v.toLowerCase(), ind = '';
  /* Selling is checked before buying, because "selling my home" contains the
     word that would otherwise send it to the mortgage. */
  if (/sell|listing|list my|realtor|real estate agent|representation/.test(t)) ind = 'realestate';
  else if (/home|house|mortgage|condo|renew|refinan/.test(t)) ind = 'mortgage';
  else if (/car|vehicle|truck|auto|lease/.test(t)) ind = 'auto';
  else if (/insur|policy|cover/.test(t)) ind = 'insurance';
  else if (/invest|portfolio|advis/.test(t)) ind = 'investing';
  else if (/firm|client|broker|dealer|my business/.test(t)) {
    say('<p>Then let me open the firm view.</p>', null, 650);
    setTimeout(function () { enter('firm'); }, 1250);
    return;
  }
  say('<p>Opening 4orm so you can ask it properly.</p>', null, 650);
  setTimeout(function () { enter('you', ind); }, 1250);
});

/* Clicking the phone anywhere else is the same as saying "show me". */
if (panel) {
  panel.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('.a4bar, .a4chip')) return;
    enter('you');
  });
}

/* Wake up shortly after the page settles, so the headline is read first. */
setTimeout(function () {
  if (panel) panel.classList.add('awake');
  open();
}, 650);

/* Anything else on the page can ask who this is. */
window.FourmWho = { name: function () { return recall('name'); },
                    firm: function () { return recall('firm'); } };
})();
