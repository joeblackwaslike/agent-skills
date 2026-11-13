# Worked example and acceptance record

This file records how `reviewing-skills` was tested. The sections below are filled in as each run finishes. Fixtures are read in place, not vendored.

## Fixture versions

| Fixture | Location | Version |
|---|---|---|
| Strong skills | Superpowers plugin cache, `skills/test-driven-development`, `skills/verification-before-completion`, `skills/systematic-debugging` | Superpowers 7.0.1 |
| Weak skills | ECC checkout, `skills/nanoclaw-repl`, `skills/orch-fix-defect` | ECC commit `d2ef2680` (the checkout's HEAD when the runs started was recorded as `d2ef2680`) |
| Recall set | `design-patterns` as it stood before the review fixes, composed from commits `2e8f239d` (scaffold), `d15e9b3a` (behavioral) and `2a3ed18d` (the rest) | 24 files |

## Pre-registered expectations (written before the runs)

The spec asks for the weak-skill expectations to be written from reading each stub and committed before the reviewer sees it. The stubs are not empty, so the four generic flags in the spec do not all apply. Each stub has its own list of four, and the reviewer must flag at least three of its four.

### `nanoclaw-repl` (34 lines)

It has a usable description and a trigger sentence, so "missing trigger" is not expected. The four expected weaknesses:

1. No example of any command or session in use.
2. No verification step: nothing says how to check that a branch, compaction or export worked.
3. The operating guidance is soft and unspecific ("keep sessions task-focused", "compact after major milestones") with no observable trigger and no defense against skipping it.
4. The description is a capability list, which restates the body.

### `orch-fix-defect` (43 lines)

It has a "When to Use" section, an example and sibling disambiguation, so "missing trigger" and "missing example" are not expected. The four expected weaknesses:

1. The phase mask uses numbers (0, 2, 4, 5, 6) and "Gate 1", "Gate 2" that the file never defines; they depend on a sibling skill.
2. No defense for its key rule (reproduce the bug as a failing test first): nothing handles a regression test that passes before the fix, and no rationalization table or red flags.
3. No verification output: the file never says what evidence shows the test failed for the right reason, or that the fix turned it green.
4. The agent delegation is not specified (which model, what handoff, how many fix rounds, who decides when to stop).

## Acceptance results

Filled in by the acceptance runs.

### Acceptance 2 rule change (Joe's call, 2026-11-13)

The original rule allowed at most three findings of minor severity or above per strong skill. The first run reported 2 findings on `verification-before-completion`, 14 on `test-driven-development` and 24 on `systematic-debugging`. The judge confirmed most of them against the files, including two concrete bugs (a script that reports "all tests clean" without running tests when the target path exists, and a vitest example whose automock makes the claimed behavior impossible). Joe's reasoning: a fixed count is too rigid, and a longer skill has more places to be wrong. The rule now scores correctness (at least 90% real, no unconfirmed major) and reports findings per 100 lines without scoring them.
