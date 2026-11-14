# Workflow skills

*Leans on principles 3, 6, 10 and 1. Also applies: 2 (for the steps agents tend to skip), 4, 5, 7 and 8. Principle 9 applies only if a step dispatches agents (then read [agent-pipeline.md](agent-pipeline.md)).*

A workflow skill is an ordered procedure the agent carries out itself. Its defects are skipped steps, steps in the wrong order, loops with no exit, and "done" that nothing checked. Walk the procedure as if you were the agent and had only this text. The principles are in [principles.md](../../../skill-principles/references/principles.md).

## What to check

- **Every step is one bounded action.** An agent will do half of a step that bundles a command, a judgment and a write-up. Split any step that has more than one verb you could verify separately.
- **Order is justified where it matters.** If step 5 depends on step 3's output, say so. Where order does not matter, say that too, so the agent does not invent a dependency.
- **Branches and loops are visible.** Principle 6. A step that says "if it fails twice, go back to step 2 unless..." is a flow in prose. It needs a diagram, or a plain predicate and an exit. Look for loops with no cap, and early exits that nothing names.
- **Thresholds are numbers.** "Split large diffs" is not a rule. "Past about 400 hand-written lines" is closer, but the word "about" lets an agent decide 450 is fine. Pick a threshold and say what happens at it.
- **Each stopping point has a check.** Principle 10. A step that ends in "make sure it works" has no exit. The step should name a command and what its output must show.
- **The steps agents skip have a defense.** Find the step that is expensive or boring (re-running the gate after the last fix, reading the whole file). Principle 2 applies there, not to every step. A workflow with a table for every step is noise.
- **Outputs and handoffs are named.** If step 4 produces a file or a verdict that step 6 consumes, both steps use the same name and format.
- **Failure paths exist.** What does the agent do when a command is missing, a tool is not installed, or a check cannot run? A skill that only describes the success path leaves the agent to improvise exactly when it matters.
- **Scale of the procedure fits the task.** A twelve-step ritual for a one-line change gets skipped wholesale. Look for a stated way to scale down, and for a "skip when" predicate that is observable.

## What the files cannot show

- **Whether the order works.** Run the procedure on a small real input, or reason through it with a specific example, and note where you had to guess. Any step you had to guess at is a finding.
- **Runtime behavior of scripts and tools it calls.** Run each command in the steps once, or mark it unrun. A step that names a flag that no longer exists is invisible until an agent hits it.
- **Siblings that do the same job.** Another skill or command may cover step 2 already, with different thresholds. Find them with the overlap check and read both.
- **What the agent already does without the skill.** If a baseline agent follows the steps unprompted, the skill is overhead. If it fails at step 4 only, the skill should concentrate there.

## Example from this repo

`skills/reviewing-code/SKILL.md` has a numbered procedure whose second step reads:

> Fix every red result before reading further.

That is the pattern. It is a gate with an observable condition, placed before the expensive step, and it points to `references/mechanical-gate.md` for detail instead of inlining it. Step 4 ("Check what the diff can't show") is a step list of its own, with concrete actions per bullet.

The weakness is in step 1: "Past about 400 hand-written lines (or 200,000 diff characters), split along a seam into stacked PRs." Two thresholds joined by "or", one hedged with "about", and no statement of which wins when they disagree. An agent can read it either way. A reviewer should ask for one number per condition and the action at each.

## Stronger wording

```text
Wrong: When the build is flaky, retry a few times and then look into it.

Right: Rerun the build once. If it fails again, stop and report the failing
  command and its output. Do not rerun a third time.
```

The right version has a cap, an exit, and a defined thing to report. The wrong one has none of the three, so an agent will retry until the context runs out.
