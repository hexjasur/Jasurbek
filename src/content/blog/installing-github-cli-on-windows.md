---
title: "Installing GitHub CLI on Windows: WinGet and the Manual Installer"
description: "Install GitHub CLI (gh) on Windows with WinGet or the MSI installer, then verify the install, sign in, and run the everyday commands."
pubDate: 2026-11-09
updatedDate: 2026-11-14
tags: ["windows", "github", "cli", "developer-tools", "git"]
---

GitHub CLI (`gh`) runs common GitHub tasks from the terminal: pull requests, issues, releases, and repositories. On Windows there are two ways to install it. Use WinGet if `winget` works on your machine; otherwise use the manual installer.

## Method 1: Install via WinGet

```powershell
winget install --id GitHub.cli
```

WinGet resolves the latest release and registers `gh` on your `PATH`. Close and reopen the terminal afterward so the `PATH` change takes effect.

To update later:

```powershell
winget upgrade --id GitHub.cli
```

If WinGet fails, hangs, or is not recognized, see [Fixing WinGet on Windows](/blog/fixing-winget-on-windows/), then retry the command above or use the manual installer.

## Method 2: Manual installer

Download the installer from the [GitHub CLI releases page](https://github.com/cli/cli/releases):

- **64-bit Windows (most common):** `gh_2.103.3_windows_amd64.msi`
- **ARM64 Windows:** `gh_2.103.3_windows_arm64.msi`

Run the `.msi` and follow the prompts. It adds `gh` to your `PATH`. A `.zip` build is also published for each platform if you want to extract `gh.exe` yourself and place it on your `PATH`.

As with WinGet, restart the terminal after installing.

## Verify the installation

```powershell
gh --version
```

The first line has the form `gh version X.Y.Z (date)`. The second line is the URL of the release notes for that version. Check that the version matches the release you installed.

## Authenticate with GitHub

```powershell
gh auth login
```

Choose `GitHub.com`, pick HTTPS or SSH, and finish the browser-based authorization. Then confirm the result:

```powershell
gh auth status
```

## Everyday commands

```powershell
# Repositories
gh repo clone owner/repo          # clone a repository
gh repo create my-project         # create a repository (prompts for options)
gh repo fork owner/repo           # fork a repository
gh repo view --web                # open the current repository in the browser

# Pull requests
gh pr create                      # open a PR for the current branch (prompts)
gh pr create --fill               # open a PR; title and body come from the commits
gh pr list                        # list open PRs in the current repository
gh pr checkout 123                # check out PR #123 locally
gh pr view 123 --web              # open PR #123 in the browser
gh pr merge 123 --squash          # squash-merge PR #123

# Issues
gh issue list                     # list open issues
gh issue create                   # create an issue (prompts)
gh issue view 42                  # show issue #42
gh issue close 42                 # close issue #42

# Releases and workflows
gh release list                   # list releases
gh run list                       # recent GitHub Actions runs
gh run watch                      # follow the current run live
```

Run `gh <command> --help` (for example `gh pr merge --help`) to see every flag for a command.
