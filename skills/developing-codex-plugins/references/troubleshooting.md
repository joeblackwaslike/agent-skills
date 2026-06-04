# Troubleshooting Codex Plugins

## Debug Workflow

Start here before diving into specific issues:

```
1. Validate JSON syntax in plugin.json (and hooks.json if present)
2. Check all referenced paths actually exist
3. Test the skill in isolation with explicit invocation: skill("name")
4. Check AGENTS.md is at plugin root and readable
5. Verify hook scripts are executable (chmod +x)
```

---

## Problem: Plugin Not Loading

### Symptoms
- Skills not available after `codex --plugin-dir ./my-plugin`
- `plugin.json` fields not being respected

### Causes and Fixes

**JSON syntax error in plugin.json**

```bash
# Validate JSON
node -e "require('./my-plugin/.codex-plugin/plugin.json')"
# If it throws, fix the syntax error it reports
```

Common JSON mistakes:
- Trailing commas after last item in object/array
- Single quotes instead of double quotes
- Missing closing brace/bracket

**Wrong plugin directory path**

```bash
# The --plugin-dir argument must point to the plugin ROOT, not .codex-plugin/
codex --plugin-dir ./my-plugin         # ✅ correct
codex --plugin-dir ./my-plugin/.codex-plugin  # ❌ wrong
```

**`name` field missing**

`plugin.json` requires at minimum `{"name": "your-plugin-name"}`. Everything else is optional.

**`skills` field points to wrong path**

```json
// ❌ Absolute path — breaks on other machines
{"skills": "/Users/me/my-plugin/skills/"}

// ✅ Relative path from plugin root
{"skills": "./skills/"}
```

---

## Problem: Skill Not Triggering

### Symptoms
- Codex doesn't auto-invoke the skill for relevant tasks
- `skill("name")` returns "skill not found" or similar error

### Causes and Fixes

**Skill not found by `skill("name")`**

Check the `name` field in `SKILL.md` frontmatter exactly matches what you're invoking:

```markdown
---
name: my-skill-name   ← this must match skill("my-skill-name")
description: ...
---
```

**Skills directory not registered**

Verify `plugin.json` has a `skills` field pointing to the right directory:

```json
{
  "name": "my-plugin",
  "skills": "./skills/"   ← required for Codex to scan this directory
}
```

Then verify the directory exists and contains properly structured skill directories:
```
skills/
└── my-skill-name/       ← directory name should match skill name
    └── SKILL.md
```

**Skill not auto-triggering (explicit invocation works)**

The `description` field is too vague. See `skills-for-codex.md` for how to write triggering descriptions. Quick fix: start the description with "Use when [specific action] — [specific outcome]".

**SKILL.md frontmatter malformed**

Frontmatter must be valid YAML between `---` delimiters at the very start of the file:

```markdown
---                         ← must be on line 1
name: skill-name
description: Use when ...
---

# Skill Name
```

---

## Problem: Hooks Not Firing

### Symptoms
- Hook scripts don't run when expected events occur
- No output or side effects from hooks

### Causes and Fixes

**hooks.json not referenced in plugin.json**

Add the hooks field:
```json
{
  "name": "my-plugin",
  "hooks": "./hooks/hooks.json"
}
```

**hooks.json JSON syntax error**

```bash
node -e "require('./my-plugin/hooks/hooks.json')"
```

**Hook script not executable**

```bash
ls -la hooks/
# If scripts show -rw-r--r-- instead of -rwxr-xr-x, fix with:
chmod +x hooks/*.sh
```

**Wrong event name**

Valid hook events (case-sensitive):
- `SessionStart`
- `SessionEnd`
- `PreToolUse`
- `PostToolUse`
- `PostFileWrite`

**Matcher regex not matching**

Test your matcher regex independently:

```bash
# Test if your regex matches target files
node -e "console.log(/\\.ts\$|\\.tsx\$/.test('myfile.ts'))"
```

---

## Problem: AGENTS.md Not Loading

### Symptoms
- Session starts without showing plugin context
- Users don't see available skills listed

### Causes and Fixes

**Wrong file location**

`AGENTS.md` must be at the **plugin root**, not inside `.codex-plugin/`:

```text
my-plugin/
├── .codex-plugin/
│   └── plugin.json
├── AGENTS.md          ← correct location
└── skills/
```

**File encoding issue**

Ensure AGENTS.md is UTF-8 encoded plain text:
```bash
file my-plugin/AGENTS.md
# Should show: ASCII text or UTF-8 Unicode text
```

**File too large**

Keep AGENTS.md concise. If it's over ~2KB, trim it — it's session context, not a manual. Move detailed content into skill reference files.

---

## Common Pitfalls Summary

| Mistake | Symptom | Fix |
|---------|---------|-----|
| `--plugin-dir` points to `.codex-plugin/` | Plugin not loading | Point to plugin root instead |
| Trailing comma in JSON | Plugin/hooks not loading | Remove trailing comma |
| `skills` field missing from `plugin.json` | Skills not discovered | Add `"skills": "./skills/"` |
| Hook script not executable | Hook silently skipped | `chmod +x hooks/*.sh` |
| `name` in SKILL.md ≠ invocation argument | `skill()` not found | Match name exactly, no spaces |
| AGENTS.md inside `.codex-plugin/` | Context not loaded | Move to plugin root |
| Vague skill description | Skill never auto-invoked | Start with "Use when [specific trigger]" |
| Absolute path in plugin.json | Breaks on other machines | Use `./relative/path` |

---

## Validating Your Plugin

Quick sanity check before testing:

```bash
# 1. Validate plugin.json
node -e "const p = require('./.codex-plugin/plugin.json'); console.log('name:', p.name, '| skills:', p.skills || 'not set')"

# 2. Validate hooks.json if present
node -e "const h = require('./hooks/hooks.json'); console.log('hooks:', Object.keys(h.hooks || {}).join(', '))"

# 3. Check all skill SKILL.md files have required frontmatter
grep -l "^name:" skills/*/SKILL.md

# 4. Check hook scripts are executable
ls -la hooks/*.sh 2>/dev/null | grep -v "^-..x" | grep "\.sh$" && echo "WARNING: some scripts not executable"

# 5. Check AGENTS.md exists at root
ls -la AGENTS.md 2>/dev/null || echo "Note: no AGENTS.md (add one for multi-skill plugins)"
```

If all checks pass, load with `codex --plugin-dir .` and test by invoking `skill("your-skill-name")` explicitly.
