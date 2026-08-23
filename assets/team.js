/* ============================================================
   4orm Family.

   Nine faces on the page, and the long version behind each one.
   The biographies travel with the page, so opening a person is
   instant and nothing is fetched from anywhere.
   ============================================================ */
(function () {
'use strict';

var data = document.getElementById('tmdata');
var dest = document.getElementById('tmdest');
var body = document.getElementById('tmbody');
if (!data || !dest || !body) return;

var TEAM;
try { TEAM = JSON.parse(data.textContent); } catch (e) { return; }

var lastFocus = null;

var esc = function (s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

var LI = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
  '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 ' +
  '1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 ' +
  '0-2.11 1.43-2.11 2.9V21h-4V9z"/></svg>';

function open(i) {
  var m = TEAM[i];
  if (!m) return;
  lastFocus = document.activeElement;
  body.innerHTML =
    '<div class="tmhead">' +
      '<img class="tmbig" src="' + m.i + '" alt="' + esc(m.n) + '" width="150" height="150" />' +
      '<div>' +
        '<span class="tmk">' + esc(m.k) + '</span>' +
        '<h2 class="tmbn">' + esc(m.n) + '</h2>' +
        '<p class="tmbr">' + esc(m.r) + '</p>' +
        (m.l ? '<a class="tmbl" href="' + m.l + '" target="_blank" rel="noopener">' +
               LI + ' LinkedIn</a>' : '') +
      '</div>' +
    '</div>' +
    '<div class="tmtext">' +
      m.p.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
    '</div>';
  body.scrollTop = 0;
  dest.classList.add('on');
  dest.setAttribute('aria-hidden', 'false');
  document.body.classList.add('tmopen');
  document.documentElement.style.overflow = 'hidden';
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { dest.classList.add('lit'); });
  });
  var x = dest.querySelector('.tmx');
  if (x) setTimeout(function () { x.focus({ preventScroll: true }); }, 260);
}

function close() {
  if (!dest.classList.contains('on')) return;
  dest.classList.remove('lit');
  dest.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('tmopen');
  document.documentElement.style.overflow = '';
  setTimeout(function () { dest.classList.remove('on'); }, 460);
  if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
}

document.addEventListener('click', function (e) {
  var c = e.target.closest && e.target.closest('[data-who]');
  if (c) { open(parseInt(c.getAttribute('data-who'), 10)); return; }
  if (e.target.closest && e.target.closest('.tmx')) { close(); return; }
  if (e.target === dest) close();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') close();
});
})();
