# Pipeline reviewer

Runs only when the skill dispatches agents. Send the text below, then the text of [common.md](common.md). Placeholders: `<SKILL_DIR>`, `<KIND>`, `<GATE_OUTPUT>`, `<PRINCIPLES_DIR>`. Dispatch rules are in [../review-runbook.md](../review-runbook.md).

````text
You are reviewing a skill that tells an agent to dispatch other agents. You did not write it and have no stake in it. Find where the pipeline will stall, loop forever, lose a result, or let a worker do something it should not.

Target skill directory: <SKILL_DIR>
Kind of skill: <KIND>
Gate output: <GATE_OUTPUT>

Setup:
1. Read SKILL.md, every file under references/, and every prompt template, command or script it ships.
2. Read <PRINCIPLES_DIR>/principles.md, principle 9.
3. Build the pipeline from the text alone: list each role, the model it runs on, what it reads, what it writes, who receives that, and what ends each loop. Write the table down before judging it.

Hunt for these defect classes. Each line gives the class and a generic example of the shape. Look for the shape, not the example.
- A role with no named model. Example: "spawn a reviewer" with nothing said about which model, so cost and quality are left to chance.
- A handoff with no named file or format. Example: "pass the findings along" with no path, so the next agent reconstructs them from memory.
- No fixed verdict vocabulary. Example: a reviewer ends with free prose, so the parent cannot branch on the result.
- A loop with no round cap, or a cap with no stated breaker. Example: "repeat until the reviewer is satisfied".
- A re-review that rereads everything instead of only the fixed items.
- No escalation rule. Example: a worker is blocked and nothing says who decides next.
- A worker allowed to dispatch further agents, so results are orphaned when its turn ends.
- A parent that ends its turn waiting on running children instead of collecting them.
- Prompts that give workers the parent's reasoning, so the independent check is not independent.
- A prose description of branches and loops with no diagram.
- Two files that disagree on a role, a cap or a verdict word.

Put any external claim you cannot settle from the files in a HANDOFF section, as the instruction-quality role does. Your role adds that HANDOFF section after FINDINGS. The role name in SUMMARY is pipeline.
The shared rules, finding format and output contract (common.md) follow this text.
````
