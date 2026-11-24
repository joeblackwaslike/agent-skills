# OpenCode Plugin Structure Reference

## Skills vs Plugins

OpenCode has two distinct extension mechanisms. Choose based on your need:

| | Skill | Plugin |
|-|-------|--------|
| **Format** | `SKILL.md` markdown | npm/Bun TypeScript package |
| **Purpose** | Instructions, workflows, domain knowledge | Tool integrations, external systems, infrastructure |
| **Complexity** | Minimal — just markdown | Moderate — npm package setup |
| **When to use** | 90% of cases | Connecting to databases, APIs, CI systems |
| **Distribution** | Git repo + symlink/URL | npm publish or local path |

---

## Plugin Package Structure

```
my-plugin/
├── package.json          # npm package manifest
├── plugin.ts             # main plugin entry point (TypeScript)
├── tsconfig.json         # optional — TypeScript config
└── README.md
```

### package.json

```json
{
  "name": "opencode-my-plugin",
  "version": "1.0.0",
  "description": "Brief description of what this plugin does",
  "type": "module",
  "main": "plugin.ts",
  "dependencies": {
    "@opencode-ai/plugin": "latest"
  }
}
```

### plugin.ts

```typescript
import type { Plugin } from "@opencode-ai/plugin"

export default function myPlugin(context: {
  project: {
    root: string      // project root directory
    git: {            // git info (if in a git repo)
      branch: string
      remote: string
    }
  }
  client: object      // OpenCode SDK client — call AI programmatically
  $: object           // Bun shell API — run shell commands
  directory: string   // current working directory
  worktree: string    // git worktree root
}): Plugin {
  return {
    // See Plugin Hooks section below
  }
}
```

---

## Plugin Hooks

The return value of your plugin function is an object with optional hook handlers:

```typescript
return {
  // Register custom tools that the AI can use
  tools: [
    {
      name: "my_tool",
      description: "What this tool does — the AI reads this to know when to use it",
      parameters: {
        type: "object",
        properties: {
          input: { type: "string", description: "The input to process" }
        },
        required: ["input"]
      },
      execute: async ({ input }) => {
        // Tool implementation
        return `Result: ${input}`
      }
    }
  ],

  // Hook into session lifecycle
  onSessionStart: async (session) => {
    // Runs when a new session begins
  },

  onSessionEnd: async (session) => {
    // Runs when a session ends
  },
}
```

---

## Installing a Plugin

### Local development plugin

For a plugin you're developing locally:

```json
// opencode.json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["/absolute/path/to/my-plugin/plugin.ts"]
}
```

### npm package plugin

For a published npm package:

```json
// opencode.json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-my-plugin"]
}
```

OpenCode runs `bun install` automatically and caches packages in `~/.cache/opencode/node_modules/`.

### Global plugin (always loaded)

Add to `~/.config/opencode/opencode.json`:
```json
{
  "plugin": ["/absolute/path/to/plugin.ts"]
}
```

---

## Dependencies

For local plugins (`/path/to/plugin.ts`), put dependencies in a `package.json` next to the plugin file. OpenCode's `bun install` picks these up automatically.

For npm plugins, list dependencies normally in `package.json` — they're installed when the plugin is first loaded.

---

## Plugin Development Tips

1. **Start minimal** — one tool, then expand
2. **Use TypeScript** — `@opencode-ai/plugin` ships full type definitions
3. **Tool descriptions are critical** — the AI reads them to decide when to use the tool; write them like skill descriptions: "Use when [specific trigger]"
4. **Test incrementally** — restart opencode after each significant change
5. **Log to stderr** — output to `process.stderr` for debugging without polluting session output

---

## Full Example: Database Query Plugin

```typescript
import type { Plugin } from "@opencode-ai/plugin"
import { createClient } from "@libsql/client"

export default function dbPlugin({ project }) {
  const db = createClient({
    url: process.env.DATABASE_URL || "file:./dev.db"
  })

  return {
    tools: [
      {
        name: "query_database",
        description: "Use when you need to read data from the project database — executes a read-only SQL query and returns results",
        parameters: {
          type: "object",
          properties: {
            sql: {
              type: "string",
              description: "SQL SELECT query to execute"
            }
          },
          required: ["sql"]
        },
        execute: async ({ sql }) => {
          if (!sql.trim().toUpperCase().startsWith("SELECT")) {
            throw new Error("Only SELECT queries are allowed")
          }
          const result = await db.execute(sql)
          return JSON.stringify(result.rows, null, 2)
        }
      }
    ]
  }
}
```

---

## Distribution

### Local/team distribution

Share as a git repo. Users add to their `opencode.json`:
```json
{
  "plugin": ["/path/to/cloned/repo/plugin.ts"]
}
```

### npm distribution

```bash
npm publish --access public
```

Users install with:
```json
{
  "plugin": ["your-plugin-package-name"]
}
```

### Versioning

Use semver. Breaking changes (tool signature changes, removed tools) → major version bump.
