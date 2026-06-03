# Plan: Redesign "Om heybox" (About) page

> **Status:** 🟢 Implemented | **Last Updated:** 2026-06-02
> **Scope:** `src/app/(site)/about/page.tsx` (+ optional shared section extraction)

---

## 1. Context & Objectives

**Goal:** Transform the About page from a flat, centered text column (`max-w-2xl` of paragraphs) into a visually rich, scroll-driven page that inherits the frontpage's design language — bold uppercase typography, black borders, pastel gradients, hard-shadow cards, and alternating two-column section layouts. The page should **tell the founders' story** rather than just state facts.

**The story to tell:**
- Two childhood friends.
- Stumbled into the idea through a **podcast**.
- Looked at the **numbers and the waste** (millions of cardboard boxes thrown out every year).
- Decided to **give it a try**.

**Constraints:**
- Tailwind only (project already uses Tailwind v4 utility classes, e.g. `bg-linear-to-br`).
- Reuse the existing design vocabulary verbatim — do **not** invent a new visual style.
- No new dependencies. Founder photos optional; fall back to existing 3D icon assets / initials if no portraits exist.
- This is a Next.js version with breaking changes — consult `node_modules/next/dist/docs/` before touching any Next.js API (metadata, Image, Link). Existing patterns in the repo are the safest reference.
- Keep the existing `metadata` export and the `(site)` route-group layout (shared menu/footer) intact.
- Danish copy throughout (matches the rest of the site).

---

## 2. Technical Research & State

### Affected Files
- `src/app/(site)/about/page.tsx`: The page being redesigned. Currently a single `max-w-2xl` text column with `<h1>`, three `<h2>` text blocks, and a CTA button.
- `src/app/(site)/page.tsx`: **Source of the design system.** All section primitives live here as *local, non-exported* functions:
  - `Hero` — `min-h-[90vh]` two-column grid, `bg-linear-to-br from-green-100 to-green-300`, image + headline + CTA, `border-b border-black`.
  - `SectionInfo({ preTitle, title, description })` — huge `text-4xl lg:text-7xl font-black uppercase` title left, large description right-aligned. **Ideal for narrative beats.**
  - `SectionContent({ imgLast, imgSrc, imgAlt, title, descriptions[], ctaText, ctaLink, bgColor, btnColor, hasBorderTop, imgFullSize })` — bordered card, image one side / text+CTA other, alternating sides, pastel gradient image panel.
  - `SectionThreeInfoColumns({ hasBorderTop, xlTitle, columns[] })` — 3-column grid with dashed dividers. Used for stats + "how it works."
  - `TransparentCard` — white card, `border border-black`, hard shadow `shadow-[3px_4px_0_0_rgba(0,0,0,1)]`.
  - `STATS` object + derived constants (`kasserSmidtUdPerAar`, `tonPapAffaldPerAar`, `formatMio`, `formatTon`) — the **waste numbers** central to the story.
- `src/components/ui/section.tsx`: Exports `Section` (`max-w-[1400px] mx-auto` wrapper). Already shared.
- `src/app/(site)/layout.tsx`: Wraps all `(site)` pages with menu/footer — About already inherits this; no change needed.

### Existing Logic to Preserve
- The frontpage's `STATS` block is the single source of truth for the waste figures. To reuse the same numbers on About **without duplicating the math**, extract `STATS` + derived values into a shared module (see Task A.1).
- `metadata` export pattern (canonical `/about`, openGraph) must stay.

### New Components / Modules
- `src/lib/stats.ts` (new) — extract `STATS`, derived constants, and `formatMio`/`formatTon` so both landing and About import the same figures.
- `src/components/sections/*` (new, recommended) — promote the reusable section primitives out of `page.tsx` so the About page can import them instead of copy-pasting. See Decision Note in §7.
- About-specific content components (local to `about/page.tsx`): `AboutHero`, `OriginStory`, `WasteRealization`, `Decision`, `Founders`, `ContactCTA`.

---

## 3. User Journey & Flow

A visitor lands on `/about` and scrolls through a narrative arc that mirrors the homepage's rhythm:

- [ ] **Step 1: Hook (Hero)** — Bold gradient hero. Headline frames the human angle ("Two childhood friends and a whole lot of cardboard"). Sets tone immediately, not a wall of text.
    - [ ] 1.1 Visual: gradient panel + image/illustration; headline + 1–2 sentence lede.
- [ ] **Step 2: The spark (Origin)** — Narrative section: the podcast moment.
    - [ ] 2.1 `SectionInfo`-style big-title + story copy.
- [ ] **Step 3: The reality check (Numbers & waste)** — Reuse the stat columns; "we looked at the numbers."
    - [ ] 3.1 `SectionThreeInfoColumns` with the same waste figures as the homepage.
- [ ] **Step 4: The decision (Give it a try)** — `SectionContent` beat: from idea to action.
- [ ] **Step 5: Who we are (Founders)** — Two founder cards (hard-shadow `TransparentCard` style), names/roles/short bios.
- [ ] **Step 6: Contact + CTA** — Email + closing CTA reusing the homepage's `CTA` look.

---

## 4. Implementation Roadmap (The To-Do)

### Phase A: Shared foundation (data + design primitives)
- [ ] **A.1:** Extract `STATS` and derived waste figures into `src/lib/stats.ts`; update `page.tsx` to import them.
- [ ] **A.2:** Extract reusable section primitives (`SectionInfo`, `SectionContent`, `SectionThreeInfoColumns`, `TransparentCard`, `Hero` shell) from `page.tsx` into `src/components/sections/`, exporting them; refactor `page.tsx` to import. *(See §7 Decision Note — if scope must stay minimal, fall back to A.2-alt.)*
  - [ ] **A.2-alt:** If extraction is deemed too risky/large, copy the needed primitives locally into `about/page.tsx` instead. (Higher duplication, but isolated.)

### Phase B: About page content & layout
- [ ] **B.1:** Build `AboutHero` — gradient two-column hero with story headline + lede.
- [ ] **B.2:** Build `OriginStory` — the podcast origin beat (`SectionInfo` layout).
- [ ] **B.3:** Build `WasteRealization` — reuse stat columns with shared `stats.ts` figures + a framing line tying it to the founders' "we did the math" moment.
- [ ] **B.4:** Build `Decision` — "we decided to give it a try" beat (`SectionContent` layout, alternating image side).
- [ ] **B.5:** Build `Founders` — two founder cards (hard-shadow, black-border), names + roles + short bios + childhood-friends framing.
- [ ] **B.6:** Build `ContactCTA` — contact email block + closing CTA matching homepage `CTA`.
- [ ] **B.7:** Assemble the page, keep/refresh `metadata`, verify route-group layout still wraps correctly.

---

## 5. Technical Specifications (To-Do Details)

### Task [A.1]: Extract stats into `src/lib/stats.ts`
- **Exports:** `STATS`, `boligflytningerPerAar`, `kasseanvendelserPerAar`, `kasserSmidtUdPerAar`, `tonPapAffaldPerAar`, `formatMio`, `formatTon`.
- **Logic:** Move lines `242–258` of `page.tsx` verbatim into the module; re-import in `page.tsx`. No math changes — figures must stay identical so homepage and About agree.
- **Why:** The "numbers and waste" are core to the About story; both pages must show the same source-of-truth numbers.

### Task [A.2]: Promote section primitives to `src/components/sections/`
- **Candidates:** `SectionInfo`, `SectionContent` (+ `SectionContentProps`), `SectionThreeInfoColumns` (+ `ThreeInfoColumnsProps`), `TransparentCard`. Consider a generic `SplitHero` shell parameterized by `headline`, `lede`, `image`, optional `badges`.
- **Logic:** Cut from `page.tsx`, add `export`, fix imports (`Section`, `Button`, `Image`, `Link`, `ArrowRight`). Refactor `page.tsx` to import — **behavior and markup must be byte-for-byte equivalent** (visual regression risk on the homepage otherwise).
- **Notes:** `Hero` is bespoke (uses `priority` image, `TransparentCard` badges). Either generalize with props or keep two thin variants. Keep these as server components — they're presentational; avoid adding `'use client'`.

### Task [B.1]: `AboutHero`
- **Layout:** Mirror homepage `Hero` — `grid lg:grid-cols-2`, `bg-linear-to-br from-green-100 to-green-300` panel, `border-b border-black`. Can be shorter than `90vh` (e.g. `min-h-[60vh]`) since it's a sub-page.
- **Copy (draft, DA):** Headline `Vi er to barndomsvenner — og alt for meget pap.` Lede: one sentence teasing the podcast + waste origin.
- **Image:** Founder portrait if available; else reuse `/images/heybox-angle-modified.png` or `3d-icon-box.png`.

### Task [B.2]: `OriginStory`
- **Layout:** `SectionInfo` — left big `font-black uppercase` title (`Det startede<br />med en podcast`), right narrative paragraph.
- **Copy (draft):** Two friends listening to a podcast about reuse/waste; the idea clicked; they couldn't stop thinking about how much cardboard a single move throws away.

### Task [B.3]: `WasteRealization`
- **Layout:** `SectionThreeInfoColumns` (`xlTitle`) with the three figures from `stats.ts` (`flytningerPerAar`, `kasseanvendelserPerAar`, `kasserSmidtUdPerAar`), preceded by a `SectionInfo` framing beat (`preTitle="Da vi regnede efter"`, title `{formatTon(tonPapAffaldPerAar)}<br />papaffald`).
- **Notes:** Reuse the same `subdescription` source labels; keep figures consistent with homepage. Either link to the homepage's `CardboardSources` block or omit sources here to avoid duplication.

### Task [B.4]: `Decision`
- **Layout:** `SectionContent`, `imgLast` alternating, pastel gradient panel; pick a `bgColor`/`btnColor` from the existing palette (green/blue/purple/yellow).
- **Copy (draft):** "Så vi besluttede at prøve" — from idea to a real service in Storkøbenhavn; same price as cardboard, delivered and collected.
- **CTA:** `ctaText="Se hvad det koster"`, `ctaLink="/booking"`.

### Task [B.5]: `Founders`
- **Layout:** Two cards in a `grid md:grid-cols-2`, black border + hard shadow (`shadow-[3px_4px_0_0_rgba(0,0,0,1)]`) à la `TransparentCard`, inside a `Section`.
- **Per card:** photo or initials avatar (circle, black border), name, role, 1–2 line bio. Emphasize the childhood-friends bond.
- **Notes / open question:** Need real founder names, roles, and whether photos exist (see §6 / §7). Use placeholders flagged with `TODO` if not provided.

### Task [B.6]: `ContactCTA`
- **Layout:** Contact line (`hey@heybox.dk`, `HeyBox ApS`) + closing CTA block styled like homepage `CTA` (`text-3xl md:text-5xl` heading, centered, green button).
- **Copy:** Warm close inviting questions + "Beregn din pris" button.

### Task [B.7]: Assemble & metadata
- **Notes:** Compose sections in narrative order (Hero → Origin → Waste → Decision → Founders → Contact/CTA). Update `metadata.description`/openGraph to reflect the story angle. Confirm `(site)/layout.tsx` still wraps menu/footer (no `<main>` duplication).

---

## 6. Verification Checklist
- [ ] **Manual — visual parity:** About page reads as part of the same site as the homepage (typography, borders, gradients, shadows match).
- [ ] **Manual — homepage regression:** After A.1/A.2 extraction, the homepage renders byte-for-byte the same (diff screenshots / visual check). The displayed waste numbers are unchanged.
- [ ] **Manual — responsiveness:** Hero and all two/three-column sections collapse cleanly to single column on mobile (`grid-cols-1` defaults, image-first ordering sensible).
- [ ] **Manual — story clarity:** A first-time reader understands: childhood friends → podcast → saw the waste numbers → decided to try. The narrative arc is legible while scrolling.
- [ ] **Content:** Founder names/roles/bios filled in (no leftover `TODO` placeholders) or explicitly approved as placeholders.
- [ ] **A11y:** Every `Image` has a meaningful `alt`; heading hierarchy is single `<h1>` then `<h2>`/`<h3>`; email link is a real `mailto:`.
- [ ] **Build:** `next build` / lint passes; no new client-component boundaries added unnecessarily.

---

## 7. Comments & Deviations

**Decision Note [2026-06-02] — Extraction vs. duplication:** The frontpage's section primitives (`SectionInfo`, `SectionContent`, `SectionThreeInfoColumns`, `TransparentCard`, `Hero`) are currently **local, unexported** functions inside `src/app/(site)/page.tsx`. The About page cannot reuse them without either (a) **extracting** them into `src/components/sections/` (Phase A.2 — preferred: real reuse, single source of design truth, keeps the two pages in sync) or (b) **copying** them locally (A.2-alt — faster, zero homepage regression risk, but creates drift). Recommendation: **extract (A.2)**, since the point of this task is for About to *inherit* — not imitate — the homepage design. If the user prefers the smallest possible change, fall back to A.2-alt.

**Open question — founder details:** The page needs real names, roles, short bios, and (ideally) photos of the two founders. The `public/images/` folder currently has no portraits. Pending input, B.5 will ship with clearly-marked placeholders.

**Copy note:** All headline/body copy in §5 is *draft Danish* to convey intent and layout. Final wording should be reviewed by the user before implementation.
