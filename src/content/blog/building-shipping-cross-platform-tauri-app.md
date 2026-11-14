---
title: "Building and Shipping a Cross-Platform Tauri App"
description: "A practical look at packaging a Next.js and Rust application for Windows, Linux, and Android, using Numeric Methods as a real-world example."
pubDate: 2026-11-01
updatedDate: 2026-11-14
tags: ["tauri", "rust", "nextjs", "android", "desktop", "release-engineering"]
---

Each operating system has its own build tools, package formats, permissions, signing requirements, and update path, so one codebase does not mean one release process. This guide walks through those differences using [Numeric Methods](https://github.com/hexjasur/numeric-methods), an interactive numerical-computing application built for the web, desktop, and Android.

## Why use Tauri?

Numeric Methods uses Next.js and React for its interface, with Tauri v2 and Rust providing the native desktop and mobile runtime. This keeps most of the application experience in familiar web technologies while allowing the app to integrate with platform features through an explicit native boundary.

The web build and native shell have different jobs:

- **Next.js and React** render the interface and application workflows.
- **The static export** produces frontend assets that can be served by a website or loaded by Tauri.
- **Tauri and Rust** package those assets as an installed application and provide native functionality where needed.

![Diagram: bun run build writes the static export to out/. The Tauri shell loads out/ and packages it for Windows, Linux and Android, while a website can serve the same files](/images/blog/building-shipping-cross-platform-tauri-app/build-targets.svg)

Keeping those responsibilities separate makes it easier to test the web experience without launching a native app, while preserving a path to desktop and mobile releases.

## Set up the project

The project uses Bun for JavaScript dependencies and scripts. Rust is needed when building the Tauri desktop or mobile app.

```sh
bun install
bun dev
```

For the browser version, create the static export:

```sh
bun run build
```

The exported frontend is written to `out/`, which is used both for web deployments and as the Tauri app's frontend. This shared output avoids maintaining separate UI implementations for the website and native application.

## Build for desktop

After installing Rust and the dependencies required by your operating system, use the project's Tauri scripts:

```sh
bun td
bun tb
```

`bun td` runs the desktop app in development mode; `bun tb` creates production installers. Numeric Methods documents Windows installers (`.exe` and `.msi`) and Linux packages (`.deb` and `.AppImage`). The Tauri configuration lives in `src-tauri/tauri.conf.json`.

Build and test on the operating systems you intend to support. A successful build on one platform does not prove that the installers, system libraries, permissions, or native integrations work on another.

## Build for Android

Android adds a separate toolchain: Java JDK 17 or later, the Android SDK and NDK, and Rust targets for the Android CPU architectures you plan to support. The project recommends NDK r26d.

Initialize the Android project once, then run or package it:

```sh
bun run tauri:android:init
bun run tauri:android:dev
bun run tauri:android:build --apk
```

The standard APK build creates a universal APK. For smaller downloads tailored to a device architecture, build split APKs instead:

```sh
bun run tauri:android:build --apk --split-per-abi
```

Test on a physical device as well as an emulator. Keyboard behavior, screen size, file access, and mobile lifecycle events can differ significantly from desktop.

## Treat releases and updates as platform features

A release is more than a successful compilation. Users need an artifact that matches their operating system, clear installation instructions, and a trustworthy update path. Numeric Methods publishes Windows installers, Linux packages, and Android APKs through [GitHub Releases](https://github.com/hexjasur/numeric-methods/releases).

Its update mechanisms also reflect platform differences:

- **Windows and Linux desktop:** Tauri's signed updater checks the release metadata and can install updates.
- **Android:** the app detects a newer APK and opens its download page in the system browser.

Before publishing, verify that each release contains the expected files, that signing configuration is present, and that update metadata points to the correct version and artifacts. Keep signing keys private; do not commit them to the repository. Test an update from an older installed version, not only a fresh installation.

## A practical release checklist

1. Build the web export and run the project's tests.
2. Produce each desktop and mobile target from its supported toolchain.
3. Test installers and upgrades on real target systems or devices.
4. Confirm versions, filenames, signing, and release notes.
5. Check that update metadata and download links match the published artifacts.
6. Publish the release and verify the download and update flow from a clean install.
