import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Ofte stillede spørgsmål",
  description:
    "Svar på de ofte stillede spørgsmål om heybox og vores flyttekasse-service i Storkøbenhavn.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Ofte stillede spørgsmål",
    description:
      "Svar på de ofte stillede spørgsmål om heybox og vores flyttekasse-service i Storkøbenhavn.",
    url: "/faq",
    type: "website",
  },
}

export default function FAQPage() {
  return (
    <div className="px-4 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
            Ofte stillede spørgsmål
          </h1>

          <div className="space-y-6 text-lg text-black/70 leading-relaxed">
            <p>
              heybox er en flyttekasse-service i Storkøbenhavn. Vi lejer robuste
              plastkasser ud til præcis samme pris, som det koster at købe papkasser i
              byggemarkedet — men uden turen derhen, uden slæbet hjem og uden bunken af
              affald bagefter. Vi leverer kasserne til din dør og henter dem igen, når du
              er på plads i din nye bolig.
            </p>

            <h2 className="text-2xl font-bold tracking-tight pt-4">Hvorfor vi gør det</h2>
            <p>
              Hver gang nogen flytter, ender bunkevis af papkasser ofte som engangsaffald.
              Standard papkasser i bølgepap tåler typisk kun nogle få genbrug, og på
              landsplan løber det op i millioner af kasser og tusindvis af ton papaffald
              hvert eneste år. Vores plastkasser er bygget til at blive brugt igen og igen
              — samme kasser, mange flytninger, ingen affaldsbjerge.
            </p>

            <h2 className="text-2xl font-bold tracking-tight pt-4">Sådan virker det</h2>
            <p>
              Du vælger en leveringsdato, vi leverer kasserne gratis, du pakker og flytter,
              og vi henter kasserne igen på den aftalte dato. Ingen tape, ingen samling,
              ingen oprydning.
            </p>

            <h2 className="text-2xl font-bold tracking-tight pt-4">Kontakt</h2>
            <p>
              heybox drives af HeyBox ApS i København. Har du spørgsmål, er du altid
              velkommen til at skrive til{" "}
              <a href="mailto:hey@heybox.dk" className="underline hover:text-primary transition-colors">
                hey@heybox.dk
              </a>
              .
            </p>

            <div className="pt-6">
              <Link href="/booking">
                <Button size="lg" className="bg-green-300">
                  Beregn din pris <ArrowRight className="w-6 h-6 ml-1 -mr-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}
