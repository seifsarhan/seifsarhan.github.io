/* ------------------------------------------------------------------
   Edit your details and projects here — the page renders from this.
------------------------------------------------------------------- */
const CONFIG = {
  name: 'Seif Sarhan',
  first: 'Seif',
  role: 'Full-stack web developer',
  location: 'Egypt',
  email: 'seifsarhan1229@gmail.com',
  github: 'seifsarhan',
  linkedin: '', // e.g. 'https://www.linkedin.com/in/your-name'
};

const PROJECTS = [
  {
    id: 'lail', title: 'Lail Specialty Coffee', repo: 'lail-coffee', cat: 'react', bilingual: true,
    live: 'https://lail-coffee-roastery.surge.sh',
    kind: 'E-commerce storefront', stack: ['React 19', 'Vite', 'Context API', 'localStorage'],
    blurb: 'A bilingual Arabic/English coffee roastery store with live search, quick-view product options, promo codes and a full three-step checkout.',
    features: ['Instant Arabic (RTL) ↔ English (LTR) switch', 'Ctrl+K live search, category pills, roast filter and sorting', 'Quick view with weight pricing, grind selector and customer reviews', 'Cart with free-shipping bar and working promo codes', '3-step checkout with live card preview and printable invoice', 'Order tracking, wishlist and a coffee taste quiz'],
  },
  {
    id: 'aurelia', title: 'Aurelia Luxury Estates', repo: 'aurelia-realty', cat: 'react', bilingual: true,
    live: 'https://aurelia-realty.surge.sh',
    kind: 'Real-estate platform', stack: ['React 19', 'Vite', 'i18n'],
    blurb: 'An Arabic-first luxury property platform for Riyadh, Dubai, New Cairo and the North Coast, with smart filters, side-by-side compare and a mortgage calculator.',
    features: ['Buy / rent search with city and property-type filters', 'Compare properties side by side', 'Mortgage and installment payment calculator', 'Book an in-person viewing or a 3D video tour', 'Advisors directory and ROI advisory section', 'Full Arabic and English interface'],
  },
  {
    id: 'stockmate', title: 'StockMate', repo: 'stockmate', cat: 'python', bilingual: true,
    live: 'https://stockmate-smart.surge.sh', liveLabel: 'Live preview',
    kind: 'Inventory & stocktaking system', stack: ['Python', 'Flask', 'SQLAlchemy', 'Bootstrap 5', 'Chart.js', 'pytest'],
    blurb: 'A bilingual inventory system for shop owners: a transactional stock ledger, a 7-step stocktaking reconciliation engine, and Excel/PDF reports.',
    features: ['Live KPI dashboard with 14-day stock charts', 'Stock in / out with row locking and an immutable movement ledger', '7-step physical stocktaking with shortage / excess variance', '6 reports exported to Excel (.xlsx) and Arabic/English PDF', 'Owner setup wizard, settings and JSON backup / restore', 'Automated pytest suite covering 16 scenarios'],
  },
  {
    id: 'eduguide', title: 'EduGuide', repo: 'eduguide', cat: 'python', bilingual: true,
    live: '',
    kind: 'University SaaS platform', stack: ['Python', 'Flask', 'MySQL / SQLite', 'Groq & Gemini AI', 'Paymob'],
    blurb: 'A multi-university student platform with an AI academic advisor, CV optimizer and mock interviews, plus QR attendance, GPA tools and Egyptian payments.',
    features: ['Separate student, instructor, university-admin and system-admin portals', 'AI advisor chat, CV optimizer and mock interviews (Groq + Gemini)', 'QR lecture check-in with automatic absence alerts', 'GPA calculator, study planner, quizzes and verified QR transcripts', 'Paymob card and Fawry payments with receipts', 'Per-university branding, CSRF protection and audit logs'],
  },
  {
    id: 'synthera', title: 'SYNTH ERA', repo: 'synth-era-store', cat: 'react', bilingual: false,
    live: '',
    kind: 'Techwear store with AI try-on', stack: ['React 18', 'TypeScript', 'Vite', 'Gradio', 'Decart AI'],
    blurb: 'A techwear brand store where shoppers try garments on with AI — upload a photo or go live — backed by three fallback try-on models.',
    features: ['AI virtual try-on from a photo (Leffa, with IDM-VTON and Nymbo fallbacks)', 'Real-time video try-on through the Decart SDK', '“Smart X-Ray” view that reveals garment tech details', 'Hoodies, jackets, pants and tees with a lookbook', 'Pre-order flow and cart', 'Typed React components with TypeScript'],
  },
  {
    id: 'arkadia', title: 'Arkadia Travel', repo: 'arkadia-travel', cat: 'vanilla', bilingual: false,
    live: 'https://arkadia-travel-2026.surge.sh',
    kind: 'Travel agency website', stack: ['HTML', 'CSS', 'JavaScript'],
    blurb: 'A boutique luxury travel site with a destination explorer, package filters and a multi-step booking flow that prices the trip as you go.',
    features: ['Destination explorer with detail modals and wishlist', 'Package listing with filters', 'Booking flow with live totals and promo codes', '“My Trips” drawer and booking receipts', 'FAQ, contact form and legal modals', 'Five pages built without a framework'],
  },
  {
    id: 'aura', title: 'AURA Chronos', repo: 'aura-chronos', cat: 'vanilla', bilingual: false,
    live: 'https://watchesaura.surge.sh',
    kind: 'Luxury watch boutique', stack: ['HTML', 'CSS', 'JavaScript'],
    blurb: 'A haute-horlogerie store with collections, product pages, cart and wishlist, currency switching and a full checkout — plus boutiques and a magazine.',
    features: ['Collections and product detail pages', 'Cart, wishlist and currency switcher (EGP)', 'Checkout flow', 'Private viewing booking and services', 'Global boutiques and magazine pages', 'Eight pages, no framework'],
  },
  {
    id: 'pawplace', title: 'The Paw Place', repo: 'paw-place', cat: 'vanilla', bilingual: true,
    live: 'https://pawplace.surge.sh',
    kind: 'Pet adoption & care center', stack: ['HTML', 'CSS', 'JavaScript'],
    blurb: 'A pet rescue center in Alexandria: browse and adopt vaccinated cats and dogs, shop vet-approved supplies, book grooming or clinic care, and donate.',
    features: ['Adoptable pets with detail pages and an adoption form', 'Supplies shop with cart and checkout', 'Grooming and vet services booking', 'Donations page and sign-in', 'Arabic / English switch', 'Intro video and twelve pages'],
  },
];

const CATS = { all: 'All', react: 'React', python: 'Python · Flask', vanilla: 'HTML · CSS · JS' };

/* ------------------------------------------------------------------ */
{
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const host = (u) => (u ? u.replace(/^https?:\/\//, '') : 'local · Flask app');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const repoUrl = (p) => (CONFIG.github ? `https://github.com/${CONFIG.github}/${p.repo}` : '');
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';

  /* identity */
  document.title = `${CONFIG.name} — ${CONFIG.role}`;
  $$('[data-name]').forEach((el) => (el.textContent = CONFIG.name));
  $('#year').textContent = new Date().getFullYear();

  /* hero name split into letters for the reveal */
  const big = $('#bigname');
  big.innerHTML = [...CONFIG.first].map((ch, i) => `<span class="ch" style="--i:${i}">${esc(ch)}</span>`).join('');
  big.setAttribute('aria-label', CONFIG.name);

  /* stats */
  const stats = [
    [PROJECTS.length, 'projects built end to end'],
    [PROJECTS.filter((p) => p.live).length, 'live demos online'],
    [PROJECTS.filter((p) => p.bilingual).length, 'bilingual Arabic / English builds'],
  ];
  $('#stats').innerHTML = stats.map(([n, l]) => `<li><b data-count="${n}">${n}</b><span>${esc(l)}</span></li>`).join('');
  $('#workcount').textContent = PROJECTS.length;

  /* filters */
  const used = new Set(PROJECTS.map((p) => p.cat));
  $('#filters').innerHTML = Object.entries(CATS).filter(([k]) => k === 'all' || used.has(k))
    .map(([k, l], i) => `<button type="button" class="chip${i ? '' : ' on'}" data-cat="${k}" aria-pressed="${!i}">${esc(l)}</button>`).join('');

  /* project cards */
  const card = (p) => `
    <article class="card" data-cat="${p.cat}" data-reveal>
      <button type="button" class="shot" data-open="${p.id}" aria-label="Open details for ${esc(p.title)}">
        <span class="frame">
          <span class="bar"><i></i><i></i><i></i><em>${esc(host(p.live))}</em></span>
          <img src="assets/projects/${p.id}.webp" alt="Home page of ${esc(p.title)}" loading="lazy" width="1280" height="800">
        </span>
        <span class="glare"></span>
      </button>
      <div class="meta">
        <p class="kind">${esc(p.kind)}</p>
        <h3>${esc(p.title)}</h3>
        <p class="blurb">${esc(p.blurb)}</p>
        <ul class="tags">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
        <div class="links">
          ${p.live ? `<a class="btn sm solid" href="${esc(p.live)}" target="_blank" rel="noopener">${esc(p.liveLabel || 'Live demo')} ${arrow}</a>` : ''}
          ${repoUrl(p) ? `<a class="btn sm" href="${esc(repoUrl(p))}" target="_blank" rel="noopener">Code ${arrow}</a>` : ''}
          <button type="button" class="btn sm ghost" data-open="${p.id}">Details</button>
        </div>
      </div>
    </article>`;
  $('#grid').innerHTML = PROJECTS.map(card).join('');

  $('#filters').addEventListener('click', (e) => {
    const b = e.target.closest('.chip'); if (!b) return;
    $$('.chip').forEach((c) => { c.classList.toggle('on', c === b); c.setAttribute('aria-pressed', c === b); });
    $$('.card').forEach((c) => { c.hidden = !(b.dataset.cat === 'all' || c.dataset.cat === b.dataset.cat); });
  });

  /* details modal */
  const modal = $('#modal');
  const open = (id) => {
    const p = PROJECTS.find((x) => x.id === id); if (!p) return;
    $('#modal-body').innerHTML = `
      <img src="assets/projects/${p.id}.webp" alt="Home page of ${esc(p.title)}" width="1280" height="800">
      <div class="mtext">
        <p class="kind">${esc(p.kind)}</p>
        <h3 id="modal-title">${esc(p.title)}</h3>
        <p>${esc(p.blurb)}</p>
        <ul class="feats">${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
        <ul class="tags">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
        <div class="links">
          ${p.live ? `<a class="btn sm solid" href="${esc(p.live)}" target="_blank" rel="noopener">${esc(p.liveLabel || 'Live demo')} ${arrow}</a>` : '<span class="note">Runs locally — demo on request</span>'}
          ${repoUrl(p) ? `<a class="btn sm" href="${esc(repoUrl(p))}" target="_blank" rel="noopener">Source code ${arrow}</a>` : ''}
        </div>
      </div>`;
    if (modal.showModal) modal.showModal(); else modal.setAttribute('open', '');
  };
  document.addEventListener('click', (e) => { const o = e.target.closest('[data-open]'); if (o) open(o.dataset.open); });
  $('#modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });

  /* skills */
  const SKILLS = [
    ['Frontend', ['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript', 'Vite', 'Responsive & RTL layouts']],
    ['Backend', ['Python', 'Flask', 'SQLAlchemy', 'REST endpoints', 'Jinja2', 'pytest']],
    ['Data', ['SQLite', 'MySQL', 'PostgreSQL', 'Excel & PDF exports']],
    ['Integrations', ['Groq', 'Gemini', 'Gradio', 'Decart AI', 'Paymob & Fawry', 'Chart.js']],
    ['Shipping', ['Git & GitHub', 'Surge', 'Docker', 'Render']],
  ];
  $('#skilllist').innerHTML = SKILLS.map(([g, items]) => `
    <div class="sgroup" data-reveal><h3>${esc(g)}</h3><ul class="tags big">${items.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>`).join('');

  /* marquee */
  const tech = ['React', 'TypeScript', 'Flask', 'Python', 'Vite', 'JavaScript', 'SQLAlchemy', 'Bootstrap', 'Chart.js', 'Gemini', 'Groq', 'Arabic RTL', 'MySQL', 'pytest'];
  const run = tech.map((t) => `<span>${esc(t)}</span>`).join('');
  $('#marquee').innerHTML = `<div class="track">${run}${run}</div>`;

  /* contact */
  const links = [
    CONFIG.email && ['Email', `mailto:${CONFIG.email}`],
    CONFIG.github && ['GitHub', `https://github.com/${CONFIG.github}`],
    CONFIG.linkedin && ['LinkedIn', CONFIG.linkedin],
  ].filter(Boolean);
  $('#socials').innerHTML = links.map(([l, h]) => `<a class="btn" href="${esc(h)}" ${h.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${esc(l)} ${arrow}</a>`).join('');
  $('#mail').textContent = CONFIG.email;
  $('#copy').addEventListener('click', async () => {
    const b = $('#copy');
    try { await navigator.clipboard.writeText(CONFIG.email); b.textContent = 'Copied'; }
    catch { b.textContent = 'Select & copy'; getSelection().selectAllChildren($('#mail')); }
    setTimeout(() => (b.textContent = 'Copy'), 1800);
  });

  /* rotating words */
  const words = ['luxury storefronts', 'bilingual RTL apps', 'Flask platforms', 'AI try-on experiences', 'inventory systems'];
  const rot = $('#rotator');
  if (!reduce) {
    let w = 0, c = words[0].length, del = true;
    const tick = () => {
      const word = words[w];
      c += del ? -1 : 1;
      rot.textContent = word.slice(0, c);
      let wait = del ? 34 : 64;
      if (!del && c === word.length) { del = true; wait = 2000; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 280; }
      setTimeout(tick, wait);
    };
    setTimeout(tick, 3800);
  }

  /* reveal on scroll */
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  $$('[data-reveal]').forEach((el, i) => { el.style.setProperty('--d', `${(i % 4) * 70}ms`); io.observe(el); });

  /* count-up stats */
  const cio = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target, n = +el.dataset.count, t0 = performance.now();
    const step = (t) => { const k = Math.min(1, (t - t0) / 1100); el.textContent = Math.round(n * (1 - (1 - k) ** 3)); if (k < 1) requestAnimationFrame(step); };
    if (!reduce) requestAnimationFrame(step);
    cio.unobserve(el);
  }), { threshold: 0.6 });
  $$('[data-count]').forEach((el) => cio.observe(el));

  /* header: shadow when scrolled, active section link, progress bar */
  const head = $('#top'), bar = $('#progress');
  const navLinks = $$('.nav a[href^="#"]');
  const onScroll = () => {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    head.classList.toggle('solid', y > 40);
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    let cur = '';
    $$('main > section[id]').forEach((s) => { if (s.getBoundingClientRect().top < innerHeight * 0.45) cur = s.id; });
    navLinks.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === `#${cur}`));
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* mobile menu */
  const tog = $('#menu');
  tog.addEventListener('click', () => { const o = head.classList.toggle('open'); tog.setAttribute('aria-expanded', o); });
  $$('.nav a').forEach((a) => a.addEventListener('click', () => { head.classList.remove('open'); tog.setAttribute('aria-expanded', 'false'); }));

  /* desktop-only: 3D tilt cards, magnetic buttons, custom cursor */
  if (fine && !reduce) {
    $$('.shot').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--rx', `${(0.5 - y) * 10}deg`); el.style.setProperty('--ry', `${(x - 0.5) * 12}deg`);
        el.style.setProperty('--gx', `${x * 100}%`); el.style.setProperty('--gy', `${y * 100}%`);
      });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
    });
    $$('.magnet').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      el.addEventListener('pointerleave', () => (el.style.transform = ''));
    });
    const dot = $('#cursor'), ring = $('#ring');
    let mx = -100, my = -100, rx = -100, ry = -100;
    addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px, ${my}px)`; }, { passive: true });
    document.addEventListener('pointerover', (e) => ring.classList.toggle('big', !!e.target.closest('a, button')));
    const follow = () => { rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16; ring.style.transform = `translate(${rx}px, ${ry}px)`; requestAnimationFrame(follow); };
    document.documentElement.classList.add('cursor-on');
    follow();
  }

  /* loader */
  const loader = $('#loader'), pct = $('#pct');
  const done = () => { document.documentElement.classList.add('ready'); setTimeout(() => loader.remove(), 900); };
  if (reduce) done();
  else {
    const t0 = performance.now();
    const step = (t) => { const k = Math.min(1, (t - t0) / 1100); pct.textContent = Math.round(100 * (1 - (1 - k) ** 2)); if (k < 1) requestAnimationFrame(step); else done(); };
    requestAnimationFrame(step);
  }
}
