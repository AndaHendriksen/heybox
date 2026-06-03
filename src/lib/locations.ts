// Single source of truth for the *display* of our delivery area on /lokationer.
// The source of truth for *validation* lives in src/lib/utils/geo.ts
// (isStorkobenhavn). Keep these in sync: every code below must validate as
// inside Storkøbenhavn, and the few nearby-but-excluded codes must not appear
// here. See locations.test.ts for the guard.

export type Region = "koebenhavn" | "storkoebenhavn"

export interface DeliveryLocation {
  /** Postcode, or a postcode range for the central-Copenhagen street codes. */
  code: string
  /** First numeric postcode in `code` - used to validate against geo.ts. */
  postcode: number
  name: string
  region: Region
}

export const DELIVERY_LOCATIONS: DeliveryLocation[] = [
  // København (Københavns Kommune + Frederiksberg - bykernen)
  { code: "1000–1499", postcode: 1050, name: "København K", region: "koebenhavn" },
  { code: "1500–1799", postcode: 1550, name: "København V", region: "koebenhavn" },
  { code: "1800–1999", postcode: 1850, name: "Frederiksberg C", region: "koebenhavn" },
  { code: "2000", postcode: 2000, name: "Frederiksberg", region: "koebenhavn" },
  { code: "2100", postcode: 2100, name: "København Ø", region: "koebenhavn" },
  { code: "2150", postcode: 2150, name: "Nordhavn", region: "koebenhavn" },
  { code: "2200", postcode: 2200, name: "København N", region: "koebenhavn" },
  { code: "2300", postcode: 2300, name: "København S", region: "koebenhavn" },
  { code: "2400", postcode: 2400, name: "København NV", region: "koebenhavn" },
  { code: "2450", postcode: 2450, name: "København SV", region: "koebenhavn" },
  { code: "2500", postcode: 2500, name: "Valby", region: "koebenhavn" },
  { code: "2700", postcode: 2700, name: "Brønshøj", region: "koebenhavn" },
  { code: "2720", postcode: 2720, name: "Vanløse", region: "koebenhavn" },

  // Storkøbenhavn (omegnskommunerne)
  { code: "2600", postcode: 2600, name: "Glostrup", region: "storkoebenhavn" },
  { code: "2605", postcode: 2605, name: "Brøndby", region: "storkoebenhavn" },
  { code: "2610", postcode: 2610, name: "Rødovre", region: "storkoebenhavn" },
  { code: "2620", postcode: 2620, name: "Albertslund", region: "storkoebenhavn" },
  { code: "2625", postcode: 2625, name: "Vallensbæk", region: "storkoebenhavn" },
  { code: "2630", postcode: 2630, name: "Taastrup", region: "storkoebenhavn" },
  { code: "2635", postcode: 2635, name: "Ishøj", region: "storkoebenhavn" },
  { code: "2650", postcode: 2650, name: "Hvidovre", region: "storkoebenhavn" },
  { code: "2660", postcode: 2660, name: "Brøndby Strand", region: "storkoebenhavn" },
  { code: "2665", postcode: 2665, name: "Vallensbæk Strand", region: "storkoebenhavn" },
  { code: "2730", postcode: 2730, name: "Herlev", region: "storkoebenhavn" },
  { code: "2740", postcode: 2740, name: "Skovlunde", region: "storkoebenhavn" },
  { code: "2750", postcode: 2750, name: "Ballerup", region: "storkoebenhavn" },
  { code: "2760", postcode: 2760, name: "Måløv", region: "storkoebenhavn" },
  { code: "2765", postcode: 2765, name: "Smørum", region: "storkoebenhavn" },
  { code: "2770", postcode: 2770, name: "Kastrup", region: "storkoebenhavn" },
  { code: "2791", postcode: 2791, name: "Dragør", region: "storkoebenhavn" },
  { code: "2800", postcode: 2800, name: "Kongens Lyngby", region: "storkoebenhavn" },
  { code: "2820", postcode: 2820, name: "Gentofte", region: "storkoebenhavn" },
  { code: "2830", postcode: 2830, name: "Virum", region: "storkoebenhavn" },
  { code: "2840", postcode: 2840, name: "Holte", region: "storkoebenhavn" },
  { code: "2850", postcode: 2850, name: "Nærum", region: "storkoebenhavn" },
  { code: "2860", postcode: 2860, name: "Søborg", region: "storkoebenhavn" },
  { code: "2870", postcode: 2870, name: "Dyssegård", region: "storkoebenhavn" },
  { code: "2880", postcode: 2880, name: "Bagsværd", region: "storkoebenhavn" },
  { code: "2900", postcode: 2900, name: "Hellerup", region: "storkoebenhavn" },
  { code: "2920", postcode: 2920, name: "Charlottenlund", region: "storkoebenhavn" },
  { code: "2930", postcode: 2930, name: "Klampenborg", region: "storkoebenhavn" },
  { code: "2942", postcode: 2942, name: "Skodsborg", region: "storkoebenhavn" },
  { code: "2950", postcode: 2950, name: "Vedbæk", region: "storkoebenhavn" },
]

export const koebenhavn = DELIVERY_LOCATIONS.filter((l) => l.region === "koebenhavn")
export const storkoebenhavn = DELIVERY_LOCATIONS.filter((l) => l.region === "storkoebenhavn")

// Nearby areas we don't cover yet (within the broader region but excluded in
// geo.ts). Shown honestly on the page so expectations match the booking flow.
export const NOT_COVERED_YET = [
  "Hedehusene",
  "Greve",
  "Solrød Strand",
  "Karlslunde",
]
