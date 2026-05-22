'use client'

import { Button } from '@/components/ui/button'
import { formatTotal } from '@/lib/booking-types'

interface BottomBarProps {
  showPriceBar: boolean
  boxCount: number
  prisPrBoks: number
  total: number
  onNext?: () => void
  nextLabel?: string
  nextDisabled?: boolean
  nextFormId?: string
  showBack?: boolean
  onBack?: () => void
}

export default function BottomBar({
  showPriceBar,
  boxCount,
  prisPrBoks,
  total,
  onNext,
  nextLabel = 'Næste',
  nextDisabled = false,
  nextFormId,
  showBack = false,
  onBack,
}: BottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-100">
      <div className="max-w-xl mx-auto px-4 py-3 flex flex-col gap-3">
        {showPriceBar && boxCount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">
              <span className="font-semibold text-zinc-900">
                {prisPrBoks.toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kr
              </span>
              {' '}pr. boks
            </span>
            <span className="text-zinc-500">
              Total{' '}
              <span className="font-semibold text-zinc-900">
                {formatTotal(total)}
              </span>
            </span>
          </div>
        )}
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              className="h-12 w-12 shrink-0 rounded-xl border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 transition-colors"
            >
              ←
            </button>
          )}
          <Button
            {...(nextFormId
              ? { type: 'submit', form: nextFormId }
              : { type: 'button', onClick: onNext })}
            disabled={nextDisabled}
            className="flex-1 h-12 rounded-xl text-white font-semibold"
          >
            {nextLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
