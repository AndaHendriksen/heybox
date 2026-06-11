'use client'

import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { BookingState } from '@/lib/booking/types'
import StepShell from './StepShell'

interface Props {
  booking: BookingState
  onChange: (partial: Partial<BookingState>) => void
  onNext: (partial?: Partial<BookingState>) => void
  onBack: () => void
}

const COUNTRY_CODES = [
  { code: '+45', label: '🇩🇰 +45' },
  { code: '+46', label: '🇸🇪 +46' },
  { code: '+47', label: '🇳🇴 +47' },
  { code: '+49', label: '🇩🇪 +49' },
  { code: '+44', label: '🇬🇧 +44' },
]

interface FormValues {
  name: string
  email: string
  phone: string
  phoneCountryCode: string
}

export default function StepContact({ booking, onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      phoneCountryCode: booking.phoneCountryCode,
    },
  })

  function onSubmit(data: FormValues) {
    onNext(data)
  }

  return (
    <StepShell
      title="Dine oplysninger"
      description="Så vi kan bekræfte din bestilling."
    >
      <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="name">Navn</Label>
          <Input
            id="name"
            placeholder="Mette Jensen"
            className={errors.name ? 'border-red-400' : ''}
            {...register('name', { required: 'Navn er påkrævet' })}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="mette@eksempel.dk"
            className={errors.email ? 'border-red-400' : ''}
            {...register('email', {
              required: 'E-mail er påkrævet',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Indtast en gyldig e-mailadresse',
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Telefon</Label>
          <div className="flex gap-2">
            <select
              className="h-12 border border-input bg-background px-2 text-sm"
              {...register('phoneCountryCode')}
            >
              {COUNTRY_CODES.map(({ code, label }) => (
                <option key={code} value={code}>{label}</option>
              ))}
            </select>
            <Input
              id="phone"
              type="tel"
              placeholder="20 12 34 56"
              className={errors.phone ? 'border-red-400 flex-1' : 'flex-1'}
              {...register('phone', {
                required: 'Telefon er påkrævet',
                minLength: { value: 8, message: 'Mindst 8 cifre' },
              })}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

      </form>
    </StepShell>
  )
}
