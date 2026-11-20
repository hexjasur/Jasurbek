// Removes Astro's persisted content store before each build.
// Without this, a post edited since the last build can trigger a false
// "Duplicate id" warning from the glob loader (the stored entry is re-read
// and overwritten). A clean store makes each build deterministic.
import { rmSync } from 'node:fs';

rmSync('node_modules/.astro', { recursive: true, force: true });
rmSync('.astro', { recursive: true, force: true });
