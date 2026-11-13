# End-to-end test runbook

## What it proves

That a user-visible journey works through the whole running system, entered the way a user enters it: the real front door, the real stores, the real wiring between services. It answers "can a person complete this task from start to finish?" (P5, P6). A feature can pass every lower test and still not work, because nothing below this kind runs the pieces together as a user does. See [test kinds](../../../testing-principles/references/test-kinds.md) for how this differs from a [functional](functional.md) test, which drives one entry point in-process.

## When to write it

- Every meaningful feature gets at least a few: one for the happy path and the rest for the edge cases and error paths a user can reach (P6).
- A journey that crosses several parts of the system, where no lower test sees the whole path.
- A regression a user reported that only shows up when the parts run together.

Use another kind when it fits better. A branch inside the journey belongs in a [unit](unit.md) test, so an end-to-end failure points at a small area. A seam such as a query belongs in [integration](integration.md). A rule that holds for every input is a property-based test. Choosing which journeys deserve the cost is covered in Journey selection below.

## Setup

- The system running as it runs in production: the same build, the same wiring, with a test configuration and a test environment that is isolated from real users.
- Real stores and real internal services. Only what you cannot run, such as a paid third party, is doubled.
- A driver that enters through the front door: a browser for a web UI, an HTTP client for a public API, a process runner for a command line tool. Browser mechanics live in [playwright.md](playwright.md).
- Test accounts and starting data created through the system's own interfaces, owned by the test, with teardown.
- A readable failure trail: logs, screenshots or traces kept when a journey fails.
- A named owner for each journey. Tests that span several teams rot when no one is responsible for them.

## Steps

1. Pick one journey from the Journey selection list below and state it as a sentence: "a shopper searches, adds an item and checks out".
2. List what is real and what is doubled. Default to real; double only what you cannot run.
3. Write the test in the [test body template](../test-body-template.md). The act is the user's actions in order; result asserts check what the user sees and what the system stored; mock asserts cover outbound calls to doubled third parties.
4. Run it red first and confirm it fails for the intended reason, such as a missing page, not a broken environment (P19). Code already exists: break or revert the production line the journey covers, confirm the test fails for the intended reason, then restore it.
5. Make it pass.
6. Add the next case for the same feature: one edge case or one error path a user can reach, each as its own test.
7. Run it alone, then in parallel with the rest of the suite, then repeated, for example `--repeat-each=20` as in [playwright.md](playwright.md#7-check-for-flakes), to look for flakes (P13, P15). Twenty is only a starting point; [flakes/triage.md](../flakes/triage.md) says how to choose a count from a failure rate.

## Cases to cover

For each meaningful feature, one happy path plus edge cases and errors (P6).

- Happy path: the journey a user takes when everything goes right, ending in the visible and stored result.
- Edge cases a user can reach: empty states, the largest allowed input, a second visit after finishing, a returning user against a new one.
- Error paths a user can reach: invalid input, a rejected payment, a missing permission, an expired session. Check the message the user sees and that nothing was stored.
- Third-party failure: the doubled provider fails or times out, and what the user is told.
- Recovery: the user retries, goes back, or reloads mid-journey and the system stays consistent.
- Every input combination and every internal branch stay out. Those belong in lower kinds, which run faster and point at the cause.

## Doubles and patches

- Keep real: everything the user touches, including the front end, the services behind it and their stores (P8).
- Replace: third parties that cost money, send real messages or cannot run in a test environment. Use a stub for what the system reads and a mock for what it sends.
- Mocks assert the full call list in order and that nothing else was called (P10). See [doubles](../../../testing-principles/references/doubles.md).
- Double at the network edge of the system, in a fake provider the system calls over its real client, not by patching inside the code under test (P12). See [patches](../../../testing-principles/references/patches.md).
- Check every third-party double with a [contract](contract.md) test so it stays honest (P11).

## Determinism and isolation

- Each journey creates its own account and data, and cleans up after itself, so journeys pass in any order and in parallel (P13); see [isolation](../../../testing-principles/references/isolation.md).
- Inject or freeze the clock where the system allows it, seed randomness, and assert on values the test sets (P14).
- Wait for a visible condition with a timeout. Never a bare sleep (P14).
- Block real calls to third parties by default so an unstubbed call fails loudly.
- Treat a flaky journey as a defect: quarantine it with an owner and a deadline, never retry it to green silently (P15). Diagnose it with [flakes/triage.md](../flakes/triage.md), hold it out with [flakes/quarantine.md](../flakes/quarantine.md), and sort the cause with the [flake categories](../../../testing-principles/references/flakes/categories.md).
- Keep each journey fast and independent of the others (P17). If the whole set is too slow for every change, run it on a schedule and say which, and keep every P6 journey in it.

## Common mistakes

- Using this kind for every branch, so the suite is slow and a failure explains nothing: [one test covering several behaviors](../code-smells.md#one-test-covering-several-behaviors).
- Asserting on markup structure or internal calls rather than what the user sees and the stored outcome: [change-detector tests](../code-smells.md#change-detector-tests) and [testing private internals](../code-smells.md#testing-private-internals).
- Journeys that share an account or leave rows behind: [shared mutable state](../code-smells.md#shared-mutable-state).
- Sleeping until the page is ready: [bare sleeps](../code-smells.md#bare-sleeps).
- Expected totals computed with the same logic the system uses: [logic in tests](../code-smells.md#logic-in-tests).
- Doubling internal services to make the run quick, which turns the journey into a smaller kind: [over-specified or over-mocked setup](../code-smells.md#over-specified-or-over-mocked-setup).
- Test data defined in a seed file far from the test: [values defined far from the test](../code-smells.md#values-defined-far-from-the-test).
- A long journey with a dozen asserts and no hint which failed: [assertion roulette](../code-smells.md#assertion-roulette).
- A journey that passes against a stub that returns what the assertion expects: [tests that cannot fail](../code-smells.md#tests-that-cannot-fail).
- A provider fake that drifted from the real provider: [stale doubles](../code-smells.md#stale-doubles).

## Done check

- [ ] The test names one journey and enters through the real front door.
- [ ] Only what cannot be run is doubled.
- [ ] The feature has a happy path plus its reachable edge cases and errors (P6).
- [ ] It failed first, for the intended reason (P19).
- [ ] Assertions cover what the user sees and what the system stored; mocks assert full call lists and not-called (P10).
- [ ] Waits poll a condition; no bare sleeps; third parties blocked (P14).
- [ ] The journey creates and removes its own data, passes alone and in parallel, and has an owner (P13).

## Journey selection

Each journey costs maintenance and runtime, so choose them on purpose.

1. List the journeys that carry the feature's value: what a user came to do. Start with the one whose failure would cost the most.
2. For each, write the happy path first. That is the journey a stakeholder would name without prompting.
3. Add the edge cases and errors a user can actually reach through the interface. If a case needs a state the interface cannot produce, test it in a lower kind.
4. Keep every journey in the P6 set: the happy path plus each edge case and error a user can reach. A journey outside that set is one that covers only a branch no user can reach, or repeats a case another journey already covers. Drop those. If a journey fails and no lower test fails, add the lower test.
5. Write the list down with an owner against each journey. It holds at least the P6 set for each meaningful feature, and you review it when the feature changes.

## Sources

Informed by Fowler's "The Practical Test Pyramid" on end-to-end tests as the broadest confidence check, their flakiness, unclear ownership across services, and the advice to add a lower test when a journey fails alone. Informed by the Microsoft Engineering Playbook's end-to-end page on planning journeys from user functions and conditions, and by Google's "Software Engineering at Google", chapter 14, on fidelity as the reason tests that need more of the system exist and on ownership as their main long-term cost. This skill departs from Fowler on count. He advises a bare minimum of journeys, while P6 asks for a happy path plus edge cases and errors per meaningful feature.
