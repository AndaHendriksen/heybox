import type { BookingState, Tier } from './types'
import { TIERS } from './constants'

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

export function calcTotalWithoutAddons(state: BookingState): number {
  if (state.boxCount === 0) return 0
  const tier = getTier(state.boxCount)
  return (
    state.boxCount * tier.pricePerBox +
    state.extraWeeks * state.boxCount * tier.extraWeekPricePerBox
  )
}

export function formatTotal(amount: number): string {
  return Number.isInteger(amount)
    ? `${amount.toLocaleString('da-DK')},- kr`
    : `${amount.toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kr`
}
