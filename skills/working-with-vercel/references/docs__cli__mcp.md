---
title: vercel mcp
product: vercel
url: /docs/cli/mcp
canonical_url: "https://vercel.com/docs/cli/mcp"
last_updated: 2026-05-29
type: reference
prerequisites:
  - /docs/cli
related:
  []
summary: Set up Model Context Protocol (MCP) usage with a Vercel project using the vercel mcp CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/mcp.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "bbfbb694367cdee00e7b8e2f20da2fc3f355d5386a48e80716ad28fde2cfd21c"
---

# vercel mcp

The `vercel mcp` command helps you set up MCP clients (Claude Code, Claude.ai and Claude for desktop, Cursor, and VS Code with Copilot) to use Vercel MCP, Vercel's hosted Model Context Protocol endpoint at `https://mcp.vercel.com`. For Claude Code, Cursor, and VS Code with Copilot, the command configures the client directly. For Claude.ai and Claude for desktop, it prints manual setup instructions for adding a custom connector.

By default, clients are pointed at the shared endpoint. With `--project`, they're pointed at a project-specific URL (`https://mcp.vercel.com/<org>/<project>`) so the MCP session is scoped to the linked Vercel Project.

The command does not deploy any MCP server of your own. It only adjusts the client-side configuration on your machine.

## Usage

```bash filename="terminal"
vercel mcp [options]
```

*Using the \`vercel mcp\` command to configure local MCP clients to use Vercel
MCP.*

By default, `vercel mcp` runs an interactive picker that lets you choose which MCP clients to set up. In non-interactive environments such as CI, you must pass `--clients` to skip the picker.

## Examples

### Interactively set up MCP clients

```bash filename="terminal"
vercel mcp
```

*Launches the interactive client picker.*

### Set up specific clients without prompts

```bash filename="terminal"
vercel mcp --clients "Cursor,VS Code with Copilot"
```

*Configures the listed MCP clients without launching the interactive picker.
Required in non-interactive environments.*

### Initialize project-specific MCP access

```bash filename="terminal"
vercel mcp --project
```

*Sets up project-specific MCP access for the currently linked Vercel Project.*

## Unique options

These are options that only apply to the `vercel mcp` command.

### Clients

The `--clients` option accepts a comma-separated list of MCP clients to set up. In interactive mode, it skips the client picker. In non-interactive mode (for example, CI), `--clients` is required.

Supported values:

- `Claude Code`
- `Claude.ai and Claude for desktop`
- `Cursor`
- `VS Code with Copilot`

```bash filename="terminal"
vercel mcp --clients "Cursor,VS Code with Copilot"
```

*Using \`--clients\` to set up Cursor and VS Code with Copilot without prompts.*

> **💡 Note:** In non-interactive mode without `--clients`, `vercel mcp` fails with a
> `missing_clients` error.

### Project

The `--project` option sets up project-specific MCP access for the currently linked project instead of global configuration.

```bash filename="terminal"
vercel mcp --project
```

*Use the \`--project\` flag to configure MCP access scoped to your linked project.*


---

[View full sitemap](/docs/sitemap)
