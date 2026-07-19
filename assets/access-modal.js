/* v102: Data room access-request modal.
   Intercepts any "Request access" / "Enter data room" click, opens a form modal,
   and on submit builds a structured mailto: to office@4ormfinance.com. */
(function () {
  var modal = document.getElementById('request-access-modal');
  if (!modal) return;

  var form = document.getElementById('access-form');
  var openedBy = null;

  function open(evt) {
    if (evt) {
      evt.preventDefault();
      openedBy = evt.currentTarget;
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var first = modal.querySelector('input, select, textarea');
    if (first) setTimeout(function () { first.focus(); }, 80);
  }

  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (openedBy && typeof openedBy.focus === 'function') {
      try { openedBy.focus(); } catch (e) {}
    }
    openedBy = null;
  }

  // Bind every trigger: any anchor tagged with .nav-auth, or whose text
  // reads like a data-room access CTA, or which explicitly requests it.
  var cueTexts = [
    'request access to data room',
    'request access to the data room',
    'request data room access',
    'enter the data room',
    'enter data room'
  ];
  document.querySelectorAll('a, button').forEach(function (el) {
    var txt = (el.textContent || '').trim().toLowerCase();
    var force = el.hasAttribute('data-open-access-modal');
    var isAccessCta = el.classList.contains('nav-auth') ||
                      cueTexts.indexOf(txt) !== -1 ||
                      force;
    if (isAccessCta) {
      el.addEventListener('click', open);
    }
  });

  // Close via backdrop, X button, Cancel button, ESC key
  modal.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      close();
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });

  // Trap tab focus inside modal when open
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || !modal.classList.contains('is-open')) return;
    var focusables = modal.querySelectorAll(
      'input, select, textarea, button, a[href]'
    );
    if (focusables.length === 0) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

  // Submission: build a nicely formatted mailto so the user's email client
  // opens with everything pre-filled. Chad just receives the email.
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var fn = (fd.get('firstname') || '').trim();
      var ln = (fd.get('lastname') || '').trim();
      var firm = (fd.get('firm') || '').trim();

      var lines = [
        '=== DATA ROOM ACCESS REQUEST ===',
        '',
        'Name:                 ' + fn + ' ' + ln,
        'Email:                ' + (fd.get('email') || ''),
        'Phone:                ' + (fd.get('phone') || ''),
        'Firm / Organization:  ' + firm,
        'Role:                 ' + (fd.get('role') || ''),
        'Investor type:        ' + (fd.get('classification') || ''),
        'Area of interest:     ' + (fd.get('interest') || ''),
        'Timeline:             ' + (fd.get('timeline') || ''),
        '',
        'Notes:',
        (fd.get('notes') || '(none)'),
        '',
        '---',
        'Submitted from 4ormfinance.com'
      ];

      var subject = 'Data Room Access Request — ' + fn + ' ' + ln +
                    (firm ? ' (' + firm + ')' : '');
      var body = lines.join('\r\n');
      var mailto = 'mailto:office@4ormfinance.com' +
                   '?subject=' + encodeURIComponent(subject) +
                   '&body=' + encodeURIComponent(body);

      // Open user's mail client and show a thank-you state
      window.location.href = mailto;

      var sent = modal.querySelector('.access-thankyou');
      if (sent) sent.classList.add('is-shown');
      form.style.display = 'none';
    });
  }
})();
