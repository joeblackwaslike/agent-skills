# Property-based test runbook

## What it proves

That a rule holds across many generated inputs, not only the few you thought of. It answers "for any input of this shape, does this relationship hold?" (P5). A framework generates inputs, checks the rule for each, and reduces a failure to a small case. See [property-based testing](../../../testing-principles/references/property-based.md) for when a property beats an example, and [test kinds](../../../testing-principles/references/test-kinds.md) for how this kind differs from the others.

## When to write it

- A rule that is simple to state over a large input space: parsing, formatting, encoding, sorting, arithmetic, normalization.
- Two directions of a transformation, or two implementations, that must agree.
- A bug class found by example tests that keeps producing one more case each time.
- A rule that must survive a rewrite of the implementation behind it.

Use another kind when it fits better. An exact, arbitrary business answer, such as a tax rate for a named region, is a [unit](unit.md) example. A rule you can only state by repeating the code is not a property; write examples. A rule that needs the app wired up or a real store belongs in [functional](functional.md) or [integration](integration.md), and expensive setup makes many generated runs impractical (P17).

## Setup

- The rule written as a sentence in domain terms, before any code: "decoding what was encoded returns the original".
- A property family chosen from the Property families list below.
- Generators for the input domain, built so they produce valid inputs directly and include the edges: empty, huge, duplicates, unusual characters, boundaries.
- A seed per run, recorded in the failure output, so any failure can be replayed (P14).
- A modest run count for the fast suite; a larger count for a scheduled run (P17).
- Collaborators at boundaries doubled as in a unit test; the code under test is pure or close to it.

## Steps

1. State the property and name the test after the rule it protects.
2. Choose the family, then write the property body in the [test body template](../test-body-template.md): the generated input is the constant, the act is one call, and the assert is the relationship, with no branches or computed expectations (P3).
3. Write or reuse the generator. Constrain it to the valid domain by construction, not by throwing away most draws.
4. Run it red first against code that breaks the rule, or against a deliberately broken version, and confirm it fails for the intended reason and prints the seed and the reduced input (P19).
5. Make it pass.
6. When a run finds a bug, keep the reduced input as a fixed example test beside the property, so the regression stays covered if generation changes.
7. Check that the property can fail. A mutation run on the code (see [mutation testing](mutation-testing.md)) shows whether a plausible bug would be caught.

## Cases to cover

- One property per rule, each from a family that fits.
- The edges the generator must reach: empty, single element, maximum size, duplicates, boundary values, non-ASCII text.
- The invalid-input property, where the rule says how bad input fails: the error and nothing else.
- Each reduced failure from the past, kept as an example.
- Examples that document intent stay out. Keep those as unit tests next to the properties.

## Doubles and patches

- Prefer no doubles. Properties work best on pure logic with real value objects (P8).
- When a collaborator must be doubled, use a stub or fake with deterministic behavior, built fresh for each generated case so state does not carry between runs. A mock that asserts call lists is rarely right for a rule over many inputs; when one is, it asserts the full list and nothing else called (P10). See [doubles](../../../testing-principles/references/doubles.md).
- Inject the clock and random source rather than patching (P12); see [patches](../../../testing-principles/references/patches.md).

## Determinism and isolation

- CI uses a fresh seed per run and prints it in the failure output, so the failing run can be replayed (P14). Pin a seed only while reproducing a failure. A failure that cannot be replayed is a flake (P15).
- Each generated case is independent. Properties must not write to shared state, or iterations affect each other and tests affect other tests (P13); see [isolation](../../../testing-principles/references/isolation.md).
- The property is deterministic given the input. If the code under test reads the clock or randomness, inject them.
- No bare sleeps. Time-bound each run so a pathological input fails loudly.
- Keep the run count modest in the fast suite, and say what the scheduled run uses (P17).

## Common mistakes

- A property that restates the implementation, so it passes for any bug the code has: [tests that cannot fail](../code-smells.md#tests-that-cannot-fail) and [logic in tests](../code-smells.md#logic-in-tests).
- Branches and loops in the body to handle special generated cases: [logic in tests](../code-smells.md#logic-in-tests).
- Asserting on private helpers because they are easy to reach: [testing private internals](../code-smells.md#testing-private-internals).
- A property that checks the exact output format, so every formatting change breaks it: [change-detector tests](../code-smells.md#change-detector-tests).
- Generators and strategies defined in a helper module far from the test: [values defined far from the test](../code-smells.md#values-defined-far-from-the-test).
- One property bundling several rules: [one test covering several behaviors](../code-smells.md#one-test-covering-several-behaviors).
- A pile of asserts in one property, so a failure gives no hint which rule broke: [assertion roulette](../code-smells.md#assertion-roulette).
- Shared collaborators or state carried across generated cases: [shared mutable state](../code-smells.md#shared-mutable-state).
- Pausing in the property to wait for work: [bare sleeps](../code-smells.md#bare-sleeps).
- Heavy stubbing that fixes the outcome: [over-specified or over-mocked setup](../code-smells.md#over-specified-or-over-mocked-setup).
- A stub that no longer matches the real collaborator: [stale doubles](../code-smells.md#stale-doubles).

## Done check

- [ ] The property is a rule a stakeholder would recognize, named after what it protects.
- [ ] The generators produce the edges and are valid by construction.
- [ ] It failed first, for the intended reason (P19).
- [ ] A failure prints the seed and the reduced input, and past failures are kept as examples.
- [ ] A plausible bug would fail it, checked by a mutation run where the code earns one.
- [ ] No shared state, no bare sleeps, clock and randomness injected (P13, P14).
- [ ] Run count suits the fast suite; the larger run is scheduled (P17).

## Property families

Pick the family that matches the rule. See [property-based testing](../../../testing-principles/references/property-based.md) for the fuller table and writing notes.

- Round-trip: decoding what was encoded returns the original. Often the cheapest to write; fits serialization, parsing and printing, compression.
- Idempotence: applying the operation twice equals applying it once. Fits normalization, deduplication, formatting.
- Invariants: a fact stays true after any operation. Totals, sizes, ordering, a balance that never goes negative.
- Oracle or model: the real implementation matches a simple, obviously correct one. Optimized code against a naive version, a data structure against a built-in. The reference must be trustworthy.
- Metamorphic: a known change to the input produces a known change to the output, when the exact answer is unknown. Doubling every price doubles the total.
- Commutativity and associativity: order or grouping of operands does not change the result. Merging, aggregation, set operations.
- No-crash: any valid input completes without an unexpected failure. Parsers and handlers fed arbitrary data.
- Error contract: invalid input fails in the documented way.
