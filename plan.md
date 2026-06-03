# Plan: Lokationer-side (leveringsområder)

> **Status:** 🟢 Implemented | **Last Updated:** 2026-06-03
> **Scope:** `src/app/(site)/lokationer/page.tsx` + ny data-modul

---

## 1. Context & Objectives

**Goal:** En enkel, tekstbaseret "Lokationer"-side der fortæller hvor HeyBox leverer, og som lister **navnene på alle postnumre vi leverer til**, delt op i **København** og **Storkøbenhavn**. Siden skal matche resten af sitets visuelle sprog (sorte borders, store uppercase-overskrifter, `Section`-wrapper) men uden billeder. Den skal også styrke lokal SEO ("flyttekasser København", bynavne).

**Constraints:**
- Tailwind only - genbrug eksisterende primitives fra `@/components/sections/blocks` og `@/components/ui/section`.
- Ingen billeder (modsat `om-os`).
- Ingen nye dependencies.
- **Postnummer-listen SKAL stemme overens med leveringslogikken i `src/lib/utils/geo.ts`** (`isStorkobenhavn`). Ellers kan en bruger se en by på listen som booking-flowet afviser, eller omvendt.
- Følg `AGENTS.md`: denne Next.js-version kan afvige - læs relevant guide i `node_modules/next/dist/docs/` før kode skrives (især metadata-API'et).

## 2. Technical Research & State

- **Affected Files:**
  - `src/app/(site)/lokationer/page.tsx`: Tom i dag (1 linje). Skal bygges som server-component i samme stil som `om-os/page.tsx` - `export const metadata` + en `default function` der sammensætter sektioner.
  - `src/lib/utils/geo.ts`: **Sandhedskilde for leveringsområdet.** I dag: `isStorkobenhavn(postcode)` = `num >= 1000 && num <= 2959 && !OUTSIDE_POSTCODES.has(num)`, hvor `OUTSIDE_POSTCODES = {2640, 2670, 2680, 2690, 2960, 2970, 2980, 2990}`. Bemærk: 2960–2990 er allerede uden for ≤2959, så de reelt ekskluderede *inden for* intervallet er **2640, 2670, 2680, 2690**.
  - `src/components/sections/blocks.tsx`: Genbrugelige sektioner. Relevante: `Section` (wrapper), overskrifts-/border-mønstret brugt i `om-os` (`border-x`, `max-w-[700px] mx-auto`, uppercase `font-black`-headings).
  - `src/app/(site)/om-os/page.tsx`: Stilreference for hero + tekstsektioner.

- **Existing Logic:** Booking-flowet (`StepAddresses.tsx`) bruger `isStorkobenhavn` til at validere leveringsadresse og afhentningsadresse. Lokationer-siden skal vise præcis det samme univers af postnumre, så forventningen sat på marketing-siden holder i booking.

- **New Components/Hooks:**
  - **Ny data-modul** `src/lib/locations.ts` - en typed liste over leveringsbyerne (kode + navn + region). Bliver sandhedskilde for *visning*; bør krydstjekkes mod `geo.ts`-logikken (se Task A.1).
  - Lokale (ikke-eksporterede) sektion-komponenter i `page.tsx`: `LocationsHero`, `LocationGrid`, evt. `NotCoveredNote` og en afsluttende CTA.

## 3. User Journey & Flow

- [ ] **Step 1:** Bruger lander på `/lokationer` (fra menu/footer eller SEO-søgning).
    - [ ] 1.1 Ser hero: overskrift "Vi leverer i hele Storkøbenhavn" + kort intro.
- [ ] **Step 2:** Bruger scroller til oversigten over områder.
    - [ ] 2.1 Sektion **København** med bydele/postnumre.
    - [ ] 2.2 Sektion **Storkøbenhavn** med omegnskommuner/postnumre.
- [ ] **Step 3:** Bruger søger sin egen by/postnummer i listen og bekræfter dækning.
    - [ ] 3.1 (Valgfrit) Lille note om områder vi *ikke* dækker endnu (Greve, Solrød m.fl.), så forventningen er ærlig.
- [ ] **Step 4:** Bruger klikker CTA "Se hvad det koster" → `/booking`.

## 4. Implementation Roadmap (The To-Do)

### Phase A: Data
- [ ] **A.1:** Opret `src/lib/locations.ts` med typed liste over leveringsbyer (kode, navn, region) - sandhedskilde for visning, krydstjekket mod `geo.ts`.
- [ ] **A.2:** (Anbefalet, valgfrit) Tilføj en lille test/assertion der sikrer at hver by i `locations.ts` opfylder `isStorkobenhavn`, så listen og validering ikke driver fra hinanden.

### Phase B: UI & Integration
- [ ] **B.1:** Byg `metadata` + side-skellet i `page.tsx` (hero-sektion).
- [ ] **B.2:** Byg `LocationGrid`-sektion der renderer København- og Storkøbenhavn-grupperne fra `locations.ts`.
- [ ] **B.3:** Tilføj "ikke dækket endnu"-note + afsluttende CTA til `/booking`.
- [ ] **B.4:** Sørg for at siden er linket fra menu/footer (tjek `src/components/menu.tsx`).

---

## 5. Technical Specifications (To-Do Details)

### Task [A.1]: `src/lib/locations.ts` - data-modul

- **Type:**
  ```ts
  export type Region = "koebenhavn" | "storkoebenhavn"
  export interface DeliveryLocation { code: string; name: string; region: Region }
  ```
- **Logic:** Eksportér `DELIVERY_LOCATIONS: DeliveryLocation[]` samt to afledte arrays (`koebenhavn`, `storkoebenhavn`) via `.filter`. Sortér efter `code`.
- **Foreslået indhold** (navne på postnumre vi leverer til - udledt af `geo.ts`: 1000–2959 minus 2640/2670/2680/2690):

  **København** (Københavns Kommune + Frederiksberg - bykernen):
  | Kode | Navn |
  |------|------|
  | 1000–1499 | København K |
  | 1500–1799 | København V |
  | 1800–1999 | Frederiksberg C |
  | 2000 | Frederiksberg |
  | 2100 | København Ø |
  | 2150 | Nordhavn |
  | 2200 | København N |
  | 2300 | København S |
  | 2400 | København NV |
  | 2450 | København SV |
  | 2500 | Valby |
  | 2700 | Brønshøj |
  | 2720 | Vanløse |

  **Storkøbenhavn** (omegnskommunerne):
  | Kode | Navn |
  |------|------|
  | 2600 | Glostrup |
  | 2605 | Brøndby |
  | 2610 | Rødovre |
  | 2620 | Albertslund |
  | 2625 | Vallensbæk |
  | 2630 | Taastrup |
  | 2635 | Ishøj |
  | 2650 | Hvidovre |
  | 2660 | Brøndby Strand |
  | 2665 | Vallensbæk Strand |
  | 2730 | Herlev |
  | 2740 | Skovlunde |
  | 2750 | Ballerup |
  | 2760 | Måløv |
  | 2765 | Smørum |
  | 2770 | Kastrup |
  | 2791 | Dragør |
  | 2800 | Kongens Lyngby |
  | 2820 | Gentofte |
  | 2830 | Virum |
  | 2840 | Holte |
  | 2850 | Nærum |
  | 2860 | Søborg |
  | 2870 | Dyssegård |
  | 2880 | Bagsværd |
  | 2900 | Hellerup |
  | 2920 | Charlottenlund |
  | 2930 | Klampenborg |
  | 2942 | Skodsborg |
  | 2950 | Vedbæk |

  > **Bemærk om 1000–1799:** Det centrale København består teknisk af hundredvis af gade-/firmapostnumre. På siden grupperes de som "København K" og "København V" (vis evt. som interval "1050–1799") frem for at liste hvert 4-cifret nummer - ellers bliver listen ulæselig.

  > **Ikke dækket endnu (inden for nærområdet, men ekskluderet i `geo.ts`):** 2640 Hedehusene, 2670 Greve, 2680 Solrød Strand, 2690 Karlslunde. Bruges i "ikke dækket"-noten (Task B.3) så forventningen er ærlig.

- **⚠️ Verificér navnene:** Listen ovenfor er udledt manuelt fra postnummer-intervallet. Slå hvert navn op (officiel PostNord/postnummer-liste) før implementering, så der ikke vises forkerte bynavne.

### Task [A.2]: Konsistens-tjek (valgfrit men anbefalet)
- **Notes:** Brug `/test`-skill til en lille test: `DELIVERY_LOCATIONS.every(l => isStorkobenhavn(l.code))` skal være `true`, og de fire ekskluderede koder skal give `false`. Fanger drift mellem marketing-liste og booking-validering.

### Task [B.1]: `metadata` + hero
- **Logic:** Kopiér mønstret fra `om-os/page.tsx`:
  ```ts
  export const metadata: Metadata = {
    title: "Lokationer",
    description: "Vi leverer og henter flyttekasser i hele Storkøbenhavn - fra København K til Vedbæk. Se alle de byer og postnumre vi dækker.",
    alternates: { canonical: "/lokationer" },
    openGraph: { title: "Lokationer", description: "...", url: "/lokationer", type: "website" },
  }
  ```
- **Hero:** `Section` > `div.border-x.pt-24` > `max-w-[700px] mx-auto px-4`, med:
  - Lille pre-label: "Lokationer" (`border-b pb-4 mb-5 inline-block`).
  - `<h1>` uppercase `font-black`: "Vi leverer i hele Storkøbenhavn".
  - Intro-`<p>`: kort tekst om gratis levering + afhentning i hele området.
- **Code Reference:** `om-os/page.tsx:44-63` (`AboutUs`).

### Task [B.2]: `LocationGrid`
- **Input/Props:** `{ title: string; locations: DeliveryLocation[] }` (kaldes to gange: København + Storkøbenhavn).
- **Logic:** Inden i en `Section` med `border-x`: en overskrift (`<h2>` uppercase font-black, samme stil som `om-os`), efterfulgt af et responsivt grid af bynavne. Forslag: `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px` hvor hver celle viser `name` (og evt. `code` mindre/gråt). Genbrug det stiplede/sorte border-look for at matche `SectionThreeInfoColumns`.
- **Notes:** Hold det rent tekst - ingen billeder. Overvej `aria`-venlig liste (`<ul>`/`<li>`) frem for bare divs af hensyn til tilgængelighed og SEO.

### Task [B.3]: "Ikke dækket"-note + CTA
- **Notes:**
  - Lille afsnit: "Vi udvider løbende. Lige nu leverer vi endnu ikke i fx Greve, Solrød og Hedehusene - men skriv til os." (Hold ærligt, undgå at love noget.)
  - Afsluttende CTA-knap til `/booking` ("Se hvad det koster" / "Book nu"), genbrug `Button`-mønster fra `blocks.tsx` (`bg-green-300`, `ArrowRight`).

### Task [B.4]: Navigation
- **Notes:** Tjek `src/components/menu.tsx` (og evt. footer) for om `/lokationer` skal tilføjes som menupunkt. Afklar med bruger om den skal i hovedmenuen eller kun footer/SEO.

## 6. Verification Checklist
- [ ] **Konsistens:** Hver by på siden valideres som `valid` i booking (`isStorkobenhavn`), og de 4 ekskluderede koder vises IKKE som dækket. (Task A.2)
- [ ] **Navne korrekte:** Alle bynavne krydstjekket mod officiel postnummer-liste.
- [ ] **Manual Check:** Mobil-responsivitet på by-grid'et (2 kolonner på lille skærm, flere på desktop); borders flugter med resten af sitet.
- [ ] **SEO:** `metadata` + `canonical` sat; bynavne står som læsbar tekst (ikke billeder); siden er crawlbar og linket internt.
- [ ] **A11y:** By-listen er semantisk markup (`ul/li`), kontrast OK.

## 7. Comments & Deviations

Note [2026-06-03]: Valgte at gruppere det centrale København (1000–1799) som "København K/V" frem for at liste hvert gade-postnummer, da der ellers ville være hundredvis af items. De reelt ekskluderede postnumre i nærområdet er 2640/2670/2680/2690 (2960–2990 ligger allerede uden for ≤2959-intervallet i `geo.ts`).

Note [2026-06-03]: Anbefaler `src/lib/locations.ts` som sandhedskilde for *visning*, men understreger at den skal holdes i sync med `isStorkobenhavn` i `geo.ts` (sandhedskilde for *validering*) via en lille test - ellers risikerer marketing-side og booking-flow at vise modstridende dækning.

Note [2026-06-03] - IMPLEMENTERET: Oprettede `src/lib/locations.ts` (data, 43 byer) og byggede `src/app/(site)/lokationer/page.tsx` (hero + to LocationGrid-sektioner + "ikke dækket"-note + CTA). Tilføjede `/lokationer` til menu, footer og `sitemap.ts`.
- **Afvigelse fra A.2:** Projektet har INGEN test-runner installeret (ingen jest/vitest), og constraint = ingen nye deps. Droppede derfor det formelle testfil og verificerede konsistensen manuelt: alle 43 postnumre opfylder `isStorkobenhavn`, og de 4 ekskluderede (2640/2670/2680/2690) er holdt ude. Bør laves til en rigtig test, hvis der senere tilføjes et test-setup.
- **Afvigelse fra B.2:** Droppede det skrøbelige `nth-child`-border-mønster (brød på tværs af breakpoints) til fordel for `gap-px bg-gray-300` + `bg-white`-celler, som giver rene gridlines ved alle kolonneantal.
- **Åbne spørgsmål afgjort med defaults:** (1) Central-KBH vist som intervaller ("1000–1499 København K"). (2) `/lokationer` tilføjet til BÅDE menu og footer. (3) Ikke-dækkede områder nævnes ærligt i en note. Sig til, hvis du vil have det anderledes.
- Verificeret: `tsc --noEmit` = exit 0 (efter `next typegen`), eslint rent på de nye filer.

**Åbne spørgsmål til bruger:**
1. Skal de individuelle 1000–1799-postnumre vises som intervaller ("1050–1799 København V") eller bare som bynavne uden koder?
2. Skal `/lokationer` i hovedmenuen, eller kun i footer/til SEO?
3. Skal vi overhovedet nævne de ikke-dækkede områder (Greve/Solrød/Hedehusene), eller helt udelade dem?
