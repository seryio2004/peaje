/** All browser storage access lives here. Storage is optional, including in private mode. */
export type StorageArea = "local" | "session";
function getStorage(area: StorageArea): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return area === "local" ? window.localStorage : window.sessionStorage;
  } catch { return null; }
}
export function readStored<T>(key: string, validate: (value: unknown) => value is T, area: StorageArea = "local"): T | null {
  try {
    const raw = getStorage(area)?.getItem(key);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    return validate(value) ? value : null;
  } catch { return null; }
}
export function writeStored(key: string, value: unknown, area: StorageArea = "local"): boolean {
  try {
    const storage = getStorage(area);
    if (!storage) return false;
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch { return false; }
}
export function removeStored(key: string, area: StorageArea = "local"): void {
  try { getStorage(area)?.removeItem(key); } catch { /* The game works without storage. */ }
}
