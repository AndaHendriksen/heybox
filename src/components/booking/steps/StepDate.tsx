'use client'

import { useMemo } from 'react'
import { Calendar } from '@/components/ui/calendar'
import type { BookingState } from '@/lib/booking/types'
import { getTier } from '@/lib/booking/utils'
import StepShell from './StepShell'
import { P } from '@/components/ui/text'

interface Props {
  booking: BookingState
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
    // weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export default function StepDate({ booking, onChange }: Props) {
  const defaultDate = useMemo(() => nextWeekend(), [])
  const selected = booking.deliveryDate!
  const tier = getTier(booking.boxCount)
  const totalWeeks = tier.baseWeeks + booking.extraWeeks
  const pickupDate = selected ? addDays(selected, totalWeeks * 7) : undefined

  function handleSelect(date: Date | undefined) {
    if (date) onChange({ deliveryDate: date })
  }

  return (
    <StepShell title="Hvornår skal vi levere?" description='Vi leverer pt. kun om lørdagen.'>
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={defaultDate}
          weekStartsOn={1}
          modifiers={selected ? {
            inRange: { after: selected, before: pickupDate! },
            rangeEnd: pickupDate,
          } : {}}
          disabled={(date) => {
            const day = date.getDay()
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            return (day !== 6) || date < today
          }}
          classNames={{
            root: 'w-full',
            month_grid: 'w-full',
          }}
        />
      </div>

      {/* <div className="mt-3 mb-8 bg-white flex justify-between rounded-xl px-1 text-sm">
        <div className="">
          <p className="text-zinc-500">Levering</p>
          <p className="font-bold text-xl">{formatDanish(selected)}</p>
        </div>
        <div className="text-center">
          <p className="text-zinc-500">Uger</p>
          <p className="font-bold text-xl">{totalWeeks}</p>
        </div>
        <div className="text-right">
          <p className="text-zinc-500">Afhentning</p>
          <p className="font-bold text-xl">{formatDanish(pickupDate)}</p>
        </div>
      </div> */}

      <div className="mt-6 flex items-center justify-between text-sm text-zinc-500">
        <div className="flex items-center gap-3">
          <P>Ekstra uger:</P>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onChange({ extraWeeks: Math.max(0, booking.extraWeeks - 1) })}
              disabled={booking.extraWeeks === 0}
              className="w-8 h-8 cursor-pointer rounded-full border border-zinc-300 flex items-center justify-center hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              -
            </button>
            <P color="gray" className="w-4 text-center font-medium">{booking.extraWeeks}</P>
            <button
              onClick={() => onChange({ extraWeeks: Math.min(4, booking.extraWeeks + 1) })}
              disabled={booking.extraWeeks === 4}
              className="w-8 h-8 cursor-pointer rounded-full border border-zinc-300 flex items-center justify-center hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>
        </div>
        <div className="text-right">
          <P>
            +{(tier.extraWeekPricePerBox * booking.extraWeeks).toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr/kasse
          </P>
        </div>
      </div>
    </StepShell>
  )
}
