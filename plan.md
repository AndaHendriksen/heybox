---
# Plan: Replace booking autocomplete with postcode-based select + address input

> **Status:** 🟡 In Progress | **Last Updated:** 2026-06-11
> **Scope:** src/components/booking/steps/StepAddresses.tsx

---

## 1. Context & Objectives
**Goal:** Replace the current Google Places autocomplete address inputs with a local city/postcode select backed by `src/lib/locations.ts`, and show a follow-up free-text address input only after the user chooses a location. This must apply to both the delivery and pickup address blocks.
**Constraints:** No new external dependencies. Preserve the existing booking state fields (`deliveryAddress`, `deliveryZipcode`, `pickupAddress`, `pickupZipcode`) and validation behavior. Keep styling consistent with the existing Tailwind/UI patterns.

## 2. Technical Research & State
- **Affected Files:**
  - `src/components/booking/steps/StepAddresses.tsx`: existing booking address UI component and current autocomplete logic.
  - `src/lib/locations.ts`: source-of-truth list of delivery locations and postcode data.
- **Existing Logic:**
  - `StepAddresses.tsx` currently renders two `AddressAutocomplete` components.
  - Each autocomplete uses Google Maps Places API for suggestions and populates `deliveryAddress`/`pickupAddress` and `deliveryZipcode`/`pickupZipcode`.
  - The booking wizard continues only when both postcodes validate as Storkøbenhavn.
- **New Components/Hooks:**
  - `AddressLocationSelect` (or inline logic inside `StepAddresses`): a select field that lists all delivery locations by `name`, sorted alphabetically.
  - `AddressDetailsInput`: follow-up text input shown conditionally after a location is selected.

## 3. User Journey & Flow
- [ ] **Step 1:** User opens the booking address step.
    - [ ] 1.1 Delivery block renders a location dropdown and no free-text address initially.
    - [ ] 1.2 Pickup block renders a location dropdown and no free-text address initially.
- [ ] **Step 2:** User selects a city/location from the dropdown.
    - [ ] 2.1 The selected location name is displayed in the select field.
    - [ ] 2.2 The corresponding postcode is stored in `deliveryZipcode` or `pickupZipcode`.
    - [ ] 2.3 A new address input appears below the select.
- [ ] **Step 3:** User enters the street+number or delivery details into the new input.
    - [ ] 3.1 The typed address is stored in `deliveryAddress` or `pickupAddress`.
    - [ ] 3.2 Validation remains based on postcode presence and Storkøbenhavn coverage.

## 4. Implementation Roadmap (The To-Do)
### Phase A: Setup & Data
- [ ] **A.1:** Import `DELIVERY_LOCATIONS` from `src/lib/locations.ts` into `StepAddresses.tsx`.
- [ ] **A.2:** Create a sorted location list by `name` for the select options.
- [ ] **A.3:** Define a compact internal type for location select values.

### Phase B: UI & Integration
- [ ] **B.1:** Replace `AddressAutocomplete` with a new address-selection block.
- [ ] **B.2:** Render a `<select>` for location selection and conditionally render a text input.
- [ ] **B.3:** Wire selection changes to `onChange()` updates for postcode and clear/fill logic.
- [ ] **B.4:** Keep the existing postcode validation UI and error message behavior.

---

## 5. Technical Specifications (To-Do Details)

### Task [A.1]: Import delivery locations
- **Input/Props:** none
- **Logic:**
  - Import `DELIVERY_LOCATIONS` from `src/lib/locations.ts`.
  - Derive an array sorted by `name`.
  - Each option should include the display `name`, matching `postcode`, and `code` if needed.
- **Code Reference:** `src/components/booking/steps/StepAddresses.tsx`

### Task [A.2]: Define location select state and output
- **Input/Props:**
  - `id: string`
  - `label: string`
  - `value: string` (address text)
  - `postcode: string`
  - `onSelect: (address: string, postcode: string) => void`
  - `onClear: () => void`
- **Logic:**
  - Render a `<select>` with an initial placeholder option like `Vælg by / område`.
  - When an option is chosen, set the booking postcode and clear the address if location changes.
  - When no location is selected, hide the free-text address input.
- **Code Reference:** original `AddressAutocomplete` component.

### Task [B.1]: Render the free-text address input conditionally
- **Input/Props:** same as above
- **Logic:**
  - After a valid location is selected, display a text input with a placeholder such as `Fx: Gammel Kongevej 1`.
  - The typed value should update `deliveryAddress`/`pickupAddress` via `onChange`.
  - If the user clears the location, set both address and postcode to empty.
- **Notes:**
  - Keep validation icon and invalid-state styling for the postcode.
  - The text input itself can be plain and does not need postcode validation.

## 6. Verification Checklist
- [ ] Unit Tests: verify `StepAddresses` updates `deliveryZipcode`/`pickupZipcode` when location is selected.
- [ ] Unit Tests: verify free-text address input only appears after location selection.
- [ ] Manual Check: confirm location dropdown is sorted alphabetically by `name`.
- [ ] Manual Check: confirm the booking wizard still validates only Storkøbenhavn postcodes.
- [ ] Manual Check: ensure both delivery and pickup blocks behave identically.

## 7. Comments & Deviations
Note [2026-06-11]: The plan replaces the external autocomplete dependency with a locally-driven select + text input flow, preserving the existing booking state interface and validation logic.
