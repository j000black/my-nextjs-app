/** Login: 3–32 chars, letters, digits, underscore only (stored lowercase). */
const LOGIN_RE = /^[a-z0-9_]{3,32}$/;

export function normalizeLogin(raw: string): string {
  return raw.trim().toLowerCase();
}

export function isValidLoginNormalized(login: string): boolean {
  return LOGIN_RE.test(login);
}

export const LOGIN_RULES =
  "Use 3–32 characters: letters, numbers, and underscores only. Logins are case-insensitive.";

export function isValidNewPassword(password: string): boolean {
  return password.length >= 8 && password.length <= 128;
}
