# Plugin Agents (Subagents)

Adapted from plugin-dev (Apache-2.0), anthropics/claude-plugins-official. Corrected against the
current subagent docs in `working-with-claude-code/references/sub-agents.md`.

A plugin ships subagents as Markdown files in `agents/` at the plugin root. They load
automatically when the plugin is enabled and appear under a scoped name such as
`my-plugin:code-reviewer`. A subfolder becomes part of the identifier: `agents/review/security.md`
registers as `my-plugin:review:security`.

## What the docs require

Only `name` and `description` are required. The official docs and their example agents use a plain
prose `description` and do not use `<example>` blocks. plugin-dev's agent-development skill teaches
prose descriptions, yet its bundled agents and its validator demand `<example>` blocks. That is an
inconsistency in plugin-dev, not a Claude Code rule. Write a clear prose description. An
`<example>` block inside it is harmless, but nothing in Claude Code needs it, and
`scripts/validate-agent.sh` does not require one.

```markdown
---
name: code-reviewer
description: Reviews code for quality, security, and maintainability. Use proactively after writing or modifying code, or when the user asks for a review.
tools: Read, Grep, Glob
model: sonnet
color: blue
---

You are a senior code reviewer. ...
```

## Frontmatter reference

Field names are camelCase and must match exactly. Claude Code ignores an unrecognized field without
reporting it. To find a typo, run `claude --debug` and search the log for `does not recognize or apply`.

| Field | Notes |
|-------|-------|
| `name` | Required. Up to 256 characters. Cannot start with `-` or contain `:` (reserved for plugin scoping). The filename need not match. Hooks see it as `agent_type`. |
| `description` | Required. When Claude should delegate. Include "use proactively" to encourage automatic delegation. |
| `tools` | Allowlist, comma-separated string or YAML list. Omit to inherit everything. |
| `disallowedTools` | Denylist applied first, then `tools` resolves against what remains. |
| `model` | `sonnet`, `opus`, `haiku`, `fable`, a full model ID such as `claude-opus-5-5`, or `inherit`. |
| `maxTurns` | Stops the subagent after N agentic turns and returns partial output. |
| `skills` | Skills preloaded into the subagent's context in full at startup. |
| `memory` | `user`, `project`, or `local` persistent memory scope. |
| `background` | `true` keeps it in the background even when Claude would wait. |
| `effort` | `low`, `medium`, `high`, `xhigh`, `max`, depending on the model. |
| `isolation` | `worktree` runs it in a temporary git worktree. |
| `color` | `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, or `cyan`. Display only. |
| `initialPrompt`, `omitClaudeMd`, `autoCompactWindow`, `experimental` | See the subagent docs. Several need recent Claude Code versions. |

Plugin subagents ignore `hooks`, `mcpServers`, and `permissionMode` for security. If you need
them, ship hooks in the plugin's `hooks/hooks.json` and servers in its `.mcp.json`, where they apply
whenever the plugin is enabled. `scripts/validate-agent.sh` warns when it sees these in a plugin
agent. `magenta` appears in plugin-dev's validator as a color, but it is not in the documented
list.

## Triggering

Claude delegates based on the `description`, the request, and context. The description is the
whole trigger, so write it as a routing rule.

- Say what the agent does and when to use it, in that order.
- Name the situations in the user's words: "after writing code", "when tests fail", "when the user
  asks for a security review".
- Add "use proactively" if Claude should reach for it without being asked.
- Keep it short. A startup warning appears when all subagent descriptions together pass 15,000 tokens.
- Make descriptions distinct. Two agents with overlapping descriptions get picked unpredictably.

Users can also force an agent with an @-mention (`@"code-reviewer (agent)"`), or run a whole
session as one with `--agent`.

To measure whether a plugin's agents are picked for realistic prompts, `claude plugin eval` runs
each prompt with and without the plugin and scores the result.

## System prompt skeleton

The Markdown body is the system prompt. A subagent receives only that body plus basic environment
details such as the working directory. It does not get the Claude Code system prompt or your
conversation, so the prompt must stand alone and state anything the agent has to know.

```markdown
You are a [specific role] specializing in [domain].

When invoked:
1. [First concrete step, e.g. run `git diff` to find the changes]
2. [Second step]

Responsibilities:
- [What it owns]

Quality standards:
- [Specific, checkable standards, e.g. every finding has a file:line]

Output format:
- [Exact sections or structure to return]

Edge cases:
- [Situation]: [what to do]
```

Guidelines that hold up:

- Second person ("You are", "You will"), one clear role.
- Give a numbered process. Vague responsibilities produce vague output.
- Define the output shape, including the file paths and line numbers the caller needs.
- Say what to do when blocked or when input is missing, instead of letting it guess.
- State boundaries: "Do not edit files" for a reviewer, scope limits for an editor.
- Keep it focused. A long prompt that tries to cover everything weakens each instruction.

### Patterns by agent type

| Type | Process shape | Output |
|------|---------------|--------|
| Analysis / review | gather context, scan, deep check, prioritize | findings by severity with locations |
| Generation | read conventions, draft, check against conventions | the artifact plus where it was written |
| Validation | run checks, collect violations | PASS or FAIL with counts and fixes |
| Orchestration | plan phases, delegate, merge | a phase-by-phase report |

## Tool least privilege

Give an agent the tools it needs and nothing more. A smaller toolset limits damage from a bad
prompt, and makes the agent's purpose obvious.

| Agent role | Suggested `tools` |
|------------|-------------------|
| Read-only reviewer or researcher | `Read, Grep, Glob` (add `Bash` only for read-only commands like `git diff`) |
| Test runner or debugger | `Read, Grep, Glob, Bash, Edit` |
| Code generator | `Read, Write, Edit, Grep, Glob` |
| Everything except writes | omit `tools`, set `disallowedTools: Write, Edit` |

Things to know:

- `disallowedTools` is applied before `tools`. A tool in both is removed.
- A `disallowedTools` entry such as `Bash(git push *)` still removes all of Bash. To block specific
  commands, add a deny rule to `permissions.deny` in settings.
- Subagents never get `AskUserQuestion`, `EnterPlanMode`, `Workflow`, or others on a short filter list,
  even if you list them.
- Background subagents (the default when Claude spawns them) keep a reduced built-in tool set. The
  same definition can resolve to different tools in the foreground and background.
- If no entry in `tools` resolves to a real tool, the subagent can fail to launch. Misspelled names
  are the usual cause.
- Whole MCP servers can be listed: `mcp__github__*` in `tools`, or `mcp__github` in
  `disallowedTools`. A plugin's MCP tools use the scoped name `mcp__plugin_<plugin>_<server>__<tool>`.

Choose a model to match the job. `haiku` for fast read-only work, `sonnet` for most coding,
`opus` for hard reasoning, `inherit` to follow the session.

## Files Claude Code skips

Claude Code skips a project, user, or managed agent file, with no error in the session, when:

- it has no `name` (treated as documentation)
- the opening `---` is not on line 1
- `name` starts with `-`, contains `:`, or is over 256 characters
- it has a `name` but no `description`
- the YAML does not parse

A plugin agent is not skipped under these conditions: Claude Code still loads it, naming it
after the file (`agents/reviewer.md` in plugin `my-plugin` loads as `my-plugin:reviewer`), and
for unparseable frontmatter also ignoring every field and using `Agent from my-plugin plugin`
as its description.

Run `claude --debug` to see the skip reason in `~/.claude/debug/<session-id>.txt`.

## Testing

```bash
scripts/validate-agent.sh agents/code-reviewer.md
claude plugin validate ./my-plugin
```

Then load the plugin with `claude --plugin-dir ./my-plugin`, ask for a task that matches the description, and confirm the
agent runs. Editing an agent file in a watched `.claude/agents/` directory takes effect within
seconds. Plugin changes need `/reload-plugins` or a restart.

## Pitfalls

- Writing the description as a title ("Code reviewer") instead of a routing rule.
- Relying on conversation history in the prompt; the agent never sees it.
- Shipping `hooks` or `mcpServers` in a plugin agent's frontmatter, where they are ignored.
- Granting `Bash` plus write tools to an agent that only needs to read.
- Two agents with near-identical descriptions.
