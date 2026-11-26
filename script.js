// JJ Pollock - jjpollock.ai
// Shared script for every page: footer year, mobile menu,
// Products & Services tabs, product list, product pages.
// Product content lives in products.js.

(function () {
  // ---------- footer year ----------
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- mobile menu ----------
  var btn = document.getElementById("nav-menu-btn");
  var menu = document.getElementById("nav-menu");
  if (btn && menu) {
    var close = function () {
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
    };
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var opening = menu.hidden;
      menu.hidden = !opening;
      btn.setAttribute("aria-expanded", String(opening));
      btn.setAttribute("aria-label", opening ? "Close menu" : "Open menu");
    });
    menu.addEventListener("click", function (e) { e.stopPropagation(); });
    document.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }
})();

// ============================================================
// PRODUCT HELPERS (shared by the list, product pages, Space Goats)
// ============================================================
var JJ = (function () {
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function money(cents) {
    return "$" + (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2);
  }

  function find(slug) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].slug === slug) return PRODUCTS[i];
    return null;
  }

  function href(p) {
    return p.page ? p.page : "product.html?p=" + encodeURIComponent(p.slug);
  }

  function isFree(p) { return p.price === 0; }

  function priceText(p) {
    if (p.price === 0) return "Free";
    if (typeof p.price === "number") return money(p.price);
    return "Price coming soon";
  }

  function stripeReady(p) {
    return typeof p.stripeLink === "string" && /^https:\/\//.test(p.stripeLink);
  }

  // The buy / download button for a product.
  function actionButton(p, cls) {
    var a;
    if (isFree(p)) {
      if (p.file) {
        a = el("a", cls, "Download free");
        a.href = p.file;
        a.setAttribute("download", "");
      } else {
        a = el("span", cls + " is-disabled", "Download coming soon");
        a.setAttribute("aria-disabled", "true");
      }
    } else if (stripeReady(p)) {
      a = el("a", cls, "Buy now");
      a.href = p.stripeLink;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a = el("span", cls + " is-disabled", "Checkout opens soon");
      a.setAttribute("aria-disabled", "true");
    }
    if (a.tagName === "A") {
      a.addEventListener("click", function () {
        if (typeof gtag === "function") {
          gtag("event", "product_click", {
            product_name: p.name,
            action: isFree(p) ? "download" : "buy",
            price: typeof p.price === "number" ? p.price / 100 : 0
          });
        }
      });
    }
    return a;
  }

  // "N people have bought this" line
  function boughtText(p) {
    if (typeof p.bought !== "number") return "Buyer count coming soon";
    var verb = isFree(p) ? "downloaded" : "bought";
    return p.bought.toLocaleString("en-US") + (p.bought === 1 ? " person has " : " people have ") + verb + " this";
  }

  function boughtNumber(p) {
    return typeof p.bought === "number" ? p.bought.toLocaleString("en-US") : null;
  }

  function reviews(p, container) {
    container.innerHTML = "";
    (p.reviews || []).slice(0, 4).forEach(function (r) {
      var card = el("figure", "review");
      var stars = el("p", "review-stars", "\u2605\u2605\u2605\u2605\u2605");
      stars.setAttribute("aria-label", "5 out of 5 stars");
      card.appendChild(stars);
      card.appendChild(el("blockquote", "review-text", r.text));
      var cap = el("figcaption", "review-who");
      cap.appendChild(el("b", null, r.name));
      if (r.role) cap.appendChild(el("span", null, r.role));
      card.appendChild(cap);
      container.appendChild(card);
    });
    return (p.reviews || []).length > 0;
  }

  // Product icons: prompt packs are navy chat-bubble tiles, templates are
  // peach document tiles, the rest have their own colour.
  var ICONS = {
    "everyday-ai-prompt-pack": ["pack", '<path d="M10 14h44a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H28l-12 10V44h-6a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z"/><path d="M22 27h20M22 35h12"/>'],
    "everyday-ai-prompt-pack-pro": ["pack", '<path d="M10 14h44a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H28l-12 10V44h-6a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z"/><path d="M35 19l-9 12h8l-3 10 10-13h-8z" class="ic-acc"/>'],
    "business-prompt-pack-team": ["pack", '<path d="M8 12h30a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H20l-8 7v-7H8a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z"/><path d="M26 40v4a4 4 0 0 0 4 4h14l8 7v-7h4a4 4 0 0 0 4-4V32a4 4 0 0 0-4-4h-6" class="ic-acc"/>'],
    "business-prompt-pack-executive": ["pack", '<path d="M10 14h44a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H28l-12 10V44h-6a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z"/><path d="M22 36l-2-12 8 6 4-8 4 8 8-6-2 12z" class="ic-acc"/>'],
    "ai-governance-handbook-template": ["tpl", '<path d="M14 6h26l12 12v40H14z"/><path d="M40 6v12h12"/><path d="M32 28l9 3v8c0 6-4 10-9 12-5-2-9-6-9-12v-8z" class="ic-acc"/>'],
    "ai-policy-starter-template": ["tpl", '<path d="M14 6h26l12 12v40H14z"/><path d="M40 6v12h12"/><path d="M22 28h18M22 36h14" /><path d="M24 48l5 5 11-11" class="ic-acc"/>'],
    "ai-playbook-for-kids": ["book", '<path d="M32 16c-6-5-16-6-24-4v38c8-2 18-1 24 4 6-5 16-6 24-4V12c-8-2-18-1-24 4z"/><path d="M32 16v38"/><path d="M44 22l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" class="ic-acc"/>'],
    "ai-readiness-checklist": ["check", '<rect x="12" y="10" width="40" height="46" rx="4"/><path d="M24 6h16v8H24z"/><path d="M20 26l4 4 7-8M20 42l4 4 7-8M37 27h9M37 43h9" class="ic-acc"/>']
  };

  function icon(p, size) {
    var wrap = el("div", "p-icon p-icon-" + size);
    if (p.slug === "space-goats") {
      wrap.className += " p-icon-space";
      var im = el("img");
      im.src = "space-goats/goat.jpg";
      im.alt = "";
      wrap.appendChild(im);
      return wrap;
    }
    var d = ICONS[p.slug] || ["pack", '<rect x="12" y="12" width="40" height="40" rx="6"/>'];
    wrap.className += " p-icon-" + d[0];
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">' + d[1] + "</svg>";
    return wrap;
  }

  return { icon: icon, el: el, find: find, href: href, isFree: isFree, priceText: priceText, actionButton: actionButton, boughtText: boughtText, boughtNumber: boughtNumber, reviews: reviews };
})();

// ============================================================
// PRODUCTS & SERVICES PAGE: tabs + product list
// ============================================================
(function () {
  var list = document.getElementById("product-list");
  if (!list || typeof PRODUCTS === "undefined") return;

  PRODUCTS.forEach(function (p) {
    var card = JJ.el("a", "product-card");
    card.href = JJ.href(p);
    if (p.slug === "space-goats") card.className += " product-card-space";

    var body = JJ.el("div", "product-body");
    body.appendChild(JJ.el("p", "product-kind", p.kind || "Product"));
    body.appendChild(JJ.el("h3", null, p.name));
    body.appendChild(JJ.el("p", "product-summary", p.summary));

    var side = JJ.el("div", "product-side");
    var price = JJ.el("p", "product-price", JJ.priceText(p));
    if (JJ.isFree(p)) price.className += " product-price-free";
    else if (typeof p.price !== "number") price.className += " product-price-soon";
    side.appendChild(price);
    side.appendChild(JJ.el("span", "product-more", "View details \u2192"));

    card.appendChild(body);
    card.appendChild(side);
    card.insertBefore(JJ.icon(p, "sm"), body);
    list.appendChild(card);
  });

  // Tabs
  var tabs = { products: document.getElementById("tab-products"), services: document.getElementById("tab-services") };
  var panels = { products: document.getElementById("panel-products"), services: document.getElementById("panel-services") };

  function show(which, push) {
    Object.keys(tabs).forEach(function (k) {
      var on = k === which;
      tabs[k].setAttribute("aria-selected", on ? "true" : "false");
      tabs[k].tabIndex = on ? 0 : -1;
      panels[k].hidden = !on;
    });
    if (push) history.replaceState(null, "", which === "services" ? "#services" : "#products");
  }

  Object.keys(tabs).forEach(function (k) {
    tabs[k].addEventListener("click", function () { show(k, true); });
    tabs[k].addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        var other = k === "products" ? "services" : "products";
        show(other, true);
        tabs[other].focus();
      }
    });
  });

  function fromHash() { show(location.hash === "#services" ? "services" : "products", false); }
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();

// ============================================================
// PRODUCT PAGE (product.html?p=slug)
// ============================================================
(function () {
  var root = document.getElementById("product-root");
  if (!root || typeof PRODUCTS === "undefined") return;

  var slug = new URLSearchParams(location.search).get("p");
  var p = slug ? JJ.find(slug) : null;
  if (p && p.page && p.page !== "product.html") { location.replace(p.page); return; }
  if (!p) { document.getElementById("product-missing").hidden = false; return; }

  document.title = p.name + " | JJ Pollock";
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", p.summary);
  document.getElementById("p-crumb").textContent = p.name;

  var grid = JJ.el("div", "product-grid");

  var main = JJ.el("div", "product-main");
  main.appendChild(JJ.icon(p, "lg"));
  main.appendChild(JJ.el("p", "product-kind", p.kind || "Product"));
  main.appendChild(JJ.el("h1", null, p.name));
  (p.description || []).forEach(function (t) { main.appendChild(JJ.el("p", "product-desc", t)); });
  if (p.details && p.details.length) {
    var ul = JJ.el("ul", "product-facts");
    p.details.forEach(function (d) { ul.appendChild(JJ.el("li", null, d)); });
    main.appendChild(ul);
  }

  var buy = JJ.el("aside", "buy-card");
  var price = JJ.el("p", "buy-price", JJ.priceText(p));
  if (typeof p.price !== "number") price.className += " buy-price-soon";
  buy.appendChild(price);
  buy.appendChild(JJ.actionButton(p, "btn btn-gold btn-large btn-block"));
  var num = JJ.boughtNumber(p);
  var stat = JJ.el("p", "buy-stat");
  if (num !== null) {
    var strong = JJ.el("strong", null, num);
    stat.appendChild(strong);
    stat.appendChild(document.createTextNode(" " + (p.bought === 1 ? "person has " : "people have ") + (JJ.isFree(p) ? "downloaded this" : "bought this")));
  } else {
    stat.textContent = JJ.boughtText(p);
  }
  buy.appendChild(stat);
  if (!JJ.isFree(p)) buy.appendChild(JJ.el("p", "buy-note", "Secure checkout with Stripe."));

  grid.appendChild(main);
  grid.appendChild(buy);
  root.appendChild(grid);

  var revBox = document.getElementById("reviews");
  var revSec = document.getElementById("reviews-section");
  if (revBox && JJ.reviews(p, revBox)) revSec.hidden = false;
})();
