# Agent rules files and subagents

*Leans on: KISS, least astonishment, least privilege, DRY (for knowledge).*

`AGENTS.md`, `CLAUDE.md`, editor rules files and subagent definitions shape every action an agent takes in a repository. They're standing configuration for a non-deterministic collaborator, and deserve the review a CI configuration gets.

**Rules files**

- **Always loaded, always paid for.** These files are in context for every task, so every line costs tokens on every turn and competes for the model's attention. Keep them short and specific to this repository; move rarely needed detail into skills or docs that load on demand.
- **Specific and verifiable.** "Run `just test` before committing" beats "make sure code is tested". Commands are copy-pasteable and actually work.
- **Accurate.** Build, test and lint commands, paths and conventions match the repository as it is now. Stale instructions are worse than none, because the agent follows them.
- **Precedence is intended.** Nested files and other tools' rules files don't conflict. For `AGENTS.md`, the file nearest the edited code wins and an explicit user prompt overrides it ([agents.md](https://agents.md/)); check that a nested override is deliberate.
- **One source of truth.** If both `AGENTS.md` and `CLAUDE.md` exist, one imports or points to the other instead of duplicating content that will drift.
- **Guidance, not enforcement.** "Never push to main" also belongs in branch protection and permission settings. A rules file guides the agent; it doesn't guarantee anything.
- **Safe to publish.** No secrets, and nothing that would be a problem if the file were public.

**Subagents**

The [Claude Code subagents docs](https://code.claude.com/docs/en/sub-agents) describe the format; the same points apply to other tools' agent definitions.

- **The description routes work.** The main agent delegates based on `description`, so it says clearly when to use this subagent. Descriptions are always in context; keep them short and put detail in the body.
- **Tools are scoped.** List `tools` explicitly: omitting the field inherits every available tool, which is rarely right. A reviewer or researcher gets read-only tools.
- **The model fits the job.** Routine, high-volume work on a cheaper model, hard reasoning on a stronger one, chosen explicitly.
- **Self-contained prompt.** A subagent doesn't see the conversation that started it. Its system prompt plus the delegation message carry everything it needs.
- **Output contract.** It returns a summary in a defined shape, not everything it read, because its result lands in the caller's context.
