# Acceptance test runbook

## What it proves

That the system meets a requirement in the stakeholder's own words. It answers "does this do what we agreed it should do?" (P5). Unit tests written by the developer who wrote the code can share that developer's misreading of the requirement; an acceptance test is anchored to the agreed criterion instead, so it checks that the system works as intended and not only as implemented. See [test kinds](../../../testing-principles/references/test-kinds.md): acceptance is anchored to a requirement, where [behavioral](behavioral.md) is anchored to a scenario format, and one test can be both.

## When to write it

- A ticket, spec or story states criteria for a feature and someone other than the author will judge it done.
- A requirement is disputed or easily misread, and a runnable statement of it ends the argument.
- A stakeholder wants proof that a promised behavior still holds after changes.

Use another kind when it fits better. A single entry point under a request belongs in a [functional](functional.md) test. A journey chosen for its value, with no stated criterion behind it, belongs in an [end-to-end](end-to-end.md) test. A rule over many inputs is a property-based test.

An end-to-end test is defined by how far it reaches, the whole running system. An acceptance test is defined by what it is for, an agreed criterion. A criterion about a user journey is often best checked end to end, so the two overlap. A criterion that can be checked at a lower reach should be, because the lower test runs faster and points at the cause.

## Setup

- The written criteria, each with an identifier or a link to the ticket or spec that states it.
- A named owner of the criteria: usually a product owner, a customer or a proxy for them, with the developer responsible for the test. The owner confirms the wording means what they meant.
- A way to run the system at the reach each criterion needs, in-process or fully running.
- Starting data created by the test, in domain terms the owner would recognize.
- Doubles only for what the criterion does not concern: usually external third parties and the clock.

## Steps

1. Take one criterion and rewrite it as one observable outcome: "a customer with an expired card sees a decline message and is not charged".
2. Confirm the wording with the owner of the criteria. If the criterion is vague, ask before writing the test, because a vague criterion gives a test with no clear way to fail.
3. Name the test after the criterion, using the owner's words, and reference its source.
4. Write the body in the [test body template](../test-body-template.md). The act is what the stakeholder does; the result asserts are what the criterion says should be true.
5. Run it red first and confirm it fails because the criterion is unmet (P19).
6. Make it pass at the lowest reach that still satisfies the criterion.
7. Repeat for the next criterion. One criterion per test (P3).

## Cases to cover

- Each stated criterion, as its own test, including the ones that read as negative ("a guest cannot see the report").
- Each boundary the criterion names: the limit, the cutoff date, the last allowed item.
- The error behavior the criterion promises, such as the message and the stored outcome.
- Criteria that were agreed after a defect, so the fix stays fixed.
- Not here: behavior nobody asked for. Extra assurance belongs in the unit, integration and property-based tests around it.

## Doubles and patches

- Keep real what the criterion talks about: the feature, its stores, the user-visible surface (P8).
- Replace external third parties and the clock (P14). Stubs supply what the system reads; mocks stand for what it sends, and they assert the full call list in order and that nothing else was called (P10). See [doubles](../../../testing-principles/references/doubles.md).
- Prefer an injection point to patching. When you must patch, patch where the name is looked up and let it undo itself (P12); see [patches](../../../testing-principles/references/patches.md).
- Check any boundary double with a [contract](contract.md) test (P11).

## Determinism and isolation

- Each test builds its own data and removes it, so tests pass in any order and in parallel (P13); see [isolation](../../../testing-principles/references/isolation.md).
- Inject the clock and seed randomness. A criterion about "after 30 days" needs a clock the test sets (P14).
- No bare sleeps. Wait for a condition with a timeout.
- Block real network access by default.
- A flaky acceptance test is a defect with an owner and a deadline (P15).

## Common mistakes

- Rewriting the criterion to match what the code does, so the test agrees with the implementation: [tests that cannot fail](../code-smells.md#tests-that-cannot-fail).
- Asserting on internals instead of the outcome the criterion states: [change-detector tests](../code-smells.md#change-detector-tests) and [testing private internals](../code-smells.md#testing-private-internals).
- Several criteria in one test, so a failure does not say which was missed: [one test covering several behaviors](../code-smells.md#one-test-covering-several-behaviors).
- Expected values computed by the same logic the system uses: [logic in tests](../code-smells.md#logic-in-tests).
- Data defined in a shared fixture the owner cannot read from the test: [values defined far from the test](../code-smells.md#values-defined-far-from-the-test).
- Doubling the feature's own modules: [over-specified or over-mocked setup](../code-smells.md#over-specified-or-over-mocked-setup).
- Data left behind by earlier criteria: [shared mutable state](../code-smells.md#shared-mutable-state).
- Waiting for work by pausing: [bare sleeps](../code-smells.md#bare-sleeps).
- Many asserts with no label for which failed: [assertion roulette](../code-smells.md#assertion-roulette).
- A provider stub that drifted from the real provider: [stale doubles](../code-smells.md#stale-doubles).

## Done check

- [ ] Each test names one criterion and points to where it is written.
- [ ] The owner of the criteria has confirmed the wording.
- [ ] The test fails when the criterion is not met, and it failed first for that reason (P19).
- [ ] Assertions state the outcome in the owner's terms; mocks assert full call lists and not-called (P10).
- [ ] Clock and randomness injected; no bare sleeps; network blocked (P14).
- [ ] Passes alone, shuffled and in parallel (P13).

## Sources

Informed by Fowler's "The Practical Test Pyramid" on acceptance tests as black-box checks from a user's point of view, on the term mattering less than having the tests, and on writing them at the lowest reach that works. Informed by Google's "Software Engineering at Google", chapter 14, on user acceptance tests catching "working as implemented" against "working as intended" when the intended behavior comes from a customer or a proxy. The ownership step is this skill's own addition.
