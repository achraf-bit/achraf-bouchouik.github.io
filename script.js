/* ─────────────────────────────────────────────────────────────────────────
   script.js — Portfolio renderer
   Fetches data.yaml, parses with js-yaml, and populates every section.
   To update the site, edit data.yaml only — never touch this file.
───────────────────────────────────────────────────────────────────────── */

const PLACEHOLDER = (w = 600, h = 400, label = "") =>
  `https://placehold.co/${w}x${h}/e7e5e4/78716c?text=${encodeURIComponent(label || "Image")}`;

/* ── Helpers ─────────────────────────────────────────────────────────── */

function tags(list = []) {
  return list
    .map(
      (t) =>
        `<span class="inline-block text-xs font-mono bg-stone-200 text-stone-600 px-2 py-0.5 rounded">${t}</span>`
    )
    .join(" ");
}

function safeImg(src, alt, cls) {
  const fallback = PLACEHOLDER(600, 400, alt);
  return `<img src="${src || fallback}" alt="${alt}" class="${cls}" loading="lazy"
              onerror="this.src='${fallback}'" />`;
}

function socialIcon(type) {
  const icons = {
    github: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
      0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
      -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
      .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
      -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0
      012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595
      1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012
      2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136
      1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85
      3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065
      2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792
      0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24
      22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>`,
    email: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>`,
  };
  return icons[type] || "";
}

function linkLabel(type) {
  return { github: "GitHub", linkedin: "LinkedIn", email: "Email" }[type] || type;
}

/* ── Renderers ───────────────────────────────────────────────────────── */

function renderProfile(profile = {}) {
  const { name = "", title = "", bio = "", photo = "", links = {} } = profile;

  document.title = name ? `${name} — Portfolio` : "Portfolio";
  document.getElementById("nav-name").textContent = name;
  document.getElementById("profile-name").textContent = name;
  document.getElementById("profile-title").textContent = title;
  document.getElementById("profile-bio").textContent = bio;

  const img = document.getElementById("profile-photo");
  if (photo) img.src = photo;
  img.alt = name ? `${name} profile photo` : "Profile photo";

  // Social links
  const linksEl = document.getElementById("profile-links");
  linksEl.innerHTML = Object.entries(links)
    .map(
      ([type, href]) => `
      <a href="${href}" target="_blank" rel="noopener noreferrer"
         class="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600
                hover:text-accent transition-colors"
         aria-label="${linkLabel(type)}">
        ${socialIcon(type)}
        <span>${linkLabel(type)}</span>
      </a>`
    )
    .join("");

  // Footer links mirror
  document.getElementById("footer-links").innerHTML = Object.entries(links)
    .map(
      ([type, href]) => `
      <a href="${href}" target="_blank" rel="noopener noreferrer"
         class="hover:text-accent transition-colors" aria-label="${linkLabel(type)}">
        ${linkLabel(type)}
      </a>`
    )
    .join("");

  document.getElementById("footer-copy").textContent =
    `© ${new Date().getFullYear()} ${name}. All rights reserved.`;
}

function renderExperience(experiences = []) {
  const container = document.getElementById("experience-list");
  if (!experiences.length) { container.innerHTML = "<p class='text-stone-500'>No experience listed.</p>"; return; }

  container.innerHTML = experiences
    .map(
      (exp) => `
    <article class="reveal bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200
                    flex flex-col sm:flex-row hover:shadow-md transition-shadow">
      <div class="sm:w-48 flex-shrink-0">
        ${safeImg(
          exp.image,
          `${exp.company || "Company"} logo or photo`,
          "w-full h-40 sm:h-full object-cover"
        )}
      </div>
      <div class="p-5 flex flex-col gap-2">
        <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 class="text-base font-semibold text-stone-900">${exp.role || ""}</h3>
          <span class="text-xs font-mono text-stone-400">${exp.period || ""}</span>
        </div>
        <p class="text-sm font-medium text-accent">${exp.company || ""}${exp.location ? ` · ${exp.location}` : ""}</p>
        <p class="text-sm text-stone-600 leading-relaxed">${exp.description || ""}</p>
        <div class="flex flex-wrap gap-1.5 mt-1">${tags(exp.tags)}</div>
      </div>
    </article>`
    )
    .join("");
}

function renderProjects(projects = []) {
  const container = document.getElementById("projects-grid");
  if (!projects.length) { container.innerHTML = "<p class='text-stone-500'>No projects listed.</p>"; return; }

  container.innerHTML = projects
    .map(
      (proj) => `
    <article class="reveal bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200
                    flex flex-col hover:shadow-md transition-shadow group">
      <div class="overflow-hidden">
        ${safeImg(
          proj.image,
          `${proj.name || "Project"} screenshot`,
          "w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        )}
      </div>
      <div class="p-5 flex flex-col gap-2 flex-1">
        <h3 class="text-base font-semibold text-stone-900">${proj.name || ""}</h3>
        <p class="text-sm text-stone-600 leading-relaxed flex-1">${proj.description || ""}</p>
        <div class="flex flex-wrap gap-1.5 mt-1">${tags(proj.tags)}</div>
        ${
          proj.link
            ? `<a href="${proj.link}" target="_blank" rel="noopener noreferrer"
                  class="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent
                         hover:text-accent-dark transition-colors" aria-label="View ${proj.name || "project"}">
                 View project
                 <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                   <path d="M7 7h10v10M7 17 17 7"/>
                 </svg>
               </a>`
            : ""
        }
      </div>
    </article>`
    )
    .join("");
}

function renderEducation(education = []) {
  const container = document.getElementById("education-list");
  if (!education.length) { container.innerHTML = "<p class='text-stone-500'>No education listed.</p>"; return; }

  container.innerHTML = education
    .map(
      (edu) => `
    <article class="reveal bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200
                    flex flex-col sm:flex-row hover:shadow-md transition-shadow">
      <div class="sm:w-36 flex-shrink-0">
        ${safeImg(
          edu.image,
          `${edu.institution || "Institution"} image`,
          "w-full h-32 sm:h-full object-cover"
        )}
      </div>
      <div class="p-5 flex flex-col gap-1.5">
        <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 class="text-base font-semibold text-stone-900">${edu.institution || ""}</h3>
          <span class="text-xs font-mono text-stone-400">${edu.period || ""}</span>
        </div>
        <p class="text-sm font-medium text-accent">${edu.degree || ""}</p>
        <p class="text-sm text-stone-600 leading-relaxed">${edu.description || ""}</p>
      </div>
    </article>`
    )
    .join("");
}

/* ── Scroll reveal ───────────────────────────────────────────────────── */

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }),
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* ── Bootstrap ───────────────────────────────────────────────────────── */

async function init() {
  try {
    const res = await fetch("data.yaml");
    if (!res.ok) throw new Error(`Failed to load data.yaml (${res.status})`);
    const text = await res.text();
    const data = jsyaml.load(text);

    renderProfile(data.profile);
    renderExperience(data.experiences);
    renderProjects(data.projects);
    renderEducation(data.education);

    // Observe after DOM is populated
    requestAnimationFrame(initReveal);
  } catch (err) {
    console.error("Portfolio data error:", err);
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<div role="alert" class="bg-red-50 border-b border-red-200 text-red-700 text-sm px-4 py-3 text-center">
        Could not load portfolio data. Run via a local server (e.g. <code>npx serve .</code>).
      </div>`
    );
  }
}

document.addEventListener("DOMContentLoaded", init);

/* ── Burger menu ─────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const toggle    = document.getElementById("nav-toggle");
  const menu      = document.getElementById("nav-mobile");
  const iconOpen  = document.getElementById("icon-open");
  const iconClose = document.getElementById("icon-close");

  function openMenu() {
    menu.classList.remove("hidden");
    menu.classList.add("flex");
    iconOpen.classList.add("hidden");
    iconClose.classList.remove("hidden");
    toggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menu.classList.add("hidden");
    menu.classList.remove("flex");
    iconOpen.classList.remove("hidden");
    iconClose.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    menu.classList.contains("hidden") ? openMenu() : closeMenu();
  });

  // Close when a link is tapped
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  // Reset if viewport grows past 700px
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 700) closeMenu();
  });
});
