# How to add a new project

1. **Pick an id** — short, lowercase, dashes: e.g. `battery-cold-plate`.

2. **Media**
   - Put figures (PNG/JPG) in a folder and add an entry to `IMG` in `_src/build_assets.py`,
     or simply save WebP/JPG files yourself into `assets/img/projects/battery-cold-plate/`.
   - Videos: MP4 (H.264), ideally < 20 MB, into `assets/video/`. Add it to `VID` in
     `build_assets.py` to get a poster frame automatically, then run `python _src/build_assets.py`.

3. **Data** — open `assets/js/projects-data.js`, copy an existing block inside `window.PROJECTS`
   and edit it:

```js
{
  id: "battery-cold-plate",
  featured: false,                    // true = shown big on the home page (keep 3)
  category: "thermal",                // key from window.CATEGORIES
  status: "demo",                     // published | accepted | under-review | submitted | in-progress | demo
  year: 2026,
  title:   { en: "…", vi: "…" },
  summary: { en: "One or two sentences: the problem and the result.", vi: "…" },
  cover: "assets/img/projects/battery-cold-plate/cover.webp",   // optional — a generated pattern is used otherwise
  video: "assets/video/battery.mp4",  poster: "assets/video/battery.webp",  // optional
  solver: "chtMultiRegionFoam",
  physics: ["Conjugate heat transfer", "Laminar flow"],
  metrics: [{ v: "−12 °C", en: "peak cell temperature", vi: "nhiệt độ cell đỉnh" }],   // optional
  sections: [
    { h: { en: "The problem", vi: "Bài toán" },
      p: { en: "…", vi: "…" },
      img: [{ src: "cover.webp", cap: "Caption shown under the figure." }] }   // paths relative to the project folder
  ],
  publication: "Optional reference text."
},
```

4. Add the new URL to `sitemap.xml` (`https://opensource-cfd.com/project.html?id=battery-cold-plate`).

5. Check locally (`python -m http.server 8000`), then commit and push — GitHub Pages updates in about a minute.

**Writing tips that convert:** lead with the client's problem, give one concrete number, show one
validation figure, and say who the result is useful for (`client` field).
