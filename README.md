# OpenSource CFD — opensource-cfd.com

Website of **Dr. Van Quan Hoang** — open CFD research library + simulation services on OpenFOAM.

- Live: https://opensource-cfd.com
- Source: https://github.com/hvquanictu/opensource-cfd
- Everything here is open: browse the case studies, learn from them, reuse the site code.
- Need a simulation? → https://opensource-cfd.com/contact.html (free feasibility review within 24 h)

## Architecture

Plain static site — no build step, no framework, no database. It runs on GitHub Pages (free, HTTPS, custom domain) and will keep working for years without maintenance.

```
index.html            Home (marketing landing page)
projects.html         Project library with category filters
project.html?id=...   Project detail page — rendered from the project database
services.html         Engagement models, comparison table, deliverables
research.html         Publications + research lines
about.html            Founder profile
contact.html          Simulation request form
404.html
assets/
  js/config.js        ← contact e-mail, form endpoint, booking link, social links
  js/projects-data.js ← THE project database (projects, categories, publications)
  js/site.js          header/footer, EN/VI switch, rendering, form logic
  css/site.css        design tokens + all styles
  img/projects/<id>/  images per project (WebP)
  video/              videos (MP4) + poster frames (WebP)
_src/build_assets.py  helper: compress figures to WebP and copy videos
docs/ADD_PROJECT.md   how to add a new project
CNAME                 custom domain for GitHub Pages
```

## Common edits

| I want to… | Edit |
|---|---|
| Add a project | `assets/js/projects-data.js` — see [docs/ADD_PROJECT.md](docs/ADD_PROJECT.md) |
| Add a publication | `window.PUBLICATIONS` at the bottom of `projects-data.js` |
| Change e-mail / phone / booking link | `assets/js/config.js` |
| Receive form submissions by e-mail | Get a free Access Key at [web3forms.com](https://web3forms.com) (just enter your e-mail) and paste it in `formAccessKey` in `config.js` |
| Add my photo | Save `assets/img/founder.jpg`, then replace the `VQ` placeholder in `index.html` and `about.html` with `<img src="assets/img/founder.jpg" alt="">` |
| Translate text | Every element has its English text inside and Vietnamese in `data-vi="..."` |
| Change colours | Tokens at the top of `assets/css/site.css` |

## Run locally

```bash
python -m http.server 8000
```
then open http://localhost:8000

## Deploy (GitHub Pages)

1. Repository → Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.
2. Custom domain: `opensource-cfd.com` (already in `CNAME`), tick *Enforce HTTPS*.
3. At your domain registrar, add DNS records:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `hvquanictu.github.io`

## Licence

- Site code: MIT (see `LICENSE`).
- Text, images and videos: © Van Quan Hoang, shared under CC BY 4.0 — reuse with attribution.
- OpenFOAM® is a registered trademark of OpenCFD Ltd. This site is not affiliated with or endorsed by OpenCFD.
