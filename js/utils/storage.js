/**
 * SSR — Defensive Storage Utilities
 * Production-grade storage wrapper with dual fallback (localStorage + sessionStorage)
 * Resilient against private browsing mode, storage quota limits, and cookie blocks.
 */

const STORAGE_PREFIX = "ssr_store_";

/**
 * Prototype pollution safe JSON parser reviver
 */
function safeReviver(key, value) {
  if (key === "__proto__" || key === "constructor" || key === "prototype") {
    return undefined;
  }
  return value;
}

function safeParse(str, fallback) {
  try {
    return JSON.parse(str, safeReviver);
  } catch (e) {
    return fallback;
  }
}

export const Storage = {
  /**
   * Get an item, checking localStorage first, then sessionStorage as fallback
   */
  get(key, defaultValue = null) {
    const fullKey = STORAGE_PREFIX + key;

    // 1. Try localStorage
    try {
      const raw = localStorage.getItem(fullKey);
      if (raw !== null && raw !== undefined) {
        return safeParse(raw, defaultValue);
      }
    } catch (err) {
      // localStorage may fail in restricted/private iframes
    }

    // 2. Fallback to sessionStorage
    try {
      const sessionRaw = sessionStorage.getItem(fullKey);
      if (sessionRaw !== null && sessionRaw !== undefined) {
        return safeParse(sessionRaw, defaultValue);
      }
    } catch (err) {
      // sessionStorage failed
    }

    return defaultValue;
  },

  /**
   * Save an item. Writes to localStorage and mirrors to sessionStorage for reliability
   */
  set(key, value) {
    const fullKey = STORAGE_PREFIX + key;
    const serialized = JSON.stringify(value);
    let success = false;

    try {
      localStorage.setItem(fullKey, serialized);
      success = true;
    } catch (err) {
      console.warn(`[SSR Storage] localStorage write failed for "${key}":`, err);
    }

    try {
      sessionStorage.setItem(fullKey, serialized);
      success = true;
    } catch (err) {
      console.warn(`[SSR Storage] sessionStorage write failed for "${key}":`, err);
    }

    return success;
  },

  /**
   * Remove a single key from both localStorage and sessionStorage
   */
  remove(key) {
    const fullKey = STORAGE_PREFIX + key;
    let success = false;

    try {
      localStorage.removeItem(fullKey);
      success = true;
    } catch (err) {}

    try {
      sessionStorage.removeItem(fullKey);
      success = true;
    } catch (err) {}

    return success;
  },

  /**
   * Clear all SSR-specific items across both stores
   */
  clearAll() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch (err) {}

    try {
      const sessionKeys = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const k = sessionStorage.key(i);
        if (k && k.startsWith(STORAGE_PREFIX)) {
          sessionKeys.push(k);
        }
      }
      sessionKeys.forEach(k => sessionStorage.removeItem(k));
    } catch (err) {}

    return true;
  }
};
