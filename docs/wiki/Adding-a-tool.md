# Adding a tool or playground demo

Tools and playground demos are listed in one place each. Both lists feed the index pages, OG images and the terminal page.

## A new tool

1. Create the page in `src/pages/tools/<slug>.astro`. Reuse the layout and the `tools-box` styles of an existing tool.
2. Add an entry to `toolsList` in `src/data/tools.ts`:

```ts
{
  id: 'my-tool',
  num: 13,
  title: 'My Tool',
  description: 'One sentence that says what the tool does.',
  slug: 'my-tool',
},
```

Use the next free `num`. The list is sorted by `num`, highest first.

## A new playground demo

1. Create `src/pages/playground/<slug>.astro`.
2. Add an entry to `playgroundList` in `src/data/playground.ts`.

## Rules

- Use the flora theme tokens from `src/styles/global.css`. Do not add new colors ad hoc.
- Keep client-side JavaScript small. Prefer static Astro components.
- Give interactive controls visible focus states and support reduced motion.
- Set `First Published` and `Last Updated` dates on the page, using the real date.
