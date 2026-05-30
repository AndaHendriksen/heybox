# Plan: Papkasseforbrug i Danmark – statistik-sektion på forsiden

> **Status:** 🟡 In Progress | **Last Updated:** 2026-05-29
> **Scope:** `src/app/page.tsx` (statisk indhold på landing page)

---

## 1. Context & Objectives

**Goal:** Tilføj en gruppe af nye, rent informative sektioner til forsiden – placeret **direkte efter `NoCleanup`** – der formidler omfanget af papkasseforbrug og -spild ved flytninger i Danmark. Formålet er at understøtte HeyBox' miljøbudskab (genbrugbare plastkasser vs. engangspap) med troværdig statistik fra `research.md`.

**Constraints:**
- **KUN statistik og info** – ingen interaktive elementer, ingen beregner, ingen sammenligning med brugerens eget forbrug.
- Skal bruge eksisterende design-konventioner: `Section`-wrapper, `Card` (`@/components/ui/card`), Tailwind, `bg-olive-100` baggrund, `primary`-grøn (`#3DB98B`).
- Dansk sprog, samme tone som resten af siden.
- Typografi følger eksisterende skala: overskrifter `text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight`, brødtekst `text-lg md:text-xl text-black/50`.
- Ingen nye npm-afhængigheder. Kildehenvisninger må gerne vises for troværdighed (link til DST m.fl.).
- **VIGTIGT:** Dette er en modificeret Next.js-version (jf. `AGENTS.md`). Læs `node_modules/next/dist/docs/` før kodning – men denne ændring er ren client-side JSX i en eksisterende `'use client'`-fil, så risikoen er lav.

---

## 2. Technical Research & State

- **Affected Files:**
  - `src/app/page.tsx`: Eneste fil der ændres. Ny(e) sektion(er) tilføjes i `Landing()`-træet efter `<NoCleanup />` og før `<CTA />`. Nye sektions-komponenter defineres længere nede i filen (samme mønster som `NoDriving`, `BoxQuality` osv.).
  - `src/components/ui/card.tsx`: Genbruges som-is (`Card` = `rounded-lg bg-white` + className).
  - `research.md`: Kilde til alle tal og kildehenvisninger.

- **Existing Logic:**
  - `Landing()` renderer en flad liste af sektions-komponenter i en fast rækkefølge (linje 9-22).
  - `Section({ children, className })` (linje 227-235) er en genbrugelig wrapper: `px-4 mb-1` + indre `max-w-[1300px] mx-auto`. Alle indholdssektioner bruger den.
  - Sektioner veksler typisk mellem `Card`-baseret 2-kolonne layout (tekst + 3D-ikon) og fuld-bredde grids (`HowItWorks`).
  - Farver: baggrund `bg-olive-100`, brand-grøn via `primary`/`bg-primary`/`text-primary` (`#3DB98B`).

- **New Components/Hooks:**
  - `CardboardIntro()` – tekstlig overgang: "Pap er dyrt for klimaet".
  - `CardboardStats()` – stat-band med 4 nøgletal i `Card`-bokse.
  - `Stat({ value, label, source })` – lille intern præsentations-komponent for ét nøgletal (DRY for stat-bandet).
  - `CardboardReuse()` – infoboks om papkassers begrænsede levetid (2-6 genbrug).
  - `CardboardSources()` – diskret kildeliste nederst for troværdighed.
  - (Alt er rene præsentationskomponenter – ingen state, ingen hooks, ingen props udefra bortset fra `Stat`.)

---

## 3. User Journey & Flow

*Ren scroll-oplevelse – ingen interaktion.*

- [ ] **Step 1:** Bruger scroller forbi `NoCleanup` ("Intet oprydningsarbejde bagefter").
    - [ ] 1.1 Møder `CardboardIntro` – kort, slagkraftig overskrift der rammer "papproblemet" i Danmark.
- [ ] **Step 2:** Bruger ser `CardboardStats` – store tal der visuelt formidler skalaen (40 mio. kasser, 7-10 mio. nye/år).
    - [ ] 2.1 Hvert tal har en kort label og en kildeangivelse i småtekst.
- [ ] **Step 3:** Bruger ser `CardboardReuse` – forklaring på hvorfor pap er spild (kort levetid, 2-6 genbrug).
- [ ] **Step 4:** Bruger ser `CardboardSources` – kildeliste (DST, Bolius, KL m.fl.) som underbygger troværdigheden.
- [ ] **Step 5:** Bruger fortsætter til eksisterende `CTA`.

---

## 4. Implementation Roadmap (The To-Do)

### Phase A: Indhold & datagrundlag
- [ ] **A.1:** Udvælg og lås de endelige tal + labels fra `research.md` (se §5 for konkrete værdier).
- [ ] **A.2:** Beslut kildehenvisningernes format (kort navngivning + link).

### Phase B: Komponenter & integration
- [ ] **B.1:** Implementér `Stat`-hjælpekomponent.
- [ ] **B.2:** Implementér `CardboardIntro`.
- [ ] **B.3:** Implementér `CardboardStats` (bruger `Stat`).
- [ ] **B.4:** Implementér `CardboardReuse`.
- [ ] **B.5:** Implementér `CardboardSources`.
- [ ] **B.6:** Indsæt sektionerne i `Landing()` efter `<NoCleanup />`.

---

## 5. Technical Specifications (To-Do Details)

### Udvalgte nøgletal (fra `research.md`)
Brug **afrundede, kommunikerbare tal** og marker estimater ærligt:

| Tal | Label | Kilde |
|---|---|---|
| **861.000** | adresseflytninger i Danmark hvert år | DST 2025 |
| **~40 mio.** | flyttekasser bruges årligt ved flytninger | Estimat (DST + Bolius/KL) |
| **7-10 mio.** | nye papkasser købes – og smides ud – hvert år | Estimat (4-6 genbrug) |
| **2-6 gange** | kan en papkasse typisk genbruges, før den kasseres | United Container |

> Vær eksplicit om at de to midterste tal er **estimater**, fx via ordet "ca." eller en lille note. Dette beskytter troværdigheden (jf. usikkerheder i `research.md` §5).

### Task [B.1]: `Stat` hjælpekomponent
- **Input/Props:** `{ value: string; label: string; source?: string }`
- **Logic:**
  - Render en `Card` med centreret indhold (`p-6 lg:p-8 text-center`).
  - `value` i stor, fed `primary`-grøn typografi (fx `text-4xl md:text-5xl lg:text-6xl font-bold text-primary`).
  - `label` i `text-black/60` brødtekst.
  - `source` (valgfri) i `text-xs text-black/30 mt-2`.
- **Code Reference:** Genbrug `Card`-stil fra `HowItWorks`-kortene (linje 175-194).

### Task [B.2]: `CardboardIntro`
- **Logic:**
  - Wrap i `Section`.
  - Overskrift, fx: **"Danmark drukner i flyttepap"** eller **"Pap koster mere end du tror"**.
  - 1-2 linjers brødtekst der sætter scenen (fx: "Hver gang nogen flytter, ender bunkevis af papkasser som engangsaffald. På landsplan løber det hurtigt op.").
  - Centreret tekst, samme typografi-skala som øvrige sektioner.

### Task [B.3]: `CardboardStats`
- **Logic:**
  - `Section`-wrapper.
  - `grid md:grid-cols-2 lg:grid-cols-4 gap-1` (følg `gap-1`-mønster fra `HowItWorks`).
  - 4 × `Stat` med tallene fra tabellen ovenfor.
- **Notes:** På mobil stables kortene; sikr læsbar `value`-størrelse uden overflow på lange tal som "7-10 mio.".

### Task [B.4]: `CardboardReuse`
- **Logic:**
  - `Section` + `Card` i 2-kolonne layout (tekst + evt. eksisterende 3D-ikon, fx `/images/3d-icon-trashedbox.png` – eller helt uden billede for variation, da NoCleanup allerede bruger det ikon).
  - Overskrift, fx: **"En papkasse holder ikke længe"**.
  - Brødtekst om at standard flyttekasser kun tåler 2-6 genbrug, og at fugt/dårlig opbevaring ofte gør levetiden kortere – modsat HeyBox' plastkasser der genbruges igen og igen.
- **Notes:** Hold det informativt, ikke en CTA-mur. Ingen "Beregn din pris"-knap her (det bryder den rolige info-flow og findes rigeligt andre steder).

### Task [B.5]: `CardboardSources`
- **Logic:**
  - Lille, diskret `Section`.
  - Tekst: "Kilder:" efterfulgt af inline-links til de primære kilder.
  - Links (fra `research.md` §2):
    - Danmarks Statistik – Flytninger: `https://www.dst.dk/da/Statistik/emner/borgere/flytninger/flytninger-i-danmark`
    - Bolius – Boligstørrelser: `https://www.bolius.dk/hvor-stort-er-et-gennemsnitligt-hus-og-lejlighed-i-danmark-36883`
    - KL – Boligstørrelse pr. ejer/lejer: `https://www.kl.dk/analyser/analyser/demografi-og-befolkning/udviklingen-i-den-gennemsnitlige-boligstoerrelse`
    - United Container – Kasselevetid: `https://unitedcontainer.com/how-many-times-can-cardboard-boxes-be-used-before-recycling`
  - Styling: `text-xs text-black/40`, links med `hover:text-primary`, `target="_blank" rel="noopener noreferrer"`.
- **Notes:** Tilføj kort note om at flyttetal er per person (DST) og at kasse-tal er estimater – matcher ærligheds-kravet.

### Task [B.6]: Integration i `Landing()`
- **Logic:** Indsæt i rækkefølge mellem `<NoCleanup />` og `<CTA />`:
  ```
  <NoCleanup />
  <CardboardIntro />
  <CardboardStats />
  <CardboardReuse />
  <CardboardSources />
  <CTA />
  ```

---

## 6. Verification Checklist
- [ ] **Manuel check:** Sektionerne vises i korrekt rækkefølge efter "Intet oprydningsarbejde bagefter".
- [ ] **Responsivitet:** Stat-grid stables pænt på mobil; lange tal ("7-10 mio.") overflow'er ikke.
- [ ] **Ingen interaktion:** Bekræft at der ikke er tilføjet beregner/sammenligning/inputs – kun tekst, tal og kilde-links.
- [ ] **Troværdighed:** Alle estimater er markeret som "ca."/estimat; kilde-links virker og åbner i ny fane.
- [ ] **Design-konsistens:** Farver, typografi og `Section`/`Card`-mønster matcher resten af siden.
- [ ] **Build:** `next build`/dev kører uden type- eller lint-fejl.

## 7. Comments & Deviations

Note [2026-05-29]: Valgte at vise tal som afrundede, "kommunikerbare" værdier (40 mio., 7-10 mio.) frem for præcise tal fra beregningen, da `research.md` selv understreger at de er estimater med betydelig usikkerhed. Kildeliste tilføjet som selvstændig sektion for at adskille "påstand" fra "dokumentation".

Note [2026-05-29]: Bevidst fravalgt en CTA-knap inde i papkasse-sektionerne for at holde dem rent informative (jf. brugerens krav om "bare statistik og info"). Den eksisterende `CTA`-sektion lige efter dækker konverteringsbehovet.
