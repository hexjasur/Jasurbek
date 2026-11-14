---
title: "@hexjasur/AGENTS.md: Install and Update AI Agent Guides"
description: "A short guide to what @hexjasur/agents-md does and how to install and update project instructions and Agent Skills."
pubDate: 2026-11-01
updatedDate: 2026-11-14
tags: ["ai", "agents", "developer-tools", "documentation"]
---

## What is AGENTS.md?

[`@hexjasur/agents-md`](https://github.com/hexjasur/AGENTS.md) is a CLI that installs an `AGENTS.md` file and Agent Skills. They give AI coding agents reusable guidance on your project's technologies, conventions, and workflows, so you do not repeat the same instructions in every session.

## What it does

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

Pass `all` to install every Skill. The installer writes `AGENTS.md`, the selected Skills under `.agent/skills/`, and a management manifest at `.agent/hexjasurs.agent.scheme.json`.

## Updating

Run the `update` command with your project's directory:

```sh
npx -y @hexjasur/agents-md update ./my-app
```

The updater compares the installed `AGENTS.md` hash with the manifest and adds missing Skills. Existing Skill directories are left unchanged. If you edited a managed `AGENTS.md`, the update may stop to protect your changes. Review them before you continue. If you use only selected Skills, pass the same `--skills` list when you update.

## Keep in mind

The tool installs guidance for AI agents. It does not automatically modify your project's application code, so review the installed files and adapt them to your project. For more options, run `npx -y @hexjasur/agents-md --help`.
