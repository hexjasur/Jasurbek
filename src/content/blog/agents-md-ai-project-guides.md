---
title: "@hexjasur/AGENTS.md: Install and Update AI Agent Guides"
description: "A short guide to what @hexjasur/agents-md does and how to install and update project instructions and Agent Skills."
pubDate: 2026-11-01
tags: ["ai", "agents", "developer-tools", "documentation"]
---

## What is AGENTS.md?

[`@hexjasur/agents-md`](https://github.com/hexjasur/AGENTS.md) is a CLI tool that installs an `AGENTS.md` file and Agent Skills to give AI coding agents reusable guidance about your project's technologies, conventions, and workflows. This saves you from repeating the same instructions in every session.

## What can it do?

- Installs project-level guidance in `AGENTS.md`.
- Lets you choose Skills for areas such as React, web development, Tauri, CI/CD, and Ren'Py.
- Updates an existing installation and adds missing Skills.
- Shows what it plans to install and asks for confirmation. It does not silently overwrite existing files.

List all available Skills:

```sh
npx -y @hexjasur/agents-md --list-skills
```

## Installation

You need Node.js 18 or later. Open a terminal in your project directory and start the interactive installer:

```sh
npx -y @hexjasur/agents-md
```

To install only selected Skills, pass their comma-separated names with `--skills`:

```sh
npx -y @hexjasur/agents-md --skills react-typescript,ui-ux-design,testing-web
```

You can also pass `all` to install every Skill. The installer writes `AGENTS.md`, the selected Skills under `.agent/skills/`, and a management manifest at `.agent/hexjasurs.agent.scheme.json`.

## Updating

Run the `update` command and provide your project's directory:

```sh
npx -y @hexjasur/agents-md update ./my-app
```

The updater compares the installed `AGENTS.md` hash with the manifest and adds missing Skills. Existing Skill directories are left unchanged. If you have edited a managed `AGENTS.md`, the update may stop to protect your changes; review them before proceeding. If you use only selected Skills, pass the same selection with `--skills` when updating.

## Keep in mind

This tool installs guidance for AI agents; it does not automatically modify your project's application code. Review the installed files and adapt them to your project. For more options, run `npx -y @hexjasur/agents-md --help`.
