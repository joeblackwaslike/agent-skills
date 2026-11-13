# Performance

Why suites get slow, and how to keep them fast without making them fragile. Covers P17 and leans on P13. Profiling commands and slow-test reports live in the [`testing-code` slow-tests runbook](../../testing-code/references/slow-tests.md).

## What makes tests slow

Slowness comes from a short list of sources. Each has a different fix.

| Source | Typical cost | Fix |
|---|---|---|
| Real network or remote service | Latency per call, plus retries on failure | Double the boundary (P8, P14) |
| Real sleeps and fixed waits | The full wait, every run | Poll with a timeout, or inject the clock (P14) |
| Heavy setup repeated per test | Database loads, app boot, large builders | Cheaper fixtures, or a shared immutable one |
| Broad tests used for narrow logic | Whole stack to check one branch | Test the branch at the lowest-cost kind that covers it (P5) |
| Process and container startup | Slow per start | Start once per run, not per test |
| Serial execution of independent tests | Wall time equals the sum | Parallelize, once the preconditions below hold |

## Fixture scope cost

Setup shared across many tests is cheaper and riskier than setup repeated per test.

- A per-test fixture cannot leak, so it is the default (see [fixtures.md](fixtures.md)).
- Widening scope trades safety for speed. It is justified when setup is measurably slow and the state is never mutated by tests.
- A shared fixture that tests do mutate is the usual origin of order-dependent failures (P13; see `flakes/isolation-failures.md`). The saved seconds are paid back in debugging time.
- Fowler discusses building a mostly-immutable starting state once and having tests avoid changing it, and notes that it is more error-prone than rebuilding per test.

## Preconditions for parallelism

Running tests concurrently multiplies any hidden sharing. Before turning it on, the suite needs the following.

- Order independence (P13). A suite that fails when shuffled will fail when parallel.
- No shared mutable resource without a per-worker copy: one database, one port, one temp directory, one file path.
- Unique names for anything created in a shared store, so two workers cannot collide.
- No dependence on process-wide state such as the working directory or environment variables.

If a suite fails after parallelism is enabled, check these preconditions first.

## Measure, don't guess

Guesses about slow tests are often wrong (P17).

- Rank tests by measured duration and look at the top of the list. A few tests often account for most of the time.
- Measure before and after a change. A fix that does not move the number is not a fix.
- Track the total and the slowest few over time, so a gradual slowdown shows up before it becomes a complaint.
- Speed work must not trade away determinism. Removing a wait by shortening it makes a flake. Removing it by polling or injecting the clock does not (P14).
