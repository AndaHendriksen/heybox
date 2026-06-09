'use client'

import type { BookingState } from '@/lib/booking/types'
import StepShell from './StepShell'
import { P } from '@/components/ui/text'

interface Props {
  value: BookingState
  onChange: (partial: Partial<BookingState>) => void
  onNext: (partial?: Partial<BookingState>) => void
  onBack: () => void
}

const SIZES = [20, 30, 40, 60, 80, 100, 120, 150]

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

export default function StepBoxCount({ value, onChange, onNext, onBack }: Props) {
  const boxCount = value.boxCount

  function adjustCount(delta: number) {
    const next = Math.max(1, boxCount + delta)
    onChange({ boxCount: next, selectedPackage: null })
  }

  return (
    <StepShell
      title="Hvor mange kasser?"
      description="Én kasser pr. m² er en god tommelfingerregel."
    >
      <div className="grid grid-cols-4 gap-2">
        {SIZES.map((size) => (
          <button
            key={size}
            onClick={() => onChange({ boxCount: size, selectedPackage: null })}
            className={`cursor-pointer py-3 border text-center font-semibold duration-600 transition-all ${
              boxCount === size
                ? 'bg-blue-200 shadow-primary border-black'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            {size} m²
          </button>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center justify-between">
        <div className="flex items-center gap-3">
          <StepperButton onClick={() => adjustCount(-5)} disabled={boxCount <= 20}>
            -
          </StepperButton>
          <span className="w-38 text-6xl text-center font-semibold text-zinc-900">{boxCount || '-'}</span>
          <StepperButton onClick={() => adjustCount(5)}>
            +
          </StepperButton>
        </div>
        <P size="small" color="gray">
          Kasser
        </P>
      </div>

    </StepShell>
  )
}
