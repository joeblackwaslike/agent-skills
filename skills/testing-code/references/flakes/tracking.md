# Flake tracking runbook

How to record flaky tests, rank them, and keep an owner on each one. Use whatever tracker the project already has. The list feeds [quarantine](quarantine.md) and [triage](triage.md).

## 1. Record each flake once

Open one record per flaky test, not one per failure. Add new failures to the same record.

Fields to record:

1. **Test id.** The full, stable id the runner prints.
2. **First seen.** Date and the commit or run where it first failed.
3. **Failure signature.** The error message or the assertion, trimmed to the part that does not change between runs. Two different signatures on one test are two causes.
4. **Category.** One of the [flake categories](../../../testing-principles/references/flakes/categories.md), or "unknown" until triage names it.
5. **Owner.** A named person or handle, never a team (P15).
6. **Link.** The issue, ticket or pull request where the work lives.
7. **Status.** Open, quarantined, fixed and watching, closed.

## 2. Count reruns and failures

The raw material is the CI history for each test: how many runs, how many failed, and how many only passed after a rerun.

1. **Failure rate.** Failed runs divided by total runs over a window. Choose a window with enough runs to be meaningful for that test; a test that runs ten times a week needs a longer window than one that runs a thousand times.
2. **Rerun rate.** Runs that failed and then passed on a retry with no code change, divided by total runs. A test that passes on rerun is flaky by definition. Count these even where the pipeline reruns automatically, because the retry hides the failure from the result.
3. **Whole-suite view.** The share of pipeline runs that needed at least one rerun, and the share that were blocked by a flake. These show the cost to people, not to the test.

Pipelines that retry automatically must still emit the first failure to the history. A retry that erases the failed attempt makes this step impossible (P15).

## 3. Rank

Order the open records so the next one to work on is obvious.

1. Failures that block merges or releases come first, because they cost the most people.
2. Then higher failure rate.
3. Then the number of distinct pipelines or branches affected.
4. Then age. An old record is a record nobody owns.

Rank by evidence from the history, not by who complained last. Two tests with the same signature across different tests point at a shared cause such as a fixture or a service; fix that once.

## 4. Assign and review

1. Every open record has an owner before the end of the day it is opened. If nobody takes it, the person who last changed the test or the code under test owns it.
2. Review the ranked list on a regular rhythm the team already has, such as a weekly triage slot. Each review moves each record: fix it, quarantine it, or close it as not reproducible with the diagnostics added.
3. A record with no movement past its deadline is escalated to the person who sets the team's priorities, with the rank and the cost.

## 5. Feed quarantine

1. A test enters [quarantine](quarantine.md) from this list: a record with an owner, a deadline and a link.
2. The record shows the quarantine date and the exit condition.
3. When the test leaves quarantine, the record stays open as "fixed and watching" until it has run clean for the stretch quarantine's exit criteria require, then closes.

## 6. Where to store it

Use the project's existing tracker and a label such as `flaky-test`. A spreadsheet or a markdown table is acceptable for a small project if it has the fields above and a person reviews it. A separate system nobody opens is worse than a label on the existing one. The failure history comes from the CI provider's test reports or a results store; link to it from the record.

## Common mistakes

- One record per failure instead of per test: the list grows faster than anyone can read it.
- Ranking by the loudest complaint: the real cost sits in the history.
- A pipeline that retries and discards the first failure: the rerun rate reads zero while the suite rots ([bare sleeps](../code-smells.md#bare-sleeps) and [shared mutable state](../code-smells.md#shared-mutable-state) are the usual hidden causes).
- No owner, or a team as owner: nobody acts.
- Closing a record when the fix merges, not after clean runs.

## Done check

- [ ] Each flaky test has one record with the seven fields.
- [ ] Failure rate and rerun rate come from CI history, including first attempts.
- [ ] The list is ranked by evidence and reviewed on a schedule.
- [ ] Every open record has a named owner and a link.
- [ ] Quarantined tests trace back to a record.

## Sources

Informed by Fowler's "Eradicating Non-Determinism in Tests" and the Google Testing Blog's posts on flaky tests. Written in this skill's vocabulary.
