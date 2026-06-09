import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckIcon, ArrowRight } from "lucide-react";
import { FaqSection } from "@/components/sections/Faq";
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
import { CtaReadyToGoSection } from "@/components/sections/cta";
import { H1, P } from "@/components/ui/text";

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
      <FaqSection />
      <CtaReadyToGoSection />
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
            src="/images/heybox-pap-shadow.png"
            alt="Grønne plastikflyttekasser fra heybox stablet i en lys stue"
            className="w-full"
          />
          <div className="md:text-xl absolute bottom-6 right-2 text-right flex flex-col items-end">
            <TransparentCard><p className=""><strong>Lej fra 13.95 kr</strong>/kasse</p></TransparentCard>
            <TransparentCard><CheckIcon className="w-6 h-6 mt-0.5 text-green-500 font-bold" /><p className="text-lg"><span className="text-green-500 font-bold">Inkl.</span> levering og afhentning</p></TransparentCard>
          </div>
        </div>
      }
    >
      <div className="lg:px-4 xl:px-8 lg:max-w-[800px]">
        <H1>Lej flyttekasser i København</H1>
        <P size="lead" className="mb-8 md:mb-12">
          {/* Professionelle flyttekasser der er stærkere end de tynde fra byggemarkedet. */}
          {/* Vi leverer dem til din dør og henter dem igen, når du er færdig - alt sammen inkluderet i prisen. */}
          Du får professionelle flyttekasser leveret direkte til din dør og afhentet igen når du er færdig - alt
          sammen inkluderet i prisen. Det kan stort set ikke betale sig at lade være...
        </P>
        <Link href="/booking">
          <Button size="lg">
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
      title={<>Du undgår<br />bøvlet.</>}
      description="En flytning har rigeligt af bøvl i forvejen. Derfor får du leveret kasserne til døren, og afhentet igen når du er færdig, så du kan bruge energien på selve flytningen."
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
      descriptions={[`Flyttekasser er bare besværlige. De fylder meget og er svære at have med at
        gøre, selv når de er flade. Og det bliver endnu mere besværligt hvis du ikke har bil. Undgå
        at skulle transportere kasserne med det offentlige eller bruge penge på at låne en bil.`]}
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
      title="Stærke flyttekasser"
      descriptions={[`Kasserne du får leveret, er lavet af stærkt, dobbeltlags bølgepap - kraftigere end de
        traditionelle flyttekasser du kender. Kasserne har selvlåsende kuvertbund, tåler
        høj belastning og kan stables sikkert.`]}
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
      descriptions={[`Når du endeligt sætter dig tungt ned i sofaen efter at have brugt timer på at tømme
        dine flyttekasser, ligger der en stor bunke sammenfoldede kasser i hjørnet. Du kommer ikke til at
        skulle brugen dem igen før om et par år, så de kommer enten til at fylde i depotet eller også du
        skal bruge tid på at give eller sælge dem videre. Lad os fjerne besværet for dig.`]}
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
          description: "Vælg en dato der passer dig, så leverer vi. Gratis."
        },
        {
          title: "2. Du pakker & flytter",
          description: "Med robuste kasser der passer på dine ting."
        },
        {
          title: "3. Vi henter",
          description: "Når du er på plads, henter vi kasserne igen. Gratis."
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
      title="Tyndt pap holder ikke længe"
      descriptions={[
        "Tynde flyttekasser fra byggemarkedet tåler typisk kun 2-3 flytninger, og fugt eller dårlig opbevaring forkorter ofte levetiden yderligere. Derfor ender millioner af kasser som affald hvert år.",
        "Vores kasser er lavet i ekstra kraftigt pap, der holder langt flere flytninger - samme kasser, mange flytninger, mindre affald."
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
      <div className="border-b border-black border-x border-black border-dashed">
        <div className="text-center mx-auto p-4">
          <P size="xsmall" className="mb-2">
            Flyttetal opgøres pr. person (CPR) af Danmarks Statistik. Antallet af kasser og nye kasser pr. år er estimater baseret på gennemsnitlige boligstørrelser og genbrugsrater og kan variere.
          </P>
          <P size="xsmall">
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
          </P>
        </div>
      </div>
    </Section>
  )
}
