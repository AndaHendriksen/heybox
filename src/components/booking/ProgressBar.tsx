'use client'

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="mb-4 lg:mb-12">
      <div className="flex">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-[2px] flex-1 transition-colors duration-300 ${
              i < current ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
