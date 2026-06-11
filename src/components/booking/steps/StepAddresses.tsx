'use client'

import { useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { BookingState } from '@/lib/booking/types'
import { DELIVERY_LOCATIONS } from '@/lib/locations'
import StepShell from './StepShell'
import { P } from '@/components/ui/text'

const LOCATION_OPTIONS = [...DELIVERY_LOCATIONS].sort((a, b) => a.name.localeCompare(b.name))

interface Props {
  booking: BookingState
  onChange: (partial: Partial<BookingState>) => void
  onNext: (partial?: Partial<BookingState>) => void
}

function AddressLocationSelect({
  id,
  label,
  address,
  postcode,
  onSelect,
  onClear,
}: {
  id: string
  label: string
  address: string
  postcode: string
  onSelect: (address: string, postcode: string) => void
  onClear: () => void
}) {
  const locationOptions = useMemo(() => LOCATION_OPTIONS, [])
  const selectedLocation = locationOptions.find((location) => String(location.postcode) === postcode)
  const selectedValue = selectedLocation ? String(selectedLocation.postcode) : ''

  return (
    <div className="mb-8">
      <Label htmlFor={`${id}-location`}>{label}</Label>
      <div className="space-y-4 mt-2">
        <select
          id={`${id}-location`}
          value={selectedValue}
          onChange={(event) => {
            const selectedZipcode = event.target.value
            if (!selectedZipcode) {
              onClear()
              return
            }
            onSelect('', selectedZipcode)
          }}
          className="h-12 w-full border border-input px-3"
        >
          <option value="">Vælg by</option>
          {locationOptions.map((location) => (
            <option key={location.postcode} value={String(location.postcode)}>
              {location.name}
            </option>
          ))}
        </select>

        {selectedValue && (
          <>
            <P size="small" color="gray" className='mb-1'>På adressen</P>
            <Input
              id={`${id}-street`}
              value={address}
              onChange={(event) => onSelect(event.target.value, postcode)}
              placeholder="F.eks. Odinsvej 64, 2tv"
              autoComplete="street-address"
            />
          </>
        )}
      </div>
    </div>
  )
}

export default function StepAddresses({ booking, onChange }: Props) {
  return (
    <StepShell
      title="Hvor skal vi levere og afhente?"
      description="Vi leverer kun i Storkøbenhavn."
    >
      <div className="space-y-5">
        <AddressLocationSelect
          id="from-address"
          label="Leveres til"
          address={booking.deliveryAddress}
          postcode={booking.deliveryZipcode}
          onSelect={(address, postcode) => onChange({ deliveryAddress: address, deliveryZipcode: postcode })}
          onClear={() => onChange({ deliveryAddress: '', deliveryZipcode: '' })}
        />
        <AddressLocationSelect
          id="to-address"
          label="Afhentes fra"
          address={booking.pickupAddress}
          postcode={booking.pickupZipcode}
          onSelect={(address, postcode) => onChange({ pickupAddress: address, pickupZipcode: postcode })}
          onClear={() => onChange({ pickupAddress: '', pickupZipcode: '' })}
        />
      </div>
    </StepShell>
  )
}
