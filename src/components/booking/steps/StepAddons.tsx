'use client'

import type { BookingState } from '@/lib/booking/types'
import { getTier } from '@/lib/booking/utils'
import StepShell from './StepShell'
import { P } from '@/components/ui/text'

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`p-2 px-4 flex place-content-between items-center border cursor-pointer text-left transition-all duration-600 ${
            !selected
              ? 'bg-blue-100 shadow-primary border-black'
            : 'text-zinc-700 bg-gray-50 border border-gray-200'
        }`}
      >
        <P size="small">{freeLabel}</P>
        <P color={!selected ? 'default' : 'gray'} className="font-semibold">0 kr</P>
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`p-2 px-4 flex place-content-between items-center border cursor-pointer text-left md:text-right transition-all duration-600 ${
          selected
            ? 'bg-blue-100 shadow-primary border-black'
            : 'text-zinc-700 bg-gray-50 border border-gray-200'
        }`}
      >
        <P size="small" className={`text-sm ${selected ? '' : 'text-zinc-500'}`}>{paidLabel}</P>
        <P color={selected ? 'default' : 'gray'} className="font-semibold">
          +{price} kr
        </P>
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
      <div className="space-y-8">
        <div className="space-y-2">
          <P className="font-medium">Rengøring</P>
          <AddonChoice
            selected={value.addCleaning}
            onChange={(v) => onChange({ addCleaning: v })}
            freeLabel="Rengør selv efter brug"
            paidLabel="Vi rengør dem for jer"
            price={cleaningPrice}
          />
        </div>
        <div className="space-y-2">
          <P className="font-medium">Levering</P>
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
