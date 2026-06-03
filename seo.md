# heybox.dk — SEO / GEO / AEO Audit Report

**Audit type:** Quick Audit
**Audit date:** 2026-06-01
**Pages reviewed (5):** `/` (Homepage), `/booking`, `/statestik`, `/terms`, plus checks of `/robots.txt` and `/sitemap.xml`

> A quick note on terms: **SEO** is traditional search ranking (Google/Bing). **GEO** (Generative Engine Optimization) is about being cited by AI answer engines like Perplexity, ChatGPT Search, and Google AI Overviews. **AEO** (Answer Engine Optimization) is about winning featured snippets, "People Also Ask" boxes, and voice answers. They overlap, but each rewards slightly different things.

---

## Scorecard

| Dimension | Score | Status | Key takeaway |
|---|---|---|---|
| **SEO** | 4/10 | 🔴 Needs Work | Good titles and alt text, but `lang="en"` bug, no sitemap/robots, multiple H1s, no canonical/OG, zero schema. |
| **GEO** | 5/10 | 🟠 Needs Work | Outstanding cited factual content, but no Organization schema, weak E-E-A-T, broken footer. |
| **AEO** | 4/10 | 🔴 Needs Work | Great question-headings and step content, but no FAQ/HowTo/LocalBusiness schema at all. |
| **Combined** | **13/30** | | A strong content foundation undermined by missing technical fundamentals. |

---

## Executive Summary

heybox.dk is a well-written, content-rich landing site for a Copenhagen moving-box rental service, and its single biggest strength is genuinely unusual: it backs up its environmental claims with **specific statistics and citations to authoritative external sources** (Danmarks Statistik, Bolius, KL, United Container) — exactly the kind of factual density that AI/generative engines prefer to cite. However, that content sits on top of missing technical fundamentals. The most urgent issue is that the root layout declares `<html lang="en">` while the entire site is in Danish, which actively misleads search engines and breaks accessibility. Compounding this, there is **no `robots.txt`, no `sitemap.xml`, and zero structured data (JSON-LD)** anywhere on the site, the homepage carries **three competing `<h1>` elements**, and the strong `/statestik` statistics page is both **misspelled in its URL** and **orphaned** because the homepage navigation and footer links are commented out in the code. The single highest-leverage opportunity: add JSON-LD (`Organization` + `LocalBusiness` + `HowTo` + `FAQPage`), fix the language attribute, and ship a sitemap/robots pair — together these would move all three scores up meaningfully with about a day of work.

---

## Pages Audited

| URL | Page Type | Notes |
|---|---|---|
| `https://heybox.dk/` | Homepage | Client-rendered (`'use client'`); 3× `<h1>`; rich cited stats; footer links commented out |
| `https://heybox.dk/booking` | Booking wizard | Inherits root title; no page-specific metadata; multi-step location form |
| `https://heybox.dk/statestik` | Statistics / data page | **Misspelled URL** (should be `statistik`); orphaned (not linked from nav); excellent content; accordion + calculator |
| `https://heybox.dk/terms` | Terms & conditions | Has own `metadata.title`; contains the only real company/contact info (`HeyBox ApS`, `hey@heybox.dk`) |
| `https://heybox.dk/robots.txt` | — | **HTTP 404** — does not exist |
| `https://heybox.dk/sitemap.xml` | — | **HTTP 404** — does not exist |

Also exists but not separately fetched: `/booking/confirmation` (thank-you page, no SEO value).

---

## SEO Analysis — 4/10

### Technical On-Page

| Signal | Finding | Status |
|---|---|---|
| Title tag | Homepage: `"heybox! Lej flyttekasser til flytning"` (38 chars) — keyword-rich and clear, but a touch short. Terms page has its own good title. Booking inherits the root title rather than a tailored one. | 🟡 Needs Attention |
| Meta description | Present and well-written: *"Lej stærke flyttekasser til præcis samme pris som pap. Levering og afhentning inkluderet. Ingen bil nødvendig."* (~110 chars). Could extend toward 150–160 and add a CTA. No per-page descriptions. | 🟡 Needs Attention |
| `<html lang>` | Set to `lang="en"` in `src/app/layout.tsx` while 100% of content is **Danish**. Misleads crawlers and screen readers. Should be `lang="da"`. | 🔴 Missing/Wrong |
| Heading hierarchy | Homepage has **three `<h1>`**: hero ("Lej flyttekasser billigt og nemt"), the menu logo ("heybox!"), and the footer logo ("heybox!"). Should be exactly one `<h1>`; demote the logos to styled `<span>`/`<div>`. | 🔴 Needs Attention |
| URL structure | Clean and readable (`/booking`, `/terms`). But `/statestik` is **misspelled** (should be `/statistik`) — hurts keyword relevance and looks unprofessional. | 🟡 Needs Attention |
| Canonical tag | None defined (no `alternates.canonical` / `metadataBase`). | 🔴 Missing |
| Robots meta | No explicit robots meta; no accidental `noindex` detected (default indexable). | 🟢 Good |
| Viewport / mobile | Next.js injects a default viewport; layout is responsive (Tailwind breakpoints throughout). | 🟢 Good |
| Image alt text | **Strong** — all images have descriptive Danish alt text (e.g. *"Grønne plastikflyttekasser fra HeyBox stablet i en lys stue"*, *"Bus proppet med mennesker - illustration"*). | 🟢 Good |
| Internal links | Weak. Almost every link points to `/booking`. The homepage does **not** link to `/statestik` or `/terms` (footer link lists are commented out in `page.tsx`). | 🔴 Needs Attention |
| Open Graph / Twitter | **None.** No `og:title`, `og:description`, `og:image`, or Twitter Card tags. Shared links will render with no preview image or rich card. | 🔴 Missing |
| robots.txt | **404** — no `app/robots.ts`. | 🔴 Missing |
| sitemap.xml | **404** — no `app/sitemap.ts`. | 🔴 Missing |
| Favicon / icons | No icon declared in metadata; could not confirm one is served. | 🟡 Verify |

### Content Quality

| Signal | Finding | Status |
|---|---|---|
| Word count | Homepage is content-rich for a landing page (multiple sections, stats, sources). `/statestik` is genuinely substantial. Booking is thin by nature (a form). | 🟢 Good |
| Keyword signals | Primary topic ("lej flyttekasser", "flytning", "København/Storkøbenhavn") is clear and consistently reinforced. Strong semantic coverage (pap vs. plast, genbrug, affald). | 🟢 Good |
| Freshness signals | `/statestik` shows *"Sidst verificeret: 2026-05-27"* and dated sources — excellent. Homepage and other pages have no visible dates. | 🟡 Needs Attention |
| Readability | Excellent — short paragraphs, clear subheadings, bulleted/columned stats, scannable structure. | 🟢 Good |

### Structured Data

| Signal | Finding | Status |
|---|---|---|
| Schema markup | **None on any page.** No JSON-LD, no microdata. No `Organization`, `LocalBusiness`, `Product`, `FAQPage`, `HowTo`, or `BreadcrumbList`. | 🔴 Missing |
| Schema validity | N/A — nothing to validate. | 🔴 Missing |

---

## GEO Analysis — 5/10

### E-E-A-T Assessment

| Signal | Finding | Status |
|---|---|---|
| Author / org info | No About page, no team, no "who we are" content. The only company identity lives on `/terms`: *"HeyBox er en service leveret af HeyBox ApS, København, Danmark."* | 🔴 Needs Attention |
| About page | Does not exist. | 🔴 Missing |
| Contact info | Email `hey@heybox.dk` appears on `/terms`. A phone (`+45 70 12 34 56`) and hours exist **only in commented-out footer code** on the statistics page — not live. | 🟡 Needs Attention |
| Trust signals | No testimonials, reviews, awards, or press mentions anywhere. (A "Anmeldelser"/reviews footer link exists but is commented out.) | 🔴 Missing |
| Organization schema | Not present. The brand entity is never declared in machine-readable form. | 🔴 Missing |

### Content for AI Synthesis

| Signal | Finding | Status |
|---|---|---|
| Factual density | **Excellent and rare** — concrete figures (861.718 adresseflytninger/år, ~40 mio. kasseanvendelser, ~8 mio. kasser, ~9.734 ton pap-affald) with a transparent step-by-step methodology table on `/statestik`. | 🟢 Strong |
| Clear claims | Value proposition is stated plainly and early: rent sturdy plastic boxes "til præcis samme pris som pap", delivery and pickup included. | 🟢 Good |
| Source citation | **Strong** — external links with `rel="noopener noreferrer"` to Danmarks Statistik, Bolius, KL, and United Container. | 🟢 Good |
| Comprehensiveness | Covers the problem (cardboard waste), the offer, the process, and the data well — though it never answers practical buyer questions (delivery timing, box sizes, deposit, cancellation). | 🟡 Needs Attention |
| Entity clarity | Brand naming is **inconsistent**: "heybox!", "HeyBox", and "HeyBox ApS" all appear. Pick one canonical spelling for entity recognition. | 🟡 Needs Attention |
| Originality | The waste-impact calculation with a published methodology is a genuine original-data asset AI engines would prefer to cite. | 🟢 Strong |

### Technical GEO

| Signal | Finding | Status |
|---|---|---|
| Rich schema types | None (no `Dataset`, `ClaimReview`, `SpeakableSpecification`, `Author`). The `/statestik` data is a perfect `Dataset`/`ClaimReview` candidate. | 🔴 Missing |
| HTTPS / security | Served over HTTPS. | 🟢 Good |
| Crawlability | Pages use `'use client'`, but Next.js still server-renders initial HTML so content is present for crawlers. No `robots.txt` blocks (because there is no robots.txt at all). | 🟡 Needs Attention |
| sameAs / social links | None live. Instagram/Facebook/LinkedIn links exist only in commented-out footer code — no entity graph is established. | 🔴 Missing |

---

## AEO Analysis — 4/10

### Featured Snippet Eligibility

| Signal | Finding | Status |
|---|---|---|
| Direct answer paragraphs | Some concise, quotable explanations (e.g. the 3-step "Vi leverer / Du pakker / Vi henter"), but not paired with question-phrased headings on the homepage. | 🟡 Needs Attention |
| Definition patterns | No clear "Hvad er en flyttekasse-leje?" style definition sentence. | 🟡 Needs Attention |
| List content | Strong — the 3-step process and the methodology table are snippet-friendly. | 🟢 Good |
| Table content | `/statestik` has a clean methodology table (variable / value / source) — good table-snippet candidate. | 🟢 Good |

### Structured Answer Formats

| Signal | Finding | Status |
|---|---|---|
| FAQ schema | None — and there is no FAQ page at all, despite obvious buyer questions (price, delivery area, box count, timing). | 🔴 Missing |
| HowTo schema | None — yet the "1. Vi leverer → 2. Du pakker & flytter → 3. Vi henter" content is a textbook `HowTo` candidate. | 🔴 Missing |
| Question-phrased headings | Present in places: *"Klar til en flytning der bare kører?"*, *"Hvad med din flytning?"*, *"Hvordan beregner vi dette?"* — good instinct, underused. | 🟡 Needs Attention |
| Speakable schema | None. | 🔴 Missing |

### Voice Search Readiness

| Signal | Finding | Status |
|---|---|---|
| Conversational language | Natural, friendly Danish tone throughout. | 🟢 Good |
| Long-tail question coverage | Limited — no dedicated content targeting "hvad koster det at leje flyttekasser i København", "hvor mange flyttekasser skal jeg bruge", etc. | 🟡 Needs Attention |
| Local signals (NAP) | Weak. "Storkøbenhavn"/"København" mentioned, but **no `LocalBusiness` schema, no structured address, and no live phone number** (commented out). Service area is stated in prose only. | 🔴 Needs Attention |

---

## Priority Recommendations

| Priority | Issue | Dimension | Effort | Impact |
|---|---|---|---|---|
| 🔴 Critical | Change `<html lang="en">` → `lang="da"` in `src/app/layout.tsx` | SEO/Access | Trivial | High |
| 🔴 Critical | Add `app/sitemap.ts` and `app/robots.ts` (currently both 404) | SEO | Low | High |
| 🔴 Critical | Add JSON-LD: `Organization` + `LocalBusiness` (NAP, service area = Storkøbenhavn) site-wide | SEO/GEO/AEO | Medium | High |
| 🟠 High | Fix the homepage's three `<h1>`s — keep one, demote logos to spans | SEO | Low | Medium |
| 🟠 High | Rename `/statestik` → `/statistik` (301 the old path) and link it from the homepage nav/footer (links are currently commented out) | SEO/GEO | Low | Medium |
| 🟠 High | Add Open Graph + Twitter Card tags with an `og:image` (and `metadataBase`) | SEO | Low | Medium |
| 🟠 High | Add `HowTo` schema to the "Sådan virker det" 3-step section | AEO | Low | Medium |
| 🟡 Medium | Restore the real footer (company info, contact, links) — currently commented out on homepage | GEO | Low | Medium |
| 🟡 Medium | Build a FAQ section/page (price, delivery area, box count, timing, deposit) with `FAQPage` schema | AEO | Medium | High |
| 🟡 Medium | Add per-page `metadata` (title + description) for `/booking` and `/statistik` | SEO | Low | Medium |
| 🟡 Medium | Standardize brand spelling (pick "HeyBox") for entity clarity; add `sameAs` social links | GEO | Low | Medium |
| 🟢 Quick Win | Add a self-referencing canonical via `metadataBase` + `alternates.canonical` | SEO | Trivial | Low |
| 🟢 Quick Win | Add an About page (who runs HeyBox, why) to strengthen E-E-A-T | GEO | Low | Medium |
| 🟢 Quick Win | Mark the `/statistik` figures with `Dataset`/`ClaimReview` schema to maximize AI citation | GEO | Medium | Medium |

---

## What's Working Well

| Strength | Evidence |
|---|---|
| **Cited, original factual content** | Real statistics with named, linked sources (DST, Bolius, KL, United Container) and a transparent step-by-step methodology table — the strongest GEO asset on the site. |
| **Freshness / verification signals** | `/statestik` shows *"Sidst verificeret: 2026-05-27"* and dated sources ("DST 2025", "Bolius 2026"). |
| **Descriptive image alt text** | Every image has meaningful Danish alt text, not filenames or blanks. |
| **Clear, keyword-rich title & description** | `"heybox! Lej flyttekasser til flytning"` + a benefit-led meta description hitting the core query. |
| **Strong readability & scannability** | Short paragraphs, clear section headings, columned stats, and an interactive cost/waste calculator on `/statestik`. |
| **Consistent value proposition** | "Same price as cardboard, delivered and collected, no car needed" is stated plainly and reinforced throughout. |
| **HTTPS + responsive design** | Secure and mobile-friendly across breakpoints. |

---

## What I Could Not Assess Here

These need dedicated tools beyond HTML/source inspection:

- **Core Web Vitals / page speed** → run [pagespeed.web.dev](https://pagespeed.web.dev) (note: `/statestik` uses framer-motion animations that can affect LCP/CLS).
- **Mobile rendering fidelity** → Google's Mobile-Friendly / Rich Results tests.
- **Backlink profile & domain authority** → Ahrefs, Semrush, or Moz.
- **Live schema validation** → once you add JSON-LD, validate at [validator.schema.org](https://validator.schema.org) and Google's Rich Results Test.

---

### Next steps

I can go deeper on any area — for example, draft the exact `sitemap.ts`, `robots.ts`, and JSON-LD (`Organization`/`LocalBusiness`/`HowTo`/`FAQPage`) blocks ready to drop into the codebase, fix the `lang` and multiple-`<h1>` issues directly, or re-run this audit after you've made changes. Just say the word.

*Report written to `seo.md`. Quick Audit · heybox.dk · 2026-06-01.*
