// Single source of truth for the cardboard-waste figures shown on the homepage
// and the About page. Keep the math here so both pages always agree.

export const STATS = {
  flytningerPerAar: 861718,        // DST 2025 (per person via CPR)
  gnsPersonerPerBolig: 2.1,        // DST husstandssnit. Research bruger 1,7 pr. flytning (solomoves trækker ned)
  gnsBoligM2: 79.1,                // Bolius: gns. lejlighed. Hel bolig, ikke pr. person. Research-midtpunkt ~80 m²
  kasserPerM2: 1,                  // Tommelfingerregel
  genbrugPerKasse: 5,              // United Container (middelscenarie)
  papkasseVaegtKg: 1.2,            // ca. 1200g per standard papkasse (Silvan/Bauhaus-snit)
}

export const boligflytningerPerAar = STATS.flytningerPerAar / STATS.gnsPersonerPerBolig
export const kasseanvendelserPerAar = boligflytningerPerAar * STATS.gnsBoligM2 * STATS.kasserPerM2
export const kasserSmidtUdPerAar = kasseanvendelserPerAar / STATS.genbrugPerKasse
export const tonPapAffaldPerAar = (kasserSmidtUdPerAar * STATS.papkasseVaegtKg) / 1000

export const formatMio = (n: number) =>
  `~${(n / 1_000_000).toLocaleString("da-DK", { maximumFractionDigits: 1 })} mio.`
export const formatTon = (n: number) => `${Math.round(n).toLocaleString("da-DK")} ton`
