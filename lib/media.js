// Centralized media URL resolution. Content files (data/*.json) store only
// provider-independent relative paths (e.g. "/images/profile.jpg"). This
// module is the single place that knows where those paths are actually
// hosted, so switching CDN/storage providers later means changing
// NEXT_PUBLIC_MEDIA_BASE_URL, not touching JSON content or components.

const RAW_BASE = process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "";
export const MEDIA_BASE_URL = RAW_BASE.trim().replace(/\/+$/, "");

const ABSOLUTE_URL_RE = /^https?:\/\//i;

function normalizePath(path) {
  return path.startsWith("/") ? path : `/${path}`;
}

// Points an asset at the CDN (falls back to the local /public path when no
// base URL is configured, e.g. in local dev).
export function resolveMediaUrl(path) {
  if (!path) return path;
  if (ABSOLUTE_URL_RE.test(path)) return path;
  if (!MEDIA_BASE_URL) return path;
  return `${MEDIA_BASE_URL}${normalizePath(path)}`;
}

// The same asset served from this app's own /public folder, used as a
// runtime fallback if the CDN is unreachable or missing the file.
export function localMediaUrl(path) {
  if (!path) return path;
  if (ABSOLUTE_URL_RE.test(path)) return path;
  return normalizePath(path);
}
