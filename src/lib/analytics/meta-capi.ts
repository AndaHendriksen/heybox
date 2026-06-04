// Meta Conversions API (server-side). Sends conversion events straight from our
// backend so they survive ad-blockers, Safari ITP and missing browser cookies.
// PII (email/phone/name) is SHA-256 hashed before it ever leaves the server.
// Every failure is swallowed and logged — a Meta outage must never break a booking.

import { createHash } from 'crypto'
import { cookies, headers } from 'next/headers'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE
const API_VERSION = 'v21.0'

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

/** Normalize + hash per Meta's matching rules (lowercase, trim; digits only for phone). */
function hashEmail(email: string): string {
  return sha256(email.trim().toLowerCase())
}
function hashPhone(phone: string, countryCode: string): string {
  const digits = `${countryCode}${phone}`.replace(/\D/g, '')
  return sha256(digits)
}
function hashName(name: string): string {
  return sha256(name.trim().toLowerCase())
}

interface CapiUser {
  email?: string
  phone?: string
  phoneCountryCode?: string
  firstName?: string
}

interface CapiCustomData {
  value?: number
  currency?: string
  num_items?: number
}

interface SendCapiArgs {
  eventName: 'Purchase' | 'Lead' | 'InitiateCheckout' | 'AddToCart' | 'AddPaymentInfo'
  eventId: string
  eventSourceUrl?: string
  user: CapiUser
  customData?: CapiCustomData
}

/** Fire a server-side conversion event. No-ops (and logs) if not configured. */
export async function sendCapiEvent({
  eventName,
  eventId,
  eventSourceUrl,
  user,
  customData,
}: SendCapiArgs): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn('Meta CAPI not configured (missing pixel id or access token) - skipping', eventName)
    return
  }

  try {
    const cookieStore = await cookies()
    const headerStore = await headers()

    const fbp = cookieStore.get('_fbp')?.value
    const fbc = cookieStore.get('_fbc')?.value
    const userAgent = headerStore.get('user-agent') ?? undefined
    const clientIp =
      headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headerStore.get('x-real-ip') ||
      undefined

    const user_data: Record<string, string | string[]> = {}
    if (user.email) user_data.em = hashEmail(user.email)
    if (user.phone) user_data.ph = hashPhone(user.phone, user.phoneCountryCode ?? '')
    if (user.firstName) user_data.fn = hashName(user.firstName)
    if (fbp) user_data.fbp = fbp
    if (fbc) user_data.fbc = fbc
    if (clientIp) user_data.client_ip_address = clientIp
    if (userAgent) user_data.client_user_agent = userAgent

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: 'website',
          ...(eventSourceUrl ? { event_source_url: eventSourceUrl } : {}),
          user_data,
          ...(customData ? { custom_data: customData } : {}),
        },
      ],
      ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
    }

    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    )

    if (!res.ok) {
      console.error(`Meta CAPI ${eventName} failed:`, res.status, await res.text())
    }
  } catch (err) {
    console.error(`Meta CAPI ${eventName} threw:`, err)
  }
}
