# Plugin Commands

Adapted from plugin-dev (Apache-2.0), anthropics/claude-plugins-official. Corrected against the
current docs in `working-with-claude-code/references/skills.md` and `plugins-reference.md`.

## Commands versus skills

Custom commands have been merged into skills. A file at `commands/deploy.md` and a skill at
`skills/deploy/SKILL.md` both create `/deploy` outside a plugin (inside a plugin both are namespaced, as described below) and behave the same. The plugin reference now calls
`commands/` "flat `.md` skill files". A command file accepts every skill frontmatter field except
`name` and `paths`, and the name comes from the filename. If a skill and a command share a name, the
skill wins.

Pick by what you need:

| Need | Use |
|------|-----|
| One short prompt in a single file | `commands/<name>.md` |
| Supporting scripts, references, or templates next to the prompt | `skills/<name>/SKILL.md` |
| Claude should load it on its own from a description | a skill (set `description` carefully) |
| Only the user should trigger it | either one, with `disable-model-invocation: true` |

For new work the docs recommend a skill. Keep `commands/` for existing flat files and quick
one-file prompts. Plugin skills are namespaced by plugin (`skills/review/SKILL.md` in plugin
`my-plugin` is `/my-plugin:review`). Test how your `commands/` files are named in a loaded plugin
before documenting the invocation.

Setting `commands` in `plugin.json` replaces the default `commands/` directory instead of adding
to it. Do not set both unless you list every path you want.

## File format

```markdown
---
description: Review staged changes for security issues
argument-hint: [file-or-dir]
allowed-tools: Read Grep Bash(git diff *)
disable-model-invocation: true
---

Review $ARGUMENTS for security issues. Report each finding with file:line.
```

Everything is optional. Without `description`, Claude Code uses the first non-empty line of the
body. Field names are hyphenated lowercase, and an unrecognized field is ignored without an error,
so a typo silently does nothing.

| Field | Purpose |
|-------|---------|
| `description` | Shown in the `/` menu; also how Claude decides to load it |
| `argument-hint` | Autocomplete hint such as `[issue-number] [branch]` |
| `arguments` | Named positional arguments usable as `$name` in the body |
| `allowed-tools` | Tools Claude may use without prompting during this turn only. Space or comma separated, or a YAML list. Accepts patterns like `Bash(git add *)` |
| `disallowed-tools` | Tools removed from Claude's pool while the command runs |
| `disable-model-invocation` | `true` stops Claude from invoking it on its own |
| `user-invocable` | `false` hides it from the menu (Claude-only background knowledge) |
| `model`, `effort` | Override for this command's turn |
| `context: fork`, `agent` | Run in a forked subagent, optionally a named agent type |
| `hooks` | Hooks registered when the command runs |
| `shell` | `bash` (default) or `powershell` for `!` blocks |

`allowed-tools` grants permission and does not restrict. It clears when the user sends the next
message. A command checked into a repo can grant itself broad access, so review the field when
you read someone else's.

## Arguments

| Placeholder | Meaning |
|-------------|---------|
| `$ARGUMENTS` | Everything typed after the command name |
| `$ARGUMENTS[N]` or `$N` | The Nth argument, **zero-based** (`$0` is the first) |
| `$name` | Named argument declared in `arguments:` |
| `${CLAUDE_PLUGIN_ROOT}` | The plugin's install directory (plugin commands only) |
| `${CLAUDE_PROJECT_DIR}` | The project root |
| `${CLAUDE_SESSION_ID}` | The session ID |

Indexed arguments use shell-style quoting, so `/cmd "hello world" two` gives `$0` = `hello world`.
If no placeholder receives the arguments, Claude Code appends `ARGUMENTS: <text>` to the prompt so
nothing is lost. An indexed placeholder with no matching argument stays as literal text. To write a
literal `$1.00`, escape it as `\$1.00`.

The older plugin-dev material numbers positional arguments from `$1`. The current docs number from
`$0`. Use `$0` and test your command with real input.

```markdown
---
description: Migrate a component between languages
argument-hint: [component] [from] [to]
---

Migrate the $0 component from $1 to $2. Preserve behavior and tests.
```

Validate arguments in the prompt when they matter ("if `$0` is empty, ask the user for a
component name and stop"), because there is no schema.

## File references

An `@path` in the body attaches that file's contents to the prompt:

```markdown
Review @src/auth/login.ts against @${CLAUDE_PLUGIN_ROOT}/templates/checklist.md.
```


## Bash output in the prompt

`` !`command` `` runs before Claude sees the prompt and is replaced by the command's output.
It only triggers when `!` starts a line or follows whitespace. A fenced block opened with
` ```! ` runs multi-line commands.

```markdown
---
description: Summarize uncommitted work
allowed-tools: Bash(git *)
---

Branch: !`git branch --show-current`
Status:
!`git status --short`

Summarize the changes above and flag anything risky.
```

Organizations can disable this feature with `disableSkillShellExecution`. Output is inserted as plain text and
is not scanned for further `!` placeholders. Use `${CLAUDE_PLUGIN_ROOT}` when the command calls a
script bundled with the plugin:

```markdown
Result: !`"${CLAUDE_PLUGIN_ROOT}"/scripts/analyze.sh "$0"`
```

## Interactive flows with AskUserQuestion

When a decision needs explanation or has several options, have the command ask instead of
parsing arguments. Add `AskUserQuestion` to `allowed-tools` and describe the questions in the body.
Claude renders them as multiple choice, and the user can always type their own answer through
the `Other` row.

```markdown
---
description: Configure the plugin interactively
allowed-tools: AskUserQuestion, Write
---

Ask the user, using AskUserQuestion:

1. Deployment target. Options: AWS, GCP, Local.
2. Features to enable (allow multiple). Options: Monitoring, Auto-scaling, Backups.

Then write `.claude/my-plugin.local.md` with the answers as YAML frontmatter and confirm the
path to the user.
```

Use arguments for simple known values and for anything that must run unattended. Use questions when
the choice is open-ended. A subagent cannot ask the user, so never call a command that depends
on `AskUserQuestion` from inside one.

## Organization

- Put commands directly in `commands/`. In `.claude/commands/`, a subdirectory becomes a namespace:
  `frontend/component.md` is `/frontend:component`.
- Command names cannot reuse reserved built-in names. A startup notice names any command that
  failed to load for that reason.
- Keep each command to one job. Chain steps in the prompt, not through many commands.
- Write instructions to Claude ("Review the code for..."), not messages to the user.
- Document the command in the plugin README with an example invocation.

## Workflow patterns

Plan, then act: have the command state the plan, wait for confirmation via `AskUserQuestion`, then
execute. Multi-agent: the body tells Claude to launch named subagents in parallel and merge their
reports. Delegate heavy reading with `context: fork` so the main conversation stays small.

## Testing

1. `claude --plugin-dir ./my-plugin`, then run `/my-plugin:<name> sample args`.
2. After edits run `/reload-plugins`.
3. If the command is missing from `/`, check the file extension, the `commands/` location at the
   plugin root (not inside `.claude-plugin/`), and `claude plugin validate ./my-plugin`.

## Pitfalls

- Using `$1` as the first argument.
- Putting `commands/` inside `.claude-plugin/`.
- Expecting `allowed-tools` to block other tools; it only pre-approves.
- Hardcoded absolute paths instead of `${CLAUDE_PLUGIN_ROOT}`.
- A vague `description`, which makes the command hard to find and for Claude to match.
