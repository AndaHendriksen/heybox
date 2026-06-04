// GDPR/ePrivacy consent gate for marketing cookies (Meta Pixel).
// Single source of truth, readable from any Client Component. We persist the
// choice in localStorage AND a first-party cookie so a server action could in
// principle read it too. No tracking script loads until consent === 'granted'.

export type ConsentValue = 'granted' | 'denied'

const STORAGE_KEY = 'heybox_consent'
export const CONSENT_COOKIE = 'heybox_consent'
export const CONSENT_CHANGED_EVENT = 'heybox-consent-changed'

/** Reads the stored marketing-consent choice. Returns null if the user has
 *  not decided yet. Safe to call during SSR (returns null). */
export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  const v = window.localStorage.getItem(STORAGE_KEY)
  return v === 'granted' || v === 'denied' ? v : null
}

export function hasConsent(): boolean {
  return getConsent() === 'granted'
}

/** Persists the choice and notifies listeners (the Pixel loader) in the same tab. */
export function setConsent(value: ConsentValue): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, value)
  // 6-month cookie, lax so it survives normal navigation.
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${60 * 60 * 24 * 180}; samesite=lax`
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: value }))
}

// --- useSyncExternalStore bindings -----------------------------------------
// Lets Client Components read consent as an external store without setState-in-
// effect. getServerSnapshot returns null so SSR renders the "undecided" state.

export function subscribeConsent(callback: () => void): () => void {
  window.addEventListener(CONSENT_CHANGED_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

export const getConsentServerSnapshot = (): ConsentValue | null => null
