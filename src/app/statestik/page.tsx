'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, PackageCheck, Recycle, Trash2, TreePine } from "lucide-react"
import { motion, type Variants } from "framer-motion"

const STATS = {
  flytningerPerAar: 861_718,        // DST 2025
  fysiskeFlytninger: 507_000,       // DST / 1.7 husstandsfaktor (inference)
  gnsBoligM2: 53.9,                   // Bolius 2026 (lejer-snit)
  kasserPerM2: 1,                   // Tommelfingerregel
  genbrugPerKasse: 5,               // United Container (middelscenarie)
  nyeKasserPerAar: 8_112_000,       // Beregnet
  kasseanvendelser: 40_560_000,     // Beregnet
  flytningerPerDag: 2_361,          // 861718 / 365
  papkassePrisKr: 12,               // ca. markedspris inkl. tape
  papkasseVaegtKg: 1.2,            // ca. 1200g per standard papkasse (Silvan/Bauhaus-snit)
  kasserSmidesUdPerAar: 8_112_000, // = nyeKasserPerAar (steady state)
  tonAffalPerAar: 9_734,           // 8.112.000 × 1.2 kg / 1000
}

const SOURCES = {
  dst: {
    label: "DST 2025",
    href: "https://www.dst.dk/da/Statistik/emner/borgere/flytninger/flytninger-i-danmark",
  },
  bolius: {
    label: "Bolius 2026",
    href: "https://www.bolius.dk/hvor-stort-er-et-gennemsnitligt-hus-og-lejlighed-i-danmark-36883",
  },
  unitedContainer: {
    label: "United Container",
    href: "https://unitedcontainer.com/how-many-times-can-cardboard-boxes-be-used-before-recycling",
  },
}

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

function SourceBadge({ source }: { source: { label: string; href: string } }) {
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 border border-zinc-200 rounded-full px-2 py-0.5 hover:border-primary hover:text-primary transition-colors"
    >
      {source.label} ↗
    </a>
  )
}

export default function StatestikPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-primary selection:text-white">
      <Nav />
      <Hero />
      <StatsRow />
      <Problem />
      <BoxCalculator />
      <Methodology />
      <CTA />
      <Footer />
    </div>
  )
}

function Nav() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <img src="/heybox-logo.svg" alt="heybox logo" className="w-20" />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Forside</Link>
          <Link href="/booking">
            <Button className="bg-primary hover:bg-[#246337] text-white font-medium px-6 rounded-full h-11 hidden md:inline-flex">
              Bestil nu
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-40 pb-24 px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-3xl mx-auto text-center"
      >
        <motion.p variants={fadeUpVariant} className="text-sm font-semibold text-primary uppercase tracking-widest mb-6">
          Tal om flytning i Danmark
        </motion.p>
        <motion.div variants={fadeUpVariant} className="mb-4">
          <span className="text-7xl md:text-9xl font-bold tracking-tight tabular-nums">
            861.718
          </span>
        </motion.div>
        <motion.div variants={fadeUpVariant} className="flex items-center justify-center gap-2 mb-6">
          <p className="text-xl md:text-2xl text-zinc-500 font-medium">
            danskere skiftede adresse i 2025
          </p>
          <SourceBadge source={SOURCES.dst} />
        </motion.div>
        <motion.p variants={fadeUpVariant} className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Det svarer til estimeret <strong className="text-zinc-600">40 millioner kasseanvendelser</strong> - og de fleste papkasser bruges kun én eller to gang før de smides ud.
        </motion.p>
      </motion.div>
    </section>
  )
}

function StatsRow() {
  return (
    <section className="pb-24 px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6"
      >
        <motion.div variants={fadeUpVariant}>
          <Card className="p-6 md:p-8 border-zinc-100 shadow-none text-center">
            <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {STATS.gnsBoligM2} m²
            </div>
            <div className="text-zinc-500 text-sm leading-relaxed">
              gennemsnitlig boligstørrelse for den typiske lejer-flytning
            </div>
            <div className="mt-3">
              <SourceBadge source={SOURCES.bolius} />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeUpVariant}>
          <Card className="p-6 md:p-8 border-zinc-100 shadow-none text-center">
            <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2 tabular-nums">
              ~8 mio.
            </div>
            <div className="text-zinc-500 text-sm leading-relaxed">
              papkasser smides ud hvert år i Danmark*
            </div>
            <div className="mt-3 text-xs text-zinc-400">*estimat ved 5× genbrug</div>
          </Card>
        </motion.div>

        <motion.div variants={fadeUpVariant}>
          <Card className="p-6 md:p-8 border-zinc-100 shadow-none text-center">
            <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2 tabular-nums">
              ~{STATS.tonAffalPerAar.toLocaleString("da-DK")} t
            </div>
            <div className="text-zinc-500 text-sm leading-relaxed">
              ton pap-affald fra flytninger hvert år*
            </div>
            <div className="mt-3 text-xs text-zinc-400">*ved 1,2 kg/kasse</div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Problem() {
  return (
    <section className="py-24 md:py-32 px-6 bg-zinc-50 rounded-[3rem] mx-4 md:mx-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1 relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-zinc-200"
        >
          <img
            src="/images/living-room.png"
            alt="Stue fuld af papkasser ved flytning"
            className="object-cover w-full h-full"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="order-1 md:order-2"
        >
          <motion.h2 variants={fadeUpVariant} className="text-4xl font-bold tracking-tight mb-4">
            Over 40 millioner gange hvert år
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-zinc-500 mb-8 leading-relaxed">
            Hvert år pakker hundredtusindvis af danskere deres ejendele ned i papkasser — købt i byggemarkedet, samlet med tape, brugt én gang og smidt ud. Det er der ingen god grund til.
          </motion.p>
          <div className="space-y-6">
            <motion.div variants={fadeUpVariant} className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-zinc-100">
                <Trash2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Engangsaffald efter flytningen</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  En gennemsnitlig flytning på 80 m² efterlader ~80 sammenklappede papkasser — ca. 96 kg pap-affald der skal afleveres til genbrugspladsen. På landsplan løber det op i over <strong className="text-zinc-700">9.700 ton pap-affald</strong> hvert eneste år.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeUpVariant} className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-zinc-100">
                <TreePine className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">8 millioner nye kasser hvert år</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Selv hvis alle kasser genbruges 5 gange — et optimistisk estimat — kræver det stadig produktion af millioner af nye kasser om året i Danmark alene.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeUpVariant} className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-zinc-100">
                <Recycle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Der findes et bedre alternativ</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Robuste plastikkasser kan bruges hundredvis af gange, leveres til din dør og hentes igen — til samme pris som at købe papkasser.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function BoxCalculator() {
  const [m2, setM2] = useState<number | "">(60)

  const validM2 = typeof m2 === "number" && m2 >= 10 && m2 <= 500
  const boxes = validM2 ? Math.round(m2 * STATS.kasserPerM2) : null
  const papCost = boxes !== null ? boxes * STATS.papkassePrisKr : null
  const papWeight = boxes !== null ? Math.round(boxes * STATS.papkasseVaegtKg) : null

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpVariant} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Hvad med din flytning?
            </h2>
            <p className="text-lg text-zinc-500">
              Indtast din boligstørrelse og se, hvad en papkasse-flytning faktisk koster — i kroner og affald.
            </p>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="bg-zinc-50 rounded-3xl p-8 md:p-12">
            <div className="mb-8">
              <label className="block text-sm font-semibold text-zinc-700 mb-3">
                Din boligstørrelse (m²)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min={10}
                  max={500}
                  value={m2}
                  onChange={(e) => {
                    const val = e.target.value
                    setM2(val === "" ? "" : Number(val))
                  }}
                  className="w-36 h-14 text-2xl font-bold text-center border-2 border-zinc-200 rounded-2xl bg-white focus:border-primary focus:outline-none transition-colors tabular-nums"
                  placeholder="60"
                />
                <span className="text-zinc-400 text-lg">m²</span>
              </div>
              {!validM2 && m2 !== "" && (
                <p className="text-sm text-zinc-400 mt-2">Indtast et tal mellem 10 og 500 m²</p>
              )}
            </div>

            {boxes !== null && papCost !== null && papWeight !== null ? (
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-6 text-center border border-zinc-100">
                  <div className="text-3xl font-bold tracking-tight mb-1 tabular-nums">
                    ~{boxes}
                  </div>
                  <div className="text-zinc-500 text-sm">papkasser</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center border border-zinc-100">
                  <div className="text-3xl font-bold tracking-tight mb-1 tabular-nums">
                    ~{papCost.toLocaleString("da-DK")} kr.
                  </div>
                  <div className="text-zinc-500 text-sm">i papkasser</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center border border-zinc-100">
                  <div className="text-3xl font-bold tracking-tight mb-1 tabular-nums">
                    ~{papWeight} kg
                  </div>
                  <div className="text-zinc-500 text-sm">pap-affald bagefter</div>
                </div>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Methodology() {
  return (
    <section className="py-16 px-6 border-t border-zinc-100">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUpVariant} className="text-2xl font-bold tracking-tight mb-2">
            Hvordan beregner vi dette?
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-zinc-500 mb-8 text-sm">
            Tallene på denne side er baseret på offentligt tilgængeligt data og en transparent beregningsmetode.
          </motion.p>

          <motion.div variants={fadeUpVariant}>
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="beregning" className="border border-zinc-100 rounded-2xl px-6 overflow-hidden">
                <AccordionTrigger className="text-sm font-semibold text-zinc-700 hover:no-underline">
                  Se beregningen trin for trin
                </AccordionTrigger>
                <AccordionContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-zinc-100">
                          <th className="text-left py-2 pr-4 font-semibold text-zinc-600 w-6">#</th>
                          <th className="text-left py-2 pr-4 font-semibold text-zinc-600">Variabel</th>
                          <th className="text-left py-2 pr-4 font-semibold text-zinc-600 tabular-nums">Værdi</th>
                          <th className="text-left py-2 font-semibold text-zinc-600">Kilde</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-50">
                        <tr>
                          <td className="py-3 pr-4 text-zinc-400">1</td>
                          <td className="py-3 pr-4 text-zinc-600">Registrerede flytninger/år</td>
                          <td className="py-3 pr-4 font-medium tabular-nums">861.718</td>
                          <td className="py-3"><SourceBadge source={SOURCES.dst} /></td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 text-zinc-400">2</td>
                          <td className="py-3 pr-4 text-zinc-600">Husholdningsfaktor (÷ 1,7)</td>
                          <td className="py-3 pr-4 font-medium tabular-nums">507.000</td>
                          <td className="py-3 text-xs text-zinc-400 italic">inference</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 text-zinc-400">3</td>
                          <td className="py-3 pr-4 text-zinc-600">Gns. boligstørrelse (lejer)</td>
                          <td className="py-3 pr-4 font-medium">80 m²</td>
                          <td className="py-3"><SourceBadge source={SOURCES.bolius} /></td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 text-zinc-400">4</td>
                          <td className="py-3 pr-4 text-zinc-600">Kasser pr. m²</td>
                          <td className="py-3 pr-4 font-medium">1</td>
                          <td className="py-3 text-xs text-zinc-400 italic">tommelfingerregel</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 text-zinc-400">5</td>
                          <td className="py-3 pr-4 text-zinc-600">Kasseanvendelser/år</td>
                          <td className="py-3 pr-4 font-medium tabular-nums">40.560.000</td>
                          <td className="py-3 text-xs text-zinc-400 italic">beregnet</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 text-zinc-400">6</td>
                          <td className="py-3 pr-4 text-zinc-600">Genbrug pr. kasse</td>
                          <td className="py-3 pr-4 font-medium">5×</td>
                          <td className="py-3"><SourceBadge source={SOURCES.unitedContainer} /></td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 text-zinc-400">7</td>
                          <td className="py-3 pr-4 font-semibold text-zinc-800">Nye kasser/år (estimat)</td>
                          <td className="py-3 pr-4 font-bold text-primary tabular-nums">8.112.000</td>
                          <td className="py-3 text-xs text-zinc-400 italic">beregnet</td>
                        </tr>
                        <tr className="bg-zinc-50">
                          <td className="py-3 pr-4 text-zinc-400">8</td>
                          <td className="py-3 pr-4 font-semibold text-zinc-800">Pap-affald/år (estimat)</td>
                          <td className="py-3 pr-4 font-bold text-primary tabular-nums">~9.734 ton</td>
                          <td className="py-3 text-xs text-zinc-400 italic">8.112.000 × 1,2 kg</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="kilder" className="border border-zinc-100 rounded-2xl px-6 overflow-hidden">
                <AccordionTrigger className="text-sm font-semibold text-zinc-700 hover:no-underline">
                  Datakilder
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-1">
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <div>
                        <a
                          href={SOURCES.dst.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-zinc-800 hover:text-primary transition-colors"
                        >
                          Danmarks Statistik — Flytninger i Danmark ↗
                        </a>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Officielle tal for indenlandske adresseflytninger. Opdateret februar 2026. n = 861.718 (2025).
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <div>
                        <a
                          href={SOURCES.bolius.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-zinc-800 hover:text-primary transition-colors"
                        >
                          Bolius — Gennemsnitlig boligstørrelse i Danmark ↗
                        </a>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Lejligheder: 79,1 m² i gennemsnit. Lejere: ~81 m² pr. husstand (1,8 pers. × 45 m²/pers.). Pr. 1. januar 2026.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <div>
                        <a
                          href={SOURCES.unitedContainer.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-zinc-800 hover:text-primary transition-colors"
                        >
                          United Container — Cardboard box reuse cycles ↗
                        </a>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Dobbeltvægs bølgepap-kasser: 4–6 genbrug. Vi bruger 5 som middelscenarie.
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-300 pt-2">
                      Sidst verificeret: 2026-05-27
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24 md:py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black opacity-10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Pap er fortid. Lej HeyBox i stedet.
          </h2>
          <p className="text-lg md:text-xl text-green-50 mb-10 max-w-2xl mx-auto">
            Robuste plastikkasser leveret til din dør — til samme pris som papkasser i byggemarkedet. Ingen affald, ingen besværet.
          </p>
          <Link href="/booking">
            <Button className="bg-white text-primary hover:bg-zinc-50 font-semibold text-lg px-10 h-14 rounded-full group">
              Bestil kasser nu
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-zinc-50 py-16 px-6 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <PackageCheck className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold tracking-tight text-zinc-900">HeyBox</span>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
            Lej robuste flyttekasser til samme pris som pap. Vi leverer til din dør og henter igen. Altid gratis.
          </p>
        </div>
        <div>
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
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
        <div>&copy; {new Date().getFullYear()} HeyBox ApS. Alle rettigheder forbeholdes.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-zinc-900 transition-colors">Instagram</a>
          <a href="#" className="hover:text-zinc-900 transition-colors">Facebook</a>
          <a href="#" className="hover:text-zinc-900 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
