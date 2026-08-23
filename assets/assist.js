/* ============================================================
   4orm Assist, on the landing.

   The page lands, the panel wakes up, and it asks one thing at a
   time. Answering "guidance" or "support" leads to a name, and
   from then on the phone and the dashboard use that name instead
   of ours. That is the whole point: it should read as theirs
   before they have handed over anything at all.

   The name never leaves the browser. It sits in sessionStorage
   and is gone when the tab closes.
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
   --------------------------------------------------------- */
function open(){
  var t = seq([
    ['<p>Hello. I am 4orm Assist.</p>', null, 800],
    ['<p>Before you look around, tell me what brings you here and I will take you ' +
     'straight to it.</p>',
     [['you', 'I have a decision to make'],
      ['firm', 'I look after clients'],
      ['look', 'Just looking']], 1100]
  ]);
  return t;
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

/* Hand over to the experience the visitor asked for. */
function enter(kind) {
  if (ways) { ways.hidden = false; requestAnimationFrame(function(){ ways.classList.add('in'); }); }
  if (panel) panel.classList.add('handed');
  location.hash = kind === 'firm' ? '#professional' : '#personal';
}

function showWays() {
  if (!ways) return;
  ways.hidden = false;
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { ways.classList.add('in'); });
  });
  setTimeout(function () {
    var w = ways.querySelector('.lway');
    if (w) w.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 380);
}

/* ---------------------------------------------------------
   Wiring
   --------------------------------------------------------- */
thread.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-pick]');
  if (!b) return;
  var k = b.getAttribute('data-pick');
  var label = b.textContent;
  Array.prototype.slice.call(thread.querySelectorAll('.a4chips')).forEach(function (c) {
    c.remove();
  });
  me(label);
  if (k === 'look') {
    say('<p>Of course. Here are the three ways in.</p>', null, 700);
    setTimeout(showWays, 1200);
    return;
  }
  askName(k);
});

bar.addEventListener('submit', function (e) {
  e.preventDefault();
  var v = input.value.trim();
  if (!v) return;
  input.value = '';
  me(v);
  if (WAIT) { var k = WAIT; WAIT = null; takeName(k, v); return; }
  /* Anything typed before Assist has asked anything is treated as "help me". */
  say('<p>Let me get you to the right place first.</p>', null, 650);
  setTimeout(function () { askName('you'); }, 1200);
});

/* Somebody who scrolls has decided to look on their own. */
window.addEventListener('scroll', function once() {
  if (window.pageYOffset > 90) { showWays(); window.removeEventListener('scroll', once); }
}, { passive: true });

/* Wake up shortly after the page settles, so the headline is read first. */
setTimeout(function () {
  if (panel) panel.classList.add('awake');
  open();
}, 650);

/* Anything else on the page can ask who this is. */
window.FourmWho = { name: function () { return recall('name'); },
                    firm: function () { return recall('firm'); } };
})();
