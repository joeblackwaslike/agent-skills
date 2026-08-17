# Fix the Process, Not Just the Instance

## The instinct

After fixing a bug, ask a second question before moving on: was this a one-off mistake, or does
it reveal a gap — a missing test category, a missing lint rule, a missing runbook step, a missing
review check — that would let the same *class* of bug recur elsewhere? If it's systemic, fix the
gap in the same pass, not as a someday follow-up that never happens.

## What it looks like when missing

The immediate bug is fixed, the ticket is closed, and the underlying gap that allowed it stays
open. The same shape of bug — not the identical bug, but the same *category* — shows up again
later, somewhere else, because whatever should have caught it the first time still doesn't exist.

## What to do instead

When a fix is also a correction to *how something was being done* (not just *what was done*), ask
explicitly: would this recur? Is there a missing check, a gap in a runbook, an instruction that
let the same mistake happen twice? If yes, close that gap in the same pass — don't wait to be
asked a second time, and don't file it as separate future work unless it's genuinely large enough
to warrant that.

Anchor the process fix to the specific incident that motivated it, the same way a good runbook
entry is anchored to a real failure rather than written as an abstract best practice — an
unanchored process change is exactly the kind of speculative addition this skill's own
[Growth protocol](../SKILL.md#growth-protocol) exists to avoid.

## Worked example (already-adopted rule, generalized here)

This instinct is not new — it's already a live, working rule in Joe's own global AGENTS.md,
inside the "Editing Skills, Runbooks and Instructions" section: "When Joe's correction is also a
process failure, fix the process, not just the instance... run RED/edit/GREEN on the process
itself in the same pass, unprompted, and name what was broken and how it was fixed in the
summary." That rule was itself added the same session it was identified as a gap — the rule and
its own origin are a self-demonstrating example of the instinct it describes. This runbook
generalizes that same discipline beyond doc-editing specifically: it applies just as much to code
review gaps, missing test categories, and missing deployment checks as it does to instruction
files.

## How to tell "systemic" from "one-off"

Not every bug reveals a process gap — most don't, and treating every fix as an excuse to also
redesign the surrounding process is its own failure mode (scope creep, see the general instruction
against unrequested refactoring). The signal to look for: would a reasonable process — a test, a
lint rule, a review checklist item, a runbook step — plausibly have caught this before it shipped?
If yes, that's the gap worth closing. If the honest answer is "this was just a mistake, and no
reasonable process check would have caught it," don't invent a process fix for the sake of having
one.
