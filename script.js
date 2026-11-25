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

  return { el: el, find: find, href: href, isFree: isFree, priceText: priceText, actionButton: actionButton, boughtText: boughtText, boughtNumber: boughtNumber, reviews: reviews };
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
