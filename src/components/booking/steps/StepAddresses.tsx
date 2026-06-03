'use client'

import { useState, useEffect, useRef } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { BookingState } from '@/lib/booking/types'
import { isStorkobenhavn } from '@/lib/utils/geo'
import StepShell from './StepShell'

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''

let mapsReady = false
const pendingCallbacks: Array<() => void> = []

function loadMapsScript() {
  if (typeof window === 'undefined') return
  if (document.getElementById('gmaps-script')) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).__gmapsInit = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).google.maps.importLibrary('places').then(() => {
      mapsReady = true
      pendingCallbacks.splice(0).forEach((fn) => fn())
    })
  }
  const script = document.createElement('script')
  script.id = 'gmaps-script'
  script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&loading=async&callback=__gmapsInit`
  script.async = true
  script.defer = true
  document.head.appendChild(script)
}

function whenMapsReady(fn: () => void) {
  if (mapsReady) { fn(); return }
  pendingCallbacks.push(fn)
  loadMapsScript()
}

interface Prediction {
  placeId: string
  description: string
}

interface Props {
  value: BookingState
  onChange: (partial: Partial<BookingState>) => void
  onNext: (partial?: Partial<BookingState>) => void
}

function AddressAutocomplete({
  id,
  label,
  initialValue,
  postcode,
  onSelect,
  onClear,
}: {
  id: string
  label: string
  initialValue: string
  postcode: string
  onSelect: (address: string, postcode: string) => void
  onClear: () => void
}) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [suggestions, setSuggestions] = useState<Prediction[]>([])
  const [open, setOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sessionTokenRef = useRef<any>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    whenMapsReady(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const g = (window as any).google
      sessionTokenRef.current = new g.maps.places.AutocompleteSessionToken()
    })
  }, [])

  function fetchSuggestions(input: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => void doFetch(input), 300)
  }

  async function doFetch(input: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g = (window as any).google
    if (!g?.maps?.places?.AutocompleteSuggestion || input.length < 3) {
      setSuggestions([])
      setOpen(false)
      return
    }
    try {
      const { suggestions } = await g.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input,
        sessionToken: sessionTokenRef.current,
        includedRegionCodes: ['dk'],
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const preds: Prediction[] = suggestions.map((s: any) => ({
        placeId: s.placePrediction.placeId,
        description: s.placePrediction.text.toString(),
      }))
      setSuggestions(preds)
      setOpen(preds.length > 0)
    } catch {
      setSuggestions([])
      setOpen(false)
    }
  }

  async function handleSelect(suggestion: Prediction) {
    setOpen(false)
    setSuggestions([])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g = (window as any).google
    try {
      const place = new g.maps.places.Place({ id: suggestion.placeId })
      await place.fetchFields({
        fields: ['formattedAddress', 'addressComponents'],
        sessionToken: sessionTokenRef.current,
      })
      sessionTokenRef.current = new g.maps.places.AutocompleteSessionToken()
      const address: string = place.formattedAddress ?? suggestion.description
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const components: any[] = place.addressComponents ?? []
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pc: string = components.find((c: any) => c.types.includes('postal_code'))?.shortText ?? ''
      setInputValue(address)
      onSelect(address, pc)
    } catch {
      setInputValue(suggestion.description)
      onSelect(suggestion.description, '')
    }
  }

  const validation = postcode
    ? isStorkobenhavn(postcode) ? ('valid' as const) : ('invalid' as const)
    : ('idle' as const)

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          value={inputValue}
          onChange={(e) => {
            const v = e.target.value
            setInputValue(v)
            onClear()
            fetchSuggestions(v)
          }}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Fx: Gammel Kongevej 1, 1610 København V"
          autoComplete="off"
          className={`pr-10 ${
            validation === 'valid'
              ? 'focus-visible:ring-green-500'
              : validation === 'invalid'
              ? 'border-red-400 focus-visible:ring-red-400'
              : ''
          }`}
        />
        {validation === 'valid' && (
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-green-500" />
        )}
        {validation === 'invalid' && (
          <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-red-400" />
        )}
        {open && suggestions.length > 0 && (
          <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 shadow-lg max-h-60 overflow-auto text-sm">
            {suggestions.map((s) => (
              <li
                key={s.placeId}
                onMouseDown={() => void handleSelect(s)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-50"
              >
                {s.description}
              </li>
            ))}
          </ul>
        )}
      </div>
      {validation === 'invalid' && (
        <p className="text-xs text-red-500">
          Vi leverer ikke her endnu.
        </p>
      )}
    </div>
  )
}

export default function StepAddresses({ value, onChange }: Props) {
  return (
    <StepShell
      title="Hvor skal vi levere?"
      description="Vi leverer kun i Storkøbenhavn."
    >
      <div className="space-y-5">
        <AddressAutocomplete
          id="from-address"
          label="Leveres til"
          initialValue={value.deliveryAddress}
          postcode={value.deliveryPostcode}
          onSelect={(address, postcode) => onChange({ deliveryAddress: address, deliveryPostcode: postcode })}
          onClear={() => onChange({ deliveryAddress: '', deliveryPostcode: '' })}
        />
        <AddressAutocomplete
          id="to-address"
          label="Afhentes fra"
          initialValue={value.pickupAddress}
          postcode={value.pickupPostcode}
          onSelect={(address, postcode) => onChange({ pickupAddress: address, pickupPostcode: postcode })}
          onClear={() => onChange({ pickupAddress: '', pickupPostcode: '' })}
        />
      </div>
    </StepShell>
  )
}
