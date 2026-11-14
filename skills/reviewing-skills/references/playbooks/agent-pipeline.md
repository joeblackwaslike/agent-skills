# Agent pipelines

*Leans on principles 9, 3, 10 and 1. Also applies: 2 (for the limits agents will want to exceed), 6 (for loops that can stop early), 8 and 4. Principles 5 and 7 apply as for any skill.*

A skill that dispatches other agents (reviewers, implementers, researchers) is a small distributed system built from non-deterministic parts. The parent follows the skill, and each child follows only the prompt it was handed. Most defects are in the seams: an unnamed model, a handoff that depends on context the child cannot see, a loop with no cap. The principles are in [principles.md](../../../skill-principles/references/principles.md), principle 9 above all.

The general checks for agent workflows and for prompts already exist, so this playbook does not repeat them. Run them in addition:

- [Agent workflows](../../../reviewing-code/references/playbooks/agent-workflows.md) for contracts between steps, bounded loops, idempotent side effects, human checkpoints, least privilege and untrusted content.
- [LLM prompts](../../../reviewing-code/references/playbooks/llm-prompts.md) for each template the pipeline sends to a child.

What follows is what a skill author gets wrong that those do not catch.

## What to check

The pipeline reviewer template covers the basics (a named model per role, named handoff files, a fixed verdict vocabulary, round caps, scoped re-review, workers that do not dispatch, anchoring); read [pipeline.md](../reviewer-templates/pipeline.md) for them. This playbook adds only what it does not:

- **Templates are self-contained.** The template is the child's whole instruction. Check that every placeholder is defined and filled by the parent, and that nothing in it says "as discussed" or refers to a file the child is not given.
- **Read-only is enforced where it can be.** If a role should not edit files, the strongest control is the agent type's tool list. A prompt rule alone is weak, and the skill should say how the parent checks afterwards (a `git status` after the child returns).
- **Fallbacks are stated.** What happens on a platform with no subagent tool, or when a dispatch fails? An unstated fallback becomes improvisation.
- **Disagreement has a rule.** Two children contradict each other. The skill says who resolves it, and from what evidence.
- **Escalation is a count or a named action,** never "ask the user" for work the parent could finish.

## What the files cannot show

- **That the verdicts parse.** Run one child on a real input and feed its output to the parent's branch. A closing line in the template that the model does not reliably produce breaks the loop.
- **Real cost and width.** Count the dispatches a typical input produces, and the model on each. Report the number, since a skill that is sound on paper can fan out to dozens.
- **Whether the child can read what it is given.** Absolute paths, a working directory, tools it needs. A child with no read tool returns confident nonsense.
- **Siblings that dispatch the same roles.** Another skill may launch the same reviewers with a different cap. Two pipelines in one session double the cost and may contradict.
- **Behavior when a child fails or times out.** Break one on purpose and see what the parent reports.

## Example from this repo

`skills/reviewing-code/references/self-review.md` specifies its loop in the way principle 9 asks for:

> Stop after 2 re-reviews even if findings remain. List remaining minors and nits under "Known follow-ups" in the report. ...

It names a model for the reviewers (`model: "sonnet"`), a cap of 6 per round, a report script that refuses inconsistent inputs, and a rule that disagreement between reviewers is settled from the code and cross-checked with a different model before it is ever sent to the user. That is the pattern to look for.

The weakness to look for is a predicate with no test behind it. The same file says "For an architectural change, run this round-1 reviewer on `model: "opus"` instead." An agent decides what counts as architectural, and two agents will disagree on the same diff. A stronger version names a condition it can check (a new module boundary, a schema change, more than N files).

## Stronger wording

```text
Wrong: Spawn a reviewer, fix what it finds, and review again until it is happy.

Right: Reviewer (Sonnet) writes findings to review.md and ends with READY or
  NOT READY. Re-review checks only items marked fixed. After two re-reviews,
  stop and report the open findings. Reviewers do not dispatch other agents.
```

The wrong version has no model, no verdict words and no cap. The right one gives the parent something to branch on and a place to stop.
