// JJ Pollock - jjpollock.ai
// ============================================================
// PRODUCTS
// Edit this one file to change the Products list AND every
// product page. Nothing else needs to change.
//
// Each product:
//   slug         - used in the page link (product.html?p=SLUG)
//   name         - product title
//   summary      - one or two sentences, shown in the list
//   description  - array of paragraphs, shown on the product page
//   details      - array of short "at a glance" facts
//   price        - in cents. 0 = free. null = not priced yet
//                  ("Price coming soon" is shown).
//   stripeLink   - your Stripe Payment Link (https://buy.stripe.com/...)
//                  Leave null until you have it: the Buy button then
//                  shows "Checkout opens soon".
//   file         - FREE items only: file in downloads/ to download.
//   bought       - number of people who bought it. null = shows
//                  "Buyer count coming soon" until you set a number.
//   reviews      - 2 to 4 reviews, each:
//                  { name: "Jane D.", role: "Owner, Acme", text: "..." }
//                  Empty list = the Reviews section stays hidden.
//   page         - only for products with their own custom page
//                  (Space Goats uses space-goats.html).
// ============================================================

const PRODUCTS = [
  {
    slug: "space-goats",
    page: "space-goats.html",
    name: "Space Goats",
    kind: "Card game",
    summary:
      "A card game for 2 to 6 players. Goats, spaceships, and the kind of chaos that demands a rematch.",
    description: [
      "Space Goats is a card game for 2 to 6 players. Collect goats, play cards that eject, destroy, and steal, and block your rivals' best moves.",
    ],
    details: ["2 to 6 players", "104 cards", "22 unique card designs"],
    price: null,
    stripeLink: null,
    bought: null,
    reviews: [],
  },
  {
    slug: "ai-governance-handbook-template",
    name: "AI Governance Handbook Template",
    kind: "Template",
    summary:
      "A complete, editable 54-page handbook: policies, approval workflows, incident steps, and a training outline.",
    description: [
      "A full AI governance handbook you can edit and make your own. It is written for small and mid-sized business owners who need clear rules for how their team uses AI, without hiring a policy team.",
      "It covers acceptable use, data handling, approval workflows for new tools, incident steps, and a training outline. It draws on public frameworks such as the NIST AI Risk Management Framework.",
    ],
    details: ["54 pages", "Editable document", "For small and mid-sized businesses"],
    price: 4900,
    stripeLink: null,
    bought: null,
    reviews: [],
  },
  {
    slug: "business-prompt-pack-executive",
    name: "The Business Prompt Pack: Executive Edition",
    kind: "Prompt pack",
    summary:
      "80 ready-to-run prompts for owners, founders, and executives: all 50 Team prompts plus 30 built for leaders.",
    description: [
      "80 prompts for owners, founders, and C-suite leaders of small and mid-sized businesses that have no data team. It includes all 50 prompts from the Team Edition plus 30 more written for leadership work.",
      "Each prompt is pre-filled with a realistic situation, so you correct what's wrong instead of starting from a blank page. Prompts connect to your tools, run reports, build dashboards, and track competitors.",
    ],
    details: ["80 prompts", "Includes the full Team Edition"],
    price: null,
    stripeLink: null,
    bought: null,
    reviews: [],
  },
  {
    slug: "business-prompt-pack-team",
    name: "The Business Prompt Pack: Team Edition",
    kind: "Prompt pack",
    summary:
      "50 master prompts for non-technical teammates at growing companies. Copy, paste, and get real work done.",
    description: [
      "50 master prompts for people who aren't technical and don't want to be. Built for teams at companies of roughly 10 to 500 people.",
      "Each prompt comes with an assumed situation already filled in, clear rules for what the AI should and shouldn't do, and a defined output. Every prompt that touches email, files, or money tells the AI never to send, spend, or share without your go-ahead.",
    ],
    details: ["50 prompts", "For non-technical teams"],
    price: null,
    stripeLink: null,
    bought: null,
    reviews: [],
  },
  {
    slug: "everyday-ai-prompt-pack-pro",
    name: "The Everyday AI Prompt Pack: Pro",
    kind: "Prompt pack",
    summary:
      "About 50 advanced prompts for people who already use AI and want more from it.",
    description: [
      "A 62-page pack of about 50 advanced prompts for people who are already comfortable with AI. It is built for knowledge workers, creators, and anyone with a side hustle.",
      "Every prompt starts from an assumed situation you can correct, then walks the AI through the steps and the exact format you want back.",
    ],
    details: ["62 pages", "About 50 prompts"],
    price: null,
    stripeLink: null,
    bought: null,
    reviews: [],
  },
  {
    slug: "everyday-ai-prompt-pack",
    name: "The Everyday AI Prompt Pack",
    kind: "Prompt pack",
    summary:
      "10 prompts that make free ChatGPT useful on your phone, for meal plans, budgets, and busy weeks.",
    description: [
      "A 14-page starter pack with 10 prompts designed for the free version of ChatGPT on your phone. Each one is pre-filled with a typical situation, like a busy family, so you only change what's different.",
      "Start here if AI still feels like a blank box.",
    ],
    details: ["14 pages", "10 prompts", "Works on free ChatGPT"],
    price: 0,
    file: null,
    bought: null,
    reviews: [],
  },
  {
    slug: "ai-playbook-for-kids",
    name: "The AI Playbook for Kids",
    kind: "Playbook",
    summary:
      "Eight creative plays for kids 8 to 16 to try with an adult: design a treehouse, invent a sport, solve a mystery.",
    description: [
      "A 21-page playbook with eight plays that turn AI into a creative sidekick: Create a Solar System, Invent a Robot Best Friend, Build a Mythical Creature, Time-Travel Interview, Design Your Dream Treehouse, Start a Snack Company, Make Up a New Sport, and Solve the Mystery.",
      "Each play has two copy-and-paste prompts and a short note for grown-ups with the goal, what to watch for, and how long it takes. Meant to be done together with an adult.",
    ],
    details: ["21 pages", "8 plays", "Ages 8 to 16, with a grown-up"],
    price: 0,
    file: null,
    bought: null,
    reviews: [],
  },
  {
    slug: "ai-policy-starter-template",
    name: "AI Acceptable Use Policy: Starter Template",
    kind: "Template",
    summary:
      "A one-page policy your team can sign today: which AI tools are okay, what data never goes in, who approves new uses.",
    description: [
      "A one-page AI acceptable use policy for small teams. It says which tools are approved, what kind of data never goes into them, and who signs off on new uses.",
      "Download it, drop in your company name, and share it with your team.",
    ],
    details: ["1 page", "PDF"],
    price: 0,
    file: "downloads/ai-policy-starter-template.pdf",
    bought: null,
    reviews: [],
  },
  {
    slug: "ai-readiness-checklist",
    name: "AI Readiness Checklist for Small Businesses",
    kind: "Checklist",
    summary:
      "25 questions that show where AI will pay off in your business, and where it won't.",
    description: [
      "The checklist I use to start an AI conversation with a business: 25 questions about your workflows, data, and team that show where AI is likely to pay off and where it isn't worth the effort.",
    ],
    details: ["25 questions", "PDF"],
    price: 0,
    file: "downloads/ai-readiness-checklist.pdf",
    bought: null,
    reviews: [],
  },
];
