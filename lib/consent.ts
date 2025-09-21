export type ConsentStatus = 'granted' | 'denied';
export type Consent = {
  necessary: true;               // toujours true
  analytics: ConsentStatus;
  marketing: ConsentStatus;
  ts: number;                    // timestamp de décision
};

const COOKIE_NAME = 'st_consent_v1';
const MAX_AGE = 60 * 60 * 24 * 180; // 180 jours

export function readConsent(): Consent | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split('; ').find(c => c.startsWith(COOKIE_NAME+'='));
  if (!match) return null;
  try { return JSON.parse(decodeURIComponent(match.split('=')[1])); } catch { return null; }
}

export function writeConsent(consent: Consent) {
  if (typeof document === 'undefined') return;
  const value = encodeURIComponent(JSON.stringify(consent));
  document.cookie = `${COOKIE_NAME}=${value}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax`;
}

export function hasChoice(): boolean {
  return !!readConsent();
}

export function defaultDenied(): Consent {
  return { necessary: true, analytics: 'denied', marketing: 'denied', ts: Date.now() };
}
export function eraseConsent() {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function notifyConsentChanged() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('st:consent:changed'));
}