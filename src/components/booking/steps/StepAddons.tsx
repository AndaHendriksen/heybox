'use client'

import type { BookingState } from '@/lib/booking/types'
import { getTier } from '@/lib/booking/utils'
import StepShell from './StepShell'

interface Props {
  value: BookingState
  onChange: (partial: Partial<BookingState>) => void
  onNext: (partial?: Partial<BookingState>) => void
  onBack: () => void
}

function AddonChoice({
  selected,
  onChange,
  freeLabel,
  paidLabel,
  price,
}: {
  selected: boolean
  onChange: (v: boolean) => void
  freeLabel: string
  paidLabel: string
  price: number
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-1 bg-gray-50 rounded-xl">
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`p-2 flex place-content-between items-center rounded-lg border cursor-pointer text-left transition-colors ${
          !selected
            ? 'bg-white shadow-xl shadow-black/8 border-primary/20'
            : 'text-zinc-700 border-transparent'
        }`}
      >
        <div className="text-sm">{freeLabel}</div>
        <div className={`font-semibold ${!selected ? '' : 'text-zinc-400'}`}>0 kr</div>
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`p-2 flex place-content-between items-center rounded-lg border cursor-pointer text-left md:text-right transition-colors ${
          selected
            ? 'bg-white shadow-xl shadow-black/8 border-primary/20'
            : 'text-zinc-700 border-transparent'
        }`}
      >
        <div className={`text-sm ${selected ? '' : 'text-zinc-500'}`}>{paidLabel}</div>
        <div className={`font-semibold ${selected ? '' : 'text-zinc-400'}`}>+{price} kr</div>
      </button>
    </div>
  )
}

export default function StepAddons({ value, onChange, onNext, onBack }: Props) {
  const tier = getTier(value.boxCount)
  const cleaningPrice = Math.round(value.boxCount * tier.cleaningPricePerBox)
  const carryingPrice = Math.round(value.boxCount * tier.carryingPricePerBox)

  return (
    <StepShell
      title="Tilkøb"
      description="Tilføj ekstra services til din bestilling."
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-700">Rengøring</p>
          <AddonChoice
            selected={value.addCleaning}
            onChange={(v) => onChange({ addCleaning: v })}
            freeLabel="Rengør selv efter brug"
            paidLabel="Vi rengør dem for jer"
            price={cleaningPrice}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-700">Levering</p>
          <AddonChoice
            selected={value.addCarrying}
            onChange={(v) => onChange({ addCarrying: v })}
            freeLabel="Stillet ved hoveddøren"
            paidLabel="Båret op/ind i boligen"
            price={carryingPrice}
          />
        </div>
      </div>
    </StepShell>
  )
}
