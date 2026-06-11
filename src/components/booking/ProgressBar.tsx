'use client'

import { P } from "../ui/text"

interface ProgressBarProps {
  current: number
  total: number
  showProgress: boolean
}

export default function ProgressBar({ current, total, showProgress }: ProgressBarProps) {
  return (
    <div className="mb-4 lg:mb-6">
      <div className="flex gap-1 mb-0.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-[2px] flex-1 transition-colors duration-300 ${
              i < current ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      {showProgress && <P size="small" color="gray">{current}/{total}</P>}
    </div>
  )
}
