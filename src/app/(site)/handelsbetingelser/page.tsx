import { P } from '@/components/ui/text'
import Link from 'next/link'

export const metadata = {
  title: 'Vilkår og betingelser',
  alternates: { canonical: '/handelsbetingelser' },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Handelsbetingelser</h1>
        <P className="text-sm text-zinc-400 mb-10">Sidst opdateret: maj 2025</P>

        <div className="space-y-10 text-zinc-600 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">1. Virksomhedsoplysninger</h2>
            <P>
              HeyBox er en service leveret af HeyBox ApS, København, Danmark.
              Kontakt: <a href="mailto:hey@heybox.dk" className="underline text-black">hey@heybox.dk</a>.
            </P>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">2. Serviceydelsen</h2>
            <P className="mb-3">
              HeyBox tilbyder kortidsudlejning af flyttekasser til privatpersoner i Storkøbenhavn.
              Kasserne leveres til og hentes fra den adresse, der er angivet ved bestilling.
            </P>
            <P>
              Vi forbeholder os retten til at afvise eller annullere bestillinger, der falder uden
              for vores serviceområde eller af andre driftsmæssige årsager.
            </P>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">3. Bestilling og betaling</h2>
            <P className="mb-3">
              En bestilling er bindende, når du modtager en bekræftelse fra HeyBox.
              Betaling sker kontant via MobilePay ved levering af kasserne.
            </P>
            <P>
              Prisen beregnes på baggrund af antal kasser, lejeperiode og eventuelle tilvalg
              som bæring eller rengøring. Den endelige pris fremgår af din bookingbekræftelse.
              Alle priser er inkl. moms.
            </P>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">4. Afbestilling og ændringer</h2>
            <P className="mb-3">
              Afbestilling eller ændring af en bestilling skal ske senest <strong>48 timer</strong> inden
              den aftalte leveringsdato ved at kontakte os på{' '}
              <a href="mailto:hey@heybox.dk" className="underline text-black">hey@heybox.dk</a>.
            </P>
            <P>
              Ved afbestilling med kortere varsel end 48 timer forbeholder HeyBox sig retten til at
              opkræve et gebyr svarende til ét dagsleje.
            </P>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">5. Brugerens ansvar</h2>
            <P className="mb-3">
              Du er ansvarlig for kasserne fra tidspunktet for levering til og med afhentning.
              Kasserne skal behandles forsvarligt og returneres i den stand, de blev modtaget i.
            </P>
            <P>
              Beskadigede eller bortkomne kasser faktureres til en erstatningspris på
              <strong> 75 kr. pr. kasse</strong>, som opkræves via MobilePay.
            </P>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">6. Levering og afhentning</h2>
            <P className="mb-3">
              HeyBox leverer og afhenter inden for Storkøbenhavn (postnumre 1000–2959 med enkelte
              undtagelser). Du vil modtage et tidsvindue for levering og afhentning via email eller SMS.
            </P>
            <P>
              Der skal være en myndig person til stede ved levering og afhentning, medmindre andet
              er aftalt skriftligt. Hvis vi ikke kan komme til, forbeholder vi os retten til at
              opkræve et forgæves-kørsel-gebyr.
            </P>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">7. Lejeperiode og forlængelse</h2>
            <P className="mb-3">
              Lejeperioden fremgår af din bookingbekræftelse og varierer afhængigt af antal kasser.
              Ønsker du at forlænge lejeperioden, skal du kontakte os senest 2 dage inden den
              aftalte afhentningsdato.
            </P>
            <P>
              Forlængelse faktureres til den til enhver tid gældende ugepris og betales via MobilePay.
            </P>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">8. Privatlivspolitik</h2>
            <P className="mb-3">
              HeyBox behandler dine personoplysninger (navn, adresse, email, telefonnummer) udelukkende
              til brug for at gennemføre din bestilling og kommunikere med dig om den.
            </P>
            <P className="mb-3">
              Vi sælger eller deler ikke dine oplysninger med tredjepart, medmindre det er nødvendigt
              for at levere vores service (f.eks. betalingsbehandling). Oplysningerne opbevares sikkert
              og slettes efter endt kundeforhold i henhold til gældende lovgivning (GDPR).
            </P>
            <P>
              Du har til enhver tid ret til indsigt i, rettelse af eller sletning af dine
              personoplysninger ved at kontakte{' '}
              <a href="mailto:hey@heybox.dk" className="underline text-black">hey@heybox.dk</a>.
            </P>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">9. Kontakt</h2>
            <P>
              Har du spørgsmål til disse vilkår eller din bestilling, er du altid velkommen til at
              kontakte os på{' '}
              <a href="mailto:hey@heybox.dk" className="underline text-black">hey@heybox.dk</a>.
              Vi bestræber os på at svare inden for én arbejdsdag.
            </P>
          </section>

        </div>
      </div>
    </div>
  )
}
