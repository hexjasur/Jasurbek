---
title: "Setting Up Tauri 2 on Windows: Complete Installation Guide"
description: "A complete walkthrough for setting up Tauri 2.x on Windows: installing Rust and the MSVC toolchain, Visual Studio C++ Build Tools, WebView2, and creating, developing, or adding Tauri to an existing Vite project."
pubDate: 2026-11-09
tags: ["tauri", "rust", "windows", "webview2", "desktop"]
---

Tauri is a framework for building lightweight, cross-platform desktop applications using web technologies and Rust. It lets you build native desktop apps with frontend frameworks such as React, Vue, Svelte, or vanilla JavaScript, while Rust handles native functionality.

This guide covers the complete setup process for Tauri 2.x on Windows 10 and Windows 11.

## 1. Prerequisites

Before creating a Tauri application, make sure the following are installed:

| Component | Purpose |
| :-- | :-- |
| Node.js | JavaScript runtime |
| npm / Bun | Package management |
| Rust | Native application backend |
| Visual Studio C++ Build Tools | Native compilation |
| WebView2 Runtime | Web-based UI rendering |
| Git | Version control |

Check Node.js:

```powershell
node --version
npm --version
```

If Node.js isn't installed, download it from [nodejs.org](https://nodejs.org/). You can also use [Bun](https://bun.sh/) if you prefer.

## 2. Install Rust

Tauri uses Rust for its native application layer. The recommended installation method on Windows is Rustup.

Using WinGet:

```powershell
winget install --id Rustlang.Rustup --exact
```

If WinGet isn't working, see [Fixing WinGet on Windows](/blog/fixing-winget-on-windows/) for a separate troubleshooting guide. Alternatively, download the official installer from [rustup.rs](https://rustup.rs/).

After installation, close and reopen your terminal, then verify:

```powershell
rustup --version
rustc --version
cargo --version
```

## 3. Configure the MSVC toolchain

Tauri requires the MSVC toolchain for native Windows compilation.

Set the default Rust toolchain:

```powershell
rustup default stable-x86_64-pc-windows-msvc
```

Verify the active configuration:

```powershell
rustup show
```

You should see something similar to:

```text
Default host: x86_64-pc-windows-msvc

installed toolchains
--------------------
stable-x86_64-pc-windows-msvc (active, default)
```

## 4. Install Visual Studio C++ Build Tools

Download [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/), run the installer, and select **Desktop development with C++**.

Make sure these components are included:

- MSVC C++ Build Tools (v143 or newer)
- Windows 10 SDK or Windows 11 SDK
- C++ Build Tools core features

Complete the installation and restart your terminal. This toolchain is required to compile native Rust dependencies for Windows.

## 5. WebView2 Runtime

Tauri uses Microsoft Edge WebView2 to render its frontend interface. WebView2 is Chromium-based and lets desktop applications display HTML, CSS, and JavaScript inside native application windows.

Windows 11 generally includes WebView2 Runtime already, so check before downloading it:

```powershell
Test-Path "C:\Program Files (x86)\Microsoft\EdgeWebView\Application"
```

If the directory exists, inspect its contents:

```powershell
Get-ChildItem "C:\Program Files (x86)\Microsoft\EdgeWebView\Application" -ErrorAction SilentlyContinue
```

If WebView2 is missing, download the official [Evergreen Standalone Installer](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) for x64. Available options:

- **Evergreen Bootstrapper** — downloads and installs the appropriate runtime.
- **Evergreen Standalone Installer** — full offline-capable installer.
- **Fixed Version** — packages a specific runtime version with an application.

For a typical Windows development environment, the Evergreen Runtime is recommended.

## 6. Create a new Tauri project

Once prerequisites are installed, create a new project:

```powershell
npm create tauri-app@latest
```

Or with Bun:

```powershell
bun create tauri-app
```

Follow the interactive setup to select your preferred frontend framework and package manager, then:

```powershell
cd your-project-name
npm install
npm run tauri dev
```

Your Tauri desktop application should now launch.

## 7. Add Tauri to an existing Vite project

If you already have a Vite project, you don't need to create a new one.

Install the Tauri CLI:

```powershell
npm install -D @tauri-apps/cli@^2
```

Initialize Tauri:

```powershell
npx tauri init
```

Configure the project according to your frontend setup, then start it:

```powershell
npx tauri dev
```

## 8. Build the application

When development is complete, generate production builds:

```powershell
npm run tauri build
```

Or with Bun:

```powershell
bun run tauri build
```

Tauri writes distributable packages to `src-tauri/target/release/bundle/`. Depending on your configuration and enabled bundle targets, the output may include a Windows MSI installer and an NSIS EXE installer.

## 9. Final environment verification

Before starting development, verify the main components:

```powershell
node --version
npm --version

rustup --version
rustc --version
cargo --version

rustup show
```

Also confirm that Visual Studio C++ Build Tools and WebView2 Runtime are available.

## Common issues

| Issue | Solution |
| :-- | :-- |
| `rustc is not recognized` | Reopen the terminal or check Rust PATH |
| `cargo is not recognized` | Verify the Rustup installation |
| MSVC linker errors | Install Visual Studio C++ Build Tools |
| WebView2 missing | Install the Evergreen WebView2 Runtime |
| WinGet search crashes | See the [WinGet troubleshooting guide](/blog/fixing-winget-on-windows/) |
| Rust compilation fails | Check the MSVC toolchain and Windows SDK |

## Official documentation

- [Tauri 2 documentation](https://v2.tauri.app/)
- [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/)
- [Tauri getting started](https://v2.tauri.app/start/)
- [Tauri development](https://v2.tauri.app/develop/)
- [Tauri distribution](https://v2.tauri.app/distribute/)
- [Rust official website](https://www.rust-lang.org/)
- [WebView2 documentation](https://learn.microsoft.com/en-us/microsoft-edge/webview2/)

Setting up Tauri on Windows takes a few system-level dependencies, but once Rust, MSVC Build Tools, and WebView2 are configured, the development workflow becomes straightforward. With Tauri 2, you can combine modern frontend technologies with Rust to build lightweight, native desktop applications for Windows and other platforms.
