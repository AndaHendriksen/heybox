import type { Metadata } from "next"
import Image from "next/image"
import { Section } from "@/components/ui/section"
import {
  SectionInfo,
  SectionContent,
  SectionThreeInfoColumns,
} from "@/components/sections/blocks"
import {
  STATS,
  kasseanvendelserPerAar,
  kasserSmidtUdPerAar,
  tonPapAffaldPerAar,
  formatMio,
  formatTon,
} from "@/lib/stats"
import { CtaReadyToGoSection } from "@/components/sections/cta"

export const metadata: Metadata = {
  title: "Om os",
  description: "To venner siden dagplejen med en mission om at gøre det lettere at flytte og nedbringe papaffaldet i Danmark.",
  alternates: { canonical: "/om-os" },
  openGraph: {
    title: "Om os",
    description: "To venner siden dagplejen med en mission om at gøre det lettere at flytte og nedbringe papaffaldet i Danmark.",
    url: "/om-os",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <>
      <AboutUs />
      <OurMission />
      <MovedManyTimeSection />
      <OurVision />
      <WasteRealization />
      <WasteStats />
      <Decision />
      <CtaReadyToGoSection />
    </>
  )
}

function AboutUs() {
  return (
    <Section>
      <div className="flex items-center border-x pt-24">
          <div className="max-w-[700px] mx-auto px-4">
            <p className="md:text-lg border-b pb-4 mb-5 inline-block">Om os</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase font-black mb-4 lg:mb-6">
            To venner siden dagplejen.
          </h1>
          <p className="mb-24 md:text-lg lg:text-xl">
            Vi er Anda og Miko og vi har kendt hinanden siden Miko startede i dagpleje hos Anda's mor.
            Vi husker begge tydeligt den første samtale vi nogensinde havde: "Hvordan kan vi gøre det lettere for
            folk at flytte og hvordan kan vi på samme tid undgå alt det papaffald?".
          </p>
          <Image className="border border-black mb-24 shadow-[4px_4px_0_0_rgba(0,0,0,1)]" src="/images/anda-miko-01.png" alt="Anda og Miko fra barndommen" width={800} height={800} />
        </div>
      </div>
    </Section>
  )
}

function OurMission() {
  return (
    <Section>
      <div className="flex items-center border-x pb-32">
        <div className="max-w-[700px] mx-auto px-4">
          <p className="md:text-lg border-b pb-4 mb-5 inline-block">Vores mission</p>
          <h2 className="text-xl md:text-2xl lg:text-3xl uppercase font-black mb-4 lg:mb-6">
            Gør det lettere at flytte
          </h2>
          <p className="md:text-lg lg:text-xl">
            Vores mission er at gøre det lettere for folk at flytte. Flyttekasser er bare besværlige
            og kluntede at have med at gøre. Du kan bære 5-6 stk ad gangen.
            Og det bliver endnu mere besværligt, hvis du ikke har en bil, for så skal du enten leje en, låne en
            eller tage flere ture i bus eller på cykel. Det er bare bøvlet.
          </p>
        </div>
      </div>
    </Section>
  )
}

function MovedManyTimeSection() {
  return (
    <SectionContent
      hasBorderTop={true}
      imgSrc="3d-icon-hand-truck.png"
      imgAlt="Flytte illustration"
      title="Vi har flyttet sammenlagt 32 gange"
      descriptions={[
        "Vi er selv flyttet en masse gange, og vi har begge oplevet, hvor besværligt det er at have med flyttekasser at gøre. Og vi har begge gamle flyttekasser stående i depotet, som vi ikke har brug for lige nu, men det er besværligt at skille sig af med dem. Og vi skal jo nok bruge dem igen på et tidspunkt, ik?"
      ]}
      ctaText="Se hvad det koster"
      ctaLink="/booking"
      bgColor="bg-green-100"
      btnColor="bg-green-200"
    />
  )
}

// function OurStats() {
//   return (
//     <Section>
//       <div className={`grid md:grid-cols-2 relative border-l border-b border-r border-black`}>
//         <div className={`px-4 lg:px-8 py-8 lg:py-16 border-dashed`}>
//           <h3 className="text-lg font-bold uppercase">
//             Anda Hendriksen
//           </h3>
//           <p className="text-sm text-gray-500">Stifter</p>
//           <p></p>
//         </div>
//         <div className={`px-4 lg:px-8 py-8 lg:py-16 border-t md:border-t-0 md:border-l border-dashed`}>
//           <h3 className="text-lg font-bold uppercase">
//             Miko Kongstad
//           </h3>
//           <p className="text-sm text-gray-500">Stifter</p>
//           <p></p>
//         </div>
//       </div>
//     </Section>
//   )
// }

function OurVision() {
  return (
    <Section>
      <div className="flex items-center border-x border-b py-32">
        <div className="max-w-[700px] mx-auto px-4">
          <p className="md:text-lg border-b pb-4 mb-5 inline-block">Vores vision</p>
          <h2 className="text-xl md:text-2xl lg:text-3xl uppercase font-black mb-4 lg:mb-6">
            Nedbring papaffaldet ved flytninger  
          </h2>
          <p className="mb-6 md:text-lg lg:text-xl">
            Vores vision er at nedbringe den massive mængde papaffaldet der er i Danmark pga. flytninger.
            Vi tror på, at ved at tilbyde en genbrugsløsning, kan vi mindske mængden af pap, der
            bliver smidt ud hvert år.
          </p>
          <p className="md:text-lg lg:text-xl">
            For da vi satte os ned og regnede på det, var tallene var værre, end vi troede. Hver flytning efterlader en bunke pap, der oftest kun bruges én gang - og på landsplan løber det op i tal, der er svære at forestille sig.
          </p>
        </div>
      </div>
    </Section>
  )
}

function WasteRealization() {
  return (
    <SectionInfo
      preTitle="Estimeret"
      title={<>{formatTon(tonPapAffaldPerAar)}<br />papaffald.</>}
      description="Vi var ærligt talt chokerede, da vi regnede på det første gang. Tallet er større end vi troede. Og tallene er ud fra et best-case-scenario hvor ALLE kasser bliver genbrugt 5 gange. Det er et problem vi gerne vil løse."
    />
  )
}

function WasteStats() {
  return (
    <SectionThreeInfoColumns
      xlTitle={true}
      hasBorderTop={true}
      columns={[
        {
          title: `${STATS.flytningerPerAar.toLocaleString("da-DK")}`,
          description: "adresseflytninger i Danmark hvert år",
          subdescription: "Danmarks Statistik, 2025",
        },
        {
          title: `${formatMio(kasseanvendelserPerAar)}`,
          description: "flyttekasser bruges årligt ved flytninger",
          subdescription: "Estimat (DST + Bolius/KL)",
        },
        {
          title: `${formatMio(kasserSmidtUdPerAar)}`,
          description: "papkasser smides ud hvert år",
          subdescription: `Estimat (${STATS.genbrugPerKasse} genbrug pr. kasse)`,
        },
      ]}
    />
  )
}

function Decision() {
  return (
    <SectionContent
      imgLast={true}
      imgSrc="heybox-angle-modified.png"
      imgAlt="Indkøbsvogn fra byggemarked - illustration"
      imgBg="from-green-50 to-green-100"
      title="Vores løsning er simpel"
      descriptions={[
        "Robuste plastkasser, der kan bruges igen og igen, til præcis samme pris som papkasser i byggemarkedet. Vi leverer når du skal bruge dem og henter dem igen, når du er på plads.",
        "Ingen tur til byggemarkedet, ingen tape, ingen affaldsbjerg bagefter. Vi byggede den service, vi selv ville ønske, vi havde haft, da vi flyttede.",
      ]}
      ctaText="Se hvad det koster"
      ctaLink="/booking"
      bgColor="bg-green-100"
      btnColor="bg-green-200"
    />
  )
}
