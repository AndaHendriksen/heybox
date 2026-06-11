'use server'

import { count, and, asc, eq, gte, isNull, or } from 'drizzle-orm'
import { format } from 'date-fns';
import { db } from '@/lib/db'
import { bookings, pricingTiers } from '@/lib/db/schema'
import type { BookingState } from '@/lib/booking/types'
import { calcTotal } from '@/lib/booking/utils'
import { sendEmail } from '@/lib/email/sweego'
import { renderBookingConfirmation } from '@/lib/email/booking-confirmation'
import { sendCapiEvent } from '@/lib/analytics/meta-capi'
import { firstName } from '@/lib/utils/string'
import { SITE_URL } from '@/lib/seo'
import { formatToCleanDate } from '../utils';
import { combineAddressZipcodeCityAndCountry } from '../utils/geo';

const INTERNAL_EMAIL = 'hey@heybox.dk'

function generateBookingNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rand = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  return `HB-${date}-${rand}`
}

export async function createBooking(
  booking: BookingState,
): Promise<{ id: string; bookingNumber: string; eventId: string } | { error: string }> {
  if (!booking.deliveryDate) return { error: 'Leveringsdato mangler' }

  try {
    const [tier] = await db
      .select()
      .from(pricingTiers)
      .where(
        and(
          eq(pricingTiers.is_active, true),
          or(isNull(pricingTiers.max_boxes), gte(pricingTiers.max_boxes, booking.boxCount)),
        ),
      )
      .orderBy(asc(pricingTiers.max_boxes))
      .limit(1)

    if (!tier) return { error: 'Ingen aktiv prisliste fundet - kontakt os på hey@heybox.dk' }

    const pickupDate = new Date(booking.deliveryDate)
    pickupDate.setDate(pickupDate.getDate() + (tier.base_weeks + booking.extraWeeks) * 7)

    // Canonical total = what the customer was quoted on screen, incl. paid add-ons
    // (e.g. carrying). Cleaning is currently disabled in the UI but the calc stays
    // intact so it re-activates automatically once it's offered again.
    const total = calcTotal(booking)

    const delivery_date = formatToCleanDate(booking.deliveryDate);
    const pickup_date = formatToCleanDate(pickupDate);

    const [created] = await db
      .insert(bookings)
      .values({
        user_id: null,
        tier_id: tier.id,
        status: 'pending',
        delivery_address: combineAddressZipcodeCityAndCountry(booking.deliveryAddress, booking.deliveryZipcode),
        delivery_postcode: booking.deliveryZipcode,
        pickup_address: combineAddressZipcodeCityAndCountry(booking.pickupAddress, booking.pickupZipcode),
        pickup_postcode: booking.pickupZipcode,
        box_count: booking.boxCount,
        delivery_date,
        pickup_date,
        extra_weeks: booking.extraWeeks,
        add_cleaning: booking.addCleaning,
        add_carrying: booking.addCarrying,
        total_price: total,
        customer_name: booking.name,
        customer_email: booking.email,
        customer_phone: booking.phone,
        customer_phone_country_code: booking.phoneCountryCode,
        booking_number: generateBookingNumber(),
      })
      .returning({ id: bookings.id, bookingNumber: bookings.booking_number })

    // Confirmation email - non-blocking: a Sweego failure must not fail the booking.
    try {
      const { subject, html, text } = renderBookingConfirmation({
        bookingNumber: created.bookingNumber,
        name: booking.name,
        boxCount: booking.boxCount,
        deliveryAddress: booking.deliveryAddress,
        deliveryZipcode: booking.deliveryZipcode,
        pickupAddress: booking.pickupAddress,
        pickupZipcode: booking.pickupZipcode,
        deliveryDate: new Date(booking.deliveryDate),
        pickupDate,
        totalWeeks: tier.base_weeks + booking.extraWeeks,
        addCleaning: booking.addCleaning,
        addCarrying: booking.addCarrying,
        total,
      })

      const customer = await sendEmail({ to: booking.email, toName: booking.name, subject, html, text })
      if ('error' in customer) console.error('Confirmation email failed:', customer.error)

      // Internal notification (Sweego has no native BCC; separate send keeps the
      // customer's address private).
      const internal = await sendEmail({
        to: INTERNAL_EMAIL,
        subject: `Ny booking modtaget!`,
        text: 'Ny booking modtaget!'
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
        email: booking.email,
        phone: booking.phone,
        phoneCountryCode: booking.phoneCountryCode,
        firstName: firstName(booking.name),
      },
      customData: { value: total, currency: 'DKK', num_items: booking.boxCount },
    })

    return { id: created.id, bookingNumber: created.bookingNumber, eventId }
  } catch (err) {
    console.error('createBooking failed:', err)
    return { error: 'Noget gik galt. Prøv igen eller kontakt os på hey@heybox.dk' }
  }
}

export async function isBookingDateAvailable(
  date: string,
): Promise<number> {
  try {
    const [result] = await db
      .select({ count: count() })
      .from(bookings)
      .where(
        eq(bookings.delivery_date, date)
      );

    console.log('count', result.count)

    // if (result.count > 80) return false

    return result.count
  } catch (err) {
    console.error('createBooking failed:', err)
    return 0
  }
}