import type { BookingState, Tier } from './types'

export const INITIAL_BOOKING_STATE: BookingState = {
  deliveryAddress: '',
  deliveryPostcode: '',
  pickupAddress: '',
  pickupPostcode: '',
  deliveryDate: null,
  extraWeeks: 0,
  boxCount: 25,
  selectedPackage: null,
  addCleaning: false,
  addCarrying: false,
  name: '',
  email: '',
  phone: '',
  phoneCountryCode: '+45',
}

export const PACKAGES = {
  micro:  { label: '1 værelse',  boxes: 25  },
  small:  { label: '2 værelser', boxes: 50  },
  medium: { label: '3 værelser', boxes: 80  },
  large:  { label: '5 værelser', boxes: 140 },
} as const

export const TIERS: Tier[] = [
  { maxBoxes: 49,       baseWeeks: 2, pricePerBox: 15.95, extraWeekPricePerBox: 3,    cleaningPricePerBox: 5, carryingPricePerBox: 3 },
  { maxBoxes: 79,       baseWeeks: 3, pricePerBox: 15.95, extraWeekPricePerBox: 2, cleaningPricePerBox: 0, carryingPricePerBox: 0 },
  { maxBoxes: 139,      baseWeeks: 4, pricePerBox: 14.95, extraWeekPricePerBox: 1.5, cleaningPricePerBox: 0, carryingPricePerBox: 0 },
  { maxBoxes: Infinity, baseWeeks: 5, pricePerBox: 13.95, extraWeekPricePerBox: 1, cleaningPricePerBox: 0, carryingPricePerBox: 0 },
]
