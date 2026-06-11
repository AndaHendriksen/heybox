import { P } from '@/components/ui/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privatlivs- og cookiepolitik',
  description:
    'Sådan behandler heybox! dine personoplysninger og bruger cookies, herunder marketingcookies fra Facebook og Instagram.',
  alternates: { canonical: '/privatlivspolitik' },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Privatlivs- og cookiepolitik</h1>
        <P className="text-sm text-zinc-400 mb-10">Sidst opdateret: juni 2026</P>

        <div className="space-y-10 text-zinc-600 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">1. Dataansvarlig</h2>
            <P>
              Miko Cooperation, Frederikssund, Danmark, er dataansvarlig for behandlingen af de
              personoplysninger, vi indsamler om dig. Har du spørgsmål til denne politik eller
              ønsker du at gøre brug af dine rettigheder, kan du kontakte os på{' '}
              <a href="mailto:hey@heybox.dk" className="underline text-black">hey@heybox.dk</a>.
            </P>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">2. Hvilke oplysninger vi indsamler</h2>
            <P className="mb-3">
              Når du foretager en bestilling, indsamler vi de oplysninger, du selv afgiver: navn,
              email, telefonnummer samt leverings- og afhentningsadresse. Disse oplysninger er
              nødvendige for at kunne gennemføre din bestilling.
            </P>
            <P>
              Når du besøger vores hjemmeside, indsamler vi desuden tekniske oplysninger via cookies,
              hvis du har givet samtykke til det (se afsnit 5).
            </P>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">3. Formål og retsgrundlag</h2>
            <P className="mb-3">
              Vi behandler dine oplysninger for at kunne levere vores service (opfyldelse af aftale,
              jf. databeskyttelsesforordningens art. 6, stk. 1, litra b) og for at kommunikere med dig
              om din bestilling.
            </P>
            <P>
              Marketingcookies og måling af annoncer (se afsnit 5) behandles udelukkende på baggrund
              af dit samtykke, jf. art. 6, stk. 1, litra a. Du kan til enhver tid trække dit samtykke
              tilbage.
            </P>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">4. Videregivelse og databehandlere</h2>
            <P className="mb-3">
              Vi sælger aldrig dine oplysninger. Vi benytter en række databehandlere, der behandler
              oplysninger på vores vegne, herunder leverandører af hosting, database og email
              (afsendelse af bookingbekræftelser).
            </P>
            <P>
              Hvis du har givet samtykke til marketingcookies, deler vi desuden visse oplysninger med
              Meta Platforms (Facebook og Instagram) med henblik på at måle og målrette annoncer
              (se afsnit 5).
            </P>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">5. Cookies og Meta (Facebook/Instagram)</h2>
            <P className="mb-3">
              Vi anvender Meta Pixel og Metas Conversions API til at måle effekten af vores annoncer på
              Facebook og Instagram og til at vise relevante annoncer til personer, der ligner vores
              kunder. Disse værktøjer aktiveres <strong>kun</strong>, hvis du aktivt accepterer
              marketingcookies i vores cookiebanner.
            </P>
            <P className="mb-3">
              Når du har givet samtykke, kan der blive delt oplysninger med Meta om din adfærd på
              sitet — for eksempel hvilke trin i bestillingen du har gennemført, samt en krypteret
              (hashet) udgave af din email og dit telefonnummer ved en gennemført bestilling. Email og
              telefonnummer hashes, før de forlader vores server, så Meta ikke modtager dem i klartekst.
            </P>
            <P>
              Du kan til enhver tid ændre eller trække dit samtykke tilbage ved at rydde cookies i din
              browser eller kontakte os. Behandling, der allerede er sket på baggrund af dit samtykke,
              berøres ikke heraf.
            </P>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">6. Opbevaring</h2>
            <P>
              Vi opbevarer dine personoplysninger, så længe det er nødvendigt for at gennemføre og
              dokumentere dit kundeforhold, og i overensstemmelse med gældende lovgivning, herunder
              bogføringslovens regler. Herefter slettes eller anonymiseres oplysningerne.
            </P>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">7. Dine rettigheder</h2>
            <P className="mb-3">
              Du har ret til at få indsigt i, berigtige, slette eller begrænse behandlingen af dine
              personoplysninger, ret til dataportabilitet samt ret til at gøre indsigelse mod
              behandlingen. Du kan udøve dine rettigheder ved at kontakte os på{' '}
              <a href="mailto:hey@heybox.dk" className="underline text-black">hey@heybox.dk</a>.
            </P>
            <P>
              Du har desuden ret til at klage til Datatilsynet, hvis du er utilfreds med vores
              behandling af dine personoplysninger. Du finder kontaktoplysninger på{' '}
              <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer" className="underline text-black">datatilsynet.dk</a>.
            </P>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">8. Kontakt</h2>
            <P>
              Har du spørgsmål til vores behandling af dine personoplysninger, er du altid velkommen
              til at kontakte os på{' '}
              <a href="mailto:hey@heybox.dk" className="underline text-black">hey@heybox.dk</a>.
            </P>
          </section>

        </div>
      </div>
    </div>
  )
}
