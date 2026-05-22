'use client'

import { Switch } from '@/components/ui/switch'
import { BookingState, getTier } from '@/lib/booking-types'
import StepShell from './StepShell'

interface Props {
  value: BookingState
  onChange: (partial: Partial<BookingState>) => void
  onNext: (partial?: Partial<BookingState>) => void
  onBack: () => void
}

function AddonRow({
  id,
  checked,
  onCheckedChange,
  activeLabel,
  inactiveLabel,
  price,
}: {
  id: string
  checked: boolean
  onCheckedChange: (v: boolean) => void
  activeLabel: string
  inactiveLabel: string
  price: number
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-zinc-200 bg-white">
      <div className="flex items-center gap-3">
        <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
        <label htmlFor={id} className="text-sm font-medium cursor-pointer">
          {checked ? activeLabel : inactiveLabel}
        </label>
      </div>
      <span className={`text-sm font-medium shrink-0 ${checked ? 'text-zinc-900' : 'text-zinc-400'}`}>
        +{price} kr
      </span>
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
      <div className="space-y-3">
        <AddonRow
          id="rengoring"
          checked={value.addCleaning}
          onCheckedChange={(v) => onChange({ addCleaning: v })}
          activeLabel="Rengøring af kasser"
          inactiveLabel="Rengøring af kasser"
          price={cleaningPrice}
        />
        <AddonRow
          id="baering"
          checked={value.addCarrying}
          onCheckedChange={(v) => onChange({ addCarrying: v })}
          activeLabel="Båret ind/op i lejlighed"
          inactiveLabel="Båret ind/op i lejlighed"
          price={carryingPrice}
        />
      </div>

    </StepShell>
  )
}
