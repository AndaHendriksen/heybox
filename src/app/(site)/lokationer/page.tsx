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
      <LocationGrid title="Storkøbenhavn" locations={storkoebenhavn} hasBorderTop />
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
          <p className="md:text-lg border-b pb-4 mb-5 inline-block">Lokationer</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase font-black mb-4 lg:mb-6">
            Vi leverer i hele Storkøbenhavn.
          </h1>
          <p className="mb-24 md:text-lg lg:text-xl">
            Vi leverer og henter flyttekasser i København og det meste af omegnen - altid gratis.
            Du angiver blot din leverings- og afhentningsadresse, når du booker, så klarer vi resten.
            Her er de byer og postnumre, vi dækker i dag.
          </p>
        </div>
      </div>
    </Section>
  )
}

function LocationGrid({
  title,
  locations,
  hasBorderTop = false,
}: Readonly<{ title: string; locations: DeliveryLocation[]; hasBorderTop?: boolean }>) {
  return (
    <Section className="-mb-px">
      <div className={`border-x border-black ${hasBorderTop ? "border-t" : ""}`}>
        <h2 className="text-xl md:text-2xl lg:text-3xl uppercase font-black px-4 lg:px-8 py-8 lg:py-12">
          {title}
        </h2>
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
          <p className="md:text-lg border-b pb-4 mb-5 inline-block">Endnu ikke</p>
          <h2 className="text-xl md:text-2xl lg:text-3xl uppercase font-black mb-4 lg:mb-6">
            Vi udvider løbende
          </h2>
          <p className="md:text-lg lg:text-xl">
            Lige nu leverer vi endnu ikke i {formatList(NOT_COVERED_YET)}. Bor du lige uden for vores
            område? Skriv til os - så hører du fra os, så snart vi udvider.
          </p>
        </div>
      </div>
    </Section>
  )
}

function formatList(items: string[]): string {
  if (items.length <= 1) return items.join("")
  return `${items.slice(0, -1).join(", ")} og ${items[items.length - 1]}`
}
