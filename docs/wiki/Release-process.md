# Release process

The desktop release is automated by `.github/workflows/release-desktop.yml`. The website deploy (`deploy.yml`) is separate.

## What the workflow does

On every push to `master`:

1. **check-version** runs `scripts/check-version.ts`. It fails the release if the versions differ or if `CHANGELOG.md` has no entry for the version.
2. The Windows installer is built and signed. Updater artifacts and `latest.json` are created.
3. The Android APK is built only when the keystore secrets are configured.
4. One GitHub Release is published.

The workflow can also be started by hand (`workflow_dispatch`). The `force` input rebuilds even when the tag already exists.

## Steps to release

1. Bump the version in **all three** places:
   - `package.json` (`version`)
   - `src-tauri/tauri.conf.json` (`version`)
   - `src-tauri/Cargo.toml` (`version`)
2. Add a `## [x.y.z]` entry to `CHANGELOG.md`.
3. Check locally: `bun scripts/check-version.ts` prints the version when everything matches.
4. Open a pull request, merge it into `master`, and the workflow runs.

## Troubleshooting

- **Version mismatch:** the three version fields must be identical.
- **Missing changelog entry:** add the `## [version]` heading exactly as the script expects.
- **Android skipped:** the keystore secrets are not set. The Windows release still runs.
