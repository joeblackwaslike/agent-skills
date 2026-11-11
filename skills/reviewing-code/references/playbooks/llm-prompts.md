# LLM prompts

> Use when the diff: Changes prompts, `SKILL.md` files, `AGENTS.md` or `CLAUDE.md`, subagent definitions, hooks, commands or agent orchestration, or was largely written with an AI tool

*Leans on: explicit over implicit, Parse Don't Validate, least privilege, make it work (with evidence).*

A prompt that ships in a product or pipeline is code: behavior changes when its text changes, and nothing type-checks it. Review it with the same rigor and ask for evidence that it still works.

- **Versioned and findable.** Prompts live in files in the repository, or in a prompt registry with versions, not as strings scattered through code, so changes show up as reviewable diffs.
- **Evals for every change.** A prompt or model change comes with results on a fixed set of cases, before and after. "I tried it a few times" isn't evidence, because outputs vary from run to run.
- **Clear structure.** Task and role first, then context, constraints, output format and examples. Instructions don't contradict each other, and each one is something the model can act on.
- **Untrusted input stays data.** User text, documents, web pages and tool results are clearly delimited, and nothing in them can override the instructions. Wherever outside text reaches a model that can call tools, treat prompt injection as a real threat.
- **Structured output is validated.** Output consumed by code uses structured output or tool calling with a schema, is validated (Pydantic or zod), and has a defined path for when validation fails. No regexes over free text.
- **Model and parameters pinned.** Model id, temperature and token limits are explicit, and a model upgrade is reviewed like a dependency upgrade, with evals.
- **Cost and context.** Token counts for typical inputs are known, stable content is ordered so prompt caching works, and the context isn't padded with material the task doesn't need.
- **Representative examples.** Few-shot examples cover edge cases and don't contain answers the model will copy verbatim.
- **No secrets or personal data** in prompts or examples; logged prompts and responses follow the logging playbook.
