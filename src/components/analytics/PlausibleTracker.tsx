'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { initPlausible, trackPlausiblePageview } from '@/lib/analytics/plausible'

export default function PlausibleTracker() {
  const pathname = usePathname()
  const initializedRef = useRef(false)

  useEffect(() => {
    initPlausible()
    initializedRef.current = true
  }, [])

  useEffect(() => {
    if (!initializedRef.current) return
    trackPlausiblePageview()
  }, [pathname])

  return null
}
