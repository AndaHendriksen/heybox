'use server'

import { and, asc, eq, gte, isNull, or } from 'drizzle-orm'
import { db } from '@/lib/db'
import { bookings, pricingTiers } from '@/lib/db/schema'
import type { BookingState } from '@/lib/booking/types'
import { calcTotalWithoutAddons } from '@/lib/booking/utils'
import { sendEmail } from '@/lib/email/sweego'
import { renderBookingConfirmation } from '@/lib/email/booking-confirmation'
import { sendCapiEvent } from '@/lib/analytics/meta-capi'
import { firstName } from '@/lib/utils/string'
import { SITE_URL } from '@/lib/seo'

const INTERNAL_EMAIL = 'hey@heybox.dk'

function generateBookingNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rand = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  return `HB-${date}-${rand}`
}

export async function createBooking(
  state: BookingState,
): Promise<{ id: string; bookingNumber: string; eventId: string } | { error: string }> {
  if (!state.deliveryDate) return { error: 'Leveringsdato mangler' }

  try {
    const [tier] = await db
      .select()
      .from(pricingTiers)
      .where(
        and(
          eq(pricingTiers.is_active, true),
          or(isNull(pricingTiers.max_boxes), gte(pricingTiers.max_boxes, state.boxCount)),
        ),
      )
      .orderBy(asc(pricingTiers.max_boxes))
      .limit(1)

    if (!tier) return { error: 'Ingen aktiv prisliste fundet - kontakt os på hey@heybox.dk' }

    const pickupDate = new Date(state.deliveryDate)
    pickupDate.setDate(pickupDate.getDate() + (tier.base_weeks + state.extraWeeks) * 7)

    // Canonical total = what the customer was quoted on screen (add-ons are free).
    const total = calcTotalWithoutAddons(state)

    const [created] = await db
      .insert(bookings)
      .values({
        user_id: null,
        tier_id: tier.id,
        status: 'pending',
        delivery_address: state.deliveryAddress,
        delivery_postcode: state.deliveryPostcode,
        pickup_address: state.pickupAddress,
        pickup_postcode: state.pickupPostcode,
        box_count: state.boxCount,
        delivery_date: state.deliveryDate,
        pickup_date: pickupDate,
        extra_weeks: state.extraWeeks,
        add_cleaning: state.addCleaning,
        add_carrying: state.addCarrying,
        total_price: total,
        customer_name: state.name,
        customer_email: state.email,
        customer_phone: state.phone,
        customer_phone_country_code: state.phoneCountryCode,
        booking_number: generateBookingNumber(),
      })
      .returning({ id: bookings.id, bookingNumber: bookings.booking_number })

    // Confirmation email - non-blocking: a Sweego failure must not fail the booking.
    try {
      const { subject, html, text } = renderBookingConfirmation({
        bookingNumber: created.bookingNumber,
        name: state.name,
        boxCount: state.boxCount,
        deliveryAddress: state.deliveryAddress,
        deliveryPostcode: state.deliveryPostcode,
        pickupAddress: state.pickupAddress,
        pickupPostcode: state.pickupPostcode,
        deliveryDate: new Date(state.deliveryDate),
        pickupDate,
        totalWeeks: tier.base_weeks + state.extraWeeks,
        addCleaning: state.addCleaning,
        addCarrying: state.addCarrying,
        total,
      })

      const customer = await sendEmail({ to: state.email, toName: state.name, subject, html, text })
      if ('error' in customer) console.error('Confirmation email failed:', customer.error)

      // Internal notification (Sweego has no native BCC; separate send keeps the
      // customer's address private).
      const internal = await sendEmail({
        to: INTERNAL_EMAIL,
        subject: `Ny booking: ${created.bookingNumber}`,
        html,
        text,
      })
      if ('error' in internal) console.error('Internal booking email failed:', internal.error)
    } catch (err) {
      console.error('Confirmation email threw:', err)
    }

    // Meta Conversions API - server-side Purchase. Shares eventId with the
    // browser Pixel event so Meta deduplicates the two. Non-blocking: a Meta
    // failure must not fail the booking (sendCapiEvent never throws).
    const eventId = crypto.randomUUID()
    await sendCapiEvent({
      eventName: 'Purchase',
      eventId,
      eventSourceUrl: `${SITE_URL}/booking`,
      user: {
        email: state.email,
        phone: state.phone,
        phoneCountryCode: state.phoneCountryCode,
        firstName: firstName(state.name),
      },
      customData: { value: total, currency: 'DKK', num_items: state.boxCount },
    })

    return { id: created.id, bookingNumber: created.bookingNumber, eventId }
  } catch (err) {
    console.error('createBooking failed:', err)
    return { error: 'Noget gik galt. Prøv igen eller kontakt os på hey@heybox.dk' }
  }
}
