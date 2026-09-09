/**
 * cacheService.js
 * Lightweight localStorage-based cache with TTL support.
 * Used by App.jsx for stale-while-revalidate pattern —
 * data loads instantly from cache on revisit, then refreshes in background.
 */

const CACHE_PREFIX = 'portfolio_';

// Default TTL: 5 minutes
const DEFAULT_TTL_MS = 5 * 60 * 1000;

/**
 * Retrieve a cached value if it exists and hasn't expired.
 * @param {string} key - Cache key (without prefix)
 * @returns {any|null} Parsed value or null if missing/expired
 */
export const getCached = (key) => {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { data, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

/**
 * Store a value in cache with an expiry timestamp.
 * @param {string} key - Cache key (without prefix)
 * @param {any} data - Data to cache (must be JSON-serializable)
 * @param {number} [ttlMs] - Time-to-live in milliseconds (default 5 min)
 */
export const setCached = (key, data, ttlMs = DEFAULT_TTL_MS) => {
  try {
    const entry = { data, expiresAt: Date.now() + ttlMs };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // Silently fail if localStorage is full / unavailable (private mode, etc.)
  }
};

/**
 * Force-remove a single cache key (useful after admin mutations).
 * @param {string} key - Cache key (without prefix)
 */
export const invalidateCacheKey = (key) => {
  try {
    localStorage.removeItem(CACHE_PREFIX + key);
  } catch {}
};

/**
 * Clear ALL portfolio cache entries from localStorage.
 * Call this after admin writes (add/update/delete) to force a fresh fetch.
 */
export const invalidateAllCache = () => {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(CACHE_PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  } catch {}
};

// Named cache keys — use these constants everywhere to avoid typos
export const CACHE_KEYS = {
  PROFILE:    'profile',
  GALLERY:    'gallery',
  PROJECTS:   'projects',
  SKILLS:     'skills',
  EXPERIENCE: 'experience',
};
