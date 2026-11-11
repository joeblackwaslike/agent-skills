# Spec: `design-patterns` skill

## Context

`engineering-principles` says where logic belongs and how much abstraction is enough, but nothing in the repo catalogs the named patterns people actually meet in production code. The only pattern content today is defensive: `solid-principles/references/anti-patterns.md` warns against a one-implementation factory, and `domain-driven-design` covers Repository and Factory inside aggregates only. An agent asked to "add a payment method" or "make this call resilient" has no reference for the standard shape of Strategy or Circuit Breaker, so it either invents one or grows an `elif` chain.

This skill gives a catalog of the patterns that show up in real codebases, plus one in-depth reference per pattern with Python and TypeScript examples. Emphasis is practical: when you reach for it, what it looks like in 2026 Python/TS (often a function or a Protocol, not a class hierarchy), how it fails in production, and when to skip it.

## Decisions already made

- Scope: GoF patterns that appear in production, plus non-GoF staples (Repository, Unit of Work, Retry, Circuit Breaker, Outbox, Result). Rare GoF patterns get a catalog line only.
- Layout: one reference file per pattern, grouped by category folder.
- Languages: Python and TypeScript for every example. Rust is not in scope.

## Goals

1. Find the right pattern from a problem statement ("swap behavior at runtime", "wrap a flaky service") in one hop from `SKILL.md`.
2. List every major pattern with a one-line "what it is" and a prevalence rating, so the list is also a quick refresher.
3. Per pattern: problem, the lighter alternative, Python and TS implementations that run, production gotchas, related patterns.
4. Bias toward the idiomatic form per language (first-class functions, `Protocol`, structural typing, closures, `contextlib`, async iterators) over textbook class diagrams.

## Non-goals and anti-goals

- No academic taxonomy debates, UML, or all 23 GoF patterns at full depth.
- Not a push to use patterns. Anti-goal: the skill makes an agent add a Factory or Strategy where a function call would do. Every reference has an early "Do you need this?" section that names the plain alternative. This is the same stance as `solid-principles`, and the two skills link to each other.
- No framework tutorials (Django, NestJS). Framework mentions only show where a pattern already exists ("Express middleware is Chain of Responsibility").
- No architecture-level material (hexagonal, CQRS, event sourcing). That stays in `domain-driven-design`; this skill points to it.

## Pattern inventory

**Full reference (24 patterns, 22 files):**

| Category | Patterns |
|---|---|
| Creational | Factory (function and registry), Builder, Dependency Injection and composition root, Singleton and its module-level replacement |
| Structural | Adapter, Decorator (wrapper and Python/TS decorators), Facade, Proxy |
| Behavioral | Strategy, Observer (pub/sub, event emitter), Command, Chain of Responsibility (middleware), State (state machine), Template Method, Iterator and generators |
| Data access | Repository, Unit of Work, DTO and Mapper |
| Resilience | Retry with backoff, Circuit Breaker, Idempotency key, Outbox |
| Value modeling | Result/Option, Null Object |

That is 24 candidates. Facade and Null Object are too small for a file each (under about 40 lines of real content), so they become sections inside `adapter.md` and `result-option.md`, which leaves 22 files. Any other pattern that turns out that small gets merged the same way during writing.

**Catalog line only** (name, one sentence, "you probably want X instead"): Abstract Factory, Prototype, Bridge, Composite, Flyweight, Memento, Mediator, Visitor, Interpreter.

## Layout

```
skills/design-patterns/
  SKILL.md                      ~60 lines: router by problem, how to choose, related skills
  references/
    catalog.md                  every pattern: what it is, prevalence, link; catalog-only entries live here
    creational/<pattern>.md
    structural/<pattern>.md
    behavioral/<pattern>.md
    data-access/<pattern>.md
    resilience/<pattern>.md
    value-modeling/<pattern>.md
```

Name `design-patterns` follows the capability-name archetype (like `domain-driven-design`, `engineering-principles`), kebab-case, no prefix.

**SKILL.md** frontmatter description (under 400 chars, trigger first, with exclusions in both directions):

> Use when picking or implementing a named pattern: Strategy, Observer, Adapter, Decorator, Factory, Repository, Unit of Work, Retry with backoff, Circuit Breaker, Idempotency key, Outbox, Result type. Python and TypeScript. Not for whether to abstract at all (use engineering-principles), SOLID refactors (use solid-principles), aggregates, CQRS or event sourcing (use domain-driven-design).

Body: a "What to load" table mapping problem to pattern file (same shape as `engineering-principles/SKILL.md`), a short "Default to no pattern" paragraph, and Related skills.

## Per-pattern reference template

Every file uses the same sections, so an agent can skim for one:

1. **What it is** (2 sentences) and **Problem it solves**.
2. **Do you need this?** The plain alternative (function, dict, `if`), and the signal that tips you over.
3. **Python** example: Python 3.12+, `Protocol`/`dataclass`/type hints, runnable.
4. **TypeScript** example: current TS, structural types, no class where a function and closure do.
5. **In production**: where it shows up in real libraries/frameworks, gotchas (ordering, async/cancellation, testing, shared state), how it fails.
6. **Smells and misuse.**
7. **Related**: neighbors and sibling skills.

Target 80 to 150 lines per file. Examples are complete enough to run, small enough to read in one screen each.

## Cross-skill changes (small, in scope)

- `solid-principles` SKILL.md: add `design-patterns` to Related skills.
- `engineering-principles` SKILL.md: add `design-patterns` to Related skills.
- `SKILLS.md` and `README.md`: add a row to each (trigger text, with "Not for" in both directions).
- Descriptions of `engineering-principles`, `solid-principles` and `domain-driven-design`: append one "Not for ... (use design-patterns)" clause so the exclusion runs both ways. `solid-principles`: "specific patterns". `domain-driven-design`: "standalone Repository, Unit of Work or Outbox mechanics outside an aggregate". `engineering-principles`: "choosing or implementing a named pattern".
- No edits to `principles.md` or other references.

## Sourcing and verification

- Library-specific claims (tenacity, pybreaker, cockatiel, p-retry, Pydantic, SQLAlchemy `Session` as Unit of Work, Express/Koa middleware) get checked against current docs before they land, per the verify-before-acting rule. Pin nothing; name the library and the pattern it implements.
- Code blocks are the main failure risk. A throwaway verification script (kept under the session scratchpad, not committed unless it proves reusable) extracts fenced `python` and `typescript` blocks per file and runs `pyright` and `tsc --noEmit` on them. Blocks marked `# fragment` are exempt.
- Repo gates: `make lint-descriptions` passes; `metadata.last_updated` set; every `references/` link resolves.

## Skill testing (writing-skills RED/GREEN)

Before writing the skill text, run pressure scenarios against a fresh subagent without the skill and record the failure:

1. "Add Stripe and PayPal support to this checkout" on a codebase with an `if provider ==` chain. Expected failure without the skill: a factory-plus-abstract-base hierarchy, or another `elif`.
2. "Make this HTTP call reliable." Expected failure: a bare `while True` retry with fixed sleep, no jitter, no idempotency consideration.
3. "Notify other modules when an order ships." Expected failure: direct calls into each module, or an event bus with no error isolation.
4. Negative control: "Add a second CSV export format." The right answer is a plain function argument, with no pattern. The skill must not make the agent worse here.

Then rerun with the skill. Ship only if 1 to 3 improve and 4 stays plain.

## Approaches considered

1. **One file per pattern, grouped by category** (chosen). Loads only what's needed, mirrors the per-language split already done in `engineering-principles`, and each file can be edited without touching others.
2. One file per category. Fewer files, but a "Behavioral" file with seven patterns is about 900 lines to load for one answer.
3. Two big files (catalog and patterns). Simplest, worst for context cost.

## Delivery

Per repo convention: worktree `.worktrees/design-patterns`, spec as first commit, then plan, then content, all on one branch. The content is around 2,500 lines of Markdown, well past the roughly 400-line PR size gate. The gate is about reviewer attention, and the hard limit is the review bot's 200,000-character budget. Reference prose is therefore split into stacked PRs of one category group each, kept well under that budget.

1. Spec, plan, scaffold (`SKILL.md`, `catalog.md`), SKILLS.md and README.md rows, cross-links.
2. Behavioral patterns.
3. Creational, structural, value modeling.
4. Data access, resilience.

Each PR goes through `/self-review` and `/pr-loop`. Because skills ship by commit SHA, no version bump is needed; after the last push, refresh the cache per `marketplace-publishing` and grep the cache directory to confirm it landed.

## Left to the builder

Exact pattern merges (see inventory note), example domains (pick one running domain, such as orders/payments, so examples read as a set), per-file line counts, and wording of the SKILL.md router rows.

## Verification (end to end)

1. `make lint-descriptions` passes.
2. Extraction script reports zero type errors across all Python and TS blocks.
3. Link check: every path in `SKILL.md` and `catalog.md` exists.
4. Pressure scenarios 1 to 4 behave as stated above, run in fresh subagents given the worktree's `SKILL.md` and `references/` paths (the plugin cache only receives the skill after merge).
5. `grep design-patterns ~/.claude/plugins/cache/agent-marketplace/agent-skills/<sha>/SKILLS.md` returns the new row.
