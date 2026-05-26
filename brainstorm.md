# Brainstorm: Summary Page Redesign

## Problem Definition
- **User:** A customer who has just filled in 5 steps of a booking form
- **Goal:** Feel confident all their details are correct before confirming (and paying)
- **Friction:** The current table layout presents every field as equal-weight key-value pairs — no visual hierarchy, no sense of sequence — making it hard to mentally picture the actual flow of events

- **Problem Statement:** A booking customer needs to review their order and feel confident it's right, but a flat table of rows gives no sense of the chronological journey their boxes will take.

---

## HMW Question
> How might we make the summary feel like a preview of the customer's actual moving day, not a data dump?

---

## Directions Considered

- **Substitute:** Replace each table row with a timeline card — one card per event (delivery, rental, pickup). Icons replace labels: truck down, calendar, truck up.
- **Substitute:** Replace plain text addresses with a stylized address "chip" with a pin icon, making addresses feel more like destinations.
- **Combine:** Merge the rental duration card with a visual date-range bar — showing exactly when the boxes arrive and when they leave.
- **Combine:** Combine the user info and total into one "Your booking" footer card so the personal + financial close together feel like a receipt.
- **Adapt:** Borrow the **flight itinerary** pattern (e.g. Airbnb, Google Flights) — origin → transit → destination, connected by a dashed line. Boarding-pass aesthetic.
- **Adapt:** Borrow **delivery tracking** UI (e.g. PostNord, GLS) — a vertical timeline with dots and connector lines showing completed vs. upcoming events.
- **Eliminate:** Remove the section headers entirely and let icons carry the meaning — fewer words, faster scan.
- **Eliminate:** Don't show the carrying addon as a separate row — instead embed it as a sub-label inside the delivery/pickup card ("Båret ind i boligen" directly under the address).
- **Put to other use:** The same timeline layout renders as a confirmation email — customer sees the exact same visual after booking as before, which builds trust.

---

## Direction A: Vertical Timeline Cards
**Selected because:** The timeline metaphor directly mirrors the physical journey: boxes go down (delivery), stay (rental), come back up (pickup). It's the most intuitive pattern for a logistics service and maps perfectly to your 5-group structure.

**Key risk/assumption:** The carrying addon (`addCarrying`) is a single boolean in `BookingState` — it applies to both delivery and pickup with the same value. The UI must make it clear the same preference applies both ways, otherwise users might wonder if they can choose differently per direction.

### User Journey
1. **Entry Point:** User taps "Se opsummering" from the contact step → page slides in showing the timeline
2. **Action:** User scans the three event cards top-to-bottom → **Response:** Timeline connector line visually chains them together, cleaning reminder badge appears inline if `addCleaning === false`
3. **Action:** User notices wrong address → **Response:** Taps a subtle "Rediger" link on the card (or uses back navigation) to fix it
4. **Goal achieved:** User reads total at the bottom, taps "Bekræft booking" with confidence

### Key UI Components
- **Timeline rail:** A vertical line on the left with colored dots per event (delivery = green, rental = blue, pickup = orange)
- **Event card:** Icon + headline + address + date + carrying sub-label. No label prefixes — context is self-evident from position.
- **Rental bridge card:** Shows duration ("6 uger") + date range pill (e.g. "14. jun → 26. jul"). If `addCleaning === false`, shows an amber inline notice: "Husk at rengøre kasserne inden afhentning"
- **User info card:** Name, email, phone — minimal, no table row feel
- **Total footer:** Price per box left, total amount right — large type, clear anchor

### Edge Cases
- What if delivery and pickup are the same address? The two event cards would show identical addresses — consider collapsing or noting "Samme adresse" to avoid confusion.
<!-- That is an extremely rare case. And if they are the same, the user will know so we don't need to consider this -->
- What if `extraWeeks === 0`? The rental card just says "4 uger inkl." without mentioning extras — keep this short and clear.
- What if the pickup date hasn't been explicitly set in state? Pickup date must be computed: `deliveryDate + totalWeeks weeks`. This calculation needs to be solid and match user expectations.
<!-- Pickup date is set when selecting deliveryDate -->
---

## Direction B: Boarding Pass Stack
**Selected because:** The boarding-pass aesthetic is visually distinctive and immediately signals "this is your ticket" — which raises the perceived value of the booking and creates a moment worth pausing on before confirming.

**Key risk/assumption:** This pattern works beautifully on desktop but can feel cramped on mobile — the horizontal segments and torn-edge dividers need careful implementation to read well at 390px wide.

### User Journey
1. **Entry Point:** Summary step animates in; user sees a card styled like a train/flight ticket
2. **Action:** User reads top section (delivery) → perforated divider → rental duration → perforated divider → pickup → **Response:** Each section uses subtle background color shifts to distinguish zones
3. **Action:** User sees cleaning reminder as a stamp/badge on the rental zone
4. **Goal achieved:** User info and total sit below the ticket card; user confirms

### Key UI Components
- **Ticket card:** Single card with two perforated (dashed) horizontal dividers separating the three event zones
- **Zone header:** Small caps label ("LEVERING", "LEJE", "AFHENTNING") + icon, minimal
- **Rental zone:** Duration as a large number ("6 uger") + date range. Cleaning reminder as a corner badge if applicable.
- **Below-ticket area:** User info row + total, styled as a receipt tail

### Edge Cases
- What if the box count is large (e.g. 50 boxes)? The ticket card becomes content-heavy — may need scroll within the card.
- What if the user is on a very small screen? Perforated dividers may not render distinctly enough.
- What if both addresses are very long? Text overflow inside the fixed-width ticket zones is a real risk.

---

## Recommendation
**Recommended direction: A (Vertical Timeline Cards)**

**Why:** The timeline pattern is mobile-first, naturally handles content of variable length, and is the most familiar metaphor in modern logistics UX (same pattern PostNord, GLS, and Bring all use). It maps directly to your proposed 5-group structure without any structural compromise, and the left-rail connector line does all the storytelling work without adding visual noise. Direction B is striking but fragile at mobile widths.

**Key assumption to validate:** The cleaning reminder (`addCleaning === false`) inside the rental card must be seen as helpful context, not an upsell attempt. Test that the wording ("Husk at rengøre kasserne inden afhentning") reads as a friendly reminder, not a push to add the paid service after the user already declined it.
