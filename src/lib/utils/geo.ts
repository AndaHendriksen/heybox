import { DELIVERY_LOCATIONS } from "../locations"

const OUTSIDE_POSTCODES = new Set([
  2640, 2670, 2680, 2690, 2960, 2970, 2980, 2990,
])

export function isStorkobenhavn(postcode: string): boolean {
  const num = parseInt(postcode, 10)
  if (isNaN(num)) return false
  return num >= 1000 && num <= 2959 && !OUTSIDE_POSTCODES.has(num)
}

export function extractZipcode(address: string): string | null {
  const match = address.match(/\b(\d{4})\b/)
  return match ? match[1] : null
}

export function getCityFromZipcode(zipcode: string) {
  return DELIVERY_LOCATIONS.find(a => a.postcode.toString() === zipcode)?.name
}

export function combineAddressZipcodeAndCity(address: string, zipcode: string) {
  return `${address}, ${zipcode} ${getCityFromZipcode(zipcode)}`
}

export function combineAddressZipcodeCityAndCountry(address: string, zipcode: string) {
  return `${combineAddressZipcodeAndCity(address, zipcode)}, Danmark`
}