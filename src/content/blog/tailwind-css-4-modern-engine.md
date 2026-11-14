---
title: "What Changed in Tailwind CSS 4"
description: "Tailwind CSS 4 moves configuration into CSS, rewrites the build engine, adds a first-party Vite plugin and includes container queries in the core."
pubDate: 2026-10-12
updatedDate: 2026-11-14
tags: ["tailwindcss", "css", "frontend", "tooling"]
---

Tailwind CSS 4 is a rewrite. Four changes matter in daily work: the configuration is CSS, the build engine is new, the Vite integration is a first-party plugin, and container queries are part of the core.

## Configuration moves into CSS

In v3, the theme lived in `tailwind.config.js`. In v4, the stylesheet is the configuration. One import replaces the three `@tailwind` directives, and tokens are declared with `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-brand: #0969da;
}
```

`--color-brand` generates utilities such as `bg-brand` and `text-brand`.

How to organize these variables (raw values, semantic names, dark mode) is covered in [the design token guide](/blog/tailwind-css-4-dizayn-tokenlari), which is in Uzbek.

## Build speed

Tailwind's v4.0 announcement benchmarks the new engine against v3.4 on Catalyst, its UI kit template. The medians:

| Build | v3.4 | v4.0 |
| :-- | :-- | :-- |
| Full build | 378 ms | 100 ms |
| Incremental rebuild, new CSS | 44 ms | 5 ms |
| Incremental rebuild, no new CSS | 35 ms | 192 µs |

Source: [Tailwind CSS v4.0, tailwindcss.com](https://tailwindcss.com/blog/tailwindcss-v4). These are one project on one machine. The gain is largest on incremental rebuilds that reuse classes already generated, which is most of what you see while editing. Measure your own project before you quote a number.

## The Vite plugin

Tailwind v4 still runs as a PostCSS plugin, but the first-party Vite plugin is faster, and it removes the PostCSS setup. In an Astro project, add it under `vite.plugins`:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

In a plain Vite project, the same `tailwindcss()` call goes into `plugins` in `vite.config.js`.

## Container queries are built in

Container queries used to need the `@tailwindcss/container-queries` plugin. In v4 they are part of the core. Mark the parent with `@container`, then style children by the parent's width with `@` variants:

```html
<div class="@container">
  <div class="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
    <!-- Columns depend on the container width, not the viewport -->
  </div>
</div>
```

`@max-*` variants give max-width container queries, and `@min-*` and `@max-*` can be stacked for a range.
