import type { Metadata } from 'next'
import BookingWizard from '@/components/booking/BookingWizard'
import Link from 'next/link'

import { Truck, X, Clock, BoxesIcon, SoapDispenserDroplet, Icon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Bestil flyttekasser',
  description:
    'Bestil professionelle flyttekasser online på få minutter. Vi leverer og henter i Storkøbenhavn - beregn din pris og vælg leveringsdato.',
  alternates: { canonical: '/booking' },
  openGraph: {
    title: 'Bestil flyttekasser - heybox',
    description:
      'Bestil professionelle flyttekasser online. Levering og afhentning i Storkøbenhavn inkluderet.',
    url: '/booking',
    type: 'website',
  },
}

export default function BookPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <nav className="px-4 mt-3 mb-1">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <Link href="/">
            <h1 className="text-xl font-bold tracking-tight">heybox!</h1>
          </Link>
          <Link href="/" className="">
            <X size={16} className="" />
          </Link>
        </div>
      </nav>
      <main className="">
        <BookingWizard />
      </main>
    </div>
  )
}
