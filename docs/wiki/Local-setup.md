# Local setup

The site is built with Astro 5 and Tailwind CSS 4. The package manager is **Bun**.

## Requirements

- Bun (the lockfile is `bun.lock`)
- Git

## Steps

```bash
git clone https://github.com/hexjasur/Jasurbek.git
cd Jasurbek
bun install
bun run dev
```

The dev server runs at http://localhost:4321.

## Commands

| Command | What it does |
| --- | --- |
| `bun run dev` | Dev server with hot reload |
| `bun run check` | Type-check with `astro check` |
| `bun run build` | Production build and Pagefind search index |
| `bun run preview` | Serve the built site |

## Good to know

- Search (Pagefind) only works after `bun run build` and `bun run preview`. It does not work in `bun run dev`.
- Run `bun run build` before pushing. It also validates blog frontmatter against the schema.
- Do not commit `dist/`, `node_modules/` or `.astro/`.
