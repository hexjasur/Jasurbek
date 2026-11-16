# Writing a blog post

Read `docs/blog-writing.md` before you write. It covers structure, tone and the checklist.

## Create the file

Create `src/content/blog/<ascii-slug>.md`. The slug must be ASCII and is used in the URL.

```yaml
---
title: "Post title"
description: "One or two plain sentences, under 160 characters."
pubDate: 2026-11-17
tags: ["git", "tutorial"]
---
```

## Dates

- **New post:** `pubDate` is today's date. Do not use placeholders.
- **Revision:** set `updatedDate` to the revision day. Do not change `pubDate`. The page then shows "Updated on".

## Structure

- Start sections at `##`. Use `###` for subsections, so the table of contents works.
- Every command needs a language on its code block, such as `bash` or `ts`.
- Factual claims (prices, laws, versions) need a source link and an "as of" date.
- Images go in `public/images/blog/<post-slug>/` with meaningful `alt` text.

## Tags

Tags are ASCII only, because `tagSlug()` strips other characters. Use `uzbekistan`, not `özbekiston`.

## Before you open a PR

- Run `bun run build`.
- Check the internal links start with `/`.
- Check that the Uzbek text uses the reformed alphabet (Ö, Ğ, Ş, Ç).
