# Content Taxonomy for Agent Instruction Files

Not all content is equal in an instruction file. Some things belong at every scope level;
some things should never appear. This reference maps content types to their appropriate home.

---

## The Core Question

For any piece of information, ask: **Would this confuse or help Claude in a session six months
from now, on a different machine, by a different contributor?**

If yes → it belongs in the instruction file at the right scope.
If no → it belongs in a skill, a doc, a commit message, or nowhere.

---

## Content Type → Scope Level

### User / Global (`~/.claude/CLAUDE.md`)

| Content type | Example |
| --- | --- |
| Role and technical background | "Senior Python backend engineer, 10 years experience" |
| Communication preferences | "Skip preamble. Answer first, explain after if needed." |
| Default language/framework stance | "TypeScript for APIs, Python only when torch is needed" |
| Async/sync preference | "All new code is async-first" |
| Package manager preference | "Use `uv` for Python, `pnpm` for Node" |
| IDE and OS notes | "VS Code Insiders on macOS, OrbStack for containers" |
| Global skill activation rules | "Always invoke `serena` for code navigation" |
| Cross-project tool conventions | "`jq` for JSON in shell scripts, never inline Python" |
| Hardware notes | "M1 MacBook, 64GB RAM; avoid building x86 images" |

**Target:** 100–200 lines. Comprehensive but organized. Every line applies to every project.

---

### Project Root (`CLAUDE.md` or `AGENTS.md`)

| Content type | Example |
| --- | --- |
| Build command | `uv run pytest -x` |
| Test command and flags | `npm test -- --watch=false` |
| Lint/format command | `ruff check . && ruff format .` |
| Dev server command | `make dev` |
| Non-obvious project structure | "All request handlers live in `src/handlers/`, not `src/routes/`" |
| Architecture decisions | "We use CQRS: reads go through `QueryBus`, writes through `CommandBus`" |
| Coding convention that can't be inferred | "All public functions must have `zod` schemas; no manual validation" |
| Test convention | "Integration tests hit a real DB; never mock the database layer" |
| Team workflow rules | "PRs need 2 approvals; squash-merge only" |
| Commit format | "Conventional commits: `feat:`, `fix:`, `chore:` prefixes" |
| Skill activation rules for this project | "Load `serena` for code navigation; load `beads` for task management" |

**Target:** 20–80 lines. Concrete, specific, discoverable-from-code things go elsewhere.

---

### Local / Personal (`CLAUDE.local.md`, gitignored)

| Content type | Example |
| --- | --- |
| Local dev URLs | "Local API: http://localhost:3001" |
| Sandbox credentials or test tokens | "Test Stripe key: sk_test_..." |
| Personal test data paths | "My fixtures are in `~/fixtures/`" |
| Personal preferences on a team project | "I prefer verbose error messages during local dev" |

**Target:** Keep short. Anything that would embarrass you in a PR belongs here, not in the
shared file.

---

### Subdirectory / Path-Scoped (`.claude/rules/*.md` or nested `CLAUDE.md`)

| Content type | Example |
| --- | --- |
| Path-specific async rules | "All files in `src/api/` must use async/await" |
| Package-specific conventions | "The `packages/web/` package uses Next.js App Router only" |
| Security-sensitive area rules | "Files in `src/auth/` must not log user data" |
| Style constraints per layer | "Components in `src/ui/` must use Tailwind only, no inline styles" |

**Target:** 5–20 lines per rule file. Laser-focused. Load only when relevant.

---

## What Never Belongs in Instruction Files

| What | Why | Better home |
| --- | --- | --- |
| Multi-step procedures ("to set up dev, step 1...") | Bloats every session; stale fast | A skill or `docs/` |
| Long reference material (API docs, changelogs) | Too expensive per session | A skill with `references/` |
| Git history, incident reports | Stale; already in `git log` | Commit messages, ADRs |
| Code examples longer than ~10 lines | Hard to maintain; not actionable | `references/examples/` in a skill |
| Debugging recipes | Specific to a moment in time | Commit messages, issue trackers |
| "Nice to know" facts that don't shape work | Context waste | Cut entirely |
| Opinions the user already has globally | Redundant; may conflict | Keep only in user-global file |
| Anything for a hypothetical future state | Not active constraints | Cut until needed |

---

## Content Quality Signals

**Good signals (probably belongs in the instruction file):**

- A new contributor would be surprised without this information
- It's not derivable from reading the code
- It shapes daily work — commands run, patterns used, tools invoked
- It prevents a class of mistakes that happens repeatedly

**Bad signals (probably doesn't belong):**

- You added it "just in case"
- It's already obvious from the project structure
- It would be out of date within a month
- It describes a one-time decision rather than an ongoing constraint
- You'd be embarrassed to show it to a teammate

---

## Sizing Guidelines

A well-structured instruction file is quick to scan. If a section is growing long, that's a
signal it should become a skill with `references/` instead.

| File | Comfortable size | Warning sign |
| --- | --- | --- |
| `~/.claude/CLAUDE.md` | 100–200 lines | > 300 lines |
| Project `CLAUDE.md` | 20–80 lines | > 150 lines |
| `.claude/rules/*.md` | 5–20 lines | > 50 lines |
| Nested package `CLAUDE.md` | 10–40 lines | > 80 lines |
