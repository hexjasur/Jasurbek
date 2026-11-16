// Fails the release when the three version fields disagree or CHANGELOG.md has no entry for them.
// Run with: bun scripts/check-version.ts  (prints the version on success)
import { readFileSync } from 'node:fs';

const read = (file: string) => readFileSync(file, 'utf8');

const pkg = (JSON.parse(read('package.json')) as { version: string }).version;
const tauri = (JSON.parse(read('src-tauri/tauri.conf.json')) as { version?: string }).version;
const cargo = /^version\s*=\s*"([^"]+)"/m.exec(read('src-tauri/Cargo.toml'))?.[1];
const changelog = read('CHANGELOG.md');

const versions = { 'package.json': pkg, 'src-tauri/tauri.conf.json': tauri, 'src-tauri/Cargo.toml': cargo };
const unique = new Set(Object.values(versions));
if (unique.size !== 1 || unique.has(undefined)) {
  console.error('Version mismatch:', versions);
  process.exit(1);
}

const escaped = pkg.replace(/\./g, '\\.');
if (!new RegExp(`^##\\s+\\[?v?${escaped}\\]?`, 'm').test(changelog)) {
  console.error(`CHANGELOG.md has no entry for ${pkg}`);
  process.exit(1);
}

console.log(pkg);
