# Skills and instruction files

*Leans on: KISS, YAGNI, least privilege, high cohesion, least astonishment.*

Skills (`SKILL.md` folders), custom commands and similar instruction files are executable prompts: an agent follows them, runs their scripts and acts on the user's machine. Review them as code that happens to be written in English. For depth, use the [reviewing-skills](../../../reviewing-skills/SKILL.md) skill, which `/self-review` runs on any diff under `skills/`; this playbook is the short version. The [Claude Code skills docs](https://code.claude.com/docs/en/skills) describe the format.

- **The description is the trigger.** The frontmatter `description` decides when the skill loads, and it's always in context. It says what the skill does and when to use it, key use case first, specific enough not to fire on unrelated requests and broad enough to fire on the right ones.
- **Frontmatter is exactly right.** Field names match the documentation, hyphens included. Claude Code silently ignores a field it doesn't recognize, so a typo quietly disables a setting.
- **Least privilege.** `allowed-tools` grants only what the steps need. A skill that can run arbitrary shell commands without asking needs a stated reason.
- **One job.** A skill covers one kind of task. One that tries to cover several workflows triggers unpredictably and is hard to test.
- **Concise and actionable.** Steps say what to do, in order, rather than explaining why at length. Once loaded, the body stays in context, so every line is a recurring token cost. Keep `SKILL.md` short (the Claude Code docs suggest under 500 lines) and move reference material into supporting files that load only when needed.
- **No conflicts.** Instructions don't contradict the project's rules files, other skills, or themselves, and the skill doesn't overlap an existing one so much that the choice between them is ambiguous.
- **Bundled scripts are code.** Scripts the skill runs get the full shell, Python or TypeScript review, including what they delete, what they send over the network, and what secrets they touch.
- **Deterministic where it matters.** Steps that must happen the same way every time (formatting, validation, file layout) are scripts, not prose the model may follow loosely.
- **Tested on real requests.** The skill is tried on realistic prompts, including ones that should *not* trigger it, ideally as a small eval set kept with the skill.
- **No name collisions.** Personal, project and plugin skills with the same name shadow each other; check the new name is free.
