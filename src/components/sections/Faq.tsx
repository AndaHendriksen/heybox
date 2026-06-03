'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQ_ITEMS, type FaqItem } from "@/lib/seo"

// Visible FAQ. The same FAQ_ITEMS feed the FAQPage JSON-LD on the homepage,
// so every question/answer here is also present in the structured data.
export function Faq({ items = FAQ_ITEMS }: { items?: FaqItem[] }) {
  return (
    <section id="faq" className="px-4 py-16 md:py-32 scroll-mt-20">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 md:mb-12">
          Ofte stillede spørgsmål
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-base md:text-lg font-semibold">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-black/60 leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
