# Flake quarantine runbook

How to take a flaky test out of the gating run without losing it. Quarantine is a holding state with an owner and a deadline (P15). Fix first when you can; see [triage](triage.md). Language syntax for the markers is on the language pages: [python.md](../languages/python.md), [typescript.md](../languages/typescript.md), [rust.md](../languages/rust.md), [shell.md](../languages/shell.md) and [sql.md](../languages/sql.md).

## 1. Decide whether to quarantine

Quarantine when all of these hold:

1. The test failed with no change to the code or the test, and you have a [tracking](tracking.md) record for it.
2. It is blocking other people's merges or releases, or you could not reproduce it in [triage](triage.md).
3. You cannot land the fix right now.

Do not quarantine to save time on a fix that takes minutes, and never to make one red build green. If the failure is a real defect in the code, fix the code; the test is doing its job.

## 2. Choose the mechanism

Three ways to get a test out of the gate. The trade-off is what happens to the test while it waits.

| Mechanism | Runs while quarantined? | Reports failures? | Risk |
|---|---|---|---|
| Skip with a reason | No | No | The race gets no coverage at all, and nothing says whether the cause went away. |
| Mark expected-fail | Yes | Yes, as expected failure; an unexpected pass is visible | Needs a tool that supports it; a strict mode turns a surprise pass into a signal. |
| Separate non-gating run | Yes, in its own job or suite | Yes, in that job | Needs pipeline setup; the job can be ignored if nobody watches it. |

**Recommendation.** Prefer a mechanism that keeps the test running and reporting without gating: an expected-fail marker, or a separate non-gating job. A skipped test gets no coverage of the race while it is quarantined, and you learn nothing about whether the cause is gone. Fall back to a skip with a dated reason only when running it has a cost: it hits a paid or rate-limited service, it corrupts shared state you cannot isolate, or it makes the non-gating job itself unstable.

Expected-fail has a catch. A test that fails for the wrong reason (a typo that raises an error) still counts as the expected failure. Where the tool allows, name the exception or the signature it is allowed to fail with.

Fowler's advice is to keep quarantined tests in a different suite from the healthy ones, so the healthy suite stays trustworthy. That matches the separate-job option here.

## 3. Mark it

1. Apply the mechanism from step 2.
2. Put these in the marker's reason text, so a search finds them:
   1. The owner: a named person or handle, not a team.
   2. The deadline: a calendar date, not a duration.
   3. The link to the tracking record.
   4. The failure signature or a short cause note.
3. Update the tracking record: quarantined, date, exit condition.
4. Land the marker as its own change, with the message naming the test and the record.

## 4. Cap the quarantine

An uncapped quarantine fills up, and each entry is a behavior the suite no longer guards. Set two limits:

1. **By count.** Choose a number of quarantined tests that the team can clear in one sitting. When you reach it, no new test enters until one leaves.
2. **By age.** Choose how long a test may stay. A test past its deadline is a failure of the process: fix it, delete it with a reason, or escalate.

Fowler describes both a numeric limit and a time limit as ways to keep tests from being forgotten. Pick numbers from your own team's capacity and the tracking data. They differ by project, so write the chosen numbers where the team will see them: the contributing guide or the CI config.

A check in CI that lists markers past their dated deadline turns the cap into something enforced, not remembered.

## 5. Exit

A test leaves quarantine in one of two ways.

1. **Fixed.** The cause is named and repaired, and the test has run clean over N consecutive runs while in the non-gating state. Choose N from the failure rate in the tracking record: a test that failed 1 in 20 needs enough clean runs that a still-broken test would very probably have failed; a rarer flake needs many more. The [triage](triage.md) verification step explains the reasoning. Then remove the marker, restore it to the gating run, and keep the record open as "fixed and watching" for a further stretch.
2. **Deleted.** The behavior it checks is covered elsewhere, or no longer exists, or it cannot be made reliable at this kind of test. Delete it, with the reason in the commit and the record.

An unexpected pass is not an exit. A flaky test passes sometimes.

## Common mistakes

- A skip with no owner and no date: it never comes back ([tests that cannot fail](../code-smells.md#tests-that-cannot-fail) is where it ends).
- Quarantining by retry plugin so the test runs but the pipeline stays green: the failure vanishes from the results. A separate non-gating job is different, because its failure is still reported somewhere someone reads.
- Exiting after one clean run.
- Moving a test to a non-gating job nobody reads.
- Quarantining a test whose cause is [shared mutable state](../code-smells.md#shared-mutable-state) and leaving the test that leaks it in the gate.
- Quarantining a race the test found in real code instead of fixing the code.

## Done check

- [ ] A tracking record exists and links to the marker.
- [ ] The marker's reason has an owner, a date and the link.
- [ ] The mechanism keeps the test running and reporting, or the cost that forced a skip is written down.
- [ ] The team's count and age caps are written where people will find them.
- [ ] The exit is "fixed over N clean runs" with N tied to the failure rate, or "deleted with reason".

## Sources

Informed by the quarantine section of Fowler's "Eradicating Non-Determinism in Tests" (separate suite, numeric and time limits) and by the Google Testing Blog's posts on flaky tests. The skip versus expected-fail comparison and its recommendation are this skill's own.
