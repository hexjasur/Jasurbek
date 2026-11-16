import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
import type { Update } from '@tauri-apps/plugin-updater';
import {
  clearInstallLock,
  dismissVersion,
  findUpdate,
  installUpdate,
  installingVersion,
  isInstallRunning,
  openUpdaterWindow,
  scheduleAutoCheck,
  toInfo,
  type InstallEvent,
} from './updater';

const NO_NOTES = 'No release notes for this version.';

/** Main window: update prompt and manual check. Loaded only inside the desktop app. */
export function initDesktop() {
  scheduleAutoCheck((update) => showUpdateDialog(update));
  addManualCheckButton();
}

/** Update window (page /updater/). Downloads and installs after the user confirms. */
export function initUpdaterWindow() {
  runUpdaterWindow();
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function button(label: string, className: string, onClick: () => void) {
  const node = el('button', `dsk-btn ${className}`, label);
  node.type = 'button';
  node.addEventListener('click', onClick);
  return node;
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** Update prompt in the main window. Nothing is downloaded until the user confirms. */
function showUpdateDialog(update: Update) {
  const info = toInfo(update);
  const dialog = el('dialog', 'dsk-dialog');
  dialog.setAttribute('aria-labelledby', 'dsk-update-title');

  const title = el('h2', 'dsk-title', 'New version available');
  title.id = 'dsk-update-title';
  const versions = el('p', 'dsk-muted', `Current: ${info.currentVersion} · New: ${info.version}`);
  const notesLabel = el('p', 'dsk-label', "What's new");
  const notes = el('div', 'dsk-notes', info.notes || NO_NOTES);
  notes.tabIndex = 0;

  const message = el('p', 'dsk-error');
  message.setAttribute('role', 'alert');

  const actions = el('div', 'dsk-actions');
  const later = button('Later', 'dsk-btn-secondary', () => {
    dismissVersion(info.version);
    void update.close();
    dialog.close();
  });
  const updateNow = button('Update now', 'dsk-btn-primary', async () => {
    updateNow.disabled = true;
    try {
      await openUpdaterWindow();
      dialog.close();
    } catch (error) {
      updateNow.disabled = false;
      message.textContent = `Error: ${describe(error)}`;
    }
  });
  actions.append(later, updateNow);

  dialog.append(title, versions, notesLabel, notes, message, actions);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    later.click();
  });
  dialog.addEventListener('close', () => dialog.remove());
  document.body.append(dialog);
  dialog.showModal();
  updateNow.focus();
}

/** Manual check: the same validation as the automatic one, with visible results. */
function addManualCheckButton() {
  const status = el('p', 'dsk-status');
  status.setAttribute('role', 'status');
  const trigger = button('Check update', 'dsk-btn-floating', async () => {
    trigger.disabled = true;
    status.textContent = 'Checking...';
    try {
      const update = await findUpdate();
      status.textContent = update ? '' : 'You are on the latest version.';
      if (update) showUpdateDialog(update);
    } catch (error) {
      status.textContent = `Error: ${describe(error)}`;
    } finally {
      trigger.disabled = false;
    }
  });
  const wrap = el('div', 'dsk-floating');
  wrap.append(trigger, status);
  document.body.append(wrap);
}

/** Update window: downloads and installs the update the user just confirmed. */
function runUpdaterWindow() {
  document.body.replaceChildren();

  const panel = el('main', 'dsk-panel');
  const heading = el('h1', 'dsk-title', 'Updating Jasurdev.uz');
  const status = el('p', 'dsk-muted', 'Checking for the update...');
  status.setAttribute('role', 'status');
  const progress = el('progress', 'dsk-progress');
  progress.hidden = true;
  progress.setAttribute('aria-label', 'Update progress');
  const actions = el('div', 'dsk-actions');
  panel.append(heading, status, progress, actions);
  document.body.append(panel);

  const closeWindow = button('Close', 'dsk-btn-secondary', () => {
    void getCurrentWebviewWindow().close();
  });
  const retry = button('Try again', 'dsk-btn-primary', () => {
    actions.replaceChildren();
    void start();
  });

  const onEvent = (event: InstallEvent) => {
    if (event.phase === 'downloading') {
      progress.hidden = false;
      status.textContent = 'Downloading...';
      if (event.total) {
        progress.max = event.total;
        progress.value = event.downloaded;
      } else {
        progress.removeAttribute('value'); // size unknown: indeterminate
      }
    } else {
      progress.removeAttribute('value');
      status.textContent = 'Installing... The app will restart automatically.';
    }
  };

  const start = async () => {
    if (isInstallRunning()) return;
    actions.replaceChildren();
    progress.hidden = true;
    status.textContent = 'Checking for the update...';
    try {
      const update = await findUpdate();
      if (!update) {
        status.textContent = 'You are already on the latest version.';
        actions.replaceChildren(closeWindow);
        return;
      }
      status.textContent = `Downloading version ${update.version}...`;
      await installUpdate(update, onEvent);
    } catch (error) {
      progress.hidden = true;
      status.textContent = `Error: ${describe(error)}`;
      status.setAttribute('role', 'alert');
      actions.replaceChildren(retry, closeWindow);
    }
  };

  // A reload or crash mid-install leaves a lock behind. Do not restart the download silently.
  if (installingVersion()) {
    status.textContent = 'The previous update may have been interrupted.';
    const recheck = button('Check again', 'dsk-btn-primary', () => {
      clearInstallLock();
      actions.replaceChildren();
      void start();
    });
    actions.replaceChildren(recheck, closeWindow);
    return;
  }

  void start();
}
