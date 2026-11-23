/**
 * Copy text to the clipboard. Resolves `true` on success.
 * On failure, selects `fallback` (if given) so the user can press Ctrl+C.
 */
export async function copyText(text: string, fallback?: HTMLTextAreaElement | HTMLInputElement): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    fallback?.select();
    return false;
  }
}

/** Show an element for `ms` milliseconds, then hide it again. Works with `hidden` or inline `style.display`. */
export function flashElement(el: HTMLElement | null, ms = 2200): void {
  if (!el) return;
  el.hidden = false;
  setTimeout(() => { el.hidden = true; }, ms);
}
