/* v98: hide nav on scroll down, reveal on scroll up. Progressive enhancement — no dependencies. */
(function() {
  var nav = document.querySelector('header.nav');
  if (!nav) return;

  var lastY = window.pageYOffset || document.documentElement.scrollTop || 0;
  var ticking = false;
  var THRESHOLD = 8;       // ignore tiny scroll jitter
  var TOP_LOCK = 60;       // near the very top, always show

  function update() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    var dy = y - lastY;

    if (y < TOP_LOCK) {
      nav.classList.remove('nav-hidden');
      lastY = y;
      ticking = false;
      return;
    }

    if (Math.abs(dy) < THRESHOLD) {
      ticking = false;
      return;
    }

    if (dy > 0) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();
