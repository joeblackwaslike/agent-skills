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

### Acceptance 2 results under the correctness rule (three tuning rounds)

A fresh Sonnet judge opened every cited line and ran what it could. Findings are minor severity or above, duplicates counted once. Precision is the share the judge found real.

| Round | Template change | verification-before-completion | test-driven-development | systematic-debugging |
|---|---|---|---|---|
| 0 (judge a2c) | none | 5 of 7 (71%) | 15 of 20 (75%) | 32 of 37 (86%) |
| 1 (judge a2d) | covered or speculative gaps are not findings | 7 of 9 (78%) | 11 of 13 (85%) | 16 of 25 (64%) |
| 2 (judge a2e) | a minor needs a contradiction or a run result | 1 of 2 (50%) | 6 of 8 (75%) | 11 of 14 (79%) |
| 3 (judge a2f) | cross-file contradictions and description overlap are minor unless harmful | 2 of 3 (67%) | 6 of 6 (100%) | 18 of 19 (95%) |

After round 3, test-driven-development and systematic-debugging pass the per-skill rule and verification-before-completion does not. Its one not-real finding was a borderline call, and counted real it would be 3 of 3. Pooled across the three skills, round 3 is 26 of 28 (92.9%). The judges disagreed on the same material across rounds (systematic-debugging scored 86%, 64% and 79% on near-identical findings), so judge noise is about as large as the differences being tuned.

Confirmed defects in the strong skills, found by reviewers and reproduced by the judges: `find-polluter.sh` reports "all tests clean" and exits 0 when it skipped every test because the target path already exists (the documented `.git` example in `root-cause-tracing.md` triggers it); the `npm test 2>&1 | grep 'DEBUG git init'` capture drops the stack it tells you to analyze; the `startsWith(tmpDir)` guard accepts `/tmp-evil/x`; `waitFor` is called without its required `description` argument. One earlier claim of mine was wrong: the vitest automock example in `writing-good-tests.md` is not a real defect, because the bad and good examples mock different modules.

### Acceptance 2 rule change (Joe's call, 2026-11-13)

The original rule allowed at most three findings of minor severity or above per strong skill. The first run reported 2 findings on `verification-before-completion`, 14 on `test-driven-development` and 24 on `systematic-debugging`. The judge confirmed most of them against the files, including two concrete bugs (a script that reports "all tests clean" without running tests when the target path exists, and a vitest example whose automock makes the claimed behavior impossible). Joe's reasoning: a fixed count is too rigid, and a longer skill has more places to be wrong. The rule now scores correctness (at least 90% real, no unconfirmed major) and reports findings per 100 lines without scoring them.
