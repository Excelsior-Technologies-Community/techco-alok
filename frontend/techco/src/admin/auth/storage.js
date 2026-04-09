const TOKEN_KEY = "techco_admin_token";
const USER_KEY = "techco_admin_user";
const USER_EVENT = "techco_admin_user_updated";

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function setAdminToken(token) {
  if (!token) return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getAdminUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAdminUser(user) {
  if (!user) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(USER_EVENT));
}

export function clearAdminUser() {
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(USER_EVENT));
}

export function onAdminUserUpdated(handler) {
  window.addEventListener(USER_EVENT, handler);
  return () => window.removeEventListener(USER_EVENT, handler);
}

export function isAdminAuthed() {
  return Boolean(getAdminToken());
}

