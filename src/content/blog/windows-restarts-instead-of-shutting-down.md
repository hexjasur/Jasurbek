---
title: "Windows Restarts Instead of Shutting Down: How to Fix It"
description: "Your Windows 10 or 11 laptop restarts when you click Shut down? Learn why Fast Startup can cause it and how to disable Fast Startup or hibernation with Power Options and CMD."
pubDate: 2026-11-10
tags: ["windows-11", "windows-10", "fast-startup", "shutdown", "cmd", "win-troubleshooting"]
---

Have you ever clicked **Shut down** in Windows, only to find that your laptop restarts instead of turning off completely?

This issue can occur in Windows 10 and Windows 11. Interestingly, shutting down through Command Prompt may work correctly, while using the regular Windows Start menu causes the laptop to restart.

For example, this command may successfully shut down the system:

```bash
shutdown /s /f /t 0
```

If you experience this behavior, Windows Fast Startup is one of the first things worth checking.

## Why does this happen?

One possible cause is **Fast Startup**, a Windows feature designed to reduce boot times.

Fast Startup combines elements of a traditional shutdown and hibernation. Instead of completely closing the Windows kernel session, it saves part of the system state to the hibernation file.

In some configurations, this feature can contribute to unexpected shutdown behavior, including situations where the computer restarts instead of powering off.

Other possible causes include:

- Power management configuration issues.
- Device driver problems.
- BIOS/UEFI power settings.
- Windows system or update-related issues.

## Solution 1: Disable Fast Startup

This is the recommended first troubleshooting step.

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

Find the following option:

**Turn on fast startup (recommended)**

Uncheck it and click **Save changes**.

Now try shutting down your laptop normally using **Start → Power → Shut down**.

## Solution 2: Disable Hibernate and Fast Startup using CMD

If the first solution does not resolve the issue, you can disable hibernation through an elevated Command Prompt.

Open CMD as Administrator and execute:

```bash
powercfg /h off
```

This command disables Windows hibernation and consequently disables Fast Startup.

> **Important:** This also disables Hibernate mode. If you regularly use hibernation, consider Solution 1 instead.

To restore hibernation later:

```bash
powercfg /h on
```

## Additional troubleshooting

If the problem persists, consider these additional checks:

- Update chipset and power management drivers.
- Check Windows Update for pending updates.
- Review BIOS/UEFI power management settings.
- Check Windows Event Viewer for shutdown-related errors.

Avoid changing BIOS settings randomly; investigate the specific hardware configuration first.

## Conclusion

If your Windows laptop restarts instead of shutting down, Fast Startup is a reasonable first suspect.

Disabling Fast Startup through Control Panel is a simple troubleshooting method that may resolve the issue without reinstalling Windows or modifying system files. If necessary, the `powercfg /h off` command provides an alternative by disabling hibernation and Fast Startup entirely.

**Quick takeaway:** Try disabling Fast Startup first, save the changes, and test a normal Windows shutdown.

*Tested troubleshooting approach: Windows 10 / Windows 11.*

*Note: This solution addresses one possible cause, not every shutdown-related issue.*
