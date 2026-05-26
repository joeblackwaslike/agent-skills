# Cross-Provider Tool Mapping

Skills are written using Claude Code tool names as the canonical form. When authoring skill content that references specific tools, either use Claude Code names throughout or add provider-specific notes where the divergence matters.

## Core Tool Equivalents

| Concept | Claude Code | Codex CLI | OpenCode | Cursor | Gemini CLI |
|---------|-------------|-----------|----------|--------|------------|
| Invoke a skill | `Skill` tool | `skill` tool | `activate_skill` | plugin API | `activate_skill` |
| Spawn a subagent | `Agent` / `Task` | `task` | agent dispatch | agent call | agent tool |
| Read file | `Read` | `Read` | `Read` | `Read` | `Read` |
| Edit file | `Edit` | `Edit` | `Edit` | `Edit` | `Edit` |
| Write new file | `Write` | `Write` | `Write` | `Write` | `Write` |
| Run shell command | `Bash` | `Bash` | `Bash` | `Terminal` / `Bash` | `Bash` |
| Search files | `Bash` (grep/find) | `Bash` | `Bash` | `Bash` | `Bash` |
| Fetch URL | `WebFetch` | `WebFetch` | `WebFetch` | `WebFetch` | `WebFetch` |
| Web search | `WebSearch` | `WebSearch` | `WebSearch` | `WebSearch` | `WebSearch` |
| Track tasks | `TodoWrite` | `TodoWrite` | equivalent | equivalent | equivalent |
| Enter plan mode | `EnterPlanMode` | _(no equivalent)_ | _(no equivalent)_ | _(no equivalent)_ | _(no equivalent)_ |
| Git worktree | `EnterWorktree` | _(no equivalent)_ | _(no equivalent)_ | _(no equivalent)_ | _(no equivalent)_ |

## Authoring Guidelines

### Default: use Claude Code names

Write skill bodies using Claude Code tool names. Most providers either use the same names or the agent can infer the equivalent.

```markdown
Use the `Read` tool to inspect the file, then `Edit` to make targeted changes.
```

### Add platform notes only when invocation syntax differs

The skill invocation tool name varies meaningfully across providers. For skills that teach agents how to use other skills, add a platform notes section:

```markdown
## Invoking This Skill

**Claude Code:** Use the `Skill` tool — `Skill("my-skill")`

**Codex:** Use the `skill` tool — `skill("my-skill")`

**OpenCode / Gemini CLI:** Use `activate_skill` — `activate_skill("my-skill")`
```

### Claude Code-exclusive tools

Some tools have no cross-provider equivalent. Do not reference them in shared portable skills without a fallback:

| Tool | Status | Fallback |
|------|--------|---------|
| `EnterPlanMode` / `ExitPlanMode` | Claude Code only | Document a manual planning step for other providers |
| `EnterWorktree` / `ExitWorktree` | Claude Code only | Use `git worktree` shell commands |
| `LSP` | Claude Code only | Use `Bash` with language-specific CLI tools |
| `ScheduleWakeup` | Claude Code only | No equivalent |
| `SendMessage` (agent IPC) | Claude Code / some harnesses | Skip or use polling |

If a skill requires a Claude Code-exclusive tool and there is no fallback, mark it explicitly:

```markdown
> **Claude Code only.** This skill uses `EnterPlanMode` which has no equivalent in other providers.
```

## Bootstrap Injection and Tool Rewriting

The OpenCode bootstrap adapter can programmatically rewrite tool references before injection. For example, replacing `Skill(` with `activate_skill(` in bootstrap text. See `references/bootstrap-patterns.md` for the injection hook pattern.

This lets you keep skills in Claude Code canonical form while the adapter translates at runtime for the target provider.
