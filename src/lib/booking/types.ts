export type Package = 'micro' | 'small' | 'medium' | 'large'

export interface BookingState {
  deliveryAddress: string
  deliveryZipcode: string
  pickupAddress: string
  pickupZipcode: string
  deliveryDate: Date | null
  deliveryDateFinal: string
  pickupDateFinal: string
  extraWeeks: number
  boxCount: number
  selectedPackage: Package | null
  addCleaning: boolean
  addCarrying: boolean
  name: string
  email: string
  phone: string
  phoneCountryCode: string
}

export interface Tier {
  maxBoxes: number
  baseWeeks: number
  pricePerBox: number
  extraWeekPricePerBox: number
  cleaningPricePerBox: number
  carryingPricePerBox: number
}
