# Checklist

The short version of the [procedure](../SKILL.md), in review order. Use it for the final pass.

**Intent and gate**

- [ ] I can say in one sentence what behavior the skill changes, for whom, and what kind of skill it is.
- [ ] `skill-check` has no FAIL, and every SKIPPED check is named under gate gaps.
- [ ] The change is small enough to review, or split along a seam.

**Routing**

- [ ] The description starts "Use when", names triggers a user would say, and never lists steps or contents.
- [ ] Exclusions point to sibling skills, and each sibling points back.
- [ ] Five realistic requests load it and five close-sounding ones do not.
- [ ] `SKILLS.md` and `README.md` have a row that matches.
- [ ] `SKILL.md` routes ("read X when Y"), force-loads nothing, and every reference is reachable.

**Authority and rationalization** (discipline, workflow, pipeline)

- [ ] Each rule's wording matches its stakes: gates for costly rules, guidance for preferences.
- [ ] No hedge or nuance clause cancels a gate.
- [ ] Every rule agents break under pressure has a defense: a table, a red flags list, a loophole closer or a predicate.

**Specific and consistent**

- [ ] Each rule has one threshold and one owner, and each condition has an observable trigger.
- [ ] No rule is stated differently in two files, or against a sibling skill or the project rules.

**Content**

- [ ] Prose agrees with the code and tables beside it.
- [ ] Examples run, do what the prose promises, and do not commit the smell they warn about.
- [ ] Examples vary enough not to overfit.
- [ ] Each file has a promise ledger; every claim is holds, contradicted or handoff; every handoff row went to the claim verifier.
- [ ] Every reviewer ended with a coverage line and listed any unread file as a gap.
- [ ] Ledger rows reconcile with findings, and every handoff claim went to the claim verifier, which returned a quoted check result for each row.

**Flow and pipelines**

- [ ] A flow with branches or loops has a diagram, and a linear one does not.
- [ ] A pipeline names each role, model, handoff file, verdict words, re-review scope, round cap, escalation, and that workers do not dispatch agents.

**Evidence and close**

- [ ] The skill claims an outcome only where it includes a check the agent can run.
- [ ] Pressure scenarios were run, or `off` is stated with the reason.
- [ ] Every finding is fixed, declined with a `file:line` reason, or deferred with an issue.
- [ ] The report block came from `report.ts`, not from my hands.
