import { formatTotal } from '@/lib/booking/utils'
import { firstName } from '@/lib/utils/string'

// Pure builder for the customer booking-confirmation email.
// No I/O — returns { subject, html, text } so it can be previewed/tested in isolation.
// HTML uses inline styles + tables only (email clients ignore <style>/Tailwind).

export interface BookingConfirmationData {
  bookingNumber: string
  name: string
  boxCount: number
  deliveryAddress: string
  deliveryPostcode: string
  pickupAddress: string
  pickupPostcode: string
  deliveryDate: Date
  pickupDate: Date
  totalWeeks: number
  addCleaning: boolean
  addCarrying: boolean
  total: number // canonical total = calcTotalWithoutAddons (matches the screen)
}

function formatDanishDate(date: Date): string {
  const s = date.toLocaleDateString('da-DK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function renderBookingConfirmation(data: BookingConfirmationData): {
  subject: string
  html: string
  text: string
} {
  const greetingName = firstName(data.name)
  const subject = `Tak for din bestilling – ${data.bookingNumber}`

  const vat = data.total / 5
  const deliveryDate = formatDanishDate(data.deliveryDate)
  const pickupDate = formatDanishDate(data.pickupDate)
  const cleaningLabel = data.addCleaning
    ? 'Vi rengør kasserne'
    : 'I rengør selv kasserne inden afhentning'
  // Bæring er for nu altid inkluderet uden merpris (jf. StepApology), uanset addCarrying.
  const carryingLabel = 'Båret ind/op i lejligheden (uden merpris)'

  // ---- Plain-text version ----
  const text = [
    `Kære ${greetingName},`,
    ``,
    `Tak for din bestilling hos heybox! Her er din ordrebekræftelse.`,
    ``,
    `Bookingnummer: ${data.bookingNumber}`,
    ``,
    `DIN BESTILLING`,
    `Antal kasser: ${data.boxCount}`,
    `Levering: ${deliveryDate} — ${data.deliveryAddress}, ${data.deliveryPostcode}`,
    `Afhentning: ${pickupDate} — ${data.pickupAddress}, ${data.pickupPostcode}`,
    `Lejeperiode: ${data.totalWeeks} uger`,
    `Rengøring: ${cleaningLabel}`,
    `Bæring: ${carryingLabel}`,
    ``,
    `Total inkl. moms: ${formatTotal(data.total)} (heraf moms 25%: ${formatTotal(vat)})`,
    `Betales via MobilePay ved levering.`,
    ``,
    `HVAD SKER DER NU?`,
    `1. Vi skriver til dig kort tid inden vi leverer på leveringsdagen.`,
    `2. Vi leverer kasserne på den valgte dato — du betaler via MobilePay.`,
    `3. Vi henter kasserne igen på afhentningsdatoen.`,
    ``,
    `Spørgsmål? Skriv til os på hey@heybox.dk.`,
    ``,
    `Med venlig hilsen`,
    `heybox`,
  ].join('\n')

  // ---- HTML version ----
  const detailRow = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 0;color:#71717a;font-size:14px;vertical-align:top;width:120px;">${label}</td>
      <td style="padding:6px 0;color:#18181b;font-size:14px;font-weight:600;">${value}</td>
    </tr>`

  const html = `<!DOCTYPE html>
<html lang="da">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="width:480px;max-width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;">
        <tr><td style="padding:28px 32px 8px 32px;">
          <p style="margin:0;font-size:22px;font-weight:800;letter-spacing:-0.5px;text-transform:lowercase;color:#000000;">heybox!</p>
        </td></tr>

        <tr><td style="padding:8px 32px 0 32px;">
          <h1 style="margin:0 0 12px 0;font-size:22px;font-weight:700;color:#18181b;">Kære ${greetingName},</h1>
          <p style="margin:0 0 16px 0;font-size:15px;line-height:1.5;color:#52525b;">Tak for din bestilling hos heybox! Her er din ordrebekræftelse.</p>
        </td></tr>

        <tr><td style="padding:0 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fafafa;border-radius:12px;">
            <tr><td style="padding:14px 18px;">
              <p style="margin:0 0 2px 0;font-size:12px;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.5px;">Bookingnummer</p>
              <p style="margin:0;font-size:22px;font-weight:700;font-family:'Courier New',monospace;letter-spacing:1px;color:#000000;">${data.bookingNumber}</p>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:20px 32px 0 32px;">
          <p style="margin:0 0 6px 0;font-size:12px;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.5px;">Din bestilling</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${detailRow('Antal kasser', String(data.boxCount))}
            ${detailRow('Levering', `${deliveryDate}<br><span style="font-weight:400;color:#52525b;">${data.deliveryAddress}, ${data.deliveryPostcode}</span>`)}
            ${detailRow('Afhentning', `${pickupDate}<br><span style="font-weight:400;color:#52525b;">${data.pickupAddress}, ${data.pickupPostcode}</span>`)}
            ${detailRow('Lejeperiode', `${data.totalWeeks} uger`)}
            ${detailRow('Rengøring', cleaningLabel)}
            ${detailRow('Bæring', carryingLabel)}
          </table>
        </td></tr>

        <tr><td style="padding:18px 32px 0 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fafafa;border-radius:12px;">
            <tr><td style="padding:14px 18px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px;color:#a1a1aa;padding-bottom:4px;">Heraf moms 25%</td>
                  <td align="right" style="font-size:12px;color:#a1a1aa;padding-bottom:4px;">${formatTotal(vat)}</td>
                </tr>
                <tr>
                  <td style="font-size:15px;color:#52525b;">Total inkl. moms</td>
                  <td align="right" style="font-size:22px;font-weight:700;color:#000000;">${formatTotal(data.total)}</td>
                </tr>
              </table>
              <p style="margin:8px 0 0 0;font-size:12px;color:#a1a1aa;">Betales via MobilePay ved levering.</p>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:22px 32px 0 32px;">
          <p style="margin:0 0 10px 0;font-size:13px;font-weight:600;color:#18181b;">Hvad sker der nu?</p>
          <p style="margin:0 0 8px 0;font-size:14px;color:#52525b;"><span style="color:#d4d4d8;font-weight:700;">1.</span>&nbsp; Vi skriver til dig kort tid inden vi leverer på leveringsdagen.</p>
          <p style="margin:0 0 8px 0;font-size:14px;color:#52525b;"><span style="color:#d4d4d8;font-weight:700;">2.</span>&nbsp; Vi leverer kasserne på den valgte dato — du betaler via MobilePay.</p>
          <p style="margin:0;font-size:14px;color:#52525b;"><span style="color:#d4d4d8;font-weight:700;">3.</span>&nbsp; Vi henter kasserne igen på afhentningsdatoen.</p>
        </td></tr>

        <tr><td style="padding:24px 32px 28px 32px;">
          <p style="margin:0;font-size:13px;color:#a1a1aa;line-height:1.5;">Spørgsmål? Skriv til os på <a href="mailto:hey@heybox.dk" style="color:#18181b;">hey@heybox.dk</a>.<br>Med venlig hilsen, heybox</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return { subject, html, text }
}
