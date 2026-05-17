# Troubleshooting Plugin Development

## Plugin Not Loading

### Symptom
Plugin doesn't appear in `/plugin list` or components aren't available.

### Debug Steps

1. **Check plugin.json syntax**
   ```bash
   # Validate JSON
   cat .claude-plugin/plugin.json | jq .
   ```
   If this errors, you have invalid JSON.

2. **Verify directory structure**
   ```bash
   # Ensure .claude-plugin/ exists at plugin root
   ls -la .claude-plugin/
   # Should show plugin.json (required)
   ```

3. **Check all paths**
   - Search for hardcoded paths: `grep -r "/Users/" .claude-plugin/`
   - Should use `${CLAUDE_PLUGIN_ROOT}` instead
   - Relative paths in plugin.json must start with `./`

4. **Restart Claude Code**
   - Changes only take effect after restart
   - Exit and relaunch the application

5. **Check installation**
   ```bash
   /plugin list
   # Your plugin should appear here
   ```

### Common Causes

| Problem | Solution |
|---------|----------|
| `.claude-plugin/` missing | Create directory with `plugin.json` |
| Invalid JSON in `plugin.json` | Validate with `jq` or JSON linter |
| Hardcoded paths | Replace with `${CLAUDE_PLUGIN_ROOT}` |
| Forgot to restart | Always restart after install/changes |

---

## Skill Not Triggering

### Symptom
Skill exists but Claude doesn't use it when expected.

### Debug Steps

1. **Check YAML frontmatter format**
   ```markdown
   ---
   name: skill-name
   description: Use when [clear trigger] - [what it does]
   ---
   ```
   - Must have `---` delimiters
   - Must include `name` and `description`
   - No tabs, only spaces for indentation

2. **Verify description clarity**
   - Description should clearly state WHEN to use skill
   - Use "Use when..." format
   - Be specific about triggering conditions

   ❌ Bad: `description: A helpful skill`

   ✅ Good: `description: Use when debugging test failures - systematic approach to finding root causes`

3. **Test explicitly**
   Ask for a task that exactly matches the description:
   ```
   "I need to debug a test failure"
   # Should trigger systematic-debugging skill
   ```

4. **Check skill location**
   - Must be in `skills/skill-name/SKILL.md`
   - NOT in `.claude-plugin/skills/`

### Common Causes

| Problem | Solution |
|---------|----------|
| Vague description | Make description specific and action-oriented |
| Skill in wrong location | Move to `skills/` at plugin root |
| Missing frontmatter | Add YAML with name and description |
| Malformed YAML | Check for tabs, missing dashes, etc. |

---

## Command Not Appearing

### Symptom
Custom slash command doesn't show up or can't be executed.

### Debug Steps

1. **Verify location**
   ```bash
   ls -la commands/
   # Should show command-name.md files
   ```
   Commands must be at `commands/` in plugin root, NOT in `.claude-plugin/`

2. **Check markdown format**
   ```markdown
   ---
   description: Brief description of what this command does
   ---

   # Command Instructions

   Content here...
   ```

3. **Restart Claude Code**
   Commands are loaded at startup.

4. **Test directly**
   ```
   /your-command-name
   ```

### Common Causes

| Problem | Solution |
|---------|----------|
| Commands in `.claude-plugin/` | Move to `commands/` at root |
| Missing description frontmatter | Add YAML with description |
| No restart after adding | Restart Claude Code |
| Wrong file extension | Must be `.md` not `.txt` |

---

## MCP Server Not Starting

### Symptom
MCP server tools not available, or server fails silently.

### Debug Steps

1. **Verify path variables**
   All paths in MCP config must use `${CLAUDE_PLUGIN_ROOT}`:
   ```json
   {
     "mcpServers": {
       "my-server": {
         "command": "node",
         "args": ["${CLAUDE_PLUGIN_ROOT}/server/index.js"]
       }
     }
   }
   ```

2. **Check executable permissions**
   ```bash
   chmod +x server/index.js
   # Or for shell scripts:
   chmod +x bin/server.sh
   ```

3. **Test server independently**
   ```bash
   # Run server outside Claude Code to check for errors
   node ${PLUGIN_ROOT}/server/index.js
   ```

4. **Check logs**
   ```bash
   claude --debug
   # Look for MCP server startup errors
   ```

5. **Verify command exists**
   ```bash
   which node  # Or whatever command you're using
   ```

### Common Causes

| Problem | Solution |
|---------|----------|
| Hardcoded paths | Use `${CLAUDE_PLUGIN_ROOT}` |
| Not executable | `chmod +x` on scripts |
| Command not in PATH | Use full path or ensure command available |
| Server crashes on startup | Test independently, check logs |
| Missing dependencies | `npm install` or equivalent |

---

## Hooks Not Firing

### Symptom
Hook scripts exist but don't execute when events occur.

### Debug Steps

1. **Check hooks.json location**
   Must be at `hooks/hooks.json` in plugin root.

2. **Verify JSON format**
   ```bash
   cat hooks/hooks.json | jq .
   ```

3. **Check matcher syntax**
   ```json
   {
     "hooks": {
       "PostToolUse": [
         {
           "matcher": "Write|Edit",  // Regex - matches Write OR Edit
           "hooks": [...]
         }
       ]
     }
   }
   ```

4. **Verify script paths**
   ```json
   {
     "type": "command",
     "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format.sh"
   }
   ```

5. **Check script permissions**
   ```bash
   chmod +x scripts/format.sh
   ```

6. **Test script directly**
   ```bash
   # Run the hook script manually
   ./scripts/format.sh
   ```

### Common Causes

| Problem | Solution |
|---------|----------|
| Wrong hooks.json location | Move to `hooks/` at plugin root |
| Script not executable | `chmod +x` on all scripts |
| Invalid matcher regex | Test regex syntax |
| Script fails silently | Add error handling, test independently |
| Hardcoded paths | Use `${CLAUDE_PLUGIN_ROOT}` |

---

## Development Workflow Issues

### Loading Plugin for Local Testing

The recommended local dev workflow uses `--plugin-dir` — no marketplace setup needed:

```bash
claude --plugin-dir ./my-plugin
```

This loads the plugin directly from the local path for the session. To test a `.zip` archive (requires v2.1.128+):

```bash
claude --plugin-dir ./my-plugin.zip
```

### Changes Not Taking Effect

**Problem:** Modified plugin but changes don't appear.

For skill, agent, command, hook, and content changes, run `/reload-plugins` mid-session — no restart needed.

For MCP server or LSP server changes, a full restart is required.

If you're using the marketplace-based install approach and changes aren't showing after restart:

```bash
/plugin uninstall my-plugin@my-dev
# Fix issues
/plugin install my-plugin@my-dev
# Restart Claude Code
```

---

## Common Pitfalls Summary

| Mistake | Why It Fails | How to Fix |
| --- | --- | --- |
| Skills in `.claude-plugin/skills/` | Claude looks in `skills/` at root | Move to plugin root |
| Hardcoded absolute paths | Breaks on other systems | Use `${CLAUDE_PLUGIN_ROOT}` |
| MCP change, no restart | MCP servers load at startup | Full restart required for MCP/LSP |
| Script not executable | Shell can't run it | `chmod +x script.sh` |
| Invalid JSON | Parser fails silently | Run `claude plugin validate` or `jq` |
| Vague skill description | Claude doesn't know when to use it | Be specific about triggers |
| Missing YAML frontmatter | Metadata not parsed | Add `---` delimiters and fields |
| Skill change not visible | Stale in-session state | Run `/reload-plugins` |

---

## Debugging Workflow

When something isn't working:

1. **Run plugin validate first**

   ```bash
   claude plugin validate
   ```

   Or in-session: `/plugin validate`. Checks `plugin.json`, skill/agent/command frontmatter, and `hooks/hooks.json` for syntax and schema errors. This catches most structural problems instantly.

2. **Validate all JSON files manually**

   ```bash
   jq . .claude-plugin/plugin.json
   jq . hooks/hooks.json
   ```

3. **Check all paths use variables**

   ```bash
   grep -r "Users/" .
   # Should return nothing in config files
   ```

4. **Verify permissions**

   ```bash
   find . -name "*.sh" -o -name "*.js" | xargs ls -l
   # Check executable bit (x) is set
   ```

5. **Test components independently**
   - Run MCP servers directly
   - Execute hook scripts manually
   - Validate YAML frontmatter with a parser

6. **Check logs**

   ```bash
   claude --debug
   # Or write to a known path:
   claude --debug-file /tmp/claude.log
   ```

---

## Getting Help

If you're still stuck:

1. **Read official docs** via `working-with-claude-code` skill
2. **Check example plugins** in this repo and `~/.claude/plugins/`
3. **Simplify** - Remove components until it works, then add back one at a time
4. **Report issues** at https://github.com/anthropics/claude-code/issues

**Pro tip:** When asking for help, include:
- Your plugin.json
- Directory structure (`tree -L 3 -a`)
- Exact error messages
- What you've already tried
