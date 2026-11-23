---
title: "GitHub Profile README: Updates"
description: "What I changed in my GitHub profile README: an automated Pac-Man contribution graph, a profile view counter, and the workflow behind them."
pubDate: 2026-11-24
tags: ["github", "github-actions", "profile"]
---

My GitHub profile README is the first thing people see when they open my account. Until now it was mostly static: a header, a tech badge list, and some stats cards. This post covers the two additions I made today and the workflow that keeps one of them up to date.

## Pac-Man contribution graph

![Pac-Man contribution graph](https://raw.githubusercontent.com/hexjasur/hexjasur/output/dist/pacman-contribution-graph.svg)

The Pac-Man block is generated from my contribution grid by the `abozanona/pacman-contribution-graph` action. I use the pinned version `v5.0.0`, so an upstream release cannot change the behavior of the workflow without my approval.

The workflow lives in `.github/workflows/pacman.yml`. It runs in three cases:

- once a day, on a cron schedule
- manually, through `workflow_dispatch`
- on a push to `main`

The action writes the generated SVG to `dist/pacman-contribution-graph.svg` on an `output` branch. The README points at that file through its raw URL, so the image updates without a commit to `main`.

Workflow (`.github/workflows/pacman.yml`):

```yaml
name: Generate Pacman Contribution Graph

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: abozanona/pacman-contribution-graph@v5.0.0
        with:
          github_user_name: hexjasur
          outputs: dist/pacman-contribution-graph.svg
          branch: output
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

README embed (the image URL is the raw file on the `output` branch):

```html
<img src="https://raw.githubusercontent.com/hexjasur/hexjasur/output/dist/pacman-contribution-graph.svg" alt="Pac-Man contribution graph" width="760" />
```

Before the first run, the `output` branch does not exist, so the image URL returns 404. Run the workflow once from the Actions tab to create the branch and the SVG.

## Profile view counter

The counter is an image from `count.getloli.com`, keyed to my username. Each page load increments the count on their side. I did not host it myself, so if that service goes down, the image goes with it.

```html
<img src="https://count.getloli.com/@:hexjasur?theme=booru-twifanartsfw&padding=7&scale=1&align=top&pixelated=1&darkmode=auto" alt="Profile views" />
```

## Input names

The action's `with:` keys (`github_user_name`, `outputs`, `branch`, `github_token`) come from my reading of its Marketplace page. I have not checked them against the current action source. If the graph does not appear after the first run, compare the keys with the action's README before changing anything else.

## Next steps

I plan to add more sections to the profile over time, but I have not decided which ones yet.
