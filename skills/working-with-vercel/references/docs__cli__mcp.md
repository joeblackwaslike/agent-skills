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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "69245a1b78b0174a3f6fbd7b6ee00512eb28b3e5bfd32b0a8edd1c5ecad105d6"
---

# vercel mcp

The `vercel mcp` command helps you set up MCP clients (Claude Code, Claude.ai and Claude for desktop, Cursor, and VS Code with Copilot) to use Vercel MCP, Vercel's hosted Model Context Protocol endpoint at `https://mcp.vercel.com`. For Claude Code, Cursor, and VS Code with Copilot, the command configures the client directly. For Claude.ai and Claude for desktop, it prints manual setup instructions for adding a custom connector.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build a ChatGPT Connector \(MCP server\)](https://vercel.com/kb/guide/mcp-server-chatgpt-connector?from=related) — Create an MCP server to bring your tools and data to ChatGPT
- [How to build an MCP server with Nuxt](https://vercel.com/kb/guide/how-to-build-an-mcp-server-with-nuxt?from=related) — Add an MCP server to your Nuxt app with the Nuxt MCP Toolkit. Create tools, resources, and prompt templates that AI assi
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express?from=related) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [How to create a contentful asset on Vercel](https://vercel.com/kb/guide/how-to-create-a-contentful-asset-on-vercel?from=related) — This is my wonderful
- [Using xmcp with Next.js](https://vercel.com/kb/guide/using-xmcp-with-nextjs?from=related) — Add an MCP server to an existing Next.js app with xmcp. Create typed tools, add authentication, and deploy to Vercel as
- [MCP](https://vercel.com/docs/mcp?from=related) — Learn more about MCP and how you can use it on Vercel.
- [Vercel MCP server](https://vercel.com/docs/agent-resources/vercel-mcp?from=related) — Vercel MCP has tools available for searching docs, managing teams, projects, and deployments, and querying Web Analytics
- [Deploy MCP servers](https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel?from=related) — Learn how to deploy Model Context Protocol \(MCP\) servers on Vercel with OAuth authentication and efficient scaling.
- [xmcp](https://vercel.com/docs/frameworks/backend/xmcp?from=related) — Build MCP-compatible backends with xmcp and deploy to Vercel. Learn the project structure, tool format, middleware, and
- [Global Options](https://vercel.com/docs/cli/global-options?from=related) — Global options are commonly available to use with multiple Vercel CLI commands. Learn about Vercel CLI's global options

Full cross-link map for this page: [/docs/cli/mcp.graph.md](/docs/cli/mcp.graph.md)
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


---

[View full sitemap](/docs/sitemap)
