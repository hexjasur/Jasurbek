---
title: "Remove Phone Link on Windows 11 with PowerShell"
description: "Uninstall Microsoft Phone Link (package Microsoft.YourPhone) on Windows 10 and 11 with one admin PowerShell command, then reinstall it from the Microsoft Store if needed."
pubDate: 2026-11-17
updatedDate: 2026-11-17
tags: ["windows", "windows-11", "windows-10", "powershell", "phone-link", "win-troubleshooting"]
---

Phone Link, formerly Your Phone, ships with Windows 10 and 11. If you never use it, you can remove it with one PowerShell command. The package keeps its old name, `Microsoft.YourPhone`, and the command depends on that name.

The command removes the app for every user account on the machine, so you need administrator rights.

## Open PowerShell as administrator

Click Start, type `PowerShell`, and choose **Run as administrator**. A regular window cannot remove a package for all accounts, so the command fails without admin rights.

## Remove the package

Paste this command and press Enter:

```powershell
Get-AppxPackage Microsoft.YourPhone -AllUsers | Remove-AppxPackage
```

The command prints nothing on success. It also prints nothing when no package matches, so check the result in the next step.

## Check the result

```powershell
Get-AppxPackage -AllUsers *YourPhone*
```

An empty output means the package is gone.

## If the removal fails

A guide by WinHelpOnline reports error `0x80070002` for this command on some systems. It suggests reading the full package name first:

```powershell
Get-AppxPackage -AllUsers *yourphone* | Select-Object PackageFullName
```

That guide then adds a registry change to finish the removal. I did not test that step and do not repeat it here. Read the guide before you edit the registry.

## Reinstall Phone Link

Open the Microsoft Store listing:

[apps.microsoft.com/detail/9nmpj99vjbwv](https://apps.microsoft.com/detail/9nmpj99vjbwv?hl=en-US&gl=PK)

Or install it from an admin Command Prompt with winget. Winget asks you to review the terms and press `Y`:

```powershell
winget install 9NMPJ99VJBWV
```

After installing, enable the phone features under **Settings → Bluetooth & devices → Mobile devices**.

I did not run these commands on a Windows machine while writing this post. The package name and the reinstall ID come from the sources below.

## Sources

- [WinHelpOnline: Uninstall and reinstall the Phone Link app](https://www.winhelponline.com/blog/uninstall-reinstall-phone-link-app/)
- [Phone Link on the Microsoft Store](https://apps.microsoft.com/detail/9nmpj99vjbwv?hl=en-US&gl=PK)
