'use server'

import { and, asc, eq, gte, isNull, or } from 'drizzle-orm'
import { db } from '@/lib/db'
import { bookings, pricingTiers } from '@/lib/db/schema'
import type { BookingState } from '@/lib/booking/types'
import { calcTotal } from '@/lib/booking/utils'

function generateBookingNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rand = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  return `HB-${date}-${rand}`
}

export async function createBooking(
  state: BookingState,
): Promise<{ id: string; bookingNumber: string } | { error: string }> {
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

    if (!tier) return { error: 'Ingen aktiv prisliste fundet — kontakt os på hej@heybox.dk' }

    const pickupDate = new Date(state.deliveryDate)
    pickupDate.setDate(pickupDate.getDate() + (tier.base_weeks + state.extraWeeks) * 7)

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
        total_price: calcTotal(state),
        customer_name: state.name,
        customer_email: state.email,
        customer_phone: state.phone,
        customer_phone_country_code: state.phoneCountryCode,
        booking_number: generateBookingNumber(),
      })
      .returning({ id: bookings.id, bookingNumber: bookings.booking_number })

    return { id: created.id, bookingNumber: created.bookingNumber }
  } catch (err) {
    console.error('createBooking failed:', err)
    return { error: 'Noget gik galt. Prøv igen eller kontakt os på hej@heybox.dk' }
  }
}
