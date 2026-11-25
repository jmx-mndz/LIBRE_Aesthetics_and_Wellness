# LIBRE Aesthetics & Wellness — Website v18 (English + Español)

Static multi-page site for GitHub Pages: plain HTML, one CSS file and one JS file. No build step on GitHub. Live at https://jmx-mndz.github.io/LIBRE_Aesthetics_and_Wellness/ (domain: libreaestheticsandwellness.com).

## Structure
```
index.html             Home: five pillars, coastal band, escape tiles, reels, results, reviews, postcards
face.html              Face: Endolift, collections, fillers, threads, fat transfer
body.html              Body: Endolift body, Gold Incision, DioSculpt, RF, collections
skin.html              Skin Artistry programs (Clear, Brighten, Even, Refine, Restore, Renew), IPL, laser, tattoo
hair.html              Hair Restoration: PRP scalp video, 16-week Healthy Hair Program, pricing
wellness.html          Lifestyle Reset, GLP-1 & peptides, IV and vitamin therapy
endolift.html          Endolift by Dr. Thomas (per-area price list, mobile Endolift)
gluteal.html           Gold Incision & Gluteal Harmonization
tattoo-removal.html    Tattoo removal with Dr. Nichols (sizes, package of 6)
skincare.html          RegimenPro skincare
menu.html              Full service menu by pillar (Face, Body, Skin, Hair, Wellness)
expertise.html         Dr. Thomas and the team
results.html           Before & after gallery
book.html              The one inquiry form for every service
contact.html           Contact, hours, locations, postcards
financial-policy.html  Financial & Payment Policy and Prepaid Package Agreement
privacy.html           Privacy, SMS terms, medical disclaimer
es/                    The same 17 pages in Spanish (same file names)
css/styles.css         All styles
js/main.js             All behaviour + LIBRE_CONFIG settings
assets/img/            Images (brand, doctor, team, reels, beach posters)
assets/video/          Beach background videos, reels, PRP scalp video
assets/docs/           LIBRE-Service-Menu.pdf (downloadable menu)
```

## Settings — top of `js/main.js`
```js
const LIBRE_CONFIG = {
  phone: "+18775367616",
  ghlFormId: "",          // Option A: native GHL form ID
  formWebhook: "",        // Option B: GHL Inbound Webhook URL (website form → workflow W1)
  calendarUrl: "https://api.leadconnectorhq.com/widget/bookings/libre-consultation",
  chatWidgetId: "6b055c14f04219e8b659de35",   // Laura chat widget
  shopUrl: "https://nbxwellness.com/store/libre-aesthetics/index",
  ...
};
```
The booking form sends: first_name, last_name, phone, email, service, location, contact_method, message, consent, language, page_url. Every "Book" button opens `book.html?service=<key>#inquiry` with the service pre-selected.

## How to update
- Upload only the files that changed, into the same folders (English pages in the main folder, Spanish pages in `es/`).
- Upload new videos and images before the pages that use them.
- An English text change needs the same change in the matching `es/` page.
- Wait 1–2 minutes after committing, then hard refresh (Ctrl+F5).

## Beach videos (page header backgrounds)
| Video | Pages |
|---|---|
| hero-coastal | Home, Endolift |
| reef | Wellness, Results, Face |
| open-sea | Book, Skin, Financial Policy, Privacy |
| coastline | Contact, Expertise, Tattoo Removal |
| umbrella-coast | Body, Gluteal |
| palm-shore | Menu, Hair, Skincare |
| aerial-lagoon | Closing "Your transformation begins here" band (every page) |
| shoreline | Home "Confidence that feels like the beach" band |

Each has a `-mobile.mp4` version and a `.webp` poster. Videos only load when on screen and are skipped for data-saver / reduced-motion visitors.

## Look & motion
- Deep teal palette (#0b4450) with sand-gold accents, beach theme.
- Scroll: tide progress line, direction-aware reveals (up and down), slower-moving background videos, drifting shells and starfish, wave flourish under headings, slight lean with scroll speed.
- Ambient: tide waves into the footer, sun-on-water shimmer, rising sea-foam bubbles.
- Hover: water ripple on buttons, sunlight glint on cards, arch escape tiles, postcards.
- All motion turns off for visitors with "reduce motion" enabled.

## External images
The beach postcards and the six-women photo load from the GHL media library (images.leadconnectorhq.com) and Pexels (images.pexels.com). If one is removed there, it disappears from the site.

## To confirm with Dr. Thomas
- Endolift body: final menu says one area $2,500+, the Endolift page lists areas from $1,800.
- Tattoo removal size pricing and package of 6 (final menu said "by consultation").
- Pending items: series prices, six-month programs, membership ("coming soon").
- Regulatory review: body fillers, exosomes, PDRN and peptides before public distribution.
