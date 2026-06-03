import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"

function CtaReadyToGoSection() {
  return (
    <Section className="my-24">
      <div className="p-4 md:p-20 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Klar til en flytning der bare kører?</h2>
          <p className="text-lg md:text-xl  mb-10 max-w-2xl mx-auto">
            Bestil dine kasser online på få minutter. Vi leverer, du pakker, vi henter. Ingen overraskelser, ingen ekstraomkostninger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-green-300">
                Beregn din pris
                <ArrowRight className="w-4 h-4 ml-1 -mr-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}

function CtaCloseBySection() {
  return (
    <Section className="my-24">
      <div className="p-4 md:p-20 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Bor du i området? Så er vi klar.
        </h2>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Beregn din pris på få minutter. Vi leverer kasserne til din dør og henter dem igen, når du er på plads.
        </p>
        <div className="flex justify-center">
          <Link href="/booking">
            <Button size="lg" className="bg-green-300">
              Beregn din pris
              <ArrowRight className="w-4 h-4 ml-1 -mr-3" />
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  )
}

export { CtaCloseBySection, CtaReadyToGoSection }