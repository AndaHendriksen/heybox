'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { BookingState } from '@/lib/booking/types'
import { calcTotal, calcTotalWithoutAddons, formatTotal } from '@/lib/booking/utils'
import { firstName } from '@/utils/string'
import { createBooking } from '@/lib/actions/booking'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

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
        router.push(`/booking/confirmation?number=${result.bookingNumber}`)
      }
    })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-4 mt-8">Kære {firstName(booking.name)}</h1>
      <p className="text-zinc-500 mb-4">
        Undskyld rigtigt mange gange!
      </p>
      <p className="text-zinc-500 mb-6">
        Vi har desværre ikke nogle plastik bokse endnu. Vi ville lige teste om der
        er interesse, før vi køber et stort lager ind.
      </p>
      <p className="text-zinc-500 mb-4">
        <span className="font-bold text-black">Men!</span> Vi har nogle solide flyttekasser
        du kan leje til samme pris. Og vi bærer dem selvfølgelig helt ind/op i lejligheden,
        som et plaster på såret - uden merpris.
      </p>
      <p className="text-zinc-500 mb-4">
        Betaling sker blot over MobilePay når vi kommer med kasserne.
      </p>

      {hasAddons && (
        <div className="bg-zinc-50 rounded-2xl px-4 py-3 mb-6">
          <p className="text-sm text-zinc-500 mb-1">Din pris (bæring inkluderet)</p>
          <p className="text-2xl font-bold">{formatTotal(displayTotal)}</p>
          <p className="text-xs text-zinc-400 mt-1">inkl. moms</p>
        </div>
      )}

      <p className="text-zinc-500 mb-6">
        Er du interesseret i det?
      </p>

      <div className="flex items-start gap-3 mb-2">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked === true)}
          className="mt-0.5"
        />
        <Label htmlFor="terms" className="text-sm text-zinc-600 leading-relaxed cursor-pointer">
          Jeg har læst og accepterer{' '}
          <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline text-black">
            vilkår og betingelser
          </a>
        </Label>
      </div>

      {submitAttempted && !termsAccepted && (
        <p className="text-sm text-red-500 mb-4">
          Du skal acceptere vores vilkår og betingelser for at fortsætte.
        </p>
      )}

      <Button
        className="w-full h-12 rounded-xl text-white font-semibold mt-4"
        disabled={isPending}
        onClick={handleSubmit}
      >
        {isPending ? 'Bekræfter...' : 'Ja selvfølgelig!'}
      </Button>

      {bookingError && (
        <p className="text-sm text-red-500 text-center mt-4">{bookingError}</p>
      )}
    </div>
  )
}
