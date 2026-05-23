export type Package = 'micro' | 'small' | 'medium' | 'large'

export interface BookingState {
  fromAddress: string
  fromPostcode: string
  toAddress: string
  toPostcode: string
  deliveryDate: Date | null
  extraWeeks: number
  boxCount: number
  selectedPackage: Package | null
  addCleaning: boolean
  addCarrying: boolean
  name: string
  email: string
  phone: string
}

export const INITIAL_BOOKING_STATE: BookingState = {
  fromAddress: '',
  fromPostcode: '',
  toAddress: '',
  toPostcode: '',
  deliveryDate: null,
  extraWeeks: 0,
  boxCount: 25,
  selectedPackage: null,
  addCleaning: false,
  addCarrying: false,
  name: '',
  email: '',
  phone: '',
}

export const PACKAGES = {
  micro:  { label: '1 værelse',  boxes: 25  },
  small:  { label: '2 værelser',  boxes: 50  },
  medium: { label: '3 værelser', boxes: 80  },
  large:  { label: '5 værelser',   boxes: 140 },
} as const

export interface Tier {
  maxBoxes: number
  baseWeeks: number
  pricePerBox: number
  extraWeekPricePerBox: number
  cleaningPricePerBox: number
  carryingPricePerBox: number
}

export const TIERS: Tier[] = [
  { maxBoxes: 49,       baseWeeks: 2, pricePerBox: 15.95, extraWeekPricePerBox: 3, cleaningPricePerBox: 5, carryingPricePerBox: 3 },
  { maxBoxes: 79,       baseWeeks: 3, pricePerBox: 15.95, extraWeekPricePerBox: 1.50, cleaningPricePerBox: 0, carryingPricePerBox: 0 },
  { maxBoxes: 139,      baseWeeks: 4, pricePerBox: 15.95, extraWeekPricePerBox: 1.25, cleaningPricePerBox: 0, carryingPricePerBox: 0 },
  { maxBoxes: Infinity, baseWeeks: 5, pricePerBox: 14.25, extraWeekPricePerBox: 1.00, cleaningPricePerBox: 0, carryingPricePerBox: 0 },
]

export function getTier(boxCount: number): Tier {
  return TIERS.find((t) => boxCount <= t.maxBoxes) ?? TIERS[TIERS.length - 1]
}

export function calcPricePerBox(boxCount: number): number {
  return getTier(boxCount).pricePerBox
}

export function calcEffectivePricePerBox(state: BookingState): number {
  if (state.boxCount === 0) return 0
  const tier = getTier(state.boxCount)
  return (
    tier.pricePerBox +
    state.extraWeeks * tier.extraWeekPricePerBox +
    (state.addCleaning ? tier.cleaningPricePerBox : 0) +
    (state.addCarrying ? tier.carryingPricePerBox : 0)
  )
}

export function calcTotal(state: BookingState): number {
  if (state.boxCount === 0) return 0
  const tier = getTier(state.boxCount)
  return (
    state.boxCount * tier.pricePerBox +
    state.extraWeeks * state.boxCount * tier.extraWeekPricePerBox +
    (state.addCleaning ? state.boxCount * tier.cleaningPricePerBox : 0) +
    (state.addCarrying ? state.boxCount * tier.carryingPricePerBox : 0)
  )
}

export function formatTotal(amount: number): string {
  return Number.isInteger(amount)
    ? `${amount.toLocaleString('da-DK')},- kr`
    : `${amount.toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kr`
}
