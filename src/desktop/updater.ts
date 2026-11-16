import { invoke } from '@tauri-apps/api/core';
import { relaunch } from '@tauri-apps/plugin-process';
import { check, type Update } from '@tauri-apps/plugin-updater';
import { setInstallGuard } from './install-guard';

export const CHECK_TIMEOUT_MS = 15_000;
const AUTO_CHECK_DELAY_MS = 2_500;
const AUTO_CHECK_COOLDOWN_MS = 60 * 60 * 1000;
const MAX_NOTES_LENGTH = 4_000;
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

const KEY_LAST_CHECK = 'updater:lastCheck';
const KEY_DISMISSED = 'updater:dismissedVersion';
const KEY_INSTALLING = 'updater:installing';
const INSTALL_MAX_AGE_MS = 15 * 60 * 1000;

export type UpdateInfo = {
  version: string;
  currentVersion: string;
  notes: string;
  date: string | null;
};

export type InstallEvent =
  | { phase: 'downloading'; downloaded: number; total: number | null }
  | { phase: 'installing' };

/** Storage can be blocked (private mode); the update flow must still work without it. */
function storageGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* ignored: the worst case is one extra check */
  }
}

/** A plain-text copy of the release notes, bounded and free of control characters. */
function sanitizeNotes(raw: string | undefined): string {
  return (raw ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, MAX_NOTES_LENGTH);
}

export function toInfo(update: Update): UpdateInfo {
  return {
    version: update.version,
    currentVersion: update.currentVersion,
    notes: sanitizeNotes(update.body),
    date: update.date ?? null,
  };
}

/**
 * Asks GitHub for `latest.json`. Returns null when the installed version is current.
 * Throws a readable error when the manifest is unusable, so the UI can show it.
 */
export async function findUpdate(): Promise<Update | null> {
  const update = await check({ timeout: CHECK_TIMEOUT_MS });
  if (!update) return null;

  if (!SEMVER.test(update.version)) {
    await update.close();
    throw new Error('Notöğri versiya raqami.');
  }
  return update;
}

/** Automatic check on launch: delayed, rate-limited, and skips a version the user already declined. */
export function scheduleAutoCheck(onFound: (update: Update) => void) {
  const last = Number(storageGet(KEY_LAST_CHECK) ?? 0);
  if (Date.now() - last < AUTO_CHECK_COOLDOWN_MS) return () => {};

  const timer = window.setTimeout(async () => {
    storageSet(KEY_LAST_CHECK, String(Date.now()));
    try {
      const update = await findUpdate();
      if (!update) return;
      if (storageGet(KEY_DISMISSED) === update.version) {
        await update.close();
        return;
      }
      onFound(update);
    } catch (error) {
      // A failed automatic check must never block the app.
      console.warn('Update check failed', error);
    }
  }, AUTO_CHECK_DELAY_MS);

  return () => window.clearTimeout(timer);
}

export function dismissVersion(version: string) {
  storageSet(KEY_DISMISSED, version);
}

/** Opens the separate update window; the user confirms there before anything is downloaded. */
export function openUpdaterWindow(): Promise<void> {
  return invoke('open_updater_window');
}

export function installingVersion(): string | null {
  const raw = storageGet(KEY_INSTALLING);
  if (!raw) return null;
  try {
    const { version, at } = JSON.parse(raw) as { version: string; at: number };
    return Date.now() - at < INSTALL_MAX_AGE_MS ? version : null;
  } catch {
    return null;
  }
}

export function clearInstallLock() {
  storageSet(KEY_INSTALLING, null);
}

let inFlight: Promise<void> | null = null;

/**
 * Downloads, verifies and installs one update. The updater plugin checks the signature
 * before anything is installed, and a second call while one is running is ignored.
 */
export function installUpdate(update: Update, onEvent: (event: InstallEvent) => void): Promise<void> {
  if (inFlight) return inFlight;

  inFlight = (async () => {
    storageSet(KEY_INSTALLING, JSON.stringify({ version: update.version, at: Date.now() }));
    setInstallGuard(true);
    await invoke('set_installing', { active: true });

    let total: number | null = null;
    let downloaded = 0;
    let lastEmit = 0;

    try {
      await update.downloadAndInstall((event) => {
        if (event.event === 'Started') {
          total = event.data.contentLength ?? null;
          onEvent({ phase: 'downloading', downloaded: 0, total });
        } else if (event.event === 'Progress') {
          downloaded += event.data.chunkLength;
          const now = Date.now();
          if (now - lastEmit > 100) {
            lastEmit = now;
            onEvent({ phase: 'downloading', downloaded, total });
          }
        } else if (event.event === 'Finished') {
          onEvent({ phase: 'installing' });
        }
      }, { timeout: CHECK_TIMEOUT_MS * 4 });

      if (total !== null && downloaded < total) {
        throw new Error('Yuklash töliq emas, qayta urinib köring.');
      }

      clearInstallLock();
      await relaunch();
    } catch (error) {
      clearInstallLock();
      await invoke('set_installing', { active: false }).catch(() => {});
      setInstallGuard(false);
      throw error;
    }
  })().finally(() => {
    inFlight = null;
  });

  return inFlight;
}

export function isInstallRunning(): boolean {
  return inFlight !== null;
}
