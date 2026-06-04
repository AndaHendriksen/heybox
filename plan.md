# Plan: Meta (Facebook + Instagram) Marketing & Funnel Tracking

> **Status:** 🟢 Approved — implementing | **Last Updated:** 2026-06-04
> **Scope:** Analytics layer — `src/components/analytics/*`, `src/lib/analytics/*`, booking funnel wiring

---

## 1. Context & Objectives

**Goal:** Be able to run and *optimize* Facebook & Instagram ad campaigns for heybox. Concretely, "done" means:
1. Meta can attribute conversions to ads (Pixel installed + verified domain).
2. Meta receives **funnel-depth signals** — for every visitor it knows how far into the booking flow they got (landed → chose boxes → entered contact → confirmed), so its algorithm can target look-alikes of people who go deep / convert.
3. Tracking is **server-side reinforced** (Conversions API) so it survives ad-blockers, iOS/Safari ITP, and missing cookies — critical because our real conversion happens in a server action with no online payment.
4. It is **GDPR/ePrivacy compliant** (Denmark/EU) — no tracking cookies fire before consent.

**Answer to "can we tell Meta how far along a user got?"** → **Yes.** This is exactly what Meta's *standard funnel events* are for. We fire a progressively "deeper" event at each booking step (`InitiateCheckout` → `AddToCart` → `AddPaymentInfo` → `Purchase`). Meta's optimization model reads this depth automatically and learns to show ads to people who resemble those who reached the deepest steps. We additionally send custom events for finer-grained retargeting audiences.

**Constraints:**
- This is **NOT** the Next.js you know (v16.2.6, App Router, React 19). Use the `next/script` component and check `node_modules/next/dist/docs/` before coding. Server actions (not API routes) are the conversion point.
- Must use Tailwind v4 for any consent-banner UI; match existing component style (shadcn/radix, zinc palette).
- No online payment exists — payment is MobilePay on delivery. The "Purchase" signal therefore fires on **booking confirmation**, not on a payment callback.
- Keep PII safe: emails/phones sent to Meta CAPI **must be SHA-256 hashed**. Never log raw PII to Meta.
- Prefer **no heavy new dependencies**. Pixel loads via raw script; CAPI is a plain `fetch`. A tiny consent helper is hand-rolled rather than pulling a CMP library.

## 2. Technical Research & State

- **Affected / new files:**
  - `src/app/layout.tsx`: Root layout — mount `<MetaPixel/>` + `<ConsentBanner/>` here (inside `<body>`, after JsonLd). Already a Server Component; the new pieces are Client Components.
  - `src/components/booking/BookingWizard.tsx`: Owns `step` state and `goNext`/`goBack`. The single best place to emit step-transition events — **the funnel lives here.**
  - `src/components/booking/steps/StepApology.tsx`: Owns final submit → `createBooking`. Fires the client-side `Purchase` pixel event (with shared `eventID` for dedup).
  - `src/lib/actions/booking.ts`: `createBooking` server action. Already has `customer_email`, `customer_phone`, `total_price`, `booking_number` → perfect payload for a **server-side `Purchase` via CAPI** with advanced matching.
  - `src/app/booking/page.tsx` / `BookingWizard`: `/booking` mount → `InitiateCheckout`.
  - **NEW** `src/lib/analytics/meta.ts`: Client `fbq` wrapper — typed `track(event, params, eventId?)`, generates `event_id`, no-ops before consent / if Pixel ID missing.
  - **NEW** `src/lib/analytics/meta-capi.ts`: Server helper — POST to `https://graph.facebook.com/v21.0/<PIXEL_ID>/events`, SHA-256 hashing of email/phone/name, reads `_fbp`/`_fbc` cookies + client IP/UA from headers.
  - **NEW** `src/components/analytics/MetaPixel.tsx`: Client Component — injects pixel base code via `next/script` once consent given; fires initial `PageView`.
  - **NEW** `src/components/analytics/ConsentBanner.tsx`: Client Component — GDPR banner, persists choice in `localStorage` + a first-party cookie, broadcasts a `consent-changed` event the Pixel listens for.
  - **NEW** `src/lib/analytics/consent.ts`: tiny read/write helpers for consent state.
- **Existing logic to preserve:**
  - `BookingWizard` step machine: steps 1–7, `TOTAL_STEPS = 5`, `goNext(partial?)` mutates `booking` then increments `step`. Events must be *side-effects* of transitions — do not change navigation behaviour or validation.
  - `createBooking` must remain resilient: like the existing Sweego email block, the CAPI call must be wrapped so **a Meta failure never fails the booking**.
  - Price helpers `calcTotal` / `calcTotalWithoutAddons` give the monetary `value` for events; currency is `DKK`.
- **Funnel → Meta event map (the core design):**

  | Booking step (in `BookingWizard`) | Meta **standard** event | `value` | Why |
  |---|---|---|---|
  | `/booking` page mounts (step 1 shown) | `InitiateCheckout` | quote so far | "Started the flow" |
  | Step 2 → next (box count chosen) | `AddToCart` | `calcTotal` | First real intent + a price |
  | Step 3 → next (date chosen) | *custom* `SelectDeliveryDate` | — | Retargeting audience only |
  | Step 5 → next (contact submitted) | `AddPaymentInfo` | `calcTotal` | Deepest pre-commit signal = a warm lead |
  | Step 6 summary viewed | *custom* `ViewSummary` | `calcTotal` | Retargeting audience |
  | Final confirm success (StepApology) | `Purchase` **+** `Lead` | `total_price` | The conversion. Dual client+server. |

  > Standard events (`InitiateCheckout`/`AddToCart`/`AddPaymentInfo`/`Purchase`) are what Meta's optimizer and value-based look-alikes consume — that is the "how far along" signal. Custom events can't be optimization targets but make great **Custom Audiences** for retargeting (e.g. "viewed summary but didn't confirm" → re-engage ad).

- **Why both Pixel AND Conversions API (CAPI)?** The browser Pixel is blocked for a large share of EU users (ad-blockers, Safari ITP, no-consent). CAPI sends the same events **server-to-server** from our backend, where they can't be blocked, and includes hashed email/phone we already collect → far higher match quality. We send the `Purchase` from **both** sides with the **same `event_id`** so Meta deduplicates it. Net effect: maximal signal, no double-counting.

- **External setup (no code, but blocks go-live):** Create Meta Business + Ad Account; create a **Dataset/Pixel** (gives `PIXEL_ID`); generate a **CAPI access token**; **verify the domain** `heybox.dk` (DNS TXT or meta-tag); configure **Aggregated Event Measurement** (rank the 8 events, mark `Purchase` priority 1) for iOS; connect Instagram account to the Page.

## 3. User Journey & Flow

- [ ] **Step 0 — Consent gate (first visit):**
    - [ ] 0.1 Banner appears; Pixel + CAPI are dormant. Choosing "Afvis" keeps them off permanently; "Accepter" loads the Pixel and fires `PageView`.
- [ ] **Step 1 — Visitor lands on a page (home / FAQ / locations):**
    - [ ] 1.1 `PageView` fires (client) once consent given.
- [ ] **Step 2 — Visitor opens `/booking`:**
    - [ ] 2.1 `InitiateCheckout` fires (client).
- [ ] **Step 3 — Progresses through wizard:**
    - [ ] 3.1 Each `goNext` from the mapped steps fires its event.
- [ ] **Step 4 — Confirms booking (StepApology → createBooking succeeds):**
    - [ ] 4.1 Server action sends `Purchase` via CAPI (hashed email/phone, real `total_price`, `event_id`).
    - [ ] 4.2 Returns `event_id` to client; client fires Pixel `Purchase` with same `eventID` → deduped.
- [ ] **Step 5 — Meta optimizes:** algorithm now sees each user's max funnel depth + final value → targets look-alikes of deep/converting users.

## 4. Implementation Roadmap (The To-Do)

### Phase A: Foundation (config, consent, helpers)
- [ ] **A.1:** Add env vars + types: `NEXT_PUBLIC_META_PIXEL_ID`, `META_CAPI_ACCESS_TOKEN`, `META_CAPI_TEST_EVENT_CODE` (test only).
- [ ] **A.2:** `src/lib/analytics/consent.ts` — get/set consent + change-event dispatcher.
- [ ] **A.3:** `src/components/analytics/ConsentBanner.tsx` — GDPR banner (Tailwind, zinc style, Danish copy).
- [ ] **A.4:** `src/lib/analytics/meta.ts` — typed client `fbq` wrapper + `event_id` generator (`crypto.randomUUID`).
- [ ] **A.5:** `src/components/analytics/MetaPixel.tsx` — consent-gated `next/script` pixel loader + initial `PageView`.
- [ ] **A.6:** Mount `<MetaPixel/>` + `<ConsentBanner/>` in `src/app/layout.tsx`.

### Phase B: Server-side Conversions API
- [ ] **B.1:** `src/lib/analytics/meta-capi.ts` — `sendCapiEvent()` (hashing, cookies, IP/UA, fetch, test-code, graceful failure).
- [ ] **B.2:** In `createBooking`, after successful insert, send server `Purchase` (wrapped in try/catch like the email block). Generate `eventId`, **return it** to the client.

### Phase C: Funnel wiring
- [ ] **C.1:** `/booking` mount → `InitiateCheckout` (client).
- [ ] **C.2:** `BookingWizard.goNext` → emit `AddToCart` (step 2), `SelectDeliveryDate` (step 3), `AddPaymentInfo` (step 5), `ViewSummary` (step 6). One small `emitFunnelEvent(step)` helper.
- [ ] **C.3:** `StepApology.handleSubmit` success branch → client `Purchase` + `Lead` using `eventId` returned from `createBooking`.
- [ ] **C.4:** Decide CAPI coverage for mid-funnel events (recommend: CAPI only for `Purchase`; Pixel-only for the rest, to keep it simple). Document in §7.

### Phase D: Verification & go-live
- [ ] **D.1:** Test with Meta **Events Manager → Test Events** using `META_CAPI_TEST_EVENT_CODE` + the Pixel Helper browser extension.
- [ ] **D.2:** Confirm `Purchase` shows **"Deduplicated"** (browser + server, same `event_id`).
- [ ] **D.3:** Domain verification + AEM event ranking in Business Manager.
- [ ] **D.4:** Confirm no events fire before consent (DevTools network: no `facebook.com/tr` calls until "Accepter").

## 5. Technical Specifications (To-Do Details)

### Task [A.1]: Environment variables
- **Input/Props:** `.env.local` (and deployment env):
  - `NEXT_PUBLIC_META_PIXEL_ID` — public, baked into client bundle (the Pixel ID is not secret).
  - `META_CAPI_ACCESS_TOKEN` — **server-only secret**, never `NEXT_PUBLIC_`.
  - `META_CAPI_TEST_EVENT_CODE` — optional; set during QA, unset in prod.
- **Notes:** `.env.local` is gitignored already. Document required vars in `README.md`.

### Task [A.4]: `meta.ts` client wrapper
- **Logic (pseudocode):**
  ```
  type StdEvent = 'PageView'|'ViewContent'|'InitiateCheckout'|'AddToCart'|'AddPaymentInfo'|'Lead'|'Purchase'
  function track(event, params?, eventId?) {
    if (!hasConsent() || !window.fbq) return
    window.fbq('track', event, params, eventId ? { eventID: eventId } : undefined)
  }
  function trackCustom(name, params?) { ...'trackCustom'... }
  function newEventId() { return crypto.randomUUID() }
  ```
- **Notes:** No-op when `fbq` absent so SSR/no-consent never throws. `value` always paired with `currency: 'DKK'`.

### Task [A.5]: `MetaPixel.tsx`
- **Logic:** Client Component. Reads consent on mount + subscribes to `consent-changed`. When consent === granted and not yet loaded, inject the standard Meta base snippet via `next/script` (`strategy="afterInteractive"`), then `fbq('init', PIXEL_ID)` + `fbq('track','PageView')`. Guard against double-init. If `NEXT_PUBLIC_META_PIXEL_ID` unset, render nothing.
- **Code Reference:** Confirm `Script` API in `node_modules/next/dist/docs/` for v16 — App Router may prefer inline `<Script id=...>{code}</Script>`.

### Task [A.3]: `ConsentBanner.tsx`
- **Logic:** If a stored choice exists, render nothing. Else fixed bottom banner: short Danish text + link to a privacy/cookie policy + "Accepter" / "Afvis". On choice: persist to `localStorage('heybox_consent')` + cookie, dispatch `consent-changed`.
- **Notes:** Match zinc/rounded styling of existing cards. Consider a tiny footer "Cookieindstillinger" link to reopen it.

### Task [B.1]: `meta-capi.ts` — `sendCapiEvent`
- **Input/Props:**
  ```
  sendCapiEvent({
    eventName, eventId, eventSourceUrl,
    userData: { email?, phone?, firstName?, lastName?, fbp?, fbc?, clientIp?, userAgent? },
    customData?: { value?, currency?, contents?, num_items? },
  })
  ```
- **Logic:**
  1. Build `user_data`: SHA-256 (lowercase/trim) `em`, `ph` (digits only, incl. country code), `fn`; pass through `fbp`, `fbc`, `client_ip_address`, `client_user_agent` unhashed.
  2. POST JSON `{ data: [{ event_name, event_time: now, event_id, action_source:'website', event_source_url, user_data, custom_data }], test_event_code? }` to `graph.facebook.com/v21.0/<PIXEL_ID>/events?access_token=...`.
  3. `try/catch`, log on failure, **never throw**.
- **Notes:** In a server action, read cookies via `next/headers` `cookies()` (`_fbp`,`_fbc`) and `headers()` (`x-forwarded-for`, `user-agent`). Hash with Node `crypto.createHash('sha256')`. Verify `next/headers` usage against v16 docs.

### Task [B.2]: `createBooking` Purchase via CAPI
- **Logic:** After `db.insert(...).returning(...)` succeeds, generate `eventId = randomUUID()`; call `sendCapiEvent({ eventName:'Purchase', eventId, userData:{ email, phone, firstName: firstName(state.name) }, customData:{ value: total, currency:'DKK', num_items: state.boxCount } })`. Wrap in try/catch mirroring the email block. Change return type to include `eventId` so the client can dedupe.
- **Edge cases:** Booking must still succeed if token missing / network down. `total` is the already-computed canonical `calcTotalWithoutAddons` value.

### Task [C.2]: `BookingWizard` funnel emitter
- **Logic:** Add `emitFunnelEvent(targetStep, booking)` called inside `goNext` *after* state merge. Switch on the step → fire mapped event with `value: calcTotal(merged)`, `currency:'DKK'`. Keep it a pure side-effect; never block navigation. Use a `useRef` guard so re-renders don't double-fire the same step.
- **Notes:** `value` for `InitiateCheckout` at step 1 may be the default boxCount(20) quote — acceptable.

### Task [C.3]: client Purchase dedup
- **Notes:** `createBooking` now returns `{ id, bookingNumber, eventId }`. On success in `StepApology`, call `track('Purchase', { value: displayTotal, currency:'DKK' }, eventId)` and `track('Lead', undefined, eventId+'-lead')` *before* `router.push`. Same `eventId` as server → dedup.

## 6. Verification Checklist
- [ ] **Pixel Helper** (Chrome ext.) shows `PageView` on load and one event per booking step.
- [ ] **Events Manager → Test Events** (with `META_CAPI_TEST_EVENT_CODE`) shows server `Purchase` with matched email/phone (green "advanced matching" indicators).
- [ ] `Purchase` marked **Deduplicated** (browser + server share `event_id`).
- [ ] No `facebook.com/tr` or CAPI calls fire before consent; firing begins immediately after "Accepter".
- [ ] Booking still completes and confirmation email still sends if `META_CAPI_ACCESS_TOKEN` is unset (resilience).
- [ ] No raw email/phone leaves the server unhashed (inspect CAPI request body).
- [ ] Manual mobile check: consent banner + booking flow on small screens.
- [ ] Lighthouse: Pixel script `afterInteractive` doesn't tank LCP.

## 7. Comments & Deviations

Note [2026-06-04]: **User decisions confirmed** — (1) No privacy/cookie policy existed → creating `/privatlivspolitik`. (2) Conversion event = **`Purchase` only** (user wants self-serve purchasers); dropped the parallel `Lead` event to keep the signal clean. (3) Production domain `heybox.dk` confirmed for Meta domain verification.

Note [2026-06-04]: Chose **`Purchase` as the conversion event** (with monetary `value`) even though there is no online payment, because it carries value for ROAS/value-based optimization and Meta permits it for confirmed orders.

Note [2026-06-04]: Decided **CAPI only for `Purchase`** (mid-funnel events are Pixel-only) to avoid building server routes for every step and to keep the change small. If match quality on mid-funnel proves important later, promote `InitiateCheckout`/`AddPaymentInfo` to CAPI too.

Note [2026-06-04]: Rolling a **hand-built consent gate** instead of a CMP library to honour the "no heavy new dependencies" constraint. If a full cookie policy / granular categories become a legal requirement, revisit with a proper CMP (e.g. Cookiebot/Usercentrics — common in DK).

Note [2026-06-04]: **Open questions for the user** —
1. Is there an existing **privacy/cookie policy page** to link from the consent banner? (Required for GDPR; none found in repo — `handelsbetingelser` exists but is T&C, not privacy.)
2. Will ads be managed in-house or via an agency? (Affects whether we optimize for `Purchase` vs `Lead`, and who needs Business Manager access.)
3. Confirm **`heybox.dk`** is the production domain to verify with Meta.
