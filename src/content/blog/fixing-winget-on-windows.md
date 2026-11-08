---
title: "Fixing WinGet on Windows: Update, Repair, and Troubleshooting"
description: "How to diagnose and repair a broken or crashing WinGet installation on Windows 10 and 11: checking the version, updating sources, running the official repair commands, and verifying everything works again."
pubDate: 2026-11-09
tags: ["windows", "winget", "powershell", "developer-tools", "troubleshooting"]
---

WinGet (Windows Package Manager) is Microsoft's official command-line package manager for Windows. It lets developers search, install, upgrade, and manage applications directly from the terminal.

WinGet can still become outdated, stop responding, or crash during package searches and installations. This guide covers how to diagnose and repair the most common issues on Windows 10 and Windows 11.

## 1. Check the installed version

Open Command Prompt or PowerShell and run:

```powershell
winget --version
```

An outdated version can cause compatibility issues, unexpected behavior, or crashes. For example, an older installation might report:

```text
v1.2.10691
```

## 2. Identify the problem

Try searching for a package:

```powershell
winget search Rustup
```

If the command produces no output, freezes, or exits unexpectedly, check its exit code:

```powershell
echo $LASTEXITCODE
```

For example:

```text
-1073741819
```

This corresponds to Windows exception code `0xC0000005` (access violation), meaning the process hit an invalid memory access.

## 3. Check WinGet sources

WinGet uses package sources to discover available applications.

List the configured sources:

```powershell
winget source list
```

Update them:

```powershell
winget source update
```

If the Microsoft Store source requires agreement acceptance, review the terms shown and accept them if you agree.

## 4. Update WinGet (recommended)

WinGet is distributed through Microsoft's App Installer package.

1. Open the [App Installer page](https://apps.microsoft.com/detail/9NBLGGH4NNS1) in the Microsoft Store.
2. Click **Update** if one is available.
3. Wait for the installation to finish.
4. Close and reopen your terminal.

Check the version again:

```powershell
winget --version
```

An updated installation should report a newer version.

## 5. Repair WinGet with PowerShell

If updating App Installer doesn't resolve the issue, use Microsoft's WinGet repair mechanism.

Open PowerShell as Administrator, then install the NuGet package provider:

```powershell
Install-PackageProvider -Name NuGet -Force
```

Install the WinGet PowerShell module:

```powershell
Install-Module -Name Microsoft.WinGet.Client -Force -Repository PSGallery
```

Repair the package manager:

```powershell
Repair-WinGetPackageManager -Force -Latest
```

Restart your terminal after the repair finishes.

## 6. Verify the installation

```powershell
winget --version
winget source list
winget search Rustup
```

If package search works and returns results, WinGet is operational again.

## 7. Install applications

With WinGet working, you can install applications directly from the terminal. For example, install Rustup:

```powershell
winget install --id Rustlang.Rustup --exact
```

Verify Rust:

```powershell
rustup --version
rustc --version
cargo --version
```

## Troubleshooting summary

| Problem | Recommended solution |
| :-- | :-- |
| Old WinGet version | Update App Installer |
| Search returns no results | Check and update sources |
| WinGet crashes | Update App Installer and inspect the exit code |
| Installation fails | Check package availability and installer logs |
| WinGet remains broken | Run the PowerShell repair procedure |

## Official resources

- [WinGet documentation](https://learn.microsoft.com/en-us/windows/package-manager/winget/)
- [WinGet GitHub repository](https://github.com/microsoft/winget-cli)
- [Microsoft Store — App Installer](https://apps.microsoft.com/detail/9NBLGGH4NNS1)
- [Microsoft.WinGet.Client PowerShell module](https://learn.microsoft.com/en-us/powershell/module/microsoft.winget.client/)

Keeping App Installer updated and knowing the repair steps saves real time when setting up development environments and managing dependencies. If WinGet stops working, start by checking its version, updating App Installer, and running the PowerShell repair before falling back to manual installations.
