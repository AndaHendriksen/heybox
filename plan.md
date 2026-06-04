# Plan: Typography System (H1 → H2, H3, P, Eyebrow)

> **Status:** 🟡 In Progress | **Last Updated:** 2026-06-04
> **Scope:** `src/components/ui/text.tsx` + marketing `(site)` pages

---

## 1. Context & Objectives

**Goal:** Extend the existing `H1` primitive into a complete, reusable typography set (`H2`, `H3`, `P`, plus an `Eyebrow` label) so the marketing pages stop hand-rolling Tailwind class strings. "Done" = every marketing heading/paragraph can be expressed with a component, margins/paddings behave predictably, and the dominant existing styles are preserved 1:1.

**Constraints:**
- Tailwind v4 only, no new dependencies (`clsx`, `tailwind-merge`, `class-variance-authority` already installed).
- Use the existing `cn` helper from `@/lib/utils/index`.
- **Scope = marketing `(site)` pages only.** The booking flow (`src/components/booking/**`, `src/app/booking/**`) and legal pages use a *different* design language (`font-bold tracking-tight`, not uppercase) — do **not** unify them in this pass.
- Backward compatible: replacing existing markup must produce identical rendered classes.

---

## 2. Technical Research & State

### Affected Files
- `src/components/ui/text.tsx`: **The system.** Currently exports only `H1`. Will gain `H2`, `H3`, `P`, `Eyebrow`.
- `src/lib/utils/index` (`cn`): clsx + tailwind-merge wrapper. **Critical** — see "Key Finding" below.
- `src/app/(site)/page.tsx`, `om-os/page.tsx`, `lokationer/page.tsx`, `faq/page.tsx`: consumers (migration targets).
- `src/components/sections/blocks.tsx`, `cta.tsx`, `Faq.tsx`: contain the heaviest heading/paragraph usage.

### Existing Logic — how `H1` works today
```
text-2xl md:text-3xl lg:text-4xl xl:text-6xl uppercase font-black mb-4 lg:mb-6
```
- Built with a raw template literal: `` `... ${className || ""}` `` — **NOT** `cn()`.
- Bakes a bottom margin (`mb-4 lg:mb-6`) into the component itself.

### ⚠️ Key Finding — why the current approach breaks margin overrides
Because `H1` concatenates strings instead of using `cn()`/`tailwind-merge`, calling `<H1 className="mb-0">` renders `... mb-4 lg:mb-6 mb-0`. Tailwind resolves conflicts by **CSS source order, not class-string order**, so the override is unreliable. **Every component in this system must route through `cn()`** so consumers can override spacing. This is the linchpin of the whole padding/margin strategy below.

### Reference: `class-variance-authority` is the established pattern
`button.tsx` and `label.tsx` already use `cva` + `cn`. We should follow that convention for size variants rather than inventing a new prop shape.

---

## 3. Variance Audit (the heart of this request)

### H2 — found 6 distinct treatments
| # | Source | Classes | Notes |
|---|--------|---------|-------|
| 1 | `om-os:72,134`, `lokationer:89` | `text-xl md:text-2xl lg:text-3xl uppercase font-black mb-4 lg:mb-6` | **DOMINANT (×4).** Margin matches H1. |
| 2 | `lokationer:67` | same sizes, but `px-4 lg:px-8 py-8 lg:py-12` (no mb) | Lives inside a bordered cell → padding, not margin. |
| 3 | `Faq.tsx:15` | `text-3xl md:text-5xl font-black uppercase mb-8 md:mb-12` | Section-title scale (bigger). |
| 4 | `blocks.tsx:54` (SectionInfo) | `text-4xl lg:text-7xl font-black uppercase` | Hero/display scale (biggest). |
| 5 | `cta.tsx:11,33` | `text-3xl md:text-5xl font-bold tracking-tight mb-6` | **NOT uppercase** — different voice. |
| 6 | `blocks.tsx:101` | `text-xl md:text-2xl lg:text-3xl uppercase font-black leading-[1.2] tracking-tight mb-4` | = #1 + tighter leading/tracking. |

**Decision — H2 default = treatment #1** (`text-xl md:text-2xl lg:text-3xl uppercase font-black mb-4 lg:mb-6`). It is the most common and steps down cleanly from H1 (one size-tier smaller, same margin).
- Expose a `size` variant via `cva`: `display` (#4), `section` (#3), `default` (#1).
- Treatment #5 (cta) is a deliberately different style (sentence-case, tracking-tight). **Leave cta.tsx untouched** — do not force it into the uppercase system.

### H3 — found 1 treatment (consistent)
| Source | Classes |
|--------|---------|
| `blocks.tsx:137` | `text-lg font-bold uppercase mb-1` (+ optional `md:text-2xl lg:text-4xl xl:text-5xl` when `xlTitle`) |
| `om-os:110,117` (commented) | `text-lg font-bold uppercase` |

**Decision — H3 default = `text-lg font-bold uppercase mb-1`.** Note it uses `font-bold` (H1/H2 use `font-black`) — preserve that intentional weight step-down. The `xlTitle` case is a one-off; handle it with a `className` override rather than a variant.

### P — the messy one (8+ treatments, wildly varied margins)
| Group | Example sources | Classes |
|-------|-----------------|---------|
| Lead / body (large) | `om-os:75,142`, `lokationer:48,92` | `md:text-lg lg:text-xl` |
| Body (alt scale) | `blocks.tsx:57,105` | `text-lg md:text-xl` (+ conditional `mt-4`) |
| Hero lead | `page.tsx:70` | `md:text-lg lg:text-2xl mb-8 md:mb-12` |
| Small / muted | `blocks:139`, booking | `text-sm text-gray-500 mt-2` / `text-xs text-zinc-400` |
| **Bottom margins seen on body P** | various | `mb-6`, `mb-8`, `mb-12`, **`mb-24`** — no consistency |

**Decision — `P` ships with NO baked margin and NO color.** Body-paragraph spacing ranges from `mb-6` to `mb-24` depending on section; baking any value in would fight every other usage. Default `P` = `md:text-lg lg:text-xl` (the dominant lead style). Expose a `size` variant (`lead` = default, `body` = `text-lg md:text-xl`, `small` = `text-sm`). Spacing is always passed per-use via `className` (now safe because of `cn`).

### Eyebrow — found 4+ identical usages → promote to its own component
| Source | Classes |
|--------|---------|
| `om-os:52,71,133`, `lokationer:46,88` | `md:text-lg border-b pb-4 mb-5 inline-block` |

**Decision — extract an `<Eyebrow>` component** (the small underlined label that sits *above* a heading). It is structurally distinct from body `P` and repeats verbatim 5×. Its `mb-5` deliberately owns the gap to the heading below it (see margin strategy).

---

## 4. The Margin / Padding Strategy (explicit answer to the request)

**Problem:** `H1` bakes `mb-4 lg:mb-6`. If every component bakes its own margin we hit (a) the last-child trailing-gap problem, and (b) unpredictable overrides (see §2 Key Finding).

**Chosen model — "Top-down ownership + overridable defaults":**

1. **No component ever uses `margin-top`.** The gap *above* an element is owned by the element *above* it (the `Eyebrow`'s `mb-5`, or a heading's `mb`), or by the container's padding. This kills margin-collapse surprises and the `mt-4`-on-first-child hacks seen in `blocks.tsx:105`.
2. **Headings keep a sensible default `margin-bottom`** (`H1`/`H2` = `mb-4 lg:mb-6`, `H3` = `mb-1`) because their spacing *is* consistent across the site. These are overridable.
3. **`P` carries no margin.** Body spacing is too variable; pass it per use (`<P className="mb-24">`).
4. **All of the above only works once `cn()` is wired in** so `tailwind-merge` lets `className` win. Refactoring `H1` to use `cn` is therefore task **A.2** and a prerequisite, not an afterthought.
5. **Padding stays on layout containers, never on type components** — e.g. `lokationer:67`'s `px-4 py-8` belongs to the bordered cell wrapper, not the `H2`. When migrating that case, keep the padding on the surrounding `div`/cell and let `H2` render margin-less there (`<H2 className="mb-0">` or a `bare` spacing variant).

**Container rhythm (recommended for new sections):** prefer `flex flex-col` + `gap-*` or `space-y-*` on the text wrapper over per-element margins. Existing sections keep their current margins to stay byte-identical; new work should lean on container rhythm.

---

## 5. User Journey & Flow
*(developer-facing — this is a primitives task)*

- [ ] **Step 1:** Dev imports `{ H1, H2, H3, P, Eyebrow }` from `@/components/ui/text`.
- [ ] **Step 2:** Dev writes `<Eyebrow>…</Eyebrow><H1>…</H1><P>…</P>` and gets the marketing look with zero hand-tuned classes.
- [ ] **Step 3:** Where spacing differs, dev passes `className="mb-12"` and it reliably wins (cn/tailwind-merge).
- [ ] **Step 4:** Bigger/smaller heading needed → dev passes `size="display" | "section"`.

---

## 6. Implementation Roadmap (The To-Do)

### Phase A: Foundation
- [ ] **A.1:** Confirm `cn` signature/exports at `@/lib/utils/index`.
- [ ] **A.2:** Refactor existing `H1` to route through `cn()` (no visual change, enables overrides). **Prerequisite for everything.**

### Phase B: Build the primitives (in `text.tsx`)
- [ ] **B.1:** `H2` with `cva` size variants (`default` | `section` | `display`).
- [ ] **B.2:** `H3`.
- [ ] **B.3:** `P` with size variants (`lead` | `body` | `small`), margin-less.
- [ ] **B.4:** `Eyebrow`.
- [ ] **B.5:** *(optional)* `H1` size variants — a `display` H1 for the `xl:text-6xl` hero vs. smaller page titles, only if a second H1 scale is actually needed.

### Phase C: Migrate consumers (low-risk, verify diff renders identical classes)
- [ ] **C.1:** `om-os/page.tsx` — 2× H2, Eyebrow×3, body P's.
- [ ] **C.2:** `lokationer/page.tsx` — Eyebrow×2, H2×2 (incl. the padding-cell case).
- [ ] **C.3:** `faq/page.tsx` + `Faq.tsx` — `section`-size H2.
- [ ] **C.4:** `blocks.tsx` — H2 (`display`), H3, body P. Highest-traffic file; do last.
- [ ] **C.5:** Leave `cta.tsx`, booking flow, and legal pages **as-is** (out of scope).

---

## 7. Technical Specifications (To-Do Details)

### Task [A.2]: Refactor H1 to `cn`
- **Logic:** Replace `` `…fixed… ${className || ""}` `` with `cn("…fixed…", className)`. Rendered output is identical when no className is passed; overrides now win via tailwind-merge.
- **Spec (unchanged classes):** `text-2xl md:text-3xl lg:text-4xl xl:text-6xl uppercase font-black mb-4 lg:mb-6`

### Task [B.1]: H2
- **Props:** `{ children, className?, size?: "default" | "section" | "display" }`
- **Spec:**
  - `default`: `text-xl md:text-2xl lg:text-3xl uppercase font-black mb-4 lg:mb-6`
  - `section`: `text-3xl md:text-5xl font-black uppercase mb-8 md:mb-12`
  - `display`: `text-4xl lg:text-7xl font-black uppercase`
- **Notes:** Use `cva` like `button.tsx`. cta's non-uppercase H2 is intentionally excluded.

### Task [B.2]: H3
- **Spec:** `text-lg font-bold uppercase mb-1` — note `font-bold` (not `font-black`).

### Task [B.3]: P
- **Props:** `{ children, className?, size?: "lead" | "body" | "small" }`
- **Spec:** `lead`: `md:text-lg lg:text-xl` · `body`: `text-lg md:text-xl` · `small`: `text-sm`
- **Notes:** No baked margin, no color. Edge case: muted small text passes `text-gray-500`/`text-zinc-400` via className.

### Task [B.4]: Eyebrow
- **Spec:** `md:text-lg border-b pb-4 mb-5 inline-block` (renders a `<p>`). The `mb-5` intentionally owns the gap to the heading below.

### Task [C.4]: blocks.tsx migration
- **Notes:** Watch the `index !== 0 ? 'mt-4'` pattern at line 105 — replace with container rhythm or per-`P` `mb`, honoring the "no margin-top" rule. The `xlTitle` H3 (line 137) → pass the `md:text-2xl lg:text-4xl xl:text-5xl` via `className`.

---

## 8. Verification Checklist
- [ ] **Class-identity:** For each migrated element, the rendered `class` attribute matches the pre-migration string (spot-check in DevTools or snapshot). No visual diff.
- [ ] **Override test:** `<H1 className="mb-0">` actually removes the margin (proves cn/tailwind-merge wiring from A.2).
- [ ] **Manual check:** Mobile → desktop responsive breakpoints on home, om-os, lokationer, faq.
- [ ] **Last-child spacing:** No unexpected trailing gap where a heading/P ends a section.
- [ ] **Scope guard:** Confirm cta.tsx, booking, and legal pages are untouched.

## 9. Comments & Deviations
Note [2026-06-04]: Two design languages confirmed — marketing (uppercase/`font-black`) vs. app/booking+legal (`font-bold tracking-tight`). This plan deliberately covers only the marketing system; unifying booking/legal would be a separate effort.

Note [2026-06-04]: The single most important technical decision is routing every primitive through `cn()` (task A.2). Without it, the entire "override margins per-use" strategy silently fails because Tailwind resolves conflicts by CSS source order, not class-string order.
