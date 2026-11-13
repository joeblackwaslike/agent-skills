# Functional test runbook

## What it proves

That one feature works through its entry point, an endpoint or a command, with the app wired up and its stores in place. It answers "given this request, does the app return and store the right result?" (P5). In this skill's usage a functional test drives one entry point in-process; it does not go through the real front door the way a user does, which is what an end-to-end test adds (P6). See [test kinds](../../../testing-principles/references/test-kinds.md) for the exact definition.

## When to write it

- A new or changed endpoint, command or handler: verify the request-to-result path once the pieces are assembled.
- Wiring concerns that units cannot see: routing, serialization, validation, authorization, status codes, transaction boundaries.
- Branches of a feature that are cheaper to reach through its entry point than through a browser or a deployed system.

Use another kind when it fits better. Pure logic belongs in a [unit](unit.md) test. A single seam, such as a query, belongs in [integration](integration.md). A boundary stub that must stay honest belongs in a [contract](contract.md) test. A journey a user completes across the running system belongs in an end-to-end test.

## Setup

- The app assembled in-process through its normal construction path, so wiring is the real wiring, with a test configuration.
- Its stores available and owned by the test: a throwaway database, an in-memory queue (see [fixtures](../../../testing-principles/references/fixtures.md)).
- A client for the entry point that calls it in-process, such as the framework's test client or a command runner.
- Doubles in place for external third parties: payment, email, outbound HTTP, the clock.
- A way to create the starting data through the app's own stores, one state change per fixture, with teardown.

## Steps

1. Pick one feature behavior and one entry point: "POST an order with a valid card creates it and returns 201".
2. List what is real (the app, its stores) and what is doubled (external third parties).
3. Write the test in the [test body template](../test-body-template.md). The act sends one request or runs one command; result asserts check the response first, then stored state; mock asserts cover outbound calls.
4. Run it red first and confirm it fails for the intended reason, for example a missing route, not a configuration error (P19). Code already exists: break or revert the production line the test covers, confirm the test fails for the intended reason, then restore it (see [tests that cannot fail](../code-smells.md#tests-that-cannot-fail) and [test-driven development](../../../testing-principles/references/test-driven-development.md)).
5. Make it pass.
6. Confirm the network is blocked: remove the stub for one external call and check that the test fails instead of reaching the real service. Put the stub back.
7. Add the next case: one error path, one edge, one authorization rule, each as its own test.
8. Run the file alone, then the whole suite shuffled, to confirm the stores do not leak (P13).

## Cases to cover

- Happy path: valid request, expected response and stored result.
- Validation failures: missing, malformed and out-of-range input, with status and error body.
- Authentication and authorization: no credentials, wrong role, another user's resource.
- Not found and conflict responses.
- Edge inputs: empty collections, maximum sizes, unusual encodings.
- Third-party failure: the stubbed provider fails or times out, and the app's response and stored state.
- Side effects: exactly which outbound calls were made, and that none were made on a rejected request.
- Repeat requests, where the entry point promises idempotence.

## Doubles and patches

- Keep real: the app's wiring, routing, validation, its own modules, and its stores (P8).
- Replace: external third parties, the network, and the clock (P14). Use a stub for what the app reads from them and a mock for what it sends.
- Every mock asserts its full call list in order and that nothing else was called, including that nothing was sent when the request was rejected (P10). See [doubles](../../../testing-principles/references/doubles.md).
- Prefer overriding a dependency through the app's own injection point over patching a global (P12). When you must patch, patch where the name is looked up and let it undo itself; see [patches](../../../testing-principles/references/patches.md).
- Check any boundary double with a [contract](contract.md) test (P11).

## Determinism and isolation

- Fresh app and fresh store per test, or a rolled-back transaction the test never commits (P13); see [isolation](../../../testing-principles/references/isolation.md).
- No test depends on data another test created. Create what the request needs, in the test.
- Inject the clock and seed randomness. Assert on fixed timestamps and ids (P14).
- Block real network access by default so an unstubbed call fails loudly.
- Background work the entry point starts is awaited by polling a condition with a timeout, never a bare sleep.
- Parallel runs need separate store namespaces or instances.
- Do not assert on response bodies that include generated values unless you pin them.
- A test that still flakes goes through [flakes/triage.md](../flakes/triage.md), and [flakes/quarantine.md](../flakes/quarantine.md) if the fix cannot land now.

## Common mistakes

- Mocking the app's own modules to isolate the handler, which turns it into a unit test: [over-specified or over-mocked setup](../code-smells.md#over-specified-or-over-mocked-setup).
- Asserting on internal calls rather than the response and stored outcome: [change-detector tests](../code-smells.md#change-detector-tests) and [testing private internals](../code-smells.md#testing-private-internals).
- Stores that carry rows from one test to the next: [shared mutable state](../code-smells.md#shared-mutable-state).
- Pausing for background work: [bare sleeps](../code-smells.md#bare-sleeps).
- Request payloads built in a loop or expected bodies computed with the same logic as the app: [logic in tests](../code-smells.md#logic-in-tests).
- Request data built in a fixture file far from the test: [values defined far from the test](../code-smells.md#values-defined-far-from-the-test).
- One test that creates, updates and deletes: [one test covering several behaviors](../code-smells.md#one-test-covering-several-behaviors).
- Many asserts on the response with no hint which failed: [assertion roulette](../code-smells.md#assertion-roulette).
- A test that never failed because the stub returns what the assertion expects: [tests that cannot fail](../code-smells.md#tests-that-cannot-fail).
- A provider stub that no longer matches the real one: [stale doubles](../code-smells.md#stale-doubles).

## Done check

- [ ] The test names one entry point and one behavior.
- [ ] The app is wired the way production wires it; only external third parties are doubled.
- [ ] It failed first, for the intended reason (P19).
- [ ] Assertions cover the response, the stored state and the outbound calls.
- [ ] Mocks assert full call lists and not-called (P10).
- [ ] Clock and randomness injected; no bare sleeps; network blocked (P14).
- [ ] Passes alone, shuffled and in parallel (P13).

## Sources

The definition of a functional test as one entry point driven in-process is this skill's own usage, set out in the test kinds page.
