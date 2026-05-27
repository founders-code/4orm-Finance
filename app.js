/* =====================================================================
   4orm Finance, shared utilities
   ===================================================================== */
(function () {
  'use strict';

  /* ---- hex / hash generators (simulated, not cryptographic) ---- */
  function hex(len) {
    var c = '0123456789abcdef', s = '';
    var rnd;
    if (window.crypto && window.crypto.getRandomValues) {
      var arr = new Uint8Array(len);
      window.crypto.getRandomValues(arr);
      for (var i = 0; i < len; i++) s += c[arr[i] & 15];
    } else {
      for (var j = 0; j < len; j++) s += c[Math.floor(Math.random() * 16)];
    }
    return s;
  }
  window.F = window.F || {};
  F.txHash   = function () { return '0x' + hex(64); };
  F.address  = function () { return '0x' + hex(40); };
  F.shortHash = function (h, head, tail) {
    head = head || 10; tail = tail || 8;
    if (!h || h.length <= head + tail + 3) return h;
    return h.slice(0, head) + '…' + h.slice(-tail);
  };

  /* block numbers climb monotonically across the session */
  var _block = 18440200 + Math.floor(Math.random() * 900);
  F.nextBlock = function () { _block += 1 + Math.floor(Math.random() * 3); return _block; };

  /* ---- formatting ---- */
  F.money = function (n) {
    return 'C$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 });
  };
  F.now = function () {
    var d = new Date();
    return d.toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };
  F.gasFee = function () { return (0.4 + Math.random() * 1.8).toFixed(2); };

  /* ---- copy-to-clipboard for any element with class .hash ---- */
  F.bindCopyables = function (root) {
    (root || document).querySelectorAll('.hash[data-copy]').forEach(function (el) {
      if (el._bound) return; el._bound = true;
      el.addEventListener('click', function () {
        var text = el.getAttribute('data-copy');
        var done = function () {
          var prev = el.innerHTML;
          el.classList.add('copied');
          el.innerHTML = '✓ copied';
          setTimeout(function () { el.classList.remove('copied'); el.innerHTML = prev; }, 1100);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, done);
        } else { done(); }
      });
    });
  };

  /* render a copyable hash chip */
  F.hashChip = function (value, head, tail) {
    return '<span class="hash" data-copy="' + value + '" title="Click to copy">' +
      F.shortHash(value, head, tail) + '</span>';
  };

  /* ---- promise-based delay ---- */
  F.sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  /* ---- highlight the active nav link by filename ---- */
  function markNav() {
    var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').toLowerCase();
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('active');
        /* if this link sits inside a dropdown, also highlight the parent trigger */
        var drop = a.closest && a.closest('.nav-drop');
        if (drop) {
          var trig = drop.querySelector('.nav-drop-trigger');
          if (trig) trig.classList.add('active');
        }
      }
    });
  }

  /* ---- inject the Admin (if role) + Log in/out control into every nav ---- */
  function injectNavExtras() {
    var links = document.querySelector('.nav-links');
    if (!links) return;
    var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var onPublic = (path === '' || path === 'index.html' || path === 'login.html');

    // Show an "Admin" link only when the role cookie is admin. The cookie is
    // set by /api/verify on sign-in; real authorization is enforced server-side
    // by middleware and the admin APIs.
    var roleM = (document.cookie || '').match(/(?:^|;\s*)4orm_role=([^;]+)/);
    var isAdmin = roleM && decodeURIComponent(roleM[1]) === 'admin';
    if (isAdmin && !links.querySelector('a[href="admin.html"]')) {
      var ad = document.createElement('a');
      ad.href = 'admin.html';
      ad.textContent = 'Admin';
      if (path === 'admin.html') ad.className = 'active';
      links.appendChild(ad);
    }

    // Add the auth control. On the public Overview we offer Log in; on every
    // other (gated) page, we offer Log out. The session cookie is HttpOnly,
    // so the client cannot read it directly; this static rule is correct
    // because the edge middleware only lets logged-in visitors reach the
    // gated pages in the first place.
    if (!links.querySelector('.nav-auth')) {
      var auth = document.createElement('a');
      auth.className = 'nav-auth';
      if (onPublic) {
        auth.href = 'login.html';
        auth.textContent = 'Log in';
      } else {
        auth.href = '/api/logout';
        auth.textContent = 'Log out';
      }
      links.appendChild(auth);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectNavExtras();
    markNav();
    F.bindCopyables(document);
  });
})();
