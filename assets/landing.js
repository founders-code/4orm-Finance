/* ============================================================
   The landing: three ways in, and what each one opens.
   ============================================================ */
(function () {
'use strict';
var DEST = { you:'d-you', firm:'d-firm', explore:'d-explore' };
var open = null, lastFocus = null;

function go(k){
  var el = document.getElementById(DEST[k]);
  if (!el) return;
  lastFocus = document.activeElement;
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
}

document.querySelectorAll('[data-go]').forEach(function(a){
  a.addEventListener('click', function(e){ e.preventDefault(); go(a.getAttribute('data-go')); });
});
document.querySelectorAll('[data-back]').forEach(function(b){ b.addEventListener('click', back); });
document.addEventListener('keydown', function(e){ if (e.key === 'Escape') back(); });

requestAnimationFrame(function(){
  requestAnimationFrame(function(){ document.body.classList.add('go'); });
});
})();
