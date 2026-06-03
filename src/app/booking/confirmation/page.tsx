import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tak for din bestilling',
  robots: { index: false, follow: false },
}

interface Props {
  searchParams: Promise<{ number?: string }>
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const { number } = await searchParams

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 size={64} className="text-green-500" strokeWidth={1.5} />
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Tak for din bestilling!
        </h1>
        <p className="text-zinc-500 mb-8">
          Vi har sendt en bekræftelse til din email og kontakter dig inden leveringen.
        </p>

        {number && (
          <div className="bg-zinc-50 rounded-2xl px-6 py-5 mb-8 text-left">
            <p className="text-sm text-zinc-500 mb-1">Bookingnummer</p>
            <p className="text-2xl font-bold font-mono tracking-wider">{number}</p>
            <p className="text-xs text-zinc-400 mt-2">
              Gem dette nummer - du kan bruge det til at følge din ordre.
            </p>
          </div>
        )}

        <div className="bg-zinc-50 rounded-2xl px-6 py-5 mb-8 text-left space-y-3">
          <p className="text-sm font-semibold text-black">Hvad sker der nu?</p>
          <div className="flex gap-3 text-sm text-zinc-500">
            <span className="text-zinc-300 font-bold">1.</span>
            <span>Vi bekræfter din booking via email inden for 24 timer.</span>
          </div>
          <div className="flex gap-3 text-sm text-zinc-500">
            <span className="text-zinc-300 font-bold">2.</span>
            <span>Vi leverer kasserne på den valgte dato og betaler over MobilePay.</span>
          </div>
          <div className="flex gap-3 text-sm text-zinc-500">
            <span className="text-zinc-300 font-bold">3.</span>
            <span>Vi henter kasserne igen på afhentningsdatoen.</span>
          </div>
        </div>

        <Link
          href="/"
          className="text-sm text-zinc-500 underline underline-offset-4 hover:text-black transition-colors"
        >
          ← Tilbage til forsiden
        </Link>
      </div>
    </div>
  )
}
