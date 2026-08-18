# Muhammad Abubakar — Portfolio Website

A premium, dark-mode-first personal portfolio built with plain HTML5, CSS3 and vanilla
JavaScript (no build step, no framework). Features glassmorphism cards, a purple → cyan
gradient system, scroll-reveal animations, a hero "neural constellation" canvas, animated
counters, a typing effect, a light/dark theme toggle, and a fully client-side contact form.

## 📁 Folder structure

```
/assets
  /images     → profile.svg (placeholder avatar), og-cover.svg (social preview image)
  /icons      → favicon.svg
  /resume     → resume.pdf (placeholder — replace with your real resume)
/css
  style.css   → all styles (design tokens, components, responsive rules)
/js
  config.js   → ⭐ the ONLY file you need to edit — every link, the resume path,
                the profile picture path, EmailJS keys, and the skills/projects
                data all live here
  main.js     → all interactivity (theme, nav, animations, form logic, etc.)
index.html
README.md
```

## ✏️ How to make this yours (edit `js/config.js` only)

Open `js/config.js` and replace the placeholder values:

| What | Config key |
|---|---|
| GitHub / LinkedIn / Email / Portfolio URLs | `CONFIG.socials` |
| Resume file path | `CONFIG.resume.path` — drop your PDF at `assets/resume/resume.pdf` (or update the path) |
| Profile picture | `CONFIG.profileImage` — replace `assets/images/profile.svg` with your photo, e.g. `assets/images/profile.jpg`, then update the path |
| Certificate / achievement links | `CONFIG.achievements` |
| Project GitHub / live demo links | `CONFIG.projects` |
| Contact form email delivery | `CONFIG.emailjs` (see below) |
| Skills shown | `CONFIG.skillCategories` |
| Projects shown | `CONFIG.projectsList` |

You never need to touch `index.html` to update a link — everything with a
`data-cfg="…"` attribute is populated automatically from `config.js`.

## 📄 Resume button behavior

- **View Resume** opens `assets/resume/resume.pdf` in a new tab, using the browser's
  native PDF viewer (zoom controls + download are provided by the browser itself).
- **Download Resume** downloads the same file directly.
- Both buttons first check that the file exists; if it's missing, they show a
  friendly "Resume will be available soon." toast instead of a broken link.
- A basic placeholder PDF is already included so the buttons work immediately —
  swap it out with your real resume any time, same filename, no code changes needed.

## ✉️ Contact form

The form validates on the client (name, email format, subject, message length) and
works out of the box: on submit it opens the visitor's own email app pre-filled with
their message (a `mailto:` link), so it's functional with **zero setup**.

To have messages land directly in your inbox instead (no visitor email app required):

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Add an email service and a template.
3. In `js/config.js`, set `CONFIG.emailjs.enabled = true` and fill in your
   `publicKey`, `serviceId`, and `templateId`.

## 🎨 Design notes

- **Palette**: deep navy background with a violet (`#8b5cf6`) → cyan (`#22d3ee`) gradient,
  as requested — meant to read as a developer's "night lab" rather than a generic tech gradient.
- **Type**: Poppins for headings, Inter for body text, and JetBrains Mono used sparingly
  for section labels (styled like Python comments, e.g. `# 02_skills.py`) — a small nod to
  the fact that this is a Python developer's site.
- **Signature element**: the animated node-and-line "constellation" canvas behind the hero
  echoes a neural network, tying the very first thing visitors see to the AI/ML focus of the site.
- Skills are shown as icon badges rather than invented progress-bar percentages — there was
  no real proficiency data to base numeric scores on, and fabricated percentages would be
  misleading on a recruiter-facing page.
- Project thumbnails are stylized icon tiles (not real screenshots), since no project images
  were provided — swap in real screenshots any time by editing `.project-card__thumb` in
  `js/main.js`'s `renderProjects()` function.

## 🚀 Running locally

Because the JavaScript uses `fetch()` (for the resume check) and `<script>` tags, the site
should be served rather than opened directly via `file://` for full functionality:

```bash
# any of these work
npx serve .
python3 -m http.server 8000
# or the VS Code "Live Server" extension
```

Then open the printed local URL in your browser.

## ☁️ Deploying

This is a static site — drag-and-drop the whole folder onto **Netlify** or **Vercel**,
or push it to a repo and enable **GitHub Pages** (Settings → Pages → deploy from branch).
Once live, update `CONFIG.socials.portfolio` and `CONFIG.projects.portfolioLive` in
`js/config.js` with the live URL.

## 🖼️ Note on the Open Graph image

`assets/images/og-cover.svg` is provided as SVG, but most social platforms (Facebook,
LinkedIn, X) only render **PNG/JPG** Open Graph previews. Export it to a 1200×630 PNG
(e.g. open it in a browser and screenshot it, or run it through any SVG-to-PNG converter)
and update the `og:image` / `twitter:image` tags in `index.html` accordingly.

## ✅ Placeholders checklist

- [ ] `js/config.js` → all social links, resume path, profile image, achievement links, project links
- [ ] `assets/resume/resume.pdf` → your real resume
- [ ] `assets/images/profile.svg` → your real photo (or keep the monogram if you prefer)
- [ ] `js/config.js` → `CONFIG.emailjs` (optional, for direct-to-inbox contact form)
- [ ] `assets/images/og-cover.svg` → export to PNG for social previews (optional)
