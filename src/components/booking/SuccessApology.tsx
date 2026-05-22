'use client'

import { useState } from 'react'
import { PackageCheck, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BookingState, calcTotal } from '@/lib/booking-types'
import Link from 'next/link'

interface Props {
  booking: BookingState
}

export default function SuccessApology({ booking }: Props) {
  const [choice, setChoice] = useState<'yes' | 'no' | null>(null)
  const originalTotal = calcTotal(booking)
  const discountedTotal = originalTotal - 100

  if (choice === 'yes') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-3">Tak, {booking.name.split(' ')[0]}!</h1>
        <p className="text-zinc-500 mb-6 max-w-sm mx-auto">
          Vi kontakter dig på <strong>{booking.email}</strong> med detaljer om levering af papkasserne.
        </p>
        <Link href="/">
          <Button variant="outline" className="rounded-xl">
            Tilbage til forsiden
          </Button>
        </Link>
      </div>
    )
  }

  if (choice === 'no') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-3">Vi ses snart!</h1>
        <p className="text-zinc-500 mb-6 max-w-sm mx-auto">
          Vi sender dig en besked på <strong>{booking.email}</strong> så snart vores plastikkasser er klar til levering.
        </p>
        <Link href="/">
          <Button variant="outline" className="rounded-xl">
            Tilbage til forsiden
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="py-6">
      <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center mx-auto mb-6">
        <PackageCheck className="w-8 h-8 text-amber-500" />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-3">
          Tak for din interesse, {booking.name.split(' ')[0]}!
        </h1>
        <p className="text-zinc-500 max-w-sm mx-auto leading-relaxed">
          Vi er desværre ikke helt klar med vores plastikkasser endnu — men vi er på vej.
          Din forespørgsel er registreret og vi kontakter dig på{' '}
          <strong>{booking.email}</strong> så snart vi er klar.
        </p>
      </div>

      <div className="bg-zinc-50 rounded-2xl p-5 mb-8 border border-zinc-200">
        <p className="text-sm font-semibold text-zinc-700 mb-1">I mellemtiden:</p>
        <p className="text-sm text-zinc-500 leading-relaxed">
          Vi kan tilbyde dig <strong>papkasser leveret til din dør</strong> — samme service, samme
          levering — til{' '}
          <span className="text-primary font-bold text-base">
            {discountedTotal.toLocaleString('da-DK')},- kr
          </span>{' '}
          <span className="text-zinc-400 line-through text-xs">
            ({originalTotal.toLocaleString('da-DK')},-)
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          onClick={() => setChoice('yes')}
          className="w-full h-12 rounded-xl text-white font-semibold"
        >
          Ja tak, send mig papkasser
        </Button>
        <button
          onClick={() => setChoice('no')}
          className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          Nej tak, kontakt mig når plastikkasserne er klar
        </button>
      </div>
    </div>
  )
}
