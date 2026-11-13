# Behavioral test runbook

## What it proves

That the system does what a scenario says, written as given, when, then in the language of the domain. It answers "in this situation, when this happens, does the observable outcome match?" (P5). The scenario is the specification, so the test reads like one. See [test kinds](../../../testing-principles/references/test-kinds.md): behavioral is anchored to a scenario format, where [acceptance](acceptance.md) is anchored to a requirement, and one test can be both.

How it differs from its neighbors. A [functional](functional.md) test is defined by reach: one entry point, driven in-process. A behavioral test is defined by form: a scenario in given/when/then terms, at whatever reach the scenario needs. An acceptance test is defined by source: an agreed requirement. A behavioral test may run at functional reach, or end to end, or on a single unit.

## When to write it

- Domain rules that stakeholders describe as situations: "given an overdue invoice, when payment arrives, then the account reopens".
- Behavior with several preconditions where the setup is the interesting part and should be readable.
- Rules a non-programmer should be able to read and confirm.

Use another kind when it fits better. Pure logic with a plain input and output reads fine as a [unit](unit.md) test. A rule over many inputs is a property-based test. A seam against a real store is [integration](integration.md).

## Setup

- A scenario written first in plain sentences: one Given (the starting situation), one When (the single event), one Then (the observable outcome).
- A reach chosen to fit the scenario: the lowest one that still makes the Then observable.
- Builders or helpers that state the Given in domain words, defined near the test so every value stays visible (P4).
- Doubles only for boundaries: third parties and the clock.

## Steps

1. Write the scenario as three sentences. If the When has two events, split it into two scenarios (P3).
2. Name the test after the behavior: "reopens the account when payment clears an overdue invoice".
3. Map the sentences onto the [test body template](../test-body-template.md): Given is constants, mocks and setup; When is the act; Then is expected, result asserts, mock asserts and not-called asserts.
4. Run it red first and confirm it fails because the outcome is missing (P19).
5. Make it pass.
6. Add the next scenario: one variation in the Given or the When, each as its own test.
7. Run the file alone, then shuffled, to confirm the scenarios do not depend on each other (P13).

## Cases to cover

- The scenario that states the rule on its main path.
- Each variation of the Given that changes the outcome: the account is not overdue, the payment is partial.
- Each variation of the When that should not trigger the outcome.
- The failure outcomes the rule names: the rejection, the message, nothing changed.
- Boundaries in the Given that the rule cares about: the exact due date, the last allowed attempt.
- Scenarios for implementation steps stay out. A Then that cannot be observed from outside is not behavior.

## Doubles and patches

- Keep real everything the scenario needs to be believable (P8).
- Replace the boundary: third parties, the network, the clock (P14). The Given sets what stubs return; the Then checks what mocks received, with the full call list in order and nothing else called (P10). See [doubles](../../../testing-principles/references/doubles.md).
- Inject dependencies at construction rather than patching a global (P12). When you must patch, patch where the name is looked up and let it undo itself; see [patches](../../../testing-principles/references/patches.md).
- Check any boundary double with a [contract](contract.md) test (P11).

## Determinism and isolation

- Each scenario builds its own Given and nothing it creates outlives it (P13); see [isolation](../../../testing-principles/references/isolation.md).
- Time is part of many Givens ("overdue", "after the trial ends"). Inject the clock and set it in the Given (P14).
- Seed randomness; no bare sleeps; block the network by default (P14).
- Shared step helpers must not hold state between scenarios.
- A scenario that still flakes goes through [flakes/triage.md](../flakes/triage.md), and [flakes/quarantine.md](../flakes/quarantine.md) if the fix cannot land now.

## Common mistakes

- Then clauses that check internals, which are not observable from outside: [testing private internals](../code-smells.md#testing-private-internals) and [change-detector tests](../code-smells.md#change-detector-tests).
- A scenario with several Whens and Thens, so a failure does not point at one rule: [one test covering several behaviors](../code-smells.md#one-test-covering-several-behaviors).
- Given steps pulled from shared step libraries so the values are hidden: [values defined far from the test](../code-smells.md#values-defined-far-from-the-test).
- A Given built with loops or conditionals, or a Then computed from the same logic as the code: [logic in tests](../code-smells.md#logic-in-tests).
- A Given that stubs every collaborator including the ones that matter: [over-specified or over-mocked setup](../code-smells.md#over-specified-or-over-mocked-setup).
- Scenarios that rely on state left by the one before: [shared mutable state](../code-smells.md#shared-mutable-state).
- Waiting by pausing: [bare sleeps](../code-smells.md#bare-sleeps).
- A long Then with many asserts and no labels: [assertion roulette](../code-smells.md#assertion-roulette).
- A scenario whose Then is satisfied by the Given alone: [tests that cannot fail](../code-smells.md#tests-that-cannot-fail).
- A stub for a boundary that no longer matches the provider: [stale doubles](../code-smells.md#stale-doubles).

## Done check

- [ ] One Given, one When, one Then, in domain words.
- [ ] The Then is observable from outside the code.
- [ ] The reach is the lowest that makes the Then observable.
- [ ] It failed first, for the intended reason (P19).
- [ ] Every value the scenario depends on is visible in the test (P4).
- [ ] Clock and randomness injected; no bare sleeps; network blocked (P14).
- [ ] Passes alone, shuffled and in parallel (P13).

## Sources

Informed by Fowler's "The Practical Test Pyramid", whose acceptance section describes a given/when/then form as a way to shift tests from implementation details toward the user's needs, without requiring a dedicated tool. The distinctions from functional and acceptance tests are this skill's own, set out in the test kinds page.
