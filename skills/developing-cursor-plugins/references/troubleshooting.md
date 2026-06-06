# Cursor Plugin Troubleshooting

## Plugin Not Loading

**Symptom**: Plugin doesn't appear in Cursor Settings > Plugins, or components (rules, skills) aren't available.

**Root cause / Fix**:

1. **Wrong symlink path**: The local plugin must be in `~/.cursor/plugins/local/`.
   ```bash
   ls -la ~/.cursor/plugins/local/
   # Should show your plugin symlink
   ln -s $(pwd)/my-plugin ~/.cursor/plugins/local/my-plugin
   ```

2. **Missing `plugin.json`**: Must be at `.cursor-plugin/plugin.json` relative to plugin root.
   ```bash
   ls my-plugin/.cursor-plugin/plugin.json
   ```

3. **Invalid JSON in `plugin.json`**: Parse errors silently prevent loading.
   ```bash
   node -e "require('./my-plugin/.cursor-plugin/plugin.json')"
   # Should print nothing (no error)
   ```

4. **Reload not done**: After symlinking, run `Developer: Reload Window` in command palette.

---

## Rules Not Applying

**Symptom**: A `.mdc` rule exists but the AI doesn't seem to follow it.

**Root cause / Fix**:

1. **Wrong file extension**: Rules must be `.mdc`, not `.md`.
   ```bash
   ls .cursor/rules/      # Should show *.mdc files
   mv .cursor/rules/my-rule.md .cursor/rules/my-rule.mdc
   ```

2. **`alwaysApply: false` with no `globs` or `description`**: This is a manual-only rule — invoke it with `@rule-name` in chat.

3. **Glob pattern not matching**: Test your glob pattern.
   ```bash
   # Test if a file matches the pattern
   node -e "const g = require('glob'); console.log(g.sync('src/**/*.tsx').slice(0, 5))"
   ```
   Common mistake: `src/*.tsx` doesn't match `src/components/Button.tsx` — use `src/**/*.tsx`.

4. **Always-on rule too long**: Rules with `alwaysApply: true` over ~200 words may be truncated. Condense content.

5. **Rule conflicts**: Two rules giving contradictory instructions. The later-loaded rule wins; consolidate or make one take precedence.

---

## Skills Not Discoverable

**Symptom**: `/skill-name` doesn't autocomplete or the agent doesn't find the skill.

**Root cause / Fix**:

1. **Missing or malformed `SKILL.md`**: Each skill directory must have a `SKILL.md` with valid YAML frontmatter.
   ```bash
   cat skills/my-skill/SKILL.md
   # Should start with --- and have name: and description: fields
   ```

2. **Poor `description` field**: If the description doesn't match user intent, the agent won't select it. Make it specific and actionable.

3. **Plugin not active**: Confirm plugin is loaded (see "Plugin Not Loading" above).

---

## MCP Server Not Connecting

**Symptom**: MCP tools aren't available in agent context, or connection errors appear.

**Root cause / Fix**:

1. **Missing `mcp.json`**: Check config location — either `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global).

2. **Server binary not found**: Ensure the command/binary exists.
   ```bash
   which npx       # for npx-based servers
   which node      # for node-based servers
   ```

3. **Wrong `cwd`**: Some servers need to run from a specific directory. Add `cwd` to the config:
   ```json
   {
     "mcpServers": {
       "my-server": {
         "command": "node",
         "args": ["server.js"],
         "cwd": "/absolute/path/to/server"
       }
     }
   }
   ```

4. **Too many tools**: Cursor supports up to 40 MCP tools. If you have multiple servers, some tools may be dropped. Prioritize the most important servers.

5. **Auth not set**: Many servers require env vars. Add them to the config:
   ```json
   { "env": { "API_KEY": "your-key" } }
   ```

---

## Hook Not Firing

**Symptom**: Hook script doesn't run on the expected event.

**Root cause / Fix**:

1. **Invalid `hooks.json` format**: Check the JSON structure matches the expected schema.
   ```json
   {
     "hooks": {
       "SessionStart": [
         { "command": "node", "args": ["${CURSOR_PLUGIN_ROOT}/hooks/on-start.js"] }
       ]
     }
   }
   ```

2. **Script not executable**: For shell scripts, ensure they're executable.
   ```bash
   chmod +x hooks/my-hook.sh
   ```

3. **Wrong event name**: Check the exact event name in Cursor docs — event names are case-sensitive.

4. **Path variable not resolving**: Use `${CURSOR_PLUGIN_ROOT}` for paths relative to the plugin, not hardcoded paths.

---

## General Debug Steps

1. **Check Cursor's developer console**: `Help > Toggle Developer Tools > Console` — plugin load errors appear here.

2. **Validate all JSON files**:
   ```bash
   node -e "require('./.cursor-plugin/plugin.json'); console.log('OK')"
   node -e "require('./hooks/hooks.json'); console.log('OK')"
   ```

3. **Check installed plugin state**:
   ```bash
   ls ~/.cursor/plugins/
   ls ~/.cursor/plugins/local/
   ```

4. **Hard reset**: Remove and re-symlink the plugin, then reload.
   ```bash
   rm ~/.cursor/plugins/local/my-plugin
   ln -s $(pwd)/my-plugin ~/.cursor/plugins/local/my-plugin
   # Then: Developer: Reload Window
   ```

5. **Simplify and re-add**: Remove all components, confirm plugin loads, then add components one at a time until the issue reproduces.
