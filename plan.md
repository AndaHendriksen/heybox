# Plan: Pivot hjemmeside fra plastkasser → robuste papkasser

> **Status:** ✅ Implementeret (Phase B + C + D) — type-check + lint rene | **Last Updated:** 2026-06-08
> **Scope:** Tekstændringer på hele sitet + ombygning af booking-flowets sidste step

---

## 1. Context & Objectives

**Goal:** Hele hjemmesidens budskab skifter fra "vi udlejer robuste **plast**kasser (samme pris som pap)" til "vi udlejer **robuste/professionelle flyttekasser** der er stærkere og holder længere end de tynde kasser fra byggemarkedet." Strukturen, sektionsrækkefølgen og designet bevares 1:1.

**Constraints:**
- Behold sektionsstruktur og rækkefølge på alle sider.
- Ingen nye dependencies.
- Brug **Edit-værktøjet** til alle tekstændringer (PowerShell ødelægger UTF-8/æøå) — se [[feedback_file_editing]].
- **Terminologi *(brugerbeslutning)*:** Skriv "**flyttekasser**" eller "**professionelle flyttekasser**" — IKKE "papflyttekasser"/"plastkasser". Danskere siger bare "flyttekasser", og stort set alle flyttekasser er af pap, så vi behøver ikke fremhæve "pap". Ordet "pap" bruges **kun** hvor vi bevidst kontrasterer tykkelse mod byggemarkedets tynde kasser (B.3-brødtekst, B.5).
- **Billeder + alt-tekster *(brugerbeslutning)*:** Brugeren skifter selv billeder OG alt-tekster → **rør ikke ved `alt=`-attributter eller billedfiler.**

**Afklarede strategiske valg:**
1. **Prisanker (D-1) = (c):** Behold pris-badget ("fra 13,95 kr/kasse"), men hook'et/argumentet er **convenience** (vi leverer, henter, alt inkluderet), ikke pris-sammenligning med pap. Fjern alle "samme pris som papkasser i byggemarkedet"-formuleringer.
2. **Miljønarrativ (D-2) = godkendt:** "Fjenden" omdefineres fra *pap generelt* → *tyndt engangs-pap fra byggemarkedet*. Vores professionelle flyttekasser er den holdbare/genbrugbare løsning.

---

## 2. Technical Research & State

Sitet er statisk-tekstet (ingen CMS) — al copy ligger hårdkodet i komponenter/pages/`src/lib`.

- **Affected Files (copy):**
  - `src/app/(site)/page.tsx`: Forsiden — Hero, NoDriving, BoxQuality, NoCleanup, CardboardReuse. **Flest ændringer.**
  - `src/app/(site)/om-os/page.tsx`: Decision-sektion ("Robuste plastkasser").
  - `src/lib/seo.ts`: FAQ-tekst + HowTo-beskrivelse. **Driver både JSON-LD og synlig FAQ.**
  - `src/app/layout.tsx`: Global meta/OG/Twitter.
  - `src/components/sections/footer.tsx`: Slogan.
  - `src/app/booking/page.tsx`: Booking-metadata.
  - `seo.md`: intern reference-doc (lav prioritet).

- **Affected Files (booking-flow, Phase D):**
  - `src/components/booking/steps/StepApology.tsx`: **Fjernes helt.**
  - `src/components/booking/BookingWizard.tsx`, `BottomBar.tsx`, `steps/StepSummary.tsx`: Summary bliver sidste step; terms+submit flyttes ind; BottomBar skjules på sidste step.
  - `src/lib/email/booking-confirmation.ts`: `carryingLabel`-kommentar/logik (afhænger af bæring-spørgsmålet).
  - `src/lib/stats.ts`: kun kommentar-framing (`genbrugPerKasse=5` **bevares**).

- **Existing Logic at undgå at bryde:**
  - `seo.ts FAQ_ITEMS` driver **både** `faqJsonLd()` og den synlige `<Faq/>` → ret ét sted, begge opdateres.
  - `StepApology` kalder `createBooking` + `track('Purchase')` + redirect + terms-checkbox. **Al denne submit-logik flyttes uændret ind i `StepSummary`** — slet ikke logikken sammen med teksten.
  - `BookingWizard`: 7 steps (Summary=6, Apology=7), `TOTAL_STEPS=5`. BottomBar vises `step <= 6`. Efter ombygning: Summary=sidste step, BottomBar skjules på det (`step <= 5`), Purchase fyrer fra Summary. Analytics `AddPaymentInfo`/`ViewSummary` i `emitStepEvent` bevares.

---

## 3. User Journey & Flow

- [ ] **Forside:** Hero → "Vi fjerner bøvlet" → Ingen tur til byggemarked → Stærkere end pap → Ingen oprydning → 3 trin → Miljø/affald → FAQ → CTA. *(Samme rækkefølge, ny copy.)*
- [ ] **Om os:** uændret rækkefølge, ny copy i Decision.
- [ ] **Booking-flow:** Addresses → BoxCount → Date → Addons → Contact → **Summary (sidste step: terms-checkbox + bekræft-knap inline + MobilePay-note, ingen BottomBar)** → Confirmation. *(StepApology fjernet.)*

---

## 4. Implementation Roadmap

### Phase B: Forsiden (`src/app/(site)/page.tsx`) — KLAR
- [ ] **B.1:** Hero-lead (convenience-hook, "professionelle flyttekasser"). *(Alt-tekst + badge urørt.)*
- [ ] **B.2:** NoDriving (convenience, drop pris-sammenligning).
- [ ] **B.3:** BoxQuality (ny titel + brødtekst m. tapeløst foldelåg).
- [ ] **B.4:** NoCleanup.
- [ ] **B.5:** CardboardReuse (titel "Tyndt pap holder ikke længe", "2-3 flytninger", "plastkasser"→"vores kasser").

### Phase C: Øvrige sider & SEO — KLAR
- [ ] **C.1:** `seo.ts` — FAQ-item + pris-FAQ + HowTo-desc.
- [ ] **C.2:** `layout.tsx` — meta/OG/Twitter.
- [ ] **C.3:** `om-os/page.tsx` — Decision.
- [ ] **C.4:** `footer.tsx` — slogan.
- [ ] **C.5:** `booking/page.tsx` — metadata.
- [ ] **C.6:** `stats.ts` kommentar-framing + `seo.md`.

### Phase D: Booking-flow — bæring = BETALT (Mulighed B, brugervalgt)
- [ ] **D.1:** Drop `StepApology`; flyt terms+submit+MobilePay ind i `StepSummary` (sidste step); skjul BottomBar på sidste step; back-knap inline.
- [ ] **D.2:** `actions/booking.ts`: `calcTotalWithoutAddons` → **`calcTotal`** (bæring opkræves nu) i DB-total, mail-total og CAPI-value. Browser-`Purchase` i StepSummary bruger også `calcTotal`.
- [ ] **D.3:** `booking-confirmation.ts`: `carryingLabel` afspejler `addCarrying` (ikke længere hardcoded gratis); sørg for at valgte tilvalg vises.
- [ ] **D.4:** **Udkommentér rengøring** (man kan ikke rengøre pap) i `StepAddons`, `StepSummary` og `booking-confirmation.ts` — men **bevar al kode/funktionalitet** (state-felt, calc-logik, DB) så det kan genaktiveres når plastikkasser kommer.

---

## 5. Technical Specifications — endelig copy

### Task [B.1]: Hero — `src/app/(site)/page.tsx`
- **L70–73 (lead):** "Robuste plastkasser til samme pris som papkasser i byggemarkedet. Vi leverer og henter dem igen…" → **"Professionelle flyttekasser der er langt stærkere end de tynde fra byggemarkedet. Vi leverer dem til din dør og henter dem igen, når du er færdig — alt sammen inkluderet, så du slipper for turen og slæbet."**
- **L62 (badge):** behold "Lej fra 13.95 kr/kasse". **L69 (H1):** behold. **L59 (alt):** urørt (bruger).

### Task [B.2]: NoDriving — `src/app/(site)/page.tsx`
- **L100–101:** "Drop køen i byggemarkedet. Vores kasser koster det samme som papkasser, men vi leverer dem direkte til din dør…" → **"Drop køen i byggemarkedet og slæbet med fladpakkede kasser. Vi leverer professionelle flyttekasser direkte til din dør og henter dem igen, så du kan bruge tiden på det der betyder noget."**

### Task [B.3]: BoxQuality — `src/app/(site)/page.tsx`
- **L115 (titel):** "Stærkere og nemmere end pap" → **"Stærkere og nemmere end almindelige flyttekasser"** *(bevarer "stærkere og nemmere"-strukturen, fjerner pap-vs-pap-problemet)*.
- **L116 (brødtekst):** "Ingen kasser der skal samles med tape. Ingen bunde der falder ud. Vores kasser er robuste, stables perfekt og lukkes med et enkelt klik." → **"Vores kasser er lavet i ekstra tykt pap — meget kraftigere end de tynde kasser fra byggemarkedet. Bundene falder ikke ud, de stables sikkert, og det tapeløse foldelåg lukker uden en eneste rulle tape."**
- **Notes:** Tapeløst foldelåg bekræftet af bruger → "nemmere"/"uden tape" er sande claims.

### Task [B.4]: NoCleanup — `src/app/(site)/page.tsx`
- **L132:** "Med papkasser sidder du tilbage med et bjerg af affald når flytningen er overstået. Vi sørger for at hente kasserne…" → **"Køber du billige flyttekasser, sidder du tilbage med et bjerg af pap når flytningen er overstået. Vores kasser henter vi igen, så du bare kan slappe af og nyde dit nye sted."**

### Task [B.5]: CardboardReuse — `src/app/(site)/page.tsx`
- **L204 (titel):** "Papkasser genbruges sjældent" → **"Tyndt pap holder ikke længe"**.
- **L205–208 (brødtekst):** → **"Tynde flyttekasser fra byggemarkedet tåler typisk kun 2-3 flytninger, og fugt eller dårlig opbevaring forkorter ofte levetiden. Derfor ender millioner af kasser som affald hvert år."** / **"Vores kasser er lavet i ekstra kraftigt pap, der holder langt flere flytninger — samme kasser, mange flytninger, mindre affald."**
- **Notes:** `genbrugPerKasse=5` i `stats.ts` **bevares** (konservativt ift. affaldsberegningen) jf. bruger. Forsidens "2-3 flytninger" (tyndt byggemarkeds-pap) og statistikkens "5 genbrug pr. kasse" (landsgennemsnit) er bevidst forskellige tal. **L201 (alt):** urørt (bruger).

### Task [C.1]: SEO — `src/lib/seo.ts`
- **L53–54 (FAQ):** Q "Hvorfor er plastkasser bedre end papkasser?" → **Q: "Hvorfor er jeres flyttekasser bedre end dem fra byggemarkedet?"** A → **"Vores flyttekasser er lavet i ekstra kraftigt pap, så de er langt stærkere og holder mange flere flytninger end de tynde kasser fra byggemarkedet. Vi leverer og henter dem igen, så du slipper for slæbet og for papaffaldet bagefter."**
- **L34 (pris-FAQ):** "Du betaler stort set samme pris som for papkasser i byggemarkedet - men slipper for turen, slæbet og affaldet bagefter." → **"Levering og afhentning er altid inkluderet, så du slipper for turen til byggemarkedet, slæbet og affaldet bagefter."** *(convenience-hook)*
- **L99–100 (HowTo desc):** "robuste plastflyttekasser" → **"professionelle flyttekasser"**.

### Task [C.2]: Global meta — `src/app/layout.tsx`
- **L26 / L35 / L49:** "Lej stærke flyttekasser til samme pris som pap. Levering og afhentning i Storkøbenhavn er inkluderet…" → **"Lej professionelle flyttekasser. Levering og afhentning i Storkøbenhavn er inkluderet — ingen bil og ingen oprydning bagefter. Beregn din pris online."** (kortere variant til OG/Twitter uden sidste sætning).

### Task [C.3]: Om os — `src/app/(site)/om-os/page.tsx`
- **L169 (Decision):** "Robuste plastkasser, der kan bruges igen og igen, til præcis samme pris som papkasser i byggemarkedet. Vi leverer når du skal bruge dem og henter dem igen, når du er på plads." → **"Robuste, professionelle flyttekasser, der kan bruges igen og igen. Vi leverer når du skal bruge dem og henter dem igen, når du er på plads."**
- **Mission/vision (papaffald-narrativ):** behold — passer med D-2. **L165 (alt):** urørt (bruger).

### Task [C.4]: Footer — `src/components/sections/footer.tsx`
- **L16:** "Lej robuste flyttekasser til samme pris som pap. Vi leverer til din dør og henter igen. Altid gratis." → **"Lej robuste flyttekasser. Vi leverer til din dør og henter igen. Altid gratis."** *(bruger: "robuste flyttekasser" er fint)*

### Task [C.5]: Booking-metadata — `src/app/booking/page.tsx`
- **L9–15:** "robuste flyttekasser" → **"professionelle flyttekasser"** (ellers neutral; ingen "plast"/"pap").

### Task [C.6]: stats.ts + seo.md
- `stats.ts`: behold tal, opdater evt. kommentarer så de matcher narrativet. `seo.md`: opdater plast-referencer til ny terminologi.

### Task [D.1]: Drop StepApology → flyt afslutning ind i StepSummary
1. **`StepSummary.tsx`** overtager fra StepApology: `termsAccepted`-state + terms-checkbox (link `/handelsbetingelser`), inline submit-knap nederst ("Bekræft og betal"), submit-logik uændret (`createBooking` → `track('Purchase', …, eventId)` → redirect; fejl → `bookingError`; `useTransition`/`isPending`), synlig MobilePay-note. Props udvides.
2. **`BookingWizard.tsx`:** fjern `StepApology`-import + `{step===7}`. Summary=sidste step; `bottomNavProps` case 6/7 fjernes. Skjul BottomBar: `{step <= 6 …}` → `{step <= 5 …}`. Bevar `AddPaymentInfo`/`ViewSummary`-events.
3. **Back-navigation:** inline "← Tilbage"-knap i `StepSummary` (BottomBar-back forsvinder). *(Jeg vælger placering — nederst ved knappen.)*
4. **`booking-confirmation.ts`:** opdater "jf. StepApology"-kommentar; `carryingLabel` jf. bæring-svar.
> **Afhænger af bæring-spørgsmålet nedenfor** (bestemmer om StepSummary viser bæring som gratis eller betalt).

---

## 6. Verification Checklist
- [ ] Grep: `plast`/`plastik`/`plastkasse` = **0** brugervendte hits efter ændringer.
- [ ] Ingen sætning siger længere "samme pris som pap" (D-1).
- [ ] Ingen `alt=`/billedfiler ændret (bruger klarer dem).
- [ ] JSON-LD (FAQ + HowTo) afspejler ny tekst.
- [ ] Booking gennemføres end-to-end fra StepSummary: terms blokerer, `createBooking`+`Purchase`+redirect virker, MobilePay synlig, back muligt uden BottomBar.
- [ ] Mobil + desktop: ingen tekst-overflow (Hero-lead, BoxQuality).
- [ ] Æøå korrekt (Edit, ikke PowerShell).

## 7. Comments & Deviations

Note [2026-06-08]: Alle brugerkommentarer indarbejdet. Terminologi låst til "flyttekasser"/"professionelle flyttekasser" (ikke "papflyttekasser"). D-1=(c) convenience, D-2 godkendt, D-4 = bruger klarer billeder+alt-tekster. Stats `genbrugPerKasse=5` bevares; B.5-copy bruger bevidst "2-3 flytninger" for byggemarkeds-pap.

**Bæring (afklaret): Mulighed B — betalt tilvalg.** Den gratis bæring var en kompensation for manglende plastkasser; nu tilbyder vi bare papkasser, så bæring bliver et normalt betalt tilvalg (som `StepAddons` allerede er bygget til). Derfor:
- `actions/booking.ts` skifter fra `calcTotalWithoutAddons` → `calcTotal`, så bæring faktisk opkræves (i DB, mail og Meta CAPI). Tidligere blev add-ons givet gratis i hele apology-flowet.
- Bekræftelsesmailen skal vise de valgte tilvalg korrekt (bæring efter `addCarrying`).

**Rengøring (brugerbeslutning): udkommenteres.** Papkasser kan ikke rengøres, så rengørings-tilvalget skjules i UI (`StepAddons`, `StepSummary`) og i mailen. **Al kode bevares** (BookingState.addCleaning, calc-logik, DB-kolonne, mail-label) som udkommenterede blokke, så det kan genaktiveres når plastikkasser kommer.
