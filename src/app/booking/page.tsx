import BookingWizard from '@/components/booking/BookingWizard'
import Link from 'next/link'

export default function BookPage() {
  return (
    // <div className="min-h-screen bg-gray-100 overflow-x-hidden">
    <div className="min-h-screen bg-white overflow-x-hidden">
      <nav className="px-4 pt-1">
        <div className="max-w-xl mx-auto  flex items-center justify-between">
          <Link href="/">
            <img src="/heybox-logo.svg" alt="heybox logo" className="w-16" />
          </Link>
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
            x
          </Link>
        </div>
      </nav>
      <main className="">
        <BookingWizard />
      </main>
    </div>
  )
}
