# Flake categories

A taxonomy from cause to remedy. The `testing-code` flakes/triage runbook narrows a flaky test to one row here, then applies the remedy. Covers P13, P14, P15. The first five rows follow the causes Fowler names in "Eradicating Non-Determinism in Tests"; environment and UI timing are added here.

A flaky test passes and fails with no change to code, tests, or environment. It is a defect in the test or in the code, never an acceptable state (P15).

| Category | Typical symptom | Cause | Remedy |
|---|---|---|---|
| Isolation | Passes alone, fails in the suite; fails only after another test | State from one test reaches another: rows, patches, singletons, shared fixtures | Fresh state per test, rollback, or auto-undone cleanup (P13). See `isolation-failures.md`. |
| Async | Fails under load or on slow machines; passes on retry | Test reads a result before background work finishes, often after a fixed sleep | Wait on a callback or event, or poll with a timeout. Never bare-sleep (P14). |
| Remote services | Fails when a service is slow, down, or changes its data | Test depends on a system outside the process | Double the boundary and check the double with a contract test (P8, P11, P14). |
| Time | Fails near midnight, month end, or a time zone change; fails at certain hours | Test reads the real clock or assumes the date is stable | Inject the clock and freeze it for the test (P14). |
| Resources | A random test fails when the suite is long; fails after many tests | Leak of connections, handles, files, ports, or memory | Constrain pools so the leaking test fails first; close what is opened (P13). |
| Environment | Passes locally, fails in CI, or the reverse | Differences in machine, OS, locale, installed tools, ordering of files, environment variables, or core count | Pin or inject the input; declare the dependency in the test; remove reliance on the host (P14). |
| UI timing | Fails on a click, a render, or a navigation; fails more often in headless runs | Test acts before the interface is ready or stale | Wait for an observable ready state, not for elapsed time (P14). |

## Notes

- Several categories can combine. A test that sleeps (async) on a loaded CI machine (environment) is one defect with two contributing causes. Fix the wait first, then re-check.
- Sleeping longer lowers the failure rate, slows the suite, and leaves the cause in place (see `nondeterminism.md`).
- Rerunning a failure until it passes hides the defect from the signal the suite exists to give (P15).
- Order and parallelism expose isolation flakes. Run the suite shuffled to surface them.
- A flake that cannot be fixed immediately is quarantined with an owner and a deadline (P15). The mechanics are in the `testing-code` quarantine runbook.
