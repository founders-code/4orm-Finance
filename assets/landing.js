/* ============================================================
   The landing: three ways in, and what each one opens.
   ============================================================ */
(function () {
'use strict';
var DEST = { you:'d-you', firm:'d-firm' };
var open = null, lastFocus = null;
/* Where the person was standing when they picked this up. Putting the phone
   away should return them there, not somewhere they never chose to be. */
var cameFromMenu = false;

function go(k, viaMenu){
  var el = document.getElementById(DEST[k]);
  if (!el) return;
  lastFocus = document.activeElement;
  cameFromMenu = !!viaMenu;
  open = el;
  el.classList.add('on');
  document.body.classList.add('indest');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ el.classList.add('lit'); }); });
  setTimeout(function(){
    var b = el.querySelector('[data-back]');
    if (b) b.focus({ preventScroll:true });
  }, 420);
}
function back(){
  if (!open) return;
  var el = open; open = null;
  el.classList.remove('lit');
  document.body.classList.remove('indest');
  document.body.style.overflow = '';
  setTimeout(function(){ el.classList.remove('on'); el.scrollTop = 0; }, 700);
  if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll:true });
  cameFromMenu = false;
  if (history.replaceState) history.replaceState(null, '', location.pathname);
  /* There are two landing surfaces: the three doors, and the menu. Coming out
     of the phone or the dashboard, the menu is the one that is useful — it is
     where the person can go somewhere next rather than start over. */
  setTimeout(function(){
    var b = document.getElementById('burger');
    if (b && !document.querySelector('.omenu.open')) b.click();
  }, 780);
}

document.querySelectorAll('[data-go]').forEach(function(a){
  a.addEventListener('click', function(e){ e.preventDefault(); go(a.getAttribute('data-go')); });
});
document.querySelectorAll('[data-back]').forEach(function(b){ b.addEventListener('click', back); });
document.addEventListener('keydown', function(e){ if (e.key === 'Escape') back(); });

/* Someone can arrive on a way in from the menu, from a link, or from a
   bookmark. #personal and #professional each open the right one. */
var HASH = { personal:'you', professional:'firm' };
function fromHash(){
  var k = HASH[(location.hash || '').replace('#','')];
  if (!k) { if (open) back(); return; }
  if (open === document.getElementById(DEST[k])) return;
  var was = open;
  /* Arriving by hash while the menu is open means they picked it in the menu. */
  var viaMenu = !!document.querySelector('.omenu.open');
  if (was) back();
  setTimeout(function(){ go(k, viaMenu); }, was ? 720 : 0);
}
window.addEventListener('hashchange', fromHash);
if (location.hash) setTimeout(fromHash, 60);

requestAnimationFrame(function(){
  requestAnimationFrame(function(){ document.body.classList.add('go'); });
});
})();
