'use client'

import { BookingState, calcTotal, calcPricePerBox, getTier, formatTotal } from '@/lib/booking-types'

interface Props {
  booking: BookingState
}

function formatDanish(date: Date): string {
  return date.toLocaleDateString('da-DK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-3 border-b border-zinc-100 last:border-0">
      <span className="text-zinc-500 text-sm">{label}</span>
      <span className="text-sm font-medium text-right">{value}</span>
    </div>
  )
}

export default function StepSummary({ booking }: Props) {
  const tier = getTier(booking.boxCount)
  const pricePerBox = calcPricePerBox(booking.boxCount)
  const total = calcTotal(booking)
  const deliveryDate = booking.deliveryDate ?? new Date()
  const totalWeeks = tier.baseWeeks + booking.extraWeeks

  const addonLines = [
    booking.addCleaning && 'Rengøring af kasser',
    booking.addCarrying && 'Båret ind/op',
  ].filter(Boolean) as string[]

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-1">Opsummering</h1>
      <p className="text-zinc-500 mb-8">Tjek at alt er korrekt inden du bekræfter.</p>

      <div className="bg-zinc-50 rounded-2xl px-5 py-2 mb-6">
        <Row label="Fra adresse" value={booking.fromAddress} />
        <Row label="Til adresse" value={booking.toAddress} />
        <Row
          label="Leveringsdato"
          value={`${formatDanish(deliveryDate)}`}
        />
        <Row label="Antal kasser" value={`${booking.boxCount} kasser`} />
        <Row
          label="Lejeperiode"
          value={`${totalWeeks} uger (${tier.baseWeeks} inkl.${booking.extraWeeks > 0 ? ` + ${booking.extraWeeks} ekstra` : ''})`}
        />
        <Row
          label="Pris pr. kasse"
          value={`${pricePerBox.toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr`}
        />
        {addonLines.length > 0 && (
          <Row label="Tilkøb" value={addonLines.join(', ')} />
        )}
        <Row label="Navn" value={booking.name} />
        <Row label="E-mail" value={booking.email} />
        <Row label="Telefon" value={booking.phone} />
      </div>

      <div className="flex items-baseline justify-between mb-8 px-1">
        <span className="text-zinc-500">Total</span>
        <span className="text-3xl font-bold">{formatTotal(total)}</span>
      </div>

    </div>
  )
}
