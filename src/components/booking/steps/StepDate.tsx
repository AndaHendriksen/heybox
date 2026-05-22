'use client'

import { useMemo } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { BookingState, getTier } from '@/lib/booking-types'
import { InfoIcon } from 'lucide-react'
import StepShell from './StepShell'

interface Props {
  value: BookingState
  onChange: (partial: Partial<BookingState>) => void
  onNext?: (partial?: Partial<BookingState>) => void
  onBack?: () => void
}

function nextWeekend(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  const day = d.getDay()
  const daysUntilSat = (6 - day + 7) % 7 || 7
  d.setDate(d.getDate() + daysUntilSat)
  return d
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function formatDanish(date: Date): string {
  return date.toLocaleDateString('da-DK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export default function StepDate({ value, onChange }: Props) {
  const defaultDate = useMemo(() => nextWeekend(), [])
  const selected = value.deliveryDate ?? defaultDate
  const tier = getTier(value.boxCount)
  const totalWeeks = tier.baseWeeks + value.extraWeeks
  const pickupDate = addDays(selected, totalWeeks * 7)
  const extraWeekTotal = value.boxCount * tier.extraWeekPricePerBox

  function handleSelect(date: Date | undefined) {
    if (date) onChange({ deliveryDate: date })
  }

  return (
    <StepShell title="Hvornår skal vi levere?" description='Vi leverer pt. kun i weekenderne.'>
      {/* <div className="flex items-start gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 mb-6 text-sm text-zinc-600">
        <InfoIcon className="w-4 h-4 mt-0.5 shrink-0 text-zinc-400" />
        <span>Vi leverer kun i weekenderne (lørdag og søndag)</span>
      </div> */}

      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={defaultDate}
          weekStartsOn={1}
          disabled={(date) => {
            const day = date.getDay()
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            return (day !== 0 && day !== 6) || date < today
          }}
          classNames={{
            root: 'w-full',
            month_grid: 'w-full',
          }}
        />
      </div>

      <div className="mt-4 bg-zinc-50 rounded-xl px-4 py-3 text-sm space-y-1">
        <div className="flex justify-between">
          <span className="text-zinc-500">Levering</span>
          <span className="font-medium capitalize">{formatDanish(selected)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Afhentning</span>
          <span className="font-medium capitalize">{formatDanish(pickupDate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Lejeperiode</span>
          <span className="font-medium">
            {totalWeeks} uger
            {value.extraWeeks > 0 && (
              <span className="text-primary ml-1">(+{value.extraWeeks} ekstra)</span>
            )}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-zinc-500">
        <div className="flex items-center gap-3">
          <span>Ekstra uger:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onChange({ extraWeeks: Math.max(0, value.extraWeeks - 1) })}
              disabled={value.extraWeeks === 0}
              className="w-7 h-7 rounded-full border border-zinc-300 flex items-center justify-center hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              –
            </button>
            <span className="w-4 text-center font-medium text-zinc-900">{value.extraWeeks}</span>
            <button
              onClick={() => onChange({ extraWeeks: Math.min(4, value.extraWeeks + 1) })}
              disabled={value.extraWeeks === 4}
              className="w-7 h-7 rounded-full border border-zinc-300 flex items-center justify-center hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-zinc-900">
            +{tier.extraWeekPricePerBox.toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr/boks
          </p>
          <p className="text-xs text-zinc-400">+{extraWeekTotal.toLocaleString('da-DK', { maximumFractionDigits: 2 })} kr/uge i alt</p>
        </div>
      </div>

    </StepShell>
  )
}
