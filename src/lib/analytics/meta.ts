// Thin, typed wrapper around the Meta Pixel `fbq` global. Every call is a no-op
// unless the pixel has loaded (which only happens after consent) so callers
// never need to guard. Pair `value` with `currency: 'DKK'` for purchase-type
// events. Pass an `eventId` to deduplicate against a matching server-side CAPI
// event of the same name.

import { hasConsent } from './consent'

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

type StandardEvent =
  | 'PageView'
  | 'ViewContent'
  | 'InitiateCheckout'
  | 'AddToCart'
  | 'AddPaymentInfo'
  | 'Lead'
  | 'Purchase'

export interface EventParams {
  value?: number
  currency?: string
  num_items?: number
  content_name?: string
  [key: string]: unknown
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

function ready(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function' && hasConsent()
}

export function track(event: StandardEvent, params?: EventParams, eventId?: string): void {
  if (!ready()) return
  window.fbq!('track', event, params ?? {}, eventId ? { eventID: eventId } : undefined)
}

export function trackCustom(name: string, params?: EventParams): void {
  if (!ready()) return
  window.fbq!('trackCustom', name, params ?? {})
}

/** Stable ID shared between the browser Pixel event and its server CAPI twin so
 *  Meta deduplicates them. */
export function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}
