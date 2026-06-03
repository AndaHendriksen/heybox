export const SITE_URL = "https://heybox.dk"
export const BRAND = "heybox"
export const LEGAL_NAME = "HeyBox ApS"
export const LOCALE = "da_DK"
export const CONTACT_EMAIL = "hey@heybox.dk"
export const AREA_SERVED = "Storkøbenhavn"
export const LOCALITY = "København"
export const COUNTRY = "DK"
export const LOGO_URL = `${SITE_URL}/heybox-logo.svg`

export const HOW_IT_WORKS_STEPS = [
  {
    name: "Vi leverer",
    text: "Vælg en dato der passer dig, så leverer vi kasserne. Gratis.",
  },
  {
    name: "Du pakker & flytter",
    text: "Ingen tape, ingen samling, ingen frustration. Solide kasser der passer på dine ting.",
  },
  {
    name: "Vi henter",
    text: "Når du er på plads i din nye bolig, henter vi kasserne igen. Simpelt.",
  },
] as const

export interface FaqItem {
  q: string
  a: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Hvad koster det at leje flyttekasser hos heybox?",
    a: "Priserne starter ved 13,95 kr. pr. kasse, og levering og afhentning er altid inkluderet. Du betaler stort set samme pris som for papkasser i byggemarkedet - men slipper for turen, slæbet og affaldet bagefter.",
  },
  {
    q: "Hvor leverer I flyttekasser?",
    a: "Vi leverer og henter i hele Storkøbenhavn. Du angiver blot din leveringsadresse og afhentningsadresse, når du booker, så klarer vi resten.",
  },
  {
    q: "Hvor mange flyttekasser har jeg brug for?",
    a: "En god tommelfingerregel er cirka én kasse pr. kvadratmeter bolig. En lejlighed på 60 m² svarer altså til omkring 60 kasser. Er du i tvivl, så vælg lidt flere - det er nemmere end at mangle.",
  },
  {
    q: "Hvordan foregår levering og afhentning?",
    a: "Du vælger selv leveringsdato, når du booker. Vi leverer kasserne gratis til enten hoveddøren eller ind i din bolig (tilvalg). Og når du er på plads i din nye bolig, henter vi dem igen på den aftalte afhentningsdato.",
  },
  {
    q: "Hvordan betaler jeg?",
    a: "Du betaler nemt via MobilePay i forbindelse med leveringen. Ingen skjulte gebyrer og ingen ekstraomkostninger - prisen er den, du ser ved bestilling.",
  },
  {
    q: "Hvorfor er plastkasser bedre end papkasser?",
    a: "Plastkasserne er stærkere, stables perfekt og lukkes med ét klik - ingen tape og ingen bunde der falder ud. De bruges igen og igen, så du undgår bunker af papaffald efter flytningen.",
  },
]

type JsonLdObject = Record<string, unknown>

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    email: CONTACT_EMAIL,
    areaServed: AREA_SERVED,
    // sameAs intentionally omitted - no confirmed social profiles yet.
  }
}

export function localBusinessJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: BRAND,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    image: LOGO_URL,
    email: CONTACT_EMAIL,
    priceRange: "fra 13,95 kr. pr. kasse",
    areaServed: AREA_SERVED,
    address: {
      "@type": "PostalAddress",
      addressLocality: LOCALITY,
      addressCountry: COUNTRY,
    },
    // telephone intentionally omitted - no confirmed public number yet.
  }
}

export function howToJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Sådan lejer du flyttekasser hos heybox",
    description:
      "Lej robuste plastflyttekasser i Storkøbenhavn i tre enkle trin: vi leverer, du pakker og flytter, og vi henter kasserne igen.",
    step: HOW_IT_WORKS_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

export function faqJsonLd(items: FaqItem[] = FAQ_ITEMS): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }
}
