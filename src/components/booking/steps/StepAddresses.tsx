'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { BookingState } from '@/lib/booking-types'
import { isStorkobenhavn, extractPostcode } from '@/lib/storkobenhavn'
import StepShell from './StepShell'

interface Props {
  value: BookingState
  onChange: (partial: Partial<BookingState>) => void
  onNext: (partial?: Partial<BookingState>) => void
}

type ValidationState = 'idle' | 'valid' | 'invalid'

function getValidation(address: string): ValidationState {
  if (!address.trim()) return 'idle'
  const postcode = extractPostcode(address)
  if (!postcode) return 'idle'
  return isStorkobenhavn(postcode) ? 'valid' : 'invalid'
}

function AddressInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (val: string) => void
}) {
  const validation = getValidation(value)

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Fx: Gammel Kongevej 1, 1610 København V"
          className={`pr-10 ${
            validation === 'valid'
              ? 'border-primary focus-visible:ring-green-500'
              : validation === 'invalid'
              ? 'border-red-400 focus-visible:ring-red-400'
              : ''
          }`}
        />
        {validation === 'valid' && (
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
        )}
        {validation === 'invalid' && (
          <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
        )}
      </div>
      {validation === 'valid' && (
        <p className="text-xs text-green-600">Levering mulig</p>
      )}
      {validation === 'invalid' && (
        <p className="text-xs text-red-500">
          Vi leverer ikke her endnu.{' '}
          <a href="mailto:hej@heybox.dk" className="underline">
            Kontakt os
          </a>
        </p>
      )}
    </div>
  )
}

export default function StepAddresses({ value, onChange, onNext }: Props) {
  const fromValidation = getValidation(value.fromAddress)
  const toValidation = getValidation(value.toAddress)
  const canProceed = fromValidation === 'valid' && toValidation === 'valid'

  function handleNext() {
    const fromPostcode = extractPostcode(value.fromAddress) ?? ''
    const toPostcode = extractPostcode(value.toAddress) ?? ''
    onNext({ fromPostcode, toPostcode })
  }

  return (
    <StepShell
      title="Hvor skal vi levere?"
      description="Vi leverer kun i Storkøbenhavn."
    >
      <div className="space-y-5">
        <AddressInput
          id="from-address"
          label="Fra adresse"
          value={value.fromAddress}
          onChange={(v) => onChange({ fromAddress: v })}
        />
        <AddressInput
          id="to-address"
          label="Til adresse"
          value={value.toAddress}
          onChange={(v) => onChange({ toAddress: v })}
        />
      </div>

    </StepShell>
  )
}
