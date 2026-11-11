---
name: engineering-principles
description: >-
  Use when writing, designing, refactoring or extending code: where logic
  belongs, how much abstraction is enough, module and interface structure,
  error handling, validation at boundaries, naming, what a test should prove.
  Triggers on "how should I structure this", "is this too complex", "should I
  abstract this". Not for checking a finished diff before a PR (use
  reviewing-code). Not for deep SOLID, TDD or DDD (use solid-principles,
  test-driven-development, domain-driven-design).
metadata:
  last_updated: "2026-11-11"
---

# Engineering Principles

A small set of principles covers most of what makes code good. Apply them while you write, in this order, because an early mistake is expensive to fix later:

1. **Scope.** Do what was asked and nothing more. KISS, YAGNI, DRY with the Rule of Three, Gall's Law (grow a working simple system, don't design a complex one). Delete before you add.
2. **Design.** Separate concerns, give each unit one reason to change, depend on abstractions at real seams, prefer composition, tell objects what to do instead of pulling their state apart (Law of Demeter, Tell Don't Ask), keep queries and commands separate.
3. **Correctness.** Parse at the boundary and trust the types inside, fail fast on every path, make illegal states unrepresentable, grant the least privilege, remember that any observable behavior becomes a contract (Hyrum's Law).
4. **Readability and tests.** Least astonishment, explicit over implicit, the idiom the language expects, and a test that fails when the behavior breaks.

Get scope and design right before polishing lines. Hand anything a rule can state (formatting, imports, types) to a tool, not to judgment.

## What to load

Open only what the task needs.

| You are... | Read |
|---|---|
| Deciding what to build, or how much | [principles.md](references/principles.md), "1. Simplicity and scope" |
| Structuring modules, classes, interfaces, dependencies | [principles.md](references/principles.md), "2. Design and structure" |
| Handling input, errors, concurrency, data models, permissions, performance | [principles.md](references/principles.md), "3. Correctness and safety" |
| Naming, clarity, idioms, writing tests | [principles.md](references/principles.md), "4. Readability and tests" |
| Writing Python, TypeScript or JavaScript, shell or SQL | [language-notes/index.md](references/language-notes/index.md), then the one file for that language |

The one-paragraph summaries at the top of `principles.md` ("Principles") are enough for a quick decision. Read the detailed section when the summary doesn't settle it.

## Related skills

- `solid-principles`: the full SRP/OCP/LSP/ISP/DIP treatment with bad-to-good examples.
- `test-driven-development`: the red-green-refactor discipline and test doubles.
- `domain-driven-design`: aggregates, value objects, CQRS and event sourcing.
- `senior-engineering-best-practices`: verifying docs before a workaround, root-cause discipline, blast radius, dependency judgment.
- `reviewing-code`: the process for checking a finished diff against these principles, with per-change-type playbooks (endpoints, migrations, auth, Dockerfiles and so on).
