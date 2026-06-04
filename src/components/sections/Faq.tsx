'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQ_ITEMS, type FaqItem } from "@/lib/seo"
import { H2 } from "@/components/ui/text"

export function FaqSection() {
  return (
    <section id="faq" className="px-4 py-16 md:py-32 scroll-mt-20">
      <div className="max-w-[800px] mx-auto">
        <H2 size="section">Ofte stillede spørgsmål</H2>
        <Faq />
      </div>
    </section>
  )
}

export function Faq({ items = FAQ_ITEMS }: { items?: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`faq-${index}`}>
          <AccordionTrigger className="md:text-lg font-semibold">
            {item.q}
          </AccordionTrigger>
          <AccordionContent>
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
