/* scroll-animate.js
   Bars, fills, and counters start at 0 and animate to their target values
   the moment their container scrolls into view. */
(function () {
  if (typeof window === 'undefined' || !document || !document.querySelectorAll) return;
  if (!('IntersectionObserver' in window)) return; // Old browsers: leave charts at their inline values

  var EASE = 'cubic-bezier(.22,.61,.36,1)';
  var DUR = 1400;
  var CSS_DUR = '1.4s';

  // ---- 1. STASH targets + reset to 0 --------------------------------------

  var bars = [];
  document.querySelectorAll('.chart .cbar, .cols .cbar, .cbar').forEach(function (bar) {
    var h = bar.getAttribute('style') && bar.style.height;
    if (!h) return;
    bar.dataset.tgtH = h;
    bar.style.transition = 'height ' + CSS_DUR + ' ' + EASE;
    bar.style.height = '0%';
    bars.push(bar);
  });

  var fills = [];
  document.querySelectorAll('.bar .fill, .track .fill, .fill').forEach(function (fill) {
    var w = fill.getAttribute('style') && fill.style.width;
    if (!w) return;
    fill.dataset.tgtW = w;
    fill.style.transition = 'width ' + CSS_DUR + ' ' + EASE;
    fill.style.width = '0%';
    fills.push(fill);
  });

  var counters = document.querySelectorAll('[data-count]');
  counters.forEach(function (el) {
    var pre = el.dataset.pre || '';
    var suf = el.dataset.suf || '';
    el.dataset.origText = el.textContent;
    el.textContent = pre + '0' + suf;
  });

  // ---- 2. ANIMATE HELPERS -------------------------------------------------

  function fireBar(bar) {
    if (bar.dataset.fired === '1') return;
    bar.dataset.fired = '1';
    if (bar.dataset.tgtH) bar.style.height = bar.dataset.tgtH;
  }
  function fireFill(fill) {
    if (fill.dataset.fired === '1') return;
    fill.dataset.fired = '1';
    if (fill.dataset.tgtW) fill.style.width = fill.dataset.tgtW;
  }
  function fireCounter(el) {
    if (el.dataset.fired === '1') return;
    el.dataset.fired = '1';
    var target = parseFloat(el.dataset.count);
    var pre = el.dataset.pre || '';
    var suf = el.dataset.suf || '';
    var start = performance.now();
    function tick(now) {
      var t = Math.min(1, (now - start) / DUR);
      var eased = 1 - Math.pow(1 - t, 3);
      var val = target * eased;
      var display = target % 1 === 0 ? Math.floor(val) : val.toFixed(1);
      el.textContent = pre + display + suf;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = pre + (target % 1 === 0 ? target : target.toFixed(1)) + suf;
    }
    requestAnimationFrame(tick);
  }

  function fireAllInside(container) {
    container.querySelectorAll('.cbar[data-tgt-h]').forEach(fireBar);
    container.querySelectorAll('.fill[data-tgt-w]').forEach(fireFill);
    container.querySelectorAll('[data-count]').forEach(fireCounter);
    if (container.matches) {
      if (container.matches('.cbar[data-tgt-h]')) fireBar(container);
      if (container.matches('.fill[data-tgt-w]')) fireFill(container);
      if (container.matches('[data-count]')) fireCounter(container);
    }
  }

  // ---- 3. OBSERVE — permissive settings so nothing is missed --------------

  var io = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      fireAllInside(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

  var seen = new Set();
  function observe(el) {
    if (!el || seen.has(el)) return;
    seen.add(el);
    io.observe(el);
  }
  // Observe both containers AND individual bars/fills/counters
  document.querySelectorAll('.chart, .inev-nums, .statband, .bar').forEach(observe);
  bars.forEach(observe);
  fills.forEach(observe);
  counters.forEach(observe);
})();
