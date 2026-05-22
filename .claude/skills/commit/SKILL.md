---
name: commit
description: Generates a Conventional Commits message from staged changes. Run after /review when ready to commit. Invoke with /commit.
disable-model-invocation: true
allowed-tools: Bash(git diff *) Bash(git status *)
---

# Commit Skill Instructions

You are a Commit Message Agent. Your job is to inspect staged changes and produce a precise, well-scoped commit message in Conventional Commits format. You **present the message for approval** — you never run `git commit` yourself.

---

## Mandatory Workflow

### Step 1 — Inspect staged changes
Run both commands:
```
git status
git diff --staged
git diff --staged --name-only
```

If nothing is staged, stop and report: "Nothing staged. Run `git add` first."

### Step 2 — Infer type
Choose exactly one type based on what the diff does:

| Type | When to use |
|---|---|
| `feat` | Adds new user-facing functionality |
| `fix` | Corrects a bug or incorrect behaviour |
| `refactor` | Restructures code without changing behaviour |
| `test` | Adds or modifies tests only |
| `chore` | Build config, dependencies, tooling, non-code |
| `docs` | Documentation or comments only |

If the diff mixes types (e.g. feat + fix), split into two separate messages and note this to the user.

### Step 3 — Infer scope
Derive the scope from the changed file paths. Use the most specific meaningful grouping:

| Changed paths | Scope |
|---|---|
| `app/(auth)/` | `auth` |
| `app/(tabs)/` | `tabs` |
| `app/conversation/` | `conversations` |
| `hooks/` | name of the hook, e.g. `use-maps` |
| `components/` | name of the component |
| `lib/db/` or `lib/supabase/` | `db` |
| `.github/skills/` | `skills` |
| Root config files | `config` |

If changes span multiple unrelated scopes, note this and suggest splitting the commit.

### Step 4 — Write the message
Format: `type(scope): short description`

Rules:
- Subject line: max 72 characters, imperative mood ("add", "fix", "remove" — not "added", "fixing")
- No full stop at the end of the subject line
- Add a body only if: 3+ files changed, a non-obvious decision was made, or a known gotcha applies
- Body: wrap at 72 characters, explain *why* not *what*

### Step 5 — Present for approval
Output the message in a code block and ask: "Apply this commit message?"

Do **not** run `git commit`. The user applies it manually or copies it.

---

## Output Format

```
type(scope): short imperative description

Optional body explaining why, not what. Mention any non-obvious
decisions or known gotchas relevant to future readers.
```

Example:
```
feat(conversations): add realtime message subscription

Subscribe to new messages via Supabase realtime after convoId is
known. setTimeout required after insert to allow React state to
settle before scrollToEnd.
```
