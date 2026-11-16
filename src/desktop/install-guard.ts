/**
 * While an update installs, the window must not be reloaded, have its context menu opened,
 * or be closed. Only active inside the Tauri desktop app; the website never calls this.
 */
let active = false;
let installed = false;

const RELOAD_KEYS = new Set(['F5']);

function onContextMenu(event: Event) {
  if (active) event.preventDefault();
}

function onKeyDown(event: KeyboardEvent) {
  if (!active) return;
  const key = event.key.toLowerCase();
  const isReload = RELOAD_KEYS.has(event.key) || ((event.ctrlKey || event.metaKey) && key === 'r');
  if (isReload) event.preventDefault();
}

function onBeforeUnload(event: BeforeUnloadEvent) {
  if (!active) return;
  event.preventDefault();
}

export function setInstallGuard(enabled: boolean) {
  active = enabled;
  if (enabled && !installed) {
    window.addEventListener('contextmenu', onContextMenu, { capture: true });
    window.addEventListener('keydown', onKeyDown, { capture: true });
    window.addEventListener('beforeunload', onBeforeUnload);
    installed = true;
  }
}
