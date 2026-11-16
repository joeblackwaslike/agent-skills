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
  - /docs/agent-resources/vercel-mcp
  - /docs/cli/link
  - /docs/cli/global-options
summary: Set up Model Context Protocol (MCP) clients to use Vercel MCP with the vercel mcp CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/mcp.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "818fbc95ff6172b19e15594bf57b31f362bc6c25e51e2e5eb43ce0805e1163e0"
---

# vercel mcp

The `vercel mcp` command helps you set up MCP clients (Claude Code, Claude.ai and Claude for desktop, Cursor, and VS Code with Copilot) to use [Vercel MCP](/docs/agent-resources/vercel-mcp), Vercel's hosted Model Context Protocol endpoint at `https://mcp.vercel.com`. For Claude Code, the command adds Vercel MCP to the client. For Cursor and VS Code with Copilot, it opens the client's one-click installer for Vercel MCP, and you follow the prompts there to complete the setup. For Claude.ai and Claude for desktop, it prints manual setup instructions for adding a custom connector. To set up another client, see [Vercel MCP setup](/docs/agent-resources/vercel-mcp#setup).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel MCP: Connect Vercel to your AI tools](https://vercel.com/blog/introducing-vercel-mcp-connect-vercel-to-your-ai-tools)
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [Devin, Raycast, Windsurf, and Goose now supported on Vercel MCP](https://vercel.com/changelog/devin-raycast-windsurf-and-goose-now-supported-on-vercel-mcp)
- [MCP server support on Vercel](https://vercel.com/changelog/mcp-server-support-on-vercel)
- [Vercel MCP now supports Client ID Metadata Documents](https://vercel.com/changelog/vercel-mcp-now-supports-client-id-metadata-documents)
- [Model Context Protocol](https://vercel.com/docs/mcp) — Learn more about MCP and how you can use it on Vercel.
- [MCP Integrations](https://vercel.com/docs/mcp/integrations) — Connect AI SDK, TanStack AI, and eve applications to MCP servers to discover and call tools.
- [Deploy MCP servers to Vercel](https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel) — Learn how to deploy Model Context Protocol \\(MCP\\) servers on Vercel with OAuth authentication and efficient scaling.
- [AI SDK with MCP](https://vercel.com/docs/mcp/integrations/ai-sdk) — Connect the AI SDK to an MCP server on Vercel, discover its tools, and call them with models served through AI Gateway.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.

Full cross-link map for this page: [/docs/cli/mcp.graph.md](/docs/cli/mcp.graph.md)
<!-- /docsgraph:related -->

By default, clients are pointed at the shared endpoint. With `--project`, they're pointed at a project-specific URL (`https://mcp.vercel.com/<team>/<project>`) so the MCP session is scoped to the linked Vercel Project.

The command does not deploy any MCP server of your own. It only adjusts the client-side configuration on your machine.

## Usage

```bash filename="terminal"
vercel mcp [options]
```

*Using the \`vercel mcp\` command to configure local MCP clients to use Vercel
MCP.*

By default, `vercel mcp` runs an interactive picker that lets you choose which MCP clients to set up. In non-interactive environments such as CI, you must pass `--clients` to skip the picker.

After the command finishes, complete any authentication that the client asks for. In Claude Code, run the `/mcp` command to authenticate.

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

The `--project` option sets up project-specific MCP access for the currently linked project instead of global configuration. If your directory isn't linked to a project, run [`vercel link`](/docs/cli/link) first.

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
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
