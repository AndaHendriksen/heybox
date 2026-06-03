import type { Metadata } from "next"
import { Faq } from "@/components/sections/Faq";
import { Section } from "@/components/ui/section";
import { CtaReadyToGoSection } from "@/components/sections/cta";

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
      <Faq />
      <CtaReadyToGoSection />
    </Section>
  )
}