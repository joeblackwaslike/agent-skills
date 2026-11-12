# Skill Playbooks

The ten principles in [skill-principles](../../../skill-principles/references/principles.md) apply to every skill, with the exceptions in its "Which principles apply" paragraph. Some kinds of skill also have failure modes of their own and deserve a dedicated pass. Each playbook says which principles it leans on, which it does not, what to check, and what the files cannot show you. Open only the playbook for the kind you named in step 6 of the runbook.

| Kind of skill | Playbook | Use when |
| --- | --- | --- |
| Doc-wrapper | [doc-wrapper.md](doc-wrapper.md) | The name starts `working-with-` or `developing-`, `references/` holds fetched or generated docs, or an `update*.js` or `update*.sh` script sits in `scripts/` |
| Discipline | [discipline-skill.md](discipline-skill.md) | The body is a rule agents will want to break under pressure: an Iron Law, MUST and NEVER wording, a rationalization table |
| Workflow | [workflow-skill.md](workflow-skill.md) | The body is an ordered procedure with numbered steps or a Procedure, Steps or Workflow heading, and the agent does the work itself |
| Router | [router-skill.md](router-skill.md) | The body is mostly "when X, read Y" tables and exclusions pointing at sibling skills, and it adds little process of its own |
| Reference catalog | [reference-catalog.md](reference-catalog.md) | Authored (not fetched) reference material, one file per topic, picked from a table |
| Command or hook | [command-and-hook.md](command-and-hook.md) | The change touches a `commands/*.md` file, a `hooks.json`, or a script a hook runs |
| Agent pipeline | [agent-pipeline.md](agent-pipeline.md) | The skill dispatches subagents, or ships reviewer or worker templates |

`skill-check` infers a kind for its own heuristics (a `metadata.kind` field first, then a `working-with-` or `developing-` name, then step lines, then MUST or NEVER wording). That inference is a hint for the gate, not the answer here. A router with a numbered list gets inferred as a workflow, and a doc-wrapper whose name does not start with `working-with-` gets inferred as "other". Read the skill and decide.

## When a skill is two kinds

Most real skills are two. Open both playbooks, and let the stakes decide the order.

1. A skill that dispatches agents is an agent pipeline first, whatever else it is. A pipeline that is also a workflow (the usual case) gets both, and the pipeline playbook wins when they disagree.
2. A discipline wrapped in steps (a TDD skill with a setup procedure) gets the discipline playbook for the rules and the workflow playbook for the steps. Principle 2 applies to the rules, not to every step.
3. A doc-wrapper that carries a local runbook (a reference skill with a maintenance section) gets the doc-wrapper playbook for the fetched files and the workflow playbook for the runbook only.
4. A router that also owns one process is a router with one workflow section. Review the process under the workflow playbook and the rest under the router playbook.
5. When the choice is still unclear, pick the kind whose failure costs more. A skill that can send an agent the wrong way is reviewed harder than one that can only waste tokens.

Do not open a playbook just to be thorough. A kind that is not in the skill adds noise, and applying discipline checks to a doc-wrapper produces findings that the principles say not to raise.
