'use client'

import type { LucideIcon } from 'lucide-react'
import { Truck, Clock, BoxesIcon, SoapDispenserDroplet } from 'lucide-react'
import type { BookingState } from '@/lib/booking/types'
import { calcTotal, getTier, formatTotal } from '@/lib/booking/utils'

interface Props {
  booking: BookingState
  error?: string | null
}

function formatDanish(date: Date): string {
  return date.toLocaleDateString('da-DK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

function addWeeks(date: Date, weeks: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + weeks * 7)
  return d
}

function TimelineCard({
  icon: Icon,
  dotColor,
  children,
}: {
  icon?: LucideIcon
  dotColor: string
  children: React.ReactNode
}) {
  return (
    <div className="relative flex gap-3 items-start -ml-[6px]">
      <div className={`${Icon ? 'bg-white' : ''} py-1 mt-2 rounded-full flex items-center justify-center flex-shrink-0 z-10`}>
        {Icon ? <Icon size={16} className="text-gray-400" /> : <div className='w-[17px]' />}
      </div>
      <div className="flex-1 bg-zinc-50 border border-gray-200 px-4 py-3">
        {children}
      </div>
    </div>
  )
}

export default function StepSummary({ booking, error }: Props) {
  const tier = getTier(booking.boxCount)
  const total = calcTotal(booking)
  const deliveryDate = booking.deliveryDate ?? new Date()
  const totalWeeks = tier.baseWeeks + booking.extraWeeks
  const pickupDate = addWeeks(deliveryDate, totalWeeks)

  const deliveryCarryingLabel = booking.addCarrying
    ? 'Båret ind/op i lejlighed'
    : 'Stillet ved hoveddøren'

  const pickupCarryingLabel = booking.addCarrying
    ? 'Hentet fra lejlighed'
    : 'Fra hoveddøren'

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-1">Opsummering</h1>
      <p className="text-zinc-500 mb-8">Tjek at alt er korrekt inden du bekræfter.</p>

      <div className="relative mb-3">
        <div className="absolute left-[1px] top-2 bottom-28 border-l border-dashed border-gray-300" />

        <div className="space-y-3">
          <TimelineCard icon={BoxesIcon} dotColor="bg-zinc-800">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide">{booking.boxCount} bokse</p>
          </TimelineCard>
          <TimelineCard icon={Truck} dotColor="bg-green-500">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">Levering</p>
            <p className="font-semibold text-sm first-letter:uppercase">{formatDanish(deliveryDate)}</p>
            <p className="text-sm text-zinc-700 mt-0.5">{booking.deliveryAddress}</p>
            <p className="text-xs text-zinc-400 mt-1">{deliveryCarryingLabel}</p>
          </TimelineCard>

          <TimelineCard icon={Clock} dotColor="bg-zinc-400">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">Lejeperiode</p>
            <p className="font-semibold text-sm">{totalWeeks} uger</p>
            {/* <p className="text-xs text-zinc-400 mt-0.5">
              {formatDanish(deliveryDate)} → {formatDanish(pickupDate)}
            </p> */}
          </TimelineCard>

          {!booking.addCleaning && (
          <TimelineCard icon={SoapDispenserDroplet} dotColor="bg-zinc-400">
            <p className="text-xs text-zinc-400 tracking-wide">I rengør selv kasserne inden afhentning</p>
          </TimelineCard>
          )}

          <TimelineCard icon={Truck} dotColor="bg-orange-500">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">Afhentning</p>
            <p className="font-semibold text-sm first-letter:uppercase">{formatDanish(pickupDate)}</p>
            <p className="text-sm text-zinc-700 mt-0.5">{booking.pickupAddress}</p>
            <p className="text-xs text-zinc-400 mt-1">{pickupCarryingLabel}</p>
          </TimelineCard>
        </div>
      </div>
      <div className="space-y-3">
        <TimelineCard dotColor="bg-zinc-400">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">Dine oplysninger</p>
          <div className="text-sm">
              <p>{booking.name}</p>
              <p>{booking.email}</p>
              <p>{booking.phoneCountryCode} {booking.phone}</p>
          </div>
        </TimelineCard>

        <TimelineCard dotColor="bg-zinc-800">
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">Leje, {booking.boxCount} kasser</span>
              <span className="font-medium">
                {(booking.boxCount * tier.pricePerBox).toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr
              </span>
            </div>
            {booking.extraWeeks > 0 && (
              <div className="flex justify-between gap-4">
                <span className="text-zinc-500">{booking.extraWeeks} ekstra {booking.extraWeeks === 1 ? 'uge' : 'uger'}</span>
                <span className="font-medium">
                  +{(booking.extraWeeks * booking.boxCount * tier.extraWeekPricePerBox).toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr
                </span>
              </div>
            )}
            {booking.addCleaning && (
              <div className="flex justify-between gap-4">
                <span className="text-zinc-500">Rengøring</span>
                <span className="font-medium">
                  +{(booking.boxCount * tier.cleaningPricePerBox).toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr
                </span>
              </div>
            )}
            {booking.addCarrying && (
              <div className="flex justify-between gap-4">
                <span className="text-zinc-500">Bæretjeneste</span>
                <span className="font-medium">
                  +{(booking.boxCount * tier.carryingPricePerBox).toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr
                </span>
              </div>
            )}
          </div>
          <div className="border-t border-zinc-200 mt-3 pt-3 space-y-1.5">
            <div className="flex justify-between gap-4 text-xs text-zinc-400">
              <span>Heraf moms 25%</span>
              <span>{(total / 5).toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr</span>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm text-zinc-500">Total inkl. moms</span>
              <span className="text-2xl font-bold">{formatTotal(total)}</span>
            </div>
          </div>
        </TimelineCard>
      </div>

      {error && (
        <p className="text-sm text-red-500 text-center mt-4">{error}</p>
      )}
    </div>
  )
}
