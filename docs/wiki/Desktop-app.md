# Desktop app (Tauri)

The desktop app wraps the same site in a native window. It uses **Tauri 2** and the system WebView, so it does not bundle Chromium.

- Product name: `jasurdev`
- Identifier: `uz.jasurdev.app`
- Rust code: `src-tauri/src/`
- Configuration: `src-tauri/tauri.conf.json` and `src-tauri/Cargo.toml`
- Permissions: `src-tauri/capabilities/`

## Develop

```bash
bun run td        # tauri dev
bun run td:safe   # same, with CARGO_BUILD_JOBS=1 for slower machines
```

## Build

```bash
bun run tb        # tauri build, produces the installer for your platform
bun run tb:safe   # same, with CARGO_BUILD_JOBS=1
```

Android scripts also exist: `android:init`, `android:dev` and `android:build`.

## Updates

The app checks for updates through the updater plugin. Release artifacts and `latest.json` are produced by the release workflow. See [Release process](Release-process).

## Requirements

- Rust (see `Cargo.toml` for the minimum version)
- The platform prerequisites from the Tauri 2 documentation
