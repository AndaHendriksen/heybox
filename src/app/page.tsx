'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon, CheckCircle2, Truck, PackageCheck, Star, ArrowRight, ShieldCheck, Clock, MapPin, Smile, Check } from "lucide-react";
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
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
      <Section className="relative overflow-hidden mb-1 mt-18">
        <Card className="min-h-[calc(100vh-8rem)] p-4 mx-auto lg:grid lg:grid-cols-2 relative z-10">
          <div className="h-full flex items-center mt-12 mb-12">
            <div className="w-2/3 md:1/3 lg:w-2/3 mx-auto relative mt-32 lg:mt-8">
                <img
                  src="/images/heybox-angle-modified.png"
                  alt="Grønne plastikflyttekasser fra HeyBox stablet i en lys stue"
                  className="w-full"
                />
              <div className="absolute top-[4%] left-[64%] md:left-[70%] md:top-[8%] lg:left-[82%] w-[110%] lg:w-full -translate-[100%]">
                <div className="text-left -rotate-25 pl-[25%] lg:pl-0">
                  <p className="leading-4 text-gray-500">SAMME PRIS SOM PAP</p>
                  <p className="font-bold lg:text-2xl">Fra 13.95 kr/kasse</p>
                </div>
                <img
                  src="/arrow-down-01.svg" alt="Lej flyttekasser fra 15.95kr"
                  className="ml-[50%] mt-1 md:ml-[40%] md:mt-8 w-16 lg:ml-28 lg:mt-18 lg:w-20" />
              </div>
            </div>
          </div>
          <div className="h-full flex items-center justify-center">
            <div className="">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.2] tracking-tight mb-4">
                Lej flyttekasser billigt og nemt i København
              </h1>
              <p className="text-lg md:text-xl text-black/50 mb-6">
                Lej robuste plastikkasser fra samme priser som at købe papkasser i byggemarkedet og slæbe dem hjem selv.
              </p>
              <ul className="md:text-xl mb-10">
                <li className="flex gap-2 items-center"><CheckIcon className="w-6 h-6 text-primary" />Inkl. levering</li>
                <li className="flex gap-2 items-center"><CheckIcon className="w-6 h-6 text-primary" />Inkl. afhentning</li>
              </ul>
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

function NoDriving() {
  return (
    <Section>
      <Card className="px-4 py-4 md:px-8 md:py-32 lg:grid lg:grid-cols-2 items-center justify-center">
        <div className="md:px-16">
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
        <div className="w-2/3 md:1/3 lg:w-1/2 mx-auto order-first lg:order-last relative md:mt-32 lg:mt-8">
          <img
            src="/images/3d-icon-crowded-bus.png"
            // src="/images/3d-icon-byggemarked.png"
            alt="Grønne plastikflyttekasser fra HeyBox stablet i en lys stue"
            className="w-full"
          />
        </div>
      </Card>
    </Section>
  )
}

function BoxQuality() {
  return (
    <Section>
      <Card className="p-4 lg:px-8 lg:py-32 grid lg:grid-cols-2 items-center justify-center">
          <div className="w-2/3 md:1/3 lg:w-1/2 mx-auto relative md:mt-32 lg:mt-8">
            <img
              src="/images/3d-icon-weight.png"
              alt="Grønne plastikflyttekasser fra HeyBox stablet i en lys stue"
              className="w-5/6 m-auto"
            />
          </div>
          <div>
          <div className="lg:px-16">
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
        <Card className="p-4 lg:px-8 lg:py-32 grid lg:grid-cols-2 items-center justify-center">
            <div className="lg:px-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight mb-4">
              Intet oprydningsarbejde bagefter
            </h2>
            <p className="text-lg md:text-xl text-black/50 mb-12">
              Med papkasser sidder du tilbage med et bjerg af affald når flytningen er overstået. Med HeyBox henter vi blot kasserne, og du er fri.
            </p>
            <Link href="/booking">
              <Button size="lg" className="text-white rounded-full">
                Beregn din pris
              </Button>
            </Link>
          </div>
          <div className="w-2/3 md:1/3 lg:w-2/3 mx-auto order-first lg:order-last lg:mt-8">
            <img
              src="/images/3d-icon-trashedbox.png"
              alt="Grønne plastikflyttekasser fra HeyBox stablet i en lys stue"
              className="w-full"
            />
          </div>
        </Card>
      </Section>
  )
}

function HowItWorks() {
  return (
    <section id="saadan-virker-det" className="mb-1">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid md:grid-cols-3 gap-1 relative">
          <Card className="px-4 pt-16 pb-16 text-center">
            <h3 className="text-2xl font-semibold mb-4">1. Vi leverer</h3>
            <p className="text-zinc-500 leading-relaxed">
              Vælg en dato der passer dig, så kører vi kasserne direkte ud til din nuværende adresse, helt gratis.
            </p>
          </Card>

          <Card className="px-4 pt-16 pb-16 text-center">
            <h3 className="text-2xl font-semibold mb-4">2. Du pakker</h3>
            <p className="text-zinc-500 leading-relaxed">
              Ingen tape, ingen samling, ingen frustration. Solide kasser der passer på dine ting.
            </p>
          </Card>

          <Card className="px-4 pt-16 pb-16 text-center">
            <h3 className="text-2xl font-semibold mb-4">3. Vi henter</h3>
            <p className="text-zinc-500 leading-relaxed">
              Når du er på plads i din nye bolig, henter kasserne igen. Du behøver ikke forlade hjemmet.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black opacity-10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Klar til en flytning der bare kører?</h2>
          <p className="text-lg md:text-xl text-green-50 mb-10 max-w-2xl mx-auto">
            Bestil dine kasser online på få minutter. Vi leverer, du pakker, vi henter. Ingen overraskelser, ingen ekstraomkostninger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button className="bg-white text-primary hover:bg-zinc-50 font-semibold text-lg px-10 h-14 rounded-full group">
                Bestil kasser nu
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
    <section className={`mb-1 ${className}`}>
      <div className="max-w-[1500px] mx-auto">
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