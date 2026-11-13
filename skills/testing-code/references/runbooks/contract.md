# Contract test runbook

## What it proves

That a provider and a consumer agree on the shape and meaning of an interface, and that a double of a boundary still matches the real thing. It answers "if I stub the other side from this shared contract, will the real other side behave like the stub?" P11 requires it, because a double of a boundary that is never checked against the real thing goes stale. See [test kinds](../../../testing-principles/references/test-kinds.md).

## When to write it

- You double a boundary you do not own (a payment provider, another team's service, a third-party API) in unit or functional tests (P11).
- Two services change independently and need to notice a break before deploy.
- You keep a hand-written fake of a dependency and need to know it behaves like the real one.

Use another kind when the question differs. Whether your code uses the dependency correctly is a [unit](unit.md) or [integration](integration.md) test. Whether a feature works end to end through the wired app is [functional](functional.md). If you own both sides and can run them together cheaply, an integration test may be simpler than a contract. A side you do not own still needs a contract.

## Setup

- A written contract both sides can read: example requests and responses, a schema, or a recorded set of interactions. It lives in one shared place.
- Consumer side: a stub of the provider generated from or checked against that contract.
- Provider side: the ability to run the real provider (or a provider test environment) against the same contract.
- For a fake: a shared suite of cases that can be pointed at the fake or at the real implementation.
- A decision on how contracts are shared and versioned between the repos, and a record of who owns changes.

## Steps

1. Identify the boundary and write down the interactions your code relies on: the request, the response, the errors. Include only what you actually use.
2. Express them as a contract in the shared form.
3. Consumer test: drive your code against a stub built from the contract, using the [test body template](../test-body-template.md). Assert the result and the exact calls made (P10).
4. Run it red first (P19): write the test before the consumer code, or rename a response field the consumer reads in the contract, and confirm the test fails on that field and not on something else.
5. Provider test: replay the contract against the real provider and assert it satisfies every interaction.
6. Wire both into the pipeline so a change on either side fails a build before release.
7. When a real response surprises you, add it to the contract first, then fix the consumer.

## Cases to cover

- Each interaction the consumer relies on: request shape, response shape and meaning.
- Optional and nullable fields, empty collections, and fields the consumer ignores that may be added later.
- Error responses: not found, validation failure, rate limit, server error, with their codes and bodies.
- Authentication and header expectations.
- Versioning: the old shape the consumer still sends, if both versions are live.
- For a fake: the same cases run against fake and real, including ordering, uniqueness and failure behavior.

## Doubles and patches

- Keep real: the interface definition itself. On the provider side, the real provider.
- Replace: on the consumer side, the provider, with a stub or mock generated from the contract (P8, P9). On the provider side, only the provider's own downstream boundaries.
- A mock on the consumer side asserts the full call list, in order, with nothing else called (P10). Contract coverage is only as strong as those assertions, because they prove the consumer sent what the contract records.
- Do not hand-edit the stub away from the contract. The contract is the source; the stub is derived.
- Patch only where the consumer looks up its client (P12); see [patches](../../../testing-principles/references/patches.md).
- See [doubles](../../../testing-principles/references/doubles.md) for checking fakes behaviorally.

## Determinism and isolation

- Contracts must not depend on live data. Use fixed example values, not whatever the provider returns today (P14).
- Provider tests set up the state each interaction assumes, in the test, and clear it afterwards (P13).
- Do not call a shared staging service from a build that runs in parallel; use an owned instance or a stub of the provider's downstream boundaries.
- Generated ids, timestamps and ordering in a response should be matched by shape, not by value, or pinned by injection.
- A contract run against a remote service that sometimes times out is a flake. Diagnose it with [flakes/triage.md](../flakes/triage.md), then quarantine it with an owner and a date ([flakes/quarantine.md](../flakes/quarantine.md)); never retry it to green (P15).

## Common mistakes

- A consumer stub written by hand that drifts from the provider: [stale doubles](../code-smells.md#stale-doubles).
- Asserting every field of a response when the consumer uses two: [change-detector tests](../code-smells.md#change-detector-tests) and [over-specified or over-mocked setup](../code-smells.md#over-specified-or-over-mocked-setup).
- A consumer test with a permissive mock that accepts any call, so it can pass against anything: [tests that cannot fail](../code-smells.md#tests-that-cannot-fail).
- Contract examples built by a loop or computed in the test: [logic in tests](../code-smells.md#logic-in-tests).
- Provider state left behind between interactions: [shared mutable state](../code-smells.md#shared-mutable-state).
- Waiting for a remote provider with fixed pauses: [bare sleeps](../code-smells.md#bare-sleeps).
- Example values kept in a distant shared file that the test never shows: [values defined far from the test](../code-smells.md#values-defined-far-from-the-test).
- One test verifying several interactions: [one test covering several behaviors](../code-smells.md#one-test-covering-several-behaviors).

## Done check

- [ ] Every boundary you double has a contract test, or is named as a gap (P11).
- [ ] The contract is in one shared place both sides read.
- [ ] Consumer stub is derived from the contract, not hand-written.
- [ ] Provider replays the same contract and passes.
- [ ] The consumer test failed first, for the intended reason (P19).
- [ ] Mocks assert full call lists and not-called (P10).
- [ ] Values are fixed; the run is hermetic and not retried to green (P13, P15).

## Sources

Informed by the contract testing section of Fowler's "The Practical Test Pyramid" and the Microsoft Engineering Playbook's consumer-driven contract testing page. Written in this skill's vocabulary; the framing of a contract test as the check on a double is P11.
