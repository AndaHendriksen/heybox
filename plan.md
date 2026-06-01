# Plan: heybox.dk SEO / GEO / AEO Remediation

> **Status:** 🟡 In Progress | **Last Updated:** 2026-06-01
> **Scope:** `src/app/*` (metadata, layout, routing), `src/components/*` (footer, FAQ, JSON-LD), `public/*` (OG image)

---

## 1. Context & Objectives

**Goal:** Implement the remaining recommendations from `seo.md` so heybox.dk has correct technical SEO fundamentals (crawl files, canonical/OG/Twitter metadata), declares its brand entity to search + AI engines (Organization / LocalBusiness / HowTo / FAQPage JSON-LD), and strengthens E-E-A-T (real footer, About page, FAQ). "Done" = sitemap + robots resolve (no 404), every indexable route emits canonical + OG + Twitter tags, valid JSON-LD is present site-wide and on key pages, and the homepage footer/FAQ/About content is live.

**Already completed (out of scope):**
- ✅ `<html lang="en">` → `lang="da"` in `src/app/layout.tsx`.
- ✅ Homepage reduced to a single `<h1>` (logos demoted to spans).

**Explicitly excluded (per request):**
- ❌ Anything involving the `/statistik` rename or the `/statestik` page's `Dataset`/`ClaimReview` schema.

**Constraints:**
- **Next.js 16.2.6 / React 19, App Router.** Follow the bundled docs in `node_modules/next/dist/docs/` (this repo's Next has version-specific behavior — see AGENTS.md).
- **`metadata` / `generateMetadata` are Server-Component-only.** `src/app/page.tsx` is currently `'use client'`, so it cannot export page metadata until refactored (see Task A.0).
- Use existing stack only (Tailwind v4, radix-ui, lucide-react). **No new dependencies.**
- **Do not fabricate business data.** Phone/address/CVR and social profile URLs must be real (see §7 "Required inputs"). Placeholders must be clearly marked `TODO` and never shipped as if real.
- Maintain the current visual design; changes are additive (metadata, schema, restored footer, new sections/pages).

---

## 2. Technical Research & State

- **Affected / new files:**
  - `src/app/layout.tsx` (Server Component): currently exports only `title` + `description`. Will gain `metadataBase`, `title.template`, `openGraph`, `twitter`, `alternates.canonical`, `robots`, `icons`, and will render the site-wide Organization + LocalBusiness JSON-LD `<script>`.
  - `src/app/page.tsx`: currently `'use client'` with **no client-only APIs visible** (only `Link`, `Button`, lucide icons, static JSX). Candidate to convert to a Server Component so it can own page metadata and render HowTo/FAQ JSON-LD cleanly. Holds the commented-out footer and the 3-step "HowItWorks" section.
  - `src/app/booking/page.tsx` (already Server Component): will gain its own `metadata` export.
  - `src/app/booking/confirmation/page.tsx`: should be `robots: { index: false }`.
  - `src/app/terms/page.tsx` (Server Component): already has `metadata.title`; source of truth for company identity (`HeyBox ApS`, `hej@heybox.dk`).
  - **NEW** `src/app/robots.ts`: `MetadataRoute.Robots`.
  - **NEW** `src/app/sitemap.ts`: `MetadataRoute.Sitemap`.
  - **NEW** `src/app/about/page.tsx` (Server Component): E-E-A-T content + metadata.
  - **NEW** `src/components/seo/JsonLd.tsx`: tiny presentational component that renders `<script type="application/ld+json">`.
  - **NEW** `src/lib/seo.ts` (or `src/lib/structured-data.ts`): central constants (site URL, brand name, NAP, social URLs) + JSON-LD object builders, imported by layout/pages so values stay consistent.
  - **NEW** `src/components/sections/Faq.tsx` (Client Component — uses radix `Accordion`): reusable FAQ UI; data passed in so the same Q&A feeds both the UI and the FAQPage schema.
  - **NEW** OG image asset (see Task A.3).
  - `src/components/menu.tsx`: nav currently has commented-out links; will add links to About / FAQ.

- **Existing logic to preserve:**
  - Root layout wraps everything in `<html lang="da">` + Montserrat font; do not disturb font setup.
  - Homepage `HowItWorks()` renders the 3 steps ("1. Vi leverer", "2. Du pakker & flytter", "3. Vi henter") — this is the content the HowTo schema must mirror exactly.
  - `CardboardSources()` already links DST/Bolius/KL/United Container with `rel="noopener noreferrer"` — keep.
  - Booking is a multi-step wizard (`BookingWizard`); only metadata is added, no logic change.

- **New components/hooks:** `JsonLd` (render helper), `Faq` (accordion + data), `seo.ts` (constants + builders). No new hooks.

---

## 3. User Journey & Flow

*Most changes are crawler-facing, but three are user-visible (footer, FAQ, About).*

- [ ] **Crawler / AI engine visit**
    - [ ] 1.1 Bot requests `/robots.txt` → 200 with `Sitemap:` pointer (was 404).
    - [ ] 1.2 Bot requests `/sitemap.xml` → 200 listing `/`, `/booking`, `/about`, `/terms` (was 404).
    - [ ] 1.3 Bot parses any page `<head>` → finds canonical, OG, Twitter tags + Organization/LocalBusiness JSON-LD.
    - [ ] 1.4 Bot parses homepage body → finds HowTo + FAQPage JSON-LD.
- [ ] **Social / AI share**
    - [ ] 2.1 Link pasted into Slack/iMessage/LinkedIn renders a rich card with OG image + title + description.
- [ ] **Human visitor**
    - [ ] 3.1 Sees a real footer with company info, contact, and links to About / FAQ / Terms.
    - [ ] 3.2 Can open the homepage FAQ accordion to get pricing/delivery answers.
    - [ ] 3.3 Can visit `/about` to learn who runs HeyBox.

---

## 4. Implementation Roadmap (The To-Do)

### Phase A: Technical SEO foundation (metadata, crawl files, OG)
- [ ] **A.0:** Convert homepage `page.tsx` to a Server Component (verify no client-only APIs first), so it can own metadata + render JSON-LD. *(Enabler — do first.)*
- [ ] **A.1:** Create `src/lib/seo.ts` central constants + JSON-LD builders.
- [ ] **A.2:** Upgrade `src/app/layout.tsx` metadata: `metadataBase`, `title.template`, `openGraph`, `twitter`, `alternates.canonical`, `robots`, `icons`.
- [ ] **A.3:** Add an OG image (1200×630) via the `opengraph-image` file convention.
- [ ] **A.4:** Create `src/app/robots.ts`.
- [ ] **A.5:** Create `src/app/sitemap.ts`.
- [ ] **A.6:** Add `metadata` to `src/app/booking/page.tsx`; add `robots: { index:false }` to the confirmation page.

### Phase B: Structured data (GEO / AEO)
- [ ] **B.1:** `JsonLd` render helper component.
- [ ] **B.2:** Organization + LocalBusiness JSON-LD, rendered site-wide from the layout.
- [ ] **B.3:** HowTo JSON-LD on the homepage, mirroring the 3-step section.
- [ ] **B.4:** FAQPage JSON-LD on the homepage, sourced from the same Q&A data as the FAQ UI.

### Phase C: Content / E-E-A-T (user-visible)
- [ ] **C.1:** Restore the real homepage footer (company info, contact, links, optional sameAs socials).
- [ ] **C.2:** Build the FAQ section component and place it on the homepage.
- [ ] **C.3:** Create the `/about` page (+ metadata, + add to sitemap & nav/footer).
- [ ] **C.4:** Standardize brand name to **"HeyBox"** across metadata, schema, and copy (keep the `heybox!` wordmark visually).

---

## 5. Technical Specifications (To-Do Details)

### Task [A.0]: Convert homepage to a Server Component
- **Logic:**
  1. Audit `src/app/page.tsx` for client-only usage: `useState`/`useEffect`/event handlers/`framer-motion`. Current read shows **none** — only `Link`, `Button`, lucide icons, static markup.
  2. Verify `@/components/ui/button` and `@/components/menu` don't require `'use client'` at the boundary (shadcn `Button` via CVA + radix `Slot` is server-safe; `Menu` is already a plain component).
  3. Remove the top-level `'use client'` from `page.tsx`.
  4. If any sub-piece truly needs interactivity later (e.g. the FAQ accordion in C.2), keep that piece in its own `'use client'` child component and import it — server pages can render client children.
- **Notes:** If conversion turns out to be risky, fallback: keep `page.tsx` as client and instead create a thin Server `page.tsx` that renders a `<HomeContent />` client component, with `metadata` + JSON-LD emitted from the server `page.tsx`. Decide during implementation; prefer the clean removal.

### Task [A.1]: `src/lib/seo.ts`
- **Exports (pseudocode):**
  - `SITE_URL = "https://heybox.dk"`, `BRAND = "HeyBox"`, `LOCALE = "da_DK"`.
  - `NAP = { legalName: "HeyBox ApS", email: "hej@heybox.dk", phone?: TODO, areaServed: "Storkøbenhavn", addressLocality: "København", country: "DK", cvr?: TODO }`.
  - `SOCIALS: string[]` — real profile URLs only (see §7); empty array if none.
  - `organizationJsonLd()` → returns `Organization` object.
  - `localBusinessJsonLd()` → returns `LocalBusiness` (or `MovingCompany`) object.
  - `howToJsonLd()` → returns `HowTo` object built from the 3 steps.
  - `faqJsonLd(items)` → returns `FAQPage` object from the shared FAQ data.
- **Notes:** All builders return plain objects with `@context`/`@type`; serialization happens in `JsonLd`. Keeps values DRY so schema, footer, and metadata never drift.

### Task [A.2]: Layout metadata upgrade
- **Logic:** Extend the existing `export const metadata: Metadata` in `src/app/layout.tsx`:
  - `metadataBase: new URL(SITE_URL)` — required so relative OG/canonical URLs resolve (build error otherwise).
  - `title: { default: "heybox! Lej flyttekasser til flytning", template: "%s — HeyBox" }`.
  - `description`: extend toward ~150–160 chars with a soft CTA.
  - `alternates: { canonical: "/" }` (self-referencing; child pages override).
  - `openGraph: { type:"website", siteName:"HeyBox", locale:"da_DK", url:"/", title, description, images:[{ url (1200×630), width:1200, height:630, alt }] }`.
  - `twitter: { card:"summary_large_image", title, description, images:[...] }`.
  - `robots: { index:true, follow:true, googleBot:{ "max-image-preview":"large", "max-snippet":-1, "max-video-preview":-1 } }`.
  - `icons`: declare favicon/apple icon (prefer the file-convention `icon`/`apple-icon` in `app/`; otherwise point at an existing asset).
- **Notes:** Per docs, `openGraph` is **shallow-merged & replaced** by child segments — child pages that set `openGraph` must re-spread shared fields. Document this in code comments.

### Task [A.3]: OG image
- **Logic:** Add `src/app/opengraph-image.png` (1200×630) using the file convention so Next auto-emits `og:image`/`twitter:image` with correct dimensions. Also add `twitter-image.png` (or let Next reuse OG).
- **Notes:** A proper branded 1200×630 graphic should be designed; interim, derive from `public/images/heybox-angle-modified.png` cropped/padded to 1200×630. Flag as design TODO if a polished asset isn't ready. (Image generation itself is out of code scope.)

### Task [A.4]: `src/app/robots.ts`
- **Logic:** Default-export `robots(): MetadataRoute.Robots` → `{ rules: { userAgent:"*", allow:"/", disallow:["/booking/confirmation"] }, sitemap: \`${SITE_URL}/sitemap.xml\`, host: SITE_URL }`.
- **Notes:** Do **not** block AI crawlers (GPTBot, PerplexityBot, etc.) — GEO depends on them. Keep `allow:"/"` broad.

### Task [A.5]: `src/app/sitemap.ts`
- **Logic:** Default-export `sitemap(): MetadataRoute.Sitemap` returning entries for `/` (priority 1.0, weekly), `/booking` (0.8), `/about` (0.6), `/terms` (0.3). Use `lastModified: new Date()` or per-route dates.
- **Notes:** Exclude `/booking/confirmation`. Do **not** include `/statestik` per scope exclusion. `changeFrequency`/`priority` are supported in this version.

### Task [A.6]: Booking + confirmation metadata
- **Logic:** `booking/page.tsx` → `export const metadata = { title:"Bestil flyttekasser", description:"...", alternates:{ canonical:"/booking" }, openGraph:{ ...shared, url:"/booking", title } }`. `booking/confirmation/page.tsx` → `export const metadata = { title:"Tak for din bestilling", robots:{ index:false, follow:false } }`.
- **Notes:** Both are already (or should be) Server Components — confirm before adding the export. Keep `/booking` indexable (targets "bestil flyttekasser København").

### Task [B.1]: `JsonLd` helper
- **Input/Props:** `{ data: Record<string, unknown> | Record<string, unknown>[] }`
- **Logic:** Returns `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />`. Works in both server and client components (it's body content, not Metadata API).
- **Notes:** Accept arrays so a page can emit multiple graphs in one tag if desired.

### Task [B.2]: Organization + LocalBusiness
- **Logic:** In `layout.tsx`, render `<JsonLd data={organizationJsonLd()} />` and `<JsonLd data={localBusinessJsonLd()} />` just inside `<body>`. Organization: `name:"HeyBox"`, `legalName:"HeyBox ApS"`, `url`, `logo`, `email`, `sameAs: SOCIALS`. LocalBusiness/MovingCompany: add `areaServed:"Storkøbenhavn"`, `address` (locality København, DK), `telephone` (if real), `priceRange`.
- **Notes:** Omit fields with no real data rather than inventing them. Validate after build.

### Task [B.3]: HowTo on homepage
- **Logic:** Build `howToJsonLd()` from the exact 3 steps in `HowItWorks()`; render via `<JsonLd>` on the homepage. Each `HowToStep` = `{ name, text }` matching the on-page copy.
- **Notes:** Schema text must mirror visible text (no mismatched/fabricated steps).

### Task [B.4]: FAQPage on homepage
- **Logic:** Define FAQ items once (Task C.2 data) and pass the same array to `faqJsonLd(items)` rendered via `<JsonLd>`. Every Q&A in the schema must also be visible on the page (Google requirement).
- **Notes:** Suggested questions: price (13,95 kr/kasse, levering+afhentning inkl.), delivery area (Storkøbenhavn), how many boxes needed (≈1/m²), delivery/pickup timing, deposit/cleaning, cancellation.

### Task [C.1]: Restore footer
- **Logic:** Replace the commented-out footer block in `page.tsx` `Footer()` with a live footer: brand blurb, company line ("HeyBox ApS · København"), contact (`hej@heybox.dk`, phone if real), and link columns (Forside, Om os `/about`, FAQ `#faq`, Vilkår `/terms`). Add social links only if real URLs exist.
- **Notes:** Reuse footer across `/about` if convenient (extract to `src/components/footer.tsx`). Replace the `+45 70 12 34 56` placeholder only with a real number.

### Task [C.2]: FAQ section component
- **Input/Props:** `{ items: { q: string; a: string }[] }`
- **Logic:** `'use client'` component using radix `Accordion` (already a dependency). Render under an `id="faq"` section on the homepage with an H2 like "Ofte stillede spørgsmål". Export the `items` data from a shared module so B.4 reuses it.
- **Notes:** Keep answers concise (40–60 words) and lead with a direct answer for featured-snippet eligibility.

### Task [C.3]: `/about` page
- **Logic:** Server Component with `metadata` (`title:"Om HeyBox"`, description, canonical `/about`). Content: who runs HeyBox, why (cardboard-waste mission, tie back to `/statestik` data), service area, contact. Add to `sitemap.ts`, nav, and footer.
- **Notes:** This is the primary E-E-A-T lift; write real, specific copy (no filler).

### Task [C.4]: Brand consistency
- **Logic:** Use **"HeyBox"** as the entity/display name in metadata, JSON-LD, OG `siteName`, and prose; keep the stylized `heybox!` wordmark in the visual logo only. Audit copy for stray "Heybox"/"heybox" in sentence text.
- **Notes:** Low effort, do alongside other edits.

---

## 6. Verification Checklist

- [ ] **Build:** `npm run build` succeeds (watch for the `metadataBase` relative-URL build error if a URL field is relative without it).
- [ ] **Crawl files:** `/robots.txt` and `/sitemap.xml` return 200 in `next start`; sitemap lists `/`, `/booking`, `/about`, `/terms` and **not** `/statestik` or `/booking/confirmation`.
- [ ] **Head tags:** View source on `/`, `/booking`, `/about` → confirm `<link rel="canonical">`, `og:*`, `twitter:*`, and the JSON-LD `<script>`(s) are present in the **initial HTML** (not only after hydration).
- [ ] **Schema validity:** Paste each page into [validator.schema.org](https://validator.schema.org) and Google Rich Results Test → Organization, LocalBusiness, HowTo, FAQPage all valid, no errors.
- [ ] **FAQ parity:** Every FAQPage Q&A in the schema is visibly rendered on the page.
- [ ] **Social preview:** Run `/` through a link-preview/OG debugger → image (1200×630) + title + description render.
- [ ] **No fabricated data:** Phone/address/CVR/socials in schema + footer are real or omitted — no leftover placeholders shipped.
- [ ] **Manual:** Footer links resolve; FAQ accordion opens/closes; `/about` renders; mobile layout intact.
- [ ] **Regression:** Homepage still single `<h1>`; `lang="da"` still set; existing sections unchanged.
- [ ] **(External) Core Web Vitals:** spot-check `/` at pagespeed.web.dev after changes.

---

## 7. Comments & Deviations

**Required inputs from you (block B.2 / C.1 accuracy — schema must not invent data):**
1. **Phone number** — is `+45 70 12 34 56` (currently in commented placeholder code) a real, publishable number? If not, what is it (or omit)?
2. **Address / CVR** — is there a real registered address and CVR for "HeyBox ApS" to include in LocalBusiness? (Locality "København" is confirmed; full street address optional but strengthens local SEO.)
3. **Social profiles** — do real Instagram / Facebook / LinkedIn URLs exist? These drive `sameAs` (GEO entity graph) and the footer social links. If none, we ship without them rather than linking dead `#` anchors.
4. **OG image** — is there a finished 1200×630 brand graphic, or should we interim-crop an existing product photo and flag a design TODO?

**Open decisions (assumed defaults, change if you disagree):**
- **FAQ location:** assumed a section on the **homepage** (`#faq`) for max SEO value + simplest FAQPage markup, rather than a standalone `/faq` route. Say the word to make it a dedicated route instead.
- **Homepage refactor (A.0):** assumed we remove the unnecessary `'use client'` from `page.tsx`. If you'd rather not touch it, we'll use the thin server-wrapper fallback noted in A.0.
- **LocalBusiness type:** leaning toward `MovingCompany` (a Google-recognized `LocalBusiness` subtype) over generic `LocalBusiness`.

Note [2026-06-01]: `/statistik`-related work (rename + Dataset/ClaimReview schema) deliberately omitted per request. If that page should be discoverable later, it'll need its own metadata (it's currently `'use client'`, so the same Server-Component caveat applies) and a sitemap entry.
