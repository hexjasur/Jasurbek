# AGENTS.md

Instructions for AI coding agents working in this repository (Jasurbek Haydarov's personal portfolio and technical blog).

## Project overview

- Static site built with **Astro 5**, **Tailwind CSS 4** and Markdown content collections.
- Deployed to GitHub Pages: `site: https://hexjasur.github.io`, `base: /Jasurbek` (see `astro.config.mjs`).
- Search is Pagefind (built after `astro build`), Open Graph images are generated at build time with Satori + sharp.
- Package manager: **Bun** (`bun.lock`). pnpm also works.
- Site-wide settings (domain, author, socials, SEO defaults) live in `src/config.ts`.

## Commands

```bash
bun install        # install dependencies
bun run dev        # dev server on http://localhost:4321
bun run check      # astro check (type-check)
bun run build      # production build + Pagefind index
bun run preview    # preview the build (search only works here)
```

Run `bun run build` before pushing. It validates frontmatter against the content schema.

## Repository map

```text
src/content/blog/   Markdown posts (one file per post)
src/content.config.ts   Blog schema: title, description, pubDate, updatedDate?, tags?
src/pages/          Routes (blog, tools, playground, projects, og, rss)
src/data/           tools.ts and playground.ts (register new tools/demos here)
src/lib/            Blog helpers, JSON-LD, OG rendering, URL helpers
src/components/     Header, Footer, Seo, TOC, SearchPalette, Comments
public/images/      Static assets
```

## Uzbek text: use the 2026 reformed Latin alphabet

Any Uzbek-language text in this project (blog posts, page copy, UI strings, code comments, documentation) **must use the reformed Latin alphabet finalized on October 21, 2026**. Do not write the legacy 1995 spelling.

| Cyrillic | Legacy (do NOT use) | Reformed (use this) |
| :--- | :--- | :--- |
| Ў ў | Oʻ oʻ / O' o' | **Ö ö** |
| Ғ ғ | Gʻ gʻ / G' g' | **Ğ ğ** |
| Ш ш | Sh sh | **Ş ş** |
| Ч ч | Ch ch | **Ç ç** |

Unchanged letters: `J`, `Q`, `H`, `X`. The tutuq belgisi (`'` / `ʼ`, as in `ma'lumot`, `e'lon`, `ta'lim`) is **not** replaced.

Examples:

```text
Legacy:   O'zbekiston, so'm, to'g'ri, shahar, choy, ish, boshqa, yig'ilish
Reformed: Özbekiston, söm, töğri, şahar, çoy, iş, boşqa, yiğiliş
```

Rules:

- Apply the mapping to **all** Uzbek words, including capitalized and uppercase forms, abbreviations built from them (`MChJ` → `MÇJ`, `O'RQ` → `ÖRQ`) and proper names (`Toshkent` → `Toşkent`).
- Do **not** change: URLs and link targets, file names and route slugs, frontmatter keys, code identifiers, English text, English source titles and brand/domain names (`Kun.uz`, `gov.uz`, ...).
- Keep **blog tags ASCII**. `tagSlug()` in `src/lib/blog.ts` strips everything outside `a-z0-9`, so a tag such as `özbekiston` would produce the slug `zbekiston`. Use `uzbekistan`, `soliq`, ... instead.
- Use real Unicode letters (`Ö ö Ğ ğ Ş ş Ç ç`), not `O + combining diaeresis` sequences, so search and indexing stay consistent.
- To convert existing legacy text, use the in-site converter (`src/pages/tools/uzbek-alphabet.astro`, route `/tools/uzbek-alphabet`) or its `oldToNew()` logic, then review the result by hand.
- Background and rationale: `src/content/blog/uzbek-alphabet-2026.md`.

## Blog posts

- Create `src/content/blog/<ascii-slug>.md` with frontmatter:

  ```yaml
  ---
  title: "..."
  description: "..."
  pubDate: YYYY-MM-DD
  updatedDate: YYYY-MM-DD   # optional, add only when a published post is meaningfully revised
  tags: ["tag-one", "tag-two"]
  ---
  ```

- When you revise an already published post (corrected facts, new sections, new rates), set `updatedDate` to the revision day. The post then shows "Updated on: ..." next to the publish date and the date is used for `dateModified` / `article:modified_time`. It is hidden when it equals `pubDate`. Do not change `pubDate` for revisions.

- Start body sections at `##` (the page title is the `h1`). Use `###` for subsections so the table of contents works.
- Post page, OG image, RSS entry, sitemap entry, tag pages and search entry are generated automatically. Do not add them by hand.
- Factual posts (statistics, laws, rates, prices) must cite their sources with links, quote figures as the source states them, label your own calculations, and state the "as of" date. Prefer official sources (`lex.uz`, `gov.uz`, `stat.uz`, `soliq.uz`) over commercial blogs.
- Internal links must include the base path, for example `/Jasurbek/tools/uzbek-alphabet`.

## General conventions

- Keep the client-side JavaScript footprint small; prefer static Astro components.
- Search (Pagefind) is loaded in `src/components/SearchPalette.astro` through a native `import()` created with `new Function`. Do not replace it with a plain `import(...)`: Vite wraps it in a preload helper whose `__VITE_PRELOAD__` placeholder is left undefined in the inlined production script, which silently breaks search on the deployed site. After touching search code, run `bun run build` + `bun run preview` and test search in a browser (it never works in `bun run dev`).
- Reuse the flora theme tokens from `src/styles/global.css`; do not introduce new colors ad hoc.
- Register new tools in `src/data/tools.ts` and new playground demos in `src/data/playground.ts`.
- Keep user-facing copy accessible: alt text, visible focus states, reduced-motion support.
- Do not commit `dist/`, `node_modules/` or `.astro/`.
