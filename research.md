# External Research: Forbrug og spild af papkasser ved flytning i Danmark

> **Dato:** 2026-05-27
> **Spørgsmål:** Hvor mange nye papkasser skal der købes hvert år i Danmark for at dække behovet ved flytninger?
> **Tech-kontekst:** Markedsanalyse – flytninger i Danmark, boligstørrelser, kasselevetid

---

## 1. Summary (TL;DR)

Der er ca. **861.000 registrerede adresseflytninger** i Danmark om året (DST 2025). Fordi DST tæller per person (ikke per husstand), svarer det til ca. **430.000–500.000 fysiske flytninger** med kassepak. Med tommelfingerreglen 1 kasse per m² og en gennemsnitlig boligstørrelse på ~80 m² for den typiske (lejer-)flytning, bruges ca. **40 mio. kasseanvendelser** om året. Hvis kasser genbruges 4–6 gange (optimistisk), skal der købes ca. **7–10 mio. nye kasser** hvert år i Danmark.

---

## 2. Sources Consulted

| Kilde | URL | Relevans |
|---|---|---|
| Danmarks Statistik – Flytninger | [dst.dk](https://www.dst.dk/da/Statistik/emner/borgere/flytninger/flytninger-i-danmark) | Officielle tal for indenlandske flytninger |
| Bolius – Danskernes flyttevaner | [bolius.dk](https://www.bolius.dk/danskernes-flyttevaner-89770) | Kontekst om hvem og hvornår der flyttes |
| Bolius – Boligstørrelser | [bolius.dk](https://www.bolius.dk/hvor-stort-er-et-gennemsnitligt-hus-og-lejlighed-i-danmark-36883) | Gennemsnitlige m² per boligtype |
| KL – Boligstørrelse pr. ejer/lejer | [kl.dk](https://www.kl.dk/analyser/analyser/demografi-og-befolkning/udviklingen-i-den-gennemsnitlige-boligstoerrelse) | Forskel på ejer vs. lejer boligstørrelse |
| Nordicals – Ejer vs. lejer | [nordicals.dk](https://nordicals.dk/om-nordicals/nyheder/flere-og-flere-bor-til-leje-og-forskydningen-mod-lejebolig-fra-ejerbolig-fortsaetter/) | Fordeling af boligformer i Danmark |
| United Container – Kasselevetid | [unitedcontainer.com](https://unitedcontainer.com/how-many-times-can-cardboard-boxes-be-used-before-recycling) | Antal genbrug per kassetype |

---

## 3. Findings

### Finding A: Antal flytninger i Danmark

Danmarks Statistik registrerede **861.718 indenlandske adresseflytninger i 2025** (senest opdateret februar 2026). I 2023 var tallet 854.008. Statistikken opgøres per person via CPR – en familie på 4 der flytter sammen tæller som 4 "flytninger".

Det svarer til ca. **1 ud af 7 danskere** skifter adresse hvert år. Danmark er Europas næstmest mobile befolkning (kun overgået af Sverige, ifølge Eurostat-data citeret af Bolius).

Sæsonmæssigt er juli–september de travleste måneder (77.000–86.000 flytninger/mdr.), mens april er roligst (~65.500).

> Kilde: [Danmarks Statistik](https://www.dst.dk/da/Statistik/emner/borgere/flytninger/flytninger-i-danmark) og [Bolius](https://www.bolius.dk/danskernes-flyttevaner-89770)

---

### Finding B: Fra personflytninger til fysiske kassepak-events

DST tæller per person. For at omregne til "antal gange kasserne pakkes ned" skal vi estimere, hvor mange der deler en flytning:

- Gennemsnitlig husstandsstørrelse i Danmark: **~2,1 person/husstand**
- Mange flytninger er dog solomoves (studerende, unge, enlige) – realistisk snit er **~1,7 person per flytning**
- Estimeret antal fysiske pakkehændelser: **861.718 / 1,7 ≈ 507.000 per år**

> *(inference)* Intervallet 430.000–520.000 fysiske flytninger om året er en rimelig ramme.

---

### Finding C: Gennemsnitlig boligstørrelse for den typiske flytter

Der er stor forskel på boligstørrelser i Danmark:

| Boligtype | Gennemsnitlig m² (2026) |
|---|---|
| Alle boliger samlet | 112,4 m² |
| Parcel-/stuehuse | 155,3 m² |
| Rækkehuse/kædehuse | 94,8 m² |
| **Lejligheder** | **79,1 m²** |

**Mobildistributionen er skæv mod lejere:**
- 42 % af danskerne bor til leje – men lejere (særligt unge og storbyboere) flytter langt hyppigere end ejere
- Lejere bor på ca. 1,8 person × 45 m²/person = **~81 m² per husstand**
- I København bor ~55 % til leje, og gennemsnitlig boligstørrelse er 84,5 m²

Konklusion: Den typiske flytning involverer en bolig på **ca. 70–90 m²**, med 80 m² som rimeligt midtpunkt.

> Kilde: [Bolius](https://www.bolius.dk/hvor-stort-er-et-gennemsnitligt-hus-og-lejlighed-i-danmark-36883), [KL](https://www.kl.dk/analyser/analyser/demografi-og-befolkning/udviklingen-i-den-gennemsnitlige-boligstoerrelse)

---

### Finding D: Genbrugspotentiale for papkasser

Antallet af genbrug afhænger af kassetype:

| Kassetype | Typiske genbrug |
|---|---|
| Enkeltlags bølgepap (standard) | 2–4 gange |
| Dobbeltvægs bølgepap | 4–6 gange |
| Tripelvægs bølgepap | 6–10 gange |

Standard flyttekasser er typisk **enkelt- eller dobbeltvægs**, dvs. 2–6 genbrug i praksis. Brugerens antagelse på 4–6 gange er **optimistisk, men realistisk for kvalitetskasser der behandles forsigtigt og opbevares tørt**.

> Kilde: [United Container](https://unitedcontainer.com/how-many-times-can-cardboard-boxes-be-used-before-recycling)

---

## 4. Beregning

### Input-parametre

| Parameter | Værdi | Kilde |
|---|---|---|
| Personflytninger per år | 861.718 | DST 2025 |
| Fysiske pakkehændelser (est.) | ~507.000 | DST / husstandssnit |
| Gennemsnitlig boligstørrelse (for movers) | ~80 m² | Bolius + KL |
| Kasser per m² | 1 | Tommelfingerregel |
| Genbrug per kasse | 4–6 | United Container |

### Trin 1 – Totale kasseanvendelser per år

```
507.000 flytninger × 80 m²/flytning × 1 kasse/m² = 40.560.000 kasseanvendelser/år
```

**~40 mio. kasser bruges hvert år i Danmark til flytninger.**

### Trin 2 – Nye kasser der skal købes (og smides ud)

I en stabil tilstand = antallet af nye kasser der købes ≈ antallet der kasseres.

| Genbrug per kasse | Nye kasser/år | Kasser smidt ud/år |
|---|---|---|
| 4 gange | **~10,1 mio.** | ~10,1 mio. |
| 5 gange | **~8,1 mio.** | ~8,1 mio. |
| 6 gange | **~6,8 mio.** | ~6,8 mio. |

### Sensitivitetsanalyse

| Scenarie | Flytninger | Boligm² | Kasseanv./år | Nye kasser (5× genbrug) |
|---|---|---|---|---|
| Konservativt (familier, store boliger) | 430.000 | 90 m² | 38,7 mio. | 7,7 mio. |
| **Middelscenarie** | **507.000** | **80 m²** | **40,6 mio.** | **8,1 mio.** |
| Liberalt (per person × lejerens m²) | 861.718 | 45 m²* | 38,8 mio. | 7,8 mio. |

*Bruger "m² per person for lejere" (45 m²) ved per-person beregning — bemærk at alle tre scenarier konvergerer mod ~40 mio. box-uses/år og ~8 mio. nye kasser.

---

## 5. Recommendation

**Brugbare tal for markedsdimensionering:**

- **~40 millioner kasseanvendelser per år** i Danmark (ved flytninger)
- **7–10 millioner nye kasser** skal købes hvert år, forudsat 4–6 genbrug per kasse

Disse tal er et **nedre estimat** – de inkluderer ikke kassebrug ved:
- Erhvervsflytninger og kontorflytninger
- Lagerflytninger
- Kasser der kasseres inden de er slidt op (fugtskade, dårlig opbevaring)

Det reelle marked er sandsynligvis **noget større end 10 mio. kasser/år**.

**Nøgleusikkerheder:**
- DST-tallene er per person, ikke per husstand — konverteringsfaktoren (~1,7) er et estimat
- "1 kasse per m²" er en tommelfingerregel og varierer med indbo, alder og livsfase
- Genbrug på 4–6 gange forudsætter aktiv koordinering (kasser gives videre, ikke bare smidt ud)

---

## 6. Open Questions

- [ ] Hvad er andelen af flytninger der slet ikke bruger papkasser? (fx studerende med bil og tasker)
- [ ] Er der dansk/nordisk branchestatistik for salg af flyttekasser? (Emballageindustrien / EMBALLAGE Danmark)
- [ ] Hvad er den faktiske genbrugsprocent for danske flyttekasser i dag?
- [ ] Inkluderer DST-tallene flytninger til/fra plejehjem og institutioner, som sandsynligvis ikke involverer papkasser?
