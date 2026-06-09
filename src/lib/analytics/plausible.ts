import { init as plausibleInit, track as plausibleTrack } from '@plausible-analytics/tracker'

export const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

let initialized = false

export function initPlausible() {
  if (typeof window === 'undefined' || initialized || !PLAUSIBLE_DOMAIN) return

  plausibleInit({
    domain: PLAUSIBLE_DOMAIN,
    autoCapturePageviews: false,
    bindToWindow: true,
    captureOnLocalhost: window.location.hostname === 'localhost',
  })

  initialized = true
  trackPlausiblePageview()
}

export function trackPlausibleEvent(eventName: string, props?: Record<string, string>) {
  if (typeof window === 'undefined' || !initialized) return
  plausibleTrack(eventName, { props: props ?? {}, interactive: true })
}

export function trackPlausiblePageview(url?: string) {
  if (typeof window === 'undefined' || !initialized) return
  plausibleTrack('pageview', { url: url ?? window.location.href, interactive: false })
}
