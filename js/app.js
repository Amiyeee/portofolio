/* ==========================================================================
   Interaksi Halaman, Navigasi 5-Slide Terhubung & Latar Belakang Neural Canvas
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNeuralBackground();
  initSlideKeyboardNavigation();
  initPageSpecificLogic();
});

/* --------------------------------------------------------------------------
   1. HTML5 Canvas: Konstelasi Neural Mesh & Kontur Topografis Halus
   -------------------------------------------------------------------------- */
function initNeuralBackground() {
  const canvas = document.getElementById("neural-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const mouse = { x: width * 0.5, y: height * 0.4, active: false };

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  const nodeCount = Math.min(34, Math.max(18, Math.floor((width * height) / 42000)));
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    radius: i % 5 === 0 ? 2.6 : 1.7,
    isBronze: i % 4 === 0
  }));

  let tick = 0;

  function render() {
    tick += 0.004;
    ctx.clearRect(0, 0, width, height);

    // Subtle topographic contour waves
    ctx.lineWidth = 1;
    for (let w = 0; w < 3; w++) {
      ctx.beginPath();
      ctx.strokeStyle =
        w === 1 ? "rgba(154, 107, 62, 0.065)" : "rgba(33, 78, 82, 0.06)";
      const baseY = height * (0.26 + w * 0.25);
      for (let x = 0; x <= width; x += 28) {
        const y =
          baseY +
          Math.sin(x * 0.0032 + tick + w * 1.4) * 26 +
          Math.cos(x * 0.0018 - tick * 0.7) * 16;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Update & draw neural constellation nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // Gentle cursor attraction
      if (mouse.active) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 190 && dist > 1) {
          n.x += (dx / dist) * 0.14;
          n.y += (dy / dist) * 0.14;
        }
      }

      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const dist = Math.hypot(n.x - m.x, n.y - m.y);
        if (dist < 165) {
          const alpha = (1 - dist / 165) * 0.11;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(33, 78, 82, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.85;
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.fillStyle = n.isBronze
        ? "rgba(154, 107, 62, 0.28)"
        : "rgba(33, 78, 82, 0.26)";
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* --------------------------------------------------------------------------
   2. Navigasi Keyboard Antar-Halaman (Panah Kiri / Panah Kanan)
   -------------------------------------------------------------------------- */
function initSlideKeyboardNavigation() {
  if (typeof SITE_PAGES === "undefined") return;
  const currentPageId = document.body.dataset.page;
  const currentIndex = SITE_PAGES.findIndex((p) => p.id === currentPageId);
  if (currentIndex === -1) return;

  document.addEventListener("keydown", (e) => {
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return;
    if (document.querySelector(".modal-backdrop.open")) {
      if (e.key === "Escape") closeAllModals();
      return;
    }

    if (e.key === "ArrowRight" && currentIndex < SITE_PAGES.length - 1) {
      window.location.href = SITE_PAGES[currentIndex + 1].href;
    } else if (e.key === "ArrowLeft" && currentIndex > 0) {
      window.location.href = SITE_PAGES[currentIndex - 1].href;
    }
  });
}

function closeAllModals() {
  document.querySelectorAll(".modal-backdrop").forEach((m) => m.classList.remove("open"));
}

function showToast(message) {
  let toast = document.getElementById("toast-banner");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-banner";
    toast.className = "toast-banner";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function copyText(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} berhasil disalin: ${text}`);
  });
}

/* --------------------------------------------------------------------------
   3. Logika Spesifik Per Halaman (Proyek, Blog, Kontak)
   -------------------------------------------------------------------------- */
function initPageSpecificLogic() {
  const page = document.body.dataset.page;

  if (page === "proyek" && typeof PROJECTS_DATA !== "undefined") {
    initProjectsPage();
  } else if (page === "blog" && typeof BLOG_ARTICLES !== "undefined") {
    initBlogPage();
  } else if (page === "kontak") {
    initContactPage();
  }
}

/* --- Halaman Proyek (proyek.html) --- */
function initProjectsPage() {
  const grid = document.getElementById("projects-grid");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const activeSkillBanner = document.getElementById("active-skill-banner");
  const activeSkillLabel = document.getElementById("active-skill-label");
  const clearSkillBtn = document.getElementById("clear-skill-filter");

  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  let selectedCategory = "Semua";
  let selectedSkill = params.get("skill") || "";
  const directProjectId = params.get("project") || "";

  function renderProjects() {
    const filtered = PROJECTS_DATA.filter((item) => {
      const matchCategory =
        selectedCategory === "Semua" || item.category === selectedCategory;
      const matchSkill =
        !selectedSkill ||
        item.tags.some((t) => t.toLowerCase().includes(selectedSkill.toLowerCase()));
      return matchCategory && matchSkill;
    });

    if (activeSkillBanner && activeSkillLabel) {
      if (selectedSkill) {
        activeSkillBanner.classList.remove("hidden");
        activeSkillBanner.classList.add("flex");
        activeSkillLabel.textContent = selectedSkill;
      } else {
        activeSkillBanner.classList.add("hidden");
        activeSkillBanner.classList.remove("flex");
      }
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full editorial-card p-8 text-center">
          <p class="font-editorial text-2xl text-stone-800 mb-2">Belum ada proyek dengan filter tersebut</p>
          <p class="text-sm text-stone-600 mb-4">Silakan atur ulang filter keahlian atau kategori untuk melihat seluruh karya rekayasa.</p>
          <button type="button" id="reset-all-projects" class="btn-primary">Tampilkan Semua Proyek</button>
        </div>
      `;
      document.getElementById("reset-all-projects")?.addEventListener("click", () => {
        selectedCategory = "Semua";
        selectedSkill = "";
        window.history.replaceState({}, "", "proyek.html");
        updateCategoryPills();
        renderProjects();
      });
      return;
    }

    grid.innerHTML = filtered
      .map(
        (proj, idx) => `
      <article class="editorial-card editorial-card-interactive p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="font-code text-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#214E52]/10 text-[#214E52] font-medium">
              ${proj.category}
            </span>
            <span class="font-code text-xs text-stone-500">0${idx + 1} · ${proj.year}</span>
          </div>
          <h3 class="font-editorial text-2xl font-semibold text-stone-900 leading-snug mb-2">
            ${proj.title}
          </h3>
          <p class="text-xs font-medium text-[#9A6B3E] mb-3">${proj.role}</p>
          <p class="text-sm text-stone-600 leading-relaxed mb-4">
            ${proj.summary}
          </p>
        </div>

        <div>
          <div class="flex flex-wrap gap-1.5 mb-5">
            ${proj.tags
              .map(
                (tag) =>
                  `<span class="font-code text-[11px] px-2.5 py-1 rounded-md bg-[#EAE4D7]/70 text-stone-700">${tag}</span>`
              )
              .join("")}
          </div>
          <div class="pt-4 border-t border-stone-900/10 flex items-center justify-between gap-3">
            <button type="button" data-open-project="${proj.id}" class="text-sm font-semibold text-[#214E52] hover:underline cursor-pointer">
              Detail Arsitektur →
            </button>
            <a href="blog.html?article=${proj.relatedArticleId}" class="text-xs font-medium text-stone-500 hover:text-[#9A6B3E] transition-colors">
              Baca Tulisan Terkait
            </a>
          </div>
        </div>
      </article>
    `
      )
      .join("");

    document.querySelectorAll("[data-open-project]").forEach((btn) => {
      btn.addEventListener("click", () => {
        openProjectModal(btn.dataset.openProject);
      });
    });
  }

  function updateCategoryPills() {
    filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === selectedCategory);
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedCategory = btn.dataset.filter;
      updateCategoryPills();
      renderProjects();
    });
  });

  clearSkillBtn?.addEventListener("click", () => {
    selectedSkill = "";
    window.history.replaceState({}, "", "proyek.html");
    renderProjects();
  });

  renderProjects();

  if (directProjectId) {
    openProjectModal(directProjectId);
  }
}

function openProjectModal(projectId) {
  const modal = document.getElementById("project-modal");
  const body = document.getElementById("project-modal-body");
  if (!modal || !body) return;

  const proj = PROJECTS_DATA.find((p) => p.id === projectId);
  if (!proj) return;

  body.innerHTML = `
    <div class="flex items-start justify-between gap-4 mb-4">
      <div>
        <span class="eyebrow-label mb-2">${proj.category} · ${proj.year}</span>
        <h2 class="font-editorial text-3xl font-semibold text-stone-900 leading-tight">${proj.title}</h2>
        <p class="text-sm font-medium text-[#9A6B3E] mt-1">${proj.role}</p>
      </div>
      <button type="button" id="close-project-modal" class="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 cursor-pointer" aria-label="Tutup">✕</button>
    </div>

    <div class="space-y-4 text-sm text-stone-700 leading-relaxed mt-5">
      <div class="sand-panel p-4">
        <p class="font-code text-xs uppercase tracking-wider text-stone-500 mb-1">Tantangan Teknis</p>
        <p>${proj.challenge}</p>
      </div>
      <div class="sand-panel p-4">
        <p class="font-code text-xs uppercase tracking-wider text-stone-500 mb-1">Pendekatan & Solusi</p>
        <p>${proj.solution}</p>
      </div>
      <div>
        <p class="font-code text-xs uppercase tracking-wider text-stone-500 mb-2">Poin Implementasi Utama</p>
        <ul class="list-disc pl-5 space-y-1.5 text-stone-700">
          ${proj.highlights.map((h) => `<li>${h}</li>`).join("")}
        </ul>
      </div>
      <div class="flex flex-wrap gap-2 pt-2">
        ${proj.tags
          .map(
            (t) =>
              `<span class="font-code text-xs px-3 py-1 rounded-full bg-[#214E52]/10 text-[#214E52]">${t}</span>`
          )
          .join("")}
      </div>
    </div>

    <div class="mt-6 pt-4 border-t border-stone-900/10 flex flex-wrap items-center justify-between gap-3">
      <a href="blog.html?article=${proj.relatedArticleId}" class="btn-primary">
        Baca Artikel Blog Terkait →
      </a>
      <button type="button" id="close-project-modal-footer" class="btn-outline">Tutup Rincian</button>
    </div>
  `;

  modal.classList.add("open");
  document.getElementById("close-project-modal")?.addEventListener("click", closeAllModals);
  document.getElementById("close-project-modal-footer")?.addEventListener("click", closeAllModals);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeAllModals();
  });
}

/* --- Halaman Blog (blog.html) --- */
function initBlogPage() {
  const listEl = document.getElementById("blog-list");
  const filterBtns = document.querySelectorAll("[data-blog-filter]");
  if (!listEl) return;

  const params = new URLSearchParams(window.location.search);
  let activeCategory = "Semua";
  const directArticleId = params.get("article") || "";

  function renderArticles() {
    const items = BLOG_ARTICLES.filter(
      (a) => activeCategory === "Semua" || a.category === activeCategory
    );

    listEl.innerHTML = items
      .map(
        (art, idx) => `
      <article class="editorial-card editorial-card-interactive p-6 sm:p-7 flex flex-col justify-between">
        <div>
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span class="font-code text-xs uppercase tracking-wider text-[#9A6B3E] font-medium">
              ${art.category}
            </span>
            <span class="font-code text-xs text-stone-500">${art.date} · ${art.readTime}</span>
          </div>
          <h3 class="font-editorial text-2xl sm:text-[1.7rem] font-semibold text-stone-900 leading-snug mb-3">
            ${art.title}
          </h3>
          <p class="text-sm text-stone-600 leading-relaxed mb-5">
            ${art.excerpt}
          </p>
        </div>
        <div class="pt-4 border-t border-stone-900/10 flex items-center justify-between gap-3">
          <button type="button" data-read-article="${art.id}" class="text-sm font-semibold text-[#214E52] hover:underline cursor-pointer">
            Baca Selengkapnya →
          </button>
          <a href="proyek.html?project=${art.relatedProjectId}" class="text-xs font-medium text-stone-500 hover:text-[#214E52] transition-colors">
            Lihat Proyek Terkait
          </a>
        </div>
      </article>
    `
      )
      .join("");

    document.querySelectorAll("[data-read-article]").forEach((btn) => {
      btn.addEventListener("click", () => openArticleModal(btn.dataset.readArticle));
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.blogFilter;
      filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
      renderArticles();
    });
  });

  renderArticles();

  if (directArticleId) {
    openArticleModal(directArticleId);
  }
}

function openArticleModal(articleId) {
  const modal = document.getElementById("article-modal");
  const body = document.getElementById("article-modal-body");
  if (!modal || !body) return;

  const idx = BLOG_ARTICLES.findIndex((a) => a.id === articleId);
  if (idx === -1) return;

  const art = BLOG_ARTICLES[idx];
  const prevArt = idx > 0 ? BLOG_ARTICLES[idx - 1] : null;
  const nextArt = idx < BLOG_ARTICLES.length - 1 ? BLOG_ARTICLES[idx + 1] : null;

  body.innerHTML = `
    <div class="flex items-start justify-between gap-4 mb-5">
      <div>
        <span class="eyebrow-label mb-2">${art.category} · ${art.date} · ${art.readTime}</span>
        <h2 class="font-editorial text-3xl sm:text-4xl font-semibold text-stone-900 leading-tight">
          ${art.title}
        </h2>
      </div>
      <button type="button" id="close-article-modal" class="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 cursor-pointer shrink-0" aria-label="Tutup">✕</button>
    </div>

    <div class="space-y-4 text-[0.96rem] text-stone-700 leading-relaxed border-t border-stone-900/10 pt-5">
      ${art.content.map((p) => `<p>${p}</p>`).join("")}
    </div>

    <div class="mt-6 sand-panel p-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <p class="font-code text-[11px] uppercase tracking-wider text-stone-500">Implementasi Nyata</p>
        <p class="text-sm font-medium text-stone-800">Tertarik melihat arsitektur sistem dari tulisan ini?</p>
      </div>
      <a href="proyek.html?project=${art.relatedProjectId}" class="btn-primary text-xs">
        Buka Studi Kasus Proyek →
      </a>
    </div>

    <div class="mt-6 pt-4 border-t border-stone-900/10 flex items-center justify-between gap-3 text-xs font-medium">
      ${
        prevArt
          ? `<button type="button" data-nav-article="${prevArt.id}" class="text-[#214E52] hover:underline cursor-pointer">← ${prevArt.title.slice(0, 32)}...</button>`
          : `<span></span>`
      }
      ${
        nextArt
          ? `<button type="button" data-nav-article="${nextArt.id}" class="text-[#214E52] hover:underline cursor-pointer">${nextArt.title.slice(0, 32)}... →</button>`
          : `<span></span>`
      }
    </div>
  `;

  modal.classList.add("open");
  document.getElementById("close-article-modal")?.addEventListener("click", closeAllModals);
  document.querySelectorAll("[data-nav-article]").forEach((btn) => {
    btn.addEventListener("click", () => openArticleModal(btn.dataset.navArticle));
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeAllModals();
  });
}

/* --- Halaman Kontak (kontak.html) --- */
function initContactPage() {
  const flipCard = document.getElementById("business-flip-card");
  const flipBtn = document.getElementById("toggle-card-flip");

  function toggleFlip() {
    flipCard?.classList.toggle("is-flipped");
  }

  flipCard?.addEventListener("click", toggleFlip);
  flipBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFlip();
  });

  const contactForm = document.getElementById("visitor-contact-form");
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("sender-name")?.value.trim();
    const email = document.getElementById("sender-email")?.value.trim();
    const subject = document.getElementById("sender-subject")?.value.trim();
    const message = document.getElementById("sender-message")?.value.trim();

    if (!name || !email || !message) return;

    const mailSubject = encodeURIComponent(`[Blog Pribadi] ${subject || "Pesan dari Pengunjung"} - ${name}`);
    const mailBody = encodeURIComponent(`Halo Ryan,

Nama: ${name}
Email: ${email}

Pesan:
${message}`);
    showToast("Membuka aplikasi email Anda untuk mengirim pesan...");
    window.location.href = `mailto:ryanhamid527@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  });
}
