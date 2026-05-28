# Plan: Statistik-side — papkassespild ved flytning i Danmark

> **Status:** 🟡 In Progress | **Last Updated:** 2026-05-27
> **Scope:** `src/app/statestik/page.tsx`

---

## 1. Context & Objectives

**Goal:** En standalone marketingside under `/statestik` der viser omfanget af papkassespild ved flytninger i Danmark. Siden skal overbevise besøgende om problemets størrelse og naturligt lede dem mod HeyBox som løsning. Designsproget skal matche forsiden fuldstændigt (Montserrat, hvid baggrund, zinc-palette, primary grøn, Framer Motion scroll-animationer).

**Constraints:**
- Matcher eksisterende designsprog fra `src/app/page.tsx` — ingen nye farver, ingen monospace-font, ingen dark mode
- Ingen nye dependencies — `framer-motion`, `lucide-react` og `@radix-ui/accordion` er allerede tilgængeligt
- Hero-tal MÅ kun vise verificerede, kildeciterede tal (ikke estimerede tickers)
- Tabeller og kildehenvisninger placeres under fold — ikke i hero
- Siden er `'use client'` da den indeholder en interaktiv lommeregner og Framer Motion

---

## 2. Technical Research & State

**Affected Files:**
- `src/app/statestik/page.tsx`: Ny fil — hele siden oprettes her
- `src/app/statestik/index.tsx`: Eksisterer men er tom (1 linje). Kan slettes eller ignoreres — Next.js App Router bruger `page.tsx`
- `src/app/page.tsx`: Reference for design patterns — Nav, animations, section layout
- `src/components/ui/accordion.tsx`: Bruges til metodologi fold-ud sektion
- `src/app/layout.tsx`: Montserrat font via `--font-montserrat` CSS-variabel, `font-sans` klasse

**Existing Logic:**
- Framer Motion bruges med `fadeUpVariant` + `staggerContainer` pattern på forsiden — genbruges identisk
- Nav er inline komponent i `page.tsx` (ikke shared) — kopieres og justeres til `/statestik`
- `Button` bruges med `rounded-full` og `bg-primary` pattern
- Sektioner bruger `py-24 md:py-32 px-6` padding + `max-w-7xl mx-auto` indhold
- Primær grøn: CSS-variabel `--color-primary`, hover `#246337`

**New Components/Hooks:**
- `BoxCalculator` — klient-komponent med `useState` til interaktiv m²-lommeregner (inline i `page.tsx`)
- `SourceBadge` — lille inline komponent der renderer `[Kildenavn ↗]` som klikbar chip (inline i `page.tsx`)

**Datakonstanter (hardkodes i toppen af filen):**
```ts
const STATS = {
  flytningerPerAar: 861_718,          // DST 2025
  fysiskeFlytninger: 507_000,         // DST / 1.7 husstandsfaktor (inference)
  gnsBoligM2: 80,                     // Bolius 2026 (lejer-snit)
  kasserPerM2: 1,                     // Tommelfingerregel
  genbrugPerKasse: 5,                 // United Container (middelscenarie)
  nyeKasserPerAar: 8_112_000,         // Beregnet
  kasseanvendelser: 40_560_000,       // Beregnet
  flytningerPerDag: 2361,             // 861718 / 365
}
```

---

## 3. User Journey & Flow

- [ ] **Step 1:** Besøgende ankommer til `/statestik`
    - [ ] 1.1 Ser Nav med HeyBox-logo og "Bestil nu"-knap
    - [ ] 1.2 Hero: stort tal "861.718" med kilde-badge `[DST 2025 ↗]` og suboverskrift om kasseanvendelser
- [ ] **Step 2:** Scroller forbi stats-rækken
    - [ ] 2.1 Tre nøgletal kort: flytninger/dag · gns. boligm² · nye kasser/år (estimat)
- [ ] **Step 3:** Læser problemnarrativ (tekst + billede)
    - [ ] 3.1 Forklaring af papkasse-problem: engangs, affald, besværet
- [ ] **Step 4:** Interagerer med lommeregneren
    - [ ] 4.1 Taster boligstørrelse ind (m²)
    - [ ] 4.2 Ser: "Du ville bruge ~X kasser" og "Som papkasser koster det ~Y kr og vejer Z kg affald"
- [ ] **Step 5:** Folder metodologi ud (valgfrit)
    - [ ] 5.1 Accordion viser step-by-step beregning med kildebadges
    - [ ] 5.2 Datakildetabel
- [ ] **Step 6:** CTA — grøn boks, "Prøv et bedre alternativ"

---

## 4. Implementation Roadmap (The To-Do)

### Phase A: Setup
- [ ] **A.1:** Opret `src/app/statestik/page.tsx` med `'use client'` direktiv, imports og `STATS`-konstant
- [ ] **A.2:** Tilføj `<Nav />` (kopi fra `page.tsx`, evt. link hjem til `/` i logoet)

### Phase B: Hero & Stats-række
- [ ] **B.1:** `<Hero />` — stor overskrift med det verificerede tal, suboverskrift om estimeret kassebrug, `SourceBadge`-komponent
- [ ] **B.2:** `<StatsRow />` — tre nøgletal-cards i `grid md:grid-cols-3`

### Phase C: Narrativ sektion
- [ ] **C.1:** `<Problem />` — tekst + billed-kolonne (to-kolonne layout som `Why`-sektionen på forsiden)

### Phase D: Interaktiv lommeregner
- [ ] **D.1:** `<BoxCalculator />` — `useState<number>` for m²-input, beregnet output vises live

### Phase E: Metodologi & Kilder
- [ ] **E.1:** `<Methodology />` — Accordion med to items: (1) step-by-step beregning, (2) datakildetabel

### Phase F: CTA & Footer
- [ ] **F.1:** Genbrug `<CTA />` og `<Footer />` fra forsiden (kopi ind i filen)

---

## 5. Technical Specifications (To-Do Details)

### Task [A.1]: Filopsætning og konstanter

- **Logic:**
  ```ts
  'use client'
  // imports: Link, Button, motion, Accordion*, lucide icons
  const STATS = { ... }  // alle tal ét sted
  ```
- **Notes:** Alle tal og kildeURLs samles i `STATS`-objektet øverst — så de er lette at opdatere når DST udgiver nye tal

---

### Task [B.1]: Hero-sektion

- **Layout:** Centreret, `max-w-3xl mx-auto text-center`, `py-32`
- **Logic:**
  - Stor display-overskrift: `"861.718"` (formateret med punktum som tusindtalsseparator)
  - Undertekst: `"danskere skiftede adresse i 2025"` + inline `SourceBadge` til DST
  - Suboverskrift (lidt mindre): `"Det svarer til estimeret 40 mio. kasseanvendelser — de fleste engangs."`
- **SourceBadge-komponent:**
  ```tsx
  function SourceBadge({ label, href }: { label: string; href: string }) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 border border-zinc-200 rounded-full px-2 py-0.5 hover:border-primary hover:text-primary transition-colors">
        {label} ↗
      </a>
    )
  }
  ```
- **Notes:** Ingen ticker eller animerede tal i hero — kun `motion.div` fade-up

---

### Task [B.2]: Stats-række

- **Layout:** `grid md:grid-cols-3 gap-6` med `Card`-komponenten fra UI-biblioteket
- **3 kort:**
  1. **Flytninger/dag** — `"2.361"` — `"flytninger i Danmark hver dag"` — kilde: DST
  2. **Gns. boligstørrelse** — `"80 m²"` — `"gennemsnitlig bolig for den typiske lejer-flytning"` — kilde: Bolius
  3. **Nye kasser/år** — `"~8 mio."` — `"nye papkasser skal produceres hvert år (est.)"` — lille `*`-note: estimat ved 5× genbrug

---

### Task [C.1]: Problem-narrativ

- **Layout:** To-kolonne `grid md:grid-cols-2 gap-16` (som `Why`-sektionen på forsiden), `bg-zinc-50 rounded-[3rem] mx-4 md:mx-8`
- **Venstre:** Billede — kan genbruge `/images/living-room.png` eller anden relevant
- **Højre:** Tekst med `h2`, punktliste med `CheckIcon`/afkryds-ikoner
- **Indhold (tekst):**
  - Overskrift: `"Over 40 millioner gange hvert år"`
  - Brødtekst om at papkasser er engangsartikler — købt, samlet, brugt én gang, smidt ud
  - 2-3 bullet points: CO₂ ved produktion, affaldsmængde, besværet vs. alternativer

---

### Task [D.1]: BoxCalculator

- **Props:** Ingen (inline state)
- **State:** `const [m2, setM2] = useState<number | ''>(60)`
- **Logic:**
  ```ts
  const boxes = typeof m2 === 'number' ? Math.round(m2 * STATS.kasserPerM2) : 0
  const papboxCost = boxes * 12  // ca. 12 kr pr. papkasse (Bauhaus-pris)
  const papboxWeight = boxes * 0.4  // ca. 400g per papkasse
  ```
- **UI:**
  - Label + `<input type="number" min="10" max="500">` stylet som sidens `<Input>`-komponent
  - Output-sektion: tre stat-pills der opdateres live:
    - `"~X kasser"` 
    - `"~Y kr. i papkasser"` 
    - `"~Z kg pap-affald"` (baseret på ~400g/kasse)
- **Notes:** Ingen server-side logik — ren klient-side beregning. Valider input: vis venlig "Indtast et tal mellem 10 og 500 m²" ved invalid input

---

### Task [E.1]: Metodologi accordion

- **Layout:** Max-width `max-w-3xl mx-auto`, centreret, `py-24 px-6`
- **Overskrift:** `"Hvordan beregner vi dette?"` (medium størrelse, ikke hero-størrelse)
- **Accordion item 1 — Beregningsmetode:**
  Trigger: `"Se beregningen trin for trin"`
  Content: Tabel med 7 rækker (Trin → Variabel → Værdi → Kilde):
  | Trin | Variabel | Værdi | Kilde |
  |---|---|---|---|
  | 1 | Registrerede flytninger/år | 861.718 | DST 2025 |
  | 2 | Husholdningsfaktor (÷ 1,7) | 507.000 fysiske flytninger | Inference |
  | 3 | Gns. boligstørrelse | 80 m² | Bolius 2026 |
  | 4 | Kasser pr. m² | 1 | Tommelfingerregel |
  | 5 | Kasseanvendelser/år | 40.560.000 | Beregnet |
  | 6 | Genbrug pr. kasse | 5 | United Container |
  | 7 | Nye kasser/år (est.) | 8.112.000 | Beregnet |

- **Accordion item 2 — Datakilder:**
  Trigger: `"Datakilder"`
  Content: Tre kilde-rækker med navn, URL og relevans (samme data som research.md tabel)

---

### Task [F.1]: CTA & Footer

- **CTA:** Direkte kopi af `<CTA />`-komponenten fra forsiden (grøn boks, `rounded-[3rem]`)
  - Justeret overskrift: `"Pap er fortid. Lej HeyBox i stedet."`
- **Footer:** Direkte kopi af `<Footer />` fra forsiden

---

## 6. Verification Checklist

- [ ] Siden renderer under `/statestik` uden 404
- [ ] `index.tsx` i `statestik/`-mappen konflikter ikke med `page.tsx` — slet eller tøm den
- [ ] Hero-tal er korrekt formateret: `861.718` (dansk punktumseparator)
- [ ] Lommeregner: opdaterer live ved input-ændring uden page reload
- [ ] Lommeregner: håndterer tomtfelt og ugyldige værdier uden crash
- [ ] Alle kilde-badges åbner korrekt URL i ny fane
- [ ] Accordion åbner/lukker korrekt
- [ ] Mobilresponsivt: hero-tal skalerer ned, stats-grid stacker til 1 kolonne
- [ ] Scroll-animationer aktiveres korrekt (`whileInView`, `once: true`)
- [ ] `<Nav />` logo linker til `/` (ikke `#`)

---

## 7. Comments & Deviations

Note [2026-05-27]: Hero bruger verificeret DST-tal (861.718) som primær stat — ikke et estimeret kassetal. Kasseestimatet fremgår kun som kontekstualiseret suboverskrift. Besluttet på baggrund af bruger-feedback: estimerede tickers undergraver troværdighed.

Note [2026-05-27]: `src/app/statestik/index.tsx` eksisterer og er tom. Next.js App Router ignorerer `index.tsx` — routing sker via `page.tsx`. Filen skal slettes for at undgå forvirring.
