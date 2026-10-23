/* OpenSource CFD — shared behaviour: header/footer, EN/VI switch, project rendering, contact form.
   Translation rule: write English in the HTML and the Vietnamese version in a `data-vi` attribute
   on the same element (`data-vi-ph` for placeholders). The switch swaps them. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* ---------------- language ---------------- */
  function getLang() {
    var l = null;
    try { l = localStorage.getItem("lang"); } catch (e) {}
    if (l === "en" || l === "vi") return l;
    return (navigator.language || "").toLowerCase().indexOf("vi") === 0 ? "vi" : "en";
  }
  var LANG = getLang();
  window.LANG = LANG;
  var t = function (o) { return o ? (o[LANG] || o.en || "") : ""; };
  window.tr = t;

  function applyLang() {
    document.documentElement.lang = LANG;
    $$("[data-vi]").forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      el.innerHTML = LANG === "vi" ? el.dataset.vi : el.dataset.en;
    });
    $$("[data-vi-ph]").forEach(function (el) {
      if (el.dataset.enPh === undefined) el.dataset.enPh = el.placeholder;
      el.placeholder = LANG === "vi" ? el.dataset.viPh : el.dataset.enPh;
    });
    $$("[data-vi-pop]").forEach(function (el) {
      if (el.dataset.enPop === undefined) el.dataset.enPop = el.dataset.pop;
      el.dataset.pop = LANG === "vi" ? el.dataset.viPop : el.dataset.enPop;
    });
    var b = $("#langBtn"); if (b) b.textContent = LANG === "vi" ? "EN" : "VI";
  }
  function setLang(l) {
    LANG = l; window.LANG = l;
    try { localStorage.setItem("lang", l); } catch (e) {}
    applyLang();
    document.dispatchEvent(new Event("langchange"));
  }

  /* ---------------- header & footer ---------------- */
  var NAV = [
    ["index.html", "Home", "Trang chủ"],
    ["projects.html", "Projects", "Dự án"],
    ["services.html", "Services", "Dịch vụ"],
    ["research.html", "Research", "Nghiên cứu"],
    ["about.html", "About", "Giới thiệu"]
  ];
  var LOGO = '<img class="brand-mark" src="assets/img/logo-mark.webp" width="34" height="34" alt="">';

  function header() {
    var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (here === "project.html") here = "projects.html";
    var links = NAV.map(function (n) {
      return '<a href="' + n[0] + '"' + (here === n[0] ? ' class="active"' : "") + ' data-vi="' + n[2] + '">' + n[1] + "</a>";
    }).join("");
    var h = document.createElement("header");
    h.className = "site-header";
    h.innerHTML =
      '<div class="wrap nav">' +
      '<a class="brand" href="index.html">' + LOGO + '<span>OpenSource CFD<small>SIMULATION · RESEARCH · OPEN</small></span></a>' +
      '<nav class="nav-links" id="navLinks">' + links + '<a href="contact.html" class="mobile-only" data-vi="Liên hệ">Contact</a></nav>' +
      '<div class="nav-right"><button class="lang" id="langBtn" aria-label="Switch language">VI</button>' +
      '<a class="btn btn-primary btn-sm" href="contact.html" data-vi="Yêu cầu báo giá">Request a quote</a>' +
      '<button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button></div></div>';
    document.body.prepend(h);
    $("#burger").addEventListener("click", function () { $("#navLinks").classList.toggle("open"); });
    $("#langBtn").addEventListener("click", function () { setLang(LANG === "vi" ? "en" : "vi"); });
    var onScroll = function () { h.classList.toggle("solid", window.scrollY > 30); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  function footer() {
    var f = document.createElement("footer");
    f.className = "site-footer";
    var y = new Date().getFullYear();
    f.innerHTML =
      '<div class="wrap"><div class="foot-grid">' +
      '<div><a class="brand" href="index.html">' + LOGO + '<span>OpenSource CFD</span></a>' +
      '<p data-vi="Mô phỏng CFD trình độ tiến sĩ trên nền tảng mã nguồn mở. Kiểm chứng với thực nghiệm, bàn giao đầy đủ case file.">PhD-level CFD on open-source software. Validated against experiments, delivered with every case file.</p></div>' +
      '<div><h4 data-vi="Khám phá">Explore</h4><a href="projects.html" data-vi="Dự án">Projects</a><a href="services.html" data-vi="Dịch vụ">Services</a><a href="research.html" data-vi="Nghiên cứu">Research</a><a href="about.html" data-vi="Giới thiệu">About</a></div>' +
      '<div><h4 data-vi="Làm việc cùng">Work with us</h4><a href="contact.html" data-vi="Yêu cầu báo giá">Request a quote</a><a href="contact.html?type=review" data-vi="Đánh giá khả thi miễn phí">Free feasibility review</a><a href="services.html#training" data-vi="Đào tạo OpenFOAM">OpenFOAM training</a></div>' +
      '<div><h4 data-vi="Liên hệ">Contact</h4>' +
      (S.email ? '<a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a>" : "") +
      (S.phone ? '<a href="tel:' + esc(S.phone.replace(/\s/g, "")) + '">' + esc(S.phone) + "</a>" : "") +
      (S.github ? '<a href="' + esc(S.github) + '" target="_blank" rel="noopener">GitHub</a>' : "") +
      (S.scholar ? '<a href="' + esc(S.scholar) + '" target="_blank" rel="noopener">Google Scholar</a>' : "") +
      (S.linkedin ? '<a href="' + esc(S.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>' : "") +
      "</div></div>" +
      '<div class="foot-bottom"><span>© ' + y + " " + esc(S.owner || "") + " · opensource-cfd.com</span>" +
      '<span data-vi="Mã nguồn website: MIT · Nội dung: CC BY 4.0 · OpenFOAM® là thương hiệu của OpenCFD Ltd.">Site code MIT · Content CC BY 4.0 · OpenFOAM® is a trademark of OpenCFD Ltd.</span></div>' +
      (S.gaId ? '<p class="foot-note" data-vi="Website dùng Google Analytics để thống kê lượt truy cập ẩn danh (quốc gia, trang được xem). Không lưu tên hay e-mail của bạn.">This site uses Google Analytics for anonymous visit statistics (country, pages viewed). Your name and e-mail are not collected.</p>' : "") + '</div>';
    document.body.appendChild(f);

    var s = document.createElement("div");
    s.className = "sticky-cta";
    s.innerHTML = '<a class="btn btn-primary" href="contact.html?type=review" data-vi="Đánh giá khả thi miễn phí →">Free feasibility review →</a>';
    if (!/contact\.html$/.test(location.pathname)) {
      document.body.appendChild(s);
      window.addEventListener("scroll", function () { s.classList.toggle("show", window.scrollY > 600); }, { passive: true });
    }
  }

  /* ---------------- generative cover for projects without images ---------------- */
  function genCover(seed) {
    var h = 0; for (var i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    var r = function () { h = (h * 1664525 + 1013904223) >>> 0; return h / 4294967296; };
    var paths = "";
    for (var k = 0; k < 14; k++) {
      var y0 = 20 + k * 12, a = 6 + r() * 14, f = 0.012 + r() * 0.02, ph = r() * 6, d = "M0 " + y0;
      for (var x = 0; x <= 400; x += 10) d += " L" + x + " " + (y0 + a * Math.sin(x * f + ph + k * 0.4)).toFixed(1);
      paths += '<path d="' + d + '" stroke="url(#g' + seed.length + ')" stroke-width="1.6" fill="none" opacity="' + (0.35 + 0.6 * k / 14).toFixed(2) + '"/>';
    }
    return '<svg class="gen" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g' + seed.length + '" x1="0" x2="1"><stop stop-color="#2f6bff"/><stop offset=".28" stop-color="#22d3ee"/><stop offset=".52" stop-color="#34e39a"/><stop offset=".76" stop-color="#facc15"/><stop offset="1" stop-color="#f97316"/></linearGradient></defs><rect width="400" height="250" fill="#061024"/>' + paths + "</svg>";
  }
  window.genCover = genCover;

  var STATUS = {
    published: { en: "Published", vi: "Đã xuất bản" },
    accepted: { en: "Accepted", vi: "Đã chấp nhận" },
    "under-review": { en: "Under review", vi: "Đang phản biện" },
    submitted: { en: "Submitted", vi: "Đã nộp" },
    "in-progress": { en: "In progress", vi: "Đang thực hiện" },
    demo: { en: "Showcase", vi: "Trình diễn" }
  };
  window.STATUS = STATUS;

  function media(p) {
    if (p.cover) return '<img loading="lazy" src="' + esc(p.cover) + '" alt="' + esc(t(p.title)) + '">';
    return genCover(p.id);
  }

  function card(p) {
    var cat = (window.CATEGORIES || {})[p.category];
    return '<a class="pcard reveal" href="project.html?id=' + encodeURIComponent(p.id) + '">' +
      '<div class="pcard-media">' + media(p) +
      '<span class="badge ' + esc(p.status) + '">' + esc(t(STATUS[p.status])) + "</span>" +
      (p.video ? '<span class="play" aria-hidden="true"></span>' : "") + "</div>" +
      '<div class="pcard-body"><span class="pcard-cat">' + esc(t(cat)) + " · " + esc(p.year) + "</span>" +
      "<h3>" + esc(t(p.title)) + "</h3><p>" + esc(t(p.summary)) + "</p>" +
      '<div class="tags">' + (p.physics || []).slice(0, 3).map(function (x) { return '<span class="tag">' + esc(x) + "</span>"; }).join("") + "</div>" +
      '<span class="more">' + (LANG === "vi" ? "Xem chi tiết" : "View project") + "</span></div></a>";
  }
  window.projectCard = card;

  function featureBlock(p) {
    var m = p.video
      ? '<video src="' + esc(p.video) + '" poster="' + esc(p.poster || p.cover || "") + '" autoplay muted loop playsinline preload="metadata"></video>'
      : '<img src="' + esc(p.cover) + '" alt="">';
    return '<div class="feature reveal"><div class="feature-media">' + m + "</div>" +
      '<div class="feature-body"><span class="pcard-cat">' + esc(t(window.CATEGORIES[p.category])) + "</span>" +
      "<h3>" + esc(t(p.title)) + '</h3><p class="muted">' + esc(t(p.summary)) + "</p>" +
      '<div class="metrics">' + (p.metrics || []).map(function (m) { return '<div class="metric"><b class="grad-text">' + esc(m.v) + "</b><span>" + esc(t(m)) + "</span></div>"; }).join("") + "</div>" +
      '<div class="btn-row"><a class="btn btn-ghost btn-sm" href="project.html?id=' + p.id + '">' + (LANG === "vi" ? "Xem nghiên cứu đầy đủ" : "Read the full case study") + ' <span class="arr">→</span></a></div></div></div>';
  }

  /* ---------------- page renderers ---------------- */
  function renderFeatured() {
    var el = $("#featured"); if (!el || !window.PROJECTS) return;
    var f = window.PROJECTS.filter(function (p) { return p.featured; });
    el.innerHTML = f.slice(0, 1).map(featureBlock).join("") +
      '<div class="grid g2">' + f.slice(1).map(card).join("") + "</div>";
  }
  function renderLatest() {
    var el = $("#latest"); if (!el || !window.PROJECTS) return;
    el.innerHTML = window.PROJECTS.filter(function (p) { return !p.featured; }).slice(0, 3).map(card).join("");
  }

  var currentFilter = "all";
  function renderProjects() {
    var el = $("#projectGrid"); if (!el) return;
    var fl = $("#filters");
    var cats = Object.keys(window.CATEGORIES).filter(function (c) { return window.PROJECTS.some(function (p) { return p.category === c; }); });
    fl.innerHTML = '<button class="filter' + (currentFilter === "all" ? " on" : "") + '" data-f="all">' + (LANG === "vi" ? "Tất cả" : "All") + " (" + window.PROJECTS.length + ")</button>" +
      cats.map(function (c) {
        var n = window.PROJECTS.filter(function (p) { return p.category === c; }).length;
        return '<button class="filter' + (currentFilter === c ? " on" : "") + '" data-f="' + c + '">' + esc(t(window.CATEGORIES[c])) + " (" + n + ")</button>";
      }).join("");
    $$(".filter", fl).forEach(function (b) {
      b.addEventListener("click", function () { currentFilter = b.dataset.f; renderProjects(); });
    });
    el.innerHTML = window.PROJECTS.filter(function (p) { return currentFilter === "all" || p.category === currentFilter; }).map(card).join("");
    reveal();
  }

  function renderDetail() {
    var el = $("#detail"); if (!el) return;
    var id = new URLSearchParams(location.search).get("id");
    var p = (window.PROJECTS || []).filter(function (x) { return x.id === id; })[0];
    if (!p) { el.innerHTML = '<div class="wrap" style="padding:200px 24px"><h1>Project not found</h1><p class="lead"><a href="projects.html">← All projects</a></p></div>'; return; }
    document.title = t(p.title) + " — OpenSource CFD";
    var md = document.querySelector('meta[name="description"]'); if (md) md.content = t(p.summary);
    var base = "assets/img/projects/" + p.id + "/";
    var hero = p.video
      ? '<video src="' + esc(p.video) + '" poster="' + esc(p.poster || "") + '" controls autoplay muted loop playsinline></video>'
      : (p.cover ? '<img src="' + esc(p.cover) + '" alt="">' : genCover(p.id));
    var secs = (p.sections || []).map(function (s) {
      var imgs = (s.img || []);
      return "<section><h2>" + esc(t(s.h)) + "</h2><p>" + esc(t(s.p)) + "</p>" +
        (imgs.length ? '<div class="figs' + (imgs.length === 1 ? " one" : "") + '">' + imgs.map(function (i) {
          return '<figure class="fig"><img loading="lazy" src="' + esc(base + i.src) + '" alt="' + esc(i.cap) + '"><figcaption>' + esc(i.cap) + "</figcaption></figure>";
        }).join("") + "</div>" : "") + "</section>";
    }).join("");
    var extraV = (p.gallery_videos || []).map(function (v) {
      return '<section><div class="detail-hero" style="margin:0"><video src="' + esc(v.src) + '" poster="' + esc(v.poster || "") + '" controls muted loop playsinline preload="metadata"></video></div><p class="muted" style="margin-top:10px;font-size:.9rem">' + esc(v.cap || "") + "</p></section>";
    }).join("");
    var vi = LANG === "vi";
    el.innerHTML =
      '<div class="page-head" style="padding-bottom:40px"><div class="wrap">' +
      '<div class="crumbs"><a href="projects.html">' + (vi ? "Dự án" : "Projects") + "</a> / " + esc(t(window.CATEGORIES[p.category])) + "</div>" +
      "<h1>" + esc(t(p.title)) + '</h1><p class="lead">' + esc(t(p.summary)) + "</p></div></div>" +
      '<div class="wrap"><div class="detail-hero">' + hero + "</div>" +
      (p.metrics ? '<div class="metrics" style="margin-bottom:56px;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">' + p.metrics.map(function (m) { return '<div class="card metric"><b class="grad-text" style="font-size:2rem">' + esc(m.v) + "</b><span>" + esc(t(m)) + "</span></div>"; }).join("") + "</div>" : "") +
      '<div class="detail-grid"><div class="detail-main">' + secs + extraV +
      (p.publication ? '<section><h2>' + (vi ? "Công bố" : "Publication") + '</h2><div class="pub-box">' + esc(p.publication) + "</div></section>" : "") +
      "</div><aside class=\"side\">" +
      '<div class="card kv">' +
      '<div><span>' + (vi ? "Trạng thái" : "Status") + "</span><b>" + esc(t(STATUS[p.status])) + " · " + esc(p.year) + "</b></div>" +
      (p.solver ? "<div><span>" + (vi ? "Bộ giải" : "Solver") + "</span><b>" + esc(p.solver) + "</b></div>" : "") +
      (p.physics ? "<div><span>" + (vi ? "Vật lý" : "Physics") + '</span><div class="tags">' + p.physics.map(function (x) { return '<span class="tag">' + esc(x) + "</span>"; }).join("") + "</div></div>" : "") +
      (p.client ? "<div><span>" + (vi ? "Hữu ích cho" : "Useful for") + "</span><b>" + esc(t(p.client)) + "</b></div>" : "") +
      "</div>" +
      '<div class="card" style="border-color:var(--cold)"><h3 style="font-size:1.15rem">' + (vi ? "Bạn có bài toán tương tự?" : "Have a similar problem?") + "</h3>" +
      '<p style="margin:8px 0 18px">' + (vi ? "Gửi mô tả ngắn — nhận đánh giá khả thi miễn phí trong 24 giờ." : "Send a short description — get a free feasibility review within 24 hours.") + "</p>" +
      '<a class="btn btn-primary btn-sm" style="width:100%" href="contact.html?ref=' + encodeURIComponent(p.id) + '">' + (vi ? "Bắt đầu" : "Start the conversation") + ' <span class="arr">→</span></a></div>' +
      "</aside></div>" +
      '<div class="section tight"><h2 style="font-size:1.6rem;margin-bottom:26px">' + (vi ? "Dự án khác" : "More projects") + '</h2><div class="grid g3">' +
      window.PROJECTS.filter(function (x) { return x.id !== p.id; }).slice(0, 3).map(card).join("") + "</div></div></div>";
    $$(".fig img", el).forEach(function (img) { img.addEventListener("click", function () { lightbox(img.src); }); });
    reveal();
  }

  function renderPubs() {
    var el = $("#pubs"); if (!el || !window.PUBLICATIONS) return;
    el.innerHTML = window.PUBLICATIONS.map(function (b) {
      return '<div class="card pub reveal"><span class="y">' + b.year + "</span><div><h3>" + esc(b.title) + '</h3><div class="v">' + esc(b.authors) + " · <i>" + esc(b.venue) + "</i>" + (b.q ? " · " + esc(b.q) : "") +
        (b.project ? ' · <a href="project.html?id=' + b.project + '" style="color:var(--cold)">' + (LANG === "vi" ? "dự án" : "project") + " →</a>" : "") +
        '</div></div><span class="st">' + esc(b.status) + "</span></div>";
    }).join("");
  }

  /* ---------------- lightbox ---------------- */
  var lb;
  function lightbox(src) {
    if (!lb) {
      lb = document.createElement("div"); lb.className = "lightbox"; lb.innerHTML = "<img alt=''>";
      lb.addEventListener("click", function () { lb.classList.remove("on"); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") lb.classList.remove("on"); });
      document.body.appendChild(lb);
    }
    lb.querySelector("img").src = src; lb.classList.add("on");
    track("view_figure", { image: src.split("/").slice(-2).join("/") });
  }

  /* ---------------- reveal ---------------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.08 }) : null;
  function reveal() { $$(".reveal:not(.in)").forEach(function (el) { io ? io.observe(el) : el.classList.add("in"); }); }

  /* ---------------- counters ---------------- */
  function counters() {
    $$("[data-count]").forEach(function (el) {
      var end = parseFloat(el.dataset.count), dec = (el.dataset.count.split(".")[1] || "").length, suf = el.dataset.suffix || "", done = false;
      var run = function () {
        if (done) return; done = true; var t0 = performance.now();
        (function step(now) {
          var k = Math.min(1, (now - t0) / 1400), v = end * (1 - Math.pow(1 - k, 3));
          el.textContent = v.toFixed(dec) + suf; if (k < 1) requestAnimationFrame(step);
        })(t0);
      };
      if (io) new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { run(); o.disconnect(); } }).observe(el); else run();
    });
  }

  /* ---------------- contact form ---------------- */
  function contactForm() {
    var f = $("#quoteForm"); if (!f) return;
    var q = new URLSearchParams(location.search);
    if (q.get("type")) { var r = f.querySelector('input[name="service"][value="' + q.get("type") + '"]'); if (r) r.checked = true; }
    if (q.get("ref")) { var m = f.querySelector('[name="message"]'); m.value = (LANG === "vi" ? "Tôi quan tâm đến dự án tương tự: " : "I am interested in something similar to: ") + q.get("ref") + "\n\n"; }
    var msg = $("#formMsg");
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (f.website && f.website.value) return; // honeypot
      var data = {};
      new FormData(f).forEach(function (v, k) { if (k !== "website") data[k] = data[k] ? data[k] + ", " + v : v; });
      data.page = location.href; data.lang = LANG;
      var vi = LANG === "vi";
      if (!data.name || !data.message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email || "")) {
        msg.className = "form-msg err";
        msg.textContent = vi ? "Vui lòng điền họ tên, e-mail hợp lệ và mô tả bài toán." : "Please fill in your name, a valid e-mail and a short description.";
        return;
      }
      // subject line + reply-to, understood by both Web3Forms and Formspree
      data.subject = "[opensource-cfd] " + (data.service || "request") + " — " + data.name + (data.company ? " (" + data.company + ")" : "");
      data._subject = data.subject; data._replyto = data.email; data.from_name = "opensource-cfd.com";
      if (S.formAccessKey) data.access_key = S.formAccessKey;
      var ready = S.formEndpoint && (S.formEndpoint.indexOf("web3forms") < 0 || S.formAccessKey);
      if (ready) {
        var btn = f.querySelector('button[type="submit"]'); btn.disabled = true; btn.style.opacity = .6;
        fetch(S.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); })
          .then(function () {
            track("generate_lead", { service: data.service || "", ref: q.get("ref") || "" });
            f.reset(); msg.className = "form-msg ok";
            msg.textContent = vi ? "Đã nhận yêu cầu! Bạn sẽ nhận phản hồi trong vòng 24 giờ làm việc." : "Request received! You will hear back within 24 working hours.";
          })
          .catch(function () { mailtoFallback(data); })
          .then(function () { btn.disabled = false; btn.style.opacity = 1; });
      } else mailtoFallback(data);
    });
    function mailtoFallback(d) {
      var skip = { subject: 1, _subject: 1, _replyto: 1, from_name: 1, access_key: 1 };
      var body = Object.keys(d).filter(function (k) { return !skip[k]; }).map(function (k) { return k + ": " + d[k]; }).join("\n");
      location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent(d.subject) + "&body=" + encodeURIComponent(body);
      msg.className = "form-msg ok";
      msg.textContent = LANG === "vi" ? "Ứng dụng e-mail của bạn đã mở với nội dung điền sẵn — chỉ cần bấm Gửi. Hoặc viết trực tiếp tới " + S.email : "Your e-mail app opened with everything pre-filled — just press Send. Or write directly to " + S.email;
    }
  }

  /* ---------------- analytics (Google Analytics 4) ---------------- */
  var track = function () {};
  function analytics() {
    if (!S.gaId || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", S.gaId, { site_language: LANG });
    var s = document.createElement("script"); s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(S.gaId);
    document.head.appendChild(s);
    track = function (name, params) { window.gtag("event", name, params || {}); };

    var id = new URLSearchParams(location.search).get("id");
    if (id && $("#detail")) track("view_project", { project_id: id });
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a, button");
      if (!a) return;
      var href = a.getAttribute("href") || "";
      if (/contact\.html/.test(href)) {
        var where = a.closest(".site-header") ? "header" : a.closest(".site-footer") ? "footer" : a.closest(".sticky-cta") ? "sticky" : a.closest(".side") ? "project_sidebar" : "page";
        track("quote_click", { location: where, ref: new URLSearchParams(href.split("?")[1] || "").get("ref") || id || "" });
      } else if (a.classList.contains("filter")) track("filter_projects", { category: a.dataset.f });
      else if (a.id === "langBtn") track("language_change", { language: LANG === "vi" ? "en" : "vi" });
      else if (/^mailto:/.test(href)) track("email_click", {});
    }, true);
    document.addEventListener("play", function (e) {
      var v = e.target; if (!v || v.tagName !== "VIDEO" || v.dataset.tracked || v.autoplay) return;
      v.dataset.tracked = "1"; track("video_play", { video: (v.getAttribute("src") || "").split("/").pop(), project_id: id || "" });
    }, true);
  }

  function fillSite() {
    $$("[data-site]").forEach(function (el) {
      var k = el.dataset.site, v = S[k];
      if (k === "email") { el.textContent = v; el.href = "mailto:" + v; }
      else if (k === "slotsThisMonth") el.textContent = v;
      else if (v) el.textContent = v;
    });
    if (S.bookingUrl) $$("[data-booking]").forEach(function (el) { el.href = S.bookingUrl; el.hidden = false; });
  }

  function renderAll() { renderFeatured(); renderLatest(); renderProjects(); renderDetail(); renderPubs(); applyLang(); fillSite(); reveal(); }

  document.addEventListener("DOMContentLoaded", function () {
    header(); footer(); renderAll(); counters(); contactForm(); analytics();
    $$(".lightboxable img").forEach(function (img) { img.style.cursor = "zoom-in"; img.addEventListener("click", function () { lightbox(img.src); }); });
  });
  document.addEventListener("langchange", renderAll);
})();
