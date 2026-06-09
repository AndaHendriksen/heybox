# Booking Funnel Analysis & Meta Pixel Tracking

## Current Finding: Purchase Timing Issue

**The user was right.** The actual booking/purchase goes through when **leaving Step 6 (StepSummary)**, not Step 5.

### Timeline:
- **Step 5 (StepContact)**: User enters contact info → `emitStepEvent(5)` fires → `track('Purchase', ...)` is called
- **Step 6 (StepSummary)**: User reviews booking → clicks "Bekræft booking" button
  - `handleSubmit()` is called
  - `createBooking()` server action executes
  - **Database insert happens** (booking is actually created)
  - If successful → redirects to confirmation page

**Problem**: Purchase event is tracked in Step 5, but the actual database transaction and conversion happens in Step 6.

---

## All Booking Steps & Potential Meta Tracking

| Step | Component | Name | Currently Tracked | Potential Meta Events |
|------|-----------|------|-------------------|----------------------|
| 1 | StepAddresses | Pickup & Delivery Addresses | ❌ No | `ViewContent` (location selection), `Lead` (location data submitted) |
| 2 | StepBoxCount | Box Count Selection | ✅ Yes: **AddToCart** | `AddToCart` ✅ (item quantity selected) |
| 3 | StepDate | Delivery Date Selection | ✅ Yes: **SelectDeliveryDate** (custom) | `SelectDeliveryDate` (custom) ✅, `AddPaymentInfo` (conditional: if date = immediate) |
| 4 | StepAddons | Add-ons (Carrying, Cleaning) | ❌ No | `AddToCart` (add-on item), `Lead` (optional services selected) |
| 5 | StepContact | Contact Info | ✅ Yes: **Purchase** (❌ **WRONG TIMING**) | `AddPaymentInfo` (contact collected), `Lead` (customer info submitted) |
| 6 | StepSummary | Review & Confirm | ✅ Yes: **ViewSummary** (custom, on entry) | `Purchase` (on confirm button click - where it SHOULD be), `Lead` (final confirmation) |

---

## Available Meta Standard Events (from meta.ts)

```typescript
type StandardEvent =
  | 'PageView'           // Page viewed
  | 'ViewContent'        // Content/product viewed
  | 'InitiateCheckout'   // Checkout started ✅ (already used at wizard open)
  | 'AddToCart'          // Item added to cart ✅ (used at Step 2)
  | 'AddPaymentInfo'     // Payment info provided
  | 'Lead'               // Lead information collected
  | 'Purchase'           // Purchase completed ✅ (used but at wrong step)
```

---

## Recommended Changes

### Issue #1: Purchase Event Timing
- **Current**: Fired when leaving Step 5 (user hasn't confirmed yet)
- **Should be**: Fired when user clicks "Bekræft booking" on Step 6 (after `createBooking` succeeds)
- **Fix**: Move the `track('Purchase')` call to StepSummary's `handleSubmit()` after successful booking creation

### Issue #2: Missing Step Tracking

| Step | Tracking Gap | Suggested Solution |
|------|--------------|-------------------|
| 1 | Address selection not tracked | Add `track('ViewContent')` or `trackCustom('AddressSelected')` |
| 4 | Add-ons selection not tracked | Add `trackCustom('SelectAddons', { addons: [...] })` when user leaves step |
| 5 | Contact info step not tracked separately | Add `track('AddPaymentInfo')` when leaving Step 5 (before moving to Step 6) |

### Issue #3: Step 6 Entry Event
- `ViewSummary` is currently a **custom event** (should probably stay as custom for now)
- Consider: Would `Lead` be more appropriate here since all customer info is collected?

---

## Funnel Funnel Progression Expectation (Meta Standard Flow)

```
InitiateCheckout (Step 1 open) 
    ↓ 
AddToCart (Step 2: box count selected) 
    ↓ 
Lead (Step 5: contact info provided) 
    ↓ 
Purchase (Step 6: confirmed) ✅ Recommended
```

Currently: `Purchase` is at Step 5 (WRONG) instead of Step 6.

---

## Server-Side CAPI Tracking Note

The comment in StepSummary indicates:
> "The purchase conversion is tracked at step 5; server-side CAPI Purchase is still sent in createBooking."

This means CAPI (Conversions API) sends a Purchase event server-side when `createBooking` is called. However, since the client-side Purchase pixel fires at Step 5 and the server-side CAPI Purchase fires at Step 6, they're currently:
1. **Timing-mismatched** (different moments)
2. **Potentially deduplicating poorly** (using eventId should help, but it's still confusing)

### Clarification Needed
- Are both pixel and CAPI Purchase events using the same `eventId` for deduplication?
<!-- I don't understand this question. I didn't know we had two different events firing to begin with. -->
- Should both fire at Step 6 for consistency?
