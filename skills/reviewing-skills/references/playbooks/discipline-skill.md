# Discipline skills

*Leans on principles 1, 2, 3, 4 and 8. Also applies: 5, 7 and 10. Principles 6 and 9 apply only if the skill has a branching flow or dispatches agents.*

A discipline skill exists to hold a rule against pressure: write the test first, verify before claiming done, never skip the gate. Its readers understand the rule and are tempted to break it. Review it as a defense, and ask where an agent in a hurry would get out. The principles are in [principles.md](../../../skill-principles/references/principles.md).

## What to check

- **The gate is stated as a gate.** An agent will skip a rule written as "you should probably" when a deadline appears. Find each rule you judge to be a gate and confirm the wording matches its stakes (principle 1). The same file rationing its heaviest wording is a good sign; wording that is heavy everywhere is a finding, because nothing stands out.
- **No clause cancels the prohibition.** "Never skip X (unless you are in a hurry)" is an exit with the door open. A real exception is its own predicate, stated once, in the place the rule lives.
- **Every rule has a defense.** For each gate, look for a rationalization table row, a red-flag line, or a loophole closer that says what a word means. An agent will reason "this change is too small" when the skill never mentions small changes. Rows should read like things an agent actually says. Rows invented at a desk are weaker than rows from a baseline run.
- **Defenses match the observed failures.** If `references/` or the commit history holds baseline notes, compare them to the table. A row nobody has seen is padding. A failure seen in baseline with no row is a gap.
- **Excuse and reality are not mirror images.** A table whose reality column just restates the rule ("Reality: you must write the test") teaches nothing. The reality should name the cost or the mechanism.
- **Each rule has a check.** Principle 10. "Verify it works" without a command is a wish. The skill should say what the agent runs and what output it reports.
- **It was tested.** Principle 8. Look for a RED run (a fresh agent without the skill, how it failed) and a GREEN run. A discipline skill with neither is untested prose. Say that plainly, then follow [pressure-scenarios.md](../pressure-scenarios.md) and let step 5 run a scenario per gate.
- **No contradiction with siblings.** Another skill that says the opposite under the same trigger sends the agent to whichever loaded last. Grep the sibling skills for the same noun.

## What the files cannot show

- **Whether an agent obeys it.** Only a scenario shows that. For each gate, write down the pressure that would make an agent break it (time, sunk cost, "just this once") and run it, or mark the gate untested in the report.
- **Over-triggering.** A discipline skill with a broad description fires on tasks it was never meant for and then taxes them. Run one control scenario that should not load it.
- **Which excuses are real.** Ask the author, or search past transcripts, for how an agent actually talked itself out of the rule. A reviewer guessing excuses finds the obvious ones.
- **Stacking.** If this skill loads beside two other disciplines, the combined text may demand contradictory first steps. Check the siblings that share its trigger.

## Example from this repo

`skills/test-driven-development/references/principles.md` has an Iron Law section and, at line 141, an `| Excuse | Reality |` table. That is the pattern. The rule is a gate, it is stated once, and the excuses are things an agent says. `SKILL.md` points to the table by name ("See `references/principles.md` for the full rationalization table"), so it is reachable.

The weakness is in `SKILL.md`'s frontmatter. The description runs to a long paragraph that lists the discipline's contents ("the Iron Law, red-green-refactor, the Three Laws, FIRST, AAA/GWT, triangulation") and a dozen trigger words. Principle 4 says a description that outlines the content invites the agent to follow the description and skip the body. Here that matters more than usual, because the body holds the defenses and a description-only read skips them.

## Stronger wording

```text
Wrong: Write the test first. If the change is trivial or you are short on time,
  it is fine to add the test afterwards.

Right: Write the failing test first, and watch it fail. A test written after the
  code passes at once and proves nothing. A docs-only change needs no test.
```

The wrong version builds the rationalization into the rule. The right one keeps one real exception as a predicate and gives the reason, so the agent can recognize the excuse when it forms.
