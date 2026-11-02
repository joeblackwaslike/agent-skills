# Description conventions

A skill is only used if its `description` makes it into the skill listing and matches the request. Claude Code keeps every skill's name but drops descriptions once the whole listing exceeds its budget (1% of the context window), starting with the least-invoked skills. Each entry's `description` plus `when_to_use` is also cut at 1,536 characters. Every character you add spends a budget all skills share.

## Rules

1. **Target 400 characters, hard fail at 1,000.** `scripts/lint-descriptions.py` warns over 400 and fails over 1,000 (the listing cuts at 1,536).
2. **Key use case first.** Start `Use when …` or `Use before …` with the most distinctive trigger. Anything past the first sentence is the first thing lost when a description is cut.
3. **Real trigger phrases, not categories.** Name file names, commands, tool names, and the words a user would type (`hooks.json`, `"set up Claude for this project"`). Skip filler such as "comprehensive guidance for the complete lifecycle".
4. **Say what it is not for.** End with `Not for X (use Y)` for every neighbouring skill. Add the exclusion in both directions: if A excludes B, B excludes A.
5. **Do not summarize the workflow.** Describe when to load the skill, not what the body says. The body is read only after the skill fires.
6. **Keep contents lists out.** "Bundles the upstream README, docs/, and schemas" belongs in the SKILL.md body.
7. **Write it as a folded scalar** (`description: >-`) so a colon in the text cannot break the YAML. A plain scalar containing `word: word` fails to parse and the skill gets no description at all.

## Before adding a skill

- Scan `SKILLS.md` for skills whose triggers overlap yours. Add `Not for … (use …)` to the new description and a matching exclusion to each neighbour.
- Run `make lint-descriptions`. It must report 0 FAIL.
- Run the `skill-reviewer` agent on the new SKILL.md.

## Model

`working-with-github` states its scope and names which neighbouring skills to use instead. Copy that shape, then cut it to 400 characters.
