// JJ Pollock - jjpollock.ai
// ============================================================
// STORE PRODUCTS
// Edit this file to add, remove, or change what you sell.
// No other file needs to change - the Store page reads this list.
//
// Each product:
//   name        - shown in the list
//   description - one or two sentences
//   price       - in cents. 0 = free download.
//   tags        - words the search box also matches on
//   file        - FREE items only: path to the file buyers download,
//                 relative to this folder. Put the real file in the
//                 downloads/ folder and push it to GitHub with the site.
//   stripeLink  - PAID items only: your Stripe Payment Link.
//
// STRIPE PAYMENT LINKS (no backend needed):
//   1. In Stripe: Payment links > New, set the product name and price.
//   2. After creating it, open the link's settings:
//      - Confirmation page: choose "Don't show confirmation page" and
//        redirect to a page on your site, e.g. https://jjpollock.ai/thanks.html
//      - OR leave the default confirmation page and turn on the
//        confirmation email with your download link in it (see README).
//   3. Paste the link (https://buy.stripe.com/...) as stripeLink below.
// ============================================================

const PRODUCTS = [
  {
    name: "AI Acceptable Use Policy - Starter Template",
    description:
      "A one-page policy your team can sign today: what AI tools are okay, what data never goes in, and who approves new uses.",
    price: 0,
    tags: ["template", "policy", "governance"],
    file: "downloads/ai-policy-starter-template.pdf",
  },
  {
    name: "AI Readiness Checklist for Small Businesses",
    description:
      "The same checklist I use in audits: 25 questions that show where AI will pay off in your business - and where it won't.",
    price: 0,
    tags: ["checklist", "audit", "getting started"],
    file: "downloads/ai-readiness-checklist.pdf",
  },
  {
    name: "Prompt Pack: 50 Prompts for Small Business Owners",
    description:
      "Battle-tested prompts for marketing, customer emails, hiring, and operations. Copy, paste, adjust, done.",
    price: 1900,
    tags: ["prompts", "marketing", "operations"],
    stripeLink: "https://buy.stripe.com/REPLACE_WITH_YOUR_LINK",
  },
  {
    name: "AI Governance Handbook Template",
    description:
      "A complete, 54 page, editable handbook: policies, approval workflows, incident steps, and training outline. The full version of my governance service.",
    price: 4900,
    tags: ["template", "governance", "policy"],
    stripeLink: "https://buy.stripe.com/REPLACE_WITH_YOUR_LINK",
  },
  {
    name: "Automation Blueprint: 10 Workflows That Pay for Themselves",
    description:
      "Ten step-by-step no-code automations with the exact tools, triggers, and build order. Each one sized for a small business.",
    price: 7900,
    tags: ["automation", "workflows", "blueprint"],
    stripeLink: "https://buy.stripe.com/REPLACE_WITH_YOUR_LINK",
  },
];
