# Munhib Baig — Portfolio

React, JavaScript, HTML, and CSS portfolio built with Vite. Resume content comes from the two supplied PDFs. The supplied Originkit landscape, interactive grid, and round carousel are adapted in `src/components`.

## Local development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy as a static site. Build command: `npm run build`. Publish/output directory: `dist`.

- Vercel: import the repository and select the Vite preset.
- Render: create a Static Site, connect the repository, and use the build command and publish directory above.

Hash-based routes (`/#/about`, `/#/stack`, `/#/projects`, `/#/contact`) keep navigation and refresh working on static hosts without server rewrites. No backend, API keys, or paid infrastructure is required. Hosting plan availability and terms are controlled by the provider.

## Editing

- `src/data.js`: project descriptions and skill groups.
- `src/main.jsx`: pages, contact information, and resume links.
- `src/styles.css`: responsive layout and color roles.
- `src/theme.js`: shared artwork and landscape palette. The 60/30/10 hierarchy uses charcoal (`#191B1F`) as the dominant foundation, cool gray (`#343840`) for secondary surfaces, and soft ivory (`#E9E5DC`) for restrained accents. Ivory text, lighter gray supporting copy, and a darker landscape overlay improve readability. Landscape motion and pointer interaction are preserved.
- `public/resumes/`: original downloadable resumes.

Project artwork is schematic, generated as local SVG data URLs, rather than screenshots of the projects. GitHub links point to the profile from the resume because individual repository URLs were not supplied. Contact links open the visitor's email/phone client. Fonts use Google Fonts with local sans-serif fallbacks.
