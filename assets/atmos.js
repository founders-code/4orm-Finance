/* ============================================================
   4orm - atmosphere
   A slow field of dust that gives the page depth. On the white
   world it reads as the faintest grey specks. Inside Product
   Mode the same field becomes the light in a dark room.
   Nothing here is decoration for its own sake: it is what makes
   the page feel like a space rather than a surface.
   ============================================================ */
(function () {
'use strict';

var cv = document.getElementById('atmos');
if (!cv) return;
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

var ctx = cv.getContext('2d');
var dpr = Math.min(window.devicePixelRatio || 1, 2);
var W = 0, H = 0, pts = [], raf = 0, t0 = 0;

function seedCount() {
  var a = window.innerWidth * window.innerHeight;
  return Math.max(26, Math.min(90, Math.round(a / 26000)));
}

function size() {
  W = window.innerWidth;
  H = window.innerHeight;
  cv.width = Math.round(W * dpr);
  cv.height = Math.round(H * dpr);
  cv.style.width = W + 'px';
  cv.style.height = H + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  seed();
}

/* deterministic, so the field is the same on every load and never
   flickers into a new arrangement on resize */
var s = 20260823;
function rnd() { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }

function seed() {
  s = 20260823;
  pts = [];
  var n = seedCount();
  for (var i = 0; i < n; i++) {
    pts.push({
      x: rnd(), y: rnd(),
      r: 0.6 + rnd() * 1.5,
      /* depth: the small ones sit further back and drift slower */
      d: 0.25 + rnd() * 0.75,
      ph: rnd() * Math.PI * 2,
      sp: 0.05 + rnd() * 0.13
    });
  }
}

function frame(t) {
  raf = requestAnimationFrame(frame);
  if (!t0) t0 = t;
  var el = (t - t0) / 1000;
  var dark = document.body.classList.contains('infocus');

  ctx.clearRect(0, 0, W, H);

  for (var i = 0; i < pts.length; i++) {
    var p = pts[i];
    /* a slow lissajous drift, never a straight line */
    var x = (p.x + Math.sin(el * p.sp * 0.5 + p.ph) * 0.012) * W;
    var y = (p.y + Math.cos(el * p.sp * 0.38 + p.ph) * 0.016) * H;
    var tw = 0.62 + 0.38 * Math.sin(el * p.sp * 1.7 + p.ph);
    var r = p.r * (dark ? 1.15 : 1);

    if (dark) {
      var a = (0.16 + p.d * 0.38) * tw;
      var g = ctx.createRadialGradient(x, y, 0, x, y, r * 4.5);
      g.addColorStop(0, 'rgba(214,228,255,' + a.toFixed(3) + ')');
      g.addColorStop(1, 'rgba(214,228,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, r * 4.5, 0, 6.2832); ctx.fill();
    } else {
      var a2 = (0.030 + p.d * 0.055) * tw;
      ctx.fillStyle = 'rgba(46,85,140,' + a2.toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
    }
  }
}

function start() { if (!raf) { t0 = 0; raf = requestAnimationFrame(frame); } }
function stop()  { if (raf) { cancelAnimationFrame(raf); raf = 0; ctx.clearRect(0, 0, W, H); } }

size();
start();

var rt;
window.addEventListener('resize', function () {
  clearTimeout(rt);
  rt = setTimeout(size, 180);
});

/* never burn a frame on a tab nobody is looking at */
document.addEventListener('visibilitychange', function () {
  if (document.hidden) stop(); else start();
});
})();
