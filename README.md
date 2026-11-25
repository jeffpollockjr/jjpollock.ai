# jjpollock.ai

Personal site for JJ Pollock. Static HTML, CSS, and JS. No build step.

## Pages

- `index.html` - home with three links: About, Portfolio, Products & Services
- `about.html` - who I am
- `portfolio.html` - selected projects (Preferred Hands, Space Goats, AI Consulting)
- `products.html` - Products & Services, with a Products / Services switch
  (`products.html#services` opens the Services tab)
- `product.html?p=SLUG` - the page for any product, built from `products.js`
- `space-goats.html` - the Space Goats product page (space theme, styles in `space-goats/`)
- `store.html`, `services.html`, `how-it-works.html` - old links, redirect to Products & Services

## Editing products (one file: `products.js`)

Every product in the list and every product page comes from `products.js`.

- **Add your Stripe link:** set `stripeLink: "https://buy.stripe.com/..."` on the product.
  Until then the Buy button shows "Checkout opens soon".
- **Set the price:** `price` in cents (`4900` = $49). `0` = free. `null` = "Price coming soon".
- **Buyer count:** set `bought: 37`. `null` shows "New release".
- **Reviews (2 to 4):** fill the `reviews` list, for example
  `reviews: [{ name: "Jane D.", role: "Owner, Acme", text: "Loved it." }]`.
  With no reviews, the Reviews section stays hidden.
- **Free downloads:** put the file in `downloads/` and set `file: "downloads/name.pdf"`.
- Space Goats uses the same entry (`slug: "space-goats"`), so its price, Stripe link,
  buyer count, and reviews also live in `products.js`.

## Booking

All "Book a consultation" and "Book a call" buttons go to the Google Calendar appointment page.

## Publish

GitHub Pages serves the main branch root. Push to publish. When the jjpollock.ai domain is
bought, add a `CNAME` file containing `jjpollock.ai` and set the DNS records in the repo's
Settings > Pages.
