const OUTSIDE_POSTCODES = new Set([
  2640, 2670, 2680, 2690, 2960, 2970, 2980, 2990,
])

export function isStorkobenhavn(postcode: string): boolean {
  const num = parseInt(postcode, 10)
  if (isNaN(num)) return false
  return num >= 1000 && num <= 2959 && !OUTSIDE_POSTCODES.has(num)
}

export function extractPostcode(address: string): string | null {
  const match = address.match(/\b(\d{4})\b/)
  return match ? match[1] : null
}
