# Plugin Settings Files

Adapted from plugin-dev (Apache-2.0), anthropics/claude-plugins-official.

Plugins often need per-project configuration or small bits of state. Two mechanisms exist, and only
one of them is a documented Claude Code feature.

| Mechanism | Status | Use for |
|-----------|--------|---------|
| `userConfig` in `plugin.json` | Official. Claude Code prompts when the plugin is enabled and shows rows in `/config` | Values the user sets once: API endpoints, tokens, directories, toggles |
| `.claude/<plugin>.local.md` | A plugin convention. Claude Code does not read it; your hook, command, or agent does | Per-project settings, mode flags, state, and prose context that Claude should read |

Prefer `userConfig` when a value is per-user and fits the schema. Reach for a `.local.md` file when
the setting is per-project, changes often, or carries free-form instructions in a Markdown body.
The `.local.md` layout is not described in the official docs mirror, so treat it as a pattern you
own and document in your plugin's README.

## The userConfig option

Declared in `plugin.json`:

```json
{
  "userConfig": {
    "api_endpoint": { "type": "string", "title": "API endpoint", "description": "Your team's endpoint" },
    "api_token": { "type": "string", "title": "API token", "description": "Auth token", "sensitive": true }
  }
}
```

`type` is `string`, `number`, `boolean`, `directory`, or `file`. `title` and `description` are
required. `sensitive: true` masks input and stores the value in secure storage. Values are
available as `${user_config.KEY}` in MCP and LSP configs and hook commands, and all of them are
exported to hook processes as `CLAUDE_PLUGIN_OPTION_<KEY>` (key uppercased). Shell-form hook commands
reject `${user_config.*}` for safety, so read the environment variable instead.

## The .local.md convention

A Markdown file with YAML frontmatter, stored in the project's `.claude/` directory and named for
the plugin:

```markdown
---
enabled: true
mode: strict
max_retries: 3
allowed_extensions: [".ts", ".tsx"]
---

# Notes for Claude

This project uses strict mode. Skip generated files under `dist/`.
```

- Frontmatter holds structured settings that scripts read.
- The body holds prose that a command or agent can read directly as instructions.
- Add `.claude/*.local.md` to `.gitignore`. The `.local` suffix signals "personal, not committed".
  `scripts/validate-settings.sh` warns when the file is not ignored.
- The file is user-managed. Treat its absence as "use defaults", never as an error.

Keep frontmatter flat, with scalar values and short inline lists. Parsing it with shell tools is
fine for that, and fragile for nested YAML.

## Reading it from a hook

`scripts/parse-frontmatter.sh` reads one field (handling quotes, block scalars, and block lists)
or prints the whole frontmatter. Copy it into your plugin, for example to `scripts/`, and call it
by path:

```bash
#!/bin/bash
set -euo pipefail

state="${CLAUDE_PROJECT_DIR:-.}/.claude/my-plugin.local.md"
[ -f "$state" ] || exit 0

parse="${CLAUDE_PLUGIN_ROOT}/scripts/parse-frontmatter.sh"
enabled=$("$parse" "$state" enabled 2>/dev/null || echo "false")
[ "$enabled" = "true" ] || exit 0

mode=$("$parse" "$state" mode 2>/dev/null || echo "standard")
input=$(cat)
# ... use "$mode" and "$input" ...
exit 0
```

Without the helper, the minimal inline form is:

```bash
frontmatter=$(awk 'NR==1 && /^---$/ {f=1; next} f && /^---$/ {exit} f {print}' "$state")
mode=$(printf '%s\n' "$frontmatter" | sed -n 's/^mode: *//p' | head -n 1)
body=$(awk '/^---$/ {n++; next} n>=2' "$state")
```

The range expression `sed -n '/^---$/,/^---$/p'` seen in older examples also matches any later
`---` rules in the body. Stop at the second marker, as the awk above does.

### Rules for reading settings in scripts

- Exit 0 quickly when the file is missing or `enabled` is not `true`. Hooks run on every matching
  event, so the cheap path matters.
- Quote every expansion. Values come from a file a user can edit, so never pass one to `eval`, and
  never splice one into a command string unquoted.
- Validate values before use: allowlist the strings you accept, bound numbers, and fall back to a
  default for anything else.
- Read the file at run time, each time the hook fires, instead of caching it between events.
- Resolve the path from `${CLAUDE_PROJECT_DIR}`, not the current directory, since the working
  directory may change during a session.

## Reading it from commands and agents

A command or agent can read the file with the Read tool and apply it. Tell it exactly what to
do with a missing file:

```markdown
---
description: Process data using the project's plugin settings
allowed-tools: Read, Bash
---

1. Read `.claude/my-plugin.local.md`. If it does not exist, use defaults: mode standard.
2. Parse the YAML frontmatter and apply `mode` and `max_retries`.
3. Treat the Markdown body as extra project instructions.
```

Or inject it at command time with `` !`cat .claude/my-plugin.local.md 2>/dev/null` ``, so the
content is in the prompt before Claude starts.

## Writing it

Create the file from a setup command. Ask with `AskUserQuestion`, then write the answers as
frontmatter. Do not overwrite an existing file without asking.

```markdown
---
description: Create .claude/my-plugin.local.md interactively
allowed-tools: AskUserQuestion, Read, Write
---

If `.claude/my-plugin.local.md` exists, show it and ask whether to replace it.
Ask the user for mode (strict, standard, lenient) and whether the plugin should be enabled.
Write the file with those values as YAML frontmatter and a short Markdown body, then confirm the path.
Remind the user to add `.claude/*.local.md` to `.gitignore`.
```

## Common patterns

| Pattern | How |
|---------|-----|
| Opt-in hook | Register the hook always; it exits 0 unless `enabled: true`. Avoids editing `hooks.json`. See the flag-file pattern in `hooks.md`. |
| Mode switch | `mode: strict` vs `lenient` changes how a validator hook reacts. |
| Per-project allowlist | `allowed_extensions` or `ignore_paths` consumed by a hook. |
| Task state | A multi-step command records `step: 3` so a later session resumes. |
| Coordination between agents | Each agent's file names its role and the task it owns. Keep it simple; shared files can race. |

## Validating

```bash
scripts/validate-settings.sh .claude/my-plugin.local.md enabled mode
```

It checks that line 1 is `---`, the frontmatter is closed and non-empty, any listed keys exist,
and flags ambiguous YAML booleans (`yes`, `On`, `True`) that different parsers read differently.
Use lowercase `true` and `false`.

## Pitfalls

- Committing the file. It may contain personal paths or notes.
- Opening `---` not on line 1, which makes the whole file plain Markdown.
- Unquoted values with `:` or `#`, which break simple parsers. Quote them.
- Nested YAML read with `sed`. Keep it flat or use `jq` on a JSON file instead.
- Treating a missing file as a failure. Most users will not have one.
- Putting secrets in a file that may be shared by accident; use `userConfig` with `sensitive`.
