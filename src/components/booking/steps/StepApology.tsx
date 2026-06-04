'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { BookingState } from '@/lib/booking/types'
import { calcTotal, calcTotalWithoutAddons, formatTotal } from '@/lib/booking/utils'
import { firstName } from '@/lib/utils/string'
import { createBooking } from '@/lib/actions/booking'
import { track } from '@/lib/analytics/meta'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { P } from '@/components/ui/text'

interface Props {
  booking: BookingState
}

export default function StepApology({ booking }: Props) {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const hasAddons = booking.addCarrying || booking.addCleaning
  const displayTotal = hasAddons ? calcTotalWithoutAddons(booking) : calcTotal(booking)

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
        // Browser-side Purchase, deduplicated against the server CAPI event via eventID.
        track(
          'Purchase',
          { value: calcTotalWithoutAddons(booking), currency: 'DKK', num_items: booking.boxCount },
          result.eventId,
        )
        router.push(`/booking/confirmation?number=${result.bookingNumber}`)
      }
    })
  }

  return (
    <div>
      <P className="font-bold tracking-tight mb-4 mt-8">Kære {firstName(booking.name)}</P>
      <P className="mb-4">
        Undskyld rigtigt mange gange! Vi har desværre ikke nogle plastik bokse endnu 🥲
      </P>
      <P className="mb-4">
        Vi er to venner der er vokset op sammen, og før vi bruger hele
        vores børneopsparing på plastkasser, ville vi først teste om der er
        interesse. Og det er du jo et bevis på at der er, så
        titusinde tak for det! ❤️
      </P>
      <P className="mb-4">
        Men! Du kan stadig undgå alt bøvlet. Vi har nemlig
        nogle papflyttekasser du kan leje til samme pris. Og vi bærer dem selvfølgelig
        helt ind/op i lejligheden, som et plaster på såret - uden merpris.
      </P>
      <p className="mb-4">Er det noget du kunne være interesseret i?</p>
      <p>Med venlig hilsen</p>
      <p className="mb-12">Anda & Miko</p>

      <div className="bg-gray-50 border border-gray-300 p-4 mb-2">
        <P className="text-sm text-zinc-500 mb-1">Opdateret pris (bæring inkluderet)</P>
        <P className="text-2xl font-bold">{formatTotal(displayTotal)}</P>
        <P className="text-xs">inkl. moms</P>
      </div>
      <P size="small" color="gray" className="mb-8">
        Betaling sker blot over MobilePay når vi kommer med kasserne.
      </P>

      <div className="flex items-start gap-3 mb-2">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked === true)}
          className="mt-0.5"
        />
        <Label htmlFor="terms" className="text-sm text-zinc-600 leading-relaxed cursor-pointer">
          Jeg har læst og accepterer{' '}
          <a href="/handelsbetingelser" target="_blank" rel="noopener noreferrer" className="underline text-black">
            vilkår og betingelser
          </a>
        </Label>
      </div>

      {submitAttempted && !termsAccepted && (
        <P className="text-sm text-red-500 mb-4">
          Du skal acceptere vores vilkår og betingelser for at fortsætte.
        </P>
      )}

      <Button
        className="w-full mt-4"
        disabled={isPending}
        onClick={handleSubmit}
      >
        {isPending ? 'Bekræfter...' : 'Ja selvfølgelig!'}
      </Button>

      {bookingError && (
        <P className="text-sm text-red-500 text-center mt-4">{bookingError}</P>
      )}
    </div>
  )
}
