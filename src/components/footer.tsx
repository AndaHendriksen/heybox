import Link from "next/link"
import { CONTACT_EMAIL, LEGAL_NAME, LOCALITY } from "@/lib/seo"
import { Section } from "./ui/section"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

// Accurate, minimal footer. Only verifiably-true info — no phone number or
// social links (the previously commented-out placeholders were not real).
export function Footer() {
  return (
    <>
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
      <footer className="bg-gray-50 py-16 px-6 border-t border-gray-300 border-dashed">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="text-3xl font-bold tracking-tight mb-6">heybox!</div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Lej robuste flyttekasser til samme pris som pap. Vi leverer til din dør og henter igen. Altid gratis.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-6 text-zinc-900">Sider</h2>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link href="/" className="hover:text-primary transition-colors">Forside</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Om os</Link></li>
              <li><Link href="/#faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Vilkår og betingelser</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-6 text-zinc-900">Kontakt</h2>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>{LOCALITY}, Danmark</li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-zinc-200 text-sm text-zinc-400">
          &copy; {new Date().getFullYear()} {LEGAL_NAME}. Alle rettigheder forbeholdes.
        </div>
      </footer>
    </>
  )
}
