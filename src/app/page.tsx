'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon, CheckCircle2, Truck, PackageCheck, Star, ArrowRight, ShieldCheck, Clock, MapPin, Smile, Check } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
        <div className="px-6 py-2 flex items-center justify-between">
          <div className="">
            <img
                src="/heybox-logo.svg"
                alt="heybox logo"
                className="w-20"
              />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#saadan-virker-det" className="hover:text-zinc-900 transition-colors">Sådan virker det</a>
            <a href="#fordele" className="hover:text-zinc-900 transition-colors">Fordele</a>
            <a href="#priser" className="hover:text-zinc-900 transition-colors">Priser</a>
            <a href="#anmeldelser" className="hover:text-zinc-900 transition-colors">Anmeldelser</a>
            <Button className="bg-primary hover:bg-[#246337] text-white font-medium px-6 rounded-full h-11 hidden md:inline-flex">
              Bestil nu
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1500px] min-h-[80vh] p-2 mt-20 mx-auto grid grid-cols-1 lg:grid-cols-2 md:gap-24 relative z-10">
          <div className="h-full flex items-center">
            <div className="w-2/3 md:1/3 lg:w-5/6 mx-auto relative mt-32 lg:mt-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className=""
              >
                <img
                  src="/images/heybox-angle-modified.png"
                  alt="Grønne plastikflyttekasser fra HeyBox stablet i en lys stue"
                  className="w-full"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="absolute top-[2%] md:top-[6%] left-[32%] md:left-[22%] lg:left-[32%] -translate-[100%]">
                <div className="text-left -rotate-25 pl-[25%] lg:pl-0">
                  <p className="font-bold text-lg leading-2 -ml-0.5">FRA</p>
                  <p className="font-black text-2xl lg:text-4xl">15.95 kr</p>
                </div>
                <img src="/arrow-down-01.svg" alt="Lej flyttekasser fra 15.95kr" className="ml-24 mt-2 w-20" />
              </motion.div>
            </div>
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="h-full flex items-center justify-center">
            <div className="">
              <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-bold leading-[1.2] tracking-tight mb-4">
                {/* Lej flyttekasser inkl. <span className="text-primary">levering og afhentning</span> fra samme priser som pap. */}
                Lej flyttekasser billigt og nemt.
              </motion.h1>
              <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl text-black/50 mb-8 leading-relaxed">
                Lej robuste plastikkasser fra samme priser som at købe papkasser i byggemarkedet og slæbe dem hjem selv.
                {/* Lej robuste plastikkasser inkl. levering og afhentning, til samme pris som at købe papkasser i byggemarkedet og slæbe dem hjem selv. */}

                {/* Slip du for turen til byggemarkedet for at købe papflyttekasser, slæbe dem hjem, samle dem og skille dig af med dem igen bag efter. */}
              </motion.p>
              <motion.ul variants={fadeUpVariant} className="text-xl mb-10">
                <li className="flex gap-2 items-center mb-1"><CheckIcon className="w-6 h-6 text-primary" />Inkl. levering</li>
                <li className="flex gap-2 items-center"><CheckIcon className="w-6 h-6 text-primary" />Inkl. afhentning</li>
              </motion.ul>
              <motion.div variants={fadeUpVariant}>
                <Button size="lg" className=" text-white rounded-full">
                  Bestil nu
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logos / Trust */}
      {/* <section className="py-12 border-y border-zinc-100 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-zinc-400 mb-8 uppercase tracking-wider">Betroet af mere end 5.000 danskere</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale">
            <div className="text-xl font-bold font-serif">Trustpilot 5.0</div>
            <div className="text-xl font-bold">Børsen</div>
            <div className="text-xl font-bold font-serif">Politiken</div>
            <div className="text-xl font-bold">Berlingske</div>
          </div>
        </div>
      </section> */}

      {/* How it works */}
      <section id="saadan-virker-det" className="py-24 md:py-32 px-6 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-6">Det er virkelig simpelt</h2>
            <p className="text-lg text-zinc-500">
              Ingen tur til byggemarkedet. Ingen kasser der skal samles. Ingen affald bagefter. Vi klarer alt det praktiske.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-12 relative"
          >
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-[2px] bg-zinc-100" />

            <motion.div variants={fadeUpVariant} className="relative flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-2 border-zinc-100 rounded-2xl flex items-center justify-center mb-8 relative z-10 group-hover:border-primary transition-colors duration-300">
                <Truck className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">1. Vi leverer</h3>
              <p className="text-zinc-500 leading-relaxed">
                Bestil online og vælg en leveringstid der passer dig. Vi kører kasserne direkte til din nuværende adresse, helt gratis.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="relative flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-2 border-zinc-100 rounded-2xl flex items-center justify-center mb-8 relative z-10 group-hover:border-primary transition-colors duration-300">
                <PackageCheck className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">2. Du pakker</h3>
              <p className="text-zinc-500 leading-relaxed">
                Ingen tape, ingen samling, ingen frustration. Kasserne lukkes med et klik og stables perfekt i flyttebilen.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="relative flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-2 border-zinc-100 rounded-2xl flex items-center justify-center mb-8 relative z-10 group-hover:border-primary transition-colors duration-300">
                <Clock className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">3. Vi henter</h3>
              <p className="text-zinc-500 leading-relaxed">
                Når du er på plads i din nye bolig, aftaler vi en tid og henter kasserne igen. Du behøver ikke forlade hjemmet.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why HeyBox */}
      <section id="fordele" className="py-24 md:py-32 px-6 bg-zinc-50 rounded-[3rem] mx-4 md:mx-8">
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
              alt="Grønne HeyBox-kasser klar til brug i en lys stue"
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
            <motion.h2 variants={fadeUpVariant} className="text-4xl font-bold tracking-tight mb-8">Samme pris. Langt mindre besvær.</motion.h2>
            <div className="space-y-8">
              <motion.div variants={fadeUpVariant} className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-zinc-100">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Ingen tur til byggemarkedet</h4>
                  <p className="text-zinc-500">Drop køen i Bauhaus. Vores kasser koster det samme som papkasser, men vi leverer dem direkte til din dør, så du kan bruge tiden på det der betyder noget.</p>
                </div>
              </motion.div>
              <motion.div variants={fadeUpVariant} className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-zinc-100">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Stærkere og nemmere end pap</h4>
                  <p className="text-zinc-500">Ingen kasser der skal samles med tape. Ingen bunde der falder ud. Vores kasser er robuste, stables perfekt og lukkes med et enkelt klik.</p>
                </div>
              </motion.div>
              <motion.div variants={fadeUpVariant} className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-zinc-100">
                  <Smile className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Intet oprydningsarbejde bagefter</h4>
                  <p className="text-zinc-500">Med papkasser sidder du tilbage med et bjerg af affald når flytningen er overstået. Med HeyBox henter vi blot kasserne, og du er fri.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="priser" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-6">Pakkepriser til alle boligstørrelser</h2>
            <p className="text-lg text-zinc-500">
              Lej i 14 dage til samme pris som at købe papkasser. Levering og afhentning er altid inkluderet.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeUpVariant}>
              <Card className="p-8 border-zinc-200 shadow-none hover:border-primary/50 transition-colors flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-2">Lille lejlighed</h3>
                <p className="text-zinc-500 mb-6">Op til 50 m²</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold">499,-</span>
                  <span className="text-zinc-500"> / 14 dage</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>30 HeyBox kasser</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Gratis levering</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Gratis afhentning</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Rengjorte kasser</span>
                  </li>
                </ul>
                <Button className="w-full font-semibold h-12 bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl">Vælg lille</Button>
              </Card>
            </motion.div>

            <motion.div variants={fadeUpVariant}>
              <Card className="p-8 border-primary border-2 shadow-lg relative flex flex-col h-full">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide">
                  MEST POPULÆRE
                </div>
                <h3 className="text-2xl font-bold mb-2">Mellem bolig</h3>
                <p className="text-zinc-500 mb-6">50 - 90 m²</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold">799,-</span>
                  <span className="text-zinc-500"> / 14 dage</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium">50 HeyBox kasser</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Gratis levering</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Gratis afhentning</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Rengjorte kasser</span>
                  </li>
                </ul>
                <Button className="w-full font-semibold h-12 bg-primary text-white hover:bg-[#246337] rounded-xl">Vælg mellem</Button>
              </Card>
            </motion.div>

            <motion.div variants={fadeUpVariant}>
              <Card className="p-8 border-zinc-200 shadow-none hover:border-primary/50 transition-colors flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-2">Stor bolig / Hus</h3>
                <p className="text-zinc-500 mb-6">Over 90 m²</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold">1.199,-</span>
                  <span className="text-zinc-500"> / 14 dage</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>80 HeyBox kasser</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Gratis levering</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Gratis afhentning</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Rengjorte kasser</span>
                  </li>
                </ul>
                <Button className="w-full font-semibold h-12 bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl">Vælg stor</Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="anmeldelser" className="py-24 px-6 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4">Det siger vores kunder</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-primary text-primary" />)}
              </div>
              <span className="font-semibold ml-2">4.9 / 5</span>
              <span className="text-zinc-500 ml-1">på Trustpilot</span>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeUpVariant} className="p-8 bg-zinc-50 rounded-3xl">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <p className="text-lg mb-6 text-zinc-700">"Vi sparte så meget tid ved ikke at skulle hente og skaffe kasser selv. HeyBox leverede om morgenen og hentede igen to uger senere. Nemmeste del af hele flytningen."</p>
              <div className="font-semibold">Mette Jensen</div>
              <div className="text-sm text-zinc-500">Flyttede fra Vesterbro til Frederiksberg</div>
            </motion.div>
            <motion.div variants={fadeUpVariant} className="p-8 bg-zinc-50 rounded-3xl">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <p className="text-lg mb-6 text-zinc-700">"Kostede det samme som at købe papkasser fra Bauhaus, men vi slap for turen, og de hentede dem igen bagefter. Helt ærligt, hvorfor gjorde vi det ikke altid?"</p>
              <div className="font-semibold">Thomas Larsen</div>
              <div className="text-sm text-zinc-500">Flyttede fra Aarhus til Odense</div>
            </motion.div>
            <motion.div variants={fadeUpVariant} className="p-8 bg-zinc-50 rounded-3xl">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <p className="text-lg mb-6 text-zinc-700">"Det er jo nærmest for nemt. Bestilte online, de kom til tiden, og en uge efter flytningen hentede de det hele. Ingen papkasser der slæbtes ned til genbruget."</p>
              <div className="font-semibold">Sofie og Anders</div>
              <div className="text-sm text-zinc-500">Flyttede i hus i Rødovre</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black opacity-10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Klar til en flytning der bare kører?</h2>
            <p className="text-lg md:text-xl text-green-50 mb-10 max-w-2xl mx-auto">
              Bestil dine kasser online på få minutter. Vi leverer, du pakker, vi henter. Ingen overraskelser, ingen ekstraomkostninger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-zinc-50 font-semibold text-lg px-10 h-14 rounded-full group">
                Bestil kasser nu
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
