import type { Metadata } from "next"
import { Faq } from "@/components/sections/Faq";
import { Section } from "@/components/ui/section";
import { CtaReadyToGoSection } from "@/components/sections/cta";
import { Eyebrow, H1, P } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "Ofte stillede spørgsmål",
  description:
    "Svar på de ofte stillede spørgsmål om heybox og vores flyttekasse-service i Storkøbenhavn.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Ofte stillede spørgsmål",
    description:
      "Svar på de ofte stillede spørgsmål om heybox og vores flyttekasse-service i Storkøbenhavn.",
    url: "/faq",
    type: "website",
  },
}

export default function FAQPage() {
  return (
    <Section>
      <div className="flex items-center border-x border-b pt-24 pb-32">
        <div className="max-w-[700px] mx-auto px-4">
          <Eyebrow>FAQ</Eyebrow>
          <H1>Ofte stillede spørgsmål</H1>
          <P size="lead" className="mb-12">
            Selvom det er super simpelt at leje flyttekasser hos heybox, har du måske nogle spørgsmål. Her har vi samlet svarene på de mest almindelige spørgsmål om vores service, priser, levering og meget mere.
          </P>
          <Faq />
        </div>
      </div>
      <CtaReadyToGoSection />
    </Section>
  )
}