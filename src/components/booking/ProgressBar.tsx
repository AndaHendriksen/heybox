'use client'

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex gap-1.5 mb-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
              i < current ? 'bg-primary' : 'bg-zinc-300'
            }`}
          />
        ))}
      </div>
      {/* <p className="text-sm text-zinc-400">Trin {current} af {total}</p> */}
    </div>
  )
}
