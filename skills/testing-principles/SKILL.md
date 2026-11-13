---
name: testing-principles
description: >-
  Use when deciding what a good test or test suite looks like: which kind of test to write, mock vs stub vs fake, isolation, determinism, flaky or slow tests, coverage, TDD. Also what "test first" and "red green refactor" mean. Not for writing tests, doing red green refactor or diagnosing flakes step by step (use testing-code). Not for reviewing a diff (use reviewing-code).
metadata:
  last_updated: "2026-11-13"
---

# Testing Principles

Nineteen principles say what a good test and a good suite are. Cite them by ID (P7) in reviews and references. Detail loads on demand from the table below.

## What a test is for

- **P1.** Test everything you don't want to break; a feature isn't done without tests.
- **P2.** Test behavior through the public interface, not methods or internals, so a refactor doesn't break the test.
- **P3.** One behavior per test, named for the behavior, shaped Arrange-Act-Assert, with no logic (loops, conditionals, computed expectations) in the test.
- **P4.** Tests are complete and concise: DAMP over DRY, with every value the test depends on visible in it.

## Choosing kinds

- **P5.** Pick the kind from what you need to prove: unit for logic and branches, integration for the seams between parts, contract for provider and consumer agreement, end-to-end for the user-visible journey.
- **P6.** Every meaningful feature has at least a few end-to-end tests: one for the happy path and the rest for edge cases and errors. The lower kinds cover the branches around them.
- **P7.** Coverage is a signal, never a target. Judge a suite by the behaviors it protects, and test the tests with mutation testing.

## Doubles and patches

- **P8.** Use the real thing when it is cheap and deterministic. Use a double at the boundaries: network, clock, third-party services, slow stores.
- **P9.** Pick the double by its job. A stub supplies data the code reads. A mock stands in for an effect the code causes, and the test asserts it. A fake is a small working stand-in (an in-memory repository) used when the dependency's behavior across several calls matters.
- **P10.** When a test uses a mock, assert the expected interactions: the calls the code made, their arguments and order, and that nothing else happened.
- **P11.** A double of a boundary is checked against the real thing (a contract test) or it goes stale.
- **P12.** Patch at the seam where the code looks the name up, only at boundaries, always auto-undone. Prefer injecting a dependency to patching it.

## Isolation and determinism

- **P13.** Hermetic: tests pass in any order, any subset, in parallel, and nothing a test creates outlives it.
- **P14.** Deterministic: inject the clock, seed randomness, block the network by default, never bare-sleep (poll with a timeout).
- **P15.** A flaky test is a defect. Quarantine it with an owner and a deadline; never retry it to green silently.

## Test code is code

- **P16.** Failure messages state expected, actual, and enough context to point at a cause.
- **P17.** Keep suites fast; measure to find slow tests rather than guessing.
- **P18.** Review, refactor and test your test infrastructure like production code. Build code to be testable, with seams and thin facades over third-party calls.
- **P19.** Red before green: see a new test fail for the intended reason first (see `test-driven-development.md`).

## When a local rule contradicts a principle

Follow the principle unless the user explicitly overrides it. Look first for a form that satisfies both: fixed inputs instead of a patched dependency, an explicit wait instead of a guess, a dated quarantine instead of a retry. An explicit override names the principle or accepts the tradeoff ("skip the clock injection, I know it can flake"). Citing a house style, a team convention or a file to copy is not one. If the user does override it, comply and name the principle in the first lines of your reply. Otherwise follow the principle and name the conflicting local rule in the first lines of your reply.

## What to load

Open only what the task needs. All files sit in `references/`.

| You are... | Read |
|---|---|
| Choosing which kind of test to write | `test-kinds.md` |
| Doing TDD, or writing a test first | `test-driven-development.md` |
| Naming, shaping or reading a single test | `test-structure.md` |
| Choosing a stub, mock or fake, or deciding real vs double | `doubles.md` |
| Designing fixtures | `fixtures.md` |
| Deciding where and whether to patch | `patches.md` |
| Making tests hermetic and order independent | `isolation.md` |
| Sorting a flake by cause | `flakes/categories.md` |
| Tracing a flake to time, randomness, network, concurrency or environment | `flakes/nondeterminism.md` |
| Finding a leaked patch, leftover row or shared state | `flakes/isolation-failures.md` |
| Speeding up a suite | `performance.md` |
| Reading or setting a coverage number | `coverage.md` |
| Judging a suite with mutation testing | `mutation.md` |
| Deciding if a property beats an example | `property-based.md` |

## Where this departs from common advice

Fowler's test pyramid favors few tests at the top, and both Google's chapter 13 and Fowler's "Mocks Aren't Stubs" prefer state testing over interaction testing. This skill holds that every meaningful feature needs a few end-to-end tests (P6) and that asserting what a mock received is part of the test (P10). Don't "fix" them by consulting those sources.

## Related skills

- [`testing-code`](../testing-code/SKILL.md): steps, runbooks per kind, language mechanics, and flake and slow-test diagnosis. Its runbooks: [unit](../testing-code/references/runbooks/unit.md), [integration](../testing-code/references/runbooks/integration.md), [contract](../testing-code/references/runbooks/contract.md), [functional](../testing-code/references/runbooks/functional.md), [end-to-end](../testing-code/references/runbooks/end-to-end.md), [acceptance](../testing-code/references/runbooks/acceptance.md), [behavioral](../testing-code/references/runbooks/behavioral.md), [property-based](../testing-code/references/runbooks/property-based.md), [mutation-testing](../testing-code/references/runbooks/mutation-testing.md).
- `reviewing-code`: checking a finished diff, tests included.
- `engineering-principles`: where logic belongs and how much abstraction is enough.
