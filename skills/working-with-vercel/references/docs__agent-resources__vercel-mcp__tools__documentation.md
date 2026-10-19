---
title: Documentation and CLI
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/documentation
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for documentation and cli.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "8ce05337f9de276069e42c29c3d66de4f4b3c573900f6a5fb2e20558dda94acf"
---

# Documentation and CLI

Find Vercel documentation for a task and get guidance on the Vercel CLI commands to use. These tools help you work out how to configure or deploy your projects.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [vercel help](https://vercel.com/docs/cli/help) — Learn how to use the vercel help CLI command to get information about all available Vercel CLI commands.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [Linking Projects with Vercel CLI](https://vercel.com/docs/cli/project-linking) — Learn how to link existing Vercel Projects with Vercel CLI.
- [Vercel CLI Global Options](https://vercel.com/docs/cli/global-options) — Global options are commonly available to use with multiple Vercel CLI commands. Learn about Vercel CLI's global options

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/documentation.graph.md](/docs/agent-resources/vercel-mcp/tools/documentation.graph.md)
<!-- /docsgraph:related -->

## `search_vercel_documentation`

Search Vercel documentation for specific topics and information.

| Parameter | Type   | Required | Default | Description                                                                    |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------ |
| `topic`   | string | Yes      | -       | Topic to focus the documentation search on (e.g., 'routing', 'data-fetching'). |
| `tokens`  | number | No       | `2500`  | Maximum number of tokens to include in the result.                             |

**Sample prompt:** "How do I configure custom domains in Vercel?"

## `use_vercel_cli`

This tool is available through the `https://mcp.vercel.com/cli/mcp` connection.

Instructs the LLM to use Vercel CLI commands with --help flag for information.

| Parameter | Type   | Required | Default | Description                                 |
| --------- | ------ | -------- | ------- | ------------------------------------------- |
| `command` | string | No       | -       | Specific Vercel CLI command to run.         |
| `action`  | string | Yes      | -       | What you want to accomplish with Vercel CLI |

**Sample prompt:** "Help me deploy this project using Vercel CLI"


---

[View full sitemap](/docs/sitemap)
