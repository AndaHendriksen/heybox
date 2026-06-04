import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import {
  koebenhavn,
  storkoebenhavn,
  NOT_COVERED_YET,
  type DeliveryLocation,
} from "@/lib/locations"
import { CtaCloseBySection } from "@/components/sections/cta"
import { H1, H2, P, Eyebrow } from "@/components/ui/text"

export const metadata: Metadata = {
  title: "Lokationer",
  description:
    "Vi leverer og henter flyttekasser i hele Storkøbenhavn - fra København K til Vedbæk. Se alle de byer og postnumre vi dækker.",
  alternates: { canonical: "/lokationer" },
  openGraph: {
    title: "Lokationer",
    description:
      "Vi leverer og henter flyttekasser i hele Storkøbenhavn - fra København K til Vedbæk. Se alle de byer og postnumre vi dækker.",
    url: "/lokationer",
    type: "website",
  },
}

export default function LocationsPage() {
  return (
    <>
      <LocationsHero />
      <LocationGrid title="København" locations={koebenhavn} />
      <LocationGrid title="Storkøbenhavn" locations={storkoebenhavn} />
      <NotCoveredNote />
      <CtaCloseBySection />
    </>
  )
}

function LocationsHero() {
  return (
    <Section>
      <div className="flex items-center border-x pt-24">
        <div className="max-w-[700px] mx-auto px-4">
          <Eyebrow>Lokationer</Eyebrow>
          <H1>Vi leverer i hele Storkøbenhavn.</H1>
          <P size="lead" className="mb-24">
            Vi leverer og henter flyttekasser i København og det meste af omegnen - altid gratis.
            Du angiver blot din leverings- og afhentningsadresse, når du booker, så klarer vi resten.
            Her er de byer og postnumre, vi dækker i dag.
          </P>
        </div>
      </div>
    </Section>
  )
}

function LocationGrid({
  title,
  locations,
}: Readonly<{ title: string; locations: DeliveryLocation[]; }>) {
  return (
    <Section className="-mb-px">
      <div className="border-x border-black pt-12">
        <H2 className="mb-0 lg:mb-0 px-4 lg:px-8 py-8 lg:py-12">
          {title}
        </H2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-[calc(100%+1px)]">
          {locations.map((loc) => (
            <li key={loc.code} className="bg-white -mt-px -ml-px px-4 lg:px-6 py-5 lg:py-6 border border-black">
              <span className="block font-bold uppercase">{loc.name}</span>
              <span className="block text-sm text-gray-500 mt-1">{loc.code}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

function NotCoveredNote() {
  return (
    <Section>
      <div className="flex items-center border-x border-b border-black py-16 md:py-24">
        <div className="max-w-[700px] mx-auto px-4">
          <Eyebrow>Endnu ikke</Eyebrow>
          <H2>Vi udvider løbende</H2>
          <P>
            Lige nu leverer vi endnu ikke i {formatList(NOT_COVERED_YET)}. Bor du lige uden for vores
            område? Skriv til os - så hører du fra os, så snart vi udvider.
          </P>
        </div>
      </div>
    </Section>
  )
}

function formatList(items: string[]): string {
  if (items.length <= 1) return items.join("")
  return `${items.slice(0, -1).join(", ")} og ${items[items.length - 1]}`
}
