(function () {
  var btn = document.querySelector('.nav-hamburger');
  if (!btn) return;
  var body = document.body;

  function close() {
    body.classList.remove('menu-open');
    btn.setAttribute('aria-expanded', 'false');
  }
  function toggle() {
    var open = body.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  btn.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });

  document.addEventListener('click', function (e) {
    if (!body.classList.contains('menu-open')) return;
    if (btn.contains(e.target)) return;
    if (e.target.closest('.nav-links a')) {
      close();
      return;
    }
    if (!e.target.closest('.nav-links')) close();
  });

  window.addEventListener('scroll', function () {
    if (body.classList.contains('menu-open')) close();
  }, { passive: true });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900 && body.classList.contains('menu-open')) close();
  });
})();
