/* scroll-animate.js
   Kicks every bar chart, fill, and stat counter from 0 up to its target value
   the moment its container scrolls into view. Runs once per element. */
(function () {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  var EASE = 'cubic-bezier(.22,.61,.36,1)';
  var DUR = 1400;   // ms for numeric counters
  var CSS_DUR = '1.4s';

  // ---- 1. STASH targets and reset to zero -----------------------------------

  // Vertical bars in the Challenge chart (.cbar has inline style="height:X%")
  document.querySelectorAll('.chart .cbar').forEach(function (bar) {
    var h = bar.style.height;
    if (!h) return;
    bar.dataset.tgtH = h;
    bar.style.height = '0%';
    bar.style.transition = 'height ' + CSS_DUR + ' ' + EASE;
  });

  // Horizontal fills in the forecast bar and any inline fill widths
  document.querySelectorAll('.bar .fill, .track .fill, [style*="width:"].fill').forEach(function (fill) {
    var w = fill.style.width;
    if (!w) return;
    fill.dataset.tgtW = w;
    fill.style.width = '0%';
    fill.style.transition = 'width ' + CSS_DUR + ' ' + EASE;
  });

  // Numeric counters marked with data-count
  var counters = document.querySelectorAll('[data-count]');
  counters.forEach(function (el) {
    var pre = el.dataset.pre || '';
    var suf = el.dataset.suf || '';
    el.dataset.origText = el.textContent;
    el.textContent = pre + '0' + suf;
  });

  // ---- 2. OBSERVE containers ------------------------------------------------

  var containers = new Set();
  document.querySelectorAll('.chart, .inev-nums, .statband, .bar').forEach(function (c) {
    containers.add(c);
  });

  function animateContainer(container) {
    // Restore bar heights
    container.querySelectorAll('.cbar[data-tgt-h]').forEach(function (bar) {
      bar.style.height = bar.dataset.tgtH;
    });
    // Restore fill widths
    container.querySelectorAll('.fill[data-tgt-w]').forEach(function (fill) {
      fill.style.width = fill.dataset.tgtW;
    });
    // Count up numbers inside
    container.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseFloat(el.dataset.count);
      var pre = el.dataset.pre || '';
      var suf = el.dataset.suf || '';
      var start = performance.now();
      function tick(now) {
        var t = Math.min(1, (now - start) / DUR);
        var eased = 1 - Math.pow(1 - t, 3);
        var val = target * eased;
        // integer for whole-number targets, one decimal otherwise
        var display = target % 1 === 0 ? Math.floor(val) : val.toFixed(1);
        el.textContent = pre + display + suf;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = pre + (target % 1 === 0 ? target : target.toFixed(1)) + suf;
      }
      requestAnimationFrame(tick);
    });
  }

  var io = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      animateContainer(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.20, rootMargin: '0px 0px -80px 0px' });

  containers.forEach(function (c) { io.observe(c); });

  // Loose data-count elements not inside a tracked container (belt + braces)
  counters.forEach(function (el) {
    var container = el.closest('.chart, .inev-nums, .statband, .bar');
    if (!container) io.observe(el);
  });
})();
