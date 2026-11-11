# Hooks and commands

> Use when the diff: Changes prompts, `SKILL.md` files, `AGENTS.md` or `CLAUDE.md`, subagent definitions, hooks, commands or agent orchestration, or was largely written with an AI tool

*Leans on: Fail Fast, least privilege, explicit over implicit, KISS.*

Hooks in Claude Code and Codex are commands (and, in Claude Code, HTTP calls, tools or prompts) that run automatically at points in an agent's lifecycle: before or after a tool call, when a prompt is submitted, when the agent stops. They run with your permissions and environment, without asking. Review them as production scripts with a trigger attached. References: [Claude Code hooks](https://code.claude.com/docs/en/hooks), [Codex hooks](https://learn.chatgpt.com/docs/hooks).

- **Where it lives decides who runs it.** Claude Code reads hooks from user, project (`.claude/settings.json`, committed), local, managed, plugin, and skill or subagent settings. Codex reads `hooks.json` or `[hooks]` tables in `config.toml`, at user and project level. A committed project hook runs for everyone who trusts the repository, so it gets the strictest review.
- **Narrow matchers.** The matcher selects only the tools or events the hook needs. A catch-all matcher on `PreToolUse` runs before every tool call and slows every turn.
- **Exit codes mean specific things.** In both tools, exit code `2` blocks the action on events that can block, and stderr becomes the reason. In Claude Code, any other non-zero code, including `1`, is a non-blocking error and the action proceeds. A policy hook that exits `1` enforces nothing.
- **Failures fail open.** A missing script, crash or timeout lets the action proceed by default. Hard guarantees belong in the permission system or managed settings; both tools' docs describe hooks as a guardrail, not a complete enforcement boundary.
- **Parse the input properly.** Command hooks receive the event as JSON on stdin. Parse it with `jq` or a typed script, never with `grep`, and treat the tool inputs inside it as untrusted.
- **Fast and bounded.** Default timeouts are long (600 seconds for command hooks in both tools), so a hook on a frequent event sets a short `timeout` and does little work. A slow hook makes every turn slow.
- **Quoting and paths.** Paths built from `$CLAUDE_PROJECT_DIR` or similar variables are quoted, or passed in exec form (`args`) so the shell never interprets them.
- **Output that reaches the model.** Context a hook injects, and the reasons it gives for blocking, are saved in the transcript and read by the model. Write them as plain facts, with no secrets and nothing phrased as system instructions.
- **Trust and re-review.** Codex records trust against each hook's hash, so an edited hook is skipped until someone re-trusts it; say so in the PR. Claude Code project hooks follow the workspace trust prompt.
- **The shell playbook applies** to every command a hook runs: strict mode, quoting, no secrets in arguments, idempotence.

**Commands.** In Claude Code, a file in `.claude/commands/` and a skill both create a `/name` command and work the same way, so review commands with the skills playbook. Check that arguments passed into the command are treated as data, not instructions, and that any pre-approved tools are the minimum it needs.
