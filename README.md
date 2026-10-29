# jjpollock.ai

Personal brand site for JJ Pollock - AI consulting for Utah small businesses.
Static site, no build step. HTML + CSS + one small JS file.

## Pages

- `index.html` - home: hero, service teasers, process teaser, about teaser, and the booking section
- `services.html` - full details on all six services
- `how-it-works.html` - the full engagement process, step by step
- `about.html` - your bio, with a marked spot for your photo
- `store.html` - the Store: searchable, filterable list of digital products
- `products.js` - the products themselves. Edit this one file to change the Store.
- `downloads/` - the free product files buyers can download directly
- `styles.css` - all styling (white / navy blue / gold palette)
- `script.js` - footer year + booking embed toggle. Booking URL lives here.
- `favicon.svg` - browser tab icon
- `CNAME` - tells GitHub Pages to serve the site at jjpollock.ai

Every page funnels visitors to the booking section on the home page.

## Publish on GitHub Pages

1. Create a public repo named `jjpollockai.github.io` (or any repo and use
   Settings > Pages).
2. Upload these files to the repo root (drag and drop on github.com works).
3. In Settings > Pages, set Source to the main branch, root folder.
4. The `CNAME` file points the site at jjpollock.ai.

## Point the domain at GitHub

After buying jjpollock.ai, add these DNS records at your registrar:

- Four `A` records for `@` pointing to GitHub's IPs:
  185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- One `CNAME` record for `www` pointing to `<your-username>.github.io`

Then in the repo's Settings > Pages, enter `jjpollock.ai` as the custom domain
and enable "Enforce HTTPS" once the certificate provisions (can take an hour).

## Booking: Google Calendar appointment schedule (recommended)

This is the sleek Google-native option - nicer than a Google Form, and it books
straight onto your Google Calendar with no backend needed:

1. In Google Calendar: click Create > Appointment schedule.
2. Set up a 30-minute "Intro call" schedule with your availability.
3. Open the schedule, click Share, and copy the booking page link. It looks like:
   https://calendar.google.com/calendar/appointments/schedules/XXXXXXXX
4. Paste that URL into `script.js` as the value of `CALENDAR_BOOKING_URL`.

The scheduler then appears embedded in the Book section of the home page. Until
you paste the URL, visitors see an "Email me to book a call" button instead, so
the site works from day one.

## Add your photo

The About page has a dashed placeholder box where your photo goes:

1. Save a photo as `headshot.jpg` in this folder.
2. In `about.html`, delete the div with class `photo-placeholder` and uncomment
   the `<img>` line below it (the comment explains the same steps).

## Editing the copy

Everything is plain HTML, clearly sectioned with comments. Prices were
intentionally left off the site since final pricing is still your call - add
them to `services.html` when you've decided.

## The Store: products, Stripe, and delivery

Everything for the Store lives in `products.js` - names, descriptions, prices,
tags, and where each item goes when clicked. No HTML editing needed.

The filter dropdown builds itself from your data: any tag you add to a
product appears in the filter automatically, and shoppers can select several
at once (an item shows if it matches ANY selected filter; "Free" matches the
$0 items). The search box narrows whatever the filters show.

### Free products

Put the real file in `downloads/`, push it to GitHub with the rest of the site,
and set the product's `file` path in `products.js`. Visitors download it
straight from the site. The two placeholder PDFs in `downloads/` show the
pattern - replace them with your real files.

### Paid products (Stripe Payment Links - no backend, no storage to buy)

1. In Stripe: **Payment links > New**, set the product name and price.
2. Create one Payment Link per paid product and paste each into `products.js`
   as its `stripeLink` (replacing `https://buy.stripe.com/REPLACE_WITH_YOUR_LINK`).
3. Pick how buyers get the file - two options, both work on a static site:
   - **Confirmation email (recommended to start):** on the Payment Link's
     settings, turn on the post-purchase confirmation email and put your
     download link in it. Do NOT link straight to the raw file in this repo -
     anything in a public GitHub Pages repo can be downloaded by anyone who
     guesses or finds the URL, paid or not. Instead, upload paid files
     somewhere private (a private Dropbox/Drive share link, or Stripe's own
     file field on the product) and put that link in the email.
   - **Success redirect:** set the Payment Link's confirmation page to
     redirect to a page on your site, e.g. `thanks.html`, with the download
     link on it. Simple, but anyone with that page's URL can download too,
     so the confirmation email is the safer default.

That's it - Stripe hosts the checkout, collects the money, and sends the
email. No server, no database, no extra storage to buy.

## The design (v4 redesign)

The site uses a "workshop blueprint" look: warm cream graph-paper background,
deep ink borders with hard offset shadows, safety orange + gold accents,
Fraunces for headlines and Space Mono for labels, buttons and prices.
Everything is plain CSS custom properties at the top of `styles.css` - change
`--orange`, `--gold`, `--paper` or `--ink` in one place and the whole site
follows. The marquee strip on the home page is a plain HTML block you can
edit or delete.
