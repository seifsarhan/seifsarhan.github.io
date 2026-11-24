/* UI for the portfolio. Projects and contact details live in js/data.js. */
{
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const repoUrl = (p) => (CONFIG.github && p.repo ? `https://github.com/${CONFIG.github}/${p.repo}` : '');
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
  const pad = (n) => String(n).padStart(2, '0');

  /* identity */
  document.title = `${CONFIG.name} — ${CONFIG.role}`;
  $$('[data-name]').forEach((el) => (el.textContent = CONFIG.name));
  $('#year').textContent = new Date().getFullYear();
  const [first, ...rest] = CONFIG.name.split(' ');
  const rows = $$('.name .row');
  rows[0].textContent = first; rows[1].textContent = rest.join(' ') || first;
  $('.name').setAttribute('aria-label', CONFIG.name);

  /* split hero name into letters */
  let li = 0;
  $$('[data-split]').forEach((row) => {
    row.innerHTML = [...row.textContent].map((ch) => `<span class="ch" style="--i:${li++}">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`).join('');
  });

  /* telemetry */
  const tele = [
    ['Projects', PROJECTS.length],
    ['Live demos', PROJECTS.filter((p) => p.live).length],
    ['Bilingual builds', PROJECTS.filter((p) => p.bilingual).length],
    ['Certificates', CERTS.length],
  ];
  $('#tele').innerHTML = tele.map(([l, n]) => `<li><small>${esc(l)}</small><b data-count="${n}">${pad(n)}</b></li>`).join('');

  /* ticker */
  const tech = ['React', 'TypeScript', 'Flask', 'Python', 'Vite', 'JavaScript', 'SQLAlchemy', 'Arabic RTL', 'Gemini', 'Groq', 'Paymob', 'pytest', 'Chart.js', 'MySQL'];
  const run = tech.map((t) => `<span>${esc(t)}</span>`).join('');
  $('#ticker').innerHTML = run + run;

  /* statement words */
  const stmt = $('#stmt');
  const wrapWords = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.append(part);
          else { const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.append(s); }
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) { n.classList.add('w'); }
    });
  };
  wrapWords(stmt);
  const words = $$('.w', stmt);

  /* projects */
  const status = (p) => (p.live ? `<span class="status live"><i></i>Live</span>` : `<span class="status"><i></i>Runs locally</span>`);
  const card = (p) => `
    <article class="card" data-cat="${p.cat}">
      <div class="card-in">
        <button type="button" class="shot" data-open="${p.id}" data-cursor aria-label="Open details for ${esc(p.title)}">
          <img src="assets/projects/${p.id}.webp" alt="Home page of ${esc(p.title)}" loading="lazy" width="1280" height="800">
        </button>
        <div class="card-body">
          <div class="card-top">${status(p)}<span class="status">${esc(CATS[p.cat] || '')}</span></div>
          <h3>${esc(p.title)}</h3>
          <p class="kind">${esc(p.kind)}</p>
          <p class="blurb">${esc(p.blurb)}</p>
          <ul class="tags">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
          <div class="links">
            ${p.live ? `<a class="btn lime sm" href="${esc(p.live)}" target="_blank" rel="noopener">${esc(p.liveLabel || 'Live demo')} ${arrow}</a>` : ''}
            ${repoUrl(p) ? `<a class="btn sm" href="${esc(repoUrl(p))}" target="_blank" rel="noopener">Code ${arrow}</a>` : ''}
            <button type="button" class="btn sm" data-open="${p.id}">Details</button>
          </div>
        </div>
      </div>
    </article>`;
  const track = $('#track');
  track.innerHTML = PROJECTS.map(card).join('');

  const used = new Set(PROJECTS.map((p) => p.cat));
  $('#filters').innerHTML = Object.entries(CATS).filter(([k]) => k === 'all' || used.has(k))
    .map(([k, l], i) => `<button type="button" class="chip${i ? '' : ' on'}" data-cat="${k}" aria-pressed="${!i}">${esc(l)}</button>`).join('');
  $('#filters').addEventListener('click', (e) => {
    const b = e.target.closest('.chip'); if (!b) return;
    $$('.chip').forEach((c) => { c.classList.toggle('on', c === b); c.setAttribute('aria-pressed', c === b); });
    $$('.card').forEach((c) => { c.hidden = !(b.dataset.cat === 'all' || c.dataset.cat === b.dataset.cat); });
    layout();
    if (hz) scrollTo({ top: work.offsetTop, behavior: reduce ? 'auto' : 'smooth' });
    countCards();
  });
  const countCards = () => { $('#wcount').textContent = `${pad($$('.card:not([hidden])').length)} projects`; };
  countCards();

  /* modal */
  const modal = $('#modal');
  const open = (id) => {
    const p = PROJECTS.find((x) => x.id === id); if (!p) return;
    $('#modal-body').innerHTML = `
      <img src="assets/projects/${p.id}.webp" alt="Home page of ${esc(p.title)}" width="1280" height="800">
      <div class="mtext">
        ${status(p)}
        <h3 id="modal-title">${esc(p.title)}</h3>
        <p class="kind">${esc(p.kind)}</p>
        <p>${esc(p.blurb)}</p>
        <ul class="feats">${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
        <ul class="tags">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
        <div class="links">
          ${p.live ? `<a class="btn lime sm" href="${esc(p.live)}" target="_blank" rel="noopener">${esc(p.liveLabel || 'Live demo')} ${arrow}</a>` : '<span class="note">Runs locally — demo on request</span>'}
          ${repoUrl(p) ? `<a class="btn sm" href="${esc(repoUrl(p))}" target="_blank" rel="noopener">Source code ${arrow}</a>` : ''}
        </div>
      </div>`;
    if (modal.showModal) modal.showModal(); else modal.setAttribute('open', '');
  };
  document.addEventListener('click', (e) => { const o = e.target.closest('[data-open]'); if (o) open(o.dataset.open); });
  $('#modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });

  /* toolbox */
  $('#tower').innerHTML = SKILLS.map(([g, items]) => `<div class="trow" data-reveal><h3>${esc(g)}</h3><ul class="tags">${items.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>`).join('');

  /* CV, agency and identity links */
  $$('.cvbtn').forEach((a) => { if (CONFIG.cv) a.href = CONFIG.cv; else a.remove(); });
  $('#fullName').textContent = CONFIG.fullName || CONFIG.name;
  $('#locPill').textContent = `${CONFIG.location}${CONFIG.remote ? ' · Open to remote' : ''}`;
  if (CONFIG.agency && CONFIG.agency.url) {
    [$('#agencyPill'), $('#agencyLink')].forEach((a) => { a.href = CONFIG.agency.url; a.target = '_blank'; a.rel = 'noopener'; });
    $('#agencyLink').textContent = CONFIG.agency.name; $('#agencyPill').textContent = `Founder, ${CONFIG.agency.name}`;
  }

  /* journey */
  $('#laps').innerHTML = JOURNEY.map((j) => `
    <li class="lap" data-reveal>
      <span class="when">${esc(j.when)}</span>
      <div class="what">
        <h3>${esc(j.role)}</h3>
        <p class="org">${j.url ? `<a href="${esc(j.url)}" target="_blank" rel="noopener">${esc(j.org)}</a>` : esc(j.org)}${j.note ? ` <span>· ${esc(j.note)}</span>` : ''}</p>
        ${j.points.length ? `<ul>${j.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      </div>
    </li>`).join('');
  $('#edu').innerHTML = `<p class="pill">Education</p><h3>${esc(EDUCATION.degree)}</h3><p class="org">${esc(EDUCATION.school)} · ${esc(EDUCATION.year)}</p><ul class="tags">${EDUCATION.coursework.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>`;

  /* certificates */
  $('#cabinet').innerHTML = CERTS.map((c) => `
    <article class="card trophy" data-reveal>
      <div class="card-in">
        ${c.img
          ? `<button type="button" class="shot cert" data-cert="${c.id}" data-cursor aria-label="View ${esc(c.title)} certificate"><img src="${esc(c.img)}" alt="${esc(c.title)} certificate" loading="lazy"></button>`
          : `<div class="shot cert blank" aria-hidden="true"><span>Diploma</span><small>${esc(c.issuer)}</small></div>`}
        <div class="card-body">
          <div class="card-top"><span class="status live"><i></i>${esc(c.date)}</span></div>
          <h3>${esc(c.title)}</h3>
          <p class="kind">${esc(c.issuer)}</p>
          ${c.note ? `<p class="blurb">${esc(c.note)}</p>` : ''}
          <div class="links">
            ${c.verify ? `<a class="btn sm" href="${esc(c.verify)}" target="_blank" rel="noopener">Verify ${arrow}</a>` : ''}
            ${c.img ? `<button type="button" class="btn sm" data-cert="${c.id}">View</button>` : ''}
          </div>
        </div>
      </div>
    </article>`).join('');
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cert]'); if (!b) return;
    const c = CERTS.find((x) => x.id === b.dataset.cert); if (!c) return;
    $('#modal-body').innerHTML = `<figure class="certview"><img src="${esc(c.img)}" alt="${esc(c.title)} certificate"><figcaption><h3 id="modal-title">${esc(c.title)}</h3><p class="kind">${esc(c.issuer)} · ${esc(c.date)}</p>${c.verify ? `<a class="btn lime sm" href="${esc(c.verify)}" target="_blank" rel="noopener">Verify ${arrow}</a>` : ''}</figcaption></figure>`;
    if (modal.showModal) modal.showModal(); else modal.setAttribute('open', '');
  });

  /* contact */
  const links = [
    CONFIG.email && ['Email', `mailto:${CONFIG.email}`],
    CONFIG.whatsapp && ['WhatsApp', `https://wa.me/${CONFIG.whatsapp}`],
    CONFIG.github && ['GitHub', `https://github.com/${CONFIG.github}`],
    CONFIG.linkedin && ['LinkedIn', CONFIG.linkedin],
    CONFIG.cv && ['Download CV', CONFIG.cv],
  ].filter(Boolean);
  const linkHtml = (cls) => links.map(([l, h]) => `<a class="${cls}" href="${esc(h)}" ${h.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}${h === CONFIG.cv ? ' download' : ''}>${esc(l)} ${cls ? arrow : ''}</a>`).join(cls ? '' : ' · ');
  $('#socials').innerHTML = linkHtml('btn magnet');
  const firstSocial = $('#socials a'); if (firstSocial) firstSocial.classList.add('lime');
  $('#menuLinks').innerHTML = linkHtml('');
  $('#mail').textContent = CONFIG.email; $('#menuMail').textContent = CONFIG.email;
  if (CONFIG.phone) $('#phoneLine').innerHTML = `or call <a href="tel:${esc(CONFIG.phone.replace(/\s/g, ''))}">${esc(CONFIG.phone)}</a>`;
  $('#copy').addEventListener('click', async () => {
    const b = $('#copy');
    try { await navigator.clipboard.writeText(CONFIG.email); b.textContent = 'Copied'; }
    catch { b.textContent = 'Select & copy'; getSelection().selectAllChildren($('#mail')); }
    setTimeout(() => (b.textContent = 'Copy'), 1800);
  });

  /* menu */
  const menu = $('#menu'), mbtn = $('#menuBtn');
  const setMenu = (on) => {
    menu.classList.toggle('open', on); root.classList.toggle('menu-open', on);
    menu.setAttribute('aria-hidden', !on); mbtn.setAttribute('aria-expanded', on); mbtn.textContent = on ? 'Close' : 'Menu';
    if (on) setTimeout(() => $('a', menu).focus(), 300);
  };
  mbtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); mbtn.focus(); } });

  /* reveals */
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  $$('[data-reveal]').forEach((el, i) => { el.style.setProperty('--d', `${(i % 3) * 80}ms`); io.observe(el); });

  /* count-up telemetry */
  const countUp = () => $$('[data-count]').forEach((el) => {
    const n = +el.dataset.count, t0 = performance.now();
    const step = (t) => { const k = Math.min(1, (t - t0) / 1300); el.textContent = pad(Math.round(n * (1 - (1 - k) ** 4))); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });

  /* pinned horizontal work track */
  const work = $('#work'), bar = $('#wbar');
  let hz = false, dist = 0, x = 0, skew = 0, lastY = scrollY;
  function layout() {
    hz = innerWidth > 900 && !reduce;
    work.classList.toggle('hz', hz);
    if (!hz) { work.style.height = ''; track.style.transform = ''; return; }
    track.style.transform = 'none';
    dist = Math.max(0, track.scrollWidth - innerWidth);
    work.style.height = `${innerHeight + dist}px`;
  }
  addEventListener('resize', layout);
  layout();

  /* scroll-driven bits, one rAF loop */
  const hdr = $('#hdr');
  const themed = $$('[data-theme]');
  const frags = $$('[data-speed]');
  function frame() {
    const y = scrollY, vh = innerHeight;
    // header colour follows the section under it
    let theme = 'dark';
    for (const s of themed) { const r = s.getBoundingClientRect(); if (r.top <= 40 && r.bottom > 40) { theme = s.dataset.theme; break; } }
    hdr.classList.toggle('on-light', theme === 'light' && !menu.classList.contains('open'));
    // tuck the name away while scrolling down, bring it back on the way up
    if (Math.abs(y - lastY) > 2) hdr.classList.toggle('tuck', y > 160 && y > lastY && !menu.classList.contains('open'));
    // statement: words light up as you read down
    const r = stmt.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.25)));
    const lit = reduce ? words.length : Math.round(p * words.length * 1.1);
    words.forEach((w, i) => w.classList.toggle('lit', i < lit));
    // horizontal track + speed skew
    if (hz) {
      const wr = work.getBoundingClientRect();
      const k = dist ? Math.min(1, Math.max(0, -wr.top / dist)) : 0;
      x = -k * dist;
      const v = y - lastY;
      skew += (Math.max(-7, Math.min(7, v * 0.12)) - skew) * 0.14;
      track.style.transform = `translate3d(${x.toFixed(1)}px,0,0) skewX(${(-skew).toFixed(2)}deg)`;
      bar.style.transform = `scaleX(${k})`;
    }
    // floating fragments
    if (!reduce) frags.forEach((f) => { const fr = f.getBoundingClientRect(); f.style.setProperty('--py', `${((fr.top + fr.height / 2 - vh / 2) * +f.dataset.speed).toFixed(1)}px`); });
    lastY = y;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* desktop: cursor + magnetic buttons */
  if (fine && !reduce) {
    root.classList.add('cur');
    const dot = $('#dot');
    let mx = -100, my = -100, dx = -100, dy = -100;
    addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    document.addEventListener('pointerover', (e) => dot.classList.toggle('big', !!e.target.closest('[data-cursor]')));
    const follow = () => { dx += (mx - dx) * 0.2; dy += (my - dy) * 0.2; dot.style.transform = `translate(${dx}px, ${dy}px)`; requestAnimationFrame(follow); };
    follow();
    $$('.magnet').forEach((el) => {
      el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`; });
      el.addEventListener('pointerleave', () => (el.style.transform = ''));
    });
  }

  /* lights out: five reds, then go */
  const lights = $('#lights');
  let started = false;
  const go = () => {
    if (started) return; started = true;
    root.classList.add('go');
    countUp();
    if (lights) { lights.classList.add('out'); setTimeout(() => lights.remove(), 1100); }
    try { sessionStorage.setItem('lightsOut', '1'); } catch (e) { /* storage unavailable */ }
  };
  let seen = false;
  try { seen = sessionStorage.getItem('lightsOut') === '1'; } catch (e) { /* storage unavailable */ }
  if (!lights || reduce || seen) { if (lights) lights.remove(); go(); }
  else {
    const pods = $$('i', lights);
    pods.forEach((p, i) => setTimeout(() => p.classList.add('on'), 300 + i * 360));
    setTimeout(() => { pods.forEach((p) => p.classList.remove('on')); setTimeout(go, 220); }, 300 + 5 * 360 + 650);
    lights.addEventListener('click', go);
  }
}
