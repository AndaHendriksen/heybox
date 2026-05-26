# Plan: StepApology Fixes + Timestamp Timezone

> **Status:** 🟡 In Progress | **Last Updated:** 2026-05-26
> **Scope:** `src/components/booking/steps/StepApology.tsx`, `src/components/booking/BookingWizard.tsx`, `src/lib/actions/booking.ts`, `src/lib/db/schema.ts`

---

## 1. Context & Objectives

**Goal:** Three targeted fixes — (1) show a validation message when terms aren't accepted, (2) move `createBooking` logic into `StepApology` where it belongs, (3) fix UTC+2 timezone gap on `created_at`/`updated_at` timestamps.

**Constraints:** No new dependencies. Schema change requires a Drizzle migration (existing timestamps will be reinterpreted, which is acceptable for a dev-stage project). Keep `BookingWizard` lean — it should only orchestrate steps, not own server action state.

---

## 2. Technical Research & State

- **Affected Files:**
  - `src/components/booking/steps/StepApology.tsx`: Add terms-validation message; absorb `createBooking`, `bookingError`, and `isPending` state from wizard.
  - `src/components/booking/BookingWizard.tsx`: Remove `bookingError`, `isPending`, `startTransition`, and the `createBooking` call. Pass `booking` + `onSuccess` callback to `StepApology`.
  - `src/lib/db/schema.ts`: Change all `timestamp(...)` columns to `timestamp(..., { withTimezone: true })` so PostgreSQL stores `TIMESTAMPTZ` (UTC internally, timezone-aware on retrieval).
  - Drizzle migration file: Generated via `drizzle-kit generate` to alter column types in the DB.

- **Existing Logic:**
  - `BookingWizard` currently holds `[bookingError, setBookingError]`, `[isPending, startTransition]`, and fires `createBooking` inside `startTransition`. It passes all three down to `StepApology`.
  - `StepApology` receives `booking`, `error`, `isPending`, `onSubmit` as props.
  - `schema.ts` uses plain `timestamp('created_at').defaultNow()` which maps to PostgreSQL `TIMESTAMP WITHOUT TIME ZONE`. PostgreSQL's `now()` returns UTC on Supabase, but the column has no TZ awareness — Supabase's table viewer and many clients display it as-is (UTC), causing the −2 h gap for CEST users.

- **New Components/Hooks:** None.

---

## 3. User Journey & Flow

- [ ] **Step 1:** User reaches StepApology (step 7), doesn't check terms, taps "Ja selvfølgelig!"
    - [ ] 1.1 Inline error message appears: *"Du skal acceptere vores vilkår og betingelser for at fortsætte"*
    - [ ] 1.2 The button stays disabled; no server action fires.

- [ ] **Step 2:** User checks terms, taps button.
    - [ ] 2.1 `StepApology` fires `createBooking` internally via `useTransition`.
    - [ ] 2.2 On success → calls `onSuccess(bookingNumber)` callback from wizard → wizard redirects.
    - [ ] 2.3 On error → error message shows inside `StepApology`.

---

## 4. Implementation Roadmap (The To-Do)

### Phase A: Schema & Migration
- [ ] **A.1:** Add `{ withTimezone: true }` to all `timestamp(...)` calls in `schema.ts`.
- [ ] **A.2:** Run `drizzle-kit generate` to produce migration SQL.
- [ ] **A.3:** Run `drizzle-kit migrate` (or push) to apply to the DB.

### Phase B: Move createBooking into StepApology
- [ ] **B.1:** Add `useTransition`, `useState` for error, and `useRouter` to `StepApology`. Import and call `createBooking` directly.
- [ ] **B.2:** Change `StepApology` props: remove `error`, `isPending`, `onSubmit`; add `onSuccess: (bookingNumber: string) => void`.
- [ ] **B.3:** Strip `bookingError`, `isPending`, `startTransition`, and the `createBooking` callback from `BookingWizard`. Pass only `booking` and `onSuccess` to `StepApology`.

### Phase C: Terms validation message
- [ ] **C.1:** Add a `submitAttempted` state flag to `StepApology` (set to `true` on button click when terms not accepted).
- [ ] **C.2:** Render error text below the checkbox when `submitAttempted && !termsAccepted`.

---

## 5. Technical Specifications (To-Do Details)

### Task [A.1]: Add withTimezone to schema timestamps

- **Logic:** Replace every `timestamp('col_name').defaultNow()` with `timestamp('col_name', { withTimezone: true }).defaultNow()`. Affects `users.createdAt`, `users.updatedAt`, `pricingTiers.createdAt`, `bookings.createdAt`, `bookings.updatedAt`, `boxPool.updatedAt`.
- **Why this fixes it:** `TIMESTAMPTZ` tells PostgreSQL the value is UTC. All clients (Supabase dashboard, psql, Drizzle) then convert to local time on display — no more 2-hour gap.
- **Code Reference:** `src/lib/db/schema.ts` lines 35–36, 53, 81–82, 94.

### Task [B.1 / B.2]: StepApology absorbs server action

- **New Props:**
  ```ts
  interface Props {
    booking: BookingState
    onSuccess: (bookingNumber: string) => void
  }
  ```
- **Internal state:** `const [isPending, startTransition] = useTransition()`, `const [bookingError, setBookingError] = useState<string | null>(null)`, `const router = useRouter()`.
- **handleSubmit logic:**
  1. If `!termsAccepted` → set `submitAttempted = true`, return early.
  2. If `isPending` → return early.
  3. `startTransition(async () => { setBookingError(null); const result = await createBooking(booking); if ('error' in result) setBookingError(result.error); else onSuccess(result.bookingNumber); })`

### Task [B.3]: Slim down BookingWizard

- Remove: `bookingError`, `isPending`, `startTransition`, `useTransition`, `createBooking` import, `useRouter`.
- `StepApology` receives: `booking={booking}` and `onSuccess={(bookingNumber) => router.push(...)}`.
- Wait — `useRouter` stays in `BookingWizard` since it needs to handle the redirect in `onSuccess`. OR move `router` into `StepApology` entirely. Simpler: move `router` into `StepApology` so `onSuccess` isn't needed at all — `StepApology` redirects itself after a successful booking.
  - **Decision:** Move `useRouter` into `StepApology`. Props simplify to just `{ booking: BookingState }`. Wizard passes nothing extra for step 7.

### Task [C.1 / C.2]: Terms validation message

- **State:** `const [submitAttempted, setSubmitAttempted] = useState(false)`
- **handleSubmit:**
  ```ts
  function handleSubmit() {
    if (!termsAccepted) { setSubmitAttempted(true); return }
    if (isPending) return
    // fire createBooking
  }
  ```
- **UI (below the checkbox div):**
  ```tsx
  {submitAttempted && !termsAccepted && (
    <p className="text-sm text-red-500 mt-2">
      Du skal acceptere vores vilkår og betingelser for at fortsætte.
    </p>
  )}
  ```
- Also clear `submitAttempted` when the checkbox is checked (or just let the condition `submitAttempted && !termsAccepted` naturally hide itself once `termsAccepted` flips to true).

---

## 6. Verification Checklist

- [ ] Terms error message appears when button is tapped without accepting.
- [ ] Error disappears once checkbox is checked.
- [ ] Booking submits successfully from StepApology (no regression).
- [ ] `BookingWizard` no longer imports `createBooking`, `useTransition`, or manages `bookingError`.
- [ ] New `created_at` rows in the DB show Copenhagen local time (UTC+2 in summer).
- [ ] Migration runs cleanly without data loss.

---

## 7. Comments & Deviations

Note [2026-05-26]: Chose to move `useRouter` fully into `StepApology` rather than threading an `onSuccess` callback through the wizard. This makes StepApology fully self-contained and reduces prop surface.
