'use client'

import { BookingState } from '@/lib/booking-types'
import StepShell from './StepShell'

interface Props {
  value: BookingState
  onChange: (partial: Partial<BookingState>) => void
  onNext: (partial?: Partial<BookingState>) => void
  onBack: () => void
}

const SIZES = [25, 40, 60, 90, 120, 150]

function StepperButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-12 h-12 text-2xl border text-zinc-400 border-zinc-300 cursor-pointer rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  )
}

export default function StepPackage({ value, onChange, onNext, onBack }: Props) {
  const boxCount = value.boxCount

  function adjustCount(delta: number) {
    const next = Math.max(1, boxCount + delta)
    onChange({ boxCount: next, selectedPackage: null })
  }

  return (
    <StepShell
      title="Hvor mange bokse?"
      description="Én boks pr. m² er en god tommelfingerregel."
    >
      <div className="grid grid-cols-3 gap-2">
        {SIZES.map((size) => (
          <button
            key={size}
            onClick={() => onChange({ boxCount: size, selectedPackage: null })}
            className={`cursor-pointer rounded-xl py-3 border text-center font-semibold transition-all ${
              boxCount === size
                ? 'shadow-lg shadow-black/5 border-primary/20'
                : 'bg-gray-50 border-gray-50 text-gray-500'
            }`}
          >
            {size} m²
          </button>
        ))}
      </div>

      <div className="mt-24 flex flex-col items-center justify-between">
        <div className="flex items-center gap-3">
          <StepperButton onClick={() => adjustCount(-1)} disabled={boxCount <= 25}>
            -
          </StepperButton>
          <span className="w-38 text-6xl text-center font-semibold text-zinc-900">{boxCount || '-'}</span>
          <StepperButton onClick={() => adjustCount(1)}>
            +
          </StepperButton>
        </div>
        <span className="text-sm text-zinc-500">Bokse</span>
      </div>

    </StepShell>
  )
}
