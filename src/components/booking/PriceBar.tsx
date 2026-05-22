'use client'

interface PriceBarProps {
  boxCount: number
  prisPrBoks: number
  total: number
}

export default function PriceBar({ boxCount, prisPrBoks, total }: PriceBarProps) {
  if (boxCount === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-100">
      <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-sm text-zinc-500">
          <span className="font-semibold text-zinc-900">
            {prisPrBoks.toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kr
          </span>
          {' '}pr. kasse
        </div>
        <div className="text-sm text-zinc-500">
          Total{' '}
          <span className="font-semibold text-zinc-900">
            {total.toLocaleString('da-DK')},- kr
          </span>
        </div>
      </div>
    </div>
  )
}
