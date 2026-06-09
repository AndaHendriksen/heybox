'use client'

// Lightweight GDPR/ePrivacy consent banner. Shown until the user makes a
// choice; the choice is persisted by the consent helper, which the MetaPixel
// loader listens to. Hidden entirely when no Pixel ID is configured.

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import {
  getConsent,
  getConsentServerSnapshot,
  setConsent,
  subscribeConsent,
} from '@/lib/analytics/consent'
import { META_PIXEL_ID } from '@/lib/analytics/meta'
import { Button } from '../ui/button'
import { P } from '../ui/text'

// Lint-clean hydration flag: false on the server and during the hydration
// render, true only after the client has mounted.
const noopSubscribe = () => () => {}

export default function ConsentBanner() {
  // Render nothing until hydrated so the banner never appears in the server HTML.
  // This avoids a flash for visitors who already decided (the server can't read
  // their localStorage choice). Undecided visitors see it appear right after load.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false)
  const consent = useSyncExternalStore(subscribeConsent, getConsent, getConsentServerSnapshot)

  function choose(value: 'granted' | 'denied') {
    setConsent(value)
  }

  if (!hydrated || !META_PIXEL_ID || consent !== null) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="mx-auto max-w-xl border border-black bg-white p-5 shadow-primary">
        <P>
          Vi bruger cookies fra Facebook og Instagram til at måle og forbedre vores
          annoncer. Du kan læse mere i vores{' '}
          <Link
            href="/privatlivspolitik"
            className="underline text-black hover:text-primary transition-colors"
          >
            privatlivs- og cookiepolitik
          </Link>
          .
        </P>
        <div className="mt-8 flex gap-3 items-center justify-end">
          <Button variant="outline" onClick={() => choose('denied')}>
            Afvis
          </Button>
          <Button onClick={() => choose('granted')}>
            Accepter
          </Button>
        </div>
      </div>
    </div>
  )
}
