# Troubleshooting Gemini CLI Extensions & Antigravity Plugins

## Debug Workflow

Start here before diving into specific issues:

```
1. Run gemini doctor (or agy doctor) — validates the full installation
2. Validate JSON syntax in gemini-extension.json / plugin.json
3. Check that manifest "name" matches the install directory name
4. Test skill in isolation: activate_skill("skill-name")
5. Check GEMINI.md is at plugin root and well-formed
6. Verify hook scripts are executable (chmod +x)
```

---

## Problem: Extension/Plugin Not Loading

### Symptoms
- Skills from the extension aren't available
- GEMINI.md context doesn't appear at session start
- `gemini extensions list` / `agy plugin list` doesn't show the plugin

### Causes and Fixes

**Manifest name doesn't match install directory**

This is the most common cause of silent failures.

```bash
# If gemini-extension.json has "name": "my-plugin",
# the extension must be installed at:
# ~/.gemini/extensions/my-plugin/  (exact match, case-sensitive)
```

When installing from a git repo, Gemini uses the `name` field to determine the directory. If you rename a plugin after installation, you must reinstall:
```bash
gemini extensions uninstall old-name
gemini extensions install https://github.com/org/my-plugin
```

**JSON syntax error in manifest**

```bash
node -e "require('./gemini-extension.json')"
node -e "require('./plugin.json')"
# Fix any errors reported
```

Common mistakes: trailing commas, single quotes, mismatched braces.

**Wrong extension root when installing with --path**

```bash
# Point to the directory that CONTAINS gemini-extension.json
gemini extensions install --path=./my-plugin   # ✅ plugin root
gemini extensions install --path=./my-plugin/.gemini-plugin  # ❌ wrong
```

**Extension not refreshed after changes**

Gemini CLI caches extension content. After making changes:
```bash
gemini extensions uninstall my-plugin
gemini extensions install --path=./my-plugin
# Or for git-based:
gemini extensions update my-plugin
```

---

## Problem: Skill Not Triggering

### Symptoms
- `activate_skill("name")` returns "skill not found"
- Gemini doesn't auto-invoke the skill for relevant tasks

### Causes and Fixes

**Skill not found by `activate_skill("name")`**

Verify the `name` field in SKILL.md frontmatter exactly matches the invocation string:
```markdown
---
name: my-skill-name   ← must match activate_skill("my-skill-name") exactly
description: ...
---
```

**Skills directory not in the extension**

Skills must be in a `skills/` directory inside the extension root:
```text
my-plugin/
└── skills/
    └── my-skill-name/   ← directory name should match skill name
        └── SKILL.md
```

**Skill not auto-triggering (explicit invocation works fine)**

The `description` is too vague. Gemini uses it for auto-invocation decisions.

Quick fix: rewrite the description to start with "Use when [specific action] — [specific value]".

See `skills-for-gemini.md` for the full guidance on trigger-reliable descriptions.

**Workspace skill not found after Antigravity migration**

Move workspace skills from the old path to the new one:
```bash
mv .gemini/skills/ .agents/skills/
```

Both `.gemini/skills/` and `.agents/skills/` are recognized in Antigravity, but `.agents/` is the canonical path going forward.

**SKILL.md frontmatter malformed**

Frontmatter must be valid YAML between `---` delimiters at the very first line:
```markdown
---                       ← line 1
name: skill-name
description: Use when ...
---

# Skill Name
```

---

## Problem: GEMINI.md Not Loading

### Symptoms
- Session starts without showing plugin context
- Users don't see available skills listed at session start

### Causes and Fixes

**Wrong file location**

GEMINI.md must be at the extension root — the same level as `gemini-extension.json`:
```text
my-plugin/
├── gemini-extension.json
├── GEMINI.md          ← correct (plugin root)
└── skills/
    └── GEMINI.md      ← WRONG — not loaded
```

**contextFileName mismatch**

If `gemini-extension.json` has `"contextFileName": "CONTEXT.md"` but the file is named `GEMINI.md`, it won't load. Either match the field or omit it (default is `GEMINI.md`).

**File is too large**

Gemini CLI loads GEMINI.md as session context — it counts against your context budget. Keep it under 2KB. Move detailed content into skill reference files.

**AGENTS.md used instead of GEMINI.md but contextFileName not set**

AGENTS.md works in Gemini CLI, but you need to set `"contextFileName": "AGENTS.md"` in the manifest. Or rename the file to `GEMINI.md`.

---

## Problem: Hooks Not Firing

### Symptoms
- Hook scripts don't run on relevant events
- No side effects after file writes or session events

### Causes and Fixes

**Hook script not executable**

```bash
ls -la hooks/
# Scripts need -rwxr-xr-x permission
chmod +x hooks/*.sh
# Commit the permission:
git update-index --chmod=+x hooks/on-write.sh
```

**hooks.json structure incorrect**

```bash
node -e "require('./hooks/hooks.json')"
```

Valid structure (verify event names against `docs-writing-hooks.md`):
```json
{
  "hooks": {
    "after_tool": {
      "write_file": ["./hooks/after-write.sh"]
    },
    "session_start": ["./hooks/session-start.sh"]
  }
}
```

**Hook event names are wrong**

Gemini CLI and Antigravity use lowercase underscore format (`after_tool`, `session_start`). These are different from Claude Code hook names (`PostToolUse`, `SessionStart`). Check the official `docs-writing-hooks.md` for the canonical list.

---

## Problem: MCP Server Not Starting

### Symptoms
- MCP tools not available in session
- Extension loads but the server's tools are missing

### Causes and Fixes

**Server command path is wrong**

MCP server paths in `args` are relative to the extension install directory, not the manifest location:
```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["server/index.js"]   ← relative to ~/.gemini/extensions/my-plugin/
    }
  }
}
```

When testing with `--path`, the path is relative to the local plugin directory. Test from the installed location to confirm.

**Environment variable not configured**

If the server requires `settings` variables, Gemini prompts for them at install time. If skipped, re-run the install or configure via `gemini extensions configure my-plugin`.

---

## Antigravity Migration Footguns

**`agy plugin import gemini` doesn't import skills**

The import command copies extension manifests but not workspace skills. Move workspace skills manually:
```bash
mv .gemini/skills/ .agents/skills/
```

**Extension imported but skills still at old path**

After `agy plugin import gemini`, the plugin is now under `~/.gemini/antigravity-cli/plugins/`, but its bundled skills are included. User-level skills at `~/.gemini/skills/` are NOT automatically migrated — move them:
```bash
cp -r ~/.gemini/skills/* ~/.gemini/antigravity-cli/skills/
# or use the shared alias:
# ~/.agents/skills/ is recognized by both tools
```

**GEMINI.md not loading in Antigravity after migration**

Antigravity looks for GEMINI.md in the plugin directory. After `agy plugin import gemini`, verify:
```bash
ls ~/.gemini/antigravity-cli/plugins/my-plugin/GEMINI.md
```
If missing, copy it manually or reinstall from source.

**Hook event names differ between platforms**

Gemini CLI and Antigravity CLI may have slightly different hook event names. If hooks worked in Gemini but not Antigravity, check `agy docs hooks` for the Antigravity-specific event list.

---

## Common Pitfalls Summary

| Mistake | Symptom | Fix |
| --- | --- | --- |
| Manifest `name` ≠ install dir | Extension silently broken | Match exactly: `"name"` in JSON = directory name |
| Skills in wrong path (Antigravity) | `activate_skill` not found | Use `.agents/skills/`, not `.gemini/skills/` |
| GEMINI.md not at plugin root | Context not loaded | Move to same level as manifest |
| Hook scripts not executable | Hooks silently skip | `chmod +x` + commit |
| Wrong hook event names | Hooks never fire | Check docs-writing-hooks.md for canonical names |
| `skill()` syntax in GEMINI.md | Works in Codex, not Gemini | Use `activate_skill()` in GEMINI.md |
| Stale extension cache | Old version still running | Uninstall + reinstall |
| Workspace skills not migrated | Missing after `agy plugin import gemini` | `mv .gemini/skills/ .agents/skills/` |

---

## Validation Checklist

Quick checks before testing:

```bash
# 1. Validate manifests
node -e "const m = require('./gemini-extension.json'); console.log('name:', m.name)"
node -e "const m = require('./plugin.json'); console.log('name:', m.name)"

# 2. Check skill SKILL.md frontmatter
grep -l "^name:" skills/*/SKILL.md

# 3. Check hook scripts are executable
find hooks -name "*.sh" ! -perm -u+x 2>/dev/null && echo "WARNING: non-executable hook scripts"

# 4. Check GEMINI.md exists at root
ls GEMINI.md 2>/dev/null || echo "Note: no GEMINI.md — add one for multi-skill plugins"

# 5. Validate install
gemini doctor
# or:
agy doctor
```
