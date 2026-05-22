# Plan: Dynamisk Tier-baseret Prismodel + Sticky PriceBar

> **Status:** 🟡 In Progress | **Last Updated:** 2026-05-22
> **Scope:** `src/lib/booking-types.ts`, `src/components/booking/`

---

## 1. Context & Objectives

**Goal:** Erstat de faste pakkepriser med en dynamisk prismodel baseret på antal kasser. Pakkerne forbliver som visuelle "guides" til at vælge antal kasser. To tal (pris pr. kasse og totalpris) vises altid over "Næste"-knappen — fixed til bunden på mobil.

**Constraints:**
- Ingen nye dependencies
- `selectedPackage` bevares som UI-state (fremhæver den valgte preset), men `boxCount` er kilden til alle prisberegninger
- Tiers skal nemt kunne tilføjes/justeres i én fil (`booking-types.ts`)
- StepDate skal fortsat hente `basisUger` fra den aktive tier (ikke fra pakken)

---

## 2. Technical Research & State

**Affected Files:**
- `src/lib/booking-types.ts` — Primær ændring: ny `TIERS`, `getTier()`, `calcPrisPrBoks()`, opdateret `calcTotal()`, `boxCount` i state, PACKAGES mister `basepris`/`basisUger`
- `src/components/booking/steps/StepPackage.tsx` — Pakker viser nu pris pr. kasse fra tier + +/– justeringsknap til boxCount
- `src/components/booking/steps/StepDate.tsx` — `basisUger` hentes fra `getTier(boxCount)` i stedet for pakken
- `src/components/booking/steps/StepSummary.tsx` — Viser pris pr. kasse + samlet pris beregnet fra tiers
- `src/components/booking/BookingWizard.tsx` — Renderer `PriceBar` som fixed bottom-element på trin 2–6
- `src/components/booking/PriceBar.tsx` — Ny komponent

**Eksisterende logik der bevares:**
- `selectedPackage` som UI-highlight
- `extraWeeks` +/– UI i StepDate
- `addRengoring`/`addBaering` tilkøb (+79 kr stk.)
- Framer Motion step-animationer
- ProgressBar

**Ny state:**
- `boxCount: number` i `BookingState` (default: 0, sættes når pakke vælges)

---

## 3. User Journey & Flow

- [ ] **Trin 2 – Pakker (ny adfærd):**
    - [ ] 2.1 Brugeren ser 4 pakkekort (Micro/Lille/Mellem/Stor) — hvert kort viser label, m², kassetal og **pris pr. kasse fra den tilhørende tier**
    - [ ] 2.2 Klik på et kort sætter `selectedPackage` + `boxCount` til pakkepreset-værdien
    - [ ] 2.3 Under kortene: +/– adjuster til finjustering af `boxCount` (min 1, ingen øvre grænse)
    - [ ] 2.4 Når `boxCount` ændres, opdateres pakkefremhævningen automatisk (eller nulstilles hvis ingen matcher)
    - [ ] 2.5 `PriceBar` vises i bunden med pris pr. kasse + total fra den aktive tier

- [ ] **Trin 3 – Dato (opdateret):**
    - [ ] 3.1 `basisUger` hentes fra `getTier(boxCount).basisUger`
    - [ ] 3.2 Ekstra uge-pris vises som `boxCount × extraUgePrisPrBoks` kr/uge
    - [ ] 3.3 `PriceBar` opdateres live når `extraWeeks` ændres

- [ ] **Trin 4–5 – Tilkøb + Kontakt:**
    - [ ] `PriceBar` vises fortsat med opdateret total inkl. tilkøb

- [ ] **Trin 6 – Opsummering:**
    - [ ] Viser pris pr. kasse, basisuger, ekstra uger, tilkøb og samlet total
    - [ ] `PriceBar` skjules (alt vises allerede i opsummeringen)

---

## 4. Implementation Roadmap

### Phase A: Data-lag
- [ ] **A.1:** Tilføj `TIERS` og `getTier()` til `booking-types.ts`
- [ ] **A.2:** Opdater `PACKAGES` — fjern `basepris` og `basisUger`
- [ ] **A.3:** Tilføj `boxCount` til `BookingState` og `INITIAL_BOOKING_STATE`
- [ ] **A.4:** Opdater `calcTotal()` og tilføj `calcPrisPrBoks()` til at bruge tiers

### Phase B: UI-komponenter
- [ ] **B.1:** Opret `PriceBar.tsx`
- [ ] **B.2:** Opdater `BookingWizard.tsx` til at rendere `PriceBar` + tilføje bottom-padding
- [ ] **B.3:** Opdater `StepPackage.tsx` — vis tier-pris + boxCount adjuster
- [ ] **B.4:** Opdater `StepDate.tsx` — brug tier til basisUger og ekstra uge-pris
- [ ] **B.5:** Opdater `StepSummary.tsx` — brug ny prisberegning

---

## 5. Technical Specifications

### Task [A.1]: TIERS og getTier()

```ts
export interface Tier {
  maxBoxes: number        // øvre grænse for dette tier (Infinity for det sidste)
  basisUger: number       // inkluderede uger ved dette antal kasser
  prisPrBoks: number      // basispris pr. kasse (hele lejeperioden)
  extraUgePrisPrBoks: number  // pris pr. ekstra uge pr. kasse
}

export const TIERS: Tier[] = [
  { maxBoxes: 49,       basisUger: 2, prisPrBoks: 15.95, extraUgePrisPrBoks: 1.75 },
  { maxBoxes: 79,       basisUger: 3, prisPrBoks: 15.95, extraUgePrisPrBoks: 1.50 },
  { maxBoxes: 139,      basisUger: 4, prisPrBoks: 15.95, extraUgePrisPrBoks: 1.25 },
  { maxBoxes: Infinity, basisUger: 5, prisPrBoks: 14.25, extraUgePrisPrBoks: 1.00 },
]

export function getTier(boxCount: number): Tier {
  return TIERS.find((t) => boxCount <= t.maxBoxes) ?? TIERS[TIERS.length - 1]
}
```

> **Note:** `prisPrBoks`-værdier er placeholders — afklares med Anda.

### Task [A.2]: Opdateret PACKAGES

PACKAGES beholder kun `label`, `kasser`, `m2`. `basepris` og `basisUger` fjernes (beregnes nu fra tier).

```ts
export const PACKAGES = {
  micro:  { label: 'Micro',  kasser: 25,  m2: '25 m²'  },
  lille:  { label: 'Lille',  kasser: 50,  m2: '50 m²'  },
  mellem: { label: 'Mellem', kasser: 80,  m2: '80 m²'  },
  stor:   { label: 'Stor',   kasser: 140, m2: '140 m²' },
} as const
```
<!-- Vi behøver ikke "m2" fordi man siger én kasse til 1m2 -->

### Task [A.3]: BookingState

Tilføj `boxCount: number` (default `0`).

### Task [A.4]: Prisberegning

```ts
export function calcPrisPrBoks(boxCount: number): number {
  return getTier(boxCount).prisPrBoks
}

export function calcTotal(state: BookingState): number {
  if (state.boxCount === 0) return 0
  const tier = getTier(state.boxCount)
  return Math.round(
    state.boxCount * tier.prisPrBoks +
    state.extraWeeks * state.boxCount * tier.extraUgePrisPrBoks +
    (state.addRengoring ? 79 : 0) +
    (state.addBaering ? 79 : 0)
  )
}
```

### Task [B.1]: PriceBar (`src/components/booking/PriceBar.tsx`)

- Props: `boxCount: number`, `total: number`, `prisPrBoks: number`
- Vises kun når `boxCount > 0`
- Layout:
  ```
  [ X,XX kr pr. kasse ]  [ Total: X.XXX,- kr ]
  ```
- Styling: `fixed bottom-0 left-0 right-0` (mobil + desktop), hvid baggrund, tynd top-border, `z-40`
- Tailwind: `bg-white border-t border-zinc-100 px-4 py-3 flex justify-between items-center`
- Ikke renderet på trin 6 (StepSummary) og 7 (SuccessApology)

### Task [B.2]: BookingWizard ændringer

- Importer `PriceBar` og `calcTotal`, `calcPrisPrBoks`
- Betingelse: vis `PriceBar` når `step >= 2 && step <= 5 && booking.boxCount > 0`
- Tilføj `pb-24` til wizard-container så indhold ikke gemmes bag baren

### Task [B.3]: StepPackage ændringer

- Hvert kort viser nu: label, m², kassetal, og **`getTier(pkg.kasser).prisPrBoks.toFixed(2)} kr pr. kasse`**
- Klik på kort: `onChange({ selectedPackage: key, boxCount: pkg.kasser })`
- Under kortene: en +/– adjuster for `boxCount`
  - `–` er disabled ved `boxCount <= 1`
  - Når `boxCount` ændres manuelt: hvis ingen pakke matcher nøjagtigt, sæt `selectedPackage` til `null` (ingen fremhævning)
  - Vis aktivt tier under adjusteren: `"${tier.basisUger} uger inkluderet · +${(boxCount * tier.extraUgePrisPrBoks).toFixed(0)} kr/uge ekstra"`
- Næste-knap disabled når `boxCount === 0`

### Task [B.4]: StepDate ændringer

- Importer `getTier` fra `booking-types`
- `const tier = getTier(value.boxCount)`
- `basisUger` = `tier.basisUger` (erstatter den hardkodede `2`)
- Pickup date = `addDays(selected, tier.basisUger * 7 + value.extraWeeks * 7)`
- Lejeperiode-visning: `${tier.basisUger + value.extraWeeks} uger`
- Ekstra uge-pris label: `+${(value.boxCount * tier.extraUgePrisPrBoks).toFixed(0)} kr/uge`

### Task [B.5]: StepSummary ændringer

- Vis `boxCount` i stedet for pakkenavn i pris-rækken
- Tilføj en `Row` for "Pris pr. kasse": `calcPrisPrBoks(booking.boxCount).toFixed(2)} kr`
- Tilføj en `Row` for "Lejeperiode": `${tier.basisUger + booking.extraWeeks} uger`
- Total-beregning bruger allerede den opdaterede `calcTotal()`

---

## 6. Verification Checklist

- [ ] Tier skifter korrekt: 49 kasser → tier 1, 50 kasser → tier 2, 79 → tier 2, 80 → tier 3
- [ ] `basisUger` i StepDate afspejler valgt boxCount, ikke den gamle pakke
- [ ] Ekstra uge-pris i StepDate er korrekt: `boxCount × extraUgePrisPrBoks`
- [ ] PriceBar vises ikke på trin 1, 6 og 7
- [ ] PriceBar forsvinder ikke bag browser-navigationsbaren på mobil (brug `pb-safe` eller fast padding)
- [ ] Manuel boxCount-justering nulstiller pakke-fremhævning korrekt
- [ ] calcTotal inkluderer tilkøb korrekt

---

## 7. Comments & Deviations

Note [2026-05-22]: `prisPrBoks`-værdier i TIERS er placeholders (15.95 / 14.25 kr). Anda bekræfter de endelige tal.

Note [2026-05-22]: `selectedPackage` bevares i state som UI-convenience (fremhævning af preset-kort), men er ikke länger kilde til prisinformation — `boxCount` og `getTier()` driver alt.

Note [2026-05-22]: PriceBar er fixed på både mobil og desktop for konsistens. Wizard-containeren får `pb-24` for at undgå overlap.
