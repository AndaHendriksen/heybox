'use client'

import { Package, PACKAGES, BookingState } from '@/lib/booking-types'
import StepShell from './StepShell'

interface Props {
  value: BookingState
  onChange: (partial: Partial<BookingState>) => void
  onNext: (partial?: Partial<BookingState>) => void
  onBack: () => void
}

const PACKAGE_KEYS = ['micro', 'small', 'medium', 'large'] as const

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
      className="w-9 h-9 rounded-full border border-zinc-300 flex items-center justify-center text-lg hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  )
}

export default function StepPackage({ value, onChange, onNext, onBack }: Props) {
  const boxCount = value.boxCount
  const selected = value.selectedPackage

  function selectPackage(key: Package) {
    onChange({ selectedPackage: key, boxCount: PACKAGES[key].boxes })
  }

  function adjustCount(delta: number) {
    const next = Math.max(1, boxCount + delta)
    const matchingKey = (Object.keys(PACKAGES) as Package[]).find(
      (k) => PACKAGES[k].boxes === next
    ) ?? null
    onChange({ boxCount: next, selectedPackage: matchingKey })
  }

  return (
    <StepShell
      title="Hvor mange bokse?"
      description="1 boks pr. m² er en god tommelfingerregel."
    >
      <div className="flex flex-col gap-3">
        {PACKAGE_KEYS.map((key) => {
          const pkg = PACKAGES[key]
          const isSelected = selected === key && boxCount === pkg.boxes

          return (
            <button
              key={key}
              onClick={() => selectPackage(key)}
              className={`cursor-pointer text-left w-full rounded-2xl border-2 p-4 transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-zinc-200 hover:border-zinc-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{pkg.label}</p>
                  <p className="text-sm text-zinc-500">{pkg.boxes} m²</p>
                </div>
                <p className="font-semibold text-zinc-900 shrink-0">{pkg.boxes} bokse</p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-between bg-zinc-50 rounded-xl px-4 py-3">
        <span className="text-sm text-zinc-500">Finjuster antal bokse:</span>
        <div className="flex items-center gap-3">
          <StepperButton onClick={() => adjustCount(-1)} disabled={boxCount <= 25}>
            –
          </StepperButton>
          <span className="w-8 text-center font-semibold text-zinc-900">{boxCount || '–'}</span>
          <StepperButton onClick={() => adjustCount(1)}>
            +
          </StepperButton>
        </div>
      </div>

    </StepShell>
  )
}
