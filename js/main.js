/* ==========================================================================
   LIBRE Aesthetics & Wellness — Site Scripts (v2)
   No dependencies. Edit LIBRE_CONFIG to connect the form and calendar.
   ========================================================================== */

const LIBRE_CONFIG = {
  phone: "+18775367616",

  /* ---- ONE INQUIRY FORM FOR ALL SERVICES ----------------------------------
     Option A (recommended, simplest): build ONE form in GHL (Sites > Forms),
       set its "On submit" action to redirect to your new calendar, then paste
       the form ID below. The site will show that GHL form inside the booking card.
     Option B: keep the custom-designed form on the site and paste a GHL
       "Inbound Webhook" URL (Automation > Workflow > trigger: Inbound Webhook).
       After a successful submit, visitors are sent to calendarUrl (if set). */
  ghlFormId: "",
  formWebhook: "",

  // Your NEW GHL calendar link (shown after the form, and as "book directly").
  // FREE calendar: free photo assessment + free Patient Care Coordinator call
  calendarUrl: "https://api.leadconnectorhq.com/widget/booking/bgJETxQPWBT1Sadpgt5j",

  // PAID calendar for the $75 consultation with Dr. Thomas (payment taken at booking).
  // PAID calendar: consultation with Dr. Thomas, $75 charged at booking (payment mode Live).
  doctorCalendarUrl: "https://api.leadconnectorhq.com/widget/booking/OXGJrwDU7IHIWrmbbTcq",

  // DreamSculpt Academy: paste the link between the quotes when it is ready.
  // The DreamSculpt buttons switch on automatically (until then they show "Link coming soon").
  dreamSculptUrl: "",

  // GHL chat widget (already live on the current site)
  chatWidgetId: "6b055c14f04219e8b659de35",

  // NBX Wellness supplement store
  shopUrl: "https://nbxwellness.com/store/libre-aesthetics/index",

  /* ---- REELS (3D auto-playing carousel) ----------------------------------
     Videos live in assets/video/reels/<id>.mp4 and posters in assets/img/reels/<id>.webp.
     To host a reel on GHL instead, paste its Media Storage link into "video".
     "cats" decides which pages show it: endolift, gluteal, tattoo, face, body, skin, wellness, doctor, queen (Endolift Queen page)
     (every reel also shows on the Home and Results pages).                  */
  reels: [
    { id: "endolift-customizable", tag: "Endolift® · Face", title: "Endolift® is customizable", cats: ["endolift", "face", "queen"] },
    { id: "before-meets-after", tag: "Endolift® · Real result", title: "Before meets after", cats: ["endolift", "face", "results", "queen"] },
    { id: "dr-thomas-approach", tag: "Dr. Thomas · Philosophy", title: "My approach: less is more", cats: ["doctor", "face", "queen"] },
    { id: "best-feeling", tag: "Body · Patient moment", title: "The best feeling", cats: ["body", "results"] },
    { id: "lightscan-eyes", tag: "Laser & Skin", title: "Lightscan eyes — tighten & brighten", cats: ["skin", "face"] },
    { id: "endolift-testimony", tag: "Client feedback", title: "“Big difference — I love it!”", cats: ["endolift", "face", "results", "queen"] },
    { id: "dr-thomas-endolift-laser", tag: "Dr. Thomas explains", title: "How Endolift® works", cats: ["endolift", "doctor", "face", "body", "queen"] },
    { id: "endolift-abdomen", tag: "Endolift® · Abdomen", title: "Before & after Endolift®", cats: ["endolift", "body", "results", "queen"] },
    { id: "hormonal-balance", tag: "Dr. Thomas explains", title: "Signs of hormonal imbalance", cats: ["wellness", "doctor"] },
    { id: "endolift-radiesse", tag: "Facial artistry", title: "Endolift® + Radiesse® balancing", cats: ["endolift", "face"] },
    { id: "dr-thomas-nutrition", tag: "Dr. Thomas · Wellness", title: "Nutrition is the basis of everything", cats: ["doctor", "wellness"] },
    { id: "lightscan-laser", tag: "Laser & Skin", title: "Why Lightscan laser?", cats: ["skin"] },
    { id: "client-testimonial", tag: "Client testimonial", title: "Why I chose Dr. Thomas", cats: ["body", "wellness", "results"] },
    { id: "dr-thomas-aging", tag: "Dr. Thomas · Longevity", title: "Why we age — and how to age well", cats: ["doctor", "wellness"] },
    { id: "lifestyle-consultation", tag: "Lifestyle medicine", title: "A patient’s wellness journey", cats: ["wellness", "results"] },
    { id: "dr-thomas-hormones-exercise", tag: "Dr. Thomas · Hormones", title: "Hormones, exercise & your body", cats: ["doctor", "wellness"] },
    { id: "endolift-body-qa", tag: "Endolift® · Body Q&A", title: "What is Endolift®?", cats: ["endolift", "body"] },
    { id: "dr-thomas-lasting-results", tag: "Dr. Thomas · Lifestyle", title: "How to keep your results", cats: ["doctor", "wellness"] },
    { id: "post-lipo-fibrosis", tag: "Body · Fibrosis care", title: "Treating post-lipo fibrosis", cats: ["body"] },
    { id: "gold-incision-gluteal", tag: "Gold Incision® · Gluteal", title: "Gold Incision® & Gluteal Harmonization", cats: ["gluteal", "body"] },
    { id: "dr-nichols-tattoo-removal", tag: "Dr. Nichols · Tattoo removal", title: "Have you ever had a tattoo you regret?", cats: ["tattoo", "skin"] },
    { id: "dr-thomas-gluteal-award", tag: "Dr. Thomas · Recognition", title: "Gluteal Harmonization 360° Masterclass", cats: ["gluteal", "doctor", "body", "queen"] }
  ],

  reelsVideoPath: "assets/video/reels/",
  reelsPosterPath: "assets/img/reels/",
  reelsMoreUrl: "https://www.facebook.com/libreaestheticswellness",

  // Paste REAL Google reviews only — empty shows the "Read Google Reviews" card.
  // Example: { text: "…", name: "Maria S.", treatment: "Endolift" }
  reviews: [],
  googleReviewsUrl: "https://www.google.com/search?q=Libre+Aesthetics+and+Wellness+Sebastian+FL+reviews"
};

(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection && navigator.connection.saveData;

  /* ---------- Language (EN / ES) ---------- */
  const LANG = (document.documentElement.lang || "en").slice(0, 2) === "es" ? "es" : "en";
  const ROOT = LANG === "es" ? "../" : "";
  const ES = {
    "Now playing": "Reproduciendo",
    "Turn sound on": "Activar sonido", "Turn sound off": "Silenciar",
    "More reels on Facebook": "Más videos en Facebook",
    "Treatments, results and tips from Dr. Thomas — new every week.": "Tratamientos, resultados y consejos de la Dra. Thomas — nuevos cada semana.",
    "Click to view more": "Haga clic para ver más",
    "Show reel ": "Ver video ",
    "Please choose a service to continue.": "Por favor elija un servicio para continuar.",
    "Please choose at least one service or treatment.": "Elija al menos un servicio o tratamiento.",
    "units": "unidades", "min": "min", "Remove": "Quitar", "Ask": "Consultar", "Price at consultation": "Precio en la consulta",
    "Fewer": "Menos", "More": "Más", "Added to your estimate": "Agregado a su estimado", "Removed from your estimate": "Quitado de su estimado",
    "/ month": "/ mes", "Train station": "Estación de tren",
    "Choose a time next. We’ll also text you a secure link to upload your photos.": "Luego elija un horario. También le enviaremos un enlace seguro para subir sus fotos.",
    "You’ll pick your time and pay the $75 online. It’s applied to your treatment.": "Elegirá su horario y pagará los $75 en línea. Se aplican a su tratamiento.", "item": "artículo", "items": "artículos", "Estimate": "Estimado",
    "Please enter your first name.": "Por favor escriba su nombre.",
    "Please enter your last name.": "Por favor escriba su apellido.",
    "Please enter a valid phone number.": "Por favor escriba un número de teléfono válido.",
    "Please enter a valid email.": "Por favor escriba un correo electrónico válido.",
    "Please complete the highlighted fields.": "Por favor complete los campos señalados.",
    "Sending…": "Enviando…",
    "We’ll text you a secure link to upload your photos.": "Le enviaremos por texto un enlace seguro para subir sus fotos.",
    "Meet in person, by phone or virtually. No cost.": "En persona, por teléfono o virtual. Sin costo.",
    "The $75 fee is applied to your treatment.": "La tarifa de $75 se aplica a su tratamiento.",
    "Our online form is being connected. Please call or text ": "Nuestro formulario en línea se está conectando. Por favor llame o escriba al ",
    " and our team will book you right away.": " y nuestro equipo le dará una cita de inmediato.",
    "Something went wrong. Please call or text ": "Algo salió mal. Por favor llame o escriba al ",
    "Prefer Spanish?": "¿Prefiere inglés?",
    // reel tags & titles
    "Dr. Nichols · Tattoo removal": "Dr. Nichols · Eliminación de tatuajes", "Have you ever had a tattoo you regret?": "¿Alguna vez se arrepintió de un tatuaje?",
    "Gold Incision® · Gluteal": "Gold Incision® · Glúteos", "Gold Incision® & Gluteal Harmonization": "Gold Incision® y Armonización Glútea",
    "Dr. Thomas · Recognition": "Dra. Thomas · Reconocimiento", "Gluteal Harmonization 360° Masterclass": "Masterclass de Armonización Glútea 360°",
    "Endolift® · Face": "Endolift® · Rostro", "Endolift® is customizable": "Endolift® se adapta a usted",
    "Endolift® · Real result": "Endolift® · Resultado real", "Before meets after": "El antes y el después",
    "Dr. Thomas · Philosophy": "Dra. Thomas · Filosofía", "My approach: less is more": "Mi enfoque: menos es más",
    "Body · Patient moment": "Cuerpo · Momento del paciente", "The best feeling": "La mejor sensación",
    "Laser & Skin": "Láser y piel", "Lightscan eyes — tighten & brighten": "Lightscan para ojos — reafirma e ilumina",
    "Client feedback": "Opinión de clienta", "“Big difference — I love it!”": "“¡Gran diferencia — me encanta!”",
    "Dr. Thomas explains": "La Dra. Thomas explica", "How Endolift® works": "Cómo funciona Endolift®",
    "Endolift® · Abdomen": "Endolift® · Abdomen", "Before & after Endolift®": "Antes y después de Endolift®",
    "Signs of hormonal imbalance": "Señales de desequilibrio hormonal",
    "Facial artistry": "Arte facial", "Endolift® + Radiesse® balancing": "Armonización con Endolift® + Radiesse®",
    "Dr. Thomas · Wellness": "Dra. Thomas · Bienestar", "Nutrition is the basis of everything": "La nutrición es la base de todo",
    "Why Lightscan laser?": "¿Por qué el láser Lightscan?",
    "Client testimonial": "Testimonio de clienta", "Why I chose Dr. Thomas": "Por qué elegí a la Dra. Thomas",
    "Dr. Thomas · Longevity": "Dra. Thomas · Longevidad", "Why we age — and how to age well": "Por qué envejecemos — y cómo envejecer bien",
    "Lifestyle medicine": "Medicina del estilo de vida", "A patient’s wellness journey": "El camino de bienestar de una paciente",
    "Dr. Thomas · Hormones": "Dra. Thomas · Hormonas", "Hormones, exercise & your body": "Hormonas, ejercicio y su cuerpo",
    "Endolift® · Body Q&A": "Endolift® · Preguntas sobre el cuerpo", "What is Endolift®?": "¿Qué es Endolift®?",
    "Dr. Thomas · Lifestyle": "Dra. Thomas · Estilo de vida", "How to keep your results": "Cómo mantener sus resultados",
    "Body · Fibrosis care": "Cuerpo · Tratamiento de fibrosis", "Treating post-lipo fibrosis": "Tratamiento de la fibrosis post-lipo"
  };
  const t = (str) => (LANG === "es" && ES[str]) || str;
  const withRoot = (u) => (u && !/^(https?:)?\/\//.test(u) && !u.startsWith("/") ? ROOT + u : u);

  // EN | ES switch: keep the same page (and section) in the other language
  (() => {
    const file = (location.pathname.split("/").pop() || "index.html").replace(/^$/, "index.html");
    const enHref = (LANG === "es" ? "../" : "") + file + location.search + location.hash;
    const esHref = (LANG === "es" ? "" : "es/") + file + location.search + location.hash;
    $$(".lang-switch a").forEach((a) => {
      const isEs = a.dataset.lang === "es";
      a.href = isEs ? esHref : enHref;
      if ((isEs && LANG === "es") || (!isEs && LANG === "en")) a.setAttribute("aria-current", "true");
      a.addEventListener("click", () => { try { localStorage.setItem("libre-lang", a.dataset.lang); } catch (e) {} });
    });
    // gentle suggestion for Spanish-speaking browsers (never forced)
    let pref = null; try { pref = localStorage.getItem("libre-lang"); } catch (e) {}
    const browserEs = (navigator.languages || [navigator.language || ""]).some((l) => /^es\b/i.test(l));
    if (LANG === "en" && browserEs && !pref) {
      const tip = document.createElement("div");
      tip.className = "lang-tip"; tip.setAttribute("lang", "es");
      tip.innerHTML = `<span>¿Prefiere español?</span><a class="btn btn--sm" href="${esHref}">Ver en español</a><button type="button" aria-label="Cerrar">×</button>`;
      document.body.appendChild(tip);
      requestAnimationFrame(() => setTimeout(() => tip.classList.add("show"), 2600));
      $("button", tip).addEventListener("click", () => { tip.remove(); try { localStorage.setItem("libre-lang", "en"); } catch (e) {} });
      $("a", tip).addEventListener("click", () => { try { localStorage.setItem("libre-lang", "es"); } catch (e) {} });
    }
  })();

  /* ---------- Adaptive header: never let menu items overlap ---------- */
  (() => {
    const hdr = $(".site-header");
    if (!hdr) return;
    const nav = $(".nav", hdr), list = $(".nav__list", hdr), actions = $(".header-actions", hdr), box = $(".container", hdr);
    const overflowing = () => {
      if (!nav || getComputedStyle(nav).display === "none") return false;
      const gap = 16;
      const items = list.children, last = items[items.length - 1];
      const used = last ? last.getBoundingClientRect().right - list.getBoundingClientRect().left : 0;
      return used > nav.clientWidth + 1 || nav.getBoundingClientRect().right > actions.getBoundingClientRect().left - gap;
    };
    const fit = () => {
      hdr.classList.remove("h-compact", "h-collapsed");
      if (overflowing()) {
        hdr.classList.add("h-compact");
        if (overflowing()) { hdr.classList.remove("h-compact"); hdr.classList.add("h-compact", "h-collapsed"); }
      }
      hdr.classList.add("h-measured");
    };
    fit();
    let rid; window.addEventListener("resize", () => { cancelAnimationFrame(rid); rid = requestAnimationFrame(fit); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    window.addEventListener("load", fit);
  })();

  /* ---------- Loading: coastal preloader (first visit) + page curtain ---------- */
  const pre = $(".preloader");
  const curtain = $(".curtain");
  const ready = () => document.body.classList.add("is-ready");
  let seen = false;
  try { seen = sessionStorage.getItem("libre-intro") === "1"; } catch (e) {}
  if (reduceMotion) {
    if (pre) pre.classList.add("is-skip");
    if (curtain) curtain.classList.add("is-off");
    requestAnimationFrame(ready);
  } else if (pre && !seen) {
    if (curtain) curtain.classList.add("is-off");
    const start = performance.now();
    const finish = () => {
      if (pre.classList.contains("is-done")) return;
      pre.classList.add("is-done");
      setTimeout(ready, 380);
      setTimeout(() => pre.classList.add("is-skip"), 1300);
      try { sessionStorage.setItem("libre-intro", "1"); } catch (e) {}
    };
    const done = () => setTimeout(finish, Math.max(0, 1900 - (performance.now() - start)));
    if (document.readyState === "complete") done(); else window.addEventListener("load", done);
    setTimeout(finish, 3200); // safety net — never block the page
  } else {
    if (pre) pre.classList.add("is-skip");
    if (curtain) {
      requestAnimationFrame(() => {
        curtain.classList.add("is-up");
        setTimeout(ready, 260);
        setTimeout(() => curtain.classList.add("is-off"), 950);
      });
    } else requestAnimationFrame(ready);
  }
  // Smooth page-to-page transition
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || !curtain || reduceMotion || e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || a.target === "_blank" || a.hasAttribute("download")) return;
    const raw = a.getAttribute("href");
    if (!raw || raw.startsWith("#") || /^(tel|sms|mailto|javascript):/i.test(raw)) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !/(\.html|\/)$/.test(url.pathname)) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    e.preventDefault();
    curtain.className = "curtain is-enter";
    void curtain.offsetWidth;
    curtain.className = "curtain is-down";
    setTimeout(() => { location.href = url.href; }, 560);
  });
  window.addEventListener("pageshow", (e) => { if (e.persisted && curtain) curtain.className = "curtain is-up is-off"; });

  /* ---------- Shop links ---------- */
  $$("[data-shop]").forEach((a) => { a.href = LIBRE_CONFIG.shopUrl; a.target = "_blank"; a.rel = "noopener"; });

  /* ---------- Header / mobile bar / back to top ---------- */
  const header = $(".site-header");
  const mobileBar = $(".mobile-bar");
  const toTop = $(".back-to-top");
  const progress = $(".progress span");
  let lastY = window.scrollY;
  const topbar = $(".topbar");
  const onScroll = () => {
    const y = window.scrollY;
    if (header && topbar) header.style.top = Math.max(0, topbar.offsetHeight - y) + "px";
    if (header) {
      header.classList.toggle("is-solid", y > 30);
      const menuOpen = document.body.classList.contains("menu-open");
      header.classList.toggle("is-hidden", !menuOpen && y > lastY + 2 && y > 700);
      if (y < lastY - 2) header.classList.remove("is-hidden");
    }
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    }
    if (mobileBar) mobileBar.classList.toggle("show", y > 380);
    if (toTop) toTop.classList.toggle("show", y > 900);
    lastY = y;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  /* ---------- Mobile menu ---------- */
  const toggle = $(".menu-toggle");
  const menu = $(".mobile-menu");
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    if (toggle) { toggle.setAttribute("aria-expanded", String(open)); toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu"); }
    if (menu) menu.setAttribute("aria-hidden", String(!open));
  };
  if (toggle) toggle.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  $$(".mobile-menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  $$(".sub-toggle").forEach((btn) => btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(open));
    btn.nextElementSibling.classList.toggle("open", open);
  }));
  window.addEventListener("resize", () => { if (window.innerWidth >= 1140) setMenu(false); });

  /* ---------- Consistent motion: auto-reveal cards (staggered) ---------- */
  if (!reduceMotion) {
    const cardSel = ".alc-card, .feature-card, .tier, .pillar6, .team-card, .result-card, .menu-block, .info-card, .location-card, .addon, .timeline li, .accordion__item, .trust-bar__item, .financing, .shop-band, .price-table, .frame, .notice";
    const groups = new Map();
    $$(cardSel).forEach((el) => {
      if (el.closest(".reveal, .reveal-img, .tabs__panel[hidden], .form-card, .modal, .lightbox")) return;
      const parent = el.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    });
    groups.forEach((els) => els.forEach((el, i) => {
      el.classList.add(el.classList.contains("frame") ? "reveal-img" : "reveal");
      el.style.setProperty("--d", (Math.min(i, 6) * 0.08).toFixed(2) + "s");
    }));
  }

  /* ---------- Split-word heading reveal ---------- */
  const splitTargets = $$("[data-split], .section-head h2, .split h2, .shop-band h2, .form-card legend h2");
  if (!reduceMotion) {
    splitTargets.forEach((el) => {
      if (el.classList.contains("is-split")) return;
      let idx = 0;
      const walk = (node) => {
        Array.from(node.childNodes).forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
              const o = document.createElement("span"); o.className = "sw";
              const i = document.createElement("span"); i.textContent = part; i.style.setProperty("--i", idx++);
              o.appendChild(i); frag.appendChild(o);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
        });
      };
      walk(el);
      el.classList.add("is-split");
    });
    if ("IntersectionObserver" in window) {
      const sio = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("split-in"); sio.unobserve(en.target); }
      }), { rootMargin: "0px 0px -6% 0px", threshold: 0.1 });
      splitTargets.forEach((el) => sio.observe(el));
    } else splitTargets.forEach((el) => el.classList.add("split-in"));
  }

  /* ---------- Media loading shimmer ---------- */
  $$(".frame img, .arch img, .result-card__img img, .team-card__img img, .panel__img img").forEach((im) => {
    if (im.complete && im.naturalWidth) return;
    const box = im.parentElement;
    box.classList.add("is-loading", "media-fade");
    const done = () => box.classList.remove("is-loading");
    im.addEventListener("load", done, { once: true });
    im.addEventListener("error", done, { once: true });
  });

  /* ---------- Reveal on scroll (text + image curtain) ---------- */
  const reveals = $$(".reveal, .reveal-img");
  if ("IntersectionObserver" in window && !reduceMotion) {
    // clipped images are watched through their parent (a fully clipped box never "intersects")
    const targets = new Map();
    reveals.forEach((el) => {
      const watch = el.classList.contains("reveal-img") ? el.parentElement : el;
      if (!targets.has(watch)) targets.set(watch, []);
      targets.get(watch).push(el);
    });
    // Text and cards float in from below when scrolling down, and drift down from above when scrolling up.
    // Image curtains open once; plain .reveal blocks replay in the direction you scroll.
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const els = targets.get(en.target) || [];
        if (en.isIntersecting) { els.forEach((el) => el.classList.add("in")); return; }
        const above = en.boundingClientRect.top < 0;
        els.forEach((el) => {
          if (!el.classList.contains("reveal") || el.closest("form, .tabs__panel, .modal, .lightbox, .site-header")) return;
          if (en.boundingClientRect.bottom < -40 || en.boundingClientRect.top > innerHeight + 40) {
            el.dataset.from = above ? "top" : "bottom";
            el.classList.remove("in");
          }
        });
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    targets.forEach((_, w) => io.observe(w));
  } else reveals.forEach((el) => el.classList.add("in"));

  /* ---------- Subtle parallax ---------- */
  const px = $$("[data-parallax]");
  if (px.length && !reduceMotion && window.matchMedia("(min-width: 768px)").matches) {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      px.forEach((el) => {
        const r = (el.closest("section") || el.parentElement).getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const speed = parseFloat(el.dataset.parallax) || 0.08;
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  }

  /* ---------- Lazy background videos ---------- */
  $$("video[data-hero-video]").forEach((v) => {
    if (reduceMotion || saveData) return; // poster image stays
    v.src = window.matchMedia("(max-width: 900px)").matches ? v.dataset.srcMobile : v.dataset.src;
    v.muted = true;
    const play = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    play();
    if ("IntersectionObserver" in window) new IntersectionObserver(([en]) => { if (en.isIntersecting) play(); else v.pause(); }).observe(v);
  });
  $$("video[data-src]:not([data-hero-video])").forEach((v) => {
    if (reduceMotion || saveData) return;
    const load = () => { v.src = (v.dataset.srcMobile && window.matchMedia("(max-width: 900px)").matches) ? v.dataset.srcMobile : v.dataset.src; v.muted = true; const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((en) => en.forEach((e) => {
        if (e.isIntersecting) { if (!v.src) load(); else v.play().catch(() => {}); } else if (v.src) v.pause();
      }), { threshold: 0.1 }).observe(v);
    } else load();
  });

  /* ---------- Booking page: back to where the visitor came from ---------- */
  $$("[data-back-link]").forEach((a) => {
    try {
      const ref = document.referrer ? new URL(document.referrer) : null;
      if (ref && ref.origin === location.origin && !/book\.html$/.test(ref.pathname)) {
        a.href = ref.href;
        const name = ref.pathname.split("/").pop().replace(".html", "") || "index";
        const map = { index: ["Back to Home", "Volver al inicio"], face: ["Back to Face", "Volver a Rostro"], body: ["Back to Body", "Volver a Cuerpo"], skin: ["Back to Skin", "Volver a Piel"], hair: ["Back to Hair", "Volver a Cabello"], wellness: ["Back to Wellness", "Volver a Bienestar"], endolift: ["Back to Endolift®", "Volver a Endolift®"], memberships: ["Back to Memberships", "Volver a Membresías"], menu: ["Back to the Menu", "Volver al menú"] };
        const lbl = $("[data-back-label]", a);
        if (lbl && map[name]) lbl.textContent = map[name][LANG === "es" ? 1 : 0];
      } else {
        a.addEventListener("click", (e) => { if (history.length > 1) { e.preventDefault(); history.back(); } });
      }
    } catch (e) { /* keep default link */ }
  });

  /* ---------- PRP film chapters ([data-seek]) ---------- */
  $$(".prp-film").forEach((sec) => {
    const v = $("video", sec); if (!v) return;
    const btns = $$("[data-seek]", sec);
    btns.forEach((b) => b.addEventListener("click", () => {
      v.currentTime = +b.dataset.seek; const p = v.play(); if (p && p.catch) p.catch(() => {});
      v.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    }));
    v.addEventListener("timeupdate", () => {
      let cur = 0; btns.forEach((b, i) => { if (v.currentTime >= +b.dataset.seek) cur = i; });
      btns.forEach((b, i) => b.classList.toggle("is-on", i === cur && !v.paused));
    });
  });

  /* ---------- Coastal scroll effects ---------- */
  (() => {
    if (reduceMotion) return;
    const root = document.documentElement;
    // 1. tide progress line at the top of the page
    const bar = document.createElement("div");
    bar.className = "tide-progress"; bar.setAttribute("aria-hidden", "true");
    bar.innerHTML = '<span class="tide-progress__fill"></span><span class="tide-progress__crest"></span>';
    document.body.appendChild(bar);
    // 2. drifting shells and starfish in the deep sections
    const ORN = {
      shell: '<path d="M32 8c-13 0-24 10-24 24 0 8 4 14 8 18h32c4-4 8-10 8-18C56 18 45 8 32 8z"/><path d="M32 50V10M22 50l-6-34M42 50l6-34M27 50l-3-38M37 50l3-38"/>',
      star: '<path d="M32 6l6 18h18l-14 11 5 19-15-11-15 11 5-19L8 24h18z"/>',
      dollar: '<circle cx="32" cy="32" r="24"/><path d="M32 14v14M32 36v14M18 26l10 5M46 26l-10 5M22 46l8-8M42 46l-8-8"/>',
      wave: '<path d="M4 36c8-10 16-10 24 0s16 10 24 0 8-6 8-6"/><path d="M4 46c8-10 16-10 24 0s16 10 24 0"/>'
    };
    const kinds = Object.keys(ORN);
    $$(".bg-deep:not(.reviews-section), .coast, .escape-sec, .postcards").forEach((sec, i) => {
      const n = innerWidth < 700 ? 1 : 2;
      for (let k = 0; k < n; k++) {
        const o = document.createElement("span");
        o.className = "sea-orn"; o.setAttribute("aria-hidden", "true");
        const kind = kinds[(i + k) % kinds.length];
        o.innerHTML = `<svg viewBox="0 0 64 64">${ORN[kind]}</svg>`;
        o.style.cssText = `${k ? "right" : "left"}:${4 + ((i * 7 + k * 13) % 10)}%;top:${12 + ((i * 17 + k * 29) % 60)}%;--size:${46 + ((i + k) % 3) * 18}px`;
        o.dataset.depth = (k ? -0.12 : 0.18).toString();
        sec.appendChild(o);
      }
    });
    // 3. wave flourish under section headings (draws itself in)
    $$(".section-head h2").forEach((h) => {
      if (h.nextElementSibling && h.nextElementSibling.classList.contains("wave-flourish")) return;
      const w = document.createElement("span");
      w.className = "wave-flourish"; w.setAttribute("aria-hidden", "true");
      w.innerHTML = '<svg viewBox="0 0 120 12"><path d="M2 6c10-8 18-8 28 0s18 8 28 0 18-8 28 0 18 8 28 0"/></svg>';
      h.after(w);
    });
    // 4. depth layers: background videos drift slower than the page
    const depthEls = [
      ...$$(".coast__media video, .cta-band__media video, .page-hero__media video").map((el) => (el.dataset.depth = "0.12", el)),
      ...$$(".escape video").map((el) => (el.dataset.depth = "0.08", el)),
      ...$$(".sea-orn")
    ];
    const skewEls = $$(".escape-grid, .postcards__track, .alc-grid, .panels--5");
    let lastY = scrollY, vel = 0, ticking = false;
    const frame = () => {
      ticking = false;
      const y = scrollY, h = root.scrollHeight - innerHeight;
      const p = h > 0 ? Math.min(1, y / h) : 0;
      root.style.setProperty("--scroll-p", p.toFixed(4));
      vel += ((y - lastY) - vel) * 0.18; lastY = y;
      const skew = Math.max(-2.2, Math.min(2.2, vel * 0.06));
      root.style.setProperty("--scroll-skew", skew.toFixed(3) + "deg");
      root.classList.toggle("scrolling-up", vel < -0.5);
      const vh = innerHeight;
      depthEls.forEach((el) => {
        const r = (el.closest("section") || el.parentElement).getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const off = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.depth);
        el.style.setProperty("--depth-y", off.toFixed(1) + "px");
      });
      if (Math.abs(vel) > 0.2) { ticking = true; requestAnimationFrame(frame); }
    };
    const kick = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", kick);
    skewEls.forEach((el) => el.classList.add("skew-on-scroll"));
    kick();
  })();

  /* ---------- Endolift Queen page: typewriter answer + timeline progress ---------- */
  $$("[data-typewrite]").forEach((el) => {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    const full = el.innerHTML;
    const plain = el.textContent.replace(/\s+/g, " ").trim();
    el.style.minHeight = el.offsetHeight + "px";
    el.innerHTML = "";
    el.classList.add("is-typing");
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      let i = 0;
      const tick = () => {
        i += 2;
        el.textContent = plain.slice(0, i);
        if (i < plain.length) setTimeout(tick, 18);
        else { el.innerHTML = full; el.classList.remove("is-typing"); el.style.minHeight = ""; }
      };
      setTimeout(tick, 500);
    }), { threshold: 0.5 });
    io.observe(el);
  });
  $$("[data-q-timeline]").forEach((tl) => {
    const upd = () => {
      const r = tl.getBoundingClientRect(), vh = innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.7 - r.top) / r.height));
      tl.style.setProperty("--q-p", p.toFixed(3));
      $$(".q-step", tl).forEach((s) => s.classList.toggle("is-lit", s.getBoundingClientRect().top < vh * 0.7));
    };
    addEventListener("scroll", upd, { passive: true }); addEventListener("resize", upd); upd();
  });

  /* ---------- Count-up numbers ([data-count]) ---------- */
  const counters = $$("[data-count]");
  if (counters.length && "IntersectionObserver" in window && !reduceMotion) {
    const cio = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target, end = parseFloat(el.dataset.count) || 0, t0 = performance.now(), dur = 1400 + Math.min(end, 1500) * 0.4;
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(end * e);
        if (k < 1) requestAnimationFrame(step);
      };
      el.textContent = "0"; requestAnimationFrame(step); cio.unobserve(el);
    }), { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  }

  /* ---------- Scroll-scrubbed explainer ([data-scrub]) ---------- */
  $$("[data-scrub]").forEach((sec) => {
    const steps = $$(".scrub-steps li", sec);
    const clamp = (v) => Math.max(0, Math.min(1, v));
    if (reduceMotion) { sec.classList.add("is-static"); sec.style.setProperty("--a", 1); sec.style.setProperty("--b", 1); sec.style.setProperty("--c", 1); steps.forEach((s) => s.classList.add("is-active")); return; }
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = sec.getBoundingClientRect(), total = r.height - window.innerHeight;
      const p = total > 0 ? clamp(-r.top / total) : 1;
      const a = clamp(p / 0.3), b = clamp((p - 0.3) / 0.3), c = clamp((p - 0.6) / 0.32);
      sec.style.setProperty("--p", p.toFixed(3));
      sec.style.setProperty("--a", a.toFixed(3));
      sec.style.setProperty("--b", b.toFixed(3));
      sec.style.setProperty("--c", c.toFixed(3));
      const idx = p < 0.3 ? 0 : p < 0.6 ? 1 : 2;
      steps.forEach((s, i) => { s.classList.toggle("is-active", i === idx); s.classList.toggle("is-done", i < idx); });
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  /* ---------- Tabs ---------- */
  $$("[data-tabs]").forEach((wrap) => {
    const btns = $$(".tabs__btn", wrap);
    const panels = $$(".tabs__panel", wrap);
    const activate = (i) => {
      btns.forEach((b, j) => { b.setAttribute("aria-selected", String(i === j)); b.tabIndex = i === j ? 0 : -1; });
      panels.forEach((p, j) => (p.hidden = i !== j));
    };
    btns.forEach((b, i) => {
      b.addEventListener("click", () => activate(i));
      b.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") { const n = (i + 1) % btns.length; activate(n); btns[n].focus(); }
        if (e.key === "ArrowLeft") { const n = (i - 1 + btns.length) % btns.length; activate(n); btns[n].focus(); }
      });
    });
    const hash = decodeURIComponent(location.hash.replace("#", ""));
    const target = hash ? document.getElementById(hash) : null;
    let idx = panels.findIndex((p) => p.id === hash || (target && p.contains(target)));
    activate(idx >= 0 ? idx : 0);
    if (idx >= 0) setTimeout(() => {
      const el = target && !panels.includes(target) ? target : wrap;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: reduceMotion ? "auto" : "smooth" });
      if (target && target.classList.contains("menu-block")) { target.classList.add("is-flash"); setTimeout(() => target.classList.remove("is-flash"), 2200); }
    }, 500);
  });

  /* ---------- Accordion ---------- */
  $$(".accordion__btn").forEach((btn) => btn.addEventListener("click", () => {
    const item = btn.closest(".accordion__item");
    const open = !item.classList.contains("open");
    item.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
  }));

  /* ---------- Gallery filter ---------- */
  $$("[data-filter-group]").forEach((group) => {
    const target = $(group.dataset.filterGroup);
    $$(".filter-btn", group).forEach((btn) => btn.addEventListener("click", () => {
      $$(".filter-btn", group).forEach((b) => { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
      btn.classList.add("active"); btn.setAttribute("aria-pressed", "true");
      const f = btn.dataset.filter;
      $$(".result-card", target).forEach((c) => (c.hidden = f !== "all" && c.dataset.cat !== f));
    }));
  });

  /* ---------- Lightbox ---------- */
  const lb = $(".lightbox");
  let lbItems = [], lbIndex = 0;
  const showLb = (i) => {
    lbIndex = (i + lbItems.length) % lbItems.length;
    const el = lbItems[lbIndex], img = el.querySelector("img");
    $("img", lb).src = el.dataset.full || img.currentSrc || img.src;
    $("img", lb).alt = img.alt;
    $(".lightbox__caption", lb).textContent = el.dataset.caption || img.alt || "";
  };
  const closeLightbox = () => { if (lb && lb.classList.contains("open")) { lb.classList.remove("open"); document.body.style.overflow = ""; } };
  $$("[data-lightbox]").forEach((el) => {
    el.tabIndex = 0; el.setAttribute("role", "button");
    const open = () => {
      lbItems = $$(`[data-lightbox="${el.dataset.lightbox}"]`).filter((x) => !x.hidden);
      showLb(lbItems.indexOf(el)); lb.classList.add("open"); document.body.style.overflow = "hidden";
    };
    el.addEventListener("click", open);
    el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
  if (lb) {
    $(".lightbox__close", lb).addEventListener("click", closeLightbox);
    $(".lightbox__prev", lb).addEventListener("click", (e) => { e.stopPropagation(); showLb(lbIndex - 1); });
    $(".lightbox__next", lb).addEventListener("click", (e) => { e.stopPropagation(); showLb(lbIndex + 1); });
    lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  }

  /* ---------- Carousel ---------- */
  $$(".carousel").forEach((c) => {
    const track = $(".carousel__track", c);
    const step = () => (track.firstElementChild ? track.firstElementChild.getBoundingClientRect().width + 22 : 320);
    const prev = $("[data-dir='prev']", c), next = $("[data-dir='next']", c);
    if (prev) prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    if (next) next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  });

  /* ---------- Team bio modal ---------- */
  const modal = $(".modal");
  const closeModal = () => { if (modal && modal.classList.contains("open")) { modal.classList.remove("open"); document.body.style.overflow = ""; } };
  $$("[data-bio]").forEach((btn) => btn.addEventListener("click", () => {
    const card = btn.closest(".team-card");
    $(".modal__img img", modal).src = $("img", card).src;
    $(".modal__img img", modal).alt = $("h3", card).textContent;
    $(".modal__name", modal).textContent = $("h3", card).textContent;
    $(".modal__role", modal).textContent = $(".role", card).textContent;
    $(".modal__bio", modal).innerHTML = $("template", card).innerHTML;
    modal.classList.add("open"); document.body.style.overflow = "hidden";
    $(".modal__close", modal).focus();
  }));
  if (modal) {
    $(".modal__close", modal).addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { setMenu(false); closeLightbox(); closeModal(); }
    if (lb && lb.classList.contains("open")) { if (e.key === "ArrowRight") showLb(lbIndex + 1); if (e.key === "ArrowLeft") showLb(lbIndex - 1); }
  });

  /* ---------- Estimate builder (Menu & Prices + booking form) ---------- */
  const EST_KEY = "libre-estimate";
  let memEst = {};
  const Est = {
    get() { try { const v = JSON.parse(localStorage.getItem(EST_KEY) || "{}"); return v && typeof v === "object" ? v : {}; } catch (e) { return { ...memEst }; } },
    set(o) { memEst = o; try { localStorage.setItem(EST_KEY, JSON.stringify(o)); } catch (e) {} renderEst(); },
    toggle(id, on) { const o = Est.get(); const el = itemEl(id); if (on === undefined) on = !(id in o); if (on) o[id] = o[id] || (el ? +el.dataset.qty || 1 : 1); else delete o[id]; Est.set(o); return on; },
    qty(id, d) { const o = Est.get(); if (!(id in o)) return; const el = itemEl(id); const step = el && el.dataset.unit === "units" ? 5 : el && el.dataset.unit === "min" ? 15 : 1; o[id] = Math.max(step, (o[id] || 1) + d * step); Est.set(o); }
  };
  const itemEl = (id) => document.querySelector(`.menu-item[data-id="${id}"], .pick[data-id="${id}"]`);
  const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const escH = (x) => String(x).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const estSummary = () => {
    const o = Est.get(); let total = 0, monthly = 0, from = false; const lines = [];
    Object.keys(o).forEach((id) => {
      const el = itemEl(id); if (!el) return;
      const name = ($(".menu-item__name", el) || el).textContent.trim();
      const price = el.dataset.price ? +el.dataset.price : null, q = o[id], kind = el.dataset.kind, unit = el.dataset.unit || "";
      let line = null;
      if (price !== null && kind === "monthly") { monthly += price * q; line = price * q; }
      else if (price !== null) { total += price * q; line = price * q; }
      if (el.dataset.from) from = true;
      lines.push({ id, name, q, unit, kind, line, price });
    });
    return { lines, total, monthly, from, count: lines.length };
  };
  function renderEst() {
    const S = estSummary(), sel = Est.get();
    $$("[data-est]").forEach((root) => {
      const list = $("[data-est-list]", root);
      list.innerHTML = S.lines.map((l) => {
        const qtyCtl = (l.unit || l.kind === "once") ? `<span class="est__qty"><button type="button" data-q="-1" aria-label="${t("Fewer")}">−</button><b>${l.q}${l.unit ? " " + t(l.unit) : "×"}</b><button type="button" data-q="1" aria-label="${t("More")}">+</button></span>` : "";
        const val = l.line === null ? `<em>${t("Ask")}</em>` : money(l.line) + (l.kind === "monthly" ? `<small> ${t("/ month")}</small>` : "");
        return `<li data-id="${l.id}"><div class="est__item"><span>${escH(l.name)}</span>${qtyCtl}</div><strong>${val}</strong><button type="button" class="est__rm" data-rm aria-label="${t("Remove")}">×</button></li>`;
      }).join("");
      const has = S.count > 0;
      $("[data-est-empty]", root).hidden = has;
      $("[data-est-totals]", root).hidden = !has;
      const clr = $("[data-est-clear]", root); if (clr) clr.hidden = !has;
      $$("[data-est-total]", root).forEach((e) => (e.textContent = money(S.total) + (S.from ? "+" : "")));
      $$("[data-est-count]", root).forEach((e) => (e.textContent = S.count));
      const mr = $("[data-est-monthly-row]", root); if (mr) { mr.hidden = !S.monthly; $("[data-est-monthly]", root).textContent = money(S.monthly) + " " + t("/ month"); }
      const fin = $("[data-est-fin]", root); if (fin) { fin.hidden = S.total < 300; $("[data-est-six]", root).textContent = money(S.total / 6); }
      if (!root.classList.contains("est--inline")) { root.hidden = !has; if (!has) setSheet(root, false); }
    });
    $$(".menu-item[data-id]").forEach((el) => { const on = el.dataset.id in sel; el.classList.toggle("is-added", on); const b = $("[data-add]", el); if (b) b.setAttribute("aria-pressed", String(on)); });
    $$(".pick[data-id]").forEach((el) => { const on = el.dataset.id in sel; el.classList.toggle("is-added", on); $("input", el).checked = on; });
    document.dispatchEvent(new CustomEvent("libre:estimate", { detail: S }));
  }
  const setSheet = (root, open) => { root.classList.toggle("is-open", open); const tg = $("[data-est-toggle]", root); if (tg) tg.setAttribute("aria-expanded", String(open)); document.body.classList.toggle("est-open", open && !root.classList.contains("est--inline")); };
  $$("[data-est]").forEach((root) => {
    root.addEventListener("click", (e) => {
      const li = e.target.closest("li[data-id]");
      if (e.target.closest("[data-rm]") && li) { Est.toggle(li.dataset.id, false); return; }
      const qb = e.target.closest("[data-q]"); if (qb && li) { Est.qty(li.dataset.id, +qb.dataset.q); return; }
      if (e.target.closest("[data-est-toggle]")) setSheet(root, !root.classList.contains("is-open"));
      if (e.target.closest("[data-est-close]")) setSheet(root, false);
      if (e.target.closest("[data-est-clear]")) Est.set({});
    });
  });
  const bump = () => $$(".est:not(.est--inline)").forEach((r) => { r.classList.remove("is-bump"); void r.offsetWidth; r.classList.add("is-bump"); });
  $$(".menu-item[data-id] [data-add]").forEach((b) => b.addEventListener("click", () => { const on = Est.toggle(b.closest(".menu-item").dataset.id); if (on) bump(); }));
  $$(".pick[data-id] input").forEach((c) => c.addEventListener("change", () => Est.toggle(c.closest(".pick").dataset.id, c.checked)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") $$(".est.is-open:not(.est--inline)").forEach((r) => setSheet(r, false)); });

  /* ---------- Menu search (filters every pillar at once) ---------- */
  const norm = (x) => x.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[®·]/g, " ");
  $$("[data-menu-scope]").forEach((scope) => {
    const input = $("[data-menu-search]", scope); if (!input) return;
    const clear = $("[data-search-clear]", scope), empty = $("[data-search-empty]", scope);
    const panels = $$(".tabs__panel", scope), btns = $$(".tabs__btn", scope);
    const rows = $$(".menu-item, .pick", scope);
    const run = () => {
      const q = norm(input.value.trim());
      clear.hidden = !q; scope.classList.toggle("is-searching", !!q);
      if (!q) {
        rows.forEach((r) => (r.hidden = false)); $$("[data-block]", scope).forEach((b) => (b.hidden = false)); empty.hidden = true;
        const ai = Math.max(0, btns.findIndex((b) => b.getAttribute("aria-selected") === "true")); panels.forEach((p, i) => (p.hidden = i !== ai)); return;
      }
      const words = q.split(/\s+/);
      let n = 0;
      rows.forEach((r) => { const txt = norm(r.textContent + " " + (r.closest("[data-block]")?.querySelector("h3,.pick-group__t")?.textContent || "") + " " + (r.closest(".tabs__panel")?.dataset.pillar || "")); const toks = txt.split(/[^a-z0-9+$]+/); const ok = words.every((w) => toks.some((k) => k.startsWith(w))); r.hidden = !ok; if (ok) n++; });
      $$("[data-block]", scope).forEach((b) => (b.hidden = !$$(".menu-item, .pick", b).some((r) => !r.hidden)));
      panels.forEach((p) => (p.hidden = !$$(".menu-item, .pick", p).some((r) => !r.hidden)));
      empty.hidden = n > 0;
    };
    input.addEventListener("input", run);
    clear.addEventListener("click", () => { input.value = ""; run(); input.focus(); });
    btns.forEach((b) => b.addEventListener("click", () => {
      if (input.value) { input.value = ""; clear.hidden = true; scope.classList.remove("is-searching"); rows.forEach((r) => (r.hidden = false)); $$("[data-block]", scope).forEach((x) => (x.hidden = false)); empty.hidden = true; }
      const tools = $("[data-menu-tools]", scope);
      if (tools) { const top = scope.getBoundingClientRect().top + window.scrollY - 90; if (window.scrollY > top + 40) window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" }); }
    }));
  });
  renderEst();

  /* ---------- Inquiry form: choose services + estimate → details → calendar ---------- */
  const form = $("#inquiry-form");
  if (form) {
    const card = form.closest(".form-card");
    const panels = $$(".step-panel", form);
    const inds = $$("[data-step-ind]", card);
    const checks = $$('input[name="services"]', form);
    const chosen = $("[data-chosen]", form), chosenEst = $("[data-chosen-est]", form);
    const svcErr = $("[data-service-error]", form);
    const picker = $("[data-picker]", form);
    const transportBox = $('[data-transport] input', form);
    const selected = () => checks.filter((c) => c.checked);
    const labelOf = (c) => { const st = c.closest("label").querySelector("strong"); return (st ? st.textContent : c.closest("label").textContent).trim(); };
    const goStep = (n, move = true) => {
      panels.forEach((p) => { const on = +p.dataset.step === n; p.hidden = !on; p.classList.toggle("is-active", on); });
      inds.forEach((li) => { const k = +li.dataset.stepInd; li.classList.toggle("is-active", k === n); li.classList.toggle("is-done", k < n); });
      if (!move) return;
      const top = card.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.5) window.scrollTo({ top: window.scrollY + top - 110, behavior: reduceMotion ? "auto" : "smooth" });
      setTimeout(() => { const f = n === 2 ? form.first_name : checks[0]; if (f) f.focus({ preventScroll: true }); }, 420);
    };
    const syncChosen = () => {
      const S = estSummary();
      const labels = selected().map(labelOf);
      chosen.textContent = labels.length ? labels.join(" · ") : (S.count ? S.lines.map((l) => l.name).join(" · ") : "—");
      if (chosenEst) { chosenEst.hidden = !S.count; chosenEst.textContent = t("Estimate") + " " + money(S.total) + (S.from ? "+" : ""); }
    };
    const toStep2 = () => {
      if (!selected().length && !estSummary().count) { svcErr.textContent = t("Please choose at least one service or treatment."); return; }
      svcErr.textContent = ""; syncChosen(); goStep(2);
    };
    checks.forEach((c) => c.addEventListener("change", () => {
      svcErr.textContent = "";
      if (c.dataset.key === "transport" && transportBox) { transportBox.checked = c.checked; transportBox.closest("[data-transport]").classList.toggle("is-flag", c.checked); }
      if (c.dataset.key === "not-sure" && c.checked) checks.forEach((x) => { if (x !== c && x.dataset.key !== "transport") x.checked = false; });
      else if (c.checked) { const ns = checks.find((x) => x.dataset.key === "not-sure"); if (ns) ns.checked = false; }
    }));
    if (transportBox) transportBox.addEventListener("change", () => { const tc = checks.find((x) => x.dataset.key === "transport"); if (tc) tc.checked = transportBox.checked; });
    // picking exact treatments ticks the matching pillar card
    document.addEventListener("libre:estimate", (e) => {
      e.detail.lines.forEach((l) => { const key = l.id.split("-")[0]; const c = checks.find((x) => x.dataset.key === key); if (c && !c.dataset.auto) { c.checked = true; c.dataset.auto = "1"; } });
      syncChosen();
    });
    const next = $("[data-next]", form); if (next) next.addEventListener("click", toStep2);
    $$("[data-back]", form).forEach((b) => b.addEventListener("click", () => goStep(1)));

    const consultSel = form.consult_type, consultHint = $("[data-consult-hint]", form);
    const CONSULT_MAP = { photo: 0, coordinator: 1, doctor: 2 };
    const syncConsult = () => {
      if (!consultSel || !consultHint) return;
      const i = consultSel.selectedIndex;
      consultHint.textContent = i === 0 ? t("Choose a time next. We’ll also text you a secure link to upload your photos.")
        : i === 1 ? t("Meet in person, by phone or virtually. No cost.")
        : t("You’ll pick your time and pay the $75 online. It’s applied to your treatment.");
    };
    const qs = new URLSearchParams(location.search);
    if (consultSel) {
      const c = qs.get("consult");
      if (c && c in CONSULT_MAP) consultSel.selectedIndex = CONSULT_MAP[c];
      consultSel.addEventListener("change", syncConsult); syncConsult();
    }
    if (qs.get("transport")) {
      if (transportBox) { transportBox.checked = true; transportBox.closest("[data-transport]").classList.add("is-flag"); }
      const tc = checks.find((x) => x.dataset.key === "transport"); if (tc) tc.checked = true;
    }
    (qs.get("service") || "").split(",").filter(Boolean).forEach((k) => { const c = checks.find((x) => x.dataset.key === k || x.value === k); if (c) c.checked = true; });
    if (picker && qs.get("est") && !estSummary().count) picker.open = true;
    renderEst(); syncChosen();

    // Option A: replace with the native GHL form if an ID is set
    if (LIBRE_CONFIG.ghlFormId) {
      $(".form-body", card).innerHTML = `<iframe src="https://api.leadconnectorhq.com/widget/form/${LIBRE_CONFIG.ghlFormId}" style="width:100%;min-height:760px;border:0;border-radius:12px" title="LIBRE inquiry form" loading="lazy"></iframe>`;
      loadScript("https://link.msgsndr.com/js/form_embed.js");
    }
    $$("[data-doctor-calendar-link]").forEach((a) => {
      if (LIBRE_CONFIG.doctorCalendarUrl) { a.href = LIBRE_CONFIG.doctorCalendarUrl; a.target = "_blank"; a.rel = "noopener"; }
      else a.hidden = true;
    });
    $$("[data-calendar-link]").forEach((a) => {
      if (LIBRE_CONFIG.calendarUrl) { a.href = LIBRE_CONFIG.calendarUrl; a.target = "_blank"; a.rel = "noopener"; }
      else a.closest("[data-calendar-wrap]")?.setAttribute("hidden", "");
    });

    const status = $(".form-status", form);
    const setErr = (field, msg) => {
      const wrap = field.closest(".field, .choice");
      wrap.classList.toggle("has-error", !!msg);
      const e = wrap.querySelector(".field__error");
      if (e) e.textContent = msg || "";
    };
    const validate = () => {
      let ok = true;
      [["first_name", t("Please enter your first name.")], ["last_name", t("Please enter your last name.")]].forEach(([n, m]) => {
        const f = form[n]; const bad = !f.value.trim(); setErr(f, bad ? m : ""); if (bad) ok = false;
      });
      const phone = form.phone.value.replace(/\D/g, "");
      if (phone.length < 10) { setErr(form.phone, t("Please enter a valid phone number.")); ok = false; } else setErr(form.phone, "");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim())) { setErr(form.email, t("Please enter a valid email.")); ok = false; } else setErr(form.email, "");
      form.consent.closest(".choice").classList.toggle("has-error", !form.consent.checked);
      if (!form.consent.checked) ok = false;
      return ok;
    };
    $$("#f-first, #f-last, #f-phone, #f-email", form).forEach((f) => f.addEventListener("input", () => { if (f.closest(".has-error")) validate(); }));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.classList.remove("is-error");
      if (form.website.value) return; // honeypot
      const S = estSummary();
      if (!selected().length && !S.count) { goStep(1); svcErr.textContent = t("Please choose at least one service or treatment."); return; }
      if (!validate()) { status.textContent = t("Please complete the highlighted fields."); status.classList.add("is-error"); const bad = $(".has-error input", form); if (bad) bad.focus(); return; }
      const fd = new FormData(form);
      const data = {};
      fd.forEach((v, k) => { if (k !== "services" && k !== "website" && !(e.target.elements[k] && e.target.elements[k].hasAttribute && e.target.elements[k].hasAttribute("data-pick"))) data[k] = v; });
      const sel = selected();
      data.services = sel.map((c) => c.value).join(", ");
      data.service = sel.length ? sel[0].value : "Estimate only";
      data.service_key = sel.map((c) => c.dataset.key).join(",");
      data.selected_treatments = S.lines.map((l) => `${l.name} x${l.q}${l.unit ? " " + l.unit : ""} (${l.line === null ? "ask" : "$" + l.line + (l.kind === "monthly" ? "/mo" : "")})`).join("; ");
      data.estimate_total = S.count ? money(S.total) + (S.from ? "+" : "") : "";
      data.estimate_monthly = S.monthly ? money(S.monthly) + "/mo" : "";
      data.transport_request = transportBox && transportBox.checked ? "Yes" : "No";
      data.marketing_consent = form.marketing.checked ? "yes" : "no";
      data.source = "Website — " + document.title;
      data.page_url = location.href;
      data.language = LANG === "es" ? "Spanish" : "English";
      const btn = $("button[type=submit]", form);
      btn.disabled = true; btn.dataset.label = btn.innerHTML; btn.textContent = t("Sending…");
      try {
        // Send the details to GHL (W1 workflow) when the webhook is set. The calendar opens either way.
        if (LIBRE_CONFIG.formWebhook) {
          await fetch(LIBRE_CONFIG.formWebhook, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data).toString() }).catch(() => {});
        }
        inds.forEach((li) => { const k = +li.dataset.stepInd; li.classList.toggle("is-done", k < 3); li.classList.toggle("is-active", k === 3); });
        const isDoctor = consultSel && consultSel.selectedIndex === 2;
        const calUrl = isDoctor ? LIBRE_CONFIG.doctorCalendarUrl : LIBRE_CONFIG.calendarUrl;
        $("[data-cal-note-free]", card).hidden = isDoctor;
        $("[data-cal-note-paid]", card).hidden = !isDoctor;
        const box = $("[data-cal-embed]", card);
        if (calUrl && box) {
          const id = calUrl.split("/").pop();
          const q = new URLSearchParams({ first_name: data.first_name, last_name: data.last_name, email: data.email, phone: data.phone });
          box.innerHTML = `<iframe src="${calUrl}?${q.toString()}" allow="payment" style="width:100%;border:none;overflow:hidden;min-height:760px" scrolling="no" id="${id}_${Date.now()}" title="${isDoctor ? "Consultation with Dr. Thomas" : "LIBRE free visit"}"></iframe>`;
          if (!document.querySelector('script[src*="form_embed.js"]')) loadScript("https://link.msgsndr.com/js/form_embed.js");
        }
        card.classList.add("is-sent");
        card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      } catch (err) {
        status.innerHTML = t("Something went wrong. Please call or text ") + "<a href='tel:" + LIBRE_CONFIG.phone + "'>(877) 536-7616</a>.";
        status.classList.add("is-error");
      } finally { btn.disabled = false; btn.innerHTML = btn.dataset.label; }
    });
  }

  /* ---------- Reels: 3D cover-flow, auto-playing ---------- */
  $$("[data-reels]").forEach((root) => {
    const C = LIBRE_CONFIG;
    const all = (C.reels || []).map((r) => ({
      ...r,
      tag: t(r.tag), title: t(r.title),
      video: withRoot(r.video || (r.id ? C.reelsVideoPath + r.id + ".mp4" : "")),
      poster: withRoot(r.poster || (r.id ? C.reelsPosterPath + r.id + ".webp" : ""))
    })).filter((r) => r.video || r.poster);
    const cat = root.dataset.reels || "all";
    let list = cat === "all" ? all : all.filter((r) => (r.cats || []).includes(cat));
    const fb = root.dataset.reelsFallback;
    if (fb && list.length < 3) list = list.concat(all.filter((r) => !list.includes(r) && (r.cats || []).includes(fb)));
    if (list.length < 5 && !["doctor", "results"].includes(cat)) list = list.concat(all.filter((r) => !list.includes(r)).slice(0, 5 - list.length));
    if (!list.length) { root.closest("section")?.remove(); return; }
    const stage = $(".reels__stage", root), dots = $(".reels__dots", root);
    const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const fbIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1z"/></svg>';
    const slidesHtml = list.map((r, i) => `
      <article class="reel" data-i="${i}" aria-label="${esc(r.title)}">
        <div class="reel__media is-loading media-fade">
          <img src="${esc(r.poster)}" alt="" loading="lazy">
          ${r.video ? `<video muted playsinline preload="none" data-src="${esc(r.video)}"></video>` : ""}
        </div>
        <span class="reel__num">${String(i + 1).padStart(2, "0")}</span>
        ${r.video ? `<span class="reel__live"><i></i>${t("Now playing")}</span>
        <span class="reel__play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg></span>
        <button class="reel__sound" type="button" aria-label="${t("Turn sound on")}" hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 9h4l5-4v14l-5-4H4z"/><path class="on" d="M17 9a4 4 0 0 1 0 6M19.5 6.5a7.5 7.5 0 0 1 0 11"/><path class="off" d="M17 9l5 6M22 9l-5 6"/></svg>
        </button>` : ""}
        <div class="reel__cap"><span>${esc(r.tag)}</span><h3>${esc(r.title)}</h3></div>
        <div class="reel__bar"><i></i></div>
      </article>`).join("") + `
      <article class="reel reel--more" data-i="${list.length}" aria-label="${t("More reels on Facebook")}">
        <div class="reel__more-in">
          <span class="fb">${fbIcon}</span>
          <h3>${t("More reels on Facebook")}</h3>
          <p>${t("Treatments, results and tips from Dr. Thomas — new every week.")}</p>
          <a class="btn btn--sm" href="${esc(C.reelsMoreUrl)}" target="_blank" rel="noopener">${t("Click to view more")}</a>
        </div>
      </article>`;
    stage.innerHTML = slidesHtml;
    const slides = $$(".reel", stage);
    dots.innerHTML = slides.map((el, i) => `<button type="button" aria-label="${i < list.length ? t("Show reel ") + (i + 1) : t("More reels on Facebook")}"></button>`).join("");
    const dotBtns = $$("button", dots);
    $$(".reel__media img", stage).forEach((im) => {
      const done = () => im.parentElement.classList.remove("is-loading");
      if (im.complete && im.naturalWidth) done(); else { im.addEventListener("load", done, { once: true }); im.addEventListener("error", done, { once: true }); }
    });
    let active = 0, timer = null, inView = false;
    const STILL_MS = 5500, MAX_MS = 16000;

    const layout = () => {
      const w = stage.clientWidth, small = w < 640;
      const gap = small ? w * 0.44 : Math.min(270, w * 0.2);
      const n = slides.length;
      slides.forEach((el, i) => {
        let o = i - active;
        if (o > n / 2) o -= n; if (o < -n / 2) o += n; // infinite loop
        const a = Math.abs(o), hide = a > (small ? 1 : 2);
        el.style.transform = `translate(-50%,-50%) translateX(${o * gap}px) translateZ(${-a * 150}px) rotateY(${o === 0 ? 0 : (o < 0 ? 24 : -24)}deg) scale(${1 - a * 0.06})`;
        el.style.opacity = hide ? 0 : 1 - a * 0.25;
        el.style.zIndex = 10 - a;
        el.style.pointerEvents = hide ? "none" : "auto";
        el.classList.toggle("is-active", o === 0);
        el.setAttribute("aria-hidden", o === 0 ? "false" : "true");
        $$("a, button", el).forEach((c) => (c.tabIndex = o === 0 ? 0 : -1));
      });
      dotBtns.forEach((d, i) => d.classList.toggle("is-active", i === active));
    };
    const loadVid = (v) => { if (v && v.dataset.src && !v.getAttribute("src")) { v.src = v.dataset.src; v.preload = "auto"; } };
    const stopAll = () => { clearTimeout(timer); slides.forEach((el) => { const v = $("video", el); if (v) v.pause(); }); };
    const arm = (ms) => { clearTimeout(timer); if (!reduceMotion) timer = setTimeout(() => go(active + 1), ms); };
    const play = () => {
      clearTimeout(timer);
      const n = slides.length;
      slides.forEach((el, i) => {
        const v = $("video", el), d = Math.min(Math.abs(i - active), n - Math.abs(i - active));
        if (v && d <= 1) loadVid(v);
        if (i !== active) {
          el.classList.remove("is-paused", "is-sound");
          if (v) { v.pause(); v.muted = true; const sb = $(".reel__sound", el); if (sb) sb.hidden = true; }
        }
      });
      const cur = slides[active], v = $("video", cur), bar = $(".reel__bar i", cur);
      if (bar) { bar.style.transition = "none"; bar.style.width = "0"; }
      if (!inView) return;
      cur.classList.remove("is-paused");
      if (v) {
        $(".reel__sound", cur).hidden = false;
        try { v.currentTime = 0; } catch (e) {}
        v.onplaying = () => { v.style.opacity = 1; };
        v.onended = () => go(active + 1);
        v.ontimeupdate = () => { if (v.duration && bar) bar.style.width = (v.currentTime / v.duration) * 100 + "%"; };
        const p = v.play(); if (p) p.catch(() => {});
        arm(MAX_MS);
      } else {
        if (bar) requestAnimationFrame(() => { bar.style.transition = `width ${STILL_MS}ms linear`; bar.style.width = "100%"; });
        arm(cur.classList.contains("reel--more") ? STILL_MS + 2500 : STILL_MS);
      }
    };
    const go = (i) => { active = (i + slides.length) % slides.length; layout(); play(); };

    slides.forEach((el, i) => el.addEventListener("click", (e) => {
      if (e.target.closest(".reel__sound, a")) return;
      if (i !== active) return go(i);
      const v = $("video", el); if (!v) return;
      if (v.paused) { v.play().catch(() => {}); el.classList.remove("is-paused"); if (!el.classList.contains("is-sound")) arm(MAX_MS); }
      else { v.pause(); el.classList.add("is-paused"); clearTimeout(timer); }
    }));
    stage.addEventListener("click", (e) => {
      const b = e.target.closest(".reel__sound"); if (!b) return;
      const el = b.closest(".reel"), v = $("video", el);
      v.muted = !v.muted; el.classList.toggle("is-sound", !v.muted);
      b.setAttribute("aria-label", v.muted ? t("Turn sound on") : t("Turn sound off"));
      if (!v.muted) { clearTimeout(timer); if (v.paused) { v.play().catch(() => {}); el.classList.remove("is-paused"); } } else arm(MAX_MS);
    });
    dotBtns.forEach((d, i) => d.addEventListener("click", () => go(i)));
    $$("[data-dir]", root).forEach((b) => b.addEventListener("click", () => go(active + (b.dataset.dir === "next" ? 1 : -1))));
    root.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") go(active + 1); if (e.key === "ArrowLeft") go(active - 1); });
    let sx = null, sy = null;
    stage.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    stage.addEventListener("touchend", (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(active + (dx < 0 ? 1 : -1));
      sx = sy = null;
    });
    window.addEventListener("resize", layout);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => { inView = en.isIntersecting; if (inView) play(); else stopAll(); }, { threshold: 0.35 }).observe(stage);
    } else { inView = true; }
    document.addEventListener("visibilitychange", () => { if (document.hidden) stopAll(); else if (inView) play(); });
    $$("[data-reels-more]", root).forEach((a) => (a.href = C.reelsMoreUrl));
    layout();
    if (inView) play();
  });

  /* ---------- Reviews ---------- */
  $$("[data-reviews]").forEach((wrap) => {
    const esc = (s) => String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const cards = (LIBRE_CONFIG.reviews || []).map((r) => `<figure class="review"><div class="stars" aria-label="5 out of 5 stars">★★★★★</div><p>“${esc(r.text)}”</p><cite>${esc(r.name)}${r.treatment ? " · " + esc(r.treatment) : ""}</cite></figure>`).join("");
    wrap.innerHTML = cards + `<div class="review-cta"><div class="stars" aria-hidden="true">★★★★★</div><h3>Loved by our patients</h3><p>Read real, verified reviews from LIBRE patients on Google.</p><a class="btn btn--light btn--sm" href="${LIBRE_CONFIG.googleReviewsUrl}" target="_blank" rel="noopener">Read Google Reviews</a></div>`;
  });

  /* ---------- GHL chat widget ---------- */
  if (LIBRE_CONFIG.chatWidgetId) {
    window.addEventListener("load", () => {
      const s = document.createElement("script");
      s.src = "https://widgets.leadconnectorhq.com/loader.js";
      s.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
      s.setAttribute("data-widget-id", LIBRE_CONFIG.chatWidgetId);
      s.setAttribute("data-source", "WEBSITE");
      s.async = true;
      document.body.appendChild(s);
    });
  }

  /* ---------- Travel: real map (Leaflet + OpenStreetMap/CARTO), SVG map stays as fallback ---------- */
  $$("[data-travel-map]").forEach((el) => {
    const frame = el.closest(".tmap-frame"), section = el.closest(".travel") || document;
    const P = {
      libre: [27.8167, -80.4706], mco: [28.4312, -81.3081], pbi: [26.6832, -80.0956], mia: [25.7959, -80.287], wpb: [26.7127, -80.059]
    };
    const I95 = [[26.75, -80.1], [26.93, -80.12], [27.1, -80.2], [27.17, -80.27], [27.3, -80.34], [27.38, -80.39], [27.45, -80.43], [27.6, -80.47], [27.64, -80.48], [27.77, -80.52], [27.82, -80.55], P.libre];
    const ROUTES = {
      pbi: { drive: [P.pbi, ...I95] },
      mco: { drive: [P.mco, [28.455, -81.15], [28.47, -80.95], [28.42, -80.8], [28.25, -80.74], [28.08, -80.7], [27.98, -80.64], [27.86, -80.56], [27.82, -80.55], P.libre] },
      mia: { rail: [P.mia, [25.7783, -80.1958], [26.1196, -80.17], [26.35, -80.09], [26.46, -80.08], P.wpb], drive: [P.wpb, ...I95] }
    };
    let map = null, layers = {}, current = "pbi";
    const show = (key, fly = true) => {
      current = key;
      $$("[data-route-btn]", frame).forEach((b) => b.classList.toggle("is-on", b.dataset.routeBtn === key));
      $$("[data-route-card]", section).forEach((c) => c.classList.toggle("is-on", c.dataset.routeCard === key));
      if (!map) return;
      Object.entries(layers).forEach(([k, g]) => g.eachLayer((l) => { const el2 = l.getElement && l.getElement(); if (el2) { el2.classList.toggle("is-on", k === key); el2.classList.toggle("is-dim", k !== key); } }));
      if (fly) map.flyToBounds(layers[key].getBounds(), { paddingTopLeft: [40, 70], paddingBottomRight: [60, 80], duration: reduceMotion ? 0 : 1.1, maxZoom: 9 });
    };
    $$("[data-route-btn]", frame).forEach((b) => b.addEventListener("click", () => show(b.dataset.routeBtn)));
    $$("[data-route-card]", section).forEach((c) => c.addEventListener("click", (e) => { if (e.target.closest("a")) return; show(c.dataset.routeCard); if (window.innerWidth < 900) frame.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" }); }));
    const boot = () => {
      if (!window.L) return;
      const L = window.L;
      map = L.map(el, { zoomControl: false, scrollWheelZoom: false, dragging: !L.Browser.mobile, tap: false, attributionControl: true, zoomSnap: 0.25 });
      L.control.zoom({ position: "topright" }).addTo(map);
      // OpenStreetMap standard tiles: free, no API key (attribution required). Toned to the site palette in CSS.
      const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19, crossOrigin: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
      }).addTo(map);
      let loaded = 0, failed = 0;
      tiles.on("tileload", () => { loaded++; if (loaded >= 2) frame.classList.add("is-live"); });
      tiles.on("tileerror", () => { failed++; if (!loaded && failed >= 3) frame.classList.remove("is-live"); });
      const pin = (latlng, cls, html, label) => L.marker(latlng, { icon: L.divIcon({ className: "tm-pin " + cls, html, iconSize: null }), keyboard: false, title: label }).addTo(map);
      pin(P.libre, "tm-pin--libre", '<span class="tm-pulse"></span><span class="tm-dot"></span><b>LIBRE</b><small>Sebastian</small>', "LIBRE Aesthetics & Wellness");
      pin(P.pbi, "tm-pin--left", '<span class="tm-dot"></span><b>PBI</b>', "Palm Beach International");
      pin(P.mco, "", '<span class="tm-dot"></span><b>MCO</b>', "Orlando International");
      pin(P.mia, "", '<span class="tm-dot"></span><b>MIA</b>', "Miami International");
      pin(P.wpb, "tm-pin--rail", '<span class="tm-dot"></span><b>WPB</b><small>' + t("Train station") + "</small>", "West Palm Beach station");
      Object.entries(ROUTES).forEach(([k, r]) => {
        const g = L.featureGroup().addTo(map);
        if (r.rail) L.polyline(r.rail, { className: "tm-route tm-route--rail", weight: 3, smoothFactor: 1.5 }).addTo(g);
        if (r.drive) L.polyline(r.drive, { className: "tm-route", weight: 4, smoothFactor: 1.5 }).addTo(g);
        layers[k] = g;
      });
      map.fitBounds(L.latLngBounds([P.mco, P.mia, P.libre]), { paddingTopLeft: [40, 70], paddingBottomRight: [60, 80] });
      show(current, false);
      setTimeout(() => show(current, true), 900);
    };
    const start = () => {
      if (window.L) return boot();
      const css = document.createElement("link"); css.rel = "stylesheet"; css.href = ROOT + "assets/vendor/leaflet/leaflet.css"; document.head.appendChild(css);
      const s = document.createElement("script"); s.src = ROOT + "assets/vendor/leaflet/leaflet.js"; s.async = true; s.onload = boot; document.body.appendChild(s);
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((en) => { if (en.some((x) => x.isIntersecting)) { io.disconnect(); start(); } }, { rootMargin: "300px" });
      io.observe(el);
    } else start();
  });

  /* ---------- DreamSculpt Academy buttons: live once LIBRE_CONFIG.dreamSculptUrl is set ---------- */
  $$("[data-dreamsculpt]").forEach((a) => {
    if (LIBRE_CONFIG.dreamSculptUrl) {
      a.href = LIBRE_CONFIG.dreamSculptUrl; a.target = "_blank"; a.rel = "noopener";
      a.classList.remove("is-soon"); a.removeAttribute("aria-disabled");
      const soon = $("[data-soon]", a); if (soon) soon.remove();
    } else a.addEventListener("click", (e) => e.preventDefault());
  });

  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  function loadScript(src) {
    if ($(`script[src="${src}"]`)) return;
    const s = document.createElement("script"); s.src = src; s.async = true; document.body.appendChild(s);
  }
})();
