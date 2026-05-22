import BookingWizard from '@/components/booking/BookingWizard'
import Link from 'next/link'

export default function BookPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/">
            <img src="/heybox-logo.svg" alt="heybox logo" className="w-20" />
          </Link>
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
            ← Tilbage til forsiden
          </Link>
        </div>
      </nav>
      <main className="pt-16">
        <BookingWizard />
      </main>
    </div>
  )
}
