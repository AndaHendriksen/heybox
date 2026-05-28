# Brainstorm: Datadrevet landingsside for papkassespild i Danmark

## Problem Definition
- **User:** En nysgerrig besøgende (potentiel kunde, investor, journalist, eller sustainability-nørd) der støder på siden
- **Goal:** Forstå omfanget af papkassespild ved flytninger i Danmark – og føle sig overbevist af tallene
- **Friction:** Rå statistik er abstrakt og svær at forholde sig til; en klassisk "marketing-side" føles utroværdig; tallene kræver forklaring af metodologi for at virke troværdige
- **Problem Statement:** En besøgende skal forstå problemets skala og føle sig overbevist, men rådata uden kontekst og transparens efterlader dem skeptiske eller uberørte.

## HMW Question
> How might we make the scale of cardboard box waste visceral and credible — through transparent methodology and live data — without losing casual visitors?

---

## Directions Considered
*Alle idéer genereret under diverge, grupperet efter SCAMPER-linse.*

### Substitute
- **S1:** ~~Erstat standard marketing-layout med et akademisk paper-layout~~ → Beholder klassisk marketingside-stil (samme som forsiden), men med tabeller og kildehenvisninger læn nede på siden. Tabeller til at understøtte tallene, ikke erstatte dem.
- **S2:** Erstat statiske tal med et ticker-display som på en fondsbørs — bølgepapkasser smidt ud i dag, denne uge, dette år — live opdateret.

### Combine
- **C1:** Kombiner statistik-side med en lommeregner: besøgende taster deres boligstørrelse (m²) ind og ser øjeblikkeligt "du ville bruge X kasser" + "det svarer til X% af en ny kasse's levetid".
- **C2:** Kombiner med en kildeliste der er klikbar og inline-expanded — ligesom Wikipedia's citation-hover, men designet med terminal-æstetik.

### Adapt
- **A1:** Lån "Jupyter Notebook"-stilen — kodeblokke der viser beregningerne trin for trin, med `output`-felter der viser resultatet. Besøgende kan se præcis hvad vi regnede og hvorfor.
- **A2:** Lån "real-time dashboard"-stilen fra monitoring-tooling (Grafana, Datadog) — grafer, gauges, heatmaps af flytningssæsoner.
- **A3:** Lån fra "Doomsday clock"-æstetik — én stor dramatisk tæller, der ticker opad gennem året.

### Eliminate
- **E1:** Strip ALT andet — én skærm, én animeret tæller: "Nye kasser købt i Danmark siden nytår". Klik for metodologi.
- **E2:** Fjern al prosa — kun tal, formler og kilde-badges. Som en Bloomberg Terminal-skærm.

### Put to other use
- ~~**P1:** Gør siden til et embeddable widget~~ → Fravalgt
- ~~**P2:** Brug siden som investor PDF-rapport~~ → Fravalgt

---

## Direction A: Live "Spildtæller" + fold-ud metodologi
**Selected because:** En real-time tæller gør det abstrakte konkret og følelsesmæssigt. Nervøse tal der stiger i realtid skaber urgency. Metodologi er tilgængelig for den skeptiske, men blokerer ikke den casual besøgende.
**Key risk/assumption:** Tælleren skal føles troværdig — hvis besøgende tvivler på beregningsgrundlaget, undergraver det hele siden. Metodologi-afsnittet skal være gennemsigtigt nok til at modstå kritisk læsning.

### User Journey
1. **Entry Point:** Besøgende lander på siden. Første skærm: et stort, faktabaseret hero-tal — *"861.718 danskere skiftede adresse i 2025"* (verificeret DST-kilde) — med underoverskrift der kontekstualiserer: "Det svarer til ~8 millioner kasseanvendelser." Ingen live ticker på det estimerede tal — kun på det kendte tal.
2. **Scroll/klik:** Under hero: tre sekundære nøgletal (flytninger/dag · gennemsnitlig boligstørrelse · kasser per flytning). En subtil `[Hvordan beregner vi dette? ↓]`-knap.
3. **Expand metodologi:** Et accordion-afsnit folder ud og viser beregningerne step-by-step i et notebook-lignende format med kildehenvisninger `[DST 2025]`, `[Bolius 2026]`, etc.
4. **Goal achieved:** Besøgende forstår problemets skala OG føler sig trygge ved tallenes oprindelse.

### Key UI Components
- **Hero stat** — stort, rent tal i klassisk display-typografi: "861.718 flytninger i 2025" med kilde-badge `[DST ↗]`. Ingen animeret estimat-tæller — kun verificerede tal i hero.
- **Secondary stat row** — tre understøttende nøgletal: flytninger/dag · gennemsnitlig boligstørrelse · estimerede kasseanvendelser/år
- **Expandable Methodology Accordion** — viser beregningstrinnene som "notebook-celler":
  ```
  [1] Flytninger/år        = 861.718   [src: DST 2025]
  [2] Husholdningsfaktor   = ÷ 1.7     [inference]
  [3] Fysiske flytninger   = 507.000
  [4] Gns. boligstørrelse  = 80 m²     [src: Bolius 2026]
  [5] Kasseanvendelser/år  = 40.560.000
  [6] Genbrug per kasse    = ÷ 5       [src: United Container]
  [7] Nye kasser/år        = 8.112.000
  ```
- **Inline source badges** — klikbare chips ved hvert datapunkt: `[DST 2025 ↗]` `[Bolius ↗]`
- **Sensitivity slider** (valgfri): skyder genbrug-antagelsen fra 4→6 og opdaterer tællerestimatet live

### Edge Cases
- Hvad hvis en besøgende loader siden den 1. januar kl. 00:01 — tælleren skal starte fra 0 og akkumulere korrekt
- Hvad hvis brugeren er på mobil — monospace-tæller-tekst skal skalere ned uden at miste dramatisk effekt
- Hvad hvis genbrug-antagelsen ændres i fremtiden — tallene skal komme fra én konfigurerbar konstant, ikke være hardkodet

---

## Direction B: Interaktiv "Calculation Notebook"
**Selected because:** Eksponerer al matematik åbent, ligesom et ingeniør-dokument. Giver brugeren kontrol (input eget boligm²) og bygger troværdighed via transparens. Passer til en "nørd"-æstetik uden at virke som marketing.
**Key risk/assumption:** Denne tilgang kræver at besøgende er villige til at læse og interagere — bounce-rate kan blive høj hos casual visitors. Forudsætter at metodologien faktisk holder til kritisk gennemgang.

### User Journey
1. **Entry Point:** Siden åbner som et "live dokument" — header: `# Papkassespild.dk — v1.0.0 — Beregningsnotat`. Scrollbar, notebook-stil.
2. **Sektion 1 — Datakilde:** En tabel med de rå datakilder, hvert link klikbart og annoteret (`DST 2025 · Opdateret feb 2026 · n=861.718`)
3. **Sektion 2 — Beregning:** Kodebloks-lignende celler der viser regnestykket. Ikke faktisk kode — men designet som pseudo-Python/R-notation for nørde-æstetik.
4. **Sektion 3 — Din flytning:** Et felt: `Indtast din boligstørrelse (m²): [____]` → Output: "Du ville bruge ~X kasser. Det svarer til Y% af en ny kasse's forventede levetid."
5. **Goal achieved:** Brugeren forstår ikke bare tallet, men hvordan det er fremkommet — og kan relatere det til sig selv.

### Key UI Components
- **Document header** med versionsnummer og dato (`Last updated: 2026-05-27`)
- **Data source tabel** med kolonner: Kilde · URL · Datotype · Relevans — klikbare rækker
- **Pseudo-kode beregningsceller** i monospace, dark-mode, med syntax-highlighting på tal vs. labels:
  ```python
  flytninger_per_år = 861_718        # DST, 2025
  husholdningsfaktor = 1.7           # inference fra husstandssnit
  fysiske_flytninger = flytninger_per_år / husholdningsfaktor  # → 507.000
  boligstørrelse_m2 = 80             # Bolius, 2026
  kasser_per_m2 = 1                  # tommelfingerregel
  genbrug_per_kasse = 5              # United Container (optimistisk)
  
  nye_kasser_per_år = (fysiske_flytninger * boligstørrelse_m2 * kasser_per_m2) / genbrug_per_kasse
  # → 8.112.000
  ```
- **Interaktiv lommeregner** — inline input-felt, output opdateres live
- **Footnote-sektion** i bunden med nummererede referencer `[1]–[6]`, ligesom et akademisk paper
- **Sensitivity table** — viser output ved 4, 5 og 6 genbrugscyklusser side om side

### Edge Cases
- Hvad hvis bruger taster 0 eller et negativt tal i m²-feltet — input-validering med venlig fejl
- Hvad hvis en kilde-URL er død (link rot) — brug archived-versioner og noter dato for adgang
- Hvad hvis siden bruges i 2027 og tallene er forældet — vis tydeligt "Sidst verificeret: 2026-05-27" og en "Foreslå opdatering"-knap

---

## Recommendation
**Recommended direction: A (Live "Spildtæller" + fold-ud metodologi)**

**Why:** En real-time tæller kræver ingen læsevillighed — den virker på alle besøgende i sekundet. Metodologi-accordionen tilfredsstiller den skeptiske/nørde bruger uden at blokere den casual. Direction B er mere transparent men forudsætter motivation til at læse — det er bedre som et sekundært "Læs mere"-link end som primær entry point.

**Key assumption to validate:** At besøgende stoler på tæller-estimatet nok til at dele siden, uden at have læst metodologien. Test: viser de to versioner A og B i en A/B-test og mål scroll-depth og shares.

---

## Implementation Notes (stil-guide)

Siden skal matche sidens eksisterende design-sprog — klassisk marketingside, ikke et teknisk dokument. Data og referencer må gerne fremgå, men som understøttende elementer — ikke som det primære udtryk.

| Element | Stil |
|---|---|
| Font | Sidens eksisterende typografi. Monospace kun til tal i beregnings-accordion |
| Farveskema | Følger eksisterende brand-farver. Tabeller og kilde-badges diskret, ikke dominerende |
| Kildehenvisninger | Lille kilde-badge ved hvert tal: `[DST 2025 ↗]` — klikbart, åbner ny fane. Ikke inline `[1]`-notation |
| Animationer | Ingen ticker på estimerede tal. Statiske tal er troværdige; tickers på usikre estimater er ikke. |
| Layout | Klassisk sektionsopbygning: hero → nøgletal → kontekst/forklaring → tabeller (langt nede) |
| Tabeller | Tilladt men sekundære — placeres under fold, til den nysgerrige bruger der vil grave dybere |
