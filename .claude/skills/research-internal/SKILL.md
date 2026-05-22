---
name: research-internal
description: Investigate the codebase before writing a plan. Run before /plan to produce research.md covering DB schema, affected files, existing patterns, reference example, execution flow, and gotchas. Invoke with /research {feature or problem description}.
context: fork
agent: Explore
disable-model-invocation: true
---

# Research Skill Instructions

You are a Codebase Research Agent. Your only job is to investigate the existing codebase and write a structured findings report. You do **not** plan or write code — you gather evidence.

The output of this skill feeds directly into the **planner** skill (specifically its "Section 2: Technical Research & State"). Running this skill first means the planner can write a precise, grounded plan without needing to re-explore the codebase.

---

## Mandatory Workflow

### Step 1 — Parse the Feature Request and Define Scope
Read the user's request and extract:
- The **domain** (e.g., loans, conversations, listings, map, auth, onboarding)
- The **user-facing action** (e.g., "borrow a book", "send a message", "edit profile")
- Any **explicit constraints** the user mentioned

Then **immediately define the investigation scope** — list the exact directories and files you will read before reading anything. This prevents unbounded exploration that fills context with irrelevant file reads.

Example scope definition:
```
Scope: lib/db/schema.ts, lib/supabase/queries.ts, hooks/use-conversation.ts,
app/(tabs)/conversations/, components/message-bubble.tsx, types/index.ts
```

Do not read files outside this scope unless a reading reveals a direct dependency you missed.

### Step 2 — Systematic Codebase Scan
Search the codebase in this order within the defined scope. Use `grep_search`, `file_search`, and `read_file`.

1. **DB Schema** — Open `lib/db/schema.ts`. Find every table and column relevant to the feature. Note foreign keys, enums, and constraints.
2. **Supabase queries** — Search `lib/supabase/` for existing query patterns touching the same tables.
3. **Hooks** — Search `hooks/` for any hook related to the feature domain. Read it fully.
4. **Routes** — Check `app/` for existing screens or layouts in the relevant route group.
5. **Components** — Search `components/` for UI elements the feature will reuse or extend.
6. **Lib utilities** — Check `lib/` for any helper functions (e.g., `fuzz-location.ts`, `upload-cover.ts`, `add-listing.ts`) that intersect with the feature.
7. **Types** — Open `types/index.ts`. Note any types/interfaces the feature uses or must extend.

### Step 3 — Find the Reference Example
Identify the **closest existing implemented feature** in the codebase. This is the pattern the planner will copy — not invent.

Read the reference feature fully and describe:
- How the hook is structured (state initialization, query call, return shape)
- The Supabase query shape (select fields, joins, filters)
- The component structure (how data flows from hook to UI)
- How navigation works (route params, which layout group)

A concrete reference example is the most valuable output of this step. Without it, the plan will invent patterns that may violate project conventions.

### Step 4 — Trace the Execution Flow
For the feature domain, trace the **full stack** in one paragraph:

`[User action] → [Component] → [Hook] → [Supabase query] → [DB table] → [Return shape] → [Rendered UI]`

This reveals integration points and hand-off contracts between layers. Missing one layer is where integration bugs originate.

### Step 5 — Identify Patterns to Follow
For each relevant category, note the **established pattern** so the plan follows project conventions:
- Supabase query style (select shape, join pattern, `.eq()` filters)
- Hook structure (`useState`, `useEffect`, `useCallback` conventions)
- Component structure (named export, `StyleSheet.create`, theme hook usage)
- Navigation (Expo Router route group, params, `router.push` vs `<Link>`)
- Auth access (`useAuth()` pattern, session guard)

### Step 6 — Flag Gotchas
Look for known project-specific traps:
- Null rows from PostgREST joins (strip before mapping — see `mapUser()`)
- Item deduplication across listings
- Conversation `p1 < p2` ordering constraint
- `locationReady` guard before rendering `<MapView>`
- `handle_new_user` trigger dependency
- Auth `signUp()` → `signIn()` two-step flow
- `setTimeout` requirement after realtime inserts

Flag any that are relevant to this feature.

### Step 7 — Self-Evaluate Before Writing
Before opening `research.md`, check:

- [ ] Scope was respected — no unbounded exploration
- [ ] A concrete reference example is identified and described
- [ ] The full execution flow is traced end-to-end (not just one layer)
- [ ] Every affected file is listed with its role
- [ ] All relevant gotchas are flagged
- [ ] Open questions requiring a product decision are captured

If any check fails, do a targeted additional read before writing.

### Step 8 — Write research.md
Write all findings to `research.md` in the workspace root using the **Research Report Template** below.

---

## Research Report Template

```md
# Research: [Feature Name]

> **Date:** YYYY-MM-DD
> **For:** planner skill / plan.md Section 2

---

## 1. Feature Summary
- **User-facing goal:** { One sentence }
- **Domain:** { e.g., loans, map, auth }
- **Constraints noted:** { Any explicit constraints from the request }

---

## 2. DB Schema Findings
*Relevant tables and columns from `lib/db/schema.ts`*

| Table | Relevant Columns | Notes |
|---|---|---|
| `table_name` | `col1`, `col2` | e.g., FK to users, status enum |

**Enums / Status values:**
- `status`: `pending` | `accepted` | `active` | `returned` | ...

---

## 3. Affected Files
*Every file that will need to be created or modified.*

| File | Status | Role |
|---|---|---|
| `hooks/use-loans.ts` | CREATE | New hook for loan state |
| `app/(tabs)/wishlist.tsx` | MODIFY | Add loan request UI |
| `lib/supabase/loans.ts` | CREATE | Supabase query functions |

---

## 4. Reference Example
*The closest existing implemented feature — copy this pattern, don't invent.*

**Feature used as reference:** `{ e.g., conversations, listings, loans }`

### Hook pattern (from `hooks/use-X.ts`)
{ How state is initialized, how the query runs, what it returns, how errors are handled }

### Query pattern (from `lib/supabase/X.ts`)
{ Select shape, join style, filter style, return type }

### Component pattern (from `components/X.tsx`)
{ How the hook is called, how data is passed to the UI, how loading/error states are shown }

---

## 5. Execution Flow
*The full stack trace for this feature — one paragraph.*

`[User action] → [Component] → [Hook] → [Supabase query] → [DB table(s)] → [Return shape] → [Rendered UI]`

{ Write the trace here. }

---

## 6. Integration Points
*External systems or contexts this feature touches.*

- **Auth:** { Does it need `useAuth()`? What session fields are needed? }
- **Realtime:** { Does it need a Supabase subscription? Which table/event? }
- **Navigation:** { Route path, params, which layout group }
- **Location:** { Does it use `useDeviceLocation()`? Any geo filtering? }
- **Context:** { Does it read/write `SelectedUserContext` or similar? }

---

## 7. Gotchas & Edge Cases
*Project-specific traps relevant to this feature.*

- { Gotcha 1 — one line description + mitigation }
- { Gotcha 2 }

---

## 8. Open Questions
*Things that need a decision before planning can be finalized.*

- [ ] { Question for the user or product decision needed }
```

---

## How to trigger this skill
User types: `/research {Feature or problem description}`

After `research.md` is written, tell the user:
> "Research complete. The report includes a reference example and execution trace. Run `/planner` to generate the implementation plan using these findings."
