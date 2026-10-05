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
  - /docs/cli/global-options
summary: Set up Model Context Protocol (MCP) usage with a Vercel project using the vercel mcp CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/mcp.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "c7274c10b64071828d832dfbbb548bd871710c7967a52b90bda0d59cbdc04779"
---

# vercel mcp

The `vercel mcp` command helps you set up MCP clients (Claude Code, Claude.ai and Claude for desktop, Cursor, and VS Code with Copilot) to use Vercel MCP, Vercel's hosted Model Context Protocol endpoint at `https://mcp.vercel.com`. For Claude Code, Cursor, and VS Code with Copilot, the command configures the client directly. For Claude.ai and Claude for desktop, it prints manual setup instructions for adding a custom connector.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel MCP: Connect Vercel to your AI tools](https://vercel.com/blog/introducing-vercel-mcp-connect-vercel-to-your-ai-tools?from=related&source_path=%2Fdocs%2Fcli%2Fmcp&source_site=vercel-docs&relationship=related)
- [Model Context Protocol](https://vercel.com/docs/mcp?from=related&source_path=%2Fdocs%2Fcli%2Fmcp&source_site=vercel-docs&relationship=related) — Learn more about MCP and how you can use it on Vercel.
- [Documentation and CLI](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation?from=related&source_path=%2Fdocs%2Fcli%2Fmcp&source_site=vercel-docs&relationship=related) — Vercel MCP tools for documentation and cli.
- [use_vercel_cli](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/use_vercel_cli?from=related&source_path=%2Fdocs%2Fcli%2Fmcp&source_site=vercel-docs&relationship=related) — Use use_vercel_cli with Vercel MCP.
- [Use Vercel](https://vercel.com/docs/agent-resources/vercel-mcp?from=related&source_path=%2Fdocs%2Fcli%2Fmcp&source_site=vercel-docs&relationship=related) — Vercel MCP has tools available for searching docs, managing teams, projects, and deployments, and querying Web Analytics
- [vercel setup](https://vercel.com/docs/cli/setup?from=related&source_path=%2Fdocs%2Fcli%2Fmcp&source_site=vercel-docs&relationship=related) — Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code and Codex, and connect your

Full cross-link map for this page: [/docs/cli/mcp.graph.md](/docs/cli/mcp.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fmcp&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

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

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel mcp` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--team`](/docs/cli/global-options#team)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)
