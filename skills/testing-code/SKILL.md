---
name: testing-code
description: >-
  Use when writing tests ("write tests for X", "add a test for this", "write a failing test first", "red green refactor this"), or when a test is flaky or the suite is slow. Not for reviewing a diff (use reviewing-code). Not for deciding what a good test is (use testing-principles; read it first for the standard).
metadata:
  last_updated: "2026-11-13"
---

# Testing Code

The steps for writing a test and getting it green. The standard it must meet lives in `testing-principles`; cite its principles by ID (P3, P10).

## Workflow

1. **Load the standard.** Read the `testing-principles` files below that the task needs, starting with its `SKILL.md`.
2. **Pick the kind** from what you need to prove (P5, P6), then open that kind's runbook.
3. **Read the language page** for mechanics: fixtures, doubles, parametrization, async, tooling.
4. **Write the test body** with `references/test-body-template.md`: constants, mocks, act, expected, result asserts, mock asserts in call order, not-called asserts. Write it first and watch it fail for the intended reason (P19). Code already exists: break or revert the production line the test covers, confirm the test fails for the intended reason, then restore it (see [tests that cannot fail](references/code-smells.md#tests-that-cannot-fail) and [test-driven development](../testing-principles/references/test-driven-development.md)).
5. **Build fixtures and doubles.** Stubs for data, mocks for effects, fakes when several calls matter. Check each double against the real thing (P11).
6. **Check isolation and determinism.** Run the test alone, in a different order, and repeated. Inject the clock, seed randomness, block the network (P13, P14). A date built as now minus N days still reads the real clock, so use fixed dates when you cannot inject it.
7. **Run it, then run the suite.** Scan the test against `references/code-smells.md` before calling it done.
8. **Flaky or slow?** Go to the `flakes/` runbooks or `slow-tests.md`. Never retry a flake to green (P15).

## Routing

| You are... | Read |
|---|---|
| Writing any test body | [test-body-template.md](references/test-body-template.md) |
| Checking a test you wrote or found | [code-smells.md](references/code-smells.md) |
| Writing a test of one kind | The runbook for that kind, listed below |
| Judging a suite with mutation testing | [runbooks/mutation-testing.md](references/runbooks/mutation-testing.md) |
| Designing fixtures | [runbooks/fixtures.md](references/runbooks/fixtures.md) |
| Patching safely, or refactoring code to take an injected dependency | [runbooks/patching.md](references/runbooks/patching.md) |
| Testing a browser journey or a React component | [runbooks/playwright.md](references/runbooks/playwright.md), [runbooks/react.md](references/runbooks/react.md) |
| Chasing a flaky test | [flakes/triage.md](references/flakes/triage.md), then [flakes/tracking.md](references/flakes/tracking.md) and [flakes/quarantine.md](references/flakes/quarantine.md) |
| Speeding up a suite | [slow-tests.md](references/slow-tests.md) |
| Needing tool mechanics for a language | [languages/index.md](references/languages/index.md), then [languages/python.md](references/languages/python.md), [languages/typescript.md](references/languages/typescript.md), [languages/rust.md](references/languages/rust.md), [languages/shell.md](references/languages/shell.md) or [languages/sql.md](references/languages/sql.md) |

Kind runbooks:

- [unit](references/runbooks/unit.md)
- [integration](references/runbooks/integration.md)
- [contract](references/runbooks/contract.md)
- [functional](references/runbooks/functional.md)
- [end-to-end](references/runbooks/end-to-end.md)
- [acceptance](references/runbooks/acceptance.md)
- [behavioral](references/runbooks/behavioral.md)
- [property-based](references/runbooks/property-based.md)

## Standard to load

From `../testing-principles/`, open only what the task needs:

- [SKILL.md](../testing-principles/SKILL.md): the nineteen principles and a load table.
- [test-kinds.md](../testing-principles/references/test-kinds.md): choosing the kind.
- [test-structure.md](../testing-principles/references/test-structure.md): naming, shape, one behavior.
- [doubles.md](../testing-principles/references/doubles.md): stub, mock, fake, real.
- [fixtures.md](../testing-principles/references/fixtures.md) and [patches.md](../testing-principles/references/patches.md): fixture design and where to patch.
- [isolation.md](../testing-principles/references/isolation.md): hermetic tests.
- [flakes/categories.md](../testing-principles/references/flakes/categories.md): sorting a flake by cause.
- [performance.md](../testing-principles/references/performance.md): slow suites.
- [test-driven-development.md](../testing-principles/references/test-driven-development.md): red before green.

## Related skills

- `testing-principles`: what a good test and suite look like.
- `reviewing-code`: checking a finished diff, tests included.
- `engineering-principles`: where logic belongs, which decides what is easy to test.
