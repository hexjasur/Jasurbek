---
title: "Installing GitHub CLI on Windows: WinGet and the Manual Installer"
description: "Two ways to install GitHub CLI (gh) on Windows: through WinGet, and with the standalone gh_2.103.3_windows_amd64 installer. Includes verification, authentication, and what to do if WinGet itself is broken."
pubDate: 2026-11-09
tags: ["windows", "github", "cli", "developer-tools", "git"]
---

GitHub CLI (`gh`) brings GitHub to the terminal: pull requests, issues, releases, and repository management without leaving the command line. On Windows there are two straightforward ways to install it, depending on what's already set up on your machine.

## Method 1: Install via WinGet

If your system has WinGet (Windows 10 1709+ or Windows 11), this is the fastest route:

```powershell
winget install --id GitHub.cli
```

WinGet resolves the latest release automatically and registers `gh` on your `PATH`. Close and reopen your terminal afterward so the `PATH` update takes effect.

To update later:

```powershell
winget upgrade --id GitHub.cli
```

If WinGet itself fails, hangs, or isn't recognized, see [Fixing WinGet on Windows](/Jasurbek/blog/fixing-winget-on-windows/) for a separate troubleshooting guide, then come back and retry the command above. Alternatively, skip straight to the manual installer below.

## Method 2: Manual installer

For machines without WinGet, or as a direct fallback, download the installer straight from the [GitHub CLI releases page](https://github.com/cli/cli/releases):

- **64-bit Windows (most common):** `gh_2.103.3_windows_amd64.msi`
- **ARM64 Windows:** `gh_2.103.3_windows_arm64.msi`

Run the downloaded `.msi` and follow the installer steps; it adds `gh` to your `PATH` automatically. A `.zip` build is also published for each platform if you'd rather extract `gh.exe` manually and place it somewhere on your `PATH` yourself.

As with WinGet, restart your terminal after installing so it picks up the updated `PATH`.

## Verify the installation

Regardless of which method you used, confirm it worked:

```powershell
gh --version
```

```text
gh version 2.103.3 (2026-xx-xx)
https://github.com/cli/cli/releases/tag/v2.103.3
```

## Authenticate with GitHub

Before using `gh` against your repositories, log in:

```powershell
gh auth login
```

Choose `GitHub.com`, pick HTTPS or SSH, and follow the browser-based device flow to authorize. Check the result with:

```powershell
gh auth status
```

From there, `gh repo clone`, `gh pr create`, and `gh issue list` are ready to use.
