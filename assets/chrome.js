/* ============================================================
   4orm - shared page chrome
   Floating dark nav pill and the footer, injected once.
   The site shows what the platform produces. It does not
   describe how any of it is produced.
   ============================================================ */
(function () {
'use strict';

var EMAIL = 'office@4ormfinance.com';

var VIEWS = [
  { label: 'Personal',     href: '/#personal' },
  { label: 'Professional', href: '/#professional' },
  { label: 'Regulator',    href: '/#regulator' }
];

var INDUSTRIES = [
  { label: 'Mortgage',      href: '/mortgage',      slug: 'mortgage' },
  { label: 'Payments',      href: '/payments',      slug: 'payments' },
  { label: 'Real estate',   href: '/real-estate',   slug: 'real-estate' },
  { label: 'Insurance',     href: '/insurance',     slug: 'insurance' },
  { label: 'Law firms',     href: '/law-firms',     slug: 'law-firms' },
  { label: 'Credit unions', href: '/credit-unions', slug: 'credit-unions' }
];

var MORE = [
  { label: 'The passport',  href: '/passport',      slug: 'passport' },
  { label: 'The rules',     href: '/the-rules',     slug: 'rules' },
  { label: 'Why it is hard',href: '/the-problem',   slug: 'problem' },
  { label: 'What we do',    href: '/what-we-do',    slug: 'what' },
  { label: 'Who it is for', href: '/who-it-is-for', slug: 'who' },
  { label: 'Team',          href: '/team',          slug: 'team' }
];

var page = document.body.getAttribute('data-page') || '';
var ARROW = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';
var CHEV = '<svg class="chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';

function el(t, c, h) { var n = document.createElement(t); if (c) n.className = c;
  if (h != null) n.innerHTML = h; return n; }
function mount(id, node) { var m = document.getElementById(id); if (m) m.replaceWith(node); }

function link(l) {
  return '<a href="' + l.href + '"' + (l.slug === page ? ' aria-current="page"' : '') + '>' + l.label + '</a>';
}

function buildNav() {
  var wrap = el('div');
  var industryOn = INDUSTRIES.some(function (i) { return i.slug === page; });

  var menu = INDUSTRIES.concat(MORE).map(function (i) {
    return '<a href="' + i.href + '">' + i.label + '</a>';
  }).join('');

  var h = el('header', 'nav');
  h.innerHTML =
    '<div class="nav-in">' +
      '<a class="nav-brand" href="/" aria-label="4orm home"><img src="/assets/logo.png" alt="4orm" /></a>' +
      '<nav class="nav-links" aria-label="Primary">' +
        VIEWS.map(function (v) { return '<a href="' + v.href + '">' + v.label + '</a>'; }).join('') +
        '<span class="navdrop" id="navdrop">' +
          '<button type="button" aria-expanded="false" aria-haspopup="true"' +
            (industryOn ? ' aria-current="true"' : '') + '>Industries ' + CHEV + '</button>' +
          '<span class="navmenu" role="menu">' + menu + '</span>' +
        '</span>' +
        '<a href="/team"' + (page === 'team' ? ' aria-current="page"' : '') + '>About</a>' +
      '</nav>' +
      '<a class="nav-cta" href="/contact">Experience 4orm <span class="cir">' + ARROW + '</span></a>' +
      '<button class="burger" id="burger" type="button" aria-label="Menu" aria-expanded="false">' +
        '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>' +
    '</div>';

  var mob = el('div', 'mobnav'); mob.id = 'mobnav';
  mob.innerHTML =
    '<div class="mg">Views</div>' + VIEWS.map(function (v) { return '<a href="' + v.href + '">' + v.label + '</a>'; }).join('') +
    '<div class="mg">Industries</div>' + INDUSTRIES.map(link).join('') +
    '<div class="mg">More</div>' + MORE.map(link).join('') +
    '<a href="/contact" style="color:#7BA6FF;font-weight:650">Experience 4orm</a>';

  wrap.appendChild(h); wrap.appendChild(mob);
  return wrap;
}

function buildFooter() {
  var f = el('footer', 'site-foot');
  f.innerHTML =
    '<div class="wrap"><div class="fgrid">' +
      '<div><span class="flogo-chip"><img class="flogo" src="/assets/logo.png" alt="4orm Finance" /></span>' +
        '<p class="fab">The intelligence and evidence layer for major financial decisions. ' +
        'An Alberta company. Pre-revenue, and the product is under development.</p></div>' +
      '<div><div class="fh">Views</div>' +
        VIEWS.map(function (v) { return '<a href="' + v.href + '">' + v.label + '</a>'; }).join('') +
        '<a href="/passport">The passport</a></div>' +
      '<div><div class="fh">Industries</div>' + INDUSTRIES.map(function (i) {
        return '<a href="' + i.href + '">' + i.label + '</a>'; }).join('') + '</div>' +
      '<div><div class="fh">Company</div>' +
        '<a href="/the-rules">The rules</a><a href="/what-we-do">What we do</a>' +
        '<a href="/team">Team</a><a href="/contact">Contact</a>' +
        '<a href="mailto:' + EMAIL + '">' + EMAIL + '</a>' +
        '<a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>' +
    '</div>' +
    '<div class="fbase"><span>&copy; ' + new Date().getFullYear() + ' 4orm Finance. All rights reserved.</span>' +
      '<span>Alberta, Canada</span></div>' +
    '<p class="fnote">Every rule, date and maximum quoted on this site is cited to the instrument it comes from ' +
    'and the date it was read. This site is a summary and the named source governs. Nothing here is legal, ' +
    'accounting or compliance advice. 4orm Finance holds no customer money, files nothing with a regulator, and ' +
    'does not certify that any firm is compliant.</p></div>';
  return f;
}

/* ---------- behaviour ---------- */
function initNav() {
  var d = document.getElementById('navdrop');
  if (d) {
    var b = d.querySelector('button');
    var close = function () { d.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); };
    b.addEventListener('click', function (e) { e.stopPropagation();
      var o = d.classList.toggle('open'); b.setAttribute('aria-expanded', o ? 'true' : 'false'); });
    d.addEventListener('mouseenter', function () { d.classList.add('open'); });
    d.addEventListener('mouseleave', close);
    document.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
  var bu = document.getElementById('burger'), m = document.getElementById('mobnav');
  if (bu && m) bu.addEventListener('click', function () {
    var o = m.classList.toggle('open'); bu.setAttribute('aria-expanded', o ? 'true' : 'false'); });
}

function initReveal() {
  var els = Array.prototype.slice.call(document.querySelectorAll('.rv'));
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
  }, { rootMargin: '0px 0px -6% 0px', threshold: .05 });
  els.forEach(function (e) { io.observe(e); });

  var ticking = false;
  function sweep() {
    ticking = false;
    var fold = window.innerHeight;
    for (var i = els.length - 1; i >= 0; i--) {
      var e = els[i];
      if (e.classList.contains('in')) { els.splice(i, 1); continue; }
      if (e.getBoundingClientRect().top < fold) { e.classList.add('in'); io.unobserve(e); els.splice(i, 1); }
    }
  }
  window.addEventListener('scroll', function () {
    if (ticking) return; ticking = true; window.requestAnimationFrame(sweep);
  }, { passive: true });
}

/* segmented controls: [data-seg="name"] buttons drive [data-swap="name"] panes */
function initSeg() {
  Array.prototype.slice.call(document.querySelectorAll('[data-seg]')).forEach(function (seg) {
    var name = seg.getAttribute('data-seg');
    var pip = seg.querySelector('.pip');
    var btns = Array.prototype.slice.call(seg.querySelectorAll('button'));
    function move() {
      var on = seg.querySelector('button.on');
      if (on && pip) { pip.style.width = on.offsetWidth + 'px';
        pip.style.transform = 'translateX(' + (on.offsetLeft - 5) + 'px)'; }
    }
    seg.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      btns.forEach(function (x) { x.classList.toggle('on', x === b); });
      var key = b.getAttribute('data-key');
      Array.prototype.slice.call(document.querySelectorAll('[data-swap="' + name + '"]'))
        .forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-key') === key); });
      move();
    });
    requestAnimationFrame(move);
    window.addEventListener('resize', move);
  });
}

/* animated bars: i[data-pct][data-fill] */
function initBars() {
  var bars = Array.prototype.slice.call(document.querySelectorAll('[data-pct]'));
  if (!bars.length) return;
  var fill = function (b) { b.style.background = b.getAttribute('data-fill') || 'var(--blue)';
    b.style.width = b.getAttribute('data-pct') + '%'; };
  if (!('IntersectionObserver' in window)) { bars.forEach(fill); return; }
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (x) { if (x.isIntersecting) {
      setTimeout(function () { fill(x.target); }, 120); io.unobserve(x.target); } });
  }, { threshold: .25 });
  bars.forEach(function (b) { io.observe(b); });
}

function initCounters() {
  Array.prototype.slice.call(document.querySelectorAll('[data-days-since]')).forEach(function (n) {
    var from = new Date(n.getAttribute('data-days-since') + 'T00:00:00Z');
    var d = Math.floor((Date.now() - from.getTime()) / 86400000);
    if (d > 0) n.textContent = d.toLocaleString('en-CA');
  });
}

/* Check before I sign */
function initCheck() {
  var btn = document.querySelector('[data-check]');
  if (!btn) return;
  btn.addEventListener('click', function () {
    ['checkhead', 'checkfindings', 'checkfoot'].forEach(function (id) {
      var n = document.getElementById(id); if (n) n.classList.add('on');
    });
    btn.disabled = true; btn.textContent = 'Checked';
    btn.classList.remove('btn-p'); btn.classList.add('btn-g');
  });
}

/* readiness meter */
function initReady() {
  var bar = document.querySelector('.readycard .rbar i');
  if (!bar) return;
  var pct = bar.getAttribute('data-ready') || '82';
  if (!('IntersectionObserver' in window)) { bar.style.width = pct + '%'; return; }
  var io = new IntersectionObserver(function (en) {
    if (en[0].isIntersecting) { setTimeout(function () { bar.style.width = pct + '%'; }, 200); io.disconnect(); }
  }, { threshold: .4 });
  io.observe(bar);
}

function boot() {
  mount('nav-mount', buildNav());
  mount('foot-mount', buildFooter());
  initNav(); initReveal(); initSeg(); initBars(); initCounters(); initCheck(); initReady();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();
