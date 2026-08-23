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
  { label: 'Personal',     href: '/#personal',     v: 'personal' },
  { label: 'Professional', href: '/#professional', v: 'professional' }
];

var INDUSTRIES = [
  { label: 'Mortgage',    href: '/industries/mortgage',    slug: 'mortgage',   k: 'home broker fsra lender renewal' },
  { label: 'Auto',        href: '/industries/auto',        slug: 'auto',       k: 'car vehicle dealer omvic truck financing' },
  { label: 'Real estate', href: '/industries/real-estate', slug: 'realestate', k: 'agent reco representation offer' },
  { label: 'Insurance',   href: '/industries/insurance',   slug: 'insurance',  k: 'policy coverage claim ribo' },
  { label: 'Investing',   href: '/industries/investing',   slug: 'investing',  k: 'advisor portfolio ciro csa suitability' },
  { label: 'Banking',     href: '/industries/banking',     slug: 'banking',    k: 'bank account chequing fcac obsi' },
  { label: 'Lending',     href: '/industries/lending',     slug: 'lending',    k: 'loan payday credit rate' }
];


/* The six pages the whole site hangs off. Everything else is secondary and
   lives in the footer or in context. */
var PRIMARY = [
  { label: 'Home',         href: '/home',      slug: 'homepage' },
  { label: 'Personal',     href: '/personal',  slug: 'personal' },
  { label: 'Professional', href: '/professional', slug: 'professional' },
  { label: 'Form',         href: '/form',      slug: 'form' },
  { label: 'Family',       href: '/family',    slug: 'family' },
  { label: 'Why 4orm',     href: '/why-4orm',  slug: 'why' }
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

function buildAtmos() {
  /* Depth for the whole site: three enormous slow lights and a field of
     dust behind them. Injected once, before anything else paints. */
  if (document.getElementById('atmos')) return;
  var a = el('div', 'aurora'); a.setAttribute('aria-hidden', 'true');
  a.innerHTML = '<i></i><i></i><i></i>';
  var c = document.createElement('canvas');
  c.id = 'atmos'; c.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(a, document.body.firstChild);
  document.body.insertBefore(c, document.body.firstChild);
}

/* The landing carries one control. The moment the menu opens, the full header
   arrives with it, so the visitor can move between Home, Personal, Professional
   and 4orm Family without going back first. */
function buildMenuHeader() {
  var h = el('header', 'nav nav-inmenu');
  h.innerHTML =
    '<div class="nav-in">' +
      '<a class="nav-brand" href="/" aria-label="Back to the start">' +
        '<img src="/assets/logo.png" alt="4orm Finance" /></a>' +
      '<nav class="nav-links" aria-label="Primary">' +
        PRIMARY.map(function (i) { return '<a href="' + i.href + '">' + i.label + '</a>'; }).join('') +
      '</nav>' +
      '<button class="nav-cta" type="button" data-closemenu>Close ' +
        '<span class="cir">' + ARROW + '</span></button>' +
    '</div>';
  return h;
}

function buildBareNav() {
  /* The first screen is the headline and the split and almost nothing else.
     Two corners, no navigation bar. */
  var wrap = el('div');
  var h = el('header', 'nav nav-bare');
  /* The mark and the one control, top right, in the blue pill the rest of the
     site uses. Nothing else competes with the three ways in. */
  h.innerHTML =
    '<div class="nav-in">' +
      '<span></span>' +
      '<div class="bare-right">' +
        '<img class="bare-mark" src="/assets/mark.png" alt="4orm" width="30" height="30" />' +
        '<button class="bare-menu" id="burger" type="button" aria-expanded="false" ' +
          'aria-controls="omenu">4orm your experience. ' +
          '<span class="cir" aria-hidden="true">' + ARROW + '</span></button>' +
      '</div>' +
    '</div>';
  wrap.appendChild(h);
  var menu = buildMenu();
  menu.insertBefore(buildMenuHeader(), menu.firstChild);
  menu.classList.add('withhead');
  wrap.appendChild(menu);
  return wrap;
}

function buildMenu() {
  var m = el('div', 'omenu'); m.id = 'omenu';
  m.setAttribute('aria-hidden', 'true');

  function col(title, items) {
    return '<div class="ocol"><div class="och">' + title + '</div>' +
      items.map(function (i) {
        var k = (i.label + ' ' + title + ' ' + (i.k || '')).toLowerCase();
        if (i.soon) {
          return '<span class="oitem soon" data-k="' + k + '">' + i.label +
                 '<em>Coming soon</em></span>';
        }
        return '<a class="oitem" href="' + i.href + '" data-k="' + k + '"' +
               (i.slug === page ? ' aria-current="page"' : '') + '>' + i.label + '</a>';
      }).join('') + '</div>';
  }

  m.innerHTML =
    '<div class="omenu-shell">' +
      /* Three ways in, and nothing else. A menu that lists everything is a
         sitemap; a menu that names the three kinds of visitor is navigation. */
      '<div class="omenu-in six">' +
        col('Go', PRIMARY) +
        col('Industries', INDUSTRIES) +
        col('More', [
          { label: 'Research',   href: '/research',    slug: 'research',  k: 'data numbers sources trust canada' },
          { label: 'The Standard', href: '/the-standard', slug: 'standard', k: 'principles operating' },
          { label: 'Check a firm', href: '/check-a-firm', slug: 'check',  k: 'licence register verify' },
          { label: 'Privacy and security', href: '/privacy', slug: 'privacy', k: 'my 4orm information' },
          { label: 'Contact',    href: '/contact',     slug: 'contact',   k: 'talk support walkthrough' }
        ]) +
        '<div class="ocol ofoot"><a class="obig" href="/contact">Talk to us</a></div>' +
      '</div>' +
    '</div>' +
    /* One soft line, drifting. The page keeps showing through below it, so
       clicking down there means "take me back to what I was reading". */
    '<div class="owave a" aria-hidden="true">' +
      '<svg viewBox="0 0 1600 96" preserveAspectRatio="none">' +
        '<path class="w1" d="M0,46 C90,22 150,64 240,52 C330,40 380,18 470,30 '
        'C560,42 610,70 700,58 C790,46 840,20 930,28 C1020,36 1080,66 1170,56 '
        'C1260,46 1310,22 1400,32 C1490,42 1540,60 1600,50 L1600,96 L0,96 Z"/>' +
      '</svg></div>' +
    '<button class="oback" type="button" aria-label="Close the menu and go back to the page">' +
      '</button>';
  return m;
}

function buildNav() {
  if (page === 'home') return buildBareNav();

  var wrap = el('div');
  /* The pill carries the same three ways in as the menu. The blue control
     opens that menu rather than navigating, so there is one way to browse
     the site and it behaves identically everywhere. The mark on the left goes
     back to the landing, which is the one place it can go that the pill does
     not already offer. */
  var famOn = page === 'company' || page === 'team';

  var h = el('header', 'nav');
  h.innerHTML =
    '<div class="nav-in">' +
      '<a class="nav-brand" href="/" aria-label="Back to the start">' +
        '<img src="/assets/logo.png" alt="4orm Finance" /></a>' +
      '<nav class="nav-links" aria-label="Primary">' +
        PRIMARY.map(function (i) {
          return '<a href="' + i.href + '"' +
            (i.slug === page ? ' aria-current="page"' : '') + '>' + i.label + '</a>';
        }).join('') +
      '</nav>' +
      '<button class="nav-cta" id="burger" type="button" aria-expanded="false" ' +
        'aria-controls="omenu">4orm your experience. <span class="cir">' + ARROW + '</span></button>' +
      '<button class="burger" id="burger-m" type="button" aria-label="Menu" aria-expanded="false" ' +
        'aria-controls="omenu">' +
        '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>' +
    '</div>';

  wrap.appendChild(h); wrap.appendChild(buildMenu());
  return wrap;
}

function buildFooter() {
  var f = el('footer', 'site-foot');
  f.innerHTML =
    '<div class="wrap"><div class="fgrid">' +
      '<div><span class="flogo-chip"><img class="flogo" src="/assets/logo-light.png" alt="4orm Finance" /></span>' +
        '<p class="fab">The intelligence and evidence layer for major financial decisions. ' +
        'An Alberta company. Pre-revenue, and the product is under development.</p></div>' +
      '<div><div class="fh">Go</div>' +
        PRIMARY.map(function (i) { return '<a href="' + i.href + '">' + i.label + '</a>'; }).join('') +
      '</div>' +
      '<div><div class="fh">Industries</div>' + INDUSTRIES.map(function (i) {
        return '<a href="' + i.href + '">' + i.label + '</a>'; }).join('') + '</div>' +
      '<div><div class="fh">More</div>' +
        '<a href="/research">Research</a>' +
        '<a href="/the-standard">The Standard</a>' +
        '<a href="/check-a-firm">Check a firm</a>' +
        '<a href="/privacy">Privacy and security</a>' +
        '<a href="/contact">Contact</a>' +
        '<a href="mailto:' + EMAIL + '">' + EMAIL + '</a>' +
        '<a href="/website-privacy">Website privacy</a><a href="/terms">Terms</a></div>' +
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
  var m = document.getElementById('omenu');
  var controls = [document.getElementById('burger'), document.getElementById('burger-m')]
    .filter(Boolean);
  var bu = controls[0];
  if (bu && m) {
    var openMenu = function (on) {
      m.classList.toggle('open', on);
      m.setAttribute('aria-hidden', on ? 'false' : 'true');
      controls.forEach(function (c) {
        c.setAttribute('aria-expanded', on ? 'true' : 'false');
        c.classList.toggle('x', on);
      });
      document.documentElement.style.overflow = on ? 'hidden' : '';
      document.body.classList.toggle('menu-open', on);
      /* Never leave the header tucked away behind an open menu. */
      if (on) { var nv = document.querySelector('.nav'); if (nv) nv.classList.remove('tucked'); }
      if (on) {
        var f = m.querySelector('.oitem');
        if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, 300);
      }
    };
    controls.forEach(function (c) {
      c.addEventListener('click', function (e) {
        e.stopPropagation();
        openMenu(!m.classList.contains('open'));
      });
    });
    m.addEventListener('click', function (e) {
      if (e.target === m || e.target.classList.contains('oback')) { openMenu(false); return; }
      if (e.target.closest('[data-closemenu]')) { openMenu(false); return; }
      /* Picking something is the end of using the menu, whether it navigates
         away or opens a way in on this same page. */
      var a = e.target.closest && e.target.closest('a.oitem, a.obig');
      if (a) openMenu(false);
    });
    initMenuSearch(m);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && m.classList.contains('open')) { openMenu(false); bu.focus(); }
    });
  }
}

function initMenuSearch(m) {
  var q = m.querySelector('#omq');
  var clr = m.querySelector('#omclr');
  var no = m.querySelector('#omno');
  if (!q) return;
  var items = Array.prototype.slice.call(m.querySelectorAll('.oitem'));
  var cols = Array.prototype.slice.call(m.querySelectorAll('.ocol'));

  function run() {
    var v = q.value.trim().toLowerCase();
    m.classList.toggle('searching', v.length > 0);
    if (clr) clr.hidden = v.length === 0;
    var hits = 0;
    items.forEach(function (it) {
      var on = !v || (it.getAttribute('data-k') || '').indexOf(v) > -1;
      it.classList.toggle('hid', !on);
      if (on) hits++;
    });
    cols.forEach(function (c) {
      var any = c.querySelector('.oitem:not(.hid)');
      c.classList.toggle('hid', !!v && !any && !c.classList.contains('ofoot'));
    });
    if (no) no.hidden = !(v && hits === 0);
  }

  q.addEventListener('input', run);
  q.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var first = m.querySelector('a.oitem:not(.hid)');
      if (first) { e.preventDefault(); window.location.href = first.getAttribute('href'); }
    }
    if (e.key === 'Escape' && q.value) { e.stopPropagation(); q.value = ''; run(); }
  });
  if (clr) clr.addEventListener('click', function () { q.value = ''; run(); q.focus(); });
  m.__resetSearch = function () { q.value = ''; run(); };
  run();
}

/* The nav floats over the page, so while somebody is reading downward it sits
   on top of whatever they are reading and cuts a dark band through it. It
   steps out of the way on the way down and comes straight back on the way up,
   which is where it is wanted anyway. */
function initNavHide() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var last = window.pageYOffset, ticking = false;

  function update() {
    var y = window.pageYOffset;
    var menuOpen = document.querySelector('.omenu.open');
    if (menuOpen || y < 140) {
      nav.classList.remove('tucked');
    } else if (y > last + 6) {
      nav.classList.add('tucked');
    } else if (y < last - 6) {
      nav.classList.remove('tucked');
    }
    last = y;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
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
  buildAtmos();
  mount('nav-mount', buildNav());
  mount('foot-mount', buildFooter());
  initNav(); initNavHide(); initReveal(); initSeg(); initBars(); initCounters(); initCheck(); initReady();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();


/* ============================================================
   The trust rings
   ============================================================ */
(function(){
  var sec   = document.getElementById('trust');
  if (!sec) return;
  var stage = document.getElementById('tr-stage');
  if (!stage) return;
  var svg   = document.getElementById('tr-svg');

  var mq = window.matchMedia('(max-width:899px)');
  function setBox(){
    svg.setAttribute('viewBox', mq.matches ? '222 22 556 556' : '0 0 1000 700');
  }
  setBox();
  if (mq.addEventListener) mq.addEventListener('change', setBox);
  else if (mq.addListener) mq.addListener(setBox);

  function run(){ sec.classList.add('tr-run'); }

  if (!('IntersectionObserver' in window)) { run(); return; }

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting){ run(); io.disconnect(); } });
  }, { threshold: 0.22, rootMargin: '0px 0px -8% 0px' });

  io.observe(stage);

  requestAnimationFrame(function(){
    var r = stage.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh * 0.9 && r.bottom > 0){ run(); io.disconnect(); }
  });
})();
