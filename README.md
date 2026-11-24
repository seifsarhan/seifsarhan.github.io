# Seif Sarhan — Portfolio

My developer portfolio, live at **https://seifsarhan.github.io**

![Portfolio preview](assets/og.jpg)

- Hand-written WebGL particle field (no libraries): about 9,000 points that morph between a planet, a wave, a double helix, a lattice cube and a torus knot as you scroll, and react to the mouse
- 3D-tilting project screens with glare, scroll reveals, a typed headline, magnetic buttons and a custom cursor
- Project filters (React, Python / Flask, HTML · CSS · JS) and a details dialog for each project
- Respects `prefers-reduced-motion`, works on phones, and has no build step

## Edit it

Everything you'd change lives at the top of [`js/main.js`](js/main.js):

- `CONFIG`: name, email, GitHub username, LinkedIn
- `PROJECTS`: one entry per project (title, repo, live URL, stack, features). Put its screenshot at `assets/projects/<id>.webp`

## Run locally

Open `index.html`, or serve the folder:

```bash
npx serve .
```
