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

const UPDATER_LABEL = 'updater';

/** Entry point, loaded only inside the desktop app. The website never imports this module. */
export async function initDesktop() {
  const label = getCurrentWebviewWindow().label;
  if (label === UPDATER_LABEL) {
    runUpdaterWindow();
    return;
  }
  scheduleAutoCheck((update) => showUpdateDialog(update));
  addManualCheckButton();
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

/** Update prompt in the main window. Nothing is downloaded until the user confirms. */
function showUpdateDialog(update: Update) {
  const info = toInfo(update);
  const dialog = el('dialog', 'dsk-dialog');
  dialog.setAttribute('aria-labelledby', 'dsk-update-title');

  const title = el('h2', 'dsk-title', 'Yangi versiya mavjud');
  title.id = 'dsk-update-title';
  const versions = el('p', 'dsk-muted', `Joriy versiya: ${info.currentVersion}. Yangi versiya: ${info.version}.`);
  const notesLabel = el('p', 'dsk-label', 'Özgarişlar');
  const notes = el('div', 'dsk-notes');
  notes.textContent = info.notes || "Qöşimça ma'lumot yöq.";
  notes.tabIndex = 0;

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
      message.textContent = `Xatolik: ${describe(error)}`;
    }
  });
  const message = el('p', 'dsk-error');
  message.setAttribute('role', 'alert');

  actions.append(later, updateNow);
  dialog.append(title, versions, notesLabel, notes, message, actions);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    later.click();
  });
  document.body.append(dialog);
  dialog.showModal();
  updateNow.focus();
}

/** Manual check: the same validation as the automatic one, with visible results. */
function addManualCheckButton() {
  const status = el('p', 'dsk-status');
  status.setAttribute('role', 'status');
  const trigger = button('Yangilanişni tekşiriş', 'dsk-btn-floating', async () => {
    trigger.disabled = true;
    status.textContent = 'Tekşirilmoqda...';
    try {
      const update = await findUpdate();
      status.textContent = update ? '' : 'Yangi versiya yöq.';
      if (update) showUpdateDialog(update);
    } catch (error) {
      status.textContent = `Xatolik: ${describe(error)}`;
    } finally {
      trigger.disabled = false;
    }
  });
  const wrap = el('div', 'dsk-floating');
  wrap.append(trigger, status);
  document.body.append(wrap);
}

/** Separate window: downloads and installs the update the user just confirmed. */
function runUpdaterWindow() {
  document.body.className = 'dsk-updater-window';
  document.body.replaceChildren();

  const panel = el('main', 'dsk-panel');
  const heading = el('h1', 'dsk-title', 'Yangilaniş');
  const status = el('p', 'dsk-muted', 'Tekşirilmoqda...');
  status.setAttribute('role', 'status');
  const progress = el('progress', 'dsk-progress');
  progress.hidden = true;
  progress.setAttribute('aria-label', 'Yangilaniş jarayoni');
  const actions = el('div', 'dsk-actions');
  panel.append(heading, status, progress, actions);
  document.body.append(panel);

  const closeWindow = button('Yopiş', 'dsk-btn-secondary', () => {
    void getCurrentWebviewWindow().close();
  });
  const retry = button('Qayta uriniş', 'dsk-btn-primary', () => {
    actions.replaceChildren();
    void start();
  });

  const setIdle = () => {
    actions.replaceChildren(closeWindow);
  };

  const onEvent = (event: InstallEvent) => {
    if (event.phase === 'downloading') {
      progress.hidden = false;
      status.textContent = 'Yuklab olinmoqda...';
      if (event.total) {
        progress.removeAttribute('value');
        progress.max = event.total;
        progress.value = event.downloaded;
      } else {
        progress.removeAttribute('value'); // indeterminate: size unknown
      }
    } else {
      progress.removeAttribute('value');
      status.textContent = 'Örnatilmoqda... Oyna avtomatik yopilişi mumkin.';
    }
  };

  const start = async () => {
    if (isInstallRunning()) return;
    actions.replaceChildren();
    status.textContent = 'Tekşirilmoqda...';
    try {
      const update = await findUpdate();
      if (!update) {
        progress.hidden = true;
        status.textContent = 'Yangi versiya yöq. Siz eng sönggi versiyadasiz.';
        setIdle();
        return;
      }
      status.textContent = `Versiya ${update.version} yuklab olinmoqda...`;
      await installUpdate(update, onEvent);
    } catch (error) {
      progress.hidden = true;
      status.textContent = `Xatolik: ${describe(error)}`;
      status.setAttribute('role', 'alert');
      actions.replaceChildren(retry, closeWindow);
    }
  };

  // A reload or crash mid-install leaves a lock behind. Do not restart the download silently.
  const interrupted = installingVersion();
  if (interrupted) {
    progress.hidden = true;
    status.textContent = 'Oldingi yangilaniş töxtagan bölişi mumkin. Qayta tekşiring.';
    const recheck = button('Qayta tekşiriş', 'dsk-btn-primary', () => {
      clearInstallLock();
      actions.replaceChildren();
      void start();
    });
    actions.replaceChildren(recheck, closeWindow);
    return;
  }

  void start();
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
