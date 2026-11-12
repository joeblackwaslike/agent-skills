# Router skills

*Leans on principles 3, 4, 5 and 10. Does not apply: 1, 2, 8 and 9 (a router has no rule to defend and no agents to dispatch). Principle 6 applies only when the choice between destinations is not obvious from a table.*

A router sends the agent to the right sibling skill or runbook and adds little of its own. It succeeds when the agent opens exactly one destination and never has to ask which. It fails when two destinations both claim the question, when a destination does not exist, or when the router grows rules of its own that nobody reviews. The principles are in [principles.md](../../../skill-principles/references/principles.md).

## What to check

- **Every question maps to one destination.** An agent will open the first row that looks right. Read the table as a stranger and find two rows that both fit a plausible question. Ambiguity there is a major finding.
- **Every destination exists and says the same thing back.** Open each linked skill or file. Its description should name the router in its own "Not for" line, and the router's exclusions should match. One-way pointers send agents in circles.
- **Exclusions name the sibling.** "Not for command flags" without "(use working-with-git)" tells the agent what to avoid and not where to go (principle 4).
- **The router owns no process it did not mean to.** Look for rules, thresholds or steps in the body that duplicate a destination. When the router and the runbook disagree, the agent picks one at random (principle 3). If the router really does own a process, review it under [workflow-skill.md](workflow-skill.md).
- **References are routed, not imported.** `@path` imports pull every destination into context (principle 5). The body should say "read X when Y."
- **Pointers by position are fragile.** "Steps 6 to 9 of that runbook" breaks when the runbook renumbers. Prefer a heading name or a link to an anchor, and check that the anchor exists.
- **Commands it advertises run.** If the router lists commands (`/commit`, `/git-cleanup`), each one exists, has the name shown, and does what the row says.
- **The description matches the router's reach.** It should be wide enough to fire on every question a destination answers, and it should still name the exclusions.
- **Nothing is unreachable.** Every file in `references/` appears in a table or link, or no agent will ever open it.

## What the files cannot show

- **Whether the sibling skills still say what the router claims.** Open each destination's description and first section and compare. A destination that was renamed, split or retired leaves a dead row that still reads fine.
- **Whether an agent picks the right row.** Give three realistic questions to a fresh agent with only the router and the sibling descriptions, and see which destination it opens. Include one that belongs to no destination.
- **Overlap with other routers.** Two routers whose descriptions both fire on "open a PR" will fight. Run the overlap check against the description list for the whole skills directory.
- **Plugin availability.** A sibling listed by its plugin-qualified name (`agent-skills:working-with-git`) only exists if that plugin is installed where the agent runs. Note which siblings you confirmed.

## Example from this repo

`skills/git-github-workflows/SKILL.md` opens with a "What this skill is not" list, each bullet naming the owning sibling:

> Not the git manual. What a git command does, its flags, how rebase or bisect works: `agent-skills:working-with-git`.

That is the pattern. The router says what it excludes and where each excluded question goes, then closes the loop with a "Reference skills" table going the other way. The runbook table maps a situation to one file.

The weakness is a row in the runbook table: "Reply to, react to, or resolve reviewer comments | the same runbook (steps 6 to 9), plus `superpowers:receiving-code-review`". A step range into another file is a pointer that rots, and the row lists two destinations for one question, which the router is meant to avoid. The paragraph under the table explains why both are needed, which is the right instinct, but it should be in the row.

## Stronger wording

```text
Wrong: For review comments, see the PR runbook (steps 6 to 9) and maybe the
  review skill.

Right: To reply to or resolve a review comment, read "Reply to each thread" in
  references/pull-requests/driving-a-pr-to-approval.md. To judge whether a
  comment is right first, use superpowers:receiving-code-review.
```

The right version names a heading, which survives renumbering better than a step range (the runbook's headings carry numbers today, so a rename still needs a grep). It also says in what order to use the two destinations.
