// JJ Pollock - jjpollock.ai

// ============================================================
// BOOKING: paste your Google Calendar appointment schedule URL
// here. It looks like:
//   https://calendar.google.com/calendar/appointments/schedules/XXXXXXXX
// Create one in Google Calendar: Create > Appointment schedule.
// Leave it as null to keep the email fallback button showing.
// ============================================================
const CALENDAR_BOOKING_URL = null;

(function () {
  // Current year in the footer (every page)
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Booking embed lives on the home page only; swap the email
  // fallback for the embedded Google scheduler once a URL is set.
  if (!CALENDAR_BOOKING_URL) return;
  var embed = document.getElementById("booking-embed");
  var iframe = document.getElementById("booking-iframe");
  var fallback = document.getElementById("booking-fallback");
  if (!embed || !iframe || !fallback) return;
  iframe.src = CALENDAR_BOOKING_URL;
  embed.hidden = false;
  fallback.hidden = true;
})();


// ============================================================
// MOBILE MENU (every page): hamburger toggle for the nav
// dropdown shown under 760px. Closes on outside click / Escape.
// ============================================================
(function () {
  var btn = document.getElementById("nav-menu-btn");
  var menu = document.getElementById("nav-menu");
  if (!btn || !menu) return;
  function close() {
    menu.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
  }
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
})();

// ============================================================
// STORE (store.html only)
// Renders the product list from PRODUCTS (products.js), with a
// search box and a filter dropdown. The dropdown lists "Free"
// plus every tag found in PRODUCTS - add a tag to any item in
// products.js and it appears here automatically. Filtering is
// multi-select with OR logic: a product shows if it matches ANY
// selected filter (free items match "Free"). The search box
// narrows whatever the filters show. Free items download
// directly; paid items go to their Stripe Payment Link.
// ============================================================
(function () {
  var list = document.getElementById("store-list");
  if (!list || typeof PRODUCTS === "undefined") return;

  var searchEl = document.getElementById("store-search");
  var countEl = document.getElementById("store-count");
  var emptyEl = document.getElementById("store-empty");
  var filterBtn = document.getElementById("store-filter-btn");
  var filterBadge = document.getElementById("store-filter-badge");
  var filterMenu = document.getElementById("store-filter-menu");
  var filterOptions = document.getElementById("store-filter-options");
  var filterClear = document.getElementById("store-filter-clear");

  var FREE_KEY = "__free";
  var selected = new Set();

  // Discover tags dynamically from the product data
  function allTags() {
    var seen = new Set();
    var tags = [];
    PRODUCTS.forEach(function (p) {
      (p.tags || []).forEach(function (t) {
        if (!seen.has(t)) { seen.add(t); tags.push(t); }
      });
    });
    return tags.sort();
  }

  function tagCount(tag) {
    return PRODUCTS.filter(function (p) { return (p.tags || []).indexOf(tag) !== -1; }).length;
  }

  function hasFreeItems() {
    return PRODUCTS.some(function (p) { return p.price === 0; });
  }

  function freeCount() {
    return PRODUCTS.filter(function (p) { return p.price === 0; }).length;
  }

  function buildFilterOptions() {
    filterOptions.innerHTML = "";
    function addOption(key, label, count) {
      var lab = document.createElement("label");
      lab.className = "filter-option";
      var box = document.createElement("input");
      box.type = "checkbox";
      box.value = key;
      box.checked = selected.has(key);
      box.addEventListener("change", function () {
        if (box.checked) selected.add(key); else selected.delete(key);
        syncFilterUI();
        render();
      });
      var text = document.createElement("span");
      text.textContent = label;
      var n = document.createElement("span");
      n.className = "filter-option-count";
      n.textContent = count;
      lab.appendChild(box);
      lab.appendChild(text);
      lab.appendChild(n);
      filterOptions.appendChild(lab);
    }
    if (hasFreeItems()) addOption(FREE_KEY, "Free", freeCount());
    allTags().forEach(function (t) { addOption(t, t, tagCount(t)); });
  }

  function syncFilterUI() {
    var n = selected.size;
    filterBadge.hidden = n === 0;
    filterBadge.textContent = n;
    filterClear.hidden = n === 0;
    filterBtn.classList.toggle("is-active", n > 0);
  }

  function openMenu(open) {
    filterMenu.hidden = !open;
    filterBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  filterBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    openMenu(filterMenu.hidden);
  });
  filterMenu.addEventListener("click", function (e) { e.stopPropagation(); });
  document.addEventListener("click", function () { openMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") openMenu(false);
  });
  filterClear.addEventListener("click", function () {
    selected.clear();
    filterOptions.querySelectorAll("input").forEach(function (b) { b.checked = false; });
    syncFilterUI();
    render();
  });

  function money(cents) {
    return "$" + (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2);
  }

  function passesFilters(p) {
    if (selected.size === 0) return true;
    if (selected.has(FREE_KEY) && p.price === 0) return true;
    return (p.tags || []).some(function (t) { return selected.has(t); });
  }

  function passesSearch(p, query) {
    if (!query) return true;
    var hay = (p.name + " " + p.description + " " + (p.tags || []).join(" ") + (p.price === 0 ? " free" : "")).toLowerCase();
    return query.toLowerCase().split(/\s+/).every(function (word) {
      return hay.indexOf(word) !== -1;
    });
  }

  function render() {
    var query = searchEl.value.trim();
    var shown = PRODUCTS.filter(function (p) {
      return passesFilters(p) && passesSearch(p, query);
    });

    list.innerHTML = "";
    shown.forEach(function (p) {
      var card = document.createElement("article");
      card.className = "product-card";

      var body = document.createElement("div");
      body.className = "product-body";

      var title = document.createElement("h3");
      title.textContent = p.name;
      body.appendChild(title);

      var desc = document.createElement("p");
      desc.textContent = p.description;
      body.appendChild(desc);

      if (p.tags && p.tags.length) {
        var tags = document.createElement("p");
        tags.className = "product-tags";
        tags.textContent = p.tags.join(" \u00B7 ");
        body.appendChild(tags);
      }

      var side = document.createElement("div");
      side.className = "product-side";

      var price = document.createElement("p");
      price.className = p.price === 0 ? "product-price product-price-free" : "product-price";
      price.textContent = p.price === 0 ? "Free" : money(p.price);
      side.appendChild(price);

      var btn = document.createElement("a");
      if (p.price === 0) {
        btn.className = "btn btn-outline";
        btn.textContent = "Download";
        btn.href = p.file;
        btn.setAttribute("download", "");
      } else {
        btn.className = "btn btn-gold";
        btn.textContent = "Buy";
        btn.href = p.stripeLink;
        btn.target = "_blank";
        btn.rel = "noopener";
      }
      btn.addEventListener("click", function () {
        if (typeof gtag === "function") {
          gtag("event", "product_click", {
            product_name: p.name,
            action: p.price === 0 ? "download" : "buy",
            price: p.price === 0 ? 0 : p.price / 100
          });
        }
      });
      side.appendChild(btn);

      card.appendChild(body);
      card.appendChild(side);
      list.appendChild(card);
    });

    countEl.textContent = shown.length === PRODUCTS.length
      ? PRODUCTS.length + " item" + (PRODUCTS.length === 1 ? "" : "s")
      : shown.length + " of " + PRODUCTS.length + " items";
    emptyEl.hidden = shown.length !== 0;
  }

  buildFilterOptions();
  searchEl.addEventListener("input", render);
  render();
})();
