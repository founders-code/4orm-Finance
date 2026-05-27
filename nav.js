/* =====================================================================
   4orm Finance — gold-button dropdown
   Click .nav-exchange → toggle a small floating menu of all 9 exchange
   pages. Click again, click outside, or press Escape to close.
   The button itself does NOT navigate — the menu has an "Open exchange"
   link at the top for that.
   ===================================================================== */
(function(){
  function init(){
    var btn = document.querySelector('.nav-exchange');
    if(!btn || btn.dataset.ddBound === '1') return;
    btn.dataset.ddBound = '1';

    // Build dropdown
    var dd = document.createElement('div');
    dd.className = 'ex-dropdown';
    dd.id = 'exDropdown';
    dd.hidden = true;
    dd.innerHTML =
      '<div class="ex-dd-head">' +
        '<span class="ex-dd-eye">4ormEx · The 4orm Exchange</span>' +
        '<a href="/exchange/" class="ex-dd-open">Open exchange home →</a>' +
      '</div>' +
      '<nav class="ex-dd-nav" aria-label="Exchange sections">' +
        '<a href="/exchange/"><span class="sn-num">01</span><span>Overview</span></a>' +
        '<a href="/exchange/marketplace.html"><span class="sn-num">02</span><span>Marketplace</span></a>' +
        '<a href="/exchange/tokenize.html"><span class="sn-num">03</span><span>Tokenize</span></a>' +
        '<a href="/exchange/lifecycle.html"><span class="sn-num">04</span><span>Lifecycle</span></a>' +
        '<a href="/exchange/issuer.html"><span class="sn-num">05</span><span>Issuer Portal</span></a>' +
        '<a href="/exchange/investor.html"><span class="sn-num">06</span><span>Investor Portal</span></a>' +
        '<a href="/exchange/compliance.html"><span class="sn-num">07</span><span>Compliance</span></a>' +
        '<a href="/exchange/settlement.html"><span class="sn-num">08</span><span>Settlement</span></a>' +
        '<a href="/exchange/admin.html"><span class="sn-num">09</span><span>Admin & Audit</span></a>' +
      '</nav>';
    document.body.appendChild(dd);

    // Highlight current page if on an exchange page
    var path = location.pathname;
    if(/\/exchange\/?$/.test(path)) path = '/exchange/';
    dd.querySelectorAll('.ex-dd-nav a').forEach(function(a){
      var href = a.getAttribute('href');
      if(href === path || (href === '/exchange/' && /\/exchange\/(index\.html)?$/.test(location.pathname))){
        a.classList.add('active');
      }
    });

    btn.setAttribute('role','button');
    btn.setAttribute('aria-haspopup','true');
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-controls','exDropdown');

    var open = false;

    function position(){
      var r = btn.getBoundingClientRect();
      var ddW = dd.offsetWidth || 280;
      var left = r.left + (r.width/2) - (ddW/2);
      // keep on-screen
      var pad = 12;
      var maxLeft = window.innerWidth - ddW - pad;
      if(left < pad) left = pad;
      if(left > maxLeft) left = maxLeft;
      dd.style.top = (r.bottom + 10) + 'px';
      dd.style.left = left + 'px';
    }

    function setOpen(v){
      open = v;
      if(v){
        dd.hidden = false;
        // measure after visible
        requestAnimationFrame(position);
        btn.setAttribute('aria-expanded','true');
        btn.classList.add('is-open');
      } else {
        dd.hidden = true;
        btn.setAttribute('aria-expanded','false');
        btn.classList.remove('is-open');
      }
    }

    btn.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      setOpen(!open);
    });

    document.addEventListener('click', function(e){
      if(!open) return;
      if(btn.contains(e.target) || dd.contains(e.target)) return;
      setOpen(false);
    });

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && open){ setOpen(false); btn.focus(); }
    });

    window.addEventListener('resize', function(){ if(open) position(); });
    window.addEventListener('scroll', function(){ if(open) position(); }, {passive:true});
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
