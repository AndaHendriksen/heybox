'use client'

import type { LucideIcon } from 'lucide-react'
import { Truck, Clock, BoxesIcon, SoapDispenserDroplet } from 'lucide-react'
import type { BookingState } from '@/lib/booking/types'
import { calcTotal, getTier, formatTotal } from '@/lib/booking/utils'
import { P } from '@/components/ui/text'

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
  children,
}: {
  icon?: LucideIcon
  children: React.ReactNode
}) {
  return (
    <div className="relative flex gap-3 items-start -ml-[6px]">
      <div className={`${Icon ? 'bg-white' : ''} py-1 mt-2 rounded-full flex items-center justify-center flex-shrink-0 z-10`}>
        {Icon ? <Icon size={18} className="text-gray-500" /> : <div className='w-[17px]' />}
      </div>
      <div className="flex-1 bg-gray-50 border border-gray-300 px-4 py-3">
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
      <P className="text-zinc-500 mb-8">Tjek at alt er korrekt inden du bekræfter.</P>

      <div className="relative mb-3">
        <div className="absolute left-[1px] top-2 bottom-28 border-l border-dashed border-gray-400" />

        <div className="space-y-3">
          <TimelineCard icon={BoxesIcon}>
            <P>
              {booking.boxCount} bokse
            </P>
          </TimelineCard>
          <TimelineCard icon={Truck}>
            <P size="small" color="gray" className="mb-1">
              Levering
            </P>
            <P className="mb-6 first-letter:uppercase">
              {formatDanish(deliveryDate)}
            </P>
            <P size="small" color="gray" className="mb-1">
              {deliveryCarryingLabel}
            </P>
            <P>
              {booking.deliveryAddress}
            </P>
          </TimelineCard>

          <TimelineCard icon={Clock}>
            <P size="small" color="gray" className="mb-1">
              Lejeperiode
            </P>
            <P>
              {totalWeeks} uger
            </P>
          </TimelineCard>

          {!booking.addCleaning && (
            <TimelineCard icon={SoapDispenserDroplet}>
              <P>I rengør selv kasserne inden afhentning</P>
            </TimelineCard>
          )}

          <TimelineCard icon={Truck}>
            <P size="small" color="gray" className="mb-1">
              Afhentning
            </P>
            <P className="mb-6 first-letter:uppercase">
              {formatDanish(pickupDate)}
            </P>
            <P size="small" color="gray" className="mb-1">
              {pickupCarryingLabel}
            </P>
            <P>
              {booking.pickupAddress}
            </P>
          </TimelineCard>
        </div>
      </div>
      <div className="space-y-3">
        <TimelineCard>
          <P size="small" color="gray" className="mb-1">
            Dine oplysninger
          </P>
          <div>
              <P>{booking.name}</P>
              <P>{booking.email}</P>
              <P>{booking.phoneCountryCode} {booking.phone}</P>
          </div>
        </TimelineCard>

        <TimelineCard>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between gap-4">
              <P>Leje, {booking.boxCount} kasser</P>
              <P>
                {(booking.boxCount * tier.pricePerBox).toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr
              </P>
            </div>
            {booking.extraWeeks > 0 && (
              <div className="flex justify-between gap-4">
                <P>
                  {booking.extraWeeks} ekstra {booking.extraWeeks === 1 ? 'uge' : 'uger'}
                </P>
                <P>
                  +{(booking.extraWeeks * booking.boxCount * tier.extraWeekPricePerBox).toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr
                </P>
              </div>
            )}
            {booking.addCleaning && (
              <div className="flex justify-between gap-4">
                <P>
                  Rengøring
                </P>
                <P>
                  +{(booking.boxCount * tier.cleaningPricePerBox).toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr
                </P>
              </div>
            )}
            {booking.addCarrying && (
              <div className="flex justify-between gap-4">
                <P>
                  Bæretjeneste
                </P>
                <P>
                  +{(booking.boxCount * tier.carryingPricePerBox).toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr
                </P>
              </div>
            )}
          </div>
          <div className="border-t border-gray-300 mt-3 pt-3 space-y-1.5">
            <div className="flex justify-between gap-4 text-xs text-zinc-400">
              <P>Heraf moms 25%</P>
              <P>
                {(total / 5).toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr
              </P>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <P size="lead" className="font-bold">
                Total inkl. moms
              </P>
              <P size="lead" className="font-bold">
                {formatTotal(total)}
              </P>
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
