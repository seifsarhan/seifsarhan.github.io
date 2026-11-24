/* Particle field — hand-written WebGL, no libraries.
   Thousands of points morph between 3D shapes as you scroll:
   hero → planet, work → wave, about → helix, skills → lattice cube, contact → torus knot. */
(() => {
  const canvas = document.getElementById('field');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false });
  if (!gl) { canvas.remove(); return; }

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = () => innerWidth < 760;
  const N = narrow() ? 4200 : 9000;

  // seeded random so shapes are identical on every load
  let seed = 7;
  const rnd = () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const TAU = Math.PI * 2;

  const shapes = {
    planet(i) {
      const core = Math.floor(N * 0.6);
      if (i < core) {
        const k = i + 0.5, phi = Math.acos(1 - 2 * k / core), th = Math.PI * (1 + Math.sqrt(5)) * k;
        return [Math.sin(phi) * Math.cos(th), Math.cos(phi), Math.sin(phi) * Math.sin(th)];
      }
      const t = rnd() * TAU, band = rnd(), r = band < 0.55 ? 1.36 + rnd() * 0.26 : 1.7 + rnd() * 0.28;
      let x = Math.cos(t) * r, y = (rnd() - 0.5) * 0.04, z = Math.sin(t) * r;
      const a = 0.42, c = Math.cos(a), s = Math.sin(a);
      [y, z] = [y * c - z * s, y * s + z * c];
      const b = 0.22, cb = Math.cos(b), sb = Math.sin(b);
      return [x * cb - y * sb, x * sb + y * cb, z];
    },
    wave(i) {
      const cols = Math.round(Math.sqrt(N * 1.9)), rows = Math.ceil(N / cols);
      const u = (i % cols) / (cols - 1), v = Math.floor(i / cols) / (rows - 1);
      const x = (u - 0.5) * 5.4, z = (v - 0.5) * 3.2;
      return [x, 0.28 * Math.sin(x * 1.5) + 0.22 * Math.cos(z * 2.2 + x * 0.6) - 0.15, z];
    },
    helix(i) {
      const kind = i % 4, t = rnd(), y = (t - 0.5) * 3.8, ang = y * 2.6;
      if (kind < 3) {
        const strand = kind % 2, a = ang + strand * Math.PI, j = (rnd() - 0.5) * 0.06;
        return [Math.cos(a) * 0.72 + j, y + j, Math.sin(a) * 0.72 + j];
      }
      const step = Math.round(y / 0.19) * 0.19, a2 = step * 2.6, m = rnd() * 2 - 1;
      return [Math.cos(a2) * 0.72 * m, step, Math.sin(a2) * 0.72 * m];
    },
    cube(i) {
      const s = 1.05, g = 0.35, face = i % 6, axis = face >> 1, sign = face & 1 ? 1 : -1;
      let u = (rnd() * 2 - 1) * s, v = (rnd() * 2 - 1) * s;
      if (rnd() < 0.5) u = Math.round(u / g) * g; else v = Math.round(v / g) * g;
      const p = [0, 0, 0];
      p[axis] = sign * s; p[(axis + 1) % 3] = u; p[(axis + 2) % 3] = v;
      return p;
    },
    torus(i) {
      const t = (i / N) * TAU, p = 2, q = 3, r = 0.62 * (2 + Math.cos(q * t)) / 2.2;
      const cx = r * Math.cos(p * t), cy = r * Math.sin(p * t), cz = -0.45 * Math.sin(q * t);
      const a = rnd() * TAU, w = 0.13 * Math.sqrt(rnd());
      return [cx * 1.35 + Math.cos(a) * w, cy * 1.35 + Math.sin(a) * w, cz + Math.sin(a * 1.7) * w];
    },
  };
  const cache = {};
  const build = (name) => {
    if (cache[name]) return cache[name];
    seed = 7;
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { const p = shapes[name](i); a[i * 3] = p[0]; a[i * 3 + 1] = p[1]; a[i * 3 + 2] = p[2]; }
    return (cache[name] = a);
  };

  const rand = new Float32Array(N);
  for (let i = 0; i < N; i++) rand[i] = Math.random();

  const vs = `
    attribute vec3 aFrom; attribute vec3 aTo; attribute float aRand;
    uniform float uMix, uTime, uAspect, uSize, uDpr, uOffset, uScale;
    uniform vec2 uRot, uMouse;
    varying float vAlpha, vTone;
    void main(){
      float m = clamp(uMix * 1.6 - aRand * 0.6, 0.0, 1.0);
      m = m * m * (3.0 - 2.0 * m);
      vec3 p = mix(aFrom, aTo, m);
      p += sin(m * 3.14159) * 0.35 * vec3(sin(aRand * 40.0), cos(aRand * 23.0), sin(aRand * 17.0));
      p += 0.02 * vec3(sin(uTime * 0.9 + aRand * 30.0), cos(uTime * 0.7 + aRand * 20.0), sin(uTime * 0.8 + aRand * 10.0));
      p *= uScale;
      float cy = cos(uRot.x), sy = sin(uRot.x), cx = cos(uRot.y), sx = sin(uRot.y);
      p = vec3(p.x * cy + p.z * sy, p.y, -p.x * sy + p.z * cy);
      p = vec3(p.x, p.y * cx - p.z * sx, p.y * sx + p.z * cx);
      float z = 4.2 - p.z;
      vec2 ndc = vec2(p.x * 2.25 / uAspect, p.y * 2.25) / z;
      ndc.x += uOffset;
      vec2 d = ndc - uMouse; d.x *= uAspect;
      float dist = length(d);
      ndc += (d / max(dist, 0.001)) * smoothstep(0.32, 0.0, dist) * 0.07 * vec2(1.0 / uAspect, 1.0);
      gl_Position = vec4(ndc, 0.0, 1.0);
      gl_PointSize = uSize * uDpr * (0.6 + aRand * 0.9) * (3.6 / z);
      vAlpha = clamp(1.75 - z * 0.22, 0.3, 1.0);
      vTone = aRand;
    }`;
  const fs = `
    precision mediump float;
    varying float vAlpha, vTone;
    uniform float uDim; uniform vec3 uC1, uC2, uC3;
    void main(){
      vec2 c = gl_PointCoord - 0.5; float d = length(c);
      if (d > 0.5) discard;
      float a = smoothstep(0.5, 0.05, d);
      vec3 col = vTone > 0.955 ? uC3 : mix(uC1, uC2, smoothstep(0.15, 0.95, vTone));
      gl_FragColor = vec4(col, a * vAlpha * uDim);
    }`;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.remove(); return; }
  gl.useProgram(prog);

  const attr = (name, data, size) => {
    const buf = gl.createBuffer(), loc = gl.getAttribLocation(prog, name);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    return buf;
  };
  let from = new Float32Array(build('planet')), to = build('planet');
  const bFrom = attr('aFrom', from, 3), bTo = attr('aTo', to, 3);
  attr('aRand', rand, 1);
  const U = {};
  ['uMix', 'uTime', 'uAspect', 'uSize', 'uDpr', 'uOffset', 'uScale', 'uRot', 'uMouse', 'uDim', 'uC1', 'uC2', 'uC3'].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));
  gl.uniform3f(U.uC1, 0.93, 0.92, 0.86);  // bone
  gl.uniform3f(U.uC2, 0.50, 0.88, 0.77);  // mint
  gl.uniform3f(U.uC3, 1.00, 0.42, 0.24);  // coral sparks
  gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  gl.clearColor(0, 0, 0, 0);

  let dpr = 1;
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(innerWidth * dpr); canvas.height = Math.round(innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(U.uAspect, innerWidth / innerHeight); gl.uniform1f(U.uDpr, dpr);
    gl.uniform1f(U.uSize, narrow() ? 3.4 : 4.2);
  };
  addEventListener('resize', resize); resize();

  // morph: freeze current blended positions into aFrom, then animate toward the new shape
  let mix = 1, mixStart = 0, current = 'planet';
  const ease = (r, m) => { let k = Math.min(Math.max(m * 1.6 - r * 0.6, 0), 1); return k * k * (3 - 2 * k); };
  const morph = (name) => {
    if (name === current || !shapes[name]) return;
    const next = build(name);
    for (let i = 0; i < N; i++) {
      const r = rand[i], k = ease(r, mix), sw = Math.sin(k * Math.PI) * 0.35, j = i * 3;
      from[j] = from[j] + (to[j] - from[j]) * k + sw * Math.sin(r * 40);
      from[j + 1] = from[j + 1] + (to[j + 1] - from[j + 1]) * k + sw * Math.cos(r * 23);
      from[j + 2] = from[j + 2] + (to[j + 2] - from[j + 2]) * k + sw * Math.sin(r * 17);
    }
    to = next; current = name; mix = 0; mixStart = performance.now();
    gl.bindBuffer(gl.ARRAY_BUFFER, bFrom); gl.bufferSubData(gl.ARRAY_BUFFER, 0, from);
    gl.bindBuffer(gl.ARRAY_BUFFER, bTo); gl.bufferSubData(gl.ARRAY_BUFFER, 0, to);
  };

  // per-section look: shape, horizontal offset, scale, brightness
  const looks = {
    hero: { shape: 'planet', off: 0.46, scale: 1.12, dim: 0.9 },
    work: { shape: 'wave', off: 0, scale: 1.1, dim: 0.3 },
    about: { shape: 'helix', off: 0.5, scale: 1, dim: 0.6 },
    skills: { shape: 'cube', off: 0.44, scale: 0.95, dim: 0.7 },
    contact: { shape: 'torus', off: 0, scale: 1.05, dim: 0.7 },
  };
  const state = { off: 0.46, scale: 1.12, dim: 0 };
  let look = looks.hero;
  const sections = [...document.querySelectorAll('[data-shape]')];
  const pick = () => {
    const mid = innerHeight * 0.5;
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) {
        look = looks[s.dataset.shape] || look; morph(look.shape); return;
      }
    }
  };
  addEventListener('scroll', pick, { passive: true });

  const mouse = { x: 9, y: 9, tx: 9, ty: 9, rx: 0, ry: 0 };
  addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / innerWidth) * 2 - 1; mouse.ty = -((e.clientY / innerHeight) * 2 - 1);
  }, { passive: true });
  document.addEventListener('pointerleave', () => { mouse.tx = 9; mouse.ty = 9; });

  let running = true, t0 = performance.now(), last = t0;
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) { last = performance.now(); requestAnimationFrame(frame); } });
  window.particleField = { morph, intro: () => (state.dim = 0) };

  function frame(now) {
    if (!running) return;
    const t = (now - t0) / 1000, f = Math.min(4, (now - last) / 16.7); last = now;
    const lerp = (k) => 1 - Math.pow(1 - k, f);
    if (mix < 1) mix = Math.min(1, (now - mixStart) / 1700);
    const wantOff = narrow() ? 0 : look.off, wantDim = narrow() ? look.dim * 0.65 : look.dim;
    state.off += (wantOff - state.off) * lerp(0.04);
    state.scale += ((narrow() ? look.scale * 0.8 : look.scale) - state.scale) * lerp(0.05);
    state.dim += (wantDim - state.dim) * lerp(0.035);
    const near = Math.abs(mouse.tx) < 2;
    mouse.x += ((near ? mouse.tx : 9) - mouse.x) * 0.12; mouse.y += ((near ? mouse.ty : 9) - mouse.y) * 0.12;
    mouse.rx += ((near ? mouse.tx : 0) * 0.5 - mouse.rx) * 0.04; mouse.ry += ((near ? mouse.ty : 0) * 0.3 - mouse.ry) * 0.04;
    gl.uniform1f(U.uMix, mix);
    gl.uniform1f(U.uTime, reduce ? 0 : t);
    gl.uniform1f(U.uOffset, state.off); gl.uniform1f(U.uScale, state.scale); gl.uniform1f(U.uDim, state.dim);
    gl.uniform2f(U.uRot, (reduce ? 0.6 : t * 0.11) + mouse.rx, 0.22 - mouse.ry);
    gl.uniform2f(U.uMouse, mouse.x, mouse.y);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, N);
    requestAnimationFrame(frame);
  }
  if (reduce) mix = 1;
  pick();
  requestAnimationFrame(frame);
})();
