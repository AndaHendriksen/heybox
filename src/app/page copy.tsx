import Image from "next/image";

const steps = [
  {
    step: "01",
    title: "Bestil online",
    desc: "Vælg antal kasser og leveringsdato. Det tager under 2 minutter.",
  },
  {
    step: "02",
    title: "Vi leverer",
    desc: "Kasserne ankommer til din dør, klar til at pakke. Ingen tur i byggemarkeden.",
  },
  {
    step: "03",
    title: "Vi henter",
    desc: "Pakket ud? Vi henter kasserne igen. Du behøver ikke løfte en finger.",
  },
];

const perks = [
  "Knækker ikke under tunge ting",
  "Stables sikkert uden at vælte",
  "Genbrugelige – reducerer affald",
  "Ingen tape, ingen kludder",
];

const tiers = [
  {
    name: "Lille flytning",
    boxes: "10 kasser",
    price: "299",
    note: "Fx et værelse",
    highlight: false,
  },
  {
    name: "Mellemstor flytning",
    boxes: "20 kasser",
    price: "499",
    note: "Fx en 2-værelses",
    highlight: true,
  },
  {
    name: "Stor flytning",
    boxes: "30 kasser",
    price: "699",
    note: "Fx en 3+ værelses",
    highlight: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Image
            src="/heybox-logo.svg"
            alt="heybox"
            width={110}
            height={29}
            priority
          />
          <a
            href="#bestil"
            className="bg-[#3DB98B] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#065e4a] transition-colors"
          >
            Book kasser
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#3DB98B]/10 text-[#3DB98B] text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <span>✦</span> Levering og afhentning altid inkluderet
          </div>
          <h1 className="text-6xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
            Kasser til flytning.
            <br />
            <span className="text-[#3DB98B]">Ingen bil nødvendig.</span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-xl">
            Lej stærke plastikkasser til præcis samme pris som pap. Vi leverer
            til din dør og henter igen, når du er færdig.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#bestil"
              className="bg-[#3DB98B] text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-[#065e4a] transition-colors shadow-lg shadow-[#3DB98B]/20"
            >
              Book dine kasser
            </a>
            <a
              href="#hvordan"
              className="text-gray-400 text-sm hover:text-gray-700 transition-colors"
            >
              Sådan virker det →
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-t border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              icon: "📦",
              title: "Samme pris som pap",
              sub: "Ingen ekstra udgifter",
            },
            {
              icon: "🚐",
              title: "Levering inkluderet",
              sub: "Vi bringer kasserne til dig",
            },
            {
              icon: "🔄",
              title: "Afhentning inkluderet",
              sub: "Vi henter, når du er klar",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              <div className="w-11 h-11 bg-[#3DB98B]/10 rounded-xl flex items-center justify-center text-xl shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="hvordan" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-[#3DB98B] font-semibold text-xs tracking-widest uppercase mb-3">
            Simpelt
          </p>
          <h2 className="text-4xl font-bold text-gray-900">
            Tre trin. Så er du klar.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="relative">
              <span className="text-8xl font-bold text-gray-100 absolute -top-6 -left-2 select-none">
                {item.step}
              </span>
              <div className="relative pt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why plastic */}
      <section className="bg-[#3DB98B] text-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 gap-16 items-center sm:grid-cols-2">
            <div>
              <p className="text-[#7bc9b5] font-semibold text-xs tracking-widest uppercase mb-3">
                Hvorfor plastik?
              </p>
              <h2 className="text-4xl font-bold leading-tight mb-6">
                Pap er fra 1800-tallet.
                <br />
                Vi er ikke.
              </h2>
              <p className="text-[#c0e8df] text-lg leading-relaxed mb-10">
                Plastikkasser er stærkere, sværere at ødelægge og kan genbruges
                hundredvis af gange. Bedre for din flytning – og for klimaet.
              </p>
              <ul className="space-y-4">
                {perks.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-[#c0e8df]"
                  >
                    <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs text-white shrink-0">
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 rounded-3xl aspect-square max-w-xs mx-auto w-full flex items-center justify-center text-7xl">
              📦
            </div>
          </div>
        </div>
      </section>

      {/* For young movers callout */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="bg-gray-50 rounded-3xl px-12 py-16 text-center">
          <p className="text-[#3DB98B] font-semibold text-xs tracking-widest uppercase mb-3">
            Lavet til dig
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ingen bil? Ingen problem.
          </h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Vi ved, at de fleste unge ikke har bil. Derfor er levering og
            afhentning altid inkluderet. Du bare pakker.
          </p>
          <a
            href="#bestil"
            className="inline-block bg-[#3DB98B] text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-[#065e4a] transition-colors shadow-lg shadow-[#3DB98B]/20"
          >
            Kom i gang
          </a>
        </div>
      </section>

      {/* Pricing */}
      <section id="bestil" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <p className="text-[#3DB98B] font-semibold text-xs tracking-widest uppercase mb-3">
            Priser
          </p>
          <h2 className="text-4xl font-bold text-gray-900">
            Enkelt og transparent
          </h2>
          <p className="text-gray-400 mt-3">
            Ingen skjulte gebyrer. Levering og afhentning er altid inkluderet.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-8 border ${
                tier.highlight
                  ? "bg-[#3DB98B] text-white border-[#3DB98B] shadow-xl shadow-[#3DB98B]/20"
                  : "bg-white border-gray-200"
              }`}
            >
              <p
                className={`text-sm font-medium mb-1 ${
                  tier.highlight ? "text-[#7bc9b5]" : "text-gray-400"
                }`}
              >
                {tier.note}
              </p>
              <h3
                className={`text-xl font-bold mb-4 ${
                  tier.highlight ? "text-white" : "text-gray-900"
                }`}
              >
                {tier.name}
              </h3>
              <div className="mb-2">
                <span
                  className={`text-4xl font-bold ${
                    tier.highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {tier.price} kr
                </span>
              </div>
              <p
                className={`text-sm mb-8 ${
                  tier.highlight ? "text-[#c0e8df]" : "text-gray-400"
                }`}
              >
                {tier.boxes} inkl. levering &amp; afhentning
              </p>
              <a
                href="#"
                className={`block text-center py-3 rounded-full font-semibold text-sm transition-colors ${
                  tier.highlight
                    ? "bg-white text-[#3DB98B] hover:bg-gray-100"
                    : "bg-[#3DB98B] text-white hover:bg-[#065e4a]"
                }`}
              >
                Vælg
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-6 py-28 text-center">
          <h2 className="text-5xl font-bold mb-6">Klar til at flytte?</h2>
          <p className="text-gray-400 text-xl mb-10">
            Book dine kasser online på under 2 minutter.
          </p>
          <a
            href="#bestil"
            className="inline-block bg-[#3DB98B] text-white px-10 py-4 rounded-full text-base font-semibold hover:bg-[#065e4a] transition-colors shadow-lg shadow-[#3DB98B]/30"
          >
            Book nu →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <Image src="/heybox-logo.svg" alt="heybox" width={80} height={21} />
          <p className="text-gray-400 text-sm">
            © 2026 heybox. Alle rettigheder forbeholdes.
          </p>
        </div>
      </footer>
    </div>
  );
}
