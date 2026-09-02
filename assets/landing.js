/* ============================================================
   The landing: three ways in, and what each one opens.
   ============================================================ */
(function () {
'use strict';
var DEST = { you:'d-you', firm:'d-firm' };
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
/* `onward` is true when the person deliberately put the thing away, by the
   button or by Escape. Then they go to the home page, which is where somebody
   who has just seen the product wants to be. It is false when the browser's
   own back button cleared the hash, because sending them forward to a page
   they were trying to leave would trap them. */
function back(onward){
  if (!open) return;
  var el = open; open = null;
  el.classList.remove('lit');
  document.body.classList.remove('indest');
  document.body.style.overflow = '';
  setTimeout(function(){ el.classList.remove('on'); el.scrollTop = 0; }, 700);
  if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll:true });
  if (history.replaceState) history.replaceState(null, '', location.pathname);
  if (onward) setTimeout(function(){ location.href = '/home'; }, 620);
}

document.querySelectorAll('[data-go]').forEach(function(a){
  a.addEventListener('click', function(e){ e.preventDefault(); go(a.getAttribute('data-go')); });
});
document.querySelectorAll('[data-back]').forEach(function(b){
  b.addEventListener('click', function(){ back(true); });
});
document.addEventListener('keydown', function(e){ if (e.key === 'Escape') back(true); });

/* Someone can arrive on a way in from the menu, from a link, or from a
   bookmark. #personal and #professional each open the right one. */
var HASH = { personal:'you', professional:'firm' };
function fromHash(){
  var k = HASH[(location.hash || '').replace('#','')];
  if (!k) { if (open) back(false); return; }
  if (open === document.getElementById(DEST[k])) return;
  var was = open;
  if (was) back(false);
  setTimeout(function(){ go(k); }, was ? 720 : 0);
}
window.addEventListener('hashchange', fromHash);
if (location.hash) setTimeout(fromHash, 60);

/* ------------------------------------------------------------------
   4ormIQ opens the landing.

   The headline and the lede are there the moment the page paints.
   Assist waits in the corner and offers to help; taking it up brings
   the three ways in onto the screen. Nothing blocks the page, and
   nobody has to answer a question before they can read anything.
   ------------------------------------------------------------------ */
/* The page paints, then reveals itself. This has to run whether or not the
   Assist control is present, because it is what makes the landing visible. */
requestAnimationFrame(function(){
  requestAnimationFrame(function(){ document.body.classList.add('go'); });
});

(function assist(){
  var btn = document.getElementById('asbtn');
  var ways = document.getElementById('lways');
  if (!btn || !ways) return;

  function reveal(){
    if (!ways.hidden) return;
    ways.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    document.getElementById('assist').classList.add('done');
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){ ways.classList.add('in'); });
    });
    var first = ways.querySelector('.lway');
    if (first) setTimeout(function(){ first.focus({ preventScroll:true }); }, 520);
  }

  btn.addEventListener('click', reveal);

  /* Somebody who scrolls has decided to look around on their own. Show them
     the ways in rather than making them find the button first. */
  window.addEventListener('scroll', function once(){
    if (window.pageYOffset > 60) { reveal(); window.removeEventListener('scroll', once); }
  }, { passive: true });
})();

})();
