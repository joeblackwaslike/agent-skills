---
name: engineering-principles
description: >-
  Use when writing, designing, refactoring or extending code: where logic
  belongs, how much abstraction is enough, module and interface structure,
  error handling, validation at boundaries, naming, what a test should prove.
  Triggers on "how should I structure this", "is this too complex", "should I
  abstract this". Not for checking a finished diff before a PR (use
  reviewing-code). Not for deep SOLID, TDD or DDD (use solid-principles,
  testing-principles, domain-driven-design). Not for choosing or
  implementing a named pattern (use design-patterns). Not for system-level
  layering, CQRS, sagas, event-driven design or service splits (use code-architectures).
metadata:
  last_updated: "2026-11-17"
---

# Engineering Principles

Good code mostly comes from a few decisions made in the right order. Is this needed? Where does it belong? What happens when it fails? Can the next person read it? These principles answer those four questions, in that order, and the sections below point to the full answer for each.

You already know most of the names: KISS, YAGNI, DRY, SOLID, fail fast, least astonishment. The names alone help little. The working version of each one helps more: what it means when you are staring at a real function, what a violation looks like in a diff, and what to do about it. Take DRY. Most people remember "don't repeat yourself", and few remember when merging two similar functions makes the code worse.

This page only touches on the principles, to keep things light. You can read them in full in [references/principles.md](references/principles.md), which gives the definition of each one, how to apply it, what a violation looks like, and what to do when you see one.

## When to activate

Use this skill when you are writing, designing, refactoring or extending code and need to decide:

- what to build, and how much of it
- where logic belongs, and how modules, classes and interfaces should fit together
- how input, errors and failure should be handled
- how to name things, which idiom to use, and what a test should prove

It also answers questions like "how should I structure this?", "is this too complex?" and "should I abstract this?".

Don't use it to check a finished diff before a PR (use `reviewing-code`), or for deep SOLID, TDD, DDD, named patterns or system-level architecture (see Related skills at the bottom).

## How to use this skill

1. Find your task in the table of groups below and open that section of `principles.md`.
2. If the code is in one of the languages listed under "Language notes" further down, open that file too and read it alongside the section. The principles say what to aim for, and the language file says what it looks like in Python, TypeScript, Rust, shell or SQL.
3. Work in the order of the groups. Scope first, then design, then correctness, then readability. An early mistake is expensive to fix later, so don't polish lines before the shape is right.
4. Hand anything a rule can state (formatting, imports, types) to a tool, not to your judgment.

## The four groups

| Group | Principles | Read when you are | Section in principles.md |
|---|---|---|---|
| 1. Simplicity and scope | KISS, YAGNI, DRY, Rule of Three, premature optimization, make it work then right then fast, Gall's Law | Deciding what to build, or how much | "1. Simplicity and scope" |
| 2. Design and structure | SOLID, separation of concerns, high cohesion and low coupling, Law of Demeter, Tell Don't Ask, composition over inheritance, command-query separation | Structuring modules, classes, interfaces and dependencies | "2. Design and structure" |
| 3. Correctness and safety | Fail fast, parse don't validate, illegal states unrepresentable, least privilege, concurrency and I/O, Hyrum's Law, performance and observability | Handling input, errors, concurrency, data models, permissions or performance | "3. Correctness and safety" |
| 4. Readability and tests | Least astonishment, explicit over implicit, idiomatic code, Boy Scout Rule, Chesterton's Fence, Conway's Law, tests that fail when behavior breaks | Naming, clarity, idioms and writing tests | "4. Readability and tests" |

Each section of principles.md opens with the group's headline principles in short form (what it means, how to apply it). The rest of the section goes deeper, as a checklist of what to look for, and covers the table items that have no short form of their own. Code examples appear only in section 2. Read the short form to settle a quick decision. Read the rest when you suspect a violation.

## Language notes

The principles are language-neutral. The language notes hold what differs: the toolchain that enforces the mechanical rules, how packages are managed, how the principles show up in that language, and its idioms and smells. When you write or review code in one of these languages, read its file together with the principles section for your task.

| Language | File | Sections |
|---|---|---|
| Python | [python.md](references/language-notes/python.md) | Tooling and settings; Packages and environments (pip, uv, PyPI); Idioms; Python-specific smells |
| TypeScript and JavaScript | [typescript.md](references/language-notes/typescript.md) | Tooling and settings; Packages (npm, pnpm, Bun); How the principles show up; Idioms; TypeScript-specific smells |
| Rust | [rust.md](references/language-notes/rust.md) | Tooling and settings; Packages (Cargo, crates.io); How the principles show up; Idioms; Rust-specific smells |
| Shell (Bash and zsh) | [shell.md](references/language-notes/shell.md) | Tooling; Bash and zsh differences; Idioms; Shell-specific smells |
| SQL | [sql.md](references/language-notes/sql.md) | Tooling; Idioms; SQL-specific smells |

[language-notes/index.md](references/language-notes/index.md) has a side-by-side table of the tools each language uses for formatting, linting, type checking, tests, parsing at the boundary and the rest. Open it to compare languages or to find the equivalent of a principle in a language you know less well.

## Related skills

- `solid-principles`: the full SRP/OCP/LSP/ISP/DIP treatment with bad-to-good examples.
- `testing-principles`: what a good test is, plus the red-green-refactor discipline (its `test-driven-development` reference) and test doubles.
- `domain-driven-design`: aggregates, value objects and bounded contexts.
- `code-architectures`: layering, CQRS, event sourcing, event-driven design and service boundaries.
- `senior-engineering-best-practices`: verifying docs before a workaround, root-cause discipline, blast radius, dependency judgment.
- `reviewing-code`: the process for checking a finished diff against these principles, with per-change-type playbooks (endpoints, migrations, auth, Dockerfiles and so on).
- `design-patterns`: the catalog of named patterns, with a reference per pattern. Use it once you have decided an abstraction is warranted.
