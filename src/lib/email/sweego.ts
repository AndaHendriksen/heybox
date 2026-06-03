// Low-level Sweego email sender (https://api.sweego.io/send).
// Native fetch only — no axios. Server-only util: reads SWEEGO_* env vars and must
// never be imported into client components (it would leak the API key).
// Auth format: Api-Key header = SWEEGO_KEY_VALUE (value-only).

const SWEEGO_ENDPOINT = 'https://api.sweego.io/send'

// Verified sending address on the Sweego account.
export const FROM_EMAIL = 'hey@heybox.dk'

export interface SendEmailOptions {
  to: string
  toName?: string
  subject: string
  text: string
  html?: string
}

export async function sendEmail(
  opts: SendEmailOptions,
): Promise<{ ok: true } | { error: string }> {
  const keyValue = process.env.SWEEGO_KEY_VALUE
  const fromName = process.env.SWEEGO_NAME ?? 'heybox'

  if (!keyValue) {
    return { error: 'SWEEGO_KEY_VALUE mangler i miljøet' }
  }

  const body: Record<string, unknown> = {
    channel: 'email',
    provider: 'sweego',
    recipients: [{ email: opts.to, ...(opts.toName ? { name: opts.toName } : {}) }],
    from: { name: fromName, email: FROM_EMAIL },
    subject: opts.subject,
    'message-txt': opts.text,
  }
  if (opts.html) {
    body['message-html'] = opts.html
  }

  try {
    const res = await fetch(SWEEGO_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Api-Key': keyValue,
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      return { error: `Sweego ${res.status}: ${await res.text()}` }
    }

    return { ok: true }
  } catch (err) {
    return { error: `Netværksfejl: ${err instanceof Error ? err.message : String(err)}` }
  }
}
