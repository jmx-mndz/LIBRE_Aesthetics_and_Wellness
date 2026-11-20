# LIBRE Aesthetics & Wellness — Website v5 (English + Español)

Static multi-page site: plain HTML + one CSS file + one JS file. No build step. Upload the whole folder to any host, or paste each page into GHL custom code.

## Structure
```
index.html        Home
face.html         Face Transformation (collections, add-ons, results)
body.html         Body Transformation (collections, Endolift pricing, Gold Incision)
skin.html         Laser & Skin (Enlighten III, IPL, Skin Renewal, Tattoo — tabs)
wellness.html     Lifestyle Reset, IV & nutrition, supplements, memberships
menu.html         NEW — full à-la-carte service menu (4 tabs)
expertise.html    Dr. Thomas + team (bios open in a popup)
results.html      Before & after gallery (All / Face / Body filter, lightbox)
book.html         THE ONE INQUIRY FORM for every service
contact.html      Contact, hours, locations, mobile services
privacy.html      Privacy, SMS terms, medical disclaimer (template — have it reviewed)
css/styles.css    All styles
js/main.js        All behaviour + LIBRE_CONFIG settings
assets/img/       brand/ doctor/ team/ packages/
```

## Settings — top of `js/main.js`
```js
const LIBRE_CONFIG = {
  phone: "+18775367616",
  ghlFormId: "",      // Option A
  formWebhook: "",    // Option B
  calendarUrl: "",    // your new calendar link
  chatWidgetId: "697cd38c2f7d2122e2980847",
  shopUrl: "https://nbxwellness.com/store/libre-aesthetics/index",
  reviews: [],        // add real Google reviews here; empty = "Read Google Reviews" card
  googleReviewsUrl: "..."
};
```

## Connecting the single form (pick one)
Every "Book" button on the site goes to `book.html?service=<key>#inquiry`, and the service is pre-selected in the dropdown.

**Option A — native GHL form.** Build one form in GHL (First, Last, Phone, Email, Service dropdown, Location, Message, consent). Set its "On submit" action to redirect to the new calendar. Paste the form ID into `ghlFormId`. The site swaps in the GHL form automatically.

**Option B — keep this custom form (recommended for the design).** In GHL create a Workflow with an **Inbound Webhook** trigger, copy the URL into `formWebhook`, and put the calendar link into `calendarUrl`. On submit the form posts: `first_name, last_name, phone, email, service, location, contact_method, message, consent, marketing, marketing_consent, source, page_url`. Then it redirects to the calendar with name/email/phone pre-filled. In the workflow: Create/Update Contact → add tag from `service` → create the opportunity in the single pipeline → notify the coordinator.

If neither is set, the form validates and shows a "please call/text us" message, so nothing is lost while you finish GHL. The "Already know what you want? Open the Calendar" box on book.html stays hidden until `calendarUrl` is set. No calendar iframes are embedded anywhere.

## v5 changes
- **Spanish site** in `es/` — every page fully translated (text, buttons, form, alt text, page titles, reels, error messages). An **EN | ES** switch sits in the header (desktop + mobile) and in the mobile menu; it keeps the visitor on the same page. Visitors whose browser is set to Spanish see a small "¿Prefiere español?" suggestion (never forced).
- Upload the `es` folder together with the rest — links like `yoursite.com/es/face.html` work automatically.
- Form submissions include `language` = English / Spanish so the team can follow up in Spanish.
- **À la carte section** ("Prefer a single treatment?") under the packages on Home, Face, Body, Skin and Wellness: Botox®/neurotoxin, fillers, PDO threads, PRP/PEP, IV therapy, vitamin shots, facials, lash & brow, hormone pellets, peptides — each with **Book This** (pre-selects the service in the form) and **See Price** (opens the right tab on the Menu page and highlights it).
- **Services** menu item (dropdown: À la carte treatments · Full service menu & prices).
- Booking form step 1 now has "Signature transformations" cards + "À la carte treatments" options.
- Note: the GHL chat widget shows in whatever language it is set to inside GHL.
- If you edit text in an English page, make the same edit in the matching `es/` page (or ask Claude to rebuild both).

## v4 changes
- Original logo colors (`assets/img/brand/logo-original*.png`) on an ivory header; palette built from the logo: teal #5fa5b1 + sun sand #e4cbb7 over deep teal #0f3a40.
- Instagram / Facebook / YouTube icons in the header (desktop), beside the menu button (mobile) and inside the mobile menu.
- Booking form: beige card with deep-teal type and service cards.
- Results page: hero plays the "Before meets after" video; results-only reels; Google reviews marquee (also on Home). Edit reviews in `build/parts.py → REVIEWS` or directly in the HTML. Owner replies are not shown.
- "Learn from Dr. Thomas" (Expertise page) shows only videos of Dr. Thomas speaking.
- More FAQs on every page; 12 on Contact.

## Look & motion (v3)
- Deep teal #0f3a40 base with ivory/beige panels for contrast, champagne-gold accents.
- Coastal loader (sun rising over the waves, first visit only) and a short teal curtain between pages.
- Headings rise word-by-word, cards fade up in sequence, images open with a curtain, gold scroll-progress line, shimmer while photos load. Same system on every page.
- Booking form is now 2 steps: choose a service (tap cards) → details. Links like `book.html?service=body` skip straight to step 2.

## Animations (kept restrained)
- Short branded loader (~1 s), shown once per visit
- Headline line-reveal, soft fade-up on scroll, image "curtain" reveal
- Subtle parallax on arch portraits (desktop only)
- Hover-to-expand Face / Body / Wellness panels on the home page
- Simple hover lifts, image zoom and gold button fill
- All motion switches off for visitors with "reduce motion" enabled

## Reels carousel (every page)
13 LIBRE reels are included (`assets/video/reels/`, posters in `assets/img/reels/`), compressed to 540×960 for fast loading. The centre reel auto-plays muted (sound button on the card), moves on when it ends, and the last card links to Facebook ("Click to view more" → facebook.com/libreaestheticswellness). Visitors can use arrows, dots, swipe, or click a side card; clicking the centre reel pauses it.

Each page shows the reels that fit it (Face, Body, Skin, Wellness, "Dr. Thomas explains" on Expertise; all on Home and Results). Edit titles, order or categories in `js/main.js` → `LIBRE_CONFIG.reels`. To add a reel: drop `my-reel.mp4` into `assets/video/reels/` and `my-reel.webp` into `assets/img/reels/`, then add `{ id: "my-reel", tag: "…", title: "…", cats: ["face"] }`. Or upload to GHL Media and set `video: "https://…"`.

## Videos
- `assets/video/hero-coastal.mp4` (+ `-mobile`): header background on every page, darkened with an overlay so text stays readable.
- `assets/video/coastal-retreat.mp4`: background of the closing "Your transformation begins here" band.
Videos only load when on screen, and are skipped for visitors on data-saver / reduced-motion (poster image shows instead).

## Shop (NBX Wellness)
The store link is in the main nav (gold "Shop"), the mobile menu, the mobile bottom bar, the footer, a store band on Home, Wellness, Menu and Contact, and the Menu hero button. Change it once in `shopUrl`.

## Image notes
- Images hosted on GHL load through the GHL image CDN (auto WebP + resizing).
- Corrected: the abdomen before/after is labelled **Body · Abdominal Contouring** (it was labelled tear trough).
- Wellness hero now uses Dr. Thomas with a patient in the IV lounge (the gold-dress crop was removed).
- AI-generated beach/clinic videos and the AI "office" image are no longer used.
- Not used because the files are broken/won't render: 5 SVG before/after uploads (incl. the weight-loss one).
- Gold Incision® images are labelled **Representative**. Confirm with Dr. Thomas they may be used.

## To confirm with Dr. Thomas
- Phone: site uses (877) 536-7616; the printed menu shows 772-388-9155.
- Endolift (menu $1,800 / $2,000) and DioSculpt (menu $750 vs flyer $650) conflict with the newer collections. The site uses the collections.
- Chemical peel listed at $35 on the menu — verify.
- Neurotoxin: $12/unit on the menu vs $10/unit as a collection add-on (both shown in context).
- NAD+, EDTA, regenerative shots show "Ask us" (no price given).
- Membership tiers (Silver / Gold / VIP): add benefits and prices when ready.
