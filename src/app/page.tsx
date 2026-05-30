'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon, ArrowRight } from "lucide-react";
import { Menu } from "@/components/menu";

export default function Landing() {
  return (
    <div className="min-h-screen bg-olive-100 text-zinc-900 font-sans selection:bg-primary selection:text-white">
      <Menu />
      <Hero />
      <NoDriving />
      <HowItWorks />
      <BoxQuality />
      <NoCleanup />
      <CardboardIntro />
      <CardboardStats />
      <CardboardReuse />
      <CardboardSources />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
      <section className="max-w-[900px] mx-auto relative z-60 mb-1 md:mt-18">
        <div className="min-h-[80vh] flex flex-col justify-end p-4 mx-auto">
          <div className="h-full flex items-center md:mt-12 mb-2">
            <div className="px-3 md:1/3 lg:w-1/2 mx-auto relative mt-32 lg:mt-8">
                <img
                  src="/images/heybox-angle-modified.png"
                  alt="Grønne plastikflyttekasser fra HeyBox stablet i en lys stue"
                  className="w-full"
                />
              <div className="absolute z-60 -top-[14%] left-[64%] md:left-[70%] md:top-[6%] lg:left-[82%] w-[110%] lg:w-full -translate-[80%] md:-translate-[100%]">
                <div className="text-left -rotate-25 pl-[25%] lg:pl-0">
                  <p className="leading-4 text-gray-400">Samme pris som pap</p>
                  <p className="font-bold lg:text-2xl my-0.5">Fra 13.95 kr/kasse</p>
                  {/* <p className="leading-4 text-gray-400">Inkl. levering og afhentning</p> */}
                </div>
                <img
                  src="/arrow-down-01.svg" alt="Lej flyttekasser fra 15.95kr"
                  className="ml-[50%] mt-1 md:ml-[40%] md:mt-8 w-16 lg:ml-28 lg:mt-15 lg:w-20" />
              </div>
            </div>
          </div>
          <div className="h-full flex items-center justify-center text-center pb-24">
            <div className="">
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold leading-[1.2] tracking-tight mb-4">
                Lej flyttekasser billigt og nemt i København
              </h1>
              <p className="text-lg md:text-xl text-black/50 mb-12 md:text-balance">
                Lej robuste plastikkasser fra samme priser som at købe papkasser i byggemarkedet og slæbe dem hjem selv.
              </p>
              
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6">
                <div>
                  <Link href="/booking">
                    <Button size="lg" className="text-white rounded-full">
                      Beregn din pris
                    </Button>
                  </Link>
                </div>
                <div className="inline-block">
                  <ul className="md:text-lg mb-10">
                    <li className="flex gap-2 items-center"><CheckIcon className="w-6 h-6 text-primary" />Inkl. levering</li>
                    <li className="flex gap-2 items-center"><CheckIcon className="w-6 h-6 text-primary" />Inkl. afhentning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

function NoDriving() {
  return (
    <Section>
      <Card className="min-h-[60vh] p-4 lg:px-8 grid lg:grid-cols-2 items-center justify-center">
        <div className="lg:pl-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight mb-4">
            Ingen tur til byggemarkedet
          </h2>
          <p className="text-lg md:text-xl text-black/50 mb-12">
            Drop køen i byggemarkedet. Vores kasser koster det samme som papkasser, men vi leverer dem direkte til din dør, så du kan bruge tiden på det der betyder noget.
          </p>
          <Link href="/booking">
            <Button size="lg" className="text-white rounded-full">
              Beregn din pris
            </Button>
          </Link>
        </div>
        <div className="order-first lg:order-last lg:mt-8">
          <img
            src="/images/3d-icon-crowded-bus.png"
            // src="/images/3d-icon-byggemarked.png"
            alt="Grønne plastikflyttekasser fra HeyBox stablet i en lys stue"
            className="w-2/3 md:w-1/3 lg:w-2/3 lg:mx-auto"
          />
        </div>
      </Card>
    </Section>
  )
}

function BoxQuality() {
  return (
    <Section>
      <Card className="min-h-[60vh] p-4 lg:px-8 grid lg:grid-cols-2 items-center justify-center">
          <div className="relative md:mt-32 lg:mt-8">
            <img
              src="/images/3d-icon-weight.png"
              alt="Grønne plastikflyttekasser fra HeyBox stablet i en lys stue"
              className="w-2/3 md:w-1/3 lg:w-2/3 lg:m-auto"
            />
          </div>
          <div>
          <div className="lg:pr-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight mb-4">
              Stærkere og nemmere end pap
            </h2>
            <p className="text-lg md:text-xl text-black/50 mb-6">
              Ingen kasser der skal samles med tape. Ingen bunde der falder ud. Vores kasser er robuste, stables perfekt og lukkes med et enkelt klik.
            </p>
            <div>
              <Link href="/booking">
                <Button size="lg" className="text-white rounded-full">
                  Beregn din pris
                </Button>
              </Link>
            </div>
          </div>
          </div>
      </Card>
    </Section>
  )
}

function NoCleanup() {
  return (
      <Section>
        <Card className="min-h-[60vh] p-4 lg:px-8 grid lg:grid-cols-2 items-center justify-center">
          <div className="lg:pl-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight mb-4">
              Intet oprydningsarbejde bagefter
            </h2>
            <p className="text-lg md:text-xl text-black/50 mb-12">
              Med papkasser sidder du tilbage med et bjerg af affald når flytningen er overstået. Vi sørger for at hente kasserne, så du bare kan slappe af og nyde dit nye sted.
            </p>
            <Link href="/booking">
              <Button size="lg" className="text-white rounded-full">
                Beregn din pris
              </Button>
            </Link>
          </div>
          <div className="order-first lg:order-last lg:mt-8">
            <img
              src="/images/3d-icon-sleep-cocoon.png"
              alt="Grønne plastikflyttekasser fra HeyBox stablet i en lys stue"
              className="w-2/3 md:w-1/3 lg:w-2/3 lg:m-auto"
            />
          </div>
        </Card>
      </Section>
  )
}



const STATS = {
  flytningerPerAar: 861718,        // DST 2025 (per person via CPR)
  gnsPersonerPerBolig: 2.1,        // DST husstandssnit. Research bruger 1,7 pr. flytning (solomoves trækker ned)
  gnsBoligM2: 79.1,                // Bolius: gns. lejlighed. Hel bolig, ikke pr. person. Research-midtpunkt ~80 m²
  kasserPerM2: 1,                  // Tommelfingerregel
  genbrugPerKasse: 5,              // United Container (middelscenarie)
  papkasseVaegtKg: 1.2,            // ca. 1200g per standard papkasse (Silvan/Bauhaus-snit)
}

// Alle viste tal udregnes fra STATS, så de altid er konsistente.
const boligflytningerPerAar = STATS.flytningerPerAar / STATS.gnsPersonerPerBolig
const kasseanvendelserPerAar = boligflytningerPerAar * STATS.gnsBoligM2 * STATS.kasserPerM2
const kasserSmidtUdPerAar = kasseanvendelserPerAar / STATS.genbrugPerKasse
const tonPapAffaldPerAar = (kasserSmidtUdPerAar * STATS.papkasseVaegtKg) / 1000

const formatMio = (n: number) =>
  `~${(n / 1_000_000).toLocaleString("da-DK", { maximumFractionDigits: 1 })} mio.`
const formatTon = (n: number) => `~${Math.round(n).toLocaleString("da-DK")} ton`

function CardboardIntro() {
  return (
    <Section className="mt-24 md:mt-32 mb-16">
      <div className="mx-auto text-center">
        <p className="text-primary font-semibold uppercase tracking-wide mb-4">Danmark drukner i flyttepap</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight mb-4">
          Estimeret {formatTon(tonPapAffaldPerAar)} papaffald om året
        </h2>
        <p className="text-lg md:text-xl text-black/50 text-balance">
          Hver gang nogen flytter, ender bunkevis af papkasser ofte som engangsaffald. På landsplan løber det hurtigt op i tal, der er svære at forestille sig.
        </p>
      </div>
    </Section>
  )
}

function Stat({ value, label, source }: Readonly<{ value: string, label: string, source?: string }>) {
  return (
    <Card className="p-6 lg:p-8 text-center flex flex-col items-center justify-center">
      <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-none mb-3">
        {value}
      </span>
      <p className="text-gray-500 leading-snug">{label}</p>
      {source && <p className="text-xs text-gray-400 mt-3">{source}</p>}
    </Card>
  )
}

function CardboardStats() {
  return (
    <Section>
      <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-1">
        <Stat
          value={STATS.flytningerPerAar.toLocaleString("da-DK")}
          label="adresseflytninger i Danmark hvert år"
          source="Danmarks Statistik, 2025"
        />
        <Stat
          value={formatMio(kasseanvendelserPerAar)}
          label="flyttekasser bruges årligt ved flytninger"
          source="Estimat (DST + Bolius/KL)"
        />
        <Stat
          value={formatMio(kasserSmidtUdPerAar)}
          label="papkasser smides ud hvert år"
          source={`Estimat (${STATS.genbrugPerKasse} genbrug pr. kasse)`}
        />
      </div>
    </Section>
  )
}

function CardboardReuse() {
  return (
    <Section>
      <Card className="p-4 lg:px-8 lg:py-16 grid lg:grid-cols-2 items-center justify-center">
        <div className="lg:pl-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight mb-4">
            En papkasse holder ikke længe
          </h2>
          <p className="text-lg md:text-xl text-black/50 mb-6">
            Standard flyttekasser i bølgepap tåler typisk kun 2-6 genbrug, og fugt eller dårlig opbevaring forkorter ofte levetiden yderligere. Derfor ender millioner af kasser som affald hvert år.
          </p>
          <p className="text-lg md:text-xl text-black/50">
            Vores plastkasser er bygget til at blive brugt igen og igen - samme kasser, mange flytninger, ingen affaldsbjerge.
          </p>
        </div>
        <div className="order-first lg:order-last lg:mt-8">
          <img
            src="/images/3d-icon-trashedbox.png"
            alt="Brugte papkasser der ender som affald efter en flytning"
            className="w-2/3 md:w-1/3 lg:w-full lg:mx-auto"
          />
        </div>
      </Card>
    </Section>
  )
}

function CardboardSources() {
  const sources = [
    {
      label: "Danmarks Statistik (Flytninger)",
      href: "https://www.dst.dk/da/Statistik/emner/borgere/flytninger/flytninger-i-danmark",
    },
    {
      label: "Bolius (Boligstørrelser)",
      href: "https://www.bolius.dk/hvor-stort-er-et-gennemsnitligt-hus-og-lejlighed-i-danmark-36883",
    },
    {
      label: "KL (Boligstørrelse pr. ejer/lejer)",
      href: "https://www.kl.dk/analyser/analyser/demografi-og-befolkning/udviklingen-i-den-gennemsnitlige-boligstoerrelse",
    },
    {
      label: "United Container (Kasselevetid)",
      href: "https://unitedcontainer.com/how-many-times-can-cardboard-boxes-be-used-before-recycling",
    },
  ]
  return (
    <Section>
      <div className="text-center mx-auto text-xs text-black/40 mt-4">
        <p className="mb-2">
          Flyttetal opgøres pr. person (CPR) af Danmarks Statistik. Antallet af kasser og nye kasser pr. år er estimater baseret på gennemsnitlige boligstørrelser og genbrugsrater og kan variere.
        </p>
        <p>
          Kilder:{" "}
          {sources.map((s, i) => (
            <span key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
              >
                {s.label}
              </a>
              {i < sources.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </div>
    </Section>
  )
}

function HowItWorks() {
  return (
    <Section>
      <div className="max-w-[1500px] mx-auto">
        <div className="grid md:grid-cols-3 gap-1 relative">
          <Card className="px-4 pt-16 pb-16 text-center">
            <h3 className="text-2xl font-semibold mb-4">1. Vi leverer</h3>
            <p className="text-zinc-500 leading-relaxed">
              Vælg en dato der passer dig, så leverer vi kasserne, helt gratis.
            </p>
          </Card>

          <Card className="px-4 pt-16 pb-16 text-center">
            <h3 className="text-2xl font-semibold mb-4">2. Du pakker & flytter</h3>
            <p className="text-zinc-500 leading-relaxed">
              Ingen tape, ingen samling, ingen frustration. Solide kasser der passer på dine ting.
            </p>
          </Card>

          <Card className="px-4 pt-16 pb-16 text-center">
            <h3 className="text-2xl font-semibold mb-4">3. Vi henter</h3>
            <p className="text-zinc-500 leading-relaxed">
              Når du er på plads i din nye bolig, henter vi kasserne igen. Simpelt.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  )
}

function CTA() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="p-12 md:p-20 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Klar til en flytning der bare kører?</h2>
          <p className="text-lg md:text-xl  mb-10 max-w-2xl mx-auto">
            Bestil dine kasser online på få minutter. Vi leverer, du pakker, vi henter. Ingen overraskelser, ingen ekstraomkostninger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="text-white rounded-full">
                Beregn din pris
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Section({ children, className }: Readonly<{ children: React.ReactNode, className?: string }>) {
  return (
    <section className={`px-4 mb-1 ${className}`}>
      <div className="max-w-[1300px] mx-auto">
        {children}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-zinc-50 py-16 px-6 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img src="/heybox-logo.svg" alt="heybox logo" className="w-20" />
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Lej robuste flyttekasser til samme pris som pap. Vi leverer til din dør og henter igen. Altid gratis.
            </p>
          </div>
          {/* <div>
            <h4 className="font-semibold mb-6 text-zinc-900">Virksomhed</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-primary transition-colors">Om os</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Leveringsområder</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Job hos os</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-zinc-900">Kundeservice</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Handelsbetingelser</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Persondatapolitik</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Anmeldelser</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-zinc-900">Kontakt os</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li>hej@heybox.dk</li>
              <li>+45 70 12 34 56</li>
              <li>Hverdage: 08:00 - 16:00</li>
            </ul>
          </div> */}
        </div>
        {/* <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
          <div>&copy; {new Date().getFullYear()} HeyBox ApS. Alle rettigheder forbeholdes.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-900 transition-colors">Instagram</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Facebook</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">LinkedIn</a>
          </div>
        </div> */}
      </footer>
  )
}