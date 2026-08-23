/* ============================================================
   Research: filter by sector.

   Filtering hides rows rather than reordering them, so a figure
   never appears to change its meaning by moving.
   ============================================================ */
(function () {
'use strict';
var wrap = document.getElementById('rlist');
if (!wrap) return;
var rows = Array.prototype.slice.call(wrap.querySelectorAll('.rd'));
var btns = Array.prototype.slice.call(document.querySelectorAll('.rf'));

btns.forEach(function (b) {
  b.addEventListener('click', function () {
    var tag = b.getAttribute('data-tag');
    btns.forEach(function (x) { x.classList.toggle('on', x === b); });
    rows.forEach(function (r) {
      r.classList.toggle('hid', tag !== 'all' && r.getAttribute('data-tag') !== tag);
    });
  });
});
})();
