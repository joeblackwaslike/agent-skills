---
name: skill-principles
description: >-
  Use when writing or editing the instructions inside a SKILL.md, or judging whether a rule, trigger description, example or subagent pipeline in one is well made. Not for checking a finished skill (use reviewing-skills). Not for repo layout, naming or registration (use authoring-agent-skills).
metadata:
  last_updated: "2026-11-11"
---

# Skill Principles

Ten principles cover most of what makes a skill's instructions work. Apply them while you write, and again when you read the result as an agent who has never seen it.

1. **Authority matches stakes.** Pick the device by failure type: a prohibition plus a rationalization table for rules broken under pressure, a positive recipe for wrong output shape, a template slot for omitted elements, a predicate for conditional behavior. Ration MUST and NEVER. No nuance clauses.
2. **Instructions survive rationalization.** Excuse and reality tables, Red Flags lists, loophole closers, built from excuses seen in testing.
3. **Specific and consistent.** One threshold per rule, one owner, an observable trigger per condition, no contradictions across files.
4. **The description is a trigger.** "Use when...", third person, conditions only. Never list, order or enumerate steps or contents, even after "Covers" or "Walks". Exclusions point both ways.
5. **Progressive disclosure.** A short body that routes, references loaded on demand, no `@path` force-loads.
6. **Flow made visible.** A diagram for non-obvious decisions and early-exit loops, none for reference or linear steps.
7. **Examples teach.** One excellent example, paired good and bad, runnable and checked.
8. **Evidence over belief.** Run an agent without the skill, then with it, then under combined pressure, plus a control that must not trigger it.
9. **Agent pipelines are specified.** Roles, models, handoff files, verdict words, scoped re-review, round caps, no sub-dispatch from workers.
10. **Verification is built in.** A check the agent runs and a reviewer can rerun.

Principles 3 to 5, 7 and 10 apply to every skill. Principle 6 applies to a skill with a flow, branch or loop; a reference catalog is exempt. Principles 1, 2, 8 and 9 apply to discipline skills, workflow skills and agent pipelines; a doc-wrapper or catalog is not flagged for a missing rationalization table.

## Vocabulary

- **Authority** is gate, guidance or informational. The devices in principle 1 are ways to write a gate or guidance, and add no second scale.
- **Severity** is blocker, major, minor or nit, the same as `reviewing-code`.
- **`fragment` marker.** A code block whose first line is `# fragment` or `// fragment` is a deliberately partial snippet and is skipped by the mechanical code check. Anywhere else in the block the marker does nothing.

## What to load

| You are... | Read |
|---|---|
| Choosing how firmly to word a rule, or adding a rationalization table | [principles.md](references/principles.md), principles 1 and 2 |
| Resolving conflicting rules or vague thresholds | [principles.md](references/principles.md), principle 3 |
| Writing or fixing a description | [principles.md](references/principles.md), principle 4 |
| Splitting a long skill or routing to references | [principles.md](references/principles.md), principle 5 |
| Adding a diagram or an example | [principles.md](references/principles.md), principles 6 and 7 |
| Testing a skill, or specifying subagents and verification | [principles.md](references/principles.md), principles 8 to 10 |

## Related skills

- `reviewing-skills`: the process for checking a finished skill against these principles.
- `authoring-agent-skills`: naming, frontmatter, doc fetching and registration in this repo.
- `agent-instructions`: editing CLAUDE.md, AGENTS.md and runbooks, including the RED to GREEN edit loop.
- `best-practices-for-agentic-development`: agent loops, tool interfaces and skill-writing methodology.
- `superpowers:writing-skills`: the RED, GREEN, REFACTOR method for skills that this standard builds on.
