# Troubleshooting OpenCode Skills and Plugins

## Debug Workflow

Start here before diving into specific issues:

```
1. Check opencode.json is valid JSON (no trailing commas, no unknown keys)
2. Confirm the skill/plugin path actually exists
3. Restart opencode — config is not hot-reloaded
4. Verify the skill name in SKILL.md frontmatter matches how you invoke it
5. For plugins: check bun/node can parse the plugin file
```

---

## Problem: Skill Not Loading

### Symptoms
- Skill not available after starting opencode
- Agent doesn't know about the skill
- Invoking by name returns "skill not found"

### Causes and Fixes

**Wrong path**

Verify the skill is in one of these locations:
```
.opencode/skills/<name>/SKILL.md          # project-level
~/.config/opencode/skills/<name>/SKILL.md  # global
~/.agents/skills/<name>/SKILL.md           # external auto-load
~/.claude/skills/<name>/SKILL.md           # external auto-load
```

> ⚠️ `~/.opencode/skills/` is legacy — use `~/.config/opencode/skills/` for global skills.

**SKILL.md frontmatter malformed**

Frontmatter must be valid YAML between `---` delimiters at the very start of the file:

```markdown
---                     ← must be on line 1
name: skill-name
description: Use when ...
---

# Skill Name
```

Common mistakes: missing closing `---`, tabs instead of spaces, colons without quotes in values.

**Name mismatch**

The `name` field in SKILL.md must exactly match how you reference it. Names are case-sensitive.

**Config rejected by opencode**

If `opencode.json` has any invalid field, opencode refuses to start entirely. Check the startup logs.

```bash
# Validate JSON syntax
node -e "JSON.parse(require('fs').readFileSync('opencode.json','utf8'))" && echo "valid"
```

Unknown top-level keys cause `ConfigInvalidError`. Only use documented config fields.

---

## Problem: Skill Not Triggering

### Symptoms
- Agent doesn't auto-invoke the skill for relevant tasks
- Skill is loaded but never used

### Causes and Fixes

**Vague description**

The `description` field is too general. Rewrite following this pattern:

```yaml
# Bad
description: Helps with code

# Good
description: Use when writing database migrations — enforces safe migration patterns and rollback procedures
```

Rules:
- Lead with "Use when"
- Name the specific domain and action
- State the outcome

**Explicit invocation works but auto-invocation doesn't**

This is expected for niche skills. Not all skills should auto-trigger. For frequently-used skills, make the description match the natural language users use.

**AGENTS.md not listing the skill**

Even if auto-invocation is unreliable, listing the skill in AGENTS.md ensures the agent and user know it exists:

```markdown
## Available Skills

- `my-skill` — When to use it and what it provides
```

---

## Problem: Plugin Not Loading

### Symptoms
- Plugin tools not available in session
- Error at startup mentioning the plugin path

### Causes and Fixes

**Bun not installed**

OpenCode requires Bun for plugins. Install: `curl -fsSL https://bun.sh/install | bash`

**Plugin path doesn't exist**

```json
// opencode.json
{
  "plugin": ["/wrong/path/to/plugin.ts"]  // ← verify this path exists
}
```

Use absolute paths for local plugins. Relative paths are not supported in the `plugin` array.

**TypeScript syntax error**

```bash
# Check if bun can parse it
bun --print "import('./path/to/plugin.ts')" 2>&1
```

**Missing dependency**

For local plugins, put a `package.json` next to `plugin.ts` and run `bun install` in that directory. OpenCode does this automatically, but run it manually to surface errors:

```bash
cd /path/to/plugin && bun install
```

**Plugin function not default-exported**

```typescript
// ❌ Wrong — named export
export function myPlugin(ctx) { ... }

// ✅ Correct — default export
export default function myPlugin(ctx) { ... }
```

---

## Problem: opencode.json Rejected

### Symptoms
- OpenCode fails to start with `ConfigInvalidError`
- Error message mentions an unknown field

### Causes and Fixes

**Trailing comma in JSON**

```json
{
  "model": "anthropic/claude-sonnet-4-6",  // ← remove trailing comma
}
```

**Unknown key**

Every key in `opencode.json` is validated against the schema. Check allowed keys at `https://opencode.ai/config.json`.

**Wrong path for `$schema`**

Always use:
```json
{
  "$schema": "https://opencode.ai/config.json"
}
```

**Tip:** Run your IDE's JSON schema validation — the `$schema` field enables in-editor error checking.

---

## Problem: Config Changes Not Taking Effect

### Cause

opencode.json is read once at startup. There is no hot-reload.

### Fix

**Restart opencode** after any change to:
- `opencode.json`
- `SKILL.md` frontmatter (`name` or `description`)
- Plugin entry point
- `opencode.json` `instructions` paths

Skill content changes (body of SKILL.md, reference files) do take effect without restart because they're loaded lazily when invoked.

---

## Common Pitfalls Summary

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Skill in `~/.opencode/skills/` | Skill not loaded | Move to `~/.config/opencode/skills/` |
| Malformed frontmatter YAML | Skill not discovered | Fix YAML, ensure `---` on line 1 |
| Invalid JSON in opencode.json | Startup failure | Remove trailing commas, fix syntax |
| Unknown key in opencode.json | `ConfigInvalidError` | Use only documented fields |
| Plugin path is relative | Plugin not loaded | Use absolute path in `plugin` array |
| Plugin not default-exported | Plugin silently skipped | Use `export default function` |
| Vague skill description | Skill never auto-triggered | Lead with "Use when [specific trigger]" |
| Config change not restarted | Old behavior persists | Quit and restart opencode |

---

## Validating Your Setup

```bash
# 1. Validate opencode.json JSON syntax
node -e "JSON.parse(require('fs').readFileSync('opencode.json','utf8'))" && echo "✅ valid JSON"

# 2. Check skill frontmatter
head -5 .opencode/skills/my-skill/SKILL.md

# 3. Verify skill paths exist
ls ~/.config/opencode/skills/ 2>/dev/null || echo "no global skills dir"
ls ~/.agents/skills/ 2>/dev/null

# 4. For plugins: check bun is available
which bun || echo "bun not installed"

# 5. Test plugin syntax
cd /path/to/plugin && bun build plugin.ts --target=bun 2>&1 | head -20
```
