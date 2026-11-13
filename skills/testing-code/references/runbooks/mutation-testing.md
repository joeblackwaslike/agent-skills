# Mutation testing runbook

Mutation testing is a technique for judging tests and is not itself a kind of test (P7). It shows whether the tests you have would notice if behavior broke. See [mutation testing](../../../testing-principles/references/mutation.md) for what it does, what a score means and when it pays off.

## What it proves

Whether a suite would fail if the code were wrong. A tool makes small deliberate changes to a copy of the code, one at a time (a flipped comparison, a swapped operator, a removed call, a changed constant), and runs the tests against each. A test that fails kills the mutant. A mutant that survives marks code that tests run without really checking. Coverage asks whether code ran; mutation asks whether the tests would fail if the code were wrong.

## When to write it

This heading is about when to run it, since there is no test to write.

- The code is critical or costly to get wrong: money, permissions, parsing, core rules.
- Coverage is already high and you doubt the assertions.
- The tests were produced quickly, for example by an assistant, and their strength is unknown.
- A module changes often and the team relies on its tests to refactor safely.

Skip it when the suite is slow or flaky, since flaky failures register as false kills (P15). Skip it when coverage is low; write the missing tests first. Skip it on thin glue, generated code or throwaway code. Cost grows with code size and suite duration (P17), so scope it to the code that earns it, such as the files in a diff or one critical package, and keep it out of the fast feedback loop.

## Setup

- A fast, deterministic, green suite for the target code. Mutation reruns the tests many times, so a flaky or slow suite makes the result noise.
- A mutation tool for the language, installed in the project. Tool setup is in the language page, for example [python.md](../languages/python.md).
- A narrow target: the changed files or one package, plus the tests that cover them.
- Coverage data, if the tool uses it to skip mutants no test reaches.
- A place to put the survivors report, kept out of the repository unless the team decides otherwise.

## Steps

1. Run the target tests and confirm they pass. Fix any flake first (P15).
2. Choose the scope: the code that earns it, and the tests that cover it.
3. Run the tool on that scope, outside the fast loop, with a time limit per mutant.
4. Open the survivors table. List each survivor with its file, line and mutation.
5. Triage each one against the reasons a mutant survives: no test reaches the code; the code runs but nothing asserts the result; a boundary is unchecked; the mutant behaves the same as the original (an equivalent mutant); the change only affects logging, timing or other side detail.
6. For each survivor that matters, strengthen the test on the observable outcome or add the missing boundary example. Fix the test, not the mutant. A test written only to kill one mutant, with no behavior behind it, adds upkeep and little protection.
7. Mark equivalent mutants and side-detail mutants as ignored with a one-line reason.
8. Run the tool again on the same scope and confirm the fixed survivors are now killed.
9. Read the remaining survivors for patterns. Many in one module usually point to one habit, such as asserting only that a call did not raise.

## Cases to cover

There are no cases to write. Inspect these in the results.

- The survivors table, one row per surviving mutant with its file, line, mutation and your triage reason.
- Survivors in covered code. These are the findings coverage hides.
- Boundary survivors: comparison operators and constants near limits.
- Clusters: many survivors in one function or one test file.
- Timeouts and no-coverage counts, which some tools include in the score and some drop.
- The score, as a trend within one setup, never as a target (P7). It is not comparable across tools.

## Doubles and patches

Not applicable to the run, since the tool mutates the code under test and leaves the doubles alone. Look at the tests being judged: if they mock heavily, survivors will show assertions that only check calls. See [doubles](../../../testing-principles/references/doubles.md).

## Determinism and isolation

- The suite must be deterministic and hermetic (P13, P14), because the tool reruns it many times and a flaky failure looks like a kill.
- A mutant that causes an infinite loop needs a per-mutant time limit; do not rely on bare sleeps or fixed waits in the tests.
- Run in a clean working copy or let the tool use its own, so mutated code never gets committed.
- Parallel runs need test isolation to hold, including separate store instances.

## Common mistakes

- Chasing a perfect score. Equivalent mutants make it unreachable, so write tests for behavior instead.
- Writing a test only to kill one mutant, which becomes a [change-detector test](../code-smells.md#change-detector-tests).
- Survivors caused by assertions that cannot fail: [tests that cannot fail](../code-smells.md#tests-that-cannot-fail).
- Survivors from asserting internals: [testing private internals](../code-smells.md#testing-private-internals).
- Survivors where one test checks several things with loose asserts: [assertion roulette](../code-smells.md#assertion-roulette) and [one test covering several behaviors](../code-smells.md#one-test-covering-several-behaviors).
- Survivors in code reached through heavy mocking: [over-specified or over-mocked setup](../code-smells.md#over-specified-or-over-mocked-setup).
- Running it on a flaky suite, so [shared mutable state](../code-smells.md#shared-mutable-state) and [bare sleeps](../code-smells.md#bare-sleeps) produce false kills.
- Fixing survivors with computed expectations: [logic in tests](../code-smells.md#logic-in-tests).
- Values hidden in helpers so the new test reads as magic: [values defined far from the test](../code-smells.md#values-defined-far-from-the-test).
- Stubs that no longer match what they stand for hiding real gaps: [stale doubles](../code-smells.md#stale-doubles).

## Done check

- [ ] The scope is the code that earns it.
- [ ] The suite was green and stable before the run (P15).
- [ ] Every survivor has a triage reason: fixed, equivalent, side detail or accepted.
- [ ] Fixes strengthen assertions on behavior.
- [ ] A second run shows the fixed survivors killed.
- [ ] The score is reported as a trend for this setup (P7).

## Sources

The method and its limits follow the [mutation testing](../../../testing-principles/references/mutation.md) page, which cites the Google Testing Blog post "Code Coverage Best Practices" for mutation testing as a better check of whether covered lines are adequately asserted.
