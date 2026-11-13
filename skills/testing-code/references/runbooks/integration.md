# Integration test runbook

## What it proves

That two parts work together across the seam between them: code and a database, code and a queue, one module and another. It answers "does this part really talk to that part the way I assumed?" (P5). Unit tests with doubles cannot answer it, because the double encodes the assumption. Both sides of the seam are real; anything beyond the seam is a double (P8). See [test kinds](../../../testing-principles/references/test-kinds.md).

## When to write it

- A new or changed query, mapping, migration or serializer that must work against a real store.
- A queue consumer or producer, or a cache, where the behavior depends on the real system's semantics.
- Each seam a feature adds (P5).

Use another kind when the logic is the question: a branch inside the code is a [unit](unit.md) test. When the question is whether a boundary you do not own still matches your double, write a [contract](contract.md) test. When you need a whole request to work through the wired app, use [functional](functional.md).

## Setup

- A real instance of the collaborator that the test owns: a throwaway instance of the same engine production uses, a local queue, a temp directory. An in-memory engine of a different kind is a fake (see Doubles and patches). It must start empty or from a known state (P13).
- Schema or topology created by the same code production uses (migrations, declarations), so the test also checks that code.
- Fixtures that create the starting data with one state change each and tear it down (see [fixtures](../../../testing-principles/references/fixtures.md)).
- Doubles ready for whatever sits beyond the seam: third-party APIs, the network, the clock.
- A way to reach the service in the test environment that cannot reach shared or production infrastructure.

## Steps

1. Name the seam and the one behavior that crosses it: "saving an order stores its lines and reads them back in order".
2. Decide what is real (both sides of the seam) and what is a double (everything beyond it).
3. Confirm the schema the test runs against comes from the production migrations, not a hand-written copy, so a migration that drifts from the code fails here.
4. Write the test in the [test body template](../test-body-template.md). The act drives the code on one side; the result asserts read the outcome from the other side of the seam.
5. Run it red first. Confirm it fails for the intended reason, for example a missing column, not a connection error (P19). Code already exists: break or revert the production line the test covers, confirm the test fails for the intended reason, then restore it (see [tests that cannot fail](../code-smells.md#tests-that-cannot-fail) and [test-driven development](../../../testing-principles/references/test-driven-development.md)).
6. Make it pass with the least change.
7. Add the failure cases for the seam (constraint violation, timeout, duplicate delivery) one test at a time.
8. Run the file alone, then the suite shuffled, to confirm the data does not leak (P13).

## Cases to cover

- Round trip: write through the code, read back through the real collaborator, and compare.
- Query behavior: filters, ordering, pagination, empty result, many results.
- Constraints and conflicts: unique and foreign-key violations, concurrent writers where the code claims to handle them.
- Failure of the collaborator: connection lost, timeout, rejected message, and what the code does next (retry, surface, roll back).
- Idempotence and redelivery for consumers.
- Transaction behavior: partial failure leaves no partial state.
- Encoding, null and size edges that the real store treats differently from an in-memory stand-in.

## Doubles and patches

- Keep real: both sides of the seam, plus cheap deterministic helpers between them (P8).
- Replace: what is past the seam, such as a payment provider, an email gateway, the network, the clock (P14).
- A fake of the store is allowed for seams that are not the point of the test, but a fake cannot prove a real query works. When the store is the seam, use the real one. Keep any fake honest with a shared suite run against both (P11); see [doubles](../../../testing-principles/references/doubles.md).
- Where a mock appears, for example the outbound gateway, assert its full call list in order and that nothing else was called (P10).
- Patch at the seam where the name is looked up, only at boundaries, and let it undo itself (P12); see [patches](../../../testing-principles/references/patches.md).

## Determinism and isolation

Real collaborators are the main source of flakes in this kind (P13, P14, P15).

- Give each test a fresh state, or roll back a transaction the test never commits. Cleanup after the fact is the weakest degree; see [isolation](../../../testing-principles/references/isolation.md).
- Do not rely on auto-increment ids, insertion order or unordered query results. Order explicitly or compare as a set.
- Do not share a database or queue across parallel workers without separate namespaces.
- Wait for asynchronous delivery by polling a condition with a timeout, never a bare sleep.
- Inject the clock; real stores compare timestamps at different precisions than your code.
- Make teardown run on failure, and make a teardown error loud.
- A test that still flakes goes through [flakes/triage.md](../flakes/triage.md), and [flakes/quarantine.md](../flakes/quarantine.md) if the fix cannot land now.

## Common mistakes

- Replacing the store with a mock and calling it integration: [over-specified or over-mocked setup](../code-smells.md#over-specified-or-over-mocked-setup).
- Rows or messages that survive into the next test: [shared mutable state](../code-smells.md#shared-mutable-state).
- Waiting for a consumer with a fixed pause: [bare sleeps](../code-smells.md#bare-sleeps).
- Asserting on SQL text or call counts instead of stored outcomes: [change-detector tests](../code-smells.md#change-detector-tests).
- Reaching into internal tables or private helpers to check state: [testing private internals](../code-smells.md#testing-private-internals).
- A test that passes because the data it expects was already there: [tests that cannot fail](../code-smells.md#tests-that-cannot-fail).
- A fake store that no longer matches the real one: [stale doubles](../code-smells.md#stale-doubles).
- One test that writes, updates, deletes and lists: [one test covering several behaviors](../code-smells.md#one-test-covering-several-behaviors).
- Seed data defined in a distant file: [values defined far from the test](../code-smells.md#values-defined-far-from-the-test).

## Done check

- [ ] The test names one seam and one behavior.
- [ ] Both sides of the seam are real; only what lies beyond is doubled.
- [ ] It failed first, for the intended reason (P19).
- [ ] Each test starts from known state and leaves nothing behind (P13).
- [ ] No bare sleeps, no reliance on ids or implicit ordering (P14).
- [ ] Mocks, if any, assert full call lists and not-called (P10).
- [ ] It passes alone, shuffled and in parallel.

## Sources

Informed by the integration testing sections of Fowler's "The Practical Test Pyramid" and the Microsoft Engineering Playbook's integration testing page. Written in this skill's vocabulary.
