/* =====================================================================
   4orm Finance — gold-button subnav toggle
   Click .nav-exchange → show / hide the full-width black exchange bar
   that sits directly under the white header (identical look on every
   page). On exchange pages the bar starts visible (it already exists in
   the markup); on landing pages it starts hidden and the script
   injects one. Click button again or press Escape to hide.
   ===================================================================== */
(function(){
  var LINKS = [
    ['01','Overview',         '/exchange/'],
    ['02','Marketplace',      '/exchange/marketplace.html'],
    ['03','Tokenize',         '/exchange/tokenize.html'],
    ['04','Lifecycle',        '/exchange/lifecycle.html'],
    ['05','Issuer Portal',    '/exchange/issuer.html'],
    ['06','Investor Portal',  '/exchange/investor.html'],
    ['07','Compliance',       '/exchange/compliance.html'],
    ['08','Settlement',       '/exchange/settlement.html'],
    ['09','Admin & Audit',    '/exchange/admin.html']
  ];

  function buildSubnav(){
    var html = '<div class="subnav-inner">';
    for(var i=0;i<LINKS.length;i++){
      html += '<a href="'+LINKS[i][2]+'"><span class="sn-num">'+LINKS[i][0]+'</span> '+LINKS[i][1]+'</a>';
    }
    html += '</div>';
    return html;
  }

  function init(){
    var btn = document.querySelector('.nav-exchange');
    if(!btn || btn.dataset.exBound === '1') return;
    btn.dataset.exBound = '1';

    // Use existing subnav if present (exchange pages), otherwise inject one
    var sub = document.querySelector('.subnav');
    var injected = false;
    if(!sub){
      sub = document.createElement('div');
      sub.className = 'subnav';
      sub.id = 'exSubnav';
      sub.hidden = true;          // start hidden on landing pages
      sub.innerHTML = buildSubnav();
      var nav = document.querySelector('.nav');
      if(nav && nav.parentNode){
        nav.parentNode.insertBefore(sub, nav.nextSibling);
      } else {
        document.body.insertBefore(sub, document.body.firstChild);
      }
      injected = true;
    }

    // Highlight the active page
    var path = location.pathname;
    sub.querySelectorAll('a').forEach(function(a){
      var href = a.getAttribute('href');
      var match = (href === path) ||
                  (href === '/exchange/' && /\/exchange\/(index\.html)?$/.test(path));
      if(match) a.classList.add('active');
      else a.classList.remove('active');
    });

    var open = !sub.hidden;

    function setOpen(v){
      open = v;
      sub.hidden = !v;
      btn.setAttribute('aria-expanded', v ? 'true' : 'false');
      btn.classList.toggle('is-open', v);
    }

    btn.setAttribute('role','button');
    btn.setAttribute('aria-haspopup','true');
    btn.setAttribute('aria-controls', sub.id || (sub.id = 'exSubnav'));
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if(open) btn.classList.add('is-open');

    btn.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      setOpen(!open);
    });

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && open && injected) setOpen(false);
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
