# MCP Integration in Plugins

Adapted from plugin-dev (Apache-2.0), anthropics/claude-plugins-official. Corrected against the
current docs in `working-with-claude-code/references/mcp.md` and `plugins-reference.md`.

A plugin can bundle MCP servers so installing the plugin gives Claude their tools. The servers
start when the plugin is enabled. Users add and remove them by installing or uninstalling the
plugin, not with `claude mcp add`, though they can toggle one off in `/mcp`.

## Where to define servers

Two options. Pick one per plugin to keep things readable.

1. `.mcp.json` at the plugin root (recommended for more than one server, easy to diff).
2. An inline `mcpServers` object in `.claude-plugin/plugin.json`. The manifest key may also be a path
   string or array pointing at other config files.

```json
{
  "mcpServers": {
    "database-tools": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
      "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"],
      "env": { "DB_URL": "${DB_URL}" }
    }
  }
}
```

The same `mcpServers` object works in either place. When several sources define servers, they
combine under their own merge rules (see "Path behavior rules" in `plugins-reference.md`), so do
not define the same server in two places.

## Transports

| Transport | `type` | Required | Use for |
|-----------|--------|----------|---------|
| stdio | omit, or `"stdio"` | `command`, optional `args`, `env` | Local processes, bundled servers, tools needing filesystem access |
| HTTP | `"http"` (alias `"streamable-http"`) | `url`, optional `headers` | Remote servers. The recommended remote transport, and the one that supports OAuth |
| SSE | `"sse"` | `url`, optional `headers` | Deprecated. Only for services that offer nothing else |
| WebSocket | `"ws"` | `url`, optional `headers`, `headersHelper` | Servers that push events to Claude. Header auth only, no OAuth |

An entry with a `url` but no `type` is a configuration error. Claude Code reads an entry with no
`type` as stdio, skips it, and reports `has a "url" but no "type"`. Always set `type` on remote
servers.

### stdio

```json
{
  "mcpServers": {
    "local-search": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/servers/search.js"],
      "env": { "INDEX_DIR": "${CLAUDE_PLUGIN_DATA}/index" }
    }
  }
}
```

- Claude Code sets `CLAUDE_PROJECT_DIR` in the spawned server's environment, so the server can
  resolve project paths without depending on its working directory.
- Shutdown is `SIGINT`, then `SIGTERM` after 100 ms, then `SIGKILL` after another 400 ms, so save
  state quickly.
- Use `npx -y pkg` style commands carefully. A cold download delays startup, and a failed stdio
  connection is not retried for 15 minutes ("skipping connection, recent failure cached").
- Put binaries and dependencies under `${CLAUDE_PLUGIN_ROOT}` (read-only install) or
  `${CLAUDE_PLUGIN_DATA}` (writable, survives updates). Make scripts executable.

### HTTP and SSE

```json
{
  "mcpServers": {
    "asana": { "type": "http", "url": "https://mcp.asana.com/mcp" },
    "internal-api": {
      "type": "http",
      "url": "${API_BASE_URL:-https://api.example.com}/mcp",
      "headers": { "Authorization": "Bearer ${INTERNAL_API_TOKEN}" }
    }
  }
}
```

For a service that only exposes SSE, configure it as `http` first. Claude Code tries HTTP and falls
back to SSE automatically on v2.1.265 and later. Set `"type": "sse"` only on older versions.

### WebSocket

```json
{
  "mcpServers": {
    "events": {
      "type": "ws",
      "url": "wss://mcp.example.com/socket",
      "headers": { "Authorization": "Bearer ${EVENTS_TOKEN}" }
    }
  }
}
```

## Environment variables and placeholders

Two kinds of substitution apply.

| Syntax | Resolved from | Where |
|--------|---------------|-------|
| `${CLAUDE_PLUGIN_ROOT}` | plugin install directory | stdio `command`/`args`/`env`; remote `url`/`headers`/`headersHelper` |
| `${CLAUDE_PLUGIN_DATA}` | persistent plugin data directory | same places |
| `${CLAUDE_PROJECT_DIR}` | stable project root | same places |
| `${VAR}` | the user's shell environment | `command`, `args`, `env`, `url`, `headers` |
| `${VAR:-default}` | environment, with fallback | same |
| `${user_config.KEY}` | value the user entered for a `userConfig` option | MCP and LSP configs |

An unset `${VAR}` without a default does not stop the config loading. Claude Code warns in
`claude mcp list` and passes the literal `${VAR}` text through, so give every optional variable a
`:-default`.

Credential variables read as empty in remote `url` and `headers`. This covers Claude Code's own
credentials (`ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`), cloud provider credentials, and others such
as `NPM_TOKEN`, so a plugin cannot forward them to a server. `Bearer ${ANTHROPIC_AUTH_TOKEN}` sends
`Bearer ` with no credential. To pass one on purpose, copy it into a variable you name yourself.

For secrets the user should enter once, declare a `userConfig` option with `"sensitive": true` in
`plugin.json`. Claude Code prompts at enable time, stores it in secure storage, and substitutes
`${user_config.KEY}`. The `headersHelper` field rejects `${user_config.*}`; read the value from a
config file in the helper script.

## Authentication

| Method | How |
|--------|-----|
| OAuth 2.0 | Add an HTTP server with no auth header. Claude Code flags it as needing authentication on a 401 or 403. The user runs `/mcp`, picks the server, and signs in through the browser. Tokens are stored and refreshed automatically. |
| OAuth from the shell | `claude mcp login <name>` (needed before `claude -p` or SDK runs, which cannot open the flow) |
| Static token | `headers` with `${ENV_VAR}` or `${user_config.KEY}` |
| Dynamic token | `headersHelper`, a command that prints headers at connect time |
| Environment | `env` for stdio servers |

If you configure an `Authorization` header and the server rejects it, Claude Code reports a failed
connection instead of falling back to OAuth. Remove the header to use OAuth. Never put a token
literal in the plugin. Document which variables or `userConfig` options a user must set.

## Tool naming

Plugin MCP tools are named `mcp__plugin_<plugin-name>_<server-name>__<tool-name>`. Any character
outside `A-Z a-z 0-9 _ -` becomes `_`. The server registers as `plugin:<plugin>:<server>`.

For `database-tools` in plugin `my-plugin`, the `query` tool is:

```
mcp__plugin_my-plugin_database-tools__query
```

Use that full name everywhere a tool is named: permission rules, a skill or command
`allowed-tools`, an agent's `tools`, and hook matchers. A hook matcher written against the bare key
(`mcp__database-tools__.*`) never fires for a plugin server. In a command or skill, list the
specific tools:

```yaml
allowed-tools: mcp__plugin_my-plugin_database-tools__query mcp__plugin_my-plugin_database-tools__list_tables
```

In an agent, `tools` also accepts a whole-server entry:

```yaml
tools: Read, mcp__plugin_my-plugin_database-tools__*
```

Prefer specific tools over a wildcard when the server has write tools.

## Lifecycle

- Servers connect at session start for enabled plugins. A used-before remote server can show
  `cached` in `/mcp` and connect on first tool call.
- Changes to `.mcp.json` or `plugin.json` do not apply live. Run `/reload-plugins` in an
  interactive session, or restart. Servers whose config did not change keep their connections.
  In a non-interactive session `/reload-plugins` does not connect or disconnect servers.
- `claude mcp get` redacts the command, args, env, and headers of plugin stdio and WebSocket
  servers because they can hold credentials. Read the plugin's `.mcp.json` to see them.

## Choosing a design

| Situation | Choice |
|-----------|--------|
| Third-party SaaS with an MCP endpoint | HTTP server, OAuth, no secrets in the plugin |
| Your own tool that needs local files | stdio, bundled under `${CLAUDE_PLUGIN_ROOT}` |
| Several related tools | One server with several tools, and a skill that teaches Claude when to use each |
| Needs a user-supplied key | `userConfig` with `sensitive: true` |

Pair every bundled server with a skill or command that explains the workflow. Tools alone do not
tell Claude when or in what order to call them.

## Testing

1. `claude --plugin-dir ./my-plugin`, then `/mcp` to confirm the server appears with a plugin
   indicator and a connected state.
2. If it fails, `claude --debug` shows connection errors. Run the server command by hand with the
   same arguments to see its own errors.
3. Call one tool from a command and check the full scoped name in the transcript.
4. `claude plugin validate ./my-plugin` for manifest errors.

## Pitfalls

- Remote server without `type`.
- Hardcoded absolute paths instead of `${CLAUDE_PLUGIN_ROOT}`.
- A hook matcher or `allowed-tools` rule using the unscoped `mcp__server__` name.
- Token literals in `.mcp.json`.
- Expecting a config change to take effect without `/reload-plugins`.
- Referencing a credential-named variable in a remote `url` or `headers`.
