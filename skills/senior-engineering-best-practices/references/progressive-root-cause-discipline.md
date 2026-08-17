# Progressive Root-Cause Discipline

## The instinct

The first plausible explanation for a bug is a hypothesis, not a diagnosis. Symptom-patching
without confirming the actual cause produces a fix that looks complete and isn't — and the
recurrence, when it comes, often gets misread as a brand-new bug instead of the same one
resurfacing. This runbook is built entirely from one real, multi-week case: the `postmortems`
repo's PM-001 → PM-003 → PM-005 chain (`/Users/joe/github/joeblackwaslike/postmortems/`).

## Signal 1: patching the same area a second or third time

If you're modifying the same function/module for the second or third time to fix "another"
occurrence of a similar-looking bug, that repetition is itself the signal — stop adding another
patch and go find what the patches have in common.

**What it looks like when missing:** each recurrence gets treated as independent, and each fix
narrows the symptom without touching the shared cause, so the bug keeps coming back in slightly
different clothes.

## Signal 2: an old "verified" claim is blocking the fix you actually need

**What it looks like when missing:** a prior investigation recorded a conclusion — "X breaks Y,
verified" — and every subsequent investigation treats that as settled fact, routing around it
instead of re-testing it, even when it's the thing standing between you and the real fix.

**What to do instead:** when an old "verified" finding is currently blocking progress, that's
exactly when to re-test it in isolation — not trust it because it's already written down.

**Worked example (PM-001, 2026-07-30):** cc-recall burned 69% of a weekly quota. The
investigation recorded, as verified: `--setting-sources ""` (empty) breaks auth. This conflated
two different isolation mechanisms tested together — the actual cause of the observed auth
failure was `CLAUDE_CONFIG_DIR` (which changes the Keychain lookup path via a config-dir path
hash), not `--setting-sources`. The wrong "verified" claim blocked the correct fix for two weeks,
until PM-005 (below) re-tested it as a side effect of unrelated work and found it false. As the
postmortem itself states once corrected: "That testing conflated `--setting-sources` with the
`CLAUDE_CONFIG_DIR` approach." No single-variable test had been run before the claim was written
down as fact.

## Signal 3: "has a passing test" is not "fires on real input"

**What it looks like when missing:** a guard or fix ships with a unit test that passes, and that
gets treated as proof the guard works in production — but the test fixture may not reproduce the
real data shape the guard needs to see.

**Worked example (PM-001/PM-003, discovered 2026-08-13/14):** a self-recognition guard
(`isIndexerTranscript()`) was written to stop cc-recall's indexer from re-indexing its own output.
It had a passing unit test and was documented as fixed. It never actually worked in production,
on any version, from the day it was introduced — it read a field
(`parsed.firstUserPrompt?.text`) sourced from `genuineUserPrompts`, which structurally filters out
any record tagged `promptSource === 'sdk'` — exactly the tag Claude Code applies to a `claude -p`
subprocess's own transcript. The guard was reading from a data source that, by design, excluded
the one input it needed to inspect. This is a distinct failure mode from Signal 2's confounded
test — it's "verified in isolation, unverified against the real production data shape" — and it
recurred *twice*, independently, four days apart, in two different postmortems (PM-001's
recurrence section and PM-003's correction), both traced to the same root cause.

## Signal 4: "merged" is not "deployed"

**What it looks like when missing:** a fix merges to `main`, the incident is closed, and a later
recurrence of the identical symptom gets diagnosed as a new bug — because nothing checked whether
the merged code was actually the code running in production.

**Worked example (PM-003, 2026-08-10):** PM-001's exact symptom recurred 6 days after PM-001's
fix merged, with zero source changes on `main` since. It was read as a new, undiagnosed
incident ("Incident B"). It wasn't — direct inspection of the installed plugin cache found it
pinned six weeks stale, running a build from before PM-001's fix existed. "PM-001's fix was never
running anywhere except GitHub." The postmortem's own framing: this is a deployment-gap RCA, not
a new bug in the indexing logic.

## What finally broke the cycle

Not a better process — a single act of re-testing an old "verified" claim instead of trusting it,
prompted by an unrelated accidental discovery (PM-005: a user noticed leaked system-prompt text
while asking an ordinary question, tracing to a Stop hook spawning unisolated `claude -p`
sessions). While implementing what was planned as a deletion of that hook,
`--setting-sources ""` was re-tested directly and found to *not* break auth — overturning the
16-day-old claim from PM-001 and turning "delete the hook" into "rewrite it with isolation." The
takeaway, stated plainly: **treat "verified" in an old investigation as a hypothesis to re-test
when it's currently blocking a fix, not as settled fact.**

## Relationship to other skills

This runbook is the "recognize you're in whack-a-mole mode, or trusting an unretested claim"
instinct. Once you've recognized it, `superpowers:systematic-debugging` covers the actual
investigation mechanics.
