# Brainstorm: Booking Flow — Leje af flyttekasser

## Problem Definition
- **User:** En person der skal flytte inden for Storkøbenhavn og har brug for midlertidig leje af kasserne til at pakke, transportere og pakke ud.
- **Goal:** Booke de rigtige kasser til sin flytning hurtigt og uden forvirring — med levering den rette weekend.
- **Friction:** Der er mange valg (adresser, datoer, pakker, tilkøb, kontaktinfo) og brugeren mister overblikket eller stopper halvvejs hvis det føles som én lang formular.
- **Problem Statement:** Den person der skal flytte behøver at bestille kasser til sin flytning, men for mange valg på én gang gør at flowet føles overvældende og svært at gennemskue.

---

## HMW Question
> How might we gøre det så enkelt at booke flyttekasser at brugeren altid ved hvad der sker, hvad det koster og hvad næste trin er?

---

## Directions Considered
*Alle ideer genereret under diverge, grupperet efter SCAMPER lens.*

- **Substitute — Weekend-only kalender:** Erstat en standard datepicker med en kalender der visuelt kun kan klikkes på lørdage/søndage. Hverdage er nedtonede og ikke-klikbare — ingen forklaring nødvendig.
- **Substitute — Adressevalidering via map-preview:** Erstat ren tekstindtastning med autocomplete + lille kort der bekræfter "Ja, denne adresse er i Storkøbenhavn" live, før brugeren trykker næste.
<!-- Der behøver ikke at være noget lille kort -->
- **Combine — Pakkevalg + prisberegner i ét:** Kombiner "Vælg pakke" med en real-time prisboks der opdateres i bunden mens brugeren vælger — så prisen aldrig er en overraskelse.
- **Combine — Tilkøb som del af opsummeringen:** Kombiner tilkøbs-skærmen med opsummeringen, så brugeren ser hvad de allerede har valgt og tilføjer ekstra oven på det, frem for en isoleret "extras"-side.
- **Adapt — Pizza-bestillingens progressionsmodel:** Lån fra Dominos/Just Eat: tydelig step-indikator øverst, "Tilføj til kurv"-knap i bunden der altid viser løbende pris, og en sammenfatning inden betaling.
- **Adapt — Airbnb-tjek ud af renter:** Adapter Airbnbs "hvornår og hvem"-sekvens: adresser + dato tidligt, detaljer (pakker, tilkøb) bagefter, personinfo til sidst. Prisen vises i en sticky boks undervejs.
- **Eliminate — Personinfo sidst:** Fjern navn/email/tlf fra starten. Brugeren er kommitted til købet FØR de skal give persondata — reducerer drop-off markant.
- **Eliminate — Standard uger er pre-valgt:** Fjern beslutningen om uger fra den primære flow; 2 uger er default og synlig. Tilkøb af ekstra uger er en lille "+"-knap — ikke et selvstændigt trin.
- **Put to other use — Flowet som tillids-signal:** Brug hvert "næste"-trin til at vise en kort social proof-linje ("Over 400 familier i KBH har lejet hos os") — flowet er ikke bare booking, det er også overbevisning.
<!-- Det har jeg ikke noget data på endnu, så drop dette -->
- **Put to other use — Opsummerings-skærmen som delings-URL:** Den færdige booking kan deles som link til partner/ægtefælle der skal godkende — flow tjener to brugere, ikke én.
<!-- Virkelig god idé men ikke vigtigt på nuværende tidspunkt -->

---

## Direction A: Den Lineære Guide ("Én ting ad gangen")

**Selected because:** Matcher præcis det ønskede "super simpelt og overskueligt" krav. Én beslutning pr. screen eliminerer kognitiv belastning. Brugeren kan aldrig være i tvivl om hvad de skal gøre nu.

**Key risk/assumption:** At brugere ikke frustreres af mange klik/screens — risikerer at føles langsomt på desktop. Forudsætter at mobilbrugere er primær målgruppe, hvor én ting pr. screen er naturligt.

**Distinct from Direction B:** Her er der ingen synlig pris eller opsummering undervejs — fuld fokus på ét valg ad gangen. Prisen afsløres kun på det dedikerede opsummeringstrin.

### User Journey
1. **Entry Point:** Landingpage → stor CTA "Book dine kasser" → Step 1 indlæses (progress: 1/5)
2. **Step 1 – Fra/Til adresser:** To adressefelter med autocomplete. Grønt flueben + "Levering mulig" vises når begge er i Storkøbenhavn. Rødt ikon + "Vi leverer ikke her endnu" hvis udenfor. → Næste
3. **Step 2 – Vælg afleveringsdag:** Kalender kun med weekender klikbare. Default = næste lørdag fremhævet. Lille tekst: "Standard leje: 2 uger. Afhentning sker 2 uger senere." → Næste
4. **Step 3 – Vælg pakke:** Tre kort (Lille / Mellem / Stor) med ikon, antal kasser og basispris. Tap på et kort markerer det. → Næste
5. **Step 4 – Tilkøb:** To toggle-rækker. "Rengøring af kasser +79 kr" (default: slået fra, label: "Vi rengør selv"). "Båret ind/op +79 kr" (default: slået fra). Simpelt og binært. → Næste
6. **Step 5 – Dine oplysninger:** Navn, email, telefon. Ingen unødvendige felter. → Se opsummering
7. **Opsummering:** Alt vises samlet. Total pris i fed. "Bekræft booking"-knap → Success-screen med ordrenummer + email-bekræftelse.
Det mangler en sidste ting - vi har ikke nogle kasser endnu. Derfor skal success screen være en "Undskyld" screen hvor vi tilbyder at komme med papkasser til samme pris (evt. minus 100kr)

### Key UI Components
- Step-progress-bar øverst (1 af 5 / 2 af 5...)
- Adresse-autocomplete med inline Storkøbenhavn-validering
<!-- Skal vi gøre brugeren opmærksom på at det kun er storkøbenhavn? -->
- Weekend-only kalender (hverdage er visuelt disabled, ikke skjult)
<!-- Også her burde der måske være en "Vi leverer kun i weekenden" -->
- Pakke-valgkort med ikon, beskrivelse og pris
- Toggle-rækker til tilkøb (ikke checkboxes — større touch-target)
- Read-only opsummerings-kort inden bekræftelse
- Sticky "Næste"-knap i bunden der altid er synlig

### Edge Cases
- Hvad hvis brugeren indtaster en adresse der er på grænsen (f.eks. Dragør eller Albertslund)? → Validering skal have en præcis Storkøbenhavn-definition. Vis en "Kontakt os"-link frem for en hård fejl.
- Hvad hvis brugeren vil have flere uger end standard? → "Vil du leje længere? +X kr/uge per kasse" vises som et subtilt tilkøb på pakke-skærmen — ikke et separat trin.
- Hvad hvis brugeren går tilbage og ændrer pakken? → Progress gemmes. Tilkøb og personinfo bibeholdes. Prisen opdateres på opsummeringen.

---

## Direction B: Den Smarte Kurv ("Se totalen vokse")

**Selected because:** Giver brugere der er prisbevidste fuld kontrol og transparens. Flowet minder om e-commerce-booking de kender — kurv, real-time pris, tillid via "ingen skjulte gebyrer"-signal.

**Key risk/assumption:** At brugere er motiverede nok til at tilpasse og sammenligne — forudsætter at de allerede er ret sikre på at de vil bestille (lavere konvertering for "bare-kigger"-segment).

**Distinct from Direction A:** Her er en persistent prisoversigt synlig på siden/bunden hele vejen igennem. Brugeren kan se hvad ting koster mens de vælger.

### User Journey
1. **Entry Point:** Landingpage → "Beregn din pris" CTA → Booking-siden åbner med tom kurv til højre (desktop) / collapsible prisboks i bunden (mobil)
2. **Trin 1 – Adresser:** Fra/Til adressefelter med autocomplete og Storkøbenhavn-check. Kurven viser "Levering: KBH ✓"
3. **Trin 2 – Dato + varighed:** Weekend-kalender. Under datoen: "2 uger inkluderet. Tilføj ekstra uger: [ – ] 2 [ + ]". Kurv opdateres live.
4. **Trin 3 – Pakke:** Visuelt pakkevalg. Kurven viser pakkenavn + basispris øjeblikkeligt.
5. **Trin 4 – Tilkøb:** To toggle-rækker. Kurven udvides med tilkøbene mens de slås til.
6. **"Se din ordre"-knap** → Opsummeringsskærm med alle detaljer + totalbeløb → Udfyld kontaktinfo → Bekræft.

### Key UI Components
- Sticky sidebar/bottom-sheet: "Din kurv" med løbende total
- Real-time prisberegner koblet til alle valg
- Weekend-kalender med inline uge-tæller (+/- knapper)
- Pakkevalg-kort med "Tilføj til kurv"-knap per pakke
- Animeret prisboks der "blinker" kort når prisen ændres
- Opsummerings-modal inden kontaktinfo

### Edge Cases
- Hvad hvis brugeren ser en høj totalpris og vil sammenligne pakker? → De kan skifte pakke frit og se prisen ændres live — kurven er ikke låst til ét valg.
- Hvad hvis kurven er tom men brugeren trykker "Bekræft"? → "Du har ikke valgt en pakke endnu" — highlight det manglende felt, scroll til det.
- Hvad hvis brugeren er på mobil og kurven skjuler indholdet? → Bottom-sheet er collapsible: standard kollaps, tap-for-at-udvide. Totalen vises altid i collapsed state.

---

## Recommendation
**Recommended direction: A — Den Lineære Guide**

**Why:** Målgruppen (folk der skal flytte) er i en stressfuld situation og har ikke overskud til at optimere en kurv. Én beslutning ad gangen reducerer kognitiv belastning og øger gennemførselsraten. Mobil-first-oplevelsen er naturlig med ét trin per screen. Prisoverraskelserisikoen håndteres ved opsummeringen, som vises inden endelig bekræftelse.

**Key assumption to validate:** At brugere er villige til at gennemføre 5 screens uden at se en pris undervejs — og at opsummeringen ikke skaber for mange exit-punkter. Test dette ved at måle drop-off på opsummerings-skærmen specifikt.
