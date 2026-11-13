# Non-determinism

Where flaky results come from when the test has nothing wrong with its logic. A deterministic test gives the same result for the same code every time (P14). Informed by Fowler's "Eradicating Non-Determinism in Tests". The cause-to-remedy table is in [categories.md](categories.md).

## Why it matters

A test that sometimes fails for no reason teaches people to ignore failures. Fowler's argument is that once a team shrugs at one red result, it stops trusting the rest of the suite. The damage reaches the signal from every test in the suite (P15).

## Time

The system clock returns a different answer on every call, so any test that reads it can change between runs.

- Code under test receives the clock as a dependency or reads it through one wrapper. The test replaces that with a fixed value (P14).
- A frozen clock should be reset after each test. A clock left frozen is a shared-state leak (see [isolation-failures.md](isolation-failures.md)).
- Tests that assume "today" is the same date an hour later fail near midnight and at month end. Pin the date; don't compute it relative to now.
- Ids or keys derived from clock ticks can collide when the machine gets faster.

## Randomness

Random values make a test fail only on some draws.

- Seed the generator in the test, or inject a fixed one (P14).
- Log the seed on failure so a failing draw can be replayed.
- Randomized tests have a place for exploring edge cases, and they serve a different purpose than a regression test. Keep the seed explicit.
- A fixed random source also surfaces collision bugs, such as temp files with random names, that otherwise appear rarely.

## Network

The network is blocked by default in every test (P14).

- A real call depends on a machine you do not control: its availability, latency, data and rate limits. Any of them changes without a code change.
- A test that passes only because a remote service happens to be up cannot distinguish a regression from an outage.
- Real calls make the suite slow and can put real load on a third party.
- Blocking the network at the suite level turns a hidden dependency into an immediate, loud failure that names the test responsible. Allow it only in the kinds of test built to cross the boundary, and name those explicitly.
- The replacement is a double of the boundary (P8), checked against the real service by a contract test run on its own schedule (P11).

## Concurrency and async

When two things can finish in either order, a test can pass or fail depending on which one wins.

- A fixed sleep guesses at completion. A long guess slows the suite, a short guess fails under load, and neither is correct (P14).
- Wait on an explicit signal: a callback, an event, a returned handle. If none exists, poll for the observable result with a short interval and a high timeout. Take both values from one configuration place.
- A timeout fails the test with a clear name.
- Moving logic out of the concurrent part and testing it synchronously removes the wait. Keep the concurrent shell thin.

## Environment drift

The test passes on one machine and fails on another because an input was never pinned.

- Locale, time zone, working directory, filesystem ordering, installed tool versions, environment variables, and available cores all differ between a laptop and CI.
- A test that needs a value sets it and restores it (P13). It does not inherit it from the host.
- Dependencies that float to the newest version change the suite without a code change. Lock them.
- When a test fails only in one environment, compare the inputs the test reads from the host before looking at the logic.
