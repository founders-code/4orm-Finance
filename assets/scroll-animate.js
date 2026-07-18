/* scroll-animate.js
   Kicks every bar chart, fill, and stat counter from 0 up to its target value
   when its container scrolls into view. Includes a 3s safety fallback that
   restores any bar still at 0% so nothing ever stays blank. */
(function () {
  if (typeof window === 'undefined' || !document || !document.querySelectorAll) return;

  var EASE = 'cubic-bezier(.22,.61,.36,1)';
  var DUR = 1400;
  var CSS_DUR = '1.4s';

  var ioSupported = ('IntersectionObserver' in window);

  // ---- 1. STASH targets ---------------------------------------------------

  var bars = [];
  document.querySelectorAll('.chart .cbar, .cbar').forEach(function (bar) {
    var h = bar.style.height;
    if (!h) return;
    bar.dataset.tgtH = h;
    bars.push(bar);
    if (ioSupported) {
      bar.style.height = '0%';
      bar.style.transition = 'height ' + CSS_DUR + ' ' + EASE;
    }
  });

  var fills = [];
  document.querySelectorAll('.bar .fill, .track .fill, .fill').forEach(function (fill) {
    var w = fill.style.width;
    if (!w) return;
    fill.dataset.tgtW = w;
    fills.push(fill);
    if (ioSupported) {
      fill.style.width = '0%';
      fill.style.transition = 'width ' + CSS_DUR + ' ' + EASE;
    }
  });

  var counters = document.querySelectorAll('[data-count]');
  counters.forEach(function (el) {
    var pre = el.dataset.pre || '';
    var suf = el.dataset.suf || '';
    el.dataset.origText = el.textContent;
    if (ioSupported) el.textContent = pre + '0' + suf;
  });

  if (!ioSupported) return;

  // ---- 2. ANIMATE HELPERS -------------------------------------------------

  function restoreBar(bar) {
    if (bar.dataset.tgtH) bar.style.height = bar.dataset.tgtH;
  }
  function restoreFill(fill) {
    if (fill.dataset.tgtW) fill.style.width = fill.dataset.tgtW;
  }
  function tickCounter(el) {
    if (el.dataset.animated === '1') return;
    el.dataset.animated = '1';
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

  function animateContainer(container) {
    container.querySelectorAll('.cbar[data-tgt-h]').forEach(restoreBar);
    container.querySelectorAll('.fill[data-tgt-w]').forEach(restoreFill);
    container.querySelectorAll('[data-count]').forEach(tickCounter);
    // If the element itself is a bar/fill/counter, animate it too
    if (container.matches && container.matches('.cbar[data-tgt-h]')) restoreBar(container);
    if (container.matches && container.matches('.fill[data-tgt-w]')) restoreFill(container);
    if (container.matches && container.matches('[data-count]')) tickCounter(container);
  }

  // ---- 3. OBSERVE ---------------------------------------------------------

  var io = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      animateContainer(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  // Observe containers AND bars/fills/counters directly (belt + braces)
  var seen = new Set();
  function observe(el) {
    if (!el || seen.has(el)) return;
    seen.add(el);
    io.observe(el);
  }
  document.querySelectorAll('.chart, .inev-nums, .statband, .bar').forEach(observe);
  bars.forEach(observe);
  fills.forEach(observe);
  counters.forEach(observe);

  // ---- 4. SAFETY FALLBACK -------------------------------------------------
  // If anything is still at 0% after 3 seconds, snap it to target so nothing
  // ever stays blank on a viewer's screen.
  setTimeout(function () {
    document.querySelectorAll('.cbar[data-tgt-h]').forEach(function (bar) {
      if (bar.style.height === '0%' || bar.style.height === '0') {
        bar.style.height = bar.dataset.tgtH;
      }
    });
    document.querySelectorAll('.fill[data-tgt-w]').forEach(function (fill) {
      if (fill.style.width === '0%' || fill.style.width === '0') {
        fill.style.width = fill.dataset.tgtW;
      }
    });
    counters.forEach(function (el) {
      if (el.dataset.animated !== '1' && el.dataset.origText) {
        el.textContent = el.dataset.origText;
      }
    });
  }, 3000);
})();
