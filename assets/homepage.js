/* ============================================================
   The home page.

   Two things only: reveal the scattered words and the thread
   that runs through them, and light the relationship line as it
   comes into view. Everything else on the page is CSS.
   ============================================================ */
(function () {
'use strict';

var watch = [];
['.scatter', '.rel', '.orbit'].forEach(function (sel) {
  Array.prototype.slice.call(document.querySelectorAll(sel)).forEach(function (el) {
    watch.push(el);
  });
});
if (!watch.length) return;

function light(el) { el.classList.add('in'); }

if (!('IntersectionObserver' in window)) {
  watch.forEach(light);
  return;
}

var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    /* Half of it has to be on screen. Firing at the first pixel means the
       animation is over before the reader has arrived at it. */
    if (e.isIntersecting) { light(e.target); io.unobserve(e.target); }
  });
}, { threshold: 0.42, rootMargin: '0px 0px -8% 0px' });

watch.forEach(function (el) { io.observe(el); });
})();
