---
name: anthropic-models-uz
description: Write or refresh Uzbek-language blog posts about Anthropic's Claude models (releases, benchmarks, pricing, API changes, news) for this site. Use when asked to cover a new Claude model, update the Claude lineup post, compare models, or add benchmark or pricing data. Covers source verification, benchmark-reading rules, the 2026 reformed Uzbek alphabet and this repository's date rules.
---

# Anthropic models in Uzbek (blog skill)

Produces professional, source-backed Uzbek articles about Anthropic's Claude models for the blog in `src/content/blog/`.
The reference article is `src/content/blog/anthropic-claude-modellari-benchmark-2026.md` (published 2026-11-07); match its depth and structure.

## When to use

- A new Claude model, pricing change, API feature or major product update was announced and should be covered.
- The existing lineup/benchmark post needs a refresh (new numbers, new model, corrected facts).
- The user asks for a comparison, a cost calculation or routing/eval code for Claude models, written in Uzbek.

Do not use it for general Uzbek writing (use `AGENTS.md` rules directly) or for non-Anthropic topics.

## Workflow

### 1. Fix the dates first

- Read the real current date from the environment. Never guess it or reuse a date from memory.
- **New post:** `pubDate: YYYY-MM-DD` is today. **Revising a post:** set `updatedDate: YYYY-MM-DD` to today and leave `pubDate` alone (see `AGENTS.md`, "CRITICAL DATE RULE").
- Every factual section states an "as of" date. Put a "Holat sanasi" (status date) callout at the top.

### 2. Research from primary sources

Use WebSearch and WebFetch. Prefer, in this order:

1. Official model pages on `anthropic.com` (for example `/claude-opus-5-5`, `/claude-haiku-5-5`, `/claude/sonnet`).
2. `docs.claude.com` (model IDs, context windows, parameters) and the Claude release notes at `support.claude.com`.
3. Anthropic news and statements (for example the Fable/Mythos access statement).
4. Secondary sources (Vellum, Releasebot, TechCrunch, LetsDataScience) only when no official page has the fact. Label them as secondary in the text.

Record each fact with its source URL. If an official page does not state a number (context window, SWE-bench, max output), do not fill it from memory or from third-party blogs; write that it is not stated.
If a URL cannot be fetched, say so and do not cite content you did not read.

Start from `references/lineup-2026-11-07.md`, but treat it as a dated snapshot: re-verify every row before reuse.

### 3. Apply the benchmark-reading rules

State these caveats in the article whenever numbers are compared:

1. **Who published it.** Vendor-reported numbers are not independent results.
2. **Benchmark version.** GDPval-AA v2 and v2.1, OSWorld 2.0 and 2.1, CursorBench 3.2.0 and 4.0 are not comparable. Never merge rows across versions.
3. **Effort and settings.** Note the thinking-effort level (Medium, Xhigh, Max) and harness when stated.
4. **Subset and protocol.** "Partial", "strict", "offline subset" are different tests.
5. **Safeguard zeros.** If the source says safeguard interventions were scored as zero, say the row is likely a floor.
6. **Noise.** Mention the standard error when the source gives it; do not read 1-2 point gaps as differences.

Label your own calculations ("öz hisobim") and keep them reproducible with code in the post.

### 4. Write in Uzbek (2026 reformed Latin alphabet)

- Follow the alphabet section of `AGENTS.md`: `o'`→`ö`, `g'`→`ğ`, `sh`→`ş`, `ch`→`ç`; keep the tutuq belgisi (`ma'lumot`, `e'lon`, `ta'rif`).
- Drafting in the legacy spelling is fine if you convert with the same rules as `oldToNew()` in `src/pages/tools/uzbek-alphabet.astro`. Protect code, URLs and English terms (`benchmark`, `cache`, `Terminal-Bench`, brand names) from conversion, then review by hand.
- Uzbek comments and strings inside code blocks must also use the reformed alphabet; identifiers and API fields stay as they are.
- Blog `tags` stay ASCII (`anthropic`, `claude`, `ai`, `benchmark`, `llm`, `api`).
- Run the checker and resolve every hit (English terms may be false positives):

  ```bash
  node .claude/skills/anthropic-models-uz/scripts/check-uz-alphabet.mjs src/content/blog/<slug>.md
  ```

### 5. Article structure

Use `##` for sections and `###` for subsections (the page title is the `h1`). Headings below are written in the reformed alphabet.

1. Status-date callout (`> **Holat sanasi:** ...`).
2. Short framing: the engineering question, not product marketing.
3. `## Qisqaça: joriy lineup` — table: model, release date, API ID, price, intended use.
4. `## <Yil>-yil xronologiyasi` — dated list of releases and notable events (neutral tone for events such as export-control suspensions).
5. `## Benchmarkni öqişdan oldin` — the six rules above with a concrete example from the data.
6. One section per model: price, release date, technical changes, benchmark table with column headers naming the source, safety notes if relevant.
7. `## Amaliyot: kod bilan` — runnable examples (basic call, cost calculator, caching, routing/escalation, mini eval). Verify code: `python3 -I -m py_compile` for Python, `bun build --no-bundle` for TypeScript, and execute pure-logic code to check printed numbers.
8. `## Oxirgi yangiliklar` — dated news list with sources.
9. A decision table clearly labelled as the author's recommendation.
10. `## Çeklovlar va tekşirilmagan jihatlar` — what was not verified or not stated.
11. `## Manbalar` — links, with secondary sources marked.

Voice: precise, engineering-focused and practical, like an experienced developer writing for colleagues. Do not invent personal anecdotes or claim hands-on experience that did not happen.

### 6. Validate

```bash
bun run check   # type-check and content schema
bun run build   # production build + Pagefind index
```

Internal links must include the base path (`/Jasurbek/...`). Do not commit `dist/`, `node_modules/` or `.astro/`. Work on a feature branch; CI runs on every branch except `master`, and a push to `master` deploys the site.

## Never

- Mix benchmark versions or effort levels in one comparison without saying so.
- Present vendor numbers as independent verification.
- Write context windows, SWE-bench scores or API parameters that were not read from a source.
- Change URLs, file names, slugs or code identifiers while converting the alphabet.
- Change `pubDate` when revising an existing post.
