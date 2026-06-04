'use client'

// Loads the Meta Pixel only after the user grants consent, then fires a
// PageView on first load and on every client-side route change. Renders nothing
// (and never loads the script) when consent is missing or the Pixel ID is
// unset, so it is safe to mount globally in the root layout.

import { useEffect, useRef, useSyncExternalStore } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import {
  getConsent,
  getConsentServerSnapshot,
  subscribeConsent,
} from '@/lib/analytics/consent'
import { META_PIXEL_ID } from '@/lib/analytics/meta'

export default function MetaPixel() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, getConsentServerSnapshot)
  const enabled = consent === 'granted'
  const pathname = usePathname()
  const initialized = useRef(false)

  // Track virtual pageviews on SPA navigation (the inline snippet only fires the
  // first one). Skips the initial render to avoid a duplicate PageView.
  useEffect(() => {
    if (!enabled || typeof window.fbq !== 'function') return
    if (!initialized.current) {
      initialized.current = true
      return
    }
    window.fbq('track', 'PageView')
  }, [pathname, enabled])

  if (!META_PIXEL_ID || !enabled) return null

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  )
}
