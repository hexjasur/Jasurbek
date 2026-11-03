<div align="center">
  <img src="./public/images/jasurbek-haydarov.svg" alt="Jasurbek Haydarov" width="760" />
  <br />
  <p><strong>Software Engineer · Builder · Technical Explorer</strong></p>
  <p>
    <a href="https://hexjasur.github.io/Jasurbek/">Portfolio</a>
    ·
    <a href="https://github.com/hexjasur">GitHub</a>
    ·
    <a href="https://t.me/jasurhaydarovcode">Telegram</a>
  </p>
</div>

<div align="center">
  <img src="./public/images/flora/floral-corner.webp" alt="Flora decoration" width="180" />
</div>

## About this repository

This repository contains **Jasurbek Haydarov's personal portfolio and technical blog**. It is a small, fast, static site for sharing software projects, experiments, engineering notes, and browser-based developer tools.

The visual direction combines a warm editorial canvas with a botanical flora motif: cream surfaces, sage green, dusty rose, terracotta accents, and sturdy dark-green borders. The floral assets are used as lightweight decorative layers rather than as content, keeping the pages readable and focused.

## What is inside

- **Profile and contact** — a short biography, social links, and a Formspree-powered contact form.
- **Projects** — selected work with repository links, live websites, and real project screenshots.
- **Blog** — technical notes about software engineering, tooling, AI-assisted workflows, and practical experiments. Posts have reading time, a table of contents, copy buttons on code blocks, older/newer navigation, tag pages, and optional Giscus comments.
- **Tools** — privacy-first browser utilities: color contrast checker, CSS `clamp()` generator, Base64/URL encoder, UUID generator, JSON to TypeScript, minifier, and Uzbek alphabet converter.
- **Playground** — small games and experiments in vanilla TypeScript (Snake, reaction time test).
- **Search** — full-text, in-browser search powered by Pagefind. Press `Ctrl` + `K` or `/` on any page.
- **Dark mode** — follows the system setting, with a manual toggle and no flash on load.

## SEO and performance

- Per-page meta tags, canonical URLs, Open Graph and Twitter cards.
- Branded 1200x630 Open Graph images generated at build time for every page and post.
- JSON-LD structured data (`Person`, `WebSite`, `BlogPosting`, `WebApplication`, breadcrumbs).
- Sitemap, `robots.txt` and an RSS feed (`/rss.xml`) generated from `src/config.ts`.
- WebP images with explicit dimensions, system font stack, and almost no client-side JavaScript.
- Accessibility basics: skip link, visible focus ring, `aria-current` navigation, reduced-motion support.

## Built with

| Layer | Technology |
| --- | --- |
| Framework | [Astro 5](https://astro.build/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) and custom CSS |
| Content | Astro Content Collections with Markdown |
| Search | [Pagefind](https://pagefind.app/) (static, runs in the browser) |
| Open Graph images | [Satori](https://github.com/vercel/satori) + [sharp](https://sharp.pixelplumbing.com/) at build time |
| Comments | [Giscus](https://giscus.app/) (GitHub Discussions) |
| Navigation | Astro Client Router and view transitions |
| Deployment | GitHub Pages via GitHub Actions |
| Package manager | Bun or pnpm |

## Run locally

```bash
# Install dependencies
bun install

# Start the development server
bun run dev

# Type-check the project
bun run check

# Create a production build (also builds the Pagefind search index)
bun run build

# Preview the production build (search only works here, not in dev mode)
bun run preview
```

The development site is available at `http://localhost:4321`.

## Repository map

```text
src/
├── components/       # Header, footer, SEO head, search dialog, TOC, comments
├── content/blog/     # Markdown articles
├── data/             # Tools and playground lists (single source of truth)
├── lib/              # Blog helpers, JSON-LD, Open Graph rendering, URL helpers
├── layouts/          # Shared page shell and contact modal
├── pages/            # Profile, projects, blog, tools, playground, OG, RSS routes
└── styles/           # Global flora theme, dark mode and responsive styles
public/
├── images/flora/     # Botanical decorative assets
├── images/projects/  # Project screenshots
└── images/           # Profile and brand visuals
```

## Design notes

The site uses the following core flora palette:

- `#F1E9DC` — warm canvas
- `#FBF6EC` — paper-like surface
- `#C7D2B1` — sage primary
- `#DDA095` — dusty rose accent
- `#B86752` — terracotta accent
- `#2F4038` — deep green ink

## Configuration

Everything site-wide (domain, author, social links, SEO defaults) lives in `src/config.ts`.
When a custom domain is connected, update `siteUrl` and `domain` there and remove `base` from `astro.config.mjs`.

### Enabling comments

Comments stay hidden until a Giscus category id is set:

1. Enable **Discussions** in the repository settings.
2. Install the [Giscus app](https://github.com/apps/giscus) on the repository.
3. Open [giscus.app](https://giscus.app), choose the repository and category, and copy the generated `data-category-id`.
4. Paste it into `comments.categoryId` in `src/config.ts`.

### Enabling the contact form

1. Create a form at [Formspree](https://formspree.io/) and copy its form ID.
2. Set `formspreeFormId` in `src/config.ts` to that ID.
3. The contact form at `/contact/` will then submit directly to Formspree.

To protect the contact form with Cloudflare Turnstile:

1. Create a Turnstile widget for your site's domain in the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Enable CAPTCHA in the Formspree form settings, select Cloudflare Turnstile, and enter the Turnstile **secret key** there.
3. Set the Turnstile **site key** as `turnstileSiteKey` in `src/config.ts`. Keep the secret key in Formspree; never add it to the site code.

## Adding content

- **Blog post:** add a Markdown file to `src/content/blog/` with `title`, `description`, `pubDate` and optional `tags`.
  Its page, Open Graph image, RSS entry, sitemap entry, tag pages and search entry are generated automatically.
- **Tool or playground demo:** add the page under `src/pages/tools/` or `src/pages/playground/` and register it in
  `src/data/tools.ts` or `src/data/playground.ts`.

The portfolio portrait and decorative assets are kept local so the static site remains self-contained and can be deployed directly to GitHub Pages.

## License

MIT © [Jasurbek Haydarov](https://github.com/hexjasur)
