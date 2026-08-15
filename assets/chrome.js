/* Chrome injector - shared page furniture for 4ormfinance.com.
   Builds the preview legend, nav, closing CTA, family block and footer.
   Pure DOM. No dependencies. Runs after DOMContentLoaded (defer).

   Disclosure rule for this surface: this site shows WHAT the platform
   produces. It does not describe HOW any of it is produced. Keep it that way.
*/
(function(){
  'use strict';

  /* ========================================================
     CONFIG
     ======================================================== */

  var BRAND_NAME = '4orm Finance';

  /* logo.png is the 4orm Finance lockup: blue mark, white wordmark,
     transparent background, so it sits correctly on the black nav.
     Set USE_LOGO to false to fall back to the typographic wordmark. */
  var USE_LOGO = true;
  var LOGO_SRC = '/assets/logo.png';

  var NAV_LINKS = [
    { label:'Home',            href:'/',             slug:'home' },
    { label:'The rules',       href:'/the-rules',    slug:'rules' },
    { label:'Why it is hard',  href:'/the-problem',  slug:'problem' },
    { label:'What we do',      href:'/what-we-do',   slug:'what' },
    { label:'Contact',         href:'/contact',      slug:'contact' }
  ];

  var CTA_LABEL = 'Talk to us';
  var CTA_HREF  = '/contact';


  /* The investor data room is deliberately NOT linked or named here. A public
     buyer page has no reason to advertise the address of a confidential
     document set. Do not add it back. */
  var CONTACT_EMAIL = 'office@4ormfinance.com';

  /* ========================================================
     Helpers
     ======================================================== */

  var page = document.body.getAttribute('data-page') || 'home';

  function el(tag, attrs, html){
    var n = document.createElement(tag);
    if(attrs){ for(var k in attrs){ n.setAttribute(k, attrs[k]); } }
    if(html != null){ n.innerHTML = html; }
    return n;
  }

  function mount(id, node){
    var m = document.getElementById(id);
    if(m) m.replaceWith(node);
  }

  var ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

  /* ========================================================
     Nav
     ======================================================== */
  function buildNav(){
    var nav = el('header', {class:'nav' + (USE_LOGO ? '' : ' nav--word')});

    var mark = USE_LOGO
      ? '<img class="brand-logo" src="' + LOGO_SRC + '" alt="' + BRAND_NAME + '" />'
      : '<span class="brand-word">' +
          '<span class="bw-main">4<em>orm</em></span>' +
          '<span class="bw-sub">Platform preview</span>' +
        '</span>';

    var links = NAV_LINKS.map(function(l){
      var active = (l.slug === page) ? ' class="is-active"' : '';
      return '<a href="' + l.href + '" data-page="' + l.slug + '"' + active + '>' + l.label + '</a>';
    }).join('');

    nav.innerHTML =
      '<div class="nav-inner">' +
        '<a class="brand" href="/" aria-label="' + BRAND_NAME + ' home">' + mark + '</a>' +
        '<nav class="nav-links" aria-label="Primary">' + links + '</nav>' +
        '<a class="nav-cta" href="' + CTA_HREF + '">' + CTA_LABEL + ' ' + ARROW + '</a>' +
      '</div>';
    return nav;
  }

  /* ========================================================
     Closing CTA
     ======================================================== */
  function buildCTA(){
    var s = el('section', {class:'iw-cta', id:'walkthrough'});
    s.innerHTML =
      '<div class="wrap">' +
        '<span class="stamp"><span class="pulse"></span>The duty is live today</span>' +
        '<h2>Still not sure whether this is you? <span class="accent">Ask us. It is a short conversation.</span></h2>' +
        '<p>Tell us what your firm does and who regulates you. We will tell you plainly whether the duty applies to you, what it asks for, and what it does not ask for. No obligation, and no sales pitch attached to the answer.</p>' +
        '<div class="iw-btns">' +
          '<a class="btn btn-primary" href="' + CTA_HREF + '">' + CTA_LABEL + ' ' + ARROW + '</a>' +
          '<a class="btn btn-ghost" href="/the-rules">Read the rules first</a>' +
        '</div>' +
      '</div>';
    return s;
  }

  /* ========================================================
     Footer
     ======================================================== */
  function buildFooter(){
    var f = el('footer', {class:'footer'});
    var year = new Date().getFullYear();

    f.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<h5>' + BRAND_NAME + '</h5>' +
            '<p>Software for firms that hold money belonging to their clients. It does the checking the law asks for, keeps the proof, and produces it when it is asked for. A Calgary company.</p>' +
            '<div class="foot-contact">' +
              '<div class="fc-lbl">Get in touch</div>' +
              '<a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>' +
                            '<span class="fc-addr">Calgary, Alberta, Canada</span>' +
            '</div>' +
          '</div>' +
          '<div><h6>This site</h6><ul>' +
            NAV_LINKS.slice(1).map(function(l){
              return '<li><a href="' + l.href + '">' + l.label + '</a></li>';
            }).join('') +
          '</ul></div>' +
          '<div><h6>Start here</h6><ul>' +
            '<li><a href="/the-rules#fines">What the fines are</a></li>' +
            '<li><a href="/the-rules#who">Who owes the duty</a></li>' +
            '<li><a href="/the-problem#stories">Four firms, four problems</a></li>' +
            '<li><a href="/the-rules#sources">Where the rules come from</a></li>' +
          '</ul></div>' +
          '<div><h6>Elsewhere</h6><ul>' +
            '<li><a href="' + CTA_HREF + '">' + CTA_LABEL + '</a></li>' +
            '<li><a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a></li>' +
            '<li><a href="/privacy">Privacy</a></li>' +
            '<li><a href="/terms">Terms</a></li>' +
          '</ul></div>' +
        '</div>' +

        '<div class="legal-block">' +
          '<p><strong>Written for a general reader.</strong> This site explains published rules in plain words so that a reader meeting them for the first time can follow them. Plain wording is a summary and the instrument itself governs. Every rule named here is linked so you can read the wording yourself.</p>' +
          '<p><strong>Not advice.</strong> Nothing on this site is legal, compliance, accounting, tax or investment advice, and nothing here is an offer to sell or a solicitation to buy securities. A firm subject to the Retail Payment Activities Act, the Proceeds of Crime (Money Laundering) and Terrorist Financing Act or a provincial real estate act should take its own advice on what those statutes require of it.</p>' +
          '<p><strong>No affiliation.</strong> 4orm Finance is an independent company. It is not affiliated with, endorsed by, sponsored by, acting for or approved by the Bank of Canada, FINTRAC, OSFI, the Canadian Securities Administrators, any provincial regulator or any other public body named anywhere on this site. Those bodies are named only to identify the statutes and published requirements this software is built to serve.</p>' +
          '<p><strong>Intellectual property.</strong> Patent applications pending. This site describes what the platform produces. It does not describe how any of it is produced, and the underlying design is confidential and shown only under a written agreement.</p>' +
          '<p><strong>Sources.</strong> Dates, deadlines and penalty ceilings cited on this site are drawn from the Retail Payment Activities Act and its regulations SOR/2023-229, the Proceeds of Crime (Money Laundering) and Terrorist Financing Act, Bill C-12 as it came into force on 26 March 2026 (S.C. 2026, c. 4), the Canada Evidence Act sections 31.1 to 31.8, and notices published by FINTRAC. Readers should confirm all of them against the current published text before relying on any of them.</p>' +
        '</div>' +

        '<div class="copy-row">' +
          '<span>&#169; ' + year + ' ' + BRAND_NAME + ' &#183; Calgary, Alberta, Canada</span>' +
          '<span>Plain English &#183; every rule named and linked</span>' +
        '</div>' +
      '</div>';
    return f;
  }

  /* ========================================================
     Mount
     ======================================================== */
  mount('nav-mount',    buildNav());
  mount('cta-mount',    buildCTA());
  mount('footer-mount', buildFooter());

  /* ========================================================
     App mock - five-screen switcher on /inside-the-platform
     Presentation only. No data, no logic, no method.
     ======================================================== */
  (function initAppMock(){
    var app = document.querySelector('[data-app-mock]');
    if(!app) return;

    var rails = app.querySelectorAll('.rail-btn');
    var panes = app.querySelectorAll('.app-pane');

    function show(key){
      Array.prototype.forEach.call(rails, function(b){
        b.classList.toggle('on', b.getAttribute('data-screen') === key);
      });
      Array.prototype.forEach.call(panes, function(p){
        p.classList.toggle('on', p.getAttribute('data-pane') === key);
      });
    }

    Array.prototype.forEach.call(rails, function(b){
      b.addEventListener('click', function(){ show(b.getAttribute('data-screen')); });
    });
  })();

})();
