---
title: "Windows Restarts Instead of Shutting Down: How to Fix It"
description: "When Windows 10 or 11 restarts instead of shutting down, Fast Startup is a common cause. Turn it off in Power Options, or disable hibernation with powercfg."
pubDate: 2026-11-11
updatedDate: 2026-11-14
tags: ["windows-11", "windows-10", "fast-startup", "shutdown", "cmd", "win-troubleshooting"]
---

On some Windows 10 and Windows 11 laptops, choosing **Shut down** from the Start menu restarts the machine. Running `shutdown /s /f /t 0` from Command Prompt may power it off correctly. If that is your case, check Fast Startup first.

```bash
shutdown /s /f /t 0
```

## Why this happens

Fast Startup is a Windows feature that reduces boot time. It combines a traditional shutdown with hibernation: instead of closing the Windows kernel session completely, it saves part of the system state to the hibernation file. In some configurations this produces a restart instead of a power-off.

Other possible causes:

- Power management configuration.
- Device driver problems.
- BIOS/UEFI power settings.
- Windows system or update issues.

## Solution 1: Disable Fast Startup

Start with this solution. It does not change hibernation.

### Step 1. Open Power Options

Press `Win + R`, enter the following command, and press Enter:

```bash
powercfg.cpl
```

### Step 2. Open Power Button settings

1. Select **Choose what the power buttons do**.
2. Click **Change settings that are currently unavailable**.
3. Locate the **Shutdown settings** section.

### Step 3. Disable Fast Startup

Find the **Turn on fast startup (recommended)** option, uncheck it, and click **Save changes**.

Then shut down with **Start → Power → Shut down** to test the change.

## Solution 2: Disable hibernation with CMD

If Solution 1 does not fix the problem, disable hibernation from an elevated Command Prompt. Open CMD as Administrator and run:

```bash
powercfg /h off
```

This disables hibernation, and with it Fast Startup.

> **Important:** This also disables Hibernate mode. If you use hibernation, use Solution 1 instead.

To turn hibernation back on:

```bash
powercfg /h on
```

## Additional checks

Solutions 1 and 2 address one possible cause, Fast Startup. They do not cover every shutdown problem. If the restart continues, check these:

- Update the chipset and power management drivers.
- Install pending updates in Windows Update.
- Review the BIOS/UEFI power management settings, and change them only after you know which setting is involved.
- Check Event Viewer for shutdown-related errors.
