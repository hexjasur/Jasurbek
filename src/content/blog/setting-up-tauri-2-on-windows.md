---
title: "Setting Up Tauri 2 on Windows: Installation Guide"
description: "Install Rust, the MSVC toolchain, Visual Studio C++ Build Tools and WebView2, then create or build a Tauri 2 app on Windows 10 or 11."
pubDate: 2026-11-09
updatedDate: 2026-11-14
tags: ["tauri", "rust", "windows", "webview2", "desktop"]
---

Tauri builds desktop apps from web technologies. The interface is HTML, CSS and JavaScript (React, Vue, Svelte or plain JS), and Rust handles the native side. This guide sets up Tauri 2.x on Windows 10 and Windows 11, in the order the tools depend on each other.

## 1. Prerequisites

You need these components:

| Component | Purpose |
| :-- | :-- |
| Node.js | JavaScript runtime |
| npm or Bun | Package management |
| Rust | Native application backend |
| Visual Studio C++ Build Tools | Native compilation |
| WebView2 Runtime | Renders the web UI |
| Git | Version control |

Check Node.js and npm:

```powershell
node --version
npm --version
```

If Node.js is missing, install it from [nodejs.org](https://nodejs.org/). [Bun](https://bun.sh/) also works.

## 2. Install Rust

Rustup is the recommended way to install Rust on Windows. With WinGet:

```powershell
winget install --id Rustlang.Rustup --exact
```

If WinGet fails, see [Fixing WinGet on Windows](/blog/fixing-winget-on-windows/). You can also download the installer from [rustup.rs](https://rustup.rs/).

Close and reopen the terminal, then check the tools:

```powershell
rustup --version
rustc --version
cargo --version
```

If `rustc` or `cargo` is not recognized, the terminal was not restarted or Rust is not on `PATH`.

## 3. Set the MSVC toolchain

Tauri needs the MSVC toolchain for native Windows builds. Make it the default:

```powershell
rustup default stable-x86_64-pc-windows-msvc
rustup show
```

The output should list the MSVC host and show the toolchain as active and default:

```text
Default host: x86_64-pc-windows-msvc

installed toolchains
--------------------
stable-x86_64-pc-windows-msvc (active, default)
```

## 4. Install Visual Studio C++ Build Tools

Download [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/), run the installer and select **Desktop development with C++**. Make sure these are included:

- MSVC C++ build tools (v143 or newer)
- Windows 10 SDK or Windows 11 SDK
- C++ build tools core features

Restart the terminal after the installation. Rust needs these tools to link native Windows dependencies. Without them, you get MSVC linker errors.

## 5. WebView2 Runtime

Tauri renders its UI with Microsoft Edge WebView2, a Chromium-based runtime. Windows 11 usually has it already. Check for it first:

```powershell
Test-Path "C:\Program Files (x86)\Microsoft\EdgeWebView\Application"
```

If it returns `False`, install the Evergreen runtime from the [WebView2 page](https://developer.microsoft.com/en-us/microsoft-edge/webview2/). The Evergreen Bootstrapper is the simplest option, and the Evergreen Standalone Installer works offline. The Fixed Version option packages a fixed runtime with your app, which you only need for specific deployment cases.

## 6. Create a new Tauri project

Create the project with your package manager:

```powershell
npm create tauri-app@latest
```

or with Bun:

```powershell
bun create tauri-app
```

Choose a frontend framework and package manager in the prompts, then start the app:

```powershell
cd your-project-name
npm install
npm run tauri dev
```

A desktop window opens with the template app.

## 7. Add Tauri to an existing Vite project

If you already have a Vite project, add Tauri to it instead of creating a new one:

```powershell
npm install -D @tauri-apps/cli@^2
npx tauri init
npx tauri dev
```

`tauri init` asks about your dev server and build output. Answer them to match your Vite setup.

## 8. Build the application

For a production build:

```powershell
npm run tauri build
```

With Bun, run `bun run tauri build`. Installers are written to `src-tauri/target/release/bundle/`. Depending on your bundle settings, you get an MSI and an NSIS EXE.

