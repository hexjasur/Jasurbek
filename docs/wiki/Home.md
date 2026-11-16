# Jasurbek Haydarov: Wiki

Guides and notes for the portfolio, the blog, the tools and the desktop app.

**Live site:** https://jasurdev.uz · **Source:** https://github.com/hexjasur/Jasurbek

## Start here

- [Local setup](Local-setup)
- [Writing a blog post](Writing-a-blog-post)
- [Adding a tool or playground demo](Adding-a-tool)
- [Desktop app (Tauri)](Desktop-app)
- [Release process](Release-process)

## Project map

| Area | Where it lives |
| --- | --- |
| Blog posts | `src/content/blog/` |
| Tools | `src/pages/tools/`, registered in `src/data/tools.ts` |
| Playground | `src/pages/playground/`, registered in `src/data/playground.ts` |
| Desktop app | `src-tauri/` |
| CI and deploy | `.github/workflows/` |

## Conventions

- Dates: `pubDate` on new posts, `updatedDate` on revisions. See `AGENTS.md`.
- Uzbek text uses the 2026 reformed Latin alphabet. See `AGENTS.md`.
- `master` is the main branch. Work on a short branch and open a pull request.

## Contributing

Use the issue templates for bugs and feature requests. Report security problems privately (see `SECURITY.md`).

## License

MIT © [Jasurbek Haydarov](https://github.com/hexjasur)
