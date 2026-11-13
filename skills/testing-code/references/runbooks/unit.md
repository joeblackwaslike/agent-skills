# Unit test runbook

## What it proves

That the logic and branches of one piece of code are correct, with the world around it held still. It answers "given this input and these collaborator answers, does this code produce the right result?" (P5). It tests behavior through the public interface, not internals (P2), one behavior per test (P3). See [test kinds](../../../testing-principles/references/test-kinds.md) for how a unit test differs from the other kinds.

## When to write it

- A calculation, parser, validator, mapper or decision with branches.
- A bug fix whose failing input you can pin first (P19).
- Branches around a journey that an end-to-end test already covers, so a journey failure points at a small area (P6).

Use another kind when the thing to prove is how parts behave together. A query that must work against a real store belongs in [integration](integration.md). A rule that must hold for every input, past the three you thought of, belongs in a property-based test. A test that needs the app wired up to answer is [functional](functional.md).

## Setup

- The unit's public entry point is identifiable and callable without starting the app.
- Collaborators that cross a boundary (network, clock, third-party service, slow store) can be passed in or replaced at the seam (P8, P12). If they cannot, refactor for injection first (P18).
- A fixture for each double you will need, built from the real type so a wrong call shape fails (see [doubles](../../../testing-principles/references/doubles.md)).
- Cheap, deterministic collaborators (value objects, pure helpers) stay real.

## Steps

1. Pick one behavior and state it as a sentence: "does X when Y". That sentence becomes the test name (P3).
2. Write the test body in the [test body template](../test-body-template.md): constants, mocks, act, expected, result asserts, mock asserts, not-called asserts.
3. Run it before the code exists or before the fix. Confirm it fails for the intended reason, not for a typo or an import error (P19). Code already exists: break or revert the production line the test covers, confirm the test fails for the intended reason, then restore it (see [tests that cannot fail](../code-smells.md#tests-that-cannot-fail) and [test-driven development](../../../testing-principles/references/test-driven-development.md)).
4. Write the least code that passes.
5. Run it again and confirm green. Run the whole file, then the neighbors, to catch coupling.
6. Repeat from step 1 for the next branch. Do not stack several behaviors into one test.
7. Refactor with the tests green. A refactor that breaks a test with no behavior change means the test knew too much (see Common mistakes).

## Cases to cover

- Happy path: the typical valid input and its result.
- Each branch: one test per condition, including the else path that has no code.
- Boundaries: empty, zero, one, many; the first and last valid value; just past each limit.
- Invalid input: the error or rejection the unit promises, with the type and message a caller depends on.
- Collaborator failure: a stub that raises or returns nothing, and the unit's response to it.
- Effects: for each effect the unit causes, one test that pins the exact calls (P10).

## Doubles and patches

- Keep real: the code under test, value objects, pure functions, in-process helpers (P8).
- Replace: collaborators at a boundary, and anything non-deterministic such as the clock or random source (P14).
- Stub what the code reads, mock what it causes, fake a store only when behavior across several calls matters (P9). Choose by the job, using [doubles](../../../testing-principles/references/doubles.md).
- Wherever a mock appears, assert every call it received, in order, and that nothing else was called (P10). Housing the mock in a fixture and listing its calls in the template's mock-assert block does this.
- Prefer passing the double in over patching a name (P12). When you must patch, patch where the code looks the name up, and let the patch undo itself. See [patches](../../../testing-principles/references/patches.md).
- Do not mock logger-like collaborators; use a real or no-op one.

## Determinism and isolation

A flaky unit test is a defect, and it is the cheapest kind to keep hermetic (P13, P15).

- Inject the clock and seed randomness (P14). Never read the real time inside the assertion. A date written as now minus N days still reads the real clock; when you cannot inject or patch it, use fixed dates (see the [Python page](../languages/python.md#time)).
- Do not touch the network, the file system outside a temp location, or environment variables without restoring them.
- No state shared between tests: no module-level cache, singleton or class attribute that one test writes and another reads. A test must pass alone, shuffled and in parallel.
- Build each test's data in the test. If a fixture owns it, a reader should still see the values in the test (P4).
- If a unit test needs a sleep, the unit is doing concurrent work that belongs behind an injected seam. Poll with a timeout or restructure.
- A test that still flakes goes through [flakes/triage.md](../flakes/triage.md), and [flakes/quarantine.md](../flakes/quarantine.md) if the fix cannot land now.

## Common mistakes

- A test that restates how the code is built and says nothing of what it does: [change-detector tests](../code-smells.md#change-detector-tests) and [testing private internals](../code-smells.md#testing-private-internals).
- Loops, conditionals or computed expectations in the test: [logic in tests](../code-smells.md#logic-in-tests).
- Mocking every collaborator, including cheap real ones: [over-specified or over-mocked setup](../code-smells.md#over-specified-or-over-mocked-setup).
- A fixture or class attribute that tests mutate: [shared mutable state](../code-smells.md#shared-mutable-state).
- Waiting on the clock: [bare sleeps](../code-smells.md#bare-sleeps).
- Expected values hidden in a helper: [values defined far from the test](../code-smells.md#values-defined-far-from-the-test).
- Several unrelated asserts with no message: [assertion roulette](../code-smells.md#assertion-roulette) and [one test covering several behaviors](../code-smells.md#one-test-covering-several-behaviors).
- A test that never failed: [tests that cannot fail](../code-smells.md#tests-that-cannot-fail).
- A hand-rolled double that outlived the real type: [stale doubles](../code-smells.md#stale-doubles).

## Done check

- [ ] The test name states one behavior.
- [ ] It failed first, for the intended reason (P19).
- [ ] Body follows the template; no logic in it (P3).
- [ ] Every mock asserts its full call list and the untouched ones assert not-called (P10).
- [ ] Nothing real crosses a boundary; clock and randomness are injected (P14).
- [ ] Passes alone, shuffled and in parallel (P13).
- [ ] A refactor of the internals would not break it (P2).

## Sources

Informed by the unit testing sections of Fowler's "The Practical Test Pyramid" and the Microsoft Engineering Playbook's unit testing page. Written in this skill's vocabulary.
