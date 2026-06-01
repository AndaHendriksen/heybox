'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckIcon, ArrowRight } from "lucide-react";
import { Menu } from "@/components/menu";

export default function Landing() {
  return (
    <div>
      <Menu />
      <Hero />
      <WeMakeItEasy />
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
    <section className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 border-b border-black">
      <div className="lg:pt-0 bg-linear-to-br from-green-100 to-green-300 flex items-center p-8 border-b border-black lg:border-b-0 lg:border-r">
        <div className="md:w-2/3 mx-auto relative">
          <img
            src="/images/heybox-angle-modified.png"
            alt="Grønne plastikflyttekasser fra HeyBox stablet i en lys stue"
            className="w-full"
          />
          <div className="text-sm md:text-lg absolute bottom-4 right-2 text-right flex flex-col items-end">
            <TransparentCard><p className="font-bold">Lej fra 13.95 kr/kasse</p></TransparentCard>
            <TransparentCard><CheckIcon className="w-4 h-4 mt-0.5" /><p>Inkl. levering og afhentning</p></TransparentCard>
          </div>
        </div>
      </div>
      <div className="p-4 pb-12 flex items-center justify-center">
        <div className="lg:px-4 xl:px-8">
          <p>Hey København!</p>
          <h1 className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl text-balance uppercase font-black mb-4">
            Lej flyttekasser billigt og nemt.
          </h1>
          <p className="md:text-lg lg:text-xl mb-8 md:mb-12 md:text-balance">
            Lej robuste plastkasser fra samme priser som at købe papkasser i byggemarkedet og slæbe dem hjem selv.
          </p>
          <Link href="/booking">
            <Button size="lg" className="bg-green-300">
              Beregn din pris <ArrowRight className="w-6 h-6 ml-1 -mr-3" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function WeMakeItEasy() {
  return (
    <SectionInfo 
      title={<>Vi fjerner<br />bøvlet.</>}
      description="Vi leverer kasserne, du pakker, og når du er på plads i din nye bolig, henter vi kasserne igen. Simpelt."
    />
  )
}

function SectionInfo({ preTitle, title, description }: Readonly<{ preTitle?: string, title: React.ReactNode, description: string }>) {
  return (
    <Section className="py-16 md:py-32">
      <div className="max-w-[1400px] md:px-0 mx-auto md:grid md:grid-cols-2">
        <div className="p-6 pl-0">
          {preTitle && (
            <p className="-mt-4">{preTitle}</p>
          )}
          <h2 className="text-4xl lg:text-7xl font-black uppercase">
            {title}
          </h2>
        </div>
        <div className="md:py-6 lg:py-8 md:pr-0 lg:pl-24">
          <p className="text-lg md:text-xl text-black/50">
            {description}
          </p>
        </div>
      </div>
    </Section>
  )
}

function TransparentCard({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="px-2 md:px-3 pt-1 pb-0.5 flex items-center gap-1 mb-0.5 border border-black bg-white shadow-[3px_4px_0_0_rgba(0,0,0,1)]">
      {children}
    </div>
  )
}

function NoDriving() {
  return (
    <SectionContent
      imgLast={true}
      hasBorderTop={true}
      imgSrc="3d-icon-crowded-bus.png"
      imgAlt="Bus proppet med mennesker - illustration"
      title="Ingen tur til byggemarkedet"
      descriptions={["Drop køen i byggemarkedet. Vores kasser koster det samme som papkasser, men vi leverer dem direkte til din dør, så du kan bruge tiden på det der betyder noget."]}
      ctaText="Spar turen"
      ctaLink="/booking"
      bgColor="bg-blue-100"
      btnColor="bg-green-200"
    />
  )
}

function BoxQuality() {
  return (
    <SectionContent
      imgSrc="3d-icon-weight.png"
      imgAlt="En tung håndvægt - illustration"
      title="Stærkere og nemmere end pap"
      descriptions={["Ingen kasser der skal samles med tape. Ingen bunde der falder ud. Vores kasser er robuste, stables perfekt og lukkes med et enkelt klik."]}
      ctaText="Beskyt dine ting"
      ctaLink="/booking"
      bgColor="bg-purple-100"
      btnColor="bg-blue-200"
    />
  )
}

function NoCleanup() {
  return (
    <SectionContent
      imgLast={true}
      imgSrc="3d-icon-sleep-cocoon.png"
      imgAlt="Person pakket ind i en dyne - illustration"
      title="Ingen oprydning bagefter"
      descriptions={["Med papkasser sidder du tilbage med et bjerg af affald når flytningen er overstået. Vi sørger for at hente kasserne, så du bare kan slappe af og nyde dit nye sted."]}
      ctaText="Nyd tiden"
      ctaLink="/booking"
      bgColor="bg-yellow-100"
      btnColor="bg-purple-200"
    />
  )
}

interface SectionContentProps {
  imgLast?: boolean;
  imgSrc: string;
  imgAlt: string;
  title: string;
  descriptions: string[];
  ctaText: string;
  ctaLink: string;
  bgColor: string;
  btnColor: string;
  hasBorderTop?: boolean;
  imgFullSize?: boolean;
}

function SectionContent({ imgLast, imgSrc, imgAlt, title, descriptions, ctaText, ctaLink, bgColor, btnColor, hasBorderTop, imgFullSize = false }: SectionContentProps) {
  return (
    <Section>
      <div className={`border-b border-x border-black grid lg:grid-cols-2 items-center justify-center ${hasBorderTop ? 'border-t' : ''}`}>
        <div className={`${imgLast ? 'lg:order-1 lg:border-l bg-linear-to-tl' : 'lg:order-0 bg-linear-to-br'} from-yellow-50 to-orange-100 border-b lg:border-b-0 border-black ${imgFullSize ? '' : 'lg:py-24'}`}>
          <img src={`/images/${imgSrc}`} alt={imgAlt} className={`mx-auto ${imgFullSize ? 'w-6/7' : 'w-2/3 lg:w-2/3'}`} />
        </div>
        <div className={`${imgLast ? '': 'lg:border-l border-black'} h-full px-4 py-12 lg:p-0 flex flex-col justify-center lg:px-16`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold leading-[1.2] tracking-tight mb-4">
            {title}
          </h2>
          {descriptions.map((desc, index) => (
            <p key={index} className="text-lg md:text-xl text-black/50 mb-8 md:mb-12">
              {desc}
            </p>
          ))}
          <Link href={ctaLink}>
            <Button className="bg-green-300">
              {ctaText} <ArrowRight className="w-4 h-4 ml-1 -mr-2" />
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  )
}

function HowItWorks() {
  return (
    <SectionThreeInfoColumns
      columns={[
        {
          title: "1. Vi leverer",
          description: "Vælg en dato der passer dig, så leverer vi kasserne. Gratis."
        },
        {
          title: "2. Du pakker & flytter",
          description: "Ingen tape, ingen samling, ingen frustration. Solide kasser der passer på dine ting."
        },
        {
          title: "3. Vi henter",
          description: "Når du er på plads i din nye bolig, henter vi kasserne igen. Simpelt."
        },
      ]}
    />
  )
}


interface ThreeInfoColumnsProps {
  title: string,
  description: string,
  subdescription?: string,
}

function SectionThreeInfoColumns({ hasBorderTop, xlTitle, columns }: Readonly<{ hasBorderTop?: boolean, xlTitle?: boolean, columns: ThreeInfoColumnsProps[] }>) {
  return (
    <Section>
      <div className={`grid md:grid-cols-3 gap-1 relative border-x border-b border-black ${hasBorderTop ? 'border-t' : ''}`}>
        {columns.map((column, index) => (
          <div key={index} className={`px-4 lg:px-8 py-8 lg:py-16 ${index !== 0 ? 'border-t md:border-t-0 md:border-l border-gray-300 border-dashed' : ''}`}>
            <h3 className={`text-lg ${xlTitle ? 'md:text-2xl lg:text-4xl xl:text-5xl' : ''} font-bold uppercase mb-1`}>{column.title}</h3>
            <p>{column.description}</p>
            {column.subdescription && <p className="text-sm text-gray-500 mt-2">{column.subdescription}</p>}
          </div>
        ))}
      </div>
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

const boligflytningerPerAar = STATS.flytningerPerAar / STATS.gnsPersonerPerBolig
const kasseanvendelserPerAar = boligflytningerPerAar * STATS.gnsBoligM2 * STATS.kasserPerM2
const kasserSmidtUdPerAar = kasseanvendelserPerAar / STATS.genbrugPerKasse
const tonPapAffaldPerAar = (kasserSmidtUdPerAar * STATS.papkasseVaegtKg) / 1000

const formatMio = (n: number) =>
  `~${(n / 1_000_000).toLocaleString("da-DK", { maximumFractionDigits: 1 })} mio.`
const formatTon = (n: number) => `${Math.round(n).toLocaleString("da-DK")} ton`

function CardboardIntro() {
  return (
    <SectionInfo 
      preTitle="Estimeret"
      title={<>{formatTon(tonPapAffaldPerAar)}<br />papaffald</>}
      description="Hver gang nogen flytter, ender bunkevis af papkasser ofte som engangsaffald. På landsplan løber det hurtigt op i tal, der er svære at forestille sig."
    />
  )
}

function CardboardStats() {
  return (
    <SectionThreeInfoColumns
      xlTitle={true}
      hasBorderTop={true}
      columns={[
        {
          title: `${STATS.flytningerPerAar.toLocaleString("da-DK")}`,
          description: "adresseflytninger i Danmark hvert år",
          subdescription: "Danmarks Statistik, 2025"
        },
        {
          title: `${formatMio(kasseanvendelserPerAar)}`,
          description: "flyttekasser bruges årligt ved flytninger",
          subdescription: "Estimat (DST + Bolius/KL)"
        },
        {
          title: `${formatMio(kasserSmidtUdPerAar)}`,
          description: "papkasser smides ud hvert år",
          subdescription: `Estimat (${STATS.genbrugPerKasse} genbrug pr. kasse)`
        },
      ]}
    />
  )
}

function CardboardReuse() {
  return (
    <SectionContent
      imgSrc="3d-icon-trashedbox.png"
      imgAlt="Ødelagt papkasse - illustration"
      imgFullSize={true}
      title="Papkasser genbruges sjældent"
      descriptions={[
        "Standard papkasser i bølgepap tåler typisk kun 2-6 genbrug, og fugt eller dårlig opbevaring forkorter ofte levetiden yderligere. Derfor ender millioner af kasser som affald hvert år.",
        "Vores plastkasser er bygget til at blive brugt igen og igen - samme kasser, mange flytninger, ingen affaldsbjerge."
      ]}
      ctaText="Stop forbruget"
      ctaLink="/booking"
      bgColor="bg-gray-100"
      btnColor="bg-green-200"
    />
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
      <div className="border-b border-black border-x border-gray-300 border-dashed">
        <div className="text-center mx-auto text-xs text-black/40 p-4">
          <p className="mb-2">
            Flyttetal opgøres pr. person (CPR) af Danmarks Statistik. Antallet af kasser og nye kasser pr. år er estimater baseret på gennemsnitlige boligstørrelser og genbrugsrater og kan variere.
          </p>
          <p>
            Kilder:{" "}
            {sources.map((s, i) => (
              <span key={s.href}>
                <a href={s.href}
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
      </div>
    </Section>
  )
}

function CTA() {
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

function Section({ children, className }: Readonly<{ children: React.ReactNode, className?: string }>) {
  return (
    <section className={`px-4  ${className || ""}`}>
      <div className="max-w-[1400px] mx-auto">
        {children}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-50 py-16 px-6 border-t border-gray-300 border-dashed">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <h1 className="text-3xl font-bold tracking-tight">heybox!</h1>
              {/* <img src="/heybox-logo.svg" alt="heybox logo" className="w-20" /> */}
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