import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckIcon, ArrowRight } from "lucide-react";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { howToJsonLd, faqJsonLd } from "@/lib/seo";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import {
  SplitHero,
  SectionInfo,
  SectionContent,
  SectionThreeInfoColumns,
  TransparentCard,
} from "@/components/sections/blocks";
import {
  STATS,
  kasseanvendelserPerAar,
  kasserSmidtUdPerAar,
  tonPapAffaldPerAar,
  formatMio,
  formatTon,
} from "@/lib/stats";

export default function Landing() {
  return (
    <>
      <JsonLd data={howToJsonLd()} />
      <JsonLd data={faqJsonLd()} />
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
      <Faq />
    </>
  );
}

function Hero() {
  return (
    <SplitHero
      media={
        <div className="md:w-2/3 mx-auto relative">
          <Image
            priority
            width="600"
            height="420"
            src="/images/heybox-angle-modified.png"
            alt="Grønne plastikflyttekasser fra heybox stablet i en lys stue"
            className="w-full"
          />
          <div className="text-sm md:text-lg absolute bottom-4 right-2 text-right flex flex-col items-end">
            <TransparentCard><p className="font-bold">Lej fra 13.95 kr/kasse</p></TransparentCard>
            <TransparentCard><CheckIcon className="w-4 h-4 mt-0.5" /><p>Inkl. levering og afhentning</p></TransparentCard>
          </div>
        </div>
      }
    >
      <div className="lg:px-4 xl:px-8 lg:max-w-[800px]">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl uppercase font-black mb-4 lg:mb-6">
          Lej flyttekasser i København - nemt og billigt.
        </h1>
        <p className="md:text-lg lg:text-2xl mb-8 md:mb-12">
          Robuste plastkasser til samme pris som papkasser i byggemarkedet.
          Vi leverer og henter dem igen, når du er færdig - og det er inkluderet i prisen.
        </p>
        <Link href="/booking">
          <Button size="lg" className="bg-green-300">
            Beregn din pris <ArrowRight className="w-6 h-6 ml-1 -mr-3" />
          </Button>
        </Link>
      </div>
    </SplitHero>
  )
}

function WeMakeItEasy() {
  return (
    <SectionInfo
      title={<>Vi fjerner<br />bøvlet.</>}
      description="En flytning har rigeligt af bøvl i forvejen. Derfor kører vi kasserne til døren, og henter dem igen når du er færdig, så du kan bruge energien på selve flytningen. Ingen tur til byggemarked, ingen tape, ingen affaldsbjerg bagefter."
    />
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
          description: "Når du er på plads i din nye bolig, henter vi kasserne igen. Gratis."
        },
      ]}
    />
  )
}

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
