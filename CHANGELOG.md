# Changelog

## [3.7.0] - 2026-11-16

- Desktop app: automatic update check on launch, with a confirmation prompt and a separate update window.
- Desktop app: installs are protected from closing, reloading, and the context menu while they run.
- Release pipeline: Windows installer, signed updater manifest, and Android APK attached to a GitHub Release.
- Updater public key configured in `tauri.conf.json`.
- Version check script ensures package.json, tauri.conf.json, Cargo.toml and CHANGELOG agree.
