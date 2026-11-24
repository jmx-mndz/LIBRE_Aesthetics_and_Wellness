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
  calendarUrl: "",

  // GHL chat widget (already live on the current site)
  chatWidgetId: "6b055c14f04219e8b659de35",

  // NBX Wellness supplement store
  shopUrl: "https://nbxwellness.com/store/libre-aesthetics/index",

  /* ---- REELS (3D auto-playing carousel) ----------------------------------
     Videos live in assets/video/reels/<id>.mp4 and posters in assets/img/reels/<id>.webp.
     To host a reel on GHL instead, paste its Media Storage link into "video".
     "cats" decides which pages show it: endolift, gluteal, tattoo, face, body, skin, wellness, doctor
     (every reel also shows on the Home and Results pages).                  */
  reels: [
    { id: "endolift-customizable", tag: "Endolift® · Face", title: "Endolift® is customizable", cats: ["endolift", "face"] },
    { id: "before-meets-after", tag: "Endolift® · Real result", title: "Before meets after", cats: ["endolift", "face", "results"] },
    { id: "dr-thomas-approach", tag: "Dr. Thomas · Philosophy", title: "My approach: less is more", cats: ["doctor", "face"] },
    { id: "best-feeling", tag: "Body · Patient moment", title: "The best feeling", cats: ["body", "results"] },
    { id: "lightscan-eyes", tag: "Laser & Skin", title: "Lightscan eyes — tighten & brighten", cats: ["skin", "face"] },
    { id: "endolift-testimony", tag: "Client feedback", title: "“Big difference — I love it!”", cats: ["endolift", "face", "results"] },
    { id: "dr-thomas-endolift-laser", tag: "Dr. Thomas explains", title: "How Endolift® works", cats: ["endolift", "doctor", "face", "body"] },
    { id: "endolift-abdomen", tag: "Endolift® · Abdomen", title: "Before & after Endolift®", cats: ["endolift", "body", "results"] },
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
    { id: "dr-thomas-gluteal-award", tag: "Dr. Thomas · Recognition", title: "Gluteal Harmonization 360° Masterclass", cats: ["gluteal", "doctor", "body"] }
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
      return list.scrollWidth > nav.clientWidth + 1 || nav.getBoundingClientRect().right > actions.getBoundingClientRect().left - gap || box.scrollWidth > box.clientWidth + 1;
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
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        (targets.get(en.target) || []).forEach((el) => el.classList.add("in"));
        io.unobserve(en.target);
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
        const r = el.parentElement.getBoundingClientRect();
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
    const load = () => { v.src = v.dataset.src; v.muted = true; const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((en) => en.forEach((e) => {
        if (e.isIntersecting) { if (!v.src) load(); else v.play().catch(() => {}); } else if (v.src) v.pause();
      }), { threshold: 0.1 }).observe(v);
    } else load();
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

  /* ---------- Inquiry form: 2-step concierge (one form for every service) ---------- */
  const form = $("#inquiry-form");
  if (form) {
    const card = form.closest(".form-card");
    const panels = $$(".step-panel", form);
    const inds = $$("[data-step-ind]", card);
    const radios = $$('input[name="service"]', form);
    const chosen = $("[data-chosen]", form);
    const svcErr = $("[data-service-error]", form);
    const selected = () => radios.find((r) => r.checked);
    const labelOf = (r) => { const st = r.closest("label").querySelector("strong"); return st ? st.textContent : r.value; };
    const goStep = (n, move = true) => {
      panels.forEach((p) => { const on = +p.dataset.step === n; p.hidden = !on; p.classList.toggle("is-active", on); });
      inds.forEach((li) => { const k = +li.dataset.stepInd; li.classList.toggle("is-active", k === n); li.classList.toggle("is-done", k < n); });
      if (!move) return;
      const top = card.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.5) window.scrollTo({ top: window.scrollY + top - 110, behavior: reduceMotion ? "auto" : "smooth" });
      setTimeout(() => { const f = n === 2 ? form.first_name : (selected() || radios[0]); if (f) f.focus({ preventScroll: true }); }, 420);
    };
    const toStep2 = () => {
      const r = selected();
      if (!r) { svcErr.textContent = t("Please choose a service to continue."); return; }
      svcErr.textContent = ""; chosen.textContent = labelOf(r); goStep(2);
    };
    let pointerAt = 0;
    radios.forEach((r) => {
      r.closest("label").addEventListener("pointerdown", () => (pointerAt = Date.now()));
      r.addEventListener("change", () => { svcErr.textContent = ""; if (Date.now() - pointerAt < 800) setTimeout(toStep2, reduceMotion ? 0 : 420); });
    });
    const next = $("[data-next]", form); if (next) next.addEventListener("click", toStep2);
    $$("[data-back]", form).forEach((b) => b.addEventListener("click", () => goStep(1)));

    const consultSel = form.consult_type, consultHint = $("[data-consult-hint]", form);
    const CONSULT_MAP = { photo: 0, coordinator: 1, doctor: 2 };
    const syncConsult = () => {
      if (!consultSel || !consultHint) return;
      const i = consultSel.selectedIndex;
      consultHint.textContent = i === 0 ? t("We’ll text you a secure link to upload your photos.")
        : i === 1 ? t("Meet in person, by phone or virtually. No cost.")
        : t("The $75 fee is applied to your treatment.");
    };
    if (consultSel) {
      const c = new URLSearchParams(location.search).get("consult");
      if (c && c in CONSULT_MAP) consultSel.selectedIndex = CONSULT_MAP[c];
      consultSel.addEventListener("change", syncConsult); syncConsult();
    }
    const preKey = new URLSearchParams(location.search).get("service");
    if (preKey) { const r = radios.find((x) => x.dataset.key === preKey || x.value === preKey); if (r) { r.checked = true; chosen.textContent = labelOf(r); goStep(2, false); } }

    // Option A: replace with the native GHL form if an ID is set
    if (LIBRE_CONFIG.ghlFormId) {
      $(".form-body", card).innerHTML = `<iframe src="https://api.leadconnectorhq.com/widget/form/${LIBRE_CONFIG.ghlFormId}" style="width:100%;min-height:760px;border:0;border-radius:12px" title="LIBRE inquiry form" loading="lazy"></iframe>`;
      loadScript("https://link.msgsndr.com/js/form_embed.js");
    }
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
    $$("input:not([type=radio]), select, textarea", form).forEach((f) => f.addEventListener("input", () => { if (f.closest(".has-error")) validate(); }));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.classList.remove("is-error");
      if (form.website.value) return; // honeypot
      if (!selected()) { goStep(1); svcErr.textContent = t("Please choose a service to continue."); return; }
      if (!validate()) { status.textContent = t("Please complete the highlighted fields."); status.classList.add("is-error"); const bad = $(".has-error input", form); if (bad) bad.focus(); return; }
      const data = Object.fromEntries(new FormData(form).entries());
      delete data.website;
      data.service = selected().value;
      data.service_key = selected().dataset.key;
      data.marketing_consent = form.marketing.checked ? "yes" : "no";
      data.source = "Website — " + document.title;
      data.page_url = location.href;
      data.language = LANG === "es" ? "Spanish" : "English";
      const btn = $("button[type=submit]", form);
      btn.disabled = true; btn.dataset.label = btn.innerHTML; btn.textContent = t("Sending…");
      try {
        if (!LIBRE_CONFIG.formWebhook) throw new Error("not-connected");
        await fetch(LIBRE_CONFIG.formWebhook, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data).toString() });
        inds.forEach((li) => { li.classList.add("is-done"); li.classList.remove("is-active"); });
        card.classList.add("is-sent");
        card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        if (LIBRE_CONFIG.calendarUrl) {
          const q = new URLSearchParams({ first_name: data.first_name, last_name: data.last_name, email: data.email, phone: data.phone });
          setTimeout(() => { window.location.href = LIBRE_CONFIG.calendarUrl + (LIBRE_CONFIG.calendarUrl.includes("?") ? "&" : "?") + q.toString(); }, 1800);
        }
      } catch (err) {
        status.innerHTML = err.message === "not-connected"
          ? t("Our online form is being connected. Please call or text ") + "<a href='tel:" + LIBRE_CONFIG.phone + "'>(877) 536-7616</a>" + t(" and our team will book you right away.")
          : t("Something went wrong. Please call or text ") + "<a href='tel:" + LIBRE_CONFIG.phone + "'>(877) 536-7616</a>.";
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

  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  function loadScript(src) {
    if ($(`script[src="${src}"]`)) return;
    const s = document.createElement("script"); s.src = src; s.async = true; document.body.appendChild(s);
  }
})();
