# Portfolio

A production-ready, one-page static portfolio site built with Tailwind CSS and vanilla JS.  
All content is driven by a single `data.yaml` file — **never edit the HTML or JS to update content**.

---

## Color Palette

| Role        | Color                  | Tailwind token  | Hex       |
|-------------|------------------------|-----------------|-----------|
| Background  | Warm stone (light)     | `stone-50`      | `#fafaf9` |
| Surface      | Stone card             | `stone-100`     | `#f5f5f4` |
| Border      | Subtle divider         | `stone-200`     | `#e7e5e4` |
| Body text   | Dark stone             | `stone-800`     | `#292524` |
| Muted text  | Medium stone           | `stone-500/600` | `#78716c` |
| Accent      | Deep teal              | custom `accent` | `#0f766e` |
| Accent hover| Darker teal            | `accent-dark`   | `#0d5c56` |

Rationale: warm neutrals (stone) feel more human than cool grays; deep teal provides a restrained, professional accent without being generic blue.

---

## Project Structure

```
portfolio/
├── assets/
│   └── images/          # Drop your images here
├── dist/
│   └── output.css       # Compiled Tailwind (committed for GitHub Pages)
├── src/
│   └── input.css        # Tailwind source directives
├── data.yaml            # ← Edit this to update all content
├── index.html
├── script.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## Editing Content

Open `data.yaml` and update any field. The site re-renders entirely from this file.

### Profile
```yaml
profile:
  name: "Your Name"
  title: "Your Title"
  bio: "Short bio..."
  photo: "assets/images/profile.jpg"
  links:
    github: "https://github.com/you"
    linkedin: "https://linkedin.com/in/you"
    email: "mailto:you@example.com"
```

### Adding an Experience
```yaml
experiences:
  - company: "Company Name"
    role: "Job Title"
    period: "2022 – Present"
    location: "City, Country"
    description: "What you did..."
    image: "assets/images/exp-company.jpg"
    tags: ["Go", "AWS"]
```

### Adding a Project
```yaml
projects:
  - name: "Project Name"
    description: "What it does..."
    image: "assets/images/proj-name.jpg"
    link: "https://github.com/you/project"
    tags: ["Python", "React"]
```

### Adding Education
```yaml
education:
  - institution: "University Name"
    degree: "B.S. Computer Science"
    period: "2018 – 2022"
    description: "Details..."
    image: "assets/images/edu-uni.jpg"
```

All fields are optional — missing images fall back to a placeholder automatically.

---

## Adding Images

1. Place image files in `assets/images/`.
2. Reference them in `data.yaml` as `assets/images/filename.jpg`.
3. Recommended sizes: **profile** 400×400px, **experience/project** 800×500px.
4. Any format supported by browsers works (jpg, png, webp, avif).

If an image path is missing or broken, the site automatically shows a neutral placeholder.

---

## Tailwind Build

### Prerequisites
- Node.js ≥ 18

### Install
```bash
npm install
```

### Compile once (production, minified)
```bash
npm run build
```

### Watch mode (development)
```bash
npm run watch
```

The compiled stylesheet is output to `dist/output.css`.  
**Commit `dist/output.css`** — GitHub Pages serves static files and won't run a build step.

---

## Local Development

Because `script.js` uses `fetch("data.yaml")`, you need a local HTTP server (browsers block `fetch` on `file://`).

```bash
# Option 1 — Node serve
npx serve .

# Option 2 — Python
python3 -m http.server 8080

# Option 3 — VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

Then open `http://localhost:3000` (or whichever port).

---

## Deployment — GitHub Pages

1. Push the repository to GitHub (include `dist/output.css`).
2. Go to **Settings → Pages**.
3. Set source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Save — your site will be live at `https://<username>.github.io/<repo>/`.

> If the repo is not at the root (e.g. `https://user.github.io/portfolio/`), no changes are needed — all asset paths are relative.

---

## Customization Tips

- **Accent color**: change `accent.DEFAULT` in `tailwind.config.js`, then run `npm run build`.
- **Fonts**: swap the Google Fonts `<link>` in `index.html` and update `fontFamily` in `tailwind.config.js`.
- **Section order**: reorder the `<section>` blocks in `index.html` and the nav links to match.
- **Add a section**: add a new `<section>` in `index.html`, a renderer function in `script.js`, and the corresponding key in `data.yaml`.
