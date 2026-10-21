Build me a complete, production-ready one-page portfolio website using Tailwind CSS with a single fixed color palette (no theme toggle) and a strictly mobile-first design. Below are the detailed requirements.
📋 Data Source

The site must read all content from a data.yaml file with three sections: projects, experiences, and education. Each entry includes text fields and a path to an image. Everything must render dynamically from the YAML — to update the site, I should only ever edit the YAML, never the HTML/JS.

Use this YAML structure:
''' 
    profile:
    name: "Your Name"
    title: "Your Title"
    bio: "Short bio..."
    photo: "assets/images/profile.jpg"
    links:
        github: "https://github.com/..."
        linkedin: "https://linkedin.com/in/..."
        email: "mailto:..."

    experiences:
    - company: "Company Name"
        role: "Job Title"
        period: "2022 - Present"
        location: "City, Country"
        description: "What I did..."
        image: "assets/images/exp-1.jpg"
        tags: ["Tag1", "Tag2"]

    projects:
    - name: "Project Name"
        description: "What it does..."
        image: "assets/images/project-1.jpg"
        link: "https://..."
        tags: ["Python", "React"]

    education:
    - institution: "University Name"
        degree: "Degree"
        period: "2018 - 2022"
        description: "..."
        image: "assets/images/edu-1.jpg"

'''

Design System

    Single fixed palette — pick one sophisticated, mature scheme and stick to it (e.g., a warm neutral base like stone/zinc with one restrained accent color such as deep teal or muted indigo). No dark/light toggle. Document the palette in the README.

    Mobile-first: write Tailwind classes for mobile first, then layer sm:, md:, lg: breakpoints upward. Test that every section is readable and well-spaced at ~375px width before scaling up.

    Mature, minimalist aesthetic — senior engineer / consultant vibe. Generous whitespace, strong typographic hierarchy, subtle fade-in-on-scroll, smooth hover states. No flashy animations.

    Accessible: semantic HTML, alt text on all images, keyboard navigation, sufficient contrast.

 Page Structure (single page, anchor nav)

Sticky top nav with section links → Hero/About (photo, name, title, bio, social links) → Experience (most prominent: timeline or cards with image, role, company, period, description, tags) → Projects (responsive grid of cards) → Education (compact cards) → Footer (contact links, copyright).

⚙️ Technical Requirements

    Tailwind CSS — use the Tailwind CLI to compile a stylesheet (include tailwind.config.js, input CSS, and a build script). Alternatively justify Play CDN if you prefer zero build — but a compiled output is preferred for production.

    Vanilla JS to fetch() and parse data.yaml using js-yaml (via CDN).

    No heavy framework. Static hosting friendly (GitHub Pages / Netlify).

    Handle missing images (placeholder) and missing fields gracefully.

    Clean, commented, organized code.

    Include a README covering: how to edit data.yaml, add images, the palette used, the Tailwind build step, local dev (needs a local server because of fetch), and deployment.

📦 Deliverables

    index.html, src/input.css (Tailwind source), dist/output.css (compiled), script.js, tailwind.config.js, package.json (with build script), data.yaml (with sample data).

    README.md with setup + customization + palette + build + deploy instructions.

    assets/images/ folder with a note on placeholders.
     
     the website will be hosted in github page


Ask clarifying questions before generating code if anything is ambiguous. Otherwise, generate all files in full.