/* =====================================================================
   MUHAMMAD ABUBAKAR — PORTFOLIO SCRIPT
   All behavior reads its data from js/config.js (window.CONFIG).
   Organized as small independent modules, each initialised at the
   bottom in initPortfolio().
   ===================================================================== */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------ */
  function resolvePath(obj, path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
  }

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  /* ------------------------------------------------------------------
     1. Apply config-driven links (data-cfg="socials.github" etc.)
     ------------------------------------------------------------------ */
  function applyConfigLinks() {
    qsa("[data-cfg]").forEach((el) => {
      const value = resolvePath(window.CONFIG, el.getAttribute("data-cfg"));
      if (!value) return;
      if (el.tagName === "IMG") el.src = value;
      else el.href = value;
    });

    const profileImg = qs(".portrait-img");
    if (profileImg && CONFIG.profileImage) profileImg.src = CONFIG.profileImage;
  }

  /* ------------------------------------------------------------------
     2. Loader
     ------------------------------------------------------------------ */
  function initLoader() {
    const loader = qs("#loader");
    if (!loader) return;
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("is-hidden"), 350);
    });
    // Safety net in case 'load' already fired or is delayed
    setTimeout(() => loader.classList.add("is-hidden"), 3000);
  }

  /* ------------------------------------------------------------------
     3. Theme toggle (dark by default, persisted in localStorage)
     ------------------------------------------------------------------ */
  function initTheme() {
    const root = document.documentElement;
    const toggle = qs("#themeToggle");
    const stored = localStorage.getItem("portfolio-theme");

    if (stored === "light") root.classList.add("light");

    toggle?.addEventListener("click", () => {
      root.classList.toggle("light");
      localStorage.setItem("portfolio-theme", root.classList.contains("light") ? "light" : "dark");
    });
  }

  /* ------------------------------------------------------------------
     4. Navbar: scrolled state + mobile menu + active link highlight
     ------------------------------------------------------------------ */
  function initNavbar() {
    const navbar = qs("#navbar");
    const burger = qs("#navBurger");
    const menu = qs("#navMenu");
    const links = qsa(".nav-link");

    const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    burger?.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      burger.classList.toggle("is-open", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
    });

    // Close mobile menu after choosing a link
    links.forEach((link) => link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      burger.classList.remove("is-open");
      burger?.setAttribute("aria-expanded", "false");
    }));

    // Active link highlight via IntersectionObserver
    const sections = ["home", "education", "skills", "achievements", "projects", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("active", l.dataset.section === entry.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach((s) => spy.observe(s));
  }

  /* ------------------------------------------------------------------
     5. Scroll progress bar
     ------------------------------------------------------------------ */
  function initScrollProgress() {
    const bar = qs("#scrollProgress");
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = `${scrolled || 0}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ------------------------------------------------------------------
     6. Back to top button
     ------------------------------------------------------------------ */
  function initBackToTop() {
    const btn = qs("#backToTop");
    if (!btn) return;
    window.addEventListener("scroll", () => {
      btn.classList.toggle("is-visible", window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }));
  }

  /* ------------------------------------------------------------------
     7. Custom cursor (desktop / fine-pointer only)
     ------------------------------------------------------------------ */
  function initCustomCursor() {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!supportsFinePointer || prefersReducedMotion) return;

    document.body.classList.add("has-custom-cursor");
    const dot = qs("#cursorDot");
    const ring = qs("#cursorRing");
    let ringX = 0, ringY = 0, targetX = 0, targetY = 0;

    window.addEventListener("mousemove", (e) => {
      targetX = e.clientX; targetY = e.clientY;
      dot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
    });

    (function raf() {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(raf);
    })();

    // Delegated (not per-element) so this also covers skill/project cards
    // that get injected into the DOM later by renderSkills()/renderProjects().
    const interactiveSelector = "a, button, .glass-card, .skill-pill";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(interactiveSelector)) ring.classList.add("is-active");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(interactiveSelector)) ring.classList.remove("is-active");
    });
  }

  /* ------------------------------------------------------------------
     8. Scroll reveal (IntersectionObserver + stagger delay)
     ------------------------------------------------------------------ */
  function initScrollReveal() {
    const items = qsa("[data-reveal]");
    if (!items.length) return;

    items.forEach((el) => {
      const delay = el.getAttribute("data-reveal-delay");
      if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
    });

    if (prefersReducedMotion) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach((el) => observer.observe(el));
  }

  /* Attach a lightweight fade+stagger reveal to elements added dynamically
     (skills / project cards) after they are injected into the DOM.        */
  function revealDynamic(container, childSelector) {
    const children = qsa(childSelector, container);
    children.forEach((el, i) => {
      el.setAttribute("data-reveal", "");
      el.style.setProperty("--reveal-delay", `${Math.min(i, 8) * 70}ms`);
    });
    if (prefersReducedMotion) {
      children.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    children.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------
     9. Typing animation for hero role text
     ------------------------------------------------------------------ */
  function initTypingEffect() {
    const el = qs("#typedRole");
    if (!el || !CONFIG.roles || !CONFIG.roles.length) return;

    if (prefersReducedMotion) { el.textContent = CONFIG.roles[0]; return; }

    let roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const current = CONFIG.roles[roleIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % CONFIG.roles.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }

  /* ------------------------------------------------------------------
     10. Animated counters
     ------------------------------------------------------------------ */
  function initCounters() {
    const counters = qsa(".stat__num");
    if (!counters.length) return;

    const animate = (el) => {
      const target = parseInt(el.getAttribute("data-count"), 10) || 0;
      const suffix = el.getAttribute("data-suffix") || "";
      if (prefersReducedMotion) { el.textContent = target + suffix; return; }

      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach((c) => observer.observe(c));
  }

  /* ------------------------------------------------------------------
     11. Ripple effect on buttons
     ------------------------------------------------------------------ */
  function initRipple() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".ripple");
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const span = document.createElement("span");
      span.className = "ripple-el";
      span.style.width = span.style.height = `${size}px`;
      span.style.left = `${e.clientX - rect.left - size / 2}px`;
      span.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(span);
      setTimeout(() => span.remove(), 650);
    });
  }

  /* ------------------------------------------------------------------
     12. Hero neural-constellation canvas
     Signature visual: nodes + connecting lines drifting behind the
     hero copy, echoing the "network" at the heart of ML/AI work.
     ------------------------------------------------------------------ */
  function initConstellation() {
    const canvas = qs("#constellationCanvas");
    const hero = qs(".hero");
    if (!canvas || !hero) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let width, height, dpr;
    let running = false;
    let mouse = { x: null, y: null };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = hero.clientWidth;
      height = hero.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((width * height) / 22000);
      particles = Array.from({ length: Math.min(count, 70) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.8
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const maxDist = 130;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(139, 146, 246, ${0.16 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        if (mouse.x !== null) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.28 * (1 - dist / 160)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = "rgba(200, 205, 255, 0.75)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running) requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });

    if (prefersReducedMotion) { draw(); return; } // single static frame only

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !running) {
          running = true;
          requestAnimationFrame(draw);
        } else if (!entry.isIntersecting) {
          running = false;
        }
      });
    }, { threshold: 0.05 });
    heroObserver.observe(hero);
  }

  /* ------------------------------------------------------------------
     13. Render Skills grid from CONFIG
     ------------------------------------------------------------------ */
  function renderSkills() {
    const grid = qs("#skillsGrid");
    if (!grid || !CONFIG.skillCategories) return;

    grid.innerHTML = CONFIG.skillCategories.map((cat) => `
      <div class="glass-card skill-card">
        <div class="skill-card__head">
          <span class="skill-card__icon"><i class="${cat.icon}"></i></span>
          <h3>${cat.title}</h3>
        </div>
        <div class="skill-pills">
          ${cat.skills.map((s) => `
            <span class="skill-pill">
              ${s.isFa ? `<i class="${s.icon}"></i>` : `<iconify-icon icon="${s.icon}" width="16" height="16"></iconify-icon>`}
              ${s.name}
            </span>
          `).join("")}
        </div>
      </div>
    `).join("");

    revealDynamic(grid, ".skill-card");
  }

  /* ------------------------------------------------------------------
     14. Render Projects grid from CONFIG
     ------------------------------------------------------------------ */
  function renderProjects() {
    const grid = qs("#projectsGrid");
    if (!grid || !CONFIG.projectsList) return;

    grid.innerHTML = CONFIG.projectsList.map((p) => `
      <article class="glass-card project-card">
        <div class="project-card__thumb"><i class="${p.icon}"></i></div>
        <div class="project-card__body">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="project-card__tech">
            ${p.tech.map((t) => `<span class="badge">${t}</span>`).join("")}
          </div>
          <div class="project-card__actions">
            <a href="${resolvePath(CONFIG, "projects." + p.githubKey) || "#"}" class="btn btn--sm btn--outline ripple" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-github"></i> GitHub
            </a>
            ${p.liveKey ? `
              <a href="${resolvePath(CONFIG, "projects." + p.liveKey) || "#"}" class="btn btn--sm btn--primary ripple" target="_blank" rel="noopener noreferrer">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
              </a>` : ""}
          </div>
        </div>
      </article>
    `).join("");

    revealDynamic(grid, ".project-card");
  }

  /* ------------------------------------------------------------------
     15. Toast notifications
     ------------------------------------------------------------------ */
  let toastTimer;
  function showToast(message, type) {
    const toast = qs("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove("is-error");
    if (type === "error") toast.classList.add("is-error");
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3800);
  }

  /* ------------------------------------------------------------------
     16. Resume: View / Download
     A HEAD request checks the file actually exists before opening it;
     if the check itself fails (e.g. the site is opened directly from
     disk via file://, where fetch cannot run) we fall back to
     attempting to open the file anyway rather than blocking the user.
     ------------------------------------------------------------------ */
  function initResumeButtons() {
    const buttons = qsa("[data-resume-action]");
    if (!buttons.length) return;

    async function resumeExists(path) {
      try {
        const res = await fetch(path, { method: "HEAD" });
        return res.ok;
      } catch (err) {
        return "unknown";
      }
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const action = btn.getAttribute("data-resume-action");
        const path = CONFIG.resume.path;
        const exists = await resumeExists(path);

        if (exists === false) {
          showToast("Resume will be available soon.", "error");
          return;
        }

        if (action === "view") {
          window.open(path, "_blank", "noopener,noreferrer");
        } else if (action === "download") {
          const link = document.createElement("a");
          link.href = path;
          link.download = CONFIG.resume.downloadFilename || "resume.pdf";
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     17. Contact form: validation + EmailJS (if enabled) + mailto fallback
     ------------------------------------------------------------------ */
  function initContactForm() {
    const form = qs("#contactForm");
    if (!form) return;

    const fields = {
      name: qs("#fieldName"),
      email: qs("#fieldEmail"),
      subject: qs("#fieldSubject"),
      message: qs("#fieldMessage")
    };
    const errors = {
      name: qs("#errName"),
      email: qs("#errEmail"),
      subject: qs("#errSubject"),
      message: qs("#errMessage")
    };
    const note = qs("#contactFormNote");
    const submitBtn = qs("#contactSubmitBtn");

    if (window.emailjs && CONFIG.emailjs?.enabled && CONFIG.emailjs.publicKey && !CONFIG.emailjs.publicKey.startsWith("YOUR_")) {
      emailjs.init({ publicKey: CONFIG.emailjs.publicKey });
    }

    function setError(field, message) {
      const wrapper = fields[field].closest(".field");
      errors[field].textContent = message || "";
      wrapper.classList.toggle("has-error", Boolean(message));
    }

    function validate() {
      let valid = true;

      if (!fields.name.value.trim()) { setError("name", "Please enter your name."); valid = false; }
      else setError("name", "");

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(fields.email.value.trim())) { setError("email", "Please enter a valid email."); valid = false; }
      else setError("email", "");

      if (!fields.subject.value.trim()) { setError("subject", "Please add a subject."); valid = false; }
      else setError("subject", "");

      if (fields.message.value.trim().length < 10) { setError("message", "Message should be at least 10 characters."); valid = false; }
      else setError("message", "");

      return valid;
    }

    Object.values(fields).forEach((el) => el.addEventListener("blur", validate));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validate()) return;

      submitBtn.classList.add("is-loading");
      submitBtn.disabled = true;
      note.textContent = "";
      note.className = "contact-form__note";

      const payload = {
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        subject: fields.subject.value.trim(),
        message: fields.message.value.trim(),
         to_email: "brandmirza702@gmail.com"
      };

      const emailjsReady = window.emailjs && CONFIG.emailjs?.enabled &&
        CONFIG.emailjs.serviceId && !CONFIG.emailjs.serviceId.startsWith("YOUR_") &&
        CONFIG.emailjs.templateId && !CONFIG.emailjs.templateId.startsWith("YOUR_");

      try {
        if (emailjsReady) {
          await emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, payload);
          note.textContent = "Message Sent Successfully.";
          note.classList.add("is-success");
          showToast("Message Sent Successfully.");
          form.reset();
        } else {
          // Fallback: open the visitor's own email client pre-filled,
          // so the form is fully functional even before EmailJS is set up.
          const to = (CONFIG.socials.email || "mailto:").replace("mailto:", "");
          const mailto = `mailto:${to}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(
            `${payload.message}\n\n— ${payload.name} (${payload.email})`
          )}`;
          window.location.href = mailto;
          note.textContent = "Opening your email app to send the message…";
          note.classList.add("is-success");
          form.reset();
        }
      } catch (err) {
        note.textContent = "Something went wrong. Please try again or email me directly.";
        note.classList.add("is-error");
        showToast("Message could not be sent.", "error");
      } finally {
        submitBtn.classList.remove("is-loading");
        submitBtn.disabled = false;
      }
    });
  }

  /* ------------------------------------------------------------------
     18. Footer year
     ------------------------------------------------------------------ */
  function initFooterYear() {
    const el = qs("#footerYear");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */
  function initPortfolio() {
    applyConfigLinks();
    initLoader();
    initTheme();
    initNavbar();
    initScrollProgress();
    initBackToTop();
    initCustomCursor();
    initTypingEffect();
    initCounters();
    initRipple();
    initConstellation();
    initScrollReveal(); // observes elements already in the DOM at this point
    renderSkills();      // adds its own reveal observer for injected cards (revealDynamic)
    renderProjects();    // same
    applyConfigLinks();  // re-apply after dynamic render (project GitHub/live links)
    initResumeButtons();
    initContactForm();
    initFooterYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPortfolio);
  } else {
    initPortfolio();
  }
})();
