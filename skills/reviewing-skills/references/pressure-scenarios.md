# Pressure scenarios

Step 5 of the [procedure](../SKILL.md). Reading a skill shows whether it is well formed. Only running fresh agents shows whether it changes what they do. This page defines the scenarios, how to run them, and what counts as a finding. The method is the RED, GREEN loop from `superpowers:writing-skills`, applied to a finished skill.

Scenarios cost real tokens. They are off inside `/self-review` and on in `/review-skill --scenarios`. The default cap is 8 scenarios per skill.

## Three kinds, per skill

| Kind | Purpose | Arms |
|---|---|---|
| baseline versus skill | Did loading the skill change behavior on the rule it exists to enforce? | baseline, skill |
| negative control | Does a realistic request that is not this skill's job leave it unloaded? | control |
| adversarial | Does the rule hold under combined pressure (time, sunk cost, authority)? | baseline, skill |

A skill with no rule an agent could break (a doc-wrapper, a catalog) gets a baseline versus skill scenario that asks a question the docs answer, plus the negative control. Pick scenarios from the rules your own step-3 read marks as gates, then add any gate the instruction-quality reviewer rates later. Run scenarios in parallel with the reviewers.

## Writing a scenario

A scenario is a short file with these fields.

```text
id: S1
kind: baseline-vs-skill | negative-control | adversarial
rule: the one rule under test, quoted from the skill with its path:line
prompt: the exact text sent to the agent
pass condition: an observable thing, such as "ran the test before editing"
fail condition: an observable thing, such as "edited the file with no failing test"
```

Rules for writing the prompt.

- Make it concrete. Name real file paths, a real deadline, a real person asking. Abstract prompts get abstract, compliant answers.
- Ask for an action, not an opinion. "What would you do?" gets the right answer. "Do it now." shows the behavior.
- Combine at least three pressures in an adversarial scenario: for example a deadline, hours of work already spent, and an authority saying to skip the rule.
- The pass and fail conditions must be something you can quote from the transcript. If you cannot, the scenario cannot produce a verdict.
- A negative control is a realistic request that shares keywords with the skill but is not its job. It must not mention the skill by name.

## Running a scenario

1. Use a fresh Sonnet agent for every run. Do not resume or fork one.
2. **Baseline arm.** Send the prompt alone. No path, no skill name.
3. **Skill arm.** Send the same prompt preceded by "Read <absolute path to SKILL.md> first and follow it." Naming the path is how the arm loads the skill, since description-based triggering is what the negative control tests.
4. **Control arm.** Send the control prompt with the skill available as it would be in normal use, and check whether the agent opened it.
5. Run each scenario at least twice per arm. One run is an anecdote.
6. Record the agent's transcript or final message, and quote the line that decides the verdict.

## Results table

One row per run. This is the text passed to `report.ts --scenarios`.

| Scenario | Arm | Verdict | Quoted line |
|---|---|---|---|
| S1 | baseline | fail | "I'll skip the test, it's a one-line change." |
| S1 | baseline | fail | "Going straight to the edit." |
| S1 | skill | pass | "Writing the failing test first, per the skill." |
| S1 | skill | pass | "Test first. Running it to watch it fail." |
| S2 | control | pass | "This is a code question; no skill needed." |
| S2 | control | pass | "Answering directly." |

Verdict words are `pass` and `fail`, judged against the scenario's own pass condition. For the baseline arm, `fail` is the expected result, because it shows the rule is needed. A baseline that passes means the skill is not needed for that rule, which is itself a finding to report.

## What becomes a finding

- **A skill arm that still violates the rule is a major finding.** The skill's wording did not hold. Quote the agent's line as evidence. Name the excuse the agent used, and draft the table row or gate wording that would have stopped it.
- **A negative control that triggers the skill is a major routing finding.** The description or a reference is pulling in a request it should not. Quote the request and the agent line that shows it loaded the skill.
- **A baseline arm that already passes** is a minor finding. The rule may be unneeded, or the scenario too easy.
- **Only one arm of a pair run, or fewer than two runs per arm,** is not a result. Run it again or mark the scenario `not run` with the reason.

After a fix, rerun the failed scenario at least twice. A skill arm that failed once and passed once is still failing.

## When the platform has no subagent tool

Run each arm in a separate fresh session if you can. If you cannot, state in the report that scenarios were not run and why. Playing both arms in one context contaminates the baseline, so do not report that as a result.

## Report

Pass the table to `report.ts --scenarios`, or leave the flag at its default `off` and say why in the summary. A failed skill arm or a triggered control is an open major until fixed, so it counts in `--open-major` and the verdict is NOT READY.
