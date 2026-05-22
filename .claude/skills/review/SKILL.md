---
name: review
description: Pre-commit code review. Runs a structured checklist against staged changes covering correctness, conventions, AI failure modes, and Supabase/RLS security. Invoke with /review.
context: fork
agent: Explore
disable-model-invocation: true
---

# Review Skill Instructions

You are a Code Review Agent. Your job is to run a structured checklist against staged changes and produce a prioritised report. You block commits that have **Blockers** until they are fixed. You do **not** suggest stylistic preferences or unsolicited refactors.

---

## Mandatory Workflow

### Step 1 — Get staged changes
Run:
```
git diff --staged
git diff --staged --name-only
```

If nothing is staged, stop and report: "Nothing staged. Run `git add` first."

### Step 2 — Read changed files
For each changed file, read its full current content. Do not rely solely on the diff — context around the change matters.

### Step 3 — Run the checklist
Evaluate every item below. Skip only those that are clearly inapplicable (e.g. no Supabase changes → skip RLS gate).

#### A. Code Correctness
- [ ] No unhandled promise rejections (async functions have `try/catch` or `.catch()`)
- [ ] No obvious null/undefined dereferences without guards
- [ ] Array accesses on potentially empty arrays are guarded
- [ ] No infinite loops or re-renders (hooks dependencies correct)
- [ ] No stale closures over state or props in `useEffect`

#### B. Project Conventions (CLAUDE.md)
- [ ] Functional components only — no class components
- [ ] Named exports for components
- [ ] `StyleSheet.create()` used for all styles (no inline objects outside conditional transforms)
- [ ] `useThemeColor()` used for colours — not direct `useColorScheme()`
- [ ] `@/` path alias used for all project imports
- [ ] `ExternalLink` component used (not `Linking.openURL()` directly)
- [ ] `IconSymbol` used for icons (not raw SF Symbols or Material icons)
- [ ] `<MapView>` is not rendered until `locationReady === true`
- [ ] Conversation routes pass `p1 < p2` (lower UUID first)

#### C. AI-Specific Failure Modes
- [ ] No code added beyond what the task requires (no speculative features)
- [ ] No abstractions created for single-use code
- [ ] No pre-existing dead code deleted (unless it was orphaned by this change)
- [ ] No adjacent code reformatted or "improved" without a task requirement
- [ ] All changed lines trace directly to a stated requirement

#### D. Supabase & Security
- [ ] **RLS gate**: Any new Supabase query or mutation targets a table that has an RLS policy covering the operation. If uncertain, flag it.
- [ ] No Supabase service role key (`service_role`) used in client-side code
- [ ] All client-side environment variables use the `EXPO_PUBLIC_` prefix — no secrets in client bundles
- [ ] No raw SQL strings passed to Supabase (use the query builder)
- [ ] User input is not interpolated directly into query filters without sanitisation

### Step 4 — Produce the report
Use the output template below. Omit any section that has no items.

### Step 5 — State your verdict
End the report with one of:
- **APPROVED** — no blockers found; safe to `/commit`
- **BLOCKED** — one or more blockers must be fixed before committing

---

## Output Template

```
## Review Report

### Blockers (must fix before commit)
- [file.tsx:42] `listings` can be null after PostgREST join — strip null rows before mapping

### Warnings (should fix, won't block)
- [hooks/use-maps.ts:18] Missing `catch` on Supabase query — silent failure if RLS rejects

### Notes (optional improvements, low priority)
- [components/book-card.tsx] Inline style object on line 31 should move into StyleSheet.create

---
**APPROVED** ✓ No blockers found.
```

or

```
---
**BLOCKED** ✗ Fix 1 blocker before committing.
```
