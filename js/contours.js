/* Living topographic map — hand-written, no libraries.
   A noise height-field is traced into contour lines (marching squares) every frame.
   The terrain drifts slowly, scrolls with the page, and rises into a hill under the cursor.
   Lines are tinted per section so they read on olive, cream and black grounds. */
(() => {
  const cv = document.getElementById('topo');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- 2D Perlin noise (seeded) ---
  let s = 11;
  const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const perm = [...Array(256).keys()];
  for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
  const P = new Uint8Array(512);
  for (let i = 0; i < 512; i++) P[i] = perm[i & 255];
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const grad = (h, x, y) => { switch (h & 7) { case 0: return x + y; case 1: return -x + y; case 2: return x - y; case 3: return -x - y; case 4: return x; case 5: return -x; case 6: return y; default: return -y; } };
  const noise = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y), X = xi & 255, Y = yi & 255;
    x -= xi; y -= yi;
    const u = fade(x), v = fade(y), A = P[X] + Y, B = P[X + 1] + Y;
    const a = grad(P[A], x, y) + u * (grad(P[B], x - 1, y) - grad(P[A], x, y));
    const b = grad(P[A + 1], x, y - 1) + u * (grad(P[B + 1], x - 1, y - 1) - grad(P[A + 1], x, y - 1));
    return a + v * (b - a);
  };

  // --- sizing ---
  let W = 0, H = 0, dpr = 1, cs = 16, cols = 0, rows = 0, field = new Float32Array(0);
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cs = W < 700 ? 18 : 15;
    cols = Math.ceil(W / cs) + 1; rows = Math.ceil(H / cs) + 1;
    field = new Float32Array((cols + 1) * (rows + 1));
    dirty = true;
  };

  // --- inputs ---
  const mouse = { x: -9999, y: -9999, sx: -9999, sy: -9999, k: 0, kt: 0 };
  addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.kt = 1; if (mouse.sx < -999) { mouse.sx = mouse.x; mouse.sy = mouse.y; } }, { passive: true });
  document.addEventListener('pointerleave', () => (mouse.kt = 0));
  let dirty = true;
  addEventListener('scroll', () => (dirty = true), { passive: true });
  addEventListener('resize', resize);

  // section tints: [normal line, index line]
  const TINT = {
    dark: ['rgba(180,186,160,.13)', 'rgba(196,202,174,.26)'],
    light: ['rgba(60,66,48,.11)', 'rgba(60,66,48,.22)'],
    black: ['rgba(150,152,145,.08)', 'rgba(150,152,145,.16)'],
  };
  const sections = () => [...document.querySelectorAll('[data-theme]')];

  const LEVELS = [];
  for (let v = -0.78; v <= 0.95; v += 0.105) LEVELS.push(v);

  function compute(t) {
    const sy = scrollY * 0.35, sc = 1 / 340;
    mouse.k += (mouse.kt - mouse.k) * 0.05;
    mouse.sx += (mouse.x - mouse.sx) * 0.12; mouse.sy += (mouse.y - mouse.sy) * 0.12;
    const sig2 = 2 * 150 * 150, amp = 0.62 * mouse.k;
    let i = 0;
    for (let r = 0; r <= rows; r++) {
      const py = r * cs, ny = (py + sy) * sc;
      for (let c = 0; c <= cols; c++) {
        const px = c * cs, nx = px * sc;
        let v = noise(nx + t * 0.018, ny - t * 0.011) * 0.72 + noise(nx * 2.3 - t * 0.02, ny * 2.3 + t * 0.015) * 0.28;
        if (amp > 0.001) { const dx = px - mouse.sx, dy = py - mouse.sy; v += amp * Math.exp(-(dx * dx + dy * dy) / sig2); }
        field[i++] = v;
      }
    }
  }

  function trace(level, path) {
    const stride = cols + 1;
    for (let r = 0; r < rows; r++) {
      const y = r * cs;
      for (let c = 0; c < cols; c++) {
        const i = r * stride + c;
        const a = field[i], b = field[i + 1], d = field[i + stride], e = field[i + stride + 1];
        const idx = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (e > level ? 2 : 0) | (d > level ? 1 : 0);
        if (idx === 0 || idx === 15) continue;
        const x = c * cs;
        // edge crossing points: top, right, bottom, left
        const tx = x + cs * (level - a) / (b - a), ry = y + cs * (level - b) / (e - b);
        const bx = x + cs * (level - d) / (e - d), ly = y + cs * (level - a) / (d - a);
        switch (idx) {
          case 1: case 14: path.moveTo(x, ly); path.lineTo(bx, y + cs); break;
          case 2: case 13: path.moveTo(bx, y + cs); path.lineTo(x + cs, ry); break;
          case 3: case 12: path.moveTo(x, ly); path.lineTo(x + cs, ry); break;
          case 4: case 11: path.moveTo(tx, y); path.lineTo(x + cs, ry); break;
          case 6: case 9: path.moveTo(tx, y); path.lineTo(bx, y + cs); break;
          case 7: case 8: path.moveTo(x, ly); path.lineTo(tx, y); break;
          case 5: path.moveTo(x, ly); path.lineTo(tx, y); path.moveTo(bx, y + cs); path.lineTo(x + cs, ry); break;
          case 10: path.moveTo(x, ly); path.lineTo(bx, y + cs); path.moveTo(tx, y); path.lineTo(x + cs, ry); break;
        }
      }
    }
  }

  function draw(t) {
    compute(t);
    const thin = new Path2D(), bold = new Path2D();
    LEVELS.forEach((lv, n) => trace(lv, n % 4 === 2 ? bold : thin));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    for (const sec of sections()) {
      const r = sec.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= H) continue;
      const tint = TINT[sec.dataset.theme] || TINT.dark;
      ctx.save();
      ctx.beginPath(); ctx.rect(0, Math.max(0, r.top), W, Math.min(H, r.bottom) - Math.max(0, r.top)); ctx.clip();
      ctx.strokeStyle = tint[0]; ctx.stroke(thin);
      ctx.strokeStyle = tint[1]; ctx.stroke(bold);
      ctx.restore();
    }
  }

  resize();
  let last = 0, t0 = performance.now(), running = true;
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) requestAnimationFrame(loop); });
  function loop(now) {
    if (!running) return;
    const moving = !reduce || dirty || Math.abs(mouse.x - mouse.sx) > 0.5 || Math.abs(mouse.kt - mouse.k) > 0.01;
    if (moving && now - last > 32) { last = now; dirty = false; draw(reduce ? 0 : (now - t0) / 1000); }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
