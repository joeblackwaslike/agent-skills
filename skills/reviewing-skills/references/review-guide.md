# Review guide

How to read a skill and write up what you find. The standard is the `skill-principles` skill; this page is the working method behind steps 1, 3 and 4 of the [procedure](../SKILL.md).

## Read as the agent who loads it

A skill is read cold, under time pressure, by an agent that cannot ask what the author meant. Read it the same way.

1. **Start from the description alone.** Cover everything else. Would a request you can imagine load this skill? Would a request that merely sounds close load it by mistake? Only then open the body.
2. **Read the body once as a task.** Pretend you were handed the task the skill describes. Where do you hesitate, guess or skip? Those spots are where the skill is vague, hedged or missing a trigger.
3. **Follow each route.** For every "read X when Y", open X and check it answers what the route promised. Note any reference nothing routes to.
4. **Read for the second reader.** An agent that wants to skip a rule will look for the sentence that lets it. Find the nuance clause, the "usually", the "if appropriate", and ask what it would argue.

## Read in the principles' order

Apply the principles in this order, because earlier defects make later ones moot. A skill that never loads cannot have its examples judged.

1. Routing and description (principle 4).
2. Authority (principle 1): what each rule's stakes are, and whether its wording matches.
3. Rationalization risk (principle 2): which rules agents break, and whether a defense exists.
4. Specificity and contradictions (principle 3).
5. Examples (principle 7), code that runs, and claims about libraries.
6. Diagrams (principle 6).
7. Pipelines (principle 9), verification (principle 10) and evidence (principle 8).

Principles 1, 2, 8 and 9 apply to discipline skills, workflow skills and agent pipelines. A doc-wrapper or catalog is not flagged for a missing rationalization table.

## Calibrating authority

Authority has three words. Use them and no others.

| Word | Meaning |
|---|---|
| gate | The agent must not proceed until the rule is met. |
| guidance | The agent should follow it and may deviate with a stated reason. |
| informational | Context. No obligation. |

Decide a rule's right authority from its stakes, then compare with the wording.

- If an agent breaking the rule ships broken work, loses data, or skips verification, it should be a gate: a prohibition with an observable trigger, plus a defense. Hedged wording on it is a finding.
- If the rule is a taste or a convenience, guidance or informational is right. A rule worded as an Iron Law over a taste is also a finding, because it spends the attention the real gates need.
- An authority finding always states the stakes and the expected failure. A finding that says only "this should is weak" is noise. Do not flag every `should`.

The devices for writing a gate or guidance (prohibition, positive recipe, template slot, predicate) are not a fourth word. Pick the device by the failure: a rule broken under pressure gets a prohibition and a table; a wrong output shape gets a recipe; an omitted element gets a template slot; conditional behavior gets a predicate.

## Check what the files cannot show

- **Siblings.** List the neighboring skills and read the description of any that share trigger words. Check exclusions run both ways.
- **Project rules.** Read `CLAUDE.md` and `AGENTS.md` for the repo. A skill that contradicts them gets followed in some sessions and not others.
- **Scripts and commands.** Run what the skill tells the agent to run. A command that errors is a blocker for the agent.
- **Claims.** Every statement about what a library, API, flag or standard does needs a source read now, not remembered. Compare the installed version to the latest. Record the source.
- **Registry.** The skill needs a row in the catalog and the README that match its description.

## Writing findings

Every finding has the same fields.

| Field | Content |
|---|---|
| id | F1, F2, ... |
| severity | blocker, major, minor or nit |
| location | `path:line` |
| evidence | The exact lines, quoted |
| failure mode | "an agent will <do X> when <Y>" |
| authority | Current and recommended: gate, guidance or informational |
| replacement | Text ready to paste |
| confidence | high, medium or low |
| kind | claim when it comes from a promise-ledger row, otherwise other (content reviewer) |
| rationalization risk | When the finding is one, also the missing defense (table, red flags list, loophole closer or predicate) and the drafted "Excuse and Reality" row |

Severity:

- **blocker**: the skill misleads agents or cannot be loaded. Do not ship.
- **major**: a defect agents will hit in normal use.
- **minor**: a real but low-impact defect.
- **nit**: taste. Skip it unless it is free.

Rules for the write-up.

- **Quote, do not paraphrase.** A finding without a quoted line cannot be verified and is dropped at triage.
- **Name the failure.** "Unclear" is not a failure. "An agent will open the PR before review when it is told the review is optional in an emergency, with no definition of emergency" is.
- **Give the stronger wording.** The point of the review is that the reviewed skill ends up better than its author would have made it. A finding with no replacement is half done.
- **For a rationalization risk, draft the row.** Name the defense that is missing (table, red flags list, loophole closer or predicate) and write the row.

  | Excuse | Reality |
  |---|---|
  | "It is too small to need the check." | Small changes break too. The check takes a minute. |

- **Group repeats.** One finding for a pattern, with the other locations listed, not eight findings for the same phrase.
- **Propagate.** When one instance of a defect is found, search the other files for the same shape before closing the finding.
- **Do not praise, and do not pad.** Say "none" for a group with nothing, and name what you checked.

## Examples

A good finding:

```text
F2 major  references/flow.md:31
evidence: "Reviewers should check the diff size before dispatching."
failure mode: an agent will dispatch reviewers on an oversized diff when it is busy, since "should" lets it skip the check and no size is given.
authority: current guidance, recommended gate
replacement: "Before dispatching, run `git diff --shortstat`. Past 400 changed lines, split the change first. Do not dispatch on a diff above that."
```

A bad finding: "The wording in flow.md is a bit soft and could be firmer." No quote, no failure, no replacement, no stakes.
