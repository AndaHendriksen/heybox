'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { BookingState } from '@/lib/booking/types'
import { INITIAL_BOOKING_STATE } from '@/lib/booking/constants'
import { calcTotal, calcEffectivePricePerBox } from '@/lib/booking/utils'
import { track } from '@/lib/analytics/meta'
import { trackPlausibleEvent } from '@/lib/analytics/plausible'
import ProgressBar from './ProgressBar'
import BottomBar from './BottomBar'
import StepAddresses from './steps/StepAddresses'
import StepDate from './steps/StepDate'
import StepBoxCount from './steps/StepBoxCount'
import StepAddons from './steps/StepAddons'
import StepContact from './steps/StepContact'
import StepSummary from './steps/StepSummary'
import { isBookingDateAvailable } from '@/lib/actions/booking'
import { formatToCleanDate } from '@/lib/utils'

const TOTAL_STEPS = 5

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
}

export default function BookingWizard() {
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [booking, setBooking] = useState<BookingState>(INITIAL_BOOKING_STATE)
  const initiated = useRef(false)

  // Top of funnel: opening the wizard = InitiateCheckout. Fire once.
  useEffect(() => {
    if (initiated.current) return
    initiated.current = true
    track('InitiateCheckout', { value: calcTotal(INITIAL_BOOKING_STATE), currency: 'DKK' })
  }, [])

  function updateBooking(partial: Partial<BookingState>) {
    setBooking((prev) => ({ ...prev, ...partial }))
  }

  // Emit the funnel-depth signal for the step the user is leaving. Meta uses the
  // progression InitiateCheckout -> AddToCart -> Purchase to learn how far each
  // visitor got and optimize towards likely purchasers. The final client-side
  // Purchase event is fired only after booking confirmation in StepSummary.
  function emitStepEvent(leavingStep: number) {
    switch (leavingStep) {
      case 1:
        trackPlausibleEvent('DeliveryAndPickup - Next', { step: String(step), source: 'booking-wizard' })
        break
      case 2:
        trackPlausibleEvent('BoxCount - Next', { step: String(step), source: 'booking-wizard' })
        break
      case 3:
        trackPlausibleEvent('Date - Next', { step: String(step), source: 'booking-wizard' })
        break
      case 4:
        trackPlausibleEvent('Addons - Next', { step: String(step), source: 'booking-wizard' })
        break
      case 5:
        trackPlausibleEvent('ContactInfo - Next', { step: String(step), source: 'booking-wizard' })
        break
    }
  }

  function goNext(partial?: Partial<BookingState>) {
    if (partial) updateBooking(partial)
    emitStepEvent(step)
    setDir(1)
    setStep((s) => s + 1)
    window.scrollTo(0, 0)
  }

  async function checkDate(partial?: Partial<BookingState>) {
    if (!partial?.deliveryDate) {
      setBookingError('Du skal vælge en dato.')
      return false
    }

    const count = await isBookingDateAvailable(formatToCleanDate(partial.deliveryDate))

    if (count > 40) {
      setBookingError('Der er ingen ledige kasser på datoen, vælg venligst en anden dato.')
      return false
    }

    setBookingError(null)
    goNext({ deliveryDate: partial.deliveryDate })
  }

  function goBack() {
    setDir(-1)
    setStep((s) => s - 1)
    window.scrollTo(0, 0)
  }

  const showProgress = step <= TOTAL_STEPS
  const showPriceBar = step >= 2 && step <= 5 && booking.boxCount > 0
  const step1Valid =
    booking.deliveryZipcode && booking.deliveryAddress && booking.pickupZipcode && booking.pickupAddress 

  const bottomNavProps = (() => {
    switch (step) {
      case 1: return { onNext: () => goNext(), nextDisabled: !step1Valid, showBack: false }
      case 2: return { onNext: () => goNext(), nextDisabled: booking.boxCount === 0, showBack: true }
      case 3: return { onNext: () => checkDate(booking), showBack: true }
      case 4: return { onNext: () => goNext(), showBack: true }
      case 5: return { nextLabel: 'Se opsummering', nextFormId: 'contact-form', showBack: true }
      // Step 6 (opsummering) er sidste step: ingen BottomBar - bekræft-knap + tilbage ligger i StepSummary.
      default: return { showBack: false }
    }
  })()

  return (
    <div className="flex flex-col items-center justify-start pt-1 pb-10 px-4 pb-32">
      <div className="w-full max-w-xl">
        <ProgressBar current={step} total={TOTAL_STEPS} showProgress={showProgress} />

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {step === 1 && (
              <StepAddresses
                booking={booking}
                onChange={updateBooking}
                onNext={goNext}
              />
            )}
            {step === 2 && (
              <StepBoxCount
                booking={booking}
                onChange={updateBooking}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === 3 && (
              <StepDate
                booking={booking}
                onChange={updateBooking}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === 4 && (
              <StepAddons
                booking={booking}
                onChange={updateBooking}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === 5 && (
              <StepContact
                booking={booking}
                onChange={updateBooking}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === 6 && (
              <StepSummary booking={booking} onBack={goBack} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {step <= 5 && (
        <BottomBar
          showPriceBar={showPriceBar}
          boxCount={booking.boxCount}
          prisPrBoks={calcEffectivePricePerBox(booking)}
          total={calcTotal(booking)}
          onBack={goBack}
          bookingError={bookingError}
          {...bottomNavProps}
        />
      )}
    </div>
  )
}
