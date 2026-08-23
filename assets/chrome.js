/* ============================================================
   4orm Finance — shared page chrome
   Injects the nav and footer, runs scroll reveal, the live day
   counter and the animated scales. No dependencies.

   Disclosure rule for this surface: the site shows WHAT the
   platform produces. It does not describe HOW it is produced.
   ============================================================ */
(function () {
'use strict';

var BRAND = '4orm Finance';
var EMAIL = 'office@4ormfinance.com';

var NAV = [
  { label: 'Financial Passport', href: '/passport', slug: 'passport' },
  { label: 'The rules',      href: '/the-rules',   slug: 'rules' },
  { label: 'Why it is hard', href: '/the-problem', slug: 'problem' },
  { label: 'What we do',     href: '/what-we-do',  slug: 'what' }
];

var INDUSTRIES = [
  { label: 'Mortgage',      href: '/mortgage',      slug: 'mortgage',  d: 'Brokerages, administrators and the consumer who owns the file' },
  { label: 'Payments',      href: '/payments',      slug: 'payments',  d: 'Providers holding end user funds under Bank of Canada supervision' },
  { label: 'Real estate',   href: '/real-estate',   slug: 'real-estate',d: 'Brokerages, property and condominium management' },
  { label: 'Insurance',     href: '/insurance',     slug: 'insurance', d: 'General and life agencies and brokerages' },
  { label: 'Law firms',     href: '/law-firms',     slug: 'law-firms',  d: 'Firms holding client money in trust' },
  { label: 'Credit unions', href: '/credit-unions', slug: 'credit-unions', d: 'Provincially and federally regulated credit unions' }
];

var TAIL = [
  { label: 'Team',    href: '/team',    slug: 'team' },
  { label: 'Contact', href: '/contact', slug: 'contact' }
];

var page = document.body.getAttribute('data-page') || '';
var ARROW = '<svg class="arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';
var CHEV = '<svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';

function el(tag, cls, html) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}
function mount(id, node) { var m = document.getElementById(id); if (m) m.replaceWith(node); }

var industryActive = INDUSTRIES.some(function (i) { return i.slug === page; });

/* ---------------- nav ---------------- */
function buildNav() {
  var wrap = el('div');

  var links = NAV.map(function (l) {
    return '<a href="' + l.href + '"' + (l.slug === page ? ' aria-current="page"' : '') + '>' + l.label + '</a>';
  }).join('');

  var menu = INDUSTRIES.map(function (i) {
    return '<a href="' + i.href + '"><span class="nm-t">' + i.label + '</span><span class="nm-d">' + i.d + '</span></a>';
  }).join('');

  var tail = TAIL.map(function (l) {
    return '<a href="' + l.href + '"' + (l.slug === page ? ' aria-current="page"' : '') + '>' + l.label + '</a>';
  }).join('');

  var header = el('header', 'mg-nav');
  header.innerHTML =
    '<div class="mg-nav-in">' +
      '<a class="mg-brand" href="/" aria-label="' + BRAND + ' home">' +
        '<img src="/assets/logo.png" alt="' + BRAND + '" />' +
      '</a>' +
      '<nav class="mg-nav-links" aria-label="Primary">' + links +
        '<span class="navdrop" id="navdrop">' +
          '<button type="button" aria-expanded="false" aria-haspopup="true"' +
            (industryActive ? ' aria-current="true"' : '') + '>Who it is for ' + CHEV + '</button>' +
          '<span class="navmenu" role="menu">' + menu + '</span>' +
        '</span>' + tail +
      '</nav>' +
      '<a class="mg-nav-cta" href="/contact">Talk to us ' + ARROW + '</a>' +
      '<button class="mg-burger" type="button" aria-label="Menu" aria-expanded="false" id="burger">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
      '</button>' +
    '</div>';

  var mob = el('div', 'mobnav');
  mob.id = 'mobnav';
  mob.innerHTML =
    NAV.map(function (l) { return '<a href="' + l.href + '">' + l.label + '</a>'; }).join('') +
    '<div class="mg">Who it is for</div>' +
    INDUSTRIES.map(function (i) { return '<a href="' + i.href + '">' + i.label + '</a>'; }).join('') +
    '<div class="mg">More</div>' +
    TAIL.map(function (l) { return '<a href="' + l.href + '">' + l.label + '</a>'; }).join('') +
    '<a href="/contact" style="color:#7BA6FF; font-weight:650">Talk to us</a>';

  wrap.appendChild(header);
  wrap.appendChild(mob);
  return wrap;
}

/* ---------------- footer ---------------- */
function buildFooter() {
  var f = el('footer', 'site-foot');
  f.innerHTML =
    '<div class="wrap">' +
      '<div class="foot-grid">' +
        '<div>' +
          '<img class="flogo" src="/assets/logo.png" alt="' + BRAND + '" />' +
          '<p class="fabout">Software that creates the evidence behind every regulated decision, for firms holding money that belongs to somebody else. An Alberta company. Pre-revenue, and the product is under development.</p>' +
        '</div>' +
        '<div><div class="fh">The duty</div>' +
          '<a href="/passport">Financial Passport</a>' +
          '<a href="/the-rules">The rules</a>' +
          '<a href="/the-problem">Why it is hard</a>' +
          '<a href="/what-we-do">What we do</a>' +
          '<a href="/who-it-is-for">Who it is for</a>' +
        '</div>' +
        '<div><div class="fh">By industry</div>' +
          INDUSTRIES.map(function (i) { return '<a href="' + i.href + '">' + i.label + '</a>'; }).join('') +
        '</div>' +
        '<div><div class="fh">Company</div>' +
          '<a href="/team">Team</a>' +
          '<a href="/contact">Contact</a>' +
          '<a href="mailto:' + EMAIL + '">' + EMAIL + '</a>' +
          '<a href="/privacy">Privacy</a>' +
          '<a href="/terms">Terms</a>' +
        '</div>' +
      '</div>' +
      '<div class="foot-base">' +
        '<span>&copy; ' + new Date().getFullYear() + ' ' + BRAND + '. All rights reserved.</span>' +
        '<span>Alberta, Canada</span>' +
      '</div>' +
      '<p class="foot-note">Every rule, date and maximum quoted on this site is cited to the instrument it comes from and the date it was read. This site is a summary and the named source governs. Nothing here is legal, accounting or compliance advice. 4orm Finance holds no customer money, files nothing with a regulator, and does not certify that any firm is compliant.</p>' +
    '</div>';
  return f;
}

/* ---------------- behaviour ---------------- */
function initNavBehaviour() {
  var drop = document.getElementById('navdrop');
  if (drop) {
    var btn = drop.querySelector('button');
    var close = function () { drop.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = drop.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    drop.addEventListener('mouseenter', function () { drop.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); });
    drop.addEventListener('mouseleave', close);
    document.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
  var burger = document.getElementById('burger'), mob = document.getElementById('mobnav');
  if (burger && mob) {
    burger.addEventListener('click', function () {
      var open = mob.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
}

function initReveal() {
  var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  els.forEach(function (e) { io.observe(e); });

  /* Safety net. A fast fling can carry an element past the viewport between
     observer callbacks, which would leave it invisible for good. Anything that
     has already passed the fold gets revealed on the next frame regardless. */
  var ticking = false;
  function sweep() {
    ticking = false;
    var fold = window.innerHeight;
    for (var i = els.length - 1; i >= 0; i--) {
      var e = els[i];
      if (e.classList.contains('in')) { els.splice(i, 1); continue; }
      if (e.getBoundingClientRect().top < fold) { e.classList.add('in'); io.unobserve(e); els.splice(i, 1); }
    }
    if (!els.length) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(sweep);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
}

/* live day counter: data-days-since="2025-09-08" */
function initCounters() {
  Array.prototype.slice.call(document.querySelectorAll('[data-days-since]')).forEach(function (n) {
    var from = new Date(n.getAttribute('data-days-since') + 'T00:00:00Z');
    var days = Math.floor((Date.now() - from.getTime()) / 86400000);
    if (days > 0) n.textContent = days.toLocaleString('en-CA');
  });
}

/* animated bars: data-pct="35" data-fill="#D6334E" */
function initBars() {
  var bars = Array.prototype.slice.call(document.querySelectorAll('[data-pct]'));
  if (!bars.length) return;
  var fill = function (b) {
    b.style.background = b.getAttribute('data-fill') || 'var(--brand)';
    b.style.width = b.getAttribute('data-pct') + '%';
  };
  if (!('IntersectionObserver' in window)) { bars.forEach(fill); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { setTimeout(function () { fill(en.target); }, 120); io.unobserve(en.target); }
    });
  }, { threshold: 0.25 });
  bars.forEach(function (b) { io.observe(b); });
}

/* Check before I sign: reveal the findings on demand */
function initCheck() {
  var btn = document.querySelector('[data-check]');
  if (!btn) return;
  btn.addEventListener('click', function () {
    ['checkhead', 'checkfindings', 'checkfoot'].forEach(function (id) {
      var n = document.getElementById(id);
      if (n) n.classList.add('on');
    });
    btn.disabled = true;
    btn.textContent = 'Checked';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-ghost');
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
  }, { threshold: 0.4 });
  io.observe(bar);
}

function boot() {
  mount('nav-mount', buildNav());
  mount('foot-mount', buildFooter());
  initNavBehaviour();
  initReveal();
  initCounters();
  initBars();
  initCheck();
  initReady();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();
