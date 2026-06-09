'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { LucideIcon } from 'lucide-react'
// SoapDispenserDroplet bruges kun af det udkommenterede rengørings-kort - genimportér ved genaktivering.
import { Truck, Clock, BoxesIcon, ChevronLeft } from 'lucide-react'
import type { BookingState } from '@/lib/booking/types'
import { calcTotal, getTier, formatTotal } from '@/lib/booking/utils'
import { createBooking } from '@/lib/actions/booking'
import { track } from '@/lib/analytics/meta'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { P } from '@/components/ui/text'

interface Props {
  booking: BookingState
  onBack: () => void
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

export default function StepSummary({ booking, onBack }: Props) {
  const tier = getTier(booking.boxCount)
  const total = calcTotal(booking)
  const deliveryDate = booking.deliveryDate ?? new Date()
  const totalWeeks = tier.baseWeeks + booking.extraWeeks
  const pickupDate = addWeeks(deliveryDate, totalWeeks)

  const [termsAccepted, setTermsAccepted] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleSubmit() {
    if (!termsAccepted) {
      setSubmitAttempted(true)
      return
    }
    if (isPending) return

    startTransition(async () => {
      setBookingError(null)
      const result = await createBooking(booking)
      if ('error' in result) {
        setBookingError(result.error)
      } else {
        const eventId = result.eventId
        track('Purchase', { value: total, currency: 'DKK', num_items: booking.boxCount }, eventId)
        router.push(`/booking/confirmation?number=${result.bookingNumber}`)
      }
    })
  }

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
              {booking.boxCount} kasser
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

          {/* Rengøring midlertidigt skjult - papkasser kan ikke rengøres. Genaktiveres ved plastikkasser.
          {!booking.addCleaning && (
            <TimelineCard icon={SoapDispenserDroplet}>
              <P>I rengør selv kasserne inden afhentning</P>
            </TimelineCard>
          )}
          */}

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
          <div className="space-y-1.5">
            <div className="flex justify-between gap-4">
              <P>Leje af {booking.boxCount} kasser</P>
              <P>
                {(booking.boxCount * tier.pricePerBox).toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr
              </P>
            </div>
            <div className="flex justify-between gap-4">
              <P>Levering</P>
              <P>
                0 kr
              </P>
            </div>
            <div className="flex justify-between gap-4">
              <P>Afhentning</P>
              <P>
                0 kr
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
            {/* Rengøring midlertidigt skjult - genaktiveres ved plastikkasser (addCleaning er altid false nu).
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
            */}
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
            {/* Moms midlertidigt skjult – heybox er endnu ikke momsregistreret.
                Genaktiver hele momsrækken når registreringen er på plads. */}
            {/* <div className="flex justify-between gap-4 text-zinc-400">
              <P>Heraf moms 25%</P>
              <P>
                {(total / 5).toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr
              </P>
            </div> */}
            <div className="flex items-baseline justify-between gap-4">
              <P size="lead" className="font-bold">
                Total
              </P>
              <P size="lead" className="font-bold">
                {formatTotal(total)}
              </P>
            </div>
          </div>
        </TimelineCard>
      </div>

      <P className="mt-16 mb-4">
        Betaling sker over MobilePay, når vi leverer kasserne.
      </P>

      <div className="flex items-start gap-2 mb-6">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked === true)}
          className=""
        />
        <Label htmlFor="terms" className="cursor-pointer">
          Jeg har læst og accepterer{' '}
          <a href="/handelsbetingelser" target="_blank" rel="noopener noreferrer" className="underline text-black">
            vilkår og betingelser
          </a>
        </Label>
      </div>

      {submitAttempted && !termsAccepted && (
        <P className="text-red-700 mb-4">
          Du skal acceptere vores vilkår og betingelser for at fortsætte.
        </P>
      )}

      <Button
        className="w-full mt-4"
        disabled={isPending}
        onClick={handleSubmit}
      >
        {isPending ? 'Bekræfter...' : 'Bekræft booking'}
      </Button>

      <Button
        variant="ghost"
        onClick={onBack}
        disabled={isPending}
        className="w-full mt-6 text-zinc-500 hover:text-zinc-700 transition-colors disabled:opacity-50"
      >
        <ChevronLeft size={10} className="text-gray-500" />
        Tilbage
      </Button>

      {bookingError && (
        <P className="text-sm text-red-500 text-center mt-4">{bookingError}</P>
      )}
    </div>
  )
}
