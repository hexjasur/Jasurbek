# Changelog

## [3.7.1] - 2026-11-16

- Renamed the manual update button to "Check update".
- Update prompt buttons are now "Update now" and "Later".
- Update window title is now "Jasurdev.uz Update".
- Fixed "plugin:updater|check not allowed by ACL" error: the main window can now check for updates.
- Set a minimum window size for the main window (360x640) so it does not shrink below mobile width.
- The window size and position are now remembered between launches.
- Fixed Android build errors: updater permissions and the update window are desktop-only.

## [3.7.0] - 2026-11-16

- Desktop app: automatic update check on launch, with a confirmation prompt and a separate update window.
- Desktop app: installs are protected from closing, reloading, and the context menu while they run.
- Release pipeline: Windows installer, signed updater manifest, and Android APK attached to a GitHub Release.
- Updater public key configured in `tauri.conf.json`.
- Version check script ensures package.json, tauri.conf.json, Cargo.toml and CHANGELOG agree.
